#!/bin/bash

# 測試 Gemini API 是否正常工作

echo "測試 Gemini API..."
echo ""

# 檢查 API Key
if [ -z "$GEMINI_API_KEY" ]; then
    echo "❌ 錯誤：找不到 GEMINI_API_KEY"
    echo ""
    echo "請先設定："
    echo "export GEMINI_API_KEY=\"your-api-key-here\""
    exit 1
fi

echo "✓ API Key 已設定"
echo ""

# 測試 API
echo "發送測試請求..."
echo ""

curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}" \
  -H 'Content-Type: application/json' \
  -d '{
    "contents": [{
      "parts": [{
        "text": "Translate to English: 你好，世界"
      }]
    }]
  }' | python3 -m json.tool

echo ""
echo "如果看到翻譯結果，表示 API 正常工作！"
