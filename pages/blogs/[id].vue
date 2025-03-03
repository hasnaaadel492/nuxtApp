<script lang="ts" setup>
import { useHead } from "@unhead/vue";
import { useRoute } from "vue-router";
import { useNuxtApp, useAsyncData, useCookie } from "#app";
import loadingGif from "@/assets/images/newLogo2.png";
import NotFound from "~/@core/components/NotFound.vue";

// Get route ID
const route = useRoute();
const subtitle = ref("");
const mainPargraph = "mainPargraph";
const errorDescription = ref();
const pageNotFound = ref(false);

// Fetch blog data using SSR-friendly `useAsyncData`
const { data: blog, error } = await useAsyncData(
  `blog-${route.params.id}`,
  async () => {
    const { $axios } = useNuxtApp();

    try {
      const response = await $axios(`/blog/blogs/${route.params.id}`);
      subtitle.value = response.data.body.blog.title;
      return response.data.body.blog; // ✅ Ensure you return data properly
    } catch (err) {
      errorDescription.value =
        err.response?.data?.message || "An error occurred";
      pageNotFound.value = true;
      return null; // ✅ Return `null` to handle the error gracefully
    }
  }
);

// Meta tags reactive state
const metaTags = computed(() => {
  return (
    blog.value?.search_engine_optimizations?.map((item) => ({
      name: item.name,
      content: item.content,
    })) || []
  );
});

// Set dynamic meta tags using `useHead`
useHead(() => ({
  title: blog.value?.title || "Blog Page",
  meta: metaTags.value,
}));

// Language handling
const lang = useCookie("lang");

// Format date function
const formatDate = (isoString: string) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleString(lang.value === "en" ? "en-US" : "ar", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Rotate elements if language is English (client-side only)
onMounted(() => {
  if (lang.value === "en") {
    nextTick(() => {
      const blogComponent = document.querySelector(".blogComponent");
      if (!blogComponent) return;

      [".hero-circel1", ".hero-circel2"].forEach((selector) => {
        blogComponent.querySelectorAll(selector).forEach((element) => {
          (element as HTMLElement).style.transform = "rotate(180deg)";
        });
      });
    });
  }
});
</script>

<template>
  <div class="blogComponent">
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
    <div
      v-if="pageNotFound"
      class="d-flex"
      style="width: 100%; justify-content: center"
    >
      <NotFound :errorDescription="errorDescription" />
    </div>
    <VContainer v-else>
      <div class="blogsContainer">
        <VRow>
          <VCol cols="12" md="12" sm="12" class="blog-card">
            <div class="m-2 border-style">
              <div class="mb-3">
                <div
                  v-if="blog.image"
                  class="blog-image"
                  :style="{ 'background-image': `url(${blog.image})` }"
                ></div>

                <div
                  v-else
                  class="blog-image-loader"
                  :style="{ backgroundImage: `url(${loadingGif})` }"
                ></div>
              </div>
              <div class="p-3">
                <div class="d-flex" style="align-items: center">
                  <div class="mb-1 title">{{ blog.category?.name }}</div>
                  <div class="mt-0 mb-1 date">
                    {{ formatDate(blog.created_at) }}
                  </div>
                </div>
                <!--   style="width: 100px; height: 100px" -->
                <div
                  class="mt-0 mb-1 text description"
                  v-html="blog.description"
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

.blogComponent {
  position: relative;
  background-image: url("@/assets/images/hero1.svg") !important;
  background-repeat: no-repeat;
  background-size: contain;
  inline-size: 100%;

  .hero-circel1 {
    position: absolute;
    inset-block-start: 15%;
  }

  .hero-circel2 {
    position: absolute;
    inset-block-start: 60%;
    inset-inline-end: 0;
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

    // background: var(--surface-card);
    font-family: Cairo !important;
    margin-block-end: 1rem;

    .border-style {
      box-sizing: border-box;

      // border: 1px solid #fff;
      border-radius: 8px !important;
      transition: 0.2s all ease-in-out;

      .blog-image {
        position: relative;
        border-radius: 20px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        block-size: 349.21px;
        inline-size: 100%;

        &::before {
          position: absolute;
          border-radius: 20px; /* Match the parent border-radius */
          background: rgba(0, 0, 0, 50%); /* Semi-transparent black */
          block-size: 349.21px;
          content: "";
          inline-size: 100%;
          inset: 0;
        }
      }

      .blog-image-loader {
        position: relative;
        border-radius: 20px;
        background-position: center;
        background-repeat: no-repeat;
        background-size: cover;
        block-size: 349.21px;
        inline-size: 100%;

        &::before {
          position: absolute;
          border-radius: 20px; /* Match the parent border-radius */
          background: rgba(0, 0, 0, 25%); /* Semi-transparent black */
          block-size: 349.21px;
          content: "";
          inline-size: 100%;
          inset: 0;
        }
      }

      .title {
        display: inline-block;
        border-radius: 50.5px;
        background: rgba(65, 143, 190, 100%);
        color: rgba(255, 255, 255, 100%);
        font-family: "GE Dinar One";
        font-size: 19px;
        font-weight: 300;
        line-height: 26.71px;
        padding-block-start: 3px;
        padding-inline: 15px;
        text-align: center;
      }

      .date {
        display: inline-block;
        color: #969696;
        font-family: Cairo-Regular;
        font-size: 16px;
        font-weight: 400;
        line-height: 29.98px;
        margin-inline-start: 13px;
      }

      .text {
        display: block;
        color: #000;
        font-family: Cairo-Light;
        font-size: 16px;
        font-weight: 300;
        line-height: 29.98px;
        margin-block-start: 30px !important;
        text-wrap: wrap;
      }

      a {
        display: flex;
        align-items: center;
        color: #599dc6;
        font-family: Cairo-SemiBold;
        font-size: 16px;
        font-weight: 600;
        line-height: 27.2px;

        span {
          display: block;

          // border-block-end: 2px solid #599dc6;
          text-decoration: underline;
        }

        img {
          display: inline-block;
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
        animation: none !important;
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

.text.description {
  overflow: hidden; /* Hide overflow content */
  overflow-wrap: break-word; /* Handle overflow */
  word-break: break-word; /* Break words to fit within the container */
  word-wrap: break-word; /* Break long words */
}

.text.description p {
  padding: 0;
  margin: 0;
  inline-size: 100%;
}

.text.description span {
  display: inline-block;
  overflow: hidden;
  max-inline-size: 100%;
}
</style>
