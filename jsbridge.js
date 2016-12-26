window.onerror = function (err) {
    log('window.onerror: ' + err)
}

function log(message, data) {

}

function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(WebViewJavascriptBridge)
    } else {
        document.addEventListener('WebViewJavascriptBridgeReady', function () {
            callback(WebViewJavascriptBridge)
        }, false)
    }
}

connectWebViewJavascriptBridge(function (bridge) {
                               
    var uniqueId = 1

    bridge.init(function (message, responseCallback) {
        var data = {'Javascript Responds': 'Wee!'}
        responseCallback(data)
    })
                               
    //app上传Jpush的RegistrationID,deviceToken&渠道标识接口
    bridge.registerHandler('uploadJRIDAndChannel', function (data, responseCallback) {
        var responseData = {'Javascript Says': 'received'}
        //将data解析出来后传递给服务端
        alert(data)
        responseCallback(responseData)
                           
    })
                               
    //app上传ChannelId的接口
    bridge.registerHandler('uploadChannel', function (data, responseCallback) {
        var responseData = {'Javascript Says': 'received'}
        alert(data)
        responseCallback(responseData)
                           
    })
                               
    //app上传分先是否成功的状态接口
    bridge.registerHandler('shareComplete', function (data, responseCallback) {
        console.log(data);
        //分享成功后的数据返回
        var responseData = {'Javascript Says': 'shareCompleteInfoReceived'}
        responseCallback(responseData)
    })
                               
})

//js分享到微信好友或者朋友圈的接口
function shareToWeChat(data) {
    connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('shareBtnDidClicked', data, function (response) {
            console.log("JS已经发出分享和index，同时收到回调，说明OC已经收到数据");
        });
    });
}

//js用于设置JPush标签的接口
function jpushTagSet(data){
    connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('jpushTagSet', data, function (response) {
            console.log("JS已经发出分享和index，同时收到回调，说明App已经收到数据");
            });
    });
}

//js用于获取设备推送相关token的接口
function getDevicToken() {
    connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('deviceTokenDidClicked', {}, function (response) {
            alert(response);
        });
    });
}

//js用于获取设备推送相关token的接口
function getChannelFunction() {
    connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('askForChannel', {}, function (response) {
            alert(response);
        });
    });
}


