<script>

export default {
  name: "RenderMarkdown",
  data(){
    return {
      renderedMarkdown:'',
    };
  },
  props:{
    content:{
      type:String,
      required: true,
    },
  },
  fetchKey:'content',
  async fetch(){
    const {micromark} = await import('micromark');
    this.renderedMarkdown = micromark(this.content||'');
  }
}
</script>

<template>
  <div v-bind="$attrs" v-html="renderedMarkdown" />
</template>


<style scoped>

</style>
