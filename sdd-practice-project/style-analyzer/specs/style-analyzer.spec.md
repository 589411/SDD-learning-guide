# 風格特徵提取器 - 功能規格

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
我需要實作一個風格特徵提取器，請根據以下規格生成 Python 程式碼：

[複製下方完整規格內容]

請按照以下步驟：
1. 先生成測試程式碼（test_analyzer.py）
2. 再實作主程式（analyzer.py）
3. 確保所有測試通過
4. 程式碼要有完整註解
```

### 方法 3：使用 Cline AI Agent

```
在 VS Code 中安裝 Cline 擴充套件，然後：

「請根據 specs/style-analyzer.spec.md 實作完整功能，
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

本規格定義文字內容的風格特徵提取功能，包含情感分析、句子長度統計和高頻短語提取。

**技術棧：**
- 語言：Python 3.8+
- NLP 工具：NLTK, VADER Sentiment
- 測試框架：pytest
- 開發環境：Google Colab（推薦）或本地環境

---

## 👤 使用者故事 (User Story)

### US-001: 基本風格分析功能

**身為一個** AI 講師，  
**我想要** 分析我的文章和逐字稿的風格特徵，  
**以便於** 了解我的教學風格並保持內容一致性。

**商業價值：** 建立個人 IP 風格規範，提升內容品質  
**優先級：** 🔴 高（核心功能）

---

## ✅ 驗收條件 (Acceptance Criteria)

### 場景一：成功分析文字內容

```gherkin
Given 我有一份文字檔案 "article.txt"
  And 檔案內容至少有 500 字
  And 檔案編碼是 UTF-8
When 我上傳檔案到分析器
  And 我點擊「開始分析」按鈕
Then 系統應該回傳 JSON 格式的分析報告
  And 報告應該包含「熱情度得分」（0.0-1.0）
  And 報告應該包含「句子平均長度」
  And 報告應該包含「高頻短語 TOP3」
  And 報告應該包含「問句比例」
  And 分析時間應該在 5 秒內完成
```

### 場景二：檔案格式錯誤

```gherkin
Given 我有一個非文字檔案 "image.jpg"
When 我嘗試上傳該檔案
  And 我點擊「開始分析」按鈕
Then 系統應該顯示錯誤訊息 "僅支援 .txt 或 .md 格式"
  And 檔案應該被拒絕
  And 上傳按鈕應該維持可點擊狀態
```

### 場景三：檔案內容過短

```gherkin
Given 我有一份文字檔案
  And 檔案內容少於 100 字
When 我上傳檔案並開始分析
Then 系統應該顯示警告訊息 "內容過短，建議至少 500 字以獲得準確分析"
  And 系統應該仍然執行分析
  And 報告應該標註「樣本數不足」
```

### 場景四：批次分析多個檔案

```gherkin
Given 我有 3 份文字檔案
  And 每份檔案都符合格式要求
When 我選擇「批次分析」模式
  And 我上傳所有檔案
Then 系統應該依序分析每個檔案
  And 生成個別的分析報告
  And 生成一份綜合比較報告
  And 綜合報告應該包含「平均熱情度」和「風格一致性評分」
```

### 場景五：儲存分析結果

```gherkin
Given 我已完成一次分析
  And 分析報告已生成
When 我點擊「儲存報告」按鈕
Then 系統應該將報告儲存為 JSON 檔案
  And 檔名應該包含時間戳記（格式：analysis_YYYYMMDD_HHMMSS.json）
  And 檔案應該下載到本地
```

### 場景六：處理特殊字元

```gherkin
Given 我有一份包含特殊字元的文字檔案
  And 檔案包含 emoji、標點符號、數字
When 我上傳檔案並開始分析
Then 系統應該正確處理特殊字元
  And emoji 應該被視為情感指標
  And 數字應該被正確計數
  And 標點符號應該用於句子切分
```

---

## 📊 資料規格

### 輸入規格

