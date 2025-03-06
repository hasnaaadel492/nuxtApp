<script lang="ts" setup>
import { useAuthStore } from "@/stores/authStore";
const auth = useAuthStore();

const storeData = ref({
  description: "",
  slug: "",
  address: "",
  phone: "",
  store_link: "",
  username: "",
  company_name: "",
  email: "",
});

const getStore = () => {
  auth
    .store()
    .then((res) => {
      storeData.value.description = res.data.body.tenant.description;
      storeData.value.slug = res.data.body.tenant.slug;
      storeData.value.address = res.data.body.tenant.address;
      storeData.value.phone = res.data.body.tenant.phone;
      storeData.value.store_link = res.data.body.tenant.pos_link;
    })
    .catch((error) => {
      console.error("Failed to fetch profile:", error);
    });
};

watch(
  () => auth.storeProfile,
  (newStore) => {
    storeData.value = newStore;
  }
);

onMounted(() => {
  getStore();
});
</script>

<template>
  <div class="myStore">
    <VRow>
      <VCard
        :title="$t('storeDatails')"
        style="
          width: 100% !important;
          background: #fff !important;
          padding-block-end: 70px;
        "
      >
        <VCardText class="lineCardText">
          <VRow>
            <VCol cols="12" md="11">
              <div class="line"></div>
            </VCol>
          </VRow>
        </VCardText>
        <VCardText class="mt-5">
          <VRow>
            <VCol cols="12" md="7">
              <div class="store-details">
                <!-- store name -->
                <div
                  class="d-flex mb-4"
                  style="flex-direction: column; gap: 7px"
                >
                  <h6>{{ $t("store-name") }}</h6>
                  <span> {{ storeData.company_name }}</span>
                </div>

                <!-- username  -->
                <div
                  class="d-flex mb-4"
                  style="flex-direction: column; gap: 7px"
                >
                  <h6>{{ $t("store_username") }}</h6>
                  <span> {{ storeData.username }}</span>
                </div>

                <!-- store phone -->
                <div
                  class="d-flex mb-4"
                  style="flex-direction: column; gap: 7px"
                >
                  <h6>{{ $t("phone") }}</h6>
                  <span dir="ltr" style="width: fit-content">{{
                    storeData.phone
                  }}</span>
                </div>

                <!-- store phone -->
                <div
                  class="d-flex mb-4"
                  style="flex-direction: column; gap: 7px"
                >
                  <h6>{{ $t("email") }}</h6>
                  <span dir="ltr" style="width: fit-content">{{
                    storeData.email
                  }}</span>
                </div>

                <!-- store link -->
                <div class="d-flex" style="flex-direction: column; gap: 7px">
                  <h6>{{ $t("store-link") }}</h6>
                  <span>
                    <a
                      :href="'https://' + storeData.pos_link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {{ storeData.pos_link }}
                    </a>
                  </span>
                </div>
              </div>
            </VCol>

            <VCol cols="12" md="5">
              <div class="image">
                <img src="@/assets/images/newLogo2.png" alt="" />
              </div>
            </VCol>
          </VRow>
        </VCardText>
      </VCard>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.myStore {
  .v-card {
    border-radius: 16px;
    box-shadow: 0 4px 24px 0 #0000000f !important;
  }

  .lineCardText {
    padding-inline: 0;

    .line {
      background: #ebe9f1;
      block-size: 1.3px;
      padding-inline: 0;
    }
  }

  .store-title {
    color: #000;
    font-family: Cairo-Regular;
    font-size: 16px;
    font-weight: 400;
    line-height: 29.98px;
    text-align: justify;
  }

  .store-details {
    h6 {
      color: #282727;
      font-family: Cairo-Regular;
      font-size: 17.93px;
      font-weight: 400;
      line-height: 31.38px;
    }

    span,
    a {
      color: #a3a3a3 !important;
      font-family: Cairo-Regular;
      font-size: 16.81px !important;
      font-weight: 400 !important;
      line-height: 31.38px !important;
    }
  }

  .image {
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("@/assets/images/backgroundStoreLogo.svg");
    background-repeat: no-repeat;
    background-size: cover;
    block-size: 100%;
    inline-size: 100%;

    @media screen and (max-width: 768px) {
      background-size: cover;
      block-size: 180px;
    }

    img {
      block-size: 50%;
      inline-size: 50%;
    }
  }
}
</style>
