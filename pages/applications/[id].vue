<script lang="ts" setup>
import loadingGif from "@/assets/images/newLogo2.png";

const subtitle = ref("");
const mainPargraph = "mainPargraph";

const route = useRoute();

const applications_section = ref({});

const fetchApplication = async () => {
  try {
    const { $api } = useNuxtApp();

    const data = await $api<{}>(
      `/applications-section/applications-section/${route.params.id}`
    );

    applications_section.value = data.body.applications_section;
    subtitle.value = applications_section.value.title;
  } catch (error) {
    console.error("Error fetching devices:", error);
  }
};

watchEffect(() => {
  fetchApplication();
});

onMounted(() => {
  const lang = localStorage.getItem("lang");
  if (lang === "en") {
    const selectors = [".hero-circel1", ".hero-circel2"];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(
        `.applicationComponent ${selector}`
      );

      elements.forEach((element) => {
        element.style.transform = "rotate(180deg)";
      });
    });
  }

  const cards = document.querySelectorAll(".blog-card");
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.classList.add("visible");
    }, index * 200); // Stagger the animations
  });
});
</script>

<template>
  <div class="applicationComponent">
    <div class="blogs">
      <div
        class="d-flex justify-center align-center"
        style="flex-direction: column"
      >
        <!-- Start Heading -->

        <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
        <!-- End Heading -->

        <!-- End:: Blogs -->
      </div>
    </div>

    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />

    <VContainer>
      <div class="blogsContainer">
        <VRow>
          <VCol cols="12" md="12" sm="12" class="blog-card">
            <div class="m-2 border-style">
              <div class="mb-3">
                <div
                  v-if="applications_section.applications_section_image"
                  class="blog-image"
                  :style="{
                    'background-image': `url(${applications_section.applications_section_image})`,
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
                <div
                  class="mt-0 mb-1 text description"
                  v-html="applications_section.description"
                ></div>
              </div>
            </div>
          </VCol>
        </VRow>
      </div>
    </VContainer>

    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
@import "https://db.onlinewebfonts.com/c/4cc366525d6a884e8b2adf7850636c70?family=GE+Dinar+One+Medium";

.applicationComponent {
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
