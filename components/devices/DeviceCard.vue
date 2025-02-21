<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted } from "vue";

defineProps<{
  DeviceCardData: {
    id: number;
    device_image: null;
    title: string;
    description: string;
    is_active: boolean;
  };
}>();

onMounted(() => {
  const cards = document.querySelectorAll(".card-container");
  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      gsap.to(card, {
        scale: 1.08,
        duration: 0.4,
        boxShadow: "0 12px 20px rgba(0, 0, 0, 20%)",
        ease: "power3.out", // Smooth easing for entry
      });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(card, {
        scale: 1,
        duration: 0.6,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 10%)",
        ease: "power2.out", // Smooth easing for exit
      });
    });
  });
});
</script>

<template>
  <router-link
    :to="`/devices/${DeviceCardData.id}`"
    style="display: flex; justify-content: center"
  >
    <div class="card-container">
      <div class="card-content">
        <div class="logo-container">
          <img :src="DeviceCardData.device_image" />
        </div>

        <div class="text-content">
          <h2>{{ DeviceCardData.title }}</h2>
        </div>
      </div>
    </div>
  </router-link>
</template>

<style scoped>
.card-container {
  padding: 20px;
  border: 1px solid #cfdae0;
  border-radius: 16px;
  background-color: rgba(250, 250, 250, 20%);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 10%);
  inline-size: 100%;
  max-inline-size: 400px;
  min-block-size: 370px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.text-content {
  inline-size: 100%;
}

h2 {
  color: #000;
  font-family: Cairo-SemiBold;
  font-size: 16px;
  margin-block-end: 7px;
  margin-block-start: 10px;
}

p {
  color: #101010;
  font-family: Cairo-Light;
  font-size: 14px;
  line-height: 26px;
}

.logo-container {
  display: flex;
  align-items: center;
  border-radius: 8px;
  block-size: 242px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 10%);
  gap: 10px;
  inline-size: 100%;
}

img {
  border-radius: 8px;
  block-size: 100%;
  inline-size: 100%;
  object-fit: cover;
}
</style>
