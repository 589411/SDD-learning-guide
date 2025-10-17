# 新聞轉教案生成器 - 功能規格

> **💡 這是一份可執行的規格文件**  
> 你可以直接複製這份規格給 AI 工具（Cursor、Windsurf、Claude、ChatGPT），讓 AI 根據規格生成程式碼。

---

## 🚀 如何使用這份規格

### 方法 1：使用 GitHub Spec Kit（推薦）

```bash
# 1. 安裝 Spec Kit
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# 2. 在 Cursor/Windsurf 中使用
/speckit.specify
# 然後貼上下方的「使用者故事」和「驗收條件」

/speckit.plan
# 貼上「技術棧」和「功能需求」

/speckit.implement
# AI 自動實作
```

### 方法 2：直接複製給 AI（Cursor/Claude/ChatGPT）

**📋 複製這段 Prompt：**

```
我需要實作一個新聞轉教案生成器，請根據以下規格生成 Python 程式碼：

[複製下方完整規格內容]

請按照以下步驟：
1. 先生成測試程式碼（test_converter.py）
2. 再實作主程式（converter.py）
3. 確保所有測試通過
4. 程式碼要有完整註解
```

### 方法 3：使用 Cline AI Agent

```
在 VS Code 中安裝 Cline 擴充套件，然後：

「請根據 specs/news-to-lesson.spec.md 實作完整功能，
包含測試、主程式、範例檔案」

Cline 會自動：
1. 讀取規格
2. 建立專案結構
3. 生成測試
4. 實作功能
5. 執行測試
6. 修正錯誤
```

---

## 📋 功能概述

本規格定義將新聞文章轉換為教學內容的功能，支援多受眾適配（企業高管、成人學員、年長者）。

**技術棧：**
- 語言：Python 3.8+
- AI API：OpenAI GPT-4 或 Anthropic Claude
- HTTP 請求：requests
- 網頁解析：beautifulsoup4
- 測試框架：pytest
- 開發環境：Google Colab（推薦）或本地環境

---

## 👤 使用者故事 (User Story)

### US-001: 新聞內容轉換

**身為一個** AI 講師，  
**我想要** 將新聞文章轉換為教學內容，  
**以便於** 快速產出符合我風格的教案。

**商業價值：** 提升內容產出效率，保持教學品質  
**優先級：** 🔴 高（核心功能）

### US-002: 多受眾適配

**身為一個** 教學內容創作者，  
**我想要** 針對不同受眾調整教學內容，  
**以便於** 同一主題可以適用於企業高管、成人學員或年長者。

**商業價值：** 擴大受眾範圍，提升內容價值  
**優先級：** 🔴 高（差異化功能）

---

## ✅ 驗收條件 (Acceptance Criteria)

### 場景一：成功轉換新聞為教案（企業高管版）

```gherkin
Given 我有一篇新聞文章的 URL
  And 文章內容至少有 300 字
When 我選擇受眾類型為「企業高管」
  And 我點擊「生成教案」按鈕
Then 系統應該生成 Markdown 格式的教案
  And 教案應該包含：標題、摘要、知識點、實例、結論
  And 專業術語密度應該在 12-15%
  And 內容應該強調 ROI 和商業價值
  And 應該包含至少一個企業案例
  And 生成時間應該在 30 秒內完成
```

### 場景二：成功轉換新聞為教案（成人學員版）

```gherkin
Given 我有一篇新聞文章的文字內容
  And 文章內容至少有 300 字
When 我選擇受眾類型為「成人學員」
  And 我點擊「生成教案」按鈕
Then 系統應該生成 Markdown 格式的教案
  And 教案應該包含實用案例
  And 問句比例應該在 10-15%
  And 內容應該平易近人
  And 應該包含行動建議
```

### 場景三：成功轉換新聞為教案（年長者版）

```gherkin
Given 我有一篇新聞文章的文字內容
When 我選擇受眾類型為「年長者」
  And 我點擊「生成教案」按鈕
Then 系統應該生成 Markdown 格式的教案
  And 內容應該淺顯易懂
  And 應該包含豐富的類比說明
  And 專業術語應該有解釋
  And 字體建議應該較大
```

### 場景四：API 錯誤處理

```gherkin
Given 我的 API Key 無效或已過期
When 我嘗試生成教案
Then 系統應該顯示錯誤訊息 "API Key 無效，請檢查設定"
  And 不應該扣除 API 使用額度
  And 應該提供設定 API Key 的指引
```

### 場景五：URL 解析失敗

```gherkin
Given 我提供的 URL 無法訪問
When 我嘗試生成教案
Then 系統應該顯示錯誤訊息 "無法訪問該網址"
  And 建議我直接貼上文字內容
  And 提供「貼上文字」的選項
```

### 場景六：成本追蹤

```gherkin
Given 我已經生成了 5 篇教案
When 我查看使用統計
Then 系統應該顯示總 token 使用量
  And 顯示預估成本（美元）
  And 顯示每篇教案的平均成本
```

---

## 📊 資料規格

### 輸入規格

