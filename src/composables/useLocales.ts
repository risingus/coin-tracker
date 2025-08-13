import { useQuery } from '@tanstack/vue-query';
import { toSafeString } from '../util/to-safe-string';
import { computed, type Ref } from 'vue';

interface CityResponse {
  name: string
  latitude: number
  longitude: number
  countryCode: string
}

async function getCountries(query: string) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${query}`)
    if (!response.ok) return []
  const data = await response.json()
  return Array.isArray(data)
    ? data.map((country) => {
      return {
        name: toSafeString(country?.name?.nativeName?.por?.common) || toSafeString(country?.name?.common),
        lat: typeof country?.latlng?.[0] === 'number' ? country?.latlng?.[0] : null,
        lon: typeof country?.latlng?.[1] === 'number' ? country?.latlng?.[1] : null,
        countryCode: toSafeString(country?.cca2),
        type: 'País',
      }
    })
    : []
  } catch (err) {
    console.warn(err)
    return []
  }
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
        name: toSafeString(city?.name),
        lat: typeof city?.latitude === 'number' ? city?.latitude : null,
        lon: typeof city?.longitude === 'number' ? city?.longitude : null,
        countryCode: toSafeString(city?.countryCode),
        type: 'Cidade',
      }
    })
  } catch (err) {
    console.warn(err)
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
    ].sort((a, b) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      const queryUppercase = query.toUpperCase()
      if (nameA === queryUppercase) return -1;
      if (nameB === queryUppercase) return 1;

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
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
    retryDelay: 1000, // ? 1 segundo
    enabled: computed(() => toSafeString(query.value).length > 2),
    staleTime: 1000 * 60 * 120, // ? 2 horas
  })
}

export {
  useLocales
}

