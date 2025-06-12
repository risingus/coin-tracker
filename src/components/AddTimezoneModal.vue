<script lang="ts" setup>
import { onMounted, onUnmounted, ref, nextTick, watch } from 'vue'
import { gsap } from 'gsap'
import Button from './Button.vue'
import { useDebounce } from '../composables/useDebounce'
import { useThrottle } from '../composables/useThrottle'
import { useLocales } from '../composables/useLocales'

const show = ref(false)
const query = ref('')
const inputRef = ref()
const { data: results } = useLocales(query)
const throttle = useThrottle()
const debounce = useDebounce()

function handleOpenModal() {
	show.value = true
	setTimeout(() => {
		if (!inputRef?.value) return
		inputRef.value.focus()
	}, 200)
}

function handleCloseModal() {
	show.value = false
	query.value = ''
	results.value = []
}

async function changeSearch(event: Event) {
	const input = event.target as HTMLInputElement
	query.value = input.value

}

async function handleChangeInput(event: Event) {
	debounce(async () => {
		await changeSearch(event)
	}, 350)
}

function closeOnEsc(event: KeyboardEvent) {
	if (!show.value) return
	if (event.code !== 'Escape') return
	handleCloseModal()
}

const move = (event: KeyboardEvent) => {
	const itemsNode = document.querySelectorAll<HTMLElement>('.result-item')
	const items = Array.from(itemsNode)
	const selectedItemIndex = items.findIndex((item) => {
		return item.getAttribute('data-selected') === 'true'
	})

	if (selectedItemIndex === -1) return

	const eventIsDown = event.key === 'ArrowDown'

	const nextItemIndex = eventIsDown
		? selectedItemIndex + 1
		: selectedItemIndex - 1
	if (nextItemIndex >= items.length && eventIsDown) return
	if (nextItemIndex < 0 && !eventIsDown) return

	items.forEach((item, index) => {
		if (index === selectedItemIndex) {
			item.removeAttribute('data-selected')
		}
		if (index === nextItemIndex) {
			item.setAttribute('data-selected', 'true')
			const observer = new IntersectionObserver(
				([entry]) => {
					if (!entry.isIntersecting) {
						entry.target.scrollIntoView({
							behavior: 'smooth',
							block: 'nearest',
						})
					}
					observer.disconnect()
				},
				{ threshold: 1 }
			)
			observer.observe(item)
		}
	})
}

const handleMove = (event: KeyboardEvent) => {
	throttle(() => {
		move(event)
	}, 100)
}

const onPointerEnter = (newIndex: number) => {
	const itemsNode = document.querySelectorAll('.result-item')
	const items = Array.from(itemsNode)
	items.forEach((item, index) => {
		if (index === newIndex) {
			item.setAttribute('data-selected', 'true')
			return
		}
		item.removeAttribute('data-selected')
	})
}

const onEnter = () => {
	const itemsNode = document.querySelectorAll('.result-item')
	const items = Array.from(itemsNode)
	const selectedItemIndex = items.findIndex((item) => {
		return item.getAttribute('data-selected') === 'true'
	})
	if (selectedItemIndex === -1) return
	const currency = results.value?.[selectedItemIndex]
	if (!currency) return
	// handleAddCurrency(currency)
}

onMounted(() => {
	document.addEventListener('keydown', closeOnEsc)
})

onUnmounted(() => {
	document.removeEventListener('keydown', closeOnEsc)
})


watch(results, async () => {
	await nextTick()
	const timeline = gsap.timeline()
	gsap.utils.toArray<Element>('.result-item').forEach((item, index) => {
		if (index === 0) {
			item.setAttribute('data-selected', 'true')
		}
		timeline.fromTo(
			item,
			{
				translateY: '100%',
				opacity: 0,
			},
			{
				opacity: 1,
				duration: 0.6,
				translateY: '0%',
				ease: 'power4.out',
			},
			index * 0.08
		)
	})
})
</script>


    name: locale['display_name'],
          lat: Number(locale.lat),
          lon: Number(locale.lon),
          type,

<template>
	<div v-if="show" class="modal-overlay" @keydown.{esc}="handleCloseModal">
		<div class="modal-content">
			<div class="search-input-container">
				<i class="pi pi-search"></i>
				<input
					ref="inputRef"
					class="search-input"
					:value="query"
					@input="handleChangeInput"
					@keydown.down.prevent="handleMove"
					@keydown.up.prevent="handleMove"
					@keydown.enter.prevent="onEnter" />

				<Button round @click="handleCloseModal">
					<i class="pi pi-times"></i>
				</Button>
			</div>

			<div class="results-section">
				<div
					v-for="(locale, index) in results"
					:key="locale.name"
					class="result-item"
					@:pointerenter="() => onPointerEnter(index)"
          >
					<!-- <i class="pi pi-dollar"></i> -->
					<div>
						{{ locale.name }}
					</div>
					<div>
						{{ locale.type }}
					</div>
				</div>
			</div>
		</div>
	</div>

	<Button @click="handleOpenModal">time</Button>
</template>

<style scoped>
.modal-overlay {
	background-color: rgba(0, 0, 0, 0.6);
	height: 100vh;
	width: 100vw;
	position: absolute;
	top: 0;
	bottom: 0;
	right: 0;
	left: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	z-index: 2;

	.modal-content {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		background-color: rgba(255, 255, 255, 0.1);
		width: 30rem;
		border-radius: 6px;
		z-index: 1;

		.search-input-container {
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			border-radius: 6px;
			padding: 0 1rem;
			color: var(--neutral);

			.pi-search {
				font-size: 1rem;
			}

			.search-input {
				box-shadow: none;
				outline: none;
				border: none;
				width: 100%;
				height: 100%;
				padding: 1rem 0.5rem;
				background-color: transparent;
				color: var(--text-primary);
			}
		}

		.results-section {
			border-top: 1px solid var(--neutral);
			display: flex;
			flex-direction: column;
			align-items: center;
			gap: 0.25rem;
			padding: 1rem;
			height: 20rem;
			overflow-y: auto;

			.result-item {
				position: relative;
				will-change: transform, opacity;
				gap: 1rem;
				border-radius: 6px;
				max-height: 2.5rem;
				cursor: pointer;
				gap: 1rem;
				width: 100%;

				display: grid;
				grid-template-columns: repeat(2, 1fr);
				align-items: center;
				justify-content: start;

				&:hover {
					background-color: blue;
				}

				& > div {
					display: grid;
					grid-template-columns: 1fr;
					align-items: center;
					justify-items: start;
          overflow: hidden;
				}
			}

			.result-item[data-selected='true'] {
				background-color: red;
			}
		}
	}
}
</style>
