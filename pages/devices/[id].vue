<script lang="ts" setup>
import AppHeading from "@/@core/components/AppHeading.vue";
import loadingGif from "@/assets/images/newLogo2.png";
import { VIcon } from "vuetify/lib/components/index.mjs";
import NotFound from "~/@core/components/NotFound.vue";
import secondNotFound from "~/@core/components/secondNotFound.vue";

const subtitle = ref("");
const mainPargraph = "mainPargraph";

const route = useRoute();
const phoneNumber = useCookie("MainPhone").value;

const lang = useCookie("lang");

const message =
  lang.value == "en"
    ? '"Hello, I would like to purchase this device. Please provide me with details and payment method. Thanks!"'
    : "مرحبًا، أرغب في شراء هذا الجهاز. يرجى تزويدي بالتفاصيل وطريقة الدفع. شكرًا!";

const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  message
)} `;

const device_section = ref({});
const device_section_status = ref(1);
const errorDescription = ref();
const pageNotFound = ref(false);

const fetchDevice = async () => {
  try {
    const { $api } = useNuxtApp();
    const data = await $api<{
      body: {};
    }>(`/devices/devices/${route.params.id}`);
    device_section.value = data.body.devices;
    subtitle.value = data.body.devices.title;
    device_section_status.value = data.body.devices.is_active;
  } catch (error) {
    console.log(error);
    errorDescription.value = error.response.data.message;
    pageNotFound.value = true;
  }
};

onMounted(() => {
  fetchDevice();
});

watchEffect(() => {
  const lang = useCookie("lang");

  nextTick(() => {
    // Ensure `.deviceComponent` exists before modifying its children
    const deviceComponent = document.querySelector(".deviceComponent");

    if (deviceComponent && lang.value === "en") {
      const selectors = [".hero-circel1", ".hero-circel2"];

      selectors.forEach((selector) => {
        const elements = deviceComponent.querySelectorAll(selector);

        if (elements.length > 0) {
          elements.forEach((element) => {
            element.style.transform = "rotate(180deg)";
          });
        } else {
          console.warn(`No elements found for selector: ${selector}`);
        }
      });
    }

    // Stagger animation for `.blog-card` elements
    const cards = document.querySelectorAll(".blog-card");
    if (cards.length > 0) {
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add("visible");
        }, index * 200);
      });
    } else {
      console.warn("No `.blog-card` elements found in the DOM.");
    }
  });
});

const goToWhatsapp = () => {
  window.open(whatsappUrl, "_blank");
};
</script>

<template>
  <div class="deviceComponent">
    <div class="blogs">
      <div
        class="d-flex justify-center align-center"
        style="flex-direction: column"
      >
        <!-- Start Heading -->
        <AppHeading
          v-if="device_section_status == 1"
          :subtitle="subtitle"
          :mainPargraph="''"
          style="margin-block-end: 0 !important"
        />

        <!-- End Heading -->
      </div>
    </div>

    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />
    <div
      v-if="pageNotFound"
      class="d-flex"
      style="width: 100%; justify-content: center"
    >
      <NotFound :errorDescription="errorDescription" />
    </div>

    <VContainer v-else>
      <div class="blogsContainer">
        <VRow v-if="device_section_status == 1">
          <VCol cols="12" md="12" sm="12" class="blog-card">
            <div class="m-2 border-style">
              <div class="mb-3">
                <div
                  v-if="device_section.device_image"
                  class="blog-image"
                  :style="{
                    'background-image': `url(${device_section.device_image})`,
                  }"
                ></div>

                <div
                  v-else
                  class="blog-image-loader"
                  :style="{ backgroundImage: `url(${loadingGif})` }"
                ></div>
              </div>

              <div class="p-3">
                <!--   style="width: 100px; height: 100px" -->
                <p
                  class="mainPargraph text-start"
                  style="font-weight: 600; margin-block-end: 7px"
                >
                  {{ $t("device_details") }}
                </p>
                <div
                  class="mt-0 mb-1 text description"
                  v-html="device_section.description"
                ></div>
              </div>
              <div
                class="d-flex mt-4"
                style="
                  display: flex;
                  align-items: center;
                  justify-content: center;
                "
              >
                <button
                  class="button-48 buyButton"
                  role="button"
                  @click="goToWhatsapp()"
                  style="border-radius: 5px"
                >
                  <span
                    class="text"
                    style="display: inline-block; margin-inline: 6px"
                    >{{ $t("know-prices-and-buy") }}</span
                  >
                  <VIcon icon="mdi-whatsapp" style="margin-block-end: 3px" />
                </button>
              </div>
            </div>
          </VCol>
        </VRow>

        <VRow v-else class="">
          <VCol cols="12" md="12">
            <secondNotFound />
          </VCol>
        </VRow>
      </div>
    </VContainer>

    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
@import "https://db.onlinewebfonts.com/c/4cc366525d6a884e8b2adf7850636c70?family=GE+Dinar+One+Medium";

.deviceComponent {
  position: relative;
  background-image: url("@/assets/images/hero1.svg") !important;
  background-repeat: no-repeat;
  background-size: contain;
  inline-size: 100%;

  .hero-circel1,
  .hero-circel2 {
    position: absolute;
    animation: float 3s ease-in-out infinite;
  }

  .hero-circel1 {
    inset-block-start: 15%;
  }

  .hero-circel2 {
    inset-block-start: 60%;
    inset-inline-end: 0;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }

    50% {
      transform: translateY(-10px);
    }
  }

  .description {
    img {
      display: inline-block;
      block-size: 100px;
      inline-size: 100px;
      margin-block: 0;
      margin-inline: 5px;
    }
  }

  .buyButton {
    border-radius: 24px;
    background: linear-gradient(142.84deg, #157d99 0%, #70a1e5 100%);
    color: #fff;
    font-size: 14px;
    gap: 10px;
    padding-block: 9px;
    padding-inline: 26px;
    text-align: center;

    span {
      color: #fff !important;
      font-size: 14px;
      font-weight: 600 !important;
    }
  }

  .blog-card {
    padding: 2rem;
    border-radius: 8px 8px 0 0;
    animation: fadeIn 1.2s ease-in-out;
    margin-block-end: 1rem;
    opacity: 0;

    &.visible {
      opacity: 1;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }

      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .border-style {
      transition: 0.2s all ease-in-out;

      .blog-image {
        position: relative;
        border-radius: 20px;
        animation: zoomIn 1s ease-in-out;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        block-size: 349.21px;
        inline-size: 100%;

        &::before {
          position: absolute;
          border-radius: 20px;
          background: rgba(0, 0, 0, 50%);
          block-size: 349.21px;
          content: "";
          inline-size: 100%;
          inset: 0;
        }
      }

      @keyframes zoomIn {
        from {
          opacity: 0.8;
          transform: scale(0.8);
        }

        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .blog-image-loader {
        position: relative;
        border-radius: 20px;
        animation: pulse 1.5s infinite;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        block-size: 349.21px;
        inline-size: 100%;

        &::before {
          position: absolute;
          border-radius: 20px;
          background: rgba(0, 0, 0, 25%);
          block-size: 349.21px;
          content: "";
          inline-size: 100%;
          inset: 0;
        }
      }

      @keyframes pulse {
        0%,
        100% {
          opacity: 0.8;
        }

        50% {
          opacity: 1;
        }
      }
    }
  }

  .blogs {
    margin: 0;
    padding-block-start: 170px;

    .heading {
      h3,
      p {
        animation: fadeSlideUp 0.8s ease-in-out;
      }

      @keyframes fadeSlideUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    }
  }
}

@media (max-width: 787px) {
  .blogs {
    margin: 0;
    padding-block-start: 15px !important;
  }

  .hero-circel1,
  .hero-circel2 {
    display: none !important;
  }
}
</style>
