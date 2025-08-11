<script lang='ts' setup>
import { storeToRefs } from 'pinia';
import { createSwapy, type Swapy, utils, type SlotItemMapArray } from 'swapy'
import { computed, onMounted, onUnmounted, onUpdated, ref, watch } from 'vue';
import { useLocalesStore } from '../stores/use-locales-store';
import LocalesCard from './LocalesCard.vue';

const store = useLocalesStore()
const { locales } = storeToRefs(store)

const swapy = ref<Swapy | null>(null)
const container = ref<HTMLElement | null>()

const slotItemMap = ref<SlotItemMapArray>([...utils.initSlotItemMap(locales.value, 'name')])
const slottedItems = computed(() => utils.toSlottedItems(locales.value, 'name', slotItemMap.value))

watch(locales, () => {
  return utils.dynamicSwapy(swapy.value, locales.value, 'name', slotItemMap.value, (value: SlotItemMapArray) => slotItemMap.value = value),
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

onUpdated(() => {
  console.log(slottedItems, 'slottedItems')

})

onUnmounted(() => {
  swapy.value?.destroy()
})

</script>

<template>
  <div ref="container" class="w-full flex flex-col">
    <div v-for="{ slotId, itemId, item: locale } in slottedItems" :key="slotId" :data-swapy-slot="slotId" class="item">
      <div v-if="locale"  :key="itemId" :data-swapy-item="itemId">
        <LocalesCard :locale='locale' />
      </div>
    </div>
  </div>
</template>

