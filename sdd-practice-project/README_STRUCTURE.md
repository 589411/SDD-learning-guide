# 📦 SDD Practice Project 專案結構說明

> **這些專案提供「起始框架」，讓你可以用規格配合 AI 工具快速完成開發！**

---

## 🎯 專案設計理念

### 不是「完整的程式碼」，而是「可執行的規格」

每個專案都包含：

1. **📋 完整的規格文件** (`specs/*.spec.md`)
   - 詳細的使用者故事
   - 明確的驗收條件（Gherkin 格式）
   - 完整的技術規格
   - **可直接複製給 AI 的 Prompt**

2. **🏗️ 基礎程式碼框架** (`src/*.py`)
   - 類別和函式的骨架
   - 清楚的 TODO 註解
   - 使用說明和提示
   - **不是完整實作，而是起點**

3. **📝 範例資料** (`examples/*`)
   - 輸入範例
   - 輸出範例
   - 讓你快速理解功能

---

## 📊 三個專案總覽

### 1. 🎨 風格特徵提取器 (style-analyzer)

**學習重點：** SDD 基礎、資料分析、TDD

**專案結構：**
```
style-analyzer/
├── specs/
│   └── style-analyzer.spec.md      ✅ 完整規格（可複製給 AI）
├── src/
│   └── analyzer.py                  🏗️ 基礎框架（有 TODO）
├── tests/
│   └── test_analyzer.py             ✅ 完整測試案例
├── examples/
│   ├── sample_article.txt           📝 範例文章
│   └── sample_output.json           📝 範例輸出
└── README.md                        📖 使用指南
```

**狀態：**
- ✅ 規格文件：完整
- 🏗️ 程式碼：基礎框架（需要用 AI 完成）
- ✅ 測試：完整
- ✅ 範例：完整

---

### 2. 📰 新聞轉教案生成器 (news-to-lesson)

**學習重點：** AI API 整合、Prompt Engineering、多受眾適配

**專案結構：**
```
news-to-lesson/
├── specs/
│   └── news-to-lesson.spec.md      ✅ 完整規格（可複製給 AI）
├── src/
│   ├── converter.py                 🏗️ 基礎框架（有 TODO）
│   └── prompts.py                   ✅ 完整 Prompt 模板
├── tests/
│   └── (待建立)                     ⏳ 用規格生成
├── examples/
│   ├── sample_news.txt              ✅ 範例新聞
│   └── sample_lesson_executive.md  ✅ 範例教案
└── README.md                        📖 使用指南
```

**狀態：**
- ✅ 規格文件：完整
- 🏗️ 程式碼：基礎框架 + Prompt 模板
- ⏳ 測試：待用 AI 生成
- ✅ 範例：完整

---

### 3. 📚 個人知識庫管理器 (knowledge-base)

**學習重點：** CRUD 操作、系統架構、資料持久化

**專案結構：**
```
knowledge-base/
├── specs/
│   └── knowledge-base.spec.md      ✅ 完整規格（可複製給 AI）
├── src/
│   └── knowledge_base.py            🏗️ 基礎框架（有 TODO）
├── tests/
│   └── (待建立)                     ⏳ 用規格生成
├── examples/
│   └── sample_data.json             ✅ 範例資料（5個條目）
└── README.md                        📖 使用指南
```

**狀態：**
- ✅ 規格文件：完整
- 🏗️ 程式碼：基礎框架（包含基本 CRUD）
- ⏳ 測試：待用 AI 生成
- ✅ 範例：完整

---

## 🚀 如何使用這些專案

### 方法 1：用規格 + AI 工具開發（推薦）

**Step 1：選擇一個專案**
```bash
cd style-analyzer  # 或 news-to-lesson, knowledge-base
```

**Step 2：閱讀規格**
```bash
open specs/*.spec.md
```

**Step 3：複製規格給 AI**

滾動到規格文件最下方的「📦 完整規格複製區」，複製整個 Prompt。

**Step 4：在 AI 工具中使用**

**使用 Cursor/Windsurf：**
```
1. 開啟專案
2. 貼上規格 Prompt
3. AI 自動生成完整程式碼
4. 執行測試驗證
```

