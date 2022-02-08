<template>
  <div v-if="image === ''">Image Block</div>
  <nuxt-img v-else :src="image" :alt="alt"></nuxt-img>
</template>

<script>
export default {
  name: "CmsBlockImage",
  props:{
    image:{
      type:String,
      default:'',
    },
    alt:{
      type:String,
      default:'',
    },
  }
}
</script>

<style scoped>

</style>
