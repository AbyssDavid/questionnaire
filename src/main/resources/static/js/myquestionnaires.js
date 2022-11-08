function judge_selected(a) {
    a.each(function () {
        $(this).hasClass("selected") || $(this).hover(function () {
            $(this).addClass("hover")
        }, function () {
            $(this).removeClass("hover")
        })
    })
}

function hover_tool(a) {
    a.hover(function () {
        $(this).addClass("hover")
    }, function () {
        $(this).removeClass("hover")
    })
}

function IE8_border(a) {
    a.hover(function () {
        $(this).css({
            "border-color": "#30a6f5",
            "border-radius": "8px"
        })
    }, function () {
        $(this).css({
            "border-color": "#808080",
            "border-radius": "8px"
        })
    })
}

function search_dom_method(a, b) {
    a.click(function () {
        var c, a = $(this);
        a.toggleClass("hover").parent().parent().parent().siblings().find(".title").removeClass("hover"),
            c = $(this).parent().parent().parent(),
            c.hasClass("touch") ? c.removeClass("touch") : c.addClass("touch").siblings().removeClass("touch"),
            c.toggleClass("selected").siblings().removeClass("selected"),
            c.hasClass("selected") ? b > 1366 ? c.addClass("enlarge").siblings().removeClass("enlarge") : c.addClass("narrow").siblings().removeClass("narrow") : b > 1366 ? c.removeClass("enlarge") : c.removeClass("narrow"),
            c.find(".open-questionnaire").toggle().parent().siblings().find(".open-questionnaire").hide()
    })
}


function restore_style(a) {
    a.click(function () {
        $(this).parent().parent().removeClass("selected enlarge narrow").find(".open-questionnaire").hide()
    })
}

function searchQ(a) {
    return a = window.event || a,
        13 == a.keyCode ? (a.returnValue = !1,
            btnSub.click(),
            !1) : !0
}

function statusChange(a, b, c) {
    return b ? (confirmnew(b, function () {
        hfActivity.value = a,
            hfStatus.value = c,
            btnStatusChange.click()
    }),
        !1) : (hfActivity.value = a,
        hfStatus.value = c,
        btnStatusChange.click(),
        !1)
}

function deleteClick(a) {
    return confirmnew("您确认要删除此问卷吗？", function () {
        document.getElementById("confirm_box"),
            hfActivity.value = a,
            btnDelete.click()
    }),
        !1
}

function setFolderName(a, b) {
    hfActivity.value = a,
        hfFolderName.value = b,
        btnSetFolder.click(),
        stopPropagation()
}

function deleteFolder(a) {
    hfFolderName.value = a,
        btnDeleteFolder.click(),
        stopPropagation()
}

function stopPropagation(a) {
    return a = window.event || a,
        document.all ? (a.cancelBubble = !0,
            a.returnValue = !1) : a.stopPropagation(),
        !1
}

function setFolder(a) {
    var c, b = document.getElementById("spanDdlFolder");
    return b ? (c = b.innerHTML,
        c += '<li value="' + a + '"><a href="javascript:void(0)">' + a + "</a></li>",
        b.InnerHtml = c,
        void 0) : (window.location.href = window.location.href,
        void 0)
}

function deleteOrder() {
    if (!confirm("确认吗？"))
        return !1;
    var a = new Date;
    a.setTime(a.getTime() - 1),
        document.cookie = "payorder=;Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;",
    divOrderTip && (divOrderTip.style.display = "none")
}

function setActivityFolder(a) {
    curSetFolder && (a.length > 5 && (curSetFolder.title = a,
        a = a.substring(0, 5) + "..."),
        curSetFolder.innerHTML = a || "文件夹")
}

function loadUpdate(a) {
    var b = a.height
        , c = a.width;
    b > 600 && (c = parseInt(600 * c / b) + 1,
        b = 600,
        a.height = 600),
        setTimeout(function () {
            var a = PDF_launch("noticeDiv", c, b);
            $("#layui-layer" + a + " .layui-layer-title").hide(),
                $("#layui-layer-iframe" + a).height(450),
                $("#layui-layer" + a + " .layui-layer-close1").css({
                    background: "rgba(0,0,0,0.64)",
                    height: "36px",
                    width: "36px",
                    right: "-45px",
                    top: "-9px",
                    "text-align": "center",
                    "line-height": "36px"
                }),
                $("#layui-layer" + a + " .layui-layer-close1").html("<i class='comIcon' style='color:#fff;font-size:24px'>&#xe71c;</i>"),
                document.getElementById("layui-layer1").style.cssText += "border-radius:0px!important;overflow-y:initial;height:600px;"
        }, 200)
}

