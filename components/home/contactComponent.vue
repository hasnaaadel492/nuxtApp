<script lang="ts" setup>
import notify from "@/@core/plugins/toast";
import MazPhoneNumberInput from "maz-ui/components/MazPhoneNumberInput";
const subtitle = "contactUs";
const mainPargraph = "mainPargraph";
const buttonContent = "send";
const lang = useCookie("lang");
const iconStyle = (color: any) => {
  return {
    backgroundColor: `${color} !important`,
  };
};

import addressIcon from "@/assets/images/icons/location.svg";
import emailIcon from "@/assets/images/icons/message.svg";
import phoneIcon from "@/assets/images/icons/phone.svg";
import { ref } from "vue";

const icons = [
  {
    key: "phone",
    icon: phoneIcon,
    color: "#E89271",
  },
  {
    key: "email",
    icon: emailIcon,
    color: "#F0C274",
  },
  {
    key: "address",
    icon: addressIcon,
    color: "#70A1E5",
  },
];
const getIcon = (key) => {
  return icons.find((icon) => icon.key === key);
};

const props = withDefaults(defineProps<Props>(), {
  contacts: () => ({
    address: "",
    email: "",
    phone: {
      main: "",
    },
  }),
});

interface contacts {
  address: string;
  email: string;
  phone: {
    main: string;
  };
}

interface Props {
  contacts?: contacts;
}

const showPhoneInput = ref(true);

const name = ref("");
const phone = ref("");
const email = ref("");
const message = ref("");

const form = ref(null); // Reference to the form

const sendMessage = async () => {
  if (name.value && email.value && message.value && phone.value) {
    try {
      const { $api } = useNuxtApp();

      const res = await $api.post("/support-ticket/support-tickets", {
        name: name.value,
        email: email.value,
        phone: phone.value,
        message: message.value,
      });

      // notify(res.data.message, res.data.status, '')
      showPhoneInput.value = false;
      setTimeout(() => {
        showPhoneInput.value = true;
      }, 1);

      name.value = "";
      email.value = "";
      message.value = "";
      phone.value = "";
      results.value = null;
    } catch (error) {
      // notify(error.response.data.message, error.response.data.status, '')
    }
  } else {
    notify(
      useCookie("lang").value === "ar"
        ? "يجب عليك إدخال البيانات لجميع الحقول ."
        : "Please fill in all required fields.",
      false,
      ""
    );
  }
};

const results = ref({});
</script>

<template>
  <div class="d-flex contact" style="flex-direction: column">
    <!-- Start Heading -->

    <div class="d-flex justify-center align-center">
      <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
    </div>

    <!-- End Heading -->

    <!-- Start:: contact info -->
    <VRow>
      <VCol cols="12" md="6" sm="12" class="contact-forms">
        <span class="card-title">{{ $t("send_to_us") }}</span>
        <VForm ref="form" class="single-contact" @submit.prevent="sendMessage">
          <div class="contact-form">
            <div class="input-container">
              <input
                :placeholder="$t('name')"
                class="input-field2"
                type="text"
                v-model="name"
                required
              />
              <label for="name" class="input-label">{{ $t("name") }}</label>
            </div>

            <div class="mb-1">
              <MazPhoneNumberInput
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
                v-if="showPhoneInput"
                style="
                  width: 100%;
                  height: 60px;
                  border-radius: 27px;
                  background: #f3f8f9;
                  color: #999 !important;
                  direction: ltr;
                "
                v-model="phone"
                :noFlags="'false'"
                countryCode="SA"
                show-code-on-list
                :only-countries="['SA']"
                noSearch
                orientation="row"
                required
              />
            </div>

            <div class="input-container">
              <input
                :placeholder="$t('email')"
                class="input-field2"
                type="email"
                v-model="email"
                required
              />
              <label for="email" class="input-label">{{ $t("email") }}</label>
            </div>

            <div class="input-container">
              <textarea
                :placeholder="$t('notes')"
                class="input-field2 textarea"
                v-model="message"
                required
              />
              <label for="notes" class="input-label">{{ $t("notes") }}</label>
            </div>

            <MainButton
              :content="buttonContent"
              class="buttonDiv"
              type="submit"
            />
          </div>
        </VForm>
      </VCol>
      <VCol cols="12" md="6" sm="12" class="contact-infos">
        <span class="card-title"> {{ $t("contact-info") }} </span>
        <div class="single-contact">
          <div class="contact-info">
            <div
              v-for="(contact, key) in props.contacts"
              class="single-contact-info"
              :key="key"
            >
              <div
                v-if="getIcon(key)"
                class="iconDiv"
                :style="iconStyle(getIcon(key).color)"
              >
                <img :src="getIcon(key).icon" />
              </div>
              <div class="info">
                <h6>{{ $t(key) }}</h6>
                <p v-if="key === 'phone'">{{ contact.main }}</p>
                <p v-else>{{ contact }}</p>
              </div>
            </div>
          </div>
        </div>
      </VCol>
    </VRow>
    <!-- End:: contact info -->
  </div>
