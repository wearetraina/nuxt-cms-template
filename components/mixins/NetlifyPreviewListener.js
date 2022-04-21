function NetlifyPreviewListener(callback){
  function updateCallback(e){
    const {action, data} = e.data;
    if (action === 'render') {
        callback(data);
    }
  }

  window.addEventListener('message', updateCallback)

  function cleanup(){
    window.removeEventListener('message', updateCallback);
  }

  window.parent.window.postMessage({action: 'mounted'});

  return cleanup;

}

export default NetlifyPreviewListener;