```json
{
  "file": {
    "format": [".txt", ".md"],
    "encoding": "UTF-8",
    "min_size": "100 characters",
    "max_size": "10 MB"
  }
}
```

### 輸出規格

```json
{
  "file_name": "string",
  "analysis_date": "ISO8601 datetime",
  "word_count": "integer",
  "sentence_count": "integer",
  "metrics": {
    "enthusiasm_score": "float (0.0-1.0)",
    "avg_sentence_length": "float",
    "max_sentence_length": "integer",
    "min_sentence_length": "integer",
    "question_ratio": "float (0.0-1.0)",
    "top_phrases": [
      {
        "phrase": "string",
        "count": "integer"
      }
    ]
  },
  "warnings": ["string"]
}
```

---

## 🔍 功能需求

### 1. 情感分析

**需求：** 分析文字的情感傾向，計算熱情度得分

**演算法：**
- 使用 VADER Sentiment Analysis
- 計算正面、負面、中性詞彙比例
- 綜合得出熱情度得分（0.0-1.0）

**驗收標準：**
- 熱情的文字（如「太棒了！」）得分 > 0.7
- 平淡的文字（如「這是一個事實」）得分 0.3-0.5
- 負面的文字（如「很糟糕」）得分 < 0.3

### 2. 句子統計

**需求：** 統計句子長度相關指標

**計算方式：**
- 平均句子長度 = 總字數 / 句子數
- 最長句子：找出字數最多的句子
- 最短句子：找出字數最少的句子

**驗收標準：**
- 句子切分準確（以句號、問號、驚嘆號為界）
- 統計數字正確（可手動驗證）

### 3. 高頻短語提取

**需求：** 提取最常出現的短語（2-4個字）

**演算法：**
- 使用 n-gram 分析（n=2,3,4）
- 過濾停用詞
- 按出現頻率排序
- 回傳 TOP 3

**驗收標準：**
- 短語有意義（非停用詞組合）
- 頻率計算正確
- 排序正確

### 4. 問句比例

**需求：** 計算問句在所有句子中的比例

**計算方式：**
- 問句比例 = 問句數量 / 總句子數
- 問句定義：以「？」結尾的句子

**驗收標準：**
- 問句識別準確
- 比例計算正確（0.0-1.0）

---

## ⚠️ 錯誤處理

### 錯誤代碼表

| 錯誤代碼 | 錯誤訊息 | 處理方式 |
|---------|---------|---------|
| E001 | 檔案格式不支援 | 顯示支援的格式清單 |
| E002 | 檔案編碼錯誤 | 提示使用 UTF-8 編碼 |
| E003 | 檔案過大 | 顯示最大檔案大小限制 |
| E004 | 檔案為空 | 提示上傳有內容的檔案 |
| E005 | 分析超時 | 建議減少檔案大小 |

---

## 🎯 效能需求

- **分析時間**：< 5 秒（1000字以內）
- **記憶體使用**：< 100 MB
- **同時處理**：支援批次分析最多 10 個檔案

---

## 🔒 安全需求

- 不儲存使用者上傳的檔案內容
- 分析完成後立即清除暫存資料
- 不傳送資料到外部伺服器

---

## 📝 非功能需求

### 可用性
- 介面簡潔，操作直覺
- 錯誤訊息清楚易懂
- 提供使用範例

### 可維護性
- 程式碼模組化
- 測試覆蓋率 > 80%
- 完整的註解說明

### 可擴充性
- 易於新增新的分析指標
- 支援多語言擴充
- 可整合其他 NLP 工具

---

## 🧪 測試案例

### 測試案例 1：正常分析

**輸入：** 500字的教學文章  
**預期輸出：** 完整的 JSON 報告，所有指標都有數值

### 測試案例 2：短文本警告

**輸入：** 50字的短文  
**預期輸出：** 報告包含警告訊息「樣本數不足」

### 測試案例 3：特殊字元處理

