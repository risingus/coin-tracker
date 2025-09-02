<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { TZDate } from '@date-fns/tz'
import { format } from 'date-fns'
import { useLocalesStore } from '@/stores/use-locales-store';
import BaseCard from './BaseCard.vue';

const {removeLocales} = useLocalesStore()
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
	const msToNextMinute =
		60000 - (now.value.getSeconds() * 1000 + now.value.getMilliseconds())
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
	<BaseCard >
		<div class="grid grid-cols-[5rem_1fr_1.5rem] items-center h-16">
			<a-statistic title="Hora" :value="formattedTime" />
			<a-statistic title="Local" :value="locale.name" class='truncate' />
			<a-popconfirm title="Deletar horário?" ok-text="Sim" cancel-text="Não" @confirm="() => removeLocales(locale)">
				<a-button shape="circle" data-swapy-no-drag size="small">
					<i class="pi pi-trash" style='font-size: 0.75rem;'></i>
				</a-button>
			</a-popconfirm>
		</div>
	</BaseCard>

</template>



