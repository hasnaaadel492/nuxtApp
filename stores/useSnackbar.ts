import { defineStore } from "pinia";

export const useSnackbarStore = defineStore("snackbar", () => {
  const snackbar = ref(false);
  const responseMessage = ref("");
  const color = ref("red");

  const showSnackbar = (message: string, isSuccess: boolean = false) => {
    responseMessage.value = message;
    color.value = isSuccess ? "green" : "red";
    snackbar.value = true;
  };

  return { snackbar, responseMessage, color, showSnackbar };
});
