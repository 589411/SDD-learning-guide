# 📚 專案 3：個人知識庫管理器

> **💡 這是一個規格驅動的專案**  
> 你可以直接使用 `specs/knowledge-base.spec.md` 中的規格，配合 AI 工具完成開發。

## 📋 專案簡介

建立個人知識管理系統，解決資訊過載問題，支援標籤分類、搜尋和匯出。

### 🎯 專案目標

- 有效管理個人學習筆記和知識
- 快速搜尋和檢索資訊
- 支援多種格式匯出
- **學習完整的系統架構設計和 CRUD 操作**

### 🌟 核心功能

1. **知識條目管理**：新增、編輯、刪除、查詢（完整 CRUD）
2. **標籤系統**：多標籤支援、自動去重、標籤篩選
3. **搜尋功能**：全文搜尋、標籤過濾、進階搜尋
4. **匯出功能**：Markdown、JSON、HTML 格式

---

## 🚀 快速開始

### 🎯 方案 A：用規格 + AI 工具開發（推薦學習）

**這是學習完整系統開發的最佳方式！**

#### Step 1: 閱讀規格
```bash
# 開啟規格文件
open specs/knowledge-base.spec.md
```

#### Step 2: 複製規格給 AI

**使用 Cursor/Windsurf：**
1. 開啟 Cursor 或 Windsurf
2. 打開 `specs/knowledge-base.spec.md`
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
# 貼上「技術棧」和「API 介面」

/speckit.implement
# AI 自動實作
```

**使用 Cline AI Agent：**
```
在 VS Code 中：
「請根據 specs/knowledge-base.spec.md 實作完整功能，
包含 CRUD 操作、標籤系統、搜尋功能、匯出功能、測試」

Cline 會自動完成所有步驟！
```

#### Step 3: 驗證結果
```bash
# 執行測試
pytest tests/

# 測試實際功能
python src/knowledge_base.py
```

---

### 📦 方案 B：使用 Google Colab（快速體驗）

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/你的帳號/SDD-learning-guide-main/blob/main/sdd-practice-project/knowledge-base/notebooks/knowledge_manager.ipynb)

---

### 💻 方案 C：本地環境（傳統方式）

```bash
# 1. 安裝依賴
pip install -r requirements.txt

# 2. 初始化資料庫
python src/knowledge_base.py init

# 3. 新增知識條目
python src/knowledge_base.py add --title "SDD概念" --content "規格驅動開發..."

# 4. 搜尋
python src/knowledge_base.py search "SDD"

# 5. 匯出
python src/knowledge_base.py export --format markdown
```

---

## 🛠️ 技術棧

- **語言**：Python 3.8+
- **資料庫**：JSON 檔案 / SQLite（可選）
- **套件**：`json`, `datetime`, `pytest`

---

## 📚 相關資源

- [完整規格文件](./specs/knowledge-base.spec.md)
- [實戰專案導讀](../../實戰專案/實戰專案導讀.md)

---

**版本 1.0** | **最後更新：2025-10-17**
