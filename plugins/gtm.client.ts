export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", async () => {
    const { $axios } = useNuxtApp();
    const { data } = await $axios("/web-setting/webSettings");

    if (!data) return;

    const gtmId = data.body.google_tag?.gtm_id;

    if (!gtmId) return;

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      "gtm.start": new Date().getTime(),
      event: "gtm.js",
    });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(script);
  });
});
