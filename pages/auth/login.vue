<script lang="ts" setup>
import { useAuthStore } from "~/stores/authStore";

import { useCookie } from "#imports";
import {
  emailValidator,
  englishAlphaValidator,
  requiredValidator,
} from "@/@core/plugins/validators";
import { VForm } from "vuetify/components/VForm";
import MainButton from "@/@core/components/buttons/mainButton.vue";

const email = ref("");
const password = ref("");
const isPasswordVisible = ref(false);

const { t } = useI18n();
const auth = useAuthStore();

const lang = useCookie("lang");
const route = useRoute();
const router = useRouter();

const errors = ref<Record<string, string | undefined>>({
  message: undefined,
});
const refVForm = ref<VForm>();

// Login service
const login = async () => {
  const validation = await refVForm.value?.validate();
  if (!validation?.valid) return;

  try {
    const { data, error } = await useFetch(
      "https://api-dev.7lerp.com/central/api/tenant-owner/login",
      {
        method: "POST",
        body: {
          email: email.value,
          password: password.value,
        },
        headers: {
          "X-Authorization":
            "UecYq9HzazyIjQ116v8E82VRLxotWPKiCm10gmH2kGF55EMN1TiBK5AhNq7rAa9k",
          "Content-Type": "application/json",
        },
      }
    );

    if (error.value) throw new Error(error.value?.message || "Login failed");

    const token = data.value?.accessToken;
    const userData = data.value?.user;
    if (!token) throw new Error("Invalid response from server");

    // Store token in cookies
    const accessToken = useCookie("accessToken", {
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
      sameSite: "strict",
    });
    const userCookie = useCookie("userData", {
      maxAge: 60 * 60 * 24 * 7,
      secure: true,
      sameSite: "strict",
    });

    accessToken.value = token;
    userCookie.value = userData;

    // Save token in localStorage
    localStorage.setItem("token", token);

    auth.login(userData, token);
    await auth.profile();

    router.replace(route.query.to ? String(route.query.to) : "/home");

    setTimeout(() => {
      window.location.reload();
    }, 50);
  } catch (error) {
    console.error("Login error:", error.message);
    errors.value.message = "login_cardinals";
    password.value = "";
  }
};

watchEffect(() => {
  const lang = useCookie("lang"); // Ensure lang is properly defined

  if (lang.value === "en") {
    nextTick(() => {
      const authComponent = document.querySelector(".auth");

      if (!authComponent) {
        console.warn("`.auth` component not found in the DOM.");
        return;
      }

      const selectors = [".hero-circel1", ".hero-circel2"];

      selectors.forEach((selector) => {
        const elements = authComponent.querySelectorAll(selector);

        if (elements.length === 0) {
          console.warn(`No elements found for selector: ${selector}`);
        } else {
          elements.forEach((element) => {
            element.style.transform = "rotate(180deg)";
          });
        }
      });
    });
  }
});
</script>

<template>
  <div class="auth">
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />

    <div class="form_content">
      <div
        class="login"
        data-aos="fade-in"
        data-aos-offset="0"
        data-aos-delay="0"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="true"
        data-aos-anchor-placement="top-center"
      >
        <VCard>
          <VCardText v-if="errors.message">
            <VAlert variant="tonal" color="error">
              {{ $t(errors.message) }}
            </VAlert>
          </VCardText>
          <VForm ref="refVForm" @submit.prevent="login">
            <div class="field-container">
              <label>{{ t("email") }}</label>

              <VTextField
                variant="outlined"
                v-model="email"
                placeholder="johndoe@email.com"
                type="email"
                :rules="[
                  requiredValidator(email, t),
                  emailValidator(email, t),
                  englishAlphaValidator(email, t),
                ]"
                :error-messages="errors.email"
              />
            </div>
            <div class="field-container password">
              <div class="d-flex justify-space-between">
                <label for="password">
                  {{ $t("password") }}
                </label>
                <router-link to="/auth/forgetPassword" class="forget_password">
                  {{ $t("forget_password") }}
                </router-link>
              </div>

              <VTextField
                variant="outlined"
                v-model="password"
                placeholder="············"
                :type="isPasswordVisible ? 'text' : 'password'"
                :error-messages="errors.password"
                :rules="[requiredValidator(password, t)]"
                :append-inner-icon="
                  isPasswordVisible ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />
            </div>

            <!-- <div class="field-container d-flex align-center">
              <VCheckbox v-model="rememberMe" />
              <label class="remember_me_label" for="remember_me"
                >{{ $t('remember_me') }} !</label
              >
            </div> -->
            <div class="submit_button">
              <MainButton :content="'login'" type="submit" />
            </div>
          </VForm>

          <div class="noHaveAccount">
            <span>{{ $t("noHaveAccount") }}</span>
            <router-link to="/packages" class="forget_password">
              {{ $t("createNewAccount") }}
            </router-link>
          </div>
        </VCard>
      </div>
    </div>

    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.auth {
  position: relative;
  background-image: url("@/assets/images/hero1.svg") !important;
  background-size: contain;
  inline-size: 100%;
  padding-block-start: 200px;

  @media (max-width: 768px) {
    padding-block-start: 50px;
  }

  .form_content {
    // display: flex;
    align-items: center;
    justify-content: center;
    inline-size: 100%;
  }

  .hero-circel1 {
    position: absolute;
    inset-block-start: 15%;
  }

  .hero-circel2 {
    position: absolute;
    inset-block-start: 60%;
    inset-inline-end: 0;
  }

  @media (max-width: 787px) {
    .hero-circel1,
    .hero-circel2 {
      display: none !important;
    }
  }
}

