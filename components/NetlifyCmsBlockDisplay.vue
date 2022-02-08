<template>
  <component :is="block.type" v-bind="mergeOptions">
      <netlify-cms-block-display v-for="childBlock in block.children" :key="childBlock.uuid" :block="childBlock"/>
  </component>
</template>

<script>
export default {
  name: "NetlifyCmsBlockDisplay",
  props:{
    block:{
      type:Object,
      required:true,
    }
  },
  computed:{
    mergeOptions(){
      const opt = this.block.optionalFields || {};
      const attr = this.block.requiredFields || {};
      return {...attr, ...opt};
    },
  }
}
</script>

<style scoped>

</style>
