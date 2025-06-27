<script lang='ts' setup>
import { storeToRefs } from 'pinia';
import { createSwapy, type Swapy, utils, type SlotItemMapArray } from 'swapy'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import { useCurrenciesStore } from '../stores/use-currencies-store';
import RatesCard from '../components/RatesCard.vue'

const store = useCurrenciesStore()
const { currencies } = storeToRefs(store)

const swapy = ref<Swapy | null>(null)
const container = ref<HTMLElement | null>()

const slotItemMap = ref<SlotItemMapArray>([...utils.initSlotItemMap(currencies.value, 'code')])
const slottedItems = computed(() => utils.toSlottedItems(currencies.value, 'code', slotItemMap.value))

watch(currencies, () => {
  return utils.dynamicSwapy(swapy.value, currencies.value, 'code', slotItemMap.value, (value: SlotItemMapArray) => slotItemMap.value = value),
  { deep: true, }
})

onMounted(() => {
  if (container?.value) {
    swapy.value = createSwapy(container.value, {
      manualSwap: true,
    })
    swapy.value.onSwap((event) => {
      requestAnimationFrame(() => {
        slotItemMap.value = event.newSlotItemMap.asArray
      })
    })
  }
})

onUnmounted(() => {
  swapy.value?.destroy()
})

</script>

<template>

<div ref="container" class="swapy-panel">

<div v-for="{ slotId, itemId, item: currency } in slottedItems" :key="slotId" :data-swapy-slot="slotId" class="item">
  <div v-if="currency"  :key="itemId" :data-swapy-item="itemId">
    <RatesCard :currency='currency' />
  </div>
</div>

</div>
  
</template>

<style scoped>

  .swapy-panel {
    overflow-x: hidden;
    height: calc(100svh - 6rem);
  }

  .item[data-swapy-highlighted] {
    background-color: rgba(255, 255, 255, 0.2);
  } 

</style>
