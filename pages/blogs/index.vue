<script lang="ts" setup>
const subtitle = "blog";
const mainPargraph = "mainPargraph";

const blogPage = ref(0);
const blogsLength = ref(0);
const btnLoading = ref(false);

const blogs = ref([]);
const fetchBlogs = async () => {
  try {
    btnLoading.value = true;
    const { $api } = useNuxtApp();

    const data = await $api<{}>(`/blog/blogs?page=${blogPage.value}`);

    blogs.value = data.body.blogs.data;
    blogPage.value = data.body.blogs.paginate.current_page;
    blogsLength.value = data.body.blogs.paginate.last_page;
  } catch (error) {
    console.error("Error fetching devices:", error);
  } finally {
    btnLoading.value = false;
  }
};

const useLang = () => useState("lang", () => "ar");
const lang = useLang().value;
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString(lang == "en" ? "en-US" : "ar", options);
};

watchEffect(fetchBlogs);

const symbolStyle = computed(() => {
  return lang === "en" ? { transform: "rotate(180deg)" } : {};
});

onMounted(() => {
  const lang = localStorage.getItem("lang");
  if (lang === "en") {
    const selectors = [".hero-circel1", ".hero-circel2"];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(`.blogsComponent ${selector}`);

      elements.forEach((element) => {
        element.style.transform = "rotate(180deg)";
      });
    });
  }
});
</script>

<template>
  <div class="blogsComponent">
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
          <VCol cols="12" md="4" sm="6" v-for="blog in blogs" class="blog-card">
            <div class="m-2 border-style" :dir="lang === 'ar' ? 'rtl' : 'ltr'">
              <div class="mb-3">
                <div class="blog-image">
                  <img :src="blog.image" :alt="blog.title" />
                </div>
              </div>
              <div class="p-3">
                <div class="mb-1 title">{{ blog.title }}</div>
                <div class="mt-0 mb-1 date">
                  {{ formatDate(blog.created_at) }}
                </div>
                <!--   style="width: 100px; height: 100px" -->
                <div
                  class="mt-0 mb-1 text description"
                  v-html="blog.description.slice(0, 50)"
                ></div>
                <div
                  class="flex justify-content-between align-items-center router-more"
                >
                  <router-link
                    :to="`/blogs/${blog.slug}`"
                    class="d-flex align-items-center"
                  >
                    <span class="ml-2 mr-1"> {{ $t("readMore") }}</span>
                    <img
                      src="@/assets/images/Symbol.svg"
                      :style="symbolStyle"
                    />
                  </router-link>
                </div>
              </div>
            </div>
          </VCol>
        </VRow>

        <div class="text-center">
          <v-pagination
            v-model="blogPage"
            :length="blogsLength"
            next-icon="mdi-menu-right"
            prev-icon="mdi-menu-left"
          ></v-pagination>
        </div>
      </div>
    </VContainer>

    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<style lang="scss">
.blogsComponent {
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
      block-size: 100px;
      inline-size: 100px;
    }
  }

  .blog-card {
    // padding: 2rem;
    border-radius: 8px 8px 0 0;

    // background: var(--surface-card);
    font-family: Cairo !important;
    margin-block-end: 1rem;

    .border-style {
      position: relative;
      box-sizing: border-box;

      // border: 1px solid #fff;
      border-radius: 8px !important;
      block-size: 600px;
      transition: 0.2s all ease-in-out;

      &:hover {
        border: 1px solid #70a1e5 !important;
        transition: 0.2s all ease-in-out;
      }

      .blog-image {
        position: relative;
        overflow: hidden;
        aspect-ratio: 16 / 9; /* Set a fixed aspect ratio */
        inline-size: 100%; /* Ensure the container takes full width */
        margin-block-end: 50px;

        /* Optional: Adjust the aspect ratio as needed */
        max-inline-size: 100%; /* Ensure the container doesn't exceed its parent's width */

        img {
          block-size: 100%;
          inline-size: 100%;
          inset-block-start: 50%;
          inset-inline-start: 50%;
          object-fit: cover;
        }
      }

      .title {
        color: #000;
        font-family: Cairo-SemiBold;
        font-size: 20px;
        font-weight: 600;
        line-height: 37.48px;

        // margin-block-start: 25px;
      }

      .date {
        color: #969696;
        font-family: Cairo-Regular;
        font-size: 16px;
        font-weight: 400;
        line-height: 29.98px;
      }

      .text {
        color: #000;
        font-family: Cairo-Light;
        font-size: 16px;
        font-weight: 300;
        line-height: 29.98px;
      }

      .router-more {
        position: absolute;
        inset-block-end: 10px;
        inset-inline-start: 7px;
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
</style>
