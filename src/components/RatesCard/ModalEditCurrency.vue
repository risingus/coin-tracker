<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ModalProps } from 'ant-design-vue'
import { useCurrencies } from '@/composables/useCurrencies'
import { useCurrenciesStore } from '@/stores/use-currencies-store'

interface ModalEditProps extends ModalProps {
	currency: Currency
	index: number
  onClose: () => void
}

interface CurrencySelection {
	code: string
	value: string
	name: string
}

const props = withDefaults(defineProps<ModalEditProps>(), {})

const { editCurrency } = useCurrenciesStore()

const { data: currencies } = useCurrencies()

const options = computed(() => {
  return currencies.value?.map((item) => ({
    ...item,
    value: item.code,
    label: `${item.code} - ${item.name}`
  }))
})

const fromDefault = props.currency?.from
	? { ...props.currency.from, value: props.currency.from.code }
	: { code: 'USD', name: 'US dollars', value: 'USD' }

const toDefault = {
	code: props.currency.code,
	value: props.currency.code,
	name: props.currency.name,
}

const from = ref<CurrencySelection | ''>(fromDefault)
const to = ref<CurrencySelection | ''>(toDefault)

function onFromSelect(code: string) {
	const currency = options.value?.find((item) => item.code === code)
	from.value = currency ? { ...currency, value: currency.code } : ''
}

function onToSelect(code: string) {
	const currency = options.value?.find((item) => item.code === code)
	to.value = currency ? { ...currency, value: currency.code } : ''
}

function handleEdit() {
	if (typeof props.index !== 'number') return
	if (!from.value) return
	if (!to.value) return
	editCurrency({ index: props.index, from: from.value, to: to.value })
  props.onClose()
}
</script>

<template>
	<a-modal
		v-bind="props"
		centered
		wrap-class-name="modal"
		ok-text="Salvar"
		cancel-text="Cancelar"
		@ok="handleEdit">
		<div class="flex flex-col gap-6">
      <strong class="text-base">Editar conversão</strong>
			<a-form>
				<a-form-item label="De" name="de" :label-col="{ span: 2 }">
					<a-auto-complete
						v-model:value="from"
						:options="options"
						filter-option
						placeholder="De"
						@select="onFromSelect" />
				</a-form-item>

				<a-form-item label="Para" name="para">
					<a-auto-complete
						v-model:value="to"
						:options="options"
						filter-option
						placeholder="Para"
						@select="onToSelect" />
				</a-form-item>
			</a-form>
		</div>
	</a-modal>
</template>
