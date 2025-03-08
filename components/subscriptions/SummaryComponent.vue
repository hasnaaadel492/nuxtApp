<script lang="ts" setup>
import { useAuthStore } from "@/stores/authStore";
import CouponInput from "~/@core/components/CouponInput.vue";
import PackageCard from "@/components/packages/PackageCard.vue";
import { usePackageStore } from "@/stores/packageStore";
import { registerStore } from "@/stores/registerStore";

import SnakbarComponent from "@/@core/components/SnakbarComponent.vue";
import { useSnackbarStore } from "~/stores/useSnackbar";
const snackbarStore = useSnackbarStore();
import formatNumber from "@/@core/utils/formattedNumber";

const packageStore = usePackageStore();
const registerData = registerStore();
const selectedPackage = useCookie("packageDetails").value;
const route = useRoute();
const isRenewSubscriptionRoute = computed(() => {
  return route.path === "/subscriptions/renewSubscription";
});

const parentPackageTotals = ref({
  discount_amount: "",
  discounted_price: "",
  price: "",
  price_before_discount: "",
  tax: "",
  total: "",
  statusCode: "",
  packageStatus: "",
});

const handleUpdateTotals = (totals: typeof parentPackageTotals.value) => {
  parentPackageTotals.value = totals;
};

const auth = useAuthStore();

const isFormValid = ref(true);
const refForm = ref<VForm | null>(null);

const props = defineProps({
  activeStep: Number,
});

const emit = defineEmits(["updateActiveStep"]);

const emitBack = () => {
  emit("updateActiveStep", -1); // Decrement step if needed
};
const { $axios } = useNuxtApp();

const register = async () => {
  refForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      $axios
        .post("/tenant-owner/register_tenant", {
          tenant_owner: registerData.tenant_owner,
          tenant: registerData.tenant,
          subscription: registerData.subscription,
        })
        .then((res) => {
          snackbarStore.showSnackbar(res.data.message, res.data.status);

          registerData.$reset();

          setTimeout(() => {
            emit("updateActiveStep", 1); // Increment step
          }, 1000);

          const token = res.data.body.accessToken;
          const userData = res.data.body.tenant_owner;
          localStorage.setItem("accessToken", JSON.stringify(token));
          localStorage.setItem("userData", JSON.stringify(userData));

          auth.login(res.data.body.userProfile, token);
          auth.profile();
        })
        .catch((error) => {
          snackbarStore.showSnackbar(
            error.response.data.message,
            error.response.data.status
          );
        });
    }
  });
};
</script>

<template>
  <div class="summary">
    <!-- Package Card -->
    <SnakbarComponent />

    <div class="packageCard mb-6">
      <PackageCard :package="selectedPackage" :is-center="true" />
    </div>

    <div class="coupon-input">
      <CouponInput @update-totals="handleUpdateTotals" />
    </div>

    <!-- Donatted line -->
    <div class="donatted-line" v-if="!isRenewSubscriptionRoute"></div>

    <!-- Total  -->
    <VForm ref="refForm" v-model="isFormValid" @submit.prevent="register()">
      <!-- Total After apply coupon -->
      <div
        v-if="parentPackageTotals.discount_amount != 0"
        class="total d-flex mt-3"
        style="flex-direction: column; gap: 20px"
      >
        <div
          class="d-flex"
          style="justify-content: space-between; padding: 3px 10px"
        >
          <h4>{{ $t("all_total") }}</h4>
          <h4>
            {{ formatNumber(parentPackageTotals.price_before_tax, "en-US") }}

            {{ $t("SAR") }}
          </h4>
        </div>
        <div
          class="d-flex"
          style="justify-content: space-between; padding: 3px 10px"
        >
          <h4 style="color: #34a134">{{ $t("discount_amount") }}</h4>
          <h4 style="color: #34a134">
            - {{ formatNumber(parentPackageTotals.discount_amount, "en-US") }}

            {{ $t("SAR") }}
          </h4>
        </div>
        <div
          class="d-flex"
          style="justify-content: space-between; padding: 3px 10px"
        >
          <h4>{{ $t("tax") }} 15%</h4>
          <h4>
            {{ formatNumber(parentPackageTotals.tax, "en-US") }}

            {{ $t("SAR") }}
          </h4>
        </div>

        <div
          class="d-flex"
          style="
            justify-content: space-between;
            padding: 3px 10px;
            border-radius: 10px;
            background: #ebebeb;
          "
        >
          <h4 style="font-family: Cairo-Bold">
            {{ $t("total") }}
          </h4>
          <h4 style="font-family: Cairo-Bold">
            {{ formatNumber(parentPackageTotals.total, "en-US") }}
            {{ $t("SAR") }}
          </h4>
        </div>
      </div>
      <!-- Total before apply coupon -->
      <div
        class="total d-flex mt-3"
        style="flex-direction: column; gap: 20px"
        v-else
      >
        <div
          class="d-flex"
          style="justify-content: space-between; padding: 3px 10px"
        >
          <h4>{{ $t("all_total") }}</h4>
          <h4>
            {{ formatNumber(selectedPackage.price_before_tax, "en-US") }}

            {{ $t("SAR") }}
          </h4>
        </div>

        <div
          class="d-flex"
          style="justify-content: space-between; padding: 3px 10px"
        >
          <h4>{{ $t("tax") }} 15%</h4>
          <h4>
            {{ formatNumber(selectedPackage.tax, "en-US") }}

            {{ $t("SAR") }}
          </h4>
        </div>
        <div
          class="d-flex"
          style="
            justify-content: space-between;
            padding: 3px 10px;
            border-radius: 10px;
            background: #ebebeb;
          "
        >
          <h4>{{ $t("total") }}</h4>
          <h4>
            {{ formatNumber(selectedPackage.total, "en-US") }} {{ $t("SAR") }}
          </h4>
        </div>
      </div>

      <div
        class="flex pt-6 justify-content-between gap-2"
        v-if="!isRenewSubscriptionRoute"
      >
        <button
          @click="emitBack"
          class="btn"
          type="button"
          style="border: 1.3px solid #157d99; background: #fff; color: #157d99"
        >
          {{ $t("back") }}
        </button>

        <button type="submit" class="btn subscribeAndPayBtn">
          {{ $t("subscribeAndPay") }}
        </button>
      </div>
    </VForm>
  </div>
</template>

<style lang="scss">
.summary {
  .donatted-line {
    border: 1px dotted #cbcbcb;
    margin-block-end: 40px;
    margin-block-start: 40px;
    margin-inline: auto;
  }

  .package-card {
    padding-block: 25px 15px !important;
  }

  .button-container,
  .v-list {
    display: none !important;
  }

  h4 {
    color: #000;
    font-family: Cairo-SemiBold;
    font-size: 23.62px;
    font-weight: 700;
    line-height: 47.06px;

    @media (max-width: 735px) {
      font-size: 18px;
    }

    @media (max-width: 360px) {
      font-size: 14px;
    }
  }
}
</style>
