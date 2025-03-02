<script lang="ts" setup>
import { registerStore } from "@/stores/registerStore";

import {
  confirmedValidator,
  emailValidator,
  passwordValidator,
  requiredValidator,
} from "@/@core/plugins/validators";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import SnakbarComponent from "@/@core/components/SnakbarComponent.vue";
import { useSnackbarStore } from "~/stores/useSnackbar";
const snackbarStore = useSnackbarStore();
const { t } = useI18n();

const isYourPasswordVisible = ref(false);
const isConfirmPasswordVisible = ref(false);
const showPhoneInput = ref(true);
const isFormValid = ref(true);
const refForm = ref<VForm | null>(null);
const lang = useCookie("lang").value;
// Form Errors
const errors = ref<Record<string, any | undefined>>({
  tenant: {
    slug: [],
    username: [],
    email: [],
    phone: [],
    company_name: [],
  },
  tenant_owner: {
    username: [],
    email: [],
    phone: [],
    address: [],
    description: [],
  },
});

const registerData = registerStore();

const props = defineProps({
  activeStep: Number,
});

const emit = defineEmits(["updateActiveStep"]);
const mapErrors = (apiErrors) => {
  const mappedErrors = {
    tenant: {
      slug: [],
      username: [],
      email: [],
      phone: [],
    },
    tenant_owner: {
      username: [],
      email: [],
      phone: [],
      address: [],
      description: [],
    },
  };

  Object.keys(apiErrors).forEach((key) => {
    const [mainKey, subKey] = key.split(".");
    if (mappedErrors[mainKey] && mappedErrors[mainKey][subKey]) {
      mappedErrors[mainKey][subKey] = apiErrors[key];
    }
  });

  return mappedErrors;
};

const { $axios } = useNuxtApp();

const validateForm = async () => {
  refForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      $axios
        .post("/tenant-owner/validate_register_tenant", {
          // tenant_owner: registerData.tenant_owner,
          tenant: registerData.tenant,
          subscription: registerData.subscription,
        })
        .then((response) => {
          emit("updateActiveStep", 1); // Increment step
        })
        .catch((error) => {
          window.scrollTo({ top: 400, behavior: "smooth" });
          snackbarStore.showSnackbar(
            error.response.data.message,
            error.response.data.status
          );

          // Map and assign errors
          errors.value = mapErrors(error.response.data.body);
        });
    } else {
      window.scrollTo({ top: 150, behavior: "smooth" });
    }
  });
};

const validateFormBlur = async () => {
  $axios
    .post("/tenant-owner/validate_register_tenant", {
      // tenant_owner: registerData.tenant_owner,
      tenant: registerData.tenant,
      subscription: registerData.subscription,
    })
    .then((response) => {
      emit("updateActiveStep", 1); // Increment step
    })
    .catch((error) => {
      errors.value.tenant.slug = mapErrors(
        error.response.data.body
      ).tenant.slug;
    });
};
</script>

