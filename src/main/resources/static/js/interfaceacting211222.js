!function () {
    window._waf_is_mobile = false;
    (function (a) {
            if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                window._waf_is_mobile = true
            }
        }
    )(navigator.userAgent || navigator.vendor || window.opera);
    if (!window._waf_async_initialized) {
        window._waf_async_initialized = true;
        var _waf_functions = {
            block_list: [],
            oldXML: {},
            block_show_flag: false,
            test: 0,
            getElementsByClassName: function (fatherId, tagName, className) {
                node = fatherId && document.getElementById(fatherId) || document;
                tagName = tagName || "*";
                className = className.split(" ");
                var classNameLength = className.length;
                for (var i = 0, j = classNameLength; i < j; i++) {
                    className[i] = new RegExp("(^|\\s)" + className[i].replace(/\-/g, "\\-") + "(\\s|$)")
                }
                var elements = node.getElementsByTagName(tagName);
                var result = [];
                for (var i = 0, j = elements.length, k = 0; i < j; i++) {
                    var element = elements[i];
                    while (className[k++].test(element.className)) {
                        if (k === classNameLength) {
                            result[result.length] = element;
                            break
                        }
                    }
                    k = 0
                }
                return result
            },
            domReady: (function (ready) {
                    var fns = [], fn, f = false, doc = document, testEl = doc.documentElement, hack = testEl.doScroll,
                        domContentLoaded = "DOMContentLoaded", addEventListener = "addEventListener",
                        onreadystatechange = "onreadystatechange", readyState = "readyState",
                        loadedRgx = hack ? /^loaded|^c/ : /^loaded|c/, loaded = loadedRgx.test(doc[readyState]);

                    function flush(f) {
                        loaded = 1;
                        while (f = fns.shift()) {
                            f()
                        }
                    }

                    doc[addEventListener] && doc[addEventListener](domContentLoaded, fn = function () {
                            doc.removeEventListener(domContentLoaded, fn, f);
                            flush()
                        }
                        , f);
                    hack && doc.attachEvent(onreadystatechange, fn = function () {
                            if (/^c/.test(doc[readyState])) {
                                doc.detachEvent(onreadystatechange, fn);
                                flush()
                            }
                        }
                    );
                    return (ready = hack ? function (fn) {
                                self != top ? loaded ? fn() : fns.push(fn) : function () {
                                    try {
                                        testEl.doScroll("left")
                                    } catch (e) {
                                        return setTimeout(function () {
                                            ready(fn)
                                        }, 50)
                                    }
                                    fn()
                                }()
                            }
                            : function (fn) {
                                loaded ? fn() : fns.push(fn)
                            }
                    )
                }
            )(),
            hookJSONP: function () {
                var index = 0;
                var self = this;

                function jsonpFactory(oldFn, key) {
                    return function () {
                        var script = arguments[0];
                        if (script.tagName && script.tagName.toUpperCase() === "SCRIPT") {
                            var url = self.parseURL(script.src);
                            var old_src = script.src;
                            var parsedSearch = self.parseQuery(url.search);
                            if (self.isConfigUrl(url)) {
                                var cbName = "ua_waf_cb_" + index;
                                window[cbName] = createHackCb(script, cbName);
                                var addData = parsedSearch.u_asession ? {
                                    u_acb: cbName
                                } : {
                                    u_atype: 3,
                                    u_asec: getUA(),
                                    u_acb: cbName
                                };
                                url.search = self.addQuery(url.search, addData);
                                script.src = self.combineUrl(url);
                                script.old_src = old_src;
                                index++;
                                self.resetUA()
                            }
                        }
                        if (this.tagName.toUpperCase() === "BODY" && _waf_body_copy.tagName.toUpperCase() === "BODY") {
                            var result = self.$directApply(_waf_body_copy, "_waf_old_" + key, arguments);
                            return result
                        }
                        var result = self.$apply(this, oldFn, arguments);
                        return result
                    }
                }

                function createHackCb(script, cbName) {
                    return function (data) {
                        if (data && data.u_astatus) {
                            self.showBlock(data.token);
                            self.block_list.push({
                                type: "jsonp",
                                which: "captcha",
                                script: script,
                                onload: script.onload,
                                onreadystatechange: script.onreadystatechange,
                                callbackName: cbName
                            })
                        }
                        script.onload = script.onreadystatechange = null
                    }
                }

                var head = document.head || document.getElementsByTagName("head")[0];
                self.hook(document.body, "appendChild", jsonpFactory);
                self.hook(document.body, "insertBefore", jsonpFactory);
                self.hook(head, "appendChild", jsonpFactory);
                self.hook(head, "insertBefore", jsonpFactory)
            },
            syncStatus: function (xhr, copy) {
                try {
                    var syncList = ["readyState", "response", "responseText", "responseXML", "status", "upload", "statusText", "DONE", "UNSENT", "OPENED", "LOADING", "HEADERS_RECEIVED"];
                    for (var i = 0; i < syncList.length; i++) {
                        var name = syncList[i];
                        try {
                            copy[name] = xhr[name]
                        } catch (e) {
                        }
                    }
                    if (copy["timeout"] !== undefined) {
                        xhr["timeout"] = copy["timeout"]
                    } else {
                        copy["timeout"] = xhr["timeout"]
                    }
                    if (copy["responseType"] !== undefined) {
                        xhr["responseType"] = copy["responseType"]
                    } else {
                        copy["responseType"] = xhr["responseType"]
                    }
                    if (copy["withCredentials"] !== undefined) {
                        xhr["withCredentials"] = copy["withCredentials"]
                    } else {
                        copy["withCredentials"] = xhr["withCredentials"]
                    }
                    var needReplace = ["getResponseHeader", "getAllResponseHeaders"];
                    for (var i = 0; i < needReplace.length; i++) {
                        var name = needReplace[i];
                        copy[name] = (function (fnName) {
                                return function (e) {
                                    return _waf_functions.$apply(xhr, xhr[fnName], arguments)
                                }
                            }
                        )(name)
                    }
                } catch (e) {
                }
            },
            hookXHR: function () {
                if (XMLHttpRequest) {
                    oldXML = window.XMLHttpRequest;
                    XMLHttpRequest = this.hookXMLHttpRequest
                }
            },
            addPostData: function (oldData, addData) {
                var data = oldData ? ("?" + oldData) : "";
                data = this.addQuery(data, addData);
                data = data.substr(1);
                return data
            },
            hookXMLHttpRequest: function () {
                var originXHR = new oldXML();
                var hookXHR = this;
                _wrapNativeFn(originXHR, this);
                _bindEvent(originXHR, hookXHR);
                _waf_functions.syncStatus(originXHR, hookXHR);
                originXHR.onreadystatechange = function (e) {
                    _waf_functions.syncStatus(originXHR, hookXHR);
                    if (originXHR.readyState === 4 && originXHR.status === 200) {
                        try {
                            var result = originXHR.responseText;
                            result = JSON.parse(result)
                        } catch (e) {
                        }
                        if (result && (typeof result) === "string" && result.indexOf('appkey: "CF_APP_WAF", // \u5e94\u7528\u6807\u8bc6') > -1) {
                            hookXHR.id = _waf_functions.test++;
                            _waf_functions.block_list.push({
                                type: "xhr",
                                which: "captcha",
                                oldXHR: hookXHR
                            });
                            var nc_token = "0b72f618-4c1-4aba-9a78-f" + (new Date()).getTime() + "ba";
                            var cptLang = "cn";
                            if (result.indexOf('language: "en",//语言包，默认中文') > -1 && result.indexOf('language: "en", //语言包，默认中文') > -1) {
                                cptLang = "en"
                            }
                            _waf_functions.showBlock(nc_token, cptLang);
                            return
                        } else {
                            if (result && (typeof result) === "string" && result.indexOf("acw_sc__v2") > -1) {
                                hookXHR.id = _waf_functions.test++;
                                _waf_functions.block_list.push({
                                    type: "xhr",
                                    which: "jsclg",
                                    oldXHR: hookXHR
                                });
                                var arg1 = result.split("var arg1='")[1].split("';")[0];
                                _waf_functions._0x4818(arg1);
                                _waf_functions.hideBlock(null);
                                return
                            }
                        }
                    }
                    if (hookXHR.onreadystatechange) {
                        hookXHR.onreadystatechange.call(hookXHR, e)
                    }
                }
                ;
                originXHR.onload = function (e) {
                    _waf_functions.syncStatus(originXHR, hookXHR);
                    if (originXHR.readyState === 4 && originXHR.status === 200) {
                        try {
                            var result = originXHR.responseText;
                            result = JSON.parse(result)
                        } catch (e) {
                        }
                        if (result && (typeof result) === "string" && result.indexOf('appkey: "CF_APP_WAF", // \u5e94\u7528\u6807\u8bc6') > -1) {
                            return
                        } else {
                            if (result && (typeof result) === "string" && result.indexOf("acw_sc__v2") > -1) {
                                return
                            }
                        }
                    }
                    if (hookXHR.onload) {
                        hookXHR.onload.call(hookXHR, e)
                    }
                }
                ;
                hookXHR.open = function (method, url, async, username, password) {
                    this._url = url;
                    var is_async = (async === false ? false : true);
                    var parsedUrl = _waf_functions.parseURL(url);
                    var parsedSearch = _waf_functions.parseQuery(parsedUrl.search);
                    if (originXHR.open.call) {
                        if (username) {
                            originXHR.open.call(originXHR, method, url, is_async, username, password)
                        } else {
                            originXHR.open.call(originXHR, method, url, is_async)
                        }
                    } else {
                        if (username) {
                            originXHR.open(method, url, is_async, username, password)
                        } else {
                            originXHR.open(method, url, is_async)
                        }
                    }
                    this._method = method;
                    this._parsedUrl = parsedUrl;
                    this._parsedSearch = parsedSearch;
                    this._username = username;
                    this._password = password
                }
                ;
                hookXHR.send = function (data) {
                    _waf_functions.syncStatus(originXHR, hookXHR);
                    var parsedData = _waf_functions.parseQuery(data ? "?" + data : "");
                    this._sendData = data;
                    if (originXHR.send.call) {
                        originXHR.send.call(originXHR, data)
                    } else {
                        originXHR.send(data)
                    }
                }
                ;
                hookXHR.setRequestHeader = function (header, value) {
                    this._header = this._header || {};
                    var tmp_header = this._header[header];
                    if (tmp_header != null && (tmp_header.indexOf("application/json") > -1 || tmp_header.indexOf("multipart/form-data") > -1 || tmp_header.indexOf(value) > -1)) {
                        return
                    }
                    this._header[header] = value;
                    if (originXHR.setRequestHeader.call) {
                        originXHR.setRequestHeader.call(originXHR, header, value)
                    } else {
                        originXHR.setRequestHeader(header, value)
                    }
                }
                ;

                function _wrapNativeFn(xhr, copy) {
                    var fnNames = ["abort", "overrideMimeType", "dispatchEvent", "removeEventListener"];
                    for (var i = 0; i < fnNames.length; i++) {
                        var name = fnNames[i];
                        copy[name] = (function (fnName) {
                                return function () {
                                    return _waf_functions.$apply(xhr, xhr[fnName], arguments)
                                }
                            }
                        )(name)
                    }
                    copy["addEventListener"] = function (event, cb) {
                        copy["on" + event] = cb
                    }
                }

                function _bindEvent(xhr, copy) {
                    var evnets = ["onloadend", "ontimeout", "onerror", "onabort", "onprogress", "onloadstart"];
                    for (var i = 0; i < evnets.length; i++) {
                        var name = evnets[i];
                        xhr[name] = (function (eventName) {
                                return function (e) {
                                    if (copy[eventName]) {
                                        if (copy[eventName].call) {
                                            copy[eventName].call(copy, e)
                                        } else {
                                            copy[eventName](e)
                                        }
                                    }
                                }
                            }
                        )(name)
                    }
                }
            },
            hookFetch: function () {
                if (!window.fetch) {
                    return
                }
                var _fetch = fetch;
                window.fetch = function () {
                    var url = arguments[0];
                    var parsedUrl = _waf_functions.parseURL(url);
                    var parsedSearch = _waf_functions.parseQuery(parsedUrl.search);
                    var param = arguments[1];
                    return _fetch.apply(this, arguments).then(function (response) {
                        return new Promise(function (resolve, reject) {
                                if (response.status != 200) {
                                    resolve(response)
                                }
                                response.clone().text().then(function (data) {
                                    if (data.indexOf('appkey: "CF_APP_WAF", // \u5e94\u7528\u6807\u8bc6') > -1) {
                                        _waf_functions.block_list.push({
                                            type: "fetch",
                                            which: "captcha",
                                            originUrl: url,
                                            originParam: param,
                                            successCb: function (response) {
                                                resolve(response)
                                            }
                                        });
                                        var nc_token = "0b72f618-4c1-4aba-9a78-f" + (new Date()).getTime() + "ba";
                                        var cptLang = "cn";
                                        if (data.indexOf('language: "en",//语言包，默认中文') > -1 && data.indexOf('language: "en", //语言包，默认中文') > -1) {
                                            cptLang = "en"
                                        }
                                        _waf_functions.showBlock(nc_token, cptLang)
                                    } else {
                                        if (data.indexOf("acw_sc__v2") > -1) {
                                            _waf_functions.block_list.push({
                                                type: "fetch",
                                                which: "jsclg",
                                                originUrl: url,
                                                originParam: param,
                                                successCb: function (response) {
                                                    resolve(response)
                                                }
                                            });
                                            var arg1 = data.split("var arg1='")[1].split("';")[0];
                                            _waf_functions._0x4818(arg1);
                                            _waf_functions.hideBlock(null)
                                        } else {
                                            resolve(response)
                                        }
                                    }
                                })["catch"](function (e) {
                                    resolve(response)
                                })
                            }
                        )
                    })["catch"](function (e) {
                        return Promise.reject(e)
                    })
                }
            },
            hook: function (obj, key, factory) {
                if (!obj[key]) {
                    return false
                }
                var oldFn = obj[key];
                obj["_waf_old_" + key] = oldFn;
                obj[key] = factory(oldFn, key)
            },
            eventHandler: function (ele, event, cb) {
                if (document.addEventListener) {
                    ele.addEventListener(event, cb, true)
                } else {
                    ele.attachEvent("on" + event, cb)
                }
            },
            isConfigUrl: function (parsedUrl) {
                var i = 0;
                var testUrl = parsedUrl.original;
                var Url_host = testUrl.split("?")[0];
                if (testUrl.split("?").length === 2) {
                    var Url_param = testUrl.split("?")[1]
                } else {
                    var Url_param = null
                }
                for (i; i < this.HOOK_LIST.length; i++) {
                    if (this.HOOK_LIST[i].split("/*").length === 2) {
                        if (Url_host.indexOf(this.HOOK_LIST[i].split("/*")[0] + "/") > -1) {
                            return true
                        }
                    }
                    if (this.HOOK_LIST[i].split("?").length === 2) {
                        if (this.HOOK_LIST[i].split("?")[0] === Url_host && Url_param != null && Url_param.indexOf(this.HOOK_LIST[i].split("?")[1]) > -1) {
                            return true
                        }
                    }
                    if (Url_host[Url_host.length - 1] === "/") {
                        Url_host = Url_host.substr(0, Url_host.length - 1)
                    }
                    if (Url_host === this.HOOK_LIST[i]) {
                        return true
                    }
                }
                return false
            },
            mockVerify: function (data) {
                var result = {
                    u_atoken: data.token,
                    u_asession: data.csessionid,
                    u_asig: data.sig
                };
                this.hideBlock(result)
            },
            showBlock: function (token, cptLang) {
                var self = this;
                var NC_Opt;
                if (self.block_show_flag) {
                    return
                }
                self.block_show_flag = true;
                _waf_functions.initSlideDom();
                if (_waf_is_mobile) {
                    NC_Opt = {
                        renderTo: "#nocaptcha",
                        appkey: "CF_APP_WAF",
                        token: token,
                        is_Opt: "",
                        language: cptLang,
                        isEnabled: true,
                        inline: true,
                        bannerHidden: false,
                        times: 3,
                        scene: "register_h5",
                        trans: {
                            "key1": "code100",
                            "user": "default",
                            "aysnc": "1"
                        },
                        callback: function (data) {
                            if (data.token === undefined) {
                                data.token = token
                            }
                            self.mockVerify(data)
                        },
                        error: function (s) {
                        },
                        umidServer: "r"
                    }
                } else {
                    NC_Opt = {
                        renderTo: "nocaptcha",
                        cssUrl: "//g.alicdn.com/sd/ncpc/nc.css",
                        appkey: "CF_APP_WAF",
                        token: token,
                        trans: {
                            "key1": "code100",
                            "user": "default",
                            "aysnc": "1"
                        },
                        is_Opt: "",
                        language: cptLang,
                        isEnabled: true,
                        times: 3,
                        scene: "register",
                        callback: function (data) {
                            var wrapper = document.getElementById("WAF_NC_WRAPPER");
                            wrapper.style.height = "260px";
                            self.mockVerify(data)
                        },
                        error: function (s) {
                        },
                        umidServer: "r"
                    }
                }

                function initNC() {
                    if (_waf_is_mobile) {
                        NoCaptcha.init(NC_Opt);
                        NoCaptcha.setEnabled(true)
                    } else {
                        var nc = new noCaptcha(NC_Opt);
                        nc.on("afterverify", function () {
                            var wrapper = document.getElementById("WAF_NC_WRAPPER");
                            if (_waf_functions.getElementsByClassName("WAF_NC_WRAPPER", "div", "clickCaptcha").length > 0) {
                                wrapper.style.height = "450px"
                            }
                        })
                    }
                }

                function showNC() {
                    setTimeout(function () {
                        if (document.getElementById("waf_nc_block")) {
                            document.getElementById("waf_nc_block").style.display = "block";
                            if (cptLang == "en") {
                                if (document.getElementsByClassName("waf-nc-h5-description").length > 0) {
                                    document.getElementsByClassName("waf-nc-h5-description")[0].innerText = "Please slide to verify that you're not a robot"
                                }
                                if (document.getElementsByClassName("waf-nc-description").length > 0) {
                                    document.getElementsByClassName("waf-nc-description")[0].innerText = "Please slide to verify that you're not a robot！"
                                }
                            }
                            if (_waf_is_mobile && window.NoCaptcha || window.noCaptcha) {
                                initNC()
                            } else {
                                var script = document.createElement("script");
                                var time = new Date;
                                var head = document.head || document.getElementsByTagName("head")[0];
                                if (_waf_is_mobile) {
                                    script.src = "//g.alicdn.com/sd/nch5/index.js?t=" + (time.getFullYear() + (time.getMonth() + 1) + time.getDate() + time.getHours())
                                } else {
                                    script.src = "//g.alicdn.com/sd/ncpc/nc.js?t=" + (time.getFullYear() + (time.getMonth() + 1) + time.getDate() + time.getHours())
                                }
                                if ("onload" in script) {
                                    script.onload = function () {
                                        initNC()
                                    }
                                } else {
                                    script.onreadystatechange = function () {
                                        if (/loaded|complete/.test(script.readyState)) {
                                            initNC()
                                        }
                                    }
                                }
                                head.appendChild(script)
                            }
                        } else {
                            showNC()
                        }
                    }, 500)
                }

                showNC()
            },
            hideBlock: function (result) {
                var self = this;
                if (document.getElementById("waf_nc_block")) {
                    document.getElementById("waf_nc_block").style.display = "none"
                }
                for (var i = 0; i < self.block_list.length; i++) {
                    var block = self.block_list[i];
                    if (block.type === "jsonp") {
                        var script = document.createElement("script");
                        script.onload = script.onreadystatechange = function () {
                            if ((!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                                script.onload = script.onreadystatechange = null;
                                block.onload && block.onload.call(script)
                            }
                        }
                        ;
                        var blockSrc = block.script.old_src;
                        var parsedBlock = self.parseURL(blockSrc);
                        parsedBlock.search = self.addQuery(parsedBlock.search, {
                            u_atype: 7,
                            u_atoken: result.u_atoken,
                            u_asession: result.u_asession,
                            u_asig: result.u_asig
                        });
                        script.src = self.combineUrl(parsedBlock);
                        document.body.appendChild(script);
                        try {
                            delete (window[block.callbackName])
                        } catch (e) {
                        }
                    } else {
                        if (block.type === "xhr") {
                            var xhr = new XMLHttpRequest();
                            var hookXHR = block.oldXHR;
                            var url = hookXHR._url;
                            var method = hookXHR._method;
                            var is_async = hookXHR._is_async;
                            var username = hookXHR._username;
                            var password = hookXHR._password;
                            var data = hookXHR._sendData;
                            if (block.which === "captcha") {
                                var parsedUrl = self.parseURL(url);
                                parsedUrl.search = self.addQuery(parsedUrl.search, {
                                    u_atoken: result.u_atoken,
                                    u_asession: result.u_asession,
                                    u_asig: result.u_asig,
                                    u_aref: "123"
                                });
                                url = self.combineUrl(parsedUrl)
                            }
                            if (hookXHR.onload) {
                                xhr.onload = hookXHR.onload
                            }
                            if (username) {
                                xhr.open(method, url, is_async, username, password)
                            } else {
                                xhr.open(method, url, is_async)
                            }
                            for (var k in hookXHR._header) {
                                var head = hookXHR._header[k];
                                xhr.setRequestHeader(k, head)
                            }
                            if (hookXHR.withCredentials) {
                                xhr.withCredentials = true
                            }
                            xhr.send(data);
                            xhr.onreadystatechange = (function (xhr, hookXHR) {
                                    return function (e) {
                                        self.syncStatus(xhr, hookXHR);
                                        if (hookXHR.onreadystatechange) {
                                            hookXHR.onreadystatechange.call(hookXHR, e)
                                        }
                                    }
                                }
                            )(xhr, hookXHR)
                        } else {
                            if (block.type === "fetch") {
                                var url = block.originUrl
                                    , param = block.originParam;
                                if (block.which === "captcha") {
                                    var parsedUrl = self.parseURL(url);
                                    parsedUrl.search = self.addQuery(parsedUrl.search, {
                                        u_atoken: result.u_atoken,
                                        u_asession: result.u_asession,
                                        u_asig: result.u_asig,
                                        u_aref: "123"
                                    });
                                    url = self.combineUrl(parsedUrl)
                                }
                                fetch(url, param).then(function (response) {
                                    if (response.status >= 200 && response.status < 300) {
                                        block.successCb(response)
                                    }
                                })["catch"](function (e) {
                                })
                            }
                        }
                    }
                }
                self.block_list = [];
                self.block_show_flag = false
            },
            absolute: function (base, relative) {
                var stack = base.split("/")
                    , parts = relative.split("/");
                stack.pop();
                for (var i = 0; i < parts.length; i++) {
                    if (parts[i] == ".") {
                        continue
                    }
                    if (parts[i] == "..") {
                        stack.pop()
                    } else {
                        stack.push(parts[i])
                    }
                }
                return stack.join("/")
            },
            parseURL: function (url) {
                var div = document.createElement("div"), parser;
                div.innerHTML = "<a></a>";
                div.firstChild.href = url;
                div.innerHTML = div.innerHTML;
                parser = div.firstChild;
                parser.href = div.firstChild.href;
                return {
                    protocol: parser.protocol,
                    host: parser.host,
                    hostname: parser.hostname,
                    port: parser.port,
                    pathname: parser.pathname.substr(0, 1) === "/" ? parser.pathname : "/" + parser.pathname,
                    search: parser.search,
                    hash: parser.hash,
                    original: parser.href
                }
            },
            combineUrl: function (parsedUrl) {
                return parsedUrl.protocol + "//" + parsedUrl.host + parsedUrl.pathname + parsedUrl.search + parsedUrl.hash
            },
            parseQuery: function (qstr) {
                if (qstr.charAt(0) != "?") {
                    return {}
                }
                var query = {};
                var a = qstr.substr(1).split("&");
                for (var i = 0; i < a.length; i++) {
                    var b = a[i].split("=");
                    try {
                        query[decodeURIComponent(b[0])] = decodeURIComponent(b[1] || "")
                    } catch (e) {
                        query[decodeURIComponent(b[0] && b[0].replace(/\%/g, "%25"))] = decodeURIComponent(b[1] && b[1].replace(/\%/g, "%25") || "")
                    }
                }
                return query
            },
            addQuery: function (query, data) {
                var qdata = this.parseQuery(query);
                var rt = "?";
                for (var i in data) {
                    qdata[i] = data[i]
                }
                for (var i in qdata) {
                    rt += encodeURIComponent(i) + "=" + encodeURIComponent(qdata[i]) + "&"
                }
                rt = rt.substr(0, rt.length - 1);
                return rt
            },
            parseResponse: function (XHR) {
            },
            isInArray: function (arr, str) {
                for (var i = 0; i < arr.length; i++) {
                    if (str.indexOf(arr[i]) >= 0) {
                        return true
                    }
                }
                return false
            },
            $apply: function (thiz, fn, $) {
                if ("apply" in fn) {
                    try {
                        return fn.apply(thiz, $)
                    } catch (e) {
                    }
                }
                switch ($.length) {
                    case 0:
                        return fn();
                    case 1:
                        return fn($[0]);
                    case 2:
                        return fn($[0], $[1]);
                    case 3:
                        return fn($[0], $[1], $[2]);
                    default:
                        return fn($[0], $[1], $[2], $[3])
                }
            },
            $directApply: function (obj, key, $) {
                switch ($.length) {
                    case 0:
                        return obj[key]();
                    case 1:
                        return obj[key]($[0]);
                    case 2:
                        return obj[key]($[0], $[1]);
                    case 3:
                        return obj[key]($[0], $[1], $[2]);
                    default:
                        return obj[key]($[0], $[1], $[2], $[3])
                }
            },
            initSlide: function () {
                var html, css;
                if (_waf_is_mobile) {
                    html = '<div id="waf_nc_block"style="display: none;"><div class="waf-nc-h5-mask"></div><div id="WAF_NC_WRAPPER"class="waf-nc-h5-wrapper"><div class="waf-nc-h5-panel"><img class="waf-nc-h5-icon"src="//aeu.alicdn.com/waf/alicloudicon.png"alt=""height="30"width="30"><div class="waf-nc-h5-description">\u4e3a\u4e86\u60a8\u7684\u64cd\u4f5c\u5b89\u5168\uff0c\u8bf7\u5b8c\u6210\u4ee5\u4e0b\u9a8c\u8bc1</div></div><hr class="waf-nc-h5-hr"><div id="nocaptcha"class="nc-container"data-nc-idx="1"></div></div></div>';
                    var getInitialScaleCss = function () {
                        try {
                            var viewport = document.getElementsByName("viewport");
                            if (viewport && viewport.length == 1 && viewport[0].content && viewport[0].content.indexOf("initial-scale") != -1) {
                                viewport = viewport[0].content.replace(/\s+/g, "");
                                initialScale = parseFloat(viewport.split("initial-scale=")[1].split(",")[0]);
                                if (initialScale == 0) {
                                    return 1
                                }
                                return 1 / initialScale
                            }
                            return 1
                        } catch (e) {
                            return 1
                        }
                    };
                    var b = getInitialScaleCss();
                    css = "#waf_nc_block{position:fixed;_position:absolute;width:100%;height:100%;top:0;bottom:0;left:0;z-index:99999}.waf-nc-h5-mask{background:#777;opacity:0.5;filter:alpha(opacity=50);width:100%;height:100%}.waf-nc-h5-wrapper{width:94%;position:absolute;top:50%;left:50%;margin-top:-20%;margin-left:-47%;padding:5% 1%;background:#ffffff;border-radius:" + (9 * b) + "px;box-sizing:border-box}.waf-nc-h5-panel{width:100%}.waf-nc-h5-icon{display:inline-block;margin-right:3%;margin-left:2%;width:18%;height:18%;line-height:12%;vertical-align:top}.waf-nc-h5-description{width:70%;display:inline-block;font-size:" + (15 * b) + "px;}.waf-nc-h5-hr{border:none;border-bottom:1px solid #ccc;margin:0.5em;}._nc .stage1{height:" + (55 * b) + "px !important;}._nc .stage1 .slider{height:" + (52 * b) + "px !important;box-shadow:0 0 3px #999 !important;}._nc .stage1 .track div{height:" + (52 * b) + "px !important;}._nc .stage1 .label{height:" + (52 * b) + "px !important;font-size:" + (16 * b) + "px !important;line-height:" + (17 * b) + "px !important;margin-top:" + (16 * b) + "px !important;}._nc .stage1 .bg-green{font-size:" + (16 * b) + "px !important;}._nc .stage1 .button{width:" + (52 * b) + "px !important;height:" + (52 * b) + "px !important;}._nc .icon-slide-arrow{font-size:" + (30 * b) + "px !important;}._nc .icon-ok{font-size:" + (30 * b) + "px !important;}._nc .stage1 .icon{margin-top:" + (10 * b) + "px !important;}._nc .stage3 .title{font-size:" + (20 * b) + "px !important;}._nc .stage3 .menu .label{position:relative;font-size:" + (16 * b) + "px !important;height:" + (32 * b) + "px !important;line-height:" + (32 * b) + "px !important;}._nc .stage3 .menu .icon{font-size:" + (30 * b) + "px !important;margin-right:" + (20 * b) + "px !important;}._nc .stage3 .menu.refresh .icon{background-position:" + (-128 * b) + "px 0 !important;}._nc .stage3 .menu.feedback .icon{background-position:" + (-160 * b) + "px 0 !important;}._nc .stage3 .menu.refresh{border-right:2px solid #ccc !important;}"
                } else {
                    html = '<div id="waf_nc_block"style="display: none;"><div class="waf-nc-mask"></div><div id="WAF_NC_WRAPPER"class="waf-nc-wrapper"><img class="waf-nc-icon"src="//g.alicdn.com/sd-base/static/1.0.10/image/nocapture/robot.png"alt=""height="111"width="150"><p class="waf-nc-description">\u4e3a\u4fdd\u8bc1\u60a8\u7684\u6b63\u5e38\u8bbf\u95ee\uff0c\u8bf7\u8fdb\u884c\u5982\u4e0b\u9a8c\u8bc1\uff1a</p><div id="nocaptcha"></div></div></div></div>';
                    css = "#waf_nc_block {position: fixed;_position: absolute;width: 100%;height: 100%;top: 0;bottom: 0;left: 0;z-index: 99999;}.waf-nc-mask {background: #f8f8f8;opacity: 0.5;filter:alpha(opacity=50); width: 100%;height: 100%;} .waf-nc-wrapper {width:480px; height:254px; position: absolute; top: 50%; left: 50%; margin-top: -127px; margin-left: -240px; margin-bottom: 16px; background:#ffffff; border:3px solid #00A2CA;} .waf-nc-icon {position: absolute;top: 60px;left: 20px;} .waf-nc-title {margin-top: 23px; margin-left: 47px; font-size:16px; color:#333333; line-height:10px; text-align:left;} .waf-nc-splitter {margin-left: 26px; margin-top: 5px; width:430px; height:0px; border:1px solid #f4f4f4; } .waf-nc-description { margin-top: 70px; margin-left: 170px; font-size:12px; color:#333333; text-align: left; } #nocaptcha { margin-top: 40px; margin-left: 150px; width:300px; height36px;}"
                }
                var div = document.createElement("div");
                var style = document.createElement("style");
                style.type = "text/css";
                div.innerHTML = html;
                try {
                    style.appendChild(document.createTextNode(css))
                } catch (e) {
                    style.styleSheet.cssText = css
                }
                document.body.appendChild(div.firstChild);
                var head = document.head || document.getElementsByTagName("head")[0];
                head.appendChild(style)
            },
            initSlideDom: function () {
                if (document.getElementById("waf_nc_block")) {
                    return
                }
                var html, css;
                if (_waf_is_mobile) {
                    html = '<div id="waf_nc_block"style="display: none;"><div class="waf-nc-h5-mask"></div><div id="WAF_NC_WRAPPER"class="waf-nc-h5-wrapper"><div class="waf-nc-h5-panel"><img class="waf-nc-h5-icon"src="//aeu.alicdn.com/waf/alicloudicon.png"alt=""height="30"width="30"><div class="waf-nc-h5-description">\u4e3a\u4e86\u60a8\u7684\u64cd\u4f5c\u5b89\u5168\uff0c\u8bf7\u5b8c\u6210\u4ee5\u4e0b\u9a8c\u8bc1</div></div><hr class="waf-nc-h5-hr"><div id="nocaptcha"class="nc-container"data-nc-idx="1"></div></div></div>'
                } else {
                    html = '<div id="waf_nc_block"style="display: none;"><div class="waf-nc-mask"></div><div id="WAF_NC_WRAPPER"class="waf-nc-wrapper"><img class="waf-nc-icon"src="//g.alicdn.com/sd-base/static/1.0.10/image/nocapture/robot.png"alt=""height="111"width="150"><p class="waf-nc-description">\u4e3a\u4fdd\u8bc1\u60a8\u7684\u6b63\u5e38\u8bbf\u95ee\uff0c\u8bf7\u8fdb\u884c\u5982\u4e0b\u9a8c\u8bc1\uff1a</p><div id="nocaptcha"></div></div></div></div>'
                }
                var div = document.createElement("div");
                div.innerHTML = html;
                document.body.appendChild(div.firstChild)
            },
            _0x4818: function (arg1) {
                var _0x3e9e = ["c3BsaXQ=", "c2xpY2U=", "dG9TdHJpbmc=", "c2V0VGltZQ==", "Z2V0VGltZQ==", "Y29va2ll", "YWN3X3NjX192Mj0=", "O2V4cGlyZXM9", "dG9HTVRTdHJpbmc=", "O21heC1hZ2U9MzYwMDtwYXRoPS8=", "MzAwMDE3NjAwMDg1NjAwNjA2MTUwMTUzMzAwMzY5MDAyNzgwMDM3NQ==", "bGVuZ3Ro", "am9pbg==", "MXw0fDN8MHwy"];
                (function (_0x2d8f05, _0x4b81bb) {
                    var _0x4d74cb = function (_0x32719f) {
                        while (--_0x32719f) {
                            _0x2d8f05["push"](_0x2d8f05["shift"]())
                        }
                    };
                    var _0x33748d = function () {
                        var _0x3e4c21 = {
                            "data": {
                                "key": "cookie",
                                "value": "timeout"
                            },
                            "setCookie": function (_0x5c685e, _0x3e3156, _0x1e9e81, _0x292610) {
                                _0x292610 = _0x292610 || {};
                                var _0x151bd2 = _0x3e3156 + "=" + _0x1e9e81;
                                var _0x558098 = 0;
                                for (var _0x558098 = 0, _0x230f38 = _0x5c685e["length"]; _0x558098 < _0x230f38; _0x558098++) {
                                    var _0x948b6c = _0x5c685e[_0x558098];
                                    _0x151bd2 += ";\x20" + _0x948b6c;
                                    var _0x29929c = _0x5c685e[_0x948b6c];
                                    _0x5c685e["push"](_0x29929c);
                                    _0x230f38 = _0x5c685e["length"];
                                    if (_0x29929c !== !![]) {
                                        _0x151bd2 += "=" + _0x29929c
                                    }
                                }
                                _0x292610["cookie"] = _0x151bd2
                            },
                            "removeCookie": function () {
                                return "dev"
                            },
                            "getCookie": function (_0x5dd881, _0x550fbc) {
                                _0x5dd881 = _0x5dd881 || function (_0x18d5c9) {
                                    return _0x18d5c9
                                }
                                ;
                                var _0x4ce2f1 = _0x5dd881(new RegExp("(?:^|;\x20)" + _0x550fbc["replace"](/([.$?*|{}()[]\/+^])/g, "$1") + "=([^;]*)"));
                                var _0x333808 = function (_0x432180, _0x2ab90b) {
                                    _0x432180(++_0x2ab90b)
                                };
                                _0x333808(_0x4d74cb, _0x4b81bb);
                                return _0x4ce2f1 ? decodeURIComponent(_0x4ce2f1[1]) : undefined
                            }
                        };
                        var _0x991246 = function () {
                            var _0x981158 = new RegExp("\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*[\x27|\x22].+[\x27|\x22];?\x20*}");
                            return _0x981158["test"](_0x3e4c21["removeCookie"]["toString"]())
                        };
                        _0x3e4c21["updateCookie"] = _0x991246;
                        var _0x57b080 = "";
                        var _0x219af0 = _0x3e4c21["updateCookie"]();
                        if (!_0x219af0) {
                            _0x3e4c21["setCookie"](["*"], "counter", 1)
                        } else {
                            if (_0x219af0) {
                                _0x57b080 = _0x3e4c21["getCookie"](null, "counter")
                            } else {
                                _0x3e4c21["removeCookie"]()
                            }
                        }
                    };
                    _0x33748d()
                }(_0x3e9e, 374));
                var _0x1e8e = function (_0x558645, _0x3571ed) {
                    _0x558645 = _0x558645 - 0;
                    var _0x23d32b = _0x3e9e[_0x558645];
                    if (_0x1e8e["jweSQB"] === undefined) {
                        (function () {
                            var _0x2a4aae;
                            try {
                                var _0x1ac753 = Function("return\x20(function()\x20" + "{}.constructor(\x22return\x20this\x22)(\x20)" + ");");
                                _0x2a4aae = _0x1ac753()
                            } catch (_0x267ba9) {
                                _0x2a4aae = window
                            }
                            var _0x22c6cf = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
                            _0x2a4aae["atob"] || (_0x2a4aae["atob"] = function (_0xb01b66) {
                                    var _0x112e38 = String(_0xb01b66)["replace"](/=+$/, "");
                                    for (var _0x315811 = 0, _0x196945, _0x8ee65b, _0x111e6b = 0, _0x2a5e7f = ""; _0x8ee65b = _0x112e38["charAt"](_0x111e6b++); ~_0x8ee65b && (_0x196945 = _0x315811 % 4 ? _0x196945 * 64 + _0x8ee65b : _0x8ee65b,
                                    _0x315811++ % 4) ? _0x2a5e7f += String["fromCharCode"](255 & _0x196945 >> (-2 * _0x315811 & 6)) : 0) {
                                        _0x8ee65b = _0x22c6cf["indexOf"](_0x8ee65b)
                                    }
                                    return _0x2a5e7f
                                }
                            )
                        }());
                        _0x1e8e["VidPVs"] = function (_0x539abf) {
                            var _0x126fa5 = atob(_0x539abf);
                            var _0x54d768 = [];
                            for (var _0x3d3645 = 0, _0x4289fc = _0x126fa5["length"]; _0x3d3645 < _0x4289fc; _0x3d3645++) {
                                _0x54d768 += "%" + ("00" + _0x126fa5["charCodeAt"](_0x3d3645)["toString"](16))["slice"](-2)
                            }
                            return decodeURIComponent(_0x54d768)
                        }
                        ;
                        _0x1e8e["BXvRsu"] = {};
                        _0x1e8e["jweSQB"] = !![]
                    }
                    var _0x436197 = _0x1e8e["BXvRsu"][_0x558645];
                    if (_0x436197 === undefined) {
                        var _0x4f4121 = function (_0x5e2adc) {
                            this["nlcXFw"] = _0x5e2adc;
                            this["HAmvBE"] = [1, 0, 0];
                            this["YFWLey"] = function () {
                                return "newState"
                            }
                            ;
                            this["YpNXEl"] = "\x5cw+\x20*\x5c(\x5c)\x20*{\x5cw+\x20*";
                            this["JsKhOp"] = "[\x27|\x22].+[\x27|\x22];?\x20*}"
                        };
                        _0x4f4121["prototype"]["pzRiIQ"] = function () {
                            var _0x3e581e = new RegExp(this["YpNXEl"] + this["JsKhOp"]);
                            var _0x13a005 = _0x3e581e["test"](this["YFWLey"]["toString"]()) ? --this["HAmvBE"][1] : --this["HAmvBE"][0];
                            return this["gaiPha"](_0x13a005)
                        }
                        ;
                        _0x4f4121["prototype"]["gaiPha"] = function (_0x1e6387) {
                            if (!Boolean(~_0x1e6387)) {
                                return _0x1e6387
                            }
                            return this["hpKQFb"](this["nlcXFw"])
                        }
                        ;
                        _0x4f4121["prototype"]["hpKQFb"] = function (_0x20dc19) {
                            for (var _0x19d402 = 0, _0x5a3818 = this["HAmvBE"]["length"]; _0x19d402 < _0x5a3818; _0x19d402++) {
                                this["HAmvBE"]["push"](Math["round"](Math["random"]()));
                                _0x5a3818 = this["HAmvBE"]["length"]
                            }
                            return _0x20dc19(this["HAmvBE"][0])
                        }
                        ;
                        new _0x4f4121(_0x1e8e)["pzRiIQ"]();
                        _0x23d32b = _0x1e8e["VidPVs"](_0x23d32b);
                        _0x1e8e["BXvRsu"][_0x558645] = _0x23d32b
                    } else {
                        _0x23d32b = _0x436197
                    }
                    return _0x23d32b
                };
                var _0x52bd4a = function () {
                    var _0x56121a = !![];
                    return function (_0x215040, _0x309e1a) {
                        var _0x23d8c2 = _0x56121a ? function () {
                                    if (_0x309e1a) {
                                        var _0x1d7a3f = _0x309e1a["apply"](_0x215040, arguments);
                                        _0x309e1a = null;
                                        return _0x1d7a3f
                                    }
                                }
                                : function () {
                                }
                        ;
                        _0x56121a = ![];
                        return _0x23d8c2
                    }
                }();
                var _0x1297ed = _0x52bd4a(this, function () {
                    var _0x31f094 = function () {
                        return "\x64\x65\x76"
                    }
                        , _0x114f69 = function () {
                        return "\x77\x69\x6e\x64\x6f\x77"
                    };
                    var _0x21d55e = function () {
                        var _0x4b4425 = new RegExp("\x5c\x77\x2b\x20\x2a\x5c\x28\x5c\x29\x20\x2a\x7b\x5c\x77\x2b\x20\x2a\x5b\x27\x7c\x22\x5d\x2e\x2b\x5b\x27\x7c\x22\x5d\x3b\x3f\x20\x2a\x7d");
                        return !_0x4b4425["\x74\x65\x73\x74"](_0x31f094["\x74\x6f\x53\x74\x72\x69\x6e\x67"]())
                    };
                    var _0x2328d0 = function () {
                        var _0x56d0ca = new RegExp("\x28\x5c\x5c\x5b\x78\x7c\x75\x5d\x28\x5c\x77\x29\x7b\x32\x2c\x34\x7d\x29\x2b");
                        return _0x56d0ca["\x74\x65\x73\x74"](_0x114f69["\x74\x6f\x53\x74\x72\x69\x6e\x67"]())
                    };
                    var _0x29c9ca = function (_0x523426) {
                        var _0x17ebab = ~-1 >> 1 + 255 % 0;
                        if (_0x523426["\x69\x6e\x64\x65\x78\x4f\x66"]("\x69" === _0x17ebab)) {
                            _0x442ac7(_0x523426)
                        }
                    };
                    var _0x442ac7 = function (_0x10471a) {
                        var _0x4d91ed = ~-4 >> 1 + 255 % 0;
                        if (_0x10471a["\x69\x6e\x64\x65\x78\x4f\x66"]((!![] + "")[3]) !== _0x4d91ed) {
                            _0x29c9ca(_0x10471a)
                        }
                    };
                    if (!_0x21d55e()) {
                        if (!_0x2328d0()) {
                            _0x29c9ca("\x69\x6e\x64\u0435\x78\x4f\x66")
                        } else {
                            _0x29c9ca("\x69\x6e\x64\x65\x78\x4f\x66")
                        }
                    } else {
                        _0x29c9ca("\x69\x6e\x64\u0435\x78\x4f\x66")
                    }
                });
                _0x1297ed();
                var posList = [15, 35, 29, 24, 33, 16, 1, 38, 10, 9, 19, 31, 40, 27, 22, 23, 25, 13, 6, 11, 39, 18, 20, 8, 14, 21, 32, 26, 2, 30, 7, 4, 17, 5, 3, 28, 34, 37, 12, 36];
                var mask = _0x1e8e("0x0");
                var outPutList = [];
                var arg2 = "";
                var arg3 = "";
                for (var i = 0; i < arg1[_0x1e8e("0x1")]; i++) {
                    var this_i = arg1[i];
                    for (var j = 0; j < posList[_0x1e8e("0x1")]; j++) {
                        if (posList[j] == i + 1) {
                            outPutList[j] = this_i
                        }
                    }
                }
                arg2 = outPutList[_0x1e8e("0x2")]("");
                for (var i = 0; i < arg2[_0x1e8e("0x1")] && i < mask[_0x1e8e("0x1")]; i += 2) {
                    var GxjQsM = _0x1e8e("0x3")[_0x1e8e("0x4")]("|")
                        , QoWazb = 0;
                    while (!![]) {
                        switch (GxjQsM[QoWazb++]) {
                            case "0":
                                if (xorChar[_0x1e8e("0x1")] == 1) {
                                    xorChar = "0" + xorChar
                                }
                                continue;
                            case "1":
                                var strChar = parseInt(arg2[_0x1e8e("0x5")](i, i + 2), 16);
                                continue;
                            case "2":
                                arg3 += xorChar;
                                continue;
                            case "3":
                                var xorChar = (strChar ^ maskChar)[_0x1e8e("0x6")](16);
                                continue;
                            case "4":
                                var maskChar = parseInt(mask[_0x1e8e("0x5")](i, i + 2), 16);
                                continue
                        }
                        break
                    }
                }
                var expiredate = new Date();
                expiredate[_0x1e8e("0x7")](expiredate[_0x1e8e("0x8")]() + 3600 * 1000);
                var theHost = location.host
                    , theHostSplit = theHost.split(".")
                    , theHostSplitLength = theHostSplit.length;
                !/^(\d+\.)*\d+$/.test(theHost) && theHostSplitLength > 2 && ("com.cn" != (theHost = theHostSplit[theHostSplitLength - 2] + "." + theHostSplit[theHostSplitLength - 1]) && "gov.cn" != theHost && "org.cn" != theHost && "net.cn" != theHost && "com.my" != theHost || (theHost = theHostSplit[theHostSplitLength - 3] + "." + theHost));
                document[_0x1e8e("0x9")] = _0x1e8e("0xa") + arg3 + _0x1e8e("0xb") + expiredate[_0x1e8e("0xc")]() + _0x1e8e("0xd") + ";domain=" + theHost
            }
        };
        _waf_functions.hookXHR();
        _waf_functions.hookFetch();
        _waf_functions.domReady(function () {
            window._waf_body_copy = document.body;
            _waf_functions.initSlide();
            var script = document.createElement("script");
            var head = document.head || document.getElementsByTagName("head")[0];
            var time = new Date();
            if (_waf_is_mobile) {
                script.src = "//g.alicdn.com/sd/nch5/index.js?t=" + (time.getFullYear() + (time.getMonth() + 1) + time.getDate() + time.getHours())
            } else {
                script.src = "//g.alicdn.com/sd/ncpc/nc.js?t=" + (time.getFullYear() + (time.getMonth() + 1) + time.getDate() + time.getHours())
            }
            head.appendChild(script)
        })
    }
}();
