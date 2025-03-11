export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", async () => {
    const { $axios } = useNuxtApp();
    const { data } = await $axios("/web-setting/webSettings");

    if (!data) return;

    const seoData = data.body.search_engine_optimizations;
    const snapEventName = data.body.snap_pixel?.event_name;
    const snapEventId = data.body.snap_pixel?.event_id;
    const gtmId = data.body.google_tag?.gtm_id;

    useHead({
      meta: [
        {
          property: "og:image",
          content:
            seoData.find((tag) => tag.name === "image")?.content ||
            "https://dev.7lerp.com/assets/newLogo2-22f01317.png",
        },
        {
          property: "og:description",
          content:
            seoData.find((tag) => tag.name === "description")?.content ||
            "Default description",
        },
        {
          property: "og:title",
          content: seoData.find((tag) => tag.name === "title")?.content || "حل",
        },
        {
          property: "og:url",
          content:
            seoData.find((tag) => tag.name === "url")?.content ||
            "https://dev.7lerp.com/",
        },
      ],
      link: [
        {
          rel: "icon",
          href:
            seoData.find((tag) => tag.name === "image")?.content ||
            "https://dev.7lerp.com/assets/newLogo2-D_QLPUSN.png",
        },
      ],
      script: [
        {
          innerHTML: `
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0], j=d.createElement(s),
              dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
            `,
        },
        {
          innerHTML: `
            (function(e,t,n){
              if(e.snaptr) return;
              var a=e.snaptr=function(){
                a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments);
              };
              a.queue=[];
              var s='script', r=t.createElement(s);
              r.async=!0;
              r.src=n;
              var u=t.getElementsByTagName(s)[0];
              u.parentNode.insertBefore(r,u);
            })(window,document,'https://sc-static.net/scevent.min.js');
  
            snaptr('init', '${snapEventId}', { user_email: '__INSERT_USER_EMAIL__' });
            snaptr('track', '${snapEventName}');
            `,
        },
      ],
    });
  });
});