<template>
  <VForm ref="refForm" v-model="isFormValid" @submit.prevent="validateForm()">
    <SnakbarComponent />

    <!-- Pos Data -->
    <div class="pos-data">
      <div class="pos-data-title">
        <h4>{{ $t("data") }}</h4>
        <div class="line"></div>
      </div>

      <div class="field-container">
        <label>{{ $t("company_name") }} *</label>
        <VTextField
          type="text"
          v-model="registerData.tenant.company_name"
          variant="outlined"
          :rules="[requiredValidator(registerData.tenant.company_name, t)]"
          :error-messages="errors.tenant.company_name"
          placeholder="ex:nabata"
        />
      </div>

      <div class="field-container">
        <label>{{ $t("username") }} *</label>
        <VTextField
          type="text"
          placeholder="ex:mohamed"
          v-model="registerData.tenant.username"
          :rules="[requiredValidator(registerData.tenant.username, t)]"
          :error-messages="errors.tenant.username"
          variant="outlined"
        />
      </div>

      <div class="pos-data-inputs">
        <div class="field-container">
          <label>{{ $t("tenant_website") }} *</label>
          <VTextField
            type="text"
            :placeholder="$t('englishRequiredName')"
            v-model="registerData.tenant.slug"
            :rules="[requiredValidator(registerData.tenant.slug, t)]"
            :error-messages="errors.tenant.slug"
            @update:model-value="validateFormBlur"
            :maxlength="10"
            variant="outlined"
          />

          <span
            v-if="registerData.tenant.slug"
            style="
              display: block;
              margin: 6px 14px;
              color: #555;
              font-size: 12px;
            "
          >
            {{ `https://${registerData.tenant.slug}.7l.sa` }}
          </span>
        </div>

        <div class="field-container mb-1">
          <label>{{ $t("phone_number") }} *</label>
        </div>

        <div class="mb-5">
          <MazPhoneNumberInput
            v-if="showPhoneInput"
            style="
              width: 100%;
              color: #999 !important;
              direction: ltr !important;
            "
            v-model:modelValue="registerData.tenant.phone"
            :noFlags="false"
            countryCode="SA"
            show-code-on-list
            :only-countries="['SA']"
            noSearch
            orientation="responsive"
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
          />
          <span
            style="
              display: block;
              margin: 6px 14px;
              color: #ff393a;
              font-size: 12px;
            "
          >
            {{
              errors.tenant.phone
                ? errors.tenant.phone[0] || errors.tenant.phone[1]
                : ""
            }}
          </span>
          <span
            style="
              display: block;
              margin: 6px 14px;
              color: #555;
              font-size: 12px;
            "
          >
            {{ t("phone_hint") }}
          </span>
        </div>

        <div class="field-container">
          <label>{{ t("email") }} *</label>
          <VTextField
            type="email"
            placeholder="ex:store@gmail.com"
            :error-messages="errors.tenant.email"
            v-model="registerData.tenant.email"
            :rules="[
              requiredValidator(registerData.tenant.email, t),
              ,
              emailValidator(registerData.tenant.email, t),
            ]"
            variant="outlined"
          />

          <span
            style="
              display: block;
              margin: 6px 14px;
              color: #555;
              font-size: 12px;
            "
          >
            {{ t("email_hint") }}
          </span>
        </div>

        <div class="field-container password-container">
          <label>{{ t("password") }} *</label>

          <VTextField
            v-model="registerData.tenant.password"
            :rules="[
              requiredValidator(registerData.tenant.password, t),
              passwordValidator(registerData.tenant.password, t),
            ]"
            placeholder="············"
            :type="isYourPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="
              isYourPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
            "
            @click:append-inner="isYourPasswordVisible = !isYourPasswordVisible"
            :error-messages="
              registerData.current_password_error
                ? [registerData.current_password_error]
                : []
            "
            variant="outlined"
          />
        </div>

        <div class="field-container password-container">
          <label>{{ t("password_confirmation") }} *</label>

          <VTextField
            :rules="[
              requiredValidator(registerData.tenant.password_confirmation, t),
              confirmedValidator(
                registerData.tenant.password,
                registerData.tenant.password_confirmation,
                t
              ),
            ]"
            v-model="registerData.tenant.password_confirmation"
            placeholder="············"
            :type="isConfirmPasswordVisible ? 'text' : 'password'"
            :append-inner-icon="
              isConfirmPasswordVisible
                ? 'mdi-eye-outline'
                : 'mdi-eye-off-outline'
            "
            @click:append-inner="
              isConfirmPasswordVisible = !isConfirmPasswordVisible
            "
            variant="outlined"
          />
        </div>
      </div>
    </div>
    <div class="flex pt-6 justify-content-end">
      <button type="submit" class="btn">
        {{ $t("next") }}
      </button>
    </div>
  </VForm>
</template>

<style lang="scss">
.m-phone-number-input.--responsive .m-phone-input {
  inline-size: 100% !important;
}

@mixin border-reset {
  border: none !important;
  border-radius: 0 !important;
  outline: 0 !important;
}

@mixin focus-visible {
  &:focus-visible {
    box-shadow: 0 0 34px 0 #00000012 !important;
    outline: 1px solid #72b6c4 !important;
  }
}

@mixin title-style {
  color: #000 !important;
  font-family: Cairo-Bold;
  font-size: 23.62px;
  font-weight: 700;
  line-height: 47.06px;
  margin-block-end: 30px;
}

@mixin placeholder-style {
  color: #cccc;
  font-size: 16px;
  font-weight: 500;
  line-height: 29.98px;
}

.m-select-list {
  display: none !important;
}

.field-container {
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
    @include border-reset;
  }

  .v-field--variant-outlined.v-field--focused .v-field__outline {
    @include border-reset;

    --v-field-border-width: 0.5px !important;
    --v-field-border-color: #72b6c4 !important;
  }

  input,
  textarea {
    border: 1px solid #cccc;
    inline-size: 100%;
    padding-block: 17px;
    padding-inline: 13px;

    @include focus-visible;

    &::placeholder {
      @include placeholder-style;
    }
  }

  textarea {
    block-size: 150px;
  }
}

.password-container {
  input {
    @include border-reset;
    @include focus-visible;
  }

  .v-field__outline {
    @include border-reset;
  }
}

.v-input--density-default .v-field__input {
  background-color: #fff !important;
}

.maz-rounded {
  border-radius: 0 !important;
}

.personal-data,
.pos-data {
  text-align: start;

  .personal-data-title,
  .pos-data-title {
    @include title-style;

    h4 {
      color: #000;
    }

    .line {
      background-color: #157d99;
      block-size: 7.48px;
      inline-size: 59.92px;
      margin-block-start: 10px;
    }
  }
}

@media (max-width: 425px) {
  .m-phone-number-input.--responsive
    .m-phone-input.--border-radius
    .m-input-wrapper {
    inline-size: 91%;
  }

  .m-phone-number-input {
    margin-block-end: 30px !important;

    .m-country-selector {
      inline-size: 50px !important;
    }

    .m-input-wrapper {
      inline-size: 100% !important;
      margin-inline-start: 0 !important;
    }

    .m-country-selector .m-input-label {
      display: none !important;
    }
  }

  #country-selector-flag-button-MazPhoneNumberInput-148 {
    inset-block-end: 4px;
  }
}

.m-input-wrapper-right {
  display: none !important;
}

.m-input-input {
  cursor: default !important;
}

.m-country-selector:not(.--no-flags)
  .m-country-selector__select
  .m-select-input
  input {
  cursor: default !important;
}
</style>
