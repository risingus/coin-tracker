<script lang='ts' setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Button from './Button.vue'
import { useCurrenciesStore } from '../stores/use-currencies-store'
import { useCurrencies } from '../composables/useCurrencies'

  const show = ref(false)
  const query = ref('')
  const inputRef = ref()
  const { addCurrency } = useCurrenciesStore()
  const { data: currencies } = useCurrencies()

  const results = computed<Currency[]>(() => {
    return Array.isArray(currencies.value)
    && query.value
    ? currencies.value.filter((currency: Currency) => {
      return currency.code.toUpperCase().startsWith(query.value.toUpperCase())
      || currency.name.toUpperCase().includes(query.value.toUpperCase())
    })
    : []
  })

  function handleOpenModal() {
    show.value = true
    setTimeout(() => {
      if (!inputRef?.value) return
      inputRef.value.focus()    
    }, 200);
  }

  function handleCloseModal() {
    show.value = false
    query.value = ''
  }

  function handleAddCurrency(currency: Currency) {
    addCurrency(currency)
    handleCloseModal()
  }

  function changeSearch(event: Event) {
    const input = event.target as HTMLInputElement
    query.value = input.value;
  }
  
  function closeOnEsc(event: KeyboardEvent) {
    if (!show.value) return
    if (event.code !== 'Escape') return
    handleCloseModal()
  }

  onMounted(() => {
    document.addEventListener('keydown', closeOnEsc)
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', closeOnEsc)
  })

</script>

<template>
  <div v-if="show" class="modal-overlay" @keydown.{esc}='handleCloseModal'>
    <div class='modal-content'>
      <div class='search-input-container'>
        <i class="pi pi-search"></i>
        <input class='search-input' @input='changeSearch' :value='query' ref='inputRef' />
        <Button @click='handleCloseModal' round>
          <i class="pi pi-times"></i>
        </Button>
      </div>
      
      <div class='results-section'>
        <div v-for='currency in results' :key='currency.code' class='result-item' @click='() => handleAddCurrency(currency)'>
          <i class="pi pi-dollar"></i>
          <div>
            {{ currency.code }}
          </div>
          <div>
            {{ currency.name }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <Button  @click="handleOpenModal">
    open modal
  </Button>
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
  z-index: 2;

  .modal-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    background-color: rgba(255, 255, 255, 0.1);
    width: 30rem;
    border-radius: 6px;
    z-index: 1;

    .search-input-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-radius: 6px;
      padding: 0 1rem;
      color: var(--neutral);
     
      .pi-search {
        font-size: 1rem;
      }
      .search-input {
        box-shadow: none;
        outline: none;
        border: none;
        width: 100%;
        height: 100%;
        padding: 1rem 0.5rem;
        background-color: transparent;
        color: var(--text-primary);
      }
    }

    .results-section {
      border-top: 1px solid var(--neutral);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
      padding: 1rem;
      height: 20rem;
      overflow-y: auto;

      .result-item {
        gap: 1rem;
        border-radius: 6px;
        height: 2.5rem;
        cursor: pointer;
        gap: 1rem;
        width: 100%;

        display: grid;
        grid-template-columns: 1rem 5rem 1fr;
        align-items: center;
        justify-content: start;

        &:hover {
          background-color: blue;
        }

        & > div {
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          justify-items: start;
        }


      }
    }
  }
}
</style>
