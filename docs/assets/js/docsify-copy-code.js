/*!
 * docsify-copy-code
 * v2.1.1
 * https://github.com/jperasmus/docsify-copy-code
 * (c) 2017-2020 JP Erasmus <jperasmus11@gmail.com>
 * MIT license
 */
!(function () {
  'use strict'
  function s(o) {
    return (s =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (o) {
            return typeof o
          }
        : function (o) {
            return o &&
              'function' == typeof Symbol &&
              o.constructor === Symbol &&
              o !== Symbol.prototype
              ? 'symbol'
              : typeof o
          })(o)
  }
  !(function (o, e) {
    void 0 === e && (e = {})
    var t = e.insertAt
    if (o && 'undefined' != typeof document) {
      var n = document.head || document.getElementsByTagName('head')[0],
        c = document.createElement('style')
      ;(c.type = 'text/css'),
        'top' === t && n.firstChild
          ? n.insertBefore(c, n.firstChild)
          : n.appendChild(c),
        c.styleSheet
          ? (c.styleSheet.cssText = o)
          : c.appendChild(document.createTextNode(o))
    }
  })(
    '.docsify-copy-code-button,.docsify-copy-code-button span{cursor:pointer;transition:all .25s ease}.docsify-copy-code-button{position:absolute;z-index:1;top:0;right:0;overflow:visible;padding:.65em .8em;border:0;border-radius:0;outline:0;font-size:1em;background:grey;background:var(--theme-color,grey);color:#fff;opacity:0}.docsify-copy-code-button span{border-radius:3px;background:inherit;pointer-events:none}.docsify-copy-code-button .error,.docsify-copy-code-button .success{position:absolute;z-index:-100;top:50%;right:0;padding:.5em .65em;font-size:.825em;opacity:0;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.docsify-copy-code-button.error .error,.docsify-copy-code-button.success .success{right:100%;opacity:1;-webkit-transform:translate(-115%,-50%);transform:translate(-115%,-50%)}.docsify-copy-code-button:focus,pre:hover .docsify-copy-code-button{opacity:1}'
  ),
    document.querySelector('link[href*="docsify-copy-code"]') &&
      console.warn(
        '[Deprecation] Link to external docsify-copy-code stylesheet is no longer necessary.'
      ),
    (window.DocsifyCopyCodePlugin = {
      init: function () {
        return function (o, e) {
          o.ready(function () {
            console.warn(
              '[Deprecation] Manually initializing docsify-copy-code using window.DocsifyCopyCodePlugin.init() is no longer necessary.'
            )
          })
        }
      },
    }),
    (window.$docsify = window.$docsify || {}),
    (window.$docsify.plugins = [
      function (o, r) {
        o.doneEach(function () {
          var o = Array.apply(
              null,
              document.querySelectorAll('pre[data-lang]')
            ),
            c = {
              buttonText: '复制文本',
              errorText: '错误',
              successText: '成功',
            }
          r.config.copyCode &&
            Object.keys(c).forEach(function (t) {
              var n = r.config.copyCode[t]
              'string' == typeof n
                ? (c[t] = n)
                : 'object' === s(n) &&
                  Object.keys(n).some(function (o) {
                    var e = -1 < location.href.indexOf(o)
                    return (c[t] = e ? n[o] : c[t]), e
                  })
            })
          var e = [
            '<button class="docsify-copy-code-button">',
            '<span class="label">'.concat(c.buttonText, '</span>'),
            '<span class="error">'.concat(c.errorText, '</span>'),
            '<span class="success">'.concat(c.successText, '</span>'),
            '</button>',
          ].join('')
          o.forEach(function (o) {
            o.insertAdjacentHTML('beforeend', e)
          })
        }),
          o.mounted(function () {
            document
              .querySelector('.content')
              .addEventListener('click', function (o) {
                if (o.target.classList.contains('docsify-copy-code-button')) {
                  var e =
                      'BUTTON' === o.target.tagName
                        ? o.target
                        : o.target.parentNode,
                    t = document.createRange(),
                    n = e.parentNode.querySelector('code'),
                    c = window.getSelection()
                  t.selectNode(n), c.removeAllRanges(), c.addRange(t)
                  try {
                    document.execCommand('copy') &&
                      (e.classList.add('success'),
                      setTimeout(function () {
                        e.classList.remove('success')
                      }, 1e3))
                  } catch (o) {
                    console.error('docsify-copy-code: '.concat(o)),
                      e.classList.add('error'),
                      setTimeout(function () {
                        e.classList.remove('error')
                      }, 1e3)
                  }
                  'function' == typeof (c = window.getSelection()).removeRange
                    ? c.removeRange(t)
                    : 'function' == typeof c.removeAllRanges &&
                      c.removeAllRanges()
                }
              })
          })
      },
    ].concat(window.$docsify.plugins || []))
})()
//# sourceMappingURL=docsify-copy-code.min.js.map
