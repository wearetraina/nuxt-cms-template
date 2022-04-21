const NetlifyPreviewMixin = (callbackName) => {
  return {
    methods: {
      $updateNetlifyPreview(e) {

      },
    },
    created() {
      if (process.client) {
        window.addEventListener('message', this.$updateNetlifyPreview)
      }
    },
    mounted() {
      if (process.client) {
        window.parent.window.postMessage({action: 'mounted'});
      }
    },
    beforeDestroy() {
      if (process.client) {
        window.removeEventListener('message', this.$updateNetlifyPreview);
      }
    },
  };
}


export default NetlifyPreviewMixin;
