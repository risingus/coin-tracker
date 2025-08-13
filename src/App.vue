<script setup lang="ts">
import BackgroundPanel from './components/BackgroundPanel.vue'
import { theme } from 'ant-design-vue'
import Header from './components/Header.vue'
import Panels from './components/Panels/Panels.vue'
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
		<main class="p-4 pt-8">
			<Panels />
		</main>
	</a-config-provider>
</template>
