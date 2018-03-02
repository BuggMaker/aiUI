
export default {
    //返回格式化后的时间字符串
    format(date, fmt) {
        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    //设置天数 正/负
    setDay(date, day) {
        date = this.toDate(date);
        if (date) {
            let curDate = this.toSeconds(date),
                targetDate = curDate + (day / Math.abs(day) * (Math.abs(day) - 1)) * 24 * 3600 * 1000;
            return this.toDate(targetDate);
        }
    },
    //返回1970年1月1日午夜到指定日期（字符串）的毫秒数
    toSeconds(date) {
        date = this.toDate(date);
        return date ? Date.parse(date) : 0;
    },
    // Date对象。
    toDate(date, formatStr) {
        if (!date)
            return null;
        let targetDate = new Date();
        if (date instanceof Date)
            return date;
        else if (typeof date === 'string') {
            targetDate = new Date(date);
        } else if (typeof date === 'number') {
            targetDate.setTime(date);
        }

        if (formatStr) {
            targetDate = this.format(targetDate, formatStr);
        }
        return targetDate;
    },
    checkDate(date) {
        if (this.toDate(date))
            return true;
        else
            return false;
    }
}