<script lang="ts" setup>
import BlogsCarousal from "@/components/blogs/BlogsCarousal.vue";
import AppHeading from "@/@core/components/AppHeading.vue";

const subtitle = "blog";
const mainPargraph = "mainPargraph";
const { $api } = useNuxtApp();
const blogs = ref([]);
const fetchBlogs = async () => {
  try {
    const data = await $api<{}>(`/blog/blogs`);

    blogs.value = data.body.blogs.data;
  } catch (error) {
    console.error("Error fetching devices:", error);
  }
};
onMounted(() => {
  fetchBlogs();
});
</script>

<template>
  <div class="blogs">
    <div
      class="d-flex justify-center align-center"
      style="flex-direction: column"
    >
      <!-- Start Heading -->

      <AppHeading :subtitle="subtitle" :mainPargraph="mainPargraph" />
      <!-- End Heading -->

      <!-- Start:: Blogs -->
      <!-- <VContainer> -->
      <!-- <BlogCard /> -->

      <BlogsCarousal :blogs="blogs" />

      <!-- </VContainer> -->

      <!-- End:: Blogs -->
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
