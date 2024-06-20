import type { Transaction } from "~/types/transction";

export const useTransactionsStore = defineStore("transactionsStore", () => {
  const toast = useToast();
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

  async function createTransaction(data: Transaction) {
    console.log("data:store", data);
    try {
      await $fetch("/api/transactions/create", {
        method: "POST",
        body: { ...data },
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
      toast.add({
        title: "Deleted Successfully",
      });
    } catch (error) {
      console.log("error:", error);
    }
  }
  return {
    transactions,
    fetchTransactions,
    createTransaction,
    deleteTransaction,
  };
});
