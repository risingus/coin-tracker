<script lang='ts' setup>
import { useAttrs } from 'vue';
import rippleClickEffect from '../util/ripple-click-effect';

  const attrs = useAttrs()
  const emit = defineEmits(['click'])
  const { secondary, round } = defineProps<{
    secondary?: boolean,
    round?: boolean,
  }>()

  function handleClick(event: MouseEvent) {
    rippleClickEffect(event)
    emit('click', event)
  }
</script>

<template>
  <button v-bind='attrs' class='button-primary' @click='handleClick' v-if='!round && !secondary'>
    <slot />
  </button>

  <button v-bind='attrs' class='button-secondary' @click='handleClick' v-if='secondary'>
    <slot />
  </button>

  <button v-bind='attrs' class='button-round' @click='handleClick' v-if='round'>
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
  }

  .button-round, .button-secondary {
    background-color: transparent;
    transition: background-color 200ms ease-in, outline 200ms ease-in;
    &:not(:disabled) {
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
      &:focus-visible {
        outline: 1px solid black;
      }
    }
  }

  .button-round {
    display: flex;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    padding: 0;
    font-size: .8rem;
  }
</style>
