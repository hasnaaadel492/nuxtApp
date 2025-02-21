<script lang="ts" setup>
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// Data
const advantages = ref([])
const totalAdvantages = ref(0)

const subtitle = 'advantages'
const mainPargraph = 'mainPargraph'
// Refs for card elements
const cardRefs = ref([])

// Fetch advantages function
const fetchAdvantages =async () => {
    const {$api}=useNuxtApp()
    const data = await $api.<{}>(
        "/website-section/website_sections/?section_type[]=advantages"
    )
 try {
    advantages.value = data.body.website_sections.data
    totalAdvantages.value = data.body.website_sections.paginate.total
  }
}

const maxHeight = ref(0)

const updateMaxHeight = () => {
  nextTick(() => {
    const heights = cardRefs.value.map((el) => el?.offsetHeight || 0)
    maxHeight.value = Math.max(...heights)

    cardRefs.value.forEach((el) => {
      if (el) {
        el.style.height = `${maxHeight.value}px`
      }
    })
  })
}

const handleResize = () => {
  updateMaxHeight()
}

onMounted(() => {
  fetchAdvantages()
  window.addEventListener('resize', handleResize)
  updateMaxHeight()
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})

watch(() => advantages.value, updateMaxHeight, { deep: true })
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
          cols="12"
          md="4"
          sm="6"
          v-for="(card, index) in advantages"
          :key="index"
          style="padding-top: 0; padding-inline-end: 0"
          v-bind="aosAttributes"
          :ref="(el) => (cardRefs.value[index] = el)"
        >
          <div class="card" style="flex-direction: column">
            <div class="iconCircle">
              <img :src="card.image" />
            </div>
            <h6>{{ card.title }}</h6>
            <p>{{ card.description }}</p>
          </div>
        </VCol>
      </VRow>
    </VContainer>

    <VContainer>
      <div
        v-if="totalAdvantages === 0"
        class="d-flex justify-center align-center"
      >
        <p
          class="mainPargraph text-start"
          style="font-size: 26; font-weight: 600; margin-block-end: 7px"
        >
          {{ $t('No advantages found') }}
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
  .advantages {
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