function delFavorite(a, b) {
    a.stopPropagation(),
        confirmnew("确定不再显示此信息吗？", function () {
            var a, c;
            $(b).parent().remove(),
                a = "delFavorite",
                c = new Date,
                c.setHours(c.getHours() + 720),
                setCookie(a, "1", c.toGMTString(), "/", "", null)
        })
}

function setCookie(a, b, c, d, e, f) {
    document.cookie = a + "=" + escape(b) + (c ? "; expires=" + c : "") + (d ? "; path=" + d : "") + (e ? "; domain=" + e : "") + (f ? "; secure" : "")
}

function addLogGuanZhu() {
    addtolog("", userName, "pc", 0, "guanzhu")
}

function GetPromoteStr(a) {
    var f, b = a.link, c = a.id, d = a.name, e = a.icon;
    return f = b.indexOf(".mp4") > -1 ? "<a class='titmedia-icon' href='javascript:' video='" + b + "' pid='" + c + "' onclick='showVideo(this);'  onmouseenter=\"layer.tips('" + d + "视频介绍', this)\"><i class='comIcon' style='color:#888'>" + e + "</i><a>" : "<a class='titmedia-icon' href='" + b + "' pid='" + c + "' onclick='addPromoteLog(this);return true;' target='_blank'  onmouseenter=\"layer.tips('" + d + "介绍', this)\"><i class='comIcon' style='color:#888'>" + e + "</i><a>"
}

function IsMatchTitle(a, b) {
    var c, d, e, f, g;
    for (c = 0; c < a.length; c++) {
        for (d = a[c].keyword.split("&"),
                 e = !0,
                 f = 0; f < d.length; f++)
            if (g = new RegExp("(" + d[f] + ")", "ig"),
                !g.test(b)) {
                e = !1;
                break
            }
        if (e)
            return a[c]
    }
    return null
}

function addPromoteLog(a) {
    var b = $(a).parent().find(".item-tit")
        , c = b.attr("href")
        , d = /activity=(\d+)/gi
        , e = d.exec(c);
    e && e[1] && addtolog(e[1], userName, "", parseInt($(a).attr("pid")), "promote", b.attr("title"))
}

function showVideo(a) {
    var f, b = $("#divVideo"), d = $(a).attr("video"), e = 650 >= document.documentElement.clientHeight;
    (0 == $("#divVideo video").length || d != $("#divVideo source").attr("src")) && (f = "",
        e ? (f = '<video autoplay="autoplay" loop="loop" webkit-playsinline="true" controls="controls" width="658" height="400" class="video-container" x5-video-player-type="h5">',
            f += '<source src="' + d + '" type="video/mp4"></video>') : (f = '<video autoplay="autoplay" loop="loop" webkit-playsinline="true" controls="controls" width="1064" height="632" class="video-container" x5-video-player-type="h5">',
            f += '<source src="' + d + '" type="video/mp4"></video>'),
        b.html(f)),
        e ? PDF_launch("divVideo", 658, 400, function () {
            $("#divVideo video")[0].pause()
        }) : PDF_launch("divVideo", 1070, 650, function () {
            $("#divVideo video")[0].pause()
        }),
        $("#divVideo video")[0].play(),
        addPromoteLog(a)
}

