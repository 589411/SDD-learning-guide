# 個人知識庫管理器 - 功能規格

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
我需要實作一個個人知識庫管理器，請根據以下規格生成 Python 程式碼：

[複製下方完整規格內容]

請按照以下步驟：
1. 先生成測試程式碼（test_knowledge_base.py）
2. 再實作主程式（knowledge_base.py）
3. 確保所有測試通過
4. 程式碼要有完整註解
```

### 方法 3：使用 Cline AI Agent

```
在 VS Code 中安裝 Cline 擴充套件，然後：

「請根據 specs/knowledge-base.spec.md 實作完整功能，
包含 CRUD 操作、搜尋功能、標籤系統、測試」

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

本規格定義個人知識庫的完整 CRUD 操作、標籤分類、搜尋功能和多格式匯出。

**技術棧：**
- 語言：Python 3.8+
- 資料儲存：JSON 或 SQLite
- 搜尋：全文搜尋 + 標籤過濾
- 匯出格式：Markdown, JSON, HTML
- 測試框架：pytest
- 開發環境：Google Colab（推薦）或本地環境

---

## 👤 使用者故事 (User Stories)

### US-001: 新增知識條目

**身為一個** 知識工作者，  
**我想要** 快速記錄和儲存學習筆記，  
**以便於** 建立個人知識庫。

**商業價值：** 提升知識管理效率  
**優先級：** 🔴 高（核心功能）

### US-002: 標籤分類管理

**身為一個** 知識管理者，  
**我想要** 用標籤組織知識條目，  
**以便於** 快速找到相關內容。

**商業價值：** 提升檢索效率  
**優先級：** 🔴 高（核心功能）

### US-003: 全文搜尋

**身為一個** 使用者，  
**我想要** 搜尋知識庫中的內容，  
**以便於** 快速找到需要的資訊。

**商業價值：** 提升使用體驗  
**優先級：** 🟡 中（重要功能）

### US-004: 多格式匯出

**身為一個** 內容創作者，  
**我想要** 將知識庫匯出為不同格式，  
**以便於** 分享或發布內容。

**商業價值：** 擴大使用場景  
**優先級：** 🟡 中（擴充功能）

---

## ✅ 驗收條件 (Acceptance Criteria)

### 場景一：成功新增知識條目

```gherkin
Given 我開啟知識庫系統
When 我輸入標題「Python 裝飾器」
  And 我輸入內容「裝飾器是 Python 的一種設計模式...」
  And 我添加標籤 ["Python", "設計模式"]
  And 我點擊「儲存」按鈕
Then 系統應該生成唯一的 ID
  And 系統應該記錄建立時間
  And 條目應該被儲存到資料庫
  And 系統應該顯示「儲存成功」訊息
  And 我應該能在列表中看到新條目
```

### 場景二：更新現有條目

```gherkin
Given 我有一個 ID 為 "kb_001" 的知識條目
When 我修改標題為「Python 裝飾器進階」
  And 我更新內容
  And 我點擊「更新」按鈕
Then 系統應該更新條目內容
  And 系統應該更新修改時間
  And 建立時間應該保持不變
  And 系統應該顯示「更新成功」訊息
```

### 場景三：刪除知識條目

```gherkin
Given 我有一個 ID 為 "kb_001" 的知識條目
When 我點擊「刪除」按鈕
  And 我確認刪除操作
Then 系統應該從資料庫移除該條目
  And 系統應該顯示「刪除成功」訊息
  And 該條目不應該出現在列表中
```

### 場景四：按標籤搜尋

```gherkin
Given 知識庫中有 10 個條目
  And 其中 3 個條目標籤包含 "Python"
When 我選擇標籤 "Python" 進行過濾
Then 系統應該只顯示 3 個相關條目
  And 條目應該按建立時間倒序排列
```

### 場景五：全文搜尋

```gherkin
Given 知識庫中有多個條目
When 我在搜尋框輸入「裝飾器」
  And 我點擊「搜尋」按鈕
Then 系統應該回傳所有標題或內容包含「裝飾器」的條目
  And 搜尋結果應該高亮顯示關鍵字
  And 搜尋應該不區分大小寫
```

### 場景六：匯出為 Markdown

```gherkin
Given 我有 5 個知識條目
When 我選擇「匯出為 Markdown」
  And 我點擊「匯出」按鈕
Then 系統應該生成一個 .md 檔案
  And 檔案應該包含所有條目
  And 每個條目應該有標題、內容、標籤、時間
  And 檔案應該下載到本地
```

### 場景七：處理重複標籤

```gherkin
Given 我正在新增一個知識條目
When 我添加標籤 ["Python", "python", "PYTHON"]
Then 系統應該自動合併為一個標籤 "Python"
  And 系統應該顯示提示「已合併重複標籤」
```

---

## 📊 資料規格

### 知識條目結構

