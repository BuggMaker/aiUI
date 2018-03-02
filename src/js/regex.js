var regexEnum = {  
    intege : "^-?[1-9]\\d*$", // 整数  
    intege1 : "^[1-9]\\d*$", // 正整数  
    intege2 : "^-[1-9]\\d*$", // 负整数  
    num : "^([+-]?)\\d*\\.?\\d+$", // 数字  
    num1 : "^([+]?)\\d*$", // 正数（正整数 + 0）  
    num2 : "^-[1-9]\\d*|0$", // 负数（负整数 + 0）  
    num3 : "^([+]?)\\d*\\.?\\d+$", // 正数  
    decmal : "^([+-]?)\\d*\\.\\d+$", // 浮点数  
    decmal1 : "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$", // 正浮点数  
    decmal2 : "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", // 负浮点数  
    decmal3 : "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", // 浮点数  
    decmal4 : "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", // 非负浮点数（正浮点数 + 0）  
    decmal5 : "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", // 非正浮点数（负浮点数 +  
    // 0）  
    email : "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", // 邮件  
    color : "^[a-fA-F0-9]{6}$", // 颜色  
    url : "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", // url  
    chinese : "^[\\u4E00-\\u9FA5\\uF900-\\uFA2D]+$", // 仅中文  
    ascii : "^[\\x00-\\xFF]+$", // 仅ACSII字符  
    zipcode : "^\\d{6}$", // 邮编  
    mobile : "^(13|15|18|14)[0-9]{9}$", // 手机  
    ip4 : "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", // ip地址  
    notempty : "^\\S+$", // 非空  
    picture : "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", // 图片  
    jpg : "(.*)\\.(jpg|gif)$", // 图片  
    rar : "(.*)\\.(rar|zip|7zip|tgz)$", // 压缩文件  
    date : "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", // 日期  
    qq : "^[1-9]*[1-9][0-9]*$", // QQ号码  
    tel : "^(([0\\+]\\d{2,3}-)?(0\\d{2,3})-)?(\\d{7,8})(-(\\d{3,}))?$", // 电话号码的函数(包括验证国内区号,国际区号,分机号)  
    username : "^\\w+$", // 用来用户注册。匹配由数字、26个英文字母或者下划线组成的字符串  
    letter : "^[A-Za-z]+$", // 字母  
    letter_u : "^[A-Z]+$", // 大写字母  
    letter_l : "^[a-z]+$", // 小写字母  
    letter_num : "^\\w+$", // 匹配由数字、26个英文字母或者下划线组成的字符串  
    idcard : "/(^/d{15}$)|(^/d{17}([0-9]|X)$)/", // 身份证  
    htmlcode : "^[^\\\\'\"<>@#$&]+$", // 禁止输入html代码（特殊字符）  
    uploadFile : "(.*)\\.(jpg|bmp|gif|png|jpeg|tif|pdf|doc|docx|xls|xlsx|ppt|pptx)$", // 图片  
};  
  
  
/** 
 * 校验文件扩展名 
 *  
 * @param str 
 * @returns {Boolean} 
 */  
function checkFile(str) {  
    if (isEmpty(str)) {  
        return true;  
    }  
    var strRegex = "(.jpg|.JPG|.gif|.GIF|.png|.PNG)$"; // 用于验证图片扩展名的正则表达式  
    var re = new RegExp(strRegex);  
    if (re.test(str)) {  
        return (true);  
    } else {  
        return (false);  
    }  
}  
  
function checkExcelFile(str) {  
    if (isEmpty(str)) {  
        return true;  
    }  
    var strRegex = "(.xls)$";  
    var re = new RegExp(strRegex);  
    if (re.test(str)) {  
        return (true);  
    } else {  
        return (false);  
    }  
}  
  
/** 
 * 正则校验 
 *  
 * @param format 
 *            格式 
 * @param val 
 *            值 
 */  
function checkFormat(format, val) {  
    if (isEmpty(val)) {  
        if ("notempty" == format) {  
            return false;  
        }  
        return true;  
    }  
    var reg = regexEnum[format];  
    var r = val.match(reg);  
    if (r == null)  
        return false;  
    return true;  
}  
  
