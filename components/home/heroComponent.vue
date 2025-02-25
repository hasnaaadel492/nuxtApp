<script lang="ts" setup>
import { watchEffect, nextTick } from "vue";

const buttonContent = "joinUs";
const props = withDefaults(defineProps<Props>(), {
  header: () => ({
    title: "",
    description: "",
    image: "",
  }),
});

interface header {
  title: string;
  description: string;
  image: null;
}

interface Props {
  header?: header;
}

watchEffect(() => {
  const lang = useCookie("lang");

  nextTick(() => {
    if (lang.value === "en") {
      const heroComponent = document.querySelector(".HeroComponent");

      if (!heroComponent) {
        console.warn("HeroComponent not found in the DOM");
        return;
      }

      const selectors = [".hero-circel1", ".hero-circel2"];

      selectors.forEach((selector) => {
        const elements = heroComponent.querySelectorAll(selector);

        if (elements.length > 0) {
          elements.forEach((element) => {
            element.style.transform = "rotate(180deg)";
          });
        } else {
          console.warn(`No elements found for selector: ${selector}`);
        }
      });
    }
  });
});
</script>

<template>
  <div class="HeroComponent">
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />
    <div
      class="d-flex justify-center align-center hero"
      style="flex-direction: column"
    >
      <div
        class="heading d-flex align-center"
        data-aos="fade-down"
        data-aos-offset="0"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
        data-aos-mirror="true"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
      >
        <h3>{{ props.header.title }}</h3>
        <p>{{ props.header.description }}</p>
      </div>
      <div class="hero-button">
        <router-link to="/packages">
          <MainButton :content="buttonContent"
        /></router-link>
      </div>
      <div class="dashboardImage moveUpDown">
        <img :src="props.header.image" />
      </div>
    </div>
    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.HeroComponent {
  position: relative;
  background-image: url("@/assets/images/hero1.svg") !important;
  background-repeat: no-repeat;
  background-size: contain;
  block-size: 100%;
  inline-size: 100%;

  .hero-circel1 {
    position: absolute;
    inset-block-start: 15%;
  }

  .hero-circel2 {
    position: absolute;
    inset-block-start: 40%;
    inset-inline-end: 0;
  }

  .hero-button {
    block-size: 55px !important;
    inline-size: 203px !important;
    margin-block-start: 60px;

    div {
      block-size: 100%;
      inline-size: 100%;

      .button-48 {
        border-radius: 27.5px;
        margin: 0 !important;
        block-size: 100% !important;
        inline-size: 100% !important;

        span {
          font-family: Cairo-Bold;
          font-size: 14px;
          font-weight: 700;
          line-height: 26.24px;
        }
      }
    }
  }

  .heading {
    flex-direction: column;
    gap: 12px;
    inline-size: 45%;
    margin-block-start: 170px;

    h3 {
      color: #000;
      font-family: Cairo-Bold;
      font-size: 48px;
      font-weight: 700;
      line-height: 89.95px;
      text-align: center;
    }

    p {
      color: #000;
      font-family: Cairo-Medium;
      font-size: 20px;
      font-weight: 500;
      line-height: 37.48px;
      text-align: center;
    }
  }

  .dashboardImage {
    margin: auto;

    img {
      inline-size: 100%;
    }
  }

  .moveUpDown {
    animation: moveUpDownAnimation 1.1s infinite alternate;
  }
}

@keyframes moveUpDownAnimation {
  0% {
    transform: translateY(50px); /* Start position */
  }

  100% {
    transform: translateY(90px); /* End position */
  }
}

@media (max-width: 787px) {
  .HeroComponent {
    .heading {
      inline-size: 80%;
      margin-block-start: 64px;

      h3 {
        font-size: 37px;
        line-height: 60px;
      }

      p {
        font-size: 16;
      }
    }

    .hero-circel2 {
      display: none;
    }

    .dashboardImage {
      margin-block: auto;
      margin-block-end: 25px;
      margin-inline: 5px;
      text-align: center;

      img {
        inline-size: 55%;
      }
    }
  }
}
</style>
