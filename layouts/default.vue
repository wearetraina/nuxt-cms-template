<script>
export default {
  name:"DefaultLayout",
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
