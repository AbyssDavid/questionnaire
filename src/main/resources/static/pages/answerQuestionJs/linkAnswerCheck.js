var questionId = ''
let obj = GetRequest()
if(obj && obj.questionId && obj.questionId!==''){
    questionId = obj.questionId
}
function userCheck() {
    let personId = $("#personId").val()
    if (!personId || personId==='') {
        layer.msg('请先填写学号或教师号',{icon:2})
        return false
    }
    commonAjaxPost(false,'/checkWhetherItCanBeFilledIn/'+questionId+'/'+personId,undefined,function (res) {
        if(res.code=='666'){
            window.location.href = 'previewQuestionnaire.html?questionId='+questionId+'&personId='+personId
        }else{
            layer.msg(res.message,{icon:2})
        }
    })
}
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