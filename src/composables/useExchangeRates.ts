import { useQuery } from '@tanstack/vue-query';
import currenciesUrl from '../constants/currenciesUrl';
import type { Ref } from 'vue';

const placeholder = {
  value: 0,
  currencyValue: '$ 0.00'
}
const errorRequest = ({from, to}: {from: string, to: string}) => new Error(`Erro ao converter de ${from} para ${to}`)

async function getExchangeRates({ from, to }: { from: string, to: string }): Promise<{ value: number, currencyValue: string }> {
  const params = new URLSearchParams();
  params.append('base', from);
  params.append('currencies', to);
  const response = await fetch(currenciesUrl + '/latest' + '?' + params)
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
    currencyValue: new Intl.NumberFormat('en-us', {
      minimumFractionDigits: 2,
      currency: 'USD',
      style: 'currency',
    }).format(rate)
  }
}

const useExchangeRates = ({ from, to }: { from: Ref<string>, to: Ref<string> }) => {
  return useQuery({
    queryKey: ['exchange-rates', from, to],
    queryFn: () => getExchangeRates({ from: from.value, to: to.value }),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    placeholderData: placeholder,
    staleTime: 1000 * 60 * 60, // ? 1 hora
  })
}


export {
  useExchangeRates
}