#!/bin/bash

# 書籍生成腳本
# 用途：自動化生成 SDD 學習指南書籍

set -e  # 遇到錯誤立即退出

# 顏色定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 獲取腳本所在目錄
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  SDD 學習指南 - 書籍生成系統${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 1. 進入 scripts 目錄
echo -e "${YELLOW}[1/5]${NC} 進入 scripts 目錄..."
cd scripts
echo -e "${GREEN}✓${NC} 已進入 scripts 目錄"
echo ""

# 2. 檢查並安裝依賴
echo -e "${YELLOW}[2/5]${NC} 檢查依賴..."
if [ ! -d "node_modules" ]; then
    echo "首次運行，正在安裝依賴..."
    npm install
    echo -e "${GREEN}✓${NC} 依賴安裝完成"
else
    echo -e "${GREEN}✓${NC} 依賴已存在"
fi
echo ""

# 3. 驗證配置
echo -e "${YELLOW}[3/5]${NC} 驗證配置文件..."
if npm run validate; then
    echo -e "${GREEN}✓${NC} 配置驗證通過"
else
    echo -e "${RED}✗${NC} 配置驗證失敗，請檢查配置文件"
    exit 1
fi
echo ""

# 4. 生成書籍
echo -e "${YELLOW}[4/5]${NC} 生成書籍..."
if npm run generate:leanpub; then
    echo -e "${GREEN}✓${NC} 書籍生成完成"
else
    echo -e "${RED}✗${NC} 書籍生成失敗"
    exit 1
fi
echo ""

# 5. 查看結果
echo -e "${YELLOW}[5/5]${NC} 準備查看結果..."
cd ..
MANUSCRIPT_DIR="$SCRIPT_DIR/manuscript"

if [ -d "$MANUSCRIPT_DIR" ]; then
    echo -e "${GREEN}✓${NC} 輸出目錄：$MANUSCRIPT_DIR"
    echo ""
    echo -e "${BLUE}生成的文件：${NC}"
    ls -lh "$MANUSCRIPT_DIR" | grep -v "^total" | awk '{print "  - " $9 " (" $5 ")"}'
    echo ""
    
    # 根據操作系統打開目錄
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$MANUSCRIPT_DIR"
        echo -e "${GREEN}✓${NC} 已在 Finder 中打開輸出目錄"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open "$MANUSCRIPT_DIR" 2>/dev/null || echo -e "${YELLOW}請手動查看目錄：${NC}$MANUSCRIPT_DIR"
    else
        echo -e "${YELLOW}請手動查看目錄：${NC}$MANUSCRIPT_DIR"
    fi
else
    echo -e "${RED}✗${NC} 找不到輸出目錄"
    exit 1
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ 書籍生成完成！${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "下一步："
echo -e "  1. 查看生成的章節：${BLUE}cat manuscript/chapter-01.md${NC}"
echo -e "  2. 查看生成報告：${BLUE}cat manuscript/REPORT.md${NC}"
echo -e "  3. 上傳到 Leanpub 或提交給出版社"
echo ""
