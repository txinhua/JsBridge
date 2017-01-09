jsbridge.js使用说明文档

1、页面引入js

```jsp
<script type="text/javascript" src='${assets_base_url}/assets/js/jsbridge.js'></script>
```

2、js 调用分享

方法：shareToWeChat(data)

参数：

data为JSON对象 包含的键值说明

| 键          | 类型     | 备注                                       |
| ---------- | ------ | ---------------------------------------- |
| text       | String | 分享的文本描述                                  |
| title      | String | 分享对应得标题                                  |
| url        | String | 分享的页面对应的URL链接                            |
| thumbImage | String | 分享页面使用的图片一般使用图片的URL                      |
| type       | String | 分享类容的类型 如果分享的内容为URL链接则传入3就可以，其他类型将在后续需要的时候接入 |

示例

```jsp
<input type="button" value="微信分享" style="margin-top: 64px" onclick="shareToWeChat({text:'风涌时贷app是上海风涌资产管理有限公司自主研发的技术平台。 平台优势： 1.低门槛，高年化收益 2.投资期限灵活 3.资金安全 4.100%本息保障计划',title:'风涌时贷',url:'http://www.fyosd.com',thumbImage:'icon_fyosd',type:'3'});"/>
```

备注

如果thumbImage使用的是网络图片请给出图片的完整的URL及包含http或https

3、用户登录成功后h5通过fyUserSet(data)方法告知App该用户相关的信息

方法：fyUserSet(data)

参数data结构说明

| 键      | 取值及含义                                    | 备注                     |
| ------ | ---------------------------------------- | ---------------------- |
| action | save （告知App作用户信息保存操作）\| delete（告知App作用户信息删除操作） |                        |
| user   | {userId:15,tag:["vip"]}   用户信息的JSONMap   | 当action值为delete时该对象可不传 |

示例

```jsp
<input type="button" value="告知App用户相关的信息" style="margin-top: 64px" onclick="fyUserSet({action:'save',user:{userId:,tag:["VIP"]}})"/>
```

备注：此时data传入的数据结构如示例中所写，必须包含action 且取值必须为save 。当action值为save时user中必须有值。

4、App在收到H5传来的用户信息后，设置用户的tags并待tags设置成功后返回给js该App的registrationID、channelId、tagUserFlag、userId传递给H5去作用户绑定的接口调用。

fyUserSet 方法剖析

```js
function fyUserSet(data){
    connectWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('fyUserSet', data, function (response) {
            console.log("JS已经发出设置用户信息请求，同时收到回调，说明App已经收到数据");
            //response即为本次处理APP返回给H5的值
            //H5从response中解析出RegistrationID、ChanelId、userId及tag设置是否成功标识并上报给服务端的实现在此处插入哦。
        });
    });
}
```

5、用户退出登录后如有需要H5需调用3中的方法通过给action赋delete来告知App需要删除本地与用户相关的信息。

7、app上报信息给H5

该接口为App主动上传信息给H5的入口，目前还保留，待有特殊情况的时候使用

```json
  //app上传Jpush的RegistrationID、Umeng的渠道标识、与之对应得userId以及用户tag是否设置成功接口
  bridge.registerHandler('uploadJRIDAndChannel', function (data, responseCallback) {
     //此处插入H5解析并上报RegistrationID、ChanelId、userId及tag设置是否成功标识给服务端的实现
    
     responseCallback(data)
     
  })
```

8、uploadJRIDAndChannel中的data 以及fyUserSet方法中的response数据结构说明

```json
{"registrationID":"RID","channelId":"CID","tagUserFlag":"success|fail"，"userId":12033}
```

9、js调用手机的拨打电话功能

方法：fyCallPhone(data)

参数data及为需要拨打的电话号码

示例

```jsp
<input type="button" value="联系我们" style="margin-top: 64px" onclick="fyCallPhone('15221882407')"/>
```

如果是电话号码，请去除区号与号码之间的‘“—”。如想拨打021-86218211请传入02186218211。