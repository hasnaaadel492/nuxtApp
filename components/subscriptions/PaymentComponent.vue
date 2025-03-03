<script lang="ts" setup>
import { onMounted } from "vue";

// Set the text direction based on the language preference
const lang = useCookie("lang").value;
const packageId = useCookie("packageId").value;
const couponCode = useCookie("couponCode").value;
const newTotalAfterDiscount = ref(useCookie("NewTotalAfterDiscount").value);
const packageDetails = useCookie("packageDetails").value || "{}";

const direction = lang == "ar" ? "rtl !important" : "ltr !important";

const { $axios } = useNuxtApp();

// Function to save payment ID to your server
const callBackFunction = (payment: any): Promise<void> => {
  return $axios.post("/payment/store-payment-id", {
    payment: payment,
  });
};

// Initialize Moyasar with configuration
const initMoyasar = () => {
  const publishableKey = import.meta.env.VITE_MOYASAR_PUBLISHABLE_KEY;
  if (!publishableKey) {
    console.error("Publishable API Key is missing");
    return;
  }

  const callbackUrl = import.meta.env.VITE_MOYASAR_CALLBACK;

  Moyasar.init({
    element: ".mysr-form",
    amount: newTotalAfterDiscount.value
      ? parseFloat(newTotalAfterDiscount.value) * 100
      : (packageDetails?.total || 0) * 100,

    currency: "SAR",
    description: "description",
    publishable_api_key: publishableKey,
    callback_url: callbackUrl,
    methods: ["creditcard"],
    language: lang === "en" ? "en" : "ar",
    country: "SA",

    on_completed: (payment: any) => {
      return new Promise<void>((resolve, reject) => {
        // Add a new key 'packageId' to the payment object
        payment["package_id"] = packageId;
        payment["coupon_code"] = couponCode;
        callBackFunction(payment)
          .then(() => resolve())
          .catch(() => reject());
        snaptr("track", "SUBSCRIBE", {
          price: newTotalAfterDiscount.value
            ? parseFloat(newTotalAfterDiscount.value) * 100
            : (packageDetails?.total || 0) * 100,
          currency: "SAR",
          transaction_id: "INSERT_TRANSACTION_ID",
          number_items: "INSERT_NUMBER_ITEMS",
          uuid_c1: "INSERT_UUID_C1",
          user_email: "INSERT_USER_EMAIL",
          user_phone_number: "INSERT_USER_PHONE_NUMBER",
          user_hashed_email: "INSERT_USER_HASHED_EMAIL",
          user_hashed_phone_number: "INSERT_USER_HASHED_PHONE_NUMBER",
        });
      });
    },

    on_failed: (error) => {
      console.error("Payment failed:", error);
    },

    translations: {
      ar: {
        "error.authentication_error":
          "خطأ في عملية المصادقة ، خدمة الدفع غير متوفرة حاليًا",
        "error.authorization_error":
          "خطأ في عملية التحقق من الصلاحيات ، خدمة الدفع غير متوفرة حاليًا",
        "error.network": "خطأ في محاولة الإتصال",
        "error.unknown": "حصل خطأ غير معروف",
        "error.invalid_mobile": "رقم الجوال غير صحيح",
        "error.invalid_otp": "رمز التحقق غير صحيح",
        "error.invalid_request_error": "طلب عملية الدفع غير صحيح",
        "error.mobile_not_registered": "رقم الجوال غير مسجل",
        "error.account_inactive_error": "حساب البائع غير فعال",
        "error.invalid_name": "يجب إدخال الإسم الأول والأخير",
        "error.unsupported_cc_type": "نوع البطاقة الإئتمانية غير مدعوم",
        "error.invalid_cc_number": "رقم البطاقة الإئتمانية غير صحيح",
        "error.invalid_date": "تاريخ الإنتهاء غير صحيح",
        "error.invalid_month": "شهر الإنتهاء غير صحيح",
        "error.invalid_year": "سنة الإنتهاء غير صحيحة",
        "error.invalid_csc": "رمز الأمان للبطاقة غير صحيح",
        "error.cant_start_payment":
          "حصل خطأ أثناء محاولة بدء عملية الدفع ، نرجوا المحاولة مره أخرى",
        "error.otp_time_out":
          "الوقت المسموح لإستخدام رمز التحقق إنتهى ، نرجوا المحاولة مره أخرى",
        "error.api_error":
          "حدث خطأ أثناء محاولة الإتصال ، يرجى تحديث الصفحة و المحاولة مره أخرى.",

        "error.m070": "3Ds غير مسموح للبائع إستخدام ميزة التحقق الثلاثي",
        "error.m071":
          "3Ds يجب على البائع إستخدام ميزة التحقق الثلاثي لإستقبال المدفوعات",
        "error.m072": "لا يوجد للبائع حساب بنكي فعال",
        "error.m074":
          "بطاقة الإئتمان تم إصدارها من أحد البلدان الغير مسموح لها بالدفع هنا",
        "error.m075": "لا يمكن للبائع إستخدام خدمة الفوترة",
        "error.m076": "لا يمكن للبائع إستخدام طريقة الدفع",
        "error.m077": "لإستقبال المدفوعات stc pay لا يمكن للبائع إستخدام خدمة",

        "form.cc": "بطاقة الإئتمان",
        "form.code": "رمز التحقق",
        "form.mobile": "رقم الجوال",
        "form.otp": "رمز التحقق",
        "form.required": "مطلوب",
        "form.name_on_card": "الإسم على البطاقة",
        "form.last_name": "الإسم الأخير",
        "form.card_info": "معلومات بطاقة الإئتمان",
        "form.date": "تاريخ الإنتهاء",
        "form.csc": "رمز الأمان CVC",
        "form.or_pay_with_card": "أو إدفع بإستخدام بطاقتك الإئتمانية",
        "form.powered_by": "خدمة الدفع مقدمة من قبل",
        "form.save_card_notice": ".سيتم حفظ بيانات البطاقة عند إتمام العملية",

        "button.pay": "إدفع",
        "button.verify": "تحقق",
        "button.proceed": "إتمام العملية",
        "button.cancel": "إلغاء",

        "validation.is_invalid": "قيمة :attr غير صحيحة",
        "validation.can_t_be_blank": "قيمة :attr مطلوبة",
        "validation.should_be_english_letters_only":
          "الإسم يجب أن يحتوي على حروف إنجليزية و مسافات فقط",
        "validation.first_and_last_name_required": "الإسم الأول والأخير مطلوب",

        "common.moyasar": "ميسر",
        "common.test_mode_disclaimer":
          "!وضع المدفوعات التجريبي ، الرجاء عدم إستخدامه في البيئة التشغيلية",

        "config.error.no_methods": "لا توجد أي وسيلة دفع متاحة",
        "config.error.no_networks": "لم يتم إعداد شبكات الدفع بشكل صحيح",
      },
      en: {
        "error.authentication_error":
          "Authentication error, service is unavailable now",
        "error.authorization_error":
          "Authorization error, service is unavailable now",
        "error.network": "Network Error",
        "error.unknown": "Unexpected error occurred",
        "error.invalid_mobile": "Invalid mobile number",
        "error.invalid_otp": "Invalid verification code",
        "error.invalid_request_error": "Invalid payment request",
        "error.mobile_not_registered": "Mobile number is not registered",
        "error.account_inactive_error": "Merchant account is not active",
        "error.invalid_name": "First and last names are required",
        "error.unsupported_cc_type": "Unsupported card type",
        "error.invalid_cc_number": "Invalid credit card",
        "error.invalid_date": "Invalid date",
        "error.invalid_month": "Invalid month",
        "error.invalid_year": "Invalid year",
        "error.invalid_csc": "Invalid CVC number",
        "error.cant_start_payment":
          "Error initiating payment, please try again later",
        "error.otp_time_out": "OTP time has finished, please try again",
        "error.api_error":
          "An error has occurred, please refresh the page and try again.",

        "error.m070": "Merchant is not allowed to transact in 3Ds",
        "error.m071":
          "Merchant is not allowed to transact directly without 3Ds",
        "error.m072": "Merchant does not have bank MID specified",
        "error.m074": "Credit card country is not allowed",
        "error.m075": "Merchant account is not subscribed to Moyasar invoices",
        "error.m076":
          "Merchant account is not allowed to use this payment method",
        "error.m077": "Merchant account can't use stc pay method",

        "form.cc": "Credit Card",
        "form.code": "Code",
        "form.mobile": "Mobile number",
        "form.otp": "Verification code",
        "form.required": "Required",
        "form.name_on_card": "Name on card",
        "form.last_name": "Last name",
        "form.card_info": "Card information",
        "form.date": "Expiry date",
        "form.csc": "CVC",
        "form.or_pay_with_card": "Or pay with card",
        "form.powered_by": "Powered by",
        "form.save_card_notice": "You card data will be saved upon submit.",

        "button.pay": "Pay",
        "button.verify": "Verify",
        "button.proceed": "Proceed",
        "button.cancel": "Cancel",

        "validation.is_invalid": "Invalid :attr",
        "validation.can_t_be_blank": ":attr is required",
        "validation.should_be_english_letters_only":
          "Name may only have English alphabet and spaces",
        "validation.first_and_last_name_required":
          "Both first and last name are required",

        "common.moyasar": "Moyasar",
        "common.test_mode_disclaimer":
          "Test Mode Enabled: Please do not use in production!",

        "config.error.no_methods": "No payment method available",
        "config.error.no_networks": "No networks configured",
        "config.error.no_amount": "Amount is not configured",
        "config.error.no_currency": "Currency is not configured",
        "config.error.no_country": "Country is not configured",
        "config.error.no_description": "Payment description is not configured",
        "config.error.no_api_key": "API key is not configured",
        "config.error.no_callback_url": "Callback URL is not configured",
        "config.error.no_applepay_label": "Apple Pay label is missing",
        "config.error.no_validate_merchant_url":
          "Apple Pay validate merchant URL is missing",
      },
    },
  });
};

