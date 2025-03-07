export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = () => {
    // Replace with your actual authentication check logic
    return !!useCookie("accessToken").value;
  };

  function isPaid() {
    const userDataString = useCookie("userData").value;

    if (userDataString) {
      const userData = userDataString;
      return userData.status === "active";
    }

    return false;
  }

  if (to.name === "subscriptions" && isLoggedIn()) {
    return navigateTo("/");
  }

  if (
    (to.path === "/user/account-settings/store" ||
      to.path === "/user/account-settings/subscriptions") &&
    !isPaid()
  ) {
    return navigateTo("/");
  }

  // if (
  //   to.path === '/user/account-settings/account' &&
  //   !isPaid() &&
  //   !isLoggedIn()
  // ) {
  //   return navigateTo('/not-authorized')
  // }

  if (to.meta.requiresAuth && !isLoggedIn()) {
    return navigateTo("/login");
  }
});
