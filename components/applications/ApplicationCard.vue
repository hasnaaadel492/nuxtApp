<script setup lang="ts">
import { gsap } from "gsap";
import { onMounted } from "vue";

defineProps<{
  ApplicationCardData: {
    id: number;
    applications_section_image: null;
    title: string;
    description: string;
    is_active: boolean;
  };
}>();

const truncateHTML = (html: string, limit: number) => {
  const div = document.createElement("div");
  div.innerHTML = html;

  let charCount = 0;
  const traverseNodes = (node: Node): string => {
    if (charCount >= limit) return "";

    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent || "";
      const remaining = limit - charCount;
      const truncatedText = text.slice(0, remaining);
      charCount += truncatedText.length;
      return truncatedText;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as HTMLElement;
      let html = `<${element.tagName.toLowerCase()}`;
      for (const attr of element.attributes) {
        html += ` ${attr.name}="${attr.value}"`;
      }
      html += ">";

      for (const child of element.childNodes) {
        html += traverseNodes(child);
        if (charCount >= limit) break;
      }

      html += `</${element.tagName.toLowerCase()}>`;
      return html;
    }

    return "";
  };

  return traverseNodes(div);
};
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
    :to="`/applications/${ApplicationCardData.id}`"
    style="display: flex; justify-content: center"
  >
    <div class="card-container">
      <div class="card-content">
        <div class="logo-container">
          <img :src="ApplicationCardData.applications_section_image" />
        </div>
        <div class="text-content">
          <h2>{{ ApplicationCardData.title }}</h2>
          <!-- <p v-html="truncateHTML(ApplicationCardData.description, 170)"></p> -->
        </div>
        <!-- <div
          style="
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: start;
          "
        >
          <span
            style="
              padding: 5px 15px;
              border-radius: 4px;
              background-color: rgb(36 58 150 / 13%);
              color: rgb(36 58 150);
              font-family: Cairo-SemiBold;
              font-size: 15px;
            "
          >
            {{ $t('test-period') }}
          </span>
        </div> -->
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
