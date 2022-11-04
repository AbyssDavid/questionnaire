var questionId = '';
var questionList = [];
var timeStart = '';
var id = '';
var contact = '';
var eORp = 'zzz';     //判断是邮箱还是手机号还是连接
var flag = "false";


$(function () {
    $("#layui-layer1").css('top', '45%');
    $("#layui-layer1").css('left', '45%');

    // layer.load(2);
    getUrlInfo();
    getQrcode();
    //获取开始答题时间
    timeStart = new Date()
    //判断有没有答过
    da = {}
    var url = '/queryQuestionnaireById/' + id;
    if (eORp != 'zzz') {
        if (eORp == 'p') {
            userCheck()
        } else {
            //链接
            if(!contact || contact!=='') {
                window.location.href = 'linkAnswerCheck.html?questionId=' + id
            }else{
                //查询题目信息
                commonAjaxPost(true, url, undefined, queryQuestionnaireByIdSuccess);
            }
        }
    } else {
        //查询题目信息
        commonAjaxPost(true, url, undefined, queryQuestionnaireByIdSuccess);
    }

});

function userCheck() {
    if (!contact || contact==='') {
        window.location.href = 'linkAnswerCheck.html?questionId=' + id
    }
    commonAjaxPost(false,'/checkWhetherItCanBeFilledIn/'+id+'/'+contact,undefined,function (res) {
        if(res.code=='666'){
            commonAjaxPost(true, '/queryQuestionnaireById/' + id, undefined, queryQuestionnaireByIdSuccess);
        }else{
            layer.msg(res.message,{icon:2})
        }
    })
}


//提交答案
function submitQuestionnaire() {
    if (eORp == "zzz") {
        alert("预览状态，无法答题");
        return;
    } else {
        //获取答题结束时间
        var timeEnd = new Date()
        var ipAddress = returnCitySN["cip"];     //获取ip
        var answerList = [];
        for (let i = 0; i < questionList.length; i++) {
            let item = questionList[i]
            let val = ''
            switch (String(item.questionType)) {
                case "0":
                    val = $("[name='" + item.id + "']:checked").val()
                    break
                case "1":
                    let arr = $("[name='" + item.id + "']:checked")
                    let t = []
                    for (let j = 0; j < arr.length; j++) {
                        t.push($(arr[j]).val())
                    }
                    val = t.join('@@')
                    break
                case "2":
                    val = $("[name='" + item.id + "']").val()
                    break
                case "3":
                    val = $("[name='" + item.id + "']:checked").val()
                    break
                case "4":
                    val = $("[name='" + item.id + "']:checked").val()
                    break
            }
            if ((!val || val === '') && item.required == '1') {
                layer.msg('第' + (i + 1) + '题还没有填写', {icon: 2})
                return;
            }
            answerList.push({
                'problemId': item.id,
                'value': val
            })
        }

        var da = {
            'questionId': id,
            'answerList': answerList,
            'ipAddress': ipAddress,
            'startTime': timeStart,
            'endTime': timeEnd,
            'personId': contact
        };
        if (eORp == 'p') {
            console.log(da)
            var url = '/addAnswerQuestionnaire';
            commonAjaxPost(false, url, da, addSuccess,addError)
        } else {
            alert("预览状态不支持答题")
        }
    }
}

function addError(jqXHR, textStatus, errorThrown) {
    location.reload();
}

//提交答案的成功回掉
function addSuccess(res) {
    // location.reload();
    console.log(res)
    if (res.code == '666') {
        alert(res.data);
        $('.questionnaire').html('<p style="width: 60%; margin: 200px auto;text-align: center;font-size: 16px;">' + res.data + '</p>')
    } else {
        alert(res.message);
    }
}

//根据id 查询问卷详细信息的成功回掉
function queryQuestionnaireByIdSuccess(res) {
    console.log(res)
    if (res.code == '666') {
        setQuestion(res);
    } else {
        layer.msg(res.message);
    }
}