onMounted(() => {
  const ccNameElement = document.getElementById("mysr-cc-name");

  if (ccNameElement) {
    ccNameElement.setAttribute("dir", direction);
  }
  const ccNumberElements = document.getElementsByClassName(
    "mysr-form-ccIconsGroup"
  );

  initMoyasar();
  snaptr("track", "ADD_BILLING", {
    price: newTotalAfterDiscount.value
      ? parseFloat(newTotalAfterDiscount.value) * 100
      : (packageDetails?.total || 0) * 100,
    currency: "SAR",
    uuid_c1: "INSERT_UUID_C1",
    user_email: "INSERT_USER_EMAIL",
    user_phone_number: "INSERT_USER_PHONE_NUMBER",
    user_hashed_email: "INSERT_USER_HASHED_EMAIL",
    user_hashed_phone_number: "INSERT_USER_HASHED_PHONE_NUMBER",
  });
});
</script>

<template>
  <div class="payment">
    <VRow>
      <VCol cols="12" md="12">
        <div class="personal-data-title">
          <h4>{{ $t("billing_data") }}</h4>
          <div class="line"></div>
        </div>
      </VCol>
    </VRow>
    <div class="mysr-form"></div>
  </div>
</template>

<style lang="scss">
#mysr-form-form-el#mysr-form-form-el#mysr-form-form-el.mysr-form-moyasarForm[payment-form="true"]
  .mysr-form-ccInputGroup
  .mysr-form-ccIconsGroup {
  inset-inline: auto !important;
  inset-inline-end: 5px !important;
}
.payment {
  .personal-data-title {
    margin-block-end: 30px;

    h4 {
      color: #000;
      font-family: Cairo-Bold;
      font-size: 23.62px;
      font-weight: 700;
      line-height: 47.06px;
    }

    .line {
      background-color: #157d99;
      block-size: 7.48px;
      inline-size: 59.92px;
      margin-block-start: 10px;
    }
  }

  .field-container {
    position: relative;
    margin-block-end: 30px;

    label {
      display: block;
      color: #4b4040;
      font-family: Cairo-Regular;
      font-size: 20.71px;
      font-weight: 400;
      line-height: 31.38px;
      margin-block-end: 8px;
      text-align: start;
    }

    .v-field__outline {
      border-radius: 0 !important;
    }

    input,
    textarea {
      border: 1px solid #cccc;
      inline-size: 100%;
      outline: 0;
      padding-block: 17px;
      padding-inline: 13px;

      &::placeholder {
        color: #cccc;
        font-size: 16px;
        font-weight: 500;
        line-height: 29.98px;
      }

      &:focus-visible {
        box-shadow: 0 0 34px 0 #00000012 !important;
        outline: 1px solid #72b6c4 !important;
      }
    }

    .confirmIcon {
      position: absolute;
      inset-block-start: 63%;
      inset-inline-end: 5px;
    }
  }

  .payment-method {
    .v-field {
      border-radius: 0 !important;
    }
  }
}

