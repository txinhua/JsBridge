jsbridge.js使用说明文档

1、页面引入js

```
<script type="text/javascript" src='${assets_base_url}/assets/js/jsbridge.js'></script>
```

2、js 调用分享的示例

```
<input type="button" value="微信分享" style="margin-top: 64px" onclick="shareToWeChat({text:'风涌时贷app是上海风涌资产管理有限公司自主研发的技术平台。 平台优势： 1.低门槛，高年化收益 2.投资期限灵活 3.资金安全 4.100%本息保障计划',title:'风涌时贷',url:'http://www.fyosd.com',thumbImage:'icon_fyosd',type:'3'});"/>
```

说明

方法：shareToWeChat(data)

参数：

data为JSON对象 包含的键值说明

| 键          | 类型     | 备注                                       |
| ---------- | ------ | ---------------------------------------- |
| text       | String | 分享的文本描述                                  |
| title      | String | 分享对应得标题                                  |
| url        | String | 分享的页面对应的URL链接                            |
| thumbImage | String | 分享页面使用的图标一般为固定值，IOS为： icon_fyosd         |
| type       | String | 分享类容的类型 如果分享的内容为URL链接则传入3就可以，其他类型将在后续需要的时候接入 |

3、js获取设备唯一标识|推送使用的token示例

```
<input type="button" value="获取设备信息" style="margin-top: 64px" onclick="getDevicToken()"/>
```

说明：

方法：getDevicToken()

返回的数值会在对应的回调中有所体现

4、js原文下载地址