function isCardID(sId) {  
    if (isEmpty(sId)) {  
        return true;  
    }  
    var iSum = 0;  
    if (!/^\d{17}(\d|x)$/i.test(sId))  
        return "你输入的身份证长度或格式错误";  
    sId = sId.replace(/x$/i, "a");  
    if (aCity[parseInt(sId.substr(0, 2))] == null)  
        return "你的身份证地区非法";  
    sBirthday = sId.substr(6, 4) + "-" + Number(sId.substr(10, 2)) + "-"  
            + Number(sId.substr(12, 2));  
    var d = new Date(sBirthday.replace(/-/g, "/"));  
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d  
            .getDate()))  
        return "身份证上的出生日期非法";  
    for ( var i = 17; i >= 0; i--)  
        iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);  
    if (iSum % 11 != 1)  
        return "你输入的身份证号非法";  
    return true;// aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女")  
}  
  
// 短时间，形如 (13:04:06)  
function isTime(str) {  
    if (isEmpty(str)) {  
        return true;  
    }  
    var a = str.match(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);  
    if (a == null) {  
        return false;  
    }  
    if (a[1] > 24 || a[3] > 60 || a[4] > 60) {  
        return false;  
    }  
    return true;  
}  
  
//短时间，形如 (13:04)  
function isTimeHM(str) {  
    if (isEmpty(str)) {  
        return false;  
    }  
    var a = str.match(/^(\d{1,2})(:)?(\d{1,2})$/);  
    if (a == null) {  
        alert("hm"+a);  
        return false;  
    }  
    if (a[1] > 24 || a[3] > 60) {  
        alert("hm"+a[1]);  
        alert("hm"+a[3]);  
        return false;  
    }  
    return true;  
}  
  
// 短日期，形如 (2003-12-05)  
function isDate(str) {  
    if (isEmpty(str)) {  
        return true;  
    }  
    var r = str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);  
    if (r == null)  
        return false;  
    var d = new Date(r[1], r[3] - 1, r[4]);  
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d  
            .getDate() == r[4]);  
}  
  
// 长时间，形如 (2003-12-05 13:04:06)  
function isDateTime(str) {  
    if (isEmpty(str)) {  
        return true;  
    }  
    var reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;  
    var r = str.match(reg);  
    if (r == null)  
        return false;  
    var d = new Date(r[1], r[3] - 1, r[4], r[5], r[6], r[7]);  
    return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3]  
            && d.getDate() == r[4] && d.getHours() == r[5]  
            && d.getMinutes() == r[6] && d.getSeconds() == r[7]);  
}  
  
  
// 空字符串  
function isEmpty(str) {  
    if ((str == null) || (str.toString().replace(/\s+/g, "") == "")) {  
        return true;  
    } else {  
        return false;  
    }  
}  
  
function isNotEmpty(str) {  
    if ((str == null) || (str.toString().replace(/\s+/g, "") == "")) {  
        return false;  
    } else {  
        return true;  
    }  
}  
  
// 数字最值(最小值，最大值，必须输入)  
function isNumRange(str, minNum, maxNum) {  
    if (isEmpty(str)) {  
        return true;  
    }  
    var num = parseFloat(str);  
    if (!isEmpty(minNum) && num < minNum) {  
        return false;  
    } else if (!isEmpty(maxNum) && num > maxNum) {  
        return false;  
    } else {  
        return true;  
    }  
}  
  
// 字符串最大长度  
function isMaxLength(str, maxLength) {  
    if (isEmpty(str)) {  
        return true;  
    }  
    var len = str.length;  
    if (len > maxLength) {  
        return false;  
    } else {  
        return true;  
    }  
}  
  
// 字符串最小长度  
function isMinLength(str, minLength) {  
    if (isEmpty(str)) {  
        return true;  
    }  
    var len = str.length;  
    if (len < minLength) {  
        return false;  
    } else {  
        return true;  
    }  
}  
  
// 小数精确度（maxL：整数部分长度，maxF：小数部分长度）  
function isMaxLengthForDouble(str, maxL, maxF) {  
    if (isEmpty(str)) {  
        return true;  
    }  
    var vals = str.split(".");  
  
    if ((vals[0].length > maxL) || (vals[1].length > maxF)) {  
        return false;  
    } else {  
        return true;  
    }  
}  
  
// 字符串固定长度  
function isLength(str, length) {  
    if (isEmpty(str)) {  
        return true;  
    }  
    var len = str.length;  
    if (len != length) {  
        return false;  
    } else {  
        return true;  
    }  
}  
  
// 失去焦点时do  
// obj校验(jquery)对象，objSpan提示对象, fun执行函数  
function onBlurShow(obj, fun) {  
    obj.blur(fun);  
}  
  
  
// 时间格式转化 date转化成String 方法date.format("时间格式")  
Date.prototype.format = function(format) {  
    var o = {  
        "M+" : this.getMonth() + 1, // month  
        "d+" : this.getDate(), // day  
        "h+" : this.getHours(), // hour  
        "m+" : this.getMinutes(), // minute  
        "s+" : this.getSeconds(), // second  
        "q+" : Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S" : this.getMilliseconds()  
    // millisecond  
    };  
    if (/(y+)/.test(format))  
        format = format.replace(RegExp.$1, (this.getFullYear() + "")  
                .substr(4 - RegExp.$1.length));  
    for ( var k in o)  
        if (new RegExp("(" + k + ")").test(format))  
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]  
                    : ("00" + o[k]).substr(("" + o[k]).length));  
    return format;  
};  
  
