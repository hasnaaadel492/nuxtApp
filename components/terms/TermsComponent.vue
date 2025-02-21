<script lang="ts" setup>
const subtitle = "terms";
const mainPargraph = "mainPargraph";

const terms = ref({});

const getTerms = async () => {
  try {
    const { $api } = useNuxtApp();

    const data = await $api<{}>("/web-setting/webSettings");
    terms.value = data.body.terms.items;
  } catch {}
};

watchEffect(getTerms);
</script>

<template>
  <section>
    <div class="terms">
      <div
        class="d-flex justify-center align-center"
        style="flex-direction: column"
      >
        <!-- Start Heading -->
        <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
        <!-- End Heading -->
      </div>
      <VContainer>
        <div style="width: 80%; margin: auto" class="termsData">
          <!-- <p>{{ terms }}</p> -->

          <div v-for="term in terms">
            <div style="margin: auto; text-align: center" class="mb-4 mt-4">
              <img src="@/assets/images/dotIcon.svg" />
              <h2 class="termsHeading mr-2 ml-2">{{ term.title }}</h2>
            </div>
            <p class="termsText">{{ term.description }}</p>
          </div>
        </div>
      </VContainer>
    </div>
  </section>
</template>

<style lang="scss">
.terms {
  .termsData {
    p {
      color: #736e6e;
      font-family: Cairo-Medium;
      font-size: 16px;
      font-weight: 500;
      line-height: 30px;
      text-align: justify;
    }

    .termsHeading {
      display: inline-block;
      color: #000;
      font-family: Cairo-Bold;
      font-size: 26px;
      font-weight: 700;
      line-height: 48.72px;
      text-align: center;
    }

    .termsText {
      color: #000;
      font-family: Cairo-Regular;
      font-size: 16px;
      font-weight: 400;
      line-height: 28px;
      text-align: center;
      text-align: justify;
    }
  }
}
</style>
