<script>
export default {
  async asyncData({$content, params, error}) {
    const slug = params.slug || "index"
    const page = await $content(`pages`, slug)
        .fetch()
        .catch((err) => {
          error({statusCode: 404, message: "Page not found"})
        })

    return {
      page,
    }
  },
  mounted() {

  },
  head() {
    return {
      title: `${process.env.SITE_TITLE} - ${this.page.title}`,
      meta: [
        {
          name: "title",
          content: `${process.env.SITE_TITLE} - ${this.page?.metaTitle ?? this.page.title}`,
        },
        {name: "description", content: this.page.description},
        {name: "url", content: `${process.env.BASE_URL}${this.$route.fullPath}`},
        {
          name: "image",
          content: `${process.env.BASE_URL}/images/share-image.png`,
        },
        {
          name: "og:title",
          content: `${process.env.SITE_TITLE} - ${this.page?.metaTitle ?? this.page.title}`,
        },
        {name: "og:description", content: this.page.description},
        {
          name: "og:image",
          content: `${process.env.BASE_URL}/images/share-image.png`,
        },
      ],
    }
  },
}
</script>

<template>
  <div>
    <netlify-cms-block-display v-for="item in page['before-body']" :key="item.uuid" :block="item"/>
    <nuxt-content :document="page"/>
    <netlify-cms-block-display v-for="item in page['after-body']" :key="item.uuid" :block="item"/>
  </div>
</template>