**輸入：** 包含 emoji 和特殊符號的文字  
**預期輸出：** 正確處理，不產生錯誤

### 測試案例 4：批次分析

**輸入：** 3個文字檔案  
**預期輸出：** 3個個別報告 + 1個綜合報告

---

## 📅 開發里程碑

### Phase 1: 基礎功能（Week 1-2）
- [ ] 檔案上傳與驗證
- [ ] 基本情感分析
- [ ] 句子統計
- [ ] JSON 輸出

### Phase 2: 進階功能（Week 3-4）
- [ ] 高頻短語提取
- [ ] 問句比例計算
- [ ] 批次分析
- [ ] 錯誤處理

### Phase 3: 優化與擴充（Week 5+）
- [ ] 效能優化
- [ ] 多語言支援
- [ ] 視覺化報告
- [ ] Web 介面

---

## 📦 完整規格複製區（給 AI 使用）

### 🎯 快速開始 Prompt

**複製以下內容給 Cursor/Windsurf/Claude/ChatGPT：**

````markdown
# 任務：實作風格特徵提取器

## 專案需求

我需要一個 Python 程式，分析文字檔案的風格特徵。

### 核心功能
1. **情感分析**：使用 VADER Sentiment 計算熱情度得分 (0.0-1.0)
2. **句子統計**：計算平均/最長/最短句子長度
3. **高頻短語**：提取 TOP 3 常用短語（2-4個字）
4. **問句比例**：計算問句佔比

### 輸入規格
- 支援格式：.txt, .md
- 編碼：UTF-8
- 大小：100字 - 10MB

### 輸出規格（JSON）
```json
{
  "file_name": "string",
  "analysis_date": "ISO8601",
  "word_count": "integer",
  "sentence_count": "integer",
  "metrics": {
    "enthusiasm_score": "float (0.0-1.0)",
    "avg_sentence_length": "float",
    "max_sentence_length": "integer",
    "min_sentence_length": "integer",
    "question_ratio": "float (0.0-1.0)",
    "top_phrases": [
      {"phrase": "string", "count": "integer"}
    ]
  },
  "warnings": ["string"]
}
```

### 驗收條件

**場景 1：成功分析**
- Given: 500字的 UTF-8 文字檔
- When: 執行分析
- Then: 回傳完整 JSON 報告，包含所有指標

**場景 2：檔案格式錯誤**
- Given: .jpg 檔案
- When: 嘗試分析
- Then: 拋出 ValueError，訊息「僅支援 .txt 或 .md 格式」

**場景 3：內容過短**
- Given: 少於 100 字的檔案
- When: 執行分析
- Then: 仍然執行，但 warnings 包含「內容過短」

### 技術要求
- Python 3.8+
- 使用 NLTK 和 vaderSentiment
- 測試框架：pytest
- 測試覆蓋率 > 80%
- 程式碼要有完整註解

### 專案結構
```
src/
  analyzer.py          # 主程式
tests/
  test_analyzer.py     # 測試
examples/
  sample_article.txt   # 範例輸入
  sample_output.json   # 範例輸出
```

## 開發步驟

請按照 TDD 流程：
1. 先寫測試（test_analyzer.py）
2. 實作功能（analyzer.py）
3. 確保測試通過
4. 重構優化

## 開始實作

請從測試開始，包含以下測試案例：
- test_analyzer_initialization
- test_analyze_file_success
- test_analyze_file_not_found
- test_analyze_file_wrong_format
- test_analyze_file_short_content
- test_batch_analyze
- test_save_result
````

---

## 🔗 相關文件

- [專案 README](../README.md)
- [實戰專案導讀](../../../實戰專案/實戰專案導讀.md)
- [開發大綱 - 模組 0](../../../開發大綱.md#模組-0規格驅動思維)
- [模組 1 - AI Coding 工具](../../../模組內容/模組1_開發者工具包.md)

---

**版本 2.0** | **最後更新：2025-10-17** | **可執行規格**
