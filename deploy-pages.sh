#!/bin/bash

# GitHub Pages 部署腳本
# 用途：自動部署 MkDocs 網站到 GitHub Pages

set -e  # 遇到錯誤立即退出

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  GitHub Pages 部署腳本${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 檢查是否安裝 Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}✗${NC} 找不到 Python 3"
    echo "請先安裝 Python 3: https://www.python.org/downloads/"
    exit 1
fi
echo -e "${GREEN}✓${NC} Python 3 已安裝"

# 檢查是否安裝 pip
if ! command -v pip3 &> /dev/null; then
    echo -e "${RED}✗${NC} 找不到 pip3"
    exit 1
fi
echo -e "${GREEN}✓${NC} pip3 已安裝"

# 安裝依賴
echo ""
echo -e "${YELLOW}[1/5]${NC} 安裝 MkDocs 依賴..."
if [ -f "requirements.txt" ]; then
    pip3 install -r requirements.txt --quiet
    echo -e "${GREEN}✓${NC} 依賴安裝完成"
else
    echo -e "${RED}✗${NC} 找不到 requirements.txt"
    exit 1
fi

# 準備文檔目錄
echo ""
echo -e "${YELLOW}[2/5]${NC} 準備文檔目錄..."

# 確保 docs 目錄存在
mkdir -p docs/stylesheets
mkdir -p docs/javascripts

# 複製文件到 docs 目錄（保持目錄結構）
echo "複製文件..."

# 複製目錄
for dir in "模組內容" "學習資源" "學習支援" "附錄" "實戰專案" "sdd-practice-project"; do
    if [ -d "$dir" ]; then
        cp -r "$dir" docs/ 2>/dev/null || true
        echo "  ✓ 已複製 $dir"
    fi
done

# 複製根目錄的 Markdown 文件
for file in *.md; do
    if [ -f "$file" ] && [ "$file" != "README.md" ]; then
        cp "$file" docs/ 2>/dev/null || true
    fi
done

# 確保 index.md 存在
if [ ! -f "docs/index.md" ]; then
    echo -e "${YELLOW}⚠${NC}  docs/index.md 不存在，請確認"
fi

echo -e "${GREEN}✓${NC} 文檔目錄準備完成"

# 本地預覽（可選）
echo ""
echo -e "${YELLOW}[3/5]${NC} 是否要先本地預覽？(y/n)"
read -p "選擇: " preview_choice

if [ "$preview_choice" = "y" ] || [ "$preview_choice" = "Y" ]; then
    echo "啟動本地伺服器..."
    echo "按 Ctrl+C 停止預覽並繼續部署"
    mkdocs serve
fi

# 建立網站
echo ""
echo -e "${YELLOW}[4/5]${NC} 建立 MkDocs 網站..."
if mkdocs build --clean; then
    echo -e "${GREEN}✓${NC} 網站建立完成"
else
    echo -e "${RED}✗${NC} 網站建立失敗"
    exit 1
fi

# 部署到 GitHub Pages
echo ""
echo -e "${YELLOW}[5/5]${NC} 部署到 GitHub Pages..."
echo "這將會："
echo "  1. 建立 gh-pages 分支（如果不存在）"
echo "  2. 推送網站到 gh-pages 分支"
echo "  3. 觸發 GitHub Pages 更新"
echo ""
echo -e "${YELLOW}確定要部署嗎？(y/n)${NC}"
read -p "選擇: " deploy_choice

if [ "$deploy_choice" = "y" ] || [ "$deploy_choice" = "Y" ]; then
    if mkdocs gh-deploy --force --clean --verbose; then
        echo -e "${GREEN}✓${NC} 部署成功！"
    else
        echo -e "${RED}✗${NC} 部署失敗"
        exit 1
    fi
else
    echo "已取消部署"
    exit 0
fi

# 顯示結果
echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ 部署完成！${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "你的網站將在幾分鐘內上線："
echo ""
echo -e "${BLUE}網址：${NC}https://你的用戶名.github.io/SDD-learning-guide/"
echo ""
echo "下一步："
echo "  1. 前往 GitHub Repository > Settings > Pages"
echo "  2. 確認 Source 設定為 'gh-pages' 分支"
echo "  3. 等待 5-10 分鐘讓網站生效"
echo "  4. 訪問上面的網址查看結果"
echo ""
echo "如需自定義域名，請參考："
echo "  https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site"
echo ""
