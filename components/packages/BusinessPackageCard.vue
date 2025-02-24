<script lang="ts" setup>
import { usePackageStore } from "@/stores/packageStore";
import { registerStore } from "@/stores/registerStore";
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import MainButton from "@/@core/components/buttons/mainButton";

const isConfirmDialogVisible = ref(false);

interface PackageItem {
  title: string;
}

interface Package {
  id: string;
  title: string;
  price: string;
  price_before_discount: string;
  description: string;
  is_recommended: boolean;
  is_business: boolean;
  period: string;
  business_description: string;
  package_items: PackageItem[];
}

interface currentPackage {
  package: { id: string };
}

interface Props {
  package: Package;
  isCenter: boolean;
  currentPackage: currentPackage;
}

const props = defineProps<Props>();

const buttonContent = computed(() => {
  return "contact_sales_team";
});

const router = useRouter();

const packageStore = usePackageStore();
const registerData = registerStore();

const selectPackage = (packageDetails: any) => {
  useCookie("packageId").value = packageDetails.id;
  useCookie("packageDetails").value = packageDetails;

  registerData.setPackageId(useCookie("packageId").value);
  packageStore.setPackage(useCookie("packageDetails").value);

  router.push("/contactUS");
};

const goToRenew = () => {
  router.push("/subscriptions/renewSubscription");
};
</script>

<template>
  <div
    style="position: relative; overflow: hidden; height: 100%"
    :class="[
      'package-card',
      { 'recommanded-bg': props.package.is_recommended },
      { 'is-center': props.isCenter },
    ]"
  >
    <div class="details">
      <div
        class="d-flex mt-1"
        style="align-items: center; justify-content: space-between"
      >
        <h4>{{ props.package.title }}</h4>
        <VChip
          v-if="props.package.is_recommended"
          class="ml-3 pa-2"
          style="
            background: #f59740 !important;
            block-size: 35px;
            color: #fff;
            font-family: Cairo-Bold;
            font-size: 14px;
            font-weight: 700;
            line-height: 26.24px;
            margin-inline-end: 7px;
            text-align: center;
          "
        >
          {{ $t("is_recommended") }}
        </VChip>
      </div>
      <div>
        <h6 style="margin-bottom: 15px">
          <span
            style="
              color: #fff;
              font-size: 17px;
              font-stretch: normal;
              font-style: normal;
              font-weight: normal;
              letter-spacing: normal;
              line-height: normal;
            "
          >
            price
          </span>
        </h6>
      </div>
      <div class="package-tax">
        {{ props.package.description.slice(0, 150) }}
      </div>

      <div class="d-flex justify-center button-container">
        <MainButton :content="buttonContent" @click="selectPackage(package)" />
      </div>

      <div class="business-card-description">
        {{ package.business_description }}
      </div>
    </div>
  </div>

  <div class="">
    <!-- Confirm to renew -->
    <v-row justify="center">
      <v-dialog v-model="isConfirmDialogVisible" persistent width="600">
        <v-card>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-card-title
                    primary-title
                    class="mb-3 d-flex justify-center"
                  >
                    {{ $t("are_you_sure_you_want_to_renew_package?") }}
                  </v-card-title>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue-darken-1"
              variant="text"
              @click="isConfirmDialogVisible = false"
            >
              {{ $t("cancel") }}
            </v-btn>

            <v-btn type="button" @click="goToRenew()">
              {{ $t("confirm") }}
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<style lang="scss" scoped>
.recommanded-bg {
  background: rgba(243, 248, 249, 100%) !important;
  padding-block-start: 15px;

  .details {
    padding-block-start: 0 !important;
  }

  // margin-block: 20px;
}

.package-card {
  position: relative;
  border: 1px solid #70a1e5; // Border width
  border-radius: 16px !important;
  background-color: #fff;
  border-image-repeat: stretch; // Repeat value
  border-image-slice: 1; // Slicing value
  // inline-size: 360px;
  //margin-block: 20px;
  margin-inline: 0;

  // padding-inline-start: 10px;

  .recommanded {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px 10px 0 0;
    background: linear-gradient(142.84deg, #157d99 0%, #70a1e5 100%);
    block-size: 55px;
    color: #fff;
    font-family: Cairo-Bold;
    font-size: 14px;
    font-weight: 700;
    line-height: 26.24px;
    text-align: center;
  }

  .details {
    background-color: transparent;
    padding-block-start: 15px;
    padding-inline-start: 15px;
    text-align: start;

    h4 {
      color: #000;
      font-family: Cairo-Bold;
      font-size: 24px;
      font-weight: 700;
      line-height: 44.98px;
    }

    h6 {
      display: flex;
      align-items: center;
      color: #000;
      font-family: Cairo-Bold;
      font-size: 28px;
      font-weight: 700;
      gap: 6px;

      span {
        display: inline-block;
        font-family: Cairo-Light;
        font-size: 20px;
        font-weight: 300;
        line-height: 37.48px;
        margin-block-start: 10px;
      }

      line-height: 40px;
      margin-block-end: 10px;
    }

    .package-tax {
      block-size: 20vh;
      color: #000;
      font-family: Cairo-Semibold;
      font-size: 16px;
      font-weight: 600;
      inline-size: 90%;
      line-height: 29.98px;
      margin-block-end: 1.2rem;
    }

    span {
      color: #000;
      font-family: Cairo-Medium;
      font-size: 16px;
      font-weight: 500;
      line-height: 29.98px;
    }
  }

  .business-card-description {
    margin: 20px;
    background-color: transparent !important;
    color: #000;
    font-size: 16px;
    font-weight: 500;
    line-height: 29.98px;
    text-align: center;

    span {
      display: inline-block;
      font-family: Cairo-Medium;
      font-size: 15px;
      font-weight: 500;
      line-height: 29.98px;
      margin-block-start: 6px !important;
      padding-block: 0;
      padding-inline: 14.6px;
    }
  }
}
</style>

<style lang="scss">
.button-container {
  inline-size: 100%;
  margin-block-start: 10px;

  .mainButton::before {
    border-radius: 3px !important;
  }

  div {
    inline-size: 100%;
  }

  button {
    display: inline-block !important;
    border-radius: 3px;
    margin: 0 !important;
    block-size: 55px !important;
    font-family: Cairo-Bold;
    font-size: 14px;
    font-weight: 700;
    inline-size: 96% !important;
    line-height: 26.24px;
    margin-block-start: 5px !important;
    text-align: center;
  }
}

.package-card .v-list-item__content {
  display: flex;
  align-items: center;
}

.package-card .v-list {
  margin-block-end: 20px;
}
</style>
