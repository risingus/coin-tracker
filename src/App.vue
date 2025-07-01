<script setup lang="ts">
import AddTimezoneModal from './components/AddTimezoneModal.vue';
import SwapyPanelCurrencies from './components/SwapyPanelCurrencies.vue';
import AddCurrencyModal from './components/AddCurrencyModal.vue';
import SwapyPanelLocales from './components/SwapyPanelLocales.vue';
import TestSmoke from './components/TestSmoke.vue';

</script>
<template>
  <header>
    <AddCurrencyModal />
    <AddTimezoneModal />
  </header>
  <main>
    <!-- <SwapyPanelCurrencies /> -->
    <!-- <SwapyPanelLocales /> -->
     <TestSmoke />

  </main>
</template>

<style scoped>

header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

main {
  /* display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  align-items: flex-start;
  justify-content: flex-start; */
}


</style>
