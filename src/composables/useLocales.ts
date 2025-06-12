import { useQuery } from '@tanstack/vue-query';
import { getValidStringFromAny } from '../util/get-valid-string-from-any';
import { computed, type Ref } from 'vue';


async function getLocales({ query, type }: { query: string, type: 'city' | 'country' }) {
  try {
    const params = new URLSearchParams();
    params.append('q', query);
    params.append('format', 'json')
    params.append('featureType', type)
    params.append('extratags', '1')
    params.append('namedetails', '1')
    const response = await fetch('https://nominatim.openstreetmap.org/search' + '?' + params, {
      method: 'get',
    })
    if (!response.ok) return []
    const data = await response.json()

    const waht = Array.isArray(data)
      ? data.filter((locale) => {
        console.log(locale,)
        return (
          (type === 'city' && locale?.addresstype === 'municipality')
          || (type === 'country' && locale?.addresstype === 'country')
          || (type === 'city' && locale?.addresstype === 'town')
        ) && getValidStringFromAny(locale?.['display-name'])
          && getValidStringFromAny(locale?.lon)
          && getValidStringFromAny(locale?.lat)
      }).map((locale) => {
        console.log(locale.type, 'type')
        return {
          name: locale['display-name'],
          lat: Number(locale.lat),
          lon: Number(locale.lon),
          type: locale.type === 'country' ? 'País' : 'Cidade',
        }
      })
      : []

    console.log(waht, 'waht')

    return waht
  } catch {
    return []
  }
}


async function fetchLocales(query: string) {
  try {
    const [countries, cities] = await Promise.all([
      getLocales({ query, type: 'country' }),
      getLocales({ query, type: 'city' })
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

