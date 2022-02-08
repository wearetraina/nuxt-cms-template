
<script>
export default {
  name: "Markdown",
  props:{
    content:{
      type:String,
      default:'',
    }
  }
}
</script>

<template>
  <render-markdown :content="content" :key="content"/>
</template>

<style scoped>

</style>
