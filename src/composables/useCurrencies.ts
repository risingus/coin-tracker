import { useQuery } from '@tanstack/vue-query';
import currenciesUrl from '../constants/currenciesUrl';

type CurrenciesResponse = Record<string, Currency>;

const errorRequest = new Error('Erro inesperado ao buscar moedas')

function sortCurrencies(currencies: Currency[]) {
  return currencies.sort((a, b) => {
    const aCodeUpperCase = a.code.toUpperCase();
    const bCodeUpperCase = b.code.toUpperCase();
    if (aCodeUpperCase < bCodeUpperCase) return -1
    if (aCodeUpperCase > bCodeUpperCase) return 1
    return 0
  })
}

async function fetchCurrencies() {
  const params = new URLSearchParams();
  params.append('api_key', import.meta.env.VITE_FX_RATES_API_SECRET);
  
  const response = await fetch(currenciesUrl + '/currencies' + '?' + params, {
    method: 'get',
  })

  if (!response.ok) {
    throw errorRequest
  }

  const json = await response.json() as CurrenciesResponse

  if (typeof json !== 'object') {
    throw errorRequest
    return []
  }

  const filteredCurrenciesArray = Object.values(json).filter((currency) => {
    return typeof currency?.code === 'string'
      && typeof currency?.name === 'string'
  })

  const uniqueCurrenciesList = new Set(Object.values(filteredCurrenciesArray))

  return sortCurrencies(Array.from(uniqueCurrenciesList).map((currency) => {
    return ({
      code: currency.code,
      name: currency.name
    })
  }))
}

const useCurrencies = () => {
  return useQuery({
    queryKey: ['currencies'],
    queryFn: fetchCurrencies,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // ? 1 hora
  })
}

export {
  useCurrencies
}