```json
{
  "input": {
    "source_type": "url | text",
    "content": "string (URL or text content)",
    "audience": "executive | adult | senior",
    "api_key": "string (OpenAI or Anthropic)"
  }
}
```

### 輸出規格（Markdown）

```markdown
# [教案標題]

**受眾：** [企業高管/成人學員/年長者]  
**生成時間：** [ISO8601 datetime]  
**原文來源：** [URL or "直接輸入"]

## 📋 摘要
[2-3 句話總結核心內容]

## 🎯 知識點
1. [知識點 1]
2. [知識點 2]
3. [知識點 3]

## 💡 實例說明
[根據受眾類型提供適當的案例]

## 🔑 關鍵要點
- [要點 1]
- [要點 2]
- [要點 3]

## 📝 結論
[總結與行動建議]

---
**生成資訊：**
- Token 使用量：[數字]
- 預估成本：$[金額]
```

### 驗收標準規格

```json
{
  "executive": {
    "professional_term_ratio": "0.12-0.15",
    "focus": "ROI, business value",
    "case_type": "enterprise examples",
    "structure": "conclusion-first"
  },
  "adult": {
    "question_ratio": "0.10-0.15",
    "focus": "practical applications",
    "case_type": "real-life examples",
    "tone": "approachable"
  },
  "senior": {
    "complexity": "simple",
    "analogies": "rich",
    "term_explanation": "required",
    "font_size": "large recommended"
  }
}
```

---

## 🔍 功能需求

### 1. 新聞內容提取

**需求：** 從 URL 或文字輸入提取新聞內容

**實作方式：**
- URL 輸入：使用 requests + BeautifulSoup 解析
- 文字輸入：直接使用
- 自動提取：標題、內容、關鍵字

**驗收標準：**
- URL 解析成功率 > 90%
- 正確識別標題和內容
- 過濾廣告和無關內容

### 2. Prompt Engineering

**需求：** 根據受眾類型設計不同的 AI Prompt

**企業高管版 Prompt 模板：**
```
你是一位商業顧問，請將以下新聞轉換為適合企業高管的教學內容。

要求：
- 專業術語密度：12-15%
- 強調 ROI 和商業價值
- 包含至少一個企業案例
- 結論先行結構

新聞內容：
{news_content}
```

**成人學員版 Prompt 模板：**
```
你是一位實用主義教師，請將以下新聞轉換為適合成人學員的教學內容。

要求：
- 實用案例導向
- 問句比例：10-15%
- 平易近人的語氣
- 包含行動建議

新聞內容：
{news_content}
```

**年長者版 Prompt 模板：**
```
你是一位耐心的教育者，請將以下新聞轉換為適合年長者的教學內容。

要求：
- 淺顯易懂
- 豐富的類比說明
- 專業術語需解釋
- 避免複雜句型

新聞內容：
{news_content}
```

### 3. AI API 整合

**需求：** 整合 OpenAI 或 Anthropic API

**實作方式：**
- 支援 OpenAI GPT-4
- 支援 Anthropic Claude
- API Key 從環境變數讀取
- 錯誤處理和重試機制

**驗收標準：**
- API 調用成功率 > 95%
- 錯誤訊息清楚
- 支援超時重試（最多 3 次）

### 4. 驗收標準自動化檢查

**需求：** 自動檢查生成的教案是否符合標準

**檢查項目：**
- 專業術語密度（企業高管版）
- 問句比例（成人學員版）
- 是否包含類比（年長者版）
- 結構完整性

**驗收標準：**
- 自動檢查通過率 > 80%
- 不符合標準時提供改進建議

### 5. 成本追蹤

**需求：** 追蹤 API 使用成本

**實作方式：**
- 記錄每次調用的 token 數量
- 計算預估成本
- 提供使用統計

**驗收標準：**
- token 計算準確
- 成本估算誤差 < 5%

---

## ⚠️ 錯誤處理

### 錯誤代碼表

| 錯誤代碼 | 錯誤訊息 | 處理方式 |
|---------|---------|---------|
| E001 | API Key 無效 | 提示設定正確的 API Key |
| E002 | URL 無法訪問 | 建議使用文字輸入 |
| E003 | API 調用失敗 | 自動重試，最多 3 次 |
| E004 | 內容過短 | 提示至少需要 300 字 |
| E005 | API 額度不足 | 顯示剩餘額度，建議充值 |

---

## 🎯 效能需求

- **生成時間**：< 30 秒（一般新聞）
- **API 調用**：每次生成 1 次調用
- **成本控制**：每篇教案 < $0.10

---

## 🔒 安全需求

- API Key 不應該硬編碼
- 使用環境變數儲存敏感資訊
- 不記錄使用者輸入的內容
- API 調用使用 HTTPS

---

## 📝 非功能需求

### 可用性
- 錯誤訊息清楚易懂
- 提供使用範例
- 支援中英文新聞

### 可維護性
- Prompt 模板獨立管理
- 程式碼模組化
- 測試覆蓋率 > 80%

### 可擴充性
- 易於新增新的受眾類型
- 支援其他 AI API（如 Gemini）
- 可自訂 Prompt 模板

