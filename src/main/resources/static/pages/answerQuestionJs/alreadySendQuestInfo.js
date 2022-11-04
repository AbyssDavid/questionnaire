var questionId = ''
let obj = GetRequest()
if (obj && obj.questionId && obj.questionId !== '') {
    questionId = obj.questionId
    commonAjaxPost(false, '/issuedQuestionnaire/' + obj.questionId, undefined, success)
}

function success(res) {
    if (res.code == '666') {
        let data = res.data
        data.forEach(item => {
            if (item.clazz) {
                $("#teacher").hide()
                let text = "<tr><td>"+item.id+"</td>\n" +
                    "                                                <td>"+item.name+"</td>\n" +
                    "                                                <td>"+item.college+"</td>\n" +
                    "                                                <td>"+item.major+"</td>\n" +
                    "                                                <td>"+item.clazz+"</td>\n" +
                    "                                                <td>"+item.gender+"</td>\n" +
                    "                                                <td>"+item.wxId+"</td>\n" +
                    "                                                <td>"+item.qq+"</td>\n" +
                    "                                                <td>"+item.phone+"</td>\n" +
                    "                                                <td>"+item.email+"</td></tr>"
                $("#student tbody").append(text)
                $("#student").show()
            } else {
                $("#student").hide()
                let text = "<tr><td>"+item.id+"</td>\n" +
                    "                                                <td>"+item.name+"</td>\n" +
                    "                                                <td>"+item.college+"</td>\n" +
                    "                                                <td>"+item.gender+"</td>\n" +
                    "                                                <td>"+item.wxId+"</td>\n" +
                    "                                                <td>"+item.qq+"</td>\n" +
                    "                                                <td>"+item.phone+"</td>\n" +
                    "                                                <td>"+item.email+"</td></tr>"
                $("#teacher tbody").append(text)
                $("#teacher").show()
            }
        })
    } else {
        layer.msg(res.message, {icon: 2})
    }
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

//设计问卷
function designQuestionnaire() {
    layer.msg("问卷处于运行状态或问卷已发布，不可设计问卷", {icon: 2})
}


function countQuestionnaire() {
    location.href = 'countQuestionnaire.html?questionId=' + questionId
}


function toSendQuestionnaire(data) {
    localStorage.setItem('changeTableType', data)
    location.href = 'sendQuestionnaire.html?questionId=' + questionId
}

