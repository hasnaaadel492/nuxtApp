<script lang="ts" setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";
import { useNuxtApp, useFetch } from "#app";

// Data
const advantages = ref<any[]>([]);
const totalAdvantages = ref<number>(0);

const subtitle = "advantages";
const mainPargraph = "mainPargraph";

// Refs for card elements
const cardRefs = ref<(HTMLElement | null)[]>([]);
const maxHeight = ref<number>(0);

// Fetch advantages function
const btnLoading = ref(false);

const fetchAdvantages = async () => {
  try {
    btnLoading.value = true;
    const { $api } = useNuxtApp();

    const data = await $api<{}>(
      `/website-section/website_sections/?section_type[]=advantages`
    );

    // ✅ Check response structure before accessing data

    advantages.value = data.body.website_sections.data || [];
    totalAdvantages.value = data.body.website_sections.paginate?.total || 0;
  } catch (error) {
    console.error("Error fetching devices:", error);
  } finally {
    btnLoading.value = false;
  }
};

// Update max card height
const updateMaxHeight = () => {
  nextTick(() => {
    const heights = cardRefs.value.map((el) => el?.offsetHeight || 0);
    maxHeight.value = Math.max(...heights);
    cardRefs.value.forEach((el) => {
      if (el) el.style.height = `${maxHeight.value}px`;
    });
  });
};

// Handle window resize
const handleResize = () => updateMaxHeight();

onMounted(() => {
  window.addEventListener("resize", handleResize);
  fetchAdvantages();
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", handleResize);
});

// Automatically update cardRefs array when advantages change
watchEffect(() => {
  cardRefs.value = new Array(advantages.value.length).fill(null);
  updateMaxHeight();
});
</script>

<template>
  <div class="advantages">
    <!-- Heading -->
    <div
      class="d-flex justify-center align-center"
      style="flex-direction: column"
    >
      <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
    </div>

    <!-- Cards -->
    <VContainer>
      <VRow class="cards">
        <VCol
          v-for="(card, index) in advantages"
          :key="index"
          cols="12"
          md="4"
          sm="6"
          ref="cardRefs"
        >
          <div class="card" style="flex-direction: column">
            <div class="iconCircle">
              <img :src="card.image" alt="Advantage Icon" />
            </div>
            <h6>{{ card.title }}</h6>
            <p>{{ card.description }}</p>
          </div>
        </VCol>
      </VRow>
    </VContainer>

    <!-- No advantages found -->
    <VContainer v-if="totalAdvantages === 0">
      <div class="d-flex justify-center align-center">
        <p
          class="mainPargraph text-start"
          style="font-size: 26px; font-weight: 600; margin-block-end: 7px"
        >
          {{ $t("No_advantages_found") }}
        </p>
      </div>
    </VContainer>
  </div>
</template>

<style lang="scss">
.advantages {
  margin-block-start: 74px;

  .cards {
    color: #000;

    .card {
      padding: 23px;
      border: 1px solid #70a1e5;
      border-radius: 16px;
      background: transparent;
      block-size: 100% !important;
      gap: 2px;
      margin-block-start: 5px;
      margin-inline-start: 5px;
      transition: all 0.5s ease-in-out;

      &:hover {
        border: none;
        background: linear-gradient(142.84deg, #157d99 0%, #70a1e5 100%);
        box-shadow: #70a1e5 0 0 5px 2px;
        color: #fff;
        transform: scale(1.06);
      }

      .iconCircle {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        block-size: 64px;
        color: #fff;
        inline-size: 64px;
        margin-block-end: 27px;

        img {
          border-radius: 50%;
          block-size: 100%;
          inline-size: 100%;
          object-fit: cover;
        }
      }

      h6 {
        color: #000;
        font-family: Cairo-SemiBold;
        font-size: 20px;
        font-weight: 600;
        line-height: 37.48px;
        margin-block-end: 7px;
      }

      p {
        color: #000;
        font-family: Cairo-Light;
        font-size: 16px;
        font-weight: 300;
        line-height: 29.98px;
        text-align: justify;
      }
    }
  }

  .card:hover p,
  .card:hover h6 {
    color: #fff;
  }
}

@media (max-width: 600px) {
  .advantages {
    .card {
      margin-inline: 10px !important;

      &:hover {
        transform: scale(1.03) !important;
      }

      .iconCircle {
        margin-block-end: 23px !important;
      }

      h6 {
        font-size: 18px !important;
        margin-block-end: 5px;
      }

      p {
        font-size: 14px !important;
      }
    }
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