**使用 GitHub Spec Kit：**
```bash
/speckit.specify
# 貼上規格中的「使用者故事」

/speckit.plan
# 貼上「技術棧」和「功能需求」

/speckit.implement
# AI 自動實作
```

**使用 Cline AI Agent：**
```
「請根據 specs/*.spec.md 實作完整功能」
Cline 會自動完成所有步驟！
```

---

### 方法 2：手動開發（傳統學習）

**Step 1：閱讀規格**
- 理解需求和驗收條件

**Step 2：查看基礎框架**
- 看 `src/*.py` 中的 TODO 註解
- 理解程式結構

**Step 3：實作功能**
- 根據規格實作每個 TODO
- 參考範例資料

**Step 4：執行測試**
```bash
pytest tests/
```

---

## 💡 程式碼框架的設計

### 為什麼不提供完整程式碼？

1. **學習價值**
   - 完整程式碼 → 只能複製貼上
   - 基礎框架 + 規格 → 理解如何用規格驅動開發

2. **與 AI 協作**
   - 學習如何給 AI 清楚的指令
   - 體驗規格驅動的威力
   - 培養驗收 AI 輸出的能力

3. **靈活性**
   - 可以用不同的 AI 工具
   - 可以選擇不同的實作方式
   - 可以根據需求調整

---

## 📋 各專案的 TODO 清單

### style-analyzer
- [ ] 實作情感分析（使用 VADER）
- [ ] 實作句子統計
- [ ] 實作高頻短語提取
- [ ] 實作問句比例計算
- [ ] 完善錯誤處理

### news-to-lesson
- [ ] 實作 URL 解析（BeautifulSoup）
- [ ] 整合 OpenAI/Anthropic API
- [ ] 實作驗收標準自動化檢查
- [ ] 實作成本追蹤
- [ ] 建立測試檔案

### knowledge-base
- [ ] 完善標籤去重邏輯
- [ ] 實作進階搜尋功能
- [ ] 實作 HTML 匯出
- [ ] 實作多標籤組合過濾
- [ ] 建立測試檔案

---

## 🎓 學習路徑建議

### Week 1-2：專案 1 (style-analyzer)
1. 閱讀規格文件
2. 複製規格給 Cursor/Windsurf
3. 理解 AI 生成的程式碼
4. 執行測試，確保通過
5. 嘗試修改和擴充功能

**學習重點：**
- 如何撰寫清楚的規格
- 如何用規格驅動 AI
- 如何驗收 AI 的輸出

---

### Week 3-4：專案 2 (news-to-lesson)
1. 閱讀規格文件
2. 設定 API Key
3. 用 AI 完成實作
4. 測試不同受眾類型
5. 優化 Prompt 模板

**學習重點：**
- AI API 整合
- Prompt Engineering
- 多受眾適配

---

### Week 5-6：專案 3 (knowledge-base)
1. 閱讀規格文件
2. 用 AI 完成實作
3. 理解 CRUD 操作
4. 測試搜尋和匯出功能
5. 擴充新功能

**學習重點：**
- 完整系統架構
- 資料持久化
- 搜尋演算法

---

## ✨ 核心價值

### 1. 規格驅動學習
- 先看規格，理解「要做什麼」
- 再看程式碼，理解「怎麼做」
- 最後用 AI，體驗「快速實作」

### 2. AI 協作能力
- 學會撰寫清楚的規格
- 學會給 AI 明確的指令
- 學會驗收 AI 的輸出

### 3. 實用技能
- 三個可以實際使用的工具
- 完整的開發流程體驗
- 可展示的作品集

---

## 🔗 相關資源

- [實戰專案導讀](../實戰專案/實戰專案導讀.md)
- [模組 1 - AI Coding 工具](../模組內容/模組1_開發者工具包.md)
- [視覺化圖表](../視覺化圖表_工具演進與能力培養.md)

---

**版本 2.0** | **最後更新：2025-10-17**

*這些專案是學習 SDD 和 AI 協作的最佳起點！* 🚀
