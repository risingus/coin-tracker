<script lang="ts" setup>
import { ref } from 'vue'
import SwapyPanelCurrencies from './components/SwapyPanelCurrencies.vue'
import SwapyPanelLocales from './components/SwapyPanelLocales.vue'

const tabStoredKey = 'active-tab'
const tabValues = {
	coin: 'coin',
	clocks: 'clocks',
	all: 'all',
}

const activeTab = ref(tabValues.coin)

function getStoredTab() {
	const stored = localStorage.getItem(tabStoredKey)
	if (
		stored !== tabValues.coin &&
		stored !== tabValues.clocks &&
		stored !== tabValues.all
	)
		return
	activeTab.value = stored
}

getStoredTab()

function changeActiveTab(newValue: string) {
	activeTab.value = newValue
	localStorage.setItem(tabStoredKey, newValue)
}
</script>

<template>
	<div class="w-full flex flex-row justify-center">
		<div class="max-w-[1000px] grow-1">
			<a-tabs v-model:active-key="activeTab" centered @change="changeActiveTab">
				<a-tab-pane :key="tabValues.coin">
					<template #tab>
						<i class="pi pi-bitcoin"></i>
					</template>
						<SwapyPanelCurrencies />
				</a-tab-pane>
				<a-tab-pane :key="tabValues.clocks" force-render>
					<template #tab>
						<i class="pi pi-clock"></i>
					</template>
					<SwapyPanelLocales />
				</a-tab-pane>
				<a-tab-pane :key="tabValues.all">
					<template #tab>
						<div class="flex flex-row gap-2 items-center">
							<i class="pi pi-bitcoin"></i>
							<i class="pi pi-clock"></i>
						</div>
					</template>
					<div class="grid gap-4 grid-cols-1 sm:grid-cols-2">
						<SwapyPanelCurrencies />
						<SwapyPanelLocales />
					</div>
				</a-tab-pane>
			</a-tabs>
		</div>
	</div>
</template>
