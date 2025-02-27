export default defineNuxtPlugin((nuxtApp) => {
  const script = document.createElement("script");
  script.src = "https://cdn.moyasar.com/mpf/1.14.0/moyasar.js";
  document.head.appendChild(script);
});
