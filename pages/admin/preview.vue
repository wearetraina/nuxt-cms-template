<script>
//import NetlifyPreviewMixin from "~/components/mixins/NetlifyPreviewMixin.js";
import Vue from 'vue/dist/vue.common.js';

import NetlifyPreviewListener from "~/components/mixins/NetlifyPreviewListener.js"

export default {

  name: "preview",
  //mixins:[NetlifyPreviewMixin('updatePreview')],
  data(){
    return {
      previewData: {},
      previewContentBody: Vue.compile(`<div></div>`),
    }
  },
  created() {
    if(process.client) {
      window.DEBUG_PREVIEW_VIEW = this;
    }
  },
  mounted(){
    if(process.client){
      this.cleanup = NetlifyPreviewListener(this.updatePreview);
    }
  },
  beforeDestroy() {
    if(this.cleanup){
      this.cleanup();
      this.cleanup = null;
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
    updatePreview(data){
      this.previewData = data;
      this.createCompiledComponent(data.body);
    }
  }
}
</script>

<template>
  <div>
    <netlify-cms-block-display v-for="item in previewData['before-body']" :key="item.uuid" :block="item" />
    <component :is="previewContentBody"></component>
    <netlify-cms-block-display v-for="item in previewData['after-body']" :key="item.uuid"  :block="item" />
  </div>
</template>


<style scoped>

</style>
