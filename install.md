# Wallhaven 壁纸站

快速搭建属于你自己的私有壁纸站！代码开源，可随意折腾！

如果发现任何BUG，欢迎给我反馈！本处说明文档可能不会第一时间更新，遇到文件第一件事先更新版本！如果新版本问题依旧再给我进行反馈！

## 反馈BUG

* 反馈渠道1（粉丝）：[https://www.bilibili.com/video/BV1714y1p7ea/](https://www.bilibili.com/video/BV1714y1p7ea/)（视频评论区或私信UP主）
* 反馈渠道2（群成员）：官方群内联系群主

## 开源地址

* 后端接口：https://github.com/fuzhume/wallhaven-api
* 前端页面：https://github.com/fuzhume/wallhaven-web

## 运行项目

### 通过命令行创建

```shell
docker run -itd --name wallhaven-web -p 8800:80 --restart=always fuzhume/wallhaven-web:v1.0.3
```

```shell
docker run -itd --name wallhaven-api -p 8360:8360 --restart=always fuzhume/wallhaven-api:v1.0.1
```
### Docker Compose 使用

```yml
version: '3'
services:
  wallhaven-api:
    image: fuzhume/wallhaven-api:v1.0.1
    container_name: wallhaven-api
    ports:
      - "8360:8360"
    restart: always
  wallhaven-web:
    image: fuzhume/wallhaven-web:v1.0.3
    container_name: wallhaven-web
    ports:
      - "8800:80"
    restart: always
```