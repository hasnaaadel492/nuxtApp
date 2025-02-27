<script setup lang="ts">
import Step from "primevue/step";
import StepList from "primevue/steplist";
import StepPanel from "primevue/steppanel";
import StepPanels from "primevue/steppanels";
import Stepper from "primevue/stepper";
import { ref } from "vue";
import PaymentComponent from "./PaymentComponent.vue";
import PersonalDetailsComponent from "./PersonalDetailsComponent.vue";
import SummaryComponent from "./SummaryComponent.vue";
import AppHeading from "@/@core/components/AppHeading.vue";

import { useAuthStore } from "@/stores/authStore";
import { registerStore } from "@/stores/registerStore";

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import type { VForm } from "vuetify/components/VForm";

const subtitle = ref("subscribe_in_package");
const mainPargraph = "mainPargraph";

const activeStep = ref(1);

const registerData = registerStore();
const auth = useAuthStore();

const isFormValid = ref(false);
const isFormValid2 = ref(false);
const refForm2 = ref<VForm>();

const refForm = ref<VForm | null>(null);

const subscribeAndRegister = async () => {
  registerData
    .register()
    .then((res: any) => {
      activeStep.value = 3;
    })
    .catch((error) => {});
};

onMounted(() => {
  const lang = useCookie("lang").value;
  if (lang === "en") {
    const selectors = [".chervonIcon"];

    selectors.forEach((selector) => {
      const elements = document.querySelectorAll(`.subscripitions ${selector}`);

      elements.forEach((element) => {
        element.style.transform = "rotate(180deg)";
      });
    });
  }
});

watch(activeStep, (newStep) => {
  if (activeStep.value === 1) {
    subtitle.value = "subscribe_in_package";
    nextTick(() => {
      window.scrollTo(0, 0);
    });
  } else if (activeStep.value === 2) {
    subtitle.value = "subscribe_in_package";
    nextTick(() => {
      window.scrollTo(0, 0);
    });
  } else if (activeStep.value === 3) {
    subtitle.value = "choosing_payment_method";
    nextTick(() => {
      window.scrollTo(0, 0);
    });
  }
});

const handleUpdateActiveStep = (stepChange: any) => {
  activeStep.value += stepChange;
};
</script>

<template>
  <div class="subscripitions">
    <VContainer>
      <div
        class="d-flex justify-center align-center"
        style="flex-direction: column"
      >
        <!-- Start Heading -->

        <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
      </div>
      <div class="wizard">
        <div class="card">
          <Stepper v-model:value="activeStep">
            <StepList class="v-row mb-6">
              <VCol cols="12" md="4" sm="4" xs="12">
                <Step
                  v-slot="{ activateCallback, value, a11yAttrs }"
                  asChild
                  :value="1"
                >
                  <div v-bind="a11yAttrs.root">
                    <button class="step_button border-0 v-row" disabled>
                      <VCol cols="12" md="3">
                        <span
                          :class="[
                            ' w-12 h-12 ',
                            {
                              activeStepIcon: value <= activeStep,

                              notActiveStepIcon: value > activeStep,
                            },
                          ]"
                        >
                          <i class="pi pi-user" />
                        </span>
                      </VCol>
                      <VCol cols="12" md="7">
                        <div>
                          <p
                            class="step_title"
                            :class="[
                              {
                                activeStepTitle: value === activeStep,
                              },
                            ]"
                          >
                            {{ $t("data") }}
                          </p>

                          <span class="step_subtitle">{{
                            $t("personal_store_data")
                          }}</span>
                        </div>
                      </VCol>

                      <VCol cols="12" md="1" class="chervonIcon">
                        <i class="pi pi-chevron-left" />
                      </VCol>
                    </button>
                    <Divider />
                  </div>
                </Step>
              </VCol>
              <VCol cols="12" md="4" sm="4" xs="12">
                <Step
                  v-slot="{ activateCallback, value, a11yAttrs }"
                  asChild
                  :value="2"
                >
                  <div v-bind="a11yAttrs.root">
                    <button class="border-0 v-row step_button" disabled>
                      <VCol cols="12" md="3">
                        <span
                          :class="[
                            'w-12 h-12 ',
                            {
                              activeStepIcon: value <= activeStep,

                              notActiveStepIcon: value > activeStep,
                            },
                          ]"
                        >
                          <i class="pi pi-home" />
                        </span>
                      </VCol>
                      <VCol cols="12" md="7">
                        <div>
                          <p
                            class="step_title"
                            :class="[
                              {
                                activeStepTitle: value === activeStep,
                              },
                            ]"
                          >
                            {{ $t("subscribtion_summary") }}
                          </p>

                          <span class="step_subtitle">{{
                            $t("subscription_details")
                          }}</span>
                        </div>
                      </VCol>

                      <VCol cols="12" md="1" class="chervonIcon">
                        <i class="pi pi-chevron-left" />
                      </VCol>
                    </button>
                    <Divider />
                  </div>
                </Step>
              </VCol>
              <VCol cols="12" md="4" sm="4" xs="12">
                <Step
                  v-slot="{ activateCallback, value, a11yAttrs }"
                  asChild
                  :value="3"
                >
                  <div v-bind="a11yAttrs.root">
                    <button disabled class="step_button border-0 v-row">
                      <VCol cols="12" md="3">
                        <span
                          :class="[
                            'w-12 h-12 ',
                            {
                              activeStepIcon: value <= activeStep,

                              notActiveStepIcon: value > activeStep,
                            },
                          ]"
                        >
                          <i class="pi pi-id-card" /> </span
                      ></VCol>
                      <VCol cols="12" md="9">
                        <div>
                          <p
                            class="step_title"
                            :class="[
                              {
                                activeStepTitle: value === activeStep,
                              },
                            ]"
                          >
                            {{ $t("payment") }}
                          </p>

                          <span class="step_subtitle">{{
                            $t("payment_methods")
                          }}</span>
                        </div>
                      </VCol>
                    </button>
                  </div>
                </Step>
              </VCol>
            </StepList>
            <StepPanels>
              <StepPanel v-slot="{ activateCallback }" :value="1">
                <PersonalDetailsComponent
                  :active-step="activeStep"
                  @updateActiveStep="handleUpdateActiveStep"
                />
              </StepPanel>

              <StepPanel
                v-slot="{ activateCallback }"
                :value="2"
                v-if="activeStep == 2"
              >
                <SummaryComponent
                  :active-step="activeStep"
                  @updateActiveStep="handleUpdateActiveStep"
                />
              </StepPanel>
              <StepPanel
                v-slot="{ activateCallback }"
                :value="3"
                v-if="activeStep == 3"
              >
                <PaymentComponent :is-active="activeStep === 3" />
              </StepPanel>
            </StepPanels>
          </Stepper>
        </div>
      </div>
    </VContainer>
  </div>
