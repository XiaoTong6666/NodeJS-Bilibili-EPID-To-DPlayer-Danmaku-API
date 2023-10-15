# 通过b站的ep号获取并且转换成DPlayer能解析的弹幕数据
# 文件详情    
`
epdm-api.js
这个是主要的nodejs后端程序，文件名的意思是dplayer的弹幕id为b站的ep号所获取的弹幕数据的一个api程序。    
主要负责将通过ep号获取对应点cid，再通过cid获取b站原始xml弹幕数据。    
`    
`
epdm-dplayer.html    
这个是主要的html+js的端程序，文件名的意思是b站的ep号为dplayer弹幕id并加载到dplayer播放器。    
主要负责将原始json数据处理成五彩斑斓的弹幕并呈现出来。    
`    
默认端口是103，需要配合Apache或者Nginx反代使用
