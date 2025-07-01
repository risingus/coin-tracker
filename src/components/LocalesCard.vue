<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { TZDate  } from '@date-fns/tz'
import { format } from 'date-fns';


const { locale } = defineProps<{
  locale: Locale
}>()

const now = ref(new Date())

const formattedTime = computed(() => {
	if (!locale.timezoneId) return 'vish...'
  const zonedDate = new TZDate(now.value, locale.timezoneId)
  return format(zonedDate, 'HH:mm')
})

let interval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  const msToNextMinute = 60000 - (now.value.getSeconds() * 1000 + now.value.getMilliseconds())
  setTimeout(() => {
    now.value = new Date()
    interval = setInterval(() => {
      now.value = new Date()
    }, 60000)
  }, msToNextMinute)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>


<template>
	<div 
		class="locales-card"
	>
  {{locale.name}}
	<p>
		{{ formattedTime }}
	</p>

	</div>
</template>

<style scoped>
.locales-card {
	display: grid;
	grid-template-columns: 1fr 2rem;
	gap: 1rem;
	width: 100%;
}
</style>
