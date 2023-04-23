window.intercomSettings = {
  app_id: 'fbxl0g49'
}

// We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/fbxl0g49'
function startIntercom () {
  const w = window
  const ic = w.Intercom
  if (typeof ic === 'function') {
    ic('reattach_activator')
    ic('update', w.intercomSettings)
  } else {
    const d = document
    var i = function () {
      i.c(arguments)
    }
    i.q = []
    i.c = function (args) {
      i.q.push(args)
    }
    w.Intercom = i
    const l = function () {
      const s = d.createElement('script')
      s.type = 'text/javascript'
      s.async = true
      s.src = 'https://widget.intercom.io/widget/fbxl0g49'
      const x = d.getElementsByTagName('script')[0]
      x.parentNode.insertBefore(s, x)
    }
    if (w.attachEvent) {
      w.attachEvent('onload', l)
    } else {
      w.addEventListener('load', l, false)
    }
  }
}

startIntercom()
