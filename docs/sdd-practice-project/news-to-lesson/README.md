# 📰 專案 2：新聞轉教案生成器

> **💡 這是一個規格驅動的專案**  
> 你可以直接使用 `specs/news-to-lesson.spec.md` 中的規格，配合 AI 工具完成開發。

## 📋 專案簡介

將新聞文章轉換為教學內容，支援多受眾適配（企業高管、成人學員、年長者）。

### 🎯 專案目標

- 快速將時事新聞轉換為教學素材
- 針對不同受眾調整內容風格
- 保持教學內容的專業性和可讀性
- **學習 AI API 整合和 Prompt Engineering**

### 🌟 核心功能

1. **新聞輸入**：支援 URL 或文字貼上
2. **受眾選擇**：企業高管、成人學員、年長者
3. **AI 生成**：使用 OpenAI/Anthropic API
4. **教案輸出**：Markdown 格式，包含結構化內容

---

## 🚀 快速開始

### 🎯 方案 A：用規格 + AI 工具開發（推薦學習）

**這是學習 SDD 和 AI API 整合的最佳方式！**

#### Step 1: 閱讀規格
```bash
# 開啟規格文件
open specs/news-to-lesson.spec.md
```

#### Step 2: 複製規格給 AI

**使用 Cursor/Windsurf：**
1. 開啟 Cursor 或 Windsurf
2. 打開 `specs/news-to-lesson.spec.md`
3. 滾動到最下方「📦 完整規格複製區」
4. 複製整個 Prompt
5. 貼給 AI，開始開發！

**使用 GitHub Spec Kit：**
```bash
# 安裝 Spec Kit
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# 在 Cursor 中使用
/speckit.specify
# 貼上規格中的「使用者故事」

/speckit.plan
# 貼上「技術棧」和「Prompt 模板」

/speckit.implement
# AI 自動實作
```

**使用 Cline AI Agent：**
```
在 VS Code 中：
「請根據 specs/news-to-lesson.spec.md 實作完整功能，
包含 OpenAI API 整合、多受眾 Prompt 模板、測試」

Cline 會自動完成所有步驟！
```

#### Step 3: 驗證結果
```bash
# 執行測試
pytest tests/

# 測試實際功能（需要 API Key）
export OPENAI_API_KEY="your-api-key"
python src/converter.py --url "新聞URL" --audience "企業高管"
```

---

### 📦 方案 B：使用 Google Colab（快速體驗）

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/你的帳號/SDD-learning-guide-main/blob/main/sdd-practice-project/news-to-lesson/notebooks/news_converter.ipynb)

---

### 💻 方案 C：本地環境（傳統方式）

```bash
# 1. 安裝依賴
pip install -r requirements.txt

# 2. 設定 API Key
export OPENAI_API_KEY="your-api-key"

# 3. 執行轉換
python src/converter.py --url "新聞URL" --audience "企業高管"
```

---

## 🛠️ 技術棧

- **語言**：Python 3.8+
- **AI API**：OpenAI GPT-4 / Anthropic Claude
- **套件**：`openai`, `anthropic`, `requests`, `beautifulsoup4`

---

## 📚 相關資源

- [完整規格文件](./specs/news-to-lesson.spec.md)
- [實戰專案導讀](../../實戰專案/實戰專案導讀.md)

---

**版本 1.0** | **最後更新：2025-10-17**