---

## 🧪 測試案例

### 測試案例 1：企業高管版教案生成

**輸入：** 科技新聞 URL  
**預期輸出：** 
- 包含商業價值分析
- 專業術語密度 12-15%
- 至少一個企業案例

### 測試案例 2：成人學員版教案生成

**輸入：** 生活新聞文字  
**預期輸出：**
- 實用案例豐富
- 問句比例 10-15%
- 包含行動建議

### 測試案例 3：年長者版教案生成

**輸入：** 健康新聞文字  
**預期輸出：**
- 淺顯易懂
- 包含類比說明
- 專業術語有解釋

### 測試案例 4：API 錯誤處理

**輸入：** 無效的 API Key  
**預期輸出：** 清楚的錯誤訊息，不扣除額度

---

## 📅 開發里程碑

### Phase 1: 基礎功能（Week 1-2）
- [ ] URL 和文字輸入處理
- [ ] OpenAI API 整合
- [ ] 基本 Prompt 模板
- [ ] Markdown 輸出

### Phase 2: 多受眾支援（Week 3-4）
- [ ] 三種受眾類型的 Prompt
- [ ] 驗收標準自動化檢查
- [ ] 成本追蹤功能
- [ ] 錯誤處理完善

### Phase 3: 優化與擴充（Week 5+）
- [ ] 支援 Anthropic Claude
- [ ] 自訂 Prompt 模板
- [ ] 批次處理
- [ ] Web 介面

---

## 📦 完整規格複製區（給 AI 使用）

### 🎯 快速開始 Prompt

**複製以下內容給 Cursor/Windsurf/Claude/ChatGPT：**

````markdown
# 任務：實作新聞轉教案生成器

## 專案需求

我需要一個 Python 程式，將新聞文章轉換為教學內容，支援多受眾適配。

### 核心功能
1. **新聞內容提取**：支援 URL 或文字輸入
2. **AI 生成教案**：使用 OpenAI GPT-4 或 Anthropic Claude
3. **多受眾適配**：企業高管、成人學員、年長者
4. **驗收標準檢查**：自動檢查生成內容是否符合標準
5. **成本追蹤**：記錄 token 使用量和預估成本

### 輸入規格
```json
{
  "source_type": "url | text",
  "content": "string",
  "audience": "executive | adult | senior",
  "api_key": "string"
}
```

### 輸出規格（Markdown）
包含：標題、摘要、知識點、實例、結論、生成資訊

### 受眾類型規格

**企業高管：**
- 專業術語密度：12-15%
- 強調 ROI 和商業價值
- 包含企業案例
- 結論先行結構

**成人學員：**
- 問句比例：10-15%
- 實用案例導向
- 平易近人語氣
- 包含行動建議

**年長者：**
- 淺顯易懂
- 豐富類比說明
- 專業術語需解釋
- 避免複雜句型

### Prompt 模板範例

企業高管版：
```
你是一位商業顧問，請將以下新聞轉換為適合企業高管的教學內容。
要求：專業術語密度 12-15%、強調 ROI、包含企業案例、結論先行。
新聞內容：{news_content}
```

### 驗收條件

**場景 1：成功生成教案**
- Given: 新聞 URL 或文字
- When: 選擇受眾類型並生成
- Then: 回傳 Markdown 格式教案，符合受眾標準

**場景 2：API 錯誤**
- Given: 無效的 API Key
- When: 嘗試生成
- Then: 顯示錯誤訊息，不扣除額度

**場景 3：URL 解析失敗**
- Given: 無法訪問的 URL
- When: 嘗試生成
- Then: 建議使用文字輸入

### 技術要求
- Python 3.8+
- OpenAI API 或 Anthropic Claude
- requests + beautifulsoup4（URL 解析）
- 測試框架：pytest
- API Key 從環境變數讀取
- 測試覆蓋率 > 80%

### 專案結構
```
src/
  converter.py         # 主程式
  prompts.py          # Prompt 模板
  validators.py       # 驗收標準檢查
tests/
  test_converter.py   # 測試
examples/
  sample_news.txt     # 範例新聞
  sample_lesson.md    # 範例教案
```

## 開發步驟

請按照 TDD 流程：
1. 先寫測試（test_converter.py）
2. 實作功能（converter.py, prompts.py, validators.py）
3. 確保測試通過
4. 重構優化

## 開始實作

請從測試開始，包含以下測試案例：
- test_url_extraction
- test_text_input
- test_generate_lesson_executive
- test_generate_lesson_adult
- test_generate_lesson_senior
- test_api_error_handling
- test_cost_tracking
- test_validation_check
````

---

## 🔗 相關文件

- [專案 README](../README.md)
- [實戰專案導讀](../../../實戰專案/實戰專案導讀.md)
- [開發大綱 - 模組 2](../../../開發大綱.md#模組-2sdd-核心循環實戰)
- [模組 1 - AI Coding 工具](../../../模組內容/模組1_開發者工具包.md)

---

**版本 2.0** | **最後更新：2025-10-17** | **可執行規格**
