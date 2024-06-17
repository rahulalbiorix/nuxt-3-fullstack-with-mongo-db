import type { Transaction } from "~/types/transction";

export const useTransactionsStore = defineStore("transactionsStore", () => {
  const transactions: Ref<Transaction[]> = ref([]);

  async function fetchTransactions() {
    try {
      await $fetch("/api/transactions").then((res) => {
        transactions.value = res.data.length ? res.data : [];
      });
    } catch (error) {
      console.log("error:", error);
    }
  }

  async function deleteTransaction(id: string) {
    try {
      await $fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log("error:", error);
    }
  }
  return {
    transactions,
    fetchTransactions,
    deleteTransaction,
  };
});
