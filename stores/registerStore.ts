// import notify from "@/@core/plugins/toast";
import { defineStore } from "pinia";
import { useAuthStore } from "@/stores/authStore"; // Keep this import

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
      package_id:
        typeof window !== "undefined"
          ? sessionStorage.getItem("packageId")
          : null,
    },
    package: {},
  }),

  actions: {
    setPackageId(packageId: any) {
      this.subscription.package_id = packageId;
      if (typeof window !== "undefined") {
        sessionStorage.setItem("packageId", packageId);
      }
    },

    async checkValidation() {
      try {
        await axios.post("/tenant-owner/validate_register_tenant", {
          tenant_owner: this.tenant_owner,
          tenant: {
            ...this.tenant,
            confirm_password: this.tenant.password,
          },
          subscription: this.subscription,
          password: this.tenant.password,
          password_confirmation: this.tenant.password_confirmation,
        });
      } catch (error) {
        // notify(error.response?.data?.message, error.response?.data?.status);
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

        // ✅ Use useCookie() for better security and persistence
        const accessToken = useCookie("accessToken", {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          secure: true, // Secure cookie (HTTPS only)
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
        auth.login(res.data.body.userProfile, token);
        await auth.profile(); // Ensure profile is fetched before continuing

        // ✅ Redirect after successful registration
        navigateTo("/dashboard"); // Change to your desired route
      } catch (error) {
        console.error("Registration failed:", error.response?.data?.message);
        // Optionally show a notification here
      }
    },
  },

  getters: {
    getPackageId: (state) => state.subscription.package_id,
  },
});
