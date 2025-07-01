<script lang="ts" setup>
import { useAttrs } from "vue";
import rippleClickEffect from "../util/ripple-click-effect";

const attrs = useAttrs();
const emit = defineEmits(["click"]);
const { secondary, round } = defineProps<{
  secondary?: boolean;
  round?: boolean;
}>();

function handleClick(event: MouseEvent) {
  rippleClickEffect(event);
  emit("click", event);
}
</script>

<template>
  <button
		v-if="!round && !secondary"
		v-bind="attrs"
		class="button-primary"
		@click="handleClick">
		<slot />
	</button>

	<button
		v-if="secondary"
		v-bind="attrs"
		class="button-secondary"
		@click="handleClick">
		<slot />
	</button>

	<button v-if="round" v-bind="attrs" class="button-round" @click="handleClick">
		<slot />
	</button>
</template>

<style scoped>
button {
	border: none;
	outline: none;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	position: relative;
	overflow: hidden;
	border: 1px solid transparent;
	border-radius: 6px;
	padding: 0.5rem 1rem;
	text-transform: capitalize;
	background-color: var(--primary);
	color: var(--text-secondary);
	font-family: Nunito;
	font-weight: 700;
}

.button-round,
.button-secondary {
	background-color: transparent;
	transition: background-color 150ms ease-in, outline 150ms ease-in;

	&:not(:disabled) {
		&:hover {
			background-color: rgba(255, 255, 255, 0.1);
		}

		&:focus-visible {
			outline: 1px solid black;
		}
	}
}

.button-round {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: 2.25rem;
	height: 2rem;
	border-radius: 999999px;
	padding: 0;
	font-size: 1rem;
	color: var(--neutral);

	&>* {
		line-height: 0;
	}
}
</style>