</template>

<style lang="scss" scoped>
.contact {
  .card-title {
    display: block;
    color: #000;
    font-family: Cairo-Bold;
    font-size: 24px;
    font-weight: 700;
    line-height: 44.98px;
    margin-block-end: 17px;

    // margin-inline-start: 10px;
  }

  .single-contact {
    padding: 17px;
    border: 1px solid #157d99;
    border-radius: 48px;
    block-size: 85%;
    inline-size: 100%;

    .contact-form,
    .contact-info {
      display: flex;
      flex-direction: column;
      padding: 5px;
      gap: 14px;

      input {
        border-radius: 30px !important;
      }

      textarea {
        border-radius: 32px !important;
        block-size: 104px;
      }

      .input-field2 {
        border: none;
        background-color: #f3f8f9;
        block-size: 60px !important;
        outline: 0;
        padding-block: 17px;
        padding-inline: 33px;

        &::placeholder {
          color: #000;
          font-size: 16px;
          font-weight: 500;
          line-height: 29.98px;
        }

        &:focus-visible {
          border: 1px solid #3a8cb8 !important;
        }
      }

      .textarea {
        block-size: 104px !important;
        padding-block-start: 23px;
      }

      .buttonDiv {
        block-size: 55px;
        inline-size: 120px;

        button {
          padding: 0;
          border-radius: 27.5px;
          margin: 0;
          block-size: 100%;
          font-family: Cairo;
          font-family: Cairo-Bold;
          font-size: 14px;
          font-weight: 700;
          inline-size: 100%;
          line-height: 26.24px;
          text-align: center;
        }
      }
    }

    .single-contact-info {
      display: flex;
      border-radius: 32px;
      background-color: #f3f8f9;
      gap: 10px;
      padding-block: 16px 0;
      padding-inline-start: 33px;

      .iconDiv {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        block-size: 64px;
        inline-size: 64px;
      }

      .info {
        h6 {
          color: #000;
          font-family: Cairo-Bold;
          font-size: 20px;
          font-weight: 700;
          line-height: 37.48px;
        }

        p {
          color: #000;
          font-family: Cairo-Medium;
          font-size: 16px;
          font-weight: 500;
          line-height: 29.98px;
        }
      }
    }

    /* Input container */
    .input-container {
      position: relative;
    }

    /* Input field */
    .input-field2 {
      display: block;
      padding: 10px;
      border: none;
      background-color: transparent;
      border-block-end: 2px solid #ccc;
      font-size: 16px;
      inline-size: 100%;
      outline: none;
    }

    /* Input label */
    .input-label {
      position: absolute;
      color: rgba(204, 204, 204, 0%);
      font-size: 15px;
      inset-block-start: 0;
      inset-block-start: 3px !important;
      inset-inline-start: 22px;
      margin-inline-start: 13px;
      pointer-events: none;
      transition: all 0.3s ease;
    }

    /* Input field:focus styles */
    .input-field2:focus + .input-label {
      color: #000;
      font-size: 12px;
      font-weight: 300;
      inset-block-start: -20px;
      line-height: 22.49px;
      margin-block-end: 2px;
    }

    .input-field2:focus::placeholder {
      color: transparent !important;
    }
  }
}

// Responsive Style

@media (max-width: 600px) {
  .card-title {
    font-size: 20px !important;
  }

  .contact .single-contact .input-field2 {
    font-size: 16px !important;
  }

  .contact .single-contact .input-label {
    font-size: 13px !important;
  }

  .info {
    h6 {
      font-size: 18px !important;
    }

    p {
      font-size: 14px !important;
    }
  }
}

@media (min-width: 1200px) {
  .contact-forms {
    animation: slideAnimation1 ease-in-out;
    animation-range-end: 500px;
    animation-range-start: cover;

    //animation-timeline: view();
  }

  .contact-infos {
    animation: slideAnimation2 ease-in-out;
    animation-range-end: 500px;
    animation-range-start: cover;

    // animation-timeline: view();
  }
}

@keyframes slideAnimation1 {
  0% {
    transform: translateX(400px);
  }

  100% {
    transform: translateX(0);
  }
}

@keyframes slideAnimation2 {
  0% {
    transform: translateX(-400px);
  }

  100% {
    transform: translateX(0);
  }
}
</style>

<style lang="scss">
.m-input-wrapper-right {
  display: none !important;
}

.contact-forms {
  .m-input-wrapper {
    border: 0 !important;
    border-radius: 0 !important;
    background: #f3f8f9 !important;
    block-size: 60px !important;
    inline-size: 88%;
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
}

.single-contact-info:last-of-type,
.single-contact-info:nth-of-type(4) {
  display: none !important;
}

@media (max-width: 500px) {
  .m-phone-number-input {
    margin-block-end: 30px !important;

    .m-country-selector {
      inline-size: 50px !important;
    }

    .m-input-wrapper {
      inline-size: 201px !important;
      margin-inline-start: 20px !important;
    }

    .m-country-selector .m-input-label {
      display: none !important;
    }
  }
}
</style>
