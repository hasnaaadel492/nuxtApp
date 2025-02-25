<script lang="ts" setup>
import gsap from "gsap";
import ContactsInfo from "@/components/contactUs/ContactInfo.vue";
import SendMessage from "@/components/contactUs/SendMessage.vue";
import AppHeading from "@//@core/components/AppHeading.vue";
const subtitle = "contactUs";
const mainPargraph = "mainPargraph";

watchEffect(() => {
  const lang = useCookie("lang");

  // Function to format date based on language preference
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleString(lang.value === "en" ? "en-US" : "ar", options);
  };

  nextTick(() => {
    // Ensure `.contactUsComponent` exists before modifying children
    const contactUsComponent = document.querySelector(".contactUsComponent");

    if (contactUsComponent) {
      if (lang.value === "en") {
        const selectors = [".hero-circel1", ".hero-circel2"];

        selectors.forEach((selector) => {
          const elements = contactUsComponent.querySelectorAll(selector);

          if (elements.length > 0) {
            elements.forEach((element) => {
              element.style.transform = "rotate(180deg)";
            });
          } else {
            console.warn(`No elements found for selector: ${selector}`);
          }
        });
      }

      // GSAP Animations (Only run if elements exist)
      gsap.from(".hero-circel1", {
        duration: 1.5,
        x: -200,
        opacity: 0,
        ease: "power3.out",
      });

      gsap.from(".hero-circel2", {
        duration: 1.5,
        x: 200,
        opacity: 0,
        ease: "power3.out",
        delay: 0.5,
      });

      gsap.from(".contact", {
        duration: 1,
        y: 100,
        opacity: 0,
        ease: "power3.out",
        delay: 0.7,
      });
    } else {
      console.warn("`.contactUsComponent` not found in the DOM.");
    }
  });
});
</script>

<template>
  <div class="contactUsComponent">
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />
    <div class="d-flex contact" style="flex-direction: column">
      <!-- Start Heading -->
      <div class="d-flex justify-center align-center">
        <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
      </div>
      <!-- End Heading -->
      <VContainer>
        <VRow>
          <VCol cols="12" md="6" sm="12">
            <SendMessage />
          </VCol>
          <VCol cols="12" md="6" sm="12">
            <ContactsInfo />
          </VCol>
        </VRow>
      </VContainer>
    </div>
    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.contactUsComponent {
  position: relative;
  background-image: url("@/assets/images/hero1.svg") !important;
  background-repeat: no-repeat;
  background-size: contain;
  inline-size: 100%;
  padding-block-start: 82px;

  .hero-circel1 {
    position: absolute;
    inset-block-start: 15%;
  }

  .hero-circel2 {
    position: absolute;
    inset-block-start: 60%;
    inset-inline-end: 0;
  }

  .contact {
    margin: 0;

    .heading {
      h3,
      p {
        animation: none !important;
      }
    }
  }
}

@media (max-width: 787px) {
  .contactUsComponent {
    margin: 0;
    padding-block-start: 15px !important;

    .contactMessage h3,
    .contactInfo h3 {
      font-size: 27px !important;
    }
  }

  .hero-circel1,
  .hero-circel2 {
    display: none !important;
  }
}
</style>
