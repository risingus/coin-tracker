<script setup lang="ts">
import AddTimezoneModal from './components/AddTimezoneModal.vue';
import SwapyPanelCurrencies from './components/SwapyPanelCurrencies.vue';
import AddCurrencyModal from './components/AddCurrencyModal.vue';
import SwapyPanelLocales from './components/SwapyPanelLocales.vue';
import BackgroundPanel from './components/BackgroundPanel.vue';


</script>
<template>
  <BackgroundPanel />
  <header
    class='flex flex-row gap-4 justify-center align-middle'
  >
    <AddCurrencyModal />
    <AddTimezoneModal />
  </header>
  <main
    class='grid grid-cols-2 gap-4 p-4'
  >
    <SwapyPanelCurrencies />
    <SwapyPanelLocales />
  </main>
</template>