<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header> Add Transaction </template>
      <UForm ref="form" :state="state" :validate="validate" @submit="save">
        <UFormGroup
          :required="true"
          label="Transction Type"
          name="type"
          class="mb-4"
        >
          <USelect
            placeholder="Select the transction type"
            :options="types"
            v-model="state.type"
          />
        </UFormGroup>

        <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
          <UInput type="number" placeholder="Amount" v-model="state.amount" />
        </UFormGroup>

        <UFormGroup
          label="Transaction Date"
          :required="true"
          name="createdAt"
          class="mb-4"
        >
          <UInput
            type="date"
            icon="i-heroicons-calendar-days-20-solid"
            v-model="state.createdAt"
          />
        </UFormGroup>

        <UFormGroup
          label="Description"
          hint="Optional"
          name="description"
          class="mb-4"
        >
          <UInput placeholder="Description" v-model="state.description" />
        </UFormGroup>

        <UFormGroup
          :required="true"
          label="Category"
          name="category"
          class="mb-4"
        >
          <USelect
            placeholder="Category"
            :options="categories"
            v-model="state.category"
          />
        </UFormGroup>

        <UButton
          type="submit"
          class=""
          color="black"
          variant="solid"
          label="Save"
        />
      </UForm>
    </UCard>
  </UModal>
</template>
<script setup>
import { categories, types } from "~/constants";
const props = defineProps({
  modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue", "add-transaction"]);

const form = ref();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) resetForm();
    emit("update:modelValue", value);
  },
});

const initialState = {
  type: undefined,
  amount: 0,
  createdAt: undefined,
  description: undefined,
  category: undefined,
};
const state = reactive({ ...initialState });

const resetForm = () => {
  Object.assign(state, initialState);
  form.value.clear();
};

const validate = (state) => {
  const errors = [];
  if (!state.type) errors.push({ path: "type", message: "Required" });
  if (!state.amount) errors.push({ path: "amount", message: "Required" });
  if (!state.createdAt) errors.push({ path: "createdAt", message: "Required" });
  if (!state.category) errors.push({ path: "category", message: "Required" });
  return errors;
};

const save = async () => {
  emit("add-transaction", state);
  emit("update:modelValue", false);
};
</script>