.card-input__input,
.mysr-form-input {
  flex: 1;
  border: 1px solid #ccc;
  block-size: 52px;
  color: 000;
  inline-size: 100%;
  outline: 0;
  padding-inline: 13px;

  &::placeholder {
    color: #000;
    font-size: 16px;
    font-weight: 500;
    line-height: 29.98px;
  }

  &:focus-visible {
    box-shadow: 0 0 34px 0 #00000012 !important;
    outline: 1px solid #72b6c4 !important;
  }

  &:last-child {
    margin-inline-end: 0;
  }
}

.payNowBtn {
  position: relative;
  display: inline-block;
  box-sizing: border-box;
  border-width: 0;
  border-radius: 24px;
  margin: 0;
  appearance: none;
  background: linear-gradient(142.84deg, #157d99 0%, #70a1e5 100%);
  block-size: 47px;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  inline-size: 100%;
  letter-spacing: 0;
  line-height: 1em;
  opacity: 1;
  outline: 0;
  text-align: center;
  text-decoration: none;
  text-rendering: geometricprecision;
  touch-action: manipulation;
  transition: opacity 30000ms cubic-bezier(0.694, 0, 0.335, 1),
    background-color 100ms cubic-bezier(0.694, 0, 0.335, 1),
    color 100ms cubic-bezier(0.694, 0, 0.335, 1);
  user-select: none;
  vertical-align: baseline;
  white-space: nowrap;

  @media (max-width: 500px) {
    block-size: 40px;
    font-size: 12px;
    inline-size: 100%;
  }
}

.card-icons {
  position: absolute;
  display: flex;
  gap: 5px;
  inset-block-start: 69%;
  inset-inline-end: 10px;
  transform: translateY(-50%);

  .card-icon {
    block-size: auto;
    inline-size: 30px;
  }
}

@media screen and (min-width: 768px) {
  #mysr-form-form-el#mysr-form-form-el#mysr-form-form-el.mysr-form-moyasarForm.mysr-form-fixedWidth {
    margin-inline: auto !important;
    max-inline-size: 70% !important;
  }
}

.mysr-form-input {
  border-radius: 2px !important;
  block-size: 45px !important;
}

#mysr-form-form-el#mysr-form-form-el#mysr-form-form-el.mysr-form-moyasarForm.mysr-form-fixedWidth {
  font-family: Cairo-Regular !important;
  max-inline-size: 100% !important;
}

.mysr-form-input {
  font-family: Cairo-Regular !important;
  font-size: 16px !important;
}

.mysr-form-label,
.mysr-form-requiredAlert {
  font-family: Cairo-Bold !important;
  font-size: 17px !important;
}

.mysr-form-requiredAlert {
  font-size: 12px !important;
}

#mysr-cc-name {
  &::placeholder {
    color: #fff !important;
  }
}
</style>
