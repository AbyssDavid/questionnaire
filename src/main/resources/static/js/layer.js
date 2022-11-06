function getArgumentsList(a) {
    var d, e, f, g, b = a.toString(), c = /function\s*\w*\(([\s\S]*?)\)/;
    if (c.test(b)) {
        for (d = RegExp.$1.split(","),
                 e = [],
                 f = 0; f < d.length; f++)
            g = d[f].replace(/\s/g, ""),
            g && e.push(g);
        return e
    }
    return []
}

function helpLink(a) {
    return a.split("&=")[0] + "<a href='javascript:;' style='font-size:18px' class='iconfont iconfont_help' onmouseenter='helptips(\"" + a.split("&=")[1] + '", "' + a.split("&=")[2] + "\", this)'>&#xe637;</a>"
}

function helptips(a, b, c) {
    if (b && "undefined" != b) {
        var d = '<a class="wjx_alink" target="_blank" href="' + b + '">查看详情</a>';
        layer.tips(a + d, c, {
            time: 1e4
        }),
            jQuery(document).click(function () {
                layer.closeAll("tips")
            })
    } else
        layer.tips(a, c),
            $(c).mouseout(function () {
                layer.closeAll("tips")
            })
}

function PDF_launch(a, b, c, d, e, f) {
    var g, h, i;
    return d && getArgumentsList(d).length > 0 && (layerCallBack = d,
        d = null),
        g = a.indexOf(".") > -1 ? 2 : 1,
        a = a.indexOf(".") > -1 ? a : jQuery("#" + a),
        e ? (-1 != e.indexOf("&=") && (e = helpLink(e)),
            c += 54) : c += 30,
        h = c >= document.documentElement.clientHeight,
        i = layer.open({
            zIndex: f || 19491010,
            fixed: !h,
            anim: -1,
            offset: h ? "50px" : "auto",
            resize: !1,
            scrollbar: !0,
            content: a,
            shade: .65,
            area: [b + "px", c + "px"],
            title: e || " ",
            type: g,
            end: d
        })
}

function newConfirm(a, b) {
    return void 0 == b.hasConfirm && (b.hasConfirm = 1,
        hasConfirm = !1),
        hasConfirm ? !0 : (layer.confirm(a, {
            title: "提示"
        }, function (a) {
            hasConfirm = !0,
                b.click(),
                layer.close(a)
        }, function (a) {
            hasConfirm = !1,
                layer.close(a)
        }),
            !1)
}

function newAlert(a, b) {
    return isalert ? !0 : (layer.alert(a, function () {
        isalert = !0,
            b.click()
    }),
        !1)
}

function showPermissionDeniedDialog(a, b, c) {
    return updateVIP(null, null, c),
        !1
}

function showPermissionDeniedDialogZx(a, b, c) {
    return updateVIP(null, null, c, !0),
        !1
}

