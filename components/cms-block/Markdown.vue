
<script>
export default {
  name: "Markdown",
  props:{
    content:{
      type:String,
      required:true,
    }
  }
}
</script>

<template>
  <render-markdown :content="content"/>
</template>

<style scoped>

</style>
