<script lang="ts" setup>
import formatNumber from "@/@core/utils/formattedNumber";
import { usePackageStore } from "@/stores/packageStore";
import { registerStore } from "@/stores/registerStore";

const router = useRouter();
const isConfirmDialogVisible = ref(false);
const isChangeDialogVisible = ref(false);

const packageDetails = ref({
  title: "",
  price: "",
  perioid: "",
  description: "",
  period: "",
  paid_amount: "",
});
const ended_at = ref("");
const is_expired = ref(false);
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleString(
    useCookie("lang").value === "en" ? "en-US" : "ar",
    options
  );
};

const packageStore = usePackageStore();
const registerData = registerStore();
const { $axios } = useNuxtApp();
const getTenantSubscription = () => {
  $axios({
    method: "GET",
    url: "/tenant-owner/subscription",
  }).then((res) => {
    packageDetails.value = res.data.body.subscription.package;
    ended_at.value = res.data.body.subscription.ended_at;
    is_expired.value = res.data.body.subscription.is_expired;
    packageDetails.value.paid_amount = res.data.body.subscription.paid_amount;
    useCookie("packageId").value = packageDetails.value.id;
    useCookie("packageDetails").value = packageDetails.value;

    registerData.setPackageId(useCookie("packageId").value);
    packageStore.setPackage(useCookie("packageDetails").value);
  });
};

const goToRenew = () => {
  router.push({
    path: "/subscriptions/renewSubscription",
    query: {
      packageId: packageDetails.id,
      title: packageDetails.title,
      price: packageDetails.price,
      period: packageDetails.period,
      description: packageDetails.description,
    },
  });
};

const goToPayment = () => {
  router.push({
    path: "/packages",
    query: {
      packageId: packageDetails.id,
      title: packageDetails.title,
      price: packageDetails.price,
      period: packageDetails.period,
      description: packageDetails.description,
    },
  });
};

watchEffect(getTenantSubscription);
</script>

<template>
  <div class="accountDetails">
    <VRow>
      <VCard
        :title="$t('choosenPackage')"
        style="width: 100% !important; background: #fff !important"
      >
        <VCardText class="lineCardText">
          <VRow>
            <VCol cols="12" md="11">
              <div class="line"></div>
            </VCol>
          </VRow>
        </VCardText>
        <VCardText>
          <VRow
            ><VCol cols="12" lg="4" md="6">
              <div class="recommanded-bg package-card">
                <div class="details">
                  <div
                    class="d-flex mt-1"
                    style="align-items: center; justify-content: space-between"
                  >
                    <h4>{{ packageDetails?.title }}</h4>

                    <VChip
                      v-if="is_expired"
                      class="ml-3 pa-2"
                      style="
                        background: rgb(220 44 44) !important;
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
                      {{ $t("expired") }}
                    </VChip>
                    <VChip
                      v-else
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
                      {{ $t("choosenPackage") }}
                    </VChip>
                  </div>
                  <h6>
                    {{ formatNumber(packageDetails?.paid_amount, "en-IN") }}
                    {{ $t("RS") }}
                    <span> / {{ $t(packageDetails?.period) }} </span>
                  </h6>
                  <span class="package-tax">
                    {{ packageDetails?.description }}</span
                  >

                  <div class="expire_date">
                    <img src="@/assets/images/dateIcon.svg" alt="" />
                    <p>{{ $t("expire_date") }} : {{ formatDate(ended_at) }}</p>
                  </div>

                  <div class="d-flex button-container-package" style="gap: 7px">
                    <VBtn
                      v-if="is_expired"
                      type="button"
                      @click="isConfirmDialogVisible = true"
                      style="background: #157d99 !important"
                    >
                      {{ $t("renew_package") }}
                    </VBtn>

                    <!-- <VBtn
                      color="secondary"
                      variant="outlined"
                      type="reset"
                      @click="isChangeDialogVisible = true"
                    >
                      {{ $t('change_package') }}
                    </VBtn> -->
                  </div>
                </div>
              </div>
            </VCol></VRow
          >
        </VCardText>
      </VCard>
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

      <!-- confirm to change -->

      <v-row justify="center">
        <v-dialog v-model="isChangeDialogVisible" persistent width="600">
          <v-card>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-card-title
                      primary-title
                      class="mb-3 d-flex justify-center"
                    >
                      {{ $t("are_you_sure_you_want_to_change_package") }}
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
                @click="isChangeDialogVisible = false"
              >
                {{ $t("cancel") }}
              </v-btn>

              <v-btn type="button" @click="goToPayment()">
                {{ $t("confirm") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.accountDetails {
  .v-card {
    border-radius: 16px;
    box-shadow: 0 4px 24px 0 #0000000f !important;
  }
}

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
  margin-block: 20px;
  margin-inline: 0;
  padding-block-end: 50px;

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
      color: #000;
      font-family: Cairo-Bold;
      font-size: 36px;
      font-weight: 700;
      line-height: 67.46px;
      margin-block-end: 10px;

      span {
        display: inline-block;
        font-family: Cairo-Light;
        font-size: 20px;
        font-weight: 300;
        line-height: 37.48px;
      }
    }

    .package-tax {
      display: block;
      font-family: Cairo-Semibold;
      font-size: 16px;
      font-weight: 600;
      inline-size: 80%;
      line-height: 29.98px;
    }

    span {
      color: #000;
      font-family: Cairo-Medium;
      font-size: 16px;
      font-weight: 500;
      line-height: 29.98px;
    }
  }

  .expire_date {
    display: flex;
    align-items: center;

    // justify-content: center;
    border-radius: 17.5px;
    background: #157d99;
    color: #fff;
    font-family: Cairo-Regular;
    font-size: 16px;
    font-weight: 400;
    gap: 7px;
    inline-size: fit-content;
    line-height: 29.98px;
    margin-block: 20px 70px;
    padding-block: 4px;
    padding-inline: 10px;

    p {
      margin: 0;
    }

    @media (max-width: 500px) {
      inline-size: 80%;
    }

    @media (max-width: 400px) {
      inline-size: 98%;
    }
  }

  .button-container-package {
    button {
      font-family: Cairo-Regular;
      font-size: 14px;
      font-weight: 400;
      letter-spacing: 0.4000000059604645px;
      line-height: 26.24px;
      text-align: center;

      @media (max-width: 500px) {
        inline-size: 55%;
      }
    }

    @media (max-width: 500px) {
      flex-direction: column;
      align-items: start;
    }
  }
}
</style>
