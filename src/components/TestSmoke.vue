<script setup lang="ts">
import gsap from 'gsap'
import { onMounted } from 'vue'

const getCircleStyle = (i: number) => {
	const width = `${i * 1}vmin`
	const height = `${i * 0.4}vmin`
	const right = `${i * 0.8}vmin`
	const bottom = `${i * 1}vmin`
	const blur = `${i / 3 + 8}px`
	const transformOrigin = `${i * 0.6}vmin ${i * 0.3}vmin`
	const delay = i / 10
	const r = 25 + i * 1.25
	const g = 240 + i
	const b = 154
	const a = 1 - i / 80
	const background = `rgba(${r}, ${g}, ${b}, ${a})`

	return {
		width,
		height,
		right,
		bottom,
		filter: `blur(${blur})`,
		transformOrigin,
		delay,
		background,
	}
}

onMounted(() => {
	const timeline = gsap.timeline()
	const items = gsap.utils.toArray<Element>('.c')

	items.forEach((item, index) => {
		const {
			width,
			height,
			right,
			bottom,
			filter,
			transformOrigin,
			delay,
			background,
		} = getCircleStyle(index)

		timeline.to(
			item,
			{
				width,
				height,
				right,
				bottom,
				filter,
				transformOrigin,
				background,
			},
			delay
		)
		timeline.to(
			item,
			{
				opacity: 1,
			},
			index * 0.25
		)
		gsap.to(item, {
			rotation: 360,
			duration: 5,
			repeat: -1,
			ease: 'linear',
			delay: delay,
		})
	})
})
</script>

<template>
	<div class="s">
		<div class="h">
			<div v-for="i in 100" :key="i" class="c"></div>
		</div>
	</div>
</template>

<style scoped>
.s {
  z-index: -1;
	position: absolute;
	right: 0;
	bottom: 0;
	top: 0;
	left: 0;
	overflow: hidden;
}

.h {
	position: relative;
	width: 100%;
	height: 100%;
}

.c {
	position: absolute;
	border: 2px solid rgba(255, 255, 255, 0.1);
	border-radius: 50%;
	margin: auto;
	opacity: 0;
}
</style>
