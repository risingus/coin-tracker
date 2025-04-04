import { useQuery } from '@tanstack/vue-query';
import baseUrl from '../constants/base-url';

interface UseExchangeRates {
  from: string
  to: string
}

const errorRequest = ({from, to}: {from: string, to: string}) => new Error(`Erro ao converter de ${from} para ${to}`)

async function getExchangeRates({from, to}: {from: string, to: string}) {
  const response = await fetch(baseUrl + '/latest' + `?base${from}` + `&currencies=${to}`)

  if (!response.ok) {
    throw errorRequest({from, to})
  }
  const data = await response.json()
  const rate = data?.rates?.[to] as number | undefined

  if (typeof rate !== 'number') {
    throw errorRequest({from, to})
  }
  
  return {
    value: rate,
    formatedValue: new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 2,
      currency: 'USD',
      style: 'currency',
    }).format(rate)
  }
}


const useExchangeRates = ({from, to}: UseExchangeRates) => {
  return useQuery({
    queryKey: ['exchange-rates', from, to],
    queryFn: () => getExchangeRates({from, to}),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // ? 1 hora
  })
}


export {
  useExchangeRates
}