---
title: 现代 CSS 设计技巧
published: 2026-04-08
description: 探索现代 CSS 的强大特性，包括容器查询、级联层和颜色函数。
image: https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop
tags: [CSS, 前端, 设计]
category: 技术
---

## 现代 CSS 的力量

CSS 在近年来经历了巨大的演变，许多强大的新特性正在改变我们编写样式的方式。

## 1. CSS 自定义属性

```css
:root {
  --primary: hsl(250, 55%, 55%);
  --radius: 1rem;
  --shadow: 0 4px 14px rgba(0, 0, 0, 0.06);
}

.card {
  background: white;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  border: 1px solid var(--primary);
}
```

## 2. 容器查询

容器查询允许组件根据其容器的大小来调整样式：

```css
.container {
  container-type: inline-size;
}

@container (min-width: 600px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## 3. 级联层

`@layer` 让你更好地控制样式的优先级：

```css
@layer base, components, utilities;

@layer base {
  h1 { font-size: 2rem; }
}

@layer components {
  .btn { padding: 0.5rem 1rem; }
}
```

## 4. 颜色函数

新的颜色函数让颜色操作变得简单：

```css
.element {
  /* oklch - 感知均匀的颜色空间 */
  color: oklch(0.7 0.15 250);
  
  /* color-mix - 混合两种颜色 */
  background: color-mix(in srgb, blue 30%, white);
}
```

## 5. 视图过渡 API

```css
@view-transition {
  navigation: auto;
}

::view-transition-old(root) {
  animation: fade-out 0.3s ease;
}

::view-transition-new(root) {
  animation: fade-in 0.3s ease;
}
```

## 总结

现代 CSS 提供了前所未有的表达力和控制力。拥抱这些新特性将使你的 Web 开发工作更加高效和愉快！
