<template>
  <div
    class="grid grid-cols-2 py-4 border-b border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
  >
    <div class="flex items-center justify-between space-x-4">
      <div class="flex items-center space-x-1">
        <UIcon :name="icon" :class="iconColor" />
        <div>{{ transaction?.description }}</div>
      </div>
      <div>
        <UBadge color="white" v-if="transaction?.category">{{
          transaction?.category
        }}</UBadge>
      </div>
    </div>

    <div class="flex items-center justify-end space-x-2">
      <div>{{ currency }}</div>
      <div>
        <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
          <UButton
            color="white"
            variant="ghost"
            label="Options"
            trailing-icon="i-heroicons-ellipsis-horizontal"
            :loading="isLoading"
          />
        </UDropdown>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { Transaction } from "~/types/transction.ts";
const props = defineProps({
  transaction: Object as () => Transaction,
});

const emit = defineEmits(["delete-transaction"]);

const isIncome = computed(() => props.transaction?.type === "Income");

const icon = computed(() =>
  isIncome.value ? "i-heroicons-arrow-up-right" : "i-heroicons-arrow-down-left"
);

const iconColor = computed(() =>
  isIncome.value ? "text-green-600" : "text-red-600"
);
const { currency } = useCurrency(props.transaction?.amount);

const isLoading = ref<boolean>(false);

const items = [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit"),
    },
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: () => deleteTransaction(),
    },

    {
      label: "Add",
      icon: "i-heroicons-plus-20-solid",
      click: () => createTransaction(),
    },
  ],
];

const createTransaction = async () => {
  await $fetch("/api/transactions/create", {
    method: "POST",
    body: {
      amount: 1000,
      type: "Expense",
      description: "For grocery",
      category: "Food",
    },
  });
};

const deleteTransaction = () => {
  isLoading.value = true;
  emit("delete-transaction", props.transaction._id);
};
</script>
