<template>
  <!-- 👉 Footer: left content -->

  <footer class="footer">
    <VContainer>
      <VRow>
        <VCol cols="12" md="4" sm="12">
          <div>
            <div class="logo">
              <img :src="about_us.image" style="height: 40px; line-height: 0" />
            </div>
            <div class="content">
              <p>
                {{ about_us.description }}
              </p>
            </div>
            <div class="socials">
              <VList>
                <VListItem v-for="social in socials">
                  <VIcon :icon="social.icon" />
                </VListItem>
              </VList>
            </div>
          </div>
        </VCol>
        <VCol cols="12" md="4" sm="12">
          <div>
            <h3>{{ $t("websiteMap") }}</h3>
            <VList class="headers-list">
              <div class="column">
                <VListItem
                  v-for="(head, index) in headers.slice(0, 5)"
                  :key="index"
                  class="headers"
                >
                  <img
                    src="@/assets/images/Icon-Stroke.svg"
                    class="arrowIcon"
                  />
                  <router-link :to="head.pathLink">{{
                    $t(head.title)
                  }}</router-link>
                </VListItem>
              </div>
              <div class="column">
                <VListItem
                  v-for="(head, index) in headers.slice(5)"
                  :key="index"
                  class="headers"
                >
                  <img
                    src="@/assets/images/Icon-Stroke.svg"
                    class="arrowIcon"
                  />
                  <router-link :to="head.pathLink">{{
                    $t(head.title)
                  }}</router-link>
                </VListItem>
              </div>
            </VList>
          </div>
        </VCol>
        <VCol cols="12" md="4" sm="12">
          <div>
            <h3>{{ $t("contactsData") }}</h3>

            <div style="margin-block-start: 49px">
              <VRow
                v-for="key in contactKeysOrder"
                :key="key"
                class="contactInfos"
                style="flex-wrap: nowrap; gap: 8px; margin-block-end: 25px"
              >
                <div
                  v-if="getIcon(key)"
                  class="iconDiv"
                  :style="iconStyle(getIcon(key).color)"
                >
                  <img :src="getIcon(key).icon" />
                </div>
                <div class="info">
                  <div v-if="key === 'phone'" style="margin-top: 0">
                    <p>
                      <!-- <span class="contact-title"> الرئيسي : </span> -->
                      <span>
                        {{ contacts.phone.main }}
                      </span>

                      <span v-if="contacts.phone.main && contacts.phone.office">
                        /
                      </span>

                      <!-- <span class="contact-title"> المكتب : </span> -->
                      <span class="">
                        {{ contacts.phone.office }}
                      </span>
                    </p>
                  </div>
                  <div v-else-if="key === 'email'">
                    <p>{{ contacts.email }}</p>
                  </div>
                  <div v-else-if="key === 'address'">
                    <p>{{ contacts.address }}</p>
                  </div>
                </div>
              </VRow>
            </div>
          </div>
        </VCol>
      </VRow>
    </VContainer>
  </footer>
</template>
<script setup lang="ts">
import locationIcon from "@/assets/images/icons/location.svg";
import messageIcon from "@/assets/images/icons/message.svg";

import addressIcon from "@/assets/images/icons/location.svg";
import emailIcon from "@/assets/images/icons/message.svg";
import phoneIcon from "@/assets/images/icons/phone.svg";

const iconStyle = (color) => {
  return {
    backgroundColor: `${color} !important`,
  };
};

const contactKeysOrder = ["phone", "email", "address"];

const icons = [
  {
    key: "phone",
    icon: phoneIcon,
    color: "#E89271",
  },
  {
    key: "email",
    icon: emailIcon,
    color: "#F0C274",
  },
  {
    key: "address",
    icon: addressIcon,
    color: "#70A1E5",
  },
];
const getIcon = (key) => {
  return icons.find((icon) => icon.key === key);
};
const contacts = ref({
  address: "",
  email: "",
  phone: {
    main: "",
    office: "",
  },
});

const about_us = ref({
  description: "",
  image: "",
});
const getContacts = async () => {
  try {
    const { $api } = useNuxtApp(); // ✅ No need to import!
    const data = await $api<{
      body: { about_company: { description: string } };
    }>("/web-setting/webSettings");

    contacts.value.email = data.body.contacts.email;
    contacts.value.phone.main = data.body.contacts.phone.main;
    contacts.value.phone.office = data.body.contacts.phone.office;
    contacts.value.address = data.body.contacts.address;
    about_us.value.description = data.body.about_us.description;
    about_us.value.image = data.body.about_us.image;

    const mainPhone = useCookie("MainPhone");
    mainPhone.value = data.body.contacts.phone.main;
  } catch (error) {
    console.error("Error fetching company info:", error);
  }
};

