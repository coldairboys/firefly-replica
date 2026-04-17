# Coldairboy'学习笔记

## 1. 来源说明

这个项目是我自己的个人博客项目，当前仓库地址：

`https://github.com/coldairboys/firefly-replica`

页面风格参考了目标站：

`https://blog.910501.xyz/`

技术底子来源于开源项目 Firefly：

`https://github.com/CuteLeaf/Firefly`

在此基础上，我已经按自己的需求做了个性化修改，包括：

- 博客标题、博主信息
- 首页布局和导航栏
- 社交链接
- 留言板文案
- Giscus 评论系统

## 2. 本地部署启动命令

先进入项目目录：

```powershell
cd E:\GITHUB\firefly-replica
```

第一次运行先安装依赖：

```powershell
pnpm install
```

启动本地博客：

```powershell
pnpm dev
```

启动后在浏览器打开：

```text
http://localhost:4321/
```

如果只是想打包生成网页文件：

```powershell
pnpm build
```

## 3. 推送 GitHub 命令

平时改完文章或配置后，直接执行：

```powershell
cd E:\GITHUB\firefly-replica
git add .
git commit -m "feat: update blog content"
git push origin main
```

推送成功后，GitHub Pages 会自动重新部署网站。