```json
{
  "id": "kb_20251017_001",
  "title": "string (max 200 chars)",
  "content": "string (max 10000 chars)",
  "tags": ["string"],
  "created_at": "ISO8601 datetime",
  "updated_at": "ISO8601 datetime",
  "metadata": {
    "word_count": "integer",
    "read_time": "integer (minutes)"
  }
}
```

### 資料庫結構（SQLite）

```sql
CREATE TABLE knowledge_base (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    tags TEXT,  -- JSON array
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    word_count INTEGER,
    read_time INTEGER
);

CREATE INDEX idx_tags ON knowledge_base(tags);
CREATE INDEX idx_created_at ON knowledge_base(created_at);
```

### API 介面規格

```python
class KnowledgeBase:
    def create(self, title: str, content: str, tags: List[str]) -> str:
        """新增知識條目，回傳 ID"""
        
    def read(self, id: str) -> Dict:
        """讀取單一條目"""
        
    def update(self, id: str, title: str = None, 
               content: str = None, tags: List[str] = None) -> bool:
        """更新條目，回傳成功與否"""
        
    def delete(self, id: str) -> bool:
        """刪除條目，回傳成功與否"""
        
    def list_all(self, sort_by: str = "created_at", 
                 order: str = "desc") -> List[Dict]:
        """列出所有條目"""
        
    def search(self, keyword: str) -> List[Dict]:
        """全文搜尋"""
        
    def filter_by_tags(self, tags: List[str]) -> List[Dict]:
        """按標籤過濾"""
        
    def export(self, format: str = "markdown") -> str:
        """匯出為指定格式"""
```

---

## 🔍 功能需求

### 1. CRUD 操作

**Create（新增）：**
- 自動生成唯一 ID（格式：kb_YYYYMMDD_NNN）
- 自動記錄建立時間
- 計算字數和預估閱讀時間
- 標籤自動去重和標準化

**Read（讀取）：**
- 支援按 ID 讀取單一條目
- 支援列出所有條目
- 支援排序（按建立時間、更新時間、標題）

**Update（更新）：**
- 支援部分更新（只更新提供的欄位）
- 自動更新修改時間
- 保持建立時間不變

**Delete（刪除）：**
- 軟刪除或硬刪除（可配置）
- 刪除前確認
- 支援批次刪除

### 2. 標籤系統

**需求：** 靈活的標籤管理

**功能：**
- 標籤自動去重（不區分大小寫）
- 標籤自動補全建議
- 顯示每個標籤的條目數量
- 支援標籤重命名

**驗收標準：**
- 標籤不區分大小寫
- 自動合併重複標籤
- 標籤列表按使用頻率排序

### 3. 搜尋功能

**全文搜尋：**
- 搜尋標題和內容
- 不區分大小寫
- 支援部分匹配
- 高亮顯示關鍵字

**標籤過濾：**
- 支援單一標籤過濾
- 支援多標籤組合（AND/OR）
- 即時更新結果

**進階搜尋：**
- 按日期範圍過濾
- 按字數範圍過濾
- 組合多個條件

### 4. 匯出功能

**Markdown 格式：**
```markdown
# 知識庫匯出

## Python 裝飾器
**標籤：** Python, 設計模式  
**建立時間：** 2025-10-17  
**字數：** 500

裝飾器是 Python 的一種設計模式...

---
```

**JSON 格式：**
```json
{
  "export_date": "2025-10-17T22:00:00",
  "total_entries": 10,
  "entries": [...]
}
```

**HTML 格式：**
- 使用模板生成
- 包含 CSS 樣式
- 支援列印友善格式

---

## ⚠️ 錯誤處理

### 錯誤代碼表

| 錯誤代碼 | 錯誤訊息 | 處理方式 |
|---------|---------|---------|
| E001 | 條目不存在 | 顯示可用的 ID 列表 |
| E002 | 標題為空 | 提示輸入標題 |
| E003 | 內容過長 | 顯示最大字數限制 |
| E004 | 無效的標籤格式 | 提示正確的標籤格式 |
| E005 | 資料庫連線失敗 | 檢查資料庫檔案權限 |
| E006 | 匯出失敗 | 檢查磁碟空間 |

---

## 🎯 效能需求

- **新增操作**：< 100ms
- **搜尋操作**：< 500ms（1000 條目內）
- **匯出操作**：< 2 秒（100 條目）
- **資料庫大小**：支援至少 10000 條目

---

## 🔒 安全需求

- 輸入驗證（防止 SQL Injection）
- 檔案路徑驗證（防止路徑遍歷）
- 資料備份機制
- 匯出檔案大小限制

---

## 📝 非功能需求

### 可用性
- CLI 介面簡潔易用
- 錯誤訊息清楚
- 提供使用範例

### 可維護性
- 程式碼模組化
- 測試覆蓋率 > 80%
- 完整的 API 文件

### 可擴充性
- 易於新增新的匯出格式
- 支援自訂欄位
- 可整合其他工具

