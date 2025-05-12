# 仓库简介
缩写：nbetdda（百度翻译能读出来    
顾名思义，这个项目就是通过b站的ep号获取并且转换成DPlayer能解析的弹幕数据。下面是文件介绍和食用教程
# 环境依赖
curl 7.63.0 (可≥该版本，＜该版本的未测试    
Node.js v18.16.1 （≥能用，＜懒得试    
npm v9.5.1（≥可，＜懒    
├── cheerio@1.0.0-rc.12 （版本尽量相同    
├── child_process@1.0.2 （尽量同    
├── http@0.0.1-security （尽同    
└── url@0.11.3 （~同！    
# 食用教程
***epdm-api.js：***
```
sudo npm install
sudo node epdm-api.js
```
curl请求例：curl "http://[::1]:8080/v3/?id=341209"    

***epdm-dplayer.html:***
推荐配合Apache或者Nginx反代使用，以下为Apache的反代后的教程    
编辑Apache的主配置文件比如`httpd.conf`，然后在最后一行添加如下内容（确保/v3不被别的反代所使用）    
```
</Location>
<Location "/v3">
  ProxyPass "http://127.0.0.1:8080/v3"
  ProxyPassReverse "http://127.0.0.1:8080/v3"
</Location>
```
之后就可以直接使用Apache和浏览器解析`epdm-dplayer.html`了。该页面会显示两个输入框和一个确定，第一个框输入的为b站番剧的ep号，第二个输入为从OmoFun抓包抓到的视频链接，点击确定就可以白嫖b站的弹幕啦（喜
# 文件描述
***epdm-api.js：***
```
这个是主要的nodejs后端程序，文件名的意思是dplayer的弹幕id为b站的ep号所获取的弹幕数据的一个api程序。
主要负责将通过ep号获取对应点cid，再通过cid获取b站原始xml弹幕数据。
还有就是默认端口是8080
```
***epdm-dplayer.html：***
```
这个是主要的html+js的端程序，文件名的意思是b站的ep号为dplayer弹幕id并加载到dplayer播放器。
主要负责将原始json数据处理成五彩斑斓的弹幕并呈现出来。
```
[`c236aba`](https://github.com/XiaoTong6666/NodeJS-Bilibili-EPID-To-DPlayer-Danmaku-API/commit/c236abaaafc671e79d74d7557b85834ce46ae0d1)更新内容，适配b站请求ep号获取的json数据，用于获取cid    
[`72b8f41`](https://github.com/XiaoTong6666/NodeJS-Bilibili-EPID-To-DPlayer-Danmaku-API/commit/72b8f41d55fa5325ce61aef9763a8af9874d1d25)跟随b站后端修改，维护性更新    
[`711d345`](https://github.com/XiaoTong6666/NodeJS-Bilibili-EPID-To-DPlayer-Danmaku-API/commit/711d345bc286a6cb1710d8f7fc8c3c05caf7676e)新增CORS响应头，支持跨站请求
# 致谢参考
部分功能参考自[DPlayer-node](https://github.com/MoePlayer/DPlayer-node)项目的[bilibili.js](https://github.com/MoePlayer/DPlayer-node/blob/master/routes/bilibili.js)，原项目使用MIT协议发布，特此致谢并遵守原始协议。
# END
