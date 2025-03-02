<script lang="ts" setup>
import { useSnackbarStore } from "~/stores/useSnackbar";

const snackbarStore = useSnackbarStore();
</script>

<template>
  <div>
    <!-- Global Snackbar -->
    <v-snackbar
      v-model="snackbarStore.snackbar"
      location="right bottom"
      :color="snackbarStore.color"
      timeout="2000"
    >
      {{ snackbarStore.responseMessage }}
    </v-snackbar>
  </div>
</template>

<style lang="scss" scoped></style>
