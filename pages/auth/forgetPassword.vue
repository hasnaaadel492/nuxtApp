<script lang="ts" setup>
import notify from "@/@core/plugins/toast"; // Make sure this path is correct

import {
  emailValidator,
  englishAlphaValidator,
  requiredValidator,
} from "@/@core/plugins/validators";
import { VForm } from "vuetify/components/VForm";
import MainButton from "@/@core/components/buttons/mainButton.vue";

const email = ref("");
const { t } = useI18n();
const router = useRouter();

const refVForm = ref<VForm>();

const forgetPassword = async () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid) {
      try {
        const response = await sendOtp(email.value);
        sessionStorage.setItem("email", email.value);
        // notify(response.message, response.status, 3000);

        setTimeout(() => {
          router.push("/auth/verification");
        }, 500);
      } catch (error) {
        // notify(error.message, error.status, 3000);
      }
    }
  });
};

const lang = useCookie("lang");

const symbolStyle = computed(() => {
  return lang.value == "en" ? { transform: "rotate(180deg)" } : {};
});

watchEffect(() => {
  const lang = useCookie("lang");

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
        class="forgetPassword"
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
          <div class="forget-header">
            <h4>{{ $t("returnPassword") }} 🔑</h4>
            <P>{{ $t("enter_email") }}</P>
          </div>
          <VForm @submit.prevent="forgetPassword" ref="refVForm">
            <div class="field-container">
              <label>{{ t("email") }}</label>

              <VTextField
                v-model="email"
                placeholder="johndoe@email.com"
                type="email"
                :rules="[
                  requiredValidator(email, t),
                  emailValidator(email, t),
                  englishAlphaValidator(email, t),
                ]"
                variant="outlined"
              />
            </div>

            <div class="submit_button">
              <MainButton :content="'send_for_render'" type="submit" />
            </div>
          </VForm>

          <div class="returnToLogin">
            <router-link to="/auth/login" class="forget_password">
              {{ $t("returnToLogin") }}

              <img
                src="@/assets/images/returnToLoginIcon.svg"
                :style="symbolStyle"
              />
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
    display: flex;
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

.forgetPassword {
  .v-card {
    padding: 40px;
    border-radius: 16px;
    background: #fff !important;
    box-shadow: 0 4px 24px 0 #0000000f !important;
    inline-size: 100%; /* Full width by default */
    margin-block: auto;
    margin-inline: auto; /* Center the card */
    max-inline-size: 600px;
    min-inline-size: 300px;

    @media (min-width: 768px) {
      inline-size: 500px; /* Fixed width for medium screens and above */
    }

    @media (max-width: 767px) {
      inline-size: 90%; /* Responsive width for smaller screens */
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

  .forget-header {
    h4 {
      color: #5e5873;
      font-family: Cairo-Bold;
      font-size: 18px;
      font-weight: 700;
      line-height: 33.73px;
    }

    p {
      color: #6e6b7b;
      font-family: Cairo-Regular;
      font-size: 14px;
      font-weight: 400;
      line-height: 25px;
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
      border: 1.5px solid #d8d6de;
      border-radius: 5px;
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
        outline: 1.5px solid #72b6c4 !important;
      }
    }
  }

  .returnToLogin {
    a {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 5px;
    }
  }
}
</style>
