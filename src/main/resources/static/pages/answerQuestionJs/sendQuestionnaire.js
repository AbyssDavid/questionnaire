var persons = []; //传入调查人员信息
var sendTime = "";
var questionId = ''
var dataId = ''
var nameOfQuestionnaire = ''
let obj = GetRequest()
if (obj && obj.questionId && obj.questionId !== '') {
    commonAjaxPost(false, '/queryQuestionnaireById/' + obj.questionId, undefined, function (res) {
        questionId = res.data.id
        nameOfQuestionnaire = res.data.questionName
        dataId = res.data.dataId
        document.getElementById("questPeople").innerText = "调查人员信息 — " + nameOfQuestionnaire;
        document.getElementById("ctl02_ContentPlaceHolder1_InviteEmail1_hrefSend").innerText = "批量发送问卷 — " + nameOfQuestionnaire;
        document.getElementById("ctl02_ContentPlaceHolder1_txtEmailTitle").value = res.data.emailTitle;
        if (res.data.emailContent && res.data.emailContent != '') {
            document.getElementById("ctl02_ContentPlaceHolder1_fckEmailContent").value = res.data.emailContent
        }
    })
}
var shortMessageGetTime = '0';

function GetRequest() {
    //url例子：www.bicycle.com?id="123456"&Name="bicycle"；
    var url = decodeURI(location.search); //?id="123456"&Name="bicycle";
    var object = {};
    if (url.indexOf("?") != -1)//url中存在问号，也就说有参数。
    {
        var str = url.substr(1);  //得到?后面的字符串
        var strs = str.split("&");  //将得到的参数分隔成数组[id="123456",Name="bicycle"];
        for (var i = 0; i < strs.length; i++) {
            object[strs[i].split("=")[0]] = strs[i].split("=")[1]
        }
    }
    return object;
}

function toAlreadySendQuestInfo(){
    location.href='alreadySendQuestInfo.html?questionId='+questionId
}

//按钮事件
window.operateEvents = {
    //删除
    'click #Tbtn_delete': function (e, value, row, index) {
        id = row.id;
        // //console.log(id);
        layer.confirm('您确认要删除此条人员信息吗？', {
            btn: ['确定', '取消'] //按钮
        }, function () {
            console.log(row)
            _$("#userInfoTable").bootstrapTable('removeByUniqueId', row.id);
            layer.msg("删除成功", {icon: 1});
        });
    }
};
//不是用人单位的列名
if (dataId === '1') {
    var columnsForCompany = [
        {
            checkbox: true,
            visible: false,
        }, {
            field: 'id',
            title: '学号',
            align: 'center', width: '200px'
        }, {
            field: 'name',
            title: '姓名',
            align: 'center',
            width: '200px'
        }, {
            field: 'college',
            title: '学院',
            align: 'center', width: '200px'
        }, {
            field: 'major',
            title: '专业',
            align: 'center', width: '200px'
        }, {
            field: 'clazz',
            title: '班级',
            align: 'center', width: '200px'
        }, {
            field: 'gender',
            title: '性别',
            align: 'center', width: '200px'
        }, {
            field: 'wxId',
            title: '微信号',
            align: 'center', width: '200px'
        }, {
            field: 'qq',
            title: 'QQ号',
            align: 'center', width: '200px'
        }, {
            field: 'phone',
            title: '手机号',
            align: 'center', width: '200px'
        },
        {
            field: 'email',
            title: '邮箱地址',
            align: 'center', width: '200px'
        },
        {
            field: 'operation',
            title: '操作',
            align: 'center',
            events: operateEvents,//给按钮注册事件
            formatter: addFunctionAlty//表格中增加按钮
        }]
} else {
    var columnsForCompany = [
        {
            checkbox: true,
            visible: false
        }, {
            field: 'id',
            title: '教师号',
            align: 'center', width: '200px'
        }, {
            field: 'name',
            title: '姓名',
            align: 'center',
            width: '200px'
        }, {
            field: 'college',
            title: '学院',
            align: 'center', width: '200px'
        }, {
            field: 'gender',
            title: '性别',
            align: 'center', width: '200px'
        }, {
            field: 'wxId',
            title: '微信号',
            align: 'center', width: '200px'
        }, {
            field: 'qq',
            title: 'QQ号',
            align: 'center', width: '200px'
        },
        {
            field: 'email',
            title: '邮箱地址',
            align: 'center', width: '200px'
        },
        {
            field: 'phone',
            title: '手机号',
            align: 'center', width: '200px'
        },
        {
            field: 'operation',
            title: '操作',
            align: 'center',
            events: operateEvents,//给按钮注册事件
            formatter: addFunctionAlty//表格中增加按钮
        }]
}


