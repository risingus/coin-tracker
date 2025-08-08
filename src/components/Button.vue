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
		class="btn-base btn-primary"
		@click="handleClick">
		<slot />
	</button>

	<button
		v-if="secondary"
		v-bind="attrs"
		class="btn-base btn-secondary"
		@click="handleClick">
		<slot />
	</button>

	<button v-if="round" v-bind="attrs" class="btn-base btn-round" @click="handleClick">
		<slot />
	</button>
</template>

<style scoped>  
@reference "../style.css";  

.btn-base {
  @apply flex flex-row items-center justify-center relative overflow-hidden border border-transparent rounded-md outline-none font-nunito font-bold capitalize;
}

.btn-primary {
  @apply bg-primary text-text-secondary px-4 py-2;
}

.btn-secondary {
  @apply bg-transparent text-text-secondary px-4 py-2 transition duration-150 ease-in hover:bg-white/10 focus-visible:outline-black;
}

.btn-round {
  @apply w-9 h-8 rounded-full p-0 text-base text-neutral;
}
</style>

