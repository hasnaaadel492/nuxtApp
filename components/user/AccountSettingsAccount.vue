<script lang="ts" setup>
import avatar1 from "@/assets/images/newLogo2.png";
import SnakbarComponent from "@/@core/components/SnakbarComponent.vue";
import { useSnackbarStore } from "~/stores/useSnackbar";
const snackbarStore = useSnackbarStore();

import { useAuthStore } from "@/stores/authStore";

import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
const lang = useCookie("lang").value;
const errors = ref<Record<string, string | undefined>>({
  name: undefined,
  slug: undefined,
  email: undefined,
  avatar: undefined,
  phone: undefined,
});

import {
  emailValidator,
  englishAlphaValidator,
  requiredValidator,
} from "@/@core/plugins/validators";
const { t } = useI18n();

// const userId = userDatas.id
// 👉 Store
const auth = useAuthStore();

const userData = ref({
  username: "",
  status: "",
  email: "",
  phone: "",
  avatar: avatar1,
});
const dialog = ref(false);

const subscription_status = ref(0);
const tenantStatus = ref("un_active");

const refInputEl = ref<HTMLElement>();
// const countryCode = userDatas.phone_utility.country
const refVForm = ref<VForm>();
const { $axios } = useNuxtApp();
// Update Method
const onFormSubmit = () => {
  const data = new FormData();
  if (!imageChanged.value) {
    data.append("avatar", "");
  } else {
    data.append("avatar", myAvater.value.file);
  }

  data.append("username", userData._rawValue.username);
  data.append("email", userData._rawValue.email);
  data.append("phone", userData._rawValue.phone);

  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid && userData.value.phone) {
      $axios
        .post("/tenant-owner/profile" + "?_method=patch", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })

        .then((response) => {
          getProfile();
          errors.value = {};

          snackbarStore.showSnackbar(
            response.data.message,
            response.data.status
          );
        })
        .catch((error) => {
          errors.value = error.response.data.body;
          snackbarStore.showSnackbar(
            error.response.data.message,
            error.response.data.status
          );
        });
    } else {
      errors.value.phone == "phone";
    }
  });
};

// changeAvatar function

const myAvater = ref();
const imageChanged = ref(false);

const maxSizeMB = 5;
const maxSizeBytes = maxSizeMB * 1024 * 1024;
const uploadImage = (e) => {
  const file = e.target.files[0];

  if (file.size > maxSizeBytes) {
    errors.value.image = "image_allowed_size";

    e.target.value = "";
    return;
  }

  if (file && file.type.startsWith("image/")) {
    myAvater.value = {
      file: e.target.files[0],
      src: URL.createObjectURL(e.target.files[0]),
    };
    imageChanged.value = true;
    errors.value.image = undefined;
  } else {
    snackbarStore.showSnackbar(
      useCookie("lang").value == "ar"
        ? "يجب تحديد صورة من نوع png,jpg,gif"
        : "Please select a image of type png,jpg,gif.",
      false
    );
  }
};
watch(
  () => auth.userProfile,
  (newProfile) => {
    userData.value = newProfile;
    subscription_status.value = newProfile.subscription_status;
    tenantStatus.value = newProfile.tenantStatus;
    useCookie("userData").value = newProfile;
  }
);

const getProfile = () => {
  auth.fetchProfile().catch((error) => {
    console.error("Failed to fetch profile:", error);
  });
};

onMounted(() => {
  getProfile();
});
</script>

