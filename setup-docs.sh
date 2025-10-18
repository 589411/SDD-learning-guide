#!/bin/bash

# 設定 GitHub Pages 文件結構
# 將內容複製到 docs/ 目錄

set -e

echo "🚀 設定 GitHub Pages 文件結構..."
echo ""

# 創建 docs 目錄結構
echo "📁 創建目錄結構..."
mkdir -p docs/模組內容
mkdir -p docs/實戰專案
mkdir -p docs/學習資源
mkdir -p docs/學習支援
mkdir -p docs/附錄
mkdir -p docs/sdd-practice-project/news-to-lesson
mkdir -p docs/sdd-practice-project/knowledge-base

# 複製文件
echo "📄 複製文件..."

# 根目錄文件
cp 01_前言_AI時代的軟體開發新典範.md docs/ 2>/dev/null || echo "⚠️  找不到: 01_前言_AI時代的軟體開發新典範.md"
cp 02_給跨領域學習者的信.md docs/ 2>/dev/null || echo "⚠️  找不到: 02_給跨領域學習者的信.md"
cp 03_如何使用這本電子書.md docs/ 2>/dev/null || echo "⚠️  找不到: 03_如何使用這本電子書.md"
cp 04_AI賦能學習指南.md docs/ 2>/dev/null || echo "⚠️  找不到: 04_AI賦能學習指南.md"
cp 核心理念_AI時代的人機協作.md docs/ 2>/dev/null || echo "⚠️  找不到: 核心理念_AI時代的人機協作.md"

# 模組內容
cp 模組內容/*.md docs/模組內容/ 2>/dev/null || echo "⚠️  找不到模組內容"

# 實戰專案
cp 實戰專案/*.md docs/實戰專案/ 2>/dev/null || echo "⚠️  找不到實戰專案"
cp sdd-practice-project/README.md docs/sdd-practice-project/ 2>/dev/null || echo "⚠️  找不到 sdd-practice-project"
cp sdd-practice-project/news-to-lesson/README.md docs/sdd-practice-project/news-to-lesson/ 2>/dev/null || echo "⚠️  找不到 news-to-lesson"
cp sdd-practice-project/knowledge-base/README.md docs/sdd-practice-project/knowledge-base/ 2>/dev/null || echo "⚠️  找不到 knowledge-base"

# 學習資源
cp 學習資源/*.md docs/學習資源/ 2>/dev/null || echo "⚠️  找不到學習資源"

# 學習支援
cp 學習支援/*.md docs/學習支援/ 2>/dev/null || echo "⚠️  找不到學習支援"

# 附錄
cp 附錄/*.md docs/附錄/ 2>/dev/null || echo "⚠️  找不到附錄"

echo ""
echo "✅ 文件結構設定完成！"
echo ""
echo "📊 文件統計："
find docs -name "*.md" | wc -l | xargs echo "  Markdown 文件數："
echo ""
echo "🎯 下一步："
echo "  1. 檢查文件：ls -R docs/"
echo "  2. 本地預覽：mkdocs serve"
echo "  3. 部署網站：./deploy-pages.sh"
echo ""
