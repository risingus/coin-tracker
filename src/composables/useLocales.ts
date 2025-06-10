import { useQuery } from '@tanstack/vue-query';
import { getValidStringFromAny } from '../util/get-valid-string-from-any';


async function getLocales({ query, type }: { query: string, type: 'city' | 'country' }) {
  try {
    const params = new URLSearchParams();
    params.append('q', query);
    params.append('format', 'json')
    params.append('featureType', type)
    const response = await fetch('https://nominatim.openstreetmap.org/search' + '?' + params, {
      method: 'get',
    })
    if (!response.ok) return []
    const data = await response.json()

    return Array.isArray(data)
      ? data.filter((locale) => {
        return (
          (type === 'city' && locale?.addresstype === 'municipality')
          || (type === 'country' && locale?.addresstype === 'country')
        ) && getValidStringFromAny(locale?.['display_name'])
          && getValidStringFromAny(locale?.lon)
          && getValidStringFromAny(locale?.lat)
      }).map((locale) => {
        return {
          name: locale['display_name'],
          lat: Number(locale.lat),
          lon: Number(locale.lon),
          type,
        }
      })
      : []
  } catch (error) {
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


const useLocales = (query: string) => {
  return useQuery({
    queryKey: ['currencies', query],
    queryFn: async () => await fetchLocales(query),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 60, // ? 1 hora
  })
}

export {
  useLocales
}

