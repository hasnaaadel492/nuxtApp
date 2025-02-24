<template>
  <div style="position: relative; display: flex">
    <!-- hidden navbar -->
    <transition>
      <div class="overlay" @close="hideSideNav" v-if="sideNavIsVisable">
        <div class="close" @click="hideSideNav"></div>
        <div class="list">
          <ul class="list hidden_list">
            <!-- <li>
              <router-link to="/features" @click="hideSideNav">{{
                $t('features')
              }}</router-link>
            </li>
            <li>
              <router-link to="/system-terminologys" @click="hideSideNav">
                {{ $t('systemTerminologys') }}</router-link
              >
            </li> -->
            <li>
              <router-link to="/advantages" @click="hideSideNav">{{
                $t("advantages")
              }}</router-link>
            </li>

            <li>
              <router-link to="/packages" @click="hideSideNav">{{
                $t("packages")
              }}</router-link>
            </li>

            <li>
              <router-link to="/applications" @click="hideSideNav">{{
                $t("applications")
              }}</router-link>
            </li>

            <li>
              <router-link to="/devices" @click="hideSideNav">{{
                $t("devices")
              }}</router-link>
            </li>

            <li>
              <router-link to="/blogs" @click="hideSideNav">
                {{ $t("blog") }}</router-link
              >
            </li>
            <li>
              <router-link to="/aboutUs" @click="hideSideNav">{{
                $t("about7L")
              }}</router-link>
            </li>

            <li>
              <router-link to="/contactUs" @click="hideSideNav">
                {{ $t("contactUs") }}</router-link
              >
            </li>
          </ul>
        </div>

        <div
          class="joinButtons"
          style="
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 7px;
          "
        >
          <!-- <NavBarI18n class="mx-1" style="color: #fff" /> -->
          lang

          <router-link
            to="/auth/login"
            v-if="!auth.isAuthenticated"
            @click="hideSideNav"
          >
            <button class="renewHeaderButton d-flex align-center">
              <span class="text">{{ $t("members_login") }}</span>
            </button>
          </router-link>

          <router-link
            to="/packages"
            v-if="!auth.isAuthenticated"
            @click="hideSideNav"
          >
            <MainButton
              :content="buttoncontent"
              class="headerButton d-flex align-center"
          /></router-link>
        </div>
      </div>
    </transition>
    <div
      :class="['newNavbar', { scrolled: isScrolled }]"
      v-if="!sideNavIsVisable"
    >
      <!-- shown navbar -->
      <div class="contain">
        <router-link to="/" class="d-flex align-center gap-x-2">
          <img src="@/assets/images/newLogo2.png" alt="logo" />
        </router-link>

        <nav>
          <ul
            class="list"
            style="margin-bottom: 0 !important; list-style: none"
          >
            <!-- <li>
              <router-link to="/features">{{ $t('features') }}</router-link>
            </li>
            <li>
              <router-link to="/system-terminologys">
                {{ $t('systemTerminologys') }}</router-link
              >
            </li> -->
            <li>
              <router-link to="/advantages">{{ $t("advantages") }}</router-link>
            </li>

            <li>
              <router-link to="/packages">{{ $t("packages") }}</router-link>
            </li>
            <li>
              <router-link to="/applications">{{
                $t("applications")
              }}</router-link>
            </li>

            <li>
              <router-link to="/devices">{{ $t("devices") }}</router-link>
            </li>

            <li>
              <router-link to="/blogs">{{ $t("blog") }}</router-link>
            </li>
            <li>
              <router-link to="/aboutUs">{{ $t("about7L") }}</router-link>
            </li>

            <li>
              <router-link to="/contactUs"> {{ $t("contactUs") }}</router-link>
            </li>
          </ul>
        </nav>

        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 15px;
          "
        >
          <div class="buttonsNav" style="display: flex; gap: 10px">
            <!-- <NavBarI18n class="mx-1" /> -->
            lang

            <router-link
              to="/auth/login"
              v-if="!auth.isAuthenticated"
              @click="hideSideNav"
            >
              <button class="renewHeaderButton d-flex align-center">
                <span class="text">{{ $t("members_login") }}</span>
              </button>
            </router-link>

            <router-link
              to="/packages"
              v-if="!auth.isAuthenticated"
              @click="hideSideNav"
            >
              <MainButton
                :content="buttoncontent"
                class="headerButton d-flex align-center"
            /></router-link>
          </div>
          <!-- <AppUserHeader v-if="token" style="margin-top: 6px" /> -->
          <AppUserHeader v-if="auth.isAuthenticated" style="margin-top: 6px" />

          <a class="bars" @click="showSideNav">
            <VIcon icon="mdi-menu" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// import NavBarI18n from '@/layouts/components/NavBarI18n.vue'
// import { authStore } from '../../pages/auth/store/authStore'
import { ref } from "vue";

// Reactive data properties
const sideNavIsVisable = ref<boolean>(false);

const buttoncontent = ref<string>("joinUs");
const isScrolled = ref<boolean>(false);

// const auth = authStore()
const auth = {
  isAuthenticated: false,
};
const accessToken = useCookie("accessToken");

const isLoggedIn = computed(
  () => Boolean(accessToken.value) || auth.isAuthenticated
);

// Methods
const showSideNav = (): void => {
  sideNavIsVisable.value = true;
};

const hideSideNav = (): void => {
  sideNavIsVisable.value = false;
};