if (dataId == "1") {
    $("#getDownLoadBtn").prepend("<a style=\"margin-right: 20px;\" href='../../template/studentTemplate.xlsx' class=\"add__batches pull-left\">下载模板</a>");
} else if (dataId == "2") {
    $("#getDownLoadBtn").prepend("<a style=\"margin-right: 20px;\" href='../../template/teacherTemplate.xlsx' class=\"add__batches pull-left\">下载模板</a>");
}

// 发送方式，短信：0； 邮件：1； 链接：2；
var sendType = '0';
var shortUrl = '';
var previewUrl = '';
var objLength;
var objLength1;
//默认顶部导航栏的显示
if (localStorage.getItem("changeTableType") == "shortMessageSend") {   //从已发问卷页面点击进入的问卷发布页面
    localStorage.removeItem('changeTableType')
    document.getElementById('linkSendA').style.backgroundColor = "#fff";
    document.getElementById('linkSendA').removeAttribute("class", "inside-wrapper nav-show nav-items clicked linkCode-icon");
    document.getElementById('linkSendA').setAttribute("class", "inside-wrapper nav-show nav-items linkCode-icon");

    document.getElementById('shortMessageSendA').style.backgroundColor = "#1ea0fa";
    document.getElementById('shortMessageSendA').removeAttribute("class", "inside-wrapper nav-show nav-items sms-icon");
    document.getElementById('shortMessageSendA').setAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");

    changeTab('shortMessageSend');

    getQuestionInfo();
    if (document.getElementById('msg').value != "") {
        var msg = document.getElementById('msg');
        wordStatic(msg);
    }

} else { //正常进入
    document.getElementById('linkSendA').style.backgroundColor = "#1ea0fa";
    document.getElementById('linkSendA').removeAttribute("class", "inside-wrapper nav-show nav-items linkCode-icon");
    document.getElementById('linkSendA').setAttribute("class", "inside-wrapper nav-show nav-items clicked linkCode-icon");

    document.getElementById('shortMessageSendA').style.backgroundColor = "#fff";
    document.getElementById('shortMessageSendA').removeAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");
    document.getElementById('shortMessageSendA').setAttribute("class", "inside-wrapper nav-show nav-items sms-icon");
}

createDtePicker();
getQuestionInfo();
var oTable = new TableInit();
oTable.Init();

function TableInit() {

    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#userInfoTable').bootstrapTable({
            url: '',         //请求后台的URL（*）
            striped: true,                      //是否显示行间隔色
            pagination: true,                   //是否显示分页（*）
            sortOrder: "asc",                   //排序方式
            queryParamsType: '',
            dataType: 'json',
            paginationShowPageGo: true,
            showJumpto: true,
            pageNumber: 1, //初始化加载第一页，默认第一页
            queryParams: queryParams,//请求服务器时所传的参数
            sidePagination: 'client',
            pageSize: 10,//单页记录数
            pageList: [10, 20, 30, 40],//分页步进值
            search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            silent: true,
            showRefresh: false,                  //是否显示刷新按钮
            showToggle: false,
            minimumCountColumns: 2,             //最少允许的列数
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列
            columns: columnsForCompany
        });
    };

    // 得到查询的参数
    function queryParams(params) {
        var userName = $("#keyWord").val();
        // //console.log(userName);
        var temp = {   //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
            pageNum: params.pageNumber,
            pageSize: params.pageSize,
            username: userName
        };
        return JSON.stringify(temp);
    }

    return oTableInit;
}


// 删除按钮
function addFunctionAlty(value, row, index) {
    return [
        '<button id="Tbtn_delete" style=" background-color: #f9f9f9;color: #f00;">删除</button>'
    ].join('');
}

