import { useQuery } from '@tanstack/vue-query';
import {format, isValid, sub,} from 'date-fns'
import {ptBR} from 'date-fns/locale/pt-BR';
import baseUrl from '../constants/base-url';
import { catchError } from '../util/catch-error';

interface ExchangeRatesHistory  {
  [date: string]: {
    [currency: string]: number;
  };
};

type RateEntry = [string, { [currency: string]: number }];


const fetchExchangeRatesHistoryError = (to: string) => {
  return new Error(`Falha ao obter histórico da moeda ${to}`)
}


async function fetchExchangeRatesHistory({ from = '', to = '' }) {
  const [error, history] = await catchError((async () => {
    if (!from || !to) return

    const startDate = format(sub(new Date(), { days: 30 }), 'yyyy-MM-dd');
    const today = format(new Date(), 'yyyy-MM-dd');

    const response = await fetch(baseUrl + '/timeseries' + `?start_date=${startDate}` + `&end_date=${today}` + `&base=${from}` + `&currencies=${to}` )
    
    if (!response.ok) {
      throw fetchExchangeRatesHistoryError(to)
    }

    const data = await response.json()

    const history = data.rates as ExchangeRatesHistory | undefined

    if (!history) throw fetchExchangeRatesHistoryError(to)

    const historyArray = Object.entries(data.rates) as RateEntry[]

    const ratesHistory = Array.isArray(historyArray)
      && historyArray.length > 0
      ? historyArray.filter(([key, value]) => {
        const historyRate = value?.[to]
        return typeof historyRate === 'number'
        && key && isValid(new Date(key))
      })
      .reverse()
      .map(([key, value]) => {
        const historyRate = value?.[to]
        const date = format(new Date(key), 'dd MMM', {locale: ptBR})
        return {
          date,
          rate: Number(historyRate.toFixed(3))
        }
      })
    : []

    return ratesHistory;
  })())

  if (error) {
    throw fetchExchangeRatesHistoryError(to)
  }
  return history
}


const useExchangeRatesHistory = ({from, to}: {from: string, to: string}) => {
  return useQuery({
    queryKey: ['exchange-rates-history', from, to],
    queryFn: () => fetchExchangeRatesHistory({from, to}),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // ? 1 hora
  })
}

export {
  useExchangeRatesHistory
}