$(function () {
    var c, d, e, f, g, i, j, k, l, q, m, n, o, p, r, s, b = ($(".user-info"),
        $(".main-wrapper .details-btn"));
    $(".bindWeixinBtn").click(function () {
        getWxData("imgWx", "divWxName"),
            $("#bingweiText,.bindWeixinBtn").hide(),
            $("#weixinWrap").show(),
            $(".bindWeixin").removeClass("minishow")
    }),
        $(".curopenicon").click(function (a) {
            a.stopPropagation(),
                a.preventDefault(),
                localStorage.setItem("knowdingapply", 1),
                $(".coolapply_online").hide()
        }),
    localStorage.getItem("knowdingapply") || $(".coolapply_online").show(),
    null != spanFolder && ($drop_wordFolder = $(".drop-word", spanFolder),
        $drop_box_liFolder = $(".drop-box li", spanFolder),
        $drop_box_liFolder.click(function () {
            hfFolder.value = $(this).attr("title") ? $(this).attr("title") : "全部",
                btnSub.click()
        })),
    null != pagehttml && ($("a,input[type=button]", pagehttml).click(function () {
        var a, b, c, d, e, f;
        if (!$(this).hasClass("current")) {
            if (a = $(this).attr("alt"),
            "button" == this.type)
                if (b = $(this).parent(),
                    c = b.find(".page-last").attr("alt"),
                    d = b.find("input[type=text]"),
                    a = d.val()) {
                    if (a - c > 0)
                        return alert("您输入的页码已经大于您的总页数，将自动跳转到最后一页"),
                            d.value = c,
                            void 0
                } else
                    a = 1;
            0 != a && (e = "/NewWJX/manage/MyQuestionnaires.aspx?pageindex=" + a,
                f = txtName.value,
            "请输入问卷名进行搜索..." != f && null != f && (e += "&txtName=" + encodeURIComponent(f)),
            window.hfUserName && "null" != hfUserName.value && "" != hfUserName.value && (e += "&hfUserName=" + encodeURIComponent(hfUserName.value)),
                window.isNewFolder ? "null" != hfTagId.value && "" != hfTagId.value && (e += "&hfFolde=" + encodeURIComponent(hfTagId.value)) : hfFolder && "null" != hfFolder.value && "" != hfFolder.value && (e += "&hfFolde=" + encodeURIComponent(hfFolder.value)),
            hfXingbiao && "1" == hfXingbiao.value && (e += "&hfxb=" + encodeURIComponent(hfXingbiao.value)),
            window.hidStatus && hidStatus.value && "-1" != hidStatus.value && (e += "&hs=" + hidStatus.value),
            (-1 != window.location.href.indexOf("?vr=1") || -1 != window.location.href.indexOf("&vr=1")) && (e += "&vr=1"),
            window.sortStyle && sortStyle.value && (e += "&sortbn=" + sortStyle.value),
                window.location.href = e)
        }
    }),
        c = $("input[type=text]", pagehttml)[0],
    c && (c.onkeydown = function (a) {
            return a = a || window.event,
                13 == a.keyCode ? ($("input[type=button]", pagehttml).trigger("click"),
                    !1) : void 0
        }
    )),
        hover_tool(b),
        $create_figure = $(".main-wrapper .create-box figure"),
        d = $(".main-wrapper .module-box figure"),
        d.first().addClass("clicked"),
        d.click(function () {
            $(this).addClass("clicked").siblings("figure").removeClass("clicked")
        }),
    "Microsoft Internet Explorer" == navigator.appName && "8." == navigator.appVersion.match(/8./i) && IE8_border(d),
        e = $(".drop-down"),
        f = e.find(".drop-obj"),
        g = f.siblings(".drop-box"),
        f.find(".drop-word"),
        e.hover(function () {
            $(this).find(f).addClass("hover").siblings(g).addClass("hover")
        }, function () {
            $(this).find(f).removeClass("hover").siblings(g).removeClass("hover")
        }),
        i = $(".main-wrapper .selectLf-list"),
        j = $(".main-wrapper .search-result"),
        i.eq(0).addClass("selected"),
        j.eq(0).show(),
        hover_tool(j.children()),
        i.click(function () {
            $(this).addClass("selected").siblings().removeClass("selected");
            var a = i.index(this);
            j.each(function () {
                $(this).index() !== a && $(this).find("li").removeClass("selected narrow").find(".open-questionnaire").hide()
            }),
                j.eq(a).show().siblings().hide(),
                $(this).removeClass("hover").unbind("mouseenter").unbind("mouseleave"),
                judge_selected(i)
        }),
        judge_selected(i),
        k = window.screen.width,
        j.each(function (a) {
            var b = $(j[a])
                , c = b.children()
                , d = c.find(".title")
                , e = c.find(".resultR-full");
            c.last().find(".ifram-header").css({
                "border-bottom": "none"
            }),
                search_dom_method(d, k),
                restore_style(e)
        }),
        l = $("#question").children(),
        l.eq(1).css({
            "background-color": "#f7f8f9"
        }),
        l.hover(function () {
            $(this).css({
                "background-color": "#f7f8f9"
            })
        }, function () {
        }),
        m = $(".nav-bar .nav-items"),
        n = m.find(".sub-item"),
        o = $(".nav-show"),
        p = o.find(".nav-box"),
        r = $(".inside-main .inside-box"),
        s = r.find(".box-items"),
        m.click(function () {
            $(this).addClass("clicked").children(".sub-item").slideDown().parent().siblings().removeClass("clicked").children(".sub-item").slideUp(),
                q = m.index(this),
                p.eq(q).show().siblings().hide(),
                s.eq(q).show().siblings().hide()
        }),
        s.each(function () {
            $(this).children().first().show().siblings().hide()
        }),
        m.first().trigger("click"),
        n.each(function () {
            $(this).children().click(function () {
                var a = $(this)
                    , b = a.index();
                a.addClass("current").siblings().removeClass("current"),
                    s.eq(q).children().eq(b).show().siblings().hide(),
                    2 > q && 0 != b ? p.eq(q).children().eq(b - 1).addClass("clicked").siblings().removeClass("clicked") : q >= 2 ? p.eq(q).children().eq(b).addClass("clicked").siblings().removeClass("clicked") : p.eq(q).children().removeClass("clicked")
            })
        }),
        p.each(function () {
            $(this).children().click(function () {
                var a = $(this)
                    , b = a.index();
                a.removeClass("hover").addClass("clicked").siblings().removeClass("clicked"),
                    2 > q ? s.eq(q).children().eq(b + 1).show().siblings().hide() : s.eq(q).children().eq(b).show().siblings().hide(),
                    m.eq(q).find(".sub-item").children("li").eq(b).addClass("current").siblings().removeClass("current")
            }).hover(function () {
                var a = $(this);
                a.hasClass("clicked") || a.addClass("hover")
            }, function () {
                var a = $(this);
                a.removeClass("hover")
            })
        })
}),
    window.onload = function () {
        setTimeout(function () {
            lblToolTip && (lblToolTip.style.display = "none")
        }, 2e4)
    }
    ,
    $(function () {
        var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, a = $(window).width();
        if ($(window).resize(function () {
            if (a = $(window).width(),
            a >= 1440) {
                var b = a - 1392;
                $(".control_left").css("left", b / 2)
            } else
                $(".control_left").css("left", 24)
        }),
            a > 1440 ? (b = a - 1392,
                $(".control_left").css("left", b / 2).show()) : ($(".bindWeixin,.addFavorite,.wjx_adWrap").addClass("minishow"),
                $(".control_left").show()),
            c = $(".folderCont .chrome_scrollbar"),
            d = c.find(".cur"),
        d.length > 0 && c.scrollTop(d.offset().top - c.offset().top + c.scrollTop()),
        divNotify || ($("#fixheight").height(56),
            $(".control_left").css("top", 80)),
            $("#folderManage").click(function () {
                return isVip ? ($(this).parents("li").toggleClass("open"),
                    void 0) : ($(divEmpty).hide(),
                    $(divEmptySearch).hide(),
                    $(".folderbtn").not(this).removeClass("cur"),
                    $(this).addClass("cur"),
                    $(".survey-list,.wjxui-page").hide(),
                    $("#vipEmpty").show(),
                    $(".vipText").text("文件夹功能 仅针对企业版用户开放"),
                    $(".vipIconWrap").html('<img src="/images/commonImgPC/folder@2x.png" alt="">'),
                    !1)
            }),
            $("#manageBtn,.addfolderbtn").click(function (a) {
                a.stopPropagation(),
                    PDF_launch("/wjx/manage/managefolder.aspx", 760, 630, function () {
                        window.parent.location.href = window.parent.location.href
                    })
            }),
            $(".folderItem").click(function () {
                return hfXingbiao.value = "",
                    $(this).attr("title") ? hfFolder.value = $(this).attr("title") : (hfFolder.value = "全部",
                    window.hfTagId && (hfTagId.value = "")),
                    btnSub.click(),
                    !1
            }),
            $(selectChildAccount).change(function () {
                if (hfUserName) {
                    var a = $(this).val();
                    hfUserName.value = a,
                        btnSub.click()
                }
                return !1
            }),
            $("#astarQ").on("click", function () {
                return $(divEmptySearch).hide(),
                    $(divEmpty).hide(),
                    isVip ? isVip && 0 == xbListCount ? ($(".folderbtn").not(this).removeClass("cur"),
                        $(this).addClass("cur"),
                        $(".survey-list,.wjxui-page").hide(),
                        $("#vipEmpty").show(),
                        $(".vipIconWrap").html('<img src="/images/commonImgPC/emptyxinbiao@2x.png" alt="">').css({
                            width: "80px",
                            height: "80px"
                        }),
                        $(".vipText").text("暂无星标问卷"),
                        $(".emptyBtn").hide(),
                        !1) : (hfXingbiao.value = "1",
                        hfFolder.value = "",
                        btnSub.click(),
                        !1) : ($(".folderbtn").not(this).removeClass("cur"),
                        $(this).addClass("cur"),
                        $(".survey-list,.wjxui-page").hide(),
                        $("#vipEmpty").show(),
                        $(".vipIconWrap").html('<img src="/images/commonImgPC/xinbiao@2x.png" alt="">'),
                        $(".vipText").text("星标功能 仅针对企业版用户开放"),
                        !1)
            }),
        window.isNewFolder || $("#manageBtn").show(),
            $(spanFolder).click(function () {
                return window.isNewFolder ? layer.prompt({
                    formType: 2,
                    title: "新建文件夹",
                    area: ["344px", "64px"],
                    success: function (a) {
                        $(a).find(".layui-layer-input").attr("placeholder", "换行可以批量添加")
                    }
                }, function (a, b) {
                    $.post("/handler/tag/taginfo.ashx?type=add", {
                        names: a
                    }, function (a) {
                        var b, c, d;
                        if (!a.success && a.msg)
                            return alert(a.msg),
                                void 0;
                        for (layer.msg("添加成功"),
                                 b = a.data,
                                 c = "",
                                 d = 0; d < b.length; d++)
                            c += '<li data-path="/' + b[d].Name + '/" data-nname="' + b[d].Name + '" data-level="' + b[d].Level + '" data-id="' + b[d].Id + '" data-parentid="' + b[d].ParentId + '" class="wjxtree_node open"><div class="wjxtree_cont"><span class="wjxtree_toggle" style="visibility:hidden"><i class="index_iconfont wjxtree_close">&#xe635;</i><i class="index_iconfont wjxtree_open">&#xe633;</i></span><a class="wjxtree_anchor" href="javascript:;" title="' + b[d].Name + '"><i class="wjxtree_icon iconfont vab">&#xe66a;</i>' + b[d].Name + '</a><i class="wjxtree_custom_checked iconfont vab"></i><i class="iconfont folderControl">&#xe667;</i></div></li>';
                        $(".folderWrap>ul").append($(c))
                    }),
                        layer.close(b)
                }) : PDF_launch("/wjx/manage/createfolder.aspx", 420, 350),
                    !1
            }),
            window.indexPageQywxRecommendation)
            for (e = window.indexPageQywxRecommendation.split("¤"),
                     f = 0; f < e.length; f++)
                g = e[f],
                    h = window.localStorage.getItem("wjxls_indexAddata" + f),
                h && h.split("|")[0] == g || (h = g + "|show",
                    window.localStorage.setItem("wjxls_indexAddata" + f, h)),
                    i = h.split("|"),
                    j = i[1],
                    k = $("#wjx_adWrap" + f),
                    "hide" != j ? (l = i[0].split(","),
                        m = l[0],
                        n = l[1],
                        o = l[2],
                        p = l[4],
                        m && o ? (k.show(),
                            q = "return addtolog('', '" + userName + "'" + ",'" + p + "', 0);",
                            k.find("a").attr("href", o).attr("onclick", q),
                            k.find(".normalsrc").attr("src", m),
                            k.find(".minisrc").attr("src", n)) : k.hide(),
                        k.find(".closeAd").click(function () {
                            var a = this;
                            layer.confirm("您确定关闭么？", function (b) {
                                $(a).parent().hide();
                                var c = $(a).parent().attr("index");
                                window.localStorage.setItem("wjxls_indexAddata" + c, e[c].split("|")[0] + "|hide"),
                                    layer.close(b)
                            })
                        })) : k.hide()
    }),
    $(function () {
        function a() {
            var a, b, c, d, e;
            if (window.keywordPromoteStr) {
                for (a = keywordPromoteStr.split("¤"),
                         b = new Array,
                         c = 0; c < a.length; c++)
                    d = a[c].split("§"),
                        e = new Object,
                        e.keyword = d[0],
                        e.link = d[1],
                        e.icon = d[2],
                        e.id = d[3],
                        e.name = d[4],
                        b.push(e);
                $(".item-top .item-tit").each(function () {
                    var c, d, e, a = $(this).attr("title");
                    $(this).find(".titmedia-icon").length > 0 || (c = IsMatchTitle(b, a),
                    c && (d = $(".item-top").find(".titmedia-icon[pid=" + c.id + "]"),
                    d.length > 0 || (e = GetPromoteStr(c),
                        $(this).parent().append(e))))
                })
            }
        }

        a()
    });
