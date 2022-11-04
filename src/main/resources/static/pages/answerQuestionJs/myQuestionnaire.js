/**
 * Created by Amy on 2018/8/7.
 */
var questIdModal = '';
deleteCookie('dataId')
deleteCookie('isEdit')
$(function () {
    isLoginFun();
    var userName = getCookie('userName');
    header();
    $("#ctl01_lblUserName").html(userName);
    getProjectQuest();
    createDtePicker()
});

//回车事件
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        getProjectQuest();
    }
});

// 查看项目及其包含的问卷列表
function getProjectQuest() {
    var keyWord = $("#keyWord").val();
    var questionStatus = $("#questionStatus").val()
    var userName = getCookie("userName");
    var url = '/queryProjectList';
    var data = {
        "projectName": keyWord,
        "createdBy": userName,
        "questionStatus": questionStatus,
        "type": $("[name='type']:checked").val()
    };
    commonAjaxPost(true, url, data, getProjectQuestSuccess);
    // var rr = JSON.parse('{"code":"666","data":[{"projectContent":"项目名","id":"708a580ce83c49c0a0cfc65b151d690e","projectName":"静态测试数据","createDate":"2022-05-13T15:05:40"}],"message":null}')
    // getProjectQuestSuccess(rr)
}

// 查看项目及其包含的问卷列表成功回调
function getProjectQuestSuccess(result) {
    if (result.code == "666") {
        `1`
        var data = result.data;
        $("#panel-23802").empty();
        //遍历多个项目
        var text = "";
        if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
                var projectInfo = data[i];
                var projectName = projectInfo.projectName;
                if (projectName.length >= 25) {
                    projectName = projectName.substring(0, 26) + "...";
                }
                text += " <div class=\"panel panel-default\" id=\"projectOne" + i + "\" >";
                text += "     <div class=\"panel-heading\" style='text-align: left'>";
                text += "         <a class=\"panel-title\" data-toggle=\"collapse\" id=\"projcetNumber" + i + "\" data-parent=\"#panel-23802\" href=\"#panel-element-" + projectInfo.id + "\">" + projectName + "</a>";
                text += "";
                text += "         <div class=\"operation-box pull-right\" style=\"font-size: 16px;\">";
                text += "             <a class=\"pull-left release-items\" title=\"创建问卷\" onclick=\"createGetProjectInfo(" + "'" + projectInfo.id + "'" + "," + "'" + projectInfo.projectName + "'" + ")\">";
                text += "                 <i class=\"icon release-icon\"></i>创建问卷</a>";
                text += "             <a href=\"javascript:void(0)\" id=\"projcetShow" + i + "\" class=\"pull-left copy-items\" onclick=\"getProjectInfo(" + "'" + projectInfo.id + "'" + ")\"><i class=\"icon copy-icon\"></i>查看</a>";
                text += "             <a class=\"pull-left item-remind\" id=\"projcetUpdate" + i + "\" href=\"javascript:void(0)\" onclick=\"editProject(" + "'" + projectInfo.id + "'" + "," + "'" + projectInfo.projectName + "'" + "," + "'" + projectInfo.projectContent + "'" + ")\"><i class=\"icon remind-icon\"></i>编辑</a>";
                text += "             <a href=\"javascript:void(0)\" class=\"pull-left cutout-items\" title=\"删除此项目\" onclick=\"deleteProject(" + "'" + projectInfo.id + "'" + ")\"><i class=\"icon cutout-icon\"></i>删除 </a>";
                text += "         </div>";
                text += "";
                text += "     </div>";

                if (i == 0) {
                    text += "     <div id=\"panel-element-" + projectInfo.id + "\" class=\"panel-collapse collapse in\">";

                } else {
                    text += "     <div id=\"panel-element-" + projectInfo.id + "\" class=\"panel-collapse collapse\">";

                }
                text += "         <div class=\"panel-body\">";
                text += "             <!--Anim pariatur cliche...-->";
                text += "";
                text += "";
                if (!projectInfo.questions || projectInfo.questions.length === 0) {
                    text += "<span style=\"color:#d9534f;font-size:16px\">暂无调查问卷或问卷已过期</span>";
                } else {
                    let arr = projectInfo.questions
                    text += "<table class='table table-striped' style='font-size: 20px'>\n" +
                        "    <thead>\n" +
                        "    <tr>\n" +
                        "        <th>问卷名称</th>\n" +
                        "        <th style='text-align:right;'>操作</th>\n" +
                        "    </tr>\n" +
                        "    </thead>\n" +
                        "    <tbody style='text-align: left'>";
                    var c = 1;
                    arr.forEach(item => {
                        text += "    <tr>" +
                            "        <td>" + item.questionName + "</td>\n" +
                            "        <td style='text-align: right'>";
                        if (item.status !== 2) {
                            text += "            <button class=\"btn btn-warning btn-lg\" onclick=\"handlerUpdateInfo('" + item.id + "')\">修改</button>"
                            text += "            <button class=\"btn btn-danger btn-lg\" onclick=\"updateStatus('" + item.id + "','" + 0 + "')\">删除</button>"
                            text += "            <button class=\"btn btn-success btn-lg\" id='getRecoverRunModal" + c + "' onclick=\"recoverRun(" + "'" + item.id + "','" + c + "','" + projectInfo.id + "')\">开启</button>"
                        } else {
                            text += "<button class=\"btn btn-warning btn-lg\" onclick=\"updateStatus('" + item.id + "','" + 1 + "')\">暂停</button>"
                            text += "<button class=\"btn btn-success btn-lg\" onclick=\"sendQuestion('" + item.id + "')\">发送问卷</button>"
                        }
                        text += "<button class=\"btn btn-primary btn-lg\" onclick=\"previewQuestion('" + item.id + "')\">预览</button>"
                        text += "</td></tr>"
                        c++
                    })
                    text += "    </tbody>\n" +
                        "</table>"
                }
                text += "         </div>";
                text += "     </div>";
                text += " </div>";
                // }
            }
            //for循环结束
            $("#panel-23802").append(text);
        } else {
            layer.msg("暂无符合条件的项目", {icon: 0})
        }
    } else if (result.code == "333") {
        layer.msg(result.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(result.message, {icon: 2})
    }

}

