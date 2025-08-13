<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { useDebounce } from '../composables/useDebounce'
import { useThrottle } from '../composables/useThrottle'

const show = ref(false)
const inputRef = ref()
const throttle = useThrottle()
const debounce = useDebounce()

const emit = defineEmits(['onConfirm', 'onSearch', 'onClose'])

const {
	results = [],
	type,
	isFetching = false,
} = defineProps<{
	results?: unknown[]
	type: 'coin' | 'time'
	isFetching?: boolean
}>()

function handleOpenModal() {
	show.value = true
	setTimeout(() => {
		if (!inputRef?.value) return
		inputRef.value.focus()
	}, 200)
}

function handleCloseModal() {
	show.value = false
	emit('onClose')
	if (inputRef?.value) {
		inputRef.value.value = ''
	}
}

function handleConfirmSelection(item: unknown) {
	emit('onConfirm', item)
	handleCloseModal()
}

function changeSearch(event: Event) {
	const input = event.target as HTMLInputElement
	emit('onSearch', input.value)
	const items = document.querySelectorAll('.result-item')
	items.forEach((item, index) => {
		if (index === 0) {
			item.setAttribute('data-selected', 'true')
		}
	})
}

function handleChangeInput(event: Event) {
	debounce(async () => {
		changeSearch(event)
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
	const selectedItem = results[selectedItemIndex]
	if (!selectedItem) return
	handleConfirmSelection(selectedItem)
}

onMounted(() => {
	document.addEventListener('keydown', closeOnEsc)
})

onUnmounted(() => {
	document.removeEventListener('keydown', closeOnEsc)
})
</script>

<template>
	<a-modal
		:open="show"
		centered
		:footer="null"
		wrap-class-name="modal"
		@cancel="handleCloseModal">
		<div class="flex flex-row items-center justify-between rounded-md px-4">
			<i class="pi pi-search text-neutral"></i>
			<input
				ref="inputRef"
				class="shadow-none outline-none border-none w-full h-full p-4 pl-2 bg-transparent text-white"
				@input="handleChangeInput"
				@keydown.down.prevent="handleMove"
				@keydown.up.prevent="handleMove"
				@keydown.enter.prevent="onEnter" />
		</div>

		<div
			class="border-t border-neutral flex flex-col items-start justify-start gap-1 p-4 h-80 overflow-y-auto">
			<p v-if="isFetching">Buscando...</p>
			<div
				v-for="(item, index) in results"
				:key="index"
				class="w-full"
				@:pointerenter="() => onPointerEnter(index)"
				@click="() => handleConfirmSelection(item)">
				<slot name="result-item" :item="item" :index="index" />
			</div>
		</div>
	</a-modal>
	<a-button type="primary" @click="handleOpenModal">
			<div class='flex flex-row gap-2 items-center'>
				Adicionar
			<i v-if="type === 'coin'" class="pi pi-bitcoin"></i>
			<i v-if="type !== 'coin'" class="pi pi-clock"></i>
			</div>
	</a-button>
</template>
