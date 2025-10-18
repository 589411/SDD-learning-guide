# 已知問題 (Known Issues)

## 🐛 Gemini API 翻譯問題

**狀態：** 🔴 待解決  
**日期：** 2024-10-18  
**優先級：** 高

### 問題描述

使用 Gemini API 進行自動翻譯時，出現模型不存在的錯誤。

### 錯誤訊息

```json
{
  "error": {
    "code": 404,
    "message": "models/gemini-1.5-flash is not found for API version v1beta, or is not supported for generateContent.",
    "status": "NOT_FOUND"
  }
}
```

### 嘗試過的模型

1. ❌ `gemini-pro` - 已淘汰
2. ❌ `gemini-1.5-flash` - API v1beta 不支援

### 可能的解決方案

#### 方案 1：使用 v1 API（推薦）

```javascript
// 改用 v1 API 而非 v1beta
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent';
```

#### 方案 2：列出可用模型

```bash
curl "https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}"
```

#### 方案 3：改用其他 AI API

- **OpenAI API** (GPT-4)
  - 成本：$0.03/1K tokens
  - 品質：優秀
  
- **Claude API** (Anthropic)
  - 成本：$0.015/1K tokens
  - 品質：優秀
  
- **DeepL API**
  - 成本：$5.49/月（50萬字元）
  - 品質：非常好（專注翻譯）

### 臨時解決方案

在修復 API 問題前，可以使用以下方法：

1. **手動翻譯**
   - 使用 ChatGPT/Claude 網頁版
   - 複製貼上章節內容
   - 手動儲存翻譯結果

2. **使用 DeepL**
   - 註冊 DeepL API
   - 修改腳本使用 DeepL

3. **使用 OpenAI API**
   - 使用 GPT-4 API
   - 成本較高但穩定

### 相關文件

- `book-version/scripts/translate-to-english.js` - 翻譯腳本
- `book-version/translate.sh` - 執行腳本
- `book-version/翻譯使用指南.md` - 使用說明

### 更新記錄

- **2024-10-18 23:00** - 發現問題，嘗試 gemini-pro（失敗）
- **2024-10-18 23:04** - 改用 gemini-1.5-flash（仍失敗）
- **2024-10-18 23:06** - 記錄問題，等待修復

---

## 📝 其他已知問題

目前無其他已知問題。

---

## 🔄 問題追蹤

如有新問題，請在此記錄：

### 問題模板

```markdown
## 🐛 [問題標題]

**狀態：** 🔴 待解決 / 🟡 進行中 / 🟢 已解決  
**日期：** YYYY-MM-DD  
**優先級：** 高/中/低

### 問題描述
[描述問題]

### 錯誤訊息
[貼上錯誤訊息]

### 重現步驟
1. [步驟 1]
2. [步驟 2]

### 解決方案
[如果已解決，描述解決方法]
```

---

**最後更新：** 2024-10-18 23:06