watchEffect(() => {
  getContacts();
  const lang = useCookie("lang");

  if (lang.value == "en") {
    nextTick(() => {
      const headerList = document.querySelector(".headers-list");

      if (!headerList) {
        console.warn("`.headers-list` not found in the DOM.");
        return;
      }

      const selectors = [".arrowIcon"];

      selectors.forEach((selector) => {
        const elements = headerList.querySelectorAll(selector);

        if (elements.length === 0) {
          console.warn(`No elements found for selector: ${selector}`);
        } else {
          elements.forEach((element) => {
            element.style.transform = "rotate(180deg)";
          });
        }
      });
    });
  }
});
const headers = [
  { title: "home", pathLink: "/" },

  { title: "advantages", pathLink: "/advantages" },
  { title: "packages", pathLink: "/packages" },
  { title: "applications", pathLink: "/applications" },
  { title: "devices", pathLink: "/devices" },
  { title: "blog", pathLink: "/blogs" },
  { title: "about7L", pathLink: "/aboutUs" },

  { title: "contactUs", pathLink: "/contactUs" },
  { title: "privacy", pathLink: "/privacy" },
  { title: "terms", pathLink: "/terms" },
];

const contactInfos = [
  {
    label: "رقم الجوال ",
    value: "01032014789",
    icon: phoneIcon,
    color: "#E89271",
  },
  {
    label: "البريد الالكتروني ",
    value: "aaaaaaaaaaaaaaa@aaaaa.com",
    icon: messageIcon,
    color: "#F0C274",
  },
  {
    label: "العنوان ",
    value: "يوضع هنا العنوان بالتفصيل ",
    icon: locationIcon,
    color: "#70A1E5",
  },
];
</script>

<style lang="scss">
.footer {
  background: #f3f8f9;
  margin-block-start: 130px;
  padding-block-end: 55px;
  padding-block-start: 20px;

  .v-list,
  .v-list-item,
  svg {
    background: transparent !important;
  }

  .content {
    p {
      color: #000;
      font-family: Cairo-Light;
      font-size: 16px;
      font-weight: 300;
      inline-size: 70%;
      line-height: 29.98px;
      margin-block-end: 0;
      margin-block-start: 15px;
      text-align: justify;
    }
  }

  .socials {
    background: transparent;

    .v-list {
      display: flex;
      background: transparent !important;

      .v-list-item {
        background: transparent !important;
        padding-inline-end: 2px;

        svg {
          background: transparent !important;
          block-size: 21px !important;
          color: #000;
          font-size: 16px;
          font-weight: 400;
          inline-size: 19px !important;
          line-height: 20px;
          transition: 0.3s all ease-in-out;

          &:hover {
            color: #157d99 !important;
            cursor: pointer;
            transition: 0.3s all ease-in-out;
          }
        }
      }
    }
  }

  .headers-list {
    display: flex;
    flex-wrap: wrap;

    .v-list {
      margin-block-start: 13px;
    }

    .column {
      flex: 1;

      .v-list-item {
        padding-block-end: 0 !important;
      }
    }

    .headers {
      display: flex;
      align-items: center;

      a {
        color: #000;
        font-family: Cairo-Light;
        font-size: 16px !important;
        font-weight: 300;
        line-height: 29.98px;
      }

      img {
        display: inline-block;
        margin-inline-end: 7px;
      }
    }
  }

  .contactInfos {
    .iconDiv {
      block-size: 34.19px;
      inline-size: 34.19px;

      img {
        inline-size: 55%;
      }
    }

    .info {
      h6 {
        color: #000 !important;
        font-size: 20px;
        font-weight: 700;
        line-height: 37.48px;
      }

      p {
        margin: 0;
        color: #000;
        font-family: Cairo-Medium;
        font-size: 16px;
        font-weight: 500;
        line-height: 29.98px;
      }
    }
  }

  h3 {
    color: #000;
    font-size: 16px;
    font-weight: 700;
    line-height: 29.98px;
  }
}

.headerButton {
  block-size: 47px;
  inline-size: 144px;

  button {
    block-size: 100% !important;
    font-family: Cairo-Bold;
    font-size: 14px;
    font-weight: 700;
    inline-size: 100% !important;
    line-height: 18.7px;
    margin-block-end: 0 !important;
  }
}

@media (max-width: 787px) {
  .footer {
    margin-block-start: 30px;
    padding-block-end: 25px;
    padding-block-start: 20px;
    padding-inline-start: 5px;

    .content p {
      inline-size: 90%;
    }
  }
}

.nonTop {
  inset-block-start: 0 !important;
  margin-block-start: 0 !important;
  transition: 0.3s all ease-in-out;
}

.contact-title {
  color: #000;
  font-family: Cairo-Medium;
  font-size: 16px;
  font-weight: 500;
  line-height: 19.15px;
}

.contact-title2 {
  font-family: Cairo-Light;
  font-size: 16px;
  font-weight: 300;
  line-height: 19.15px;
}
</style>
