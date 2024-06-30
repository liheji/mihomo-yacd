# Clash and Yacd

-   基于 [MetaCubeX/mihom](https://github.com/MetaCubeX/mihomo) 官方docker 修改的，集成  [MetaCubeX/Yacd-meta](https://github.com/MetaCubeX/Yacd-meta) 界面
-   将 Yacd-meta 管理页面直接打包进 mihom 官方 docker 镜像中，**实现一个容器同时启动mihom和Yacd**
-   修改了前端部分代码连接到同一 docker 容器中 mihom 的 9090 端口，不再需要配置即可直接管理。

>   但也可切换为正常的后台，清除浏览器的cookie 即可恢复

### 构建镜像

```sh
docker build -t mihomo-yacd .
```

### 拉取镜像

```sh
docker pull yilee01/mihomo-yacd
```


# 运行程序

### 命令

`config.yml` 应该放入 `./config` 文件夹中

```sh
docker run -d \
  --name clash \
  -v ./config:/root/.config/mihomo \
  -p 7890:7890 \
  -p 8080:8080 \
  yilee01/mihomo-yacd:latest
```

### docker-compose

```yml
version: '3.3'
services:
  mihomo:
    container_name: mihomo
    image: yilee01/mihomo-yacd:latest
    ports:
      - 7890:7890
      - 8080:8080
    volumes:
      - ./config:/root/.config/mihomo
    restart: on-failure:3
```

-   7890为代理端口
-   8080为管理界面端口

+   注意勾选允许局域网连接



# 源项目构建说明

MetaCubeX/Yacd-meta：https://github.com/MetaCubeX/Yacd-meta

<h1 align="center">
  <img src="https://user-images.githubusercontent.com/78135608/232244383-5e1389db-ce56-4c83-9627-4f3d1a489c6e.png" alt="yacd">
</h1>

> Yet Another [Clash](https://github.com/yaling888/clash) [Dashboard](https://github.com/yaling888/clash-dashboard)

#### 用法

安装[twemoji](https://github.com/mozilla/twemoji-colr/releases)以在 Windows 系统上更好地显示表情符号。

网站 http://yacd.metacubex.one 是通过 HTTP 提供服务的，而不是 HTTPS，因为许多浏览器会阻止从 HTTPS 网站请求 HTTP 资源。如果认为这不安全，可以下载[gh-pages 的 zip 文件](https://github.com/MetaCubeX/yacd/archive/gh-pages.zip)，解压缩并使用 Web 服务器（如 Nginx）提供这些静态文件。

**支持的 URL 查询参数**

| 参数     | 描述                                                               |
| -------- | ------------------------------------------------------------------ |
| hostname | Clash 后端 API 的主机名（通常是`external-controller`的 host 部分） |
| port     | Clash 后端 API 的端口号（通常是`external-controller`的 port 部分） |
| secret   | Clash API 密钥（`config.yaml`中的"secret"）                        |
| theme    | UI 颜色方案（dark、light、auto）                                   |

#### 开发部署

```sh
# 安装依赖库
# 你可以使用 `npm i -g pnpm` 安装 pnpm
pnpm i

 # 启动开发服务器
 # 然后访问 http://127.0.0.1:3000
 pnpm start

 # 构建优化资源
 # 准备好部署的资源将在目录 `public` 中
 pnpm build
```
