var projectName = '';
var dataId = '';
$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    projectName = localStorage.getItem('projectNameForCreate');
    $('#belongProject').val(projectName);
    $('#belongProject').css('cursor', 'not-allowed');
    createUserSelect()
});

function createUserSelect() {
    var belongType = document.getElementById('belongType');
    belongType.options.length = 0;
    var student = document.createElement('option');
    student.innerText = "学生";
    student.value = "1";
    belongType.appendChild(student);
    var teacher = document.createElement('option');
    teacher.innerText = "教师";
    teacher.value = "2";
    belongType.appendChild(teacher);
}


//点击创建问题，跳转到namedQuestionnaire.html，
function createQuestion() {
    deleteCookie('TQuestionName');
    deleteCookie('TQuestionContent');
    deleteCookie('QuestionId');
    dataId = $('#belongType').val();
    setCookie('dataId', dataId);
    window.location.href = 'namedQuestionnaire.html?i=';
}

//导入模板 历史模板或类型模板
function importQuestion(type) {
    setCookie('hORt', type);
    dataId = $('#belongType').val();
    // type 1:历史问卷模板  2：调查类型模板
    if (type == 1) {
        var url = '/queryHistoryQuestionnaire';
        var da = {
            'projectId': localStorage.getItem('projectIdForCreate'),
            'dataId': dataId,
            'createdBy': getCookie('userName')
        };
        commonAjaxPost(true, url, da, queryHistoryQuestionnaireSuccess);
        // queryHistoryQuestionnaireSuccess();
    } else {
        var urlModal = '/queryQuestionnaireMould';
        var da1 = {
            'projectId': localStorage.getItem('projectIdForCreate'),
            'dataId': dataId,
            'createdBy': getCookie('userName')
        };
        commonAjaxPost(true, urlModal, da1, queryQuestionnaireMouldSuccess);
        // queryQuestionnaireMouldSuccess()
    }
}

//删除模板
function deleteModal(that, modalId) {
    //console.log(modalId)
    // 询问框
    layer.confirm('您确认要删除此模板吗？', {
        btn: ['确定', '取消'] //按钮
    }, function () {
        var url = '/deleteQuestionnaireById';
        var da = {
            'id': modalId
        };
        commonAjaxPost(true, url, da, deleteQuestionnaireByIdSuccess);
        deleteQuestionnaireByIdSuccess();
        var div = $(that).parent('.figure');
        div.css("display", "none");
        layer.msg('删除成功', {icon: 1});
    }, function () {
    });
}

//点击div 查看模板具体信息
function viewModal(questionId) {
    window.open("previewQuestionnaire.html?i=" + questionId);
}

