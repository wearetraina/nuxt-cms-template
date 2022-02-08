<script>

import Vue from 'vue/dist/vue.common.js';

export default {

  name: "preview",
  data(){
    return {
      previewContent:{},
      previewContentBody: Vue.compile(`<div></div>`),
    }
  },
  created() {
    if(process.client) {
      window.addEventListener('message',this.updatePreview)
      window.DEBUG_PREVIEW_VIEW = this;
    }
  },
  mounted(){
    if(process.client){
      window.parent.window.postMessage({action:'mounted'});
    }
  },
  beforeDestroy() {
    if(process.client){
      window.removeEventListener('message', this.updatePreview);
    }
  },
  methods:{
    async createCompiledComponent(body){
      if(process.server){
        this.previewContentBody = Vue.compile(`<div></div>`);
        return;
      }
      const {micromark} = await import('micromark');
      const parsedBody = micromark(body);
      this.previewContentBody = Vue.compile(`<div>${parsedBody}</div>`);
    },
    updatePreview(e){
      const {action,data} = e.data;

      if(action === 'render'){
        this.$nextTick(()=>{
          console.log('render action: ', data);
          this.previewContent = data;
          this.createCompiledComponent(data.body);
        });
      }

    }
  }
}
</script>

<template>
  <div>
    <netlify-cms-block-display v-for="item in previewContent['before-body']" :key="item.uuid" :block="item" />
    <component :is="previewContentBody"></component>
    <netlify-cms-block-display v-for="item in previewContent['after-body']" :key="item.uuid"  :block="item" />
  </div>
</template>


<style scoped>

</style>
