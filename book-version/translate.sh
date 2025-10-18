#!/bin/bash

# 自動翻譯腳本
# 使用 Gemini API 將中文內容翻譯成英文

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
echo -e "${BLUE}  自動翻譯系統 - Gemini API${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 檢查 API Key
if [ -z "$GEMINI_API_KEY" ]; then
    echo -e "${RED}❌ 錯誤：找不到 GEMINI_API_KEY${NC}"
    echo ""
    echo -e "${YELLOW}請先設定 API Key：${NC}"
    echo ""
    echo -e "方法 1：直接設定環境變數"
    echo -e "${BLUE}export GEMINI_API_KEY=\"your-api-key-here\"${NC}"
    echo ""
    echo -e "方法 2：創建 .env 文件"
    echo -e "${BLUE}echo 'GEMINI_API_KEY=your-api-key-here' > .env${NC}"
    echo -e "${BLUE}source .env${NC}"
    echo ""
    echo -e "取得 API Key："
    echo -e "${BLUE}https://makersuite.google.com/app/apikey${NC}"
    echo ""
    exit 1
fi

echo -e "${GREEN}✓${NC} API Key 已設定"
echo ""

# 進入 scripts 目錄
cd scripts

# 檢查依賴
echo -e "${YELLOW}[1/3]${NC} 檢查依賴..."
if [ ! -d "node_modules" ]; then
    echo "安裝依賴..."
    npm install
    echo -e "${GREEN}✓${NC} 依賴安裝完成"
else
    echo -e "${GREEN}✓${NC} 依賴已存在"
fi
echo ""

# 執行翻譯
echo -e "${YELLOW}[2/3]${NC} 開始翻譯..."
echo ""
echo -e "${BLUE}這將會：${NC}"
echo "  - 讀取所有中文章節"
echo "  - 使用 Gemini API 翻譯成英文"
echo "  - 保持所有格式和程式碼"
echo "  - 儲存到 manuscript-en/ 目錄"
echo ""
echo -e "${YELLOW}⚠️  注意：${NC}"
echo "  - 翻譯可能需要 10-30 分鐘"
echo "  - 請保持網路連線"
echo "  - 會自動暫停避免 API 限制"
echo ""

read -p "按 Enter 繼續，或 Ctrl+C 取消..."
echo ""

# 執行翻譯腳本
node translate-to-english.js

# 回到上層目錄
cd ..

# 查看結果
echo ""
echo -e "${YELLOW}[3/3]${NC} 查看結果..."
MANUSCRIPT_DIR="$SCRIPT_DIR/manuscript-en"

if [ -d "$MANUSCRIPT_DIR" ]; then
    echo -e "${GREEN}✓${NC} 輸出目錄：$MANUSCRIPT_DIR"
    echo ""
    echo -e "${BLUE}生成的文件：${NC}"
    ls -lh "$MANUSCRIPT_DIR"/*.md 2>/dev/null | awk '{print "  - " $9 " (" $5 ")"}'
    echo ""
    
    # 統計
    FILE_COUNT=$(ls -1 "$MANUSCRIPT_DIR"/*.md 2>/dev/null | wc -l)
    echo -e "${GREEN}✓ 已翻譯 $FILE_COUNT 個章節${NC}"
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
echo -e "${GREEN}✓ 翻譯完成！${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "下一步："
echo -e "  1. ${BLUE}檢查翻譯品質${NC}"
echo -e "     cat manuscript-en/chapter-01.md"
echo ""
echo -e "  2. ${BLUE}手動調整${NC}（如需要）"
echo -e "     vim manuscript-en/chapter-01.md"
echo ""
echo -e "  3. ${BLUE}上傳到 Leanpub${NC}"
echo -e "     - 創建新書（英文版）"
echo -e "     - 上傳 manuscript-en/ 目錄"
echo -e "     - 生成預覽"
echo -e "     - 發布！"
echo ""
