
export const GeneratePreview = (type, properties=null) => {

  const {createClass, h} = window;
  let previewDataCMS = {}
  let PreviewIframeRef = null;

  let postData = null;

  window.addEventListener('message',(e)=>{
      const {action} = e.data;
      if(action === 'mounted' && postData instanceof Function){
        postData();
      }
  })

  function setIFrameRef(element){
    PreviewIframeRef = element;
  }


  return createClass({
    render: function () {
      const {entry} = this.props
      const data = {type}
      const keys = (properties || [...entry.get('data').keys()])
      if (Array.isArray(keys)) {
        keys.forEach((key) => {
          try {
            const tmp = entry.getIn(['data', key])
            data[key] = tmp === 'undefined' ? '' : tmp
          } catch (e) {
            console.log('Catch keys: ', e)
          }
        })
        try {
          data.mediaFiles = entry.get('mediaFiles')
        } catch (e) {
          console.log(e)
        }
      }
      data.raw = entry.get('raw');


      let host = window.location.host
      const isLocal = ['localhost', '127.0.0.1', '0.0.0.0'].includes((host || 'default-online').split(':')[0])
      const src = `${isLocal ? 'http' : 'https'}://${host}/admin/preview`
      // This will force it out of react notation into a normal object.
      previewDataCMS = JSON.parse(JSON.stringify(data));
      if (PreviewIframeRef){
        postData = () => {
          PreviewIframeRef.contentWindow.postMessage({action: 'render', data: previewDataCMS}, src);
        }
        postData();
      }
      return h('iframe', {
        src,
        ref: setIFrameRef,
        border: 0,
        width: "100%",
        height: "100%",
        style: {border: "1px solid #EEE", height: "calc(100vh - 80px)"}
      })
    },
  });
}
