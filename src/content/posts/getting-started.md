---
title: Astro 入门指南
published: 2026-04-06
description: 使用 Astro 最新特性构建你的第一个网站的入门友好指南。
image: https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop
tags: [Astro, 教程, Web开发]
category: 指南
---

## 什么是 Astro？

Astro 是一个现代 Web 框架，专为构建快速、内容驱动的网站而设计。它开创了 **群岛架构** 的概念，交互组件独立水合，减少 JavaScript 负载。

## 快速入门

### 1. 创建新项目

```bash
npm create astro@latest my-blog
cd my-blog
```

### 2. 项目结构

```
my-blog/
├── src/
│   ├── components/    # 可复用的 UI 组件
│   ├── content/       # 博客文章（Markdown）
│   ├── layouts/       # 页面布局
│   ├── pages/         # 基于文件的路由
│   └── styles/        # 全局样式
├── public/            # 静态资源
└── astro.config.mjs   # 配置文件
```

### 3. 创建你的第一个页面

```astro
---
// src/pages/index.astro
import Layout from '../layouts/Layout.astro';
---

<Layout title="主页">
  <h1>欢迎来到我的网站！</h1>
  <p>使用 Astro 构建 ✨</p>
</Layout>
```

### 4. 添加内容集合

在 `src/content.config.ts` 中定义内容模式：

```typescript
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    published: z.coerce.date(),
    description: z.string().default(''),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { posts };
```

### 5. 启动开发

```bash
npm run dev
```

访问 `http://localhost:4321` 查看你的网站！

## 最佳实践

1. **使用内容集合** 进行类型安全的内容管理
2. **利用视图过渡** 实现流畅的页面导航
3. **优化图片** 使用内置的 `<Image />` 组件
4. **保持 JavaScript 最小** — 只在需要时使用岛屿
5. **静态部署** 获得最大性能

## 资源链接

- 📚 [Astro 文档](https://docs.astro.build)
- 💬 [Astro Discord 社区](https://astro.build/chat)
- 🎨 [Astro 主题](https://astro.build/themes)
- 📦 [Astro 集成](https://astro.build/integrations)

祝你构建愉快！🚀