</template>

<style lang="scss">
.m-input-wrapper {
  inline-size: 100% !important;
}

.subscripitions {
  padding-block-start: 74px;

  @media (max-width: 1200px) {
    padding-block-start: 20px;
  }

  .heading {
    margin-block-end: -6px;
  }

  .wizard {
    margin: auto;
    background-color: #fff !important;
    box-shadow: 0 0 34px 0 #00000012;
    inline-size: 70%;
    padding-block: 50px;
    padding-inline: 40px;

    @media (max-width: 1280px) {
      inline-size: 92% !important;

      // padding-inline: 10px;
    }

    @media (max-width: 960px) {
      inline-size: 62% !important;
    }

    @media (max-width: 670px) {
      inline-size: 92% !important;

      // padding-inline: 10px;
    }

    @media (max-width: 570px) {
      inline-size: 100% !important;
      padding-inline: 10px;
    }
  }

  .step_button {
    inline-size: 100%;
  }

  .step_title {
    color: #6e6b7b;
    font-family: Cairo-SemiBold;
    font-size: 17.2px;
    font-weight: 600;
    line-height: 25.79px;
    margin-block-end: 0 !important;
    text-align: start;

    @media (max-width: 599px) {
      text-align: center !important;
    }
  }

  .step_subtitle {
    display: block;
    color: #b9b9c3;
    font-family: Cairo-Regular;
    font-size: 14.74px;
    font-weight: 400;
    line-height: 22.11px;
    text-align: start;

    @media (max-width: 599px) {
      text-align: center !important;
    }
  }

  .chervonIcon {
    margin-block: 10px;
    margin-inline: auto;

    @media (max-width: 960px) {
      display: none !important;
    }

    .pi {
      color: #6e6b7b;
      font-size: 13px;
    }
  }

  .btn {
    position: relative;
    display: inline-block;
    box-sizing: border-box;
    border-width: 0;
    border-radius: 24px;
    margin: 0;
    appearance: none;
    background: linear-gradient(142.84deg, #157d99 0%, #70a1e5 100%);
    block-size: 47px;
    color: #fff;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    inline-size: 16%;
    letter-spacing: 0;
    line-height: 1em;
    opacity: 1;
    outline: 0;
    text-align: center;
    text-decoration: none;
    text-rendering: geometricprecision;
    touch-action: manipulation;
    transition: opacity 30000ms cubic-bezier(0.694, 0, 0.335, 1),
      background-color 100ms cubic-bezier(0.694, 0, 0.335, 1),
      color 100ms cubic-bezier(0.694, 0, 0.335, 1);
    user-select: none;
    vertical-align: baseline;
    white-space: nowrap;

    @media (max-width: 500px) {
      block-size: 40px;
      font-size: 12px;
      inline-size: 100% !important;
    }
  }

  .subscribeAndPayBtn {
    padding: 12px;
    inline-size: fit-content;
  }
}

.activeStepIcon {
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: linear-gradient(142.84deg, #157d99 0%, #70a1e5 100%) !important;
  block-size: 46.67px;
  box-shadow: 0 3.68px 7.37px 0 #7266ef66;
  color: #fff;
  inline-size: 47.41px;
}

.notActiveStepIcon {
  display: block;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background: #f7f7f8 !important;
  block-size: 46.67px;
  color: #7367f0;
  inline-size: 47.41px;
}

.activeStepTitle {
  color: #157d99 !important;
}
</style>