//顶部导航栏切换
function changeTab(id) {
    if (id == 'linkSend') {
        document.getElementById('linkSendA').style.backgroundColor = "#1ea0fa";
        document.getElementById('linkSendA').removeAttribute("class", "inside-wrapper nav-show nav-items linkCode-icon");
        document.getElementById('linkSendA').setAttribute("class", "inside-wrapper nav-show nav-items clicked linkCode-icon");

        document.getElementById('shortMessageSendA').style.backgroundColor = "#fff";
        document.getElementById('shortMessageSendA').removeAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");
        document.getElementById('shortMessageSendA').setAttribute("class", "inside-wrapper nav-show nav-items sms-icon");


        document.getElementById('linkSend').style.display = "block";
        document.getElementById('shortMessageSend').style.display = "none";
    } else if (id == 'shortMessageSend') {
        document.getElementById('linkSendA').style.backgroundColor = "#fff";
        document.getElementById('linkSendA').removeAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");
        document.getElementById('linkSendA').setAttribute("class", "inside-wrapper nav-show nav-items sms-icon");

        document.getElementById('shortMessageSendA').style.backgroundColor = "#1ea0fa";
        document.getElementById('shortMessageSendA').removeAttribute("class", "inside-wrapper nav-show nav-items sms-icon");
        document.getElementById('shortMessageSendA').setAttribute("class", "inside-wrapper nav-show nav-items clicked sms-icon");

        document.getElementById('linkSend').style.display = "none";
        document.getElementById('shortMessageSend').style.display = "block";
        if (document.getElementById('msg').value != "") {
            var msg = document.getElementById('msg');
            wordStatic(msg);
        }
    }
}

//判断选择的是定时方式  短信：0； 邮件：1； 链接：2；
function send(value) {
    if (value == 0) {
        sendType = '0';
        //短信内容显示
        document.getElementById('sendKind').style.display = 'block'
        document.getElementById('sendContent').style.display = 'block'
        if (document.getElementsByName('sendTime')[0].checked == true) {
            document.getElementById('sendTimeChoose').style.display = 'none'
        } else {
            document.getElementById('sendTimeChoose').style.display = 'block'
        }
        //    邮箱方式隐藏
        document.getElementById('sendMailContent').style.display = 'none'
        //    链接方式隐藏
        document.getElementById('sendUrlContent').style.display = 'none'
        //    发送按钮
        document.getElementById('sendButton').style.display = 'block'

        document.getElementById('myLittleTip').style.display = 'none';
        document.getElementById('ctl02_ContentPlaceHolder1_btnSend').style.display = '';
    } else if (value == 1) {
        sendType = '1';
        //短信内容隐藏
        document.getElementById('sendKind').style.display = 'none'
        document.getElementById('sendContent').style.display = 'none'
        document.getElementById('sendTimeChoose').style.display = 'none'
        //    邮箱方式显示
        document.getElementById('sendMailContent').style.display = 'block'
        //    链接方式隐藏
        document.getElementById('sendUrlContent').style.display = 'none'
        //    发送按钮
        document.getElementById('sendButton').style.display = 'block'
        document.getElementById('myLittleTip').style.display = 'none';
        document.getElementById('ctl02_ContentPlaceHolder1_btnSend').style.display = '';
    } else {
        sendType = '2';
        //短信内容隐藏
        document.getElementById('sendKind').style.display = 'none'
        document.getElementById('sendContent').style.display = 'none'
        document.getElementById('sendTimeChoose').style.display = 'none'
        //    邮箱方式隐藏
        document.getElementById('sendMailContent').style.display = 'none'
        //    链接方式显示
        document.getElementById('sendUrlContent').style.display = 'block'
        //调用生成二维码方法
        getQrcode();
        //    发送按钮
        document.getElementById('sendButton').style.display = 'block'
        document.getElementById('myLittleTip').style.display = '';
        document.getElementById('ctl02_ContentPlaceHolder1_btnSend').style.display = 'none';

    }
}

