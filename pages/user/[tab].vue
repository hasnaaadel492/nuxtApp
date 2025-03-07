<script lang="ts" setup>
import AccountSettingsAccount from "@/components/user/AccountSettingsAccount.vue";
import AccountSettingsPackages from "@/components/user/AccountSettingsPackages.vue";
import AccountSettingsStore from "@/components/user/AccountSettingsStore.vue";
import { useAuthStore } from "@/stores/authStore";
import { useRoute } from "vue-router";

const userData = ref({
  username: "",
  subscription_status: 0,
  avatar: null,
  phone: "",
  status: "",
  email: "",
});

const route = useRoute();

const activeTab = route.params.tab;

const { t } = useI18n();
const auth = useAuthStore();
const subscription_status = ref(1);
// tabs
const tabs = [
  { title: "personal_data", icon: "mdi-account-outline", tab: "account" },
  {
    title: "subscriptions",
    icon: "mdi-lock-open-outline",
    tab: "subscriptions",
  },
  { title: "theStore", icon: "mdi-flag-variant-outline", tab: "store" },
];

watch(
  () => auth.userProfile,
  (newProfile) => {
    userData.value = newProfile;
    subscription_status.value = newProfile.subscription_status;
  }
);

onMounted(() => {
  const lang = useCookie("lang").value;
  if (lang == "en") {
    const selectors = [".hero-circel1", ".hero-circel2"];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(
        `.AccountSettings ${selector}`
      );

      elements.forEach((element) => {
        element.style.transform = "rotate(180deg)";
      });
    });
  }

  userData.value = auth.userProfile;
  // subscription_status.value = userData.value.subscription_status
});
</script>

<template>
  <div class="AccountSettings">
    <img class="hero-circel1" src="@/assets/images/hero-circle1.svg" alt="" />

    <VContainer>
      <div style="width: 94%; margin-block-start: 2%; margin-inline-start: 4%">
        <div class="warning" v-if="userData.status == 'un_active'">
          <!-- warning icon -->
          <img src="@/assets/images/alert.svg" alt="" />
          <p>
            {{ $t("notPaid") }}
            <router-link to="/payment">{{ $t("toPaymentPage") }}</router-link>
            {{ $t("payForPackage") }}
          </p>
        </div>
        <VTabs v-model="activeTab" class="v-tabs-pill">
          <VTab
            :disabled="userData.status == 'un_active'"
            v-for="item in tabs"
            :key="item.icon"
            :value="item.tab"
            :to="{
              name: 'user-tab',
              params: { tab: item.tab },
            }"
          >
            <VIcon size="20" start :icon="item.icon" />
            {{ $t(item.title) }}
          </VTab>
        </VTabs>

        <VWindow
          v-model="activeTab"
          class="mt-5 disable-tab-transition"
          :touch="false"
        >
          <!-- Account -->
          <VWindowItem value="account">
            <AccountSettingsAccount :userData="userData" />
          </VWindowItem>

          <!-- subscriptions -->
          <VWindowItem value="subscriptions">
            <AccountSettingsPackages :userData="userData" />
          </VWindowItem>

          <!-- store -->
          <VWindowItem value="store">
            <AccountSettingsStore :userData="userData" />
          </VWindowItem>
        </VWindow>
      </div>
    </VContainer>
    <img class="hero-circel2" src="@/assets/images/hero-circle2.svg" alt="" />
  </div>
</template>

<!-- <route lang="yaml">
meta:
  navActiveLink: user-tab
</route> -->

<style lang="scss">
.AccountSettings {
  position: relative;
  margin: 0;
  background-image: url("@/assets/images/hero1.svg") !important;
  background-repeat: no-repeat;
  background-size: contain;
  inline-size: 100%;
  padding-block-start: 170px;

  @media (max-width: 500px) {
    padding-block-start: 50px;
  }

  .hero-circel1 {
    position: absolute;
    inset-block-start: 15%;
  }

  .hero-circel2 {
    position: absolute;
    inset-block-start: 60%;
    inset-inline-end: 0;
  }

  .heading {
    h3,
    p {
      animation: none !important;
    }
  }

  a {
    color: #5e5873 !important;
    font-family: Cairo-Regular;
    font-size: 18px !important;
    font-weight: 400 !important;
    line-height: 33.73px !important;
  }

  .warning {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 8px;
    border: 1px solid #c35a5b;
    border-radius: 16px;
    background: #fce5e5;
    gap: 8px;
    margin-block-end: 35px;
    padding-inline-start: 20px;

    @media (max-width: 787px) {
      p {
        font-size: 16px !important;
      }
    }

    p {
      margin: 0;
      color: #323339;
      font-family: Cairo-Regular;
      font-size: 21px;
      font-weight: 400;
      line-height: 28px;
    }

    a {
      color: #3d54e3 !important;
      font-family: Cairo-Regular;
      font-size: 21px;
      font-weight: 400;
      line-height: 28px;
      margin-inline: 5px;
      text-decoration: underline !important;
    }
  }

  .v-slide-group__content {
    gap: 10px;
  }

  .v-tab--selected {
    border-radius: 0.3rem !important;
    background: linear-gradient(142.84deg, #157d99 0%, #70a1e5 100%) !important;
    box-shadow: 0 4px 18px -4px #7367f0a6;
    color: #fff !important;
    font-family: Cairo-Regular;
    font-size: 18px !important;
    font-weight: 400 !important;
    line-height: 33.73px !important;
  }

  @media (max-width: 787px) {
    .privacy {
      margin: 0;
      padding-block-start: 15px !important;
    }

    .hero-circel1,
    .hero-circel2 {
      display: none !important;
    }
  }
}
</style>