//根据传过来的题铺界面
function setQuestion(result) {

    layer.closeAll('loading');
    $('#questionnaireTittle1').html(result.data.questionName);

    $('.officialTips').html(result.data.questionContent);
    questionList = result.data.questionList;
    if (questionList != null) {
        for (var i = 0; i < questionList.length; i++) {
            var questionType = String(questionList[i].questionType);
            switch (questionType) {
                case "0": //单选
                case "1": //多选123
                    var question_div = '<div class="form-group" data-t="' + questionType + '"></div>';
                    var question_options = '<ul class="options" style="margin-left: 15px;"></ul>';
                    for (var j = 0; j < questionList[i].questionOption.length; j++) {
                        //题目选项
                        var option_word = questionList[i].questionOption[j].optionWord;
                        //判断是多选还是单选
                        if (questionType == "1") {
                            var li = '<li><label><input name="' + questionList[i].id + '" type="checkbox" value="' + questionList[i].questionOption[j].optionWord + '"><span style="margin-left: 5px;font-weight: 500;vertical-align: bottom;">' + option_word + '</span></label></li>';
                            question_options = $(question_options).append(li);                //添加选项内容
                        } else {
                            var li = '<li><label><input name="' + questionList[i].id + '" type="radio" value="' + questionList[i].questionOption[j].optionWord + '"><span style="margin-left: 5px;font-weight: 500;vertical-align: bottom;">' + option_word + '</span></label></li>';
                            question_options = $(question_options).append(li);                //添加选项内容
                        }

                    }
                    question_options = $(question_options).append('<div class="clear"></div>');     //清除浮动
                    if (questionList[i].required == "1") {
                        question_div = $(question_div).append('<div><label><span class="req">*</span><span class="title">' + (i + 1) + '. ' + questionList[i].questionTitle + '</span></label></div>');        //添加标题
                    } else {
                        question_div = $(question_div).append('<div><label><span>&nbsp;&nbsp;&nbsp;</span><span class="title">' + (i + 1) + '. ' + questionList[i].questionTitle + '</span></label></div>');        //添加标题
                    }
                    question_div = $(question_div).append(question_options);      //添加选项
                    $(".container-fluidT").append(question_div);
                    break;
                case "2": //填空
                    var question_div = '<div class="form-group" data-t="' + questionType + '"></div>';
                    if (questionList[i].required == "1") {
                        question_div = $(question_div).append('<div><label><span class="req">*</span><span class="title">' + (i + 1) + '.' + questionList[i].questionTitle + '</span></label></div>');        //添加标题
                    } else {
                        question_div = $(question_div).append('<div><label><span>&nbsp;&nbsp;&nbsp;</span><span class="title">' + (i + 1) + '.' + questionList[i].questionTitle + '</span></label></div>');        //添加标题
                    }
                    question_div = $(question_div).append('<textarea class="answerContent" name="' + questionList[i].id + '"></textarea>');        //添加输入文本框
                    $(".container-fluidT").append(question_div);
                    break;
                case "3": //矩阵
                    var question_div = '<div class="form-group" data-t="' + questionType + '"></div>';
                    if (questionList[i].required == "1") {
                        question_div = $(question_div).append('<div><label><span class="req">*</span><span class="title">' + (i + 1) + '.' + questionList[i].questionTitle + '</span></label></div>');        //添加标题
                    } else {
                        question_div = $(question_div).append('<div><label><span>&nbsp;&nbsp;&nbsp;</span><span class="title">' + (i + 1) + '.' + questionList[i].questionTitle + '</span></label></div>');        //添加标题
                    }
                    var tswjdc_table = ' <table width="90%" style="margin-left:20px" border="0" cellspacing="0" cellpadding="0" class="tswjdc_table">' +
                        '<tbody></tbody>' +
                        '</table>';
                    var tr = '<tr><td style="width: 124px"></td></tr>';
                    // var trR = '<tr><td>' + questionList[i].questionOption[0].lineTitle + '</td></tr>';
                    for (var k = 0; k < questionList[i].questionOption.length; k++) {
                        var td = '';
                        td = '<td>' + questionList[i].questionOption[k].optionWord + '</td>';
                        tr = $(tr).append(td);
                        tswjdc_table = $(tswjdc_table).append(tr);
                    }
                    for (var p = 0; p < questionList[i].questionOption.length; p++) {
                        if (questionList[i].questionOption[p].lineTitle != '') {
                            var trR = '<tr><td style="width: 124px">' + questionList[i].questionOption[p].lineTitle + '</td></tr>';
                            for (var m = 0; m < questionList[i].questionOption.length; m++) {
                                if (questionList[i].questionOption[m].optionWord != "") {
                                    var td = '';
                                    var inputType = 'radio';
                                    if (questionType == "1") {
                                        inputType = 'checkbox';
                                    }
                                    td = '<td style="width: 124px"><input name="' + questionList[i].id + '" type="radio" value="' + questionList[i].questionOption[m].optionWord + '" class="' + inputType + '"></td>';
                                    trR = $(trR).append(td);
                                }
                            }
                        }
                        tswjdc_table = $(tswjdc_table).append(trR);
                    }
                    question_div = $(question_div).append(tswjdc_table);
                    $(".container-fluidT").append(question_div);
                    break;
                case "4": //量表
                    var question_div = '<div class="form-group" data-t="' + questionType + '"></div>';
                    var question_options = '<ul class="options"></ul>';
                    for (var j = 0; j < questionList[i].questionOption.length; j++) {
                        //题目选项
                        var option_word = questionList[i].questionOption[j].optionWord;
                        //判断是多选还是单选
                        var inputType = 'radio';
                        if (questionType == "1") {
                            inputType = 'checkbox';
                        }
                        if (j == 0 || j == questionList[i].questionOption.length - 1) {
                            var li = '<li class="liangbiaoChoose" style="float: left;margin-right: 30px;"><label><span>' + option_word + '</span></label></li>';
                        } else {
                            var li = '<li class="liangbiaoChoose" style="float: left;margin-right: 30px;"><label><input name="' + questionList[i].id + '" type="' + inputType + '" value="' + option_word + '" style="font-weight: 500;" class="' + inputType + '"><span>' + option_word + '</span></label></li>';
                        }
                        question_options = $(question_options).append(li);                //添加选项内容
                    }
                    question_options = $(question_options).append('<div class="clear"></div>');     //清除浮动
                    if (questionList[i].required == "1") {
                        question_div = $(question_div).append('<div><label><span class="req">*</span><span class="title">' + (i + 1) + '. ' + questionList[i].questionTitle + '</span></label></div>');        //添加标题

                    } else {
                        question_div = $(question_div).append('<div><label><span>&nbsp;&nbsp;&nbsp;</span><span class="title">' + (i + 1) + '. ' + questionList[i].questionTitle + '</span></label></div>');        //添加标题
                    }
                    question_div = $(question_div).append(question_options);      //添加选项
                    $(".container-fluidT").append(question_div);
                    break;
            }
        }
        ;
    }
    $(".container-fluidT").append('<div>\n' +
        '            <button class="btn btn-primary submitBtn" onclick="submitQuestionnaire()">提交</button>\n' +
        '        </div>');
};