//判断选择的是定时发送还是立刻发送  1:定时发送
function test(value) {
    if (value == 1) {
        shortMessageGetTime = '1';
        document.getElementById('sendTimeChoose').style.display = 'block'
        document.getElementById("scheduledEndTime").value = getFormatDate(); //将currentdate赋值给页面id为kc_rksjStart的input输入框
        sendTime = document.getElementById("scheduledEndTime").valueOf()
        // //console.log(sendTime)
    } else {
        shortMessageGetTime = '0';
        document.getElementById('sendTimeChoose').style.display = 'none'
    }
}

//上传文件
function addFile() {
    document.getElementById("image").click();
}

//获取答题结束提示语、和短信内容
function getQuestionInfo() {
    var url = '/queryQuestionnaireById/' + questionId;
    jQuery.ajax({
        url: httpRequestUrl + url,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            if (!res.data) {

            } else {
                document.getElementById('tipT').value = res.data.questionEndContent;
                document.getElementById('msg').value = res.data.questionContent;
            }
            objLength = document.getElementById('msg').value.length;
            objLength1 = 38 - objLength;
            document.getElementById('Lnum').innerText = objLength1
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert(jqXHR);
        }
    });
}

//读取上传的excel表格中的内容
$('#image').change(function (e) {
    var files = e.target.files;
    var fileReader = new FileReader();
    fileReader.onload = function (ev) {
        try {
            var data = ev.target.result,
                workbook = XLSX.read(data, {
                    type: 'binary'
                })// 以二进制流方式读取得到整份excel表格对象
            persons = []; // 存储获取到的数据
        } catch (e) {
            layer.msg('文件类型不正确');
            return;
        }
        // 表格的表格范围，可用于判断表头是否数量是否正确
        var fromTo = '';
        // 遍历每张表读取
        for (var sheet in workbook.Sheets) {
            if (workbook.Sheets.hasOwnProperty(sheet)) {
                fromTo = workbook.Sheets[sheet]['!ref'];
                persons = persons.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]));
                break; // 如果只取第一张表，就取消注释这行
            }
        }

        if (persons.length != 0) {
            for (let i = 0; i < persons.length; i++) {
                if (!checkDataFormat(persons[i])) {
                    layer.msg('数据模板不正确');
                    return
                }
            }
            _$("#userInfoTable").bootstrapTable('removeAll');
            //传入参数
            for (var i = 0; i < persons.length; i++) {
                _$("#userInfoTable").bootstrapTable('insertRow', {index: i, row: persons[i]});
                if (i == persons.length - 1) {
                    if (files) {
                        document.getElementById('image').value = '';
                    }
                }
            }
        }
    };
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(files[0]);
});