//查询历史模板的成功回调
function queryHistoryQuestionnaireSuccess(res) {
    //console.log(res);
    if (res.code == "666") {
        $("#typeQuestion").css("display", "none");
        if (res.data.length == 0) {
            layer.msg("暂无历史问卷", {icon: 2});
            return
        }
        $("#line").css("display", "block");
        $("#historyQuestion").css("display", "block");
        $('#historyQuestion').empty();
        for (var i = 0; i < res.data.length; i++) {
            var historyModal_div = '   <div class="figure">' +
                '                    <div class="pic-box icon survey-icon pull-left"></div>' +
                '                    <div class="details-wrapper pull-left">' +
                '                        <div class="details-title">' +
                '                            <span class="pull-left">' + res.data[i].questionName + '</span>' +
                '                        </div>' +
                '                    </div>' +
                '                    <div class="clear dotted-line--solid"></div>\n' +
                '                    <a href="#" class="btn btn-blue-frame main__btn--new" onclick=\'importModal(' + '"' + res.data[i].id + '"' + ',' + '"' + res.data[i].questionName + '"' + ',' + '"' + res.data[i].questionContent + '"' + ',' + '"' + res.data[i].projectId + '")\'>导入</a>' +
                '                </div>';
            $("#historyQuestion").append(historyModal_div);
        }
    } else if (res.code == "333") {
        layer.msg(res.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(res.message, {icon: 2})
    }
}

//查询问卷模板的成功回调
function queryQuestionnaireMouldSuccess(res) {
    //console.log(res);
    if (res.code == "666") {
        if (res.data.length == 0) {
            layer.msg("暂无模板", {icon: 2});
            return
        }
        $("#historyQuestion").css("display", "none");
        $("#line").css("display", "block");
        $("#typeQuestion").css("display", "block");
        $('#typeQuestion').empty();
        for (var i = 0; i < res.data.length; i++) {
            var historyModal_div = '   <div class="figure">' +
                '                    <div class="pic-box icon survey-icon pull-left"></div>' +
                '                    <div class="details-wrapper pull-left">' +
                '                        <div class="details-title">' +
                '                            <span class="pull-left">' + res.data[i].questionName + '</span>' +
                '                        </div>' +
                '                    </div>' +
                '                    <div class="clear dotted-line--solid"></div>\n' +
                '                    <a href="#" class="btn btn-blue-frame main__btn--new" onclick=\'importModal(' + '"' + res.data[i].id + '"' + ',' + '"' + res.data[i].questionName + '"' + ',' + '"' + res.data[i].questionContent + '"' + ',' + '"' + res.data[i].projectId + '")\'>导入</a>' +
                '                </div>';
            $("#typeQuestion").append(historyModal_div);
        }
    } else if (res.code == "333") {
        layer.msg(res.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(res.message, {icon: 2})
    }
}

//创建模板
function createModal() {
    var questionName = $('#questNameModal').val();
    var questionContent = $('#questDescribeModal').val();
    if (questionName == '') {
        layer.msg("模板名称不能为空!", {icon: 2});
        return
    } else if (questionContent == '') {
        layer.msg("模板说明不能为空!", {icon: 2});
        return
    }
    deleteCookie('isEdit')
    var da = {
        'questionName': questionName,
        'questionContent': questionContent,
        'startTime': "",
        'endTime': "",
        'dataId': $('#belongType').val(),
        'questionStop': '0'
    };
    var url = '/addQuestionnaire';
    commonAjaxPost(true, url, da, addQuestionnaireSuccess);
    addQuestionnaireSuccess();
}

function deleteQuestionnaireByIdSuccess(res) {
    //console.log(res);
    if (res.code == '666') {
        layer.msg(res.message);
    } else if (res.code == "333") {
        layer.msg(res.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(res.message, {icon: 2})
    }
}

//编辑模板
function editModal(questionId) {
    var qId = $.base64.encode(questionId);
    var url = "designQuestionnaire.html?qId=" + qId;//此处拼接内容
    // window.location.href = url;
    window.open(url)
}

//导入模板
function importModal(questionId, questionName, questionContent, projectId) {
    deleteCookie('QuestionId');
    deleteCookie('isEdit');
    deleteCookie('TQuestionName');
    deleteCookie('TQuestionContent');
    //2为导入
    setCookie('isEdit', '2');
    setCookie('historyQuestionId', questionId);
    setCookie('TQuestionName', questionName);
    setCookie('TQuestionContent', questionContent);
    setCookie('projectIdForCreate', projectId);
    setCookie('dataId', dataId);
    window.location.href = 'namedQuestionnaire.html';
}

//切换所属的调查类型
function changeType() {
    deleteCookie('dataId');
    $("#line").css("display", "none");
    $("#typeQuestion").css("display", "none");
    $("#historyQuestion").css("display", "none");
    var options = $("#belongType option:selected");
    $("#questBelong").val(options.text());
    setCookie('dataId', options.val());
    //console.log(getCookie('dataId'))
}

//创建成功回调
function addQuestionnaireSuccess(res) {
    console.log(res);
    if (res.code == '666') {
        layer.msg(res.message, {icon: 1});
        // window.location.reload();
        $(".modal").modal("hide");
        importQuestion(2)
        $("#questNameModal").val("")
        $("#questDescribeModal").val("")
        importQuestion(getCookie("hORt"))
    } else if (res.code == "333") {
        layer.msg(res.message, {icon: 2});
        setTimeout(function () {
            window.location.href = 'login.html';
        }, 1000)
    } else {
        layer.msg(res.message, {icon: 2});
    }
}

//取消按钮
function cancel() {
    //清空输入框
    $('#questNameModal').val('');
    $('#questDescribeModal').val('');

}