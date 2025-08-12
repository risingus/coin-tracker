<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'

const numCircles = 100

onMounted(() => {
	gsap.to('.circle', {
		width: (i) => `${(i + 1) * 1.25}vmin`,
		height: (i) => `${(i + 1) * 0.5}vmin`,
		right: (i) => `${(i + 1) * 0.8}vmin`,
		bottom: (i) => `${(i + 1) * 0.8}vmin`,
		filter: (i) => `blur(${(i + 1) / 3 + 8}px)`,
		background: (i) => {
			const r = 25 + (i + 1) * 1.25
			const g = 240 + (i + 1)
			const b = 154
			const a = 1 - (i + 1) / 90
			return `rgba(${r}, ${g}, ${b}, ${a})`
		},
		stagger: (i) => i /10
	})

	gsap.to('.circle', {
		opacity: 1,
		stagger: (i) => i * 0.25,
	})

	const items = gsap.utils.toArray<Element>('.circle')
	
	items.forEach((item, index) => {
			gsap.to(item, {
			rotation: 360,
			duration: 4,
			repeat: -1,
			ease: 'linear',
			delay: index / 10
		})
	})
})
</script>

<template>
	<div class="z-[-1] absolute inset-0 overflow-hidden">
		<div class="relative w-full h-full">
			<div v-for="i in numCircles" :key="i"
				class="absolute border-4 rounded-full border-black m-auto opacity-0 circle">
			</div>
		</div>
	</div>
</template>
