<script setup lang="ts">
import { ref } from "vue";
const { $axios } = useNuxtApp();
const couponCode = ref("");
const ErrorMessage = ref("");
const SuccessMessage = ref("");
const selectedPackage = useCookie("packageDetails").value;

const newPackageTotals = ref({
  price_before_tax: "",
  discount_amount: "",
  discounted_price: "",
  price: "",
  price_before_discount: "",
  tax: "",
  total: "",
  statusCode: "",
  packageStatus: true,
});
const showApplyBtn = ref(true);
const showDeleteBtn = ref(false);
const emit = defineEmits(["update-totals"]);

const verifyCoupon = () => {
  if (couponCode.value) {
    $axios
      .post("/coupon/apply-coupon", {
        code: couponCode.value,
        model_id: selectedPackage.id,
        model_type: "packages",
      })

      .then((res) => {
        SuccessMessage.value = res.data.message;
        newPackageTotals.value.price = res.data.body.price;
        newPackageTotals.value.price_before_discount =
          res.data.body.price_before_discount;
        newPackageTotals.value.discount_amount = res.data.body.discount_amount;
        newPackageTotals.value.discounted_price =
          res.data.body.discounted_price;
        newPackageTotals.value.price_before_tax =
          res.data.body.price_before_tax;
        newPackageTotals.value.tax = res.data.body.tax;
        newPackageTotals.value.total = res.data.body.total;
        newPackageTotals.value.statusCode = res.data.custom_code;
        newPackageTotals.value.packageStatus = res.data.status;
        showApplyBtn.value = false;
        showDeleteBtn.value = true;
        useCookie("couponCode").value = couponCode.value;
        useCookie("NewTotalAfterDiscount").value = newPackageTotals.value.total;

        // Emit newPackageTotals to the parent
        emit("update-totals", newPackageTotals.value);
      })
      .catch((error) => {
        ErrorMessage.value = error.response.data.message;
        newPackageTotals.value.statusCode = error.response.data.custom_code;
        newPackageTotals.value.packageStatus = error.response.data.status;

        // Emit newPackageTotals to the parent

        emit("update-totals", newPackageTotals.value);
      });
  }
};

const deleteCoupon = () => {
  if (couponCode.value) {
    $axios
      .post("/coupon/apply-coupon", {
        model_id: selectedPackage.id,
        model_type: "packages",
      })

      .then((res) => {
        couponCode.value = "";
        SuccessMessage.value = res.data.message;
        newPackageTotals.value.price = res.data.body.price;
        newPackageTotals.value.price_before_discount =
          res.data.body.price_before_discount;
        newPackageTotals.value.discount_amount = res.data.body.discount_amount;
        newPackageTotals.value.discounted_price =
          res.data.body.discounted_price;
        newPackageTotals.value.price_before_tax =
          res.data.body.price_before_tax;

        newPackageTotals.value.tax = res.data.body.tax;
        newPackageTotals.value.total = res.data.body.total;
        newPackageTotals.value.packageStatus = res.data.status;
        showApplyBtn.value = true;
        showDeleteBtn.value = false;
        useCookie("couponCode").value = couponCode.value;
        useCookie("NewTotalAfterDiscount").value = newPackageTotals.value.total;

        // Emit newPackageTotals to the parent
        emit("update-totals", newPackageTotals.value);
      })
      .catch((error) => {
        ErrorMessage.value = error.response.data.message;
        newPackageTotals.value.packageStatus = error.response.data.status;
      });
  }
};

const resetCoupon = () => {
  couponCode.value = "";
  ErrorMessage.value = "";
  SuccessMessage.value = "";
  newPackageTotals.value = {
    discount_amount: "",
    discounted_price: "",
    price: "",
    price_before_discount: "",
    tax: "",
    total: "",
  };
};
</script>

<template>
  <div class="coupon-container">
    <div class="input-group">
      <div class="input-wrapper">
        <input
          type="text"
          v-model="couponCode"
          :placeholder="$t('enter_coupon_code')"
          class="coupon-input"
        />
        <button
          @click="resetCoupon"
          class="verify-icon"
          v-if="newPackageTotals.packageStatus == false"
        >
          <VIcon icon=" mdi-close-circle" />
        </button>
        <span
          @click="verifyCoupon"
          class="verify-text"
          role="button"
          tabindex="0"
          @keyup.enter="verifyCoupon"
          v-if="showApplyBtn"
        >
          {{ $t("verify") }}
        </span>

        <span
          v-if="showDeleteBtn"
          @click="deleteCoupon"
          class="delete-text"
          role="button"
          tabindex="0"
        >
          {{ $t("delete") }}
        </span>
      </div>
    </div>
    <p class="message-success" v-if="showDeleteBtn">
      {{ SuccessMessage }}
    </p>
    <p class="message-error" v-if="newPackageTotals.packageStatus == false">
      {{ ErrorMessage }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.coupon-container {
  margin-inline: 0;
  padding-block: 1rem;
}

.input-group {
  display: flex;
  justify-content: center;
  margin-block: 1rem;
  margin-inline: 0;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  inline-size: 100%;
}

.coupon-input {
  border: 1px solid #70a1e5; // Border width
  border-radius: 8px;
  background-color: transparent;
  block-size: 55px;
  color: inherit;
  font-family: inherit;
  font-size: 1em;
  font-weight: bold;
  font-weight: 500;
  inline-size: 100%;
  padding-block: 0.6em;
  padding-inline: 1.2em;
  padding-inline-end: 4.5em;
}

.coupon-input:focus-visible {
  border: 1px solid rgb(21, 125, 153);
  outline: 0;
}

.verify-text {
  position: absolute;
  color: #70a1e5;
  cursor: pointer;
  font-weight: 500;
  inset-inline-end: 1.2em;
  transition: color 0.2s ease;
  user-select: none;
}

.delete-text {
  position: absolute;
  color: #e9162c;
  cursor: pointer;
  font-weight: 700;
  inset-inline-end: 1.2em;
  transition: color 0.2s ease;
  user-select: none;
}

.verify-icon {
  position: absolute;
  color: #ccc;
  cursor: pointer;
  font-weight: 500;
  inset-inline-end: 4.3em;
  transition: color 0.2s ease;
  user-select: none;
}

.verify-text:hover {
  color: #70a1e5;
}

.message-success {
  color: #27b84e;
  font-size: 0.9em;
  margin-inline-start: 5px;
}

.message-error {
  color: #d81b1b;
  font-size: 0.9em;
  margin-inline-start: 5px;
}
</style>
