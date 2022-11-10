/**
 * Created by Amy on 2018/8/9.
 */
$(function () {
    isLoginFun();
    header();
    $("#ctl01_lblUserName").text(getCookie('userName'));
    var oTable = new TableInit();
    oTable.Init();
});

$(function () {
    $('.datepicker').datepicker({
        language: "es",
        autoclose: true,
        format: "yyyy/mm/dd"
    });
});

//回车事件
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        getUserList();
    }
});

$('#userManager').on("keydown", function (event) {
    var keyCode = event.keyCode || event.which;
    if (keyCode == "13") {
        //console.log("1111")
        event.preventDefault();
    }
});

function getUserList() {
    $("#userTable").bootstrapTable('refresh');
}

function TableInit() {

    var oTableInit = new Object();
    //初始化Table
    oTableInit.Init = function () {
        $('#userTable').bootstrapTable({
            url: httpRequestUrl + '/admin/queryUserList',//请求后台的URL（*）TODO:租户的管理，显示所有该租户的用户，跟老项目的用户管理差不多，返回该租户下用户的行号，用户名，密码，开始时间，结束时间，用户状态（开启或关闭
            method: 'POST',                      //请求方式（*）
            striped: true,                      //是否显示行间隔色
            cache: false,                       //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
            pagination: true,                   //是否显示分页（*）
            sortable: true,                     //是否排序
            sortOrder: "desc",                   //排序方式 'desc'降序
            queryParamsType: '',
            sortName:"creation_date",
            dataType: 'json',
            paginationShowPageGo: true,
            showJumpto: true,
            pageNumber: 1, //初始化加载第一页，默认第一页
            queryParams: queryParams,//请求服务器时所传的参数
            sidePagination: 'server',//指定服务器端分页
            pageSize: 10,//单页记录数
            pageList: [10, 20, 30, 40],//分页步进值
            search: false, //是否显示表格搜索，此搜索是客户端搜索，不会进服务端，所以，个人感觉意义不大
            silent: true,
            showRefresh: false,                  //是否显示刷新按钮
            showToggle: false,
            minimumCountColumns: 2,             //最少允许的列数
            uniqueId: "id",                     //每一行的唯一标识，一般为主键列

            columns: [{
                checkbox: true,
                visible: false
            }, {
                field: 'id',
                title: '序号',
                align: 'center',
                formatter: function (value, row, index) {
                    return index + 1;
                }
            },
                {
                    field: 'username',
                    title: '用户账号',
                    align: 'center',
                    width: '230px'
                },
                {
                    field: 'password',
                    title: '用户密码',
                    align: 'center'
                }, {
                    field: 'startTime',
                    title: '开始时间',
                    align: 'center'
                }, {
                    field: 'endTime',
                    title: '结束时间',
                    align: 'center'
                },
                {
                    field: 'operation',
                    title: '操作',
                    align: 'center',
                    events: operateEvents,//给按钮注册事件
                    formatter: addFunctionAlty//表格中增加按钮
                }],
            responseHandler: function (res) {
                //console.log(res);
                if(res.code == "666"){
                    var userInfo = res.data.list;
                    console.log(userInfo);
                    //var userInfo=JSON.parse(res.data)
                    // console.log(userInfo)
                    //var userInfo=JSON.parse('[{"password":"1","startTime":"2022-05-12T10:09:28","id":"1","endTime":"2022-05-12T10:09:30","username":"aa","status":"1"},{"password":"123","startTime":"2022-05-12T12:10:37","id":"290e08f3ea154e33ad56a18171642db1","endTime":"2022-06-11T12:10:37","username":"aaa","status":"1"},{"password":"1","startTime":"2018-10-24T09:49:00","id":"8ceeee2995f3459ba1955f85245dc7a5","endTime":"2025-11-24T09:49:00","username":"admin","status":"1"},{"password":"aa","startTime":"2022-05-16T12:01:54","id":"a6f15c3be07f42e5965bec199f7ebbe6","endTime":"2022-06-15T12:01:54","username":"aaaaa","status":"1"}]');
                    var NewData = [];
                    if (userInfo.length) {
                        for (var i = 0; i < userInfo.length; i++) {
                            var dataNewObj = {
                                'id': '',
                                "username": '',
                                'password': '',
                                "startTime": '',
                                'endTime': '',
                                'status': ''
                            };
                            dataNewObj.id = userInfo[i].id;
                            dataNewObj.username = userInfo[i].username;
                            dataNewObj.password = userInfo[i].password;
                            dataNewObj.startTime = userInfo[i].start_time;
                            dataNewObj.endTime = userInfo[i].stop_time;
                            dataNewObj.status = userInfo[i].status;
                            NewData.push(dataNewObj);
                        }
                        console.log(NewData)
                    }
                    var data = {
                        total: res.data.total,//改动
                        rows: NewData
                    };
                    return data;
                }

            }

        });
    };

    // 得到查询的参数
    function queryParams(params) {
        var username = $("#keyWord").val();
        //console.log(userName);
        var temp = {//这里的键的名字和控制器的变量名必须一致，这边改动，控制器也需要改成一样的
            // rows: params.limit,//页面大小
            pageNum: params.pageNumber,
            pageSize: params.pageSize,
            // create_time
            // page: (params.offset / params.limit) + 1,
            username: username,
            sortName: params.sortName,
            sortOrder: params.sortOrder //排序方式（desc，asc）
        };


        return JSON.stringify(temp);
    }

    return oTableInit;
}


