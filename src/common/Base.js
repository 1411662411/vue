export default {
    data() {

    },
    methods: {
        timestamp2Time(timestamp, separator) { //转时间戳
            var result = "";
            if (timestamp) {
                var reg = new RegExp(/\D/, "g"); //提取数字字符串  
                var timestamp_str = timestamp.replace(reg, "");

                var d = new Date();
                d.setTime(timestamp_str);
                var year = d.getFullYear();
                var month = d.getMonth() + 1;
                var day = d.getDate();
                if (month < 10) {
                    month = "0" + month;
                }
                if (day < 10) {
                    day = "0" + day;
                }
                result = year + separator + month + separator + day;
            }
            return result;
        },
        //转时间戳
        changeTime(val) {
            return new Date(parseInt(val) * 1000).toLocaleString().replace(/:\d{1,2}$/, ' ');
        },
        // 新窗口预览大图
        loadImg(url) {
            var newwin = window.open()
            newwin.document.write("<div style='width:100%;height:100%;background:black;opacity:.8;position:relative;'></div><div style='width:100%;z-index:100;position:absolute;text-align:center;top:calc(50% - 300px)'><img src=" + url + " style='height:600px;'/></div>")
        },
        // 手机号验证
        IsMobile(phone) {
            var rules = /^((\+?86)|(\(\+86\)))?(13[0123456789][0-9]{8}|14[0123456789][0-9]{8}|15[0123456789][0-9]{8}|17[0123456789][0-9]{8}|18[0123456789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
            return rules.test(phone);
        }
    },
    created() {

    }
}