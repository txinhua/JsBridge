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
        //将data解析出来后传递给服务端
//        dataupload(data);
        responseCallback(data)
                           
    })
        
})

//js分享到微信好友或者朋友圈的接口
function shareToWeChat(data) {
    connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('shareBtnDidClicked', data, function (response) {
            console.log("JS已经发出设置用户信息请求，同时收到回调，说明App已经收到数据");
            //response即为本次处理APP返回给H5的值
        });
    });
}

//js告知App该设备当前登录的用户信息
function fyUserSet(data){
    connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('fyUserSet', data, function (response) {
            console.log("JS已经发出设置用户信息请求，同时收到回调，说明App已经收到数据");
            //response即为本次处理APP返回给H5的值
            dataupload(response);
        });
    });
}

//js告知App该设备当前登录的用户信息
function fyCallPhone(data){
    connectWebViewJavascriptBridge(function (bridge) {
                                   bridge.callHandler('fyPhoneCall', data, function (response) {
                                                      console.log("JS已经发出设置用户信息请求，同时收到回调，说明App已经收到数据");
                                                      //response即为本次处理APP返回给H5的值
                                                      dataupload(response);
                                                      });
                                   });
}



