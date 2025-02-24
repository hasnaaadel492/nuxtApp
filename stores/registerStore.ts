import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { useCookie } from "#app";

export const registerStore = defineStore("registerStore", {
  state: () => ({
    tenant_owner: {
      username: "",
      email: "",
      phone: "",
    },
    tenant: {
      username: "",
      email: "",
      phone: "",
      address: "",
      description: "",
      slug: "",
      company_name: "",
      password: "",
      password_confirmation: "",
    },
    subscription: {
      package_id: useCookie("packageId").value || null, // ✅ Use cookies instead of sessionStorage
    },
    package: {},
  }),

  actions: {
    setPackageId(packageId: any) {
      this.subscription.package_id = packageId;
      useCookie("packageId").value = packageId; // ✅ Store package ID in cookies
    },

    async checkValidation() {
      try {
        const res = await $api("/tenant-owner/validate_register_tenant", {
          method: "POST",
          body: JSON.stringify({
            tenant_owner: this.tenant_owner,
            tenant: {
              ...this.tenant,
              confirm_password: this.tenant.password,
            },
            subscription: this.subscription,
          }),
        });
      } catch (error) {
        console.error("Validation error:", error.response?.data?.message);
      }
    },

    async register() {
      try {
        const res = await $api("/tenant-owner/register_tenant", {
          method: "POST",
          body: JSON.stringify({
            tenant: {
              ...this.tenant,
              confirm_password: this.tenant.password,
            },
            subscription: this.subscription,
          }),
        });

        const token = res.data.body.accessToken;
        const userData = res.data.body.tenant_owner;

        // ✅ Use cookies for authentication
        const accessToken = useCookie("accessToken", {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          secure: true,
          sameSite: "strict",
        });

        const userCookie = useCookie("userData", {
          maxAge: 60 * 60 * 24 * 7,
          secure: true,
          sameSite: "strict",
        });

        // ✅ Store token & user data in cookies
        accessToken.value = token;
        userCookie.value = userData;

        // ✅ Use auth store to manage login
        const auth = useAuthStore();
        auth.login(userData, token);
        await auth.fetchProfile(); // Fetch profile data after login

        // ✅ Redirect after successful registration
        navigateTo("/dashboard"); // Adjust route as needed
      } catch (error) {
        console.error("Registration failed:", error.response?.data?.message);
      }
    },
  },

  getters: {
    getPackageId: (state) => state.subscription.package_id,
  },
});
