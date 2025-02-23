<script lang="ts" setup>
import contact_facebook from "@/assets/images/contacts/contact_facebook.svg";
import contact_instagram from "@/assets/images/contacts/contact_instagram.svg";
import contact_location from "@/assets/images/contacts/contact_location.svg";
import contact_message from "@/assets/images/contacts/contact_message.svg";
import contact_phone from "@/assets/images/contacts/contact_phone.svg";
import contact_twitter from "@/assets/images/contacts/contact_twitter.svg";
import contact_whatsapp from "@/assets/images/contacts/contact_whatsapp.svg";

import { useGeolocation } from "@/@core/composable/useGeolocation ";
import { useCookie } from "#app";
const { latitude, longitude, error } = useGeolocation();

const contacts = ref({
  address: "",
  email: "",
  phone: {
    main: "",
    office: "",
  },
  location: {
    long: "",
    lat: "",
    map: "",
  },
});

const socials = ref({
  twitter: "",
  facebook: "",
  instagram: "",
});

const getContactInfo = async () => {
  try {
    const { $api } = useNuxtApp(); // ✅ No need to import!
    const data = await $api<{
      body: { about_company: { description: string } };
    }>("/web-setting/webSettings");

    contacts.value.address = data.body.contacts.address;
    contacts.value.email = data.body.contacts.email;
    contacts.value.phone.main = data.body.contacts.phone.main;
    contacts.value.phone.office = data.body.contacts.phone.office;

    contacts.value.location.long = data.body.contacts.location.long;
    contacts.value.location.lat = data.body.contacts.location.lat;
    contacts.value.location.map = data.body.contacts.location.map;

    socials.value.twitter = data.body.social.twitter;
    socials.value.facebook = data.body.social.facebook;
    socials.value.instagram = data.body.social.instagram;
    const mainPhone = useCookie("MainPhone");
    mainPhone.value = data.body.contacts.phone.main;
  } catch (error) {
    console.error("Error fetching company info:", error);
  }
};

const mapSrc = computed(() => {
  const { lat, long } = contacts.value.location;
  return `https://www.openstreetmap.org/export/embed.html?bbox=${
    long - 0.05
  }%2C${lat - 0.05}%2C${long + 0.05}%2C${
    lat + 0.05
  }&layer=mapnik&marker=${lat}%2C${long}`;
});

const iframeWidth = ref(100);
const iframeHeight = ref(240);

const modifiedIframeHtml = computed(() => {
  let iframeHtml = contacts.value.location.map;
  const width = iframeWidth.value;
  const height = iframeHeight.value;

  // Replace width and height attributes in the iframe HTML
  iframeHtml = iframeHtml.replace(/width="\d+"/, `width="${width}%"`);
  iframeHtml = iframeHtml.replace(/height="\d+"/, `height="${height}"`);

  return iframeHtml;
});

watchEffect(getContactInfo);
</script>

<template>
  <div class="contactInfo">
    <div class="contactInfo-heading">
      <h3>{{ $t("contactsData") }}</h3>
    </div>

    <div class="contactInfo-list">
      <ul>
        <li class="info-item">
          <img :src="contact_location" alt="" />
          <span class="title"> {{ contacts.address }}</span>
        </li>

        <li class="info-item" v-if="contacts.phone.office">
          <img :src="contact_phone" alt="" />
          <span class="title"> {{ contacts.phone.office }}</span>
        </li>

        <li class="info-item" v-if="contacts.phone.main">
          <img :src="contact_whatsapp" alt="" />
          <span class="title"> {{ contacts.phone.main }}</span>
        </li>

        <li class="info-item">
          <img :src="contact_message" alt="" />
          <span class="title"> {{ contacts.email }}</span>
        </li>
      </ul>

      <ul>
        <li class="info-item">
          <img :src="contact_twitter" alt="" />
          <span class="title">
            <router-link :to="socials.twitter" target="_blank">
              {{ socials.twitter }}</router-link
            >
          </span>
        </li>

        <li class="info-item">
          <img :src="contact_instagram" alt="" />
          <span class="title">
            <router-link :to="socials.instagram" target="_blank">
              {{ socials.instagram }}</router-link
            >
          </span>
        </li>

        <li class="info-item">
          <img :src="contact_facebook" alt="" />
          <span class="title">
            <router-link :to="socials.facebook" target="_blank">
              {{ socials.facebook }}</router-link
            >
          </span>
        </li>
      </ul>
    </div>
  </div>

  <!-- MAP -->

  <div class="mt-5">
    <div v-html="modifiedIframeHtml"></div>

    <div>
      <!-- <Map
        :latitude="contacts.location.long"
        :longitude="contacts.location.lat"
      /> -->
    </div>
  </div>
</template>

<style lang="scss">
.contactInfo {
  background-color: #fff;
  box-shadow: 0 0 34px 0 #00000012;
  padding-block: 20px;
  padding-inline: 40px;

  .map-container {
    block-size: 100%;
    inline-size: 100%;
    margin-block: 0;
    margin-inline: auto;
    max-inline-size: 600px;
  }

  iframe {
    border: 0;
    block-size: 250px;
    inline-size: 100%;
  }

  h3 {
    color: #000;
    font-family: Cairo-Regular;
    font-size: 32.57px;
    font-weight: 400;
    letter-spacing: -0.02em;
    line-height: 45.6px;
    margin-block-end: 34px;
    margin-block-start: 24px;
  }

  .contactInfo-list {
    ul {
      list-style: none;

      li {
        margin-block-end: 5px;
        margin-inline: 0;

        .title,
        a {
          display: inline-block;
          color: #000;
          font-family: Cairo-Regular;
          font-size: 17.37px;
          font-weight: 400;
          letter-spacing: -0.02em;
          line-height: 45.6px;
        }

        .title {
          margin-inline-start: 30px;
        }

        a:hover {
          color: #157d99;
        }
      }
    }
  }
}
</style>