//发布问卷
function layOutSend() {

    //短信发送方式
    if (sendType == '0') {

        if (shortMessageGetTime == '0') {
            sendTime = "";
        } else if (shortMessageGetTime == '1') {
            //定时发送短信的时间
            sendTime = document.getElementById("scheduledEndTime").value;
            sendTime = dateChange(sendTime);
        }
        //发送短信内容
        var sendContent = document.getElementById("msg").value;
        //发送问卷答题结束语
        var endContent = document.getElementById("tipT").value;

        if (persons.length == 0) {
            layer.msg("请添加调查人员信息", {icon: 2});
        } else if (endContent == "") {
            layer.msg("请添加答题结束语", {icon: 2});
        } else if (sendContent == "") {
            layer.msg("请添加短信内容", {icon: 2});
        } else {
            layer.load(2, {time: 2 * 1000});
            jQuery.ajax({
                type: "POST",
                url: httpRequestUrl + "/selSum",    //查短信条数
                dataType: 'json',
                contentType: "application/json",
                success: function (result) {
                    //console.log(result);
                    //判断短信条数和上传的人数
                    if (persons > result) {
                        layer.msg("余额不足，无法发布", {icon: 2});
                        layer.closeAll('loading');
                    } else {
                        var url = '/addSendQuestionnaire';
                        var personsData = _$('#userInfoTable').bootstrapTable('getData');
                        //短信发送问卷
                        var data = {
                            "questionId": questionId,           //问卷id
                            "dataId": dataId,                    //问卷类型
                            "releaseTime": sendTime,            //发送时间
                            "sendType": sendType,                //发送类别，0短信，1邮件
                            "context": sendContent,                 //短信内容
                            "questionEndContent": endContent,        //答卷结束语
                            "sendInfo": personsData                     //人员信息
                        };
                        alert('暂时不支持短信')
                        // jQuery.ajax({
                        //     "async": true,
                        //     "url": httpRequestUrl + url,
                        //     "type": "POST",
                        //     "data": JSON.stringify(data),
                        //     "dataType": "json",
                        //     "contentType": "application/json",
                        //     success: function (result) {
                        //         //console.log(result);
                        //     },
                        //     error: function (jqXHR, textStatus, errorThrown) {
                        //         //console.log(jqXHR);
                        //         //console.log(textStatus);
                        //         //console.log(errorThrown);
                        //     }
                        // })

                    }
                }
            });
        }
    } else if (sendType == '1') {   //邮箱发送方式
        //邮件标题
        var emailTitle = document.getElementById("ctl02_ContentPlaceHolder1_txtEmailTitle").value;
        //邮件发送富文本内容
        var emailContent = document.getElementById("ctl02_ContentPlaceHolder1_fckEmailContent");
        emailContent = emailContent.value;
        // //console.log(emailContent);
        //发送问卷答题结束语
        var endContent = document.getElementById("tipT").value;
        // //console.log(endContent);

        if (persons.length == 0) {
            layer.msg("请添加调查人员信息", {
                icon: 2
            });
        } else if (endContent == "") {
            layer.msg("请添加答卷结束语", {icon: 2});
        } else if (emailTitle == "") {
            layer.msg("请添加邮件标题", {icon: 2});
        } else if (emailContent == "") {
            layer.msg("请添加邮件内容", {icon: 2});
        } else if (emailContent.search("【联系人姓名】") == -1 || emailContent.search("【填写问卷地址】") == -1) {
            layer.msg("请不要修改'【】'里的内容，系统将会根据问卷自动进行替换！", {icon: 2});
        } else {
            layer.load(2, {time: 2 * 1000});
            var url = '/addSendQuestionnaire';
            var personsData = _$('#userInfoTable').bootstrapTable('getData');
            //邮件发送问卷
            var data = {
                "questionId": questionId,           //问卷id
                "dataId": dataId,                    //问卷类型
                "sendType": sendType,                //发送类别，0短信，1邮件
                "emailTitle": emailTitle,                //邮件标题
                "emailContent": emailContent,                 //邮件内容
                "questionEndContent": endContent        //答卷结束语
            };
            if (dataId == '1') {
                data.studentList = personsData
            } else {
                data.teacherList = personsData
            }
            // layer.closeAll('loading');

            jQuery.ajax({
                "async": true,
                "url": httpRequestUrl + url,
                "type": "POST",
                "data": JSON.stringify(data),
                "dataType": "json",
                "contentType": "application/json",
                success: function (result) {
                    //console.log(result);
                    layer.closeAll('loading');
                    if (result.code == "333") {
                        layer.msg(result.message, {icon: 2});
                        setTimeout(function () {
                            window.location.href = 'login.html';
                        }, 1000)
                    }else if(result.code=='666'){
                        layer.msg("发送成功", {icon: 1});
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }
            });
        }
    }
}

//保存问卷信息
function layOutHold(falg) {
    var url = '/saveQuestionnaireInfo';
    var data = {};

    //发送问卷答题结束语
    var endContent = document.getElementById("tipT").value;
    //短信
    if (sendType == "0") {
        return
        //发送短信内容
        var sendContent = document.getElementById("msg").value;

        data = {
            "questionId": questionId,           //问卷id
            "dataId": dataId,                    //问卷类型
            "releaseTime": "",            //发送时间
            "sendType": sendType,                //发送类别，0短信，1邮件
            "context": sendContent,                 //短信内容
            "questionEndContent": endContent,        //答卷结束语
            "sendInfo": personsData                     //人员信息
        };

    } else if (sendType == "1") {     //邮件
        //邮件标题
        var emailTitle = document.getElementById("ctl02_ContentPlaceHolder1_txtEmailTitle").value;
        //邮件发送富文本内容
        var emailContent = document.getElementById("ctl02_ContentPlaceHolder1_fckEmailContent");
        emailContent = emailContent.value;
        //发送问卷答题结束语
        data = {
            "questionId": questionId,           //问卷id
            "dataId": dataId,                    //问卷类型
            "releaseTime": "",            //发送时间
            "sendType": sendType,                //发送类别，0短信，1邮件
            "emailTitle": emailTitle,                //邮件标题
            "emailContent": emailContent,                 //邮件内容
            "questionEndContent": endContent,        //答卷结束语
        };
    } else if (sendType == "2") {
        data = {
            "questionId": questionId,           //问卷id
            "releaseTime": "",            //发送时间
            "sendType": sendType,                //发送类别，0短信，1邮件
            "questionEndContent": endContent,        //答卷结束语
        };

    }
    jQuery.ajax({
        "async": true,
        "url": httpRequestUrl + url,
        "type": "POST",
        "data": JSON.stringify(data),
        "dataType": "json",
        "contentType": "application/json",
        success: function (result) {
            if (result.code == "666") {
                if (falg == "true") {
                    layer.msg("保存成功！")
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
    })

}

//生成二维码
function getQrcode() {
    _$("#ctl02_ContentPlaceHolder1_imgQrcode").empty();
    if (questionId === undefined || questionId === null || questionId === '') {
        layer.msg('问卷id为空', {icon: 2})
        return false
    }
    var url = '/getShortUrlForLink/' + questionId;
    // //console.log(da);
    _$.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        success: function (res) {
            shortUrl = res.data.link;
            document.getElementById('ctl02_ContentPlaceHolder1_txtLink').value = shortUrl;
            // $('#code').qrcode(); //任意字符串
            _$("#ctl02_ContentPlaceHolder1_imgQrcode").qrcode({
                width: 100, //宽度
                height: 100, //高度
                text: res.data.imgUrl    //任意内容
            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            // alert(jqXHR);
        },
    });
}

function gotoPreview() {
    window.open(previewUrl);
}

// 创建时间选择器
function createDtePicker() {
    var beginTimeTake;
    var nowTime = getFormatDateSecond();

    $('#scheduledEndTime').daterangepicker({
        minDate: nowTime,
        singleDatePicker: true,
        showDropdowns: true,
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
    }, function (start, end, label) {
        // //console.log('New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')');
    });
}

//设计问卷
function designQuestionnaire() {
    layer.msg("问卷处于运行状态或问卷已发布，不可设计问卷", {icon: 2})
}


function countQuestionnaire(){
    location.href='countQuestionnaire.html?questionId='+questionId
}

//预览问卷
$('#ctl02_hrefView').click(function () {
    window.open('previewQuestionnaire.html?=' + questionId)
});


function wordStatic(input) {
    // 获取要显示已经输入字数文本框对象
    var txtContent = document.getElementById("msg");
    var Lnum = document.getElementById("Lnum");
    if (input) {
        // 获取输入框输入内容长度并更新到界面
        value = input.value;
        // 将换行符不计算为单词数
        value = value.replace(/\n|\r/gi, "");
        Lnum.innerText = 38 - value.length;
        checkNum();
    }
}

var num = document.getElementById("num");

function checkNum() {
    var iRet = 0;
    //console.log(_$("#msg").val())
    if (_$("#msg").val().length > 0) {
        iRet = 1;
    } else {
        iRet = 0;
    }
    num.innerText = iRet;
}

function copyUrl2() {
    var Url2 = document.getElementById("ctl02_ContentPlaceHolder1_txtLink");
    Url2.select(); // 选择对象
    document.execCommand("Copy"); // 执行浏览器复制命令
    layer.msg("已复制好，可贴粘。", {icon: 1, time: 1000});
}

function checkDataFormat(data) {
    console.log(data)
    for (let k in data) {
        let flag = false;
        let v = data[k]
        switch (k) {
            case "学号":
                data.id = v
                break
            case "教师号":
                data.id = v
                break
            case "姓名":
                data.name = v
                break
            case "学院":
                data.college = v
                break
            case "专业":
                data.major = v
                break
            case "班级":
                data.clazz = v
                break
            case "性别":
                data.gender = v
                break
            case "微信号":
                data.wxId = v
                break
            case "QQ号":
                data.qq = v
                break
            case "手机号":
                data.phone = v
                break
            case "邮箱地址":
                data.email = v
                break
            default :
                flag = true
                break
        }
        if (flag) {
            return false
        }
    }
    return true
}


