import { defineStore } from "pinia";
import { useNuxtApp } from "#app";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    userProfile: JSON.parse(localStorage.getItem("userData") || "null"),
    storeProfile: null,
    accessToken: localStorage.getItem("accessToken") || null,
    subscription: null,
    isAuthenticated: !!localStorage.getItem("accessToken"),
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
      localStorage.setItem("accessToken", token);
      localStorage.setItem("userData", JSON.stringify(profile));
    },

    clearAuth() {
      this.accessToken = null;
      this.userProfile = null;
      this.isAuthenticated = false;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userData");
    },

    async fetchProfile() {
      try {
        const { $api } = useNuxtApp();
        const response = await $api("/tenant-owner/profile");
        this.userProfile = response.body?.tenant_owner || null;
        localStorage.setItem("userData", JSON.stringify(this.userProfile));
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
          localStorage.setItem("userData", JSON.stringify(this.userProfile));
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
