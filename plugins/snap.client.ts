export default defineNuxtPlugin((nuxtApp) => {
  if (window.snaptr) return;
  const script = document.createElement("script");
  script.src = "https://sc-static.net/scevent.min.js";
  script.async = true;
  document.head.appendChild(script);

  script.onload = () => {
    window.snaptr("init", "YOUR_SNAP_PIXEL_ID");
    window.snaptr("track", "YOUR_SNAP_EVENT_NAME");
  };
});