var layerCallBack, openwindow, PDF_close, PDF_hide, updateVIP, alertLink, alertnew, confirmnew, hasConfirm, isalert;
!function (a, b) {
    "use strict";
    var c, d, i, j, k, e = a.layui && layui.define, f = {
        getPath: function () {
            var a = document.scripts
                , b = a[a.length - 1]
                , c = b.src;
            return b.getAttribute("merge") ? void 0 : c.substring(0, c.lastIndexOf("/") + 1)
        }(),
        config: {},
        end: {},
        minIndex: 0,
        minLeft: [],
        btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
        type: ["dialog", "page", "iframe", "loading", "tips"],
        getStyle: function (b, c) {
            var d = b.currentStyle ? b.currentStyle : a.getComputedStyle(b, null);
            return d[d.getPropertyValue ? "getPropertyValue" : "getAttribute"](c)
        },
        link: function (b, c, d) {
            var e, h, i, j, k;
            g.path && (e = document.getElementsByTagName("head")[0],
                h = document.createElement("link"),
            "string" == typeof c && (d = c),
                i = (d || b).replace(/\.|\//g, ""),
                j = "layuicss-" + i,
                k = 0,
                h.rel = "stylesheet",
                h.href = g.path + b,
                h.id = j,
            document.getElementById(j) || e.appendChild(h),
            "function" == typeof c && !function l() {
                return ++k > 80 ? a.console && console.error("layer.css: Invalid") : void (1989 === parseInt(f.getStyle(document.getElementById(j), "width")) ? c() : setTimeout(l, 100))
            }())
        }
    }, g = {
        v: "3.1.0",
        ie: function () {
            var b = navigator.userAgent.toLowerCase();
            return !!(a.ActiveXObject || "ActiveXObject" in a) && ((b.match(/msie\s(\d+)/) || [])[1] || "11")
        }(),
        index: a.layer && a.layer.v ? 1e5 : 0,
        path: f.getPath,
        config: function (a) {
            return a = a || {},
                g.cache = f.config = c.extend({}, f.config, a),
                g.path = f.config.path || g.path,
            "string" == typeof a.extend && (a.extend = [a.extend]),
            f.config.path && g.ready(),
                a.extend ? (e ? layui.addcss("modules/layer/" + a.extend) : f.link("theme/" + a.extend),
                    this) : this
        },
        ready: function (a) {
            var b = "layer"
                , c = ""
                , d = (e ? "modules/layer/" : "theme/") + "default/layer.css?v=" + g.v + c;
            return e ? layui.addcss(d, a, b) : f.link(d, a, b),
                this
        },
        alert: function (a, b, d) {
            var e = "function" == typeof b;
            return e && (d = b),
                g.open(c.extend({
                    content: a,
                    yes: d
                }, e ? {} : b))
        },
        confirm: function (a, b, d, e) {
            var h = "function" == typeof b;
            return h && (e = d,
                d = b),
                g.open(c.extend({
                    content: a,
                    btn: f.btn,
                    yes: d,
                    btn2: e
                }, h ? {} : b))
        },
        msg: function (a, d, e) {
            var h = "function" == typeof d
                , j = f.config.skin
                , k = (j ? j + " " + j + "-msg" : "") || "layui-layer-msg"
                , l = i.anim.length - 1;
            return h && (e = d),
                g.open(c.extend({
                    content: a,
                    time: 3e3,
                    shade: !1,
                    skin: k,
                    title: !1,
                    closeBtn: !1,
                    btn: !1,
                    resize: !1,
                    end: e
                }, h && !f.config.skin ? {
                    skin: k + " layui-layer-hui",
                    anim: l
                } : function () {
                    return d = d || {},
                    (-1 === d.icon || d.icon === b && !f.config.skin) && (d.skin = k + " " + (d.skin || "layui-layer-hui")),
                        d
                }()))
        },
        load: function (a, b) {
            return g.open(c.extend({
                type: 3,
                icon: a || 0,
                resize: !1,
                shade: .01
            }, b))
        },
        tips: function (a, b, d) {
            return g.open(c.extend({
                type: 4,
                content: [a, b],
                closeBtn: !1,
                time: 3e3,
                shade: !1,
                resize: !1,
                fixed: !1,
                maxWidth: 210
            }, d))
        }
    }, h = function (a) {
        var b = this;
        b.index = ++g.index,
            b.config = c.extend({}, b.config, f.config, a),
            document.body ? b.creat() : setTimeout(function () {
                b.creat()
            }, 30)
    };
    h.pt = h.prototype,
        i = ["layui-layer", ".layui-layer-title", ".layui-layer-main", ".layui-layer-dialog", "layui-layer-iframe", "layui-layer-content", "layui-layer-btn", "layui-layer-close"],
        i.anim = ["layer-anim-00", "layer-anim-01", "layer-anim-02", "layer-anim-03", "layer-anim-04", "layer-anim-05", "layer-anim-06"],
        h.pt.config = {
            type: 0,
            shade: .3,
            fixed: !0,
            move: i[1],
            title: "&#x4FE1;&#x606F;",
            offset: "auto",
            area: "auto",
            closeBtn: 1,
            time: 0,
            zIndex: 19891014,
            maxWidth: 360,
            anim: 0,
            isOutAnim: !0,
            icon: -1,
            moveType: 1,
            resize: !0,
            scrollbar: !0,
            tips: 2
        },
        h.pt.vessel = function (a, b) {
            var d = this
                , e = d.index
                , g = d.config
                , h = g.zIndex + e
                , j = "object" == typeof g.title
                , k = g.maxmin && (1 === g.type || 2 === g.type)
                ,
                l = g.title ? '<div class="layui-layer-title" style="' + (j ? g.title[1] : "") + '">' + (j ? g.title[0] : g.title) + "</div>" : "";
            return g.zIndex = h,
                b([g.shade ? '<div class="layui-layer-shade" id="layui-layer-shade' + e + '" times="' + e + '" style="' + ("z-index:" + (h - 1) + "; ") + '"></div>' : "", '<div class="' + i[0] + (" layui-layer-" + f.type[g.type]) + (0 != g.type && 2 != g.type || g.shade ? "" : " layui-layer-border") + " " + (g.skin || "") + '" id="' + i[0] + e + '" type="' + f.type[g.type] + '" times="' + e + '" showtime="' + g.time + '" conType="' + (a ? "object" : "string") + '" style="z-index: ' + h + "; width:" + g.area[0] + ";height:" + g.area[1] + (g.fixed ? "" : ";position:absolute;") + '">' + (a && 2 != g.type ? "" : l) + '<div id="' + (g.id || "") + '" class="layui-layer-content' + (0 == g.type && -1 !== g.icon ? " layui-layer-padding" : "") + (3 == g.type ? " layui-layer-loading" + g.icon : "") + '">' + (0 == g.type && -1 !== g.icon ? '<i class="layui-layer-ico layui-layer-ico' + g.icon + '"></i>' : "") + (1 == g.type && a ? "" : g.content || "") + '</div><span class="layui-layer-setwin">' + function () {
                    var a = k ? '<a class="layui-layer-min" href="javascript:;"><cite></cite></a><a class="layui-layer-ico layui-layer-max" href="javascript:;"></a>' : "";
                    return g.closeBtn && (a += '<a class="layui-layer-ico ' + i[7] + " " + i[7] + (g.title ? g.closeBtn : 4 == g.type ? "1" : "2") + '" style="cursor: pointer;"></a>'),
                        a
                }() + "</span>" + (g.btn ? function () {
                    var b, c, a = "";
                    for ("string" == typeof g.btn && (g.btn = [g.btn]),
                             b = 0,
                             c = g.btn.length; c > b; b++)
                        a += '<a class="' + i[6] + b + '">' + g.btn[b] + "</a>";
                    return '<div class="' + i[6] + " layui-layer-btn-" + (g.btnAlign || "") + '">' + a + "</div>"
                }() : "") + (g.resize ? '<span class="layui-layer-resize"></span>' : "") + "</div>"], l, c('<div class="layui-layer-move"></div>')),
                d
        }
        ,
        h.pt.creat = function () {
            var l, a = this, b = a.config, e = a.index, h = b.content, j = "object" == typeof h, k = c("body");
            if (!b.id || !c("#" + b.id)[0]) {
                switch ("string" == typeof b.area && (b.area = "auto" === b.area ? ["", ""] : [b.area, ""]),
                b.shift && (b.anim = b.shift),
                6 == g.ie && (b.fixed = !1),
                    b.type) {
                    case 0:
                        b.btn = "btn" in b ? b.btn : f.btn[0],
                            g.closeAll("dialog");
                        break;
                    case 2:
                        h = b.content = j ? b.content : [b.content || "http://layer.layui.com", "auto"],
                            b.content = '<iframe scrolling="' + (b.content[1] || "auto") + '" allowtransparency="true" id="' + i[4] + e + '" name="' + i[4] + e + '" onload="this.className=\'\';" class="layui-layer-load" frameborder="0" src="' + b.content[0] + '"></iframe>';
                        break;
                    case 3:
                        delete b.title,
                            delete b.closeBtn,
                        -1 === b.icon && 0 === b.icon,
                            g.closeAll("loading");
                        break;
                    case 4:
                        j || (b.content = [b.content, "body"]),
                            b.follow = b.content[1],
                            b.content = b.content[0] + '<i class="layui-layer-TipsG"></i>',
                            delete b.title,
                            b.tips = "object" == typeof b.tips ? b.tips : [b.tips, !0],
                        b.tipsMore || g.closeAll("tips")
                }
                a.vessel(j, function (d, g, l) {
                    k.append(d[0]),
                        j ? function () {
                            2 == b.type || 4 == b.type ? function () {
                                c("body").append(d[1])
                            }() : function () {
                                h.parents("." + i[0])[0] || (h.data("display", h.css("display")).show().addClass("layui-layer-wrap").wrap(d[1]),
                                    c("#" + i[0] + e).find("." + i[5]).before(g))
                            }()
                        }() : k.append(d[1]),
                    c(".layui-layer-move")[0] || k.append(f.moveElem = l),
                        a.layero = c("#" + i[0] + e),
                    b.scrollbar || i.html.css("overflow", "hidden").attr("layer-full", e)
                }).auto(e),
                    c("#layui-layer-shade" + a.index).css({
                        "background-color": b.shade[1] || "#000",
                        opacity: b.shade[0] || b.shade
                    }),
                2 == b.type && 6 == g.ie && a.layero.find("iframe").attr("src", h[0]),
                    4 == b.type ? a.tips() : a.offset(),
                b.fixed && d.on("resize", function () {
                    a.offset(),
                    (/^\d+%$/.test(b.area[0]) || /^\d+%$/.test(b.area[1])) && a.auto(e),
                    4 == b.type && a.tips()
                }),
                b.time <= 0 || setTimeout(function () {
                    g.close(a.index)
                }, b.time),
                    a.move().callback(),
                i.anim[b.anim] && (l = "layer-anim " + i.anim[b.anim],
                    a.layero.addClass(l).one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                        c(this).removeClass(l)
                    })),
                b.isOutAnim && a.layero.data("isOutAnim", !0)
            }
        }
        ,
        h.pt.auto = function (a) {
            var h, j, k, l, b = this, e = b.config, f = c("#" + i[0] + a);
            switch ("" === e.area[0] && e.maxWidth > 0 && (g.ie && g.ie < 8 && e.btn && f.width(f.innerWidth()),
            f.outerWidth() > e.maxWidth && f.width(e.maxWidth)),
                h = [f.innerWidth(), f.innerHeight()],
                j = f.find(i[1]).outerHeight() || 0,
                k = f.find("." + i[6]).outerHeight() || 0,
                l = function (a) {
                    a = f.find(a),
                        a.height(h[1] - j - k - 2 * (0 | parseFloat(a.css("padding-top"))))
                }
                ,
                e.type) {
                case 2:
                    l("iframe");
                    break;
                default:
                    "" === e.area[1] ? e.maxHeight > 0 && f.outerHeight() > e.maxHeight ? (h[1] = e.maxHeight,
                        l("." + i[5])) : e.fixed && h[1] >= d.height() && (h[1] = d.height(),
                        l("." + i[5])) : l("." + i[5])
            }
            return b
        }
        ,
        h.pt.offset = function () {
            var a = this
                , b = a.config
                , c = a.layero
                , e = [c.outerWidth(), c.outerHeight()]
                , f = "object" == typeof b.offset;
            a.offsetTop = (d.height() - e[1]) / 2,
                a.offsetLeft = (d.width() - e[0]) / 2,
                f ? (a.offsetTop = b.offset[0],
                    a.offsetLeft = b.offset[1] || a.offsetLeft) : "auto" !== b.offset && ("t" === b.offset ? a.offsetTop = 0 : "r" === b.offset ? a.offsetLeft = d.width() - e[0] : "b" === b.offset ? a.offsetTop = d.height() - e[1] : "l" === b.offset ? a.offsetLeft = 0 : "lt" === b.offset ? (a.offsetTop = 0,
                    a.offsetLeft = 0) : "lb" === b.offset ? (a.offsetTop = d.height() - e[1],
                    a.offsetLeft = 0) : "rt" === b.offset ? (a.offsetTop = 0,
                    a.offsetLeft = d.width() - e[0]) : "rb" === b.offset ? (a.offsetTop = d.height() - e[1],
                    a.offsetLeft = d.width() - e[0]) : a.offsetTop = b.offset),
            b.fixed || (a.offsetTop = /%$/.test(a.offsetTop) ? d.height() * parseFloat(a.offsetTop) / 100 : parseFloat(a.offsetTop),
                a.offsetLeft = /%$/.test(a.offsetLeft) ? d.width() * parseFloat(a.offsetLeft) / 100 : parseFloat(a.offsetLeft),
                a.offsetTop += d.scrollTop(),
                a.offsetLeft += d.scrollLeft()),
            c.attr("minLeft") && (a.offsetTop = d.height() - (c.find(i[1]).outerHeight() || 0),
                a.offsetLeft = c.css("left")),
                c.css({
                    top: a.offsetTop,
                    left: a.offsetLeft
                })
        }
        ,
        h.pt.tips = function () {
            var h, j, k, a = this, b = a.config, e = a.layero, f = [e.outerWidth(), e.outerHeight()], g = c(b.follow);
            g[0] || (g = c("body")),
                h = {
                    width: g.outerWidth(),
                    height: g.outerHeight(),
                    top: g.offset().top,
                    left: g.offset().left
                },
                j = e.find(".layui-layer-TipsG"),
                k = b.tips[0],
            b.tips[1] || j.remove(),
                h.autoLeft = function () {
                    h.left + f[0] - d.width() > 0 ? (h.tipLeft = h.left + h.width - f[0],
                        j.css({
                            right: 12,
                            left: "auto"
                        })) : h.tipLeft = h.left
                }
                ,
                h.where = [function () {
                    h.autoLeft(),
                        h.tipTop = h.top - f[1] - 10,
                        j.removeClass("layui-layer-TipsB").addClass("layui-layer-TipsT").css("border-right-color", b.tips[1])
                }
                    , function () {
                        h.tipLeft = h.left + h.width + 10,
                            h.tipTop = h.top,
                            j.removeClass("layui-layer-TipsL").addClass("layui-layer-TipsR").css("border-bottom-color", b.tips[1])
                    }
                    , function () {
                        h.autoLeft(),
                            h.tipTop = h.top + h.height + 10,
                            j.removeClass("layui-layer-TipsT").addClass("layui-layer-TipsB").css("border-right-color", b.tips[1])
                    }
                    , function () {
                        h.tipLeft = h.left - f[0] - 10,
                            h.tipTop = h.top,
                            j.removeClass("layui-layer-TipsR").addClass("layui-layer-TipsL").css("border-bottom-color", b.tips[1])
                    }
                ],
                h.where[k - 1](),
                1 === k ? h.top - (d.scrollTop() + f[1] + 16) < 0 && h.where[2]() : 2 === k ? d.width() - (h.left + h.width + f[0] + 16) > 0 || h.where[3]() : 3 === k ? h.top - d.scrollTop() + h.height + f[1] + 16 - d.height() > 0 && h.where[0]() : 4 === k && f[0] + 16 - h.left > 0 && h.where[1](),
                e.find("." + i[5]).css({
                    "background-color": b.tips[1],
                    "padding-right": b.closeBtn ? "30px" : ""
                }),
                e.css({
                    left: h.tipLeft - (b.fixed ? d.scrollLeft() : 0),
                    top: h.tipTop - (b.fixed ? d.scrollTop() : 0)
                })
        }
        ,
        h.pt.move = function () {
            var a = this
                , b = a.config
                , e = c(document)
                , h = a.layero
                , i = h.find(b.move)
                , j = h.find(".layui-layer-resize")
                , k = {};
            return b.move && i.css("cursor", "move"),
                i.on("mousedown", function (a) {
                    a.preventDefault(),
                    b.move && (k.moveStart = !0,
                        k.offset = [a.clientX - parseFloat(h.css("left")), a.clientY - parseFloat(h.css("top"))],
                        f.moveElem.css("cursor", "move").show())
                }),
                j.on("mousedown", function (a) {
                    a.preventDefault(),
                        k.resizeStart = !0,
                        k.offset = [a.clientX, a.clientY],
                        k.area = [h.outerWidth(), h.outerHeight()],
                        f.moveElem.css("cursor", "se-resize").show()
                }),
                e.on("mousemove", function (c) {
                    var e, f, i, j, l;
                    k.moveStart && (e = c.clientX - k.offset[0],
                        f = c.clientY - k.offset[1],
                        i = "fixed" === h.css("position"),
                        c.preventDefault(),
                        k.stX = i ? 0 : d.scrollLeft(),
                        k.stY = i ? 0 : d.scrollTop(),
                    b.moveOut || (j = d.width() - h.outerWidth() + k.stX,
                        l = d.height() - h.outerHeight() + k.stY,
                    e < k.stX && (e = k.stX),
                    e > j && (e = j),
                    f < k.stY && (f = k.stY),
                    f > l && (f = l)),
                        h.css({
                            left: e,
                            top: f
                        })),
                    b.resize && k.resizeStart && (e = c.clientX - k.offset[0],
                        f = c.clientY - k.offset[1],
                        c.preventDefault(),
                        g.style(a.index, {
                            width: k.area[0] + e,
                            height: k.area[1] + f
                        }),
                        k.isResize = !0,
                    b.resizing && b.resizing(h))
                }).on("mouseup", function () {
                    k.moveStart && (delete k.moveStart,
                        f.moveElem.hide(),
                    b.moveEnd && b.moveEnd(h)),
                    k.resizeStart && (delete k.resizeStart,
                        f.moveElem.hide())
                }),
                a
        }
        ,
        h.pt.callback = function () {
            function a() {
                var a = e.cancel && e.cancel(b.index, d);
                a === !1 || g.close(b.index)
            }

            var b = this
                , d = b.layero
                , e = b.config;
            b.openLayer(),
            e.success && (2 == e.type ? d.find("iframe").on("load", function () {
                e.success(d, b.index)
            }) : e.success(d, b.index)),
            6 == g.ie && b.IE6(d),
                d.find("." + i[6]).children("a").on("click", function () {
                    var f, a = c(this).index();
                    0 === a ? e.yes ? e.yes(b.index, d) : e.btn1 ? e.btn1(b.index, d) : g.close(b.index) : (f = e["btn" + (a + 1)] && e["btn" + (a + 1)](b.index, d),
                    f === !1 || g.close(b.index))
                }),
                d.find("." + i[7]).on("click", a),
            e.shadeClose && c("#layui-layer-shade" + b.index).on("click", function () {
                g.close(b.index)
            }),
                d.find(".layui-layer-min").on("click", function () {
                    var a = e.min && e.min(d);
                    a === !1 || g.min(b.index, e)
                }),
                d.find(".layui-layer-max").on("click", function () {
                    c(this).hasClass("layui-layer-maxmin") ? (g.restore(b.index),
                    e.restore && e.restore(d)) : (g.full(b.index, e),
                        setTimeout(function () {
                            e.full && e.full(d)
                        }, 100))
                }),
            e.end && (f.end[b.index] = e.end)
        }
        ,
        f.reselect = function () {
            c.each(c("select"), function () {
                var d = c(this);
                d.parents("." + i[0])[0] || 1 == d.attr("layer") && c("." + i[0]).length < 1 && d.removeAttr("layer").show(),
                    d = null
            })
        }
        ,
        h.pt.IE6 = function () {
            c("select").each(function () {
                var d = c(this);
                d.parents("." + i[0])[0] || "none" === d.css("display") || d.attr({
                    layer: "1"
                }).hide(),
                    d = null
            })
        }
        ,
        h.pt.openLayer = function () {
            var a = this;
            g.zIndex = a.config.zIndex,
                g.setTop = function (a) {
                    var b = function () {
                        g.zIndex++,
                            a.css("z-index", g.zIndex + 1)
                    };
                    return g.zIndex = parseInt(a[0].style.zIndex),
                        a.on("mousedown", b),
                        g.zIndex
                }
        }
        ,
        f.record = function (a) {
            var b = [a.width(), a.height(), a.position().top, a.position().left + parseFloat(a.css("margin-left"))];
            a.find(".layui-layer-max").addClass("layui-layer-maxmin"),
                a.attr({
                    area: b
                })
        }
        ,
        f.rescollbar = function (a) {
            i.html.attr("layer-full") == a && (i.html[0].style.removeProperty ? i.html[0].style.removeProperty("overflow") : i.html[0].style.removeAttribute("overflow"),
                i.html.removeAttr("layer-full"))
        }
        ,
        a.layer = g,
        g.getChildFrame = function (a, b) {
            return b = b || c("." + i[4]).attr("times"),
                c("#" + i[0] + b).find("iframe").contents().find(a)
        }
        ,
        g.getFrameIndex = function (a) {
            return c("#" + a).parents("." + i[4]).attr("times")
        }
        ,
        g.iframeAuto = function (a) {
            if (a) {
                var b = g.getChildFrame("html", a).outerHeight()
                    , d = c("#" + i[0] + a)
                    , e = d.find(i[1]).outerHeight() || 0
                    , f = d.find("." + i[6]).outerHeight() || 0;
                d.css({
                    height: b + e + f
                }),
                    d.find("iframe").css({
                        height: b
                    })
            }
        }
        ,
        g.iframeSrc = function (a, b) {
            c("#" + i[0] + a).find("iframe").attr("src", b)
        }
        ,
        g.style = function (a, b, d) {
            var e = c("#" + i[0] + a)
                , g = e.find(".layui-layer-content")
                , h = e.attr("type")
                , j = e.find(i[1]).outerHeight() || 0
                , k = e.find("." + i[6]).outerHeight() || 0;
            e.attr("minLeft"),
            h !== f.type[3] && h !== f.type[4] && (d || (parseFloat(b.width) <= 260 && (b.width = 260),
            parseFloat(b.height) - j - k <= 64 && (b.height = 64 + j + k)),
                e.css(b),
                k = e.find("." + i[6]).outerHeight(),
                h === f.type[2] ? e.find("iframe").css({
                    height: parseFloat(b.height) - j - k
                }) : g.css({
                    height: parseFloat(b.height) - j - k - parseFloat(g.css("padding-top")) - parseFloat(g.css("padding-bottom"))
                }))
        }
        ,
        g.min = function (a) {
            var e = c("#" + i[0] + a)
                , h = e.find(i[1]).outerHeight() || 0
                , j = e.attr("minLeft") || 181 * f.minIndex + "px"
                , k = e.css("position");
            f.record(e),
            f.minLeft[0] && (j = f.minLeft[0],
                f.minLeft.shift()),
                e.attr("position", k),
                g.style(a, {
                    width: 180,
                    height: h,
                    left: j,
                    top: d.height() - h,
                    position: "fixed",
                    overflow: "hidden"
                }, !0),
                e.find(".layui-layer-min").hide(),
            "page" === e.attr("type") && e.find(i[4]).hide(),
                f.rescollbar(a),
            e.attr("minLeft") || f.minIndex++,
                e.attr("minLeft", j)
        }
        ,
        g.restore = function (a) {
            var b = c("#" + i[0] + a)
                , d = b.attr("area").split(",");
            b.attr("type"),
                g.style(a, {
                    width: parseFloat(d[0]),
                    height: parseFloat(d[1]),
                    top: parseFloat(d[2]),
                    left: parseFloat(d[3]),
                    position: b.attr("position"),
                    overflow: "visible"
                }, !0),
                b.find(".layui-layer-max").removeClass("layui-layer-maxmin"),
                b.find(".layui-layer-min").show(),
            "page" === b.attr("type") && b.find(i[4]).show(),
                f.rescollbar(a)
        }
        ,
        g.full = function (a) {
            var b, e = c("#" + i[0] + a);
            f.record(e),
            i.html.attr("layer-full") || i.html.css("overflow", "hidden").attr("layer-full", a),
                clearTimeout(b),
                b = setTimeout(function () {
                    var b = "fixed" === e.css("position");
                    g.style(a, {
                        top: b ? 0 : d.scrollTop(),
                        left: b ? 0 : d.scrollLeft(),
                        width: d.width(),
                        height: d.height()
                    }, !0),
                        e.find(".layui-layer-min").hide()
                }, 100)
        }
        ,
        g.title = function (a, b) {
            var d = c("#" + i[0] + (b || g.index)).find(i[1]);
            d.html(a)
        }
        ,
        g.close = function (a) {
            var h, j, b = c("#" + i[0] + a), d = b.attr("type"), e = "layer-anim-close";
            b[0] && (h = "layui-layer-wrap",
                j = function () {
                    var e, g, j;
                    if (d === f.type[1] && "object" === b.attr("conType")) {
                        for (b.children(":not(." + i[5] + ")").remove(),
                                 e = b.find("." + h),
                                 g = 0; 2 > g; g++)
                            e.unwrap();
                        e.css("display", e.data("display")).removeClass(h)
                    } else {
                        if (d === f.type[2])
                            try {
                                j = c("#" + i[4] + a)[0],
                                    j.contentWindow.document.write(""),
                                    j.contentWindow.close(),
                                    b.find("." + i[5])[0].removeChild(j)
                            } catch (k) {
                            }
                        b[0].innerHTML = "",
                            b.remove()
                    }
                    "function" == typeof f.end[a] && f.end[a](),
                        delete f.end[a]
                }
                ,
            b.data("isOutAnim") && b.addClass("layer-anim " + e),
                c("#layui-layer-moves, #layui-layer-shade" + a).remove(),
            6 == g.ie && f.reselect(),
                f.rescollbar(a),
            b.attr("minLeft") && (f.minIndex--,
                f.minLeft.push(b.attr("minLeft"))),
                g.ie && g.ie < 10 || !b.data("isOutAnim") ? j() : setTimeout(function () {
                    j()
                }, 200))
        }
        ,
        g.closeAll = function (a) {
            c.each(c("." + i[0]), function () {
                var b = c(this)
                    , d = a ? b.attr("type") === a : 1;
                d && g.close(b.attr("times")),
                    d = null
            })
        }
        ,
        j = g.cache || {},
        k = function (a) {
            return j.skin ? " " + j.skin + " " + j.skin + "-" + a : ""
        }
        ,
        g.prompt = function (a, b) {
            var f, h, i, j, e = "";
            return a = a || {},
            "function" == typeof a && (b = a),
            a.area && (f = a.area,
                e = 'style="width: ' + f[0] + "; height: " + f[1] + ';"',
                delete a.area),
                i = 2 == a.formType ? '<textarea class="layui-layer-input"' + e + ">" + (a.value || "") + "</textarea>" : function () {
                    return '<input type="' + (1 == a.formType ? "password" : "text") + '" class="layui-layer-input" value="' + (a.value || "") + '">'
                }(),
                j = a.success,
                delete a.success,
                g.open(c.extend({
                    type: 1,
                    btn: ["&#x786E;&#x5B9A;", "&#x53D6;&#x6D88;"],
                    content: i,
                    skin: "layui-layer-prompt" + k("prompt"),
                    maxWidth: d.width(),
                    success: function (a) {
                        h = a.find(".layui-layer-input"),
                            h.focus(),
                        "function" == typeof j && j(a)
                    },
                    resize: !1,
                    yes: function (c) {
                        var d = h.val();
                        "" === d ? h.focus() : d.length > (a.maxlength || 500) ? g.tips("&#x6700;&#x591A;&#x8F93;&#x5165;" + (a.maxlength || 500) + "&#x4E2A;&#x5B57;&#x6570;", h, {
                            tips: 1
                        }) : b && b(d, c, h)
                    }
                }, a))
        }
        ,
        g.tab = function (a) {
            a = a || {};
            var b = a.tab || {}
                , d = "layui-this"
                , e = a.success;
            return delete a.success,
                g.open(c.extend({
                    type: 1,
                    skin: "layui-layer-tab" + k("tab"),
                    resize: !1,
                    title: function () {
                        var a = b.length
                            , c = 1
                            , e = "";
                        if (a > 0)
                            for (e = '<span class="' + d + '">' + b[0].title + "</span>"; a > c; c++)
                                e += "<span>" + b[c].title + "</span>";
                        return e
                    }(),
                    content: '<ul class="layui-layer-tabmain">' + function () {
                        var a = b.length
                            , c = 1
                            , e = "";
                        if (a > 0)
                            for (e = '<li class="layui-layer-tabli ' + d + '">' + (b[0].content || "no content") + "</li>"; a > c; c++)
                                e += '<li class="layui-layer-tabli">' + (b[c].content || "no  content") + "</li>";
                        return e
                    }() + "</ul>",
                    success: function (b) {
                        var f = b.find(".layui-layer-title").children()
                            , g = b.find(".layui-layer-tabmain").children();
                        f.on("mousedown", function (b) {
                            b.stopPropagation ? b.stopPropagation() : b.cancelBubble = !0;
                            var e = c(this)
                                , f = e.index();
                            e.addClass(d).siblings().removeClass(d),
                                g.eq(f).show().siblings().hide(),
                            "function" == typeof a.change && a.change(f)
                        }),
                        "function" == typeof e && e(b)
                    }
                }, a))
        }
        ,
        g.photos = function (b, d, e) {
            function f(a, b, c) {
                var d = new Image;
                return d.src = a,
                    d.complete ? b(d) : (d.onload = function () {
                        d.onload = null,
                            b(d)
                    }
                        ,
                        void (d.onerror = function (a) {
                                d.onerror = null,
                                    c(a)
                            }
                        ))
            }

            var i, j, l, m, n, o, p, h = {};
            if (b = b || {},
                b.photos) {
                if (i = b.photos.constructor === Object,
                    j = i ? b.photos : {},
                    l = j.data || [],
                    m = j.start || 0,
                    h.imgIndex = (0 | m) + 1,
                    b.img = b.img || "img",
                    n = b.success,
                    delete b.success,
                    i) {
                    if (0 === l.length)
                        return g.msg("&#x6CA1;&#x6709;&#x56FE;&#x7247;")
                } else {
                    if (o = c(b.photos),
                        p = function () {
                            l = [],
                                o.find(b.img).each(function (a) {
                                    var b = c(this);
                                    b.attr("layer-index", a),
                                        l.push({
                                            alt: b.attr("alt"),
                                            pid: b.attr("layer-pid"),
                                            src: b.attr("layer-src") || b.attr("src"),
                                            thumb: b.attr("src")
                                        })
                                })
                        }
                        ,
                        p(),
                    0 === l.length)
                        return;
                    if (d || o.on("click", b.img, function () {
                        var a = c(this)
                            , d = a.attr("layer-index");
                        g.photos(c.extend(b, {
                            photos: {
                                start: d,
                                data: l,
                                tab: b.tab
                            },
                            full: b.full
                        }), !0),
                            p()
                    }),
                        !d)
                        return
                }
                h.imgprev = function (a) {
                    h.imgIndex--,
                    h.imgIndex < 1 && (h.imgIndex = l.length),
                        h.tabimg(a)
                }
                    ,
                    h.imgnext = function (a, b) {
                        h.imgIndex++,
                        h.imgIndex > l.length && (h.imgIndex = 1,
                            b) || h.tabimg(a)
                    }
                    ,
                    h.keyup = function (a) {
                        if (!h.end) {
                            var b = a.keyCode;
                            a.preventDefault(),
                                37 === b ? h.imgprev(!0) : 39 === b ? h.imgnext(!0) : 27 === b && g.close(h.index)
                        }
                    }
                    ,
                    h.tabimg = function (a) {
                        return l.length <= 1 ? void 0 : (j.start = h.imgIndex - 1,
                            g.close(h.index),
                            g.photos(b, !0, a))
                    }
                    ,
                    h.event = function () {
                        h.bigimg.hover(function () {
                            h.imgsee.show()
                        }, function () {
                            h.imgsee.hide()
                        }),
                            h.bigimg.find(".layui-layer-imgprev").on("click", function (a) {
                                a.preventDefault(),
                                    h.imgprev()
                            }),
                            h.bigimg.find(".layui-layer-imgnext").on("click", function (a) {
                                a.preventDefault(),
                                    h.imgnext()
                            }),
                            c(document).on("keyup", h.keyup)
                    }
                    ,
                    h.loadi = g.load(1, {
                        shade: !("shade" in b) && .9,
                        scrollbar: !1
                    }),
                    f(l[m].src, function (d) {
                        g.close(h.loadi),
                            h.index = g.open(c.extend({
                                type: 1,
                                id: "layui-layer-photos",
                                area: function () {
                                    var g, e = [d.width, d.height], f = [c(a).width() - 100, c(a).height() - 100];
                                    return !b.full && (e[0] > f[0] || e[1] > f[1]) && (g = [e[0] / f[0], e[1] / f[1]],
                                        g[0] > g[1] ? (e[0] = e[0] / g[0],
                                            e[1] = e[1] / g[0]) : g[0] < g[1] && (e[0] = e[0] / g[1],
                                            e[1] = e[1] / g[1])),
                                        [e[0] + "px", e[1] + "px"]
                                }(),
                                title: !1,
                                shade: .9,
                                shadeClose: !0,
                                closeBtn: !1,
                                move: ".layui-layer-phimg img",
                                moveType: 1,
                                scrollbar: !1,
                                moveOut: !0,
                                isOutAnim: !1,
                                skin: "layui-layer-photos" + k("photos"),
                                content: '<div class="layui-layer-phimg"><img src="' + l[m].src + '" alt="' + (l[m].alt || "") + '" layer-pid="' + l[m].pid + '"><div class="layui-layer-imgsee">' + (l.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : "") + '<div class="layui-layer-imgbar" style="display:' + (e ? "block" : "") + '"><span class="layui-layer-imgtit"><a href="javascript:;">' + (l[m].alt || "") + "</a><em>" + h.imgIndex + "/" + l.length + "</em></span></div></div></div>",
                                success: function (a) {
                                    h.bigimg = a.find(".layui-layer-phimg"),
                                        h.imgsee = a.find(".layui-layer-imguide,.layui-layer-imgbar"),
                                        h.event(a),
                                    b.tab && b.tab(l[m], a),
                                    "function" == typeof n && n(a)
                                },
                                end: function () {
                                    h.end = !0,
                                        c(document).off("keyup", h.keyup)
                                }
                            }, b))
                    }, function () {
                        g.close(h.loadi),
                            g.msg("&#x5F53;&#x524D;&#x56FE;&#x7247;&#x5730;&#x5740;&#x5F02;&#x5E38;<br>&#x662F;&#x5426;&#x7EE7;&#x7EED;&#x67E5;&#x770B;&#x4E0B;&#x4E00;&#x5F20;&#xFF1F;", {
                                time: 3e4,
                                btn: ["&#x4E0B;&#x4E00;&#x5F20;", "&#x4E0D;&#x770B;&#x4E86;"],
                                yes: function () {
                                    l.length > 1 && h.imgnext(!0, !0)
                                }
                            })
                    })
            }
        }
        ,
        f.run = function (b) {
            c = b,
                d = c(a),
                i.html = c("html"),
                g.open = function (a) {
                    var b = new h(a);
                    return b.index
                }
        }
        ,
        a.layui && layui.define ? (g.ready(),
            layui.define("jquery", function (b) {
                g.path = layui.cache.dir,
                    f.run(layui.$),
                    a.layer = g,
                    b("layer", g)
            })) : "function" == typeof define && define.amd ? define(["jquery"], function () {
            return f.run(a.jQuery),
                g
        }) : function () {
            f.run(a.jQuery),
                g.ready()
        }()
}(window),
    !function () {
        "use strict";
        var e, a = {
            open: "{{",
            close: "}}"
        }, b = {
            exp: function (a) {
                return new RegExp(a, "g")
            },
            query: function (b, d, e) {
                var f = ["#([\\s\\S])+?", "([^{#}])*?"][b || 0];
                return c((d || "") + a.open + f + a.close + (e || ""))
            },
            escape: function (a) {
                return String(a || "").replace(/&(?!#?[a-zA-Z0-9]+;)/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;")
            },
            error: function (a, b) {
                var c = "Laytpl Error：";
                return "object" == typeof console && console.error(c + a + "\n" + (b || "")),
                c + a
            }
        }, c = b.exp, d = function (a) {
            this.tpl = a
        };
        d.pt = d.prototype,
            window.errors = 0,
            d.pt.parse = function (d, e) {
                var f = this
                    , g = d
                    , h = c("^" + a.open + "#", "")
                    , i = c(a.close + "$", "");
                d = d.replace(/\s+|\r|\t|\n/g, " ").replace(c(a.open + "#"), a.open + "# ").replace(c(a.close + "}"), "} " + a.close).replace(/\\/g, "\\\\").replace(/(?="|')/g, "\\").replace(b.query(), function (a) {
                    return a = a.replace(h, "").replace(i, ""),
                    '";' + a.replace(/\\/g, "") + ';view+="'
                }).replace(b.query(1), function (b) {
                    var d = '"+(';
                    return b.replace(/\s/g, "") === a.open + a.close ? "" : (b = b.replace(c(a.open + "|" + a.close), ""),
                    /^=/.test(b) && (b = b.replace(/^=/, ""),
                        d = '"+_escape_('),
                    d + b.replace(/\\/g, "") + ')+"')
                }),
                    d = '"use strict";var view = "' + d + '";return view;';
                try {
                    return f.cache = d = new Function("d, _escape_", d),
                        d(e, b.escape)
                } catch (j) {
                    return delete f.cache,
                        b.error(j, g)
                }
            }
            ,
            d.pt.render = function (a, c) {
                var d, e = this;
                return a ? (d = e.cache ? e.cache(a, b.escape) : e.parse(e.tpl, a),
                    console.log(),
                    c ? void c(d) : d) : b.error("no data")
            }
            ,
            e = function (a) {
                return "string" != typeof a ? b.error("Template not found") : new d(a)
            }
            ,
            e.config = function (b) {
                b = b || {};
                for (var c in b)
                    a[c] = b[c]
            }
            ,
            e.v = "1.2",
            "function" == typeof define ? define(function () {
                return e
            }) : "undefined" != typeof exports ? module.exports = e : window.laytpl = e
    }(),
    layerCallBack = null,
    openwindow = PDF_launch,
    PDF_close = function (a) {
        layer.closeAll("iframe"),
            layer.closeAll("page"),
        layerCallBack && layerCallBack(a)
    }
    ,
    PDF_hide = function (a) {
        jQuery(".layui-layer-iframe").hide(),
            jQuery(".layui-layer-shade").hide(),
            jQuery("html").css("overflow", "auto");
        var b = 9e3;
        (window.location.href.indexOf("/report/") > -1 || window.location.href.indexOf("/newwjx/activitystat/") > -1) && (b = 15e3),
            setTimeout(function () {
                PDF_close(a)
            }, b)
    }
    ,
    updateVIP = function (a, b, c, d) {
        var g, e = c ? "/register/upgradevip.aspx?upgradeReason=" + c : "/register/upgradevip.aspx", f = "企业版";
        return d && (e = c ? "/register/upgradezunxiang.aspx?upgradeReason=" + c : "/register/upgradezunxiang.aspx",
            f = "企业尊享版"),
            g = "此功能仅对" + f + "用户开放，请<a target='_blank' class='wjx_alink' href=" + e + ">升级</a>!",
            2 == a ? (g = "此功能仅对" + f + "用户开放，请升级!",
                layer.alert(g, {
                    title: "提示"
                }, function () {
                    return b ? (b(),
                        layer.close(index),
                        !1) : (self != top ? window.parent.location.href = e : window.location.href = e,
                        void 0)
                }),
                !1) : 1 == a ? (g = "此功能仅对" + f + "用户开放，请升级!",
                layer.confirm(g, {
                    btn: ["立即升级", "取消"],
                    title: "提示"
                }, function (a) {
                    return b ? (b(),
                        layer.close(a),
                        !1) : (self != top ? window.parent.location.href = e : window.location.href = e,
                        void 0)
                }),
                !1) : (layer.alert(g, {
                btn: "知道了",
                title: "提示"
            }, function (a) {
                b && b(),
                    layer.close(a)
            }),
                void 0)
    }
    ,
    alertLink = function (a, b, c) {
        layer.confirm(a, {
            btn: [c, "关闭"],
            title: "提示"
        }, function (a, c) {
            var d = $(".layui-layer-btn0", c);
            d[0] ? (d[0].target = "_blank",
                d[0].href = b) : self != top ? window.parent.location.href = b : window.location.href = b
        })
    }
    ,
    alertnew = alertNew = function (a, b) {
        try {
            window.parent.layer ? window.parent.layer.alert(a, {
                btn: "知道了",
                title: "提示"
            }, b) : layer.alert(a, {
                btn: "知道了",
                title: "提示"
            }, b)
        } catch (c) {
            layer.alert(a, {
                btn: "知道了",
                title: "提示"
            }, b)
        }
    }
    ,
    window.alert = alertNew,
    confirmnew = lconfirm = function (a, b, c) {
        layer.confirm(a, {
            title: "提示"
        }, function (a) {
            b && b(),
                layer.close(a)
        }, function (a) {
            c && c(),
                layer.close(a)
        })
    }
    ,
    hasConfirm = !1,
    isalert = !1;
