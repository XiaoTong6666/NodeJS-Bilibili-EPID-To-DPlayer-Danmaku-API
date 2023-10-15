# 文件介绍
***epdm-api.js：***
```
这个是主要的nodejs后端程序，文件名的意思是dplayer的弹幕id为b站的ep号所获取的弹幕数据的一个api程序。
主要负责将通过ep号获取对应点cid，再通过cid获取b站原始xml弹幕数据。
还有就是默认端口是103
```
***epdm-dplayer.html：***
```
这个是主要的html+js的端程序，文件名的意思是b站的ep号为dplayer弹幕id并加载到dplayer播放器。
主要负责将原始json数据处理成五彩斑斓的弹幕并呈现出来。
```
# 食用教程
***epdm-api.js：***
确保设备安装了nodejs和npm，并确保npm可以正常连接你所配置的软件源
```
sudo npm install child_process
sudo npm install cheerio
sudo npm install url
sudo npm install http
sudo node epdm-api.js
```
***epdm-dplayer.html:***
推荐配合Apache或者Nginx反代使用，以下为Apache的反代后的教程    
编辑Apache的主配置文件比如`httpd.conf`，然后在最后一行添加如下内容（确保/v3不被别的反代所使用）    
```
</Location>
<Location "/v3">
  ProxyPass "http://127.0.0.1:103/v3"
  ProxyPassReverse "http://127.0.0.1:103/v3"
</Location>
```
之后就可以直接使用Apache和浏览器解析`epdm-dplayer.html`了。该页面会显示两个输入框和一个确定，第一个框输入的为b站番剧的ep号，第二个输入为从OmoFun抓包抓到的视频链接，点击确定就可以白嫖b站的弹幕啦（喜

# END