.login {
  margin-block: 20px;

  .v-text-field .v-field--no-label input {
    border: none !important;
  }

  .v-card {
    padding: 40px;
    border-radius: 16px;
    background: #fff !important;
    box-shadow: 0 4px 24px 0 #0000000f !important;
    inline-size: 100%;
    margin-block: 0;
    margin-inline: auto;
    max-inline-size: 600px;
    min-inline-size: 300px;

    @media (min-width: 768px) {
      inline-size: 500px;
    }

    @media (max-width: 767px) {
      inline-size: 90%;
    }
  }

  .form_logo {
    display: flex;
    align-items: center;
    justify-content: center;

    div {
      display: flex;
      align-items: center;
      justify-content: center;
      block-size: 70px;
      inline-size: 70px;
      margin-block: 15px 10px;

      img {
        block-size: 100%;
        inline-size: 100%;
      }
    }
  }

  .submit_button {
    display: flex;
    justify-content: center;
    margin: auto;

    div {
      inline-size: 100%;

      button {
        border-radius: 35px;
        inline-size: 100%;
        padding-block: 23px !important;

        &::before {
          border-radius: 35px !important;
        }
      }
    }
  }

  .field-container {
    margin-block-end: 30px;

    .forget_password {
      color: #7367f0;
      font-family: Cairo-Regular;
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
    }

    .remember_me_label {
      color: #6e6b7b;
      font-family: Cairo-Regular;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      margin-block-end: 0 !important;
    }

    label {
      display: block;
      color: #6e6b7b;
      font-family: Cairo-Regular;
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
      margin-block-end: 8px;
      text-align: start;
    }

    .v-field__outline {
      border-radius: 0 !important;

      &:focus-visible {
        border: 0 !important;
        outline: 0 !important;
      }
    }

    input {
      border: 1px solid #d8d6de;
      border-radius: 5px;
      color: #000;
      inline-size: 100%;

      // outline: 1px solid #6e6b7b;
      padding-block: 17px;
      padding-inline: 13px;

      &::placeholder {
        color: #cccc;
        font-size: 16px;
        font-weight: 500;
        line-height: 29.98px;
      }

      &:focus-visible {
        border: 0 !important;
        box-shadow: 0 0 34px 0 #00000012 !important;

        // outline: 1px solid #72b6c4 !important;
      }
    }
  }

  .noHaveAccount {
    display: flex;
    align-items: center;
    justify-content: center;

    span {
      display: inline-block;
      color: #6e6b7b;
      font-family: Cairo-Regular;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      margin-inline-end: 8px;
    }

    @media (max-width: 767px) {
      flex-direction: column !important;
    }
  }

  .lines {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 25px;
    margin-block: 20px;

    .line {
      background: #ebe9f1;
      block-size: 1.6px;
      inline-size: 100%;
    }

    .or {
      color: #6e6b7b;
      font-family: Cairo-Regular;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
    }
  }

  .social_buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;

    img {
      cursor: pointer;
    }
  }
}
</style>
