# AppletOfWeChat-Development （微信小程序开发实战：微信文章+豆瓣电影）

主要页面：登录页、文章、电影、个人中心
![](https://ws4.sinaimg.cn/large/006tKfTcly1frfp71amjcj30rf0hdju7.jpg)
![](https://ws1.sinaimg.cn/large/006tKfTcly1frfp6zt3inj30pw0g8mzo.jpg)
![](https://ws1.sinaimg.cn/large/006tKfTcly1frfp735l0zj30s90h141u.jpg)

nginx代理豆瓣API：（直接访问豆瓣API会出现404页面）
	 1、使用 Homebrew 安装 Nginx，在终端输入如下命令：         brew install nginx
    2、进入 Nginx 的安装目录，我本地的安装目录是 /usr/local/etc/nginx/ ，打开该目录下的nginx.conf 文件。
        /usr/local/etc/nginx/nginx.conf 
    3、修改nginx.conf文件：
       location /theaters {
             proxy_pass https://api.douban.com/v2/movie/in_theaters;
             proxy_redirect     off;
             proxy_set_header   Referer          "https://www.douban.com";  
         }
        
        location /comingSoon {
             proxy_pass https://api.douban.com/v2/movie/coming_soon;
             proxy_redirect     off;
             proxy_set_header   Referer          "https://www.douban.com";  
         }
 
        location /top250 {
             proxy_pass https://api.douban.com/v2/movie/top250;
             proxy_redirect     off;
             proxy_set_header   Referer          "https://www.douban.com";  
         }
 
         location /search {
             proxy_pass https://api.douban.com/v2/movie/search;
             proxy_redirect     off;
             proxy_set_header   Referer          "https://www.douban.com";  
         }
     
     4、	Nginx 启动命令是：sudo nginx
		   Nginx 重启命令是：sudo nginx -s reload。重新配置后都需要进行重启操作。
		   访问地址：http://localhost:8089/
	  5、在真机上运行小程序访问服务器？
       ifconfig找到电脑当前连接的路由IP地址，把小程序开发后台访问的https://localhost修改为https://172.16.14.238 (你IP地址)，手机和电脑连同一个网，保证在同一个局域网内；




