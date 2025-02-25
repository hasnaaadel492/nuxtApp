<script lang="ts" setup>
const subtitle = "privacy";
const mainPargraph = "mainPargraph";

import AppHeading from "~/@core/components/AppHeading.vue";

const lang = useCookie("lang");

const privacy = ref({});

const privacyList = ref([]);

const getPrivacy = async () => {
  try {
    const { $api } = useNuxtApp();
    const data = await $api<{
      body: {};
    }>("/web-setting/webSettings");

    privacy.value = data.body.Privacy;
    privacyList.value = data.body.Privacy.items;

    // GSAP Animation
  } catch (error) {
    console.error("Error fetching company info:", error);
  }
};

watchEffect(getPrivacy);
</script>

<template>
  <section>
    <div class="privacy">
      <div
        class="d-flex justify-center align-center"
        style="flex-direction: column"
      >
        <!-- Start Heading -->
        <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
        <!-- End Heading -->
      </div>
      <VContainer>
        <div style="width: 80%; margin: auto" class="privacyData">
          <!-- <p>{{ privacy }}</p> -->

          <div class="description">
            {{ privacy.description }}
          </div>

          <div class="whiteDiv">
            <div class="d-flex" style="align-items: baseline">
              <img src="@/assets/images/quote.svg" alt="quote" />

              <p class="ml-2 mr-2">
                {{ privacy.sub_description }}
              </p>
            </div>
            <div class="d-flex" style="justify-content: end">
              <img src="@/assets/images/quote.svg" alt="quote" />
            </div>
          </div>

          <VList class="privacyList">
            <VListItem v-for="privacyItem in privacyList" class="">
              <img
                v-if="lang === 'ar'"
                src="@/assets/images/arrowPrivacy.svg"
                class="arrowIcon mt-2"
              />

              <img
                v-else
                src="@/assets/images/arrowPrivacy.svg"
                class="arrowIcon mt-2"
                style="transform: rotate(180deg)"
              />
              <p class="mr-2 ml-2">
                {{ privacyItem.description }}
              </p>
            </VListItem>
          </VList>
        </div>
      </VContainer>
    </div>
  </section>
</template>

<style lang="scss">
.privacy {
  .privacyData {
  }

  .description {
    color: #000;
    font-family: Cairo-Regular;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;
    text-align: center;
    text-align: justify;
  }

  .whiteDiv {
    padding: 20px;
    border-radius: 20px;
    background: #fff;
    box-shadow: 0 0 24px 0 #00000012;
    margin-block: 40px;
    margin-inline: 0;

    p {
      color: #000;
      font-family: Cairo-Regular;
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
      text-align: justify;
    }
  }

  .privacyList {
    color: #000;
    font-family: Cairo-Regular;
    font-size: 16px;
    font-weight: 400;
    line-height: 28px;

    .v-list-item__content {
      display: flex;
      align-items: start;
    }
  }
}
</style>
