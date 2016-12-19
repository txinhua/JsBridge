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

    bridge.registerHandler('start', function (data, responseCallback) {
        var responseData = {'Javascript Says': 'start'}
        responseCallback(responseData)
    })
    bridge.registerHandler('shareComplete', function (data, responseCallback) {
        console.log(data);
        var responseData = {'Javascript Says': 'shareCompleteInfoReceived'}
        responseCallback(responseData)
    })
})

function shareToWeChat(data) {
    connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('shareBtnDidClicked', data, function (response) {
            console.log("JS已经发出分享和index，同时收到回调，说明OC已经收到数据");
        });
    });
}

function getDevicToken() {
    connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('deviceTokenDidClicked', {}, function (response) {
            console.log("JS已经发出分享和index，同时收到回调，说明OC已经收到数据");
        });
    });
}