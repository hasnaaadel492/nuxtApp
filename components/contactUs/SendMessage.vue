<script lang="ts" setup>
// import notify from "@/@core/plugins/toast";
import { emailValidator, requiredValidator } from "@/@core/plugins/validators";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import { ref } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();
const showPhoneInput = ref(true);
const phoneNumberValue = ref("");
const lang = useCookie("lang");

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString(lang.value == "en" ? "en-US" : "ar", options);
};
const name = ref("");
const phoneNumber = ref(null);
const email = ref("");
const message = ref("");
const results = ref({});
const refVForm = ref<VForm>();

const sendMessage = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    phoneNumberValue.value = "notEntered";

    if (isValid) {
      $api("/support-ticket/support-tickets", {
        method: "POST",
        body: {
          name: name.value,
          email: email.value,
          phone: phoneNumber.value,
          message: message.value,
        },
      })
        .then((res) => {
          // notify(res.message, res.status, "");
          showPhoneInput.value = false;
          setTimeout(() => {
            showPhoneInput.value = true;
          }, 1);

          // Reset form fields
          phoneNumber.value = null;
          name.value = null;
          email.value = null;
          message.value = null;

          // Clear results
          results.value = {};
        })
        .catch((error) => {
          // notify(error?.data?.message || "An error occurred", false, "");
        });
    }
  });
};

watch(
  () => phoneNumber.value, // Watching the value of `phoneNumber`
  (newValue) => {
    // Callback function that runs when `phoneNumber` changes
    if (newValue !== null) {
      phoneNumberValue.value = "";
    }
  }
);
</script>
<template>
  <div class="contactMessage">
    <div class="contactMessage-heading">
      <h3>{{ t("send_to_us") }}</h3>
    </div>
    <VForm class="mt-4" @submit.prevent="sendMessage" ref="refVForm">
      <div class="field-container">
        <label>{{ t("name") }}</label>
        <VTextField
          type="text"
          :placeholder="t('name')"
          v-model="name"
          :rules="[requiredValidator(name, t)]"
          variant="outlined"
        />
      </div>

      <div class="field-container mb-1">
        <label>{{ t("phone_number") }}</label>
      </div>

      <div class="field-container mb-5">
        <MazPhoneNumberInput
          v-if="showPhoneInput"
          :translations="{
            countrySelector: {
              placeholder: lang === 'ar' ? 'كود الدولة' : 'Country code',
              error: 'Choose country',
              searchPlaceholder: 'Search a country',
            },
            phoneInput: {
              placeholder: lang === 'ar' ? 'رقم الهاتف' : 'Phone number',
              example: 'EX:',
            },
          }"
          style="width: 100%; color: #999 !important; direction: ltr !important"
          v-model:modelValue="phoneNumber"
          :noFlags="'false'"
          countryCode="SA"
          show-code-on-list
          :only-countries="['SA']"
          noSearch
          orientation="responsive"
        />

        <span
          v-if="phoneNumberValue === 'notEntered'"
          style="
            display: block;
            margin: 6px 14px;
            color: #ff393a;
            font-size: 12px;
          "
        >
          {{ $t("field_required") }}
        </span>
      </div>

      <div class="field-container">
        <label>{{ t("email") }}</label>
        <VTextField
          type="email"
          :placeholder="t('email')"
          v-model="email"
          variant="outlined"
          :rules="[requiredValidator(email, t), emailValidator(email, t)]"
        />
      </div>

      <div class="field-container">
        <label>{{ t("Message") }}</label>
        <VTextarea
          type="text"
          variant="outlined"
          :placeholder="t('Message')"
          v-model="message"
          :rules="[requiredValidator(message, t)]"
        />
      </div>

      <MainButton :content="'send'" type="submit" />
    </VForm>
  </div>
</template>

<style lang="scss" scoped>
.contactMessage {
  background-color: #fff;
  box-shadow: 0 0 34px 0 #00000012;
  padding-block: 20px;
  padding-inline: 40px;

  h3 {
    color: #000;
    font-family: Cairo-Bold;
    font-size: 33.62px;
    font-weight: 700;
    line-height: 47.06px;
    margin-block-end: 34px;
    margin-block-start: 24px;
  }

  .field-container {
    margin-block-end: 30px;

    label {
      display: block;
      color: #4b4040;
      font-family: Cairo-Bold;
      font-size: 17.93px;
      font-weight: 700;
      line-height: 31.38px;
      margin-block-end: 8px;
    }

    .v-field__outline {
      border-radius: 0 !important;
    }

    input,
    textarea {
      border: none;
      outline: 0;
      padding-block: 17px;
      padding-inline: 13px;

      &::placeholder {
        color: #000;
        font-size: 16px;
        font-weight: 500;
        line-height: 29.98px;
      }

      &:focus-visible {
        border: 1px solid #72b6c4 !important;
        box-shadow: 0 0 34px 0 #00000012 !important;
        outline: 0;
      }
    }

    textarea {
      block-size: 154px;
    }
  }
}

.v-field__outline {
  border: 1px solid #f2f3f5;
}

.m-input-wrapper {
  border: 0 !important;
  border-radius: 0 !important;
  background: #f3f8f9 !important;
  block-size: 60px !important;
  inline-size: 95%;
  margin-inline-start: 15px !important;

  :focus-visible {
    border: 0 !important;
    border-radius: 0 !important;
  }

  .m-input-wrapper-input {
    border: 0 !important;
    border-radius: 0 !important;
  }
}

#country-selector-MazPhoneNumberInput-140,
#MazPhoneNumberInput-140 {
  border-radius: 0 !important;
}
</style>
<style lang="scss">
.m-input-wrapper-right {
  display: none !important;
}

.m-input,
.m-phone-input {
  block-size: 56px !important;
}

.m-input-wrapper {
  inline-size: 100% !important;
}

.m-phone-number-input.--responsive
  .m-phone-input.--border-radius
  .m-input-wrapper {
  inline-size: 100% !important;
}
</style>
