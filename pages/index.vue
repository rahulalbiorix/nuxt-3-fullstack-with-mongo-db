<template>
  <section class="flex items-center justify-between mb-10">
    <h1 class="text-4xl font-extrabold">Summary</h1>
    <div>
      <USelectMenu v-model="selctedView" :options="transactionView" />
    </div>
  </section>

  <section
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 sm:gap-16 mb-10"
  >
    <Trend
      color="green"
      title="Income"
      :amount="incomeTotal"
      :last-amount="3000"
      :loading="isLoading"
    />
    <Trend
      color="green"
      title="Expense"
      :amount="expenseTotal"
      :last-amount="3000"
      :loading="isLoading"
    />
    <Trend
      color="green"
      title="Investments"
      :amount="4000"
      :last-amount="3000"
      :loading="isLoading"
    />
    <Trend
      color="green"
      title="Savings"
      :amount="4000"
      :last-amount="3000"
      :loading="isLoading"
    />
  </section>

  <section class="flex justify-between mb-10">
    <div>
      <h2 class="text-2xl font-extrabold">Transactions</h2>
      <div class="text-gray-500 dark:text-gray-400">
        You have {{ incomeCount }} incomes and {{ expenseCount }} expenses this
        period
      </div>
    </div>
    <div>
      <TransactionModel v-model="isOpen" @add-transaction="addTransaction" />
      <UButton
        icon="i-heroicons-plus-circle"
        color="white"
        variant="solid"
        class=""
        label="Add"
        @click="isOpen = true"
      ></UButton>
    </div>
  </section>

  <section v-if="!isLoading">
    <div
      v-for="(transactionsOnDay, date) in transactionsGroupedByDate"
      :key="date"
      class="mb-10"
    >
      <DailyTransactionSummary :date="date" :transactions="transactionsOnDay" />
      <Transaction
        v-for="transaction in transactionsOnDay"
        :key="transaction._id"
        :transaction="transaction"
        @delete-transaction="deleteTransaction"
      />
    </div>
    <!-- <Transaction />
    <Transaction />
    <Transaction /> -->
  </section>
  <section v-else>
    <USkeleton class="h-8 w-full mb-2" v-for="i in 4" :key="i" />
  </section>
</template>

<script setup lang="ts">
interface GroupedTransctions {
  [key: string]: Transaction[];
}

import { transactionView } from "~/constants";
import type { Transaction } from "~/types/transction.ts";

const selctedView = ref(transactionView[1]);
const supabase = useSupabaseClient();
const transactionsStore = useTransactionsStore();

const isLoading = ref<boolean>(false);

const isOpen = ref<boolean>(false);

const income = computed(() =>
  transactions.value.filter((t) => t.type === "Income")
);
const expense = computed(() =>
  transactions.value.filter((t) => t.type === "Expense")
);

const incomeCount = computed(() => income.value.length);
const expenseCount = computed(() => expense.value.length);

const incomeTotal = computed(() =>
  income.value.reduce((sum, trans) => sum + trans.amount, 0)
);
const expenseTotal = computed(() =>
  expense.value.reduce((sum, trans) => sum + trans.amount, 0)
);

const transactions = computed(() => transactionsStore.transactions);
await useAsyncData("transactions", async () => {
  isLoading.value = true;
  await transactionsStore.fetchTransactions();
  isLoading.value = false;
});

const transactionsGroupedByDate = computed(() => {
  let grouped: GroupedTransctions = {};

  for (const transaction of transactions.value) {
    const date = new Date(transaction.createdAt).toISOString().split("T")[0];
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(transaction);
  }
  return grouped;
});

const deleteTransaction = async (id: string) => {
  transactionsStore.deleteTransaction(id);
  isLoading.value = true;
  await transactionsStore.fetchTransactions();
  isLoading.value = false;
};
const addTransaction = async (data) => {
  transactionsStore.createTransaction(data);
};
</script>