//获取地址栏上的问卷id    进页面
function getUrlInfo() {
    var str = location.href; //取得整个地址栏
    var infoList = str.split('?');
    var info = infoList[1];
    var paramInfo = info.split('&');      //根据长度判断有几个参数  1 为1个参数    2 为2个参数
    var idBefore = paramInfo[0];
    id = idBefore.split('=')[1];
    if (paramInfo.length <= 1) {
        //console.log('预览状态');
    } else {
        var contactBefore = info.split('&')[1];
        // eORp = contactBefore.split('=')[0];
        eORp = contactBefore.substr(0, 1);
        if (eORp != 'l' && eORp != 'p') {
            eORp = 'zzz'
        }else {
            contact = contactBefore.split('=')[1];
        }
    }
};

//生成二维码
function getQrcode() {
    var url = '/getShortUrlForLink/' + id;
    //console.log(da);
    $.ajax({
        url: httpRequestUrl + url,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            var data = res.data;
            $("#qrcode").qrcode({
                width: 100, //宽度
                height: 100, //高度
                text: data.imgUrl    //任意内容
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert(jqXHR);
        }
    });
}

function queryAnswerRecordInfoSuccess(res) {
    // data: 1 答过  0 没答过
    if (res.code == '666') {
        if (res.data == 0) {
            //查询题目信息
            var url = '/queryQuestionnaireById/' + id;
            commonAjaxPost(true, url, undefined, queryQuestionnaireByIdSuccess);
        } else {
            $('.questionnaire').html('<p style="width: 60%; margin: 200px auto;text-align: center;font-size: 16px;">很抱歉，您已经答过此问卷，不能再答</p>');
        }
    } else {
        layer.msg(res.msg, {icon: 2})
    }
}

var inputName = '';

function onclickChoose(questionnaireId, problemId) {
    var url = '/selectCorrelation';//获得问卷题目的互斥
    var data = {
        problemNum: questionnaireId,
        answerNum: problemId,
        questionId: id
    }
    console.log(data)
    $.ajax({
        "async": false,
        "url": httpRequestUrl + url,
        "type": "POST",
        "data": JSON.stringify(data),
        "dataType": "json",
        "contentType": "application/json",
        success: function (result) {
            console.log(result)
            // console.log( $(":data-t"+1).style.display)getAttrbute
            // console.log(document.getElementsByTagName(""))
            // console.log(document.getElementsByClassName("form-group"))
            console.log($(".container-fluidT").children(".form-group"))
            if (result.data.flag == '1') {
                if (result.data.list.length != 0) {
                    for (var j = questionnaireId; j < $(".container-fluidT").children(".form-group").length; j++) {
                        inputName = "a" + j
                        $("input[name=" + inputName + "]").attr("checked", false)
                        $(".container-fluidT").children(".form-group")[j].style.display = "block"
                        // $(".container-fluidT").children(".form-group")[j].find("input").attr("checked", false)
                    }
                    for (var i = 0; i < result.data.list.length; i++) {
                        $(".container-fluidT").children(".form-group")[parseInt(result.data.list[i]) - 1].style.display = "none"
                    }
                } else {
                    for (var j = questionnaireId; j < $(".container-fluidT").children(".form-group").length; j++) {
                        $(".container-fluidT").children(".form-group")[j].style.display = "block"
                        inputName = "a" + j
                        $("input[name=" + inputName + "]").attr("checked", false)
                    }
                }
            }
        }
    });
}

function onclickCheckChoose(questionnaireId, problemId) {
    console.log(questionnaireId)
    console.log(problemId)
    console.log(id)
    var checkedList = []
    for (var i = 0; i < $("input[name=a" + (questionnaireId - 1) + "]").length; i++) {
        if ($("input[name=a" + (questionnaireId - 1) + "]")[i].checked == true) {
            checkedList.push(i + 1)
        }
    }
    inputName = "a" + questionnaireId
    if (checkedList.length == 0) {
        var url = '/selectCheckedCorrelation';//获得问卷题目的互斥
        var data = {
            problemNum: questionnaireId,
            answerNum: checkedList,
            questionId: id
        }
        console.log(data)
        $.ajax({
            "async": false,
            "url": httpRequestUrl + url,
            "type": "POST",
            "data": JSON.stringify(data),
            "dataType": "json",
            "contentType": "application/json",
            success: function (result) {
                console.log(result)
                for (var j = 0; j < result.data.lists.length; j++) {
                    $(".container-fluidT").children(".form-group")[result.data.lists[j] - 1].style.display = "block"
                }
            }
        })
        for (var j = questionnaireId; j < $(".container-fluidT").children(".form-group").length; j++) {
            $(".container-fluidT").children(".form-group")[j].style.display = "block"
            inputName = "a" + j
            $("input[name=" + inputName + "]").attr("checked", false)
        }
    } else {
        var url = '/selectCheckedCorrelation';//获得问卷题目的互斥
        var data = {
            problemNum: questionnaireId,
            answerNum: checkedList,
            questionId: id
        }
        console.log(data)
        $.ajax({
            "async": false,
            "url": httpRequestUrl + url,
            "type": "POST",
            "data": JSON.stringify(data),
            "dataType": "json",
            "contentType": "application/json",
            success: function (result) {
                console.log(result)
                // console.log($(":data-t"+1).style.display)
                // console.log(document.getElementsByTagName(""))
                console.log($("input[name=a" + (questionnaireId - 1) + "]"))
                console.log($("input[name=a" + (questionnaireId - 1) + "]")[problemId - 1].checked)
                console.log($(".container-fluidT").children(".form-group"))
                // if($("input[name=a" + (questionnaireId-1) + "]")[problemId-1].checked){
                if (result.data.flag == '1') {
                    if (result.data.list.length != 0) {
                        for (var j = questionnaireId; j < $(".container-fluidT").children(".form-group").length; j++) {
                            inputName = "a" + j
                            $("input[name=" + inputName + "]").attr("checked", false)
                            // $(".container-fluidT").children(".form-group")[j].style.display="block"
                            // $(".container-fluidT").children(".form-group")[j].find("input").attr("checked", false)
                        }
                        for (var i1 = 0; i1 < result.data.lists.length; i1++) {
                            $(".container-fluidT").children(".form-group")[parseInt(result.data.lists[i1]) - 1].style.display = "block"
                        }
                        for (var i = 0; i < result.data.list.length; i++) {
                            $(".container-fluidT").children(".form-group")[parseInt(result.data.list[i]) - 1].style.display = "none"
                        }
                    } else {
                        for (var j = questionnaireId; j < $(".container-fluidT").children(".form-group").length; j++) {
                            // $(".container-fluidT").children(".form-group")[j].style.display = "block"
                            inputName = "a" + j
                            $("input[name=" + inputName + "]").attr("checked", false)
                        }
                        for (var j = 0; j < result.data.lists.length; j++) {
                            $(".container-fluidT").children(".form-group")[result.data.lists[j] - 1].style.display = "block"
                        }
                    }
                } else {
                    if (result.data.list.length != 0) {
                        for (var j = questionnaireId; j < $(".container-fluidT").children(".form-group").length; j++) {
                            inputName = "a" + j
                            $("input[name=" + inputName + "]").attr("checked", false)
                            // $(".container-fluidT").children(".form-group")[j].style.display="block"
                            // $(".container-fluidT").children(".form-group")[j].find("input").attr("checked", false)
                        }
                        for (var i = 0; i < result.data.list.length; i++) {
                            $(".container-fluidT").children(".form-group")[parseInt(result.data.list[i]) - 1].style.display = "block"
                        }
                    } else {
                        // for(var j = questionnaireId ;j < $(".container-fluidT").children(".form-group").length;j++){
                        //     $(".container-fluidT").children(".form-group")[j].style.display="block"
                        //     inputName= "a"+j
                        //     $("input[name="+inputName+"]").attr("checked", false)
                        // }
                    }
                }

            }
        });
    }

}