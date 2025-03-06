<script setup lang="ts">
// import { useUserListStore } from '@/modules/admin/services/useUserListStore'
import { useAuthStore } from "@/stores/authStore";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

const { t } = useI18n();
const router = useRouter();

// Retrieve userData from localStorage
const route = useRoute();
const { $axios } = useNuxtApp();
const logout2 = () => {
  $axios.post(`/tenant-owner/logout`).then((res) => {
    useCookie("userData").value = "";
    useCookie("accessToken").value = "";

    useCookie("userId").value = "";
    useCookie("packageId").value = "";
    useCookie("packageDetails").value = "";
    useCookie("NewTotalAfterDiscount").value = "";

    // router.replace(route.query.to ? String(route.query.to) : '/')

    router.replace("/");

    // setTimeout(() => {
    //   window.location.reload()
    // }, 50)
  });
};

const logout = () => {
  $axios.post(`/tenant-owner/logout`).then((res) => {
    useCookie("couponCode").value = "";

    useCookie("userData").value = "";
    useCookie("accessToken").value = "";

    useCookie("userId").value = "";
    useCookie("packageId").value = "";
    useCookie("packageDetails").value = "";
    useCookie("NewTotalAfterDiscount").value = "";

    auth.clearAuth(); // Make sure this method clears auth state

    router.replace("/");
  });
};

const auth = useAuthStore();

const username = computed(() => auth.userProfile?.username || "");
const userAvatar = computed(() => auth.userProfile?.avatar || null);

const userProfileList = [
  {
    type: "navItem",

    title: "profile_page",
    to: { name: "user-tab", params: { tab: "account" } },
  },

  { type: "divider" },
  { type: "navItem", icon: "mdi-logout", title: "logout", onClick: logout },
];

const menuExpanded = ref(false);

const handleNameClick = async (event: Event) => {
  const target = event.target as HTMLElement;

  if (target.classList.contains("name") || target.classList.contains("title")) {
    menuExpanded.value = !menuExpanded.value;
  }
};

const handleArrowClick = async (event: Event) => {
  const target = event.target as HTMLElement;

  if (
    target.classList.contains("playIcon") ||
    target.classList.contains("playIconActive")
  ) {
    menuExpanded.value = !menuExpanded.value;
  }
  menuExpanded.value = !menuExpanded.value;
};

watch(menuExpanded, (newVal) => {
  if (newVal) {
  } else {
  }
});

onMounted(() => {
  auth.fetchProfile();
});
</script>

<template>
  <div class="profileButton">
    <VBadge
      dot
      bordered
      location="bottom right"
      offset-x="3"
      offset-y="3"
      color="success"
    >
      <VAvatar
        class="cursor-pointer"
        :color="!userAvatar ? 'primary' : undefined"
        :variant="!userAvatar ? 'tonal' : undefined"
        :aria-expanded="menuExpanded"
      >
        <VImg v-if="userAvatar" :src="userAvatar" />
        <VIcon v-else icon="mdi-account-outline" />

        <!-- SECTION Menu -->
        <VMenu
          width="190"
          location="bottom end"
          offset="14px"
          v-model="menuExpanded"
          activator="parent"
        >
          <VList>
            <!-- <PerfectScrollbar :options="{ wheelPropagation: false }"> -->
            <template v-for="item in userProfileList" :key="item.title">
              <VListItem
                v-if="item.type === 'navItem'"
                :to="item.to"
                @click="item.onClick && item.onClick()"
              >
                <VListItemTitle>{{ $t(item.title) }}</VListItemTitle>
              </VListItem>

              <VDivider v-else class="m-2" />
            </template>
            <!-- </PerfectScrollbar> -->
          </VList>
        </VMenu>
        <!-- !SECTION -->
      </VAvatar>
      <div class="name">
        <h4
          class="title"
          :class="{ highlight: menuExpanded }"
          @click="handleNameClick"
        >
          {{
            username.length > 15 ? "..." + username.substring(0, 15) : username
          }}
        </h4>
        <h6
          class="playIcon"
          :class="{ playIconActive: menuExpanded }"
          @click="handleArrowClick"
        >
          <VIcon icon="mdi-play" />
        </h6>
      </div>
    </VBadge>
  </div>
</template>

<style lang="scss">
.profileButton {
  // Name
  .v-badge__wrapper {
    align-items: center;
  }

  .name {
    display: flex;
    cursor: pointer;
    justify-items: center;
    margin-inline-start: 15px;

    .title {
      color: #6e6b7b;
      font-family: Cairo-Regular;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;
    }

    .subtitle {
      color: #b9b9c3;
      font-family: Cairo-Regular;
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
    }
  }
}

.highlight {
  color: #157d99 !important;
}

.v-overlay__content {
  border-radius: 2px !important;
  background: #fff !important;
  inset-block-start: 82.4px !important;
}

.playIcon {
  color: #157d99;
  font-size: 12px;
  margin-inline: 3px;
  transform: rotate(90deg);
  transition: all ease-in-out 0.3s;
}

.playIconActive {
  transform: rotate(180deg);
  transition: all ease-in-out 0.3s;
}

.v-badge--dot .v-badge__badge {
  inset-inline-start: 0 !important;
}
</style>
