<script>
export default {
  name:"DefaultLayout",
  script: [
    { src: "https://identity.netlify.com/v1/netlify-identity-widget.js" },
  ],
  meta: [
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
}
</script>

<template>
  <div>
    <a href="#main-content" class="sr-only skip-link">Skip to Content</a>
    <page-header />
    <main id="main-content">
      <nuxt />
    </main>
    <page-footer />
  </div>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
