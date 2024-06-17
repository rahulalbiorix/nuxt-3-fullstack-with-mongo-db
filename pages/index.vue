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
      :amount="4000"
      :last-amount="3000"
      :loading="false"
    />
    <Trend
      color="green"
      title="Expense"
      :amount="4000"
      :last-amount="3000"
      :loading="false"
    />
    <Trend
      color="green"
      title="Investments"
      :amount="4000"
      :last-amount="3000"
      :loading="false"
    />
    <Trend
      color="green"
      title="Savings"
      :amount="4000"
      :last-amount="3000"
      :loading="false"
    />
  </section>
  <section>
    <div
      v-for="(transactionsOnDay, date) in transactionsGroupedByDate"
      :key="date"
      class="mb-10"
    >
      {{ typeof date }}
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

const transactions = computed(() => transactionsStore.transactions);
await useAsyncData("transactions", async () => {
  await transactionsStore.fetchTransactions();
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

const deleteTransaction = (id: string) => {
  transactionsStore.deleteTransaction(id);
};
</script>