// 最小日期  
function isMinDate(date, minDate) {  
    if (isEmpty(date)) {  
        return true;  
    }  
    var r1 = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);  
    var d1 = new Date(r1[1], r1[3] - 1, r1[4]);  
    var d2 = new Date();  
    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());  
    if (minDate != "now") {  
        var r2 = minDate.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);  
        d2 = new Date(r2[1], r2[3] - 1, r2[4]);  
    }  
  
    var t1 = d1.getTime();  
    var t2 = d2.getTime();  
  
    if (t1 < t2) {  
        return false;  
    } else {  
        return true;  
    }  
  
}  
  
// 最大日期  
function isMaxDate(date, maxDate) {  
    if (isEmpty(date)) {  
        return true;  
    }  
    var r1 = date.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);  
    var d1 = new Date(r1[1], r1[3] - 1, r1[4]);  
    var d2 = new Date();  
    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());  
    if (maxDate != "now") {  
        var r2 = maxDate.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);  
        d2 = new Date(r2[1], r2[3] - 1, r2[4]);  
    }  
  
    var t1 = d1.getTime();  
    var t2 = d2.getTime();  
  
    if (t1 > t2) {  
        return false;  
    } else {  
        return true;  
    }  
  
}  
  
// 字符串截取  
function spliceStr(str) {  
    if (!isEmpty(str)) {  
        if (str.length > 5) {  
            str = str.substr(0, 5) + "..";  
            return str;  
        }  
    } else {  
        return "";  
    }  
}  
  
/** 
 * 判断数组是否有重复元素 
 *  
 * @param elementArray 
 * @returns {Boolean} 
 */  
function isDuplicate(elementArray) {  
    var nary = elementArray.sort();  
    for ( var i = 0; i < nary.length; i++) {  
        if (nary[i] == nary[i + 1]) {  
            return true;  
        }  
    }  
    return false;  
}  
  
/** 
 * 去掉字符串左边空格 
 *  
 * @param str 
 * @returns 
 */  
function ltrim(str) {  
    var pattern = new RegExp("^[\\s]+", "gi");  
    return str.replace(pattern, "");  
}  
  
/** 
 * 去掉字符串右边空格 
 *  
 * @param str 
 * @returns 
 */  
function rtrim(str) {  
    var pattern = new RegExp("[\\s]+$", "gi");  
    return str.replace(pattern, "");  
}  
  
/** 
 * 去掉字符串左右空格 
 *  
 * @param str 
 * @returns 
 */  
function trim(str) {  
    return rtrim(ltrim(str));  
}  
  
  
// 开始时间 - 结束时间 yyyy-mm-dd  
function check(startTime, endTime) {  
    if (startTime.length > 0 && endTime.length > 0) {  
        var startTmp = startTime.split("-");  
        var endTmp = endTime.split("-");  
        var sd = new Date(startTmp[0], startTmp[1], startTmp[2]);  
        var ed = new Date(endTmp[0], endTmp[1], endTmp[2]);  
        if (sd.getTime() > ed.getTime()) {  
            return false;  
        }  
    }  
    return true;  
}  
  
// 格式 yyyy-MM  
function checkTime(startTime, endTime) {  
  
    if (startTime.length > 0 && endTime.length > 0) {  
        startTime = startTime + "/01";  
        endTime = endTime + "/01";  
        var startTimeTmp = startTime.replace(/-/g, "/");  
        var endTimeTmp = endTime.replace(/-/g, "/");  
        var d1 = new Date(Date.parse(startTimeTmp));  
        var d2 = new Date(Date.parse(endTimeTmp));  
        if (d1 > d2) {  
            return false;  
        }  
    }  
    return true;  
}  
  
