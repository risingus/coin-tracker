import { useQuery } from '@tanstack/vue-query';
import { getValidStringFromAny } from '../util/get-valid-string-from-any';
import { computed, type Ref } from 'vue';

interface CityResponse {
  name: string
  latitude: number
  longitude: number
  countryCode: string
}

async function getCountries(query: string) {
  const response = await fetch(`https://restcountries.com/v3.1/name/${query}`)
  if (!response.ok) return []
  const data = await response.json()
  return Array.isArray(data)
    ? data.map((country) => {
      return {
        name: getValidStringFromAny(country?.name?.nativeName?.por?.common) || getValidStringFromAny(country?.name?.common),
        lat: typeof country?.latlng?.[0] === 'number' ? country?.latlng?.[0] : null,
        lon: typeof country?.latlng?.[1] === 'number' ? country?.latlng?.[1] : null,
        countryCode: getValidStringFromAny(country?.cca2),
        type: 'País',
      }
    })
    : []
}

async function getCitites(query: string) {
  try {
    const params = new URLSearchParams();
    params.append('namePrefix', query);
    params.append('languageCode', 'pt');

    const response = await fetch('https://wft-geo-db.p.rapidapi.com/v1/geo/cities' + '?' + params, {
      method: 'get',
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_GEO_CITIES,
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
      }
    })

    if (!response.ok) return []

    const responsej = await response.json();
    const data: CityResponse[] = Array.isArray(responsej?.data)
      ? responsej.data
      : []

    return data.map((city) => {
      return {
        name: getValidStringFromAny(city?.name),
        lat: typeof city?.latitude === 'number' ? city?.latitude : null,
        lon: typeof city?.longitude === 'number' ? city?.longitude : null,
        countryCode: getValidStringFromAny(city?.countryCode),
        type: 'Cidade',
        }
    })
  } catch {
    return []
  }
}


async function fetchLocales(query: string) {
  try {
    const [countries, cities] = await Promise.all([
      getCountries(query),
      getCitites(query)
    ])
    return [
      ...countries,
      ...cities,
    ]
  } catch (error) {
    console.warn(error)
    throw new Error('Erro ao buscar localidades')
  }
}


const useLocales = (query: Ref<string>) => {
  return useQuery({
    queryKey: computed(() => ['currencies', query.value]),
    queryFn: async ({ queryKey }) => await fetchLocales(queryKey[1]),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: computed(() => getValidStringFromAny(query.value).length > 2),
    staleTime: 1000 * 60 * 60, // ? 1 hora
  })
}

export {
  useLocales
}