---

## 🧪 測試案例

### 測試案例 1：完整 CRUD 流程

**步驟：**
1. 新增一個條目
2. 讀取該條目
3. 更新該條目
4. 刪除該條目

**預期：** 所有操作成功，資料正確

### 測試案例 2：標籤系統

**輸入：** 標籤 ["Python", "python", "PYTHON"]  
**預期：** 自動合併為 "Python"

### 測試案例 3：搜尋功能

**資料：** 10 個條目，3 個包含「Python」  
**搜尋：** "python"  
**預期：** 回傳 3 個條目

### 測試案例 4：匯出功能

**輸入：** 5 個條目  
**匯出：** Markdown 格式  
**預期：** 生成正確的 .md 檔案

---

## 📅 開發里程碑

### Phase 1: 基礎 CRUD（Week 1-2）
- [ ] 資料結構設計
- [ ] Create, Read, Update, Delete
- [ ] 基本測試

### Phase 2: 標籤和搜尋（Week 3-4）
- [ ] 標籤系統
- [ ] 全文搜尋
- [ ] 標籤過濾
- [ ] 進階搜尋

### Phase 3: 匯出和優化（Week 5+）
- [ ] Markdown 匯出
- [ ] JSON 匯出
- [ ] HTML 匯出
- [ ] 效能優化

---

## 📦 完整規格複製區（給 AI 使用）

### 🎯 快速開始 Prompt

**複製以下內容給 Cursor/Windsurf/Claude/ChatGPT：**

````markdown
# 任務：實作個人知識庫管理器

## 專案需求

我需要一個 Python 程式，管理個人知識庫，支援完整的 CRUD 操作、標籤分類、搜尋和匯出。

### 核心功能
1. **CRUD 操作**：新增、讀取、更新、刪除知識條目
2. **標籤系統**：標籤分類、自動去重、標籤過濾
3. **搜尋功能**：全文搜尋、標籤過濾、進階搜尋
4. **匯出功能**：Markdown、JSON、HTML 格式

### 資料結構
```json
{
  "id": "kb_20251017_001",
  "title": "string (max 200)",
  "content": "string (max 10000)",
  "tags": ["string"],
  "created_at": "ISO8601",
  "updated_at": "ISO8601",
  "metadata": {
    "word_count": "integer",
    "read_time": "integer"
  }
}
```

### API 介面
```python
class KnowledgeBase:
    def create(title, content, tags) -> str  # 回傳 ID
    def read(id) -> Dict
    def update(id, **kwargs) -> bool
    def delete(id) -> bool
    def list_all(sort_by, order) -> List[Dict]
    def search(keyword) -> List[Dict]
    def filter_by_tags(tags) -> List[Dict]
    def export(format) -> str
```

### 驗收條件

**場景 1：CRUD 操作**
- Given: 新增一個條目
- When: 執行 create, read, update, delete
- Then: 所有操作成功，資料正確

**場景 2：標籤去重**
- Given: 標籤 ["Python", "python", "PYTHON"]
- When: 新增條目
- Then: 自動合併為 "Python"

**場景 3：全文搜尋**
- Given: 10 個條目，3 個包含「Python」
- When: 搜尋 "python"
- Then: 回傳 3 個條目，不區分大小寫

**場景 4：Markdown 匯出**
- Given: 5 個條目
- When: 匯出為 Markdown
- Then: 生成正確格式的 .md 檔案

### 技術要求
- Python 3.8+
- 資料儲存：SQLite 或 JSON
- 測試框架：pytest
- 測試覆蓋率 > 80%
- 完整的錯誤處理

### 專案結構
```
src/
  knowledge_base.py    # 主程式
  storage.py          # 資料儲存層
  search.py           # 搜尋功能
  export.py           # 匯出功能
tests/
  test_crud.py        # CRUD 測試
  test_search.py      # 搜尋測試
  test_export.py      # 匯出測試
examples/
  sample_data.json    # 範例資料
```

## 開發步驟

請按照 TDD 流程：
1. 先寫測試（test_crud.py, test_search.py, test_export.py）
2. 實作功能（knowledge_base.py, storage.py, search.py, export.py）
3. 確保測試通過
4. 重構優化

## 開始實作

請從測試開始，包含以下測試案例：
- test_create_entry
- test_read_entry
- test_update_entry
- test_delete_entry
- test_tag_deduplication
- test_full_text_search
- test_filter_by_tags
- test_export_markdown
- test_export_json
````

---

## 🔗 相關文件

- [專案 README](../README.md)
- [實戰專案導讀](../../../實戰專案/實戰專案導讀.md)
- [開發大綱 - 模組 3](../../../開發大綱.md#模組-3軟體架構入門)
- [模組 1 - AI Coding 工具](../../../模組內容/模組1_開發者工具包.md)

---

**版本 2.0** | **最後更新：2025-10-17** | **可執行規格**
