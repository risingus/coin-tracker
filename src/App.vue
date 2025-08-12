<script setup lang="ts">
import AddTimezoneModal from './components/AddTimezoneModal.vue'
import SwapyPanelCurrencies from './components/SwapyPanelCurrencies.vue'
import AddCurrencyModal from './components/AddCurrencyModal.vue'
import SwapyPanelLocales from './components/SwapyPanelLocales.vue'
import BackgroundPanel from './components/BackgroundPanel.vue'
import { theme } from 'ant-design-vue'
import Header from './components/Header.vue'
</script>
<template>
	<a-config-provider
:theme="{
		algorithm: theme.darkAlgorithm,
		token: {
			colorPrimary: 'hsl(156, 88%, 52%)',
		},
	}">
		<BackgroundPanel />
		<Header />
		<header class="flex flex-row gap-4 justify-center align-middle">
			<AddCurrencyModal />
			<AddTimezoneModal />
		</header>
		<main class="grid grid-cols-2 gap-4 p-4">
			<SwapyPanelCurrencies />
			<SwapyPanelLocales />
		</main>
	</a-config-provider>
</template>
