const common = {
    setLocal: function (data) {
        localStorage.setItem(data.key, JSON.stringify(data.value));
        if(typeof(data.value)=='object'){
            window.localStorage.setItem(data.key, JSON.stringify(data.value));
        } else if(typeof(data.value)=='string'){
            window.localStorage.setItem(data.key, data.value);
        }
    },
    getLocal: function (key) {
        let val = window.localStorage.getItem(key) || "";
        if(val.search(/:/i)>0){
            val = JSON.parse(val);
        }
        return val;
    },
    setCookie: function (c_name, value, day) {
        day = day || 700;
        let now = new Date();
        if (day >= 1) {
            now.setDate(now.getDate() + day);
            now.setHours(0);
            now.setMinutes(0);
            now.setSeconds(0);
        } else {
            let h = Math.floor(24 * day);
            now.setDate(now.getDate());
            now.setHours(now.getHours() + h);
            now.setMinutes(now.getMinutes());
            now.setSeconds(now.getSeconds());
        }

        document.cookie = c_name + "=" + escape(value) + ";expires=" + now.toGMTString();
    },
    getCookie: function (name) {
        return document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)")) == null ? null : decodeURIComponent(RegExp.$2);
    },
    getHost: function () {
        return window.location.host;
    },
    getLocationParam: function () {
        let url = window.location.search;
        let params = url.toString().slice(1).split("&");
        let returnObject = {};
        for (let i = 0; i != params.length; i++) {
            let index = params[i].indexOf("=");
            returnObject[params[i].slice(0, index)] = params[i].slice(index + 1);
        }
        return returnObject;
    },
    doCallback: function (callback, response) {
        if (!callback) return;
        let callbackFunc = callback.func,
            callbackContext = callback.context;
        callbackFunc && typeof(callbackFunc) == 'function' && callbackFunc.call(callbackContext, response.data);
    },
    isiOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
    },
    isAndroid: function () {
        return navigator.userAgent.match(/Android/i) ? true : false;
    }
};
export default common;