// 格式 HH:mm:ss  
function compareTime(interviewDate, startTime, endTime) {  
    var startDate = interviewDate + " " + startTime;  
    var endDate = interviewDate + " " + endTime;  
    if (startDate.length > 0 && endDate.length > 0) {  
          
        var startDateTemp = startDate.split(" ");  
        var endDateTemp = endDate.split(" ");  
        var arrStartDate = startDateTemp[0].split("-");  
        var arrEndDate = endDateTemp[0].split("-");  
        var arrStartTime = startDateTemp[1].split(":");  
        var arrEndTime = endDateTemp[1].split(":");  
        var allStartDate = new Date(arrStartDate[0], arrStartDate[1],arrStartDate[2], arrStartTime[0], arrStartTime[1],arrStartTime[2]);  
        var allEndDate = new Date(arrEndDate[0], arrEndDate[1], arrEndDate[2],arrEndTime[0], arrEndTime[1], arrEndTime[2]);  
  
        if (allStartDate.getTime() >= allEndDate.getTime()) {  
            return false;  
        } else {  
            return true;  
        }  
    } else {  
        alert("时间不能为空");  
        return false;  
    }  
}  
  
function CurentTime() {  
    var now = new Date();  
    var year = now.getFullYear(); // 年  
    var month = now.getMonth() + 1; // 月  
    var day = now.getDate(); // 日  
    var hh = now.getHours(); // 时  
    var mm = now.getMinutes(); // 分  
    var clock = year + "-";  
    if (month < 10)  
        clock += "0";  
    clock += month + "-";  
    if (day < 10)  
        clock += "0";  
    clock += day + " ";  
    if (hh < 10)  
        clock += "0";  
    clock += hh + ":";  
    if (mm < 10)  
        clock += '0';  
    clock += mm;  
    return (clock);  
}  
  
function CurentYearMonth() {  
    var now = new Date();  
    var year = now.getFullYear(); // 年  
    var month = now.getMonth() + 1; // 月  
    var clock = year + "-";  
    if (month < 10)  
        clock += "0";  
    clock += month;  
    return (clock);  
}  
  
// 是否在数组内  
function in_array(needle, haystack) {  
    if (typeof needle == 'string' || typeof needle == 'number') {  
        for ( var i in haystack) {  
            if (haystack[i] == needle) {  
                return true;  
            }  
        }  
    }  
    return false;  
}  
  
  
/** 
 * 去掉字符串最后一个逗号 
 * @param str 
 * @returns 
 */  
function delComma(str)  
{  
    if(str.charAt(str.length-1) == ",")  
    {  
        str = str.substring(0, str.length-1);  
    }  
    return str;  
}  
  
/** 
 * 比较开始时间和结束时间 
 * @param currDate 
 * @param inputDate 
 * @returns {Boolean} 
 */  
function judegeDate(currDate,inputDate){  
      
    if(currDate.length>0 && inputDate.length>0){       
        var startTmp=currDate.split("-");    
        var endTmp=inputDate.split("-");    
        var sd=new Date(startTmp[0],startTmp[1],startTmp[2]);    
        var ed=new Date(endTmp[0],endTmp[1],endTmp[2]);    
        if(sd.getTime() > ed.getTime()){     
            return false;       
        }       
    }       
    return true;       
}  
  
/** 
 * 日期校验正则表达式 
 * @param str 
 * @returns {Boolean} 
 */  
function isdate(str){  
    var reg = /^((((((0[48])|([13579][26])|([2468][048]))00)|([0-9][0-9]((0[48])|([13579][26])|([2468][048]))))-02-29)|(((000[1-9])|(00[1-9][0-9])|(0[1-9][0-9][0-9])|([1-9][0-9][0-9][0-9]))-((((0[13578])|(1[02]))-31)|(((0[1,3-9])|(1[0-2]))-(29|30))|(((0[1-9])|(1[0-2]))-((0[1-9])|(1[0-9])|(2[0-8]))))))$/i;  
    if (reg.test(str)) return true;  
    return false;  
}  
  
/** 
 * 格式化日期 
 * @param value 
 * @returns {String} 
 */  
function formatDate(value){  
    var d = new Date(value);  
    var mon = d.getMonth() + 1;  
    var day = d.getDate();  
    var hours = d.getHours();  
    var minute = d.getMinutes();  
    var second = d.getSeconds();  
    return d.getFullYear() + "-" + (mon >= 10 ? mon : "0" + mon) + "-" + (day >= 10 ? day : "0" + day) + " " + (hours >= 10 ? hours : "0" + hours) + ":" + (minute >= 10 ? minute : "0" + minute) + ":" + (second >= 10 ? second : "0" + second);  
}  
  
function checkSearchDateTimeBox(strBeginId,strEndId){  
       var beginvalue = $('#' + strBeginId).datetimebox('getValue');  
       var endvalue   = $('#' + strEndId).datetimebox('getValue');  
       if (endvalue != '' &&  beginvalue!=''){  
           return (endvalue >= beginvalue);  
       }  
       return true;  
}  

