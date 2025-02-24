import { defineStore } from "pinia";
import { useNuxtApp, useCookie } from "#app";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    userProfile: useCookie("userData").value
      ? JSON.parse(useCookie("userData").value)
      : null,
    storeProfile: null,
    accessToken: useCookie("accessToken").value || null,
    subscription: null,
    isAuthenticated: !!useCookie("accessToken").value,
  }),

  actions: {
    async login(userData: UserProfile, token: string) {
      this.setAuth(token, userData);
    },

    logout() {
      this.clearAuth();
    },

    async setAuth(token: string, profile: UserProfile) {
      this.accessToken = token;
      this.userProfile = profile;
      this.isAuthenticated = true;

      useCookie("accessToken").value = token;
      useCookie("userData").value = JSON.stringify(profile);
    },

    clearAuth() {
      this.accessToken = null;
      this.userProfile = null;
      this.isAuthenticated = false;

      useCookie("accessToken").value = null;
      useCookie("userData").value = null;
    },

    async fetchProfile() {
      try {
        const { $api } = useNuxtApp();
        const response = await $api("/tenant-owner/profile");
        this.userProfile = response.body?.tenant_owner || null;

        useCookie("userData").value = JSON.stringify(this.userProfile);
      } catch (error) {
        return Promise.reject("خطأ في جلب الملف الشخصي");
      }
    },

    async fetchSubscription() {
      try {
        const { $api } = useNuxtApp();
        const response = await $api("/tenant-owner/subscription");
        this.subscription = response.body?.subscription || null;

        if (this.userProfile) {
          this.userProfile.is_expired = this.subscription?.is_expired || false;
          useCookie("userData").value = JSON.stringify(this.userProfile);
        }
      } catch (error) {
        return Promise.reject("خطأ في جلب بيانات الاشتراك");
      }
    },

    async updateProfile() {
      try {
        const { $api } = useNuxtApp();
        return await $api("/tenant-owner/profile", {
          method: "PATCH",
        });
      } catch (error) {
        return Promise.reject("خطأ في تحديث الملف الشخصي");
      }
    },

    async fetchStore() {
      try {
        const { $api } = useNuxtApp();
        const response = await $api("/tenant-owner/tenant");
        this.storeProfile = response.body?.tenant || null;
      } catch (error) {
        return Promise.reject("خطأ في جلب بيانات المتجر");
      }
    },
  },
});

export default useAuthStore;
