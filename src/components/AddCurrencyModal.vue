<script lang='ts' setup>
import { ref } from 'vue'
import { useCurrencies } from '../composables/useCurrencies'
import Select from './Select.vue'

  const show = ref(false)

  const {data: currencies} = useCurrencies()

  function handleModal() {
    show.value = !show.value
  }

</script>

<template>

  <div v-if="show" class="modal-overlay">
    <div class='modal-content'>
     <div class='modal-header'>
        <strong>
          Add Currency
        </strong>
        <button>
          x
        </button>
     </div>

     <div class='modal-section'>
        <Select />

     </div>


     <div class='modal-footer'>
      
     </div>

    </div>

  </div>


  <button @click="handleModal">
    open modal
  </button>


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

    .modal-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: red;

    }
  }

</style>
