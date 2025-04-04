<script lang='ts' setup>
import { ref } from 'vue'

  const show = ref(false)

  function handleModal() {
    show.value = !show.value
  }

</script>

<template>

  <div v-if="show" class="modal-overlay">
    'blablas'

  </div>


  <button @click="handleModal">
    open modal
  </button>


</template>


<style scoped>
  .modal-overlay {
    
  }

</style>
