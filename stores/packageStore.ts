import { defineStore } from 'pinia'

export const usePackageStore = defineStore('package', {
  state: () => ({
    selectedPackage: {},
  }),
  actions: {
    setPackage(packageDetails: Object): void {
      this.selectedPackage = packageDetails
    },
  },
})
