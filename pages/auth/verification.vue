<script lang="ts" setup>
import SubmitButton from "@/@core/components/buttons/submitButton.vue";
import notify from "@/@core/plugins/toast";
import { computed, onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";

const code = ref("");
const { t } = useI18n();
const router = useRouter();
const refVForm = ref<VForm>();
const counting = ref(false);
const countdownTime = 60000; // 1 minute in milliseconds

const remainingTime = computed(() => {
  const savedEndTime = sessionStorage.getItem("countdownEndTime");
  if (savedEndTime) {
    const endTime = parseInt(savedEndTime);
    const timeLeft = endTime - Date.now();

    if (timeLeft <= 0) {
      onCountdownEnd(); // Trigger countdown end when timeLeft reaches 0
      return 0;
    }
    return timeLeft;
  }
  return 0;
});

const startCountdown = (duration = countdownTime) => {
  const end = Date.now() + duration;
  sessionStorage.setItem("countdownEndTime", end.toString());
  counting.value = true;
};

const onCountdownEnd = () => {
  counting.value = false;
  sessionStorage.removeItem("countdownEndTime");
  remainingTime.value = 60000;
};

const verificationCode = async () => {
  refVForm.value?.validate().then(async ({ valid: isValid }) => {
    if (isValid && code.value) {
      const email = sessionStorage.getItem("email");

      try {
        const response = await verifyOtp(email, code.value);
        sessionStorage.setItem("sessionToken", response.body.token);
        notify(response.message, response.status);

        setTimeout(() => {
          router.push("/auth/resetPassword");
        }, 1000);
      } catch (error) {
        notify(error.message, error.status);
      }
    }
  });
};

const resendCode = async () => {
  code.value = "";
  const email = sessionStorage.getItem("email");

  try {
    const response = await resendOtp(email);
    notify(response.message, response.status);

    // Reset counting flag and countdown
    counting.value = false;
    sessionStorage.removeItem("countdownEndTime");
    startCountdown(); // Restart the countdown
  } catch (error) {
    notify(error.message, error.status);
  }
};

const useLang = () => useState("lang", () => "ar"); // Default language
const lang = useLang().value;
onMounted(() => {
  if (lang === "en") {
    const selectors = [".hero-circel1", ".hero-circel2"];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(`.auth ${selector}`);

      elements.forEach((element) => {
        element.style.transform = "rotate(180deg)";
      });
    });
  }

  // Initialize countdown based on saved end time or start a new countdown
  let savedEndTime = sessionStorage.getItem("countdownEndTime");

  if (savedEndTime) {
    const timeLeft = remainingTime.value;

    if (timeLeft > 0) {
      startCountdown(timeLeft);
    } else {
      onCountdownEnd();
      savedEndTime = "0";
    }
  } else {
    // No saved end time, start a new countdown
    startCountdown();
  }
});
</script>

<template>
  <div class="auth">
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />

    <div class="form_content">
      <div
        class="verificationCode"
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
            <h4 class="mb-2">{{ $t("twoFactors") }} 💬</h4>
            <P>{{ $t("email-sent") }}</P>
          </div>
          <VForm @submit.prevent="verificationCode" ref="refVForm">
            <div>
              <label class="mb-0" style="display: block">{{
                t("write_code")
              }}</label>
              <v-otp-input v-model="code" dir="ltr"></v-otp-input>
            </div>

            <div class="submit_button">
              <SubmitButton
                :content="'active_account'"
                type="submit"
                :class="{ 'no-drop': code.length < 6 }"
              />
            </div>
          </VForm>

          <div class="noHaveCode">
            <span>{{ $t("noHaveCode") }}</span>
            <button
              :disabled="counting"
              @click.prevent="resendCode"
              class="forget_password"
              style="color: #666cff; margin-inline-end: 5px"
            >
              {{ $t("resend") }}
            </button>

            {{ $t("or") }}
            <router-link
              to="/auth/forgetPassword"
              class="forget_password"
              style="margin-inline-start: 5px !important"
            >
              {{ $t("change_email") }}
            </router-link>
          </div>
          <div
            v-if="counting"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              color: #6e6b7b;
              font-size: 12px;
              gap: 5px;
              line-height: 15px;
              margin-block: 9px;
            "
          >
            <VIcon icon="mdi-alert-circle-outline" style="color: #70a1e5" />
            <vue-countdown
              @end="onCountdownEnd"
              :time="remainingTime"
              v-slot="{ totalSeconds }"
            >
              {{ $t("Please_wait") }}：{{ totalSeconds }}
              {{ $t("seconds_before_requesting_another") }}.
            </vue-countdown>
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
  padding-block-start: 240px;

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

.verificationCode {
  .v-card {
    padding: 40px;
    border-radius: 16px;
    background: #fff !important;
    box-shadow: 0 4px 24px 0 #0000000f !important;
    inline-size: 100%; /* Full width by default */
    margin-block: 0;
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
      color: #6e6b7b !important;
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

  .v-otp-input__content {
    max-inline-size: 100% !important;
    padding-inline: 0 !important;
  }

  .noHaveCode {
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 787px) {
      font-size: 12px !important;
    }

    span {
      display: inline-block;
      color: #6e6b7b;
      font-family: Cairo-Regular;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
      margin-inline-end: 5px;

      @media (max-width: 787px) {
        font-size: 12px !important;
      }
    }
  }
}

.no-drop {
  cursor: no-drop;
}

[disabled] {
  color: #bbb7cb !important;
}
</style>
