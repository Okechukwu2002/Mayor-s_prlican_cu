! function({
    retentionPeriodDays: e,
    timestamp: t,
    daysBeforeNotice: i,
    productName: n,
    version: s,
    ignorePattern: a
}) {
    if (a.some((e => RegExp(e).test(document.currentScript.src)))) return;
    const r = (-1 * (Date.now() - t - 24 * e * 60 * 60 * 1e3) / 864e5).toFixed(2);
    r <= i && r >= 0 ? console.warn(`Warning: The version ${s} of ${n} is set to lose support in ${r} days.`) : r < 0 && console.error(`Error: The version ${s} of ${n} not supported anymore.`)
}({
    retentionPeriodDays: 90,
    productName: "accessWidget",
    daysBeforeNotice: 14,
    version: "v1.16.23",
    timestamp: 1723623351591,
    ignorePattern: ["/^(?!.*v\\d+\\.\\d+\\.\\d+).*/"]
}), (() => {
    "use strict";
    var e = {
            301: function(e, t, i) {
                var n = this && this.__values || function(e) {
                        var t = "function" == typeof Symbol && Symbol.iterator,
                            i = t && e[t],
                            n = 0;
                        if (i) return i.call(e);
                        if (e && "number" == typeof e.length) return {
                            next: function() {
                                return e && n >= e.length && (e = void 0), {
                                    value: e && e[n++],
                                    done: !e
                                }
                            }
                        };
                        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
                    },
                    s = this && this.__read || function(e, t) {
                        var i = "function" == typeof Symbol && e[Symbol.iterator];
                        if (!i) return e;
                        var n, s, a = i.call(e),
                            r = [];
                        try {
                            for (;
                                (void 0 === t || t-- > 0) && !(n = a.next()).done;) r.push(n.value)
                        } catch (e) {
                            s = {
                                error: e
                            }
                        } finally {
                            try {
                                n && !n.done && (i = a.return) && i.call(a)
                            } finally {
                                if (s) throw s.error
                            }
                        }
                        return r
                    },
                    a = this && this.__spreadArray || function(e, t, i) {
                        if (i || 2 === arguments.length)
                            for (var n, s = 0, a = t.length; s < a; s++) !n && s in t || (n || (n = Array.prototype.slice.call(t, 0, s)), n[s] = t[s]);
                        return e.concat(n || Array.prototype.slice.call(t))
                    };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.EnvironmentPurifier = void 0;
                var r = i(185),
                    o = function() {
                        function e(t) {
                            var i, s, a, r;
                            void 0 === t && (t = window);
                            try {
                                for (var o = n(e.Replacers), l = o.next(); !l.done; l = o.next()) {
                                    var c = l.value;
                                    c.replaceStrategy(c, {
                                        ref: e.pureWindow,
                                        targetRef: t
                                    })
                                }
                            } catch (e) {
                                i = {
                                    error: e
                                }
                            } finally {
                                try {
                                    l && !l.done && (s = o.return) && s.call(o)
                                } finally {
                                    if (i) throw i.error
                                }
                            }
                            try {
                                for (var d = n(t.document.querySelectorAll("iframe")), u = d.next(); !u.done; u = d.next()) {
                                    var h = u.value;
                                    e.purifyIframeWindow(h)
                                }
                            } catch (e) {
                                a = {
                                    error: e
                                }
                            } finally {
                                try {
                                    u && !u.done && (r = d.return) && r.call(d)
                                } finally {
                                    if (a) throw a.error
                                }
                            }
                            e.observer.observe(t.document.body, {
                                childList: !0,
                                subtree: !0
                            })
                        }
                        return e.purifyIframeWindow = function(t) {
                            try {
                                new e(t.contentWindow.document && t.contentWindow)
                            } catch (e) {}
                        }, e._generatePureWindow = function() {
                            var e = document.createElement("iframe");
                            return e.setAttribute("role", "presentation"), e.srcdoc = '<html lang="en"><head><title>apiSanitizer</title></head></body></html>', Object.assign(e.style, {
                                visibility: "hidden",
                                pointerEvents: "none",
                                position: "fixed"
                            }), document.body.append(e), e.contentDocument.defaultView
                        }, e.pureWindow = e._generatePureWindow(), e.Prefix = "pure_", e.ReplaceStrategies = {
                            extendPrototype: function(t, i) {
                                var s, a, r = i.ref,
                                    o = i.targetRef,
                                    l = t.names,
                                    c = t.constructorName;
                                try {
                                    for (var d = n(l), u = d.next(); !u.done; u = d.next()) {
                                        var h = u.value;
                                        Object.defineProperty(o[c].prototype, e.Prefix + h, Object.getOwnPropertyDescriptor(r[c].prototype, h))
                                    }
                                } catch (e) {
                                    s = {
                                        error: e
                                    }
                                } finally {
                                    try {
                                        u && !u.done && (a = d.return) && a.call(d)
                                    } finally {
                                        if (s) throw s.error
                                    }
                                }
                            },
                            extendPrototypeWithImplementation: function(t, i) {
                                var s, a, r = i.targetRef,
                                    o = t.names,
                                    l = t.constructorName,
                                    c = t.implementation;
                                try {
                                    for (var d = n(o), u = d.next(); !u.done; u = d.next()) {
                                        var h = u.value;
                                        r[l].prototype[e.Prefix + h] = function() {
                                            for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                                            c.apply(this, e)
                                        }
                                    }
                                } catch (e) {
                                    s = {
                                        error: e
                                    }
                                } finally {
                                    try {
                                        u && !u.done && (a = d.return) && a.call(d)
                                    } finally {
                                        if (s) throw s.error
                                    }
                                }
                            },
                            extendObject: function(t, i) {
                                var r, o, l = i.ref,
                                    c = i.targetRef,
                                    d = t.names,
                                    u = t.constructorName,
                                    h = t.postMethod,
                                    p = function(t) {
                                        c[u][e.Prefix + t] = function() {
                                            for (var e, i = [], n = 0; n < arguments.length; n++) i[n] = arguments[n];
                                            var r = (e = l[u])[t].apply(e, a([], s(i), !1));
                                            return h ? h(r) : r
                                        }
                                    };
                                try {
                                    for (var f = n(d), g = f.next(); !g.done; g = f.next()) p(g.value)
                                } catch (e) {
                                    r = {
                                        error: e
                                    }
                                } finally {
                                    try {
                                        g && !g.done && (o = f.return) && o.call(f)
                                    } finally {
                                        if (r) throw r.error
                                    }
                                }
                            },
                            extendProperty: function(t, i) {
                                var s, a, r = i.ref,
                                    o = i.targetRef,
                                    l = t.names,
                                    c = t.constructorName;
                                try {
                                    for (var d = n(l), u = d.next(); !u.done; u = d.next()) {
                                        var h = u.value;
                                        o[c][e.Prefix + h] = r[h]
                                    }
                                } catch (e) {
                                    s = {
                                        error: e
                                    }
                                } finally {
                                    try {
                                        u && !u.done && (a = d.return) && a.call(d)
                                    } finally {
                                        if (s) throw s.error
                                    }
                                }
                            }
                        }, e.Replacers = [{
                            names: ["Promise"],
                            constructorName: "window",
                            replaceStrategy: e.ReplaceStrategies.extendObject
                        }, {
                            names: ["addEventListener"],
                            constructorName: "EventTarget",
                            replaceStrategy: e.ReplaceStrategies.extendPrototypeWithImplementation,
                            implementation: r.EventDelegator.addEventListener
                        }, {
                            names: ["removeEventListener"],
                            constructorName: "EventTarget",
                            replaceStrategy: e.ReplaceStrategies.extendPrototypeWithImplementation,
                            implementation: r.EventDelegator.removeEventListener
                        }, {
                            names: ["addEventListener"],
                            constructorName: "Window",
                            replaceStrategy: e.ReplaceStrategies.extendPrototypeWithImplementation,
                            implementation: r.EventDelegator.addEventListener
                        }, {
                            names: ["removeEventListener"],
                            constructorName: "Window",
                            replaceStrategy: e.ReplaceStrategies.extendPrototypeWithImplementation,
                            implementation: r.EventDelegator.removeEventListener
                        }, {
                            names: ["addEventListener"],
                            constructorName: "Document",
                            replaceStrategy: e.ReplaceStrategies.extendPrototypeWithImplementation,
                            implementation: r.EventDelegator.addEventListener
                        }, {
                            names: ["removeEventListener"],
                            constructorName: "Document",
                            replaceStrategy: e.ReplaceStrategies.extendPrototypeWithImplementation,
                            implementation: r.EventDelegator.removeEventListener
                        }, {
                            names: ["addEventListener"],
                            constructorName: "DocumentFragment",
                            replaceStrategy: e.ReplaceStrategies.extendPrototypeWithImplementation,
                            implementation: r.EventDelegator.addEventListener
                        }, {
                            names: ["removeEventListener"],
                            constructorName: "DocumentFragment",
                            replaceStrategy: e.ReplaceStrategies.extendPrototypeWithImplementation,
                            implementation: r.EventDelegator.removeEventListener
                        }, {
                            names: ["addEventListener"],
                            constructorName: "Element",
                            replaceStrategy: e.ReplaceStrategies.extendPrototypeWithImplementation,
                            implementation: r.EventDelegator.addEventListener
                        }, {
                            names: ["removeEventListener"],
                            constructorName: "Element",
                            replaceStrategy: e.ReplaceStrategies.extendPrototypeWithImplementation,
                            implementation: r.EventDelegator.removeEventListener
                        }, {
                            names: ["parentElement"],
                            constructorName: "Node",
                            replaceStrategy: e.ReplaceStrategies.extendPrototype
                        }, {
                            names: ["reduce"],
                            constructorName: "Array",
                            replaceStrategy: e.ReplaceStrategies.extendPrototype
                        }, {
                            names: ["keys", "values"],
                            constructorName: "Object",
                            postMethod: function(e) {
                                return new(Array.bind.apply(Array, a([void 0], s(e), !1)))
                            },
                            replaceStrategy: e.ReplaceStrategies.extendObject
                        }, {
                            names: ["JSON"],
                            constructorName: "window",
                            replaceStrategy: e.ReplaceStrategies.extendProperty
                        }, {
                            names: ["CSS"],
                            constructorName: "window",
                            replaceStrategy: e.ReplaceStrategies.extendProperty
                        }, {
                            names: ["URL"],
                            constructorName: "window",
                            replaceStrategy: e.ReplaceStrategies.extendProperty
                        }, {
                            names: ["fetch"],
                            constructorName: "window",
                            replaceStrategy: e.ReplaceStrategies.extendProperty
                        }, {
                            names: ["querySelector", "querySelectorAll", "getElementsByTagName", "getElementsByClassName"],
                            constructorName: "Element",
                            replaceStrategy: e.ReplaceStrategies.extendPrototype
                        }, {
                            names: ["getElementById", "getElementsByName", "querySelector", "querySelectorAll", "getElementsByTagName", "getElementsByClassName"],
                            constructorName: "Document",
                            replaceStrategy: e.ReplaceStrategies.extendPrototype
                        }, {
                            names: ["querySelectorAll", "querySelector"],
                            constructorName: "DocumentFragment",
                            replaceStrategy: e.ReplaceStrategies.extendPrototype
                        }, {
                            names: ["Set"],
                            constructorName: "window",
                            replaceStrategy: e.ReplaceStrategies.extendProperty
                        }, {
                            names: ["Map"],
                            constructorName: "window",
                            replaceStrategy: e.ReplaceStrategies.extendProperty
                        }], e.observer = new MutationObserver((function(t) {
                            var i, s, a, r;
                            try {
                                for (var o = n(t), l = o.next(); !l.done; l = o.next()) {
                                    var c = l.value;
                                    try {
                                        for (var d = (a = void 0, n(c.addedNodes)), u = d.next(); !u.done; u = d.next()) {
                                            var h = u.value;
                                            h instanceof HTMLIFrameElement && e.purifyIframeWindow(h)
                                        }
                                    } catch (e) {
                                        a = {
                                            error: e
                                        }
                                    } finally {
                                        try {
                                            u && !u.done && (r = d.return) && r.call(d)
                                        } finally {
                                            if (a) throw a.error
                                        }
                                    }
                                }
                            } catch (e) {
                                i = {
                                    error: e
                                }
                            } finally {
                                try {
                                    l && !l.done && (s = o.return) && s.call(o)
                                } finally {
                                    if (i) throw i.error
                                }
                            }
                        })), e
                    }();
                t.EnvironmentPurifier = o, t.default = new o
            },
            185: function(e, t) {
                var i = this && this.__values || function(e) {
                        var t = "function" == typeof Symbol && Symbol.iterator,
                            i = t && e[t],
                            n = 0;
                        if (i) return i.call(e);
                        if (e && "number" == typeof e.length) return {
                            next: function() {
                                return e && n >= e.length && (e = void 0), {
                                    value: e && e[n++],
                                    done: !e
                                }
                            }
                        };
                        throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.")
                    },
                    n = this && this.__read || function(e, t) {
                        var i = "function" == typeof Symbol && e[Symbol.iterator];
                        if (!i) return e;
                        var n, s, a = i.call(e),
                            r = [];
                        try {
                            for (;
                                (void 0 === t || t-- > 0) && !(n = a.next()).done;) r.push(n.value)
                        } catch (e) {
                            s = {
                                error: e
                            }
                        } finally {
                            try {
                                n && !n.done && (i = a.return) && i.call(a)
                            } finally {
                                if (s) throw s.error
                            }
                        }
                        return r
                    },
                    s = this && this.__spreadArray || function(e, t, i) {
                        if (i || 2 === arguments.length)
                            for (var n, s = 0, a = t.length; s < a; s++) !n && s in t || (n || (n = Array.prototype.slice.call(t, 0, s)), n[s] = t[s]);
                        return e.concat(n || Array.prototype.slice.call(t))
                    };
                Object.defineProperty(t, "__esModule", {
                    value: !0
                }), t.EventDelegator = void 0;
                var a = function() {
                    function e() {}
                    return e.handleEvent = function(t) {
                        var a, r, o, l;
                        try {
                            for (var c = i(e.events), d = c.next(); !d.done; d = c.next()) {
                                var u = d.value;
                                if (u[t.type]) try {
                                    for (var h = (o = void 0, i(s([], n(u[t.type]), !1))), p = h.next(); !p.done; p = h.next()) {
                                        var f = p.value;
                                        t.composedPath().indexOf(f.target) > -1 && (Object.defineProperty(new Event(t.type, t), "target", {
                                            value: t.composedPath()[0]
                                        }), f.listener.apply(f.target, [t]))
                                    }
                                } catch (e) {
                                    o = {
                                        error: e
                                    }
                                } finally {
                                    try {
                                        p && !p.done && (l = h.return) && l.call(h)
                                    } finally {
                                        if (o) throw o.error
                                    }
                                }
                            }
                        } catch (e) {
                            a = {
                                error: e
                            }
                        } finally {
                            try {
                                d && !d.done && (r = c.return) && r.call(c)
                            } finally {
                                if (a) throw a.error
                            }
                        }
                    }, e.addEventListener = function(t, i, n) {
                        if (void 0 === n && (n = {}), e.nonBubblingEvents.includes(t)) this.addEventListener(t, i, n);
                        else {
                            -1 === e.activeListeners.indexOf(t) && (document.addEventListener(t, e.handleEvent, {
                                capture: !0
                            }), e.activeListeners.push(t));
                            var s = e.events[n.capture ? 0 : 1];
                            s[t] = s[t] || [], s[t].push({
                                listener: i,
                                options: n,
                                target: this
                            })
                        }
                    }, e.removeEventListener = function(t, i, n) {
                        if (void 0 === n && (n = {}), e.nonBubblingEvents.includes(t)) this.removeEventListener(t, i, n);
                        else {
                            var s = e.events[n.capture ? 0 : 1];
                            s[t] && (s[t] && (s[t] = s[t].filter((function(e) {
                                return e.listener !== i
                            }))), 0 === s[t].length && (e.activeListeners = e.activeListeners.filter((function(e) {
                                return e !== t
                            })), document.removeEventListener(t, e.handleEvent, {
                                capture: !0
                            })))
                        }
                    }, e.events = [{}, {}], e.activeListeners = [], e.nonBubblingEvents = ["focus", "blur", "focusin", "focusout", "change"], e
                }();
                t.EventDelegator = a
            }
        },
        t = {};
    ! function i(n) {
        var s = t[n];
        if (void 0 !== s) return s.exports;
        var a = t[n] = {
            exports: {}
        };
        return e[n].call(a.exports, a, a.exports, i), a.exports
    }(301)
})(), (() => {
    var e, t, i, n, s = {
            521: (e, t, i) => {
                i.chunkedI18n__.publicPath = i.p, i.chunkedI18n__.setInitialDictionary({
                    "accesswidget-ui": {
                        openWidget: "Open accessiBe: accessibility options, statement and help",
                        SR_TRIGGER_BUTTON: "Use Website In a Screen-Reader Mode",
                        SKIP_LINKS: "Skip Links",
                        SKIP_NAVIGATION: "Click to skip navigation",
                        SKIPLINK_CONTENT: "Skip to Content",
                        SKIPLINK_MENU: "Skip to Menu",
                        SKIPLINK_FOOTER: "Skip to Footer",
                        PROCESSING_DATA_PLEASE_WAIT: "Processing the data, please give it a few seconds..."
                    },
                    "preloader.screenReaderGreetForWindows": "Press Alt+1 for screen-reader mode, Alt+0 to cancel",
                    "preloader.screenReaderGreetForMac": "Press Option+1 for screen-reader mode, Option+0 to cancel",
                    "preloader.screenReaderGreetForTouchDevice": "For screen-reader mode - click the first button of the website",
                    "preloader.screenReaderFeedback": "Accessibility Screen-Reader Guide, Feedback, and Issue Reporting",
                    PRINT: "Print",
                    REQUIRED_FIELD: "Required field",
                    BREADCRUMBS: "Breadcrumbs",
                    ACCESS_MODE_IS_ON: "Screen-reader mode is on, alt+8 to cancel",
                    DELETED_NUMBER: "Was",
                    ACCOUNT: "Account",
                    SCROLL: "Scroll Page",
                    SEARCH: "Search",
                    ORDER: "Order",
                    SUBMIT: "Submit",
                    TIME_TO_ALERT_CLOSE: "Seconds until closing",
                    MAIN_MENU: "Main Menu",
                    FOOTER_MENU: "Footer Menu",
                    HEADER_MENU: "Header Menu",
                    GENERIC_MENU: "Page Menu",
                    PLAYING_IN_SCREEN_READER: "Playing to screen readers",
                    ENLARGE: "Enlarge",
                    LOADING: "Loading",
                    CAROUSEL: "Carousel",
                    CAROUSEL_NAVIGATION: "Next carousel slide",
                    HOMEPAGE: "Home",
                    FOOTER: "Footer",
                    AND: "And",
                    NO_RATING: "No rating yet",
                    RATING: "Rating",
                    SUBMENU: "Submenu",
                    CLOSE: "Close",
                    REMOVE: "Remove",
                    MENU: "Menu",
                    PLUS: "Plus",
                    MINUS: "Minus",
                    FAVORITES: "Favorites",
                    MENUBAR_NAVIGATION_EXPLANATION: "Use ←/→ to navigate",
                    SEARCH_RESULTS: "Results. Navigate with the keyboard.",
                    ACTIVE_POPUP: "Popup panel. Press ESCAPE to close, navigate with TAB.",
                    NEW_WINDOW: "New Window",
                    CONTACT: "Contact",
                    FRONT_IMAGE_LINK: "Opens an image",
                    FRONT_TELEPHONE_LINK: "Click to Call",
                    FRONT_EMAIL_LINK: "Click to send an email",
                    SELECT_OPTION: "Select an option",
                    CART: "Cart",
                    FRONT_PDF_LINK: "This link will open a PDF document",
                    PROCESSING_DATA_PLEASE_WAIT: "Processing the data, please give it a few seconds...",
                    FRONT_VALIDATIONS_SUCCESS: "Successful submission!",
                    MORE_IN_WIKIPEDIA: "Learn more in Wikipedia",
                    VIDEO: "Play",
                    SR_TRIGGER_BUTTON: "Use Website In a Screen-Reader Mode",
                    NEXT: "Next",
                    PAUSE: "Pause",
                    PREVIOUS: "Previous",
                    BUTTON: "Button",
                    LINK: "Link",
                    DOWNLOAD: "Download",
                    SHARE: "Share",
                    MOVE: "Move",
                    TOGGLE: "Toggle",
                    CHECKMARK: "Checkmark",
                    DATE: "Date",
                    ADDRESS: "Address",
                    COLOR: "Color",
                    COUNTRY: "Country",
                    POPUP: "Popup",
                    CALENDAR: "Calendar",
                    FIELD_LABEL_CAPTCHA: "Captcha",
                    FIELD_LABEL_EMAIL: "Email",
                    FIELD_LABEL_PHONE: "Phone",
                    FIELD_LABEL_FILE: "Select file",
                    FIELD_LABEL_PASSWORD: "Password",
                    FIELD_LABEL_SEARCH: "Search...",
                    FIELD_LABEL_MESSAGE: "Message",
                    FIELD_LABEL_SUBJECT: "Subject",
                    FIELD_LABEL_COMPANY: "Company",
                    FIELD_LABEL_ADDRESS: "Address",
                    FIELD_LABEL_CITY: "City",
                    FIELD_LABEL_STATE: "State/Province",
                    FIELD_LABEL_COUNTRY: "Country",
                    FIELD_LABEL_ZIP: "ZIP/Postal",
                    FIELD_LABEL_LINK: "Link",
                    FIELD_LABEL_QUANTITY: "Quantity",
                    quantity: "Quantity",
                    FIELD_LABEL_FULLNAME: "Full name",
                    FIELD_LABEL_FIRSTNAME: "First name",
                    FIELD_LABEL_LASTNAME: "Last name",
                    FIELD_LABEL_NAME: "Name",
                    FIELD_LABEL_COUPON: "Coupon",
                    FIELD_LABEL_RANGE: "Range"
                }), e.exports = {
                    getDictionary: async e => i.chunkedI18n__.getDictionary(e),
                    setOnChange: e => i.chunkedI18n__.onChange = e
                }
            },
            172: (e, t, i) => {
                "use strict";
                i.d(t, {
                    FK: () => w,
                    XX: () => W,
                    fF: () => s,
                    h: () => y,
                    q6: () => G
                });
                var n, s, a, r, o, l, c, d, u, h, p, f = {},
                    g = [],
                    b = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i,
                    m = Array.isArray;

                function A(e, t) {
                    for (var i in t) e[i] = t[i];
                    return e
                }

                function v(e) {
                    var t = e.parentNode;
                    t && t.removeChild(e)
                }

                function y(e, t, i) {
                    var s, a, r, o = {};
                    for (r in t) "key" == r ? s = t[r] : "ref" == r ? a = t[r] : o[r] = t[r];
                    if (arguments.length > 2 && (o.children = arguments.length > 3 ? n.call(arguments, 2) : i), "function" == typeof e && null != e.defaultProps)
                        for (r in e.defaultProps) void 0 === o[r] && (o[r] = e.defaultProps[r]);
                    return E(e, o, s, a, null)
                }

                function E(e, t, i, n, r) {
                    var o = {
                        type: e,
                        props: t,
                        key: i,
                        ref: n,
                        __k: null,
                        __: null,
                        __b: 0,
                        __e: null,
                        __d: void 0,
                        __c: null,
                        constructor: void 0,
                        __v: null == r ? ++a : r,
                        __i: -1,
                        __u: 0
                    };
                    return null == r && null != s.vnode && s.vnode(o), o
                }

                function w(e) {
                    return e.children
                }

                function F(e, t) {
                    this.props = e, this.context = t
                }

                function _(e, t) {
                    if (null == t) return e.__ ? _(e.__, e.__i + 1) : null;
                    for (var i; t < e.__k.length; t++)
                        if (null != (i = e.__k[t]) && null != i.__e) return i.__e;
                    return "function" == typeof e.type ? _(e) : null
                }

                function k(e) {
                    var t, i;
                    if (null != (e = e.__) && null != e.__c) {
                        for (e.__e = e.__c.base = null, t = 0; t < e.__k.length; t++)
                            if (null != (i = e.__k[t]) && null != i.__e) {
                                e.__e = e.__c.base = i.__e;
                                break
                            }
                        return k(e)
                    }
                }

                function C(e) {
                    (!e.__d && (e.__d = !0) && r.push(e) && !S.__r++ || o !== s.debounceRendering) && ((o = s.debounceRendering) || l)(S)
                }

                function S() {
                    var e, t, i, n, a, o, l, d;
                    for (r.sort(c); e = r.shift();) e.__d && (t = r.length, n = void 0, o = (a = (i = e).__v).__e, l = [], d = [], i.__P && ((n = A({}, a)).__v = a.__v + 1, s.vnode && s.vnode(n), O(i.__P, n, a, i.__n, i.__P.namespaceURI, 32 & a.__u ? [o] : null, l, null == o ? _(a) : o, !!(32 & a.__u), d), n.__v = a.__v, n.__.__k[n.__i] = n, M(l, n, d), n.__e != o && k(n)), r.length > t && r.sort(c));
                    S.__r = 0
                }

                function B(e, t, i, n, s, a, r, o, l, c, d) {
                    var u, h, p, b, m, A = n && n.__k || g,
                        v = t.length;
                    for (i.__d = l, x(i, t, A), l = i.__d, u = 0; u < v; u++) null != (p = i.__k[u]) && "boolean" != typeof p && "function" != typeof p && (h = -1 === p.__i ? f : A[p.__i] || f, p.__i = u, O(e, p, h, s, a, r, o, l, c, d), b = p.__e, p.ref && h.ref != p.ref && (h.ref && R(h.ref, null, p), d.push(p.ref, p.__c || b, p)), null == m && null != b && (m = b), 65536 & p.__u || h.__k === p.__k ? (l && !l.isConnected && (l = _(h)), l = D(p, l, e)) : "function" == typeof p.type && void 0 !== p.__d ? l = p.__d : b && (l = b.nextSibling), p.__d = void 0, p.__u &= -196609);
                    i.__d = l, i.__e = m
                }

                function x(e, t, i) {
                    var n, s, a, r, o, l = t.length,
                        c = i.length,
                        d = c,
                        u = 0;
                    for (e.__k = [], n = 0; n < l; n++) r = n + u, null != (s = e.__k[n] = null == (s = t[n]) || "boolean" == typeof s || "function" == typeof s ? null : "string" == typeof s || "number" == typeof s || "bigint" == typeof s || s.constructor == String ? E(null, s, null, null, null) : m(s) ? E(w, {
                        children: s
                    }, null, null, null) : void 0 === s.constructor && s.__b > 0 ? E(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : s) ? (s.__ = e, s.__b = e.__b + 1, o = T(s, i, r, d), s.__i = o, a = null, -1 !== o && (d--, (a = i[o]) && (a.__u |= 131072)), null == a || null === a.__v ? (-1 == o && u--, "function" != typeof s.type && (s.__u |= 65536)) : o !== r && (o === r + 1 ? u++ : o > r ? d > l - r ? u += o - r : u-- : o < r ? o == r - 1 && (u = o - r) : u = 0, o !== n + u && (s.__u |= 65536))) : (a = i[r]) && null == a.key && a.__e && !(131072 & a.__u) && (a.__e == e.__d && (e.__d = _(a)), $(a, a, !1), i[r] = null, d--);
                    if (d)
                        for (n = 0; n < c; n++) null != (a = i[n]) && !(131072 & a.__u) && (a.__e == e.__d && (e.__d = _(a)), $(a, a))
                }

                function D(e, t, i) {
                    var n, s;
                    if ("function" == typeof e.type) {
                        for (n = e.__k, s = 0; n && s < n.length; s++) n[s] && (n[s].__ = e, t = D(n[s], t, i));
                        return t
                    }
                    e.__e != t && (i.insertBefore(e.__e, t || null), t = e.__e);
                    do {
                        t = t && t.nextSibling
                    } while (null != t && 8 === t.nodeType);
                    return t
                }

                function T(e, t, i, n) {
                    var s = e.key,
                        a = e.type,
                        r = i - 1,
                        o = i + 1,
                        l = t[i];
                    if (null === l || l && s == l.key && a === l.type && !(131072 & l.__u)) return i;
                    if (n > (null == l || 131072 & l.__u ? 0 : 1))
                        for (; r >= 0 || o < t.length;) {
                            if (r >= 0) {
                                if ((l = t[r]) && !(131072 & l.__u) && s == l.key && a === l.type) return r;
                                r--
                            }
                            if (o < t.length) {
                                if ((l = t[o]) && !(131072 & l.__u) && s == l.key && a === l.type) return o;
                                o++
                            }
                        }
                    return -1
                }

                function L(e, t, i) {
                    "-" === t[0] ? e.setProperty(t, null == i ? "" : i) : e[t] = null == i ? "" : "number" != typeof i || b.test(t) ? i : i + "px"
                }

                function N(e, t, i, n, s) {
                    var a;
                    e: if ("style" === t)
                        if ("string" == typeof i) e.style.cssText = i;
                        else {
                            if ("string" == typeof n && (e.style.cssText = n = ""), n)
                                for (t in n) i && t in i || L(e.style, t, "");
                            if (i)
                                for (t in i) n && i[t] === n[t] || L(e.style, t, i[t])
                        }
                    else if ("o" === t[0] && "n" === t[1]) a = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1")), t = t.toLowerCase() in e || "onFocusOut" === t || "onFocusIn" === t ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), e.l[t + a] = i, i ? n ? i.u = n.u : (i.u = d, e.addEventListener(t, a ? h : u, a)) : e.removeEventListener(t, a ? h : u, a);
                    else {
                        if ("http://www.w3.org/2000/svg" == s) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
                        else if ("width" != t && "height" != t && "href" != t && "list" != t && "form" != t && "tabIndex" != t && "download" != t && "rowSpan" != t && "colSpan" != t && "role" != t && t in e) try {
                            e[t] = null == i ? "" : i;
                            break e
                        } catch (e) {}
                        "function" == typeof i || (null == i || !1 === i && "-" !== t[4] ? e.removeAttribute(t) : e.setAttribute(t, i))
                    }
                }

                function P(e) {
                    return function(t) {
                        if (this.l) {
                            var i = this.l[t.type + e];
                            if (null == t.t) t.t = d++;
                            else if (t.t < i.u) return;
                            return i(s.event ? s.event(t) : t)
                        }
                    }
                }

                function O(e, t, i, n, a, r, o, l, c, d) {
                    var u, h, p, f, g, b, v, y, E, _, k, C, S, x, D, T = t.type;
                    if (void 0 !== t.constructor) return null;
                    128 & i.__u && (c = !!(32 & i.__u), r = [l = t.__e = i.__e]), (u = s.__b) && u(t);
                    e: if ("function" == typeof T) try {
                        if (y = t.props, E = (u = T.contextType) && n[u.__c], _ = u ? E ? E.props.value : u.__ : n, i.__c ? v = (h = t.__c = i.__c).__ = h.__E : ("prototype" in T && T.prototype.render ? t.__c = h = new T(y, _) : (t.__c = h = new F(y, _), h.constructor = T, h.render = H), E && E.sub(h), h.props = y, h.state || (h.state = {}), h.context = _, h.__n = n, p = h.__d = !0, h.__h = [], h._sb = []), null == h.__s && (h.__s = h.state), null != T.getDerivedStateFromProps && (h.__s == h.state && (h.__s = A({}, h.__s)), A(h.__s, T.getDerivedStateFromProps(y, h.__s))), f = h.props, g = h.state, h.__v = t, p) null == T.getDerivedStateFromProps && null != h.componentWillMount && h.componentWillMount(), null != h.componentDidMount && h.__h.push(h.componentDidMount);
                        else {
                            if (null == T.getDerivedStateFromProps && y !== f && null != h.componentWillReceiveProps && h.componentWillReceiveProps(y, _), !h.__e && (null != h.shouldComponentUpdate && !1 === h.shouldComponentUpdate(y, h.__s, _) || t.__v === i.__v)) {
                                for (t.__v !== i.__v && (h.props = y, h.state = h.__s, h.__d = !1), t.__e = i.__e, t.__k = i.__k, t.__k.forEach((function(e) {
                                        e && (e.__ = t)
                                    })), k = 0; k < h._sb.length; k++) h.__h.push(h._sb[k]);
                                h._sb = [], h.__h.length && o.push(h);
                                break e
                            }
                            null != h.componentWillUpdate && h.componentWillUpdate(y, h.__s, _), null != h.componentDidUpdate && h.__h.push((function() {
                                h.componentDidUpdate(f, g, b)
                            }))
                        }
                        if (h.context = _, h.props = y, h.__P = e, h.__e = !1, C = s.__r, S = 0, "prototype" in T && T.prototype.render) {
                            for (h.state = h.__s, h.__d = !1, C && C(t), u = h.render(h.props, h.state, h.context), x = 0; x < h._sb.length; x++) h.__h.push(h._sb[x]);
                            h._sb = []
                        } else
                            do {
                                h.__d = !1, C && C(t), u = h.render(h.props, h.state, h.context), h.state = h.__s
                            } while (h.__d && ++S < 25);
                        h.state = h.__s, null != h.getChildContext && (n = A(A({}, n), h.getChildContext())), p || null == h.getSnapshotBeforeUpdate || (b = h.getSnapshotBeforeUpdate(f, g)), B(e, m(D = null != u && u.type === w && null == u.key ? u.props.children : u) ? D : [D], t, i, n, a, r, o, l, c, d), h.base = t.__e, t.__u &= -161, h.__h.length && o.push(h), v && (h.__E = h.__ = null)
                    } catch (e) {
                        t.__v = null, c || null != r ? (t.__e = l, t.__u |= c ? 160 : 32, r[r.indexOf(l)] = null) : (t.__e = i.__e, t.__k = i.__k), s.__e(e, t, i)
                    } else null == r && t.__v === i.__v ? (t.__k = i.__k, t.__e = i.__e) : t.__e = I(i.__e, t, i, n, a, r, o, c, d);
                    (u = s.diffed) && u(t)
                }

                function M(e, t, i) {
                    t.__d = void 0;
                    for (var n = 0; n < i.length; n++) R(i[n], i[++n], i[++n]);
                    s.__c && s.__c(t, e), e.some((function(t) {
                        try {
                            e = t.__h, t.__h = [], e.some((function(e) {
                                e.call(t)
                            }))
                        } catch (e) {
                            s.__e(e, t.__v)
                        }
                    }))
                }

                function I(e, t, i, s, a, r, o, l, c) {
                    var d, u, h, p, g, b, A, y = i.props,
                        E = t.props,
                        w = t.type;
                    if ("svg" === w ? a = "http://www.w3.org/2000/svg" : "math" === w ? a = "http://www.w3.org/1998/Math/MathML" : a || (a = "http://www.w3.org/1999/xhtml"), null != r)
                        for (d = 0; d < r.length; d++)
                            if ((g = r[d]) && "setAttribute" in g == !!w && (w ? g.localName === w : 3 === g.nodeType)) {
                                e = g, r[d] = null;
                                break
                            }
                    if (null == e) {
                        if (null === w) return document.createTextNode(E);
                        e = document.createElementNS(a, w, E.is && E), r = null, l = !1
                    }
                    if (null === w) y === E || l && e.data === E || (e.data = E);
                    else {
                        if (r = r && n.call(e.childNodes), y = i.props || f, !l && null != r)
                            for (y = {}, d = 0; d < e.attributes.length; d++) y[(g = e.attributes[d]).name] = g.value;
                        for (d in y)
                            if (g = y[d], "children" == d);
                            else if ("dangerouslySetInnerHTML" == d) h = g;
                        else if ("key" !== d && !(d in E)) {
                            if ("value" == d && "defaultValue" in E || "checked" == d && "defaultChecked" in E) continue;
                            N(e, d, null, g, a)
                        }
                        for (d in E) g = E[d], "children" == d ? p = g : "dangerouslySetInnerHTML" == d ? u = g : "value" == d ? b = g : "checked" == d ? A = g : "key" === d || l && "function" != typeof g || y[d] === g || N(e, d, g, y[d], a);
                        if (u) l || h && (u.__html === h.__html || u.__html === e.innerHTML) || (e.innerHTML = u.__html), t.__k = [];
                        else if (h && (e.innerHTML = ""), B(e, m(p) ? p : [p], t, i, s, "foreignObject" === w ? "http://www.w3.org/1999/xhtml" : a, r, o, r ? r[0] : i.__k && _(i, 0), l, c), null != r)
                            for (d = r.length; d--;) null != r[d] && v(r[d]);
                        l || (d = "value", void 0 !== b && (b !== e[d] || "progress" === w && !b || "option" === w && b !== y[d]) && N(e, d, b, y[d], a), d = "checked", void 0 !== A && A !== e[d] && N(e, d, A, y[d], a))
                    }
                    return e
                }

                function R(e, t, i) {
                    try {
                        "function" == typeof e ? e(t) : e.current = t
                    } catch (e) {
                        s.__e(e, i)
                    }
                }

                function $(e, t, i) {
                    var n, a;
                    if (s.unmount && s.unmount(e), (n = e.ref) && (n.current && n.current !== e.__e || R(n, null, t)), null != (n = e.__c)) {
                        if (n.componentWillUnmount) try {
                            n.componentWillUnmount()
                        } catch (e) {
                            s.__e(e, t)
                        }
                        n.base = n.__P = null
                    }
                    if (n = e.__k)
                        for (a = 0; a < n.length; a++) n[a] && $(n[a], t, i || "function" != typeof e.type);
                    i || null == e.__e || v(e.__e), e.__c = e.__ = e.__e = e.__d = void 0
                }

                function H(e, t, i) {
                    return this.constructor(e, i)
                }

                function W(e, t, i) {
                    var a, r, o, l;
                    s.__ && s.__(e, t), r = (a = "function" == typeof i) ? null : i && i.__k || t.__k, o = [], l = [], O(t, e = (!a && i || t).__k = y(w, null, [e]), r || f, f, t.namespaceURI, !a && i ? [i] : r ? null : t.firstChild ? n.call(t.childNodes) : null, o, !a && i ? i : r ? r.__e : t.firstChild, a, l), M(o, e, l)
                }

                function G(e, t) {
                    var i = {
                        __c: t = "__cC" + p++,
                        __: e,
                        Consumer: function(e, t) {
                            return e.children(t)
                        },
                        Provider: function(e) {
                            var i, n;
                            return this.getChildContext || (i = [], (n = {})[t] = this, this.getChildContext = function() {
                                return n
                            }, this.shouldComponentUpdate = function(e) {
                                this.props.value !== e.value && i.some((function(e) {
                                    e.__e = !0, C(e)
                                }))
                            }, this.sub = function(e) {
                                i.push(e);
                                var t = e.componentWillUnmount;
                                e.componentWillUnmount = function() {
                                    i.splice(i.indexOf(e), 1), t && t.call(e)
                                }
                            }), e.children
                        }
                    };
                    return i.Provider.__ = i.Consumer.contextType = i
                }
                n = g.slice, s = {
                    __e: function(e, t, i, n) {
                        for (var s, a, r; t = t.__;)
                            if ((s = t.__c) && !s.__) try {
                                if ((a = s.constructor) && null != a.getDerivedStateFromError && (s.setState(a.getDerivedStateFromError(e)), r = s.__d), null != s.componentDidCatch && (s.componentDidCatch(e, n || {}), r = s.__d), r) return s.__E = s
                            } catch (t) {
                                e = t
                            }
                        throw e
                    }
                }, a = 0, F.prototype.setState = function(e, t) {
                    var i;
                    i = null != this.__s && this.__s !== this.state ? this.__s : this.__s = A({}, this.state), "function" == typeof e && (e = e(A({}, i), this.props)), e && A(i, e), null != e && this.__v && (t && this._sb.push(t), C(this))
                }, F.prototype.forceUpdate = function(e) {
                    this.__v && (this.__e = !0, e && this.__h.push(e), C(this))
                }, F.prototype.render = w, r = [], l = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, c = function(e, t) {
                    return e.__v.__b - t.__v.__b
                }, S.__r = 0, d = 0, u = P(!1), h = P(!0), p = 0
            },
            994: (e, t, i) => {
                "use strict";
                i.d(t, {
                    J0: () => v,
                    Kr: () => w,
                    NT: () => _,
                    hb: () => F,
                    li: () => E,
                    vJ: () => y
                });
                var n, s, a, r, o = i(172),
                    l = 0,
                    c = [],
                    d = [],
                    u = o.fF,
                    h = u.__b,
                    p = u.__r,
                    f = u.diffed,
                    g = u.__c,
                    b = u.unmount,
                    m = u.__;

                function A(e, t) {
                    u.__h && u.__h(s, e, l || t), l = 0;
                    var i = s.__H || (s.__H = {
                        __: [],
                        __h: []
                    });
                    return e >= i.__.length && i.__.push({
                        __V: d
                    }), i.__[e]
                }

                function v(e) {
                    return l = 1,
                        function(e, t, i) {
                            var a = A(n++, 2);
                            if (a.t = e, !a.__c && (a.__ = [T(void 0, t), function(e) {
                                    var t = a.__N ? a.__N[0] : a.__[0],
                                        i = a.t(t, e);
                                    t !== i && (a.__N = [i, a.__[1]], a.__c.setState({}))
                                }], a.__c = s, !s.u)) {
                                var r = function(e, t, i) {
                                    if (!a.__c.__H) return !0;
                                    var n = a.__c.__H.__.filter((function(e) {
                                        return !!e.__c
                                    }));
                                    if (n.every((function(e) {
                                            return !e.__N
                                        }))) return !o || o.call(this, e, t, i);
                                    var s = !1;
                                    return n.forEach((function(e) {
                                        if (e.__N) {
                                            var t = e.__[0];
                                            e.__ = e.__N, e.__N = void 0, t !== e.__[0] && (s = !0)
                                        }
                                    })), !(!s && a.__c.props === e) && (!o || o.call(this, e, t, i))
                                };
                                s.u = !0;
                                var o = s.shouldComponentUpdate,
                                    l = s.componentWillUpdate;
                                s.componentWillUpdate = function(e, t, i) {
                                    if (this.__e) {
                                        var n = o;
                                        o = void 0, r(e, t, i), o = n
                                    }
                                    l && l.call(this, e, t, i)
                                }, s.shouldComponentUpdate = r
                            }
                            return a.__N || a.__
                        }(T, e)
                }

                function y(e, t) {
                    var i = A(n++, 3);
                    !u.__s && D(i.__H, t) && (i.__ = e, i.i = t, s.__H.__h.push(i))
                }

                function E(e) {
                    return l = 5, w((function() {
                        return {
                            current: e
                        }
                    }), [])
                }

                function w(e, t) {
                    var i = A(n++, 7);
                    return D(i.__H, t) ? (i.__V = e(), i.i = t, i.__h = e, i.__V) : i.__
                }

                function F(e, t) {
                    return l = 8, w((function() {
                        return e
                    }), t)
                }

                function _(e) {
                    var t = s.context[e.__c],
                        i = A(n++, 9);
                    return i.c = e, t ? (null == i.__ && (i.__ = !0, t.sub(s)), t.props.value) : e.__
                }

                function k() {
                    for (var e; e = c.shift();)
                        if (e.__P && e.__H) try {
                            e.__H.__h.forEach(B), e.__H.__h.forEach(x), e.__H.__h = []
                        } catch (t) {
                            e.__H.__h = [], u.__e(t, e.__v)
                        }
                }
                u.__b = function(e) {
                    s = null, h && h(e)
                }, u.__ = function(e, t) {
                    e && t.__k && t.__k.__m && (e.__m = t.__k.__m), m && m(e, t)
                }, u.__r = function(e) {
                    p && p(e), n = 0;
                    var t = (s = e.__c).__H;
                    t && (a === s ? (t.__h = [], s.__h = [], t.__.forEach((function(e) {
                        e.__N && (e.__ = e.__N), e.__V = d, e.__N = e.i = void 0
                    }))) : (t.__h.forEach(B), t.__h.forEach(x), t.__h = [], n = 0)), a = s
                }, u.diffed = function(e) {
                    f && f(e);
                    var t = e.__c;
                    t && t.__H && (t.__H.__h.length && (1 !== c.push(t) && r === u.requestAnimationFrame || ((r = u.requestAnimationFrame) || S)(k)), t.__H.__.forEach((function(e) {
                        e.i && (e.__H = e.i), e.__V !== d && (e.__ = e.__V), e.i = void 0, e.__V = d
                    }))), a = s = null
                }, u.__c = function(e, t) {
                    t.some((function(e) {
                        try {
                            e.__h.forEach(B), e.__h = e.__h.filter((function(e) {
                                return !e.__ || x(e)
                            }))
                        } catch (i) {
                            t.some((function(e) {
                                e.__h && (e.__h = [])
                            })), t = [], u.__e(i, e.__v)
                        }
                    })), g && g(e, t)
                }, u.unmount = function(e) {
                    b && b(e);
                    var t, i = e.__c;
                    i && i.__H && (i.__H.__.forEach((function(e) {
                        try {
                            B(e)
                        } catch (e) {
                            t = e
                        }
                    })), i.__H = void 0, t && u.__e(t, i.__v))
                };
                var C = "function" == typeof requestAnimationFrame;

                function S(e) {
                    var t, i = function() {
                            clearTimeout(n), C && cancelAnimationFrame(t), setTimeout(e)
                        },
                        n = setTimeout(i, 100);
                    C && (t = requestAnimationFrame(i))
                }

                function B(e) {
                    var t = s,
                        i = e.__c;
                    "function" == typeof i && (e.__c = void 0, i()), s = t
                }

                function x(e) {
                    var t = s;
                    e.__c = e.__(), s = t
                }

                function D(e, t) {
                    return !e || e.length !== t.length || t.some((function(t, i) {
                        return t !== e[i]
                    }))
                }

                function T(e, t) {
                    return "function" == typeof t ? t(e) : t
                }
            },
            492: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => s
                });
                var n = i(172);

                function s(e) {
                    if ("img" === e.variant) {
                        const t = `data:image/svg+xml;base64,${btoa(e.children)}`;
                        return (0, n.h)("img", {
                            "data-testid": "base-icon-img",
                            ...e,
                            src: t,
                            alt: e.alt
                        })
                    }
                    const t = (new DOMParser).parseFromString(e.children, "image/svg+xml"),
                        i = Array.from(t.documentElement.attributes).pure_reduce(((e, t) => (e[t.name] = t.value, e)), {});
                    return (0, n.h)("svg", {
                        fill: "currentColor",
                        style: {
                            display: "inline-flex"
                        },
                        ...i,
                        part: e.part,
                        className: e.class,
                        alt: e.alt,
                        "data-testid": "base-icon-svg",
                        dangerouslySetInnerHTML: {
                            __html: t.documentElement.innerHTML
                        }
                    })
                }
            },
            975: (e, t, i) => {
                "use strict";
                i.d(t, {
                    E: () => r
                });
                var n = i(172);
                const s = "@keyframes pulse{0%,to{opacity:1}50%{opacity:.5}}.skeleton{position:relative;overflow:hidden;background-color:rgba(0,0,0,.15);animation:pulse 1.5s infinite}@media (prefers-reduced-motion){.skeleton{animation:none}}.skeleton--button{border-radius:50px}.skeleton--text{border-radius:4px}";
                var a = i(557);

                function r({
                    height: e,
                    width: t,
                    variant: i,
                    className: r
                }) {
                    return (0, a.ob)(s), (0, n.h)(n.FK, null, (0, n.h)("div", {
                        style: {
                            height: e,
                            width: t
                        },
                        class: `skeleton skeleton--${i} ${r}`
                    }))
                }
                r.defaultProps = {
                    height: "",
                    width: "",
                    variant: "text",
                    className: ""
                }
            },
            486: (e, t, i) => {
                "use strict";
                var n, s;
                i.d(t, {
                        A: () => s,
                        j: () => n
                    }),
                    function(e) {
                        e.Close = "Close", e.StatementOpened = "StatementOpened", e.Hide = "Hide", e.Reset = "Reset", e.Language = "Language", e.State = "State", e.NavigateToUsefulLink = "NavigateToUsefulLink", e.UsefulLinksFocused = "UsefulLinksFocused"
                    }(n || (n = {})),
                    function(e) {
                        e.LEFT = "left", e.RIGHT = "right"
                    }(s || (s = {}))
            },
            557: (e, t, i) => {
                "use strict";
                i.d(t, {
                    td: () => u,
                    ob: () => h
                });
                var n = i(172),
                    s = i(994);
                const a = "adoptedStyleSheets" in Document.prototype && "replaceSync" in CSSStyleSheet.prototype,
                    r = (e, t) => {
                        t instanceof CSSStyleSheet ? t.replaceSync(e) : t.textContent = e
                    },
                    o = (e, t) => {
                        const i = new CSSStyleSheet;
                        return i.replaceSync(t), e.adoptedStyleSheets = [...e.adoptedStyleSheets, i], i
                    },
                    l = (e, t) => {
                        const i = document.createElement("style");
                        return i.textContent = t, e.appendChild(i), i
                    },
                    c = new window.pure_Map,
                    d = (0, n.q6)({
                        shadowRoot: null
                    }),
                    u = ({
                        shadowRoot: e,
                        children: t
                    }) => (c.has(e) || c.set(e, new window.pure_Map), (0, n.h)(d.Provider, {
                        value: {
                            shadowRoot: e
                        }
                    }, t));

                function h(e, t = {}) {
                    const {
                        shadowRoot: i
                    } = (0, s.NT)(d);
                    if (!i) throw new Error("ShadowRoot is not initialized. Please call `setShadowRoot` before using this hook.");
                    (0, s.Kr)((() => {
                        const n = `:host {${Object.entries(t).map((([e,t])=>`--${e}:${t};`)).join("")}}${e}`;
                        let s;
                        c.get(i).has(e) ? r(n, c.get(i).get(e)) : (s = a ? o(i, n) : l(i, n), c.get(i).set(e, s))
                    }), [e, t, i])
                }
            },
            129: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => s,
                    B: () => a
                });
                var n = i(399);
                class s {
                    static contextDictionary = {};
                    static rtlLanguages = [n.Ek.AR, n.Ek.HE, n.Ek.UA];
                    static languageCode = n.Ek.EN;
                    static setDictionary(e, t = n.Ek.EN) {
                        s.contextDictionary = e, s.languageCode = t
                    }
                    static t(e, t) {
                        return s.contextDictionary[e] || t[e]
                    }
                    static getDirection(e) {
                        return this.rtlLanguages.includes(e) ? n.J9.RTL : n.J9.LTR
                    }
                }

                function a(e) {
                    return e && !Object.pure_keys(s.contextDictionary).length && s.setDictionary(e), {
                        t: e => s.t(e, s.contextDictionary),
                        language: s.languageCode,
                        direction: s.getDirection(s.languageCode)
                    }
                }
            },
            715: (e, t, i) => {
                "use strict";
                i.d(t, {
                    Ay: () => d
                });
                var n = i(172);
                const s = "*{box-sizing:border-box}:host{all:initial!important}:host :focus,:host :focus-visible{outline-offset:calc(var(--acsb-keynav, 0)*2);outline:#639af9 inset var(--acsb-keynav, 0)}[role=button]{cursor:pointer}input,select,textarea{outline:0;margin:0;font-family:inherit;font-size:inherit;line-height:inherit}";
                var a = i(557);

                function r(e) {
                    return (0, n.h)(a.td, {
                        shadowRoot: e.shadowRoot
                    }, (0, n.h)(o, { ...e
                    }))
                }

                function o(e) {
                    const t = e.template;
                    return (0, a.ob)(s), (0, n.h)(n.FK, null, (0, n.h)(t, { ...e.data
                    }))
                }
                var l = i(129),
                    c = i(399);
                class d {
                    static RefTagName = "access-widget-ui";
                    static instances = new window.pure_Set;
                    static async run({
                        template: e,
                        data: t
                    }, i, s = {}) {
                        const a = document.createElement(this.RefTagName);
                        let o;
                        return a.attachShadow({
                            mode: "open"
                        }), i[s.prepend ? "prepend" : "append"](a), t.ref = e => {
                            o = e
                        }, (0, n.XX)((0, n.h)(r, {
                            template: e,
                            data: t,
                            shadowRoot: a.shadowRoot
                        }), a.shadowRoot), this.castToShadowComponent(a, o), d.instances.add(o), o
                    }
                    static castToShadowComponent(e, t) {
                        t.ref = e.shadowRoot.pure_querySelector(":not(style)"), t.ref.setAttribute("part", "container"), t.host = e, t.update = async function(e) {
                            for (const [i, n] of Object.entries(e)) t.props[i] = n;
                            return t.forceUpdate(), new Promise((e => requestAnimationFrame((() => e()))))
                        }, t.detach = async function() {
                            const i = d.instances;
                            i.has(t) && (e.pure_parentElement.removeChild(e), i.delete(t))
                        }
                    }
                    static isOwnComponentRef(e) {
                        return e.localName === this.RefTagName
                    }
                    static async setDictionary(e, t = c.Ek.EN) {
                        l.A.setDictionary(e, t);
                        for (const e of d.instances.values()) e.forceUpdate();
                        return new Promise((e => setTimeout(e, 500)))
                    }
                }
            },
            399: (e, t, i) => {
                "use strict";
                var n, s, a, r;
                i.d(t, {
                        EA: () => r,
                        Ek: () => s,
                        J9: () => a,
                        ux: () => n
                    }),
                    function(e) {
                        e.GB = "gb", e.US = "us", e.ES = "es", e.DE = "de", e.PT = "pt", e.BR = "br", e.FR = "fr", e.IT = "it", e.IL = "il", e.TW = "tw", e.RU = "ru", e.JO = "jo", e.AE = "ae", e.NL = "nl", e.CN = "cn", e.JP = "jp", e.PL = "pl", e.TR = "tr", e.CZ = "cz", e.HU = "hu", e.SI = "si", e.SK = "sk"
                    }(n || (n = {})),
                    function(e) {
                        e.EN = "en", e.ES = "es", e.DE = "de", e.PT = "pt", e.FR = "fr", e.IT = "it", e.HE = "he", e.TW = "tw", e.RU = "ru", e.AR = "ar", e.UA = "ua", e.NL = "nl", e.ZH = "zh", e.JA = "ja", e.PL = "pl", e.TR = "tr", e.CS = "cs", e.HU = "hu", e.SL = "sl", e.SK = "sk"
                    }(s || (s = {})),
                    function(e) {
                        e.RTL = "rtl", e.LTR = "ltr"
                    }(a || (a = {})),
                    function(e) {
                        e.SM = "sm", e.MD = "md", e.LG = "lg"
                    }(r || (r = {}))
            },
            268: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => r
                });
                var n = i(849),
                    s = i(715),
                    a = function(e, t, i, n) {
                        return new(i || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }))
                    };
                class r extends n.A {
                    stop(e) {
                        return a(this, void 0, void 0, (function*() {
                            yield e.detach()
                        }))
                    }
                    run(e) {
                        return a(this, arguments, void 0, (function*(e, t = {}, i = document.body) {
                            const n = yield s.Ay.run(e, i, t);
                            return n.host.setAttribute("data-acsb", ""), n.host.classList.add("notranslate"), n
                        }))
                    }
                }
            },
            849: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => o
                });
                var n = i(278);
                class s extends n.A {
                    constructor() {
                        super(...arguments), this.eventBus = document.createElement("span"), this.listeners = new Map
                    }
                    emit(e, ...t) {
                        this.eventBus.dispatchEvent(new CustomEvent(e.toString(), {
                            detail: t
                        }))
                    }
                    off(e, t, i) {
                        const n = this.listeners.get(t);
                        this.eventBus.removeEventListener(e.toString(), n, i)
                    }
                    on(e, t, i) {
                        const n = e => t(...e.detail);
                        this.listeners.set(t, n), this.eventBus.addEventListener(e.toString(), n, i)
                    }
                }
                var a = i(941);
                class r extends s {
                    constructor() {
                        super(), this.$logger = n.A, this.uniqueId = (0, a.N3)()
                    }
                }
                r.$logger = n.A;
                const o = r
            },
            278: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => o
                });
                var n = i(303),
                    s = i(941),
                    a = function(e, t, i, n) {
                        return new(i || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }))
                    };
                class r {
                    static _write(e, t, i) {
                        this.logLevel < t || this.LogLevelMethodMap[t](`${r._getTimestamp()} - ${e}`, i)
                    }
                    static _pipeToCloudFunction(e, t, i) {
                        return a(this, void 0, void 0, (function*() {
                            const a = Object.assign(Object.assign({}, e), {
                                    domain: (0, s.Ep)(),
                                    widgetVersion: n.A.version
                                }),
                                r = JSON.stringify(a);
                            if (i) {
                                const e = JSON.parse(localStorage.getItem(this.storageKey) || "[]");
                                if (e.includes(r)) return;
                                e.push(r), localStorage.setItem(this.storageKey, JSON.stringify(e))
                            }
                            const o = {
                                timestamp: Date.now(),
                                severity: t,
                                text: a
                            };
                            return yield fetch(this.CloudFunctionEndpoint, {
                                method: "POST",
                                body: JSON.stringify(o)
                            })
                        }))
                    }
                    static _getTimestamp() {
                        return (Date.now() - this.startTime).toFixed(2)
                    }
                    static log(e, t) {
                        this._write(e, this.LogLevels.Log, t)
                    }
                    static warn(e, t) {
                        this._write(e, this.LogLevels.Warn, t)
                    }
                    static error(e, t) {
                        this._write(e, this.LogLevels.Error, t), this.collect(e, this.LogLevels.Error)
                    }
                    static debug(e, t) {
                        this._write(e, this.LogLevels.Debug, t)
                    }
                    static trace(e, t) {
                        this._write(e, this.LogLevels.Trace, t)
                    }
                    static collect(e, t) {
                        return a(this, arguments, void 0, (function*(e, t, i = 10, n = !0) {
                            const s = "string" == typeof e ? {
                                message: "CUSTOM",
                                content: e
                            } : e;
                            100 * Math.random() <= i && (yield this._pipeToCloudFunction(s, t, n))
                        }))
                    }
                }
                r.logLevel = n.A.logger.level, r.storageKey = "acsb:logs", r.startTime = Date.now(), r.CloudFunctionEndpoint = n.A.logger.cloudFunctionURL, r.LogLevels = {
                    Error: 5,
                    Warn: 4,
                    Log: 3,
                    Debug: 1,
                    Trace: 2
                }, r.LogLevelMethodMap = {
                    [r.LogLevels.Log]: console.log,
                    [r.LogLevels.Warn]: console.warn,
                    [r.LogLevels.Error]: console.error,
                    [r.LogLevels.Debug]: console.debug,
                    [r.LogLevels.Trace]: console.trace
                };
                const o = r
            },
            561: (e, t, i) => {
                "use strict";
                i.r(t), i.d(t, {
                    default: () => Ge
                });
                var n, s, a, r, o = i(535),
                    l = i(459),
                    c = i(849),
                    d = i(399),
                    u = i(486);
                ! function(e) {
                    e.Top = "top", e.Center = "center", e.Bottom = "bottom"
                }(n || (n = {})),
                function(e) {
                    e.Left = "left", e.Right = "right"
                }(s || (s = {})),
                function(e) {
                    e.Small = "small", e.Medium = "medium", e.Big = "big"
                }(a || (a = {})),
                function(e) {
                    e.checkmark = "checkmark", e.display = "display", e.display2 = "display2", e.display3 = "display3", e.help = "help", e.people = "people", e.people2 = "people2", e.settings = "settings", e.settings2 = "settings2", e.wheels = "wheels", e.wheels2 = "wheels2"
                }(r || (r = {}));
                class h {
                    constructor() {
                        this.autoshow = !1, this.statementLink = "", this.footerHtml = "", this.hideMobile = !1, this.hideTrigger = !1, this.disableBgProcess = !1, this.language = d.Ek.EN, this.languageOptions = {}, this.position = u.A.RIGHT, this.leadColor = "#146FF8", this.triggerColor = "#146FF8", this.triggerRadius = "50%", this.triggerPositionX = s.Right, this.triggerPositionY = n.Bottom, this.triggerIcon = r.people, this.triggerSize = a.Medium, this.triggerOffsetX = 20, this.triggerOffsetY = 20, this.complexMenu = !1, this.mobile = {
                            triggerIcon: r.people,
                            triggerOffsetX: 3,
                            triggerOffsetY: 3,
                            triggerSize: a.Medium,
                            triggerRadius: "50%",
                            triggerPositionX: s.Right,
                            triggerPositionY: n.Bottom
                        }
                    }
                }
                class p extends h {
                    constructor(e) {
                        super(), p.validate(e, this)
                    }
                    static validate(e, t) {
                        for (const [i] of Object.entries(e)) {
                            const n = e[i],
                                s = p.validators[i];
                            Object.keys(t).includes(i) && null != n && ("function" != typeof s ? p.validate(e[i], t[i]) : s(n) && (t[i] = e[i]))
                        }
                    }
                }
                p.validators = {
                    autoshow: e => "boolean" == typeof e,
                    statementLink: e => "string" == typeof e,
                    footerHtml: e => "string" == typeof e,
                    hideMobile: e => "boolean" == typeof e,
                    hideTrigger: e => "boolean" == typeof e,
                    disableBgProcess: e => "boolean" == typeof e,
                    language: e => Object.values(d.Ek).includes(e),
                    languageOptions: e => {
                        for (const [t, i] of Object.entries(e)) {
                            if (!Object.values(d.Ek).includes(t)) return !1;
                            for (const [e, t] of Object.entries(i)) {
                                if ("flag" === e && !Object.values(d.ux).includes(t)) return !1;
                                if ("hidden" === e && "boolean" != typeof t) return !1
                            }
                        }
                        return !0
                    },
                    position: e => Object.values(u.A).includes(e),
                    leadColor: e => CSS.supports("color", e),
                    triggerColor: e => CSS.supports("color", e),
                    triggerRadius: e => CSS.supports("border-radius", e),
                    triggerPositionX: e => Object.values(s).includes(e),
                    triggerPositionY: e => Object.values(n).includes(e),
                    triggerIcon: e => Object.values(r).includes(e),
                    triggerSize: e => Object.values(a).includes(e),
                    triggerOffsetX: e => !isNaN(Number(e)),
                    triggerOffsetY: e => !isNaN(Number(e)),
                    complexMenu: e => "boolean" == typeof e
                };
                const {
                    userAgent: f
                } = navigator, g = f.includes("Trident"), b = f.includes("Edge/"), {
                    userAgent: m
                } = navigator, A = m.includes("Macintosh"), v = window.navigator.maxTouchPoints > 0 || window.matchMedia("(any-pointer: coarse)").matches, y = {
                    lg: "screen and (min-width: 1024px)"
                }, E = window.top === window;
                var w = i(251),
                    F = function(e, t, i, n) {
                        return new(i || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }))
                    };
                class _ extends c.A {
                    constructor(e) {
                        super(), this.config = e
                    }
                    initialize() {
                        return F(this, void 0, void 0, (function*() {}))
                    }
                    static create(e) {
                        return F(this, void 0, void 0, (function*() {
                            if (!this.shouldLoad(e)) return;
                            const t = new this(e);
                            return yield t.initialize(), t
                        }))
                    }
                }
                _.shouldLoad = () => !0;
                const k = _;
                class C extends c.A {
                    stop(e) {
                        for (const t of e) C.shortcuts.delete(t)
                    }
                    run(e) {
                        C.hasListener || (C.hasListener = !0, document.addEventListener("keydown", (e => {
                            const t = [];
                            e.altKey && t.push("ALT"), e.shiftKey && t.push("SHIFT"), e.ctrlKey && t.push("CONTROL"), t.push(e.code);
                            const i = t.join("+");
                            C.shortcuts.has(i) && this.emit("hit", i)
                        }), {
                            capture: !0
                        }));
                        for (const t of e) C.shortcuts.add(t)
                    }
                }
                C.shortcuts = new Set, C.hasListener = !1;
                const S = C;
                var B = function(e, t, i, n) {
                    return new(i || (i = Promise))((function(s, a) {
                        function r(e) {
                            try {
                                l(n.next(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function o(e) {
                            try {
                                l(n.throw(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function l(e) {
                            var t;
                            e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                e(t)
                            }))).then(r, o)
                        }
                        l((n = n.apply(e, t || [])).next())
                    }))
                };
                class x extends k {
                    initialize() {
                        return B(this, void 0, void 0, (function*() {
                            const e = new S;
                            e.run(x.shortcutsType), e.on("hit", this.handleShortcut.bind(this))
                        }))
                    }
                    handleShortcut(e) {
                        return B(this, void 0, void 0, (function*() {
                            yield(yield i(561)).default._loadBundle();
                            const t = yield i.e(494).then(i.bind(i, 634));
                            switch (e) {
                                case "ALT+Digit0":
                                    t.toggleWidgetActiveState();
                                    break;
                                case "ALT+Digit1":
                                    t.announceMotorProfileActive(), t.enableMotorProfile();
                                    break;
                                case "ALT+Digit2":
                                    this.emit("FocusSkipLinks");
                                    break;
                                case "ALT+Digit8":
                                    t.reset();
                                    break;
                                case "ALT+Digit9":
                                    t.toggleWidget()
                            }
                        }))
                    }
                }
                x.shortcutsType = ["ALT+Digit0", "ALT+Digit1", "ALT+Digit2", "ALT+Digit8", "ALT+Digit9"];
                const D = x;
                var T = i(172),
                    L = i(129);
                const N = {
                    checkmark: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="enable-background:new 0 0 105 79" viewBox="0 0 105 79"><path d="M12.6 38.9C6 31.9-4.7 42.6 2.3 49.2c8.7 9 17.3 18.3 26.3 27 4 3.7 7 3.7 10.7 0l63.6-63.3c6.7-7-3.7-17.6-10.7-10.7l-57.9 58-21.7-21.3z"/></svg>',
                    display: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 50 32.757"><path d="M48.475 30.754a5.232 5.232 0 0 1-1.478-.544c-.563-.333-.995-.687-1.298-1.058a5.222 5.222 0 0 1-.754-1.243c-1.185-2.791-2.618-6.31-4.303-10.56a2515.52 2515.52 0 0 0-6.987-17.35h-4.554a8173.598 8173.598 0 0 0-5.861 14.16c-1.769 4.279-3.532 8.554-5.292 12.818a7.092 7.092 0 0 1-1.081 1.889c-.433.533-.96.98-1.581 1.344-.366.229-.862.407-1.491.533-.629.129-1.195.209-1.697.24v1.773h13.251v-1.773c-1.715-.152-2.942-.398-3.677-.742-.737-.339-1.105-.755-1.105-1.238 0-.151.026-.418.081-.798.05-.379.223-.994.512-1.843.228-.652.497-1.395.809-2.232.24-.64.457-1.201.664-1.717h11.536l.954 2.319 1.607 3.907c.105.255.171.462.19.61.025.152.037.291.037.411 0 .35-.553.64-1.662.876-1.108.236-1.716.384-2.536.444v1.775H50v-1.773c-.455-.03-.965-.104-1.525-.228zM32.748 18.965h-8.73l4.334-10.974 4.396 10.974z"/><path d="M26.806 31.281a3.833 3.833 0 0 1-1.091-.403c-.414-.246-.732-.505-.958-.777a3.965 3.965 0 0 1-.552-.916 370.033 370.033 0 0 1-3.172-7.782c-1.239-3.13-2.957-7.391-5.148-12.782h-3.353A11466.484 11466.484 0 0 0 4.312 28.5c-.211.534-.477 1-.796 1.396a4.16 4.16 0 0 1-1.166.984c-.269.17-.635.301-1.1.397a9.533 9.533 0 0 1-1.25.177v1.304h9.762v-1.307c-1.262-.111-2.167-.293-2.708-.544-.54-.252-.814-.556-.814-.916 0-.111.021-.307.061-.586.036-.28.162-.73.376-1.357.167-.48.365-1.031.596-1.646.059-.158.409-1.047.89-2.264h7.723l2.265 5.586c.078.188.124.34.142.452.017.111.027.212.027.303 0 .255-.411.472-1.226.646-.819.173-1.528.283-2.131.329v1.304h12.624v-1.307c-.001-.001-.367-.078-.781-.17zM8.844 22.413c1.371-3.462 3.133-7.903 3.133-7.903l3.207 7.903h-6.34z"/></svg>',
                    display2: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 50 40.541"><path d="M8.108 18.919h5.406v21.622H8.108z"/><path d="M0 17.568h21.622v5.406H0zM28.379 1.352h5.404v39.189h-5.404z"/><path d="M12.162 0H50v5.406H12.162z"/></svg>',
                    display3: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 34.354 20.866"><path d="M7.922.354h3.009l7.141 19.675h-2.919l-2.055-5.893H5.379l-2.134 5.893H.512L7.922.354zm4.42 11.612L9.313 3.274l-3.148 8.692h6.177zM28.789 11.348c.553-.071.924-.302 1.111-.695.107-.215.16-.524.16-.928 0-.824-.293-1.423-.875-1.795-.584-.372-1.42-.557-2.506-.557-1.258 0-2.149.341-2.674 1.023-.295.377-.486.938-.576 1.682h-2.25c.046-1.773.619-3.006 1.721-3.7 1.1-.694 2.379-1.041 3.833-1.041 1.686 0 3.053.322 4.107.964 1.043.643 1.564 1.643 1.564 3v8.265c0 .25.051.45.154.604.102.15.318.227.648.227.107 0 .229-.008.363-.02.133-.014.275-.033.428-.061v1.78c-.375.107-.66.175-.857.201-.195.026-.463.04-.803.04-.83 0-1.434-.295-1.809-.885-.197-.313-.334-.754-.416-1.325-.488.644-1.195 1.2-2.115 1.675-.92.473-1.932.709-3.04.709-1.332 0-2.418-.403-3.262-1.211-.844-.807-1.266-1.816-1.266-3.029 0-1.329.414-2.358 1.246-3.09.83-.732 1.92-1.182 3.268-1.353l3.846-.48zm-5.078 6.513c.51.401 1.112.602 1.808.602.85 0 1.67-.197 2.465-.589 1.34-.651 2.01-1.716 2.01-3.196v-1.939c-.295.189-.674.346-1.137.471s-.916.215-1.363.268l-1.457.188c-.874.116-1.53.299-1.969.549-.746.418-1.119 1.088-1.119 2.004 0 .694.254 1.242.762 1.642z"/></svg>',
                    help: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 50 50"><path d="M24.982 0C11.199 0 0 11.199 0 24.982s11.199 24.983 24.982 24.983 24.983-11.2 24.983-24.983C49.965 11.199 38.765 0 24.982 0zM48.24 24.982c0 4.25-1.146 8.213-3.102 11.601l-5.053-2.93-5.227-2.986a11.225 11.225 0 0 0 1.551-5.685c0-3.159-1.263-5.973-3.33-8.041l8.386-8.384c4.134 4.192 6.775 9.993 6.775 16.425zm-32.907 0c0-5.341 4.365-9.648 9.648-9.648 5.342 0 9.649 4.365 9.649 9.648 0 5.342-4.366 9.649-9.649 9.649a9.633 9.633 0 0 1-9.648-9.649zm9.649-23.259v11.831c-5.284 0-9.706 3.618-11.027 8.5L2.526 19.009C5.169 9.074 14.243 1.723 24.982 1.723zM4.881 36.641l5.111-2.93 5.169-2.986c1.952 3.388 5.628 5.686 9.82 5.686 1.035 0 2.067-.172 2.987-.402l3.044 11.431a23.638 23.638 0 0 1-6.088.802c-8.499-.002-16.023-4.71-20.043-11.601z"/></svg>',
                    people: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 100 131.3"><path d="M71.6 131.3c1 0 2.1-.3 3.1-.8 3.9-1.8 5.5-6.2 3.6-10.1 0 0-14.3-32.7-16.9-44.7-1-4.2-1.6-15.3-1.8-20.5 0-1.8 1-3.4 2.6-3.9l32-9.6c3.9-1 6.2-5.5 5.2-9.4-1-3.9-5.5-6.2-9.4-5.2 0 0-29.6 9.6-40.3 9.6-10.4 0-39.8-9.4-39.8-9.4-3.9-1-8.3.8-9.6 4.7-1.3 4.2 1 8.6 5.2 9.6l32 9.6c1.6.5 2.9 2.1 2.6 3.9-.3 5.2-.8 16.4-1.8 20.5-2.6 12-16.9 44.7-16.9 44.7-1.8 3.9 0 8.3 3.6 10.1 1 .5 2.1.8 3.1.8 2.9 0 5.7-1.6 6.8-4.4l15.3-31.2L64.8 127c1.3 2.7 3.9 4.3 6.8 4.3z"/><circle cx="50.3" cy="14.6" r="14.6" style="fill:#fff"/></svg>',
                    people2: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 211.3 255"><circle cx="105.7" cy="41.5" r="41.8"/><path d="m205.7 153-59.1-59c-4.7-4.9-11.5-7.2-18.2-6.1-1.8-.2-3.6-.2-5.4 0H88.3c-1.7-.2-3.4-.2-5.2 0-6.6-1.2-13.3.8-18.1 5.4L5.6 153c-7.9 8.4-7.4 21.7 1 29.5 8 7.5 20.5 7.5 28.5 0l28.7-28.7v76.8c.1 13.4 10.9 24.3 24.4 24.4H123c13.4-.1 24.3-10.9 24.4-24.4v-76.8l28.7 28.7c8.4 7.9 21.7 7.4 29.5-1 7.6-8 7.6-20.4.1-28.5z"/></svg>',
                    settings: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 50 50"><path d="m49.057 20.785-6.01-1.181a21.265 21.265 0 0 0-1.477-3.448l3.548-5.024c.295-.493.196-1.181-.198-1.576l-4.333-4.335c-.395-.393-1.086-.491-1.577-.197l-5.024 3.448c-1.082-.59-2.265-1.084-3.448-1.379L29.455.987c-.1-.493-.69-.987-1.282-.987h-6.008c-.591 0-1.184.494-1.281.987L19.8 6.995c-1.28.394-2.463.888-3.645 1.478l-5.123-3.448c-.392-.394-1.181-.295-1.575.098L5.222 9.457c-.395.396-.494 1.084-.197 1.577l3.545 5.123c-.689 1.084-1.083 2.265-1.477 3.448l-6.01 1.181c-.59.101-1.082.593-1.082 1.183v6.107c0 .592.492 1.084 1.082 1.183l6.01 1.184a27.12 27.12 0 0 0 1.477 3.545L5.123 39.01c-.295.494-.295 1.184.099 1.578l4.333 4.334c.394.394 1.084.491 1.577.098l5.123-3.447a19.344 19.344 0 0 0 3.546 1.479l1.083 6.009c.097.492.69.984 1.183.984h6.105c.591 0 1.183-.492 1.281-.984l1.082-6.105c1.184-.397 2.367-.791 3.448-1.382l5.024 3.351c.492.395 1.184.295 1.578-.099l4.233-4.335c.493-.395.493-1.083.196-1.576l-3.448-5.024c.594-1.082 1.085-2.267 1.479-3.446l6.01-1.184c.593-.099.984-.591.984-1.183v-6.107c.003-.594-.39-1.085-.982-1.186zM25.021 35.463c-5.713 0-10.44-4.727-10.44-10.44 0-5.812 4.727-10.443 10.44-10.443a10.385 10.385 0 0 1 10.442 10.443c0 5.713-4.629 10.44-10.442 10.44z"/></svg>',
                    settings2: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 50 40.733"><path d="M26.848 1.851v.234a7.414 7.414 0 0 1 5.555 7.172 7.413 7.413 0 0 1-5.555 7.172v22.452a1.853 1.853 0 0 1-3.704 0V16.43c-3.194-.823-5.556-3.725-5.556-7.172a7.413 7.413 0 0 1 5.556-7.172v-.235a1.852 1.852 0 0 1 3.704 0zm-5.556 7.407a3.706 3.706 0 0 0 3.704 3.702 3.705 3.705 0 0 0 3.701-3.702 3.705 3.705 0 0 0-3.701-3.704 3.708 3.708 0 0 0-3.704 3.704zM9.258 24.304c3.192.823 5.555 3.725 5.555 7.171a7.414 7.414 0 0 1-5.555 7.172v.234a1.852 1.852 0 0 1-3.704 0v-.234A7.411 7.411 0 0 1 0 31.476a7.41 7.41 0 0 1 5.554-7.171V1.851a1.85 1.85 0 1 1 3.704 0v22.453zm-5.556 7.172c0 2.041 1.662 3.705 3.704 3.705s3.703-1.662 3.703-3.705a3.706 3.706 0 0 0-3.703-3.702 3.707 3.707 0 0 0-3.704 3.702zM44.438 15.972a7.414 7.414 0 0 1 5.555 7.172 7.413 7.413 0 0 1-5.555 7.172v8.565a1.853 1.853 0 0 1-3.705 0v-8.565a7.413 7.413 0 0 1-5.553-7.172 7.412 7.412 0 0 1 5.553-7.172V1.851a1.852 1.852 0 0 1 3.705 0v14.121zm-5.556 7.173c0 2.041 1.66 3.703 3.703 3.703s3.704-1.661 3.704-3.703-1.661-3.704-3.704-3.704a3.707 3.707 0 0 0-3.703 3.704z"/></svg>',
                    wheels: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 50 57"><path d="M20.821 0a5.364 5.364 0 1 0 .001 10.727A5.364 5.364 0 0 0 20.821 0zm-2.889 11.083c-3.158.007-3.741 1.995-3.741 3.622v19.138a2.96 2.96 0 0 0 2.969 2.969l13.597-.06s4.681 7.089 7.026 10.628c.703 1.061 1.638 1.999 2.988 1.999 1.781 0 3.421-1.453 3.226-3.226-.074-.695-.231-1.354-.652-1.979-2.091-3.117-6.234-9.859-8.511-12.39-.578-.643-1.377-1.112-2.315-1.109l-11.242.04V18.802l8.016 5.542a2.527 2.527 0 0 0 3.522-.653 2.526 2.526 0 0 0-.653-3.523l-12.508-8.629c-.434-.3-1.236-.456-1.722-.456zm30.994 5.364a.75.75 0 0 0-.535.217l-9.995 9.995H24.225a.748.748 0 0 0-.751.752v.277c0 .419.333.752.751.752h14.567a.832.832 0 0 0 .573-.217l10.292-10.292a.756.756 0 0 0 0-1.069l-.198-.198a.75.75 0 0 0-.533-.217zm-36.16 5.225C5.423 23.879 0 30.721 0 38.949 0 48.995 8.121 57 17.892 57c7.486 0 14.004-4.687 16.645-11.4l-2.691-4.058c-1.22 6.446-6.914 11.421-13.953 11.421-7.955 0-14.21-6.363-14.21-14.014 0-5.9 3.735-11.026 9.084-13.062v-4.215z"/></svg>',
                    wheels2: '<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 42.112 50"><path d="M35.956.257C35.284.104 34.614 0 33.944 0a8.163 8.163 0 0 0-7.894 6.138 8.1 8.1 0 0 0-.155 3.147c-.153-.154-.36-.258-.567-.361L14.805 3.972c-1.393-.67-2.993-.103-3.715 1.238l-4.488 8.666c-.722 1.393-.154 3.096 1.187 3.817.413.207.876.31 1.29.31a2.856 2.856 0 0 0 2.528-1.548l3.198-6.19 5.416 2.579-3.662 5.726h-.774C7.119 18.467 0 25.586 0 34.304S7.119 50.09 15.836 50.09c7.841 0 14.341-5.675 15.58-13.153v8.511c0 1.807 1.495 3.3 3.301 3.3 1.807 0 3.303-1.493 3.303-3.3V33.221c0-1.341-.826-2.527-2.013-3.043l-5.674-2.321c-.722-1.651-1.755-3.146-2.993-4.436l3.044-4.798c.567-.877.877-1.806.929-2.786.206.104.465.155.671.207.671.155 1.341.258 2.011.258 3.716 0 6.965-2.528 7.895-6.139 1.029-4.334-1.601-8.77-5.934-9.906zM15.94 44.828A10.503 10.503 0 0 1 5.416 34.304 10.502 10.502 0 0 1 15.94 23.782a10.5 10.5 0 0 1 10.524 10.522A10.502 10.502 0 0 1 15.94 44.828z"/></svg>'
                };
                var P = i(492);
                const O = JSON.parse('{"openWidget":"Open accessiBe: accessibility options, statement and help"}');
                var M = i(557);
                const I = {
                        visible: !0,
                        active: !1,
                        color: "lead",
                        positionY: n.Bottom,
                        positionX: s.Right,
                        size: a.Medium,
                        radius: "50%",
                        icon: r.people,
                        offsetLeft: 20,
                        offsetTop: 20,
                        onInteraction: null
                    },
                    R = function(e) {
                        const {
                            t
                        } = (0, L.B)(O);
                        return (0, M.ob)(".hide{display:none}.container{padding:0;position:fixed;outline:0;border:0;border-radius:var(--radius);background-color:var(--lead-color);cursor:pointer;z-index:2147483647;transition:all .15s ease}.container:focus .acsb-remove,.container:hover .acsb-remove{opacity:1}.container:active{transform:scale(1)}.container:focus,.container:hover{transform:scale(1.1)}.size-small{width:30px;height:30px}.size-medium{width:45px;height:45px}.size-big{width:65px;height:65px}.icon{position:static;color:#fff}.icon svg{position:absolute;max-width:65%;max-height:65%;overflow:visible;top:0;left:0;bottom:0;right:0;margin:auto;visibility:visible;opacity:1}.actions-active .active-actions-icon{display:block}.active-actions-icon{display:none;position:absolute;bottom:0;left:-5px;width:22px;height:22px;border-radius:50%;border:solid 2px var(--lead-color);color:var(--lead-color);background-color:#fff}.active-actions-icon svg{position:absolute;width:11px;height:11px;color:var(--lead-color)}.position-x-left{left:var(--offset-left);right:auto}.position-x-right{right:var(--offset-left);left:auto}.position-y-bottom{top:auto;bottom:var(--offset-top)}.position-y-top{top:var(--offset-top);bottom:auto}.position-y-center{top:var(--offset-top, 0);bottom:0;margin:auto 0}", {
                            "lead-color": e.color,
                            radius: e.radius,
                            "offset-left": `${e.offsetLeft}px`,
                            "offset-top": `${e.offsetTop}px`
                        }), (0, T.h)("div", null, (0, T.h)("button", {
                            part: "acsb-trigger",
                            "data-testid": "acsb-trigger",
                            onClick: e.onInteraction,
                            onMouseEnter: e.onInteraction,
                            onFocus: e.onInteraction,
                            className: `${e.visible?"":"hide"} ${e.active?"actions-active":""} container size-${e.size} position-x-${e.positionX} position-y-${e.positionY}  `,
                            "aria-label": t("openWidget"),
                            tabIndex: 0
                        }, (0, T.h)("span", {
                            className: "icon",
                            part: "acsb-trigger-icon"
                        }, (0, T.h)(P.A, {
                            part: "acsb-trigger-icon-svg"
                        }, N[e.icon]), (0, T.h)("span", {
                            className: "active-actions-icon"
                        }, (0, T.h)(P.A, null, N.checkmark)))))
                    };
                R.defaultProps = I;
                var $ = i(975);
                const H = JSON.parse('{"PROCESSING_DATA_PLEASE_WAIT":"Processing the data, please give it a few seconds..."}');
                var W, G = i(994);

                function z(e) {
                    return (0, T.h)("div", {
                        class: `profile-button ${e.class}`
                    }, (0, T.h)("div", {
                        class: "profile-button__toggle"
                    }, (0, T.h)($.E, {
                        variant: "button",
                        height: "35px"
                    })), (0, T.h)("div", {
                        class: "profile-button__content"
                    }, (0, T.h)($.E, {
                        variant: "text",
                        height: "20px"
                    }), (0, T.h)($.E, {
                        variant: "text",
                        height: "14px"
                    }), (0, T.h)($.E, {
                        variant: "button",
                        width: "30px",
                        height: "30px"
                    })))
                }! function(e) {
                    e.LEFT = "left", e.RIGHT = "right"
                }(W || (W = {}));
                const V = {
                    visible: !0,
                    position: W.LEFT,
                    leadColor: "#146ff8"
                };
                J.defaultProps = V;
                const U = [
                        [!0, !1, !1, !1, !1, !0, !1, !0, !1, !0, !1],
                        [!1, !1, !1, !1, !0, !1, !0, !1, !0],
                        [!1, !1, !1, !1, !0, !1, !1, !1, !1, !1, !1]
                    ],
                    j = new Array(6).fill(null);

                function J({
                    position: e,
                    visible: t,
                    leadColor: i
                }) {
                    const {
                        direction: n
                    } = (0, L.B)(H), [s, a] = (0, G.J0)(!1);
                    return (0, G.vJ)((() => a(t)), [t]), (0, M.ob)('.widget-skeleton{overflow:hidden;opacity:0;position:fixed;visibility:hidden;z-index:2147483647;height:95%;width:100%;top:50%;max-width:550px;border-radius:10px;background-color:#f2f3f8;will-change:transform,opacity,height;box-shadow:0 10px 30px rgba(60,80,170,.1);transition:opacity .15s ease,margin-top .15s ease,height .15s ease-out,transform .3s ease-out;transform:translateY(-45%);padding-inline-end:9px}.widget-skeleton::after{display:block;content:"";width:9px;height:100%;inset-inline-end:0;position:absolute;background-color:#f2f3f8;top:0}.widget-skeleton--position-left{left:30px;right:auto}.widget-skeleton--position-right{right:30px;left:auto}.widget-skeleton--active{visibility:visible;opacity:1;transform:translateY(-50%)}.widget-skeleton--active .widget-skeleton__profiles,.widget-skeleton--active .widget-skeleton__search{opacity:1;transform:translateY(0)}@media screen and (max-width:700px){.widget-skeleton{width:95%;height:97%;max-height:none;max-width:550px;margin:auto;left:0;right:0}}.widget-skeleton::before{position:absolute;background-color:var(--lead-color);border-top-left-radius:inherit;border-top-right-radius:inherit;top:0;width:100%;height:350px;z-index:-1;content:""}.widget-skeleton__header{padding:0 15px;margin-top:5px;margin-bottom:20px;display:flex;align-items:center;min-height:26px;justify-content:space-between}.widget-skeleton__header .close-icon{height:12px;color:rgba(0,0,0,.15)}.widget-skeleton__header .language-selector{height:22px;width:120px}.widget-skeleton__hero{padding:0 15px}.widget-skeleton__hero .hero-buttons{display:flex;justify-content:space-evenly;margin-top:30px;flex-wrap:nowrap;align-items:center}@media screen and (max-width:980px){.widget-skeleton__hero .hero-buttons{flex-wrap:wrap;margin-top:25px}}@media screen and (max-width:700px){.widget-skeleton__hero .hero-buttons{flex-direction:column}}.widget-skeleton__hero .hero-buttons .skeleton{height:33px;width:30%}@media screen and (max-width:980px){.widget-skeleton__hero .hero-buttons .skeleton{width:48%;margin-top:10px}}@media screen and (max-width:700px){.widget-skeleton__hero .hero-buttons .skeleton{width:100%;max-width:300px}}.widget-skeleton__hero .hero__heading{display:block;margin:0 auto;width:50%;height:24px}.widget-skeleton__search{transition:opacity .35s ease-in-out,transform .35s ease-in-out;padding:0 15px;will-change:transform,opacity;transform:translateY(50px);opacity:0}.widget-skeleton__search .search-field{margin-top:30px;width:100%;height:41px}.widget-skeleton__actions,.widget-skeleton__profiles{background-color:#fff;padding:15px;border-radius:10px;margin:30px 15px 0;box-shadow:0 10px 30px rgba(60,80,170,.1)}.widget-skeleton__actions .action-buttons{margin-top:15px;display:flex;flex-wrap:wrap;justify-content:space-between}.widget-skeleton__actions .action-buttons>.skeleton{margin-bottom:15px;border-radius:10px!important}.widget-skeleton__profiles{transition:opacity .35s ease-in-out,transform .35s ease-in-out;will-change:transform,opacity;transform:translateY(50px);opacity:0}.widget-skeleton__profiles>div:first-of-type{margin-bottom:15px}@media screen and (max-width:700px){.widget-skeleton__profiles>div:first-of-type{height:21px!important}}.widget-skeleton__profiles .profile-buttons__item{display:flex;padding:18px 0;border-bottom:solid 1px #ebecf2;width:100%}.widget-skeleton__profiles .profile-buttons__item:last-of-type{border:0}.widget-skeleton__profiles .profile-buttons__item .profile-button__toggle{width:23%}@media screen and (max-width:700px){.widget-skeleton__profiles .profile-buttons__item .profile-button__toggle{width:30%}}.widget-skeleton__profiles .profile-buttons__item .profile-button__content{width:75%;display:flex;flex-flow:column;padding-inline-start:7%;padding-inline-end:50px;gap:8px;position:relative}@media screen and (max-width:700px){.widget-skeleton__profiles .profile-buttons__item .profile-button__content{padding-inline-end:0;width:70%}}.widget-skeleton__profiles .profile-buttons__item .profile-button__content>div:last-of-type{position:absolute;right:0;top:50%;transform:translateY(-50%)}[dir=rtl] .widget-skeleton__profiles .profile-buttons__item .profile-button__content>div:last-of-type{left:0;right:auto}@media screen and (max-width:700px){.widget-skeleton__profiles .profile-buttons__item .profile-button__content>div:last-of-type{display:none}}.widget-skeleton__footer{position:fixed;z-index:2147483647;background-color:var(--lead-color);padding:8px 15px;width:100%;bottom:0;border-bottom-left-radius:inherit;border-bottom-right-radius:inherit}.widget-skeleton__footer .skeleton{margin:auto;max-width:50%}', {
                        "lead-color": i
                    }), (0, T.h)("div", {
                        tabIndex: 0,
                        role: "progressbar",
                        "aria-busy": "true",
                        dir: n,
                        class: `widget-skeleton ${s?"widget-skeleton--active":""} widget-skeleton--position-${e}`
                    }, (0, T.h)("div", {
                        class: "widget-skeleton__header"
                    }, (0, T.h)($.E, {
                        variant: "button",
                        height: "16px",
                        width: "16px"
                    }), (0, T.h)($.E, {
                        className: "language-selector",
                        variant: "button"
                    })), (0, T.h)("div", {
                        class: "widget-skeleton__hero"
                    }, (0, T.h)($.E, {
                        variant: "text",
                        className: "hero__heading"
                    }), (0, T.h)("div", {
                        class: "hero-buttons"
                    }, (0, T.h)($.E, {
                        variant: "button"
                    }), (0, T.h)($.E, {
                        variant: "button"
                    }), (0, T.h)($.E, {
                        variant: "button"
                    }))), (0, T.h)("div", {
                        class: "widget-skeleton__search"
                    }, (0, T.h)($.E, {
                        className: "search-field",
                        variant: "button"
                    })), (0, T.h)("div", {
                        class: "widget-skeleton__profiles"
                    }, (0, T.h)($.E, {
                        variant: "text",
                        width: "100%",
                        height: "27px"
                    }), (0, T.h)("div", {
                        class: "profile-buttons"
                    }, j.map(((e, t) => (0, T.h)(z, {
                        key: t,
                        class: "profile-buttons__item"
                    }))))), U.map(((e, t) => (0, T.h)("div", {
                        class: "widget-skeleton__actions",
                        key: t
                    }, (0, T.h)($.E, {
                        variant: "text",
                        width: "100%",
                        height: "27px"
                    }), (0, T.h)("div", {
                        class: "widget-sekeleton__actions action-buttons"
                    }, e.map(((e, t) => (0, T.h)($.E, {
                        key: t,
                        width: e ? "65.5%" : "31%",
                        height: "120px"
                    }))))))), (0, T.h)("div", {
                        class: "widget-skeleton__footer"
                    }, (0, T.h)($.E, {
                        variant: "text",
                        width: "100%",
                        height: "15px"
                    })))
                }
                var K = i(268),
                    q = i(75),
                    Y = function(e, t, i, n) {
                        return new(i || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }))
                    };
                class X {
                    constructor() {
                        this.defauCssProperties = {
                            color: "rgb(43, 62, 82)",
                            "border-color": "rgb(43, 62, 82)",
                            "border-width": "0px",
                            "border-style": "none",
                            "background-size": "auto",
                            "background-repeat": "repeat",
                            clip: "auto",
                            "background-image": "none",
                            display: "block",
                            visibility: "visible",
                            "z-index": "2147483647"
                        }
                    }
                    initialize(e) {
                        return Y(this, void 0, void 0, (function*() {
                            this.backCompStyle && q.c.removeStyle(this.backCompStyle), yield this.buildOldWidget(e), this.extractOldStyles()
                        }))
                    }
                    generateCssRules(e) {
                        return Object.entries(this.defauCssProperties).reduce(((t, [i, n]) => (e[i] !== n && (t[i] = e[i]), t)), {})
                    }
                    buildOldWidget(e) {
                        return Y(this, void 0, void 0, (function*() {
                            const t = (new DOMParser).parseFromString('<div class="acsb-trigger acsb-bg-lead" tabindex="0" role="button"  aria-label="Open accessiBe\'s Accessibility Widget" data-acsb="trigger"></div>', "text/html");
                            this.oldTriggerElement = t.body.firstElementChild, this.oldTriggerElement.classList.add("acsb-ready"), document.body.appendChild(this.oldTriggerElement), q.c.insertStyle(".acsb-trigger{inset: auto auto 20px 20px; border-radius: 50%; position:fixed;display:none !important;visibility:visible;cursor:pointer;box-sizing:border-box;opacity:1;line-height:1;outline:none 0 !important;overflow:visible !important;background-color:#146ff8;z-index:999999999999;-webkit-transition:all .15s ease;-moz-transition:all .15s ease;-o-transition:all .15s ease;transition:all .15s ease} .acsb-trigger.acsb-ready{display:block !important}.acsb-trigger.acsb-hidden{display:none !important}.acsb-trigger.acsb-hidden.acsb-ready{display:none !important}.acsb-trigger.acsb-trigger-hidden{display:none !important;visibility:hidden !important;pointer-events:none !important}.acsb-trigger.acsb-trigger-hidden.acsb-ready{display:none !important}"), e.hideTrigger && this.oldTriggerElement.classList.add("acsb-trigger-hidden"), ["small", "medium", "big"].includes(e.triggerSize) || (e.triggerSize = a.Medium), ["top", "center", "bottom"].includes(e.triggerPositionY) || (e.triggerPositionY = n.Bottom), ["left", "center", "right"].includes(e.triggerPositionX) || (e.triggerPositionX = s.Right), this.oldTriggerElement.classList.add(`acsb-trigger-size-${e.triggerSize}`), this.oldTriggerElement.classList.add(`acsb-trigger-position-x-${e.triggerPositionX}`), this.oldTriggerElement.classList.add(`acsb-trigger-position-y-${e.triggerPositionY}`)
                        }))
                    }
                    extractOldStyles() {
                        const e = window.getComputedStyle(this.oldTriggerElement),
                            t = Object.entries(this.generateCssRules(e)).reduce(((e, [t, i]) => e + ` ${t}: ${i} !important;`), "");
                        this.backCompStyle = q.c.insertStyle(`::part(acsb-trigger) {${t}}`).style, document.body.removeChild(this.oldTriggerElement)
                    }
                }
                class Q {
                    static getActiveBreakpoint() {
                        return this.activeBreakpoint || this.init(), this.activeBreakpoint
                    }
                    static subscribe(e) {
                        this.subscribers.set(e, null), this.activeBreakpoint || this.init()
                    }
                    static notifySubscribers() {
                        for (const [e, t] of this.subscribers) t !== this.activeBreakpoint && e(this.activeBreakpoint), this.subscribers.set(e, this.activeBreakpoint)
                    }
                    static init() {
                        for (const [e, t] of Object.entries(y)) {
                            const i = window.matchMedia(t);
                            this.activeBreakpoint = void 0, i.matches && (this.activeBreakpoint = e), i.onchange = t => {
                                this.activeBreakpoint = void 0, t.matches && (this.activeBreakpoint = e), this.notifySubscribers()
                            }
                        }
                        this.notifySubscribers()
                    }
                }
                Q.subscribers = new Map;
                var Z = function(e, t, i, n) {
                    return new(i || (i = Promise))((function(s, a) {
                        function r(e) {
                            try {
                                l(n.next(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function o(e) {
                            try {
                                l(n.throw(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function l(e) {
                            var t;
                            e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                e(t)
                            }))).then(r, o)
                        }
                        l((n = n.apply(e, t || [])).next())
                    }))
                };
                class ee extends k {
                    constructor() {
                        super(...arguments), this.uiComponents = new K.A
                    }
                    onInteraction(e) {
                        return Z(this, void 0, void 0, (function*() {
                            if ("click" === e.type) {
                                const e = (yield i(561)).default.isLoaded;
                                if (yield this.template.update({
                                        visible: !1
                                    }), !e) {
                                    const e = yield this.createSkeletonLoader();
                                    yield(yield i(561)).default._loadBundle(), yield e.detach()
                                }(yield i.e(494).then(i.bind(i, 634))).openWidget({
                                    animation: e
                                })
                            } else yield(yield i(561)).default._loadBundle()
                        }))
                    }
                    initialize() {
                        return Z(this, void 0, void 0, (function*() {
                            const e = new X;
                            this.template = yield this.uiComponents.run({
                                template: R,
                                data: {
                                    color: this.config.triggerColor,
                                    visible: !1,
                                    positionX: this.config.triggerPositionX,
                                    positionY: this.config.triggerPositionY,
                                    size: this.config.triggerSize,
                                    radius: this.config.triggerRadius,
                                    icon: this.config.triggerIcon,
                                    offsetLeft: this.config.triggerOffsetX,
                                    offsetTop: this.config.triggerOffsetY,
                                    onInteraction: yield this.onInteraction.bind(this)
                                }
                            }, {
                                prepend: !0
                            }), Q.subscribe((t => Z(this, void 0, void 0, (function*() {
                                const i = t !== d.EA.LG,
                                    n = i ? Object.assign(Object.assign({}, this.config), this.config.mobile) : this.config;
                                yield e.initialize(n);
                                const s = l.A.get("widget"),
                                    a = !(null == s ? void 0 : s.hideTrigger) && !n.hideTrigger,
                                    r = null == s ? void 0 : s.hidden,
                                    o = i && !n.hideMobile && a,
                                    c = !i && a;
                                yield this.template.update({
                                    visible: (c || o) && !r,
                                    positionX: n.triggerPositionX,
                                    positionY: n.triggerPositionY,
                                    size: n.triggerSize,
                                    radius: n.triggerRadius,
                                    offsetLeft: n.triggerOffsetX,
                                    offsetTop: n.triggerOffsetY
                                })
                            }))))
                        }))
                    }
                    createSkeletonLoader() {
                        return Z(this, void 0, void 0, (function*() {
                            return yield this.uiComponents.run({
                                template: J,
                                data: {
                                    visible: !0,
                                    leadColor: this.config.leadColor,
                                    position: this.config.position
                                }
                            }, {
                                prepend: !0
                            })
                        }))
                    }
                    show() {
                        return Z(this, void 0, void 0, (function*() {
                            yield this.template.update({
                                visible: !0
                            })
                        }))
                    }
                    hide() {
                        return Z(this, void 0, void 0, (function*() {
                            (yield i.e(494).then(i.bind(i, 634))).closeWidget(), this.template.update({
                                visible: !1
                            })
                        }))
                    }
                }
                var te = i(761),
                    ie = function(e, t, i, n) {
                        return new(i || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }))
                    };
                class ne extends k {
                    initialize() {
                        return ie(this, void 0, void 0, (function*() {
                            const e = document.createElement("div");
                            e.className = "acsb-trigger acsb-widget", document.body.appendChild(e);
                            for (const e of Array.from(document.querySelectorAll(ne.CUSTOM_TRIGGERS_SELECTOR))) e.setAttribute("tabindex", "0"), e.setAttribute("role", "button");
                            for (const t of [document, e]) t.addEventListener("click", (e => ie(this, void 0, void 0, (function*() {
                                e.composedPath().some((e => (0, te.uE)(e) && e.matches(ne.CUSTOM_TRIGGERS_SELECTOR))) && (e.preventDefault(), yield(yield i(561)).default._loadBundle(), (yield i.e(494).then(i.bind(i, 634))).openWidget())
                            }))))
                        }))
                    }
                }
                ne.CUSTOM_TRIGGERS_SELECTOR = '[data-acsb-custom-trigger="true"], [data-acsb="trigger"], .acsb-trigger';
                const se = ne,
                    ae = JSON.parse('{"SKIP_LINKS":"Skip Links","SKIP_NAVIGATION":"Click to skip navigation","SKIPLINK_CONTENT":"Skip to Content","SKIPLINK_MENU":"Skip to Menu","SKIPLINK_FOOTER":"Skip to Footer"}');
                var re;
                ! function(e) {
                    e.Content = "content", e.Menu = "menu", e.Footer = "footer"
                }(re || (re = {}));
                const oe = e => {
                        const {
                            link: t,
                            onKeyDown: i,
                            onFocus: n,
                            onClick: s,
                            onBlur: a
                        } = e, {
                            t: r
                        } = (0, L.B)(ae);
                        return (0, M.ob)(".skip-link{min-width:200px;position:fixed;top:50px;left:20px;text-align:center;padding:13px 20px;border-radius:50px;text-decoration:none;background-color:#fff;color:#1f2533;font-size:16px;text-shadow:0 0#27272d;opacity:0;pointer-events:none;z-index:2147483647;font-family:Arial,Helvetica,sans-serif;direction:ltr;border:solid 3px rgba(19,110,248,.8);outline:solid 0#639af9;box-shadow:0 0 0 5px rgba(19,110,248,.3);transition:top .22s ease}.skip-link:focus{top:20px;opacity:1;pointer-events:auto}.skip-link .content{display:inline-flex;margin-inline-start:30px;font-size:10px;text-transform:uppercase;justify-content:center;align-items:center;border-radius:inherit;background-color:#146ff8;padding:5px 10px;color:#fff}@media screen and (max-width:500px){.skip-link .content{display:none}}.skip-link .content .icon{font-size:15px;margin-inline-end:3px;line-height:1}@media screen and (max-width:980px){.skip-link{font-size:14px;padding:12px 20px}}"), (0, T.h)("div", null, (0, T.h)("a", {
                            key: t.href,
                            href: t.href,
                            "data-acsb-skip-link": t.type,
                            class: "skip-link",
                            onKeyDown: i,
                            onFocus: n,
                            onClick: s,
                            onBlur: a
                        }, r(t.dictionaryKey), (0, T.h)("div", {
                            className: "content",
                            "aria-hidden": "true"
                        }, (0, T.h)("span", {
                            className: "icon"
                        }, "↵"), "ENTER")))
                    },
                    le = [{
                        href: "#acsbContent",
                        type: re.Content,
                        dictionaryKey: "SKIPLINK_CONTENT"
                    }, {
                        href: "#acsbMenu",
                        type: re.Menu,
                        dictionaryKey: "SKIPLINK_MENU",
                        hideMobile: !0
                    }, {
                        href: "#acsbFooter",
                        type: re.Footer,
                        dictionaryKey: "SKIPLINK_FOOTER",
                        hideMobile: !0
                    }];

                function ce(e) {
                    const t = e.activeBreakpoint !== d.EA.LG,
                        [i, n] = (0, G.J0)(!1),
                        s = (0, G.Kr)((() => t ? le.filter((e => !e.hideMobile)) : le), [t]),
                        {
                            t: a
                        } = (0, L.B)(ae);
                    return (0, M.ob)('.skip-links{display:block;position:fixed;top:0;left:0;z-index:2147483647}.skip-links:before{position:inherit;visibility:hidden;opacity:0;top:0;left:0;width:100%;height:100%;pointer-events:none;background-color:rgba(0,0,0,.3);z-index:-1;content:"";transition:all .15s ease}.skip-links.active:before{visibility:visible;opacity:1}'), (0, T.h)("div", null, (0, T.h)("div", {
                        className: "skip-links " + (i ? "active" : ""),
                        role: "region",
                        "aria-label": a("SKIP_LINKS"),
                        "data-acsb": "skipLinks"
                    }, s.map((t => (0, T.h)(oe, {
                        link: t,
                        key: t.href,
                        onKeyDown: i => {
                            return n = i, a = t.type, void("Tab" !== n.key || n.shiftKey || s.findIndex((e => e.type === a)) === s.length - 1 && e.onReachedMenuEnd());
                            var n, a
                        },
                        onClick: i => ((t, i) => {
                            t.preventDefault(), n(!0), e.onPressed({
                                type: i
                            })
                        })(i, t.type),
                        onFocus: () => {
                            n(!0)
                        },
                        onBlur: () => n(!1)
                    })))))
                }
                var de = i(715);
                const ue = e => ["INPUT", "TEXTAREA", "SELECT"].includes(e.tagName) && !["button", "image", "submit"].includes(e.type);
                var he = function(e, t, i, n) {
                    return new(i || (i = Promise))((function(s, a) {
                        function r(e) {
                            try {
                                l(n.next(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function o(e) {
                            try {
                                l(n.throw(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function l(e) {
                            var t;
                            e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                e(t)
                            }))).then(r, o)
                        }
                        l((n = n.apply(e, t || [])).next())
                    }))
                };
                class pe extends k {
                    constructor() {
                        super(...arguments), this.uiComponents = new K.A
                    }
                    initialize() {
                        return he(this, void 0, void 0, (function*() {
                            this.template = yield this.uiComponents.run({
                                template: ce,
                                data: {
                                    activeBreakpoint: Q.getActiveBreakpoint(),
                                    onPressed: e => he(this, [e], void 0, (function*({
                                        type: e
                                    }) {
                                        yield(yield i(561)).default._loadBundle(), (yield i.e(494).then(i.bind(i, 121))).default.handleClick(e)
                                    })),
                                    onReachedMenuEnd: () => he(this, void 0, void 0, (function*() {
                                        yield(yield i(561)).default._loadBundle(), (yield i.e(494).then(i.bind(i, 634))).enableMotorProfile(!0)
                                    }))
                                }
                            }, {
                                prepend: !0
                            }), Q.subscribe((e => {
                                this.template.update({
                                    activeBreakpoint: e
                                })
                            })), this.template.host.setAttribute("data-acsb", "skipLinks"), this._enableSkipLinkTrap()
                        }))
                    }
                    _enableSkipLinkTrap() {
                        document.addEventListener("keydown", (e => {
                            this.shouldFocus(e) && (this.focus(), e.stopImmediatePropagation(), e.preventDefault())
                        }))
                    }
                    shouldFocus(e) {
                        var t;
                        const i = l.A.get("actions"),
                            n = null === (t = null == i ? void 0 : i.accessMode) || void 0 === t ? void 0 : t.enabled,
                            s = de.Ay.isOwnComponentRef(document.activeElement),
                            a = ue(document.activeElement);
                        return !(e.shiftKey || "Tab" !== e.key || n || s || a)
                    }
                    focus() {
                        return he(this, void 0, void 0, (function*() {
                            this.template.ref.querySelector("a").focus()
                        }))
                    }
                    static shouldLoad(e) {
                        const t = l.A.get("widget"),
                            i = null == t ? void 0 : t.hidden;
                        return E && !e.disableBgProcess && !i
                    }
                }
                const fe = JSON.parse('{"SR_TRIGGER_BUTTON":"Use Website In a Screen-Reader Mode"}');

                function ge(e) {
                    const {
                        t
                    } = (0, L.B)(fe);
                    (0, M.ob)(".screen-reader-button{position:absolute;width:200px;height:1px;margin-top:-1px;z-index:-1;border:0;top:0;left:0;overflow:hidden;outline:0;clip:rect(0 0 0 0)}.hide{display:none}");
                    const i = "screen-reader-button " + (e.isVisible ? "" : "hide");
                    return (0, T.h)("div", null, (0, T.h)("button", {
                        onClick: e.onPressed,
                        className: i,
                        "data-acsb-sr-only": "true",
                        "aria-pressed": e.isPressed
                    }, t("SR_TRIGGER_BUTTON")))
                }
                var be = function(e, t, i, n) {
                    return new(i || (i = Promise))((function(s, a) {
                        function r(e) {
                            try {
                                l(n.next(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function o(e) {
                            try {
                                l(n.throw(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function l(e) {
                            var t;
                            e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                e(t)
                            }))).then(r, o)
                        }
                        l((n = n.apply(e, t || [])).next())
                    }))
                };
                class me extends k {
                    constructor() {
                        super(...arguments), this.uiComponents = new K.A
                    }
                    initialize() {
                        return be(this, void 0, void 0, (function*() {
                            this.template = yield this.uiComponents.run({
                                template: ge,
                                data: {
                                    onPressed: () => be(this, void 0, void 0, (function*() {
                                        yield(yield i(561)).default._loadBundle(), (yield i.e(494).then(i.bind(i, 634))).toggleMotorProfile(), yield this.uiComponents.stop(this.template)
                                    })),
                                    isPressed: !1,
                                    isVisible: !0
                                }
                            }, {
                                prepend: !0
                            })
                        }))
                    }
                    static shouldLoad() {
                        const e = l.A.get("widget");
                        return E && !(null == e ? void 0 : e.hidden)
                    }
                }
                var Ae = i(941),
                    ve = function(e, t, i, n) {
                        return new(i || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }))
                    };
                class ye extends c.A {
                    stop(e) {
                        (null == e ? void 0 : e.parentElement) && e.parentElement.removeChild(e)
                    }
                    run(e) {
                        return ve(this, arguments, void 0, (function*({
                            content: e,
                            duration: t = 1e4
                        }) {
                            const i = document.createElement("span");
                            return Object.assign(i.style, ye.visibleToScreenReaderOnlyStyle), i.textContent = e, i.setAttribute("role", "alert"), i.setAttribute("data-acsb-sr-alert", "true"), i.setAttribute("data-acsb-sr-only", "true"), i.setAttribute("class", "acsb-sr-alert acsb-sr-only"), i.setAttribute("data-acsb-force-visible", "true"), document.body.prepend(i), yield ye.waitForDocumentFocus(), t && setTimeout((() => i.parentElement.removeChild(i)), t), i.focus(), i
                        }))
                    }
                    static waitForDocumentFocus() {
                        return ve(this, void 0, void 0, (function*() {
                            for (; !document.hasFocus();) yield(0, Ae.cb)(3e3)
                        }))
                    }
                }
                ye.visibleToScreenReaderOnlyStyle = {
                    position: "absolute",
                    width: "200px",
                    height: "1px",
                    "margin-top": "-1px",
                    "z-index": -1,
                    border: 0,
                    top: 0,
                    left: 0,
                    overflow: "hidden",
                    outline: 0
                };
                const Ee = ye;
                class we extends k {
                    initialize() {
                        return e = this, t = void 0, n = function*() {
                            (new Ee).run({
                                content: this.getGreetingContent()
                            })
                        }, new((i = void 0) || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }));
                        var e, t, i, n
                    }
                    getGreetingContent() {
                        const e = (new o.A).dictionary;
                        return A ? e.t("preloader.screenReaderGreetForMac") : v ? e.t("preloader.screenReaderGreetForTouchDevice") : e.t("preloader.screenReaderGreetForWindows")
                    }
                    static shouldLoad(e) {
                        var t;
                        const {
                            actions: i,
                            widget: n
                        } = l.A.getAll(), s = null == n ? void 0 : n.hidden;
                        return E && !s && !e.disableBgProcess && !(null === (t = null == i ? void 0 : i.accessMode) || void 0 === t ? void 0 : t.enabled)
                    }
                }
                class Fe extends Ee {
                    run(e) {
                        return t = this, i = arguments, s = function*({
                            content: e,
                            href: t
                        }) {
                            const i = document.createElement("a");
                            return Object.assign(i.style, Fe.visibleToScreenReaderOnlyStyle), i.textContent = e, i.setAttribute("href", t), i.setAttribute("target", "_blank"), i.setAttribute("rel", "noopener"), i.setAttribute("data-acsb", "sr-trigger"), i.setAttribute("data-acsb-sr-only", "true"), i.setAttribute("class", "acsb-sr-only"), document.body.prepend(i), i
                        }, new((n = void 0) || (n = Promise))((function(e, a) {
                            function r(e) {
                                try {
                                    l(s.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(s.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(t) {
                                var i;
                                t.done ? e(t.value) : (i = t.value, i instanceof n ? i : new n((function(e) {
                                    e(i)
                                }))).then(r, o)
                            }
                            l((s = s.apply(t, i || [])).next())
                        }));
                        var t, i, n, s
                    }
                }
                class _e extends k {
                    initialize() {
                        return e = this, t = void 0, n = function*() {
                            const e = new Fe,
                                t = (new o.A).dictionary;
                            e.run({
                                content: t.t("preloader.screenReaderFeedback"),
                                href: "https://accessibe.com/blog/knowledgebase/screen-reader-guide"
                            })
                        }, new((i = void 0) || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }));
                        var e, t, i, n
                    }
                    static shouldLoad(e) {
                        const t = l.A.get("widget");
                        return E && !e.disableBgProcess && !(null == t ? void 0 : t.hidden)
                    }
                }
                var ke = i(83),
                    Ce = i(289),
                    Se = i(921);
                const Be = i(78).A,
                    xe = i(766).A,
                    De = {
                        enable() {
                            if (!ke.A.expired) {
                                ke.A.wave = !0;
                                for (let e of document.querySelectorAll("[data-acsb], access-widget-ui")) e.remove();
                                xe.enableFast(o.A), Be.enableFast(o.A), xe.backupProcess(),
                                    function(e) {
                                        const t = Se.A.pick("html");
                                        if (t.id || (t.id = `acsb-${e}-contrast`), t.classList.add(`acsb-${e}-contrast`), navigator.userAgent.toLowerCase().includes("firefox") && !["dark", "light"].includes(e)) {
                                            let t = Se.A.pick(".acsb-ff-wrapper");
                                            t || (t = Se.A.elements.append(Se.A.elements.create("div", {
                                                class: "acsb-ff-wrapper"
                                            }), document.body));
                                            for (let e of Se.A.picks("body > *")) e.closest("[data-acsb], .acsb-ff-wrapper") || Se.A.elements.append(e, t);
                                            t.classList.add(`acsb-${e}-contrast`)
                                        }
                                        if (!["desaturate", "monochrome", "saturation", "contrast"].includes(e))
                                            for (let e of Se.A.picks("*")) {
                                                if (e.acsbContrastFixed || e.closest("[data-acsb]") || ["PICTURE", "BODY", "HTML", "STYLE", "SCRIPT", "BR", "IMG"].includes(e.tagName)) continue;
                                                e.acsbContrastFixed = !0;
                                                const t = e.getAttribute("style") || "";
                                                t && e.setAttribute("data-acsb-original-style", t);
                                                const i = Se.A.elements.style(e, "background-image"),
                                                    n = Se.A.elements.style(e, "background-color"),
                                                    s = Se.A.elements.style(e, "color"),
                                                    a = "#ffffff",
                                                    r = "#000000";
                                                if ("none" !== i && (Se.A.strings.inString(i, "-gradient") ? Se.A.elements.css(e, {
                                                        "background-image": "none"
                                                    }) : e.classList.add("acsb-bg-image")), Ce.A.isClickable(e) && e.setAttribute("data-acsb-clickable", "true"), xe.clickables._isButton(e) && e.classList.add("acsb-outline-contrast"), e.textContent.length > 0 && "rgba(0, 0, 0, 0)" !== Se.A.elements.style(e, "background-color")) e.classList.add("acsb-contrast"), n !== Se.A.elements.style(e, "background-color") && s !== Se.A.elements.style(e, "color") || e.setAttribute("style", `${t};background-color:${a}!important;color:${r}!important;`);
                                                else {
                                                    if (["I", "SPAN"].includes(e.tagName) && e.innerText.length < 1 && e.offsetWidth >= 16 && e.offsetHeight >= 16) {
                                                        e.classList.add("acsb-contrast"), n !== Se.A.elements.style(e, "background-color") && s !== Se.A.elements.style(e, "color") || e.setAttribute("style", `${t};background-color:${a}!important;color:${r}!important;`);
                                                        continue
                                                    }
                                                    for (let i of e.childNodes)
                                                        if (3 === i.nodeType && Se.A.strings.removeWhites(i.nodeValue).length > 0) {
                                                            e.classList.add("acsb-contrast"), n !== Se.A.elements.style(e, "background-color") && s !== Se.A.elements.style(e, "color") || e.setAttribute("style", `${t};background-color:${a}!important;color:${r}!important;`);
                                                            break
                                                        }
                                                }
                                                if (t && Se.A.strings.inString(t, "color")) {
                                                    let i;
                                                    for (let t of e.getAttribute("style").split(";")) t && "color" !== t.toLowerCase().substring(0, 5) && (i += `;${t}`);
                                                    e.setAttribute("style", i), e.setAttribute("acsb-original-style", t)
                                                }
                                            }
                                    }("light")
                            }
                        }
                    };
                var Te = i(278),
                    Le = function(e, t, i, n) {
                        return new(i || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }))
                    };
                class Ne extends k {
                    initialize() {
                        return Le(this, void 0, void 0, (function*() {
                            yield this._handleWave(), yield this._handleLighthouse()
                        }))
                    }
                    _handleLighthouse() {
                        return Le(this, void 0, void 0, (function*() {
                            const e = window.navigator.userAgentData;
                            if (!e) return;
                            const t = e.brands.find((e => "Lighthouse" === e.brand));
                            t && Ne.notifyAnalytics("lighthouse", {
                                version: t.version
                            })
                        }))
                    }
                    _handleWave() {
                        return Le(this, void 0, void 0, (function*() {
                            document.addEventListener("setExtensionUrl", (() => Le(this, void 0, void 0, (function*() {
                                "waveconfig" in window && (Ne.notifyAnalytics("wave"), De.enable(), delete window.acsb, delete window.acsbJS, delete window.AJS)
                            })))), window.location.href.includes("wave.webaim.org") && (0, (yield i.e(494).then(i.bind(i, 634))).handleWaveWebsite)()
                        }))
                    }
                    static notifyAnalytics(e, t = {}) {
                        this.$logger.collect(Object.assign({
                            message: "EXTERNAL-SCANNING-TOOL-DETECTED",
                            type: e
                        }, t), Te.A.LogLevels.Log, 100, !1)
                    }
                    static shouldLoad() {
                        const e = l.A.get("widget");
                        return !(null == e ? void 0 : e.hidden)
                    }
                }
                var Pe = function(e, t, i, n) {
                    return new(i || (i = Promise))((function(s, a) {
                        function r(e) {
                            try {
                                l(n.next(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function o(e) {
                            try {
                                l(n.throw(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function l(e) {
                            var t;
                            e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                e(t)
                            }))).then(r, o)
                        }
                        l((n = n.apply(e, t || [])).next())
                    }))
                };
                class Oe extends k {
                    initialize() {
                        return Pe(this, void 0, void 0, (function*() {
                            window[Oe.globalKey] = this, w.A.setConfigDomain(window.accessScanOptions.mockDomain)
                        }))
                    }
                    ready() {
                        var e;
                        null === (e = window.accessScanOptions.onReady) || void 0 === e || e.call(window)
                    }
                    hasCustomFooter() {
                        return Boolean(this.config.footerHtml)
                    }
                    hasConfigJsonInCDN() {
                        return Pe(this, void 0, void 0, (function*() {
                            return Boolean(yield w.A.get())
                        }))
                    }
                    static getLegacyAPI() {
                        return Pe(this, void 0, void 0, (function*() {
                            try {
                                yield(yield i(561)).default._loadBundle()
                            } catch (e) {
                                throw "accessWidgetAPI: Widget failed to load the bundle. [from loadBundle]"
                            }
                            return yield i.e(494).then(i.bind(i, 634))
                        }))
                    }
                    enableAccessMode() {
                        return Pe(this, void 0, void 0, (function*() {
                            if (!(yield this.hasConfigJsonInCDN())) return !1;
                            try {
                                yield(yield i(561)).default._loadBundle();
                                const e = yield i.e(494).then(i.bind(i, 634));
                                Oe.notifyAnalytics(), e.enableMotorProfile(!1)
                            } catch (e) {
                                throw "accesswidget: Failed to start accessMode."
                            }
                            return !0
                        }))
                    }
                    enableProfiles() {
                        return Pe(this, void 0, void 0, (function*() {
                            const e = (() => Pe(this, void 0, void 0, (function*() {
                                if (!(yield this.hasConfigJsonInCDN())) return !1;
                                const e = yield Oe.getLegacyAPI();
                                try {
                                    Oe.notifyAnalytics(), e.enableLightContrast(), e.enableMotorProfile(!1)
                                } catch (e) {
                                    throw "accessWidgetAPI: Failed to start profiles."
                                }
                                return !0
                            })))();
                            return Oe.raceWithTimeout(e, Oe.ENABLE_METHOD_TIMEOUT)
                        }))
                    }
                    static raceWithTimeout(e, t) {
                        let i;
                        const n = new Promise(((e, n) => {
                            i = setTimeout((() => {
                                n("accessWidgetAPI: Timeout exceeded while waiting for operation to complete.")
                            }), t)
                        }));
                        return Promise.race([e.finally((() => clearTimeout(i))), n])
                    }
                    static notifyAnalytics() {
                        this.$logger.collect({
                            message: "EXTERNAL-SCANNING-TOOL-DETECTED",
                            type: "accessScan"
                        }, Te.A.LogLevels.Log, 100, !1)
                    }
                    static shouldLoad() {
                        var e;
                        return Boolean(null === (e = window.accessScanOptions) || void 0 === e ? void 0 : e.enable)
                    }
                }
                Oe.globalKey = "accessScan", Oe.ENABLE_METHOD_TIMEOUT = 5e3;
                const Me = Oe;
                class Ie extends k {
                    initialize() {
                        return e = this, t = void 0, n = function*() {
                            window[Ie.globalKey] = this
                        }, new((i = void 0) || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }));
                        var e, t, i, n
                    }
                    ready() {
                        var e, t;
                        null === (t = null === (e = window.accessWidgetOptions) || void 0 === e ? void 0 : e.onReady) || void 0 === t || t.call(window)
                    }
                    showWidgetInterface() {
                        this.emit("show")
                    }
                    hideWidgetInterface() {
                        this.emit("hide")
                    }
                }
                Ie.globalKey = "accessWidget";
                const Re = Ie;
                class $e extends k {
                    initialize() {
                        return e = this, t = void 0, n = function*() {
                            const {
                                specifics: e
                            } = yield w.A.get();
                            if (e) {
                                const t = (new DOMParser).parseFromString(e, "text/html"),
                                    i = [...Array.from(t.body.children), ...Array.from(t.head.children)];
                                for (const e of i) {
                                    const t = document.createElement(e.tagName);
                                    t.textContent = e.textContent, document.body.appendChild(t)
                                }
                            }
                        }, new((i = void 0) || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }));
                        var e, t, i, n
                    }
                }
                var He = function(e, t, i, n) {
                    return new(i || (i = Promise))((function(s, a) {
                        function r(e) {
                            try {
                                l(n.next(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function o(e) {
                            try {
                                l(n.throw(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function l(e) {
                            var t;
                            e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                e(t)
                            }))).then(r, o)
                        }
                        l((n = n.apply(e, t || [])).next())
                    }))
                };
                class We extends c.A {
                    static start(e) {
                        return He(this, void 0, void 0, (function*() {
                            if (!this._shouldLoad()) return;
                            const t = yield Me.create(e), i = yield Re.create(e);
                            (yield this._haveLicense()) && (this.config = e, yield o.A.Bootstrap(e.language), yield l.A.Bootstrap(), this.controllers = yield this.createControllers(e), (this._haveEnabledActionInStorage() || this._shouldAutoShow()) && (yield this._loadBundle()), null == t || t.ready(), i.ready(), i.on("show", (() => this.controllers.button.show())), i.on("hide", (() => this.controllers.button.hide())), this.logCustomFooter())
                        }))
                    }
                    static logCustomFooter() {
                        if (this.config.footerHtml) {
                            const e = (new DOMParser).parseFromString(this.config.footerHtml, "text/html"),
                                t = Array.from(e.querySelectorAll("body *")).map((e => e.tagName.toLowerCase()));
                            if (!t.length) return;
                            this.$logger.collect({
                                message: "CUSTOM",
                                content: "Client is using custom footer with HTML content",
                                tagNames: t.reduce(((e, t) => (e[t] = "true", e)), {})
                            }, this.$logger.LogLevels.Debug)
                        }
                    }
                    static sanitize(e) {
                        return new p(e)
                    }
                    static _loadBundle() {
                        return He(this, void 0, void 0, (function*() {
                            yield(0, Ae.Hm)(), this.isLoaded || this.isLoading || (this.isLoading = new Promise((e => He(this, void 0, void 0, (function*() {
                                const t = yield i.e(494).then(i.bind(i, 98)), n = yield w.A.get();
                                yield(0, Ae.Hm)(), yield t.load(this.config, this.controllers, n), e()
                            })))), yield this.isLoading), this.isLoading && (yield this.isLoading, this.isLoaded = !0)
                        }))
                    }
                    static createControllers(e) {
                        return He(this, void 0, void 0, (function*() {
                            yield Ne.create(e);
                            const t = yield ee.create(e), i = yield pe.create(e);
                            yield _e.create(e);
                            const n = yield me.create(e), s = yield D.create(e);
                            return s.on("FocusSkipLinks", (() => He(this, void 0, void 0, (function*() {
                                yield i.focus()
                            })))), se.create(e), yield $e.create(e), yield we.create(e), {
                                button: t,
                                skipLinks: i,
                                screenReaderAccessModeToggle: n,
                                shortcuts: s
                            }
                        }))
                    }
                    static _shouldLoad() {
                        const e = Boolean(window.acsbJS) && window.acsbJS.initialized;
                        return e && this.$logger.collect("Widget was initialized multiple times", this.$logger.LogLevels.Log, 100), !(e || this._isUnsupportedBrowser())
                    }
                    static _haveLicense() {
                        return He(this, void 0, void 0, (function*() {
                            return Boolean(yield w.A.get())
                        }))
                    }
                    static _shouldAutoShow() {
                        var e;
                        const t = null === (e = l.A.get("widget")) || void 0 === e ? void 0 : e.autoshow;
                        return "#showacsb" === location.hash || t
                    }
                    static _haveEnabledActionInStorage() {
                        const e = l.A.get("actions");
                        return Boolean(e) && Boolean(Object.values(e).find((e => e.enabled)))
                    }
                }
                We.isLoaded = !1, We._isUnsupportedBrowser = () => g || b;
                const Ge = We
            },
            459: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => a
                });
                var n = i(759);
                class s extends n.A {
                    static get(e) {
                        return this.getAll()[e]
                    }
                    static getAll() {
                        return localStorage.acsbState ? JSON.parse(localStorage.acsbState) : {}
                    }
                    static delete(e) {
                        const t = this.getAll();
                        delete t[e], localStorage.acsbState = JSON.stringify(t)
                    }
                    static purgeState() {
                        const e = this.getAll();
                        e.date && Date.now() - Date.parse(e.date) > this.PURGE_DURATION && delete localStorage.acsbState
                    }
                    static overrideBlindProfileStorage() {
                        var e;
                        try {
                            const t = JSON.parse(localStorage.getItem("acsbState") || "{}");
                            (null === (e = t.actions) || void 0 === e ? void 0 : e.blindProfile) && (t.actions.motorProfile = t.actions.blindProfile, t.actions.motorProfile.options.action = "profilemotor", delete t.actions.blindProfile, localStorage.setItem("acsbState", JSON.stringify(t)))
                        } catch (e) {}
                    }
                    static Bootstrap() {
                        return e = this, t = void 0, n = function*() {
                            this.overrideBlindProfileStorage(), this.purgeState()
                        }, new((i = void 0) || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }));
                        var e, t, i, n
                    }
                }
                s.PURGE_DURATION = 6048e5;
                const a = s
            },
            759: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => s
                });
                var n = i(849);
                class s extends n.A {
                    static Bootstrap() {
                        return e = this, t = void 0, n = function*() {}, new((i = void 0) || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }));
                        var e, t, i, n
                    }
                }
            },
            535: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => h
                });
                var n = i(759),
                    s = i(849),
                    a = i(521),
                    r = i(715),
                    o = function(e, t, i, n) {
                        return new(i || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }))
                    };
                class l extends s.A {
                    constructor(e, t) {
                        super(), this.rtl = !1, this.languageCode = e, this.rtl = t
                    }
                    initialize() {
                        return o(this, void 0, void 0, (function*() {
                            yield this.updateMapping(), (0, a.setOnChange)((() => o(this, void 0, void 0, (function*() {
                                return this.updateMapping()
                            }))))
                        }))
                    }
                    updateMapping() {
                        return o(this, void 0, void 0, (function*() {
                            this.mapping = yield l._fetchDictionaryMap(this.languageCode), yield r.Ay.setDictionary(this.mapping["accesswidget-ui"] || this.mapping["accessWidget-UI"], this.languageCode)
                        }))
                    }
                    static _fetchDictionaryMap(e) {
                        return o(this, void 0, void 0, (function*() {
                            return yield(0, a.getDictionary)(e)
                        }))
                    }
                    t(e) {
                        return this.mapping[e] ? this.mapping[e].toString() : (this.$logger.error(`Failed to retrieve key from dictionary. [ key: ${e} ] `), e)
                    }
                }
                var c = i(459),
                    d = function(e, t, i, n) {
                        return new(i || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }))
                    };
                class u extends n.A {
                    constructor() {
                        return super(), u.instance ? u.instance : this
                    }
                    setLanguageCode(e) {
                        return d(this, void 0, void 0, (function*() {
                            this.languageCode = e, this.dictionary = new l(e, u.isRTL(e)), yield this.dictionary.initialize()
                        }))
                    }
                    static isRTL(e) {
                        return ["ar", "he", "ur", "ua"].indexOf(e) > -1
                    }
                    static Bootstrap() {
                        return d(this, arguments, void 0, (function*(e = u.DefaultLanguageCode) {
                            var t;
                            const i = null === (t = c.A.get("widget")) || void 0 === t ? void 0 : t.language;
                            u.instance = new u, yield u.instance.setLanguageCode(i || e)
                        }))
                    }
                }
                u.DefaultLanguageCode = "en", u.RTLLanguagesCodes = ["ar", "he", "ua"];
                const h = u
            },
            251: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => l
                });
                var n = i(303),
                    s = i(849),
                    a = i(941),
                    r = function(e, t, i, n) {
                        return new(i || (i = Promise))((function(s, a) {
                            function r(e) {
                                try {
                                    l(n.next(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function o(e) {
                                try {
                                    l(n.throw(e))
                                } catch (e) {
                                    a(e)
                                }
                            }

                            function l(e) {
                                var t;
                                e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                    e(t)
                                }))).then(r, o)
                            }
                            l((n = n.apply(e, t || [])).next())
                        }))
                    };
                class o extends s.A {
                    static isValidDomain(e) {
                        const t = /([0-9]{1,3}\.){3,4}/.test(e);
                        return e.length >= 3 && !t
                    }
                    static fetchConfig(e) {
                        return r(this, void 0, void 0, (function*() {
                            const t = yield fetch(this.getSiteConfigPathForDomain(e));
                            if (200 === t.status) return yield t.json()
                        }))
                    }
                    static getSiteConfigPathForDomain(e) {
                        return n.A.services.siteConfig.configURI.replace("{domain}", e)
                    }
                    static fetchConfigAsWildCard(e) {
                        return r(this, void 0, void 0, (function*() {
                            const t = yield fetch(n.A.services.siteConfig.wildcards), i = (yield t.json()).find((t => e.includes(t)));
                            if (i) {
                                const e = yield fetch(this.getSiteConfigPathForDomain(i));
                                return yield e.json()
                            }
                        }))
                    }
                    static get() {
                        return r(this, arguments, void 0, (function*(e = o.getConfigDomain()) {
                            if (!this.isValidDomain(e)) throw this.ErrorTypes.INVALID_DOMAIN_HOSTNAME;
                            return this.config || (this.config = (yield this.fetchConfig(e)) || (yield this.fetchConfigAsWildCard(e)), this.config || console.log(this.ErrorTypes.FAILED_TO_LOAD_CONFIG)), this.config
                        }))
                    }
                    static getConfigDomain() {
                        return this.manualConfigDomain || (0, a.Ep)()
                    }
                    static setConfigDomain(e) {
                        this.manualConfigDomain = e
                    }
                }
                o.ErrorTypes = {
                    FAILED_TO_LOAD_CONFIG: "acsb: This website is not registered or its license is expired.",
                    INVALID_DOMAIN_HOSTNAME: "The snipped is executed in unsupported environment."
                };
                const l = o
            },
            75: (e, t, i) => {
                "use strict";
                i.d(t, {
                    c: () => n
                });
                class n {
                    static updateAdoptedStyleSheets(e, t) {
                        const i = new CSSStyleSheet;
                        i.replaceSync(t);
                        const n = [...e.adoptedStyleSheets, i];
                        e.adoptedStyleSheets = n;
                        const s = this.boundStyles.size + 1,
                            a = {
                                style: i,
                                content: t,
                                id: s
                            };
                        return this.boundStyles.set(s, a), a
                    }
                    static insertStyleElement(e, t, i) {
                        const n = document.createElement("style");
                        Object.entries(i).forEach((([e, t]) => n.setAttribute(e, t))), n.textContent = t, "function" == typeof e ? e(n) : e.appendChild(n);
                        const s = this.boundStyles.size + 1,
                            a = {
                                style: n,
                                content: t,
                                id: s
                            };
                        return this.boundStyles.set(s, a), a
                    }
                    static insertStyle(e, {
                        adoptedStyleSheetsTarget: t = document,
                        insertStyleElementTarget: i = document.body,
                        insertStyleElementAttributes: n = {}
                    } = {}) {
                        let s = Array.from(this.boundStyles.values()).find((t => t.content === e));
                        return s ? (this.replaceStyleContent(e, s.style), s) : (s = this.isAdoptedStyleSheetsSupported ? this.updateAdoptedStyleSheets(t, e) : this.insertStyleElement(i, e, n), s)
                    }
                    static replaceStyleContent(e, t) {
                        t instanceof CSSStyleSheet ? t.replaceSync(e) : t.textContent = e
                    }
                    static removeStyle(e, {
                        adoptedStyleSheetsTarget: t = document
                    } = {}) {
                        e instanceof CSSStyleSheet ? t.adoptedStyleSheets = t.adoptedStyleSheets.filter((t => t !== e)) : e.parentElement.removeChild(e);
                        for (const [t, i] of this.boundStyles.entries()) i.style === e && this.boundStyles.delete(t)
                    }
                }
                n.boundStyles = new Map, n.isAdoptedStyleSheetsSupported = "adoptedStyleSheets" in Document.prototype && "replaceSync" in CSSStyleSheet.prototype
            },
            761: (e, t, i) => {
                "use strict";
                i.d(t, {
                    B6: () => a,
                    Er: () => o,
                    Zc: () => s,
                    rZ: () => l,
                    uE: () => n
                });
                const n = e => {
                        if (e.ownerDocument && e instanceof e.ownerDocument.defaultView.HTMLElement || e instanceof HTMLElement) return !0;
                        let t = e;
                        for (; null !== Object.getPrototypeOf(t);) {
                            if ("HTMLElement" === t.constructor.name) return !0;
                            t = Object.getPrototypeOf(t)
                        }
                        return !1
                    },
                    s = e => "style" in e && e.style instanceof CSSStyleDeclaration,
                    a = e => !!(n(e) && e instanceof HTMLInputElement),
                    r = e => "view" in e && e instanceof e.view.UIEvent,
                    o = e => r(e) && e instanceof e.view.MouseEvent,
                    l = e => r(e) && e instanceof e.view.FocusEvent
            },
            303: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => s,
                    f: () => n
                });
                const n = document.currentScript && /https:\/\/eu(\.|-)/i.test(document.currentScript.src),
                    s = {
                        version: "v1.16.23",
                        logger: {
                            level: parseInt("5"),
                            cloudFunctionURL: "https://accesswidget-log-receiver.acsbapp.com"
                        },
                        backendMachineURL: `https://${n?"eu-":""}backend.acsbapp.com`,
                        services: {
                            siteConfig: {
                                configURI: `https://${n?"eu-":""}cdn.acsbapp.com/config/{domain}/config.json`,
                                wildcards: `https://${n?"eu-":""}cdn.acsbapp.com/cache/app/wildcards.json`
                            }
                        }
                    }
            },
            921: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => l
                });
                const n = {
                        reload(e = 500) {
                            setTimeout((() => location.reload()), e)
                        },
                        getWinSize: () => (window.acsbWindowWidth || (window.acsbWindowWidth = window.innerWidth), window.acsbWindowHeight || (window.acsbWindowHeight = window.innerHeight), {
                            width: window.acsbWindowWidth,
                            height: window.acsbWindowHeight
                        }),
                        setStorage(e, t) {
                            try {
                                window.localStorage.setItem(e, t)
                            } catch (e) {}
                        },
                        delStorage(e) {
                            try {
                                window.localStorage.removeItem(e)
                            } catch (e) {}
                        },
                        getStorage(e) {
                            try {
                                return window.localStorage.getItem(e)
                            } catch (e) {}
                            return null
                        }
                    },
                    s = {
                        replace: (e, t, i) => e.replace(new RegExp(t, "g"), i),
                        inString: (e, t, i = !1) => !(!t || !e) && (e = "string" != typeof e ? String(e) : e, t = "string" != typeof t ? String(t) : t, e = e.replace(/(\r\n|\n|\r)/gm, " ").trim(), t = t.replace(/(\r\n|\n|\r)/gm, " ").trim(), i || (e = e.toLowerCase(), t = t.toLowerCase()), e === t || e.includes(t)),
                        removeChars(e, t, i) {
                            if (!e) return e;
                            i && (t = ["&", "?", '"', "'", "%", "”", "`", "#", "*", "{", "}", "|", "^", "$", "₪", "€"].concat(t));
                            for (let i of t) e = e.split(i).join("");
                            return e
                        },
                        removeWhites: e => e.replace(/\s/g, "").trim(),
                        random(e) {
                            let t = `a${Math.random().toString(36).substr(2,17)}`;
                            if (e) {
                                for (; t.length < e;) t += Math.random().toString(36).substr(2, 17);
                                t = t.substr(0, e)
                            }
                            return t
                        },
                        sentenceCase: e => (e = e.toLowerCase()).charAt(0).toUpperCase() + e.substr(1),
                        htmlDecode: e => l.elements.create("textarea", {}, e).value,
                        getOccures: (e, t) => e.split(t).length - 1,
                        isNumber: e => !(!e && 0 !== e || "number" != typeof e && !e.match(/^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/))
                    },
                    a = {
                        off(e, t) {
                            Array.isArray(e) || (e = [e]);
                            for (let i of window.EJSEventListeners)
                                for (let n of e)
                                    if (i.$el === n && i.event === t) {
                                        i.$el.removeEventListener(i.event, i.handler);
                                        break
                                    }
                            return e[0]
                        },
                        on(e, t, i) {
                            if (e) {
                                Array.isArray(e) || (e = [e]), window.EJSEventListeners || (window.EJSEventListeners = []), l.customEventHandler = n => {
                                    let s;
                                    const a = n.path ? n.path : "function" == typeof n.composedPath ? n.composedPath() : l.elements.composedPath(n.target);
                                    for (let t of a || []) {
                                        for (let i of e)
                                            if (t === i && 1 === t.nodeType) {
                                                s = t;
                                                break
                                            }
                                        if (s) break
                                    }
                                    if (!s)
                                        if ("click" === t && "function" != typeof n.target.click && n.target.parentElement) {
                                            let e = n.target.parentElement,
                                                t = !1;
                                            for (; !t;) {
                                                if ("function" == typeof e.click) {
                                                    t = !0;
                                                    break
                                                }
                                                if (!e.parentElement || "BODY" === e.parentElement.tagName) break;
                                                e = e.parentElement
                                            }
                                            s = t ? e : n.target
                                        } else s = n.target;
                                    n.acsbListenerEvent = !0, i.call(null, n, s)
                                };
                                for (let i of t.split(" "))
                                    for (let t of e) window.EJSEventListeners[window.EJSEventListeners.length] = {
                                        $el: t,
                                        event: i,
                                        handler: l.customEventHandler
                                    }, t.addEventListener(i, l.customEventHandler, !1);
                                return e[0]
                            }
                        },
                        trigger(e, t, i, n = !0) {
                            if (Array.isArray(e) || (e = [e]), !window.EJSCustomEvent) {
                                let e = (e, t) => {
                                    t = t || {
                                        bubbles: !1,
                                        cancelable: !1,
                                        detail: void 0
                                    };
                                    const i = document.createEvent("EJSCustomEvent");
                                    return i.initCustomEvent(e, t.bubbles, t.cancelable, t.detail), i
                                };
                                e.prototype = window.Event.prototype, window.EJSCustomEvent = e
                            }
                            for (let s of t.split(" "))
                                for (let t of e) t.dispatchEvent(new CustomEvent(s, {
                                    detail: i,
                                    bubbles: n
                                }));
                            return e[0]
                        },
                        prevent(e, t = !0) {
                            e.preventDefault(), t && (e.stopPropagation(), e.stopImmediatePropagation())
                        }
                    },
                    r = {
                        isElement: e => e && 1 === e.nodeType,
                        inDom: e => !(!e.parentElement && "HTML" !== e.tagName),
                        click(e) {
                            "function" == typeof e.click && e.click()
                        },
                        scroll(e, t, i) {
                            e.scrollTo({
                                left: 0,
                                top: t,
                                behavior: "smooth"
                            });
                            let n = setInterval((() => {
                                let s = Math.ceil(e === window ? window.scrollY : e.scrollTop) + l.utilities.getWinSize().height + 50;
                                (Math.ceil(s) >= t || Math.ceil(s) >= Math.ceil(document.body.scrollHeight)) && (clearInterval(n), "function" == typeof i && i.call(e, t))
                            }), 10)
                        },
                        css(e, t, i) {
                            if (!e) return e;
                            if (i) {
                                const i = {},
                                    n = e.style.cssText.replace(/\s+/g, " ").trim();
                                let s = "";
                                for (let e of n.split(";").filter((e => e))) {
                                    const t = e.split(":");
                                    i[t[0]] = t.slice(1).join(":")
                                }
                                for (let e in t) i[e] = `${t[e]}!important`;
                                for (let e in i) s = `${s}${e}:${i[e]};`;
                                e.setAttribute("style", s)
                            } else
                                for (let i in t) e.style[i] = t[i];
                            return e
                        },
                        append(e, t, i) {
                            return e ? (i ? t.childNodes[0] && t.childNodes[0].textContent.trim().length > 0 ? this.insert(e, t.childNodes[0]) : t.children[0] ? this.insert(e, t.children[0]) : t.appendChild(e) : t.appendChild(e), e) : e
                        },
                        insert: (e, t, i) => (i ? t.parentElement.insertBefore(e, t.nextSibling) : (document.body, t.parentElement.insertBefore(e, t)), e),
                        attrs(e, t, i) {
                            if (!e || e.length < 1) return e;
                            Array.isArray(e) || (e = [e]);
                            for (let n of e)
                                if (i)
                                    for (let e in t) n.removeAttribute(t[e]);
                                else
                                    for (let e in t)
                                        if ("class" === e && t[e] && t[e].length > 0)
                                            for (let i of t[e].split(" ")) i && i.length > 0 && n.classList.add(i);
                                        else n.setAttribute(e, t[e]);
                            return e
                        },
                        classes(e, t, i) {
                            if (!e || e.length < 1 || !t || t.length < 1) return e;
                            Array.isArray(e) || (e = [e]);
                            for (let n of t.split(" "))
                                for (let t of e) i ? t.classList.remove(n) : t.classList.add(n);
                            return e
                        },
                        remove(e) {
                            if (Array.isArray(e))
                                for (let t of e) t.remove();
                            else e.remove()
                        },
                        focused: () => document.hasFocus() ? document.activeElement.shadowRoot ? document.activeElement.shadowRoot.activeElement : document.activeElement : null,
                        composedPath(e) {
                            const t = [];
                            for (; e;) {
                                if (t.push(e), "HTML" === e.tagName) return t.push(document), t.push(window), t;
                                e = e.parentElement
                            }
                        },
                        width: e => "number" != typeof e.offsetWidth ? e.clientWidth : e.offsetWidth,
                        height: e => "number" != typeof e.offsetHeight ? e.clientHeight : e.offsetHeight,
                        text(e, t = !0, i = []) {
                            if (!e) return "";
                            let n = e.textContent || "";
                            for (let t of l.picks("script, noscript", e).concat(l.picks("style", e), l.picks("img", e))) n = n.replace(t.textContent, "");
                            if (i.length > 0)
                                for (let t of l.picks(i.join(","), e)) {
                                    let e = t.textContent;
                                    for (let i of l.picks("script", t).concat(l.picks("style", t), l.picks("img", t))) e = e.replace(i.textContent, "");
                                    n = n.replace(e, "")
                                }
                            return t ? n.replace(/\s+/g, " ").trim() : n
                        },
                        nodesText(e) {
                            if (!e) return "";
                            let t = "";
                            for (let i of e.childNodes) 3 === i.nodeType && (t = `${t} ${i.textContent.trim()}`);
                            return t.replace(/\s+/g, " ").trim()
                        },
                        style: (e, t) => window.getComputedStyle(e, null)[t] || "",
                        getPsuedoElements: e => ({
                            before: window.getComputedStyle(e, ":before"),
                            after: window.getComputedStyle(e, ":after")
                        }),
                        htmlToNodes(e) {
                            let t = [],
                                i = !1;
                            "<style>" !== e.trim().substr(0, 7) && "<script>" !== e.trim().substr(0, 8) || (i = !0), i && (e = `<span></span>${e}`);
                            for (let i of Array.from((new DOMParser).parseFromString(e, "text/html").body.childNodes)) 1 === i.nodeType && t.push(i);
                            return i && t.length > 0 && t.shift(), t
                        },
                        html: e => l.none(e) ? "" : e.outerHTML.replace(e.innerHTML, ""),
                        parents(e, t, i, n) {
                            if (!e || !e.nodeType || 1 !== e.nodeType || !e.parentElement) return e;
                            let s = e.parentElement,
                                a = [];
                            for (; s.parentElement && !["HTML", "BODY"].includes(s.tagName);) {
                                if (n) {
                                    if (s.matches(t)) break;
                                    a.push(s)
                                } else if (s.matches(t) && (a.push(s), i)) break;
                                s = s.parentElement
                            }
                            return a
                        },
                        next(e, t, i) {
                            const n = [];
                            for (;
                                (e = e.nextSibling) && !(l.elements.isElement(e) && (t ? e.matches(t) && n.push(e) : n.push(e), !i && n.length > 0)););
                            return n
                        },
                        previous(e, t, i) {
                            let n = [];
                            for (;
                                (e = e.previousSibling) && !(l.elements.isElement(e) && (t ? e.matches(t) && n.push(e) : n.push(e), !i && n.length > 0)););
                            return n
                        },
                        offsets(e, t) {
                            const i = e.getBoundingClientRect();
                            return t ? {
                                left: Math.round(i.left),
                                right: Math.round(window.innerWidth - e.offsetWidth - i.left),
                                top: Math.round(i.top),
                                bottom: Math.round(window.innerHeight - i.top)
                            } : {
                                left: Math.round(i.left),
                                right: Math.round(window.innerWidth - e.offsetWidth - i.left),
                                top: Math.round(window.pageYOffset + i.top),
                                bottom: Math.round(document.body.scrollHeight - window.pageYOffset + i.top)
                            }
                        },
                        copyAttrs(e, t) {
                            if (e && t) {
                                for (let i of e.attributes) t.setAttribute(i.name, i.value);
                                return t
                            }
                        },
                        create(e, t, i) {
                            let n = document.createElement(e);
                            return i && (n.innerHTML = i), l.elements.attrs(n, t)[0]
                        },
                        clone: (e, t) => e.cloneNode(t),
                        hasTextNodes(e) {
                            if (!e.childNodes) return;
                            let t = !1;
                            for (let i of e.childNodes)
                                if (3 === i.nodeType) {
                                    t = !0;
                                    break
                                }
                            return t
                        },
                        focus: e => e && "function" == typeof e.getAttribute ? (e.getAttribute("tabindex") ? e.focus() : (e.setAttribute("tabindex", "-1"), e.focus(), l.events.on(e, "focusout", (() => e.removeAttribute("tabindex")))), e) : e
                    },
                    o = {
                        getImageExt(e) {
                            if (!e || e.length < 1) return null;
                            const t = e.split("#")[0].split("?")[0].split(".").pop().toLowerCase();
                            return ["jpeg", "jpg", "png", "tiff", "gif", "svg", "webp", "bmp"].includes(t) ? t : null
                        },
                        getBrandName(e) {
                            if (!e || e.length < 3) return "";
                            let t;
                            t = (e = l.uris.getAbsolute(e)).includes("//") ? e.split("/")[2] : e.split("/")[0], t = t.split(":")[0].split("?")[0];
                            const i = t.split("."),
                                n = i.length;
                            n > 2 && (t = `${i[n-2]}.${i[n-1]}`, 2 === i[n - 2].length && 2 === i[n - 1].length && (t = `${i[n-3]}.${t}`));
                            const s = t.split(".");
                            return s.length > 0 && (t = s[0]), l.strings.sentenceCase(t)
                        },
                        getFileName(e, t) {
                            let i = l.arrays.filterBlanks(e.split("/")).pop().split("?")[0].split("#")[0];
                            return t && (i = l.strings.sentenceCase(i.replace(/-/g, " "))), i.split(".")[0]
                        },
                        getAbsolute(e, t) {
                            if ("string" != typeof e) return e;
                            let i = e.replace("\\", "/").replace(/\\\//g, "/").trim(),
                                n = window.location.hostname,
                                s = window.location.protocol,
                                a = i.split("."),
                                r = !1;
                            if ("string" == typeof t && (t.toLowerCase().includes("https://") ? s = "https:" : t.toLowerCase().includes("http://") && (s = "http:"), n = l.strings.removeChars(t, ["https://", "http://"]).trim().split("/")[0]), l.uris.isFileLink(i)) r = !0;
                            else
                                for (let e of [".php", ".htm", ".shtm", ".asp"])
                                    if (i.toLowerCase().includes(e)) {
                                        r = !0;
                                        break
                                    } return "/" === i.substr(0, 1) && "//" !== i.substr(0, 2) && (i = i.substr(1)), "http" === i.substr(0, 4) ? i : "/" === i || i.length < 1 ? `${s}//${i.substr(1)}${n}` : 1 === a.length || 2 === a.length && r ? `${s}//${n}${"/"===i.substr(0,1)?i:`/${i}`}` : "//" === i.substr(0, 2) ? s + i : `${s}//${i}`
                        },
                        getFormatted: (e, t = !1, i = !0) => e ? (e = "/" === (e = "//" === (e = e.split("#")[0].replace(/^https?:\/\//, "")).substring(0, 2) ? e.replace("//", "") : e).substring(0, 1) ? e.replace("/", "") : e, e = i ? e.split("?")[0] : e, t && (e = "www." === e.substring(0, 4) ? e.replace("www.", "") : e), l.strings.replace(e.trim(), " ", "%20")) : e,
                        getParam(e, t) {
                            let i = null;
                            const n = e.split("?");
                            if (!n[1]) return null;
                            for (let e of n[1].split("&")) {
                                const n = e.split("=");
                                if (n[0] && n[1] && n[0] === t) {
                                    i = n[1];
                                    break
                                }
                            }
                            return i ? decodeURIComponent(i) : i
                        },
                        setParams(e, t) {
                            if (!e || !t) return "";
                            let i = "";
                            for (let e in t) i += `&${e}=${t[e]}`;
                            return e.includes("?") || (i = i.replace("&", "?")), e + i
                        },
                        isUrlEncoded(e) {
                            try {
                                return (e = e || "") !== decodeURIComponent(e)
                            } catch (e) {
                                return !1
                            }
                        },
                        isUrlValid: e => "http" === e.substr(0, 4) || "//" === e.substr(0, 2) || "data:" !== e.substr(0, 5) && l.elements.create("input", {
                            type: "url",
                            value: e
                        }).checkValidity(),
                        isFileLink(e) {
                            let t = !1;
                            const i = ["png", "jpg", "jpeg", "gif", "bmp", "webp", "eps", "raw", "svg", "pdf", "tiff", "mp4", "css", "js", "json", "doc", "csv", "ppt", "txt", "psd", "ai"];
                            e = e.toLowerCase();
                            for (let n of i)
                                if (e.includes(`.${n}`)) {
                                    t = !0;
                                    break
                                }
                            return t
                        }
                    };
                window.AJS = {
                    utilities: n,
                    arrays: {
                        sort: (e, t) => e.sort(((e, i) => e[t] < i[t] ? -1 : e[t] > i[t] ? 1 : 0)),
                        filterBlanks: e => !e || e.length < 1 ? e : e.filter((e => e)),
                        equalValues: e => e.filter(((e, t, i) => !!i && e === i[0])).length === e.length
                    },
                    strings: s,
                    events: a,
                    elements: r,
                    uris: o,
                    pick(e, t = document) {
                        "#" !== e.substr(0, 1) || isNaN(parseInt(e.substr(1, 1))) || (e = `[id="${e.replace("#","")}"]`);
                        try {
                            return t.querySelector(e) || void 0
                        } catch (e) {
                            return
                        }
                    },
                    picks(e, t = document, i = !0) {
                        try {
                            if ("*" === e) return t = t === document ? document.body : t, Array.from(t.querySelectorAll(e));
                            "#" !== e.substr(0, 1) || isNaN(parseInt(e.substr(1, 2))) || (e = `[id="${e.replace("#","")}"]`);
                            let n = Array.from(t.querySelectorAll(e));
                            if (!i) {
                                const t = e.split(",");
                                if (t.length > 1) {
                                    const e = [];
                                    for (let i of t) {
                                        i = i.trim();
                                        for (let t of n) t.matches(i) && e.push(t)
                                    }
                                    n = e
                                }
                            }
                            return n
                        } catch (e) {
                            return []
                        }
                    },
                    fetch: (e, t, i = {}, n = "POST") => new Promise(((s, a) => {
                        const r = {
                            method: n,
                            body: "GET" === n ? null : JSON.stringify(t)
                        };
                        for (let e in i) r[e] = i[e];
                        return fetch(e, r).then((t => {
                            if (!t.ok) throw new Error(`Could not complete the request to ${e}`);
                            return t.text()
                        })).then((e => s(e))).catch((e => a(e)))
                    })),
                    none: e => !e || e.length && e.length < 1 || e.nodeType && 1 !== e.nodeType || "object" == typeof e && 1 !== e.nodeType && Object.keys(e).length < 1
                };
                const l = window.AJS
            },
            936: (e, t, i) => {
                "use strict";
                i.d(t, {
                    h: () => s
                });
                var n = i(83);
                i(278), i(921);
                const s = async (e = "", t = []) => {
                    let i = JSON.parse(localStorage.getItem("acsb:keep-alive") || "{}");
                    for (const [e, t] of Object.entries(i)) t + 864e5 < Date.now() && delete i[e];
                    const s = Object.keys(i),
                        a = [];
                    for (let e of t) s.includes(e) || (a.push(e), i[e] = Date.now());
                    localStorage.setItem("acsb:keep-alive", JSON.stringify(i)), a.length && await fetch(`${n.A.processEndpoint}/api/public/domains/${n.A.domain}/keepAlive/${e}`, {
                        body: JSON.stringify({
                            urls: a
                        }),
                        method: "PUT"
                    })
                }
            },
            78: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => h
                });
                var n = i(289),
                    s = i(345),
                    a = i(921),
                    r = i(916),
                    o = i(83),
                    l = i(936),
                    c = i(766);
                i(278);
                class d {
                    constructor(e, t, i) {
                        this.mainMenuElement = e, this.isRTL = i, this.AlternativeDropdownWidth = 300, this.originalDropdown = t, this.active = !1, this.keyNav = null;
                        const [n, s] = this.createAlternativeDropdown();
                        this.ulElement = n, this.shadowHost = s, window.addEventListener("scroll", this.onScroll.bind(this)), document.documentElement.addEventListener("focusout", this.onFocusedOut.bind(this))
                    }
                    onScroll() {
                        this.updateMenuPosition()
                    }
                    createAlternativeDropdown() {
                        const e = document.createElement("ul");
                        Object.assign(e.style, {
                            position: "fixed",
                            textAlign: this.isRTL ? "right" : "left",
                            bottom: "0",
                            width: `${this.AlternativeDropdownWidth}px`,
                            minWidth: `${this.AlternativeDropdownWidth}px`,
                            maxHeight: "100vh",
                            height: "400px",
                            background: "red",
                            fontSize: "16px",
                            zIndex: "9999999999",
                            maxWidth: "100%",
                            overflow: "hidden",
                            overflowY: "auto",
                            display: "none",
                            padding: "15px",
                            borderRadius: " 0 3px 3px 0",
                            margin: "0 auto 20px",
                            backgroundColor: "rgb(255 255 255 / 95%)",
                            color: "rgb(90 90 90)",
                            boxShadow: "2px 0px 5px 0px rgb(159 159 159 / 75%)",
                            boxSizing: "border-box"
                        });
                        for (const t of this.originalDropdown.querySelectorAll("a[href], button")) {
                            const i = d.concatTextAndAriaLabel(t);
                            if (!i) continue;
                            const n = document.createElement("li");
                            Object.assign(n.style, {
                                display: "block"
                            });
                            const s = document.createElement("a");
                            "A" === t.tagName && (s.href = t.href), s.tabIndex = 0, s.ariaLabel = t.ariaLabel, s.setAttribute("data-acsb-clickable", "true"), s.setAttribute("data-acsb-now-navigable", "true"), s.setAttribute("data-acsb-force-visible", "true"), Object.assign(s.style, {
                                display: "block",
                                padding: "10px",
                                textDecoration: "none",
                                borderBottom: "1px solid #cecece",
                                color: "rgb(90 90 90)"
                            }), s.onclick = e => {
                                ("BUTTON" === t.tagName || "A" === t.tagName && !t.href) && (e.preventDefault(), t.click())
                            }, s.onkeydown = e => {
                                "Space" === e.code && (e.preventDefault(), s.click())
                            }, s.innerHTML = i, n.append(s), e.appendChild(n)
                        }
                        e.setAttribute("data-acsb-now-navigable", "true"), e.setAttribute("data-acsb-force-visible", "true");
                        const t = document.createElement("div");
                        t.style.position = "fixed", t.style.setProperty("outline", "none", "important"), t.style.zIndex = "9999999999", t.style.top = "-50px", t.style.left = "-50px", t.style.setProperty("display", "block", "important"), t.attachShadow({
                            mode: "open"
                        }), t.setAttribute("data-acsb-now-navigable", "true"), t.setAttribute("data-acsb-force-visible", "true"), t.setAttribute("data-acsb", "true"), t.shadowRoot.append(e);
                        const i = new CSSStyleSheet;
                        i.replaceSync("\n      :focus {\n        outline: rgb(99, 154, 249) inset 3px !important;\n      }\n    "), t.shadowRoot.adoptedStyleSheets = [i];
                        const n = this.originalDropdown.closest("details");
                        return n ? n.after(t) : this.originalDropdown.after(t), [e, t]
                    }
                    onFocusedOut(e) {
                        this.active && setTimeout((() => {
                            this.active && document.activeElement !== this.shadowHost && this.hide()
                        }), 0)
                    }
                    static concatTextAndAriaLabel(e) {
                        let t = {
                            text: "",
                            ariaLabel: ""
                        };
                        return function e(i) {
                            if (i.nodeType !== Node.COMMENT_NODE && (i.nodeType !== Node.ELEMENT_NODE || !i.matches("script, option, noscript, style, br, link, meta, body")))
                                if (i.nodeType === Node.TEXT_NODE) t.text += i.nodeValue;
                                else if (i.nodeType === Node.ELEMENT_NODE)
                                if ("IMG" === i.tagName) {
                                    const e = i.getAttribute("aria-label");
                                    if (e) t.ariaLabel += e + " ";
                                    else {
                                        const e = i.getAttribute("alt");
                                        t.ariaLabel += e ? e + " " : ""
                                    }
                                } else
                                    for (const t of i.childNodes) e(t)
                        }(e), t.text = t.text.trim(), t.ariaLabel = t.ariaLabel.trim(), t.text || t.ariaLabel
                    }
                    getParentWithTransform(e) {
                        if (!e || e === document.body) return null;
                        const t = window.getComputedStyle(e).transform;
                        return t && "none" !== t ? e : this.getParentWithTransform(e.parentElement)
                    }
                    updateMenuPosition() {
                        const e = this.mainMenuElement.getBoundingClientRect();
                        let t = e.top + e.height,
                            i = this.isRTL ? e.left - this.AlternativeDropdownWidth + e.width : e.left;
                        const n = this.getParentWithTransform(this.originalDropdown);
                        if (n) {
                            const e = n.getBoundingClientRect();
                            t -= e.top, i -= e.left
                        }
                        i + this.AlternativeDropdownWidth > window.innerWidth && (i = window.innerWidth - this.AlternativeDropdownWidth), i < 0 && (i = 0), this.ulElement.style.top = t + "px", this.ulElement.style.left = i + "px"
                    }
                    show() {
                        this.ulElement.style.setProperty("display", "block", "important"), this.updateMenuPosition(), this.active = !0
                    }
                    hide() {
                        this.ulElement.style.setProperty("display", "none", "important"), this.active = !1
                    }
                }
                const u = {
                        rebinds: 0,
                        $lastFocused: void 0,
                        init() {
                            if (!(this.rebinds > 0 || r.A.widget.disableBgProcess && !o.A.wave)) {
                                document.body.classList.add("acsb-keynav"), this.navigation._fixWix(), this.navigation.process(), this.carousels.process(), this.menus.process(), this.hovers.process(), this.watcher.process(), this.overlays.init(), this.behaviors.init(), this.inlinePopups.init(), this.letterNav.init(), this.rebinds = this.rebinds > 0 ? this.rebinds : 1;
                                for (let e of Array.from(document.querySelectorAll(":root"))) e.style.setProperty("--acsb-keynav", "3px");
                                a.A.events.on(window, "beforeunload", (() => window.scrollTo(0, 0))), a.A.events.on(document, "focusin", (e => this.$lastFocused = e.target)), setTimeout((() => this.overlays.process(a.A.picks(this.overlays.allowedTags.join(",")).filter((e => !e.closest('[data-acsb-hidden="true"]'))), !1, !0)), 0)
                            }
                        },
                        async enable() {
                            if (!r.A.actions.accessMode || !r.A.actions.accessMode.enabled) return (await i.e(494).then(i.bind(i, 342))).default.enable("accessMode", !1);
                            this.init()
                        },
                        enableFast() {
                            this.init()
                        },
                        async disable() {
                            r.A.actions.accessMode && r.A.actions.accessMode.enabled && (await i.e(494).then(i.bind(i, 342))).default.disable("accessMode", !1, !1);
                            for (let e of a.A.picks("[data-acsb-tooltip]")) e.closest("[data-acsb]") || (await i.e(494).then(i.bind(i, 473))).default.tooltips.unbind(e);
                            document.body.classList.remove("acsb-keynav");
                            for (let e of Array.from(document.querySelectorAll(":root"))) e.style.setProperty("--acsb-keynav", "0")
                        },
                        rebind() {
                            this.rebinds = this.rebinds + 1, this.init()
                        },
                        menus: {
                            listMenuSelector: 'ul, ol, [data-acsb-m-menu="ul"]',
                            process() {
                                for (let e of a.A.picks('[role="navigation"]')) e.removeAttribute("role", "presentation");
                                for (let e of a.A.picks("li")) e.parentElement && !e.parentElement.acsbFixedMissingUl && "BODY" !== e.parentElement.tagName && (e.parentElement.acsbFixedMissingUl = !0, e.closest("ul, ol") || (e.parentElement.innerHTML = `<ul>${e.parentElement.innerHTML}</ul>`));
                                this._handleListMenus(), this._handleCMSMenus(), this._handleFakeMenus(), a.A.events.on(window, o.A.events.domChanged, (e => {
                                    const t = [];
                                    for (let i of e.detail.$elements) {
                                        const e = i.closest('[data-acsb-menu-root="true"]');
                                        e && t.push(e)
                                    }
                                    if (!(t.length < 1))
                                        for (let e of t) u.navigation.process(a.A.picks("*", e)), this.dropdown.process(e)
                                })), a.A.events.on(window, `${o.A.events.elementShow} ${o.A.events.domChanged}`, ((e, t) => {
                                    const i = [];
                                    if ("acsbDomChanged" === e.type)
                                        for (let t of e.detail.$elements) t.matches(this.listMenuSelector) && !t.acsbMenuBound && i.push(t);
                                    else
                                        for (let e of a.A.picks(this.listMenuSelector, t) || [t.closest(this.listMenuSelector)]) e.acsbMenuBound || i.push(e);
                                    if (i.length > 0) {
                                        const e = [].concat(i);
                                        for (let t of i)
                                            for (let i of a.A.picks("*", t)) e.push(i);
                                        u.navigation.process(e), setTimeout((() => {
                                            this._handleListMenus()
                                        }), 0)
                                    }
                                })), a.A.events.on(document, "focusin mousedown mouseup", (e => {
                                    const t = a.A.picks('[data-acsb-dropdown][data-acsb-hidden="false"]'),
                                        i = a.A.pick('[data-acsb-dd-focused="true"]');
                                    if (i && !e.target.closest('[data-acsb-dd-focused="true"]') && i.removeAttribute("data-acsb-dd-focused"), !(t.length < 1))
                                        for (let i of t) {
                                            const t = i.closest('[data-acsb-menu-root="true"]');
                                            t.contains(a.A.elements.focused()) || t.contains(e.target) || this.dropdown._closeDropdown(i, t, a.A.pick('[data-acsb-menu-root-link="true"]', t))
                                        }
                                }))
                            },
                            getAll() {
                                const e = {},
                                    t = [];
                                0 === u.rebinds && (u.navigation.process(), u.menus.process());
                                for (let t of a.A.picks('[role="navigation"]'))
                                    if (!t.closest("[data-acsb]"))
                                        for (let i of a.A.picks("a", t)) {
                                            const t = n.A.getShownText(i),
                                                s = i.getAttribute("href"),
                                                a = {
                                                    text: t,
                                                    href: s,
                                                    $el: i
                                                };
                                            !s || s.length < 1 || (e[0] || (e[0] = {
                                                items: []
                                            }), t.length > 1 && e[0].items.push(a))
                                        }
                                for (let i in e) e[i].items.length > 0 && t.push(e[i]);
                                return t
                            },
                            _handleListMenus() {
                                for (let e of a.A.picks(this.listMenuSelector)) {
                                    if (e.acsbMenuBound || e.closest('[data-acsb-hidden="true"]')) continue;
                                    if (e.acsbMenuBound = !0, e.closest('[data-acsb], [data-acsb-carousel="true"], [data-acsb-menu="ul"]') || !this._isMenu(e)) continue;
                                    a.A.elements.attrs(a.A.elements.parents(e, 'nav, [role="navigation"]'), {
                                        role: "presentation"
                                    });
                                    let t = "true" === e.getAttribute("data-acsb-fake-menu") || "BODY" === e.parentElement.tagName ? e : e.parentElement;
                                    for (let i of a.A.picks('[role="navigation"], h1, table, ul, ol', t))
                                        if (!i.closest('[data-acsb-hidden="true"]') && i !== e && !e.contains(i)) {
                                            t = e;
                                            break
                                        }
                                    e.setAttribute("data-acsb-menu", "ul"), t.setAttribute("role", "navigation"), a.A.elements.attrs(a.A.picks('[role="menu"], [role="menubar"], [role="menuitem"], [role="navigation"]', t), ["role"], !0), a.A.elements.attrs(a.A.picks("[aria-expanded]", t), ["aria-expanded"], !0), a.A.elements.attrs(a.A.picks("[aria-haspopup]", t), ["aria-haspopup"], !0), a.A.elements.attrs(a.A.picks("ul, ol", e), {
                                        "data-acsb-menu": "ul"
                                    });
                                    for (let t of a.A.picks('li, [data-acsb-m-menu="li"]', e)) {
                                        if (a.A.elements.parents(t, "li", !0).length > 0) continue;
                                        const e = this._getMenuItem(t);
                                        if (e) {
                                            if ("LABEL" === e.tagName && (0 !== e.tabIndex || "true" === e.getAttribute("data-acsb-force-unnavigable"))) {
                                                let t = a.A.pick("input", e);
                                                !t && e.nextElementSibling && "INPUT" === e.nextElementSibling.tagName && (t = e.nextElementSibling), !t && e.previousElementSibling && "INPUT" === e.previousElementSibling.tagName && (t = e.previousElementSibling), t && (a.A.elements.remove(t), a.A.elements.attrs(e, ["data-acsb-force-unnavigable", "data-acsb-custom-control"], !0), u.navigation.setNavigable(e))
                                            }
                                            if (a.A.elements.attrs(t, ["role", "aria-haspopup", "aria-expanded"], !0), t.setAttribute("data-acsb-menu", "li"), e.removeAttribute("data-acsb-m-menu"), e.setAttribute("data-acsb-menu", "a"), ("A" !== e.tagName || c.A.clickables._isButton(e)) && e.setAttribute("role", "button"), e.getAttribute("data-acsb-navigable") || u.navigation.process([e]), a.A.elements.parents(t, '[data-acsb-menu="li"], li').length < 1) {
                                                const i = a.A.picks('[data-acsb-now-navigable="true"]:not([data-acsb-menu="a"])', t);
                                                t.setAttribute("data-acsb-menu-root", "true"), e.setAttribute("data-acsb-menu-root-link", "true"), 1 === i.length && n.A.getShownText(i[0]).length < 1 && (u.navigation.setHidden(i[0]), u.navigation.setUnnavigable(i[0]), i[0].setAttribute("data-acsb-force-hidden", "true"), i[0].setAttribute("data-acsb-force-unnavigable", "true")), a.A.events.on(e, "keydown", (t => {
                                                    27 !== t.which || e.closest('[data-acsb-menu-focused="true"]') || e.blur()
                                                })), this.dropdown.process(t)
                                            }
                                        }
                                        t.removeAttribute("data-acsb-m-menu")
                                    }
                                    const i = a.A.picks('[data-acsb-menu-root-link="true"][data-acsb-now-navigable="true"]', e);
                                    i.length >= 3 && i[0].setAttribute("data-acsb-tooltip", s.A.get("MENUBAR_NAVIGATION_EXPLANATION")), a.A.events.on(i, "keydown", (e => {
                                        [37, 39].includes(e.which) && (a.A.events.prevent(e), u.navigation.bindArrowNav(a.A.picks('[data-acsb-menu-root-link="true"][data-acsb-now-navigable="true"]', e.target.closest('[data-acsb-menu="ul"]')), "left-right", e.which))
                                    })), e.removeAttribute("data-acsb-m-menu")
                                }
                            },
                            _handleCMSMenus() {
                                for (let e of a.A.picks(".Header-nav")) {
                                    a.A.elements.attrs(e, {
                                        role: "navigation",
                                        "data-acsb-sqs-menu": "true",
                                        "data-acsb-menu": "ul"
                                    });
                                    for (let t of a.A.picks(".Header-nav-item--folder", e)) {
                                        const e = a.A.pick(".Header-nav-folder-title", t),
                                            i = a.A.pick(".Header-nav-folder", t);
                                        a.A.elements.attrs(e, {
                                            "aria-haspopup": "true",
                                            "aria-expanded": "false"
                                        }), u.navigation.setHidden(i), i.classList.add("acsb-dropdown"), a.A.events.on(t, "focusin click", (i => {
                                            "focusin" !== i.type || i.target !== t && i.target !== e || (e.setAttribute("aria-expanded", "true"), t.classList.add("acsb-active")), "click" !== i.type || t.matches(".acsb-active") || (a.A.events.prevent(i), e.setAttribute("aria-expanded", "true"), t.classList.add("acsb-active"))
                                        }))
                                    }
                                    a.A.events.on(e, "keydown keyup", (t => {
                                        if (27 === t.which && a.A.events.prevent(t), "keydown" === t.type) {
                                            if (27 === t.which) {
                                                const e = t.target.closest(".acsb-active");
                                                e && (a.A.elements.focus(a.A.pick('[aria-haspopup="true"]', e)).setAttribute("aria-expanded", "false"), e.classList.remove("acsb-active"))
                                            }
                                            37 !== t.which && 39 !== t.which || (a.A.events.prevent(t), u.navigation.bindArrowNav(a.A.picks('.Header-nav-item[data-acsb-now-navigable="true"], .Header-nav-folder-title[data-acsb-now-navigable="true"]', e), "left-right", t.which)), 40 === t.which && t.target.matches(".Header-nav-folder-title") && a.A.picks('.acsb-active .acsb-dropdown [data-acsb-now-navigable="true"]', e).length < 1 ? (a.A.events.prevent(t), t.target.blur(), t.target.focus()) : 40 !== t.which && 38 !== t.which || (a.A.events.prevent(t), u.navigation.bindArrowNav(a.A.picks('.acsb-active .acsb-dropdown [data-acsb-now-navigable="true"]', e), "up-down", t.which))
                                        }
                                    }))
                                }
                                a.A.events.on(document, "focusin", (e => {
                                    for (let t of a.A.picks('[role="navigation"] .acsb-active')) e.target.closest(".acsb-active") !== t && t.classList.remove("acsb-active")
                                }));
                                for (let e of a.A.picks("[data-dropdown-rel]")) {
                                    const t = a.A.pick(`[data-dropdown="${e.getAttribute("data-dropdown-rel")}"]`);
                                    t && (a.A.elements.attrs(t, {
                                        class: "acsb-hidden"
                                    }), a.A.elements.attrs(e, {
                                        "aria-haspopup": "true",
                                        "aria-expanded": "false"
                                    })), a.A.events.on(e, "click", (e => {
                                        a.A.events.prevent(e), t.classList.add("acsb-block"), t.classList.remove("acsb-hidden")
                                    })), a.A.events.on(t, "click", (() => {
                                        t.classList.remove("acsb-block"), t.classList.add("acsb-hidden")
                                    }))
                                }
                                for (let e of a.A.picks("#SITE_HEADER nav")) {
                                    e.setAttribute("data-acsb-menu", "ul");
                                    for (let t of a.A.picks('[aria-haspopup="true"]', e)) t.setAttribute("aria-expanded", "false"), a.A.events.on(t, "focusin", (() => t.setAttribute("aria-expanded", "true"))), a.A.events.on(t, "focusout", (() => t.setAttribute("aria-expanded", "false")))
                                }
                            },
                            _handleFakeMenus(e) {
                                e || (e = a.A.picks("nav, div, header"));
                                for (let t of e) {
                                    if (t.closest('[data-acsb], [data-acsb-hidden="true"]') || t.acsbFakeMenuBound || !n.A.isVisible(t)) continue;
                                    t.acsbFakeMenuBound = !0;
                                    const e = this._getFakeMenu(t);
                                    if (!e) {
                                        t.acsbPossibleFakeMenu && a.A.events.on(t, o.A.events.elementShow, (e => {
                                            setTimeout((() => {
                                                e.detail.$el.acsbFakeMenuBound = !1, this._handleFakeMenus([e.detail.$el])
                                            }), 0)
                                        }));
                                        continue
                                    }
                                    const i = a.A.picks('[data-acsb-clickable="true"][data-acsb-now-navigable="true"]', t).filter((e => n.A.getShownText(e).length > 0));
                                    a.A.elements.attrs(e, {
                                        "data-acsb-fake-menu": "true",
                                        "data-acsb-m-menu": "ul"
                                    }), a.A.elements.attrs(i, {
                                        "data-acsb-m-menu": "a"
                                    });
                                    for (let e of i) {
                                        const t = e.closest('[data-acsb-fake-menu="true"]'),
                                            i = e.closest('[data-acsb-hover="true"]');
                                        if (t && (t.acsbMenuBound = !1), i && t && t.contains(i)) i.setAttribute("data-acsb-m-menu", "li");
                                        else {
                                            let t, i = e.parentElement;
                                            for (; i;) {
                                                if (a.A.picks('[data-acsb-m-menu="a"]', i).length > 1) {
                                                    i = null;
                                                    break
                                                }
                                                t = i, i = i.parentElement
                                            }
                                            t && t.setAttribute("data-acsb-m-menu", "li")
                                        }
                                    }
                                    "li" === e.getAttribute("data-acsb-m-menu") && e.parentElement && (a.A.elements.attrs(e.parentElement, ["data-acsb-fake-menu", "data-acsb-m-menu"], !0), a.A.elements.attrs(e.parentElement, {
                                        "data-acsb-fake-menu": "true",
                                        "data-acsb-m-menu": "ul"
                                    }))
                                }
                                for (let e of a.A.picks("nav")) {
                                    if (e.acsbFakeMenuBoundNav) continue;
                                    if (e.acsbFakeMenuBoundNav = !0, n.A.getShownText(e).length < 1 || a.A.pick('[role="navigation"], [data-acsb-fake-menu="true"]', e) || e.closest('[role="navigation"],[data-acsb-hidden="true"], [data-acsb-carousel="true"], [data-acsb-fake-menu="true"]')) continue;
                                    const t = a.A.picks('a[data-acsb-now-navigable="true"]', e);
                                    t.length < 3 || (e.setAttribute("role", "navigation"), a.A.elements.attrs(t[0], {
                                        "data-acsb-tooltip": s.A.get("MENUBAR_NAVIGATION_EXPLANATION")
                                    }), a.A.events.on(e, "keydown", (t => {
                                        [37, 39].includes(t.which) && (a.A.events.prevent(t), u.navigation.bindArrowNav(a.A.picks('[data-acsb-now-navigable="true"]', e), "left-right", t.which))
                                    })))
                                }
                                this._handleListMenus()
                            },
                            _getMenuItem(e) {
                                let t;
                                if (e.childNodes.length > 0 && e.childNodes[0].nodeValue && a.A.strings.removeWhites(e.childNodes[0].nodeValue).length > 0) {
                                    const i = a.A.elements.create("span");
                                    a.A.elements.append(e.childNodes[0], i), a.A.elements.append(i, e, !0), t = i
                                }
                                for (let i of a.A.picks('[data-acsb-now-navigable="true"]', e))
                                    if (!(i.closest('[data-acsb-hidden="true"]') || n.A.getShownText(e).length < 1) && ["A", "SPAN", "BUTTON"].includes(i.tagName)) {
                                        t = i;
                                        break
                                    }
                                if (!t && n.A.isVisible(e)) {
                                    const i = n.A.getShownText(e);
                                    for (let s of a.A.picks("*", e))
                                        if (n.A.isVisible(s) && a.A.strings.inString(i, a.A.elements.text(s))) {
                                            t = s;
                                            break
                                        }
                                }
                                return t
                            },
                            _getFakeMenu(e) {
                                if (e.offsetHeight > 100 || n.A.getShownText(e).length < 1 || !["NAV", "HEADER", "DIV"].includes(e.tagName) || e.closest('[role="navigation"]') && "NAV" !== e.tagName || e.closest('[data-acsb], [data-acsb-menu="ul"], [data-acsb-carousel="true"], [data-acsb-hover], [data-acsb-menu="ul"], form:not([data-acsb-wrapper-form="true"])') || a.A.pick('header, [role="navigation"], [data-acsb-carousel="true"], [data-acsb-menu="ul"]', e)) return null;
                                if ("DIV" === e.tagName) {
                                    let t = e.outerHTML,
                                        i = ["data-acsb-now-navigable", "data-acsb-navigable", "data-acsb-force-unnavigable", "data-acsb-menu", "navigate"];
                                    for (let e of i) t = a.A.strings.replace(t, e, "");
                                    if (!a.A.strings.inString(t, "menu") && !a.A.strings.inString(t, "nav") && !a.A.strings.inString(t, "header")) return null
                                }
                                if (e.closest('[data-acsb-hidden="true"]')) return e.acsbPossibleFakeMenu = !0;
                                const t = a.A.picks('[data-acsb-clickable="true"][data-acsb-now-navigable="true"]', e),
                                    i = [];
                                let s = !1,
                                    r = !1,
                                    o = !0;
                                if (t.length < 3) return null;
                                for (let e of t) {
                                    if (i.includes(e.href)) {
                                        o = !1;
                                        break
                                    }
                                    if (a.A.elements.text(e).length > 30) {
                                        r = !0;
                                        break
                                    }
                                    e.href && e.href.length > 0 && i.push(e.href)
                                }
                                if (!o) return null;
                                for (let t of a.A.picks("img, iframe, form, h1, h2, h3", e))
                                    if (n.A.isVisible(t)) {
                                        s = !0;
                                        break
                                    }
                                if (s) return null;
                                let l = t[0].parentElement;
                                if (!["NAV", "HEADER"].includes(e.tagName)) {
                                    for (; l && !(a.A.picks('[data-acsb-clickable="true"][data-acsb-now-navigable="true"]', l).length > 1);) l = l.parentElement;
                                    ["OL", "UL"].includes(l.tagName) && (l = l.parentElement)
                                }
                                let c, d = 0,
                                    u = !1;
                                for (let e of l.childNodes) 3 === e.nodeType && d > 0 && (c = d), "A" === e.tagName && (u = !0), d++;
                                return !n.A.getShownText(l) || u && c > 0 ? null : l
                            },
                            _isMenu(e) {
                                if ("true" === e.getAttribute("data-acsb-force-not-menu")) return !1;
                                if ("true" === e.getAttribute("data-acsb-fake-menu")) return !0;
                                if (n.A.getShownText(e).length < 1 || !a.A.pick("a", e)) return !1;
                                if (e.closest('[data-acsb], [data-acsb-carousel="true"], [data-acsb-navigation="true"]')) return !1;
                                if (e.closest('form:not([data-acsb-wrapper-form="true"])')) return !1;
                                const t = a.A.pick("li", e);
                                if (t && "list-item" === a.A.elements.style(t, "display") && "flex" === a.A.elements.style(e, "display") && !a.A.strings.inString(a.A.elements.style(t, "list-style"), "none")) return !1;
                                let i = a.A.picks('[data-acsb-clickable="true"][data-acsb-now-navigable="true"]', e);
                                for (let e of i) {
                                    const t = a.A.pick("img", e);
                                    if (t && t.offsetWidth > 50 && t.offsetHeight > 50 && n.A.isVisible(t)) return !1;
                                    if (n.A.getShownText(e).split(" ").length >= 7) return !1;
                                    const i = a.A.pick("h1, h2, h3, h4, h5, h6, table, form", e);
                                    if (i && n.A.isVisible(i)) return !1
                                }
                                if (i.length > 1 && e.closest('nav, header, .menu, .nav, .header, [role="navigation"], [role="menu"], [role="menubar"], [data-acsb-m-menu="true"]')) return !0;
                                let s = e.getAttribute("class");
                                if (i.length > 1 && (a.A.strings.inString(s, "menu") || a.A.strings.inString(s, "nav"))) return !0;
                                let r = a.A.picks('li:not([data-acsb-hidden="true"])', e);
                                if ("UL" === e.tagName && r.length > 1 && (a.A.strings.inString(a.A.elements.html(e.parentElement), "menu") || a.A.strings.inString(a.A.elements.html(e.parentElement), "nav"))) return !0;
                                if (i.length > 1 && i.length === r.length) {
                                    let e = !1,
                                        t = !1;
                                    for (let t of i)
                                        if (!(a.A.elements.text(t).length > 0)) {
                                            e = !0;
                                            break
                                        }
                                    if (!e)
                                        for (let e of r) {
                                            if (a.A.elements.nodesText(e).length > 0) {
                                                t = !0;
                                                break
                                            }
                                            for (let i of a.A.picks("p, img, h1, h2, h3, h4, h5, h6", e))
                                                if (!(i.closest('[data-acsb-hidden="true"]') || "IMG" === i.tagName && i.offsetWidth >= 75 && i.offsetHeight >= 75)) {
                                                    t = !0;
                                                    break
                                                }
                                        }
                                    if (!e && !t) return !0
                                }
                                return !1
                            },
                            dropdown: {
                                opening: !1,
                                closing: !1,
                                process(e) {
                                    if ("true" !== e.getAttribute("data-acsb-menu-root") || a.A.pick("[data-acsb-dropdown]", e)) return;
                                    const t = a.A.pick('[data-acsb-menu-root-link="true"]', e),
                                        i = this._getDropdown(e);
                                    if (!i) return;
                                    const n = a.A.picks('[data-acsb-menu="ul"]', e),
                                        r = n.length > 1;
                                    if (r) {
                                        const n = "rtl" === a.A.elements.style(t.parentElement, "direction"),
                                            r = new d(e, i, n);
                                        this._bindBehaviorsAlternativeDropdown(r.ulElement, e, t, r, i), a.A.elements.attrs(r.shadowHost, {
                                            "data-acsb-dropdown": a.A.strings.random()
                                        }), a.A.elements.attrs(r.shadowHost, {
                                            role: "region",
                                            "aria-label": s.A.get("SUBMENU")
                                        }), i.classList.add("acsb-hidden")
                                    }
                                    if (!r && this._bindBehaviors(i, e, t), e.setAttribute("data-acsb-dropdown-container", "true"), a.A.elements.attrs(t, {
                                            "aria-haspopup": "true",
                                            "aria-expanded": "false"
                                        }), r || (a.A.elements.attrs(i, {
                                            class: "acsb-hidden",
                                            "data-acsb-dropdown": a.A.strings.random()
                                        }), a.A.elements.attrs(i, {
                                            role: "region",
                                            "aria-label": s.A.get("SUBMENU")
                                        })), !r) {
                                        if (n.length > 1) {
                                            e.setAttribute("data-acsb-flatten-menu", "true");
                                            for (let e of n)
                                                for (let t of a.A.elements.parents(e, "[data-acsb-dropdown]", !1, !0)) t !== i && t.classList.add("acsb-flat-submenu-wrap")
                                        }
                                        a.A.events.on(e, "mouseenter mouseleave", (e => {
                                            this.opening || this.closing || ("mouseenter" === e.type ? i.classList.remove("acsb-hidden") : i.classList.add("acsb-hidden"))
                                        })), a.A.events.on(t, "focus", (() => {
                                            i.matches(".acsb-hidden") && !this.closing && this._openDropdown(i, e, t)
                                        })), a.A.elements.focused() === t && i.matches('[data-acsb-hidden="true"]') && this._openDropdown(i, e, t)
                                    }
                                },
                                _getDropdown(e) {
                                    let t;
                                    for (let i of a.A.picks('[data-acsb-hidden="true"]:not([data-acsb-force-not-dropdown=true])', e))
                                        if (!i.closest("[data-acsb-dropdown]") && ["DIV", "SECTION", "NAV", "UL", "OL", "SPAN"].includes(i.tagName) && a.A.pick('a, form, input, [role="button"], iframe', i)) {
                                            t = i;
                                            break
                                        }
                                    return !t && "LI" === e.tagName && e.nextElementSibling && "LI" !== e.nextElementSibling.tagName && !n.A.isVisible(e.nextElementSibling) && !e.nextElementSibling.closest("[data-acsb-dropdown]") && ["DIV", "SECTION", "NAV", "UL", "OL", "SPAN"].includes(e.nextElementSibling.tagName) && a.A.pick('a, form, input, [role="button"], iframe', e.nextElementSibling) && (t = e.nextElementSibling, a.A.elements.append(e.nextElementSibling, e)), t
                                },
                                _bindBehaviors(e, t, i) {
                                    if ("A" === i.tagName && "button" !== i.getAttribute("role")) {
                                        let t, n = !1;
                                        for (let s of a.A.picks("a", e))
                                            if (!t && a.A.elements.text(s).length > 0 && (t = s), s.href === i.href) {
                                                n = !0;
                                                break
                                            }
                                        if (!n)
                                            if (t) {
                                                const e = a.A.elements.clone(t);
                                                e.textContent = a.A.elements.text(i), e.href = i.href, a.A.elements.insert(e, t)
                                            } else a.A.elements.append(a.A.elements.create("a", {
                                                href: i.href
                                            }, a.A.elements.text(i)), e, !0)
                                    }
                                    a.A.events.on(t, "keydown click", (n => {
                                        if (this.opening) return a.A.events.prevent(n);
                                        u.navigation.process(a.A.picks("*", t)), 27 !== n.which || e.matches(".acsb-hidden") || (this.closing = !0, a.A.events.prevent(n), i.blur(), this._closeDropdown(e, t, i), setTimeout((() => {
                                            a.A.elements.focus(i), this.closing = !1
                                        }), 50)), 38 !== n.which && 40 !== n.which || (a.A.events.prevent(n), e.matches(".acsb-hidden") ? this._openDropdown(e, t, i) : u.navigation.bindArrowNav(a.A.picks('[data-acsb-now-navigable="true"]', e), "up-down", n.which)), 13 !== n.which && "click" !== n.type || n.target.closest("[data-acsb-dropdown]") || (a.A.events.prevent(n), e.matches(".acsb-hidden") ? this._openDropdown(e, t, i) : this._closeDropdown(e, t, i))
                                    }))
                                },
                                _bindBehaviorsAlternativeDropdown(e, t, i, n, s) {
                                    if ("A" === i.tagName && "button" !== i.getAttribute("role")) {
                                        let t, n = !1;
                                        for (let s of a.A.picks("a", e))
                                            if (!t && a.A.elements.text(s).length > 0 && (t = s), s.href === i.href) {
                                                n = !0;
                                                break
                                            }
                                        if (!n)
                                            if (t) {
                                                const e = a.A.elements.clone(t);
                                                e.textContent = a.A.elements.text(i), e.href = i.href, a.A.elements.insert(e, t)
                                            } else a.A.elements.append(a.A.elements.create("a", {
                                                href: i.href
                                            }, a.A.elements.text(i)), e, !0)
                                    }
                                    a.A.events.on(t, "mouseenter mouseleave", (s => {
                                        this.opening || this.closing || ("mouseenter" === s.type ? !n.active && this._openAlternativeDropdown(e, t, i, n) : n.active && this._closeAlternativeDropdown(e, t, i, n))
                                    })), a.A.events.on(e, "keydown", (s => {
                                        if (this.opening) return a.A.events.prevent(s);
                                        u.navigation.process(a.A.picks("*", t)), u.navigation.process(a.A.picks("*", e)), 27 === s.which && n.active && (this.closing = !0, a.A.events.prevent(s), i.blur(), this._closeAlternativeDropdown(e, t, i, n), setTimeout((() => {
                                            a.A.elements.focus(i), this.closing = !1
                                        }), 50)), 38 !== s.which && 40 !== s.which || (a.A.events.prevent(s), e.matches(".acsb-hidden") ? $this._openAlternativeDropdown(e, t, i, n) : u.navigation.bindArrowNav(a.A.picks('[data-acsb-now-navigable="true"]', e), "up-down", s.which))
                                    })), a.A.events.on(i, "focus", (() => {
                                        this.closing || this._openAlternativeDropdown(e, t, i, n)
                                    })), a.A.events.on(t, "keydown click", (s => {
                                        if (this.opening) return a.A.events.prevent(s);
                                        u.navigation.process(a.A.picks("*", t)), u.navigation.process(a.A.picks("*", e)), 27 === s.which && n.active && (i === a.A.elements.focused() && (a.A.events.prevent(s), this._closeAlternativeDropdown(e, t, i, n)), this.closing = !0, a.A.events.prevent(s), i.blur(), this._closeAlternativeDropdown(e, t, i, n), setTimeout((() => {
                                            a.A.elements.focus(i), this.closing = !1
                                        }), 50)), 38 !== s.which && 40 !== s.which || (a.A.events.prevent(s), e.matches(".acsb-hidden") ? this._openAlternativeDropdown(e, t, i, n) : u.navigation.bindArrowNav(a.A.picks('[data-acsb-now-navigable="true"]', e), "up-down", s.which)), "click" !== s.type && 13 !== s.which && 32 !== s.which || s.target.closest("[data-acsb-dropdown]") || s.target === n.shadowHost || (a.A.events.prevent(s), n.active ? this._closeAlternativeDropdown(e, t, i, n) : this._openAlternativeDropdown(e, t, i, n))
                                    }))
                                },
                                openedAlternativeMenus: [],
                                _openAlternativeDropdown(e, t, i, n) {
                                    this.opening = !0;
                                    for (const e of this.openedAlternativeMenus) e.hide();
                                    e.classList.remove("acsb-hidden"), t.setAttribute("data-acsb-menu-focused", "true"), i.setAttribute("aria-expanded", "true"), setTimeout((() => this.opening = !1), 150), n.show(), this.openedAlternativeMenus.push(n)
                                },
                                _closeAlternativeDropdown(e, t, i, n) {
                                    if (!this.opening) {
                                        e.classList.add("acsb-hidden"), t.removeAttribute("data-acsb-menu-focused"), i.setAttribute("aria-expanded", "false"), n.hide();
                                        for (const e of this.openedAlternativeMenus) e.hide()
                                    }
                                },
                                _closeDropdown(e, t, i) {
                                    "true" === t.getAttribute("data-acsb-show-dd") && a.A.elements.css(e, {
                                        top: ""
                                    }), e.classList.add("acsb-hidden"), t.removeAttribute("data-acsb-menu-focused"), i.setAttribute("aria-expanded", "false"), a.A.elements.classes(t, "active hover over", !0), u.navigation.process(a.A.picks("*", t))
                                },
                                _openDropdown(e, t, i) {
                                    this.opening = !0, e.classList.remove("acsb-hidden");
                                    const s = e.closest("details");
                                    s && (s.open = !0), t.setAttribute("data-acsb-menu-focused", "true"), a.A.elements.classes(t, "active hover over");
                                    const r = t.closest('[role="navigation"]');
                                    r && r.setAttribute("data-acsb-dd-focused", "true"), u.navigation.setVisible(e), i.setAttribute("aria-expanded", "true"), t.setAttribute("data-acsb-show-dd", "true"), this._bindFallbackOpen(e, i, t), n.A.isVisible(e) || this._bindFallbackOpen(e, i, t), "rgba(0, 0, 0, 0)" === a.A.elements.style(e, "background-color") && e.setAttribute("data-acsb-background", "true"), u.navigation.process(a.A.picks("*", t)), setTimeout((() => this.opening = !1), 150)
                                },
                                _bindFallbackOpen(e, t, i) {
                                    const s = a.A.elements.text(e),
                                        r = i.closest('[role="navigation"]');
                                    r && "static" === a.A.elements.style(r, "position") && a.A.elements.css(r, {
                                        position: "relative"
                                    });
                                    for (let t of a.A.picks("div, section, ul, ol, nav, span", e)) s !== a.A.elements.text(t) || n.A.isVisible(t) || t.classList.add("data-acsb-show-inner-dd");
                                    if ((() => {
                                            if (a.A.elements.offsets(e, !0).top > 0) return;
                                            let n;
                                            if (n = t ? t.offsetHeight <= 100 ? t.offsetHeight : 100 : i.offsetHeight <= 100 ? i.offsetHeight : 100, a.A.elements.css(e, {
                                                    top: `${n}px`
                                                }, !0), "absolute" !== a.A.elements.style(e, "position") && a.A.elements.css(e, {
                                                    position: "relative"
                                                }, !0), a.A.elements.offsets(e, !0).top <= 0)
                                                for (let t of a.A.picks("[data-acsb-show-inner-dd]", i))
                                                    if (a.A.elements.css(t, {
                                                            top: `${n}px`
                                                        }, !0), "absolute" !== a.A.elements.style(e, "position") && a.A.elements.css(t, {
                                                            position: "relative"
                                                        }, !0), a.A.elements.offsets(e, !0).top >= 0) break
                                        })(), e.scrollHeight > a.A.utilities.getWinSize().height - (a.A.elements.offsets(e, !0).top - 50)) {
                                        let t = `body.acsb-keynav [data-acsb-menu-focused="true"] [data-acsb-dropdown="${e.getAttribute("data-acsb-dropdown")}"] [data-acsb-scrollable="true"]`,
                                            i = a.A.picks(".data-acsb-show-inner-dd").pop();
                                        i || (i = e, t = `body.acsb-keynav [data-acsb-menu-focused="true"] [data-acsb-scrollable="true"][data-acsb-dropdown="${e.getAttribute("data-acsb-dropdown")}"]`), n.A.addDynamicCss(`${t} { max-height: ${a.A.utilities.getWinSize().height-a.A.elements.offsets(e,!0).top-50}px !important; }`, "dropdowns"), i.setAttribute("data-acsb-scrollable", "true")
                                    }
                                    e.scrollWidth > e.offsetWidth && a.A.elements.css(e, {
                                        "min-width": `${e.scrollWidth+50}px`
                                    }, !0)
                                }
                            }
                        },
                        hovers: {
                            retries: 0,
                            hovers: [],
                            subHovers: [],
                            inProcess: [],
                            process() {
                                this._processLinkedStyles(), this._processInlineStyles(), this._bindBehaviors(), a.A.events.on(window, o.A.events.domChanged, (e => {
                                    if (!(this.hovers.length < 1)) try {
                                        let t = !1;
                                        for (let i of e.detail.$elements) i.matches(this.hovers.join(",")) && (t = !0);
                                        t && this._bindElements()
                                    } catch (e) {}
                                }))
                            },
                            _bindElements() {
                                let e = [],
                                    t = [],
                                    i = [];
                                for (let e of this.hovers) {
                                    if (!a.A.pick(a.A.strings.replace(e, ":hover", ""))) continue;
                                    const i = a.A.picks(e.split(":hover")[0]);
                                    i.length > 0 && (t = t.concat(i))
                                }
                                for (let e of this.subHovers) {
                                    if (!a.A.pick(a.A.strings.replace(e, ":hover", ""))) continue;
                                    const t = a.A.picks(e.split(":hover")[0]);
                                    t.length > 0 && (i = i.concat(t))
                                }
                                for (let i of t) i.acsbHoverBound || (i.acsbHoverBound = !0, i.closest("[data-acsb-hover]") || (a.A.elements.attrs(a.A.picks('[data-acsb-hover="true"]', i), ["data-acsb-hover"], !0), i.setAttribute("data-acsb-hover", "true"), e.push(i)));
                                for (let t of i) t.acsbSubHoverBound || (t.acsbSubHoverBound = !0, t.closest("[data-acsb-hover]") && (t.setAttribute("data-acsb-sub-hover", "true"), e.push(t)));
                                e.length > 0 && u.navigation.process(e)
                            },
                            _bindBehaviors() {
                                a.A.events.on(document, "focusin", (e => {
                                    const t = e.target.closest('[data-acsb-hover="true"]');
                                    for (let e of a.A.picks('.acsb-hover[data-acsb-hover="true"]')) e !== t && (e.classList.remove("acsb-hover"), u.navigation.process(a.A.picks("*", e).concat([e])));
                                    t && !t.matches(".acsb-hover") && (t.classList.add("acsb-hover"), u.navigation.process(a.A.picks("*", t).concat([t])))
                                })), a.A.events.on(document, "click", (e => {
                                    e.target.closest('[data-acsb-hover="true"]') || a.A.elements.classes(a.A.picks('.acsb-hover[data-acsb-hover="true"]'), "acsb-hover", !0)
                                }))
                            },
                            stylesJSONCache: void 0,
                            reportedStyles: [],
                            async _processLinkedStyles(e = []) {
                                if (e.length < 1)
                                    for (let t of document.styleSheets)
                                        if (!(!t.href || o.A.ace || o.A.wave || a.A.strings.inString(t.href, "blob:") || a.A.strings.inString(t.href, "googleapis") || a.A.strings.inString(t.href, "chrome-extension")) && a.A.strings.inString(t.href, ".css")) {
                                            e.push(a.A.uris.getFormatted(t.href, !1, !0));
                                            try {
                                                for (let i of t.rules) 3 === i.type && i.styleSheet && "string" == typeof i.href && e.push(a.A.uris.getFormatted(i.styleSheet.href, !1, !0))
                                            } catch (e) {}
                                        }
                                if (e.length > 0) {
                                    const t = this.stylesJSONCache || await a.A.fetch(`${o.A.resources}${o.A.domain}/styles.json`, [], {
                                        headers: {
                                            "Content-Type": "text/plain"
                                        }
                                    }, "GET");
                                    this.stylesJSONCache = t;
                                    const i = !t || t.length < 1 ? {} : JSON.parse(t),
                                        n = {},
                                        s = [],
                                        c = [];
                                    for (let t of e) i[t] ? n[t] = i[t] : this.inProcess.includes(t) || (s.push(t), this.inProcess.push(t)), n[t] && !this.reportedStyles.includes(t) && c.push(t);
                                    Object.keys(n).length > 0 && this._deployResults(n), !c.length || r.A.siteCfg.blockStyles || o.A.ace || o.A.wave || !o.A.keepAliveReporter || (this.reportedStyles.push(c), (0, l.h)("styles", c)), s.length > 0 && !r.A.siteCfg.blockStyles && (fetch(`${o.A.processEndpoint}/api/public/domains/${o.A.domain}/styles`, {
                                        method: "POST",
                                        body: JSON.stringify({
                                            urls: s
                                        })
                                    }), this.stylesJSONCache = void 0)
                                }
                                setTimeout((() => {
                                    if (this.inProcess.length < 1 || this.retries >= 360 || r.A.siteCfg.blockStyles) return;
                                    const t = [];
                                    for (let i of e) this.inProcess.includes(i) && t.push(i);
                                    t.length < 1 || (this.retries++, this._processLinkedStyles(t))
                                }), 5e3)
                            },
                            _processInlineStyles() {
                                let e = "";
                                for (let t of document.styleSheets)
                                    if (!(t.href || t.ownerNode && t.ownerNode.matches(".acsb-styles, .acsb-dynamic-colors, [data-acsb-dynamic-css]"))) try {
                                        for (let i of t.cssRules) {
                                            let t = [];
                                            3 === i.type && i.styleSheet && (t = i.styleSheet.cssRules), 7 === i.type && i.cssRules && (t = i.cssRules), t.length < 1 && (t = [i]);
                                            for (let i of t)
                                                if (i.selectorText && i.selectorText.includes(":hover"))
                                                    for (let t of i.selectorText.split(",")) {
                                                        if (!t.includes(":hover")) continue;
                                                        const n = i.cssText.split("{"),
                                                            s = (n[0].match(/:hover/g) || []).length;
                                                        if (s > 1) {
                                                            let t = "";
                                                            for (let e of new Array(s)) e + 1 < s && (t = n[0].replace(":hover", ""));
                                                            e += `${t.replace(":hover",":focus")},${t.replace(":hover",".acsb-hover")}{${n[1]}`, ":hover" !== t.substr(t.length - 6) && t.includes(":hover ") && this.subHovers.push(t)
                                                        }
                                                        ":hover" !== i.selectorText.substr(t - 6) && t.includes(":hover ") && this.hovers.push(t), e += `${n[0].replace(":hover",":focus")},${n[0].replace(":hover",".acsb-hover")}{${n[1]}`
                                                    }
                                        }
                                    } catch (e) {}
                                e.length < 1 || (n.A.addDynamicCss(e, "hovers"), this._bindElements())
                            },
                            _deployResults(e) {
                                const t = [];
                                for (let i in e) {
                                    let s = "";
                                    if (this.inProcess.includes(i))
                                        for (let e of this.inProcess)
                                            if (e === i) {
                                                delete this.inProcess[e];
                                                break
                                            }
                                    for (let n of e[i]) {
                                        const e = n.split(" {");
                                        if (e[0].includes(":hover"))
                                            for (let i of e[0].split(",")) {
                                                if (!i.includes(":hover")) continue;
                                                let n = (i.match(/:hover/g) || []).length;
                                                if (n > 1) {
                                                    let t = "";
                                                    for (let e of new Array(n)) e + 1 < n && (t = i.replace(":hover", ""));
                                                    s += `${t.replace(":hover",":focus")},${t.replace(":hover",".acsb-hover")}{${e[1]}`, ":hover" !== t.substr(t.length - 6) && i.includes(":hover ") && this.subHovers.push(t)
                                                }
                                                ":hover" !== i.substr(i.length - 6) && i.includes(":hover ") ? this.hovers.push(i) : e[1] ? .includes("cursor:pointer") && !t.includes(i) && t.push(i), s += `${i.replace(":hover",":focus")},${i.replace(":hover",".acsb-hover")}{${e[1]}`
                                            }
                                    }
                                    s.length > 0 && n.A.addDynamicCss(s, "hovers")
                                }
                                this.hovers = a.A.arrays.filterBlanks(this.hovers), this.inProcess = a.A.arrays.filterBlanks(this.inProcess);
                                let i = "";
                                for (let e of t) i += `${e.replace(":hover","")},`;
                                i && n.A.addDynamicCss(`${i.slice(0,-1)}{cursor:pointer !important;}`, "hoverPointers"), this._bindElements()
                            }
                        },
                        watcher: {
                            process() {}
                        },
                        overlays: {
                            timePass: 0,
                            closing: !1,
                            allowedTags: ["div", "nav", "header", "section", "dialog", "aside", "iframe"],
                            init() {
                                u.rebinds > 0 || (this._bindTabulation(), setInterval((() => this.timePass = this.timePass + 1e3), 1e3), a.A.events.on(document, "keydown click", (e => {
                                    this.closing && (["acsbHit", "click"].includes(e.type) || "keydown" === e.type && [32, 13].includes(e.which)) && a.A.events.prevent(e)
                                })))
                            },
                            process(e, t, i) {
                                if (!(!e || e.length < 1 || this.closing))
                                    for (let n of e) {
                                        if (n.closest('[data-acsb-dropdown], [data-acsb-menu-root="true"], [data-acsb-carousel="true"], [data-acsb-overlay].acsb-active, [data-acsb]') || !this.allowedTags.includes(n.tagName.toLowerCase())) continue;
                                        const e = this._getActiveOverlayType(n, t, i);
                                        if (e && (n.textContent.trim() || a.A.pick("iframe, button, a", n))) switch (n.setAttribute("data-acsb-overlay", e), t && (n.acsbOverlayTrigger = a.A.elements.focused()), e) {
                                            case "popup":
                                            case "popbar":
                                            case "sidebar":
                                                this._bindPopupBehaviors(n);
                                                break;
                                            case "blocker":
                                                this._bindBlockerBehaviors(n);
                                                break;
                                            case "loader":
                                                this._bindLoaderBehaviors(n)
                                        }
                                    }
                            },
                            _bindElements(e, t) {
                                u.carousels.process(), u.navigation.process([e, t]), u.navigation.process(a.A.picks("*", e));
                                const i = a.A.picks('[data-acsb-clickable="true"]', e),
                                    n = a.A.picks("form", e);
                                c.A.clickables._setTextualOpsTags(e), i.length > 0 && c.A.clickables._processClickables(i), n.length > 0 && c.A.forms._processForms(n)
                            },
                            _bindBlockerBehaviors(e) {
                                if (e.acsbBlockerTimePassed >= 5e3 || e.closest('[data-acsb-overlay="blocker"].acsb-active')) return;
                                e.acsbBlockerTimePassed || (e.acsbBlockerTimePassed = 0);
                                let t, i = parseInt(a.A.elements.style(e, "z-index"));
                                if (!isNaN(i))
                                    for (let s of a.A.picks(this.allowedTags.join(","))) {
                                        if (e === s || s.closest('[data-acsb], [data-acsb-main-menu="true"]') || a.A.pick('[data-acsb-main-menu="true"]', s) || s.offsetWidth < 200 || !["absolute", "fixed"].includes(a.A.elements.style(s, "position")) || !n.A.isVisible(s)) continue;
                                        let r = parseInt(a.A.elements.style(s, "z-index"));
                                        if (isNaN(i) || i > r) continue;
                                        const o = a.A.elements.offsets(s, !0),
                                            l = n.A.getElByOffset(o.left + 50, o.top + 50);
                                        if (l && (l === s || s.contains(l) || l.contains(s))) {
                                            t = s;
                                            break
                                        }
                                    }
                                if (t) {
                                    const i = a.A.strings.random();
                                    e.acsbBlockerTimePassed = 0, e.classList.add("acsb-active"), "true" === e.getAttribute("data-acsb-clickable") && a.A.elements.attrs(e, {
                                        tabindex: "0",
                                        "data-acsb-force-navigable": "true"
                                    }), e.setAttribute("data-acsb-overlay-blocker-for", i), u.navigation.setVisible(e), a.A.elements.attrs(t, {
                                        "data-acsb-overlay": "popup",
                                        "data-acsb-overlay-blocker-by": i
                                    }), this._bindPopupBehaviors(t, e)
                                } else setTimeout((() => {
                                    this._bindBlockerBehaviors(e), e.acsbBlockerTimePassed = e.acsbBlockerTimePassed + 300
                                }), 300), e.removeAttribute("data-acsb-overlay")
                            },
                            _bindLoaderBehaviors(e) {
                                e.getAttribute("data-acsb-overlay") && e.matches(".acsb-active") || (a.A.events.on(e, "keyup keydown", (t => {
                                    27 === t.which && this._closeOverlay(e)
                                })), a.A.elements.attrs(e, {
                                    role: "dialog",
                                    "aria-modal": "true",
                                    "aria-label": s.A.get("LOADING")
                                }), u.navigation.setVisible(e), a.A.elements.focus(e))
                            },
                            _bindPopupBehaviors(e, t) {
                                if (e.matches("[data-acsb-overlay].acsb-active")) return;
                                u.navigation.setVisible(e), a.A.elements.attrs(e, {
                                    class: "acsb-active",
                                    "aria-modal": "true"
                                }), e.getAttribute("aria-label") || e.setAttribute("aria-label", s.A.get("POPUP")), e.getAttribute("role") || e.setAttribute("role", "dialog");
                                const i = a.A.pick('[data-acsb-click-process="true"]');
                                if (e.acsbOriginalFocus = i || u.$lastFocused, n.A.throwAlert(s.A.get("ACTIVE_POPUP"), !0, !0, !1), this._bindElements(e, t), !e.acsbPopupBound) {
                                    let i = a.A.picks('[data-acsb-textual-ops="close"]', e);
                                    i.length < 1 ? (i = c.A.srOnly.create(s.A.get("REMOVE"), {
                                        role: "button"
                                    }, "span", !0), c.A.srOnly.append(e, i)) : i.length > 3 && (i = [i[0], i[1], i[2]]), a.A.events.on(i, "acsbHit", (() => this._closeOverlay(e, t, !0))), a.A.events.on(e, "keydown keyup", (i => {
                                        this.closing || 27 !== i.which || "SELECT" === i.target.tagName || (this._closeOverlay(e, t, !0), i.stopPropagation())
                                    }))
                                }
                                a.A.elements.focus(e);
                                let r = 0;
                                const o = setInterval((() => {
                                    if (r > 5 && clearInterval(o), document.activeElement === e || e.contains(document.activeElement)) clearInterval(o);
                                    else {
                                        const t = a.A.picks('[data-acsb-now-navigable="true"]', e);
                                        t.length && a.A.elements.focus(t[0])
                                    }
                                    r++
                                }), 200);
                                e.acsbPopupBound = !0
                            },
                            _getActiveOverlayType(e, t, i) {
                                if (e.matches("[data-acsb-overlay]")) return e.getAttribute("data-acsb-overlay");
                                if (e.closest("[data-acsb-overlay].acsb-active, [data-acsb]") || document.body.offsetHeight < e.offsetHeight) return;
                                const s = a.A.elements.style(e, "position"),
                                    r = a.A.elements.style(e, "z-index");
                                if (parseInt(r) < 1 || "none" === a.A.elements.style(e, "pointer-events") || !["fixed", "absolute"].includes(s) || !n.A.isVisible(e)) return;
                                const o = a.A.elements.offsets(e, !0),
                                    l = a.A.utilities.getWinSize().width,
                                    d = a.A.utilities.getWinSize().height,
                                    u = Math.ceil(100 * e.offsetWidth / l),
                                    h = Math.ceil(100 * e.offsetHeight / d);
                                let p = n.A.getElByOffset(o.left, o.top),
                                    f = !1;
                                if (e === p || e.contains(p) || (p = n.A.getElByOffset(o.left + 50, o.top + 50)), u < 70 && h < 70) {
                                    if ("fixed" === s) {
                                        const t = n.A.getElByOffset(l / 2, d / 2);
                                        (t === p || e.contains(t)) && (f = !0)
                                    }
                                    if (!f) return
                                }
                                let g = null,
                                    b = !1;
                                const m = a.A.picks("*", e).length;
                                if ((() => {
                                        if (i && "absolute" === s && a.A.pick('[role="navigation"]', e) && (e.offsetHeight >= d || e.scrollHeight >= d)) return;
                                        if ("absolute" === s && (u < 90 || h < 90 || "BODY" !== e.parentElement.tagName)) return;
                                        if (m < 5 && a.A.picks("iframe", e).length < 1 && "IFRAME" !== e.tagName) return;
                                        if ((u < 70 || h < 70) && !f) return;
                                        const t = a.A.elements.focused(),
                                            r = t ? null : n.A.getElByOffset(o.left, o.top);
                                        r && t && "BODY" !== t.tagName && !e.contains(t) && !e.contains(r) || (g = "popup")
                                    })(), (() => {
                                        if (g || m >= 5 || u < 70 || h < 70 || !["DIV", "ASIDE"].includes(e.tagName)) return;
                                        if ("absolute" === s && (u < 90 || h < 90 || "BODY" !== e.parentElement.tagName)) return;
                                        let t = p === e;
                                        if (!t) {
                                            const i = [{
                                                x: 30,
                                                y: 30
                                            }, {
                                                x: 30,
                                                y: a.A.utilities.getWinSize().height - 30
                                            }, {
                                                x: 30,
                                                y: a.A.utilities.getWinSize().height / 2
                                            }, {
                                                x: a.A.utilities.getWinSize().width - 30,
                                                y: 30
                                            }, {
                                                x: a.A.utilities.getWinSize().width / 2,
                                                y: 30
                                            }, {
                                                x: a.A.utilities.getWinSize().width - 30,
                                                y: a.A.utilities.getWinSize().height / 2
                                            }, {
                                                x: a.A.utilities.getWinSize().width - 30,
                                                y: a.A.utilities.getWinSize().height - 30
                                            }, {
                                                x: a.A.utilities.getWinSize().width / 2,
                                                y: a.A.utilities.getWinSize().height / 2
                                            }, {
                                                x: a.A.utilities.getWinSize().width / 2,
                                                y: a.A.utilities.getWinSize().height - 30
                                            }];
                                            for (let s of i)
                                                if (n.A.getElByOffset(s.x, s.y) === e) {
                                                    t = !0;
                                                    break
                                                }
                                        }
                                        t && (g = "blocker")
                                    })(), (() => {
                                        if (g || !t || u < 70 || e.offsetHeight < 150 || m < 10 || !e.getAttribute("data-acsb-hidden")) return;
                                        if (e !== p && !e.contains(p)) return;
                                        let i = !1,
                                            n = !1;
                                        if ("fixed" !== s && "absolute" !== s)
                                            for (let t of a.A.elements.parents(e)) {
                                                const e = a.A.elements.style(t, "position");
                                                if ("fixed" === e) {
                                                    i = !0;
                                                    break
                                                }
                                                if ("isInAbsolute" === e) {
                                                    n = !0;
                                                    break
                                                }
                                            }("fixed" === s || "absolute" === s || i || n) && (g = "popbar")
                                    })(), (() => {
                                        if (g || "fixed" !== s || h < 70 || u > 50 || e.offsetWidth < 150 || m < 10) return;
                                        const t = parseInt(a.A.elements.style(e, "top")),
                                            i = parseInt(a.A.elements.style(e, "right")),
                                            n = parseInt(a.A.elements.style(e, "left"));
                                        0 !== t || 0 !== i && 0 !== n || e !== p && !e.contains(p) || (g = "sidebar")
                                    })(), (() => {
                                        !i || t || "fixed" !== s || "popup" !== g || m > 10 || h < 100 || u < 100 || this.timePass > 300 || "IFRAME" === e.tagName || (c.A.clickables._setTextualOpsTags(e), a.A.elements.text(e).length > 30 || a.A.pick('ul, form, input, select, textarea, [role="navigation"], button, a, iframe, h1, h2, h3', e) || a.A.pick('[data-acsb-textual-ops="close"]', e) || (g = "loader"))
                                    })(), i && "fixed" === s && ["visible", "auto"].includes(a.A.elements.style(document.body, "overflow-y")))
                                    for (let e of a.A.picks("div, section")) {
                                        if (e.contains(e) || e.closest("[data-acsb]") || "relative" !== a.A.elements.style(e, "position") || !n.A.isVisible(e)) continue;
                                        const t = a.A.elements.style(e, "z-index");
                                        if (!("auto" === t || r >= parseInt(t))) {
                                            b = !0;
                                            break
                                        }
                                    }
                                return !b && n.A.isOverlaying(e) ? g : void 0
                            },
                            _closeOverlay(e, t, i) {
                                if (!this.closing) {
                                    this.closing = !0, e.classList.remove("acsb-active"), a.A.elements.attrs(e, ["data-acsb-overlay-blocker-by", "data-acsb-overlay"], !0);
                                    for (let e of a.A.picks('[data-acsb-overlay="blocker"]')) e.classList.remove("acsb-active"), a.A.elements.attrs(e, ["data-acsb-overlay-blocker-for", "data-acsb-overlay"], !0);
                                    if (a.A.elements.isElement(e.acsbOverlayTrigger) && !i && ["popbar", "sidebar"].includes(e.getAttribute("data-acsb-overlay")) && a.A.elements.click(e.acsbOverlayTrigger), n.A.isVisible(e) && !i) {
                                        const i = a.A.pick('[data-acsb-textual-ops="close"]', e);
                                        i ? a.A.elements.click(i) : t ? a.A.elements.click(t) : a.A.elements.click(e)
                                    }
                                    "hidden" === a.A.elements.style(document.body, "overflow-y") && document.body.classList.add("acsb-force-y-auto"), "hidden" === a.A.elements.style(document.body.parentElement, "overflow-y") && document.body.parentElement.classList.add("acsb-force-overflow-visible"), !e.acsbOriginalFocus || e.contains(e.acsbOriginalFocus) ? n.A.focusBody() : a.A.elements.focus(e.acsbOriginalFocus), setTimeout((() => {
                                        if (n.A.isVisible(e)) {
                                            const i = a.A.utilities.getWinSize(),
                                                s = a.A.elements.offsets(e),
                                                r = n.A.getElByOffset(i.width / 2, i.height / 2);
                                            t && n.A.getElByOffset(s.left, s.top === e) && t.classList.add("acsb-hidden"), r && Math.ceil(100 * r.offsetWidth / i.width.height) > 80 && a.A.elements.remove(r)
                                        }
                                        t && n.A.isVisible(t) && t.classList.add("acsb-hidden"), setTimeout((() => this.closing = !1), 250)
                                    }), 1e3)
                                }
                            },
                            _getActiveOverlay() {
                                let e = a.A.picks('[data-acsb-overlay="popup"].acsb-active').pop();
                                return e || (e = a.A.picks('[data-acsb-overlay="popbar"].acsb-active').pop()), e || (e = a.A.picks('[data-acsb-overlay="sidebar"].acsb-active').pop()), e
                            },
                            _bindTabulation() {
                                a.A.events.on(document, "keydown", (e => {
                                    if (9 !== e.which) return;
                                    if (e.target.closest('[data-acsb-menu-root="true"]')) return;
                                    const t = this._getActiveOverlay();
                                    if (!t || !n.A.isVisible(t)) return;
                                    a.A.events.prevent(e);
                                    const i = t.getAttribute("data-acsb-overlay-blocker-by"),
                                        s = i ? a.A.pick(`[data-acsb-overlay-blocker-for="${i}"]`) : void 0,
                                        r = a.A.elements.focused(),
                                        o = [];
                                    let l, c = 0;
                                    for (let e of a.A.picks('[data-acsb-now-navigable="true"], [data-acsb-inner-focus="true"]', t)) e.closest('[data-acsb-hidden="true"], [data-acsb]') || o.push(e);
                                    for (let e of a.A.picks('[data-acsb-textual-ops="close"]', t)) l = e, !o.includes(e) && n.A.isVisible(e) && o.unshift(e);
                                    if (!l && s && n.A.isVisible(s) && o.unshift(s), "true" !== t.getAttribute("data-acsb-now-navigable") || o.includes(t) || o.unshift(t), o.length > 0) {
                                        let t = 0;
                                        for (let i of o) i === r ? (c = e.shiftKey ? t - 1 : t + 1, c = c < 0 ? o.length - 1 : c, c = c > o.length - 1 ? 0 : c, t++) : t++;
                                        o[c] && a.A.elements.focus(o[c])
                                    }
                                })), a.A.events.on(document, "acsbHit", (e => {
                                    const t = this._getActiveOverlay();
                                    !t || t.acsbOverlayTabulationRebinding || n.A.isFormField(e.target) || (t.acsbOverlayTabulationRebinding = !0, setTimeout((() => {
                                        this._bindElements(t), setTimeout((() => t.acsbOverlayTabulationRebinding = !1), 300)
                                    }), 700))
                                })), a.A.events.on(window, o.A.events.elementHide, (e => {
                                    e.detail.$el.matches("[data-acsb-overlay].acsb-active") && e.detail.$el.classList.remove("acsb-active")
                                }))
                            }
                        },
                        letterNav: {
                            codes: {
                                66: 'button, [role="button"], [role="tab"]',
                                70: 'form, [role="form"]',
                                71: 'img, [role="img"]',
                                72: 'h1, h2, h3, h4, h5, h6, [role="heading"]',
                                73: 'li, [data-acsb-menu="li"]',
                                75: "a[href]",
                                76: "ul, ol",
                                77: '[role="navigation"]',
                                84: "table"
                            },
                            init() {
                                a.A.events.on(document, "keydown", (e => {
                                    if (!e.composedPath().some((e => e instanceof HTMLElement && ["TEXTAREA", "INPUT", "SELECT"].includes(e.tagName)))) {
                                        if (this.codes[e.which] && !e.ctrlKey) {
                                            a.A.events.prevent(e);
                                            const t = a.A.pick("[data-acsb-overlay].acsb-active"),
                                                i = [];
                                            let s = t ? a.A.picks(this.codes[e.which], t) : a.A.picks(this.codes[e.which]),
                                                r = 0;
                                            for (let e of s) e.closest('[data-acsb], [data-acsb-hidden="true"]') || ["TEXTAREA", "INPUT", "INPUT"].includes(e.tagName) || !n.A.isVisible(e) || e.matches('a, button, [role="button"], [role="tab"]') && !e.matches('[data-acsb-now-navigable="true"]') || i.push(e);
                                            if (i.length > 0) {
                                                let t = 0;
                                                for (let n of i) n === a.A.elements.focused() ? (r = e.shiftKey ? t - 1 : t + 1, r = r < 0 ? i.length - 1 : r, r = r > i.length - 1 ? 0 : r, t++) : t++;
                                                i[r] && (i[r].getAttribute("tabindex") || i[r].setAttribute("tabindex", "-1"), i[r].acsbLetterNavFocusOutBound || a.A.events.on(i[r], "focusout", ((e, t) => {
                                                    t.acsbLetterNavFocusOutBound = !0, "-1" === t.getAttribute("tabindex") && t.removeAttribute("tabindex"), t.removeAttribute("data-acsb-letter-nav-active")
                                                })), i[r].setAttribute("data-acsb-letter-nav-active", "true"), i[r].focus())
                                            }
                                        }
                                        if (13 === e.which) {
                                            const t = a.A.elements.focused();
                                            if (t && "true" === t.getAttribute("data-acsb-letter-nav-active") && (!n.A.isClickable(t) && t.closest('[data-acsb-clickable="true"]') && a.A.elements.click(t), "FORM" === t.tagName)) {
                                                const i = a.A.pick('[data-acsb-now-navigable="true"]', t);
                                                if (!i) return;
                                                a.A.events.prevent(e), i.focus()
                                            }
                                        }
                                    }
                                }))
                            }
                        },
                        navigation: {
                            process(e, t, i, n) {
                                for (let s of e || a.A.picks("*")) this.processElement(s, t, i, n);
                                this._processCustomButtons(e)
                            },
                            processElement(e, t, i, n) {
                                if (e && !e.closest("[data-acsb]") && !["SCRIPT", "OPTION", "NOSCRIPT", "STYLE", "BR", "LINK", "META", "BODY"].includes(e.tagName)) {
                                    if ("IFRAME" === e.tagName) return this._processIframe(e);
                                    if ("IMG" === e.tagName && !e.complete) return a.A.events.on(e, "load", (() => this.processElement(e, t, i)));
                                    if (!e.acsbKeynavBound && "A" === e.tagName && "_blank" === e.getAttribute("target")) {
                                        let t = s.A.get("NEW_WINDOW"),
                                            i = e.getAttribute("title");
                                        i && i.length > 0 && (t = `${i} | ${s.A.get("NEW_WINDOW")}`), e.setAttribute("data-acsb-tooltip", t)
                                    }
                                    e.acsbKeynavBound = !0, this.processNavigability(e, i, n)
                                }
                            },
                            _processCustomButtons(e) {
                                const t = 'button, input[type="button"], input[type="submit"], input[type="reset"], a',
                                    i = e ? e.filter((e => e instanceof HTMLElement && e.matches(t))) : a.A.picks(t);
                                for (const e of i) {
                                    if (e.hasAttribute("data-custom-button-processed")) return;
                                    if (e.setAttribute("data-custom-button-processed", "true"), n.A.isClickable(e) && !n.A.isVisible(e) && !n.A.isHiddenBySize(e)) {
                                        const t = e.getBoundingClientRect(),
                                            i = document.elementsFromPoint(t.left + t.width / 2, t.top + t.height / 2);
                                        if (i.shift() === e)
                                            for (const t of i)
                                                if (t !== e && t.textContent && n.A.isVisible(t) && n.A.isAproxSameDimensionsAndPosition(e, t)) {
                                                    e.setAttribute("aria-label", t.textContent), setTimeout((() => {
                                                        u.navigation.setVisible(e, !0), u.navigation.setNavigable(e)
                                                    }), 50);
                                                    break
                                                }
                                    }
                                }
                            },
                            processNavigability(e, t, i) {
                                let s = n.A.isVisible(e),
                                    r = "true" === e.getAttribute("data-acsb-navigable");
                                return "form" === e.tagName && this._isWrapperForm(e) && e.setAttribute("data-acsb-wrapper-form", "true"), !e.getAttribute("data-acsb-clickable") && n.A.isClickable(e) && e.setAttribute("data-acsb-clickable", "true"), e.acsbNavigabilityProcessed || "true" === e.getAttribute("data-acsb-sr-only") || (e.getAttribute("tabindex") && "true" !== e.getAttribute("data-acsb-force-navigable") && e.removeAttribute("tabindex"), s && e.getAttribute("aria-hidden") && "true" !== e.getAttribute("data-acsb-force-hidden") && e.removeAttribute("aria-hidden")), !r && n.A.isNavigable(e) && (r = !0, e.setAttribute("data-acsb-navigable", "true")), !r && e.matches('button, a[href], [data-acsb-navigable="true"]') && e.setAttribute("data-acsb-force-unnavigable", "true"), "true" === e.getAttribute("data-acsb-force-unnavigable") ? (e.acsbNavigabilityProcessed = !0, this.setUnnavigable(e)) : "false" === e.getAttribute("data-acsb-force-navigable") ? (e.acsbNavigabilityProcessed = !0, this.setNavigable(e)) : "A" === e.tagName && r && s && !this._allowLinkStop(e) ? (e.setAttribute("data-acsb-redundant-stop", "true"), e.closest('[data-acsb-hover="true"]') || u.navigation.setHidden(e), e.acsbNavigabilityProcessed = !0, this.setUnnavigable(e)) : (s ? ("true" === e.getAttribute("data-acsb-hidden") || i && t && !e.acsbNavigabilityProcessed) && (e.matches('[data-acsb-navigable="true"]') && this.setNavigable(e), u.navigation.setVisible(e), a.A.events.trigger(e, o.A.events.elementShow, {
                                    $el: e,
                                    clickProcess: t
                                })) : ("true" === e.getAttribute("data-acsb-navigable") && this.setUnnavigable(e), a.A.elements.parents(e, '[data-acsb-hidden="true"]', !0)[0] || (u.navigation.setHidden(e), a.A.events.trigger(e, o.A.events.elementHide, {
                                    $el: e,
                                    clickProcess: t
                                }))), n.A.isFormField(e) ? u.navigation.forms.processField(e) : r && s && (e.getAttribute("data-acsb-hover") && a.A.pick('[data-acsb-now-navigable="true"]', e) ? this.setUnnavigable(e) : this.setNavigable(e)), void(e.acsbNavigabilityProcessed = !0))
                            },
                            bindArrowNav(e, t, i) {
                                if (!e || e.length < 1) return;
                                const n = a.A.elements.focused();
                                let s = 0;
                                if ("up-down" === t) {
                                    let t = 0;
                                    for (let a of e) a === n ? (s = 40 === i ? t + 1 : s, s = 38 === i ? t - 1 : s, s = s < 0 ? e.length - 1 : s, s = s > e.length - 1 ? 0 : s, t++) : t++;
                                    e[s] && setTimeout((() => e[s].focus()), 50)
                                }
                                if ("left-right" === t) {
                                    const t = a.A.elements.style(e[0].parentElement, "direction");
                                    let r = 0;
                                    for (let a of e) a === n ? (37 === i && (s = "rtl" === t ? r + 1 : s, s = "rtl" !== t ? r - 1 : s), 39 === i && (s = "rtl" === t ? r - 1 : s, s = "rtl" !== t ? r + 1 : s), s = s < 0 ? e.length - 1 : s, s = s > e.length - 1 ? 0 : s, r++) : r++;
                                    e[s] && setTimeout((() => e[s].focus()), 50)
                                }
                            },
                            setNavigable(e) {
                                e.matches('[data-acsb-now-navigable="true"]') || e.matches(":disabled") || (e.matches("a[href]") || n.A.isFormField(e) || n.A.isFormButton(e) ? e.removeAttribute("tabindex") : e.setAttribute("tabindex", "0"), e.setAttribute("data-acsb-now-navigable", "true"))
                            },
                            setUnnavigable(e) {
                                e.matches('[data-acsb-now-navigable="false"]') || (["A", "AREA", "BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(e.tagName) ? e.setAttribute("tabindex", "-1") : e.removeAttribute("tabindex"), e.setAttribute("data-acsb-now-navigable", "false"))
                            },
                            setVisible(e, t) {
                                if (e.matches('[data-acsb-hidden="false"]')) return;
                                const i = {
                                    "data-acsb-hidden": "false"
                                };
                                t && (i["data-acsb-force-visible"] = "true"), "true" === e.getAttribute("data-acsb-sr-excluded") && (i["aria-hidden"] = "true"), a.A.elements.attrs(e, i)
                            },
                            setHidden(e, t) {
                                if (e.matches('[data-acsb-hidden="true"]')) return;
                                const i = {
                                    "aria-hidden": "true",
                                    "data-acsb-hidden": "true"
                                };
                                t && (i["data-acsb-force-hidden"] = "true"), a.A.elements.attrs(e, i)
                            },
                            _processIframe(e) {
                                if (e.acsbIframeProcessed && !e.acsbPossibleHiddenFrame) return;
                                e.acsbIframeProcessed = !0;
                                const t = a.A.uris.getBrandName(e.src),
                                    i = t && t.length > 0 ? `${t} Iframe` : "Iframe";
                                e.offsetWidth >= 50 && e.offsetHeight >= 50 && n.A.isVisible(e) ? (a.A.elements.attrs(e, {
                                    "aria-label": i,
                                    "data-acsb-navigable": "true",
                                    "data-acsb-force-navigable": "true",
                                    "data-acsb-now-navigable": "true"
                                }), e.acsbPossibleHiddenFrame && (e.acsbPossibleHiddenFrame = !1, u.navigation.setVisible(e)), c.A.scrapper.setScrapeUrl(e, e.src)) : (e.acsbPossibleHiddenFrame = !0, u.navigation.setHidden(e))
                            },
                            _isWrapperForm(e) {
                                let t = 0;
                                for (let e of a.A.picks("form")) !e.closest("[data-acsb]") && n.A.isVisible(e) && t++;
                                return !!(1 === t && a.A.pick("h1, h2, h3, h4, h5, h6", e) && a.A.pick("p", e) && a.A.pick("img", e) && a.A.pick('[role="navigation"]', e))
                            },
                            _allowLinkStop(e) {
                                if ("A" !== e.tagName || "true" === e.getAttribute("data-acsb-redundant-stop")) return !1;
                                const t = e.getAttribute("href");
                                if (!t || t.length < 5 || "#" === t.substr(0, 1) || e.closest('[role="navigation"], nav, header, li, td') || "javascript" === t.substr(0, 10).toLowerCase() || n.A.getShownText(e)) return !0;
                                let i = e.parentElement,
                                    s = !1,
                                    r = !0,
                                    o = 0;
                                for (; r;) {
                                    if (o >= 2 || "BODY" === i.tagName) {
                                        r = !1;
                                        break
                                    }
                                    let l = !1;
                                    for (let s of a.A.picks(`a[href="${t}"]`, i)) {
                                        if (!n.A.isVisible(s) || s === e) continue;
                                        let t = !1;
                                        for (let n of a.A.picks("a[href]", i)) n.href !== e.href && (t = !0);
                                        if (t) {
                                            l = !0;
                                            break
                                        }
                                    }
                                    if (l) {
                                        r = !1, s = !0;
                                        break
                                    }
                                    o += 1, i = i.parentElement
                                }
                                return !s
                            },
                            _fixWix() {
                                const e = a.A.pick("#SITE_CONTAINER #SITE_ROOT #masterPage");
                                if (!e) return;
                                const t = a.A.pick("header#SITE_HEADER", e),
                                    i = a.A.pick("main#PAGES_CONTAINER", e),
                                    n = a.A.pick("footer#SITE_FOOTER", e);
                                i && (t && (a.A.elements.css(t, {
                                    "z-index": "9"
                                }), a.A.elements.insert(t, e, !1)), n && a.A.elements.insert(n, i, !0))
                            },
                            forms: {
                                processField(e) {
                                    this._processCustomSelect(e), this._processCustomControl(e), this._processConnectedControls(e), this._processNavigability(e)
                                },
                                _isCustomControl(e) {
                                    if (!["checkbox", "radio", "file"].includes(e.type) || n.A.isVisible(e) && "0" !== a.A.elements.style(e, "opacity")) return !1;
                                    let t;
                                    return e.previousElementSibling && ["SPAN", "LABEL", "DIV"].includes(e.previousElementSibling.tagName) && n.A.getShownText(e.previousElementSibling) && n.A.isVisible(e.previousElementSibling) && (t = e.previousElementSibling), e.nextElementSibling && ["SPAN", "LABEL", "DIV"].includes(e.nextElementSibling.tagName) && n.A.getShownText(e.nextElementSibling) && n.A.isVisible(e.nextElementSibling) && (t = e.nextElementSibling), t ? (t.setAttribute("data-acsb-custom-control", "true"), !0) : "file" === e.type && e.offsetWidth > 0 && e.offsetHeight > 0 && "0" === a.A.elements.style(e, "opacity") && (e.setAttribute("data-acsb-custom-control", "true"), !0)
                                },
                                _processNavigability(e) {
                                    if (e.closest('[data-acsb-hidden="true"]')) return u.navigation.setUnnavigable(e);
                                    u.navigation.setNavigable(e), u.navigation.setVisible(e);
                                    const t = a.A.elements.parents(e, '[data-acsb-now-navigable="true"]', !0)[0];
                                    t && u.navigation.setUnnavigable(t)
                                },
                                _processCustomSelect(e) {
                                    if ("SELECT" !== e.tagName) return;
                                    let t;
                                    const i = [".chosen-container", ".chzn-container", ".select2-container", ".selectize-control", ".jcf-select", ".jcf-list-box"];
                                    if (this._isCustomSelect(e.nextElementSibling, e, i) ? t = e.nextElementSibling : this._isCustomSelect(e.previousElementSibling, e, i) && (t = e.previousElementSibling), !t) return;
                                    e.classList.add("acsb-shown"), u.navigation.setUnnavigable(t), u.navigation.setNavigable(e), t.offsetWidth > 0 && a.A.elements.css(e, {
                                        width: `${t.offsetWidth}px`
                                    }), u.navigation.setVisible(e), a.A.elements.css(t, {
                                        display: "none",
                                        opacity: "0",
                                        visibility: "hidden"
                                    }, !0), a.A.elements.attrs(t, {
                                        class: "acsb-hidden",
                                        tabindex: "-1",
                                        "data-acsb-force-unnavigable": "true"
                                    });
                                    const n = a.A.pick("option", e);
                                    n && a.A.elements.text(n).length < 1 && (n.textContent = s.A.get("SELECT_OPTION"))
                                },
                                _processCustomControl(e) {
                                    if (!this._isCustomControl(e)) return;
                                    let t;
                                    if (e.removeAttribute("style"), a.A.elements.css(e, {
                                            opacity: "1",
                                            width: "auto",
                                            height: "auto"
                                        }, !0), a.A.elements.attrs(e, {
                                            class: "acsb-shown",
                                            "data-acsb-force-visible": "true"
                                        }), e.previousElementSibling && "true" === e.previousElementSibling.getAttribute("data-acsb-custom-control") && (t = e.previousElementSibling), e.nextElementSibling && "true" === e.nextElementSibling.getAttribute("data-acsb-custom-control") && (t = e.nextElementSibling), t && n.A.isVisible(t) && (u.navigation.setVisible(e), u.navigation.setNavigable(e), u.navigation.setUnnavigable(t), t.setAttribute("data-acsb-force-unnavigable", "true"), !a.A.elements.text(t) && !a.A.pick("img", t) && "none" === a.A.elements.style(t, "background-image"))) {
                                        let e = !1;
                                        for (let i of a.A.picks("*", t)) "none" !== a.A.elements.style(i, "background-image") && (e = !0);
                                        e || t.classList.add("acsb-hidden")
                                    }
                                },
                                _processConnectedControls(e) {
                                    const t = a.A.pick(`label[for="${e.getAttribute("id")}"]`);
                                    t && "INPUT" === e.tagName && ["checkbox", "radio"].includes(e.type) && (n.A.isVisible(t) && !n.A.isVisible(e) && e.classList.add("acsb-shown"), t.classList.add("acsb-connected-input-shown"), n.A.isVisible(e) && (u.navigation.setVisible(e), u.navigation.setNavigable(e), t.contains(t) || u.navigation.setUnnavigable(t)))
                                },
                                _isCustomSelect(e, t, i) {
                                    if (!e || !["DIV", "SPAN"].includes(e.tagName) || n.A.isVisible(t) && !t.matches(".select2-hidden-accessible")) return !1;
                                    let s = !1;
                                    for (let n of i)
                                        if (e.matches(n)) {
                                            s = !0, t.setAttribute("data-acsb-custom-select", n.replace(".", ""));
                                            break
                                        }
                                    return s
                                }
                            }
                        },
                        carousels: {
                            process() {
                                for (let e of a.A.picks(this.getSelectors().join(","))) {
                                    if (e.acsbCarouselBound) continue;
                                    if (e.acsbCarouselBound = !0, e.closest('[data-acsb-carousel="true"]') || !["DIV", "SECTION", "UL", "OL"].includes(e.tagName) || !a.A.pick('[data-acsb-hidden="true"]', e) || a.A.pick('[data-acsb-carousel="true"], [role="navigation"], nav', e) || !a.A.elements.text(e) && !a.A.pick('img, a, [data-acsb-clickable="true"]', e)) continue;
                                    e.removeAttribute("aria-live"), ["listbox", "tablist", "toolbar"].includes(e.getAttribute("role")) && e.removeAttribute("role");
                                    const t = a.A.picks('[role="tablist"]', e),
                                        i = a.A.picks('[role="listbox"], [role="tab"], [aria-selected], [role="tablist"], [role="toolbar"], [role="option"], [role="group"], [role="region"], [aria-live]', e);
                                    for (let e of t)
                                        if (["UL", "OL"].includes(e.tagName)) {
                                            e.setAttribute("role", "presentation");
                                            for (let t of e.children) t.setAttribute("role", "presentation")
                                        } else e.removeAttribute("tablist");
                                    a.A.elements.attrs(i, ["role", "aria-live", "aria-selected"], !0), a.A.elements.attrs(e, {
                                        role: "region",
                                        "data-acsb-carousel": "true",
                                        "data-acsb-force-visible": "true",
                                        "aria-label": s.A.get("CAROUSEL")
                                    })
                                }
                                if (window.Flickity)
                                    for (let e of a.A.picks(".flickity-enabled")) setInterval((() => {
                                        const t = Flickity.data(e);
                                        t && "function" == typeof t.pausePlayer && t.pausePlayer()
                                    }), 1e3);
                                for (let e of a.A.picks(".swiper-container")) e.swiper && ("function" == typeof e.swiper.pauseAutoplay && e.swiper.pauseAutoplay(), e.swiper.autoplay && "function" == typeof e.swiper.autoplay.stop && e.swiper.autoplay.stop());
                                if ("undefined" != typeof jQuery) {
                                    for (let e of a.A.picks(".owl-carousel")) {
                                        const t = jQuery(e);
                                        "function" == typeof t.on && (t.on("changed.owl.carousel", (() => setTimeout((() => t.trigger("stop.owl.autoplay").trigger("owl.stop")), 100))), t.on("click mouseout focus focusout mouseleave", (() => setTimeout((() => t.find(".owl-item.active").trigger("mouseover")), 100))));
                                        for (let e of a.A.picks(".owl-dots, .owl-nav")) e.setAttribute("data-acsb-force-unnavigable", "true"), a.A.elements.css(e, {
                                            cursor: "default"
                                        }, !0), a.A.elements.attrs(e, ["role", "tabindex", "aria-label", "data-acsb-clickable", "data-acsb-navigable", "data-acsb-now-navigable"], !0);
                                        t.trigger("mouseover").trigger("stop.owl.autoplay").trigger("owl.stop").find(".owl-dots").each((e => {
                                            jQuery(e.target).attr({
                                                tabindex: "-1",
                                                "data-acsb-force-unnavigable": "true"
                                            }).find(".owl-dot").each((e => {
                                                const t = jQuery(e.target);
                                                n.A.isVisible(t[0]) && t.attr({
                                                    tabindex: "0",
                                                    "data-acsb-clickable": "true",
                                                    "data-acsb-force-navigable": "true"
                                                })
                                            }))
                                        }))
                                    }
                                    for (let e of a.A.picks(".slick-slider")) {
                                        const t = jQuery(e);
                                        let i;
                                        "function" != typeof i && (i = e => {
                                            try {
                                                void 0 !== e && ("function" == typeof e.slick && e.slick("slickPause"), "function" == typeof e.slickPause && e.slickPause())
                                            } catch (e) {}
                                        }), "function" == typeof t.on && t.on("beforeChange", (() => i(t))), i(t), a.A.events.on(e, "mouseleave click", (() => i(t)))
                                    }
                                    for (let e of a.A.picks(".nivoSlider")) {
                                        const t = jQuery(e).data("nivoslider");
                                        "function" == typeof t.stop && t.stop()
                                    }
                                    for (let e of a.A.picks('.jcarousel, [data-jcarousel="true"]')) try {
                                        const t = jQuery(e);
                                        "function" == typeof t.jcarouselAutoscroll && t.jcarouselAutoscroll("stop")
                                    } catch (e) {}
                                    for (let e of a.A.picks(".q_slider .carousel")) {
                                        const t = jQuery(e);
                                        try {
                                            "function" == typeof t.carousel && t.removeClass("q_auto_start").carousel({
                                                interval: 6e3,
                                                pause: !0
                                            })
                                        } catch (e) {}
                                    }
                                    for (let e of a.A.picks(".ls-container")) {
                                        const t = jQuery(e);
                                        "function" == typeof t.layerSlider && t.layerSlider("stop")
                                    }
                                    for (let e of a.A.picks(".flexslider")) {
                                        const t = jQuery(e),
                                            i = "function" == typeof t.flexslider ? t : t.closest("ul").parent();
                                        if (i.length > 0 && "function" == typeof i.flexslider) try {
                                            i.flexslider("pause")
                                        } catch (e) {}
                                    }
                                    for (let e of a.A.picks(".rslides")) {
                                        const t = jQuery(e);
                                        "function" == typeof t.responsiveSlides && t.responsiveSlides({
                                            speed: 999999999999,
                                            pause: !0,
                                            nav: !1,
                                            auto: !1
                                        })
                                    }
                                    for (let e of a.A.picks(".cycle-slideshow")) {
                                        const t = jQuery(e);
                                        "function" == typeof t.cycle && t.cycle("pause")
                                    }
                                    for (let e of a.A.picks(".uk-slideshow, .uk-slider, .uk-slider-container")) {
                                        const t = jQuery(e),
                                            i = t.attr("id");
                                        i || t.attr("id", a.A.strings.random()), t.trigger("mouseover"), "function" == typeof t.on && t.on("click mouseout focus focusout mouseleave", (() => {
                                            t.trigger("mouseover"), window.stopUIkitCarousel(i)
                                        })), window.stopUIkitCarousel || (window.stopUIkitCarousel = e => {
                                            if ("undefined" != typeof UIkit) {
                                                const t = UIkit.slideshow(`#${e}`);
                                                UIkit.slideshow && t && "function" == typeof t.stop && t.stop()
                                            }
                                        }), window.stopUIkitCarousel(i)
                                    }
                                    for (let e of a.A.picks(".rev_slider_wrapper, .rev_slider")) {
                                        const t = jQuery(e),
                                            i = t.attr("id"),
                                            n = i ? i.split("_")[2] : null;
                                        if (n) try {
                                            "function" == typeof t.revpause && t.revpause(), jQuery.globalEval(`revapi${n}.bind("revolution.slide.onloaded",function(e){revapi${n}.revpause();});`)
                                        } catch (e) {}
                                    }
                                    for (let e of a.A.picks('[data-creator="Smart Slider 3"], .n2-ss-slider, .n2-ow')) "undefined" != typeof n2 && n2(jQuery(e)).trigger("mediaStarted", "lightbox");
                                    for (let e of a.A.picks("[data-ride]")) {
                                        const t = jQuery(e);
                                        t.carousel && (t.carousel({
                                            pause: !0,
                                            interval: !1
                                        }), t.carousel("pause"))
                                    }
                                }
                            },
                            getSelectors: () => ['[data-acsb-carousel="true"]', '[each="cards"]', ".owl-carousel", ".slick-slider", ".wpm-6310-carousel", ".jcarousel", ".rslides", ".nivoSlider", ".fusion-carousel", ".flexslider", ".uk-slideshow", ".cycle-slideshow", ".et_pb_slider", ".q_slider", ".bxslider", ".flickity-enabled", ".bx-viewport", ".rev_slider_wrapper", ".rev_slider", ".ls-container", "[data-ride]", ".swiper-container", ".swiper", ".swiper-initialized", ".swiper-container-initialized", ".yotpo-reviews-carousel", '[data-creator="Smart Slider 3"]', '[id="cycler"]', ".bootslider", ".n2-ss-slider", ".n2-ow", ".carousel", ".slider", '[class*="carousel" i]', '[class*="slider" i]', '[class*="slides" i]', '[class*="slideshow" i]', '[id*="carousel" i]', '[id*="slider" i]', '[id*="slides" i]', '[id*="slideshow" i]']
                        },
                        behaviors: {
                            init() {
                                this._enableKeyboardClicking(), this._enableElementRebinding(), this._enableKeyboardFocus(), this._enableFormBehaviors(), this._enableScrollFocus(), this._enableMouseFocus(), this._enablePressedFamily(), this._enableGeneralPressed(), this._preventKeynavTraps(), this._fixTabEventsOnQuantityInputs()
                            },
                            _enableMouseFocus() {
                                a.A.events.on(document, "focusin", (e => {
                                    if (!e.target.matches("[data-acsb-force-no-mouse-focus]")) {
                                        if (this.$focused && !this.$focused.contains(e.target)) {
                                            const t = e.target.closest('[data-acsb-menu="li"]');
                                            t && t.contains(this.$focused) || a.A.events.trigger(this.$focused, "mouseleave mouseout")
                                        }
                                        this.$focused = e.target, a.A.events.trigger(e.target, "mouseover mouseenter")
                                    }
                                }))
                            },
                            _enableGeneralPressed() {
                                a.A.events.on(window, o.A.events.domChanged, (e => {
                                    if (e.detail.clickProcess)
                                        for (let t of e.detail.$elements) {
                                            if (t.matches("[data-acsb-state-expanded]")) continue;
                                            if (t.closest("[data-acsb], [data-acsb-pressed-family]") || !t.matches('[role="button"]')) continue;
                                            let e, i;
                                            if ("class" === t.acsbChange.attribute) e = t.acsbChange.oldValue, i = t.className;
                                            else if ("attributes" === t.acsbChange.type) {
                                                const n = t.getAttribute(t.acsbChange.attribute);
                                                null === n ? (e = t.acsbChange.attribute, t.acsbChange.oldValue && (e = `${t.acsbChange.attribute}=${t.acsbChange.oldValue}`)) : (i = t.acsbChange.attribute, n && (i = `${i}=${n}`), t.acsbChange.oldValue && (e = `${t.acsbChange.attribute}=${n}`))
                                            }
                                            a.A.strings.inString(i, "selected") && !a.A.strings.inString(e, "selected") || a.A.strings.inString(i, "checked") && !a.A.strings.inString(e, "checked") || a.A.strings.inString(i, "active") && !a.A.strings.inString(e, "active") ? t.setAttribute("aria-pressed", "true") : (!a.A.strings.inString(i, "selected") && a.A.strings.inString(e, "selected") || !a.A.strings.inString(i, "checked") && a.A.strings.inString(e, "checked") || !a.A.strings.inString(i, "active") && a.A.strings.inString(e, "active")) && "true" === t.getAttribute("aria-pressed") && t.setAttribute("aria-pressed", "false")
                                        }
                                }))
                            },
                            _enablePressedFamily() {
                                a.A.events.on(window, o.A.events.domChanged, (e => {
                                    if (e.detail.clickProcess)
                                        for (let t of e.detail.$elements) {
                                            if (t.matches("[data-acsb-state-expanded]")) continue;
                                            if (t.closest("[data-acsb]")) continue;
                                            const e = t.closest('[role="button"][data-acsb-pressed-family][aria-pressed]');
                                            if (!e) continue;
                                            const i = e.getAttribute("data-acsb-pressed-family"),
                                                n = a.A.picks(`[data-acsb-pressed-family="${i}"]`);
                                            for (let e of n) a.A.strings.inString(e.outerHTML, "selected") || a.A.strings.inString(e.outerHTML, "checked") || a.A.strings.inString(e.outerHTML, "active") ? e.setAttribute("aria-pressed", "true") : e.setAttribute("aria-pressed", "false")
                                        }
                                }))
                            },
                            _enableKeyboardFocus() {
                                a.A.events.on(document, "focusin", (e => {
                                    if (e.target.closest("[data-acsb]")) return;
                                    let t = e.target.closest('[data-acsb-navigable="true"]');
                                    t || (t = e.target), (t.offsetWidth < 1 || t.offsetHeight < 1) && t.parentElement && (t = t.parentElement), a.A.elements.attrs(a.A.picks('[data-acsb-focused="true"]'), ["data-acsb-focused"], !0), t.setAttribute("data-acsb-focused", "true"), u.navigation.process(a.A.picks("*", t), !1, !1);
                                    const i = t.parentElement ? .closest('[data-acsb-overflower="true"]'),
                                        n = t.matches('[data-acsb-overflower="true"]');
                                    (i || n && t) && t.setAttribute("data-acsb-inner-focus", "true")
                                })), a.A.events.on(document, "focusout", (e => {
                                    const t = e.target.closest('[data-acsb-focused="true"]');
                                    t && (t.removeAttribute("data-acsb-focused"), u.navigation.process(a.A.picks("*", t), !1, !1))
                                }))
                            },
                            _findQuantityInputs: e => e.filter((e => e.matches('[data-acsb-textual-type="quantity"]'))),
                            _fixTabEventsOnQuantityInputs(e = []) {
                                const t = e.filter((e => "input" === e.localName)),
                                    i = t.length ? t : Array.from(document.querySelectorAll("input")),
                                    n = this._findQuantityInputs(i);
                                let s = "";
                                n.forEach((e => {
                                    a.A.events.on(e, "keydown keyup", (e => {
                                        "Tab" === e.key && (s = e, e.stopImmediatePropagation()), "Shift" === e.key && s.shiftKey && e.stopImmediatePropagation()
                                    }))
                                }))
                            },
                            _enableElementRebinding() {
                                a.A.events.on(window, o.A.events.domChanged, (e => {
                                    const t = e.detail.$elements.includes(document.body) || e.detail.$elements.includes(a.A.pick("html")),
                                        i = [];
                                    if (t) {
                                        for (let e of a.A.picks("*")) e.closest("[data-acsb]") || i.push(e);
                                        i.unshift(document.body)
                                    } else
                                        for (let t of e.detail.$elements) {
                                            for (let e of a.A.picks("*", t)) i.push(e);
                                            i.unshift(t);
                                            const e = t.closest('[data-acsb-hidden="true"]');
                                            e && i.unshift(e)
                                        }
                                    setTimeout((() => {
                                        i.length < 1 || (u.navigation.process(i, !0, e.detail.clickProcess, e.detail.newElements), u.overlays.process(i, e.detail.clickProcess, !1), this._fixTabEventsOnQuantityInputs(i), a.A.events.trigger(window, o.A.events.keynavRebind, {
                                            elements: i,
                                            bodyChanged: t,
                                            visibilityChanged: e.detail.visibilityChanged,
                                            clickProcess: e.detail.clickProcess,
                                            styleChanged: e.detail.styleChanged,
                                            newElements: e.detail.newElements
                                        }))
                                    }), e.detail.visibilityChanged ? 0 : e.detail.styleChanged ? 1e3 : 500)
                                }))
                            },
                            _enableScrollFocus() {
                                a.A.events.on(document, "acsbHit", (e => {
                                    const t = e.target.closest('[data-acsb-click-process="true"]');
                                    if (this.scrollingProcess || !t) return;
                                    this.scrollingProcess = !0, setTimeout((() => this.scrollingProcess = !1), 300), (() => {
                                        if (!t.matches("a[href]")) return;
                                        const e = t.getAttribute("href");
                                        if (!e || "#" !== e.substr(0)) return;
                                        const i = a.A.pick(e);
                                        if (i)
                                            for (let e of [500, 1e3]) setTimeout((() => {
                                                if (!n.A.isVisible(i)) return;
                                                const e = a.A.elements.focused();
                                                e && "BODY" !== e.tagName && e !== t || a.A.elements.focus(i)
                                            }), e)
                                    })();
                                    const s = window.scrollY,
                                        r = a.A.utilities.getWinSize().height;
                                    setTimeout((async () => {
                                        const e = a.A.elements.focused();
                                        e && "BODY" !== e.tagName && e !== t || "A" === t.tagName && "button" !== t.getAttribute("role") || !(s - window.scrollY >= r - r / 100 * 20 || window.scrollY - s >= r - r / 100 * 20) || (await i.e(494).then(i.bind(i, 121))).default._focusWindowTop()
                                    }), 1500)
                                }))
                            },
                            _enableKeyboardClicking() {
                                a.A.events.on(document, "click mousedown", (e => {
                                    3 === e.which || e.target.closest('[data-acsb-click-process="true"], [data-acsb]') || a.A.pick('[data-acsb-click-process="true"]', e.target) || this.fireHit(e.target)
                                })), a.A.events.on(document, "acsbHitting", (e => {
                                    const t = e.target.closest('[data-acsb-clickable="true"]');
                                    t && "true" !== t.getAttribute("data-acsb-click-process") && (t.setAttribute("data-acsb-click-process", "true"), setTimeout((() => t.removeAttribute("data-acsb-click-process")), 1250), a.A.events.trigger(e.target, "acsbHit"))
                                })), a.A.events.on(document, "keydown", (e => {
                                    if (!e.target.click || ![13, 32].includes(e.which) || n.A.isFormField(e.target) || e.target.closest("[data-acsb]")) return;
                                    if (["mat-select"].includes(e.target.localName)) return;
                                    const t = a.A.elements.offsets(e.target),
                                        i = n.A.getElByOffset(t.left, t.top);
                                    let s = e.target;
                                    if (!s.hasAttribute("data-acsb-clickable"))
                                        if (e.target.contains(i) && "function" == typeof i.click) s = i;
                                        else
                                            for (let t of a.A.picks("*", e.target)) n.A.isFormField(t) || "function" != typeof t.click || (s = t);
                                    const r = s.matches("a[href], button, details");
                                    if (32 === e.which || s !== e.target && e.target.contains(s) ? (e.preventDefault(), a.A.elements.click(s)) : r || a.A.elements.click(s), r) return setTimeout((() => this.fireHit(s)), 0);
                                    this.fireHit(s)
                                }))
                            },
                            _enableFormBehaviors() {
                                a.A.events.on(document, "keydown", (e => {
                                    if ("INPUT" !== e.target.tagName || e.target.disabled || ![13, 32].includes(e.which) || !["checkbox", "radio"].includes(e.target.type)) return;
                                    e.preventDefault(), e.target.checked = !e.target.checked, a.A.events.trigger(e.target, "change"), a.A.events.trigger(e.target, "click");
                                    const t = a.A.pick(`'label[for="${e.target.getAttribute("id")}"]'`);
                                    t && a.A.events.trigger(t, "click")
                                })), a.A.events.on(document, "keydown", (e => {
                                    if ("INPUT" !== e.target.tagName || "radio" !== e.target.type || e.target.disabled || ![40, 38, 37, 39].includes(e.which)) return;
                                    a.A.events.prevent(e);
                                    let t = 0,
                                        i = 0,
                                        n = (() => {
                                            const t = e.target.closest("form");
                                            return t ? a.A.picks(`input[name="${e.target.name}"][type="radio"][data-acsb-now-navigable="true"]`, t) : a.A.picks(`input[name="${e.target.name}"][type="radio"][data-acsb-now-navigable="true"]`)
                                        })();
                                    for (let s of n) s === e.target ? (40 !== e.which && 37 !== e.which || (n[i - 1] ? t = i - 1 : 0 === t && (t = n.length - 1)), 38 !== e.which && 39 !== e.which || (n[i + 1] ? t = i + 1 : t === n.length - 1 && (t = 0)), i++) : i++;
                                    if (!n[t]) return;
                                    const s = a.A.pick(`label[for="${n[t].id}"]`);
                                    e.target.checked = !1, n[t].checked = !0, a.A.events.trigger(n[t], "change"), a.A.events.trigger(n[t], "click"), s && a.A.events.trigger(s, "click"), a.A.elements.focus(n[t])
                                }))
                            },
                            _preventKeynavTraps() {
                                a.A.events.on(document, "keydown", ((e, t) => {
                                    if (27 === e.which && "SELECT" !== e.tagName && !t.closest('[data-acsb-menu="a"]')) {
                                        if (this.$keydownBlur && this.$keydownBlur !== t) return delete this.$keydownBlur;
                                        this.$keydownBlur = t, e.target.blur()
                                    }
                                })), a.A.events.on(document, "keyup", ((e, t) => {
                                    if (9 === e.which && t !== document.body) {
                                        if (t.closest("[data-acsb], [data-acsb-overlay]")) return delete this.$previousKeypress, void delete this.$keydownBlur;
                                        if (this.$previousKeypress === t) {
                                            let i;
                                            const n = a.A.picks('[data-acsb-now-navigable="true"]');
                                            i = e.shiftKey ? n[n.indexOf(t) - 1] : n[n.indexOf(t) + 1], i && (a.A.elements.focus(i), delete this.$previousKeypress, delete this.$keydownBlur)
                                        } else this.$previousKeypress = t
                                    }
                                })), a.A.events.on(window, "visibilitychange", (() => {
                                    delete this.$previousKeypress, delete this.$keydownBlur
                                }))
                            },
                            fireHit(e) {
                                e.acsbHitting || (e.acsbHitting = !0, a.A.events.trigger(e, "acsbHitting"), setTimeout((() => e.acsbHitting = !1), 1e3))
                            }
                        },
                        inlinePopups: {
                            init() {
                                this._handleDatePickers(), a.A.events.on(window, o.A.events.elementShow, (e => {
                                    e.detail.clickProcess && this._isInlinePopup(e.detail.$el) && (this.processing = !0, u.overlays.process([e.detail.$el], !0), this._process(e.detail.$el), setTimeout((() => this.processing = !1), 300))
                                }))
                            },
                            _process(e) {
                                const t = a.A.elements.focused(),
                                    r = a.A.pick('[data-acsb-click-process="true"]'),
                                    o = (() => {
                                        let t;
                                        for (let i of a.A.elements.parents(e)) "fixed" === a.A.elements.style(i, "position") && (t = i);
                                        if (!t)
                                            for (let i of a.A.elements.parents(e)) "absolute" === a.A.elements.style(i, "position") && (t = i);
                                        return t
                                    })();
                                if (o && (e = o, o.setAttribute("aria-modal", "true"), e.getAttribute("role") || o.setAttribute("role", "dialog")), e.getAttribute("role") || n.A.isFormField(e) || r && r.closest('[role="tab"]') && e.setAttribute("role", "tabpanel"), e.acsbOriginalFocus = r || u.$lastFocused, !e.acsbInlinePopupBound) {
                                    c.A.clickables._setTextualOpsTags(e);
                                    let t = (() => {
                                        for (let t of a.A.picks('[data-acsb-textual-ops="close"]', e))
                                            if (n.A.isVisible(t)) return t
                                    })();
                                    r && !t && "menu" === r.getAttribute("data-acsb-textual-ops") && (t = c.A.srOnly.create(s.A.get("REMOVE"), {
                                        role: "button",
                                        "data-acsb-textual-ops": "close"
                                    }, "span", !0), c.A.srOnly.append(e, t)), t && a.A.events.on(t, "acsbHit", (() => a.A.elements.focus(e.acsbOriginalFocus))), a.A.events.on(e, "keydown", (async s => {
                                        27 === s.which && "SELECT" !== s.target.tagName && (t ? a.A.elements.click(t) : r && (a.A.elements.click(r), setTimeout((() => {
                                            n.A.isVisible(e) && n.A.fakeBodyClick()
                                        }), 1e3)), (await i.e(494).then(i.bind(i, 473))).default.tooltips.remove(), a.A.elements.focus(e.acsbOriginalFocus), setTimeout((() => this.processing = !1), t ? 300 : 1250))
                                    }))
                                }
                                e.contains(t) || t && "BODY" !== t.tagName && t !== r || a.A.elements.focus(e.closest('[data-acsb-hidden="false"]') || e), e.acsbInlinePopupBound = !0
                            },
                            _isInlinePopup(e) {
                                const t = a.A.pick('[data-acsb-click-process="true"]');
                                return !(!t || e.offsetWidth < 100 && e.offsetHeight < 100 || a.A.pick("[data-acsb-overlay].acsb-active") || e.closest('[data-acsb], [data-acsb-carousel], [data-acsb-overlay], [data-acsb-menu="li"]') || e.closest("form") && (n.A.isFormField(t) || n.A.isFormButton(t)) || !e.getAttribute("data-acsb-hidden") || !n.A.isVisible(e) || (u.navigation.process(a.A.picks("*", e)), !a.A.pick('[data-acsb-now-navigable="true"]', e) || n.A.getShownText(e).length < 1))
                            },
                            _handleDatePickers() {
                                a.A.events.on(window, o.A.events.elementShow, (e => {
                                    if (!e.detail.$el.matches(".ui-datepicker")) return;
                                    const t = a.A.elements.focused(),
                                        r = e;
                                    a.A.elements.attrs(r.detail.$el, {
                                        "arial-label": s.A.get("CALENDAR"),
                                        role: "dialog"
                                    }), r.detail.$el.datePickerBound || (e.detail.$el.$originalFocus = t, "INPUT" === t.tagName && n.A.isVisible(r.detail.$el) && a.A.elements.focus(r.detail.$el), a.A.events.on(t, "keydown focus", (e => {
                                        "focus" !== e.type || r.detail.$el.acsbCalendarClosing || a.A.elements.focus(r.detail.$el), "keydown" === e.type && 27 === e.which && (r.detail.$el.acsbCalendarClosing = !0, a.A.elements.focus(t))
                                    })), a.A.events.on(r.detail.$el, "click keydown", (async e => {
                                        if (13 === e.which || "click" === e.type)
                                            if (e.target.matches(".ui-datepicker-next") || e.target.matches(".ui-datepicker-prev")) {
                                                const t = e.target.matches(".ui-datepicker-prev") ? ".ui-datepicker-prev" : ".ui-datepicker-next",
                                                    n = (await i.e(494).then(i.bind(i, 473))).default;
                                                n.processor.start(), setTimeout((() => {
                                                    const e = a.A.pick(t);
                                                    e && a.A.elements.focus(e), n.processor.end()
                                                }), 1500)
                                            } else setTimeout((() => {
                                                r.detail.$el.acsbCalendarClosing = !0, a.A.elements.focus(t)
                                            }), 500);
                                        27 === e.which && (r.detail.$el.acsbCalendarClosing = !0, a.A.elements.focus(t))
                                    }))), e.detail.$el.datePickerBound = !0
                                })), a.A.events.on(window, o.A.events.elementHide, (e => {
                                    e.detail.$el.matches(".ui-datepicker") && a.A.elements.isElement(e.detail.$el.$originalFocus) && (e.detail.$el.acsbCalendarClosing = !1)
                                }))
                            }
                        }
                    },
                    h = u
            },
            766: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => h
                });
                var n = i(83),
                    s = i(916),
                    a = i(78),
                    r = i(345),
                    o = i(289),
                    l = i(936),
                    c = (i(278), i(921)),
                    d = i(941);
                const u = {
                        rebinds: 0,
                        init() {
                            s.A.widget.disableBgProcess && !n.A.wave || (this.rebinds < 1 && c.A.events.on(window, n.A.events.keynavRebind, (() => {
                                this.rebinds = this.rebinds + 1, this.init()
                            })), this._handleGenerals(), this._handlePageTitle(), this._handleFigureElements(), this._handleNonImageAlts(), this._handleIncorrectAria(), this._handleBreadCrumbs(), this._handleReviewStars(), this.tables.process(), this.srOnly.process(), this.headings.process(), this.decorations.process(), this.clickables.process(), this.landmarks.process(), this.scrapper.process(), this.forms.process(), this.alts.process(), u._handleDocLang())
                        },
                        async enable() {
                            if (s.A.actions.accessMode && s.A.actions.accessMode.enabled) this.init();
                            else {
                                const e = (await i.e(494).then(i.bind(i, 342))).default;
                                e.disable("screenReader", !1), e.enable("accessMode", !1, !1)
                            }
                        },
                        enableFast() {
                            this.init()
                        },
                        async disable() {
                            const e = await i.e(494).then(i.bind(i, 342));
                            e.accessMode && e.accessMode.enabled && e.disable("accessMode", !1)
                        },
                        backupProcess() {
                            for (let e of c.A.picks("form")) o.A.isVisible(e) || c.A.elements.remove(e);
                            for (let e of c.A.picks("select, input, textarea")) o.A.isVisible(e) || c.A.elements.remove(e);
                            for (let e of c.A.picks("a")) {
                                if (o.A.isVisible(e)) continue;
                                const t = e.closest('[role="heading"], .card-title');
                                t && c.A.elements.text(t) === c.A.elements.text(e) && t.remove()
                            }
                            for (let e of c.A.picks("input, select, textarea")) o.A.isVisible(e) ? u.forms.field.process(e) : c.A.elements.remove(e);
                            for (let e of c.A.picks("img")) {
                                const t = e.getAttribute("src");
                                if (!t || t.length < 5 || !e.getAttribute("alt")) {
                                    const t = e.closest('[role="heading"], a');
                                    if (t && !c.A.elements.text(t)) {
                                        t.remove();
                                        continue
                                    }
                                    c.A.elements.remove(e)
                                }
                            }
                            for (let e of c.A.picks('[data-acsb-clickable="true"]'))
                                if (!c.A.elements.text(e) && !e.getAttribute("aria-label")) {
                                    let t = !1;
                                    for (let i of c.A.picks("img", e))
                                        if (i.getAttribute("alt")) {
                                            t = !0;
                                            break
                                        }
                                    t || c.A.elements.remove(e)
                                }
                            for (let e of c.A.picks("label")) c.A.elements.text(e) || c.A.pick("input, textarea, select", e) || e.remove();
                            for (let e of c.A.picks("th")) c.A.elements.text(e) || c.A.elements.remove(e);
                            this._handleGenerals()
                        },
                        async playAudio() {
                            if (!window.acsbChildFrame) try {
                                ! function(e) {
                                    if (!e.match(/^data:[^;]+;base64,/)) throw new Error("Invalid dataURIString");
                                    const t = e.replace(/^data:[^;]+;base64,/, ""),
                                        i = atob(t),
                                        n = new ArrayBuffer(i.length),
                                        s = new Uint8Array(n);
                                    for (let e = 0; e < i.length; e++) s[e] = i.charCodeAt(e);
                                    const a = new window.AudioContext;
                                    a.decodeAudioData(n, (e => {
                                        const t = a.createBufferSource();
                                        t.buffer = e, t.connect(a.destination), t.start(0)
                                    }))
                                }((await i.e(857).then(i.bind(i, 86))).default)
                            } catch (e) {
                                console.error("Error playing audio:", e)
                            }
                        },
                        async _handleDocLang() {
                            const e = c.A.pick("html");
                            let t = e.getAttribute("lang");
                            t && (e.lang = t = c.A.strings.removeChars(c.A.strings.removeWhites(t), [], !0)), (!t || t.length < 2 || t.length > 5) && e.setAttribute("lang", await r.A.getDocLang())
                        },
                        _handleGenerals() {
                            for (let e of c.A.picks('[role="img"]')) e.acsbGivenRoleImg || (e.acsbGivenRoleImg = !0, e.getAttribute("aria-label") || e.removeAttribute("role"));
                            for (let e of c.A.picks('[role="menu"], [role="menubar"]'))
                                if (!e.acsbGivenMenu) {
                                    e.acsbGivenMenu = !0, e.removeAttribute("role");
                                    for (let e of c.A.picks('[role="menuitem"]')) e.removeAttribute("role");
                                    for (let e of c.A.picks('li[role="presentation"]')) e.removeAttribute("role")
                                }
                            for (let e of c.A.picks('[role="tablist"]'))
                                if (!e.acsbGivenTablist)
                                    if (e.acsbGivenTablist = !0, c.A.pick('[role="tab"]', e)) {
                                        if ("UL" === e.tagName)
                                            for (let t of c.A.picks("li", e)) t.getAttribute("role") || (t.removeAttribute("aria-selected"), t.setAttribute("role", "presentation"))
                                    } else {
                                        e.removeAttribute("role");
                                        for (let t of c.A.picks('[role="tab"], [role="tabpanel"]', e)) t.removeAttribute("role")
                                    }
                            for (let e of c.A.picks("marquee")) e.acsbMarqueeProcessed || (e.acsbMarqueeProcessed = !0, e.stop());
                            for (let e of c.A.picks("ul, ol")) {
                                if (e.acsbIncorrectListProcessed) continue;
                                e.acsbIncorrectListProcessed = !0;
                                const t = c.A.picks("li", e);
                                t.length <= 1 && c.A.elements.parents(e, "ul, ol", !0).length < 1 && (c.A.elements.attrs(t, {
                                    role: "presentation"
                                }), e.setAttribute("role", "presentation"));
                                let i = 0;
                                for (let t of e.children) "LI" !== t.tagName && i++;
                                if (i >= e.children.length) e.setAttribute("role", "presentation");
                                else
                                    for (let t of e.children) "LI" !== t.tagName && (t.setAttribute("role", "listitem"), t.matches('[role="button"]') ? u.srOnly.append(t, u.srOnly.create(r.A.get("BUTTON"))) : "A" === t.tagName && u.srOnly.append(t, u.srOnly.create(r.A.get("LINK"))))
                            }
                            for (let e of c.A.picks("li")) e.acsbIncorrectLiParent || (e.acsbIncorrectLiParent = !0, ["UL", "OL"].includes(e.parentElement.tagName) || e.setAttribute("role", "presentation"));
                            for (let e of c.A.picks('input[type="radio"]')) e.value && !e.getAttribute("aria-label") && ["size", "color"].includes(e.name) && e.setAttribute("aria-label", e.value);
                            for (let e of c.A.picks("a[href]")) {
                                if (e.acsbProvidedSkipLinksProcessed) continue;
                                e.acsbProvidedSkipLinksProcessed = !0;
                                const t = c.A.strings.inString(e.outerHTML, "skip");
                                !e.href ? .includes("#") || e.closest("[data-acsb]") || "true" !== e.getAttribute("data-acsb-navigable") || "0" !== c.A.elements.style(e, "opacity") && e.offsetWidth > 1 && e.offsetHeight > 1 && !t || !t || e.remove()
                            }
                            for (let e of c.A.picks("[data-value]")) {
                                if (e.acsbDataValueBound) continue;
                                e.acsbDataValueBound = !0;
                                const t = c.A.elements.text(e),
                                    i = e.getAttribute("data-value");
                                if (!i) return;
                                const n = c.A.pick("input", e);
                                n ? n.getAttribute("aria-label") || n.setAttribute("aria-label", i) : i && !t && u.srOnly.append(e, u.srOnly.create(i))
                            }
                            for (let e of c.A.picks("i, span, svg")) e.acsbPresentationBound || (e.acsbPresentationBound = !0, e.getAttribute("role") || e.getAttribute("aria-label") || c.A.elements.text(e).length > 0 || e.matches('[data-acsb-clickable="true"]') || e.offsetWidth > 60 && e.offsetHeight > 60 || c.A.pick("a, img, input, select, textarea", e) || e.closest("[data-acsb], [data-acsb-sr-only]") || "SPAN" === e.tagName && c.A.picks("*", e).length > 1 || this._hasPseudoContent(e) || a.A.navigation.setHidden(e, !0));
                            for (let e of c.A.picks('[aria-haspopup="true"]')) e.acsbProvidedHaspopupProcessed || (e.acsbProvidedHaspopupProcessed = !0, e.matches('[data-acsb-menu="a"]') || (e.removeAttribute("aria-haspopup"), e.setAttribute("aria-expanded", "false")));
                            for (let e of c.A.picks(".fs-timeline .fs-timeline-entry")) e.acsbTimelinePluginProcessed || (e.acsbTimelinePluginProcessed = !0, e.setAttribute("role", "link"), e.setAttribute("aria-label", `Instagram - ${c.A.elements.text(e)}`));
                            for (let e of ["data-original-title", "data-option-title", "data-attr-value", "data-option-label", "data-option", "data-value", "data-title", "title"]) {
                                const t = `acsbDefault${e.replace(/-/i,"_")}Bound`;
                                for (let i of c.A.picks(`[${e}]`)) {
                                    if (i[t]) continue;
                                    i[t] = !0;
                                    const n = i.getAttribute(e);
                                    if (!n) continue;
                                    const s = c.A.elements.text(i, !0),
                                        a = n.replace(new RegExp(`(^${s}|${s}$)`, "g"), "");
                                    if (!a) continue;
                                    const r = c.A.elements.text(i) + (i.getAttribute("aria-label") || "") + (i.getAttribute("alt") || "");
                                    c.A.strings.inString(r, a) || ("IMG" === i.tagName ? i.hasAttribute("alt") || i.setAttribute("alt", a) : o.A.isFormField(i) ? i.setAttribute("aria-label", a) : (i.removeAttribute("title"), u.srOnly.append(i, u.srOnly.create(a), !1, !0)))
                                }
                            }
                            for (let e of ["aria-controls", "aria-describedby", "aria-labelledby"])
                                for (let t of c.A.picks(`[${e}]`)) {
                                    const i = t.getAttribute(e);
                                    if (!i) continue;
                                    const n = c.A.picks(`#${i}`);
                                    1 === n.length && c.A.elements.text(n[0]) || t.removeAttribute(e)
                                }
                            c.A.elements.attrs(c.A.picks("[autofocus]"), ["autofocus"], !0), c.A.elements.attrs(c.A.picks('[role="application"]'), ["role"], !0);
                            for (let e of document.querySelectorAll('[http-equiv="refresh"]')) e.remove();
                            (() => {
                                const e = {};
                                for (let t of document.querySelectorAll("label[for]")) {
                                    const i = t.getAttribute("for");
                                    i && (e[i] || (e[i] = []), e[i].push(t))
                                }
                                for (let t in e) {
                                    if (e[t].length <= 1) continue;
                                    let i = c.A.elements.text(e[t][0]),
                                        n = e[t][0];
                                    for (let s of e[t]) {
                                        const e = c.A.elements.text(s);
                                        i && e.length <= i || (n = s, i = e)
                                    }
                                    for (let i of e[t]) i !== n && i.removeAttribute("for")
                                }
                            })()
                        },
                        _hasPseudoContent(e) {
                            const {
                                before: t,
                                after: i
                            } = c.A.elements.getPsuedoElements(e);
                            if ((t.content || i.content) && ("none" !== t.display || "none" !== i.display)) return !0
                        },
                        _handlePageTitle() {
                            if (this.rebinds > 0) return;
                            let e, t = c.A.pick("title");
                            const i = c.A.pick('[aria-level="1"], h1'),
                                n = c.A.elements.text(t);
                            if (i && (e = c.A.elements.text(i)), t || (t = c.A.elements.create("title"), c.A.elements.append(t, c.A.pick("head"))), !(n.split(" ").length > 3))
                                if (e && t && !c.A.strings.inString(n, e) && !c.A.strings.inString(e, n)) t.textContent = `${n} | ${e}`;
                                else {
                                    const i = c.A.pick('h2, [aria-level="2"], [aria-level="3"]');
                                    if (e && e !== n) t.textContent = `${n} | ${e}`;
                                    else if (i) {
                                        const e = c.A.elements.text(i);
                                        e && (t.textContent = `${n} | ${e}`)
                                    } else t.textContent = `${n} | Website Page`
                                }
                        },
                        _handleReviewStars() {
                            const e = 'img[src*="star" i], [class*="star" i], [class*="rating" i], [class*="rate" i], [data-acsb-possible-star="true" i]';
                            let t, i;
                            for (let e of c.A.picks('[itemprop="ratingValue"]')) {
                                if (e.acsbReviewItemPropBound) continue;
                                e.acsbReviewItemPropBound = !0;
                                const t = c.A.elements.text(e).replace(".0", "");
                                c.A.elements.insert(this.srOnly.create(`${t}/5 ${r.A.get("RATING")}`, {
                                    "data-acsb-verdict": t
                                }), e)
                            }
                            for (let e of c.A.picks("[data-reviews]")) {
                                if (e.acsbDataReviews) continue;
                                e.acsbDataReviews = !0;
                                const t = e.getAttribute("data-reviews") ? .replace(".0", "");
                                c.A.elements.insert(this.srOnly.create(`${t}/5 ${r.A.get("RATING")}`, {
                                    "data-acsb-verdict": t
                                }), e)
                            }
                            for (let t of c.A.picks(e))
                                if (!t.acsbPossibleStarBound && (t.acsbPossibleStarBound = !0, t.parentElement && 1 === c.A.picks(e, t.parentElement).length)) {
                                    const e = c.A.picks("svg, span, img, i", t.parentElement);
                                    5 === e.length ? c.A.elements.classes(e, "acsb-star") : t.parentElement.setAttribute("data-acsb-possible-star", "true")
                                }
                            for (let n of c.A.picks(e)) {
                                if (!n.parentElement || n.parentElement.acsbStarsProcessed) continue;
                                if (n.parentElement.acsbStarsProcessed = !0, c.A.strings.inString(n.getAttribute("class"), "start")) continue;
                                let s = n.parentElement["aria-label"],
                                    a = [n].concat(c.A.elements.next(n, e, !0)),
                                    o = null,
                                    l = 5;
                                if (5 !== a.length) continue;
                                let d = 0;
                                for (let e of a) {
                                    const n = e.getAttribute("class");
                                    if (o && n !== o) {
                                        l = d, t = n, i = o;
                                        break
                                    }
                                    o = n, d++
                                }
                                for (let e of c.A.picks("*", n.parentElement)) e === n || a.includes(e) || this.srOnly.isSrOnly(e) && (s = !0);
                                s || c.A.elements.insert(this.srOnly.create(`${l}/5 ${r.A.get("RATING")}`, {
                                    "data-acsb-verdict": l
                                }), n)
                            }
                            for (let n of c.A.picks("[data-acsb-verdict]"))
                                if (!n.acsbVerdictBound) {
                                    n.acsbVerdictBound = !0;
                                    for (let t of c.A.picks(e, n.parentElement)) a.A.navigation.setHidden(t, !0);
                                    if ("5" === n.getAttribute("data-acsb-verdict")) {
                                        const e = c.A.elements.next(n, '[class*="star"], [class*="rating"]')[0];
                                        if (!e) continue;
                                        const s = e.getAttribute("class");
                                        s === t ? (n.setAttribute("data-acsb-verdict", "0"), n.textContent = r.A.get("NO_RATING")) : s === i && (n.setAttribute("data-acsb-verdict", "5"), n.textContent = `5/5 ${r.A.get("RATING")}`)
                                    }
                                }
                        },
                        _handleBreadCrumbs() {
                            for (let e of c.A.picks('body [class*="breadc"]')) {
                                if (e.acsbBreadCrumbsBound) continue;
                                if (e.acsbBreadCrumbsBound = !0, e.closest('[data-acsb-bc="true"]') || !["DIV", "SPAN", "UL", "OL", "NAV"].includes(e.tagName) || !c.A.pick("a", e)) {
                                    const t = e.closest("UL", "OL", "NAV", "DIV");
                                    t && c.A.pick("a", t) && !e.closest('[data-acsb-bc="true"]') && (e = t);
                                    continue
                                }
                                let t = e.closest('[role="navigation"], nav');
                                t || (t = c.A.pick('[role="navigation"], nav', e), t = t || e);
                                for (let e of c.A.picks("a", t)) window.location.href.trim().toLowerCase() === e.href.trim().toLowerCase() && e.setAttribute("aria-current", "page");
                                c.A.elements.attrs(t, {
                                    role: "navigation",
                                    "data-acsb-bc": "true",
                                    "aria-label": r.A.get("BREADCRUMBS")
                                })
                            }
                        },
                        _handleNonImageAlts() {
                            for (let e of c.A.picks("[alt]")) {
                                if ("IMG" === e.tagName || e.acsbNonImageAltBound) continue;
                                e.acsbNonImageAltBound = !0;
                                let t, i = e.getAttribute("alt"),
                                    n = e.getAttribute("title");
                                i = i && i.length > 0 ? i.trim() : null, n = n && n.length > 0 ? n.trim() : null, i && i.length > 0 && (t = i), n && i.length > 0 && (t ? c.A.strings.inString(t, n) || c.A.strings.inString(n, t) || (t = `${t} | ${n}`) : t = n), t && e.setAttribute("title", t), e.removeAttribute("alt")
                            }
                        },
                        _handleIncorrectAria() {
                            for (let e of ["aria-describedby", "aria-labelledby"])
                                for (let t of c.A.picks(`[${e}]`)) {
                                    if (t.acsbLabelledByBound) continue;
                                    t.acsbLabelledByBound = !0;
                                    const i = t.getAttribute(e);
                                    (!i || i.length < 1 || !c.A.pick(`#${i}`)) && t.removeAttribute(e)
                                }
                            for (let e of c.A.picks("[title]")) {
                                if (e.acsbTitleBound) continue;
                                e.acsbTitleBound = !0;
                                let t = c.A.elements.text(e);
                                for (let e of c.A.picks('[aria-label]:not([data-acsb-hidden="true"])')) e.ariaLabel && (t = `${t} ${e.ariaLabel}`);
                                for (let e of c.A.picks('img[alt]:not([data-acsb-hidden="true"])')) e.alt && (t = `${t} ${e.alt}`);
                                (!e.title || e.title.length < 1 || c.A.strings.inString(t, e.title)) && e.removeAttribute("title")
                            }
                        },
                        _handleFigureElements() {
                            for (let e of c.A.picks("figure")) e.acsbFigureBound || (e.acsbFigureBound = !0, o.A.getShownText(e).length < 1 && e.setAttribute("role", "none"))
                        },
                        srOnly: {
                            process() {
                                for (let e of c.A.picks('span[data-acsb-hidden="true"], label[data-acsb-hidden="true"], a[data-acsb-hidden="true"], div[data-acsb-hidden="true"], strong[data-acsb-hidden="true"], b[data-acsb-hidden="true"], p[data-acsb-hidden="true"]')) e.acsbGivenSrOnlyBound || (e.acsbGivenSrOnlyBound = !0, !e.closest("[data-acsb-sr-only]") && this.isSrOnly(e) && (e.setAttribute("data-acsb-sr-only", "true"), e.classList.add("acsb-sr-only")));
                                for (let e of c.A.picks(this._getSelectors().join(","))) e.acsbSelectorsSrOnlyBound || ["INPUT", "TEXTAREA", "SELECT"].includes(e.tagName) || (e.acsbSelectorsSrOnlyBound = !0, e.closest("[data-acsb]") || (a.A.navigation.setVisible(e), c.A.elements.attrs(e, {
                                    "data-acsb-sr-only": "true",
                                    "data-acsb-force-visible": "true"
                                })))
                            },
                            isSrOnly(e) {
                                const t = c.A.elements.text(e);
                                if (!t || e.closest("[data-acsb]") || "none" !== c.A.elements.style(e, "background-image") || !["SPAN", "A", "DIV", "STRONG", "P", "B", "LABEL"].includes(e.tagName)) return !1;
                                const i = e.getBoundingClientRect();
                                if (i.width < 1 || i.height < 1) return !1;
                                if (/<[^>]+>/.test(t) || e.matches(this._getSelectors().join(","))) return !0;
                                let n = !0;
                                const s = c.A.picks("*", e);
                                for (let e of s)
                                    if ("SPAN" !== e.tagName || o.A.isClickable(e)) {
                                        n = !1;
                                        break
                                    }
                                try {
                                    return JSON.parse(t), !1
                                } catch (e) {}
                                return !(s.length > 0 && !n || o.A.isClickable(e) || "true" === e.getAttribute("data-acsb-force-hidden") || "true" !== e.getAttribute("data-acsb-hidden") && o.A.isVisible(e))
                            },
                            append(e, t, i = !0, n = !1) {
                                const s = `[data-acsb-sr-only="true"][data-acsb-sr-only-position="${i?"before":"after"}"]`,
                                    a = c.A.pick(s, e);
                                if (!a) {
                                    const n = c.A.elements.text(e).length ? " - " : "";
                                    return t.textContent = i ? `${t.textContent}${n}` : `${n}${t.textContent}`, t.setAttribute("data-acsb-sr-only-position", i ? "before" : "after"), c.A.elements.append(t, e, i)
                                }
                                let r = t.textContent || t.ariaLabel;
                                a.textContent && (a.textContent = a.textContent.replace(/(\s-\s$|^\s-\s)/, ""), r = n ? ` - ${t.textContent} ${a.textContent}` : `${a.textContent} - ${t.textContent}`), a.textContent = r.replace(/\s+/g, " ")
                            },
                            create(e, t = {}, i = "span", n = !1) {
                                n && (t.tabindex = "0", t["data-acsb-clickable"] = "true", t["data-acsb-force-navigable"] = "true"), t.class ? t.class = `acsb-sr-only ${t.class}` : t.class = "acsb-sr-only";
                                const s = c.A.elements.create(i, Object.assign(t, {
                                    "data-acsb-sr-only": "true",
                                    "data-acsb-force-visible": "true"
                                }));
                                return e = e ? .trim(), e && (s.textContent = `${e}`), n && a.A.navigation.setNavigable(s), s
                            },
                            _getSelectors: () => [".sr-only", ".sronly", ".sr-text", ".srtext", ".show-for-sr", ".text-for-sr", ".visually-hidden", ".screen-reader", ".screen-reader-only", ".screen-reader-text", ".screen-reader-only-text", ".elementor-screen-only", "[data-acsb-sr-only]"]
                        },
                        headings: {
                            sizes: {},
                            badFakeSelectors: 'h1, h2, h3, h4, h5, h6, table, form, [data-acsb], [data-acsb-navigable="true"], [data-acsb-clickable="true"], [data-acsb-sr-only="true"]',
                            process() {
                                this._handleEmptyHeadings(), this._handleLengthyHeadings(), this._handleFakeHeadings();
                                let e = !1;
                                const t = c.A.picks("h1, h2, h3, h4, h5, h6, [data-acsb-fake-title]");
                                for (let i of t) {
                                    if (i.acsbHeadingHierarchyProcessed || i.matches('[role]:not([role="heading"]):not([data-acsb-not-title])') || i.closest('[data-acsb-hidden="true"], [data-acsb-sr-only]')) continue;
                                    if (!this.getVisibleText(i)) {
                                        i.removeAttribute("aria-level"), i.setAttribute("role", "presentation"), i.setAttribute("data-acsb-not-title", "true");
                                        continue
                                    }
                                    e = !0, i.acsbHeadingHierarchyProcessed = !0, "heading" !== i.getAttribute("role") && i.setAttribute("role", "heading");
                                    let t = this.getLargestFontSizeInElement(i);
                                    this.sizes[t] || (this.sizes[t] = []), this.sizes[t].push(i)
                                }
                                if (!e) return;
                                this.sizes = Object.keys(this.sizes).sort().reduce(((e, t) => (e[t] = this.sizes[t], e)), {});
                                const i = Object.keys(this.sizes).reverse();
                                let n, s = [];
                                for (const e of i) this.sizes[e] && s.push(...this.sizes[e]);
                                if (s = s.filter((e => {
                                        const t = e.getBoundingClientRect(),
                                            i = window.innerHeight,
                                            n = document.documentElement.scrollTop || document.body.scrollTop;
                                        return t.top + n > .15 * i && t.top + n < .85 * i
                                    })), n = s.sort(((e, t) => this.getLargestFontSizeInElement(t) - this.getLargestFontSizeInElement(e)))[0], n) {
                                    for (const e of c.A.picks('[aria-level="1"]')) e.removeAttribute("aria-level"), e.removeAttribute("role");
                                    n.setAttribute("role", "heading"), n.setAttribute("aria-level", "1")
                                }
                                if (this.sizes[i[0]] ? .length > 0)
                                    for (let e of this.sizes[i[0]]) e !== n && e.setAttribute("aria-level", "2");
                                if (!n) {
                                    const e = c.A.pick("head title");
                                    if (e) {
                                        let t;
                                        const i = c.A.elements.create("h1", {
                                            role: "heading",
                                            class: "acsb-sr-only",
                                            "aria-level": "1",
                                            "data-acsb-title": "true",
                                            "data-acsb-h1-title": "true",
                                            "data-acsb-sr-only": "true"
                                        }, c.A.elements.text(e));
                                        for (let e of c.A.picks('[role="navigation"], header, p, img, form, ul, a', document, !0))
                                            if (!e.closest("[data-acsb]") && o.A.isVisible(e)) {
                                                t = e;
                                                break
                                            }
                                        t ? c.A.elements.insert(i, t) : c.A.elements.append(i, document.body, !0)
                                    }
                                }
                                this.sortHeadingsByHierarchy(), this.handlePreTitle()
                            },
                            sortHeadingsByHierarchy() {
                                const e = [],
                                    t = c.A.picks('h1, h2, h3, h4, h5, h6, [data-acsb-fake-title], [role="heading"]');
                                let i, n;
                                const s = [
                                    [],
                                    [],
                                    [],
                                    [],
                                    [],
                                    []
                                ];
                                for (const a of t.filter((e => o.A.isVisible(e)))) {
                                    const t = this.getLargestFontSizeInElement(a);
                                    if (n || "1" !== a.getAttribute("aria-level")) {
                                        if (i > t) n = Math.min(n + 1, 6), i = t;
                                        else if (i < t) {
                                            const e = this.getClosestLevelByFontSize(t, s);
                                            n = Math.max(e || 2, 2), i = t
                                        }
                                        n ? (s[n - 1].push(i), a.setAttribute("aria-level", n)) : e.push(a)
                                    } else n = 1, i = 1 / 0
                                }
                                for (const t of e) {
                                    const e = this.getLargestFontSizeInElement(t),
                                        i = this.getClosestLevelByFontSize(e, s);
                                    t.setAttribute("aria-level", Math.max(i || 2, 2))
                                }
                            },
                            getClosestLevelByFontSize(e, t) {
                                const i = t.map((e => e.reduce(((e, t) => e + t), 0) / e.length || 0)),
                                    n = i.sort(((t, i) => Math.abs(t - e) - Math.abs(i - e)))[0];
                                return i.indexOf(n) + 1
                            },
                            getLargestFontSizeInElement(e) {
                                let t = 0;
                                for (const i of e.childNodes)
                                    if (i.nodeType === Node.ELEMENT_NODE) t = Math.max(t, this.getLargestFontSizeInElement(i));
                                    else if (i.nodeType === Node.TEXT_NODE) {
                                    const i = parseInt(c.A.elements.style(e, "font-weight")) / 1e3,
                                        n = parseInt(c.A.elements.style(e, "font-size")) + i;
                                    n > t && (t = n)
                                }
                                return t
                            },
                            getSmallerTextAbove(e, t = 50) {
                                let i = e,
                                    n = 0;
                                for (; n < 3 && i.parentElement;) {
                                    const s = i.parentElement,
                                        a = Array.from(s.children);
                                    for (const n of a) {
                                        if (n === i) break;
                                        const s = (0, d.su)(n),
                                            a = (0, d.su)(e),
                                            r = a.length,
                                            o = s.length;
                                        if (o > 1 || 0 === o || 0 === r) continue;
                                        if (s[0].height > a[0].height) continue;
                                        const l = n.getBoundingClientRect(),
                                            c = e.getBoundingClientRect(),
                                            u = l.bottom <= c.top,
                                            h = c.top - l.bottom <= t,
                                            p = this.getLargestFontSizeInElement(n) < this.getLargestFontSizeInElement(e);
                                        if (u && h && p) return n
                                    }
                                    i = s, n++
                                }
                            },
                            handlePreTitle() {
                                const e = c.A.picks('h1, h2, h3, h4, h5, h6, [data-acsb-fake-title], [role="heading"]');
                                for (const t of e) {
                                    const e = this.getSmallerTextAbove(t);
                                    e && (e.setAttribute("aria-hidden", "true"), e.setAttribute("data-acsb-force-hidden", "true"), e.setAttribute("role", "presentation"), u.srOnly.append(t, u.srOnly.create(e.textContent), !0, !0))
                                }
                            },
                            getVisibleText(e) {
                                return [e, ...Array.from(e.querySelectorAll("*"))].filter((e => o.A.isVisible(e))).map((e => {
                                    let t = [];
                                    const i = window.getComputedStyle(e);
                                    if (0 === parseInt(i.fontSize)) return t;
                                    for (const i of Array.from(e.childNodes)) i.nodeType === Node.TEXT_NODE && this.isTextNodeVisible(i) && t.push(i.textContent);
                                    return t
                                })).join(" ").replace(/[\n]/g, "").trim()
                            },
                            isTextNodeVisible(e) {
                                function t(e, t) {
                                    const i = window.getComputedStyle(e),
                                        n = parseFloat(i.textIndent),
                                        s = function(e) {
                                            const t = document.createRange();
                                            return t.selectNode(e), t.getBoundingClientRect()
                                        }(t),
                                        a = e.getBoundingClientRect();
                                    return s.left + n < a.left || s.right + n > a.right
                                }
                                let i = e.parentElement;
                                for (; i;) {
                                    if (n = i, "hidden" === window.getComputedStyle(n).overflow && t(i, e)) return !1;
                                    i = i.parentElement
                                }
                                var n;
                                return !0
                            },
                            _handleEmptyHeadings() {
                                for (let e of c.A.picks("h1, h2, h3, h4, h5, h6")) e.acsbTitleBound || (e.acsbTitleBound = !0, c.A.elements.text(e).length < 1 && !c.A.pick("img", e) && !c.A.pick("svg", e) && "none" === c.A.elements.style(e, "background-image") && e.setAttribute("role", "presentation"))
                            },
                            _handleLengthyHeadings() {
                                for (let e of c.A.picks("h1, h2, h3, h4, h5, h6")) c.A.elements.text(e).length > 160 && e.setAttribute("role", "presentation")
                            },
                            _handleFakeHeadings() {
                                for (let e of c.A.picks('strong, b, em, span, p, div, [class*="title"]')) e.acsbFakeTitleBound || e.closest('[data-acsb-hidden="true"], [data-acsb], [data-acsb-sr-only], [role="heading"], [role="navigation"], table, h1, h2, h3, h4, h5, h6') || (e.acsbFakeTitleBound = !0, (this._isFakeHeading(e) || this._isSmallFakeHeading(e)) && c.A.elements.attrs(e, {
                                    role: "heading",
                                    "data-acsb-fake-title": "true"
                                }))
                            },
                            _isFakeHeading(e) {
                                if (e.closest(this.badFakeSelectors) || c.A.pick(this.badFakeSelectors, e) || "LABEL" === e.tagName && !e.closest("form")) return !1;
                                const t = parseInt(c.A.elements.style(e, "font-size").replace("px", "")),
                                    i = c.A.elements.text(e),
                                    n = i.split(" ").length;
                                if (i.length <= 3 || t < 20 || n.length > 20 || t < 23 && n > 15 || "BODY" !== e.parentElement.tagName && t < 23 && c.A.pick('h1,h2,h3,h4,h5,h6,[role="heading"]', e.parentElement) || c.A.strings.isNumber(c.A.strings.removeChars(i, [" "], !0))) return !1;
                                const s = e.closest("p");
                                let a = !1;
                                if (s) {
                                    const e = c.A.elements.text(s);
                                    if (e.length > 0 && 1 === s.innerText.split("\n").length && (a = !0), e.length > i.length && !a) return !1
                                }
                                return !(i.length > 100 && !a)
                            },
                            _isSmallFakeHeading(e) {
                                const t = parseInt(c.A.elements.style(e, "font-size"));
                                if (t >= 22 || t < 15 || e.closest(this.badFakeSelectors) || c.A.pick(this.badFakeSelectors, e) || e.innerText.split("\n").length > 1 || "LABEL" === e.tagName && !e.closest("form") || parseInt(c.A.elements.style(e, "font-weight")) < 700) return !1;
                                const i = c.A.elements.text(e);
                                if (i.length <= 3 || i.split(" ").length > 20 || c.A.strings.isNumber(i.replace(/[\W\-_\.]/gm, ""))) return !1;
                                let n = !1,
                                    s = e.parentElement;
                                for (; s && "BODY" !== s.tagName;) {
                                    if (s.innerText !== i) {
                                        s.innerText.split("\n").includes(i) && (n = !0);
                                        break
                                    }
                                    s = s.parentElement
                                }
                                return n
                            },
                            _convertHeading(e, t) {
                                const i = `h${t}`,
                                    n = c.A.strings.random(),
                                    s = c.A.elements.create(i, {}, e.innerHTML);
                                let a = "",
                                    r = getComputedStyle(e);
                                for (let e = 0; e < r.length; e++) a += `${r[e]}:${r.getPropertyValue(r[e])};`;
                                o.A.addDynamicCss(`body ${i}.${n}{${a}}`, "headings"), c.A.elements.copyAttrs(e, s), c.A.elements.attrs(s, {
                                    class: n,
                                    "data-acsb-title": "true"
                                }), c.A.elements.insert(s, e), c.A.elements.remove(e), "heading" === s.getAttribute("role") && s.removeAttribute("role"), s.getAttribute("aria-level") && s.removeAttribute("aria-level")
                            }
                        },
                        decorations: {
                            process() {
                                this._handleDeletedNumbers(), this._handleEmphasizedText()
                            },
                            _handleDeletedNumbers() {
                                for (let e of c.A.picks("span, div, strike, em, p, del, s, b, strong, [data-acsb-strike]")) {
                                    if (e.acsbTextDecorationDeleteBound || e.closest('[data-acsb], [data-acsb-hidden="true"]')) continue;
                                    e.acsbTextDecorationDeleteBound = !0;
                                    const t = c.A.elements.text(e);
                                    if (!(t.length < 1 || e.matches("[data-acsb-sr-only]") || c.A.pick("[data-acsb-sr-only]", e) || e.ariaLabel) && 0 !== u.headings.getVisibleText(e).trim().length) {
                                        if (!["DEL", "STRIKE", "S"].includes(e.tagName) && !c.A.elements.style(e, "text-decoration").includes("line-through") && !e.matches("[data-acsb-strike]")) {
                                            let t = !1;
                                            const i = c.A.elements.getPsuedoElements(e);
                                            for (let n in i) {
                                                if ("none" === i[n].content || "absolute" !== i[n].position) continue;
                                                const s = Math.round(i[n].height.replace("px", ""));
                                                if (!(s < 1 || s > 3) && Math.round(i[n].width.replace("px", "")) === e.offsetWidth) {
                                                    t = !0;
                                                    break
                                                }
                                            }
                                            if (!t) continue
                                        }
                                        t.replace(/\D/g, "").length < 0 || u.srOnly.append(e, u.srOnly.create(r.A.get("DELETED_NUMBER")))
                                    }
                                }
                            },
                            _handleEmphasizedText() {
                                for (let e of c.A.picks("span, b, p, div")) e.acsbEmphasizedTextBound || e.closest('[data-acsb], [data-acsb-hidden="true"]') || (e.acsbEmphasizedTextBound = !0, e.closest('h1, h2, h3, h4, h5, h6, strong, em, [data-acsb-clickable="true"], [data-acsb-sr-only]') || e.getAttribute("role") || c.A.pick("ul, ol, form, [role] h1, h2, h3, h4, h5, h6") || !e.childNodes[0] || 3 !== e.childNodes[0].nodeType || !c.A.elements.text(e) || (parseInt(c.A.elements.style(e, "font-weight")) >= 700 ? e.innerHTML = `<strong>${e.innerHTML}</strong>` : "italic" === c.A.elements.style(e, "font-style") && (e.innerHTML = `<em>${e.innerHTML}</em>`)))
                            }
                        },
                        tables: {
                            process() {
                                this._handleLayoutTables(), this._handleTableHeaders()
                            },
                            _handleLayoutTables() {
                                for (let e of c.A.picks("table")) e.acsbLayoutTableBound || (e.acsbLayoutTableBound = !0, e.getAttribute("role") || c.A.pick("th", e) || (c.A.elements.attrs(c.A.picks("table", e), {
                                    role: "presentation"
                                }), (c.A.picks("tr", e).length <= 1 || c.A.pick("li, form, section, main, div, table, h1, h2, h3", e)) && e.setAttribute("role", "presentation")))
                            },
                            _handleTableHeaders() {
                                for (let e of c.A.picks("table")) {
                                    if (e.acsbHorizontalTableBound) continue;
                                    if (e.acsbHorizontalTableBound = !0, "presentation" === e.getAttribute("role") || !c.A.pick("tbody", e) || 2 !== c.A.picks("tbody tr:first-child td", e).length || c.A.pick('thead, [role="columnheader"]', e)) continue;
                                    const t = c.A.picks("tbody tr td:first-child", e);
                                    t && this._isFakeCellHeader(e, t) && c.A.elements.attrs(t, {
                                        role: "rowheader"
                                    })
                                }
                                for (let e of c.A.picks("table")) {
                                    if (e.acsbTableHeadersBound) continue;
                                    e.acsbTableHeadersBound = !0;
                                    for (let t of c.A.picks("th", e)) c.A.elements.text(t) || c.A.elements.attrs(t, {
                                        "data-acsb-force-hidden": "true",
                                        "aria-hidden": "true",
                                        role: "presentation"
                                    });
                                    if (!c.A.pick("tbody", e) || "presentation" === e.getAttribute("role") || c.A.pick('thead, [role="rowheader"]', e)) continue;
                                    const t = c.A.picks("tr:first-child td", e);
                                    t && this._isFakeCellHeader(e, t) && c.A.elements.attrs(t, {
                                        role: "columnheader"
                                    })
                                }
                                for (let e of c.A.picks("table thead td")) e.setAttribute("role", "columnheader"), e.setAttribute("scope", "col")
                            },
                            _isFakeCellHeader(e, t) {
                                let i = !1,
                                    n = null;
                                for (let e of t) {
                                    let t = !1;
                                    const s = c.A.picks("*", e);
                                    if (s.length < 1 && c.A.elements.text(e)) {
                                        const t = Number(c.A.elements.style(e, "font-weight"));
                                        if ((t || !isNaN(t)) && t > 500) {
                                            n = t, i = !0;
                                            continue
                                        }
                                    }
                                    for (let e of s) {
                                        if (!e.childNodes[0] || 3 !== e.childNodes[0].nodeType || !e.childNodes[0].nodeValue) continue;
                                        const s = Number(c.A.elements.style(e, "font-weight"));
                                        if (s && !isNaN(s)) {
                                            if (s < 500) {
                                                i = !1, t = !0;
                                                break
                                            }
                                            n = s, i = !0
                                        }
                                    }
                                    if (t) break
                                }
                                if (n && i)
                                    for (let t of c.A.picks("tr:nth-child(2) td:nth-child(2)", e)) {
                                        if (3 !== t.childNodes[0].nodeType || !t.childNodes[0].nodeValue) continue;
                                        const e = Number(c.A.elements.style(t, "font-weight"));
                                        if (!(!e || isNaN(e) || e < n)) {
                                            i = !1;
                                            break
                                        }
                                    }
                                return i
                            }
                        },
                        clickables: {
                            presetLinks: {},
                            process() {
                                Object.keys(this.presetLinks).length < 1 && (this.presetLinks = {
                                    social: {
                                        "facebook.com": "Facebook",
                                        "yahoo.com": "Yahoo",
                                        "yandex.com": "Yandex",
                                        "xing.com": "Xing",
                                        "medium.com": "Medium",
                                        "linkedin.com": "LinkedIn",
                                        "dribbble.com": "Dribbble",
                                        "github.com": "Github",
                                        "snapchat.com": "Snapchat",
                                        "instagram.com": "Instagram",
                                        "twitter.com": "Twitter",
                                        "tripadvisor.com": "Trip Advisor",
                                        "yelp.com": "Yelp",
                                        "tiktok.com": "TikTok",
                                        "whatsapp.com": "WhatsApp",
                                        "whatsapp://": "WhatsApp",
                                        "youtube.com": "YouTube",
                                        "reddit.com": "Reddit",
                                        "tumblr.com": "Tumblr",
                                        "flickr.com": "Flickr",
                                        "pinterest.com": "Pinterest",
                                        "maps.google.com": "Google Maps"
                                    },
                                    pages: {
                                        feed: ["rss"],
                                        search: ["find"],
                                        favorites: ["wishlist", "saves"],
                                        contact: ["quote", "offer", "proposal"],
                                        cart: ["basket", "basket", "bag", "checkout"],
                                        locations: ["stores", "locator", "locate", "shops"],
                                        account: ["register", "join", "user", "signup", "profile", "sign-up", "login", "log-in", "sign up", "log in"]
                                    }
                                }), this._processClickables(), this._handleTabs()
                            },
                            _isButton(e) {
                                if (!e || !e.matches('[data-acsb-clickable="true"]') || c.A.elements.parents(e, 'a, [role="button"]', !0).length > 0 || "IMG" === e.tagName && (e.offsetWidth > 50 || e.offsetHeight > 50) || e.offsetWidth >= c.A.utilities.getWinSize().width || e.offsetHeight >= c.A.utilities.getWinSize().height || c.A.picks('form, input, select, iframe, textarea, [role="navigation"]', e).length > 0) return !1;
                                let t = !1;
                                if ("A" === e.tagName) {
                                    const i = e.getAttribute("href");
                                    i && "javascript" !== i.substr(0, 10).toLowerCase() && "#" !== i || (t = !0), !i || "#" !== i.substring(0, 1) || c.A.pick(i) && "button" !== e.getAttribute("role") || (t = !0)
                                }
                                return "INPUT" === e.tagName && ["button", "image", "submit"].includes(e.type) && (t = !0), "LABEL" !== e.tagName || e.closest("form") || (t = !0), ["BUTTON", "SPAN", "IMG", "I", "LI", "DIV"].includes(e.tagName) && (t = !0), t
                            },
                            _isCarouselPagination(e) {
                                let t = !1;
                                const i = [".n2-ow", ".n2-bullet", ".owl-dot", ".owl-page", ".tp-bullet", ".uk-dotnav", ".tp-thumb", ".wpmslider-pager-item", ".swiper-pagination-bullet", ".nivo-control", ".acsb-carousel-dot", ".bx-pager-item", "[uk-slideshow-item]", "[uk-slider-item]", "[data-slide-to]", ".swiper-pagination-bullet", ".nextend-bullet-bar", ".tp-thumbs", ".slick-dots", ".rslides_tabs", ".ls-bottom-slidebuttons", ".et-pb-controllers", ".flex-control-nav", ".flex-control-paging", ".jcarousel-pagination", '[data-jcarouselpagination="true"]', ".uk-dotnav", ".carousel-indicators", ".flex-control-nav", ".flex-control-paging", ".flickity-page-dots", ".cycle-pager"];
                                for (let n of i)
                                    if (e.closest(n)) {
                                        t = !0;
                                        break
                                    }
                                return t
                            },
                            _isCarouselNextButton(e) {
                                let t = !1;
                                const i = [".owl-next", ".bx-next", ".next", ".nivo-prevNext", ".flex-next", ".slick-next", ".slick-arrow", ".slick-next", ".et-pb-arrow-next", ".tp-rightarrow", ".acsb-carousel-next", ".flickity-prev-next-button.next", ".fusion-nav-next", ".ls-nav-next", ".swiper-button-next", '[data-slide="next"]', ".nextend-arrow-next", ".uk-slidenav-next", ".jcarousel-control-next", ".acsb-carousel-next"];
                                if (e.matches('[class*="next"], [class*="right"]') && e.closest('[data-acsb-carousel="true"]')) t = !0;
                                else
                                    for (let n of i)
                                        if (e.closest(n)) {
                                            t = !0;
                                            break
                                        } return t
                            },
                            _isCarouselPrevButton(e) {
                                let t = !1;
                                const i = [".owl-prev", ".bx-prev", ".flex-prev", ".slick-prev", ".nivo-prevNav", ".prev", ".previous", ".acsb-carousel-prev", ".et-pb-arrow-prev", ".tp-leftarrow", ".flickity-prev-next-button.previous", ".fusion-nav-prev", ".ls-nav-prev", ".swiper-button-prev", ".nextend-arrow-previous", ".uk-slidenav-previous", ".jcarousel-control-prev", ".cycle-prev", '[data-slide="prev"]'];
                                if (e.matches('[class*="prev"], [class*="left"]') && e.closest('[data-acsb-carousel="true"]')) t = !0;
                                else
                                    for (let n of i)
                                        if (e.closest(n)) {
                                            t = !0;
                                            break
                                        } return t
                            },
                            _getTextualOpsObject(e) {
                                let t = {
                                        close: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("CLOSE"),
                                            exacts: ["x", "×"],
                                            strings: ["close", "dismiss", "hide", "cancel", "exit", "times"]
                                        },
                                        remove: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("REMOVE"),
                                            exacts: [],
                                            strings: ["remove", "trash", "bin", "delete", "cross"]
                                        },
                                        next: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("NEXT"),
                                            exacts: ["❯"],
                                            strings: ["next", "nxt", "arrow", "right"]
                                        },
                                        previous: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("PREVIOUS"),
                                            exacts: ["❮"],
                                            strings: ["previous", "prev", "prv", "left"]
                                        },
                                        contact: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("CONTACT"),
                                            exacts: [],
                                            strings: ["contact", "envelop", "mail", "phone"]
                                        },
                                        search: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("SEARCH"),
                                            exacts: [],
                                            strings: ["search", "srch", "magnifier"]
                                        },
                                        cart: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("CART"),
                                            exacts: [],
                                            strings: ["cart", "bag", "basket", "shop"]
                                        },
                                        menu: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("MENU"),
                                            exacts: [],
                                            strings: ["burger", "menu", "nav", "bars", "lines"]
                                        },
                                        download: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("MENU"),
                                            exacts: [],
                                            strings: ["download"]
                                        },
                                        order: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("ORDER"),
                                            exacts: [],
                                            strings: ["order"]
                                        },
                                        share: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("SHARE"),
                                            exacts: [],
                                            strings: ["share"]
                                        },
                                        move: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("MOVE"),
                                            exacts: [],
                                            strings: ["slide", "range", "move"]
                                        },
                                        TOGGLE: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("TOGGLE"),
                                            exacts: [],
                                            strings: ["toggle", "collapse", "arrow-down", "chevron-down", "caret-down"]
                                        },
                                        checkmark: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("CHECKMARK"),
                                            exacts: [],
                                            strings: ["check", "accept", "verify"]
                                        },
                                        account: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("ACCOUNT"),
                                            exacts: [],
                                            strings: ["login", "log-in", "signup", "sign-up", "register", "user", "account", "profile"]
                                        },
                                        date: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("DATE"),
                                            exacts: [],
                                            strings: ["date", "picker"]
                                        },
                                        address: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("ADDRESS"),
                                            exacts: [],
                                            strings: ["pin", "address", "map", "location"]
                                        },
                                        subscribe: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("ADDRESS"),
                                            exacts: [],
                                            strings: ["newsletter", "subscribe"]
                                        },
                                        favorites: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("FAVORITES"),
                                            exacts: [],
                                            strings: ["wishlist", "favorite", "heart"]
                                        },
                                        enlarge: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("ENLARGE"),
                                            exacts: [],
                                            strings: ["zoom", "large", "big"]
                                        },
                                        print: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("PRINT"),
                                            exacts: [],
                                            strings: ["print"]
                                        },
                                        plus: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("PLUS"),
                                            exacts: ["+"],
                                            strings: ["plus", "inc", "touchspin-up"]
                                        },
                                        minus: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("MINUS"),
                                            exacts: ["-"],
                                            strings: ["min", "dec", "decrease", "reduce", "touchspin-down"]
                                        },
                                        video: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("VIDEO"),
                                            exacts: [],
                                            strings: ["video", "play", "youtube", "vimeo"]
                                        },
                                        color: {
                                            occurs: {},
                                            total: 0,
                                            exacts: [],
                                            text: r.A.get("COLOR"),
                                            strings: ["color", "colour", "swatch", "palette"]
                                        },
                                        pause: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("PAUSE"),
                                            exacts: [],
                                            strings: ["pause", "stop", "halt", "hold"]
                                        },
                                        country: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("COUNTRY"),
                                            exacts: [],
                                            strings: ["flag", "lang", "country", "usa", "english"]
                                        },
                                        scroll: {
                                            occurs: {},
                                            total: 0,
                                            text: r.A.get("SCROLL"),
                                            exacts: [],
                                            strings: ["scroll", "up", "top"]
                                        }
                                    },
                                    i = (() => {
                                        let t = c.A.strings.removeChars(e.outerHTML.toLowerCase(), ["data-acsb-navigable", "data-acsb-now-navigable", "data-acsb-menu-root-link", "menuitem", "shopping", "desktop", "tabindex", "backup", "holder", "group", "setup", "topic", "index", "closed", "bind", "binary", "binge", "left:", "right:", "popup", "upload", "data-acsb-menu", "prevent", "display", "player"]);
                                        for (let i of c.A.picks("span, i", e)) t += c.A.elements.text(i);
                                        e.closest('[data-acsb-menu="a"], [role="menuitem"]') && (t = c.A.strings.removeChars(t, ["nav", "menu"]));
                                        const i = c.A.elements.style(e, "background-image");
                                        return "none" !== i && (t = `${t} ${i}`), t = t.replace(/style=".*?"/g, ""), t = t.replace(/currentcolor/gi, ""), t.replace(window.location.hostname.replace("www", ""), "").trim()
                                    })(),
                                    n = c.A.elements.text(e).toLowerCase();
                                if ("function" != typeof this.acsbTextualOpsProcessor && (this.acsbTextualOpsProcessor = (e, t, i, n, s, a) => {
                                        for (let t of i) n === t && (a[e].total = a[e].total + 1, a[e].occurs[t] = 1);
                                        for (let i of t) a[e].total = a[e].total + c.A.strings.getOccures(s, i), a[e].occurs[i] = c.A.strings.getOccures(s, i);
                                        return a
                                    }), t = this.acsbTextualOpsProcessor("close", t.close.strings, t.close.exacts, n, i, t), t.close.total < 1)
                                    for (let e in t) t = this.acsbTextualOpsProcessor(e, t[e].strings, t[e].exacts, n, i, t);
                                let s = 0,
                                    a = null;
                                for (let e in t) t[e].total <= s || (s = t[e].total, a = e);
                                const o = {
                                    occurs: 0,
                                    text: "",
                                    matched: "",
                                    method: null
                                };
                                if (a && (o.method = a, o.occurs = s, o.text = t[a].text, "color" === o.method)) {
                                    const t = c.A.elements.style(e, "background-color").replace("rgb(", "").replace(")", "").split(",").map((e => Number(e.trim())));
                                    o.text = `${r.A.get("COLOR")} ${u.clickables._getColorName(t[0],t[1],t[2])}`
                                }
                                return o
                            },
                            _getColorName: (e, t, i) => (window.acsbNtc || (window.acsbNtc = {
                                init: () => {
                                    let e, t, i;
                                    for (let n = 0; n < window.acsbNtc.names.length; n++) e = "#" + window.acsbNtc.names[n][0], t = window.acsbNtc.rgb(e), i = window.acsbNtc.hsl(e), window.acsbNtc.names[n].push(t[0], t[1], t[2], i[0], i[1], i[2])
                                },
                                name: e => {
                                    if ((e = e.toUpperCase()).length < 3 || e.length > 7) return ["#000000", "Invalid Color: " + e, !1];
                                    e.length % 3 == 0 && (e = "#" + e), 4 === e.length && (e = "#" + e.substr(1, 1) + e.substr(1, 1) + e.substr(2, 1) + e.substr(2, 1) + e.substr(3, 1) + e.substr(3, 1));
                                    let t = window.acsbNtc.rgb(e),
                                        i = t[0],
                                        n = t[1],
                                        s = t[2],
                                        a = window.acsbNtc.hsl(e),
                                        r = a[0],
                                        o = a[1],
                                        l = a[2],
                                        c = 0,
                                        d = 0,
                                        u = 0,
                                        h = -1,
                                        p = -1;
                                    for (let t = 0; t < window.acsbNtc.names.length; t++) {
                                        if (e === "#" + window.acsbNtc.names[t][0]) return ["#" + window.acsbNtc.names[t][0], window.acsbNtc.names[t][1], !0];
                                        c = Math.pow(i - window.acsbNtc.names[t][2], 2) + Math.pow(n - window.acsbNtc.names[t][3], 2) + Math.pow(s - window.acsbNtc.names[t][4], 2), d = Math.pow(r - window.acsbNtc.names[t][5], 2) + Math.pow(o - window.acsbNtc.names[t][6], 2) + Math.pow(l - window.acsbNtc.names[t][7], 2), u = c + 2 * d, (p < 0 || p > u) && (p = u, h = t)
                                    }
                                    return h < 0 ? ["#000000", "Invalid Color: " + e, !1] : ["#" + window.acsbNtc.names[h][0], window.acsbNtc.names[h][1], !1]
                                },
                                hsl: e => {
                                    let t, i, n, s, a, r, o = [parseInt("0x" + e.substring(1, 3)) / 255, parseInt("0x" + e.substring(3, 5)) / 255, parseInt("0x" + e.substring(5, 7)) / 255],
                                        l = o[0],
                                        c = o[1],
                                        d = o[2];
                                    return t = Math.min(l, Math.min(c, d)), i = Math.max(l, Math.max(c, d)), n = i - t, r = (t + i) / 2, a = 0, r > 0 && r < 1 && (a = n / (r < .5 ? 2 * r : 2 - 2 * r)), s = 0, n > 0 && (i === l && i !== c && (s += (c - d) / n), i === c && i !== d && (s += 2 + (d - l) / n), i === d && i !== l && (s += 4 + (l - c) / n), s /= 6), [parseInt(255 * s), parseInt(255 * a), parseInt(255 * r)]
                                },
                                rgb: e => [parseInt("0x" + e.substring(1, 3)), parseInt("0x" + e.substring(3, 5)), parseInt("0x" + e.substring(5, 7))],
                                names: [
                                    ["000000", "Black"],
                                    ["000080", "Navy Blue"],
                                    ["0000C8", "Dark Blue"],
                                    ["0000FF", "Blue"],
                                    ["000741", "Stratos"],
                                    ["001B1C", "Swamp"],
                                    ["002387", "Resolution Blue"],
                                    ["002900", "Deep Fir"],
                                    ["002E20", "Burnham"],
                                    ["002FA7", "International Klein Blue"],
                                    ["003153", "Prussian Blue"],
                                    ["003366", "Midnight Blue"],
                                    ["003399", "Smalt"],
                                    ["003532", "Deep Teal"],
                                    ["003E40", "Cyprus"],
                                    ["004620", "Kaitoke Green"],
                                    ["0047AB", "Cobalt"],
                                    ["004816", "Crusoe"],
                                    ["004950", "Sherpa Blue"],
                                    ["0056A7", "Endeavour"],
                                    ["00581A", "Camarone"],
                                    ["0066CC", "Science Blue"],
                                    ["0066FF", "Blue Ribbon"],
                                    ["00755E", "Tropical Rain Forest"],
                                    ["0076A3", "Allports"],
                                    ["007BA7", "Deep Cerulean"],
                                    ["007EC7", "Lochmara"],
                                    ["007FFF", "Azure Radiance"],
                                    ["008080", "Teal"],
                                    ["0095B6", "Bondi Blue"],
                                    ["009DC4", "Pacific Blue"],
                                    ["00A693", "Persian Green"],
                                    ["00A86B", "Jade"],
                                    ["00CC99", "Caribbean Green"],
                                    ["00CCCC", "Robin's Egg Blue"],
                                    ["00FF00", "Green"],
                                    ["00FF7F", "Spring Green"],
                                    ["00FFFF", "Cyan / Aqua"],
                                    ["010D1A", "Blue Charcoal"],
                                    ["011635", "Midnight"],
                                    ["011D13", "Holly"],
                                    ["012731", "Daintree"],
                                    ["01361C", "Cardin Green"],
                                    ["01371A", "County Green"],
                                    ["013E62", "Astronaut Blue"],
                                    ["013F6A", "Regal Blue"],
                                    ["014B43", "Aqua Deep"],
                                    ["015E85", "Orient"],
                                    ["016162", "Blue Stone"],
                                    ["016D39", "Fun Green"],
                                    ["01796F", "Pine Green"],
                                    ["017987", "Blue Lagoon"],
                                    ["01826B", "Deep Sea"],
                                    ["01A368", "Green Haze"],
                                    ["022D15", "English Holly"],
                                    ["02402C", "Sherwood Green"],
                                    ["02478E", "Congress Blue"],
                                    ["024E46", "Evening Sea"],
                                    ["026395", "Bahama Blue"],
                                    ["02866F", "Observatory"],
                                    ["02A4D3", "Cerulean"],
                                    ["03163C", "Tangaroa"],
                                    ["032B52", "Green Vogue"],
                                    ["036A6E", "Mosque"],
                                    ["041004", "Midnight Moss"],
                                    ["041322", "Black Pearl"],
                                    ["042E4C", "Blue Whale"],
                                    ["044022", "Zuccini"],
                                    ["044259", "Teal Blue"],
                                    ["051040", "Deep Cove"],
                                    ["051657", "Gulf Blue"],
                                    ["055989", "Venice Blue"],
                                    ["056F57", "Watercourse"],
                                    ["062A78", "Catalina Blue"],
                                    ["063537", "Tiber"],
                                    ["069B81", "Gossamer"],
                                    ["06A189", "Niagara"],
                                    ["073A50", "Tarawera"],
                                    ["080110", "Jaguar"],
                                    ["081910", "Black Bean"],
                                    ["082567", "Deep Sapphire"],
                                    ["088370", "Elf Green"],
                                    ["08E8DE", "Bright Turquoise"],
                                    ["092256", "Downriver"],
                                    ["09230F", "Palm Green"],
                                    ["09255D", "Madison"],
                                    ["093624", "Bottle Green"],
                                    ["095859", "Deep Sea Green"],
                                    ["097F4B", "Salem"],
                                    ["0A001C", "Black Russian"],
                                    ["0A480D", "Dark Fern"],
                                    ["0A6906", "Japanese Laurel"],
                                    ["0A6F75", "Atoll"],
                                    ["0B0B0B", "Cod Gray"],
                                    ["0B0F08", "Marshland"],
                                    ["0B1107", "Gordons Green"],
                                    ["0B1304", "Black Forest"],
                                    ["0B6207", "San Felix"],
                                    ["0BDA51", "Malachite"],
                                    ["0C0B1D", "Ebony"],
                                    ["0C0D0F", "Woodsmoke"],
                                    ["0C1911", "Racing Green"],
                                    ["0C7A79", "Surfie Green"],
                                    ["0C8990", "Blue Chill"],
                                    ["0D0332", "Black Rock"],
                                    ["0D1117", "Bunker"],
                                    ["0D1C19", "Aztec"],
                                    ["0D2E1C", "Bush"],
                                    ["0E0E18", "Cinder"],
                                    ["0E2A30", "Firefly"],
                                    ["0F2D9E", "Torea Bay"],
                                    ["10121D", "Vulcan"],
                                    ["101405", "Green Waterloo"],
                                    ["105852", "Eden"],
                                    ["110C6C", "Arapawa"],
                                    ["120A8F", "Ultramarine"],
                                    ["123447", "Elephant"],
                                    ["126B40", "Jewel"],
                                    ["130000", "Diesel"],
                                    ["130A06", "Asphalt"],
                                    ["13264D", "Blue Zodiac"],
                                    ["134F19", "Parsley"],
                                    ["140600", "Nero"],
                                    ["1450AA", "Tory Blue"],
                                    ["151F4C", "Bunting"],
                                    ["1560BD", "Denim"],
                                    ["15736B", "Genoa"],
                                    ["161928", "Mirage"],
                                    ["161D10", "Hunter Green"],
                                    ["162A40", "Big Stone"],
                                    ["163222", "Celtic"],
                                    ["16322C", "Timber Green"],
                                    ["163531", "Gable Green"],
                                    ["171F04", "Pine Tree"],
                                    ["175579", "Chathams Blue"],
                                    ["182D09", "Deep Forest Green"],
                                    ["18587A", "Blumine"],
                                    ["19330E", "Palm Leaf"],
                                    ["193751", "Nile Blue"],
                                    ["1959A8", "Fun Blue"],
                                    ["1A1A68", "Lucky Point"],
                                    ["1AB385", "Mountain Meadow"],
                                    ["1B0245", "Tolopea"],
                                    ["1B1035", "Haiti"],
                                    ["1B127B", "Deep Koamaru"],
                                    ["1B1404", "Acadia"],
                                    ["1B2F11", "Seaweed"],
                                    ["1B3162", "Biscay"],
                                    ["1B659D", "Matisse"],
                                    ["1C1208", "Crowshead"],
                                    ["1C1E13", "Rangoon Green"],
                                    ["1C39BB", "Persian Blue"],
                                    ["1C402E", "Everglade"],
                                    ["1C7C7D", "Elm"],
                                    ["1D6142", "Green Pea"],
                                    ["1E0F04", "Creole"],
                                    ["1E1609", "Karaka"],
                                    ["1E1708", "El Paso"],
                                    ["1E385B", "Cello"],
                                    ["1E433C", "Te Papa Green"],
                                    ["1E90FF", "Dodger Blue"],
                                    ["1E9AB0", "Eastern Blue"],
                                    ["1F120F", "Night Rider"],
                                    ["1FC2C2", "Java"],
                                    ["20208D", "Jacksons Purple"],
                                    ["202E54", "Cloud Burst"],
                                    ["204852", "Blue Dianne"],
                                    ["211A0E", "Eternity"],
                                    ["220878", "Deep Blue"],
                                    ["228B22", "Forest Green"],
                                    ["233418", "Mallard"],
                                    ["240A40", "Violet"],
                                    ["240C02", "Kilamanjaro"],
                                    ["242A1D", "Log Cabin"],
                                    ["242E16", "Black Olive"],
                                    ["24500F", "Green House"],
                                    ["251607", "Graphite"],
                                    ["251706", "Cannon Black"],
                                    ["251F4F", "Port Gore"],
                                    ["25272C", "Shark"],
                                    ["25311C", "Green Kelp"],
                                    ["2596D1", "Curious Blue"],
                                    ["260368", "Paua"],
                                    ["26056A", "Paris M"],
                                    ["261105", "Wood Bark"],
                                    ["261414", "Gondola"],
                                    ["262335", "Steel Gray"],
                                    ["26283B", "Ebony Clay"],
                                    ["273A81", "Bay of Many"],
                                    ["27504B", "Plantation"],
                                    ["278A5B", "Eucalyptus"],
                                    ["281E15", "Oil"],
                                    ["283A77", "Astronaut"],
                                    ["286ACD", "Mariner"],
                                    ["290C5E", "Violent Violet"],
                                    ["292130", "Bastille"],
                                    ["292319", "Zeus"],
                                    ["292937", "Charade"],
                                    ["297B9A", "Jelly Bean"],
                                    ["29AB87", "Jungle Green"],
                                    ["2A0359", "Cherry Pie"],
                                    ["2A140E", "Coffee Bean"],
                                    ["2A2630", "Baltic Sea"],
                                    ["2A380B", "Turtle Green"],
                                    ["2A52BE", "Cerulean Blue"],
                                    ["2B0202", "Sepia Black"],
                                    ["2B194F", "Valhalla"],
                                    ["2B3228", "Heavy Metal"],
                                    ["2C0E8C", "Blue Gem"],
                                    ["2C1632", "Revolver"],
                                    ["2C2133", "Bleached Cedar"],
                                    ["2C8C84", "Lochinlet"],
                                    ["2D2510", "Mikado"],
                                    ["2D383A", "Outer Space"],
                                    ["2D569B", "St Tropaz"],
                                    ["2E0329", "Jacaranda"],
                                    ["2E1905", "Jacko Bean"],
                                    ["2E3222", "Rangitoto"],
                                    ["2E3F62", "Rhino"],
                                    ["2E8B57", "Sea Green"],
                                    ["2EBFD4", "Scooter"],
                                    ["2F270E", "Onion"],
                                    ["2F3CB3", "Governor Bay"],
                                    ["2F519E", "Sapphire"],
                                    ["2F5A57", "Spectra"],
                                    ["2F6168", "Casal"],
                                    ["300529", "Melanzane"],
                                    ["301F1E", "Cocoa Brown"],
                                    ["302A0F", "Woodrush"],
                                    ["304B6A", "San Juan"],
                                    ["30D5C8", "Turquoise"],
                                    ["311C17", "Eclipse"],
                                    ["314459", "Pickled Bluewood"],
                                    ["315BA1", "Azure"],
                                    ["31728D", "Calypso"],
                                    ["317D82", "Paradiso"],
                                    ["32127A", "Persian Indigo"],
                                    ["32293A", "Blackcurrant"],
                                    ["323232", "Mine Shaft"],
                                    ["325D52", "Stromboli"],
                                    ["327C14", "Bilbao"],
                                    ["327DA0", "Astral"],
                                    ["33036B", "Christalle"],
                                    ["33292F", "Thunder"],
                                    ["33CC99", "Shamrock"],
                                    ["341515", "Tamarind"],
                                    ["350036", "Mardi Gras"],
                                    ["350E42", "Valentino"],
                                    ["350E57", "Jagger"],
                                    ["353542", "Tuna"],
                                    ["354E8C", "Chambray"],
                                    ["363050", "Martinique"],
                                    ["363534", "Tuatara"],
                                    ["363C0D", "Waiouru"],
                                    ["36747D", "Ming"],
                                    ["368716", "La Palma"],
                                    ["370202", "Chocolate"],
                                    ["371D09", "Clinker"],
                                    ["37290E", "Brown Tumbleweed"],
                                    ["373021", "Birch"],
                                    ["377475", "Oracle"],
                                    ["380474", "Blue Diamond"],
                                    ["381A51", "Grape"],
                                    ["383533", "Dune"],
                                    ["384555", "Oxford Blue"],
                                    ["384910", "Clover"],
                                    ["394851", "Limed Spruce"],
                                    ["396413", "Dell"],
                                    ["3A0020", "Toledo"],
                                    ["3A2010", "Sambuca"],
                                    ["3A2A6A", "Jacarta"],
                                    ["3A686C", "William"],
                                    ["3A6A47", "Killarney"],
                                    ["3AB09E", "Keppel"],
                                    ["3B000B", "Temptress"],
                                    ["3B0910", "Aubergine"],
                                    ["3B1F1F", "Jon"],
                                    ["3B2820", "Treehouse"],
                                    ["3B7A57", "Amazon"],
                                    ["3B91B4", "Boston Blue"],
                                    ["3C0878", "Windsor"],
                                    ["3C1206", "Rebel"],
                                    ["3C1F76", "Meteorite"],
                                    ["3C2005", "Dark Ebony"],
                                    ["3C3910", "Camouflage"],
                                    ["3C4151", "Bright Gray"],
                                    ["3C4443", "Cape Cod"],
                                    ["3C493A", "Lunar Green"],
                                    ["3D0C02", "Bean  "],
                                    ["3D2B1F", "Bistre"],
                                    ["3D7D52", "Goblin"],
                                    ["3E0480", "Kingfisher Daisy"],
                                    ["3E1C14", "Cedar"],
                                    ["3E2B23", "English Walnut"],
                                    ["3E2C1C", "Black Marlin"],
                                    ["3E3A44", "Ship Gray"],
                                    ["3EABBF", "Pelorous"],
                                    ["3F2109", "Bronze"],
                                    ["3F2500", "Cola"],
                                    ["3F3002", "Madras"],
                                    ["3F307F", "Minsk"],
                                    ["3F4C3A", "Cabbage Pont"],
                                    ["3F583B", "Tom Thumb"],
                                    ["3F5D53", "Mineral Green"],
                                    ["3FC1AA", "Puerto Rico"],
                                    ["3FFF00", "Harlequin"],
                                    ["401801", "Brown Pod"],
                                    ["40291D", "Cork"],
                                    ["403B38", "Masala"],
                                    ["403D19", "Thatch Green"],
                                    ["405169", "Fiord"],
                                    ["40826D", "Viridian"],
                                    ["40A860", "Chateau Green"],
                                    ["410056", "Ripe Plum"],
                                    ["411F10", "Paco"],
                                    ["412010", "Deep Oak"],
                                    ["413C37", "Merlin"],
                                    ["414257", "Gun Powder"],
                                    ["414C7D", "East Bay"],
                                    ["4169E1", "Royal Blue"],
                                    ["41AA78", "Ocean Green"],
                                    ["420303", "Burnt Maroon"],
                                    ["423921", "Lisbon Brown"],
                                    ["427977", "Faded Jade"],
                                    ["431560", "Scarlet Gum"],
                                    ["433120", "Iroko"],
                                    ["433E37", "Armadillo"],
                                    ["434C59", "River Bed"],
                                    ["436A0D", "Green Leaf"],
                                    ["44012D", "Barossa"],
                                    ["441D00", "Morocco Brown"],
                                    ["444954", "Mako"],
                                    ["454936", "Kelp"],
                                    ["456CAC", "San Marino"],
                                    ["45B1E8", "Picton Blue"],
                                    ["460B41", "Loulou"],
                                    ["462425", "Crater Brown"],
                                    ["465945", "Gray Asparagus"],
                                    ["4682B4", "Steel Blue"],
                                    ["480404", "Rustic Red"],
                                    ["480607", "Bulgarian Rose"],
                                    ["480656", "Clairvoyant"],
                                    ["481C1C", "Cocoa Bean"],
                                    ["483131", "Woody Brown"],
                                    ["483C32", "Taupe"],
                                    ["49170C", "Van Cleef"],
                                    ["492615", "Brown Derby"],
                                    ["49371B", "Metallic Bronze"],
                                    ["495400", "Verdun Green"],
                                    ["496679", "Blue Bayoux"],
                                    ["497183", "Bismark"],
                                    ["4A2A04", "Bracken"],
                                    ["4A3004", "Deep Bronze"],
                                    ["4A3C30", "Mondo"],
                                    ["4A4244", "Tundora"],
                                    ["4A444B", "Gravel"],
                                    ["4A4E5A", "Trout"],
                                    ["4B0082", "Pigment Indigo"],
                                    ["4B5D52", "Nandor"],
                                    ["4C3024", "Saddle"],
                                    ["4C4F56", "Abbey"],
                                    ["4D0135", "Blackberry"],
                                    ["4D0A18", "Cab Sav"],
                                    ["4D1E01", "Indian Tan"],
                                    ["4D282D", "Cowboy"],
                                    ["4D282E", "Livid Brown"],
                                    ["4D3833", "Rock"],
                                    ["4D3D14", "Punga"],
                                    ["4D400F", "Bronzetone"],
                                    ["4D5328", "Woodland"],
                                    ["4E0606", "Mahogany"],
                                    ["4E2A5A", "Bossanova"],
                                    ["4E3B41", "Matterhorn"],
                                    ["4E420C", "Bronze Olive"],
                                    ["4E4562", "Mulled Wine"],
                                    ["4E6649", "Axolotl"],
                                    ["4E7F9E", "Wedgewood"],
                                    ["4EABD1", "Shakespeare"],
                                    ["4F1C70", "Honey Flower"],
                                    ["4F2398", "Daisy Bush"],
                                    ["4F69C6", "Indigo"],
                                    ["4F7942", "Fern Green"],
                                    ["4F9D5D", "Fruit Salad"],
                                    ["4FA83D", "Apple"],
                                    ["504351", "Mortar"],
                                    ["507096", "Kashmir Blue"],
                                    ["507672", "Cutty Sark"],
                                    ["50C878", "Emerald"],
                                    ["514649", "Emperor"],
                                    ["516E3D", "Chalet Green"],
                                    ["517C66", "Como"],
                                    ["51808F", "Smalt Blue"],
                                    ["52001F", "Castro"],
                                    ["520C17", "Maroon Oak"],
                                    ["523C94", "Gigas"],
                                    ["533455", "Voodoo"],
                                    ["534491", "Victoria"],
                                    ["53824B", "Hippie Green"],
                                    ["541012", "Heath"],
                                    ["544333", "Judge Gray"],
                                    ["54534D", "Fuscous Gray"],
                                    ["549019", "Vida Loca"],
                                    ["55280C", "Cioccolato"],
                                    ["555B10", "Saratoga"],
                                    ["556D56", "Finlandia"],
                                    ["5590D9", "Havelock Blue"],
                                    ["56B4BE", "Fountain Blue"],
                                    ["578363", "Spring Leaves"],
                                    ["583401", "Saddle Brown"],
                                    ["585562", "Scarpa Flow"],
                                    ["587156", "Cactus"],
                                    ["589AAF", "Hippie Blue"],
                                    ["591D35", "Wine Berry"],
                                    ["592804", "Brown Bramble"],
                                    ["593737", "Congo Brown"],
                                    ["594433", "Millbrook"],
                                    ["5A6E9C", "Waikawa Gray"],
                                    ["5A87A0", "Horizon"],
                                    ["5B3013", "Jambalaya"],
                                    ["5C0120", "Bordeaux"],
                                    ["5C0536", "Mulberry Wood"],
                                    ["5C2E01", "Carnaby Tan"],
                                    ["5C5D75", "Comet"],
                                    ["5D1E0F", "Redwood"],
                                    ["5D4C51", "Don Juan"],
                                    ["5D5C58", "Chicago"],
                                    ["5D5E37", "Verdigris"],
                                    ["5D7747", "Dingley"],
                                    ["5DA19F", "Breaker Bay"],
                                    ["5E483E", "Kabul"],
                                    ["5E5D3B", "Hemlock"],
                                    ["5F3D26", "Irish Coffee"],
                                    ["5F5F6E", "Mid Gray"],
                                    ["5F6672", "Shuttle Gray"],
                                    ["5FA777", "Aqua Forest"],
                                    ["5FB3AC", "Tradewind"],
                                    ["604913", "Horses Neck"],
                                    ["605B73", "Smoky"],
                                    ["606E68", "Corduroy"],
                                    ["6093D1", "Danube"],
                                    ["612718", "Espresso"],
                                    ["614051", "Eggplant"],
                                    ["615D30", "Costa Del Sol"],
                                    ["61845F", "Glade Green"],
                                    ["622F30", "Buccaneer"],
                                    ["623F2D", "Quincy"],
                                    ["624E9A", "Butterfly Bush"],
                                    ["625119", "West Coast"],
                                    ["626649", "Finch"],
                                    ["639A8F", "Patina"],
                                    ["63B76C", "Fern"],
                                    ["6456B7", "Blue Violet"],
                                    ["646077", "Dolphin"],
                                    ["646463", "Storm Dust"],
                                    ["646A54", "Siam"],
                                    ["646E75", "Nevada"],
                                    ["6495ED", "Cornflower Blue"],
                                    ["64CCDB", "Viking"],
                                    ["65000B", "Rosewood"],
                                    ["651A14", "Cherrywood"],
                                    ["652DC1", "Purple Heart"],
                                    ["657220", "Fern Frond"],
                                    ["65745D", "Willow Grove"],
                                    ["65869F", "Hoki"],
                                    ["660045", "Pompadour"],
                                    ["660099", "Purple"],
                                    ["66023C", "Tyrian Purple"],
                                    ["661010", "Dark Tan"],
                                    ["66B58F", "Silver Tree"],
                                    ["66FF00", "Bright Green"],
                                    ["66FF66", "Screamin' Green"],
                                    ["67032D", "Black Rose"],
                                    ["675FA6", "Scampi"],
                                    ["676662", "Ironside Gray"],
                                    ["678975", "Viridian Green"],
                                    ["67A712", "Christi"],
                                    ["683600", "Nutmeg Wood Finish"],
                                    ["685558", "Zambezi"],
                                    ["685E6E", "Salt Box"],
                                    ["692545", "Tawny Port"],
                                    ["692D54", "Finn"],
                                    ["695F62", "Scorpion"],
                                    ["697E9A", "Lynch"],
                                    ["6A442E", "Spice"],
                                    ["6A5D1B", "Himalaya"],
                                    ["6A6051", "Soya Bean"],
                                    ["6B2A14", "Hairy Heath"],
                                    ["6B3FA0", "Royal Purple"],
                                    ["6B4E31", "Shingle Fawn"],
                                    ["6B5755", "Dorado"],
                                    ["6B8BA2", "Bermuda Gray"],
                                    ["6B8E23", "Olive Drab"],
                                    ["6C3082", "Eminence"],
                                    ["6CDAE7", "Turquoise Blue"],
                                    ["6D0101", "Lonestar"],
                                    ["6D5E54", "Pine Cone"],
                                    ["6D6C6C", "Dove Gray"],
                                    ["6D9292", "Juniper"],
                                    ["6D92A1", "Gothic"],
                                    ["6E0902", "Red Oxide"],
                                    ["6E1D14", "Moccaccino"],
                                    ["6E4826", "Pickled Bean"],
                                    ["6E4B26", "Dallas"],
                                    ["6E6D57", "Kokoda"],
                                    ["6E7783", "Pale Sky"],
                                    ["6F440C", "Cafe Royale"],
                                    ["6F6A61", "Flint"],
                                    ["6F8E63", "Highland"],
                                    ["6F9D02", "Limeade"],
                                    ["6FD0C5", "Downy"],
                                    ["701C1C", "Persian Plum"],
                                    ["704214", "Sepia"],
                                    ["704A07", "Antique Bronze"],
                                    ["704F50", "Ferra"],
                                    ["706555", "Coffee"],
                                    ["708090", "Slate Gray"],
                                    ["711A00", "Cedar Wood Finish"],
                                    ["71291D", "Metallic Copper"],
                                    ["714693", "Affair"],
                                    ["714AB2", "Studio"],
                                    ["715D47", "Tobacco Brown"],
                                    ["716338", "Yellow Metal"],
                                    ["716B56", "Peat"],
                                    ["716E10", "Olivetone"],
                                    ["717486", "Storm Gray"],
                                    ["718080", "Sirocco"],
                                    ["71D9E2", "Aquamarine Blue"],
                                    ["72010F", "Venetian Red"],
                                    ["724A2F", "Old Copper"],
                                    ["726D4E", "Go Ben"],
                                    ["727B89", "Raven"],
                                    ["731E8F", "Seance"],
                                    ["734A12", "Raw Umber"],
                                    ["736C9F", "Kimberly"],
                                    ["736D58", "Crocodile"],
                                    ["737829", "Crete"],
                                    ["738678", "Xanadu"],
                                    ["74640D", "Spicy Mustard"],
                                    ["747D63", "Limed Ash"],
                                    ["747D83", "Rolling Stone"],
                                    ["748881", "Blue Smoke"],
                                    ["749378", "Laurel"],
                                    ["74C365", "Mantis"],
                                    ["755A57", "Russett"],
                                    ["7563A8", "Deluge"],
                                    ["76395D", "Cosmic"],
                                    ["7666C6", "Blue Marguerite"],
                                    ["76BD17", "Lima"],
                                    ["76D7EA", "Sky Blue"],
                                    ["770F05", "Dark Burgundy"],
                                    ["771F1F", "Crown of Thorns"],
                                    ["773F1A", "Walnut"],
                                    ["776F61", "Pablo"],
                                    ["778120", "Pacifika"],
                                    ["779E86", "Oxley"],
                                    ["77DD77", "Pastel Green"],
                                    ["780109", "Japanese Maple"],
                                    ["782D19", "Mocha"],
                                    ["782F16", "Peanut"],
                                    ["78866B", "Camouflage Green"],
                                    ["788A25", "Wasabi"],
                                    ["788BBA", "Ship Cove"],
                                    ["78A39C", "Sea Nymph"],
                                    ["795D4C", "Roman Coffee"],
                                    ["796878", "Old Lavender"],
                                    ["796989", "Rum"],
                                    ["796A78", "Fedora"],
                                    ["796D62", "Sandstone"],
                                    ["79DEEC", "Spray"],
                                    ["7A013A", "Siren"],
                                    ["7A58C1", "Fuchsia Blue"],
                                    ["7A7A7A", "Boulder"],
                                    ["7A89B8", "Wild Blue Yonder"],
                                    ["7AC488", "De York"],
                                    ["7B3801", "Red Beech"],
                                    ["7B3F00", "Cinnamon"],
                                    ["7B6608", "Yukon Gold"],
                                    ["7B7874", "Tapa"],
                                    ["7B7C94", "Waterloo "],
                                    ["7B8265", "Flax Smoke"],
                                    ["7B9F80", "Amulet"],
                                    ["7BA05B", "Asparagus"],
                                    ["7C1C05", "Kenyan Copper"],
                                    ["7C7631", "Pesto"],
                                    ["7C778A", "Topaz"],
                                    ["7C7B7A", "Concord"],
                                    ["7C7B82", "Jumbo"],
                                    ["7C881A", "Trendy Green"],
                                    ["7CA1A6", "Gumbo"],
                                    ["7CB0A1", "Acapulco"],
                                    ["7CB7BB", "Neptune"],
                                    ["7D2C14", "Pueblo"],
                                    ["7DA98D", "Bay Leaf"],
                                    ["7DC8F7", "Malibu"],
                                    ["7DD8C6", "Bermuda"],
                                    ["7E3A15", "Copper Canyon"],
                                    ["7F1734", "Claret"],
                                    ["7F3A02", "Peru Tan"],
                                    ["7F626D", "Falcon"],
                                    ["7F7589", "Mobster"],
                                    ["7F76D3", "Moody Blue"],
                                    ["7FFF00", "Chartreuse"],
                                    ["7FFFD4", "Aquamarine"],
                                    ["800000", "Maroon"],
                                    ["800B47", "Rose Bud Cherry"],
                                    ["801818", "Falu Red"],
                                    ["80341F", "Red Robin"],
                                    ["803790", "Vivid Violet"],
                                    ["80461B", "Russet"],
                                    ["807E79", "Friar Gray"],
                                    ["808000", "Olive"],
                                    ["808080", "Gray"],
                                    ["80B3AE", "Gulf Stream"],
                                    ["80B3C4", "Glacier"],
                                    ["80CCEA", "Seagull"],
                                    ["81422C", "Nutmeg"],
                                    ["816E71", "Spicy Pink"],
                                    ["817377", "Empress"],
                                    ["819885", "Spanish Green"],
                                    ["826F65", "Sand Dune"],
                                    ["828685", "Gunsmoke"],
                                    ["828F72", "Battleship Gray"],
                                    ["831923", "Merlot"],
                                    ["837050", "Shadow"],
                                    ["83AA5D", "Chelsea Cucumber"],
                                    ["83D0C6", "Monte Carlo"],
                                    ["843179", "Plum"],
                                    ["84A0A0", "Granny Smith"],
                                    ["8581D9", "Chetwode Blue"],
                                    ["858470", "Bandicoot"],
                                    ["859FAF", "Bali Hai"],
                                    ["85C4CC", "Half Baked"],
                                    ["860111", "Red Devil"],
                                    ["863C3C", "Lotus"],
                                    ["86483C", "Ironstone"],
                                    ["864D1E", "Bull Shot"],
                                    ["86560A", "Rusty Nail"],
                                    ["868974", "Bitter"],
                                    ["86949F", "Regent Gray"],
                                    ["871550", "Disco"],
                                    ["87756E", "Americano"],
                                    ["877C7B", "Hurricane"],
                                    ["878D91", "Oslo Gray"],
                                    ["87AB39", "Sushi"],
                                    ["885342", "Spicy Mix"],
                                    ["886221", "Kumera"],
                                    ["888387", "Suva Gray"],
                                    ["888D65", "Avocado"],
                                    ["893456", "Camelot"],
                                    ["893843", "Solid Pink"],
                                    ["894367", "Cannon Pink"],
                                    ["897D6D", "Makara"],
                                    ["8A3324", "Burnt Umber"],
                                    ["8A73D6", "True V"],
                                    ["8A8360", "Clay Creek"],
                                    ["8A8389", "Monsoon"],
                                    ["8A8F8A", "Stack"],
                                    ["8AB9F1", "Jordy Blue"],
                                    ["8B00FF", "Electric Violet"],
                                    ["8B0723", "Monarch"],
                                    ["8B6B0B", "Corn Harvest"],
                                    ["8B8470", "Olive Haze"],
                                    ["8B847E", "Schooner"],
                                    ["8B8680", "Natural Gray"],
                                    ["8B9C90", "Mantle"],
                                    ["8B9FEE", "Portage"],
                                    ["8BA690", "Envy"],
                                    ["8BA9A5", "Cascade"],
                                    ["8BE6D8", "Riptide"],
                                    ["8C055E", "Cardinal Pink"],
                                    ["8C472F", "Mule Fawn"],
                                    ["8C5738", "Potters Clay"],
                                    ["8C6495", "Trendy Pink"],
                                    ["8D0226", "Paprika"],
                                    ["8D3D38", "Sanguine Brown"],
                                    ["8D3F3F", "Tosca"],
                                    ["8D7662", "Cement"],
                                    ["8D8974", "Granite Green"],
                                    ["8D90A1", "Manatee"],
                                    ["8DA8CC", "Polo Blue"],
                                    ["8E0000", "Red Berry"],
                                    ["8E4D1E", "Rope"],
                                    ["8E6F70", "Opium"],
                                    ["8E775E", "Domino"],
                                    ["8E8190", "Mamba"],
                                    ["8EABC1", "Nepal"],
                                    ["8F021C", "Pohutukawa"],
                                    ["8F3E33", "El Salva"],
                                    ["8F4B0E", "Korma"],
                                    ["8F8176", "Squirrel"],
                                    ["8FD6B4", "Vista Blue"],
                                    ["900020", "Burgundy"],
                                    ["901E1E", "Old Brick"],
                                    ["907874", "Hemp"],
                                    ["907B71", "Almond Frost"],
                                    ["908D39", "Sycamore"],
                                    ["92000A", "Sangria"],
                                    ["924321", "Cumin"],
                                    ["926F5B", "Beaver"],
                                    ["928573", "Stonewall"],
                                    ["928590", "Venus"],
                                    ["9370DB", "Medium Purple"],
                                    ["93CCEA", "Cornflower"],
                                    ["93DFB8", "Algae Green"],
                                    ["944747", "Copper Rust"],
                                    ["948771", "Arrowtown"],
                                    ["950015", "Scarlett"],
                                    ["956387", "Strikemaster"],
                                    ["959396", "Mountain Mist"],
                                    ["960018", "Carmine"],
                                    ["964B00", "Brown"],
                                    ["967059", "Leather"],
                                    ["9678B6", "Purple Mountain's Majesty"],
                                    ["967BB6", "Lavender Purple"],
                                    ["96A8A1", "Pewter"],
                                    ["96BBAB", "Summer Green"],
                                    ["97605D", "Au Chico"],
                                    ["9771B5", "Wisteria"],
                                    ["97CD2D", "Atlantis"],
                                    ["983D61", "Vin Rouge"],
                                    ["9874D3", "Lilac Bush"],
                                    ["98777B", "Bazaar"],
                                    ["98811B", "Hacienda"],
                                    ["988D77", "Pale Oyster"],
                                    ["98FF98", "Mint Green"],
                                    ["990066", "Fresh Eggplant"],
                                    ["991199", "Violet Eggplant"],
                                    ["991613", "Tamarillo"],
                                    ["991B07", "Totem Pole"],
                                    ["996666", "Copper Rose"],
                                    ["9966CC", "Amethyst"],
                                    ["997A8D", "Mountbatten Pink"],
                                    ["9999CC", "Blue Bell"],
                                    ["9A3820", "Prairie Sand"],
                                    ["9A6E61", "Toast"],
                                    ["9A9577", "Gurkha"],
                                    ["9AB973", "Olivine"],
                                    ["9AC2B8", "Shadow Green"],
                                    ["9B4703", "Oregon"],
                                    ["9B9E8F", "Lemon Grass"],
                                    ["9C3336", "Stiletto"],
                                    ["9D5616", "Hawaiian Tan"],
                                    ["9DACB7", "Gull Gray"],
                                    ["9DC209", "Pistachio"],
                                    ["9DE093", "Granny Smith Apple"],
                                    ["9DE5FF", "Anakiwa"],
                                    ["9E5302", "Chelsea Gem"],
                                    ["9E5B40", "Sepia Skin"],
                                    ["9EA587", "Sage"],
                                    ["9EA91F", "Citron"],
                                    ["9EB1CD", "Rock Blue"],
                                    ["9EDEE0", "Morning Glory"],
                                    ["9F381D", "Cognac"],
                                    ["9F821C", "Reef Gold"],
                                    ["9F9F9C", "Star Dust"],
                                    ["9FA0B1", "Santas Gray"],
                                    ["9FD7D3", "Sinbad"],
                                    ["9FDD8C", "Feijoa"],
                                    ["A02712", "Tabasco"],
                                    ["A1750D", "Buttered Rum"],
                                    ["A1ADB5", "Hit Gray"],
                                    ["A1C50A", "Citrus"],
                                    ["A1DAD7", "Aqua Island"],
                                    ["A1E9DE", "Water Leaf"],
                                    ["A2006D", "Flirt"],
                                    ["A23B6C", "Rouge"],
                                    ["A26645", "Cape Palliser"],
                                    ["A2AAB3", "Gray Chateau"],
                                    ["A2AEAB", "Edward"],
                                    ["A3807B", "Pharlap"],
                                    ["A397B4", "Amethyst Smoke"],
                                    ["A3E3ED", "Blizzard Blue"],
                                    ["A4A49D", "Delta"],
                                    ["A4A6D3", "Wistful"],
                                    ["A4AF6E", "Green Smoke"],
                                    ["A50B5E", "Jazzberry Jam"],
                                    ["A59B91", "Zorba"],
                                    ["A5CB0C", "Bahia"],
                                    ["A62F20", "Roof Terracotta"],
                                    ["A65529", "Paarl"],
                                    ["A68B5B", "Barley Corn"],
                                    ["A69279", "Donkey Brown"],
                                    ["A6A29A", "Dawn"],
                                    ["A72525", "Mexican Red"],
                                    ["A7882C", "Luxor Gold"],
                                    ["A85307", "Rich Gold"],
                                    ["A86515", "Reno Sand"],
                                    ["A86B6B", "Coral Tree"],
                                    ["A8989B", "Dusty Gray"],
                                    ["A899E6", "Dull Lavender"],
                                    ["A8A589", "Tallow"],
                                    ["A8AE9C", "Bud"],
                                    ["A8AF8E", "Locust"],
                                    ["A8BD9F", "Norway"],
                                    ["A8E3BD", "Chinook"],
                                    ["A9A491", "Gray Olive"],
                                    ["A9ACB6", "Aluminium"],
                                    ["A9B2C3", "Cadet Blue"],
                                    ["A9B497", "Schist"],
                                    ["A9BDBF", "Tower Gray"],
                                    ["A9BEF2", "Perano"],
                                    ["A9C6C2", "Opal"],
                                    ["AA375A", "Night Shadz"],
                                    ["AA4203", "Fire"],
                                    ["AA8B5B", "Muesli"],
                                    ["AA8D6F", "Sandal"],
                                    ["AAA5A9", "Shady Lady"],
                                    ["AAA9CD", "Logan"],
                                    ["AAABB7", "Spun Pearl"],
                                    ["AAD6E6", "Regent St Blue"],
                                    ["AAF0D1", "Magic Mint"],
                                    ["AB0563", "Lipstick"],
                                    ["AB3472", "Royal Heath"],
                                    ["AB917A", "Sandrift"],
                                    ["ABA0D9", "Cold Purple"],
                                    ["ABA196", "Bronco"],
                                    ["AC8A56", "Limed Oak"],
                                    ["AC91CE", "East Side"],
                                    ["AC9E22", "Lemon Ginger"],
                                    ["ACA494", "Napa"],
                                    ["ACA586", "Hillary"],
                                    ["ACA59F", "Cloudy"],
                                    ["ACACAC", "Silver Chalice"],
                                    ["ACB78E", "Swamp Green"],
                                    ["ACCBB1", "Spring Rain"],
                                    ["ACDD4D", "Conifer"],
                                    ["ACE1AF", "Celadon"],
                                    ["AD781B", "Mandalay"],
                                    ["ADBED1", "Casper"],
                                    ["ADDFAD", "Moss Green"],
                                    ["ADE6C4", "Padua"],
                                    ["ADFF2F", "Green Yellow"],
                                    ["AE4560", "Hippie Pink"],
                                    ["AE6020", "Desert"],
                                    ["AE809E", "Bouquet"],
                                    ["AF4035", "Medium Carmine"],
                                    ["AF4D43", "Apple Blossom"],
                                    ["AF593E", "Brown Rust"],
                                    ["AF8751", "Driftwood"],
                                    ["AF8F2C", "Alpine"],
                                    ["AF9F1C", "Lucky"],
                                    ["AFA09E", "Martini"],
                                    ["AFB1B8", "Bombay"],
                                    ["AFBDD9", "Pigeon Post"],
                                    ["B04C6A", "Cadillac"],
                                    ["B05D54", "Matrix"],
                                    ["B05E81", "Tapestry"],
                                    ["B06608", "Mai Tai"],
                                    ["B09A95", "Del Rio"],
                                    ["B0E0E6", "Powder Blue"],
                                    ["B0E313", "Inch Worm"],
                                    ["B10000", "Bright Red"],
                                    ["B14A0B", "Vesuvius"],
                                    ["B1610B", "Pumpkin Skin"],
                                    ["B16D52", "Santa Fe"],
                                    ["B19461", "Teak"],
                                    ["B1E2C1", "Fringy Flower"],
                                    ["B1F4E7", "Ice Cold"],
                                    ["B20931", "Shiraz"],
                                    ["B2A1EA", "Biloba Flower"],
                                    ["B32D29", "Tall Poppy"],
                                    ["B35213", "Fiery Orange"],
                                    ["B38007", "Hot Toddy"],
                                    ["B3AF95", "Taupe Gray"],
                                    ["B3C110", "La Rioja"],
                                    ["B43332", "Well Read"],
                                    ["B44668", "Blush"],
                                    ["B4CFD3", "Jungle Mist"],
                                    ["B57281", "Turkish Rose"],
                                    ["B57EDC", "Lavender"],
                                    ["B5A27F", "Mongoose"],
                                    ["B5B35C", "Olive Green"],
                                    ["B5D2CE", "Jet Stream"],
                                    ["B5ECDF", "Cruise"],
                                    ["B6316C", "Hibiscus"],
                                    ["B69D98", "Thatch"],
                                    ["B6B095", "Heathered Gray"],
                                    ["B6BAA4", "Eagle"],
                                    ["B6D1EA", "Spindle"],
                                    ["B6D3BF", "Gum Leaf"],
                                    ["B7410E", "Rust"],
                                    ["B78E5C", "Muddy Waters"],
                                    ["B7A214", "Sahara"],
                                    ["B7A458", "Husk"],
                                    ["B7B1B1", "Nobel"],
                                    ["B7C3D0", "Heather"],
                                    ["B7F0BE", "Madang"],
                                    ["B81104", "Milano Red"],
                                    ["B87333", "Copper"],
                                    ["B8B56A", "Gimblet"],
                                    ["B8C1B1", "Green Spring"],
                                    ["B8C25D", "Celery"],
                                    ["B8E0F9", "Sail"],
                                    ["B94E48", "Chestnut"],
                                    ["B95140", "Crail"],
                                    ["B98D28", "Marigold"],
                                    ["B9C46A", "Wild Willow"],
                                    ["B9C8AC", "Rainee"],
                                    ["BA0101", "Guardsman Red"],
                                    ["BA450C", "Rock Spray"],
                                    ["BA6F1E", "Bourbon"],
                                    ["BA7F03", "Pirate Gold"],
                                    ["BAB1A2", "Nomad"],
                                    ["BAC7C9", "Submarine"],
                                    ["BAEEF9", "Charlotte"],
                                    ["BB3385", "Medium Red Violet"],
                                    ["BB8983", "Brandy Rose"],
                                    ["BBD009", "Rio Grande"],
                                    ["BBD7C1", "Surf"],
                                    ["BCC9C2", "Powder Ash"],
                                    ["BD5E2E", "Tuscany"],
                                    ["BD978E", "Quicksand"],
                                    ["BDB1A8", "Silk"],
                                    ["BDB2A1", "Malta"],
                                    ["BDB3C7", "Chatelle"],
                                    ["BDBBD7", "Lavender Gray"],
                                    ["BDBDC6", "French Gray"],
                                    ["BDC8B3", "Clay Ash"],
                                    ["BDC9CE", "Loblolly"],
                                    ["BDEDFD", "French Pass"],
                                    ["BEA6C3", "London Hue"],
                                    ["BEB5B7", "Pink Swan"],
                                    ["BEDE0D", "Fuego"],
                                    ["BF5500", "Rose of Sharon"],
                                    ["BFB8B0", "Tide"],
                                    ["BFBED8", "Blue Haze"],
                                    ["BFC1C2", "Silver Sand"],
                                    ["BFC921", "Key Lime Pie"],
                                    ["BFDBE2", "Ziggurat"],
                                    ["BFFF00", "Lime"],
                                    ["C02B18", "Thunderbird"],
                                    ["C04737", "Mojo"],
                                    ["C08081", "Old Rose"],
                                    ["C0C0C0", "Silver"],
                                    ["C0D3B9", "Pale Leaf"],
                                    ["C0D8B6", "Pixie Green"],
                                    ["C1440E", "Tia Maria"],
                                    ["C154C1", "Fuchsia Pink"],
                                    ["C1A004", "Buddha Gold"],
                                    ["C1B7A4", "Bison Hide"],
                                    ["C1BAB0", "Tea"],
                                    ["C1BECD", "Gray Suit"],
                                    ["C1D7B0", "Sprout"],
                                    ["C1F07C", "Sulu"],
                                    ["C26B03", "Indochine"],
                                    ["C2955D", "Twine"],
                                    ["C2BDB6", "Cotton Seed"],
                                    ["C2CAC4", "Pumice"],
                                    ["C2E8E5", "Jagged Ice"],
                                    ["C32148", "Maroon Flush"],
                                    ["C3B091", "Indian Khaki"],
                                    ["C3BFC1", "Pale Slate"],
                                    ["C3C3BD", "Gray Nickel"],
                                    ["C3CDE6", "Periwinkle Gray"],
                                    ["C3D1D1", "Tiara"],
                                    ["C3DDF9", "Tropical Blue"],
                                    ["C41E3A", "Cardinal"],
                                    ["C45655", "Fuzzy Wuzzy Brown"],
                                    ["C45719", "Orange Roughy"],
                                    ["C4C4BC", "Mist Gray"],
                                    ["C4D0B0", "Coriander"],
                                    ["C4F4EB", "Mint Tulip"],
                                    ["C54B8C", "Mulberry"],
                                    ["C59922", "Nugget"],
                                    ["C5994B", "Tussock"],
                                    ["C5DBCA", "Sea Mist"],
                                    ["C5E17A", "Yellow Green"],
                                    ["C62D42", "Brick Red"],
                                    ["C6726B", "Contessa"],
                                    ["C69191", "Oriental Pink"],
                                    ["C6A84B", "Roti"],
                                    ["C6C3B5", "Ash"],
                                    ["C6C8BD", "Kangaroo"],
                                    ["C6E610", "Las Palmas"],
                                    ["C7031E", "Monza"],
                                    ["C71585", "Red Violet"],
                                    ["C7BCA2", "Coral Reef"],
                                    ["C7C1FF", "Melrose"],
                                    ["C7C4BF", "Cloud"],
                                    ["C7C9D5", "Ghost"],
                                    ["C7CD90", "Pine Glade"],
                                    ["C7DDE5", "Botticelli"],
                                    ["C88A65", "Antique Brass"],
                                    ["C8A2C8", "Lilac"],
                                    ["C8A528", "Hokey Pokey"],
                                    ["C8AABF", "Lily"],
                                    ["C8B568", "Laser"],
                                    ["C8E3D7", "Edgewater"],
                                    ["C96323", "Piper"],
                                    ["C99415", "Pizza"],
                                    ["C9A0DC", "Light Wisteria"],
                                    ["C9B29B", "Rodeo Dust"],
                                    ["C9B35B", "Sundance"],
                                    ["C9B93B", "Earls Green"],
                                    ["C9C0BB", "Silver Rust"],
                                    ["C9D9D2", "Conch"],
                                    ["C9FFA2", "Reef"],
                                    ["C9FFE5", "Aero Blue"],
                                    ["CA3435", "Flush Mahogany"],
                                    ["CABB48", "Turmeric"],
                                    ["CADCD4", "Paris White"],
                                    ["CAE00D", "Bitter Lemon"],
                                    ["CAE6DA", "Skeptic"],
                                    ["CB8FA9", "Viola"],
                                    ["CBCAB6", "Foggy Gray"],
                                    ["CBD3B0", "Green Mist"],
                                    ["CBDBD6", "Nebula"],
                                    ["CC3333", "Persian Red"],
                                    ["CC5500", "Burnt Orange"],
                                    ["CC7722", "Ochre"],
                                    ["CC8899", "Puce"],
                                    ["CCCAA8", "Thistle Green"],
                                    ["CCCCFF", "Periwinkle"],
                                    ["CCFF00", "Electric Lime"],
                                    ["CD5700", "Tenn"],
                                    ["CD5C5C", "Chestnut Rose"],
                                    ["CD8429", "Brandy Punch"],
                                    ["CDF4FF", "Onahau"],
                                    ["CEB98F", "Sorrell Brown"],
                                    ["CEBABA", "Cold Turkey"],
                                    ["CEC291", "Yuma"],
                                    ["CEC7A7", "Chino"],
                                    ["CFA39D", "Eunry"],
                                    ["CFB53B", "Old Gold"],
                                    ["CFDCCF", "Tasman"],
                                    ["CFE5D2", "Surf Crest"],
                                    ["CFF9F3", "Humming Bird"],
                                    ["CFFAF4", "Scandal"],
                                    ["D05F04", "Red Stage"],
                                    ["D06DA1", "Hopbush"],
                                    ["D07D12", "Meteor"],
                                    ["D0BEF8", "Perfume"],
                                    ["D0C0E5", "Prelude"],
                                    ["D0F0C0", "Tea Green"],
                                    ["D18F1B", "Geebung"],
                                    ["D1BEA8", "Vanilla"],
                                    ["D1C6B4", "Soft Amber"],
                                    ["D1D2CA", "Celeste"],
                                    ["D1D2DD", "Mischka"],
                                    ["D1E231", "Pear"],
                                    ["D2691E", "Hot Cinnamon"],
                                    ["D27D46", "Raw Sienna"],
                                    ["D29EAA", "Careys Pink"],
                                    ["D2B48C", "Tan"],
                                    ["D2DA97", "Deco"],
                                    ["D2F6DE", "Blue Romance"],
                                    ["D2F8B0", "Gossip"],
                                    ["D3CBBA", "Sisal"],
                                    ["D3CDC5", "Swirl"],
                                    ["D47494", "Charm"],
                                    ["D4B6AF", "Clam Shell"],
                                    ["D4BF8D", "Straw"],
                                    ["D4C4A8", "Akaroa"],
                                    ["D4CD16", "Bird Flower"],
                                    ["D4D7D9", "Iron"],
                                    ["D4DFE2", "Geyser"],
                                    ["D4E2FC", "Hawkes Blue"],
                                    ["D54600", "Grenadier"],
                                    ["D591A4", "Can Can"],
                                    ["D59A6F", "Whiskey"],
                                    ["D5D195", "Winter Hazel"],
                                    ["D5F6E3", "Granny Apple"],
                                    ["D69188", "My Pink"],
                                    ["D6C562", "Tacha"],
                                    ["D6CEF6", "Moon Raker"],
                                    ["D6D6D1", "Quill Gray"],
                                    ["D6FFDB", "Snowy Mint"],
                                    ["D7837F", "New York Pink"],
                                    ["D7C498", "Pavlova"],
                                    ["D7D0FF", "Fog"],
                                    ["D84437", "Valencia"],
                                    ["D87C63", "Japonica"],
                                    ["D8BFD8", "Thistle"],
                                    ["D8C2D5", "Maverick"],
                                    ["D8FCFA", "Foam"],
                                    ["D94972", "Cabaret"],
                                    ["D99376", "Burning Sand"],
                                    ["D9B99B", "Cameo"],
                                    ["D9D6CF", "Timberwolf"],
                                    ["D9DCC1", "Tana"],
                                    ["D9E4F5", "Link Water"],
                                    ["D9F7FF", "Mabel"],
                                    ["DA3287", "Cerise"],
                                    ["DA5B38", "Flame Pea"],
                                    ["DA6304", "Bamboo"],
                                    ["DA6A41", "Red Damask"],
                                    ["DA70D6", "Orchid"],
                                    ["DA8A67", "Copperfield"],
                                    ["DAA520", "Golden Grass"],
                                    ["DAECD6", "Zanah"],
                                    ["DAF4F0", "Iceberg"],
                                    ["DAFAFF", "Oyster Bay"],
                                    ["DB5079", "Cranberry"],
                                    ["DB9690", "Petite Orchid"],
                                    ["DB995E", "Di Serria"],
                                    ["DBDBDB", "Alto"],
                                    ["DBFFF8", "Frosted Mint"],
                                    ["DC143C", "Crimson"],
                                    ["DC4333", "Punch"],
                                    ["DCB20C", "Galliano"],
                                    ["DCB4BC", "Blossom"],
                                    ["DCD747", "Wattle"],
                                    ["DCD9D2", "Westar"],
                                    ["DCDDCC", "Moon Mist"],
                                    ["DCEDB4", "Caper"],
                                    ["DCF0EA", "Swans Down"],
                                    ["DDD6D5", "Swiss Coffee"],
                                    ["DDF9F1", "White Ice"],
                                    ["DE3163", "Cerise Red"],
                                    ["DE6360", "Roman"],
                                    ["DEA681", "Tumbleweed"],
                                    ["DEBA13", "Gold Tips"],
                                    ["DEC196", "Brandy"],
                                    ["DECBC6", "Wafer"],
                                    ["DED4A4", "Sapling"],
                                    ["DED717", "Barberry"],
                                    ["DEE5C0", "Beryl Green"],
                                    ["DEF5FF", "Pattens Blue"],
                                    ["DF73FF", "Heliotrope"],
                                    ["DFBE6F", "Apache"],
                                    ["DFCD6F", "Chenin"],
                                    ["DFCFDB", "Lola"],
                                    ["DFECDA", "Willow Brook"],
                                    ["DFFF00", "Chartreuse Yellow"],
                                    ["E0B0FF", "Mauve"],
                                    ["E0B646", "Anzac"],
                                    ["E0B974", "Harvest Gold"],
                                    ["E0C095", "Calico"],
                                    ["E0FFFF", "Baby Blue"],
                                    ["E16865", "Sunglo"],
                                    ["E1BC64", "Equator"],
                                    ["E1C0C8", "Pink Flare"],
                                    ["E1E6D6", "Periglacial Blue"],
                                    ["E1EAD4", "Kidnapper"],
                                    ["E1F6E8", "Tara"],
                                    ["E25465", "Mandy"],
                                    ["E2725B", "Terracotta"],
                                    ["E28913", "Golden Bell"],
                                    ["E292C0", "Shocking"],
                                    ["E29418", "Dixie"],
                                    ["E29CD2", "Light Orchid"],
                                    ["E2D8ED", "Snuff"],
                                    ["E2EBED", "Mystic"],
                                    ["E2F3EC", "Apple Green"],
                                    ["E30B5C", "Razzmatazz"],
                                    ["E32636", "Alizarin Crimson"],
                                    ["E34234", "Cinnabar"],
                                    ["E3BEBE", "Cavern Pink"],
                                    ["E3F5E1", "Peppermint"],
                                    ["E3F988", "Mindaro"],
                                    ["E47698", "Deep Blush"],
                                    ["E49B0F", "Gamboge"],
                                    ["E4C2D5", "Melanie"],
                                    ["E4CFDE", "Twilight"],
                                    ["E4D1C0", "Bone"],
                                    ["E4D422", "Sunflower"],
                                    ["E4D5B7", "Grain Brown"],
                                    ["E4D69B", "Zombie"],
                                    ["E4F6E7", "Frostee"],
                                    ["E4FFD1", "Snow Flurry"],
                                    ["E52B50", "Amaranth"],
                                    ["E5841B", "Zest"],
                                    ["E5CCC9", "Dust Storm"],
                                    ["E5D7BD", "Stark White"],
                                    ["E5D8AF", "Hampton"],
                                    ["E5E0E1", "Bon Jour"],
                                    ["E5E5E5", "Mercury"],
                                    ["E5F9F6", "Polar"],
                                    ["E64E03", "Trinidad"],
                                    ["E6BE8A", "Gold Sand"],
                                    ["E6BEA5", "Cashmere"],
                                    ["E6D7B9", "Double Spanish White"],
                                    ["E6E4D4", "Satin Linen"],
                                    ["E6F2EA", "Harp"],
                                    ["E6F8F3", "Off Green"],
                                    ["E6FFE9", "Hint of Green"],
                                    ["E6FFFF", "Tranquil"],
                                    ["E77200", "Mango Tango"],
                                    ["E7730A", "Christine"],
                                    ["E79F8C", "Tonys Pink"],
                                    ["E79FC4", "Kobi"],
                                    ["E7BCB4", "Rose Fog"],
                                    ["E7BF05", "Corn"],
                                    ["E7CD8C", "Putty"],
                                    ["E7ECE6", "Gray Nurse"],
                                    ["E7F8FF", "Lily White"],
                                    ["E7FEFF", "Bubbles"],
                                    ["E89928", "Fire Bush"],
                                    ["E8B9B3", "Shilo"],
                                    ["E8E0D5", "Pearl Bush"],
                                    ["E8EBE0", "Green White"],
                                    ["E8F1D4", "Chrome White"],
                                    ["E8F2EB", "Gin"],
                                    ["E8F5F2", "Aqua Squeeze"],
                                    ["E96E00", "Clementine"],
                                    ["E97451", "Burnt Sienna"],
                                    ["E97C07", "Tahiti Gold"],
                                    ["E9CECD", "Oyster Pink"],
                                    ["E9D75A", "Confetti"],
                                    ["E9E3E3", "Ebb"],
                                    ["E9F8ED", "Ottoman"],
                                    ["E9FFFD", "Clear Day"],
                                    ["EA88A8", "Carissma"],
                                    ["EAAE69", "Porsche"],
                                    ["EAB33B", "Tulip Tree"],
                                    ["EAC674", "Rob Roy"],
                                    ["EADAB8", "Raffia"],
                                    ["EAE8D4", "White Rock"],
                                    ["EAF6EE", "Panache"],
                                    ["EAF6FF", "Solitude"],
                                    ["EAF9F5", "Aqua Spring"],
                                    ["EAFFFE", "Dew"],
                                    ["EB9373", "Apricot"],
                                    ["EBC2AF", "Zinnwaldite"],
                                    ["ECA927", "Fuel Yellow"],
                                    ["ECC54E", "Ronchi"],
                                    ["ECC7EE", "French Lilac"],
                                    ["ECCDB9", "Just Right"],
                                    ["ECE090", "Wild Rice"],
                                    ["ECEBBD", "Fall Green"],
                                    ["ECEBCE", "Aths Special"],
                                    ["ECF245", "Starship"],
                                    ["ED0A3F", "Red Ribbon"],
                                    ["ED7A1C", "Tango"],
                                    ["ED9121", "Carrot Orange"],
                                    ["ED989E", "Sea Pink"],
                                    ["EDB381", "Tacao"],
                                    ["EDC9AF", "Desert Sand"],
                                    ["EDCDAB", "Pancho"],
                                    ["EDDCB1", "Chamois"],
                                    ["EDEA99", "Primrose"],
                                    ["EDF5DD", "Frost"],
                                    ["EDF5F5", "Aqua Haze"],
                                    ["EDF6FF", "Zumthor"],
                                    ["EDF9F1", "Narvik"],
                                    ["EDFC84", "Honeysuckle"],
                                    ["EE82EE", "Lavender Magenta"],
                                    ["EEC1BE", "Beauty Bush"],
                                    ["EED794", "Chalky"],
                                    ["EED9C4", "Almond"],
                                    ["EEDC82", "Flax"],
                                    ["EEDEDA", "Bizarre"],
                                    ["EEE3AD", "Double Colonial White"],
                                    ["EEEEE8", "Cararra"],
                                    ["EEEF78", "Manz"],
                                    ["EEF0C8", "Tahuna Sands"],
                                    ["EEF0F3", "Athens Gray"],
                                    ["EEF3C3", "Tusk"],
                                    ["EEF4DE", "Loafer"],
                                    ["EEF6F7", "Catskill White"],
                                    ["EEFDFF", "Twilight Blue"],
                                    ["EEFF9A", "Jonquil"],
                                    ["EEFFE2", "Rice Flower"],
                                    ["EF863F", "Jaffa"],
                                    ["EFEFEF", "Gallery"],
                                    ["EFF2F3", "Porcelain"],
                                    ["F091A9", "Mauvelous"],
                                    ["F0D52D", "Golden Dream"],
                                    ["F0DB7D", "Golden Sand"],
                                    ["F0DC82", "Buff"],
                                    ["F0E2EC", "Prim"],
                                    ["F0E68C", "Khaki"],
                                    ["F0EEFD", "Selago"],
                                    ["F0EEFF", "Titan White"],
                                    ["F0F8FF", "Alice Blue"],
                                    ["F0FCEA", "Feta"],
                                    ["F18200", "Gold Drop"],
                                    ["F19BAB", "Wewak"],
                                    ["F1E788", "Sahara Sand"],
                                    ["F1E9D2", "Parchment"],
                                    ["F1E9FF", "Blue Chalk"],
                                    ["F1EEC1", "Mint Julep"],
                                    ["F1F1F1", "Seashell"],
                                    ["F1F7F2", "Saltpan"],
                                    ["F1FFAD", "Tidal"],
                                    ["F1FFC8", "Chiffon"],
                                    ["F2552A", "Flamingo"],
                                    ["F28500", "Tangerine"],
                                    ["F2C3B2", "Mandys Pink"],
                                    ["F2F2F2", "Concrete"],
                                    ["F2FAFA", "Black Squeeze"],
                                    ["F34723", "Pomegranate"],
                                    ["F3AD16", "Buttercup"],
                                    ["F3D69D", "New Orleans"],
                                    ["F3D9DF", "Vanilla Ice"],
                                    ["F3E7BB", "Sidecar"],
                                    ["F3E9E5", "Dawn Pink"],
                                    ["F3EDCF", "Wheatfield"],
                                    ["F3FB62", "Canary"],
                                    ["F3FBD4", "Orinoco"],
                                    ["F3FFD8", "Carla"],
                                    ["F400A1", "Hollywood Cerise"],
                                    ["F4A460", "Sandy brown"],
                                    ["F4C430", "Saffron"],
                                    ["F4D81C", "Ripe Lemon"],
                                    ["F4EBD3", "Janna"],
                                    ["F4F2EE", "Pampas"],
                                    ["F4F4F4", "Wild Sand"],
                                    ["F4F8FF", "Zircon"],
                                    ["F57584", "Froly"],
                                    ["F5C85C", "Cream Can"],
                                    ["F5C999", "Manhattan"],
                                    ["F5D5A0", "Maize"],
                                    ["F5DEB3", "Wheat"],
                                    ["F5E7A2", "Sandwisp"],
                                    ["F5E7E2", "Pot Pourri"],
                                    ["F5E9D3", "Albescent White"],
                                    ["F5EDEF", "Soft Peach"],
                                    ["F5F3E5", "Ecru White"],
                                    ["F5F5DC", "Beige"],
                                    ["F5FB3D", "Golden Fizz"],
                                    ["F5FFBE", "Australian Mint"],
                                    ["F64A8A", "French Rose"],
                                    ["F653A6", "Brilliant Rose"],
                                    ["F6A4C9", "Illusion"],
                                    ["F6F0E6", "Merino"],
                                    ["F6F7F7", "Black Haze"],
                                    ["F6FFDC", "Spring Sun"],
                                    ["F7468A", "Violet Red"],
                                    ["F77703", "Chilean Fire"],
                                    ["F77FBE", "Persian Pink"],
                                    ["F7B668", "Rajah"],
                                    ["F7C8DA", "Azalea"],
                                    ["F7DBE6", "We Peep"],
                                    ["F7F2E1", "Quarter Spanish White"],
                                    ["F7F5FA", "Whisper"],
                                    ["F7FAF7", "Snow Drift"],
                                    ["F8B853", "Casablanca"],
                                    ["F8C3DF", "Chantilly"],
                                    ["F8D9E9", "Cherub"],
                                    ["F8DB9D", "Marzipan"],
                                    ["F8DD5C", "Energy Yellow"],
                                    ["F8E4BF", "Givry"],
                                    ["F8F0E8", "White Linen"],
                                    ["F8F4FF", "Magnolia"],
                                    ["F8F6F1", "Spring Wood"],
                                    ["F8F7DC", "Coconut Cream"],
                                    ["F8F7FC", "White Lilac"],
                                    ["F8F8F7", "Desert Storm"],
                                    ["F8F99C", "Texas"],
                                    ["F8FACD", "Corn Field"],
                                    ["F8FDD3", "Mimosa"],
                                    ["F95A61", "Carnation"],
                                    ["F9BF58", "Saffron Mango"],
                                    ["F9E0ED", "Carousel Pink"],
                                    ["F9E4BC", "Dairy Cream"],
                                    ["F9E663", "Portica"],
                                    ["F9EAF3", "Amour"],
                                    ["F9F8E4", "Rum Swizzle"],
                                    ["F9FF8B", "Dolly"],
                                    ["F9FFF6", "Sugar Cane"],
                                    ["FA7814", "Ecstasy"],
                                    ["FA9D5A", "Tan Hide"],
                                    ["FAD3A2", "Corvette"],
                                    ["FADFAD", "Peach Yellow"],
                                    ["FAE600", "Turbo"],
                                    ["FAEAB9", "Astra"],
                                    ["FAECCC", "Champagne"],
                                    ["FAF0E6", "Linen"],
                                    ["FAF3F0", "Fantasy"],
                                    ["FAF7D6", "Citrine White"],
                                    ["FAFAFA", "Alabaster"],
                                    ["FAFDE4", "Hint of Yellow"],
                                    ["FAFFA4", "Milan"],
                                    ["FB607F", "Brink Pink"],
                                    ["FB8989", "Geraldine"],
                                    ["FBA0E3", "Lavender Rose"],
                                    ["FBA129", "Sea Buckthorn"],
                                    ["FBAC13", "Sun"],
                                    ["FBAED2", "Lavender Pink"],
                                    ["FBB2A3", "Rose Bud"],
                                    ["FBBEDA", "Cupid"],
                                    ["FBCCE7", "Classic Rose"],
                                    ["FBCEB1", "Apricot Peach"],
                                    ["FBE7B2", "Banana Mania"],
                                    ["FBE870", "Marigold Yellow"],
                                    ["FBE96C", "Festival"],
                                    ["FBEA8C", "Sweet Corn"],
                                    ["FBEC5D", "Candy Corn"],
                                    ["FBF9F9", "Hint of Red"],
                                    ["FBFFBA", "Shalimar"],
                                    ["FC0FC0", "Shocking Pink"],
                                    ["FC80A5", "Tickle Me Pink"],
                                    ["FC9C1D", "Tree Poppy"],
                                    ["FCC01E", "Lightning Yellow"],
                                    ["FCD667", "Goldenrod"],
                                    ["FCD917", "Candlelight"],
                                    ["FCDA98", "Cherokee"],
                                    ["FCF4D0", "Double Pearl Lusta"],
                                    ["FCF4DC", "Pearl Lusta"],
                                    ["FCF8F7", "Vista White"],
                                    ["FCFBF3", "Bianca"],
                                    ["FCFEDA", "Moon Glow"],
                                    ["FCFFE7", "China Ivory"],
                                    ["FCFFF9", "Ceramic"],
                                    ["FD0E35", "Torch Red"],
                                    ["FD5B78", "Wild Watermelon"],
                                    ["FD7B33", "Crusta"],
                                    ["FD7C07", "Sorbus"],
                                    ["FD9FA2", "Sweet Pink"],
                                    ["FDD5B1", "Light Apricot"],
                                    ["FDD7E4", "Pig Pink"],
                                    ["FDE1DC", "Cinderella"],
                                    ["FDE295", "Golden Glow"],
                                    ["FDE910", "Lemon"],
                                    ["FDF5E6", "Old Lace"],
                                    ["FDF6D3", "Half Colonial White"],
                                    ["FDF7AD", "Drover"],
                                    ["FDFEB8", "Pale Prim"],
                                    ["FDFFD5", "Cumulus"],
                                    ["FE28A2", "Persian Rose"],
                                    ["FE4C40", "Sunset Orange"],
                                    ["FE6F5E", "Bittersweet"],
                                    ["FE9D04", "California"],
                                    ["FEA904", "Yellow Sea"],
                                    ["FEBAAD", "Melon"],
                                    ["FED33C", "Bright Sun"],
                                    ["FED85D", "Dandelion"],
                                    ["FEDB8D", "Salomie"],
                                    ["FEE5AC", "Cape Honey"],
                                    ["FEEBF3", "Remy"],
                                    ["FEEFCE", "Oasis"],
                                    ["FEF0EC", "Bridesmaid"],
                                    ["FEF2C7", "Beeswax"],
                                    ["FEF3D8", "Bleach White"],
                                    ["FEF4CC", "Pipi"],
                                    ["FEF4DB", "Half Spanish White"],
                                    ["FEF4F8", "Wisp Pink"],
                                    ["FEF5F1", "Provincial Pink"],
                                    ["FEF7DE", "Half Dutch White"],
                                    ["FEF8E2", "Solitaire"],
                                    ["FEF8FF", "White Pointer"],
                                    ["FEF9E3", "Off Yellow"],
                                    ["FEFCED", "Orange White"],
                                    ["FF0000", "Red"],
                                    ["FF007F", "Rose"],
                                    ["FF00CC", "Purple Pizzazz"],
                                    ["FF00FF", "Magenta / Fuchsia"],
                                    ["FF2400", "Scarlet"],
                                    ["FF3399", "Wild Strawberry"],
                                    ["FF33CC", "Razzle Dazzle Rose"],
                                    ["FF355E", "Radical Red"],
                                    ["FF3F34", "Red Orange"],
                                    ["FF4040", "Coral Red"],
                                    ["FF4D00", "Vermilion"],
                                    ["FF4F00", "International Orange"],
                                    ["FF6037", "Outrageous Orange"],
                                    ["FF6600", "Blaze Orange"],
                                    ["FF66FF", "Pink Flamingo"],
                                    ["FF681F", "Orange"],
                                    ["FF69B4", "Hot Pink"],
                                    ["FF6B53", "Persimmon"],
                                    ["FF6FFF", "Blush Pink"],
                                    ["FF7034", "Burning Orange"],
                                    ["FF7518", "Pumpkin"],
                                    ["FF7D07", "Flamenco"],
                                    ["FF7F00", "Flush Orange"],
                                    ["FF7F50", "Coral"],
                                    ["FF8C69", "Salmon"],
                                    ["FF9000", "Pizazz"],
                                    ["FF910F", "West Side"],
                                    ["FF91A4", "Pink Salmon"],
                                    ["FF9933", "Neon Carrot"],
                                    ["FF9966", "Atomic Tangerine"],
                                    ["FF9980", "Vivid Tangerine"],
                                    ["FF9E2C", "Sunshade"],
                                    ["FFA000", "Orange Peel"],
                                    ["FFA194", "Mona Lisa"],
                                    ["FFA500", "Web Orange"],
                                    ["FFA6C9", "Carnation Pink"],
                                    ["FFAB81", "Hit Pink"],
                                    ["FFAE42", "Yellow Orange"],
                                    ["FFB0AC", "Cornflower Lilac"],
                                    ["FFB1B3", "Sundown"],
                                    ["FFB31F", "My Sin"],
                                    ["FFB555", "Texas Rose"],
                                    ["FFB7D5", "Cotton Candy"],
                                    ["FFB97B", "Macaroni and Cheese"],
                                    ["FFBA00", "Selective Yellow"],
                                    ["FFBD5F", "Koromiko"],
                                    ["FFBF00", "Amber"],
                                    ["FFC0A8", "Wax Flower"],
                                    ["FFC0CB", "Pink"],
                                    ["FFC3C0", "Your Pink"],
                                    ["FFC901", "Supernova"],
                                    ["FFCBA4", "Flesh"],
                                    ["FFCC33", "Sunglow"],
                                    ["FFCC5C", "Golden Tainoi"],
                                    ["FFCC99", "Peach Orange"],
                                    ["FFCD8C", "Chardonnay"],
                                    ["FFD1DC", "Pastel Pink"],
                                    ["FFD2B7", "Romantic"],
                                    ["FFD38C", "Grandis"],
                                    ["FFD700", "Gold"],
                                    ["FFD800", "School bus Yellow"],
                                    ["FFD8D9", "Cosmos"],
                                    ["FFDB58", "Mustard"],
                                    ["FFDCD6", "Peach Schnapps"],
                                    ["FFDDAF", "Caramel"],
                                    ["FFDDCD", "Tuft Bush"],
                                    ["FFDDCF", "Watusi"],
                                    ["FFDDF4", "Pink Lace"],
                                    ["FFDEAD", "Navajo White"],
                                    ["FFDEB3", "Frangipani"],
                                    ["FFE1DF", "Pippin"],
                                    ["FFE1F2", "Pale Rose"],
                                    ["FFE2C5", "Negroni"],
                                    ["FFE5A0", "Cream Brulee"],
                                    ["FFE5B4", "Peach"],
                                    ["FFE6C7", "Tequila"],
                                    ["FFE772", "Kournikova"],
                                    ["FFEAC8", "Sandy Beach"],
                                    ["FFEAD4", "Karry"],
                                    ["FFEC13", "Broom"],
                                    ["FFEDBC", "Colonial White"],
                                    ["FFEED8", "Derby"],
                                    ["FFEFA1", "Vis Vis"],
                                    ["FFEFC1", "Egg White"],
                                    ["FFEFD5", "Papaya Whip"],
                                    ["FFEFEC", "Fair Pink"],
                                    ["FFF0DB", "Peach Cream"],
                                    ["FFF0F5", "Lavender blush"],
                                    ["FFF14F", "Gorse"],
                                    ["FFF1B5", "Buttermilk"],
                                    ["FFF1D8", "Pink Lady"],
                                    ["FFF1EE", "Forget Me Not"],
                                    ["FFF1F9", "Tutu"],
                                    ["FFF39D", "Picasso"],
                                    ["FFF3F1", "Chardon"],
                                    ["FFF46E", "Paris Daisy"],
                                    ["FFF4CE", "Barley White"],
                                    ["FFF4DD", "Egg Sour"],
                                    ["FFF4E0", "Sazerac"],
                                    ["FFF4E8", "Serenade"],
                                    ["FFF4F3", "Chablis"],
                                    ["FFF5EE", "Seashell Peach"],
                                    ["FFF5F3", "Sauvignon"],
                                    ["FFF6D4", "Milk Punch"],
                                    ["FFF6DF", "letden"],
                                    ["FFF6F5", "Rose White"],
                                    ["FFF8D1", "Baja White"],
                                    ["FFF9E2", "Gin Fizz"],
                                    ["FFF9E6", "Early Dawn"],
                                    ["FFFACD", "Lemon Chiffon"],
                                    ["FFFAF4", "Bridal Heath"],
                                    ["FFFBDC", "Scotch Mist"],
                                    ["FFFBF9", "Soapstone"],
                                    ["FFFC99", "Witch Haze"],
                                    ["FFFCEA", "Buttery White"],
                                    ["FFFCEE", "Island Spice"],
                                    ["FFFDD0", "Cream"],
                                    ["FFFDE6", "Chilean Heath"],
                                    ["FFFDE8", "Travertine"],
                                    ["FFFDF3", "Orchid White"],
                                    ["FFFDF4", "Quarter Pearl Lusta"],
                                    ["FFFEE1", "Half and Half"],
                                    ["FFFEEC", "Apricot White"],
                                    ["FFFEF0", "Rice Cake"],
                                    ["FFFEF6", "Black White"],
                                    ["FFFEFD", "Romance"],
                                    ["FFFF00", "Yellow"],
                                    ["FFFF66", "Laser Lemon"],
                                    ["FFFF99", "Pale Canary"],
                                    ["FFFFB4", "Portafino"],
                                    ["FFFFF0", "Ivory"],
                                    ["FFFFFF", "White"]
                                ]
                            }, window.acsbNtc.init()), window.acsbNtc.name("#" + ((1 << 24) + (e << 16) + (t << 8) + i).toString(16).slice(1))[1]),
                            _getClickableText(e) {
                                let t = e.closest('[data-acsb-hidden="true"]') ? c.A.elements.text(e, !0, ["svg"]) : o.A.getDiscernibleText(e, ["svg"]);
                                if ("IMG" === e.tagName && e.alt && (t += ` ${e.alt}`), !t) {
                                    e.ariaLabel && (t = e.ariaLabel, e.removeAttribute("aria-label"));
                                    for (let i of c.A.picks('[aria-label]:not([data-acsb-hidden="true"])', e)) i.ariaLabel && (t = t ? `${t} ${i.ariaLabel}` : i.ariaLabel, i.removeAttribute("aria-label"));
                                    if (t || ("INPUT" === e.tagName ? (t = e.value, e.setAttribute("aria-label", t)) : e.title && (t = e.title, e.removeAttribute("title"))), t)
                                        if ("INPUT" === e.tagName) e.setAttribute("aria-label", t);
                                        else if ("IMG" === e.tagName) {
                                        const i = e.getAttribute("alt");
                                        i && c.A.strings.inString(t, i) || e.setAttribute("alt", t)
                                    } else u.srOnly.append(e, u.srOnly.create(t), !0)
                                }
                                if (!t)
                                    for (let i of c.A.picks("img[alt]", e))
                                        if (i.alt && !u.alts._isOverrideableAlt(i)) {
                                            t = i.alt;
                                            break
                                        }
                                return t
                            },
                            _setTextualOpsTags(e) {
                                if ("true" === e.getAttribute("data-acsb-clickable")) {
                                    const t = u.clickables._getTextualOpsObject(e);
                                    t.method && e.setAttribute("data-acsb-textual-ops", t.method)
                                } else
                                    for (let t of c.A.picks('[data-acsb-clickable="true"]', e)) {
                                        const e = u.clickables._getTextualOpsObject(t);
                                        e && t.setAttribute("data-acsb-textual-ops", e.method)
                                    }
                            },
                            _processClickables(e) {
                                (!e || e.length < 1) && (e = c.A.picks('[data-acsb-clickable="true"]'));
                                for (let t of e) t.acsbClickableBound || t.closest('[data-acsb-hidden="true"]') || (t.acsbClickableBound = !0, t.matches('[data-acsb-clickable="true"]') && !t.matches('[data-acsb-iframe-explainer="true"]') && (u.clickables._isButton(t) ? this._processButton(t) : "A" === t.tagName && (t.href.includes("#") && t.closest('[data-acsb-carousel="true"]') && (this._isCarouselNextButton(t) || this._isCarouselPrevButton(t) || this._isCarouselPagination(t)) ? this._processButton(t) : this._processLink(t))));
                                if (s.A.isMobile && !this.acsbSearchedMobileMenu && !c.A.pick('[data-acsb-textual-ops="menu"]') && c.A.pick('[role="navigation"]')) {
                                    const e = [];
                                    this.acsbSearchedMobileMenu = !0;
                                    for (let t of document.querySelectorAll("nav, header")) {
                                        if (t.offsetTop >= 200 || !o.A.isVisible(t)) continue;
                                        let i = !1;
                                        for (let n of e)
                                            if (n.contains(t) || t.contains(n)) {
                                                i = !0;
                                                break
                                            }
                                        i || e.push(t)
                                    }
                                    for (let t of e)
                                        for (let e of c.A.picks("div, span, i", t)) e.closest('[data-acsb-hidden="true"], [data-acsb-clickable]') || c.A.pick("[data-acsb-clickable]", e) || c.A.elements.text(e).split(" ").length > 2 || !c.A.strings.inString(e.outerHTML, "menu") && !c.A.strings.inString(e.outerHTML, "header") || (c.A.elements.css(e, {
                                            cursor: "pointer"
                                        }), e.classList.add("acsb-identified-mobile-menu"), c.A.elements.text(e) || e.getAttribute("aria-label") || u.srOnly.append(e, u.srOnly.create("Menu")))
                                }
                                this._handleCarouselsPagination()
                            },
                            _processLink(e) {
                                const t = e.getAttribute("href");
                                if (!t) return;
                                if (t.length < 1 && e.setAttribute("href", e.href), c.A.elements.attrs(c.A.picks('button, [role="button"]', e), {
                                        role: "presentation"
                                    }), window.location.href.trim().toLowerCase() === t.trim().toLowerCase() && e.setAttribute("aria-current", "page"), c.A.strings.inString(t, ".pdf")) return u.srOnly.append(e, u.srOnly.create(r.A.get("FRONT_PDF_LINK")), !1);
                                if (c.A.strings.inString(t, "tel:")) return u.srOnly.append(e, u.srOnly.create(r.A.get("FRONT_TELEPHONE_LINK")), !1);
                                if (c.A.strings.inString(t, "mailto:")) return u.srOnly.append(e, u.srOnly.create(r.A.get("FRONT_EMAIL_LINK")), !1);
                                let i = !1,
                                    n = !1,
                                    s = this._getClickableText(e).toLowerCase();
                                if (e.href === document.location.origin || e.href.substring(0, e.href.length - 1) === document.location.origin) {
                                    const t = r.A.get("HOMEPAGE");
                                    return void(c.A.strings.inString(s, t) || u.srOnly.append(e, u.srOnly.create(t), !1))
                                }(c.A.strings.isNumber(s) || s && !s.match(/[a-zA-Z]/) && s.match(/[0-9]/) && c.A.strings.isNumber(s.replace(/[\$% \[\]\(\)\.₪€]/g, ""))) && (s = "");
                                for (let n of ["png", "jpg", "jpeg", "webp", "gif", "svg"])
                                    if (t.match(new RegExp(`\\.${n}(\\?|#|$)`, "i"))) {
                                        i = !0, u.srOnly.append(e, u.srOnly.create(r.A.get("FRONT_IMAGE_LINK")), !1);
                                        break
                                    }
                                const a = t.replace(window.location.hostname.replace("www", ""), "").toLowerCase();
                                for (let t in this.presetLinks.social)
                                    if (c.A.strings.inString(a, t)) {
                                        c.A.strings.inString(s, this.presetLinks.social[t]) || u.srOnly.append(e, u.srOnly.create(this.presetLinks.social[t]), !1, !0);
                                        for (let t of c.A.picks("img", e)) t.offsetWidth < 70 && t.offsetHeight < 70 && t.setAttribute("aria-hidden", "true");
                                        n = !0;
                                        break
                                    }
                                if (!n)
                                    for (let t in this.presetLinks.pages) {
                                        let i = !1,
                                            r = !1;
                                        for (let e of [t, ...this.presetLinks.pages[t]]) !i && a.includes(e) && (i = !0), !r && s.includes(e) && (r = !0);
                                        if (i && !r) {
                                            u.srOnly.append(e, u.srOnly.create(t), !0, !0), n = !0;
                                            break
                                        }
                                    }
                                if (e.getAttribute("target") ? .toLowerCase().includes("_blank") && u.srOnly.append(e, u.srOnly.create(r.A.get("NEW_WINDOW")), !1), !n && !i)
                                    if ("#" === t.substring(0, 1) && t.length >= 2 && s.length < 1) {
                                        const i = c.A.pick(t),
                                            n = t.replace("#", "").replace("-", " ").replace("_", " ");
                                        if (i) {
                                            const t = "h1, h2, h3, h4, h5, h6, .title",
                                                n = c.A.picks(t, i),
                                                s = c.A.elements.next(i, t),
                                                a = c.A.elements.previous(i, t);
                                            if (n.length > 0) return u.srOnly.append(e, u.srOnly.create(c.A.elements.text(n[0])));
                                            if (s.length > 0) return u.srOnly.append(e, u.srOnly.create(c.A.elements.text(s[0])));
                                            if (a.length > 0) return u.srOnly.append(e, u.srOnly.create(c.A.elements.text(a[0])))
                                        }
                                        if (n >= 3) u.srOnly.append(e, u.srOnly.create(n), !0, !0);
                                        else {
                                            const t = this._getTextualOpsObject(e);
                                            t.method && t.text.length > 0 && u.srOnly.append(e, u.srOnly.create(t.text), !0, !0)
                                        }
                                    } else !e.closest('[role="navigation"]') && this._isAmbiguousLinkText(s) && o.A.isVisible(e) && u.scrapper.setScrapeUrl(e, t)
                            },
                            _processButton(e) {
                                ["tab", "radio", "checkbox"].includes(e.getAttribute("role")) || e.setAttribute("role", "button");
                                let t = !1,
                                    i = !1,
                                    n = this._getClickableText(e),
                                    s = c.A.picks("a[href]", e);
                                if (s.length > 0 && (e.setAttribute("role", "link"), c.A.elements.attrs(s, {
                                        role: "presentation"
                                    })), n.length > 0)
                                    for (let t of c.A.picks("svg", e)) a.A.navigation.setHidden(t, !0);
                                if ((c.A.strings.isNumber(n) || n && !n.match(/[a-zA-Z]/) && n.match(/[0-9]/) && c.A.strings.isNumber(n.replace(/[\$% \[\]\(\)\.₪€]/g, ""))) && (i = !0, n = ""), 1 === n.length) {
                                    let t = !1;
                                    switch (n.toLowerCase()) {
                                        case "x":
                                        case "×":
                                        case "⊗":
                                            t = !0, u.srOnly.append(e, u.srOnly.create(r.A.get("REMOVE")));
                                            break;
                                        case "-":
                                            t = !0, u.srOnly.append(e, u.srOnly.create(r.A.get("MINUS")))
                                    }
                                    if (t) return
                                }
                                if ((() => {
                                        let i;
                                        this._isCarouselPagination(e) ? (t = !0, e.setAttribute("data-acsb-carousel-paging", "true")) : (this._isCarouselNextButton(e) && (t = !0, i = r.A.get("NEXT")), this._isCarouselPrevButton(e) && (t = !0, i = r.A.get("PREVIOUS"))), t && (c.A.strings.isNumber(n) ? (e.textContent = "", u.srOnly.append(e, u.srOnly.create(`${i} ${n}`.trim()))) : n.length < 1 && u.srOnly.append(e, u.srOnly.create(i)), c.A.events.on(e, "acsbHit", (() => {
                                            const t = e.closest('[data-acsb-carousel="true"]');
                                            t && (t.setAttribute("aria-live", "polite"), setTimeout((() => t.removeAttribute("aria-live")), 3e3))
                                        })))
                                    })(), t || n.length > 0) return;
                                const l = this._getTextualOpsObject(e);
                                !l.method || l.text.length < 1 ? c.A.pick("img[alt]", e) || i || !o.A.isVisible(e) || e.matches("[data-acsb-overlay]") || (e.setAttribute("data-acsb-force-unnavigable", "true"), a.A.navigation.setUnnavigable(e), a.A.navigation.setHidden(e, !0)) : l.method && (e.setAttribute("data-acsb-textual-ops", l.method), "INPUT" === e.tagName ? e.setAttribute("aria-label", l.text) : "IMG" === e.tagName ? e.setAttribute("alt", l.text) : u.srOnly.append(e, u.srOnly.create(l.text)))
                            },
                            _isAmbiguousLinkText(e) {
                                let t = e.split(" ");
                                if (3 === t.length && (t = c.A.arrays.filterBlanks(t.map((e => e.length <= 1 ? "" : e)))), t.length > 2) return !1;
                                if (!e) return !0;
                                const i = {
                                    en: ["more", "here", "see", "show", "learn", "read", "view", "now"],
                                    he: ["קראו", "קרא", "צפה", "כאן", "לקריאה", "עכשיו"],
                                    es: ["más", "here", "aquí", "show", "aprender", "leer", "ahora"],
                                    it: ["di più", "qui", "vedere", "spettacolo", "imparare", "leggere", "adesso"],
                                    de: ["mehr", "hier", "sehen", "show", "lernen", "lesen", "jetzt"],
                                    nl: ["meer", "hier", "zien", "tonen", "leren", "lezen", "nu"],
                                    ru: ["более", "здесь", "видеть", "шоу", "учиться", "читать", "сейчас"],
                                    pt: ["mais", "aqui", "vejo", "mostrar", "aprender", "leitura", "agora"],
                                    ja: ["もっと", "ここに", "見る", "公演", "学ぶ", "読んだ", "今"],
                                    tw: ["更多的", "這裡", "看", "展示", "學", "讀", "現在"],
                                    za: ["更多的", "這裡", "看", "展示", "學", "讀", "現在"],
                                    ua: ["أكثر", "هنا", "نرى", "تبين", "يتعلم", "اقرأ", "الآن"],
                                    ar: ["أكثر", "هنا", "نرى", "تبين", "يتعلم", "اقرأ", "الآن"]
                                };
                                e = e.toLowerCase();
                                for (let t of i[s.A.lang] ? i[s.A.lang] : i.en)
                                    if (e.includes(t)) return !0;
                                return !1
                            },
                            _handleCarouselsPagination() {
                                for (let e of c.A.picks('[data-acsb-carousel="true"]')) {
                                    if (e.acsbCarouselPagingBound) continue;
                                    e.acsbCarouselPagingBound = !0;
                                    let t = 0;
                                    for (let i of c.A.picks('[data-acsb-carousel-paging="true"]', e)) {
                                        t++;
                                        const n = String(t),
                                            s = u.srOnly.create(r.A.get("CAROUSEL_NAVIGATION"));
                                        i.textContent = "", i.removeAttribute("aria-label"), s.textContent = s.textContent + n, u.srOnly.append(i, s), c.A.events.on(e, "acsbHit", (() => {
                                            const t = e.closest('[data-acsb-carousel="true"]');
                                            t && c.A.elements.attrs(c.A.picks('[data-acsb-carousel-paging="true"][aria-selected="true"]', t), {
                                                "aria-selected": "false"
                                            }), i.setAttribute("aria-selected", "true")
                                        }))
                                    }
                                }
                            },
                            _handleTabs() {}
                        },
                        landmarks: {
                            processedTimes: 0,
                            process() {
                                u.rebinds > 0 && this.processedTimes > 0 || (this._handleFooter(), this._handleMain(), this._handleMenus(), this._handleArticles(), this.processedTimes++)
                            },
                            getMain() {
                                let e, t, i = c.A.pick('[role="main"]');
                                if (i && o.A.isVisible(i)) return i;
                                for (let t of c.A.picks('h1, h2, [role="heading"][aria-level="2"], h3, [role="heading"][aria-level="3"], h4, [role="heading"][aria-level="4"]', document, !1))
                                    if (o.A.isVisible(t) && o.A.getShownText(t) && !t.closest('[data-acsb], [data-acsb-sr-only="true"], [role="navigation"], [data-acsb-page-footer="true"]')) {
                                        e = t;
                                        break
                                    }
                                if (e) {
                                    let i = e.parentElement;
                                    const n = c.A.elements.text(e);
                                    for (; i && "BODY" !== i.tagName;) {
                                        if (n !== c.A.elements.text(i) && i.outerHTML.trim().length > 100) {
                                            t = i;
                                            break
                                        }
                                        i = i.parentElement
                                    }
                                }
                                if (!t)
                                    for (let e of c.A.picks("p"))
                                        if (!e.closest('[data-acsb], [data-acsb-page-footer="true"], [role="navigation"]') && o.A.isVisible(e)) {
                                            t = e;
                                            break
                                        }
                                if (!t)
                                    for (let e of c.A.picks("a"))
                                        if (!e.closest('[data-acsb], [data-acsb-page-footer="true"], [role="navigation"]') && o.A.isVisible(e)) {
                                            t = e;
                                            break
                                        }
                                if (t)
                                    for (let e of c.A.picks("main")) t !== i && e.setAttribute("role", "presentation");
                                return t
                            },
                            getFooter() {
                                let e;
                                for (let t of c.A.picks("footer")) t.outerHTML.trim().length > 100 && o.A.isVisible(t) && (e = t);
                                if (!e) {
                                    const t = [],
                                        i = c.A.utilities.getWinSize().height,
                                        n = c.A.pick('[role="navigation"]'),
                                        s = ['div[class*="footer" i]', 'div[class*="footer" i]', 'div[id*="footer" i]', 'div[id*="footer" i]', 'section[class*="footer" i]', 'section[class*="footer" i]', 'section[id*="footer" i]', 'section[id*="footer" i]'];
                                    for (let e of c.A.picks(s.join(","))) {
                                        if (e.closest("[data-acsb]") || e.contains(n) || c.A.pick('[role="main"]', e) || c.A.picks("a, p, ul", e).length < 5 || c.A.elements.offsets(e).top <= i) continue;
                                        let s = !0;
                                        for (let i of t)
                                            if (i.contains(e)) {
                                                s = !1;
                                                break
                                            }
                                        s && t.push(e)
                                    }
                                    e = t.pop()
                                }
                                return e
                            },
                            getMenu() {
                                const e = c.A.pick('[data-acsb-main-menu="true"]');
                                if (e) return e;
                                const t = {
                                    $el: void 0,
                                    itemCount: 0
                                };
                                for (let e of c.A.picks('[role="navigation"]')) {
                                    const i = c.A.picks('[data-acsb-clickable="true"][data-acsb-now-navigable="true"], [data-acsb-dropdown] [data-acsb-clickable="true"]', e);
                                    if (e.closest("[data-acsb]") || i.length < 1 || !o.A.isVisible(e) || c.A.elements.offsets(e).top > 350) continue;
                                    const n = i.length;
                                    n <= t.itemCount || (t.$el = e, t.itemCount = n)
                                }
                                return Math.random(), t.$el
                            },
                            _isHomepage() {
                                if (window.location.href.toLowerCase() === window.location.protocol + "//" + window.location.host) return !0;
                                const e = window.location.pathname.toLowerCase();
                                return "/" === e || "/index.html" === e || "/default.aspx" === e || !!(e.includes("home") || e.includes("main") || e.includes("index"))
                            },
                            _handleMain() {
                                const e = this.getMain();
                                e && c.A.elements.attrs(e, {
                                    "data-acsb-main": "true",
                                    role: "main"
                                })
                            },
                            _handleFooter() {
                                const e = this.getFooter();
                                e && c.A.elements.attrs(e, {
                                    "data-acsb-page-footer": "true",
                                    role: "contentinfo",
                                    "aria-label": r.A.get("FOOTER")
                                })
                            },
                            _handleMenus() {
                                const e = this.getMenu(),
                                    t = c.A.pick("header"),
                                    i = c.A.pick('[data-acsb-page-footer="true"]');
                                if (i) {
                                    let e = 0,
                                        t = 'h2, h3, h4, h5, h6, [role="heading"]';
                                    for (let n of c.A.picks('[role="navigation"]', i)) {
                                        if (n.getAttribute("aria-label")) continue;
                                        let i = null;
                                        const s = c.A.pick("li", n);
                                        if (c.A.pick('[data-acsb-menu="ul"]', n) && !n.matches('[data-acsb-menu="ul"]') && (i = o.A.getShownText(n, ['[data-acsb-menu="ul"]'])), !i && n.previousElementSibling && n.previousElementSibling.matches(`${t},b,strong,p,span`)) {
                                            const e = o.A.getShownText(n.previousElementSibling),
                                                t = e.split(" ");
                                            e.length > 1 && t.length > 0 && t.length <= 3 && (i = e)
                                        }
                                        if (!i && s && !c.A.pick('[data-acsb-clickable="true"]', s)) {
                                            const e = o.A.getShownText(s);
                                            e.length > 0 && (i = e)
                                        }
                                        if (!i) {
                                            const e = [];
                                            for (let s of c.A.picks(t, n)) {
                                                if (e.length > 0) {
                                                    i = null;
                                                    break
                                                }
                                                o.A.isVisible(s) && (i = c.A.elements.text(s), e.push(s))
                                            }
                                        }
                                        if (i || (i = c.A.elements.nodesText(n)), i || (i = 0 === e ? r.A.get("FOOTER_MENU") : `${r.A.get("FOOTER_MENU")} (${e+1})`, e++), n.setAttribute("aria-label", i), n.matches("ul, ol") && c.A.pick("ul, ol", n) || c.A.pick("ul ul, ol ol", n))
                                            for (let e of c.A.picks('[data-acsb-menu-root="true"]', n)) {
                                                const t = c.A.pick("ul, ol", e),
                                                    i = c.A.pick('[data-acsb-menu="a"]', e);
                                                !["BUTTON", "A"].includes(i.tagName) && o.A.isVisible(t) && c.A.pick("li", t) && i.removeAttribute("role")
                                            }
                                    }
                                }
                                if (e && (e.setAttribute("data-acsb-main-menu", "true"), e.getAttribute("aria-label") || e.setAttribute("aria-label", r.A.get("MAIN_MENU"))), t) {
                                    let e = 0;
                                    for (let i of c.A.picks('[role="navigation"]:not([aria-label]', t)) i.setAttribute("aria-label", 0 === e ? r.A.get("HEADER_MENU") : `${r.A.get("HEADER_MENU")} (${e+1})`)
                                }
                                for (let e of c.A.picks('[role="navigation"]:not([aria-label])')) e.setAttribute("aria-label", r.A.get("GENERIC_MENU"))
                            },
                            _handleArticles() {
                                for (let e of c.A.picks("article")) c.A.elements.text(e).length >= 500 || e.getAttribute("role") || e.setAttribute("role", "presentation")
                            }
                        },
                        scrapper: {
                            inProcess: [],
                            retries: 0,
                            process() {
                                this._handleScrapedUrls()
                            },
                            setScrapeUrl(e, t) {
                                const i = o.A.getUrlAsAbsolute(t);
                                t && i && !(i.length < 5) && c.A.uris.isUrlValid(i) && "javascript" !== t.substr(0, 10).toLowerCase() && e.setAttribute("data-acsb-scrape-url", i.split("#")[0].split("?")[0])
                            },
                            metaJSONCache: void 0,
                            reportedMeta: [],
                            async _scrape(e) {
                                if (e.length < 1) return;
                                const t = this.metaJSONCache || await c.A.fetch(`${n.A.resources}${n.A.domain}/meta.json`, [], {
                                    headers: {
                                        "Content-Type": "text/plain"
                                    }
                                }, "GET");
                                this.metaJSONCache = t;
                                let i = t ? JSON.parse(t) : {};
                                if (!i) return;
                                const a = {},
                                    r = [],
                                    o = [];
                                for (let e in i) i[e] && i[e][s.A.lang] && !a[e] && (a[e] = {
                                    title: i[e][s.A.lang].title,
                                    description: i[e][s.A.lang].description
                                });
                                for (let t of e) t = c.A.uris.getFormatted(t, !1, !0), a[t] || this.inProcess.includes(t) || n.A.ace || n.A.wave || (r.push(t), this.inProcess.push(t)), a[t] && !this.reportedMeta.includes(t) && o.push(t);
                                Object.keys(a).length > 0 && this._deployResults(a), !o.length || s.A.siteCfg.blockMeta || n.A.ace || n.A.wave || !n.A.keepAliveReporter || (this.reportedMeta.push(o), (0, l.h)("meta", o)), r.length > 0 && !s.A.siteCfg.blockMeta && !n.A.ace && !n.A.wave && (fetch(`${n.A.processEndpoint}/api/public/domains/${n.A.domain}/meta/languages/${s.A.lang}`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        urls: r
                                    })
                                }), this.metaJSONCache = void 0), setTimeout((() => {
                                    if (this.inProcess.length < 1 || this.retries >= 360 || s.A.siteCfg.blockMeta) return;
                                    this.metaJSONCache = void 0;
                                    const t = [];
                                    for (let i of e) this.inProcess.includes(c.A.uris.getFormatted(i, !1, !0)) && t.push(i);
                                    t.length < 1 || (this.retries++, this._scrape(t))
                                }), 2500)
                            },
                            _deployResults(e) {
                                for (let t of c.A.picks("[data-acsb-scrape-url]")) {
                                    const i = c.A.uris.getFormatted(t.getAttribute("data-acsb-scrape-url"), !1, !0);
                                    let n = "",
                                        s = (() => {
                                            if (!i) return null;
                                            for (let t in e)
                                                if (t === i) return e[t]
                                        })();
                                    if (s) {
                                        if (this.inProcess.includes(i)) {
                                            let t = 0;
                                            for (let n of this.inProcess) {
                                                if (e[n] === i) {
                                                    delete this.inProcess[t];
                                                    break
                                                }
                                                t++
                                            }
                                        }
                                        if (s.title && s.title.length > 0 && (n = c.A.strings.htmlDecode(s.title)), "IFRAME" === t.tagName) {
                                            if (n && n.length > 0) {
                                                const e = c.A.elements.previous(t, '[data-acsb-iframe-explainer="true"]')[0];
                                                if (e) {
                                                    const i = e.getAttribute("data-acsb-url-brand");
                                                    n = `${i} Iframe: ${n}`, t.setAttribute("aria-label", n), e.textContent = c.A.elements.text(e).replace(`${i} Iframe`, `${n}. `), e.setAttribute("data-acsb-tooltip", e.textContent)
                                                }
                                            }
                                        } else {
                                            let e = c.A.elements.text(t);
                                            for (let i of c.A.picks('[aria-label]:not([data-acsb-hidden="true"])', t)) i.ariaLabel && (e = e ? `${e} ${i.ariaLabel}` : i.ariaLabel);
                                            const s = c.A.picks('img[alt]:not([aria-hidden="true"])', t);
                                            if (n.length > 0) {
                                                n = this._formatTitle(n, i);
                                                const a = u.headings.getVisibleText(t).toLowerCase().trim();
                                                if (n = n.trim().replace(new RegExp("^" + a + "|" + a + "$", "gi"), "").trim(), n && !c.A.strings.inString(a, n) && !c.A.strings.inString(n, a)) {
                                                    let i = !1;
                                                    if (e.length < 1 && s.length > 0)
                                                        for (let e of s)(c.A.strings.inString(e.alt, n) || c.A.strings.inString(n, e.alt)) && (i = !0);
                                                    i || u.srOnly.append(t, u.srOnly.create(n), e.length < 1, !0)
                                                }
                                            } else if (e.length < 1 && s.length < 1) {
                                                const e = "/" === i.substr(-1) ? i.slice(0, -1).split("/").pop() : i.split("/").pop();
                                                if (e) {
                                                    const i = c.A.strings.sentenceCase(c.A.strings.replace(e, "[_-]", " "));
                                                    u.srOnly.append(t, u.srOnly.create(i), !0, !0)
                                                }
                                            }
                                        }
                                        t.removeAttribute("data-acsb-scrape-url")
                                    }
                                }
                                this.inProcess.length > 0 && (this.inProcess = c.A.arrays.filterBlanks(this.inProcess))
                            },
                            _handleScrapedUrls() {
                                const e = [];
                                for (let t of c.A.picks("[data-acsb-scrape-url]")) {
                                    if (t.acsbScrapperProcessed) continue;
                                    t.acsbScrapperProcessed = !0;
                                    const i = t.getAttribute("data-acsb-scrape-url");
                                    !i || i.length < 5 || e.includes(i) || !c.A.uris.isUrlValid(i) || e.push(c.A.uris.getFormatted(i, !1, !0))
                                }
                                this._scrape(e)
                            },
                            _formatTitle(e, t) {
                                const i = document.title.toLowerCase();
                                if (e = e.toLowerCase(), !c.A.strings.inString(t, window.location.hostname) || i === e) return e;
                                let n;
                                for (let t of ["|", "-", "–", "//", "—"]) {
                                    const s = e.split(` ${t} `);
                                    if (2 === s.length) {
                                        if (c.A.strings.inString(i, s[0])) {
                                            n = s[1];
                                            break
                                        }
                                        if (c.A.strings.inString(i, s[1])) {
                                            n = s[0];
                                            break
                                        }
                                    }
                                }
                                return n || e
                            }
                        },
                        alts: {
                            retries: 0,
                            inProcess: [],
                            process() {
                                const e = this._getImagesForProcess(),
                                    t = this._getBgImagesForProcess(),
                                    i = this._getOtherImagesForProcess();
                                this._processImages(e.concat(t).concat(i))
                            },
                            imagesJSONCache: void 0,
                            reportedImages: [],
                            async _processImages(e) {
                                if (e.length < 1) return;
                                const t = [];
                                for (let i of e) {
                                    if (!i.$img || i.$img.acsbAltProcessed) continue;
                                    const e = i.$img.getAttribute("alt");
                                    if (!i.url || c.A.strings.inString(i.href, "blob:") || c.A.strings.inString(i.href, "googleapis") || c.A.strings.inString(i.href, "chrome-extension:")) continue;
                                    const n = c.A.uris.getFormatted(i.url, !1, !0);
                                    e || "IMG" !== i.$img.tagName || this.inProcess.includes(n) || (i.$img.setAttribute("alt", this._getFileAlt(i.$img, n)), i.$img.acsbAltProcessing = !0), t.includes(n) || t.push(n)
                                }
                                if (t.length < 1) return;
                                const i = this.imagesJSONCache || await c.A.fetch(`${n.A.resources}${n.A.domain}/images.json`, [], {
                                    headers: {
                                        "Content-Type": "text/plain"
                                    }
                                }, "GET");
                                this.imagesJSONCache = i;
                                const a = i ? JSON.parse(i) : {},
                                    r = {},
                                    o = [],
                                    d = [];
                                for (let e of t) {
                                    for (let t in a) e === t && "ocr" in a[t] && s.A.lang in a[t] && (r[e] = {
                                        url: e,
                                        ocr: a[t].ocr,
                                        imr: a[t][s.A.lang]
                                    });
                                    r[e] || this.inProcess.includes(e) || n.A.ace || n.A.wave || (this.inProcess.push(e), o.push(e)), r[e] && !this.reportedImages.includes(e) && d.push(e)
                                }
                                Object.keys(r).length > 0 && this._deployResults(e, r), !d.length || s.A.siteCfg.blockImages || n.A.ace || n.A.wave || !n.A.keepAliveReporter || (this.reportedImages.push(d), (0, l.h)("images", d)), o.length > 0 && !s.A.siteCfg.blockImages && !n.A.ace && !n.A.wave && (fetch(`${n.A.processEndpoint}/api/public/domains/${n.A.domain}/images/languages/${s.A.lang}`, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        urls: o
                                    })
                                }), this.imagesJSONCache = void 0), setTimeout((() => {
                                    if (this.inProcess.length < 1 || this.retries >= 360 || s.A.siteCfg.blockImages) return;
                                    this.imagesJSONCache = void 0;
                                    const t = [];
                                    for (let i in e) this.inProcess.includes(c.A.uris.getFormatted(e[i].url, !1, !0)) && t.push(e[i]);
                                    t.length < 1 || (this.retries++, this._processImages(t))
                                }), 2500)
                            },
                            _deployResults(e, t) {
                                for (let i of e)
                                    if (i.$img && !i.$img.acsbAltProcessed)
                                        for (let e in t) {
                                            const n = t[e];
                                            if (c.A.uris.getFormatted(i.url, !1, !0) !== n.url) continue;
                                            if (this.inProcess.includes(e)) {
                                                let t = 0;
                                                for (let i of this.inProcess) i !== e ? t++ : delete this.inProcess[t]
                                            }
                                            if (i.$img.acsbAltProcessed = !0, i.$img.acsbAltProcessing = !1, !n.ocr && !n.imr) continue;
                                            let s = "",
                                                a = "",
                                                o = "";
                                            if (n.imr) {
                                                const e = n.imr.toLowerCase().split(",");
                                                if (e.length >= 3) {
                                                    let t = 0;
                                                    for (let i of e) {
                                                        if (t > 1) {
                                                            a += `${r.A.get("AND").toLowerCase()} ${i}`;
                                                            break
                                                        }
                                                        a += `${i} `, t++
                                                    }
                                                } else a = n.imr;
                                                a = c.A.strings.sentenceCase(a.replace(/\s+/g, " "))
                                            }
                                            n.ocr && (o = n.ocr), i.$img.acsbImr = a, i.$img.acsbOcr = o, o.length > 100 && a.length > 0 ? s = `${a} | ${o}` : (s = o, a.length > 0 && (s = s.length > 0 ? `${s}. ${a}` : a)), i.$img.setAttribute("data-acsb-force-visible", "true"), setTimeout((() => i.$img.removeAttribute("data-acsb-force-visible")), 300), i.$img.src = "", i.$img.src = i.url, i.$img.acsbAltMethod = "AI", i.$img.setAttribute("data-acsb-alt-candidate", s)
                                        }
                                this._promoteAllAltCandidates(), this.inProcess.length > 0 && (this.inProcess = c.A.arrays.filterBlanks(this.inProcess))
                            },
                            _calculateSrc(e) {
                                if (e.currentSrc) {
                                    const t = e.currentSrc;
                                    return t !== e.src && (e.src = t), t
                                }
                                let t = e.getAttribute("src"),
                                    i = e.getAttribute("srcset"),
                                    n = e.getAttribute("data-srcset");
                                if (!i && n && (i = o.A.getUrlAsAbsolute(n)), (!t || t.length < 5) && i && i.length >= 5) {
                                    let n = i.split(","),
                                        s = n[Math.round(n.length / 2)];
                                    if (s && s.length >= 5) {
                                        const i = s.trim().split(" ");
                                        i[1] && c.A.strings.inString(i[1], "w") && (s = i[0].trim()), t = s, e.src = t, e.removeAttribute("srcset")
                                    }
                                }
                                return e.src
                            },
                            _buildAltCandidate(e) {
                                if (e.closest("[data-acsb]")) return;
                                let t = e.getAttribute("src");
                                const i = e.getAttribute("data-acsb-bg-image");
                                if (i && i.length > 4 && (t = e.getAttribute("data-acsb-bg-image")), !t || t.length < 5) return;
                                const n = e.getAttribute("alt"),
                                    s = e.getAttribute("title"),
                                    a = e.getAttribute("aria-label");
                                let r, o;
                                n && (r = s, o = "alt"), !r && a > 0 && (r = a, o = "ariaLabel"), !r && s && (r = s, o = "title"), r || (o = "file", r = this._getFileAlt(e, t)), e.acsbAltMethod = o, e.setAttribute("data-acsb-alt-candidate", r.substring(0, 100).replace(/"/g, "&quot;"))
                            },
                            _getFileAlt(e, t) {
                                let i = c.A.uris.getFileName(t || e.src, !0);
                                for (let e of i.split(" ")) i !== e && (e = e.toLowerCase(), (c.A.strings.isNumber(e.replace("px", "")) || c.A.strings.isNumber(e.replace("x", ""))) && (i = i.replace(` ${e}`, "")));
                                return i
                            },
                            _getImageElements: () => Array.from(c.A.picks("img")).filter((e => !e.closest('[data-acsb-hidden="true"]'))),
                            _getImagesForProcess() {
                                const e = [],
                                    t = this._getImageElements();
                                for (let i of t) {
                                    if (!i.acsbLoadProcessBound && !i.complete) {
                                        i.acsbLoadProcessBound = !0, c.A.events.on(i, "load", (() => this.process()));
                                        continue
                                    }
                                    if (i.acsbAltBound || i.acsbAltProcessed || this._isImageLoadingLazy(i)) continue;
                                    i.acsbAltBound = !0;
                                    let n = i.getAttribute("alt"),
                                        s = i.getAttribute("aria-label");
                                    if (s === n ? i.removeAttribute("aria-label") : s && s.trim().length > 0 && (n = !n || n.trim().length < 1 ? s : `${n} | ${s.trim()}`, i.setAttribute("alt", n), i.removeAttribute("aria-label")), i.complete && i.offsetWidth <= 16 && i.offsetWidth <= 16 && !i.getAttribute("role") && !i.closest('[data-acsb-hidden="true"]') && i.setAttribute("aria-hidden", "true"), n && !this._isOverrideableAlt(i, t)) {
                                        let e = i.parentElement,
                                            t = !1,
                                            s = 0;
                                        for (; e && s < 3 && !t;) {
                                            if (!e.parentElement || "BODY" === e.tagName || "BODY" === e.parentElement.tagName) {
                                                t = !1;
                                                break
                                            }(i.closest('[data-acsb-hidden="true"]') && c.A.strings.inString(c.A.elements.text(e), n) || c.A.strings.inString(c.A.elements.text(e), n)) && (t = !0), s += 1, e = e.parentElement
                                        }
                                        if (t) {
                                            const e = i.closest('[data-acsb-navigable="true"]');
                                            if (e && !c.A.elements.text(e) && !c.A.pick('[data-acsb-sr-only="true"]', e)) continue;
                                            i.setAttribute("aria-hidden", "true")
                                        }
                                        continue
                                    }
                                    const a = this._calculateSrc(i);
                                    !a || a.length < 5 || c.A.strings.inString(i.src, "data:image/") ? c.A.elements.attrs(i, {
                                        alt: "acsb Corrupt Image",
                                        "aria-hidden": "true"
                                    }) : (this._buildAltCandidate(i), "file" === i.acsbAltMethod && "true" !== i.getAttribute("aria-hidden") ? e.push({
                                        $img: i,
                                        url: a
                                    }) : this._promoteAltCandidate(i))
                                }
                                return e
                            },
                            _getBgImagesForProcess() {
                                const e = [];
                                for (let t of c.A.picks("div, li, a, section, span, figure, aside")) {
                                    if (t.acsbBgAltBound || t.acsbAltProcessed || t.closest('[data-acsb-hidden="true"]')) continue;
                                    const i = c.A.elements.style(t, "background-image");
                                    if (("none" === i || !i) && c.A.strings.inString(c.A.elements.html(t), "lazy")) continue;
                                    if (t.acsbBgAltBound = !0, !i || "none" === i || i.length < 5 || "IMG" === t.tagName || t.offsetHeight < 50 || t.offsetWidth < 50 || "button" === t.getAttribute("role") || t.getAttribute("data-acsb") || i.includes("-gradient") || o.A.getShownText(t).length > 0) continue;
                                    const n = o.A.getUrlAsAbsolute(i.replace("url(", "").replace(")", "").replace(/\"/gi, ""));
                                    t.setAttribute("data-acsb-bg-image", n), this._buildAltCandidate(t), "file" === t.acsbAltMethod && n && 1 !== t.offsetWidth && 1 !== t.offsetHeight && e.push({
                                        $img: t,
                                        url: n.split("#")[0]
                                    })
                                }
                                return e
                            },
                            _getOtherImagesForProcess() {
                                const e = [];
                                for (let t of c.A.picks('input[type="image"]')) {
                                    if (t.acsbOtherAltsBound || t.acsbAltProcessed || t.closest('[data-acsb-hidden="true"]')) continue;
                                    t.acsbOtherAltsBound = !0;
                                    const i = t.getAttribute("alt"),
                                        n = t.getAttribute("title"),
                                        s = t.getAttribute("aria-label"),
                                        a = t.getAttribute("src");
                                    !a || a.length < 5 ? c.A.elements.remove(t) : (t.removeAttribute("title"), i && i.length > 0 || (s ? t.setAttribute("alt", s) : n ? t.setAttribute("alt", n) : t.value.length > 0 ? t.setAttribute("alt", t.value) : e.push({
                                        img: t,
                                        url: o.A.getUrlAsAbsolute(a).split("#")[0]
                                    })))
                                }
                                return e
                            },
                            getClosestElementsWithText(e) {
                                function t(e, i) {
                                    const n = Array.from(i.children);
                                    if (u.headings.getVisibleText(i).trim().length > 0 && 0 === n.length && o.A.isVisible(i)) e.push(i);
                                    else
                                        for (let i of n) {
                                            if (e.length >= 2) break;
                                            t(e, i)
                                        }
                                }

                                function i(e, i) {
                                    const n = [];
                                    let s = e;
                                    for (; s && n.length < 2;) s = "previous" === i ? s.previousElementSibling : s.nextElementSibling, s && t(n, s), s || (s = e.parentElement, e = s);
                                    return n
                                }
                                const n = i(e, "previous"),
                                    s = i(e, "next");
                                return [...n.reverse(), ...s]
                            },
                            _isOverrideableAlt(e, t = this._getImageElements()) {
                                if (!e.alt || "true" === e.getAttribute("data-acsb-override")) return !0;
                                const i = e.alt.toLowerCase().trim();
                                if (!i) return !0;
                                const n = this.getClosestElementsWithText(e);
                                for (let e of n)
                                    if (c.A.strings.inString(c.A.elements.text(e), i)) return !0;
                                const s = i.split(" ");
                                let a = !1;
                                if (i.trim().replace(/\r?\n|\r/g, "").split(/(\s|-)+/).length <= 1) return !0;
                                if (1 === s.length && s[0].length > 20) return !0;
                                if (s.length <= 3)
                                    for (let e of s) {
                                        if (c.A.strings.isNumber(e)) continue;
                                        if (e.length > 20 || ["img", "image", "picture", "pic", "banner", "alt"].includes(e)) {
                                            a = !0;
                                            break
                                        }
                                        const t = e.replace(/[^0-9]/g, "");
                                        if (t.length > e.replace(t, "").length) {
                                            a = !0;
                                            break
                                        }
                                    }
                                if (a) return !0;
                                if (e.src.length >= 5 && c.A.strings.inString(i, `.${c.A.uris.getImageExt(e.src)}`, !1)) return !0;
                                for (let e of s) {
                                    const t = e.split("x");
                                    if (2 === t.length && c.A.strings.isNumber(t[0]) && c.A.strings.isNumber(t[1])) {
                                        a = !0;
                                        break
                                    }
                                }
                                return a = t.some((t => {
                                    if (t === e) return !1;
                                    if (t.alt.toLowerCase() !== i.toLowerCase()) return !1;
                                    const n = decodeURIComponent(t.src.toLowerCase()),
                                        s = decodeURIComponent(e.src.toLowerCase());
                                    return !(n === s || n.includes(s) || s.includes(n))
                                })), a
                            },
                            _isImageLoadingLazy(e) {
                                let t = e.getAttribute("src");
                                if (e.matches(".lazyload") && t !== e.getAttribute("data-src")) return !0;
                                if (!t && e.srcset && (t = e.srcset), !e.complete || !t && !e.srcset) {
                                    const i = c.A.elements.html(e).toLowerCase();
                                    if ((i.includes("lazy") || i.includes("lzy") || !t && i.includes("src") || !t && i.includes("url") || t && t.length >= 5 && !c.A.uris.isUrlValid(t)) && (0 === e.offsetWidth && 0 === e.offsetHeight || !t)) return !0
                                }
                                return !(!t || "data:" !== t.substring(0, 5))
                            },
                            _promoteAllAltCandidates() {
                                for (let e of c.A.picks("[data-acsb-alt-candidate]")) e.acsbAltProcessing || this._promoteAltCandidate(e)
                            },
                            _promoteAltCandidate(e) {
                                const t = e.getAttribute("data-acsb-alt-candidate"),
                                    i = e.getAttribute("data-acsb-bg-image");
                                t && (i && i.length >= 5 && "IMG" !== e.tagName ? "file" !== e.acsbAltMethod && u.srOnly.append(e, u.srOnly.create(null, {
                                    role: "img",
                                    "aria-label": t
                                })) : e.setAttribute("alt", t), "file" === e.acsbAltMethod && "IMG" === e.tagName && e.setAttribute("aria-hidden", "true"), e.removeAttribute("data-acsb-alt-candidate"), this._promoteUsemapCandidates(e))
                            },
                            _promoteUsemapCandidates(e) {
                                const t = e.getAttribute("usemap");
                                if (!t) return;
                                const i = c.A.pick(`[name="${t.replace("#","")}"]`);
                                if (!i) return;
                                const n = c.A.picks("area", i),
                                    s = e.getAttribute("data-acsb-alt-candidate");
                                n[0] || c.A.elements.remove(i);
                                let a = 0;
                                for (let e of n) {
                                    const t = e.getAttribute("alt"),
                                        i = e.getAttribute("data-acsb-first-alt");
                                    0 === a ? (!t || t.length < 1 || "true" === i) && (c.A.elements.attrs(e, {
                                        "data-acsb-first-alt": "true",
                                        alt: s
                                    }), "true" === i && e.removeAttribute("data-acsb-first-alt")) : (!t || t.length > 1) && e.setAttribute("alt", `Area ${a}`), a++
                                }
                            }
                        },
                        forms: {
                            process() {
                                if (this._processForms(), this._handleStrayElements(), u.rebinds > 0) return;
                                this._handleSuccessReload();
                                let e = [];
                                c.A.events.on(window, `${n.A.events.elementShow} ${n.A.events.domChanged}`, (t => {
                                    const i = t.detail.$elements || [],
                                        n = t.detail.$el;
                                    n && !i.includes(n) && i.push(n), i.forEach((t => {
                                        const i = c.A.picks(t, "form"),
                                            n = t.closest("form");
                                        n && i.push(n);
                                        for (let t of i) e.includes(t) || e.push(t)
                                    }))
                                })), setInterval((() => {
                                    if (!(e.length < 1)) {
                                        for (let t of e) t.acsbFormBound && this._handleFormFields(t);
                                        e = []
                                    }
                                }), 100)
                            },
                            _processForms(e) {
                                e = e || c.A.picks("form, [data-acsb-form]"), this._enforceUuid(e);
                                for (let t of e) {
                                    if (t.acsbFormBound || t.closest("[data-acsb]") || !o.A.isVisible(t)) continue;
                                    t.acsbFormBound = !0;
                                    let e = "standard";
                                    if (this._isSearchForm(t) && (e = "search", c.A.elements.text(t) === c.A.elements.text(t.parentElement) ? t.parentElement.setAttribute("role", "search") : t.setAttribute("role", "search")), this._isCartForm(t) && (e = "cart"), t.removeAttribute("novalidate"), c.A.elements.attrs(t, {
                                            "data-acsb-form-uuid": c.A.strings.random(),
                                            "data-acsb-form-type": e
                                        }), this._handleFormFields(t), this._handleMissingButtons(t), "cart" === e)
                                        for (let e of c.A.picks('[role="button"]', t)) {
                                            if (e.parentElement.acsbCheckedOptionsButtons) continue;
                                            if (e.parentElement.acsbCheckedOptionsButtons = !0, e.parentElement.children.length < 3) continue;
                                            let t = !1;
                                            for (let i of e.parentElement.children) i.tagName !== e.tagName && (t = !0);
                                            if (t) continue;
                                            const i = c.A.strings.random();
                                            let n = null;
                                            for (let t of e.parentElement.children)
                                                if (c.A.strings.inString(t.outerHTML, "selected") || c.A.strings.inString(t.outerHTML, "active")) {
                                                    if (e.parentElement.ascbFoundSelected) {
                                                        n = null;
                                                        break
                                                    }
                                                    e.parentElement.ascbFoundSelected = !0, n = t
                                                }
                                            for (let t of e.parentElement.children) c.A.elements.attrs(t, {
                                                "data-acsb-pressed-family": i,
                                                "aria-pressed": t === n
                                            })
                                        }
                                    "search" === e ? this.submissions.handleSearchProcess(t) : "true" !== t.getAttribute("data-acsb-wrapper-form") && this.submissions.handleStandardProcess(t)
                                }
                            },
                            _enforceUuid(e) {
                                for (let t of e) {
                                    if (!t.id || t.acsbFormsUuidBound) continue;
                                    t.acsbFormsUuidBound = !0;
                                    let e = 0;
                                    for (let i of c.A.picks(`form#${t.id}`)) i !== t && i.setAttribute("id", i.id + e), e++
                                }
                                for (let e of c.A.picks("input, select, textarea")) {
                                    if (e.acsbFieldsUuidBound) continue;
                                    e.acsbFieldsUuidBound = !0;
                                    let t = 0;
                                    for (let i of c.A.picks(`input#${e.id}, select#${e.id}, textarea#${e.id}`)) i !== e && (i.id = e.id + +t), t++
                                }
                            },
                            _isCartForm(e) {
                                let t = !1;
                                const i = e.outerHTML.replace(/<select.*>.*?<\/select>/gi, "");
                                for (let e of ["cart", "bag", "basket", "checkout", "coupon", "promo", "quantity", "qty"])
                                    if (c.A.strings.inString(i, e)) {
                                        t = !0;
                                        break
                                    }
                                if (t)
                                    for (let i of c.A.picks("input, select, textarea", e))
                                        if (!["hidden", "button", "submit", "img"].includes(i.type) && o.A.isVisible(i) && ["email", "phone"].includes(this.field.textualType.getType(i, c.A.pick(`label[for="${i.id}"]`)))) {
                                            t = !1;
                                            break
                                        }
                                return t
                            },
                            _isSearchForm(e) {
                                if (c.A.picks('select, textarea, input[type="checkbox"], input[type="radio"]', e).length > 0) return !1;
                                const t = [];
                                let i = !1;
                                for (let i of c.A.picks("input", e))["checkbox", "radio", "hidden", "submit", "img", "button"].includes(i.type) || t.push(i);
                                if (t.length > 1) return !1;
                                for (let n of t)(c.A.strings.inString(c.A.elements.html(e), "search") || "search" === this.field.textualType.getType(n, c.A.pick(`label[for="${n.id}"]`))) && (i = !0);
                                return i
                            },
                            _handleMissingButtons(e) {
                                const t = e.getAttribute("data-acsb-form-type");
                                if (["wrapper", "cart"].includes(t) || c.A.picks('button:not([type="button"]), input[type="image"], input[type="submit"], input[type="button"]', e).length > 0) return;
                                const i = "search" === t ? r.A.get("SEARCH") : r.A.get("SUBMIT"),
                                    n = c.A.picks("input, select, textarea", e);
                                let s, o = c.A.elements.create("button", {
                                    class: "acsb-hidden",
                                    type: "submit"
                                }, i);
                                a.A.navigation.setHidden(o, !0);
                                for (let t of c.A.picks('a[role="button"], span[role="button"], div[role="button"]', e)) c.A.picks("*", t).length > 5 || c.A.picks('input, textarea, select, label, [data-acsb-possible-button="true"]', t).length > 0 || t.closest('label, [data-acsb-possible-button="true"]') || (s = t, c.A.elements.attrs(t, {
                                    "data-acsb-possible-button": "true",
                                    "data-acsb-force-navigable": "true",
                                    tabindex: "0"
                                }));
                                s ? (c.A.elements.insert(o, s), c.A.events.on(s, "click", (t => {
                                    e.checkValidity() || (t.preventDefault(), c.A.elements.click(o))
                                }))) : (o = c.A.elements.create("button", {
                                    type: "submit",
                                    class: "acsb-sr-only",
                                    "data-acsb-sr-only": "true"
                                }, i), c.A.elements.append(o, e)), c.A.events.on(n, "keydown", (t => {
                                    13 !== t.which || "FORM" === e.tagName && e.checkValidity() || ["file", "checkbox", "radio"].includes(t.target.type) || c.A.elements.click(o)
                                }))
                            },
                            _handleFormFields(e) {
                                const t = c.A.picks("input, select, textarea", e);
                                let i = 0;
                                for (let e of t) e.closest('[data-acsb-hidden="true"]') || (i += 1);
                                for (let e of t) !e.closest('[data-acsb-hidden="true"]') && e.offsetParent ? (e.acsbFormFieldBound = !1, this.field.process(e)) : this.field._makeOptional(e)
                            },
                            _handleStrayElements() {
                                for (let e of c.A.picks("input, textarea, select")) {
                                    if (e.acsbStrayFieldBound || "true" !== e.getAttribute("data-acsb-now-navigable") || !o.A.isVisible(e)) continue;
                                    if (e.acsbStrayFieldBound = !0, e.closest("form, [data-acsb]")) continue;
                                    if (this.field.process(e), "search" !== e.getAttribute("data-acsb-textual-type")) continue;
                                    let t = c.A.elements.text(e.parentElement),
                                        i = c.A.picks("img, svg", e.parentElement),
                                        n = e.parentElement,
                                        s = e.parentElement,
                                        a = !1;
                                    for (; !a && "BODY" !== n.tagName;) {
                                        if (t !== c.A.elements.text(n) || i.length !== c.A.picks("img, svg", n).length) {
                                            a = !0;
                                            break
                                        }
                                        s = n, n = n.parentElement
                                    }
                                    c.A.elements.attrs(s, {
                                        role: "search",
                                        "aria-label": r.A.get("SEARCH")
                                    }), this._processForms([s])
                                }
                                for (let e of c.A.picks("label"))
                                    if (!e.acsbStrayLabelBound && o.A.isVisible(e) && (e.acsbStrayLabelBound = !0, !(e.getAttribute("role") || e.closest("form, [data-acsb]") || c.A.pick("input, textarea, select", e))))
                                        if (c.A.elements.text(e) || e.getAttribute("aria-label")) {
                                            const t = e.getAttribute("for");
                                            t && c.A.pick(`#${t}`) || e.setAttribute("role", "text")
                                        } else c.A.elements.attrs(e, {
                                            "data-acsb-force-hidden": "true",
                                            "aria-hidden": "true",
                                            role: "presentation"
                                        })
                            },
                            _handleSuccessReload() {
                                if (window.acsbSuccessReloadProcessed) return;
                                const e = s.A.getStorage("acsbFormSubmission");
                                e && "success" === e.acsbFormSubmission && (o.A.throwAlert(r.A.get("FRONT_VALIDATIONS_SUCCESS"), !1, !0), c.A.utilities.delStorage("acsbFormSubmission")), window.acsbSuccessReloadProcessed = !0
                            },
                            submissions: {
                                _handleSubmission(e) {
                                    if (e.acsbProcessing) return;
                                    const t = [],
                                        s = [];
                                    return e.acsbProcessing = !0, e.removeAttribute("novalidate"), c.A.events.on(window, n.A.events.domChanged, (i => {
                                        for (let n of i.detail.$elements)
                                            if (!(!o.A.isVisible(n) || n === e || c.A.elements.text(n).length < 1 || ["BUTTON", "BODY"].includes(n.tagName) || n.matches('[data-acsb-sr-only="true"]') || n.closest('[data-acsb], [data-acsb-carousel="true"], button'))) return n.closest("form") ? s.push(n) : t.push(n)
                                    })), setTimeout((async () => {
                                        let n = c.A.elements.focused();
                                        const a = (await i.e(494).then(i.bind(i, 473))).default;
                                        n && o.A.isFormField(n) && !n.checkValidity() ? e.acsbProcessing = !1 : (a.processor.start(), o.A.throwAlert(r.A.get("PROCESSING_DATA_PLEASE_WAIT"), !0, !0), setTimeout((() => {
                                            let i;
                                            for (let e of s.concat(t)) {
                                                if (!document.body.contains(e) || !o.A.isVisible(e)) continue;
                                                let t = !1,
                                                    n = e.outerHTML;
                                                if ((e.closest('[role="alert"]') || c.A.pick('[role="alert"]', e)) && (t = !0), !t)
                                                    for (let e of ["alert", "success", "fail", "message", "error", "form", "submission", "valid", "response"])
                                                        if (c.A.strings.inString(n, e)) {
                                                            t = !0;
                                                            break
                                                        }
                                                if (t) {
                                                    i = e;
                                                    break
                                                }
                                            }
                                            if (!i)
                                                for (let e of s)
                                                    if (document.body.contains(e) && o.A.isVisible(e)) {
                                                        i = e;
                                                        break
                                                    }
                                            if (!i && t.length > 0)
                                                if ("cart" === e.getAttribute("data-acsb-form-type")) {
                                                    for (let e of t)
                                                        if (document.body.contains(e) && o.A.isVisible(e)) {
                                                            i = e;
                                                            break
                                                        }
                                                } else
                                                    for (let n of t) c.A.elements.next(n, "form")[0] !== e && c.A.elements.previous(n, "form")[0] !== e || (i = n);
                                            n = c.A.elements.focused(), !i || n && n.closest("form") && o.A.isFormField(n) || c.A.elements.focus(i), e.acsbProcessing = !1, a.processor.end()
                                        }), 2500))
                                    }), 300)
                                },
                                handleSearchProcess(e) {
                                    const t = c.A.picks('button, [type="button"], [type="submit"], [type="image"], [data-acsb-possible-button="true"]', e),
                                        i = c.A.pick('input[data-acsb-textual-type="search"]', e);
                                    let s = !1,
                                        l = [];
                                    if (c.A.events.on(window, n.A.events.domChanged, (e => {
                                            s && (l = l.concat(e.detail.$elements))
                                        })), !this.initSearchProcess) {
                                        let e;
                                        this.initSearchProcess = () => {
                                            e && clearTimeout(e), s = !0, e = setTimeout((() => s = !1), 1e3)
                                        }
                                    }
                                    c.A.events.on(i, "keydown", (() => this.initSearchProcess())), c.A.events.on(t, "click", (() => {
                                        this.initSearchProcess(), setTimeout((() => {
                                            const e = [];
                                            for (let t of l)
                                                if ("BODY" !== t.tagName && !t.closest('[data-acsb], [data-acsb-carousel="true"]') && o.A.isVisible(t))
                                                    for (let i of "A" === t.tagName ? [t] : c.A.picks("a", t)) o.A.isVisible(i) && !e.includes(i) && e.push(i);
                                            if (e.length > 0) {
                                                let t, i = e[0].parentElement;
                                                for (; !t && "BODY" !== i.tagName;) {
                                                    if (c.A.picks("a", i).length === e.length) {
                                                        t = i;
                                                        break
                                                    }
                                                    i = i.parentElement
                                                }
                                                t && (t.setAttribute("aria-label", `${e.length} ${r.A.get("SEARCH_RESULTS")}`), c.A.elements.attrs(t, {
                                                    role: "navigation",
                                                    "aria-label": `${e.length} ${r.A.get("SEARCH_RESULTS")}`
                                                })), c.A.elements.focus(e[0]), o.A.throwAlert(`${e.length} ${r.A.get("SEARCH_RESULTS")}`, !0, !0, !t), c.A.events.on(e, "keydown", (t => {
                                                    [38, 40].includes(t.which) && (c.A.events.prevent(t), a.A.navigation.bindArrowNav(e, "up-down", t.which))
                                                }))
                                            }
                                        }), 500)
                                    }))
                                },
                                handleStandardProcess(e) {
                                    let t;
                                    c.A.events.on(c.A.picks('button, [type="button"], [type="submit"], [type="image"], [data-acsb-possible-button="true"]', e), "click", ((i, n) => {
                                        const s = c.A.elements.focused(),
                                            a = c.A.picks('[type="submit"]', e).filter((e => !o.A.isVisible(e) || !e.matches('[data-acsb-sr-only="true"]')));
                                        "BODY" !== s.tagName && s !== n || a.length > 0 && "submit" !== n.type || (t = this._handleSubmission(e))
                                    })), c.A.events.on(window, "beforeunload", (() => {
                                        clearTimeout(t), e.acsbProcessing && (c.A.utilities.setStorage("acsbFormSubmission", JSON.stringify({
                                            acsbFormSubmission: "success"
                                        })), o.A.throwAlert(r.A.get("FRONT_VALIDATIONS_SUCCESS"), !1, !0))
                                    }))
                                }
                            },
                            field: {
                                process(e) {
                                    if (e.acsbFormFieldBound || e.closest("[data-acsb]")) return;
                                    if (e.acsbFormFieldBound = !0, ["button", "submit", "image", "hidden"].includes(e.type)) {
                                        const t = e.getAttribute("title"),
                                            i = e.getAttribute("aria-label");
                                        if (t && !i && (e.setAttribute("aria-label", t), e.removeAttribute("title")), "image" === e.type) {
                                            const t = e.getAttribute("alt"),
                                                n = e.getAttribute("value");
                                            i || (t ? e.setAttribute("aria-label", t) : n && e.setAttribute("aria-label", n))
                                        }
                                        return
                                    }
                                    const t = o.A.isVisible(e),
                                        i = e.closest("form");
                                    if (c.A.strings.inString(e.outerHTML, "honeypot")) return e.classList.add("acsb-hidden"), void e.setAttribute("data-acsb-force-hidden", "true");
                                    const n = e.id ? e.id : c.A.strings.random(),
                                        s = this._getLabel(e, t),
                                        a = {
                                            type: e.type,
                                            "data-acsb-validation-uuid": n,
                                            "data-acsb-field-visible": t ? "true" : "false"
                                        };
                                    s && "LABEL" === s.tagName && s !== c.A.pick(`label[for="${e.id}"]`) && (e.setAttribute("id", n), s.setAttribute("for", n)), ["checkbox", "radio"].includes(e.type) && e.removeAttribute("aria-invalid"), c.A.elements.attrs(e, a), "radio" === e.type && i && "cart" === i.getAttribute("data-acsb-form-type") && e.closest('[class*="out"]') && e.closest('[class*="stock"]') && (e.disabled = !0), i && (t && this._isRequired(e, s) ? this._makeRequired(e) : c.A.elements.attrs(e, {
                                        "aria-invalid": "false",
                                        "aria-required": "false"
                                    })), c.A.events.on(e, "focusout", (() => {
                                        e.getAttribute("aria-invalid") && (e.checkValidity() ? e.setAttribute("aria-invalid", "false") : e.setAttribute("aria-invalid", "true"))
                                    })), this._createAriaLabel(e, s, t)
                                },
                                _makeOptional(e) {
                                    e.setAttribute("aria-required", "false"), e.removeAttribute("required")
                                },
                                _makeRequired(e) {
                                    e.setAttribute("aria-required", "true"), e.closest('[data-acsb-form-type="cart"], [data-acsb-form-type="wrapper"]') || e.setAttribute("required", "true"), e.value || ["checkbox", "radio"].includes(e.type) || e.setAttribute("aria-invalid", "true")
                                },
                                _isRequired(e, t) {
                                    if ("false" === e.getAttribute("aria-required") || e.disabled) return !1;
                                    if (e.required || "true" === e.getAttribute("aria-required") || "true" === e.getAttribute("aria-invalid")) return !0;
                                    let i = "",
                                        n = "",
                                        s = c.A.elements.html(e),
                                        a = t ? t.outerHTML : "";
                                    if ("SELECT" === e.tagName) {
                                        const t = c.A.picks("option", e);
                                        t.length > 0 && (s += c.A.elements.text(t[0]))
                                    }
                                    if (e.closest("form")) {
                                        let t, i = e.parentElement;
                                        for (; i;) {
                                            const e = c.A.picks("input, select, textarea", i).filter((e => !o.A.isVisible(e)));
                                            if ("FORM" === i.tagName || e.length > 1) break;
                                            t = i, i = i.parentElement
                                        }
                                        t && (n = t.outerHTML)
                                    }
                                    return i = s + a + n, !!(c.A.strings.inString(a, "*") || c.A.strings.inString(s, "req") || c.A.strings.inString(i, "captcha"))
                                },
                                _createAriaLabel(e, t, i) {
                                    let n, s, a;
                                    e.ariaLabel && (a = e.ariaLabel), !a && e.placeholder && (a = e.placeholder), !a && "radio" === e.type && e.nextElementSibling && e.closest(".swatch") && e.value === e.nextElementSibling.getAttribute("data-value") && (a = e.value);
                                    const l = e.closest("td"),
                                        d = c.A.pick(`#${e.getAttribute("aria-labelledby")}`),
                                        u = d ? o.A.getShownText(d) : t ? o.A.getShownText(t) : null;
                                    for (let t of c.A.elements.parents(e, "form", !1, !0)) {
                                        if (c.A.picks('input[data-acsb-now-navigable="true"], select[data-acsb-now-navigable="true"], textarea[data-acsb-now-navigable="true"]', t).length > 1) break;
                                        const i = o.A.getShownText(t);
                                        (i.length < 50 || "checkbox" === e.type) && (n = i)
                                    }
                                    if (!a && u && (a = u), e.title && (a ? c.A.strings.inString(a, e.title) || c.A.strings.inString(e.title, a) || (a = `${a} ${e.title}`) : a = e.title), !a) {
                                        const n = i ? this.textualType.getType(e, t) : null;
                                        n && (a = ["quantity"].includes(n) ? r.A.get(n) : r.A.get(`FIELD_LABEL_${n.toUpperCase()}`), e.setAttribute("data-acsb-textual-type", n))
                                    }
                                    if (!a && n && (a = n), a || "on" === e.value || !["checkbox", "radio"].includes(e.type) || c.A.strings.inString(a, e.value) || (a = e.value), a || "SELECT" !== e.tagName || (a = c.A.elements.text(c.A.pick("option[selected], option", e))), !a && l) {
                                        const t = e.closest("table");
                                        if (t) {
                                            const i = e.closest("tr"),
                                                n = c.A.picks("th", t);
                                            if (n.length > 0) {
                                                const e = (() => {
                                                    let e = 0;
                                                    for (let t of c.A.picks("td", i)) {
                                                        if (l === t) return e;
                                                        e++
                                                    }
                                                })();
                                                e > 0 && n[e] && (a = c.A.elements.text(n[e]))
                                            }
                                        }
                                    }
                                    a || !e.name || ["checkbox", "radio"].includes(e.type) || (a = c.A.strings.replace(c.A.strings.replace(e.name, "-", " "), "_", " ")), a && (!u || c.A.strings.inString(a, u) || c.A.pick(`[data-acsb-label-text="${u}"]`) || (e.setAttribute("data-acsb-label-text", u), a = `${u}. ${a}`), e.setAttribute("aria-label", a), (!e.placeholder || e.placeholder.length < 1) && e.setAttribute("placeholder", a.replace("*", ""))), e.ariaLabel && a ? s = a : e.setAttribute("aria-label", e.getAttribute("type") || "TEXT"), "true" === e.getAttribute("aria-required") && (s = s ? `${s} | ${r.A.get("REQUIRED_FIELD")}` : r.A.get("REQUIRED_FIELD")), s && e.setAttribute("data-acsb-tooltip", s)
                                },
                                _getLabel(e, t) {
                                    if (e.id) {
                                        const t = c.A.pick(`label[for="${e.id}"]`);
                                        if (t) return t
                                    }
                                    const i = e.closest("label"),
                                        n = c.A.elements.text(i);
                                    if (i && "*" !== n && n.length > 0 && 1 === c.A.picks("input, textarea, select", i).length) return i;
                                    const s = c.A.elements.previous(e, "label")[0],
                                        a = c.A.elements.text(s);
                                    if (s && "*" !== a && a.length > 0) return s;
                                    const r = c.A.elements.next(e, "label")[0],
                                        l = c.A.elements.text(r);
                                    if (r && "*" !== l && l.length > 0 && ["checkbox", "radio"].includes(e.type)) return r;
                                    const d = c.A.elements.previous(e, 'span:not([role="button"])')[0],
                                        u = c.A.elements.text(d);
                                    if (d && "*" !== u && u.length > 0) return d;
                                    const h = c.A.elements.next(e, 'span:not([role="button"])')[0],
                                        p = c.A.elements.text(h);
                                    if (h && "*" !== p && p.length > 0 && ["checkbox", "radio"].includes(e.type)) return h;
                                    if (t) {
                                        let t;
                                        for (let i of o.A.getNearestElements(e, ["label"])) {
                                            const n = c.A.pick(`#${i.$el.getAttribute("for")}`);
                                            if (i.distance > 100 || !i.isAbove && !i.isLevel || n && n !== e) continue;
                                            const s = o.A.getNearestElements(e, ["input, select, textarea"])[0];
                                            if (s && s.$el === e && !(c.A.picks("input, textarea, select").length > 1)) {
                                                t = i.$el;
                                                break
                                            }
                                        }
                                        return t
                                    }
                                    return null
                                },
                                textualType: {
                                    getType(e, t) {
                                        let i = e.getAttribute("type");
                                        if ("SELECT" !== e.tagName) {
                                            if ("email" === i) return "email";
                                            if ("search" === i || this._textsMatched(e, t, ["search"])) return "search";
                                            if ("password" === i || this._textsMatched(e, t, ["password"])) return "password";
                                            if (this._textsMatched(e, t, ["phone", "mobile", "tele"])) return "phone";
                                            if (this._textsMatched(e, t, ["message", "comment", "msg", "note"])) return "message";
                                            if (this._textsMatched(e, t, ["captcha"])) return "captcha";
                                            if (this._textsMatched(e, t, ["subject", "topic"])) return "subject";
                                            if (this._textsMatched(e, t, ["company"])) return "company";
                                            if (this._textsMatched(e, t, ["address", "addr", "street"])) return "address";
                                            if (this._textsMatched(e, t, ["zip", "postal"])) return "zip";
                                            if (this._textsMatched(e, t, ["website", "link"])) return "link";
                                            if (this._textsMatched(e, t, ["promo", "coupon", "voucher"])) return "coupon";
                                            if (this._textsMatched(e, t, ["fullname", "full_name", "full-name"])) return "fullname";
                                            if (this._textsMatched(e, t, ["fname", "first_name", "firstname", "first-name"])) return "firstname";
                                            if (this._textsMatched(e, t, ["lname", "last_name", "lastname", "last-name"])) return "lastname"
                                        }
                                        if (this._textsMatched(e, t, ["city"])) return "city";
                                        if (this._textsMatched(e, t, ["country"])) return "country";
                                        if (this._textsMatched(e, t, ["slide", "range"])) return "range";
                                        if (this._textsMatched(e, t, ["state", "province"])) return "state";
                                        if (this._textsMatched(e, t, ["quantity", "qty", "quantities", "update"])) return "quantity";
                                        if ("SELECT" !== e.tagName) {
                                            if (this._isName(e, t)) return "name";
                                            if (this._isEmail(e, t)) return "email"
                                        }
                                        return null
                                    },
                                    _textsMatched(e, t, i) {
                                        let n = !1,
                                            s = "SELECT" === e.tagName ? c.A.elements.html(e) : e.outerHTML,
                                            a = t ? t.outerHTML : "";
                                        for (let e of ["controlname", 'name="', "opacity"]) s = c.A.strings.replace(s, e, ""), a = c.A.strings.replace(a, e, "");
                                        for (let t of i) {
                                            if (s && c.A.strings.inString(s, t) || c.A.strings.inString(a, t)) {
                                                n = !0;
                                                break
                                            }
                                            for (let i of c.A.elements.parents(e, "form", !1, !0)) {
                                                const a = c.A.picks("input, select, textarea", i);
                                                if (1 === a.length && a[0] === e && c.A.strings.inString(s, t)) {
                                                    n = !0;
                                                    break
                                                }
                                            }
                                            if (n) break
                                        }
                                        return n
                                    },
                                    _isEmail(e, t) {
                                        return "INPUT" === e.tagName && ("email" === e.type || this._textsMatched(e, t, ["mail"]))
                                    },
                                    _isName(e, t) {
                                        if (c.A.strings.inString("SELECT" === e.tagName ? c.A.elements.html(e).replace('name="', "") : e.outerHTML.replace(' name="', " "), "name") || !c.A.none(t) && c.A.strings.inString(t.outerHTML, "name")) return !0;
                                        let i = !1;
                                        for (let t of c.A.elements.parents(e, "form", !1, !0)) {
                                            const e = c.A.elements.html(t).toLowerCase().replace(' name="', " ").replace("controlname");
                                            if (c.A.strings.inString(e, "name")) {
                                                i = !0;
                                                break
                                            }
                                        }
                                        return i
                                    }
                                }
                            }
                        }
                    },
                    h = u
            },
            289: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => c
                });
                var n = i(83),
                    s = i(345),
                    a = i(766),
                    r = i(916),
                    o = i(921),
                    l = i(75);
                const c = {
                    isClickable(e, t = "data-acsb-clickable") {
                        return !("A" !== e.tagName && !this.isFormButton(e) && (e.parentElement && e.parentElement.closest(`a, button, [${t}="true"]`) || e.closest('label[data-acsb-custom-control="true"][data-acsb-force-unnavigable="true"]') || "pointer" !== o.A.elements.style(e, "cursor") || "none" === o.A.elements.style(e, "pointer-events") || "LABEL" === e.tagName && e.closest("form") || o.A.pick(`a, button, [${t}="true"]`, e) || o.A.picks("*:not(svg)", e).length > 7))
                    },
                    isAproxSameDimensionsAndPosition(e, t) {
                        const i = o.A.elements.offsets(e, !0),
                            n = o.A.elements.offsets(t, !0);
                        return Math.abs(i.left - n.left) < 5 && Math.abs(i.top - n.top) < 5 && Math.abs(e.offsetWidth - t.offsetWidth) < 5 && Math.abs(e.offsetHeight - t.offsetHeight) < 5
                    },
                    isNavigable(e) {
                        let t = !1;
                        if (e.closest('label[data-acsb-custom-control="true"][data-acsb-force-unnavigable="true"]')) return !1;
                        if ("true" !== e.getAttribute("data-acsb-clickable") && "true" !== e.getAttribute("data-acsb-hover") && "true" !== e.getAttribute("data-acsb-sub-hover") || e.parentElement && e.parentElement.closest('button, a[href], [data-acsb-navigable="true"]:not([data-acsb-scrollable-focus="true"])') || (t = !0), !t && ("button" === e.getAttribute("role") || "hidden" !== e.type && this.isFormField(e)) && (t = !0), t && ("AREA" === e.tagName || e.parentElement && e.parentElement.closest("svg")) && (t = !1), !t && e.closest('[data-acsb-hidden], [data-acsb-clickable="true"][data-acsb-navigable="true"]')) {
                            const i = e.closest('[data-acsb-now-navigable="true"]');
                            if (i && "A" === i.tagName && this.isFormButton(i) && "pointer" === o.A.elements.style(e, "cursor") && "none" !== o.A.elements.style(e, "pointer-events")) {
                                const n = o.A.pick("[data-acsb-hidden]", i);
                                n && n.contains(e) && n !== e && (o.A.elements.style(e, "cursor") || "A" === e.tagName || this.isFormButton(e)) && (t = !0)
                            }
                        }
                        return t
                    },
                    isVisible(e) {
                        return !e || "AFTERPAY-MODAL" === e.tagName || "true" === e.getAttribute("data-acsb-force-visible") || !(e.closest("svg") || "true" === e.getAttribute("data-acsb-force-hidden") || e.parentElement ? .closest('[data-acsb-hidden="true"]') || this.isHiddenByStyle(e) || this.isOverflowing(e) || this.isHiddenBySize(e))
                    },
                    isHiddenBySize(e) {
                        const t = o.A.elements.width(e),
                            i = o.A.elements.height(e);
                        if (i > 1 && t > 1) return !1;
                        if (0 === i && "hidden" === o.A.elements.style(e, "overflow-y") || 0 === t && "hidden" === o.A.elements.style(e, "overflow-x")) {
                            let t = !1;
                            for (let i of o.A.picks("*", e))
                                if (!("fixed" !== o.A.elements.style(i, "position") || i.offsetWidth < 1 || i.offsetHeight < 1)) {
                                    t = !0;
                                    break
                                }
                            if (!t) return !0
                        }
                        const n = o.A.elements.offsets(e, !0),
                            s = this.getElByOffset(n.left, n.top);
                        return (!s || s !== e && !e.contains(s)) && (e.children.length < 1 || !this.hasVisibleChildren(e))
                    },
                    isHiddenByStyle(e) {
                        const t = o.A.elements.style(e, "display"),
                            i = o.A.elements.style(e, "opacity"),
                            n = o.A.elements.style(e, "visibility");
                        if ("none" === t || "hidden" === e.getAttribute("type") && "INPUT" === e.tagName || "0px" === o.A.elements.style(e, "max-height") && ["block", "grid", "flex"].includes(t) || !this.inDocument(e)) return !0;
                        if (e.offsetHeight > 0 && e.offsetWidth > 0 && Number(o.A.elements.style(e, "z-index")) < 0 && ["absolute", "fixed"].includes(o.A.elements.style(e, "position"))) {
                            const t = o.A.elements.offsets(e, !0),
                                i = this.getElByOffset(t.left, t.top);
                            if (e !== i && !e.contains(i)) return !0
                        }
                        if (("0" === i || "hidden" === n) && "scrollAnimations" !== e.getAttribute("data-acsb-watcher")) {
                            if ("0" !== i || "hidden" === n || "0s" === o.A.elements.style(e, "animation").split(" ")[0]) return !0; {
                                const t = o.A.elements.offsets(e, !0),
                                    i = this.getElByOffset(t.left, t.top);
                                if (e !== i && !e.contains(i)) return !0
                            }
                        }
                        return !1
                    },
                    isOverflowing(e) {
                        if (e.childElementCount > 0 && ["hidden", "auto hidden", "hidden auto"].includes(o.A.elements.style(e, "overflow")) && e.setAttribute("data-acsb-overflower", "true"), "inline" === o.A.elements.style(e, "display") || e.closest('[data-acsb-hidden="true"]')) return !1;
                        const t = e.closest('[data-acsb-overflower="true"]');
                        if (!t || !t.parentElement || "BODY" === t.parentElement.tagName) return !1;
                        if (t.scrollHeight > t.clientHeight || t.scrollWidth > t.clientWidth) return !1;
                        const i = o.A.elements.offsets(e, !0),
                            n = o.A.elements.offsets(t, !0);
                        return !(i.left - e.offsetHeight <= 0 || i.top - e.offsetHeight <= 0) && (e.offsetWidth > 0 && "hidden" === o.A.elements.style(t, "overflow-x") && (i.left + e.offsetWidth <= n.left || i.left > n.left + t.clientWidth) || e.offsetHeight > 0 && "hidden" === o.A.elements.style(t, "overflow-y") && (i.top + e.offsetHeight <= n.top || i.top > n.top + t.clientHeight))
                    },
                    isOverlaying(e) {
                        let t = !1;
                        const i = e.getAttribute("style"),
                            n = o.A.elements.style(e, "display"),
                            s = o.A.elements.offsets(e, !0),
                            a = s.left,
                            r = s.top;
                        e.acsbIgnoreChange = !0, e.classList.add("acsb-hidden"), i && i.includes("display") && o.A.elements.css(e, {
                            display: "none"
                        });
                        const l = this.getElByOffset(a, r);
                        if (e.classList.remove("acsb-hidden"), i && i.includes("display") && o.A.elements.css(e, {
                                display: n
                            }), e.acsbIgnoreChange = !1, l && l !== e && "BODY" !== l.tagName) {
                            const i = [{
                                x: s.left,
                                y: s.top
                            }, {
                                x: s.right,
                                y: s.top
                            }, {
                                x: s.left + e.offsetWidth / 2,
                                y: s.top
                            }, {
                                x: s.left,
                                y: s.top + e.offsetHeight / 2
                            }, {
                                x: s.right,
                                y: s.top + e.offsetHeight / 2
                            }, {
                                x: s.left + e.offsetWidth / 2,
                                y: s.top + e.offsetHeight / 2
                            }, {
                                x: s.left,
                                y: s.bottom
                            }, {
                                x: s.right,
                                y: s.bottom
                            }, {
                                x: s.left + e.offsetWidth / 2,
                                y: s.bottom
                            }];
                            for (let n of i) {
                                const i = this.getElByOffset(n.x, n.y);
                                if (i && (e === i || e.contains(i) || i.contains(e))) {
                                    t = !0;
                                    break
                                }
                            }
                        }
                        return t
                    },
                    isFormButton: e => "BUTTON" === e.tagName || "INPUT" === e.tagName && ["image", "button", "submit"].includes(e.type),
                    isFormField: e => ["INPUT", "TEXTAREA", "SELECT"].includes(e.tagName) && !["button", "image", "submit"].includes(e.type),
                    hasSimilarSiblings(e) {
                        const t = o.A.elements.next(e, e.tagName.toLowerCase(), !0),
                            i = o.A.elements.previous(e, e.tagName.toLowerCase(), !0),
                            n = o.A.elements.text(e);
                        let s = !0;
                        i.length < 1 && t.length < 1 && (s = !1);
                        for (let a of t.concat(i))(e.childElementCount !== a.childElementCount || n.length > 0 && 0 === o.A.elements.text(a).length) && (s = !1);
                        return s
                    },
                    hasVisibleChildren(e) {
                        let t = !1;
                        for (let i of o.A.picks("*", e))
                            if (e.offsetWidth <= 1 && e.offsetHeight <= 1 && "inline" === o.A.elements.style(i, "display") && o.A.elements.css(i, {
                                    display: "block"
                                }), o.A.elements.height(i) > 1 && o.A.elements.width(i) > 1 && !this.isHiddenByStyle(i)) {
                                t = !0;
                                break
                            }
                        return t
                    },
                    inDocument(e) {
                        if ("inline" === o.A.elements.style(e, "display")) return !0;
                        if ("fixed" === o.A.elements.style(e, "position")) {
                            const t = o.A.elements.offsets(e, !0),
                                i = o.A.utilities.getWinSize();
                            if (!this.hasVisibleChildren(e) && (t.top >= i.height || t.top < 0 && e.offsetHeight - t.top < 0)) return !1
                        }
                        let t = e.scrollWidth > e.offsetWidth ? e.scrollWidth : e.offsetWidth,
                            i = e.scrollHeight > e.offsetHeight ? e.scrollHeight : e.offsetHeight;
                        0 === i && (i = 1), 0 === t && (t = 1);
                        const n = o.A.elements.offsets(e);
                        return !(n.left <= 0 && t + n.left <= 0 || n.right <= 0 && t + n.right <= 0 || n.top <= 0 && i + n.top <= 0)
                    },
                    getShownText: (e, t) => Math.abs(parseInt(o.A.elements.style(e, "text-indent"))) >= 9999 || e.closest('[data-acsb-hidden="true"]') ? "" : o.A.elements.text(e, !0, ['[data-acsb-sr-only="true"]', '[data-acsb-hidden="true"]', "option", "textarea"].concat(t || [])),
                    getDiscernibleText: (e, t) => e.closest('[data-acsb-hidden="true"]') ? "" : o.A.elements.text(e, !0, ['[data-acsb-hidden="true"]', "option", "textarea"].concat(t || [])),
                    getUrlAsAbsolute: e => o.A.uris.getAbsolute(o.A.uris.getFormatted(e, n.A.ace ? o.A.pick('head meta[name="acsbAceBase"]').content : n.A.domain)),
                    getElByOffset(e, t) {
                        const i = [o.A.pick(".acsb-trigger"), o.A.pick(".acsb-body-focuser"), o.A.pick(".acsb-alert.acsb-active"), o.A.pick(".acsb-processor.acsb-active")];
                        for (let e of i) e && e.classList.add("acsb-hidden");
                        const n = document.elementFromPoint(e, t);
                        for (let e of i) e && e.classList.remove("acsb-hidden");
                        return n
                    },
                    getNearestElements(e, t) {
                        if (!e || !t || t.length < 1) return [];
                        const i = [],
                            n = o.A.elements.offsets(e, !1);
                        for (let s of o.A.picks(t.join(","))) {
                            if (!this.isVisible(s)) continue;
                            let t, a, r, l, c, d, u, h = o.A.elements.offsets(s, !1);
                            n.left >= h.left ? (a = !0, l = n.left - (h.left + s.offsetWidth)) : (a = !1, l = h.left - (n.left + e.offsetWidth)), c = n.right - e.offsetWidth >= h.right - s.offsetWidth ? n.right - e.offsetWidth - (h.right - s.offsetWidth) : h.right - s.offsetWidth - (n.right - e.offsetWidth), n.top >= h.top ? (n.top - h.top <= s.offsetHeight || n.top - h.top <= e.offsetHeight) && (r = !0) : (h.top - n.top <= n.offsetHeight || h.top - n.top <= s.offsetHeight) && (r = !0), r ? n.top >= h.top ? (t = !0, u = n.top - h.top) : (t = !1, u = h.top - n.top) : n.top >= h.top ? (t = !0, u = n.top - (h.top + s.offsetHeight)) : (t = !1, u = h.top - (n.top + e.offsetHeight)), d = l <= c ? l : c, i.push({
                                $el: s,
                                isLevel: r,
                                isAbove: t,
                                isLeft: a,
                                distanceX: d,
                                distanceY: u,
                                distance: Math.round(Math.sqrt(d * d + u * u))
                            })
                        }
                        return i.sort(((e, t) => parseFloat(e.distance) - parseFloat(t.distance)))
                    },
                    throwAlert(e, t = !1, i = !1, n = !0) {
                        if (!(o.A.picks('.acsb-alert.acsb-top-priority, [data-acsb-sr-alert="true"].acsb-top-priority').length > 0) || i) {
                            if (t = !window.acsbChildFrame && t, o.A.elements.remove(o.A.picks(".acsb-alert, .acsb-sr-alert")), t) {
                                let t = 10;
                                const n = `<div class="acsb-alert-timer"><span>10</span> ${s.A.get("TIME_TO_ALERT_CLOSE")}</div>\n                <div class="acsb-alert-separator"></div>\n                <div class="acsb-alert-sound">${s.A.get("PLAYING_IN_SCREEN_READER")}</div>`,
                                    a = o.A.elements.create("div", {
                                        class: "acsb-alert",
                                        "data-acsb-force-visible": "true",
                                        "aria-hidden": "true",
                                        "data-acsb": "alert"
                                    });
                                i && a.classList.add("acsb-top-priority"), a.acsbIgnoreChange = !0, o.A.elements.append(o.A.elements.create("div", {
                                    class: "acsb-alert-message"
                                }, e), a), o.A.elements.append(o.A.elements.create("div", {
                                    class: "acsb-alert-bar"
                                }, n), a), "he" !== r.A.widget.language && "ar" !== r.A.widget.language || a.classList.add("acsb-rtl"), "right" === r.A.widget.triggerPositionX ? a.classList.add("acsb-place-left") : a.classList.add("acsb-place-right");
                                const l = o.A.pick(".acsb-alert-bar span", a);
                                let c = setInterval((() => {
                                        a.matches(".acsb-js-hovered") || (t = parseInt(o.A.elements.text(l)), t > 0 ? l.textContent = t - 1 >= 0 ? t - 1 : 0 : clearInterval(c))
                                    }), 1e3),
                                    d = setTimeout((() => {
                                        a.classList.remove("acsb-active"), clearTimeout(d)
                                    }), parseInt(`${t}000`));
                                a.classList.add("acsb-active"), o.A.events.on(a, "mouseover", (() => {
                                    a.classList.add("acsb-js-hovered"), clearTimeout(d)
                                })), o.A.events.on(a, "mouseleave", (() => {
                                    a.classList.remove("acsb-js-hovered"), d = setTimeout((() => {
                                        a.classList.remove("acsb-active"), clearTimeout(d)
                                    }), parseInt(`${t}000`))
                                })), o.A.elements.append(a, document.body)
                            }
                            if (n) {
                                const t = a.A.srOnly.create(e, {
                                    role: "alert",
                                    class: "acsb-sr-alert",
                                    "aria-live": "assertive",
                                    "data-acsb-sr-alert": "true",
                                    "data-acsb-force-visible": "true"
                                });
                                i && t.classList.add("acsb-top-priority"), setTimeout((() => o.A.elements.remove(t)), 1e4), o.A.elements.append(t, document.body)
                            }
                        }
                    },
                    prevStyleIds: new Map,
                    addDynamicCss(e, t) {
                        const i = `[data-acsb-dynamic-css="${t=t||o.A.strings.random()}"]`,
                            n = l.c.boundStyles.get(this.prevStyleIds.get(i)),
                            s = o.A.pick(i);
                        let a = s ? .textContent || n ? .content,
                            r = s || n ? .style;
                        if (r) a.includes(e) || l.c.replaceStyleContent(`${a} ${e}`, r);
                        else {
                            const n = o.A.pick('link[rel="stylesheet"], style', document.head),
                                s = l.c.insertStyle(e, {
                                    adoptedStyleSheetsTarget: document,
                                    insertStyleElementTarget: e => {
                                        n ? o.A.elements.insert(e, n) : o.A.elements.append(e, document.head)
                                    },
                                    insertStyleElementAttributes: {
                                        "data-acsb-dynamic-css": t
                                    }
                                });
                            this.prevStyleIds.set(i, s.id)
                        }
                    },
                    fakeBodyClick() {
                        const e = o.A.elements.create("span");
                        o.A.elements.append(e, document.body), o.A.elements.click(e), setTimeout((() => o.A.elements.remove(e)), 300)
                    },
                    focusBody() {
                        let e = o.A.pick(".acsb-body-focuser");
                        e || (e = o.A.elements.create("div", {
                            tabindex: "-1",
                            "data-acsb": "focuser",
                            class: "acsb-body-focuser",
                            "data-acsb-clear-focus-style": "true",
                            "data-acsb-force-visible": "true"
                        })), o.A.elements.append(e, document.body, !0), o.A.elements.focus(e), setTimeout((() => o.A.elements.remove(e)), 100)
                    }
                }
            },
            83: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => l
                });
                var n = i(303),
                    s = i(251);
                const a = function(e, t = !1, i = !0) {
                        return e ? (e = "/" === (e = "//" === (e = function(e, t, i) {
                            if (!e) return e;
                            for (let i of t) e = e.split(i).join("");
                            return e
                        }(e.split("#")[0], ["https://", "http://"])).substring(0, 2) ? e.replace("//", "") : e).substring(0, 1) ? e.replace("/", "") : e, e = i ? e.split("?")[0] : e, t && (e = "www." === e.substring(0, 4) ? e.replace("www.", "") : e), e.trim().replaceAll(" ", "%20")) : e
                    }(window.location.href, !0).split("/")[0],
                    r = `https://${n.f?"eu-":""}cdn.acsbapp.com/`,
                    o = `https://${n.f?"eu-":""}backend.acsbapp.com`,
                    l = {
                        siteCfg: {},
                        ace: !1,
                        debug: !1,
                        active: !1,
                        expired: !1,
                        wave: !1,
                        app: "app",
                        keepAliveReporter: !1,
                        isEU: n.f,
                        processEndpoint: o,
                        cache: r + "cache/",
                        config: r + "config/",
                        resources: r + "resources/",
                        domain: a,
                        events: {
                            ready: "acsbReady",
                            actionEnabled: "acsbActionEnabled",
                            actionEnabling: "acsbActionEnabling",
                            actionDisabled: "acsbActionDisabled",
                            actionDisabling: "actionDisabling",
                            domChanged: "acsbDomChanged",
                            elementHide: "acsbElementOnHide",
                            elementShow: "acsbElementOnShow",
                            keynavRebind: "acsbKeynavRebind",
                            widgetOpen: "acsbWidgetOpen",
                            widgetClose: "acsbWidgetClose"
                        },
                        _build() {
                            this.domain = s.A.getConfigDomain(), this.keepAliveReporter = !0;
                            for (let e of ["accessscan.accessibe.com", "acsbace.com", "acsb-test.com"]) {
                                if (!this.domain.includes(e)) continue;
                                this.ace = !0;
                                const t = AJS.pick('meta[name="aceWebsite"]');
                                t && (this.domain = AJS.uris.getFormatted(t.content, !0).split("/")[0])
                            }
                            for (let e of AJS.picks("script[src]")) {
                                if (!e.src.includes("acsbap")) continue;
                                let t = e.src.split("apps/");
                                if (t[0] === e.src && (t = e.src.split("api/")), !(t.length <= 1)) {
                                    this.app = t[1].split("/")[0], this.app = "v1" === this.app ? "app" : this.app, AJS.elements.remove(e), "app" !== this.app && (this.debug = !0);
                                    break
                                }
                            }
                        }
                    }
            },
            345: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => r
                });
                var n = i(535),
                    s = i(289),
                    a = i(921);
                const r = {
                    data: null,
                    guesser: null,
                    supported: ["en", "he", "es", "fr", "de", "pt", "it", "tw", "ru", "ar", "ua", "nl", "zh", "ja", "pl", "tr", "sl", "sk", "hu", "cs"],
                    get: e => (new n.A).dictionary.t(e),
                    async getDocLang() {
                        let e = "";
                        for (let t of a.A.picks("h1, h2, h3, p, li, nav, header, a, div"))
                            if (!(t.closest("[data-acsb]") || s.A.isHiddenBySize(t) || s.A.isHiddenByStyle(t)) && (e = `${e} ${a.A.elements.text(t).replace(/\s{2,}/g,"").replace(/\'/g,'"')}`, e.length >= 2e3)) break;
                        return (await i.e(716).then(i.bind(i, 79))).default.Languages.predict({
                            text: e
                        })
                    }
                }
            },
            916: (e, t, i) => {
                "use strict";
                i.d(t, {
                    A: () => n
                });
                const n = {
                    ready: !1,
                    running: !1,
                    open: !1,
                    state: !1,
                    isMobile: !1,
                    isChildFrame: !1,
                    canStore: !0,
                    lang: "en",
                    loadParams: {},
                    html: {},
                    actions: {},
                    siteCfg: {},
                    widget: {},
                    store(e) {
                        if (!this.canStore) return this;
                        const t = this.getStorage();
                        let i, n;
                        return "widget" === e ? (i = t ? t.actions : this.actions, n = this.widget) : "actions" === e ? (i = this.actions, n = t ? t.widget : this.widget) : (i = this.actions, n = this.widget), AJS.utilities.setStorage("acsbState", JSON.stringify({
                            date: (new Date).toISOString().slice(0, 10),
                            actions: i,
                            widget: n
                        })), this
                    },
                    reset(e = !0) {
                        return this.actions = {}, this.widget = {}, AJS.utilities.delStorage("acsbState"), e && AJS.utilities.reload(0), this
                    },
                    getStorage(e = "acsbState") {
                        try {
                            return JSON.parse(AJS.utilities.getStorage(e))
                        } catch (e) {
                            return null
                        }
                    },
                    updateWidget(e, t) {
                        return this.widget[e] = t, this
                    },
                    updateAction(e, t, i = {}, n = !1) {
                        return this.actions[e] = {
                            enabled: t,
                            options: i,
                            cached: n
                        }, this
                    }
                }
            },
            941: (e, t, i) => {
                "use strict";

                function n() {
                    return Math.random().toString(36).slice(-6)
                }

                function s(e) {
                    const t = new URL(e);
                    return Object.fromEntries(t.searchParams.entries())
                }
                i.d(t, {
                    Nb: () => d,
                    cb: () => u,
                    Hm: () => r,
                    Sd: () => l,
                    JI: () => c,
                    su: () => f,
                    Ep: () => o,
                    rf: () => p,
                    V8: () => h,
                    JO: () => s,
                    N3: () => n
                });
                var a = function(e, t, i, n) {
                    return new(i || (i = Promise))((function(s, a) {
                        function r(e) {
                            try {
                                l(n.next(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function o(e) {
                            try {
                                l(n.throw(e))
                            } catch (e) {
                                a(e)
                            }
                        }

                        function l(e) {
                            var t;
                            e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                                e(t)
                            }))).then(r, o)
                        }
                        l((n = n.apply(e, t || [])).next())
                    }))
                };

                function r() {
                    return a(this, void 0, void 0, (function*() {
                        return new Promise((e => {
                            "loading" === document.readyState ? document.addEventListener("DOMContentLoaded", (() => e())) : e()
                        }))
                    }))
                }

                function o() {
                    const e = ["443", "80", ""].includes(window.location.port) ? "" : ":" + window.location.port;
                    return new URL(window.location.href).hostname.replace(/^www\./, "") + e
                }
                const l = (e, t) => {
                        for (const i of t) {
                            const t = e.getAttribute(i);
                            if (t) return t.replace(/\s+/g, " ").trim()
                        }
                        return ""
                    },
                    c = e => Array.from(e.childNodes).find((e => e.nodeType === Node.TEXT_NODE && e.textContent.trim())),
                    d = ({
                        e,
                        top: t,
                        left: i
                    }) => {
                        if (e.view === window) return {
                            top: t,
                            left: i
                        };
                        let n = 0,
                            s = 0,
                            a = e.view;
                        for (; a && a !== window && "frameElement" in a;) {
                            const {
                                left: e,
                                top: t
                            } = a.frameElement.getBoundingClientRect();
                            n += t, s += e, a = a.parent
                        }
                        return {
                            top: n + t,
                            left: s + i
                        }
                    },
                    u = e => new Promise((t => setTimeout(t, e))),
                    h = "rtl" === document.dir,
                    p = e => {
                        var t;
                        const n = i(289).A;
                        if (!n.isVisible(e)) return "";
                        const s = {
                                acceptNode: function(e) {
                                    return n.isVisible(e) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
                                }
                            },
                            a = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, s),
                            r = document.createElement("div");
                        r.innerHTML = "";
                        do {
                            const e = a.currentNode;
                            r.innerHTML += (null === (t = c(e)) || void 0 === t ? void 0 : t.textContent) || ""
                        } while (a.nextNode());
                        return r.textContent.replace(/\s+/g, " ").trim()
                    },
                    f = e => {
                        const t = document.createRange();
                        return t.selectNodeContents(e), t.getClientRects()
                    }
            }
        },
        a = {};

    function r(e) {
        var t = a[e];
        if (void 0 !== t) return t.exports;
        var i = a[e] = {
            exports: {}
        };
        return s[e](i, i.exports, r), i.exports
    }
    r.m = s, t = Object.getPrototypeOf ? e => Object.getPrototypeOf(e) : e => e.__proto__, r.t = function(i, n) {
        if (1 & n && (i = this(i)), 8 & n) return i;
        if ("object" == typeof i && i) {
            if (4 & n && i.__esModule) return i;
            if (16 & n && "function" == typeof i.then) return i
        }
        var s = Object.create(null);
        r.r(s);
        var a = {};
        e = e || [null, t({}), t([]), t(t)];
        for (var o = 2 & n && i;
            "object" == typeof o && !~e.indexOf(o); o = t(o)) Object.getOwnPropertyNames(o).forEach((e => a[e] = () => i[e]));
        return a.default = () => i, r.d(s, a), s
    }, r.d = (e, t) => {
        for (var i in t) r.o(t, i) && !r.o(e, i) && Object.defineProperty(e, i, {
            enumerable: !0,
            get: t[i]
        })
    }, r.f = {}, r.chunkedI18n__ = {
        publicPath: "",
        requiredDictionaries: ["app"],
        chunks: ["app", , "loader", , "classifier", , "accessModeActivationSound", , "accessibility_statment_content_dictionary"],
        onChange: () => {},
        cache: {},
        initialDictionary: {},
        fetchMethod: null,
        _getFetchMethod: () => {
            if (!r.chunkedI18n__.fetchMethod) {
                const e = document.createElement("iframe");
                Object.assign(e.style, {
                    visibility: "hidden",
                    pointerEvents: "none",
                    position: "fixed"
                }), e.srcdoc = "<html></html>", e.style.display = "none", document.body.appendChild(e), r.chunkedI18n__.fetchMethod = e.contentWindow.fetch.bind(window), document.body.removeChild(e)
            }
            return r.chunkedI18n__.fetchMethod
        },
        _dictionaryMerge: function e(t, i) {
            for (let [n, s] of Object.entries(i)) t[n] ? t[n] = "object" == typeof s ? e(t[n], s) : s : t[n] = s;
            return t
        },
        setInitialDictionary: e => {
            r.chunkedI18n__.initialDictionary = e
        },
        getDictionary: async e => {
            let t = {};
            for (let i of r.chunkedI18n__.requiredDictionaries) {
                if ("en" === e && "app" === i) {
                    t = Object.assign(t, r.chunkedI18n__.initialDictionary);
                    continue
                }
                let n;
                const s = r.chunkedI18n__.cache;
                if (s[e] && s[e][i]) n = s[e][i];
                else {
                    const t = await r.chunkedI18n__._getFetchMethod()(`${r.chunkedI18n__.publicPath}locale/${e}-${i}.json`);
                    n = await t.json(), s[e] = s[e] || {}, s[e][i] = n
                }
                t = r.chunkedI18n__._dictionaryMerge(t, n)
            }
            return t
        },
        registerDictionary: e => {
            -1 !== r.chunkedI18n__.chunks.indexOf(e) && -1 === r.chunkedI18n__.requiredDictionaries.indexOf(e) && (r.chunkedI18n__.requiredDictionaries.push(e), r.chunkedI18n__.onChange())
        }
    }, r.e = e => {
        const t = r.u(e).replace(".js", "");
        return r.chunkedI18n__.registerDictionary(t), Promise.all(Object.keys(r.f).reduce(((t, i) => (r.f[i](e, t), t)), []))
    }, r.u = e => ({
        494: "loader",
        716: "classifier",
        823: "accessibility_statment_content_dictionary",
        857: "accessModeActivationSound"
    }[e] + ".js"), r.g = function() {
        if ("object" == typeof globalThis) return globalThis;
        try {
            return this || new Function("return this")()
        } catch (e) {
            if ("object" == typeof window) return window
        }
    }(), r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), i = {}, n = "widget:", r.l = (e, t, s, a) => {
        if (i[e]) i[e].push(t);
        else {
            var o, l;
            if (void 0 !== s)
                for (var c = document.getElementsByTagName("script"), d = 0; d < c.length; d++) {
                    var u = c[d];
                    if (u.getAttribute("src") == e || u.getAttribute("data-webpack") == n + s) {
                        o = u;
                        break
                    }
                }
            o || (l = !0, (o = document.createElement("script")).charset = "utf-8", o.timeout = 120, r.nc && o.setAttribute("nonce", r.nc), o.setAttribute("data-webpack", n + s), o.src = e), i[e] = [t];
            var h = (t, n) => {
                    o.onerror = o.onload = null, clearTimeout(p);
                    var s = i[e];
                    if (delete i[e], o.parentNode && o.parentNode.removeChild(o), s && s.forEach((e => e(n))), t) return t(n)
                },
                p = setTimeout(h.bind(null, void 0, {
                    type: "timeout",
                    target: o
                }), 12e4);
            o.onerror = h.bind(null, o.onerror), o.onload = h.bind(null, o.onload), l && document.head.appendChild(o)
        }
    }, r.r = e => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }, (() => {
        var e;
        r.g.importScripts && (e = r.g.location + "");
        var t = r.g.document;
        if (!e && t && (t.currentScript && (e = t.currentScript.src), !e)) {
            var i = t.getElementsByTagName("script");
            if (i.length)
                for (var n = i.length - 1; n > -1 && (!e || !/^http(s?):/.test(e));) e = i[n--].src
        }
        if (!e) throw new Error("Automatic publicPath is not supported in this browser");
        e = e.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/"), r.p = e
    })(), (() => {
        var e = {
            524: 0
        };
        r.f.j = (t, i) => {
            var n = r.o(e, t) ? e[t] : void 0;
            if (0 !== n)
                if (n) i.push(n[2]);
                else {
                    var s = new Promise(((i, s) => n = e[t] = [i, s]));
                    i.push(n[2] = s);
                    var a = r.p + r.u(t),
                        o = new Error;
                    r.l(a, (i => {
                        if (r.o(e, t) && (0 !== (n = e[t]) && (e[t] = void 0), n)) {
                            var s = i && ("load" === i.type ? "missing" : i.type),
                                a = i && i.target && i.target.src;
                            o.message = "Loading chunk " + t + " failed.\n(" + s + ": " + a + ")", o.name = "ChunkLoadError", o.type = s, o.request = a, n[1](o)
                        }
                    }), "chunk-" + t, t)
                }
        };
        var t = (t, i) => {
                var n, s, [a, o, l] = i,
                    c = 0;
                if (a.some((t => 0 !== e[t]))) {
                    for (n in o) r.o(o, n) && (r.m[n] = o[n]);
                    l && l(r)
                }
                for (t && t(i); c < a.length; c++) s = a[c], r.o(e, s) && e[s] && e[s][0](), e[s] = 0
            },
            i = globalThis.webpackChunkwidget = globalThis.webpackChunkwidget || [];
        i.forEach(t.bind(null, 0)), i.push = t.bind(null, i.push.bind(i))
    })(), (() => {
        "use strict";
        var e = r(561),
            t = r(941),
            i = function(e, t, i, n) {
                return new(i || (i = Promise))((function(s, a) {
                    function r(e) {
                        try {
                            l(n.next(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function o(e) {
                        try {
                            l(n.throw(e))
                        } catch (e) {
                            a(e)
                        }
                    }

                    function l(e) {
                        var t;
                        e.done ? s(e.value) : (t = e.value, t instanceof i ? t : new i((function(e) {
                            e(t)
                        }))).then(r, o)
                    }
                    l((n = n.apply(e, t || [])).next())
                }))
            };
        const n = () => i(void 0, void 0, void 0, (function*() {
            return yield(yield r(561)).default._loadBundle(), yield r.e(494).then(r.bind(r, 629))
        }));
        class s {
            static restart() {
                return i(this, void 0, void 0, (function*() {
                    return (yield n()).restart()
                }))
            }
            static destroy() {
                return i(this, void 0, void 0, (function*() {
                    return (yield n()).destroy()
                }))
            }
            static map() {
                return i(this, void 0, void 0, (function*() {
                    return (yield n()).map()
                }))
            }
            static enable(e, t, s, a) {
                return i(this, void 0, void 0, (function*() {
                    return (yield n()).enable(e, t, s, a)
                }))
            }
            static disable(e, t, s, a) {
                return i(this, void 0, void 0, (function*() {
                    return (yield n()).disable(e, t, s, a)
                }))
            }
        }
        class a {
            static exposeAPI() {
                window.acsbJS = window.acsbJS || Object.assign({
                    initialized: !1,
                    init: t => {
                        e.default.start(e.default.sanitize(t)), window.acsbJS.initialized = !0
                    }
                }, {
                    restart: s.restart,
                    destroy: s.destroy,
                    map: s.map,
                    enable: s.enable,
                    disable: s.disable
                }), window.acsb = window.AccessiBe = window.acsbJS
            }
            static _shouldAutoInit(e) {
                return Boolean(e.init)
            }
            static handleAutoInit() {
                const i = (0, t.JO)(document.currentScript.src);
                this._shouldAutoInit(i) && e.default.start(i)
            }
        }
        a.exposeAPI(), a.handleAutoInit()
    })()
})();