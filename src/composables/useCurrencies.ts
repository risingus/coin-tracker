import baseUrl from '../constants/base-url';
import apiKey from '../constants/api-key';
import { useQuery } from '@tanstack/vue-query';

type Currency = {
  code: string;
  name: string;
};

type CurrenciesResponse = Record<string, Currency>;

const errorRequest = new Error('Erro inesperado ao buscar moedas')

async function fetchCurrencies() {
  const params = new URLSearchParams();
  params.append('api_key', apiKey);
  
  const response = await fetch(baseUrl + '/currencies' + '?' + params, {
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

  return Array.from(uniqueCurrenciesList).map((currency) => {
    return ({
      code: currency.code,
      name: currency.name
    })
  })
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

