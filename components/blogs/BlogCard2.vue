<template>
  <div class="blog-card">
    <div class="card">
      <div class="m-2 border-style">
        <div class="mb-3">
          <div class="blog-image">
            <img :src="$props.blog.image" :alt="$props.blog.name" />
          </div>
        </div>
        <div class="p-3" style="text-align: start">
          <div class="mb-1 title">{{ $props.blog.title }}</div>
          <div class="mt-0 mb-1 date">
            {{ formatDate($props.blog.created_at) }}
          </div>
          <div
            class="mt-0 mb-1 text"
            v-html="$props.blog.description.slice(0, 150)"
          ></div>
          <div
            class="flex justify-content-between align-items-center router-more"
          >
            <router-link :to="`/blogs/${$props.blog.slug}`">
              <span class="ml-2 mr-1"> {{ $t("readMore") }}</span>
              <img src="@/assets/images/Symbol.svg" :style="symbolStyle" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
const props = defineProps<Props>();

interface Props {
  blog: {
    title: string;
    name: string;
    description: string;
    image: string;
    slug: string;
    created_at: string;
  };
}

const lang = ref(useCookie("lang").value || "ar");
const symbolStyle = computed(() => {
  return lang.value === "en" ? { transform: "rotate(180deg)" } : {};
});

onMounted(() => {
  window.addEventListener("storage", (event) => {
    if (event.key === "lang") {
      lang.value = event.newValue || "ar";
    }
  });
});

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString(lang.value === "en" ? "en-US" : "ar", options);
};
</script>

<style lang="scss">
.blog-card .card {
  padding: 2rem;
  border-radius: 8px 8px 0 0;
  font-family: Cairo !important;
  margin-block-end: 1rem;

  .border-style {
    position: relative;
    box-sizing: border-box;
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
      aspect-ratio: 16 / 9;
      inline-size: 100%;
      margin-block-end: 50px;
      max-inline-size: 100%;

      img {
        block-size: 100%;
        inline-size: 100%;
        inset-block-start: 50%;
        inset-inline-start: 50%;
        object-fit: cover;
      }
    }
  }
}

.blog-card {
  font-family: Cairo !important;

  .title {
    color: #000;
    font-family: Cairo-SemiBold;
    font-size: 20px;
    font-weight: 600;
    line-height: 37.48px;
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

    img {
      display: none;
      block-size: 50px;
      inline-size: 50px;
    }
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
      text-decoration: underline;
    }

    img {
      display: inline-block;
    }
  }
}

.blog-card {
  .p-link {
    border: 1px solid #c5dcef;
    border-radius: 50%;
    block-size: 48px;
    inline-size: 48px;

    svg {
      color: #0f578b;
      inline-size: 22px;
    }
  }

  .p-disabled {
    background: linear-gradient(142.84deg, #157d99 0%, #70a1e5 100%);

    svg {
      color: #fff;
    }
  }

  .p-carousel-next {
    margin-inline-start: 18px;
    transform: rotate(180deg);
  }

  .p-carousel-prev {
    margin-inline-end: 18px;
    transform: rotate(180deg);
  }

  .p-carousel-indicators {
    display: none;
  }
}

@media (max-width: 787px) {
  .border-style {
    border: none !important;
  }

  .blog-card .card {
    padding: 0;
  }

  .blog-card {
    .p-carousel-next,
    .p-carousel-prev {
      display: none;
    }
  }

  .p-carousel-items-content,
  .blog-card .border-style {
    inline-size: 300px;
  }
}

@media (min-width: 1000px) {
  .p-carousel-items-content {
    inline-size: 1250px;
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .blog-image {
    aspect-ratio: 4 / 3;
  }
}

@media (max-width: 1024px) {
  .blog-image {
    aspect-ratio: 16 / 9;
  }
}
</style>