function sendQuestion(id) {
    window.location.href='sendQuestionnaire.html?questionId='+id
}

function handlerUpdateInfo(id) {
    commonAjaxPost(false,'/queryQuestionnaireById/'+id,undefined,function (res) {
        if(res.code=='666'){
            console.log(res)
            if(res.data.releaseTime){
                layer.msg('问卷已经发送过了，不能修改',{icon:2})
            }else {
                window.location.href = 'namedQuestionnaire.html?questionId=' + id
            }
        }
    })
}

function updateStatus(id, status) {
    let data = {
        'id': id,
        'status': status
    }
    commonAjaxPost(true, '/updateQuestionStatus', data, function (result) {
        // //console.log(result);
        if (result.code == "666") {
            layer.msg(result.message, {icon: 1});
            getProjectQuest();
        } else if (result.code == "333") {
            layer.msg(result.message, {icon: 2});
            setTimeout(function () {
                window.location.href = 'login.html';
            }, 1000);
        } else if (result.code == "30001") {
            layer.msg(result.message, {icon: 7});
        } else {
            layer.msg(result.message, {icon: 2});
        }
    });
}

function previewQuestion(id) {
    window.open("previewQuestionnaire.html?i=" + id);
}

// 删除项目
function deleteProject(projectId) {
    layer.confirm('您确认要删除此项目吗？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        var url = '/deleteProjectById';
        var data = {
            "id": projectId
        };
        commonAjaxPost(true, url, data, function (result) {
            // //console.log(result);
            if (result.code == "666") {
                layer.msg(result.message, {icon: 1});
                getProjectQuest();
            } else if (result.code == "333") {
                layer.msg(result.message, {icon: 2});
                setTimeout(function () {
                    window.location.href = 'login.html';
                }, 1000);
            } else if (result.code == "30001") {
                layer.msg(result.message, {icon: 7});
            } else {
                layer.msg(result.message, {icon: 2});
            }
        });
    }, function () {
    });
}


// 编辑项目，在问卷未发布的状态下才可以编辑项目信息
function editProject(id, name, content) {
    deleteCookie("projectId");
    deleteCookie("projectName");
    deleteCookie("projectContent");
    setCookie("projectId", id);
    setCookie("projectName", name);
    setCookie("projectContent", content);
    window.location.href = 'editProject.html'
}

// 查看项目详细信息
function getProjectInfo(id) {
    deleteCookie("projectId");
    setCookie("projectId", id);
    window.location.href = 'projectInfo.html'
}

// 为了创建问卷而获取项目id、项目名称
function createGetProjectInfo(id, name) {
    localStorage.setItem("projectIdForCreate", id);
    localStorage.setItem("projectNameForCreate", name);
    window.location.href = "createQuestionnaire.html"
}

// 创建时间选择器
function createDtePicker() {
    var beginTimeTake;
    var nowTime = getFormatDate();

    $('#endTimeModal').daterangepicker({
            minDate: nowTime,
            singleDatePicker: true,
            showDropdowns: true,
            // autoUpdateInput: false,
            timePicker24Hour: true,
            startDate: new Date(),
            timePicker: true,
            "locale": {
                "resetLabel": "重置",
                "format": 'YYYY/MM/DD HH:mm:ss',
                "separator": " ~ ",//
                "applyLabel": "确定",
                "cancelLabel": "取消",
                "fromLabel": "起始时间",
                "toLabel": "结束时间'",
                "customRangeLabel": "自定义",
                "weekLabel": "W",
                "daysOfWeek": ["日", "一", "二", "三", "四", "五", "六"],
                "monthNames": ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                "firstDay": 1

            }
        },
        function (start, end, label) {
            beginTimeTake = start;
            if (!this.startDate) {
                this.element.val('');
            } else {
                this.element.val(this.startDate.format(this.locale.format));
            }
        });
}

// 恢复运行
function recoverRun(id, i, projectId) {
    questIdModal = id;
    $("#getRecoverRunModal" + i).attr('data-toggle', 'modal');
    $("#getRecoverRunModal" + i).attr('data-target', '#recoverRunModal');
    $("#endTimeModal").val("")
    window.recoverRunprojectId = projectId
}

function recoverRunBtn() {
    var endTimeModal = $("#endTimeModal").val();
    if (endTimeModal == "") {
        layer.msg("问卷结束时间不能为空", {icon: 2});
    } else {
        var endTimeModalChan = dateChange(endTimeModal);

        var url = '/modifyHistoryQuestionnaireStatus';
        var data = {
            "id": questIdModal,
            "endTime": endTimeModalChan,
            'status': 2
        }
        commonAjaxPost(true, url, data, function (result) {
            if (result.code == '666') {
                $("#recoverRunModal").modal('hide');
                layer.msg("问卷已恢复运行", {icon: 1});
                getProjectQuest();
            } else if (result.code == "333") {
                layer.msg(result.message, {icon: 2});
                setTimeout(function () {
                    window.location.href = 'login.html';
                }, 1000)
            } else {
                layer.msg(result.message, {icon: 2})
            }
        })

    }
}