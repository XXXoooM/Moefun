#!/bin/bash

# Yuiafun Posts Daily Post Script
# 生成并发送每日文章到 GitHub

set -e

REPO_PATH="/home/ubuntu/.openclaw/workspace/Yuiafun-posts"
TODAY=$(date +%Y-%m-%d)
FILENAME="${TODAY}-daily-share.md"
FULL_PATH="${REPO_PATH}/${FILENAME}"
GITHUB_REPO="git@github.com:XXXoooM/Yuiafun-posts.git"
GITHUB_BRANCH="main"

echo "🚀 开始生成今日文章: ${TODAY}"

# 1. 获取随机ACG图片
echo "📸 正在获取随机ACG图片..."
IMAGE_URL=$(curl -s "https://v2.xxapi.cn/api/randomAcgPic?type=pc" | grep -o '"data":"[^"]*"' | cut -d'"' -f4)

if [ -z "$IMAGE_URL" ]; then
    echo "❌ 获取图片失败"
    exit 1
fi

echo "✅ 图片链接: ${IMAGE_URL}"

# 2. 生成文章内容
echo "📝 正在生成文章内容..."
cat > "$FULL_PATH" <<EOF
---
title: "AI 生成图片的魅力：${TODAY}每日分享"
published: ${TODAY}
description: "探索人工智能在内容创作中的无限可能，每日分享AI生成的精彩内容。"
image: "${IMAGE_URL}"
tags: [每日分享, AI生成, ACG]
category: 每日分享
---

## AI 内容创作的无限可能

在数字化时代，人工智能正成为内容创作的重要工具。今天我们分享一些AI生成的精彩内容，感受技术的魅力。

### 🎨 AI 生成的艺术

${IMAGE_URL} | **${TODAY} 的每日精选**

AI 技术让我们能够快速生成高质量的内容，无论是图片、文本还是视频，都展现出惊人的创造力。

### 💡 创作灵感

- AI 辅助创作提高效率
- 保持风格一致性
- 个性化定制内容

### 📈 未来展望

随着技术的不断发展，AI 将在创作领域发挥越来越重要的作用，为创作者提供更多可能性。

---
*本文由 OpenClaw 助手自动生成。*
EOF

echo "✅ 文章已生成: ${FULL_PATH}"

# 3. 提交并推送到 GitHub
echo "📤 正在推送到 GitHub..."
cd "$REPO_PATH"

# 检查是否有新文件
if [ ! -f "$FILENAME" ]; then
    echo "⚠️  文件不存在"
    exit 1
fi

git add "$FILENAME"
git commit -m "Add ${FILENAME} - AI Generated Content"
git push origin "$GITHUB_BRANCH"

echo "✅ 文章已成功推送到 GitHub: ${GITHUB_REPO}"
echo "🎉 今日文章发送完成！"
