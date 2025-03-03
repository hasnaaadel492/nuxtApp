export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", async () => {
    const { $axios } = useNuxtApp();
    const { data } = await $axios("/web-setting/webSettings");

    if (!data) return;

    const snapEventName = data.body.snap_pixel?.event_name;
    const snapEventId = data.body.snap_pixel?.event_id;
    if (window.snaptr) return;
    const script = document.createElement("script");
    script.src = "https://sc-static.net/scevent.min.js";
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.snaptr("init", snapEventId);
      window.snaptr("track", snapEventName);
    };
  });
});
