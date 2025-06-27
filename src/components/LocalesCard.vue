<script lang="ts" setup>

const { locale } = defineProps<{
	locale: Locale
}>()
</script>

<template>
	<div 
		class="locales-card"
	>
	
  {{locale.name}}

	</div>
</template>

<style scoped>
.locales-card {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
}
</style>
