<script lang="ts" setup>
import ApplicationCard from "./ApplicationCard.vue";
// Data
const applications_section = ref([]);

const totalPage = ref(1);
const totalApps = ref(0);
const options = ref<Options>({
  page: 1,
  itemsPerPage: 10,
  sortBy: [],
  groupBy: [],
  search: undefined,
});

// Refs for card elements
const cardRefs = ref([]);

// Fetch applications_section function
const btnLoading = ref(false);
const fetchApplications = async () => {
  try {
    btnLoading.value = true;
    const { $api } = useNuxtApp();

    const data = await $api<{}>(
      `/applications-section/applications-section?status=1&page=${options.value.page}`
    );

    // ✅ Check response structure before accessing data

    applications_section.value = data.body.applications_section.data;
    totalPage.value = data.body.applications_section.paginate.last_page;
    totalApps.value = data.body.applications_section.paginate.total;
    options.value.page = data.body.applications_section.paginate.current_page;
  } catch (error) {
    console.error("Error fetching devices:", error);
  } finally {
    btnLoading.value = false;
  }
};

onMounted(() => {
  fetchApplications();
});
</script>

<template>
  <div class="applications_section">
    <!-- Cards -->
    <VContainer>
      <VRow class="cards">
        <VCol
          cols="12"
          md="4"
          sm="6"
          v-for="(ApplicationCardData, index) in applications_section"
          :key="index"
        >
          <ApplicationCard :ApplicationCardData="ApplicationCardData" />
        </VCol>
      </VRow>
    </VContainer>
    <VContainer>
      <div v-if="totalApps === 0" class="d-flex justify-center align-center">
        <p
          class="mainPargraph text-start"
          style="font-size: 26; font-weight: 600; margin-block-end: 7px"
        >
          {{ $t("No applications found") }}
        </p>
      </div>
    </VContainer>
  </div>
</template>

<style lang="scss">
.applications_section {
  position: relative;

  // background-image: url('@/assets/images/terminology-background.svg') !important;
  background-repeat: no-repeat;
  background-size: 50%;
  block-size: 100%;
  inline-size: 100%;
  margin-block-start: 10px;

  .cards {
    color: #000;

    // gap: 5px;

    .card {
      padding: 23px;
      border: 1px solid #70a1e5;
      border-radius: 16px;

      // animation: fade-in ease-in-out;
      animation-range-end: 200px;
      animation-range-start: cover;
      animation-timeline: view();
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
        transition: 0.5s all ease-in-out;
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
  .applications_section {
    .card {
      margin-inline: 10px !important;

      &:hover {
        transform: scale(1.03) !important;
        transition: 0.5s all ease-in-out;
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