<template>
  <div class="accountDetails">
    <SnakbarComponent />

    <VRow>
      <VContainer>
        <div style="position: relative; width: 100%">
          <!-- Overlay if payment is pending -->
          <div class="overlay" v-if="userData.status === 'un_active'"></div>

          <!-- VCard with overlay -->
          <VCard
            :title="$t('account_details')"
            style="width: 100% !important; background: #fff !important"
          >
            <VCardText class="lineCardText">
              <VRow>
                <VCol cols="12" md="11">
                  <div class="line"></div>
                </VCol>
              </VRow>
            </VCardText>

            <VCardText>
              <!-- 👉 Form -->
              <VForm class="mt-4" @submit.prevent="onFormSubmit" ref="refVForm">
                <VRow>
                  <VCol cols="12" md="1">
                    <div class="line"></div>
                  </VCol>
                  <VCardText class="d-flex">
                    <!-- 👉 Avatar -->

                    <VAvatar
                      v-if="imageChanged"
                      rounded
                      size="120"
                      class="me-5"
                      :image="myAvater"
                    />
                    <VAvatar
                      v-else
                      rounded
                      size="120"
                      class="me-5"
                      :image="userData.avatar ? userData.avatar : avatar1"
                    />

                    <!-- 👉 Upload Photo -->
                    <form
                      class="d-flex flex-column justify-center gap-4"
                      style="gap: 10px"
                    >
                      <div class="d-flex flex-wrap gap-4">
                        <VBtn
                          color="primary"
                          @click="refInputEl?.click()"
                          style="background: #157d99 !important"
                        >
                          <VIcon
                            icon="mdi-cloud-upload-outline"
                            class="d-sm-none"
                          />
                          <span class="d-none d-sm-block">{{
                            $t("upload_new_photo")
                          }}</span>
                        </VBtn>

                        <input
                          ref="refInputEl"
                          type="file"
                          name="file"
                          accept=".jpeg,.png,.jpg,.gif"
                          hidden
                          @change="uploadImage($event)"
                        />
                      </div>

                      <p class="mb-0 text-xs">
                        {{ $t("image_allowed") }}
                      </p>
                    </form>
                  </VCardText>

                  <VCol
                    cols="12"
                    md="12"
                    v-if="errors.image"
                    style="color: #db1414"
                  >
                    <p>{{ $t(errors.image) }} {{ maxSizeMB }} MB</p>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="12" md="7">
                    <div class="field-container">
                      <label>{{ t("name") }}</label>
                      <VTextField
                        type="text"
                        :placeholder="t('name')"
                        v-model="userData.username"
                        :rules="[requiredValidator(userData.username, t)]"
                        variant="outlined"
                      />
                    </div>
                  </VCol>
                </VRow>

                <VRow>
                  <VCol cols="12" md="7">
                    <div class="mb-5">
                      <div class="field-container mb-1">
                        <label>{{ t("phone_number") }}</label>
                      </div>
                      <MazPhoneNumberInput
                        style="
                          width: 100%;
                          color: #999 !important;
                          direction: ltr;
                        "
                        required
                        v-model:modelValue="userData.phone"
                        :noFlags="false"
                        countryCode="SA"
                        show-code-on-list
                        :only-countries="['SA']"
                        noSearch
                        orientation="responsive"
                        :translations="{
                          countrySelector: {
                            placeholder:
                              lang === 'ar' ? 'كود الدولة' : 'Country code',
                            error: 'Choose country',
                            searchPlaceholder: 'Search a country',
                          },
                          phoneInput: {
                            placeholder:
                              lang === 'ar' ? 'رقم الهاتف' : 'Phone number',
                            example: 'EX:',
                          },
                        }"
                      />
                      <span
                        v-if="errors.phone"
                        style="
                          display: block;
                          margin: 6px 14px;
                          color: #ff393a;
                          font-size: 12px;
                        "
                      >
                        {{ errors.phone ? errors.phone[2] : "" }}
                      </span>

                      <span
                        v-if="userData.phone === ''"
                        style="display: block; margin: 6px 14px; color: #ff393a"
                      >
                        {{ $t("field_required") }}
                      </span>
                    </div>
                  </VCol>
                </VRow>
                <VRow>
                  <VCol cols="12" md="7">
                    <div class="field-container">
                      <label>{{ t("email") }}</label>
                      <VTextField
                        type="text"
                        :placeholder="t('email')"
                        v-model="userData.email"
                        variant="outlined"
                        :rules="[
                          requiredValidator(userData.email, t),
                          emailValidator(userData.email, t),
                          englishAlphaValidator(userData.email, t),
                        ]"
                      />
                    </div>
                  </VCol>
                </VRow>

                <VRow>
                  <!-- 👉 Form Actions -->
                  <VCol
                    cols="12"
                    class="d-flex flex-wrap gap-4"
                    style="gap: 10px"
                  >
                    <VBtn
                      type="submit"
                      @click="dialog = true"
                      style="background: #157d99 !important; color: #fff"
                    >
                      {{ $t("save_changes") }}
                    </VBtn>

                    <VBtn
                      color="secondary"
                      variant="outlined"
                      type="reset"
                      @click.prevent="getProfile"
                    >
                      {{ $t("reset") }}
                    </VBtn>
                  </VCol>
                </VRow>
              </VForm>
            </VCardText>
          </VCard>
        </div>
      </VContainer>
    </VRow>
  </div>
</template>

<style lang="scss">
.m-input-wrapper {
  inline-size: 100% !important;
}

.accountDetails {
  .v-card {
    border-radius: 16px;
    box-shadow: 0 4px 24px 0 #0000000f !important;
  }

  .v-card-title {
    color: #5e5873;
    font-family: Cairo-Regular;
    font-size: 18px;
    font-weight: 400;
    line-height: 33.73px;
  }

  .lineCardText {
    padding-inline: 0;

    .line {
      background: #ebe9f1;
      block-size: 1.3px;
      padding-inline: 0;
    }
  }

  .m-phone-number-input {
    inline-size: 100%;
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

    &:focus-visible {
      border: 0 !important;
      outline: 0 !important;
    }

    input {
      border: 1px solid #cccc;
      color: #000;
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

    .v-field__outline {
      border: none !important;
      border-radius: 0 !important;
      outline: 0 !important;
    }

    .v-field--variant-outlined.v-field--focused .v-field__outline {
      border: 0 !important;
      outline: 0 !important;

      --v-field-border-width: 0 !important;
    }
  }

  .maz-rounded {
    border-radius: 0 !important;
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

  .overlay {
    position: absolute;
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 16px;
    background-color: rgb(254 254 254 / 46%);
    block-size: 100%;
    inline-size: 100%;
    inset-block-start: 0;
    inset-inline-start: 0;
  }
}
</style>
