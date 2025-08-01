!(function () {
  function s(n) {
    var r = Object.create(null)
    return function (e) {
      var t = c(e) ? e : JSON.stringify(e)
      return r[t] || (r[t] = n(e))
    }
  }
  var o = s(function (e) {
    return e.replace(/([A-Z])/g, function (e) {
      return '-' + e.toLowerCase()
    })
  }),
    l = Object.prototype.hasOwnProperty,
    y = Object.assign ||
      function (e) {
        for (var t = arguments, n = 1; n < arguments.length; n++) {
          var r, i = Object(t[n])
          for (r in i) l.call(i, r) && (e[r] = i[r])
        }
        return e
      }
  function c(e) {
    return 'string' == typeof e || 'number' == typeof e
  }
  function u() { }
  function r(e) {
    return 'function' == typeof e
  }
  function p(e) {
    e = e.match(/^([^:/?#]+:)?(?:\/{2,}([^/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/)
    return (
      ('string' == typeof e[1] && 0 < e[1].length && e[1].toLowerCase() !== location.protocol)
      || ('string' == typeof e[2] && 0 < e[2].length && e[2].replace(new RegExp(':(' + { 'http:': 80, 'https:': 443 }[location.protocol] + ')?$'), '') !== location.host)
    )
  }
  var h = document.body.clientWidth <= 600,
    i = window.history && window.history.pushState && window.history.replaceState && !navigator.userAgent.match( /((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/ ),
    n = {}
  function d(e, t) {
    if ((void 0 === t && (t = !1), 'string' == typeof e)) {
      if (void 0 !== window.Vue) return b(e)
      e = t ? b(e) : n[e] || (n[e] = b(e))
    }
    return e
  }
  var f = document, g = f.body, m = f.head
  function b(e, t) {
    return t ? e.querySelector(t) : f.querySelector(e)
  }
  function k(e, t) {
    return [].slice.call(t ? e.querySelectorAll(t) : f.querySelectorAll(e))
  }
  function v(e, t) {
    return (e = f.createElement(e)), t && (e.innerHTML = t), e
  }
  function a(e, t) {
    return e.appendChild(t)
  }
  function w(e, t) {
    return e.insertBefore(t, e.children[0])
  }
  function x(e, t, n) {
    r(t) ? window.addEventListener(e, t) : e.addEventListener(t, n)
  }
  function _(e, t, n) {
    r(t) ? window.removeEventListener(e, t) : e.removeEventListener(t, n)
  }
  function S(e, t, n) {
    e && e.classList[n ? t : 'toggle'](n || t)
  }
  function e(e, t) {
    void 0 === t && (t = document)
    var n = t.readyState
    if ('complete' === n || 'interactive' === n) return setTimeout(e, 0)
    t.addEventListener('DOMContentLoaded', e)
  }
  var t = Object.freeze({
    __proto__: null,
    getNode: d,
    $: f,
    body: g,
    head: m,
    find: b,
    findAll: k,
    create: v,
    appendTo: a,
    before: w,
    on: x,
    off: _,
    toggleClass: S,
    style: function (e) {
      a(m, v('style', e))
    },
    documentReady: e,
  }),
    A = decodeURIComponent,
    T = encodeURIComponent
  function E(e) {
    var t = {}
    return (
      (e = e.trim().replace(/^(\?|#|&)/, '')) &&
      e.split('&').forEach(function (e) {
        e = e.replace(/\+/g, ' ').split('=')
        t[e[0]] = e[1] && A(e[1])
      }),
      t
    )
  }
  function R(e, t) {
    void 0 === t && (t = [])
    var n, r = []
    for (n in e)
      -1 < t.indexOf(n) || r.push(e[n] ? (T(n) + '=' + T(e[n])).toLowerCase() : T(n))
    return r.length ? '?' + r.join('&') : ''
  }
  var O = s(function (e) {
    return /(:|(\/{2}))/g.test(e)
  }),
    $ = s(function (e) {
      return e.split(/[?#]/)[0]
    }),
    F = s(function (e) {
      if (/\/$/g.test(e)) return e
      e = e.match(/(\S*\/)[^/]+$/)
      return e ? e[1] : ''
    }),
    C = s(function (e) {
      return e.replace(/^\/+/, '/').replace(/([^:])\/{2,}/g, '$1/')
    }),
    L = s(function (e) {
      for (
        var t = e.replace(/^\//, '').split('/'), n = [], r = 0, i = t.length;
        r < i;
        r++
      ) {
        var o = t[r]
        '..' === o ? n.pop() : '.' !== o && n.push(o)
      }
      return '/' + n.join('/')
    })
  function z(e) {
    return e.split('/').filter(function (e) {
        return -1 === e.indexOf('#')
      }).join('/')
  }
  function N() {
    for (var e = [], t = arguments.length; t--;) e[t] = arguments[t]
    return C(e.map(z).join('/'))
  }
  var M = s(function (e) {
    return e.replace('#', '?id=')
  })
  function D(e, t) {
    return -1 !== e.indexOf(t, e.length - t.length)
  }
  var P = {}
  var I = function (e) {
    this.config = e
  }
  function j(e) {
    var t = location.href.indexOf('#')
    location.replace(location.href.slice(0, 0 <= t ? t : 0) + '#' + e)
  }
  ; (I.prototype.getBasePath = function () {
    return this.config.basePath
  }),
    (I.prototype.getFile = function (e, t) {
      void 0 === e && (e = this.getCurrentPath())
      var n,
        r,
        i = this.config,
        o = this.getBasePath(),
        a = 'string' == typeof i.ext ? i.ext : '.md'
      return (
        (e = i.alias
          ? (function e(t, n, r) {
            var i = Object.keys(n).filter(function (e) {
              return ((P[e] || (P[e] = new RegExp('^' + e + '$'))).test(t) && t !== r)
            })[0]
            return i ? e(t.replace(P[i], n[i]), n, t) : t
          })(e, i.alias)
          : e),
        (n = e),
        (r = a),
        (e = ((e = new RegExp('\\.(' + r.replace(/^\./, '') + '|html)$', 'g').test(n)
            ? n : /\/$/g.test(n) ? n + 'README' + r : '' + n + r) === '/README' + a && i.homepage) || e),
        (e = O(e) ? e : N(o, e)), t && (e = e.replace(new RegExp('^' + o), '')),
        e
      )
    }),
    (I.prototype.onchange = function (e) {
      void 0 === e && (e = u), e()
    }),
    (I.prototype.getCurrentPath = function () { }),
    (I.prototype.normalize = function () { }),
    (I.prototype.parse = function () { }),
    (I.prototype.toURL = function (e, t, n) {
      var r = n && '#' === e[0],
        i = this.parse(M(e))
      if (
        ((i.query = y({}, i.query, t)),
          (e = (e = i.path + R(i.query)).replace(/\.md(\?)|\.md$/, '$1')),
          r && (e = (0 < (r = n.indexOf('?')) ? n.substring(0, r) : n) + e),
          this.config.relativePath && 0 !== e.indexOf('/'))
      ) {
        n = n.substring(0, n.lastIndexOf('/') + 1)
        return C(L(n + e))
      }
      return C('/' + e)
    })
  var H = (function (r) {
    function e(e) {
      r.call(this, e), (this.mode = 'hash')
    }
    return (
      r && (e.__proto__ = r),
      (((e.prototype = Object.create(r && r.prototype)).constructor =
        e).prototype.getBasePath = function () {
          var e = window.location.pathname || '',
            t = this.config.basePath,
            e = D(e, '.html') ? e + '#/' + t : e + '/' + t
          return /^(\/|https?:)/g.test(t) ? t : C(e)
        }),
      (e.prototype.getCurrentPath = function () {
        var e = location.href,
          t = e.indexOf('#')
        return -1 === t ? '' : e.slice(t + 1)
      }),
      (e.prototype.onchange = function (n) {
        void 0 === n && (n = u)
        var r = !1
        x('click', function (e) {
          e = 'A' === e.target.tagName ? e.target : e.target.parentNode
          e && 'A' === e.tagName && !/_blank/.test(e.target) && (r = !0)
        }),
          x('hashchange', function (e) {
            var t = r ? 'navigate' : 'history'
              ; (r = !1), n({ event: e, source: t })
          })
      }),
      (e.prototype.normalize = function () {
        var e = this.getCurrentPath()
        if ('/' === (e = M(e)).charAt(0)) return j(e)
        j('/' + e)
      }),
      (e.prototype.parse = function (e) {
        void 0 === e && (e = location.href)
        var t = '',
          n = e.indexOf('#')
        0 <= n && (e = e.slice(n + 1))
        n = e.indexOf('?')
        return (
          0 <= n && ((t = e.slice(n + 1)), (e = e.slice(0, n))),
          { path: e, file: this.getFile(e, !0), query: E(t) }
        )
      }),
      (e.prototype.toURL = function (e, t, n) {
        return '#' + r.prototype.toURL.call(this, e, t, n)
      }),
      e
    )
  })(I),
    q = (function (t) {
      function e(e) {
        t.call(this, e), (this.mode = 'history')
      }
      return (
        t && (e.__proto__ = t),
        (((e.prototype = Object.create(t && t.prototype)).constructor =
          e).prototype.getCurrentPath = function () {
            var e = this.getBasePath(),
              t = window.location.pathname
            return (
              e && 0 === t.indexOf(e) && (t = t.slice(e.length)),
              (t || '/') + window.location.search + window.location.hash
            )
          }),
        (e.prototype.onchange = function (n) {
          var r = this
          void 0 === n && (n = u),
            x('click', function (e) {
              var t = 'A' === e.target.tagName ? e.target : e.target.parentNode
              t &&
                'A' === t.tagName &&
                !/_blank/.test(t.target) &&
                (e.preventDefault(),
                  (t = t.href),
                  -1 !== r.config.crossOriginLinks.indexOf(t)
                    ? window.open(t, '_self')
                    : window.history.pushState({ key: t }, '', t),
                  n({ event: e, source: 'navigate' }))
            }),
            x('popstate', function (e) {
              n({ event: e, source: 'history' })
            })
        }),
        (e.prototype.parse = function (e) {
          void 0 === e && (e = location.href)
          var t = '',
            n = e.indexOf('?')
          0 <= n && ((t = e.slice(n + 1)), (e = e.slice(0, n)))
          var r = N(location.origin),
            n = e.indexOf(r)
          return (
            -1 < n && (e = e.slice(n + r.length)),
            { path: e, file: this.getFile(e), query: E(t) }
          )
        }),
        e
      )
    })(I),
    U = {}
  var B = /([^{]*?)\w(?=\})/g,
    Z = {
      YYYY: 'getFullYear',
      YY: 'getYear',
      MM: function (e) {
        return e.getMonth() + 1
      },
      DD: 'getDate',
      HH: 'getHours',
      mm: 'getMinutes',
      ss: 'getSeconds',
      fff: 'getMilliseconds',
    }
  var G,
    W = Object.hasOwnProperty,
    V = Object.setPrototypeOf,
    Y = Object.isFrozen,
    X = Object.getPrototypeOf,
    K = Object.getOwnPropertyDescriptor,
    Fe = Object.freeze,
    Q = Object.seal,
    J = Object.create,
    ee = 'undefined' != typeof Reflect && Reflect,
    te =
      (te = ee.apply) ||
      function (e, t, n) {
        return e.apply(t, n)
      },
    Fe =
      Fe ||
      function (e) {
        return e
      },
    Q =
      Q ||
      function (e) {
        return e
      },
    ne =
      (ne = ee.construct) ||
      function (e, t) {
        return new (Function.prototype.bind.apply(
          e,
          [null].concat(
            (function (e) {
              if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++)
                  n[t] = e[t]
                return n
              }
              return Array.from(e)
            })(t)
          )
        ))()
      },
    Ce = re(Array.prototype.forEach),
    Le = re(Array.prototype.pop),
    ze = re(Array.prototype.push),
    Ne = re(String.prototype.toLowerCase),
    Me = re(String.prototype.match),
    De = re(String.prototype.replace),
    Pe = re(String.prototype.indexOf),
    Ie = re(String.prototype.trim),
    je = re(RegExp.prototype.test),
    He =
      ((G = TypeError),
        function () {
          for (
            var e = arguments, t = arguments.length, n = Array(t), r = 0;
            r < t;
            r++
          )
            n[r] = e[r]
          return ne(G, n)
        })
  function re(o) {
    return function (e) {
      for (
        var t = arguments,
        n = arguments.length,
        r = Array(1 < n ? n - 1 : 0),
        i = 1;
        i < n;
        i++
      )
        r[i - 1] = t[i]
      return te(o, e, r)
    }
  }
  function qe(e, t) {
    V && V(e, null)
    for (var n = t.length; n--;) {
      var r,
        i = t[n]
      'string' != typeof i ||
        ((r = Ne(i)) !== i && (Y(t) || (t[n] = r), (i = r))),
        (e[i] = !0)
    }
    return e
  }
  function Ue(e) {
    var t = J(null),
      n = void 0
    for (n in e) te(W, e, [n]) && (t[n] = e[n])
    return t
  }
  function Be(e, t) {
    for (; null !== e;) {
      var n = K(e, t)
      if (n) {
        if (n.get) return re(n.get)
        if ('function' == typeof n.value) return re(n.value)
      }
      e = X(e)
    }
    return function (e) {
      return console.warn('fallback value for', e), null
    }
  }
  var Ze = Fe([ 'a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'section', 'select', 'shadow', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr', ]);
  var Ge = Fe([ 'svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern', ]);
  var We = Fe([ 'feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence', ]), Ve = Fe([ 'animate', 'color-profile', 'cursor', 'discard', 'fedropshadow', 'feimage', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use', ]), Ye = Fe([ 'math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', ]);
  var Xe = Fe([ 'maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none', ]);
  var Ke = Fe(['#text']), Qe = Fe([ 'accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'pattern', 'placeholder', 'playsinline', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'xmlns', 'slot', ]);
  var Je = Fe([ 'accent-height', 'accumulate', 'additive', 'alignment-baseline', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'specularconstant', 'specularexponent', 'spREADMEthod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'targetx', 'targety', 'transform', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan', ]);
  var et = Fe([ 'accent', 'accentunder', 'align', 'bevelled', 'close', 'columnsalign', 'columnlines', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lspace', 'lquote', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns', ]);
  var tt = Fe([ 'xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink', ]);
  var nt = Q(/\{\{[\s\S]*|[\s\S]*\}\}/gm),
    rt = Q(/<%[\s\S]*|[\s\S]*%>/gm),
    it = Q(/^data-[\-\w.\u00B7-\uFFFF]/),
    ot = Q(/^aria-[\-\w]+$/),
    at = Q(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),
    st = Q(/^(?:\w+script|data):/i),
    lt = Q(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
    ct =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (e) {
          return typeof e
        }
        : function (e) {
          return e &&
            'function' == typeof Symbol &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e
        }
  function ut(e) {
    if (Array.isArray(e)) {
      for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t]
      return n
    }
    return Array.from(e)
  }
  var pt = function () {
    return 'undefined' == typeof window ? null : window
  },
    ht = function (e, t) {
      if (
        'object' !== (void 0 === e ? 'undefined' : ct(e)) ||
        'function' != typeof e.createPolicy
      )
        return null
      var n = null,
        r = 'data-tt-policy-suffix'
      t.currentScript &&
        t.currentScript.hasAttribute(r) &&
        (n = t.currentScript.getAttribute(r))
      var i = 'dompurify' + (n ? '#' + n : '')
      try {
        return e.createPolicy(i, {
          createHTML: function (e) {
            return e
          },
        })
      } catch (e) {
        return (console.warn('TrustedTypes policy ' + i + ' could not be created.'), null)
      }
    }
  var ie,
    oe,
    ae = (function t(e) {
      function c(e) {
        return t(e)
      }
      var s = 0 < arguments.length && void 0 !== e ? e : pt()
      if (
        ((c.version = '2.3.1'),
          (c.removed = []),
          !s || !s.document || 9 !== s.document.nodeType)
      )
        return (c.isSupported = !1), c
      var l = s.document,
        o = s.document,
        u = s.DocumentFragment,
        n = s.HTMLTemplateElement,
        p = s.Node,
        a = s.Element,
        r = s.NodeFilter,
        i = s.NamedNodeMap,
        h = void 0 === i ? s.NamedNodeMap || s.MozNamedAttrMap : i,
        d = s.Text,
        f = s.Comment,
        g = s.DOMParser,
        e = s.trustedTypes,
        i = a.prototype,
        m = Be(i, 'cloneNode'),
        v = Be(i, 'nextSibling'),
        y = Be(i, 'childNodes'),
        b = Be(i, 'parentNode')
      'function' != typeof n ||
        ((n = o.createElement('template')).content &&
          n.content.ownerDocument &&
          (o = n.content.ownerDocument))
      var k = ht(e, l),
        w = k && ee ? k.createHTML('') : '',
        x = o.implementation,
        _ = o.createNodeIterator,
        S = o.createDocumentFragment,
        A = o.getElementsByTagName,
        T = l.importNode,
        E = {}
      try {
        E = Ue(o).documentMode ? o.documentMode : {}
      } catch (e) { }
      var R = {}
      c.isSupported =
        'function' == typeof b &&
        x &&
        void 0 !== x.createHTMLDocument &&
        9 !== E
      function O(e) {
        ; (ge && ge === e) ||
          ((e && 'object' === (void 0 === e ? 'undefined' : ct(e))) || (e = {}),
            (e = Ue(e)),
            (P = 'ALLOWED_TAGS' in e ? qe({}, e.ALLOWED_TAGS) : I),
            (j = 'ALLOWED_ATTR' in e ? qe({}, e.ALLOWED_ATTR) : H),
            (le =
              'ADD_URI_SAFE_ATTR' in e ? qe(Ue(ce), e.ADD_URI_SAFE_ATTR) : ce),
            (ae =
              'ADD_DATA_URI_TAGS' in e ? qe(Ue(se), e.ADD_DATA_URI_TAGS) : se),
            (ie = 'FORBID_CONTENTS' in e ? qe({}, e.FORBID_CONTENTS) : oe),
            (q = 'FORBID_TAGS' in e ? qe({}, e.FORBID_TAGS) : {}),
            (U = 'FORBID_ATTR' in e ? qe({}, e.FORBID_ATTR) : {}),
            ($ = 'USE_PROFILES' in e && e.USE_PROFILES),
            (B = !1 !== e.ALLOW_ARIA_ATTR),
            (Z = !1 !== e.ALLOW_DATA_ATTR),
            (G = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
            (W = e.SAFE_FOR_TEMPLATES || !1),
            (V = e.WHOLE_DOCUMENT || !1),
            (K = e.RETURN_DOM || !1),
            (Q = e.RETURN_DOM_FRAGMENT || !1),
            (J = !1 !== e.RETURN_DOM_IMPORT),
            (ee = e.RETURN_TRUSTED_TYPE || !1),
            (X = e.FORCE_BODY || !1),
            (te = !1 !== e.SANITIZE_DOM),
            (ne = !1 !== e.KEEP_CONTENT),
            (re = e.IN_PLACE || !1),
            (D = e.ALLOWED_URI_REGEXP || D),
            (de = e.NAMESPACE || he),
            W && (Z = !1),
            Q && (K = !0),
            $ &&
            ((P = qe({}, [].concat(ut(Ke)))),
              (j = []),
              !0 === $.html && (qe(P, Ze), qe(j, Qe)),
              !0 === $.svg && (qe(P, Ge), qe(j, Je), qe(j, tt)),
              !0 === $.svgFilters && (qe(P, We), qe(j, Je), qe(j, tt)),
              !0 === $.mathMl && (qe(P, Ye), qe(j, et), qe(j, tt))),
            e.ADD_TAGS && (P === I && (P = Ue(P)), qe(P, e.ADD_TAGS)),
            e.ADD_ATTR && (j === H && (j = Ue(j)), qe(j, e.ADD_ATTR)),
            e.ADD_URI_SAFE_ATTR && qe(le, e.ADD_URI_SAFE_ATTR),
            e.FORBID_CONTENTS &&
            (ie === oe && (ie = Ue(ie)), qe(ie, e.FORBID_CONTENTS)),
            ne && (P['#text'] = !0),
            V && qe(P, ['html', 'head', 'body']),
            P.table && (qe(P, ['tbody']), delete q.tbody),
            Fe && Fe(e),
            (ge = e))
      }
      var $, F = nt, C = rt, L = it, z = ot, N = st, M = lt, D = at, P = null,
        I = qe({}, [].concat(ut(Ze), ut(Ge), ut(We), ut(Ye), ut(Ke))),
        j = null,
        H = qe({}, [].concat(ut(Qe), ut(Je), ut(et), ut(tt))), 
        q = null, U = null, B = !0, Z = !0, G = !1, W = !1, V = !1, Y = !1, X = !1, K = !1, Q = !1, J = !0, ee = !1, te = !0, ne = !0, re = !1, ie = null,
        oe = qe({}, [ 'annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp', ]),
        ae = null,
        se = qe({}, ['audio', 'video', 'img', 'source', 'image', 'track']),
        le = null,
        ce = qe({}, [ 'alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns', ]),
        ue = 'http://www.w3.org/1998/Math/MathML',
        pe = 'http://www.w3.org/2000/svg',
        he = 'http://www.w3.org/1999/xhtml',
        de = he,
        fe = !1,
        ge = null,
        me = o.createElement('form'),
        ve = qe({}, ['mi', 'mo', 'mn', 'ms', 'mtext']),
        ye = qe({}, ['foreignobject', 'desc', 'title', 'annotation-xml']),
        be = qe({}, Ge)
      qe(be, We), qe(be, Ve)
      var ke = qe({}, Ye)
      qe(ke, Xe)
      function we(t) {
        ze(c.removed, { element: t })
        try {
          t.parentNode.removeChild(t)
        } catch (e) {
          try {
            t.outerHTML = w
          } catch (e) {
            t.remove()
          }
        }
      }
      function xe(e, t) {
        try {
          ze(c.removed, { attribute: t.getAttributeNode(e), from: t })
        } catch (e) {
          ze(c.removed, { attribute: null, from: t })
        }
        if ((t.removeAttribute(e), 'is' === e && !j[e]))
          if (K || Q)
            try {
              we(t)
            } catch (e) { }
          else
            try {
              t.setAttribute(e, '')
            } catch (e) { }
      }
      function _e(e) {
        var t = void 0,
          n = void 0
        X
          ? (e = '<remove></remove>' + e)
          : (n = (i = Me(e, /^[\r\n\t ]+/)) && i[0])
        var r = k ? k.createHTML(e) : e
        if (de === he)
          try {
            t = new g().parseFromString(r, 'text/html')
          } catch (e) { }
        if (!t || !t.documentElement) {
          t = x.createDocument(de, 'template', null)
          try {
            t.documentElement.innerHTML = fe ? '' : r
          } catch (e) { }
        }
        var i = t.body || t.documentElement
        return (
          e && n &&
          i.insertBefore(o.createTextNode(n), i.childNodes[0] || null),
          de === he ? A.call(t, V ? 'html' : 'body')[0] : V ? t.documentElement : i
        )
      }
      function Se(e) {
        return _.call(e.ownerDocument || e, e, r.SHOW_ELEMENT | r.SHOW_COMMENT | r.SHOW_TEXT, null, !1)
      }
      function Ae(e) {
        return 'object' === (void 0 === p ? 'undefined' : ct(p))
          ? e instanceof p
          : e &&
          'object' === (void 0 === e ? 'undefined' : ct(e)) &&
          'number' == typeof e.nodeType &&
          'string' == typeof e.nodeName
      }
      function Te(e, t, n) {
        R[e] &&
          Ce(R[e], function (e) {
            e.call(c, t, n, ge)
          })
      }
      function Ee(e) {
        var t
        if (
          (Te('beforeSanitizeElements', e, null),
            !(
              (n = e) instanceof d ||
              n instanceof f ||
              ('string' == typeof n.nodeName &&
                'string' == typeof n.textContent &&
                'function' == typeof n.removeChild &&
                n.attributes instanceof h &&
                'function' == typeof n.removeAttribute &&
                'function' == typeof n.setAttribute &&
                'string' == typeof n.namespaceURI &&
                'function' == typeof n.insertBefore)
            ))
        )
          return we(e), 1
        if (Me(e.nodeName, /[\u0080-\uFFFF]/)) return we(e), 1
        var n = Ne(e.nodeName)
        if (
          (Te('uponSanitizeElement', e, { tagName: n, allowedTags: P }),
            !Ae(e.firstElementChild) &&
            (!Ae(e.content) || !Ae(e.content.firstElementChild)) &&
            je(/<[/\w]/g, e.innerHTML) &&
            je(/<[/\w]/g, e.textContent))
        )
          return we(e), 1
        if ('select' === n && je(/<template/i, e.innerHTML)) return we(e), 1
        if (P[n] && !q[n])
          return (e instanceof a &&
            !(function (e) {
              var t = b(e)
                ; (t && t.tagName) ||
                  (t = { namespaceURI: he, tagName: 'template' })
              var n = Ne(e.tagName),
                r = Ne(t.tagName)
              return e.namespaceURI === pe
                ? t.namespaceURI === he
                  ? 'svg' === n
                  : t.namespaceURI === ue
                    ? 'svg' === n && ('annotation-xml' === r || ve[r])
                    : Boolean(be[n])
                : e.namespaceURI === ue
                  ? t.namespaceURI === he
                    ? 'math' === n
                    : t.namespaceURI === pe
                      ? 'math' === n && ye[r]
                      : Boolean(ke[n])
                  : e.namespaceURI === he &&
                  (t.namespaceURI !== pe || ye[r]) &&
                  (t.namespaceURI !== ue || ve[r]) &&
                  ((r = qe({}, ['title', 'style', 'font', 'a', 'script'])),
                    !ke[n] && (r[n] || !be[n]))
            })(e)) ||
            (('noscript' === n || 'noembed' === n) &&
              je(/<\/no(script|embed)/i, e.innerHTML))
            ? (we(e), 1)
            : (W &&
              3 === e.nodeType &&
              ((t = e.textContent),
                (t = De(t, F, ' ')),
                (t = De(t, C, ' ')),
                e.textContent !== t &&
                (ze(c.removed, { element: e.cloneNode() }),
                  (e.textContent = t))),
              Te('afterSanitizeElements', e, null),
              0)
        if (ne && !ie[n]) {
          var r = b(e) || e.parentNode,
            i = y(e) || e.childNodes
          if (i && r)
            for (var o = i.length - 1; 0 <= o; --o)
              r.insertBefore(m(i[o], !0), v(e))
        }
        return we(e), 1
      }
      function Re(e, t, n) {
        if (te && ('id' === t || 'name' === t) && (n in o || n in me)) return !1
        if ((!Z || U[t] || !je(L, t)) && (!B || !je(z, t))) {
          if (!j[t] || U[t]) return !1
          if (
            !le[t] &&
            !je(D, De(n, M, '')) &&
            (('src' !== t && 'xlink:href' !== t && 'href' !== t) ||
              'script' === e ||
              0 !== Pe(n, 'data:') ||
              !ae[e]) &&
            (!G || je(N, De(n, M, ''))) &&
            n
          )
            return !1
        }
        return !0
      }
      function Oe(e) {
        var t = void 0,
          n = void 0
        Te('beforeSanitizeAttributes', e, null)
        var r = e.attributes
        if (r) {
          for (
            var i = {
              attrName: '',
              attrValue: '',
              keepAttr: !0,
              allowedAttributes: j,
            },
            n = r.length;
            n--;

          ) {
            var o = (l = r[n]).name,
              a = l.namespaceURI,
              t = Ie(l.value),
              s = Ne(o)
            if (
              ((i.attrName = s),
                (i.attrValue = t),
                (i.keepAttr = !0),
                (i.forceKeepAttr = void 0),
                Te('uponSanitizeAttribute', e, i),
                (t = i.attrValue),
                !i.forceKeepAttr && (xe(o, e), i.keepAttr))
            )
              if (je(/\/>/i, t)) xe(o, e)
              else {
                W && ((t = De(t, F, ' ')), (t = De(t, C, ' ')))
                var l = e.nodeName.toLowerCase()
                if (Re(l, s, t))
                  try {
                    a ? e.setAttributeNS(a, o, t) : e.setAttribute(o, t),
                      Le(c.removed)
                  } catch (e) { }
              }
          }
          Te('afterSanitizeAttributes', e, null)
        }
      }
      function $e(e) {
        var t,
          n = Se(e)
        for (Te('beforeSanitizeShadowDOM', e, null); (t = n.nextNode());)
          Te('uponSanitizeShadowNode', t, null),
            Ee(t) || (t.content instanceof u && $e(t.content), Oe(t))
        Te('afterSanitizeShadowDOM', e, null)
      }
      return (
        (c.sanitize = function (e, t) {
          var n,
            r = void 0, i = void 0, o = void 0
          if (
            ((fe = !e) && (e = '\x3c!--\x3e'), 'string' != typeof e && !Ae(e))
          ) {
            if ('function' != typeof e.toString)
              throw He('toString is not a function')
            if ('string' != typeof (e = e.toString()))
              throw He('dirty is not a string, aborting')
          }
          if (!c.isSupported) {
            if (
              'object' === ct(s.toStaticHTML) ||
              'function' == typeof s.toStaticHTML
            ) {
              if ('string' == typeof e) return s.toStaticHTML(e)
              if (Ae(e)) return s.toStaticHTML(e.outerHTML)
            }
            return e
          }
          if (
            (Y || O(t),
              (c.removed = []),
              'string' == typeof e && (re = !1),
              !re)
          )
            if (e instanceof p)
              (1 ===
                (t = (r = _e('\x3c!----\x3e')).ownerDocument.importNode(e, !0))
                  .nodeType &&
                'BODY' === t.nodeName) ||
                'HTML' === t.nodeName
                ? (r = t)
                : r.appendChild(t)
            else {
              if (!K && !W && !V && -1 === e.indexOf('<'))
                return k && ee ? k.createHTML(e) : e
              if (!(r = _e(e))) return K ? null : w
            }
          r && X && we(r.firstChild)
          for (var a = Se(re ? e : r); (n = a.nextNode());)
            (3 === n.nodeType && n === i) ||
              Ee(n) ||
              (n.content instanceof u && $e(n.content), Oe(n), (i = n))
          if (((i = null), re)) return e
          if (K) {
            if (Q)
              for (o = S.call(r.ownerDocument); r.firstChild;)
                o.appendChild(r.firstChild)
            else o = r
            return J && (o = T.call(l, o, !0)), o
          }
          return (
            (e = V ? r.outerHTML : r.innerHTML),
            W && ((e = De(e, F, ' ')), (e = De(e, C, ' '))),
            k && ee ? k.createHTML(e) : e
          )
        }),
        (c.setConfig = function (e) {
          O(e), (Y = !0)
        }),
        (c.clearConfig = function () {
          ; (ge = null), (Y = !1)
        }),
        (c.isValidAttribute = function (e, t, n) {
          return ge || O({}), (e = Ne(e)), (t = Ne(t)), Re(e, t, n)
        }),
        (c.addHook = function (e, t) {
          'function' == typeof t && ((R[e] = R[e] || []), ze(R[e], t))
        }),
        (c.removeHook = function (e) {
          R[e] && Le(R[e])
        }),
        (c.removeHooks = function (e) {
          R[e] && (R[e] = [])
        }),
        (c.removeAllHooks = function () {
          R = {}
        }),
        c
      )
    })()
  function se(e) {
    var t,
      n = e.loaded,
      r = e.total,
      i = e.step
    ie || ((e = v('div')).classList.add('progress'), a(g, e), (ie = e)),
      (t = i
        ? 80 < (t = parseInt(ie.style.width || 0, 10) + i)
          ? 80
          : t
        : Math.floor((n / r) * 100)),
      (ie.style.opacity = 1),
      (ie.style.width = 95 <= t ? '100%' : t + '%'),
      95 <= t &&
      (clearTimeout(oe),
        (oe = setTimeout(function (e) {
          ; (ie.style.opacity = 0), (ie.style.width = '0%')
        }, 200)))
  }
  var le = {}
  function ce(i, e, t) {
    if (i.includes('README.md')) { i = 'README.md'; }
    void 0 === e && (e = !1), void 0 === t && (t = {})
    function o() {
      a.addEventListener.apply(a, arguments)
    }
    var n, a = new XMLHttpRequest(), r = le[i]
    if (r)
      return {
        then: function (e) {
          return e(r.content, r.opt)
        },
        abort: u,
      }
    for (n in (a.open('GET', i), t)) {
      l.call(t, n) && a.setRequestHeader(n, t[n])
    }
    return (
      a.send(),
      {
        then: function (t, n) {
          var r
          void 0 === n && (n = u),
            e &&
            ((r = setInterval(function (e) {
              return se({ step: Math.floor(5 * Math.random() + 1) })
            }, 500)),
              o('progress', se),
              o('loadend', function (e) {
                se(e), clearInterval(r)
              })),
            o('error', n),
            o('load', function (e) {
              e = e.target
              400 <= e.status
                ? n(e)
                : ((e = le[i] =
                {
                  content: e.response,
                  opt: { updatedAt: a.getResponseHeader('last-modified') },
                }),
                  t(e.content, e.opt))
            })
        },
        abort: function (e) {
          return 4 !== a.readyState && a.abort()
        },
      }
    )
  }
  function ue(e, t) {
    e.innerHTML = e.innerHTML.replace(/var\(\s*--theme-color.*?\)/g, t)
  }
  var pe = f.title
  function he() {
    var e,
      t = d('section.cover')
    t &&
      ((e = t.getBoundingClientRect().height),
        window.pageYOffset >= e || t.classList.contains('hidden')
          ? S(g, 'add', 'sticky')
          : S(g, 'remove', 'sticky'))
  }
  function de(e, t, r, n) {
    var i = []
    null != (t = d(t)) && (i = k(t, 'a'))
    var o, a = decodeURI(e.toURL(e.getCurrentPath()))
    return (
      i
        .sort(function (e, t) {
          return t.href.length - e.href.length
        })
        .forEach(function (e) {
          var t = decodeURI(e.getAttribute('href')),
            n = r ? e.parentNode : e
            ; (e.title = e.title || e.innerText),
              0 !== a.indexOf(t) || o
                ? S(n, 'remove', 'active')
                : ((o = e), S(n, 'add', 'active'))
        }),
      n && (f.title = o ? o.title || o.innerText + ' - ' + pe : pe),
      o
    )
  }
  function fe(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n]
        ; (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r)
    }
  }
  var ge =
    ((function (e, t, n) {
      return t && fe(e.prototype, t), n && fe(e, n), e
    })(me, [
      {
        key: 'getIntermediateValue',
        value: function (e) {
          return this.decimal ? e : Math.round(e)
        },
      },
      {
        key: 'getFinalValue',
        value: function () {
          return this.end
        },
      },
    ]),
      me)
  function me() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
    !(function (e, t) {
      if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function')
    })(this, me),
      (this.start = e.start),
      (this.end = e.end),
      (this.decimal = e.decimal)
  }
  function ve(e, t) {
    for (var n = 0; n < t.length; n++) {
      var r = t[n]
        ; (r.enumerable = r.enumerable || !1),
          (r.configurable = !0),
          'value' in r && (r.writable = !0),
          Object.defineProperty(e, r.key, r)
    }
  }
  var ye =
    ((function (e, t, n) {
      return t && ve(e.prototype, t), n && ve(e, n), e
    })(be, [
      {
        key: 'begin',
        value: function () {
          return (
            this.isRunning ||
            this.next === this.end ||
            (this.frame = window.requestAnimationFrame(
              this._tick.bind(this)
            )),
            this
          )
        },
      },
      {
        key: 'stop',
        value: function () {
          return (
            window.cancelAnimationFrame(this.frame),
            (this.isRunning = !1),
            (this.frame = null),
            (this.timeStart = null),
            (this.next = null),
            this
          )
        },
      },
      {
        key: 'on',
        value: function (e, t) {
          return (
            (this.events[e] = this.events[e] || []),
            this.events[e].push(t),
            this
          )
        },
      },
      {
        key: '_emit',
        value: function (e, t) {
          var n = this,
            e = this.events[e]
          e &&
            e.forEach(function (e) {
              return e.call(n, t)
            })
        },
      },
      {
        key: '_tick',
        value: function (e) {
          this.isRunning = !0
          var t = this.next || this.start
          this.timeStart || (this.timeStart = e),
            (this.timeElapsed = e - this.timeStart),
            (this.next = this.ease(
              this.timeElapsed,
              this.start,
              this.end - this.start,
              this.duration
            )),
            this._shouldTick(t)
              ? (this._emit(
                'tick',
                this.tweener.getIntermediateValue(this.next)
              ),
                (this.frame = window.requestAnimationFrame(
                  this._tick.bind(this)
                )))
              : (this._emit('tick', this.tweener.getFinalValue()),
                this._emit('done', null))
        },
      },
      {
        key: '_shouldTick',
        value: function (e) {
          return {
            up: this.next < this.end && e <= this.next,
            down: this.next > this.end && e >= this.next,
          }[this.direction]
        },
      },
      {
        key: '_defaultEase',
        value: function (e, t, n, r) {
          return (e /= r / 2) < 1
            ? (n / 2) * e * e + t
            : (-n / 2) * (--e * (e - 2) - 1) + t
        },
      },
    ]),
      be)
  function be() {
    var e = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : {}
    !(function (e, t) {
      if (!(e instanceof t))
        throw new TypeError('Cannot call a class as a function')
    })(this, be),
      (this.duration = e.duration || 1e3),
      (this.ease = e.easing || this._defaultEase),
      (this.tweener = e.tweener || new ge(e)),
      (this.start = this.tweener.start),
      (this.end = this.tweener.end),
      (this.frame = null),
      (this.next = null),
      (this.isRunning = !1),
      (this.events = {}),
      (this.direction = this.start < this.end ? 'up' : 'down')
  }
  var ke = document.currentScript
  function we(e) {
    var t,
      n = y(
        {
          el: '#app',
          repo: '',
          maxLevel: 6,
          subMaxLevel: 0,
          loadSidebar: null,
          loadNavbar: null,
          homepage: 'README.md',
          coverpage: '',
          basePath: '',
          auto2top: !1,
          name: '',
          themeColor: '',
          nameLink: window.location.pathname,
          autoHeader: !1,
          executeScript: null,
          noEmoji: !1,
          ga: '',
          ext: '.md',
          mergeNavbar: !1,
          formatUpdated: '',
          externalLinkTarget: '_blank',
          cornerExternalLinkTarget: '_blank',
          externalLinkRel: 'noopener',
          routerMode: 'hash',
          noCompileLinks: [],
          crossOriginLinks: [],
          relativePath: !1,
          topMargin: 0,
        },
        'function' == typeof window.$docsify
          ? window.$docsify(e)
          : window.$docsify
      ),
      r =
        ke ||
        [].slice
          .call(document.getElementsByTagName('script'))
          .filter(function (e) {
            return /docsify\./.test(e.src)
          })[0]
    if (r)
      for (var i in n) {
        !l.call(n, i) ||
          (c((t = r.getAttribute('data-' + o(i)))) && (n[i] = '' === t || t))
      }
    return (
      !0 === n.loadSidebar && (n.loadSidebar = '_sidebar' + n.ext),
      !0 === n.loadNavbar && (n.loadNavbar = '_navbar' + n.ext),
      !0 === n.coverpage && (n.coverpage = '_coverpage' + n.ext),
      !0 === n.repo && (n.repo = ''),
      !0 === n.name && (n.name = ''),
      (window.$docsify = n)
    )
  }
  var xe = {},
    _e = !1,
    Se = null,
    Ae = !0,
    Te = 0
  function Ee(e) {
    if (Ae) {
      for (
        var t,
        n,
        r = d('.sidebar'),
        i = k('.anchor'),
        o = b(r, '.sidebar-nav'),
        a = b(r, 'li.active'),
        s = document.documentElement,
        l = ((s && s.scrollTop) || document.body.scrollTop) - Te,
        c = 0,
        u = i.length;
        c < u;
        c += 1
      ) {
        var p = i[c]
        if (p.offsetTop > l) {
          t = t || p
          break
        }
        t = p
      }
      !t ||
        ((n = xe[Re(e, t.getAttribute('data-id'))]) &&
          n !== a &&
          (a && a.classList.remove('active'),
            n.classList.add('active'),
            (a = n),
            !_e &&
            g.classList.contains('sticky') &&
            ((s = r.clientHeight),
              (e = a.offsetTop + a.clientHeight + 40),
              (n = a.offsetTop >= o.scrollTop && e <= o.scrollTop + s),
              (a = +e < s),
              (r.scrollTop = n ? o.scrollTop : a ? 0 : e - s))))
    }
  }
  function Re(e, t) {
    return decodeURIComponent(e) + '?id=' + decodeURIComponent(t)
  }
  function Oe(e, t) {
    var n, r
    t &&
      ((r = we().topMargin),
        (n = b('#' + t)) &&
        ((n = n),
          void 0 === (r = r) && (r = 0),
          Se && Se.stop(),
          (Ae = !1),
          (Se = new ye({
            start: window.pageYOffset,
            end:
              Math.round(n.getBoundingClientRect().top) + window.pageYOffset - r,
            duration: 500,
          })
            .on('tick', function (e) {
              return window.scrollTo(0, e)
            })
            .on('done', function () {
              ; (Ae = !0), (Se = null)
            })
            .begin())),
        (e = xe[Re(e, t)]),
        (t = b(d('.sidebar'), 'li.active')) && t.classList.remove('active'),
        e && e.classList.add('active'))
  }
  var $e = f.scrollingElement || f.documentElement
  var dt =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
          ? global
          : 'undefined' != typeof self
            ? self
            : {}
  function ft(e, t) {
    return e((t = { exports: {} }), t.exports), t.exports
  }
  function gt(e) {
    return wt[e]
  }
  var mt = ft(function (t) {
    function e() {
      return {
        baseUrl: null,
        breaks: !1,
        gfm: !0,
        headerIds: !0,
        headerPrefix: '',
        highlight: null,
        langPrefix: 'language-',
        mangle: !0,
        pedantic: !1,
        renderer: null,
        sanitize: !1,
        sanitizer: null,
        silent: !1,
        smartLists: !1,
        smartypants: !1,
        tokenizer: null,
        walkTokens: null,
        xhtml: !1,
      }
    }
    t.exports = {
      defaults: e(),
      getDefaults: e,
      changeDefaults: function (e) {
        t.exports.defaults = e
      },
    }
  }),
    vt = (mt.defaults, mt.getDefaults, mt.changeDefaults, /[&<>"']/),
    yt = /[&<>"']/g,
    bt = /[<>"']|&(?!#?\w+;)/,
    kt = /[<>"']|&(?!#?\w+;)/g,
    wt = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  var xt = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi
  function _t(e) {
    return e.replace(xt, function (e, t) {
      return 'colon' === (t = t.toLowerCase())
        ? ':'
        : '#' === t.charAt(0)
          ? 'x' === t.charAt(1)
            ? String.fromCharCode(parseInt(t.substring(2), 16))
            : String.fromCharCode(+t.substring(1))
          : ''
    })
  }
  var St = /(^|[^\[])\^/g
  var At = /[^\w:]/g,
    Tt = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i
  var Et = {},
    Rt = /^[^:]+:\/*[^/]*$/,
    Ot = /^([^:]+:)[\s\S]*$/,
    $t = /^([^:]+:\/*[^/]*)[\s\S]*$/
  function Ft(e, t) {
    Et[' ' + e] ||
      (Rt.test(e) ? (Et[' ' + e] = e + '/') : (Et[' ' + e] = Ct(e, '/', !0)))
    var n = -1 === (e = Et[' ' + e]).indexOf(':')
    return '//' === t.substring(0, 2)
      ? n
        ? t
        : e.replace(Ot, '$1') + t
      : '/' === t.charAt(0)
        ? n
          ? t
          : e.replace($t, '$1') + t
        : e + t
  }
  function Ct(e, t, n) {
    var r = e.length
    if (0 === r) return ''
    for (var i = 0; i < r;) {
      var o = e.charAt(r - i - 1)
      if (o !== t || n) {
        if (o === t || !n) break
        i++
      } else i++
    }
    return e.substr(0, r - i)
  }
  var Lt = function (e, t) {
    if (t) {
      if (vt.test(e)) return e.replace(yt, gt)
    } else if (bt.test(e)) return e.replace(kt, gt)
    return e
  },
    zt = _t,
    Nt = function (n, e) {
      ; (n = n.source || n), (e = e || '')
      var r = {
        replace: function (e, t) {
          return (
            (t = (t = t.source || t).replace(St, '$1')),
            (n = n.replace(e, t)),
            r
          )
        },
        getRegex: function () {
          return new RegExp(n, e)
        },
      }
      return r
    },
    Mt = function (e, t, n) {
      if (e) {
        var r
        try {
          r = decodeURIComponent(_t(n)).replace(At, '').toLowerCase()
        } catch (e) {
          return null
        }
        if (
          0 === r.indexOf('javascript:') ||
          0 === r.indexOf('vbscript:') ||
          0 === r.indexOf('data:')
        )
          return null
      }
      t && !Tt.test(n) && (n = Ft(t, n))
      try {
        n = encodeURI(n).replace(/%25/g, '%')
      } catch (e) {
        return null
      }
      return n
    },
    Dt = { exec: function () { } },
    Pt = function (e) {
      for (var t, n, r = arguments, i = 1; i < arguments.length; i++)
        for (n in (t = r[i]))
          Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
      return e
    },
    It = function (e, t) {
      var n = e
        .replace(/\|/g, function (e, t, n) {
          for (var r = !1, i = t; 0 <= --i && '\\' === n[i];) r = !r
          return r ? '|' : ' |'
        })
        .split(/ \|/),
        r = 0
      if (n.length > t) n.splice(t)
      else for (; n.length < t;) n.push('')
      for (; r < n.length; r++) n[r] = n[r].trim().replace(/\\\|/g, '|')
      return n
    },
    I = function (e, t) {
      if (-1 === e.indexOf(t[1])) return -1
      for (var n = e.length, r = 0, i = 0; i < n; i++)
        if ('\\' === e[i]) i++
        else if (e[i] === t[0]) r++
        else if (e[i] === t[1] && --r < 0) return i
      return -1
    },
    ee = function (e) {
      e &&
        e.sanitize &&
        !e.silent &&
        console.warn(
          'marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options'
        )
    },
    Q = function (e, t) {
      if (t < 1) return ''
      for (var n = ''; 1 < t;) 1 & t && (n += e), (t >>= 1), (e += e)
      return n + e
    },
    jt = mt.defaults,
    Ht = Ct,
    qt = It,
    Ut = Lt,
    Bt = I
  function Zt(e, t, n) {
    var r = t.href,
      i = t.title ? Ut(t.title) : null,
      t = e[1].replace(/\\([\[\]])/g, '$1')
    return '!' !== e[0].charAt(0)
      ? { type: 'link', raw: n, href: r, title: i, text: t }
      : { type: 'image', raw: n, href: r, title: i, text: Ut(t) }
  }
  var Gt = (function () {
    function e(e) {
      this.options = e || jt
    }
    return (
      (e.prototype.space = function (e) {
        e = this.rules.block.newline.exec(e)
        if (e)
          return 1 < e[0].length
            ? { type: 'space', raw: e[0] }
            : { raw: '\n' }
      }),
      (e.prototype.code = function (e, t) {
        e = this.rules.block.code.exec(e)
        if (e) {
          t = t[t.length - 1]
          if (t && 'paragraph' === t.type)
            return { raw: e[0], text: e[0].trimRight() }
          t = e[0].replace(/^ {1,4}/gm, '')
          return {
            type: 'code',
            raw: e[0],
            codeBlockStyle: 'indented',
            text: this.options.pedantic ? t : Ht(t, '\n'),
          }
        }
      }),
      (e.prototype.fences = function (e) {
        var t = this.rules.block.fences.exec(e)
        if (t) {
          var n = t[0],
            e = (function (e, t) {
              if (null === (e = e.match(/^(\s+)(?:```)/))) return t
              var n = e[1]
              return t
                .split('\n')
                .map(function (e) {
                  var t = e.match(/^\s+/)
                  return null !== t && t[0].length >= n.length
                    ? e.slice(n.length)
                    : e
                })
                .join('\n')
            })(n, t[3] || '')
          return {
            type: 'code',
            raw: n,
            lang: t[2] ? t[2].trim() : t[2],
            text: e,
          }
        }
      }),
      (e.prototype.heading = function (e) {
        var t = this.rules.block.heading.exec(e)
        if (t) {
          var n = t[2].trim()
          return (
            /#$/.test(n) &&
            ((e = Ht(n, '#')),
              (!this.options.pedantic && e && !/ $/.test(e)) ||
              (n = e.trim())),
            { type: 'heading', raw: t[0], depth: t[1].length, text: n }
          )
        }
      }),
      (e.prototype.nptable = function (e) {
        e = this.rules.block.nptable.exec(e)
        if (e) {
          var t = {
            type: 'table',
            header: qt(e[1].replace(/^ *| *\| *$/g, '')),
            align: e[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: e[3] ? e[3].replace(/\n$/, '').split('\n') : [],
            raw: e[0],
          }
          if (t.header.length === t.align.length) {
            for (var n = t.align.length, r = 0; r < n; r++)
              /^ *-+: *$/.test(t.align[r])
                ? (t.align[r] = 'right')
                : /^ *:-+: *$/.test(t.align[r])
                  ? (t.align[r] = 'center')
                  : /^ *:-+ *$/.test(t.align[r])
                    ? (t.align[r] = 'left')
                    : (t.align[r] = null)
            for (n = t.cells.length, r = 0; r < n; r++)
              t.cells[r] = qt(t.cells[r], t.header.length)
            return t
          }
        }
      }),
      (e.prototype.hr = function (e) {
        e = this.rules.block.hr.exec(e)
        if (e) return { type: 'hr', raw: e[0] }
      }),
      (e.prototype.blockquote = function (e) {
        var t = this.rules.block.blockquote.exec(e)
        if (t) {
          e = t[0].replace(/^ *> ?/gm, '')
          return { type: 'blockquote', raw: t[0], text: e }
        }
      }),
      (e.prototype.list = function (e) {
        e = this.rules.block.list.exec(e)
        if (e) {
          for (
            var t,
            n,
            r,
            i,
            o,
            a = e[0],
            s = e[2],
            l = 1 < s.length,
            c = {
              type: 'list',
              raw: a,
              ordered: l,
              start: l ? +s.slice(0, -1) : '',
              loose: !1,
              items: [],
            },
            u = e[0].match(this.rules.block.item),
            p = !1,
            h = u.length,
            d = this.rules.block.listItemStart.exec(u[0]),
            f = 0;
            f < h;
            f++
          ) {
            if (((a = t = u[f]), f !== h - 1)) {
              if (
                ((r = this.rules.block.listItemStart.exec(u[f + 1])),
                  this.options.pedantic
                    ? r[1].length > d[1].length
                    : r[1].length > d[0].length || 3 < r[1].length)
              ) {
                u.splice(f, 2, u[f] + '\n' + u[f + 1]), f--, h--
                continue
              }
              ; (!this.options.pedantic || this.options.smartLists
                ? r[2][r[2].length - 1] !== s[s.length - 1]
                : l == (1 === r[2].length)) &&
                ((n = u.slice(f + 1).join('\n')),
                  (c.raw = c.raw.substring(0, c.raw.length - n.length)),
                  (f = h - 1)),
                (d = r)
            }
            ; (r = t.length),
              ~(t = t.replace(/^ *([*+-]|\d+[.)]) ?/, '')).indexOf('\n ') &&
              ((r -= t.length),
                (t = this.options.pedantic
                  ? t.replace(/^ {1,4}/gm, '')
                  : t.replace(new RegExp('^ {1,' + r + '}', 'gm'), ''))),
              (r = p || /\n\n(?!\s*$)/.test(t)),
              f !== h - 1 &&
              ((p = '\n' === t.charAt(t.length - 1)), (r = r || p)),
              r && (c.loose = !0),
              this.options.gfm &&
              ((o = void 0),
                (i = /^\[[ xX]\] /.test(t)) &&
                ((o = ' ' !== t[1]), (t = t.replace(/^\[[ xX]\] +/, '')))),
              c.items.push({
                type: 'list_item',
                raw: a,
                task: i,
                checked: o,
                loose: r,
                text: t,
              })
          }
          return c
        }
      }),
      (e.prototype.html = function (e) {
        e = this.rules.block.html.exec(e)
        if (e)
          return {
            type: this.options.sanitize ? 'paragraph' : 'html',
            raw: e[0],
            pre:
              !this.options.sanitizer &&
              ('pre' === e[1] || 'script' === e[1] || 'style' === e[1]),
            text: this.options.sanitize
              ? this.options.sanitizer
                ? this.options.sanitizer(e[0])
                : Ut(e[0])
              : e[0],
          }
      }),
      (e.prototype.def = function (e) {
        e = this.rules.block.def.exec(e)
        if (e)
          return (
            e[3] && (e[3] = e[3].substring(1, e[3].length - 1)),
            {
              tag: e[1].toLowerCase().replace(/\s+/g, ' '),
              raw: e[0],
              href: e[2],
              title: e[3],
            }
          )
      }),
      (e.prototype.table = function (e) {
        e = this.rules.block.table.exec(e)
        if (e) {
          var t = {
            type: 'table',
            header: qt(e[1].replace(/^ *| *\| *$/g, '')),
            align: e[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
            cells: e[3] ? e[3].replace(/\n$/, '').split('\n') : [],
          }
          if (t.header.length === t.align.length) {
            t.raw = e[0]
            for (var n = t.align.length, r = 0; r < n; r++)
              /^ *-+: *$/.test(t.align[r])
                ? (t.align[r] = 'right')
                : /^ *:-+: *$/.test(t.align[r])
                  ? (t.align[r] = 'center')
                  : /^ *:-+ *$/.test(t.align[r])
                    ? (t.align[r] = 'left')
                    : (t.align[r] = null)
            for (n = t.cells.length, r = 0; r < n; r++)
              t.cells[r] = qt(
                t.cells[r].replace(/^ *\| *| *\| *$/g, ''),
                t.header.length
              )
            return t
          }
        }
      }),
      (e.prototype.lheading = function (e) {
        e = this.rules.block.lheading.exec(e)
        if (e)
          return {
            type: 'heading',
            raw: e[0],
            depth: '=' === e[2].charAt(0) ? 1 : 2,
            text: e[1],
          }
      }),
      (e.prototype.paragraph = function (e) {
        e = this.rules.block.paragraph.exec(e)
        if (e)
          return {
            type: 'paragraph',
            raw: e[0],
            text:
              '\n' === e[1].charAt(e[1].length - 1)
                ? e[1].slice(0, -1)
                : e[1],
          }
      }),
      (e.prototype.text = function (e, t) {
        e = this.rules.block.text.exec(e)
        if (e) {
          t = t[t.length - 1]
          return t && 'text' === t.type
            ? { raw: e[0], text: e[0] }
            : { type: 'text', raw: e[0], text: e[0] }
        }
      }),
      (e.prototype.escape = function (e) {
        e = this.rules.inline.escape.exec(e)
        if (e) return { type: 'escape', raw: e[0], text: Ut(e[1]) }
      }),
      (e.prototype.tag = function (e, t, n) {
        e = this.rules.inline.tag.exec(e)
        if (e)
          return (
            !t && /^<a /i.test(e[0])
              ? (t = !0)
              : t && /^<\/a>/i.test(e[0]) && (t = !1),
            !n && /^<(pre|code|kbd|script)(\s|>)/i.test(e[0])
              ? (n = !0)
              : n &&
              /^<\/(pre|code|kbd|script)(\s|>)/i.test(e[0]) &&
              (n = !1),
            {
              type: this.options.sanitize ? 'text' : 'html',
              raw: e[0],
              inLink: t,
              inRawBlock: n,
              text: this.options.sanitize
                ? this.options.sanitizer
                  ? this.options.sanitizer(e[0])
                  : Ut(e[0])
                : e[0],
            }
          )
      }),
      (e.prototype.link = function (e) {
        var t = this.rules.inline.link.exec(e)
        if (t) {
          var n = t[2].trim()
          if (!this.options.pedantic && /^</.test(n)) {
            if (!/>$/.test(n)) return
            e = Ht(n.slice(0, -1), '\\')
            if ((n.length - e.length) % 2 == 0) return
          } else {
            var r = Bt(t[2], '()')
              ; -1 < r &&
                ((o = (0 === t[0].indexOf('!') ? 5 : 4) + t[1].length + r),
                  (t[2] = t[2].substring(0, r)),
                  (t[0] = t[0].substring(0, o).trim()),
                  (t[3] = ''))
          }
          var i,
            r = t[2],
            o = ''
          return (
            this.options.pedantic
              ? ((i = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(r)),
                i && ((r = i[1]), (o = i[3])))
              : (o = t[3] ? t[3].slice(1, -1) : ''),
            (r = r.trim()),
            /^</.test(r) &&
            (r =
              this.options.pedantic && !/>$/.test(n)
                ? r.slice(1)
                : r.slice(1, -1)),
            Zt(
              t,
              {
                href: r ? r.replace(this.rules.inline._escapes, '$1') : r,
                title: o ? o.replace(this.rules.inline._escapes, '$1') : o,
              },
              t[0]
            )
          )
        }
      }),
      (e.prototype.reflink = function (e, t) {
        if (
          (n = this.rules.inline.reflink.exec(e)) ||
          (n = this.rules.inline.nolink.exec(e))
        ) {
          e = (n[2] || n[1]).replace(/\s+/g, ' ')
          if ((e = t[e.toLowerCase()]) && e.href) return Zt(n, e, n[0])
          var n = n[0].charAt(0)
          return { type: 'text', raw: n, text: n }
        }
      }),
      (e.prototype.strong = function (e, t, n) {
        void 0 === n && (n = '')
        var r = this.rules.inline.strong.start.exec(e)
        if (
          r &&
          (!r[1] ||
            (r[1] && ('' === n || this.rules.inline.punctuation.exec(n))))
        ) {
          t = t.slice(-1 * e.length)
          var i,
            o =
              '**' === r[0]
                ? this.rules.inline.strong.endAst
                : this.rules.inline.strong.endUnd
          for (o.lastIndex = 0; null != (r = o.exec(t));)
            if (
              (i = this.rules.inline.strong.middle.exec(
                t.slice(0, r.index + 3)
              ))
            )
              return {
                type: 'strong',
                raw: e.slice(0, i[0].length),
                text: e.slice(2, i[0].length - 2),
              }
        }
      }),
      (e.prototype.em = function (e, t, n) {
        void 0 === n && (n = '')
        var r = this.rules.inline.em.start.exec(e)
        if (
          r &&
          (!r[1] ||
            (r[1] && ('' === n || this.rules.inline.punctuation.exec(n))))
        ) {
          t = t.slice(-1 * e.length)
          var i,
            o =
              '*' === r[0]
                ? this.rules.inline.em.endAst
                : this.rules.inline.em.endUnd
          for (o.lastIndex = 0; null != (r = o.exec(t));)
            if (
              (i = this.rules.inline.em.middle.exec(t.slice(0, r.index + 2)))
            )
              return {
                type: 'em',
                raw: e.slice(0, i[0].length),
                text: e.slice(1, i[0].length - 1),
              }
        }
      }),
      (e.prototype.codespan = function (e) {
        var t = this.rules.inline.code.exec(e)
        if (t) {
          var n = t[2].replace(/\n/g, ' '),
            r = /[^ ]/.test(n),
            e = /^ /.test(n) && / $/.test(n)
          return (
            r && e && (n = n.substring(1, n.length - 1)),
            (n = Ut(n, !0)),
            { type: 'codespan', raw: t[0], text: n }
          )
        }
      }),
      (e.prototype.br = function (e) {
        e = this.rules.inline.br.exec(e)
        if (e) return { type: 'br', raw: e[0] }
      }),
      (e.prototype.del = function (e) {
        e = this.rules.inline.del.exec(e)
        if (e) return { type: 'del', raw: e[0], text: e[2] }
      }),
      (e.prototype.autolink = function (e, t) {
        e = this.rules.inline.autolink.exec(e)
        if (e) {
          var n,
            t =
              '@' === e[2]
                ? 'mailto:' + (n = Ut(this.options.mangle ? t(e[1]) : e[1]))
                : (n = Ut(e[1]))
          return {
            type: 'link',
            raw: e[0],
            text: n,
            href: t,
            tokens: [{ type: 'text', raw: n, text: n }],
          }
        }
      }),
      (e.prototype.url = function (e, t) {
        var n, r, i, o
        if ((n = this.rules.inline.url.exec(e))) {
          if ('@' === n[2])
            i = 'mailto:' + (r = Ut(this.options.mangle ? t(n[0]) : n[0]))
          else {
            for (
              ;
              (o = n[0]),
              (n[0] = this.rules.inline._backpedal.exec(n[0])[0]),
              o !== n[0];

            );
            ; (r = Ut(n[0])), (i = 'www.' === n[1] ? 'http://' + r : r)
          }
          return {
            type: 'link',
            raw: n[0],
            text: r,
            href: i,
            tokens: [{ type: 'text', raw: r, text: r }],
          }
        }
      }),
      (e.prototype.inlineText = function (e, t, n) {
        e = this.rules.inline.text.exec(e)
        if (e) {
          n = t
            ? this.options.sanitize
              ? this.options.sanitizer
                ? this.options.sanitizer(e[0])
                : Ut(e[0])
              : e[0]
            : Ut(this.options.smartypants ? n(e[0]) : e[0])
          return { type: 'text', raw: e[0], text: n }
        }
      }),
      e
    )
  })(),
    It = Dt,
    I = Nt,
    Dt = Pt,
    Nt = {
      newline: /^(?: *(?:\n|$))+/,
      code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
      fences:
        /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
      hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
      heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
      blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
      list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?! {0,3}bull )\n*|\s*$)/,
      html: '^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))',
      def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
      nptable: It,
      table: It,
      lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
      _paragraph:
        /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html| +\n)[^\n]+)*)/,
      text: /^[^\n]+/,
      _label: /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/,
      _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
    }
    ; (Nt.def = I(Nt.def)
      .replace('label', Nt._label)
      .replace('title', Nt._title)
      .getRegex()),
      (Nt.bullet = /(?:[*+-]|\d{1,9}[.)])/),
      (Nt.item = /^( *)(bull) ?[^\n]*(?:\n(?! *bull ?)[^\n]*)*/),
      (Nt.item = I(Nt.item, 'gm').replace(/bull/g, Nt.bullet).getRegex()),
      (Nt.listItemStart = I(/^( *)(bull)/)
        .replace('bull', Nt.bullet)
        .getRegex()),
      (Nt.list = I(Nt.list)
        .replace(/bull/g, Nt.bullet)
        .replace(
          'hr',
          '\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))'
        )
        .replace('def', '\\n+(?=' + Nt.def.source + ')')
        .getRegex()),
      (Nt._tag =
        'address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul'),
      (Nt._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
      (Nt.html = I(Nt.html, 'i')
        .replace('comment', Nt._comment)
        .replace('tag', Nt._tag)
        .replace(
          'attribute',
          / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
        )
        .getRegex()),
      (Nt.paragraph = I(Nt._paragraph)
        .replace('hr', Nt.hr)
        .replace('heading', ' {0,3}#{1,6} ')
        .replace('|lheading', '')
        .replace('blockquote', ' {0,3}>')
        .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
        .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
        .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
        .replace('tag', Nt._tag)
        .getRegex()),
      (Nt.blockquote = I(Nt.blockquote)
        .replace('paragraph', Nt.paragraph)
        .getRegex()),
      (Nt.normal = Dt({}, Nt)),
      (Nt.gfm = Dt({}, Nt.normal, {
        nptable:
          '^ *([^|\\n ].*\\|.*)\\n {0,3}([-:]+ *\\|[-| :]*)(?:\\n((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
        table:
          '^ *\\|(.+)\\n {0,3}\\|?( *[-:]+[-| :]*)(?:\\n *((?:(?!\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)',
      })),
      (Nt.gfm.nptable = I(Nt.gfm.nptable)
        .replace('hr', Nt.hr)
        .replace('heading', ' {0,3}#{1,6} ')
        .replace('blockquote', ' {0,3}>')
        .replace('code', ' {4}[^\\n]')
        .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
        .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
        .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
        .replace('tag', Nt._tag)
        .getRegex()),
      (Nt.gfm.table = I(Nt.gfm.table)
        .replace('hr', Nt.hr)
        .replace('heading', ' {0,3}#{1,6} ')
        .replace('blockquote', ' {0,3}>')
        .replace('code', ' {4}[^\\n]')
        .replace('fences', ' {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n')
        .replace('list', ' {0,3}(?:[*+-]|1[.)]) ')
        .replace('html', '</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)')
        .replace('tag', Nt._tag)
        .getRegex()),
      (Nt.pedantic = Dt({}, Nt.normal, {
        html: I(
          '^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|\'[^\']*\'|\\s[^\'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))'
        )
          .replace('comment', Nt._comment)
          .replace(
            /tag/g,
            '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b'
          )
          .getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: It,
        paragraph: I(Nt.normal._paragraph)
          .replace('hr', Nt.hr)
          .replace('heading', ' *#{1,6} *[^\n]')
          .replace('lheading', Nt.lheading)
          .replace('blockquote', ' {0,3}>')
          .replace('|fences', '')
          .replace('|list', '')
          .replace('|html', '')
          .getRegex(),
      }))
  It = {
    escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
    autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
    url: It,
    tag: '^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>',
    link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
    reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
    nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
    reflinkSearch: 'reflink|nolink(?!\\()',
    strong: {
      start: /^(?:(\*\*(?=[*punctuation]))|\*\*)(?![\s])|__/,
      middle:
        /^\*\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*\*$|^__(?![\s])((?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?)__$/,
      endAst:
        /[^punctuation\s]\*\*(?!\*)|[punctuation]\*\*(?!\*)(?:(?=[punctuation_\s]|$))/,
      endUnd: /[^\s]__(?!_)(?:(?=[punctuation*\s])|$)/,
    },
    em: {
      start: /^(?:(\*(?=[punctuation]))|\*)(?![*\s])|_/,
      middle:
        /^\*(?:(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)|\*(?:(?!overlapSkip)(?:[^*]|\\\*)|overlapSkip)*?\*)+?\*$|^_(?![_\s])(?:(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)|_(?:(?!overlapSkip)(?:[^_]|\\_)|overlapSkip)*?_)+?_$/,
      endAst:
        /[^punctuation\s]\*(?!\*)|[punctuation]\*(?!\*)(?:(?=[punctuation_\s]|$))/,
      endUnd: /[^\s]_(?!_)(?:(?=[punctuation*\s])|$)/,
    },
    code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
    br: /^( {2,}|\\)\n(?!\s*$)/,
    del: It,
    text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n)))/,
    punctuation: /^([\s*punctuation])/,
    _punctuation: '!"#$%&\'()+\\-.,/:;<=>?@\\[\\]`^{|}~',
  }
    ; (It.punctuation = I(It.punctuation)
      .replace(/punctuation/g, It._punctuation)
      .getRegex()),
      (It._blockSkip = '\\[[^\\]]*?\\]\\([^\\)]*?\\)|`[^`]*?`|<[^>]*?>'),
      (It._overlapSkip = '__[^_]*?__|\\*\\*\\[^\\*\\]*?\\*\\*'),
      (It._comment = I(Nt._comment).replace('(?:--\x3e|$)', '--\x3e').getRegex()),
      (It.em.start = I(It.em.start)
        .replace(/punctuation/g, It._punctuation)
        .getRegex()),
      (It.em.middle = I(It.em.middle)
        .replace(/punctuation/g, It._punctuation)
        .replace(/overlapSkip/g, It._overlapSkip)
        .getRegex()),
      (It.em.endAst = I(It.em.endAst, 'g')
        .replace(/punctuation/g, It._punctuation)
        .getRegex()),
      (It.em.endUnd = I(It.em.endUnd, 'g')
        .replace(/punctuation/g, It._punctuation)
        .getRegex()),
      (It.strong.start = I(It.strong.start)
        .replace(/punctuation/g, It._punctuation)
        .getRegex()),
      (It.strong.middle = I(It.strong.middle)
        .replace(/punctuation/g, It._punctuation)
        .replace(/overlapSkip/g, It._overlapSkip)
        .getRegex()),
      (It.strong.endAst = I(It.strong.endAst, 'g')
        .replace(/punctuation/g, It._punctuation)
        .getRegex()),
      (It.strong.endUnd = I(It.strong.endUnd, 'g')
        .replace(/punctuation/g, It._punctuation)
        .getRegex()),
      (It.blockSkip = I(It._blockSkip, 'g').getRegex()),
      (It.overlapSkip = I(It._overlapSkip, 'g').getRegex()),
      (It._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
      (It._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
      (It._email =
        /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
      (It.autolink = I(It.autolink)
        .replace('scheme', It._scheme)
        .replace('email', It._email)
        .getRegex()),
      (It._attribute =
        /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
      (It.tag = I(It.tag)
        .replace('comment', It._comment)
        .replace('attribute', It._attribute)
        .getRegex()),
      (It._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
      (It._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
      (It._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
      (It.link = I(It.link)
        .replace('label', It._label)
        .replace('href', It._href)
        .replace('title', It._title)
        .getRegex()),
      (It.reflink = I(It.reflink).replace('label', It._label).getRegex()),
      (It.reflinkSearch = I(It.reflinkSearch, 'g')
        .replace('reflink', It.reflink)
        .replace('nolink', It.nolink)
        .getRegex()),
      (It.normal = Dt({}, It)),
      (It.pedantic = Dt({}, It.normal, {
        strong: {
          start: /^__|\*\*/,
          middle:
            /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
          endAst: /\*\*(?!\*)/g,
          endUnd: /__(?!_)/g,
        },
        em: {
          start: /^_|\*/,
          middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
          endAst: /\*(?!\*)/g,
          endUnd: /_(?!_)/g,
        },
        link: I(/^!?\[(label)\]\((.*?)\)/)
          .replace('label', It._label)
          .getRegex(),
        reflink: I(/^!?\[(label)\]\s*\[([^\]]*)\]/)
          .replace('label', It._label)
          .getRegex(),
      })),
      (It.gfm = Dt({}, It.normal, {
        escape: I(It.escape).replace('])', '~|])').getRegex(),
        _extended_email:
          /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        _backpedal:
          /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/,
      })),
      (It.gfm.url = I(It.gfm.url, 'i')
        .replace('email', It.gfm._extended_email)
        .getRegex()),
      (It.breaks = Dt({}, It.gfm, {
        br: I(It.br).replace('{2,}', '*').getRegex(),
        text: I(It.gfm.text)
          .replace('\\b_', '\\b_| {2,}\\n')
          .replace(/\{2,\}/g, '*')
          .getRegex(),
      }))
  var It = { block: Nt, inline: It },
    Wt = mt.defaults,
    Vt = It.block,
    Yt = It.inline,
    Xt = Q
  function Kt(e) {
    return e
      .replace(/---/g, '—')
      .replace(/--/g, '–')
      .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1‘')
      .replace(/'/g, '’')
      .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1“')
      .replace(/"/g, '”')
      .replace(/\.{3}/g, '…')
  }
  function Qt(e) {
    for (var t, n = '', r = e.length, i = 0; i < r; i++)
      (t = e.charCodeAt(i)),
        0.5 < Math.random() && (t = 'x' + t.toString(16)),
        (n += '&#' + t + ';')
    return n
  }
  var Jt = (function () {
    function n(e) {
      ; (this.tokens = []),
        (this.tokens.links = Object.create(null)),
        (this.options = e || Wt),
        (this.options.tokenizer = this.options.tokenizer || new Gt()),
        (this.tokenizer = this.options.tokenizer),
        (this.tokenizer.options = this.options)
      e = { block: Vt.normal, inline: Yt.normal }
      this.options.pedantic
        ? ((e.block = Vt.pedantic), (e.inline = Yt.pedantic))
        : this.options.gfm &&
        ((e.block = Vt.gfm),
          this.options.breaks ? (e.inline = Yt.breaks) : (e.inline = Yt.gfm)),
        (this.tokenizer.rules = e)
    }
    var e = { rules: { configurable: !0 } }
    return (
      (e.rules.get = function () {
        return { block: Vt, inline: Yt }
      }),
      (n.lex = function (e, t) {
        return new n(t).lex(e)
      }),
      (n.lexInline = function (e, t) {
        return new n(t).inlineTokens(e)
      }),
      (n.prototype.lex = function (e) {
        return (
          (e = e.replace(/\r\n|\r/g, '\n').replace(/\t/g, '    ')),
          this.blockTokens(e, this.tokens, !0),
          this.inline(this.tokens),
          this.tokens
        )
      }),
      (n.prototype.blockTokens = function (e, t, n) {
        var r, i, o, a
        for (
          void 0 === t && (t = []),
          void 0 === n && (n = !0),
          this.options.pedantic && (e = e.replace(/^ +$/gm, ''));
          e;

        )
          if ((r = this.tokenizer.space(e)))
            (e = e.substring(r.raw.length)), r.type && t.push(r)
          else if ((r = this.tokenizer.code(e, t)))
            (e = e.substring(r.raw.length)),
              r.type
                ? t.push(r)
                : (((a = t[t.length - 1]).raw += '\n' + r.raw),
                  (a.text += '\n' + r.text))
          else if ((r = this.tokenizer.fences(e)))
            (e = e.substring(r.raw.length)), t.push(r)
          else if ((r = this.tokenizer.heading(e)))
            (e = e.substring(r.raw.length)), t.push(r)
          else if ((r = this.tokenizer.nptable(e)))
            (e = e.substring(r.raw.length)), t.push(r)
          else if ((r = this.tokenizer.hr(e)))
            (e = e.substring(r.raw.length)), t.push(r)
          else if ((r = this.tokenizer.blockquote(e)))
            (e = e.substring(r.raw.length)),
              (r.tokens = this.blockTokens(r.text, [], n)),
              t.push(r)
          else if ((r = this.tokenizer.list(e))) {
            for (
              e = e.substring(r.raw.length), o = r.items.length, i = 0;
              i < o;
              i++
            )
              r.items[i].tokens = this.blockTokens(r.items[i].text, [], !1)
            t.push(r)
          } else if ((r = this.tokenizer.html(e)))
            (e = e.substring(r.raw.length)), t.push(r)
          else if (n && (r = this.tokenizer.def(e)))
            (e = e.substring(r.raw.length)),
              this.tokens.links[r.tag] ||
              (this.tokens.links[r.tag] = { href: r.href, title: r.title })
          else if ((r = this.tokenizer.table(e)))
            (e = e.substring(r.raw.length)), t.push(r)
          else if ((r = this.tokenizer.lheading(e)))
            (e = e.substring(r.raw.length)), t.push(r)
          else if (n && (r = this.tokenizer.paragraph(e)))
            (e = e.substring(r.raw.length)), t.push(r)
          else if ((r = this.tokenizer.text(e, t)))
            (e = e.substring(r.raw.length)),
              r.type
                ? t.push(r)
                : (((a = t[t.length - 1]).raw += '\n' + r.raw),
                  (a.text += '\n' + r.text))
          else if (e) {
            var s = 'Infinite loop on byte: ' + e.charCodeAt(0)
            if (this.options.silent) {
              console.error(s)
              break
            }
            throw new Error(s)
          }
        return t
      }),
      (n.prototype.inline = function (e) {
        for (var t, n, r, i, o, a = e.length, s = 0; s < a; s++)
          switch ((o = e[s]).type) {
            case 'paragraph':
            case 'text':
            case 'heading':
              ; (o.tokens = []), this.inlineTokens(o.text, o.tokens)
              break
            case 'table':
              for (
                o.tokens = { header: [], cells: [] },
                r = o.header.length,
                t = 0;
                t < r;
                t++
              )
                (o.tokens.header[t] = []),
                  this.inlineTokens(o.header[t], o.tokens.header[t])
              for (r = o.cells.length, t = 0; t < r; t++)
                for (
                  i = o.cells[t], o.tokens.cells[t] = [], n = 0;
                  n < i.length;
                  n++
                )
                  (o.tokens.cells[t][n] = []),
                    this.inlineTokens(i[n], o.tokens.cells[t][n])
              break
            case 'blockquote':
              this.inline(o.tokens)
              break
            case 'list':
              for (r = o.items.length, t = 0; t < r; t++)
                this.inline(o.items[t].tokens)
          }
        return e
      }),
      (n.prototype.inlineTokens = function (e, t, n, r) {
        var i
        void 0 === t && (t = []),
          void 0 === n && (n = !1),
          void 0 === r && (r = !1)
        var o,
          a,
          s,
          l = e
        if (this.tokens.links) {
          var c = Object.keys(this.tokens.links)
          if (0 < c.length)
            for (
              ;
              null != (o = this.tokenizer.rules.inline.reflinkSearch.exec(l));

            )
              c.includes(o[0].slice(o[0].lastIndexOf('[') + 1, -1)) &&
                (l =
                  l.slice(0, o.index) +
                  '[' +
                  Xt('a', o[0].length - 2) +
                  ']' +
                  l.slice(
                    this.tokenizer.rules.inline.reflinkSearch.lastIndex
                  ))
        }
        for (; null != (o = this.tokenizer.rules.inline.blockSkip.exec(l));)
          l =
            l.slice(0, o.index) +
            '[' +
            Xt('a', o[0].length - 2) +
            ']' +
            l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex)
        for (; e;)
          if ((a || (s = ''), (a = !1), (i = this.tokenizer.escape(e))))
            (e = e.substring(i.raw.length)), t.push(i)
          else if ((i = this.tokenizer.tag(e, n, r)))
            (e = e.substring(i.raw.length)),
              (n = i.inLink),
              (r = i.inRawBlock),
              t.push(i)
          else if ((i = this.tokenizer.link(e)))
            (e = e.substring(i.raw.length)),
              'link' === i.type &&
              (i.tokens = this.inlineTokens(i.text, [], !0, r)),
              t.push(i)
          else if ((i = this.tokenizer.reflink(e, this.tokens.links)))
            (e = e.substring(i.raw.length)),
              'link' === i.type &&
              (i.tokens = this.inlineTokens(i.text, [], !0, r)),
              t.push(i)
          else if ((i = this.tokenizer.strong(e, l, s)))
            (e = e.substring(i.raw.length)),
              (i.tokens = this.inlineTokens(i.text, [], n, r)),
              t.push(i)
          else if ((i = this.tokenizer.em(e, l, s)))
            (e = e.substring(i.raw.length)),
              (i.tokens = this.inlineTokens(i.text, [], n, r)),
              t.push(i)
          else if ((i = this.tokenizer.codespan(e)))
            (e = e.substring(i.raw.length)), t.push(i)
          else if ((i = this.tokenizer.br(e)))
            (e = e.substring(i.raw.length)), t.push(i)
          else if ((i = this.tokenizer.del(e)))
            (e = e.substring(i.raw.length)),
              (i.tokens = this.inlineTokens(i.text, [], n, r)),
              t.push(i)
          else if ((i = this.tokenizer.autolink(e, Qt)))
            (e = e.substring(i.raw.length)), t.push(i)
          else if (n || !(i = this.tokenizer.url(e, Qt))) {
            if ((i = this.tokenizer.inlineText(e, r, Kt)))
              (e = e.substring(i.raw.length)),
                (s = i.raw.slice(-1)),
                (a = !0),
                t.push(i)
            else if (e) {
              var u = 'Infinite loop on byte: ' + e.charCodeAt(0)
              if (this.options.silent) {
                console.error(u)
                break
              }
              throw new Error(u)
            }
          } else (e = e.substring(i.raw.length)), t.push(i)
        return t
      }),
      Object.defineProperties(n, e),
      n
    )
  })(),
    en = mt.defaults,
    tn = Mt,
    nn = Lt,
    rn = (function () {
      function e(e) {
        this.options = e || en
      }
      return (
        (e.prototype.code = function (e, t, n) {
          var r = (t || '').match(/\S*/)[0]
          return (
            !this.options.highlight ||
            (null != (t = this.options.highlight(e, r)) &&
              t !== e &&
              ((n = !0), (e = t))),
            (e = e.replace(/\n$/, '') + '\n'),
            r
              ? '<pre><code class="' +
              this.options.langPrefix +
              nn(r, !0) +
              '">' +
              (n ? e : nn(e, !0)) +
              '</code></pre>\n'
              : '<pre><code>' + (n ? e : nn(e, !0)) + '</code></pre>\n'
          )
        }),
        (e.prototype.blockquote = function (e) {
          return '<blockquote>\n' + e + '</blockquote>\n'
        }),
        (e.prototype.html = function (e) {
          return e
        }),
        (e.prototype.heading = function (e, t, n, r) {
          return this.options.headerIds
            ? '<h' +
            t +
            ' id="' +
            this.options.headerPrefix +
            r.slug(n) +
            '">' +
            e +
            '</h' +
            t +
            '>\n'
            : '<h' + t + '>' + e + '</h' + t + '>\n'
        }),
        (e.prototype.hr = function () {
          return this.options.xhtml ? '<hr/>\n' : '<hr>\n'
        }),
        (e.prototype.list = function (e, t, n) {
          var r = t ? 'ol' : 'ul'
          return (
            '<' +
            r +
            (t && 1 !== n ? ' start="' + n + '"' : '') +
            '>\n' +
            e +
            '</' +
            r +
            '>\n'
          )
        }),
        (e.prototype.listitem = function (e) {
          return '<li>' + e + '</li>\n'
        }),
        (e.prototype.checkbox = function (e) {
          return (
            '<input ' +
            (e ? 'checked="" ' : '') +
            'disabled="" type="checkbox"' +
            (this.options.xhtml ? ' /' : '') +
            '> '
          )
        }),
        (e.prototype.paragraph = function (e) {
          return '<p>' + e + '</p>\n'
        }),
        (e.prototype.table = function (e, t) {
          return (
            '<table>\n<thead>\n' +
            e +
            '</thead>\n' +
            (t = t && '<tbody>' + t + '</tbody>') +
            '</table>\n'
          )
        }),
        (e.prototype.tablerow = function (e) {
          return '<tr>\n' + e + '</tr>\n'
        }),
        (e.prototype.tablecell = function (e, t) {
          var n = t.header ? 'th' : 'td'
          return (
            (t.align ? '<' + n + ' align="' + t.align + '">' : '<' + n + '>') +
            e +
            '</' +
            n +
            '>\n'
          )
        }),
        (e.prototype.strong = function (e) {
          return '<strong>' + e + '</strong>'
        }),
        (e.prototype.em = function (e) {
          return '<em>' + e + '</em>'
        }),
        (e.prototype.codespan = function (e) {
          return '<code>' + e + '</code>'
        }),
        (e.prototype.br = function () {
          return this.options.xhtml ? '<br/>' : '<br>'
        }),
        (e.prototype.del = function (e) {
          return '<del>' + e + '</del>'
        }),
        (e.prototype.link = function (e, t, n) {
          if (null === (e = tn(this.options.sanitize, this.options.baseUrl, e)))
            return n
          e = '<a href="' + nn(e) + '"'
          return t && (e += ' title="' + t + '"'), (e += '>' + n + '</a>')
        }),
        (e.prototype.image = function (e, t, n) {
          if (null === (e = tn(this.options.sanitize, this.options.baseUrl, e)))
            return n
          n = '<img src="' + e + '" alt="' + n + '"'
          return (
            t && (n += ' title="' + t + '"'),
            (n += this.options.xhtml ? '/>' : '>')
          )
        }),
        (e.prototype.text = function (e) {
          return e
        }),
        e
      )
    })(),
    on = (function () {
      function e() { }
      return (
        (e.prototype.strong = function (e) {
          return e
        }),
        (e.prototype.em = function (e) {
          return e
        }),
        (e.prototype.codespan = function (e) {
          return e
        }),
        (e.prototype.del = function (e) {
          return e
        }),
        (e.prototype.html = function (e) {
          return e
        }),
        (e.prototype.text = function (e) {
          return e
        }),
        (e.prototype.link = function (e, t, n) {
          return '' + n
        }),
        (e.prototype.image = function (e, t, n) {
          return '' + n
        }),
        (e.prototype.br = function () {
          return ''
        }),
        e
      )
    })(),
    an = (function () {
      function e() {
        this.seen = {}
      }
      return (
        (e.prototype.serialize = function (e) {
          return e
            .toLowerCase()
            .trim()
            .replace(/<[!\/a-z].*?>/gi, '')
            .replace(
              /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
              ''
            )
            .replace(/\s/g, '-')
        }),
        (e.prototype.getNextSafeSlug = function (e, t) {
          var n = e,
            r = 0
          if (this.seen.hasOwnProperty(n))
            for (
              r = this.seen[e];
              (n = e + '-' + ++r), this.seen.hasOwnProperty(n);

            );
          return t || ((this.seen[e] = r), (this.seen[n] = 0)), n
        }),
        (e.prototype.slug = function (e, t) {
          void 0 === t && (t = {})
          var n = this.serialize(e)
          return this.getNextSafeSlug(n, t.dryrun)
        }),
        e
      )
    })(),
    sn = mt.defaults,
    ln = zt,
    cn = (function () {
      function n(e) {
        ; (this.options = e || sn),
          (this.options.renderer = this.options.renderer || new rn()),
          (this.renderer = this.options.renderer),
          (this.renderer.options = this.options),
          (this.textRenderer = new on()),
          (this.slugger = new an())
      }
      return (
        (n.parse = function (e, t) {
          return new n(t).parse(e)
        }),
        (n.parseInline = function (e, t) {
          return new n(t).parseInline(e)
        }),
        (n.prototype.parse = function (e, t) {
          void 0 === t && (t = !0)
          for (
            var n,
            r,
            i,
            o,
            a,
            s,
            l,
            c,
            u,
            p,
            h,
            d,
            f,
            g,
            m,
            v = '',
            y = e.length,
            b = 0;
            b < y;
            b++
          )
            switch ((c = e[b]).type) {
              case 'space':
                continue
              case 'hr':
                v += this.renderer.hr()
                continue
              case 'heading':
                v += this.renderer.heading(
                  this.parseInline(c.tokens),
                  c.depth,
                  ln(this.parseInline(c.tokens, this.textRenderer)),
                  this.slugger
                )
                continue
              case 'code':
                v += this.renderer.code(c.text, c.lang, c.escaped)
                continue
              case 'table':
                for (s = u = '', i = c.header.length, n = 0; n < i; n++)
                  s += this.renderer.tablecell(
                    this.parseInline(c.tokens.header[n]),
                    { header: !0, align: c.align[n] }
                  )
                for (
                  u += this.renderer.tablerow(s),
                  l = '',
                  i = c.cells.length,
                  n = 0;
                  n < i;
                  n++
                ) {
                  for (
                    s = '', o = (a = c.tokens.cells[n]).length, r = 0;
                    r < o;
                    r++
                  )
                    s += this.renderer.tablecell(this.parseInline(a[r]), {
                      header: !1,
                      align: c.align[r],
                    })
                  l += this.renderer.tablerow(s)
                }
                v += this.renderer.table(u, l)
                continue
              case 'blockquote':
                ; (l = this.parse(c.tokens)), (v += this.renderer.blockquote(l))
                continue
              case 'list':
                for (
                  u = c.ordered,
                  k = c.start,
                  p = c.loose,
                  i = c.items.length,
                  l = '',
                  n = 0;
                  n < i;
                  n++
                )
                  (f = (d = c.items[n]).checked),
                    (g = d.task),
                    (h = ''),
                    d.task &&
                    ((m = this.renderer.checkbox(f)),
                      p
                        ? 0 < d.tokens.length && 'text' === d.tokens[0].type
                          ? ((d.tokens[0].text = m + ' ' + d.tokens[0].text),
                            d.tokens[0].tokens &&
                            0 < d.tokens[0].tokens.length &&
                            'text' === d.tokens[0].tokens[0].type &&
                            (d.tokens[0].tokens[0].text =
                              m + ' ' + d.tokens[0].tokens[0].text))
                          : d.tokens.unshift({ type: 'text', text: m })
                        : (h += m)),
                    (h += this.parse(d.tokens, p)),
                    (l += this.renderer.listitem(h, g, f))
                v += this.renderer.list(l, u, k)
                continue
              case 'html':
                v += this.renderer.html(c.text)
                continue
              case 'paragraph':
                v += this.renderer.paragraph(this.parseInline(c.tokens))
                continue
              case 'text':
                for (
                  l = c.tokens ? this.parseInline(c.tokens) : c.text;
                  b + 1 < y && 'text' === e[b + 1].type;

                )
                  l +=
                    '\n' +
                    ((c = e[++b]).tokens ? this.parseInline(c.tokens) : c.text)
                v += t ? this.renderer.paragraph(l) : l
                continue
              default:
                var k = 'Token with "' + c.type + '" type was not found.'
                if (this.options.silent) return void console.error(k)
                throw new Error(k)
            }
          return v
        }),
        (n.prototype.parseInline = function (e, t) {
          t = t || this.renderer
          for (var n = '', r = e.length, i = 0; i < r; i++)
            switch ((o = e[i]).type) {
              case 'escape':
                n += t.text(o.text)
                break
              case 'html':
                n += t.html(o.text)
                break
              case 'link':
                n += t.link(o.href, o.title, this.parseInline(o.tokens, t))
                break
              case 'image':
                n += t.image(o.href, o.title, o.text)
                break
              case 'strong':
                n += t.strong(this.parseInline(o.tokens, t))
                break
              case 'em':
                n += t.em(this.parseInline(o.tokens, t))
                break
              case 'codespan':
                n += t.codespan(o.text)
                break
              case 'br':
                n += t.br()
                break
              case 'del':
                n += t.del(this.parseInline(o.tokens, t))
                break
              case 'text':
                n += t.text(o.text)
                break
              default:
                var o = 'Token with "' + o.type + '" type was not found.'
                if (this.options.silent) return void console.error(o)
                throw new Error(o)
            }
          return n
        }),
        n
      )
    })(),
    un = Pt,
    pn = ee,
    hn = Lt,
    Lt = mt.getDefaults,
    dn = mt.changeDefaults,
    mt = mt.defaults
  function fn(e, n, r) {
    if (null == e)
      throw new Error('marked(): input parameter is undefined or null')
    if ('string' != typeof e)
      throw new Error(
        'marked(): input parameter is of type ' +
        Object.prototype.toString.call(e) +
        ', string expected'
      )
    if (
      ('function' == typeof n && ((r = n), (n = null)),
        (n = un({}, fn.defaults, n || {})),
        pn(n),
        r)
    ) {
      var i,
        o = n.highlight
      try {
        i = Jt.lex(e, n)
      } catch (e) {
        return r(e)
      }
      function a(t) {
        var e
        if (!t)
          try {
            e = cn.parse(i, n)
          } catch (e) {
            t = e
          }
        return (n.highlight = o), t ? r(t) : r(null, e)
      }
      if (!o || o.length < 3) return a()
      if ((delete n.highlight, !i.length)) return a()
      var s = 0
      return (
        fn.walkTokens(i, function (n) {
          'code' === n.type &&
            (s++,
              setTimeout(function () {
                o(n.text, n.lang, function (e, t) {
                  return e
                    ? a(e)
                    : (null != t &&
                      t !== n.text &&
                      ((n.text = t), (n.escaped = !0)),
                      void (0 === --s && a()))
                })
              }, 0))
        }),
        void (0 === s && a())
      )
    }
    try {
      var t = Jt.lex(e, n)
      return n.walkTokens && fn.walkTokens(t, n.walkTokens), cn.parse(t, n)
    } catch (e) {
      if (
        ((e.message +=
          '\nPlease report this to https://github.com/markedjs/marked.'),
          n.silent)
      )
        return (
          '<p>An error occurred:</p><pre>' + hn(e.message + '', !0) + '</pre>'
        )
      throw e
    }
  }
  ; (fn.options = fn.setOptions =
    function (e) {
      return un(fn.defaults, e), dn(fn.defaults), fn
    }),
    (fn.getDefaults = Lt),
    (fn.defaults = mt),
    (fn.use = function (o) {
      var t,
        e = un({}, o)
      if (o.renderer) {
        var n,
          a = fn.defaults.renderer || new rn()
        for (n in o.renderer)
          !(function (r) {
            var i = a[r]
            a[r] = function () {
              for (var e = [], t = arguments.length; t--;) e[t] = arguments[t]
              var n = o.renderer[r].apply(a, e)
              return !1 === n && (n = i.apply(a, e)), n
            }
          })(n)
        e.renderer = a
      }
      if (o.tokenizer) {
        var i,
          s = fn.defaults.tokenizer || new Gt()
        for (i in o.tokenizer)
          !(function () {
            var r = s[i]
            s[i] = function () {
              for (var e = [], t = arguments.length; t--;) e[t] = arguments[t]
              var n = o.tokenizer[i].apply(s, e)
              return !1 === n && (n = r.apply(s, e)), n
            }
          })()
        e.tokenizer = s
      }
      o.walkTokens &&
        ((t = fn.defaults.walkTokens),
          (e.walkTokens = function (e) {
            o.walkTokens(e), t && t(e)
          })),
        fn.setOptions(e)
    }),
    (fn.walkTokens = function (e, t) {
      for (var n = 0, r = e; n < r.length; n += 1) {
        var i = r[n]
        switch ((t(i), i.type)) {
          case 'table':
            for (var o = 0, a = i.tokens.header; o < a.length; o += 1) {
              var s = a[o]
              fn.walkTokens(s, t)
            }
            for (var l = 0, c = i.tokens.cells; l < c.length; l += 1)
              for (var u = 0, p = c[l]; u < p.length; u += 1) {
                var h = p[u]
                fn.walkTokens(h, t)
              }
            break
          case 'list':
            fn.walkTokens(i.items, t)
            break
          default:
            i.tokens && fn.walkTokens(i.tokens, t)
        }
      }
    }),
    (fn.parseInline = function (e, t) {
      if (null == e)
        throw new Error(
          'marked.parseInline(): input parameter is undefined or null'
        )
      if ('string' != typeof e)
        throw new Error(
          'marked.parseInline(): input parameter is of type ' +
          Object.prototype.toString.call(e) +
          ', string expected'
        )
        ; (t = un({}, fn.defaults, t || {})), pn(t)
      try {
        var n = Jt.lexInline(e, t)
        return (
          t.walkTokens && fn.walkTokens(n, t.walkTokens), cn.parseInline(n, t)
        )
      } catch (e) {
        if (
          ((e.message +=
            '\nPlease report this to https://github.com/markedjs/marked.'),
            t.silent)
        )
          return (
            '<p>An error occurred:</p><pre>' + hn(e.message + '', !0) + '</pre>'
          )
        throw e
      }
    }),
    (fn.Parser = cn),
    (fn.parser = cn.parse),
    (fn.Renderer = rn),
    (fn.TextRenderer = on),
    (fn.Lexer = Jt),
    (fn.lexer = Jt.lex),
    (fn.Tokenizer = Gt),
    (fn.Slugger = an)
  var gn = (fn.parse = fn)
  function mn(e, n) {
    if (
      (void 0 === n && (n = '<ul class="app-sub-sidebar">{inner}</ul>'),
        !e || !e.length)
    )
      return ''
    var r = ''
    return (
      e.forEach(function (e) {
        var t = e.title.replace(/(<([^>]+)>)/g, '')
          ; (r +=
            '<li><a class="section-link" href="' +
            e.slug +
            '" title="' +
            t +
            '">' +
            e.title +
            '</a></li>'),
            e.children && (r += mn(e.children, n))
      }),
      n.replace('{inner}', r)
    )
  }
  function vn(e, t) {
    return '<p class="' + e + '">' + t.slice(5).trim() + '</p>'
  }
  function yn(e, r) {
    var i = [],
      o = {}
    return (
      e.forEach(function (e) {
        var t = e.level || 1,
          n = t - 1
        r < t ||
          (o[n] ? (o[n].children = (o[n].children || []).concat(e)) : i.push(e),
            (o[t] = e))
      }),
      i
    )
  }
  var bn = {},
    kn = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g
  function wn(e) {
    return e.toLowerCase()
  }
  function xn(e) {
    if ('string' != typeof e) return ''
    var t = e
      .trim()
      .replace(/[A-Z]+/g, wn)
      .replace(/<[^>]+>/g, '')
      .replace(kn, '')
      .replace(/\s/g, '-')
      .replace(/-+/g, '-')
      .replace(/^(\d)/, '_$1'),
      e = bn[t],
      e = l.call(bn, t) ? e + 1 : 0
    return (bn[t] = e) && (t = t + '-' + e), t
  }
  function _n(e, t) {
    return (
      '<img class="emoji" src="https://github.githubassets.com/images/icons/emoji/' +
      t +
      '.png" alt="' +
      t +
      '" />'
    )
  }
  function Sn(e) {
    void 0 === e && (e = '')
    var r = {}
    return {
      str: (e =
        e &&
        e
          .replace(/^('|")/, '')
          .replace(/('|")$/, '')
          .replace(/(?:^|\s):([\w-]+:?)=?([\w-%]+)?/g, function (e, t, n) {
            return -1 === t.indexOf(':')
              ? ((r[t] = (n && n.replace(/&quot;/g, '')) || !0), '')
              : e
          })
          .trim()),
      config: r,
    }
  }
  function An(e) {
    return void 0 === e && (e = ''), e.replace(/(<\/?a.*?>)/gi, '')
  }
  xn.clear = function () {
    bn = {}
  }
  var Tn,
    En = ft(function (e) {
      var a,
        s,
        l,
        c,
        u,
        r,
        t,
        i = (function (l) {
          var c = /\blang(?:uage)?-([\w-]+)\b/i,
            t = 0,
            $ = {
              manual: l.Prism && l.Prism.manual,
              disableWorkerMessageHandler:
                l.Prism && l.Prism.disableWorkerMessageHandler,
              util: {
                encode: function e(t) {
                  return t instanceof F
                    ? new F(t.type, e(t.content), t.alias)
                    : Array.isArray(t)
                      ? t.map(e)
                      : t
                        .replace(/&/g, '&amp;')
                        .replace(/</g, '&lt;')
                        .replace(/\u00a0/g, ' ')
                },
                type: function (e) {
                  return Object.prototype.toString.call(e).slice(8, -1)
                },
                objId: function (e) {
                  return (
                    e.__id || Object.defineProperty(e, '__id', { value: ++t }),
                    e.__id
                  )
                },
                clone: function n(e, r) {
                  var i, t
                  switch (((r = r || {}), $.util.type(e))) {
                    case 'Object':
                      if (((t = $.util.objId(e)), r[t])) return r[t]
                      for (var o in ((i = {}), (r[t] = i), e))
                        e.hasOwnProperty(o) && (i[o] = n(e[o], r))
                      return i
                    case 'Array':
                      return ((t = $.util.objId(e)), r[t])
                        ? r[t]
                        : ((i = []),
                          (r[t] = i),
                          e.forEach(function (e, t) {
                            i[t] = n(e, r)
                          }),
                          i)
                    default:
                      return e
                  }
                },
                getLanguage: function (e) {
                  for (; e && !c.test(e.className);) e = e.parentElement
                  return e
                    ? (e.className.match(c) || [, 'none'])[1].toLowerCase()
                    : 'none'
                },
                currentScript: function () {
                  if ('undefined' == typeof document) return null
                  if ('currentScript' in document) return document.currentScript
                  try {
                    throw new Error()
                  } catch (e) {
                    var t = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(e.stack) ||
                      [])[1]
                    if (t) {
                      var n,
                        r = document.getElementsByTagName('script')
                      for (n in r) if (r[n].src == t) return r[n]
                    }
                    return null
                  }
                },
                isActive: function (e, t, n) {
                  for (var r = 'no-' + t; e;) {
                    var i = e.classList
                    if (i.contains(t)) return !0
                    if (i.contains(r)) return !1
                    e = e.parentElement
                  }
                  return !!n
                },
              },
              languages: {
                extend: function (e, t) {
                  var n,
                    r = $.util.clone($.languages[e])
                  for (n in t) r[n] = t[n]
                  return r
                },
                insertBefore: function (n, e, t, r) {
                  var i,
                    o = (r = r || $.languages)[n],
                    a = {}
                  for (i in o)
                    if (o.hasOwnProperty(i)) {
                      if (i == e)
                        for (var s in t) t.hasOwnProperty(s) && (a[s] = t[s])
                      t.hasOwnProperty(i) || (a[i] = o[i])
                    }
                  var l = r[n]
                  return (
                    (r[n] = a),
                    $.languages.DFS($.languages, function (e, t) {
                      t === l && e != n && (this[e] = a)
                    }),
                    a
                  )
                },
                DFS: function e(t, n, r, i) {
                  i = i || {}
                  var o,
                    a,
                    s,
                    l = $.util.objId
                  for (o in t) {
                    t.hasOwnProperty(o) &&
                      (n.call(t, o, t[o], r || o),
                        (a = t[o]),
                        'Object' !== (s = $.util.type(a)) || i[l(a)]
                          ? 'Array' !== s ||
                          i[l(a)] ||
                          ((i[l(a)] = !0), e(a, n, o, i))
                          : ((i[l(a)] = !0), e(a, n, null, i)))
                  }
                },
              },
              plugins: {},
              highlightAll: function (e, t) {
                $.highlightAllUnder(document, e, t)
              },
              highlightAllUnder: function (e, t, n) {
                var r = {
                  callback: n,
                  container: e,
                  selector:
                    'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code',
                }
                $.hooks.run('before-highlightall', r),
                  (r.elements = Array.prototype.slice.apply(
                    r.container.querySelectorAll(r.selector)
                  )),
                  $.hooks.run('before-all-elements-highlight', r)
                for (var i, o = 0; (i = r.elements[o++]);)
                  $.highlightElement(i, !0 === t, r.callback)
              },
              highlightElement: function (e, t, n) {
                var r = $.util.getLanguage(e),
                  i = $.languages[r]
                e.className =
                  e.className.replace(c, '').replace(/\s+/g, ' ') +
                  ' language-' +
                  r
                var o = e.parentElement
                o &&
                  'pre' === o.nodeName.toLowerCase() &&
                  (o.className =
                    o.className.replace(c, '').replace(/\s+/g, ' ') +
                    ' language-' +
                    r)
                var a = {
                  element: e,
                  language: r,
                  grammar: i,
                  code: e.textContent,
                }
                function s(e) {
                  ; (a.highlightedCode = e),
                    $.hooks.run('before-insert', a),
                    (a.element.innerHTML = a.highlightedCode),
                    $.hooks.run('after-highlight', a),
                    $.hooks.run('complete', a),
                    n && n.call(a.element)
                }
                if (($.hooks.run('before-sanity-check', a), !a.code))
                  return (
                    $.hooks.run('complete', a), void (n && n.call(a.element))
                  )
                $.hooks.run('before-highlight', a),
                  a.grammar
                    ? t && l.Worker
                      ? (((t = new Worker($.filename)).onmessage = function (
                        e
                      ) {
                        s(e.data)
                      }),
                        t.postMessage(
                          JSON.stringify({
                            language: a.language,
                            code: a.code,
                            immediateClose: !0,
                          })
                        ))
                      : s($.highlight(a.code, a.grammar, a.language))
                    : s($.util.encode(a.code))
              },
              highlight: function (e, t, n) {
                n = { code: e, grammar: t, language: n }
                return (
                  $.hooks.run('before-tokenize', n),
                  (n.tokens = $.tokenize(n.code, n.grammar)),
                  $.hooks.run('after-tokenize', n),
                  F.stringify($.util.encode(n.tokens), n.language)
                )
              },
              tokenize: function (e, t) {
                var n = t.rest
                if (n) {
                  for (var r in n) t[r] = n[r]
                  delete t.rest
                }
                var i = new o()
                return (
                  L(i, i.head, e),
                  (function e(t, n, r, i, o, a) {
                    for (var s in r)
                      if (r.hasOwnProperty(s) && r[s]) {
                        var l = r[s]
                        l = Array.isArray(l) ? l : [l]
                        for (var c = 0; c < l.length; ++c) {
                          if (a && a.cause == s + ',' + c) return
                          var u,
                            p = l[c],
                            h = p.inside,
                            d = !!p.lookbehind,
                            f = !!p.greedy,
                            g = p.alias
                          f &&
                            !p.pattern.global &&
                            ((u = p.pattern.toString().match(/[imsuy]*$/)[0]),
                              (p.pattern = RegExp(p.pattern.source, u + 'g')))
                          for (
                            var m = p.pattern || p, v = i.next, y = o;
                            v !== n.tail && !(a && y >= a.reach);
                            y += v.value.length, v = v.next
                          ) {
                            var b = v.value
                            if (n.length > t.length) return
                            if (!(b instanceof F)) {
                              var k,
                                w = 1
                              if (f) {
                                if (!(k = C(m, y, t, d))) break
                                var x = k.index,
                                  _ = k.index + k[0].length,
                                  S = y
                                for (S += v.value.length; S <= x;)
                                  (v = v.next), (S += v.value.length)
                                if (
                                  ((S -= v.value.length),
                                    (y = S),
                                    v.value instanceof F)
                                )
                                  continue
                                for (
                                  var A = v;
                                  A !== n.tail &&
                                  (S < _ || 'string' == typeof A.value);
                                  A = A.next
                                )
                                  w++, (S += A.value.length)
                                w--, (b = t.slice(y, S)), (k.index -= y)
                              } else if (!(k = C(m, 0, b, d))) continue
                              var x = k.index,
                                T = k[0],
                                E = b.slice(0, x),
                                R = b.slice(x + T.length),
                                O = y + b.length
                              a && O > a.reach && (a.reach = O)
                              var b = v.prev
                              E && ((b = L(n, b, E)), (y += E.length)),
                                z(n, b, w)
                              var T = new F(s, h ? $.tokenize(T, h) : T, g, T)
                                ; (v = L(n, b, T)),
                                  R && L(n, v, R),
                                  1 < w &&
                                  e(t, n, r, v.prev, y, {
                                    cause: s + ',' + c,
                                    reach: O,
                                  })
                            }
                          }
                        }
                      }
                  })(e, i, t, i.head, 0),
                  (function (e) {
                    var t = [],
                      n = e.head.next
                    for (; n !== e.tail;) t.push(n.value), (n = n.next)
                    return t
                  })(i)
                )
              },
              hooks: {
                all: {},
                add: function (e, t) {
                  var n = $.hooks.all
                    ; (n[e] = n[e] || []), n[e].push(t)
                },
                run: function (e, t) {
                  var n = $.hooks.all[e]
                  if (n && n.length) for (var r, i = 0; (r = n[i++]);) r(t)
                },
              },
              Token: F,
            }
          function F(e, t, n, r) {
            ; (this.type = e),
              (this.content = t),
              (this.alias = n),
              (this.length = 0 | (r || '').length)
          }
          function C(e, t, n, r) {
            e.lastIndex = t
            n = e.exec(n)
            return (
              n &&
              r &&
              n[1] &&
              ((r = n[1].length), (n.index += r), (n[0] = n[0].slice(r))),
              n
            )
          }
          function o() {
            var e = { value: null, prev: null, next: null },
              t = { value: null, prev: e, next: null }
              ; (e.next = t), (this.head = e), (this.tail = t), (this.length = 0)
          }
          function L(e, t, n) {
            var r = t.next,
              n = { value: n, prev: t, next: r }
            return (t.next = n), (r.prev = n), e.length++, n
          }
          function z(e, t, n) {
            for (var r = t.next, i = 0; i < n && r !== e.tail; i++) r = r.next
              ; ((t.next = r).prev = t), (e.length -= i)
          }
          if (
            ((l.Prism = $),
              (F.stringify = function t(e, n) {
                if ('string' == typeof e) return e
                if (Array.isArray(e)) {
                  var r = ''
                  return (
                    e.forEach(function (e) {
                      r += t(e, n)
                    }),
                    r
                  )
                }
                var i = {
                  type: e.type,
                  content: t(e.content, n),
                  tag: 'span',
                  classes: ['token', e.type],
                  attributes: {},
                  language: n,
                },
                  e = e.alias
                e &&
                  (Array.isArray(e)
                    ? Array.prototype.push.apply(i.classes, e)
                    : i.classes.push(e)),
                  $.hooks.run('wrap', i)
                var o,
                  a = ''
                for (o in i.attributes)
                  a +=
                    ' ' +
                    o +
                    '="' +
                    (i.attributes[o] || '').replace(/"/g, '&quot;') +
                    '"'
                return (
                  '<' +
                  i.tag +
                  ' class="' +
                  i.classes.join(' ') +
                  '"' +
                  a +
                  '>' +
                  i.content +
                  '</' +
                  i.tag +
                  '>'
                )
              }),
              !l.document)
          )
            return (
              l.addEventListener &&
              ($.disableWorkerMessageHandler ||
                l.addEventListener(
                  'message',
                  function (e) {
                    var t = JSON.parse(e.data),
                      n = t.language,
                      e = t.code,
                      t = t.immediateClose
                    l.postMessage($.highlight(e, $.languages[n], n)),
                      t && l.close()
                  },
                  !1
                )),
              $
            )
          var e,
            n = $.util.currentScript()
          function r() {
            $.manual || $.highlightAll()
          }
          return (
            n &&
            (($.filename = n.src),
              n.hasAttribute('data-manual') && ($.manual = !0)),
            $.manual ||
            ('loading' === (e = document.readyState) ||
              ('interactive' === e && n && n.defer)
              ? document.addEventListener('DOMContentLoaded', r)
              : window.requestAnimationFrame
                ? window.requestAnimationFrame(r)
                : window.setTimeout(r, 16)),
            $
          )
        })(
          'undefined' != typeof window
            ? window
            : 'undefined' != typeof WorkerGlobalScope &&
              self instanceof WorkerGlobalScope
              ? self
              : {}
        )
      function p(e, t) {
        var n = (n = e.className).replace(r, ' ') + ' language-' + t
        e.className = n.replace(/\s+/g, ' ').trim()
      }
      e.exports && (e.exports = i),
        void 0 !== dt && (dt.Prism = i),
        (i.languages.markup = {
          comment: /<!--[\s\S]*?-->/,
          prolog: /<\?[\s\S]+?\?>/,
          doctype: {
            pattern:
              /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
            greedy: !0,
            inside: {
              'internal-subset': {
                pattern: /(\[)[\s\S]+(?=\]>$)/,
                lookbehind: !0,
                greedy: !0,
                inside: null,
              },
              string: { pattern: /"[^"]*"|'[^']*'/, greedy: !0 },
              punctuation: /^<!|>$|[[\]]/,
              'doctype-tag': /^DOCTYPE/,
              name: /[^\s<>'"]+/,
            },
          },
          cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
          tag: {
            pattern:
              /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
            greedy: !0,
            inside: {
              tag: {
                pattern: /^<\/?[^\s>\/]+/,
                inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ },
              },
              'attr-value': {
                pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                inside: {
                  punctuation: [{ pattern: /^=/, alias: 'attr-equals' }, /"|'/],
                },
              },
              punctuation: /\/?>/,
              'attr-name': {
                pattern: /[^\s>\/]+/,
                inside: { namespace: /^[^\s>\/:]+:/ },
              },
            },
          },
          entity: [
            { pattern: /&[\da-z]{1,8};/i, alias: 'named-entity' },
            /&#x?[\da-f]{1,8};/i,
          ],
        }),
        (i.languages.markup.tag.inside['attr-value'].inside.entity =
          i.languages.markup.entity),
        (i.languages.markup.doctype.inside['internal-subset'].inside =
          i.languages.markup),
        i.hooks.add('wrap', function (e) {
          'entity' === e.type &&
            (e.attributes.title = e.content.replace(/&amp;/, '&'))
        }),
        Object.defineProperty(i.languages.markup.tag, 'addInlined', {
          value: function (e, t) {
            var n = {}
              ; (n['language-' + t] = {
                pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
                lookbehind: !0,
                inside: i.languages[t],
              }),
                (n.cdata = /^<!\[CDATA\[|\]\]>$/i)
            n = {
              'included-cdata': {
                pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
                inside: n,
              },
            }
            n['language-' + t] = { pattern: /[\s\S]+/, inside: i.languages[t] }
            t = {}
              ; (t[e] = {
                pattern: RegExp(
                  /(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(
                    /__/g,
                    function () {
                      return e
                    }
                  ),
                  'i'
                ),
                lookbehind: !0,
                greedy: !0,
                inside: n,
              }),
                i.languages.insertBefore('markup', 'cdata', t)
          },
        }),
        (i.languages.html = i.languages.markup),
        (i.languages.mathml = i.languages.markup),
        (i.languages.svg = i.languages.markup),
        (i.languages.xml = i.languages.extend('markup', {})),
        (i.languages.ssml = i.languages.xml),
        (i.languages.atom = i.languages.xml),
        (i.languages.rss = i.languages.xml),
        (function (e) {
          var t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
            ; (e.languages.css = {
              comment: /\/\*[\s\S]*?\*\//,
              atrule: {
                pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
                inside: {
                  rule: /^@[\w-]+/,
                  'selector-function-argument': {
                    pattern:
                      /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
                    lookbehind: !0,
                    alias: 'selector',
                  },
                  keyword: {
                    pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
                    lookbehind: !0,
                  },
                },
              },
              url: {
                pattern: RegExp(
                  '\\burl\\((?:' +
                  t.source +
                  '|' +
                  /(?:[^\\\r\n()"']|\\[\s\S])*/.source +
                  ')\\)',
                  'i'
                ),
                greedy: !0,
                inside: {
                  function: /^url/i,
                  punctuation: /^\(|\)$/,
                  string: { pattern: RegExp('^' + t.source + '$'), alias: 'url' },
                },
              },
              selector: RegExp(
                '[^{}\\s](?:[^{};"\'\\s]|\\s+(?![\\s{])|' +
                t.source +
                ')*(?=\\s*\\{)'
              ),
              string: { pattern: t, greedy: !0 },
              property:
                /(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
              important: /!important\b/i,
              function: /[-a-z0-9]+(?=\()/i,
              punctuation: /[(){};:,]/,
            }),
              (e.languages.css.atrule.inside.rest = e.languages.css)
          t = e.languages.markup
          t &&
            (t.tag.addInlined('style', 'css'),
              e.languages.insertBefore(
                'inside',
                'attr-value',
                {
                  'style-attr': {
                    pattern: /(^|["'\s])style\s*=\s*(?:"[^"]*"|'[^']*')/i,
                    lookbehind: !0,
                    inside: {
                      'attr-value': {
                        pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
                        inside: {
                          style: {
                            pattern: /(["'])[\s\S]+(?=["']$)/,
                            lookbehind: !0,
                            alias: 'language-css',
                            inside: e.languages.css,
                          },
                          punctuation: [
                            { pattern: /^=/, alias: 'attr-equals' },
                            /"|'/,
                          ],
                        },
                      },
                      'attr-name': /^style/i,
                    },
                  },
                },
                t.tag
              ))
        })(i),
        (i.languages.clike = {
          comment: [
            {
              pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
              lookbehind: !0,
              greedy: !0,
            },
            { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 },
          ],
          string: {
            pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
            greedy: !0,
          },
          'class-name': {
            pattern:
              /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
            lookbehind: !0,
            inside: { punctuation: /[.\\]/ },
          },
          keyword:
            /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
          boolean: /\b(?:true|false)\b/,
          function: /\w+(?=\()/,
          number: /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
          operator: /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
          punctuation: /[{}[\];(),.:]/,
        }),
        (i.languages.javascript = i.languages.extend('clike', {
          'class-name': [
            i.languages.clike['class-name'],
            {
              pattern:
                /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
              lookbehind: !0,
            },
          ],
          keyword: [
            { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
            {
              pattern:
                /(^|[^.]|\.\.\.\s*)\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|(?:get|set)(?=\s*[\[$\w\xA0-\uFFFF])|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
              lookbehind: !0,
            },
          ],
          function:
            /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
          number:
            /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
          operator:
            /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/,
        })),
        (i.languages.javascript['class-name'][0].pattern =
          /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
        i.languages.insertBefore('javascript', 'keyword', {
          regex: {
            pattern:
              /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
            lookbehind: !0,
            greedy: !0,
            inside: {
              'regex-source': {
                pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
                lookbehind: !0,
                alias: 'language-regex',
                inside: i.languages.regex,
              },
              'regex-flags': /[a-z]+$/,
              'regex-delimiter': /^\/|\/$/,
            },
          },
          'function-variable': {
            pattern:
              /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
            alias: 'function',
          },
          parameter: [
            {
              pattern:
                /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
              lookbehind: !0,
              inside: i.languages.javascript,
            },
            {
              pattern:
                /(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
              inside: i.languages.javascript,
            },
            {
              pattern:
                /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
              lookbehind: !0,
              inside: i.languages.javascript,
            },
            {
              pattern:
                /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
              lookbehind: !0,
              inside: i.languages.javascript,
            },
          ],
          constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/,
        }),
        i.languages.insertBefore('javascript', 'string', {
          'template-string': {
            pattern:
              /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|(?!\${)[^\\`])*`/,
            greedy: !0,
            inside: {
              'template-punctuation': { pattern: /^`|`$/, alias: 'string' },
              interpolation: {
                pattern:
                  /((?:^|[^\\])(?:\\{2})*)\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
                lookbehind: !0,
                inside: {
                  'interpolation-punctuation': {
                    pattern: /^\${|}$/,
                    alias: 'punctuation',
                  },
                  rest: i.languages.javascript,
                },
              },
              string: /[\s\S]+/,
            },
          },
        }),
        i.languages.markup &&
        i.languages.markup.tag.addInlined('script', 'javascript'),
        (i.languages.js = i.languages.javascript),
        'undefined' != typeof self &&
        self.Prism &&
        self.document &&
        (Element.prototype.matches ||
          (Element.prototype.matches =
            Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector),
          (a = window.Prism),
          (s = {
            js: 'javascript',
            py: 'python',
            rb: 'ruby',
            ps1: 'powershell',
            psm1: 'powershell',
            sh: 'bash',
            bat: 'batch',
            h: 'c',
            tex: 'latex',
          }),
          (u =
            'pre[data-src]:not([' +
            (l = 'data-src-status') +
            '="loaded"]):not([' +
            l +
            '="' +
            (c = 'loading') +
            '"])'),
          (r = /\blang(?:uage)?-([\w-]+)\b/i),
          a.hooks.add('before-highlightall', function (e) {
            e.selector += ', ' + u
          }),
          a.hooks.add('before-sanity-check', function (e) {
            var t,
              n,
              r,
              i,
              o = e.element
            o.matches(u) &&
              ((e.code = ''),
                o.setAttribute(l, c),
                ((t = o.appendChild(document.createElement('CODE'))).textContent =
                  'Loading…'),
                (n = o.getAttribute('data-src')),
                'none' === (e = e.language) &&
                ((r = (/\.(\w+)$/.exec(n) || [, 'none'])[1]), (e = s[r] || r)),
                p(t, e),
                p(o, e),
                (r = a.plugins.autoloader) && r.loadLanguages(e),
                (i = new XMLHttpRequest()).open('GET', n, !0),
                (i.onreadystatechange = function () {
                  4 == i.readyState &&
                    (i.status < 400 && i.responseText
                      ? (o.setAttribute(l, 'loaded'),
                        (t.textContent = i.responseText),
                        a.highlightElement(t))
                      : (o.setAttribute(l, 'failed'),
                        400 <= i.status
                          ? (t.textContent =
                            '✖ Error ' +
                            i.status +
                            ' while fetching file: ' +
                            i.statusText)
                          : (t.textContent =
                            '✖ Error: File does not exist or is empty')))
                }),
                i.send(null))
          }),
          (t = !(a.plugins.fileHighlight = {
            highlight: function (e) {
              for (
                var t, n = (e || document).querySelectorAll(u), r = 0;
                (t = n[r++]);

              )
                a.highlightElement(t)
            },
          })),
          (a.fileHighlight = function () {
            t ||
              (console.warn(
                'Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.'
              ),
                (t = !0)),
              a.plugins.fileHighlight.highlight.apply(this, arguments)
          }))
    })
  function Rn(e, t) {
    return '___' + e.toUpperCase() + t + '___'
  }
  ; (Tn = Prism),
    Object.defineProperties((Tn.languages['markup-templating'] = {}), {
      buildPlaceholders: {
        value: function (r, i, e, o) {
          var a
          r.language === i &&
            ((a = r.tokenStack = []),
              (r.code = r.code.replace(e, function (e) {
                if ('function' == typeof o && !o(e)) return e
                for (var t, n = a.length; -1 !== r.code.indexOf((t = Rn(i, n)));)
                  ++n
                return (a[n] = e), t
              })),
              (r.grammar = Tn.languages.markup))
        },
      },
      tokenizePlaceholders: {
        value: function (c, u) {
          var p, h
          c.language === u &&
            c.tokenStack &&
            ((c.grammar = Tn.languages[u]),
              (p = 0),
              (h = Object.keys(c.tokenStack)),
              (function e(t) {
                for (var n = 0; n < t.length && !(p >= h.length); n++) {
                  var r,
                    i,
                    o,
                    a,
                    s,
                    l = t[n]
                  'string' == typeof l ||
                    (l.content && 'string' == typeof l.content)
                    ? ((i = h[p]),
                      (o = c.tokenStack[i]),
                      (r = 'string' == typeof l ? l : l.content),
                      (s = Rn(u, i)),
                      -1 < (a = r.indexOf(s)) &&
                      (++p,
                        (i = r.substring(0, a)),
                        (o = new Tn.Token(
                          u,
                          Tn.tokenize(o, c.grammar),
                          'language-' + u,
                          o
                        )),
                        (a = r.substring(a + s.length)),
                        (s = []),
                        i && s.push.apply(s, e([i])),
                        s.push(o),
                        a && s.push.apply(s, e([a])),
                        'string' == typeof l
                          ? t.splice.apply(t, [n, 1].concat(s))
                          : (l.content = s)))
                    : l.content && e(l.content)
                }
                return t
              })(c.tokens))
        },
      },
    })
  function On(i, e) {
    var o = this
      ; (this.config = i),
        (this.router = e),
        (this.cacheTree = {}),
        (this.toc = []),
        (this.cacheTOC = {}),
        (this.linkTarget = i.externalLinkTarget || '_blank'),
        (this.linkRel =
          '_blank' === this.linkTarget ? i.externalLinkRel || 'noopener' : ''),
        (this.contentBase = e.getBasePath())
    var t = this._initRenderer()
    this.heading = t.heading
    var a = r((e = i.markdown || {}))
      ? e(gn, t)
      : (gn.setOptions(y(e, { renderer: y(t, e.renderer) })), gn)
      ; (this._marked = a),
        (this.compile = function (n) {
          var r = !0,
            e = s(function (e) {
              r = !1
              var t = ''
              return n
                ? ((t = c(n) ? a(n) : a.parser(n)),
                  (t = i.noEmoji
                    ? t
                    : t
                      .replace(/:\+1:/g, ':thumbsup:')
                      .replace(/:-1:/g, ':thumbsdown:')
                      .replace(
                        /<(pre|template|code)[^>]*?>[\s\S]+?<\/(pre|template|code)>/g,
                        function (e) {
                          return e.replace(/:/g, '__colon__')
                        }
                      )
                      .replace(/:(\w+?):/gi, window.emojify || _n)
                      .replace(/__colon__/g, ':')),
                  xn.clear(),
                  t)
                : n
            })(n),
            t = o.router.parse().file
          return (
            r ? (o.toc = o.cacheTOC[t]) : (o.cacheTOC[t] = [].concat(o.toc)), e
          )
        })
  }
  var $n = {},
    Fn = {
      markdown: function (e) {
        return { url: e }
      },
      mermaid: function (e) {
        return { url: e }
      },
      iframe: function (e, t) {
        return {
          html:
            '<iframe src="' +
            e +
            '" ' +
            (t || 'width=100% height=400') +
            '></iframe>',
        }
      },
      video: function (e, t) {
        return {
          html:
            '<video src="' +
            e +
            '" ' +
            (t || 'controls') +
            '>Not Support</video>',
        }
      },
      audio: function (e, t) {
        return {
          html:
            '<audio src="' +
            e +
            '" ' +
            (t || 'controls') +
            '>Not Support</audio>',
        }
      },
      code: function (e, t) {
        var n = e.match(/\.(\w+)$/)
        return (
          'md' === (n = t || (n && n[1])) && (n = 'markdown'),
          { url: e, lang: n }
        )
      },
    }
    ; (On.prototype.compileEmbed = function (e, t) {
      var n,
        r,
        i = Sn(t),
        o = i.str,
        i = i.config
      if (((t = o), i.include))
        return (
          O(e) || (e = N(this.contentBase, F(this.router.getCurrentPath()), e)),
          i.type && (r = Fn[i.type])
            ? ((n = r.call(this, e, t)).type = i.type)
            : ((r = 'code'),
              /\.(md|markdown)/.test(e)
                ? (r = 'markdown')
                : /\.mmd/.test(e)
                  ? (r = 'mermaid')
                  : /\.html?/.test(e)
                    ? (r = 'iframe')
                    : /\.(mp4|ogg)/.test(e)
                      ? (r = 'video')
                      : /\.mp3/.test(e) && (r = 'audio'),
              ((n = Fn[r].call(this, e, t)).type = r)),
          (n.fragment = i.fragment),
          n
        )
    }),
      (On.prototype._matchNotCompileLink = function (e) {
        for (var t = this.config.noCompileLinks || [], n = 0; n < t.length; n++) {
          var r = t[n]
          if (($n[r] || ($n[r] = new RegExp('^' + r + '$'))).test(e)) return e
        }
      }),
      (On.prototype._initRenderer = function () {
        var a,
          s,
          l,
          c,
          u,
          p,
          e = new gn.Renderer(),
          t = this.linkTarget,
          n = this.linkRel,
          o = this.router,
          r = this.contentBase,
          h = this,
          i = {}
        return (
          (i.heading = e.heading =
            function (e, t) {
              var n = Sn(e),
                r = n.str,
                i = n.config,
                e = { level: t, title: An(r) }
                ; /<!-- {docsify-ignore} -->/g.test(r) &&
                  ((r = r.replace('\x3c!-- {docsify-ignore} --\x3e', '')),
                    (e.title = An(r)),
                    (e.ignoreSubHeading = !0)),
                  /{docsify-ignore}/g.test(r) &&
                  ((r = r.replace('{docsify-ignore}', '')),
                    (e.title = An(r)),
                    (e.ignoreSubHeading = !0)),
                  /<!-- {docsify-ignore-all} -->/g.test(r) &&
                  ((r = r.replace('\x3c!-- {docsify-ignore-all} --\x3e', '')),
                    (e.title = An(r)),
                    (e.ignoreAllSubs = !0)),
                  /{docsify-ignore-all}/g.test(r) &&
                  ((r = r.replace('{docsify-ignore-all}', '')),
                    (e.title = An(r)),
                    (e.ignoreAllSubs = !0))
                ; (n = xn(i.id || r)), (i = o.toURL(o.getCurrentPath(), { id: n }))
              return (
                (e.slug = i),
                h.toc.push(e),
                '<h' +
                t +
                ' id="' +
                n +
                '"><a href="' +
                i +
                '" data-id="' +
                n +
                '" class="anchor"><span>' +
                r +
                '</span></a></h' +
                t +
                '>'
              )
            }),
          (i.code = { renderer: e }.renderer.code =
            function (e, t) {
              void 0 === t && (t = 'markup')
              var n = En.languages[t] || En.languages.markup
              return (
                '<pre v-pre data-lang="' +
                t +
                '"><code class="lang-' +
                t +
                '">' +
                En.highlight(e.replace(/@DOCSIFY_QM@/g, '`'), n, t) +
                '</code></pre>'
              )
            }),
          (i.link =
            ((n = (t = {
              renderer: e,
              router: o,
              linkTarget: t,
              linkRel: n,
              compilerClass: h,
            }).renderer),
              (a = t.router),
              (s = t.linkTarget),
              (l = t.linkRel),
              (c = t.compilerClass),
              (n.link = function (e, t, n) {
                void 0 === t && (t = '')
                var r = [],
                  i = Sn(t),
                  o = i.str,
                  i = i.config
                return (
                  (s = i.target || s),
                  (l =
                    '_blank' === s ? c.config.externalLinkRel || 'noopener' : ''),
                  (t = o),
                  O(e) || c._matchNotCompileLink(e) || i.ignore
                    ? (O(e) ||
                      './' !== e.slice(0, 2) ||
                      (e =
                        document.URL.replace(/\/(?!.*\/).*/, '/').replace(
                          '#/./',
                          ''
                        ) + e),
                      r.push(
                        0 === e.indexOf('mailto:') ? '' : 'target="' + s + '"'
                      ),
                      r.push(
                        0 !== e.indexOf('mailto:') && '' !== l
                          ? ' rel="' + l + '"'
                          : ''
                      ))
                    : (e === c.config.homepage && (e = 'README'),
                      (e = a.toURL(e, null, a.getCurrentPath()))),
                  i.crossorgin &&
                  '_self' === s &&
                  'history' === c.config.routerMode &&
                  -1 === c.config.crossOriginLinks.indexOf(e) &&
                  c.config.crossOriginLinks.push(e),
                  i.disabled && (r.push('disabled'), (e = 'javascript:void(0)')),
                  i.class && r.push('class="' + i.class + '"'),
                  i.id && r.push('id="' + i.id + '"'),
                  t && r.push('title="' + t + '"'),
                  '<a href="' + e + '" ' + r.join(' ') + '>' + n + '</a>'
                )
              }))),
          (i.paragraph = { renderer: e }.renderer.paragraph =
            function (e) {
              e = /^!&gt;/.test(e)
                ? vn('tip', e)
                : /^\?&gt;/.test(e)
                  ? vn('warn', e)
                  : '<p>' + e + '</p>'
              return e
            }),
          (i.image =
            ((r = (n = { renderer: e, contentBase: r, router: o }).renderer),
              (u = n.contentBase),
              (p = n.router),
              (r.image = function (e, t, n) {
                var r = e,
                  i = [],
                  o = Sn(t),
                  a = o.str,
                  o = o.config
                return (
                  (t = a),
                  o['no-zoom'] && i.push('data-no-zoom'),
                  t && i.push('title="' + t + '"'),
                  o.size &&
                  ((t = (a = o.size.split('x'))[0]),
                    (a = a[1])
                      ? i.push('width="' + t + '" height="' + a + '"')
                      : i.push('width="' + t + '"')),
                  o.class && i.push('class="' + o.class + '"'),
                  o.id && i.push('id="' + o.id + '"'),
                  O(e) || (r = N(u, F(p.getCurrentPath()), e)),
                  0 < i.length
                    ? '<img src="' +
                    r +
                    '" data-origin="' +
                    e +
                    '" alt="' +
                    n +
                    '" ' +
                    i.join(' ') +
                    ' />'
                    : '<img src="' +
                    r +
                    '" data-origin="' +
                    e +
                    '" alt="' +
                    n +
                    '"' +
                    i +
                    '>'
                )
              }))),
          (i.list = { renderer: e }.renderer.list =
            function (e, t, n) {
              t = t ? 'ol' : 'ul'
              return (
                '<' +
                t +
                ' ' +
                [
                  /<li class="task-list-item">/.test(
                    e.split('class="task-list"')[0]
                  )
                    ? 'class="task-list"'
                    : '',
                  n && 1 < n ? 'start="' + n + '"' : '',
                ]
                  .join(' ')
                  .trim() +
                '>' +
                e +
                '</' +
                t +
                '>'
              )
            }),
          (i.listitem = { renderer: e }.renderer.listitem =
            function (e) {
              return /^(<input.*type="checkbox"[^>]*>)/.test(e)
                ? '<li class="task-list-item"><label>' + e + '</label></li>'
                : '<li>' + e + '</li>'
            }),
          (e.origin = i),
          e
        )
      }),
      (On.prototype.sidebar = function (e, t) {
        var n = this.toc,
          r = this.router.getCurrentPath(),
          i = ''
        if (e) i = this.compile(e)
        else {
          for (var o = 0; o < n.length; o++)
            if (n[o].ignoreSubHeading) {
              var a = n[o].level
              n.splice(o, 1)
              for (var s = o; s < n.length && a < n[s].level; s++)
                n.splice(s, 1) && s-- && o++
              o--
            }
          ; (t = this.cacheTree[r] || yn(n, t)), (i = mn(t, '<ul>{inner}</ul>'))
          this.cacheTree[r] = t
        }
        return i
      }),
      (On.prototype.subSidebar = function (e) {
        if (e) {
          var t = this.router.getCurrentPath(),
            n = this.cacheTree,
            r = this.toc
          r[0] && r[0].ignoreAllSubs && r.splice(0),
            r[0] && 1 === r[0].level && r.shift()
          for (var i = 0; i < r.length; i++)
            r[i].ignoreSubHeading && r.splice(i, 1) && i--
          e = n[t] || yn(r, e)
          return (n[t] = e), (this.toc = []), mn(e)
        }
        this.toc = []
      }),
      (On.prototype.header = function (e, t) {
        return this.heading(e, t)
      }),
      (On.prototype.article = function (e) {
        return this.compile(e)
      }),
      (On.prototype.cover = function (e) {
        var t = this.toc.slice(),
          e = this.compile(e)
        return (this.toc = t.slice()), e
      })
  var Cn,
    Ln = function (e) {
      var t = (function (e) {
        e = e.match(/^[ \t]*(?=\S)/gm)
        return e
          ? e.reduce(function (e, t) {
            return Math.min(e, t.length)
          }, 1 / 0)
          : 0
      })(e)
      if (0 === t) return e
      t = new RegExp('^[ \\t]{' + t + '}', 'gm')
      return e.replace(t, '')
    },
    zn = {}
  function Nn(e, r) {
    var o = e.compiler,
      i = e.raw
    void 0 === i && (i = '')
    var t = e.fetch,
      e = zn[i]
    if (e) {
      var n = e.slice()
      return (n.links = e.links), r(n)
    }
    var n = o._marked,
      a = n.lexer(i),
      s = [],
      l = n.Lexer.rules.inline.link,
      c = a.links
    a.forEach(function (e, i) {
      'paragraph' === e.type &&
        (e.text = e.text.replace(
          new RegExp(l.source, 'g'),
          function (e, t, n, r) {
            r = o.compileEmbed(n, r)
            return r && s.push({ index: i, embed: r }), e
          }
        ))
    })
    var u = []
    !(function (e, o) {
      var t,
        n = e.embedTokens,
        a = e.compile,
        s = (e.fetch, 0),
        l = 1
      if (!n.length) return o({})
      for (; (t = n[s++]);) {
        var r = (function (i) {
          return function (e) {
            var t, n, r
            e &&
              ('markdown' === i.embed.type
                ? ((n = i.embed.url.split('/')).pop(),
                  (n = n.join('/')),
                  (e = e.replace(/\[([^[\]]+)\]\(([^)]+)\)/g, function (e) {
                    var t = e.indexOf('(')
                    return '(.' === e.slice(t, t + 2)
                      ? e.substring(0, t) +
                      '(' +
                      window.location.protocol +
                      '//' +
                      window.location.host +
                      n +
                      '/' +
                      e.substring(t + 1, e.length - 1) +
                      ')'
                      : e
                  })),
                  !0 === (($docsify.frontMatter || {}).installed || !1) &&
                  (e = $docsify.frontMatter.parseMarkdown(e)),
                  (t = a.lexer(e)))
                : 'code' === i.embed.type
                  ? (i.embed.fragment &&
                    ((r = i.embed.fragment),
                      (r = new RegExp(
                        '(?:###|\\/\\/\\/)\\s*\\[' +
                        r +
                        '\\]([\\s\\S]*)(?:###|\\/\\/\\/)\\s*\\[' +
                        r +
                        '\\]'
                      )),
                      (e = Ln((e.match(r) || [])[1] || '').trim())),
                    (t = a.lexer(
                      '```' +
                      i.embed.lang +
                      '\n' +
                      e.replace(/`/g, '@DOCSIFY_QM@') +
                      '\n```\n'
                    )))
                  : 'mermaid' === i.embed.type
                    ? ((t = [
                      {
                        type: 'html',
                        text: '<div class="mermaid">\n' + e + '\n</div>',
                      },
                    ]).links = {})
                    : ((t = [{ type: 'html', text: e }]).links = {})),
              o({ token: i, embedToken: t }),
              ++l >= s && o({})
          }
        })(t)
        t.embed.url ? ce(t.embed.url).then(r) : r(t.embed.html)
      }
    })({ compile: n, embedTokens: s, fetch: t }, function (e) {
      var t,
        n = e.embedToken,
        e = e.token
      e
        ? ((t = e.index),
          u.forEach(function (e) {
            t > e.start && (t += e.length)
          }),
          y(c, n.links),
          (a = a.slice(0, t).concat(n, a.slice(t + 1))),
          u.push({ start: t, length: n.length - 1 }))
        : ((zn[i] = a.concat()), (a.links = zn[i].links = c), r(a))
    })
  }
  function Mn(e, t, n) {
    var r, i, o, a
    return (
      (t =
        'function' == typeof n
          ? n(t)
          : 'string' == typeof n
            ? ((o = []),
              (a = 0),
              (r = n).replace(B, function (t, e, n) {
                o.push(r.substring(a, n - 1)),
                  (a = n += t.length + 1),
                  o.push(
                    (i && i[t]) ||
                    function (e) {
                      return (
                        '00' + ('string' == typeof Z[t] ? e[Z[t]]() : Z[t](e))
                      ).slice(-t.length)
                    }
                  )
              }),
              a !== r.length && o.push(r.substring(a)),
              (function (e) {
                for (var t = '', n = 0, r = e || new Date(); n < o.length; n++)
                  t += 'string' == typeof o[n] ? o[n] : o[n](r)
                return t
              })(new Date(t)))
            : t),
      e.replace(/{docsify-updated}/g, t)
    )
  }
  function Dn(e) {
    function t(e) {
      var t = Boolean(e.__vue__ && e.__vue__._isVue),
        e = Boolean(e._vnode && e._vnode.__v_skip)
      return t || e
    }
    var n = this.config,
      r = b('.markdown-section'),
      i =
        'Vue' in window &&
        window.Vue.version &&
        Number(window.Vue.version.charAt(0))
    if (((e = e || '<h1>404 - Not found</h1>'), 'Vue' in window))
      for (
        var o = 0, a = k('.markdown-section > *').filter(t);
        o < a.length;
        o += 1
      ) {
        var s = a[o]
        2 === i ? s.__vue__.$destroy() : 3 === i && s.__vue_app__.unmount()
      }
    if (
      (this._renderTo(r, e),
        n.loadSidebar || this._renderSidebar(),
        (n.executeScript || ('Vue' in window && !1 !== n.executeScript)) &&
        (!(e = k('.markdown-section>script').filter(function (e) {
          return !/template/.test(e.type)
        })[0]) ||
          ((e = e.innerText.trim()) && new Function(e)())),
        'Vue' in window)
    ) {
      var l,
        c,
        u = [],
        p = Object.keys(n.vueComponents || {})
      2 === i &&
        p.length &&
        p.forEach(function (e) {
          window.Vue.options.components[e] ||
            window.Vue.component(e, n.vueComponents[e])
        }),
        !Cn &&
        n.vueGlobalOptions &&
        'function' == typeof n.vueGlobalOptions.data &&
        (Cn = n.vueGlobalOptions.data()),
        u.push.apply(
          u,
          Object.keys(n.vueMounts || {})
            .map(function (e) {
              return [b(r, e), n.vueMounts[e]]
            })
            .filter(function (e) {
              var t = e[0]
              e[1]
              return t
            })
        ),
        (n.vueGlobalOptions || p.length) &&
        ((l = /{{2}[^{}]*}{2}/),
          (c = /<[^>/]+\s([@:]|v-)[\w-:.[\]]+[=>\s]/),
          u.push.apply(
            u,
            k('.markdown-section > *')
              .filter(function (n) {
                return !u.some(function (e) {
                  var t = e[0]
                  e[1]
                  return t === n
                })
              })
              .filter(function (e) {
                return (
                  e.tagName.toLowerCase() in (n.vueComponents || {}) ||
                  e.querySelector(p.join(',') || null) ||
                  l.test(e.outerHTML) ||
                  c.test(e.outerHTML)
                )
              })
              .map(function (e) {
                var t = y({}, n.vueGlobalOptions || {})
                return (
                  Cn &&
                  (t.data = function () {
                    return Cn
                  }),
                  [e, t]
                )
              })
          ))
      for (var h = 0, d = u; h < d.length; h += 1) {
        var f,
          g = d[h],
          m = g[0],
          v = g[1],
          g = 'data-isvue'
        m.matches('pre, script') ||
          t(m) ||
          m.querySelector('[' + g + ']') ||
          (m.setAttribute(g, ''),
            2 === i
              ? ((v.el = void 0), new window.Vue(v).$mount(m))
              : 3 === i &&
              ((f = window.Vue.createApp(v)),
                p.forEach(function (e) {
                  var t = n.vueComponents[e]
                  f.component(e, t)
                }),
                f.mount(m)))
      }
    }
  }
  function Pn(t, n, r, i, o, e) {
    (t = e ? t : t.replace(/\/$/, '')),
    (t = F(t)) &&
    // ce(o.router.getFile(t + r) + n, !1, o.config.requestHeaders).then(
    ce(o.router.getFile(r) + n, !1, o.config.requestHeaders).then(
      i,
      function (e) {
        return Pn(t, n, r, i, o)
      }
    )
  }
  var In = Object.freeze({
    __proto__: null,
    cached: s,
    hyphenate: o,
    hasOwn: l,
    merge: y,
    isPrimitive: c,
    noop: u,
    isFn: r,
    isExternal: p,
    inBrowser: !0,
    isMobile: h,
    supportsPushState: i,
    parseQuery: E,
    stringifyQuery: R,
    isAbsolutePath: O,
    removeParams: $,
    getParentPath: F,
    cleanPath: C,
    resolvePath: L,
    getPath: N,
    replaceSlug: M,
    endsWith: D,
  })
  var jn,
    Hn,
    qn = (function (e) {
      function t() {
        e.call(this),
          (this.config = we(this)),
          this.initLifecycle(),
          this.initPlugin(),
          this.callHook('init'),
          this.initRouter(),
          this.initRender(),
          this.initEvent(),
          this.initFetch(),
          this.callHook('mounted')
      }
      return (
        e && (t.__proto__ = e),
        (((t.prototype = Object.create(e && e.prototype)).constructor =
          t).prototype.initPlugin = function () {
            var t = this
              ;[].concat(this.config.plugins).forEach(function (e) {
                return r(e) && e(t._lifecycle, t)
              })
          }),
        t
      )
    })(
      ((Hn = Object),
        (function (e) {
          function t() {
            e.apply(this, arguments)
          }
          return (
            e && (t.__proto__ = e),
            (((t.prototype = Object.create(e && e.prototype)).constructor =
              t).prototype._loadSideAndNav = function (e, t, n, r) {
                var i = this
                return function () {
                  if (!n) return r()
                  Pn(
                    e,
                    t,
                    n,
                    function (e) {
                      i._renderSidebar(e), r()
                    },
                    i,
                    !0
                  )
                }
              }),
            (t.prototype._fetch = function (n) {
              var r = this
              void 0 === n && (n = u)
              var i,
                e,
                t,
                o,
                a,
                s = this.route.query,
                l = this.route.path
              p(l)
                ? (history.replaceState(null, '', '#'), this.router.normalize())
                : ((i = R(s, ['id'])),
                  (t = (e = this.config).loadNavbar),
                  (s = e.requestHeaders),
                  (o = e.loadSidebar),
                  (a = this.router.getFile(l)),
                  (s = Un(a + i, 0, s)),
                  (this.isRemoteUrl = p(a)),
                  (this.isHTML = /\.html$/g.test(a)),
                  s.then(
                    function (e, t) {
                      return r._renderMain(e, t, r._loadSideAndNav(l, i, o, n))
                    },
                    function (e) {
                      r._fetchFallbackPage(l, i, n) || r._fetch404(a, i, n)
                    }
                  ),
                  t &&
                  Pn(
                    l,
                    i,
                    t,
                    function (e) {
                      return r._renderNav(e)
                    },
                    this,
                    !0
                  ));
            }),
            (t.prototype._fetchCover = function () {
              var t = this,
                e = this.config,
                n = e.coverpage,
                r = e.requestHeaders,
                i = this.route.query,
                o = F(this.route.path)
              if (n) {
                var a = null,
                  e = this.route.path
                'string' == typeof n
                  ? '/' === e && (a = n)
                  : (a = Array.isArray(n)
                    ? -1 < n.indexOf(e) && '_coverpage'
                    : !0 === (e = n[e])
                      ? '_coverpage'
                      : e)
                var s = Boolean(a) && this.config.onlyCover
                return (
                  a
                    ? ((a = this.router.getFile(o + a)),
                      (this.coverIsHTML = /\.html$/g.test(a)),
                      ce(a + R(i, ['id']), !1, r).then(function (e) {
                        return t._renderCover(e, s)
                      }))
                    : this._renderCover(null, s),
                  s
                )
              }
            }),
            (t.prototype.$fetch = function (e, t) {
              var n = this
              void 0 === e && (e = u),
                void 0 === t && (t = this.$resetEvents.bind(this))
              function r() {
                n.callHook('doneEach'), e()
              }
              this._fetchCover()
                ? r()
                : this._fetch(function () {
                  t(), r()
                })
            }),
            (t.prototype._fetchFallbackPage = function (n, r, i) {
              var o = this
              void 0 === i && (i = u)
              var e = this.config,
                t = e.requestHeaders,
                a = e.fallbackLanguages,
                s = e.loadSidebar
              if (!a) return !1
              e = n.split('/')[1]
              if (-1 === a.indexOf(e)) return !1
              e = this.router.getFile(n.replace(new RegExp('^/' + e), ''))
              return (
                Un(e + r, 0, t).then(
                  function (e, t) {
                    return o._renderMain(e, t, o._loadSideAndNav(n, r, s, i))
                  },
                  function () {
                    return o._fetch404(n, r, i)
                  }
                ),
                !0
              )
            }),
            (t.prototype._fetch404 = function (e, t, n) {
              var r = this
              void 0 === n && (n = u)
              var i = this.config,
                o = i.loadSidebar,
                a = i.requestHeaders,
                i = i.notFoundPage,
                s = this._loadSideAndNav(e, t, o, n)
              if (i) {
                e = (function (t, e) {
                  var n,
                    r = e.notFoundPage,
                    i = '_404' + (e.ext || '.md')
                  switch (typeof r) {
                    case 'boolean':
                      n = i
                      break
                    case 'string':
                      n = r
                      break
                    case 'object':
                      n =
                        ((e = Object.keys(r)
                          .sort(function (e, t) {
                            return t.length - e.length
                          })
                          .filter(function (e) {
                            return t.match(new RegExp('^' + e))
                          })[0]) &&
                          r[e]) ||
                        i
                  }
                  return n
                })(e, this.config)
                return (
                  Un(this.router.getFile(e), 0, a).then(
                    function (e, t) {
                      return r._renderMain(e, t, s)
                    },
                    function () {
                      return r._renderMain(null, {}, s)
                    }
                  ),
                  !0
                )
              }
              return this._renderMain(null, {}, s), !1
            }),
            (t.prototype.initFetch = function () {
              var e,
                t = this,
                n = this.config.loadSidebar
              this.rendered
                ? ((e = de(this.router, '.sidebar-nav', !0, !0)),
                  n && e && (e.parentNode.innerHTML += window.__SUB_SIDEBAR__),
                  this._bindEventOnRendered(e),
                  this.$resetEvents(),
                  this.callHook('doneEach'),
                  this.callHook('ready'))
                : this.$fetch(function (e) {
                  return t.callHook('ready')
                })
            }),
            t
          )
        })(
          (function (e) {
            function t() {
              e.apply(this, arguments)
            }
            return (
              e && (t.__proto__ = e),
              (((t.prototype = Object.create(e && e.prototype)).constructor =
                t).prototype.$resetEvents = function (e) {
                  var t = this,
                    n = this.config.auto2top
                  'history' !== e &&
                    (t.route.query.id && Oe(t.route.path, t.route.query.id),
                      'navigate' === e &&
                      n &&
                      (void 0 === (n = n) && (n = 0),
                        ($e.scrollTop = !0 === n ? 0 : Number(n)))),
                    this.config.loadNavbar && de(this.router, 'nav')
                }),
              (t.prototype.initEvent = function () {
                function t(e) {
                  return g.classList.toggle('close')
                }
                var e
                  ; (e = 'button.sidebar-toggle'),
                    this.router,
                    null != (e = d(e)) &&
                    (x(e, 'click', function (e) {
                      e.stopPropagation(), t()
                    }),
                      h &&
                      x(g, 'click', function (e) {
                        return g.classList.contains('close') && t()
                      })),
                    (e = '.sidebar'),
                    this.router,
                    null != (e = d(e)) &&
                    x(e, 'click', function (e) {
                      e = e.target
                      'A' === e.nodeName &&
                        e.nextSibling &&
                        e.nextSibling.classList &&
                        e.nextSibling.classList.contains('app-sub-sidebar') &&
                        S(e.parentNode, 'collapse')
                    }),
                    this.config.coverpage
                      ? h || x('scroll', he)
                      : g.classList.add('sticky')
              }),
              t
            )
          })(
            (function (e) {
              function t() {
                e.apply(this, arguments)
              }
              return (
                e && (t.__proto__ = e),
                (((t.prototype = Object.create(e && e.prototype)).constructor =
                  t).prototype._renderTo = function (e, t, n) {
                    e = d(e)
                    e && (e[n ? 'outerHTML' : 'innerHTML'] = t)
                  }),
                (t.prototype._renderSidebar = function (e) {
                  var t = this.config,
                    n = t.maxLevel,
                    r = t.subMaxLevel,
                    i = t.loadSidebar
                  if (t.hideSidebar)
                    return (
                      [
                        document.querySelector('aside.sidebar'),
                        document.querySelector('button.sidebar-toggle'),
                      ].forEach(function (e) {
                        return e.parentNode.removeChild(e)
                      }),
                      (document.querySelector('section.content').style.right =
                        'unset'),
                      (document.querySelector('section.content').style.left =
                        'unset'),
                      (document.querySelector('section.content').style.position =
                        'relative'),
                      (document.querySelector('section.content').style.width =
                        '100%'),
                      null
                    )
                  this._renderTo('.sidebar-nav', this.compiler.sidebar(e, n))
                  n = de(this.router, '.sidebar-nav', !0, !0)
                  i && n
                    ? (n.parentNode.innerHTML +=
                      this.compiler.subSidebar(r) || '')
                    : this.compiler.subSidebar(),
                    this._bindEventOnRendered(n)
                }),
                (t.prototype._bindEventOnRendered = function (e) {
                  var t,
                    n = this.config.autoHeader
                  !(function (e) {
                    var t = b('.cover.show')
                    Te = t ? t.offsetHeight : 0
                    var t = d('.sidebar'),
                      n = []
                    null != t && (n = k(t, 'li'))
                    for (var r, i = 0, o = n.length; i < o; i += 1) {
                      var a,
                        s,
                        l = n[i],
                        c = l.querySelector('a')
                      c &&
                        ('/' !== (a = c.getAttribute('href')) &&
                          ((c = (s = e.parse(a)).query.id),
                            (s = s.path),
                            c && (a = Re(s, c))),
                          a && (xe[decodeURIComponent(a)] = l))
                    }
                    h ||
                      ((r = $(e.getCurrentPath())),
                        _('scroll', function () {
                          return Ee(r)
                        }),
                        x('scroll', function () {
                          return Ee(r)
                        }),
                        x(t, 'mouseover', function () {
                          _e = !0
                        }),
                        x(t, 'mouseleave', function () {
                          _e = !1
                        }))
                  })(this.router),
                    n &&
                    e &&
                    (n = (t = d('#main')).children[0]) &&
                    'H1' !== n.tagName &&
                    w(
                      t,
                      v('div', this.compiler.header(e.innerText, 1)).children[0]
                    )
                }),
                (t.prototype._renderNav = function (e) {
                  e && this._renderTo('nav', this.compiler.compile(e)),
                    this.config.loadNavbar && de(this.router, 'nav')
                }),
                (t.prototype._renderMain = function (r, i, o) {
                  var a = this
                  if ((void 0 === i && (i = {}), !r)) return Dn.call(this, r)
                  this.callHook('beforeEach', r, function (e) {
                    function t() {
                      i.updatedAt &&
                        (n = Mn(n, i.updatedAt, a.config.formatUpdated)),
                        a.callHook('afterEach', n, function (e) {
                          return Dn.call(a, e)
                        })
                    }
                    var n
                    a.isHTML
                      ? ((n = a.result = r), t(), o())
                      : Nn({ compiler: a.compiler, raw: e }, function (e) {
                        ; (n = a.compiler.compile(e)),
                          (n = a.isRemoteUrl
                            ? ae.sanitize(n, { ADD_TAGS: ['script'] })
                            : n),
                          t(),
                          o()
                      })
                  })
                }),
                (t.prototype._renderCover = function (e, t) {
                  var n,
                    r = d('.cover')
                  S(d('main'), t ? 'add' : 'remove', 'hidden'),
                    e
                      ? (S(r, 'add', 'show'),
                        (t = (n = this.coverIsHTML ? e : this.compiler.cover(e))
                          .trim()
                          .match(
                            '<p><img.*?data-origin="(.*?)"[^a]+alt="(.*?)">([^<]*?)</p>$'
                          )) &&
                        ('color' === t[2]
                          ? (r.style.background = t[1] + (t[3] || ''))
                          : ((e = t[1]),
                            S(r, 'add', 'has-mask'),
                            O(t[1]) || (e = N(this.router.getBasePath(), t[1])),
                            (r.style.backgroundImage = 'url(' + e + ')'),
                            (r.style.backgroundSize = 'cover'),
                            (r.style.backgroundPosition = 'center center')),
                          (n = n.replace(t[0], ''))),
                        this._renderTo('.cover-main', n),
                        he())
                      : S(r, 'remove', 'show')
                }),
                (t.prototype._updateRender = function () {
                  var e, t, n, r
                    ; (e = this),
                      (t = d('.app-name-link')),
                      (n = e.config.nameLink),
                      (r = e.route.path),
                      t &&
                      (c(e.config.nameLink)
                        ? t.setAttribute('href', n)
                        : 'object' == typeof n &&
                        ((e = Object.keys(n).filter(function (e) {
                          return -1 < r.indexOf(e)
                        })[0]),
                          t.setAttribute('href', n[e])))
                }),
                (t.prototype.initRender = function () {
                  var e = this.config
                    ; (this.compiler = new On(e, this.router)),
                      (window.__current_docsify_compiler__ = this.compiler)
                  var t,
                    n,
                    r,
                    i,
                    o,
                    a = e.el || '#app',
                    s = b('nav') || v('nav'),
                    l = b(a),
                    c = '',
                    u = g
                  l
                    ? (e.repo &&
                      (c +=
                        ((i = e.repo),
                          (a = e.cornerExternalLinkTarge),
                          i
                            ? (/\/\//.test(i) || (i = 'https://github.com/' + i),
                              '<a href="' +
                              (i = i.replace(/^git\+/, '')) +
                              '" target="' +
                              (a = a || '_blank') +
                              '" class="github-corner" aria-label="View source on Github"><svg viewBox="0 0 250 250" aria-hidden="true"><path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path><path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path><path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" class="octo-body"></path></svg></a>')
                            : '')),
                      e.coverpage &&
                      (c +=
                        ((r = ', 100%, 85%'),
                          '<section class="cover show" style="background: ' +
                          ('linear-gradient(to left bottom, hsl(' +
                            Math.floor(255 * Math.random()) +
                            r +
                            ') 0%,hsl(' +
                            Math.floor(255 * Math.random()) +
                            r +
                            ') 100%)') +
                          '"><div class="mask"></div><div class="cover-main">\x3c!--cover--\x3e</div></section>')),
                      e.logo &&
                      ((r = /^data:image/.test(e.logo)),
                        (t = /(?:http[s]?:)?\/\//.test(e.logo)),
                        (n = /^\./.test(e.logo)),
                        r ||
                        t ||
                        n ||
                        (e.logo = N(this.router.getBasePath(), e.logo))),
                      (c +=
                        ((n = (t = e).name ? t.name : ''),
                          '<main>' +
                          ('<button class="sidebar-toggle" aria-label="Menu"><div class="sidebar-toggle-button"><span></span><span></span><span></span></div></button><aside class="sidebar">' +
                            (t.name
                              ? '<h1 class="app-name"><a class="app-name-link" data-nosearch>' +
                              (t.logo
                                ? '<img alt="' +
                                n +
                                '" src=' +
                                t.logo +
                                ' style="zoom: 30%;">'
                                : n) +
                              '</a></h1>'
                              : '') +
                            '<div class="sidebar-nav">\x3c!--sidebar--\x3e</div></aside>') +
                          '<section class="content"><article class="markdown-section" id="main">\x3c!--main--\x3e</article></section></main>')),
                      this._renderTo(l, c, !0))
                    : (this.rendered = !0),
                    e.mergeNavbar && h
                      ? (u = b('.sidebar'))
                      : (s.classList.add('app-nav'),
                        e.repo || s.classList.add('no-badge')),
                    e.loadNavbar && w(u, s),
                    e.themeColor &&
                    (f.head.appendChild(
                      v(
                        'div',
                        '<style>:root{--theme-color: ' +
                        e.themeColor +
                        ';}</style>'
                      ).firstElementChild
                    ),
                      (o = e.themeColor),
                      (window.CSS &&
                        window.CSS.supports &&
                        window.CSS.supports('(--v:red)')) ||
                      ((e = k('style:not(.inserted),link')),
                        [].forEach.call(e, function (e) {
                          if ('STYLE' === e.nodeName) ue(e, o)
                          else if ('LINK' === e.nodeName) {
                            e = e.getAttribute('href')
                            if (!/\.css$/.test(e)) 
                              return ce(e).then(function (e) {
                                e = v('style', e)
                                m.appendChild(e), ue(e, o)
                              })
                          }
                        }))),
                    this._updateRender(),
                    S(g, 'ready')
                }),
                t
              )
            })(
              (function (n) {
                function e() {
                  for (var e = [], t = arguments.length; t--;)
                    e[t] = arguments[t]
                  n.apply(this, e), (this.route = {})
                }
                return (
                  n && (e.__proto__ = n),
                  (((e.prototype = Object.create(n && n.prototype)).constructor =
                    e).prototype.updateRender = function () {
                      this.router.normalize(),
                        (this.route = this.router.parse()),
                        g.setAttribute('data-page', this.route.file)
                    }),
                  (e.prototype.initRouter = function () {
                    var t = this,
                      e = this.config,
                      e = new (
                        'history' === (e.routerMode || 'hash') && i ? q : H
                      )(e)
                      ; (this.router = e),
                        this.updateRender(),
                        (U = this.route),
                        e.onchange(function (e) {
                          t.updateRender(),
                            t._updateRender(),
                            U.path !== t.route.path
                              ? (t.$fetch(u, t.$resetEvents.bind(t, e.source)),
                                (U = t.route))
                              : t.$resetEvents(e.source)
                        })
                  }),
                  e
                )
              })(
                (function (e) {
                  function t() {
                    e.apply(this, arguments)
                  }
                  return (
                    e && (t.__proto__ = e),
                    (((t.prototype = Object.create(
                      e && e.prototype
                    )).constructor = t).prototype.initLifecycle = function () {
                      var n = this
                        ; (this._hooks = {}),
                          (this._lifecycle = {}),
                          [
                            'init',
                            'mounted',
                            'beforeEach',
                            'afterEach',
                            'doneEach',
                            'ready',
                          ].forEach(function (e) {
                            var t = (n._hooks[e] = [])
                            n._lifecycle[e] = function (e) {
                              return t.push(e)
                            }
                          })
                    }),
                    (t.prototype.callHook = function (e, n, r) {
                      void 0 === r && (r = u)
                      var i = this._hooks[e],
                        o = function (t) {
                          var e = i[t]
                          t >= i.length
                            ? r(n)
                            : 'function' == typeof e
                              ? 2 === e.length
                                ? e(n, function (e) {
                                  ; (n = e), o(t + 1)
                                })
                                : ((e = e(n)), (n = void 0 === e ? n : e), o(t + 1))
                              : o(t + 1)
                        }
                      o(0)
                    }),
                    t
                  )
                })(Hn)
              )
            )
          )
        ))
    )
  function Un(e, t, n) {
    return jn && jn.abort && jn.abort(), (jn = ce(e, !0, n))
  };
  (window.Docsify = { util: In, dom: t, get: ce, slugify: xn, version: '4.12.2', }),
  (window.DocsifyCompiler = On),
  (window.marked = gn),
  (window.Prism = En),
  e(function (e) {
    return new qn()
  })
})()