window.operateEvents = {
    //编辑
    'click #btn_count': function (e, value, row, index) {
        id = row.id;
        $.cookie('questionId', id);
    }
};


// 表格中按钮
function addFunctionAlty(value, row, index) {
    var btnText = '';

    btnText += "<button type=\"button\" id=\"btn_look\" data-toggle=\"modal\" data-target=\"#ChangePasswordModal\" onclick=\"resetPassword(" + "'" + row.id + "'" + ")\" style='width: 77px;' class=\"btn btn-default-g ajax-link\">重置密码</button>&nbsp;&nbsp;";

    btnText += "<button type=\"button\" id=\"btn_look\" data-toggle=\"modal\" data-target=\"#ChangeUserInfoModal\" onclick=\"editUserPage(" + "'" + row.id + "'" + ")\" class=\"btn btn-default-g ajax-link\">编辑</button>&nbsp;&nbsp;";

    if (row.status == "1") {
        btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" onclick=\"changeStatus(" + "'" + row.id + "'" + ")\" class=\"btn btn-danger-g ajax-link\">关闭</button>&nbsp;&nbsp;";
    } else if (row.status == "0") {
        btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" onclick=\"changeStatus(" + "'" + row.id + "'" + ")\" class=\"btn btn-success-g ajax-link\">开启</button>&nbsp;&nbsp;"
    }
    btnText += "<button type=\"button\" id=\"btn_stop" + row.id + "\" onclick=\"deleteUser(" + "'" + row.id + "'" + ")\" class=\"btn btn-danger-g ajax-link\">删除</button>&nbsp;&nbsp;";

    return btnText;
}

//重置密码
function resetPassword(id) {
    // $(this).parents("tr").find(".username").text();
    // alert("重置密码")
    console.log("hi "+id)

    var url = '/admin/selectUserInfoById';
    var userid = id


    $.ajax({
        type: "GET",
        url: url,
        data: { "userid": userid },
        contentType: "application/json",
        success: function (response) {
            if (response.code == "666") {
                console.log("the data are "+ JSON.stringify(response))

                // editUsername=response.data.username;
                // oldPassword=response.data.password;
                // console.log("response.data.password"+response.data.password)
                document.getElementById("userid").value = userid;

            }else{
            }
        },
        error: function (thrownError) {
            console.log(thrownError);
        }
    });
    /*commonAjaxPost(true, url, userid, function (result){
        if (result.code == "666") {
            console.log(result)

        }else{
        }
    });
*/
}

function changePassword(){
    var userid=document.getElementById("userid").value;
    var newPassword= document.getElementById("newPassword").value;
    var confirmPassword= document.getElementById("confirmPassword").value;
    console.log("newPassword="+newPassword+"confirmPassword="+confirmPassword);
    document.getElementById("message").innerHTML = "";


    if(newPassword == "" || confirmPassword =="") {
        document.getElementById("message").innerHTML = "**Fill the password please!";
        return false;
    }
    if (newPassword!=confirmPassword){
        document.getElementById("message").innerHTML = "**Password not matched";
        return false;
    }

    var url = '/admin/updateUserpassword';
    var data = {
        "id":userid,
        "password": confirmPassword,
    };
    commonAjaxPost(true, url, data, function (result){
        if (result.code == "666") {
            layer.msg("注册成功", {icon: 1});
            setTimeout(function () {
                window.location.href = 'userManage.html';
            }, 500)

        }else{
            layer.msg("result.code "+result.code, {icon: 1});
        }
    });
}

// 打开创建用户页
function openCreateUserPage(id, value) {

    deleteCookie("userTitle");
    setCookie("userTitle", value);
    if (id != '') {
        deleteCookie("userId");
        setCookie("userId", id);
    }
    //打开url窗口文件
    window.location.href = 'createNewUser.html';
}

function updateUserInfo(){
    var userid=document.getElementById("useridedit").value;
    var editUsernam= document.getElementById("editUsernam").value;
    var startTime= document.getElementById("startTime").value ;
    var stopTime = document.getElementById("stopTime").value;

    var url = '/admin/modifyUserInfo';
    var data = {
        "id":userid,
        "username": editUsernam,
        "startTime": startTime,
        "stopTime":stopTime,
    };
    commonAjaxPost(true, url, data, function (result){
        if (result.code == "666") {
            layer.msg("注册成功", {icon: 1});
            setTimeout(function () {
                window.location.href = 'userManage.html';
            }, 500)

        }else{
            layer.msg("result.code "+result.code, {icon: 1});
        }
    });


    console.log("userid edit"+userid)
}
function editUserPage(id) {

    // alert("编辑用户")

    console.log("hi "+id)

    var url = '/admin/selectUserInfoById';
    var userid = id


    $.ajax({
        type: "GET",
        url: url,
        data: { "userid": userid },
        contentType: "application/json",
        success: function (response) {
            if (response.code == "666") {
                console.log("the data are "+ JSON.stringify(response))

                document.getElementById("useridedit").value = userid;
                document.getElementById("editUsernam").value = response.data.username;
                document.getElementById("startTime").value = response.data.startTime;
                document.getElementById("stopTime").value = response.data.stopTime;


            }else{
            }
        },
        error: function (thrownError) {
            console.log(thrownError);
        }
    });
}
// 修改用户状态（禁用、开启）
function changeStatus(index) {

    alert("修改用户状态")
}

//删除用户
function deleteUser(id) {

    alert("删除用户")
}



