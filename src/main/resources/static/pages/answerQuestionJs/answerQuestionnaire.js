/**
 * Created by Amy on 2018/8/13.
 */

var questionId = ''
let obj = GetRequest()
var problemList = []
if (obj && obj.questionId && obj.questionId !== '') {
    questionId = obj.questionId
    commonAjaxPost(false, '/statisticalResults/' + obj.questionId, undefined, function (res) {
        if (res.code == '666') {
            problemList = res.data.problemList
            showAnswer()
        } else {
            layer.msg(res.message, {icon: 2})
        }
    })
}

function showAnswer() {
    $("#problemList").empty()
    var text = ''
    for (let i = 0; i < problemList.length; i++) {
        let item = problemList[i]
        let type = String(item.questionType)
        let arr = item.questionOption
        let num = 0
        switch (type) {
            case "0":
                text = "<div class=\"problemItem\">\n" +
                    "                                            <h3><span>" + (i + 1) + "</span>、<span>" + item.questionTitle + "</span><span\n" +
                    "                                                    class=\"questionType\">[单选题]</span></h3>\n" +
                    "                                            <div class=\"chart-box-table\" id=\"" + item.id + "\">\n" +
                    "                                                <table class=\"table table-bordered\">\n" +
                    "                                                    <thead>\n" +
                    "                                                    <tr class=\"table-head-bgc\">\n" +
                    "                                                        <th>选项</th>\n" +
                    "                                                        <th>小计</th>\n" +
                    "                                                        <th>比例</th>\n" +
                    "                                                    </tr>\n" +
                    "                                                    </thead>\n" +
                    "                                                    <tbody >\n"
                for (let j = 0; j < arr.length; j++) {
                    num += arr[j].value
                }
                item.num = num
                for (let j = 0; j < arr.length; j++) {
                    let e = arr[j]
                    text += "                                                    <tr>\n" +
                        "                                                        <td>" + e.optionWord + "</td>\n" +
                        "                                                        <td>" + e.value + "</td>\n" +
                        "                                                        <td><span class=\"proportion\"></span>" + (num===0?0:(e.value / num * 100.0)) + "%</td>\n" +
                        "                                                    </tr>\n"
                }
                text += "                                                    </tbody>\n" +
                    "                                                </table>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"charts-btn\">\n" +
                    "                                                <button class=\"btn-active\" onclick=\"bg('" + item.id + "')\" id=\"bg" + item.id + "\">表格</button>\n" +
                    "                                                <button onclick=\"pie('" + item.id + "')\" id=\"bz" + item.id + "\">饼状</button>\n" +
                    "                                                <button onclick=\"columnar('" + item.id + "')\" id=\"zz" + item.id + "\">柱状</button>\n" +
                    "                                            </div>\n" +
                    "                                        </div>"
                $("#problemList").append(text)
                break
            case "1":
                text = "<div class=\"problemItem\">\n" +
                    "                                            <h3><span>" + (i + 1) + "</span>、<span>" + item.questionTitle + "</span><span\n" +
                    "                                                    class=\"questionType\">[多选题]</span></h3>\n" +
                    "                                            <div class=\"chart-box-table\" id=\"" +item.id+ "\">\n" +
                    "                                                <table class=\"table table-bordered\">\n" +
                    "                                                    <thead>\n" +
                    "                                                    <tr class=\"table-head-bgc\">\n" +
                    "                                                        <th>选项</th>\n" +
                    "                                                        <th>小计</th>\n" +
                    "                                                        <th>比例</th>\n" +
                    "                                                    </tr>\n" +
                    "                                                    </thead>\n" +
                    "                                                    <tbody >\n"
                for (let j = 0; j < arr.length; j++) {
                    num += arr[j].value
                }
                item.num = num
                for (let j = 0; j < arr.length; j++) {
                    let e = arr[j]
                    text += "                                                    <tr>\n" +
                        "                                                        <td>" + e.optionWord + "</td>\n" +
                        "                                                        <td>" + e.value + "</td>\n" +
                        "                                                        <td><span class=\"proportion\"></span>0%</td>\n" +
                        "                                                    </tr>\n"
                }
                text += "                                                    </tbody>\n" +
                    "                                                </table>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"charts-btn\">\n" +
                    "                                                <button class=\"btn-active\" onclick=\"bg('" + item.id + "')\" id=\"bg" + item.id + "\">表格</button>\n" +
                    "                                                <button onclick=\"pie('" + item.id + "')\" id=\"bz" + item.id + "\">饼状</button>\n" +
                    "                                                <button onclick=\"columnar('" + item.id + "')\" id=\"zz" + item.id + "\">柱状</button>\n" +
                    "                                            </div>\n" +
                    "                                        </div>"
                $("#problemList").append(text)
                break
            case "2":
                text = "                                        <div class=\"problemItem\" >\n" +
                    "                                            <h3><span>" + (i + 1) + "</span>、<span>" + item.questionTitle + "</span><span\n" +
                    "                                                    class=\"questionType\">[填空题]</span></h3>\n" +
                    "                                            <div class=\"chart-box\" id=\"" + item.id + "\">\n" +
                    "                                            </div>\n" +
                    "                                        </div>"
                let temp = []
                arr.forEach(t => {
                    t.name = t.optionWord
                    temp.push(t)
                })
                $("#problemList").append(text)
                tk(item.id, temp)
                break
            case "3":
                text = "<div class=\"problemItem\">\n" +
                    "                                            <h3><span>" + (i + 1) + "</span>、<span>" + item.questionTitle + "</span><span\n" +
                    "                                                    class=\"questionType\">[矩阵题]</span></h3>\n" +
                    "                                            <div class=\"chart-box-table\" id=\"" +item.id+ "\">\n" +
                    "                                                <table class=\"table table-bordered\">\n" +
                    "                                                    <thead>\n" +
                    "                                                    <tr class=\"table-head-bgc\">\n" +
                    "                                                        <th>选项</th>\n" +
                    "                                                        <th>小计</th>\n" +
                    "                                                        <th>比例</th>\n" +
                    "                                                    </tr>\n" +
                    "                                                    </thead>\n" +
                    "                                                    <tbody >\n"
                for (let j = 0; j < arr.length; j++) {
                    num += arr[j].value
                }
                item.num = num
                for (let j = 0; j < arr.length; j++) {
                    let e = arr[j]
                    text += "                                                    <tr>\n" +
                        "                                                        <td>" + e.optionWord + "</td>\n" +
                        "                                                        <td>" + e.value + "</td>\n" +
                        "                                                        <td><span class=\"proportion\"></span>" + (num===0?0:(e.value / num * 100.0)) + "%</td>\n" +
                        "                                                    </tr>\n"
                }
                text += "                                                    </tbody>\n" +
                    "                                                </table>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"charts-btn\">\n" +
                    "                                                <button class=\"btn-active\" onclick=\"bg('" + item.id + "')\" id=\"bg" + item.id + "\">表格</button>\n" +
                    "                                                <button onclick=\"pie('" + item.id + "')\" id=\"bz" + item.id + "\">饼状</button>\n" +
                    "                                                <button onclick=\"columnar('" + item.id + "')\" id=\"zz" + item.id + "\">柱状</button>\n" +
                    "                                            </div>\n" +
                    "                                        </div>"
                $("#problemList").append(text)
                break
            case "4":
                text = "<div class=\"problemItem\">\n" +
                    "                                            <h3><span>" + (i + 1) + "</span>、<span>" + item.questionTitle + "</span><span\n" +
                    "                                                    class=\"questionType\">[量表题]</span></h3>\n" +
                    "                                            <div class=\"chart-box-table\" id=\"" + item.id + "\">\n" +
                    "                                                <table class=\"table table-bordered\">\n" +
                    "                                                    <thead>\n" +
                    "                                                    <tr class=\"table-head-bgc\">\n" +
                    "                                                        <th>选项</th>\n" +
                    "                                                        <th>小计</th>\n" +
                    "                                                        <th>比例</th>\n" +
                    "                                                    </tr>\n" +
                    "                                                    </thead>\n" +
                    "                                                    <tbody >\n"
                for (let j = 0; j < arr.length; j++) {
                    num += arr[j].value
                }
                item.num = num
                for (let j = 0; j < arr.length; j++) {
                    let e = arr[j]
                    if (j === 0) {
                        text += "                                                    <tr>\n" +
                            "                                                        <td>" + e.optionWord + "</td>\n" +
                            "                                                        <td></td>\n" +
                            "                                                        <td></td>\n" +
                            "                                                    </tr>\n"
                    } else if (j === arr.length - 1) {
                        text += "                                                    <tr>\n" +
                            "                                                        <td>" + e.optionWord + "</td>\n" +
                            "                                                        <td></td>\n" +
                            "                                                        <td></td>\n" +
                            "                                                    </tr>\n"
                    } else {
                        text += "                                                    <tr>\n" +
                            "                                                        <td>" + e.optionWord + "</td>\n" +
                            "                                                        <td>" + e.value + "</td>\n" +
                            "                                                        <td><span class=\"proportion\"></span>" +(num===0?0:(e.value / num * 100.0)) + "%</td>\n" +
                            "                                                    </tr>\n"
                    }
                }
                text += "                                                    </tbody>\n" +
                    "                                                </table>\n" +
                    "                                            </div>\n" +
                    "                                            <div class=\"charts-btn\">\n" +
                    "                                                <button class=\"btn-active\" onclick=\"bg('" + item.id + "')\" id=\"bg" + item.id + "\">表格</button>\n" +
                    "                                                <button onclick=\"pie('" + item.id + "')\" id=\"bz" + item.id + "\">饼状</button>\n" +
                    "                                                <button onclick=\"columnar('" + item.id + "')\" id=\"zz" + item.id + "\">柱状</button>\n" +
                    "                                            </div>\n" +
                    "                                        </div>"
                $("#problemList").append(text)
                break
        }
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

function bg(id) {
    $("#" + id).removeClass('chart-box')
    $("#" + id).addClass('chart-box-table')
    $("#" + id).empty()
    $("#bg" + id).parent().children().removeClass('btn-active')
    $("#bg" + id).addClass('btn-active')
    $("#"+id).removeAttr('_echarts_instance_')
    let text = ''
    problemList.forEach(item => {
        if (item.id === id) {
            text += "                                                <table class=\"table table-bordered\">\n" +
                "                                                    <thead>\n" +
                "                                                    <tr class=\"table-head-bgc\">\n" +
                "                                                        <th>选项</th>\n" +
                "                                                        <th>小计</th>\n" +
                "                                                        <th>比例</th>\n" +
                "                                                    </tr>\n" +
                "                                                    </thead>\n" +
                "                                                    <tbody >\n"
            if (item.questionType == '0') {
                item.questionOption.forEach(e => {
                    text += "                                                    <tr>\n" +
                        "                                                        <td>" + e.optionWord + "</td>\n" +
                        "                                                        <td>" + e.value + "</td>\n" +
                        "                                                        <td><span class=\"proportion\"></span>" + (item.num===0?0:(e.value / item.num * 100.0)) + "%</td>\n" +
                        "                                                    </tr>\n"
                })
                text += "                                                    </tbody>\n" +
                    "                                                </table>\n"
                $("#" + id).empty()
                $("#" + id).append(text)
            }else if(item.questionType == '1'){
                item.questionOption.forEach(e => {
                    text += "                                                    <tr>\n" +
                        "                                                        <td>" + e.optionWord + "</td>\n" +
                        "                                                        <td>" + e.value + "</td>\n" +
                        "                                                        <td><span class=\"proportion\"></span>0%</td>\n" +
                        "                                                    </tr>\n"
                })
                text += "                                                    </tbody>\n" +
                    "                                                </table>\n"
                $("#" + id).empty()
                $("#" + id).append(text)
            }else if(item.questionType == '3'){
                item.questionOption.forEach(e => {
                    text += "                                                    <tr>\n" +
                        "                                                        <td>" + e.optionWord + "</td>\n" +
                        "                                                        <td>" + e.value + "</td>\n" +
                        "                                                        <td><span class=\"proportion\"></span>" + (item.num===0?0:(e.value / item.num * 100.0)) + "%</td>\n" +
                        "                                                    </tr>\n"
                })
                text += "                                                    </tbody>\n" +
                    "                                                </table>\n"
                $("#" + id).empty()
                $("#" + id).append(text)
            }else if(item.questionType == '4'){
                for (let i = 0; i <item.questionOption.length; i++) {
                    let e = item.questionOption[i]
                    if (i === 0) {
                        text += "                                                    <tr>\n" +
                            "                                                        <td>" + e.optionWord + "</td>\n" +
                            "                                                        <td></td>\n" +
                            "                                                        <td></td>\n" +
                            "                                                    </tr>\n"
                    } else if (i === item.questionOption.length - 1) {
                        text += "                                                    <tr>\n" +
                            "                                                        <td>" + e.optionWord + "</td>\n" +
                            "                                                        <td></td>\n" +
                            "                                                        <td></td>\n" +
                            "                                                    </tr>\n"
                    } else {
                        text += "                                                    <tr>\n" +
                            "                                                        <td>" + e.optionWord + "</td>\n" +
                            "                                                        <td>" + e.value + "</td>\n" +
                            "                                                        <td><span class=\"proportion\"></span>" + (item.num===0?0:(e.value / item.num * 100.0))+ "%</td>\n" +
                            "                                                    </tr>\n"
                    }
                }
                text += "                                                    </tbody>\n" +
                    "                                                </table>\n"
                $("#" + id).empty()
                $("#" + id).append(text)
            }
        }
    })
}

//饼状图
function pie(id) {
    var chartDom = document.getElementById(id);
    $("#" + id).removeClass('chart-box-table')
    $("#" + id).addClass('chart-box')
    $("#bz" + id).parent().children().removeClass('btn-active')
    $("#bz" + id).addClass('btn-active')
    var myChart = echarts.init(chartDom);

    var option;
    let data = []
    let name = []
    problemList.forEach(item => {
        if (item.id === id) {
            item.questionOption.forEach(e => {
                data.push({
                    name: e.optionWord,
                    value: e.value
                })
                name.push(e.optionWord)
            })
        }
    })
    option = {
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
            bottom: 10,
            left: 'center',
            data: name
        },
        series: [
            {
                name: '选项',
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                selectedMode: 'single',
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
}


function columnar(id) {
    var chartDom = document.getElementById(id);
    $("#" + id).removeClass('chart-box-table')
    $("#" + id).addClass('chart-box')
    $("#bz" + id).parent().children().removeClass('btn-active')
    $("#bz" + id).addClass('btn-active')
    var myChart = echarts.init(chartDom);
    var option;
    let data = []
    let name = []
    problemList.forEach(item => {
        if (item.id === id) {
            item.questionOption.forEach(e => {
                data.push(e.value)
                name.push(e.optionWord)
            })
        }
    })
    option = {
        xAxis: {
            type: 'category',
            data: name
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                data: data,
                type: 'bar'
            }
        ]
    };

    option && myChart.setOption(option);
}


function tk(id, keywords) {
    var chartDom = document.getElementById(id);
    var myChart = echarts.init(chartDom);


    var option = {
        tooltip: {
            trigger: 'item',           // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'
            showDelay: 20,             // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
            hideDelay: 100,            // 隐藏延迟，单位ms
            transitionDuration: 0.4,  // 动画变换时间，单位s
            backgroundColor: 'rgba(0,0,0,0.7)',     // 提示背景颜色，默认为透明度为0.7的黑色
            borderColor: '#333',       // 提示边框颜色
            borderRadius: 4,           // 提示边框圆角，单位px，默认为4
            borderWidth: 0,            // 提示边框线宽，单位px，默认为0（无边框）
            padding: 5,                // 提示内边距，单位px，默认各方向内边距为5，
                                       // 接受数组分别设定上右下左边距，同css
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                type: 'line',         // 默认为直线，可选为：'line' | 'shadow'
                lineStyle: {          // 直线指示器样式设置
                    color: '#48b',
                    width: 4,
                    type: 'solid'
                },
                shadowStyle: {                       // 阴影指示器样式设置
                    width: 'auto',                   // 阴影大小
                    color: 'rgba(150,150,150,0.3)'  // 阴影颜色
                }
            },
            textStyle: {
                color: '#fff'
            }
        },
        series: [{
            type: 'wordCloud',
            //maskImage: maskImage,
            sizeRange: [15, 80],
            rotationRange: [0, 0],
            rotationStep: 45,
            gridSize: 20,
            shape: 'pentagon',
            width: '100%',
            height: '100%',
            textStyle: {
                normal: {
                    color: function () {
                        return 'rgb(' + [
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160),
                            Math.round(Math.random() * 160)
                        ].join(',') + ')';
                    },
                    fontFamily: 'sans-serif',
                    fontWeight: 'normal'
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowColor: '#333'
                }
            },
            data: keywords
        }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
}

function getReport() {

    //下载报告
    $("#countTable").tableExport({
        type: "excel",
        escape: "false",
        fileName: getCookie("nameOfQuestionnaire") + '学校答题情况明细'
    });

}

//设计问卷
function designQuestionnaire() {
    layer.msg("问卷处于运行状态或问卷已发布，不可设计问卷", {icon: 2})
}

//发送问卷
function ifSendQuestionnaire() {
    window.location.href = 'sendQuestionnaire.html?questionId=' + questionId;
}


//预览问卷
$('#ctl02_hrefView').click(function () {
    window.open('previewQuestionnaire.html?=' + getCookie("questionId"))
});

//回车事件
$(document).keydown(function (event) {
    if (event.keyCode == 13) {
        getQuestionnaireAboutSchool();
    }
});


function toCountQuestionnaire() {
    window.location.href = 'countQuestionnaire.html?questionId=' + questionId;
}