const handleScroll = (): void => {
  isScrolled.value = window.scrollY > 0;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.newNavbar {
  position: fixed;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 50px;
  margin: auto;
  background-color: #fff !important;
  block-size: 85px;
  box-shadow: 0 4px 8px -4px rgba(var(--v-shadow-key-umbra-color), 0.42),
    0 0 0 transparent, 0 0 transparent;
  inline-size: 92%;
  inset-block-start: 0;
  inset-block-start: 2px;
  inset-inline-end: 67px;
  margin-block-end: 50px;
  margin-block-start: 21px;
  padding-block-end: 5px;
  padding-block-start: 5px;
  padding-inline-end: 18px;
  padding-inline-start: 18px;
  transition: 0.3s all ease-in-out;
  will-change: transform;

  @media (max-width: 1199px) {
    display: contents !important;
    flex-direction: column !important;
    padding: 0 !important;
    margin: 0 !important;
    inline-size: 100% !important; // Full width on mobile devices
    margin-block-start: 21px !important;
    margin-inline-start: 15px !important;
    padding-inline-start: 18px !important;
  }

  &.scrolled {
    margin-block-start: 0;
    transition: margin-block-start 0.3s ease;
  }
}

.display_none {
  display: none;
}

.contain {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 0;
  block-size: 100%;
  inline-size: 100% !important;

  img {
    block-size: 40px;
    cursor: pointer;
    line-height: 0;
    object-fit: cover;
  }
}

router-link {
  cursor: pointer;
  text-transform: uppercase;
  transition: all 0.3s linear;
}

.list {
  display: flex;
  column-gap: 5px;
  list-style: none;

  a {
    color: #000 !important;
    cursor: pointer !important;
    font-family: Cairo-Medium;
    font-size: 16px;
    font-weight: 500 !important;
    line-height: 29.98px;
    padding-inline: 10px;

    &:hover::before {
      opacity: 0 !important;
    }
  }

  .router-link-active {
    background: none;
    color: #157d99 !important;
    font-family: Cairo-Bold;
    font-size: 16px;
    font-weight: 500 !important;
    font-weight: 700;
    line-height: 29.98px;
  }
}

.bars {
  display: none;
  cursor: pointer;
}

.overlay {
  position: fixed;
  z-index: 100;
  display: none;
  background-color: #000000bf;
  block-size: 100%;
  inline-size: 100%;
}

.close {
  position: relative;
  z-index: 1;
  display: block;
  block-size: 28px;
  color: #fff;
  cursor: pointer;
  font-style: initial;
  font-weight: initial;
  inline-size: 22px;
  letter-spacing: initial;
  margin-block: 20px 0;
  margin-inline: auto 20px;
  text-align: end;
}

.close::before {
  content: "\2715";
  font-size: 28px !important;
}

.close:hover {
  animation: closeAnimation ease-in-out 0.8s;
  color: var(--vt-c-volite);
  transition: 0.3s all ease-in-out;
}

.v-enter-from {
  transform: translateX(-50px);
}

.v-enter-active {
  transition: 0.3s ease-out;
}

.v-enter-to {
  transform: translateX(0);
}

.v-leave-from {
  transform: translateX(0);
}

.v-leave-active {
  transition: 0.3s ease-in;
}

.v-leave-to {
  transform: translateX(-50px);
}

@media (max-width: 1200px) {
  .overlay {
    display: block;
  }

  .buttons {
    display: none !important;
  }

  .contain {
    justify-content: flex-start !important;
    text-align: center;
  }

  .bars {
    display: block;
  }

  .list {
    margin: auto;
    list-style: none;
    margin-block-start: 1.5rem;
    text-align: center;
  }

  ul {
    list-style: none;
  }

  li {
    display: block;
    font-size: 1.3rem;
    inline-size: 100%;
    padding-block: 15px;
    padding-inline: 0;
  }

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    color: #a1a1a1;
    cursor: pointer;
  }

  .contain nav .list {
    display: none;
  }
}

@media (max-width: 760px) {
  .bars img {
    // margin-left: 25px;
    block-size: 45px;
    inline-size: 35px;
  }
}

@media (max-width: 1200px) {
  a {
    margin-inline-start: 0 !important;
  }

  nav,
  .buttonsNav {
    display: none !important;
  }

  .contain {
    display: flex;
    align-items: center;
    justify-content: space-between !important;
    padding: 8px !important;
    inline-size: 100% !important;
    justify-items: center;
    margin-block: 0;
    margin-inline: 13px;
    text-align: center;

    .logo {
      margin: auto;
    }

    .bars {
      margin: auto;
      color: #000;
    }
  }
}

.hidden_list {
  flex-direction: column;
  inline-size: 100%;

  a {
    color: #fff !important;
  }
}

.joinButtons {
  .headerButton {
    inline-size: 175px !important;
  }
}

nav {
  display: flex;

  a {
    color: #000 !important;
    cursor: pointer !important;
    font-family: Cairo-Medium;
    font-size: 16px;
    font-weight: 500 !important;
    line-height: 29.98px;
    padding-inline: 10px;

    &:hover::before {
      opacity: 0 !important;
    }
  }

  .router-link-active {
    background: none;
    color: #157d99 !important;
    font-family: Cairo-Bold;
    font-size: 16px;
    font-weight: 500 !important;
    font-weight: 700;
    line-height: 29.98px;
  }
}
</style>
