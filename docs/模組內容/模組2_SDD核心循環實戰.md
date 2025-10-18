# 模組 2：SDD 核心循環實戰 — 從規格到綠燈的魔法

## 💎 AI 時代的核心洞察

> **AI 會寫程式碼，但只有你能定義「什麼是對的」**

### 📊 能力培養路徑

```
傳統開發者                    AI 時代開發者
────────────────────────      ────────────────────────
寫程式碼 (80%)                定義規格 (30%)
除錯 (15%)                    撰寫測試 (20%)
測試 (5%)                     驗收結果 (30%)
                              指導 AI (20%)
```

### 🎯 本模組教你的核心能力

這個模組教你 **AI 最需要你提供的能力**：

- ✅ **定義驗收標準**：什麼叫「做對了」
- 🧪 **設計測試案例**：如何驗證功能
- 🎯 **指導 AI 開發**：給 AI 明確的目標
- 🔍 **判斷品質**：AI 的輸出是否符合要求

**實際案例：**
```
場景：開發時間追蹤功能

❌ 傳統方式：
你花 8 小時寫程式碼 → 不確定是否正確 → 手動測試 → 發現問題 → 修改

✅ SDD + AI 方式：
你花 1 小時寫規格和測試 → AI 花 10 分鐘寫程式碼 → 測試自動驗證 ✅
```

### 💡 價值對比圖

```
你的時間分配：

傳統開發                      SDD + AI 開發
────────────────────────      ────────────────────────
█████████ 寫程式碼 (90%)      ███ 寫規格 (30%)
█ 測試 (10%)                  ██ 寫測試 (20%)
                              █ AI 寫程式碼 (10%)
                              ████ 驗收優化 (40%)

結果：                        結果：
- 品質不確定                  - 品質有保證
- 難以維護                    - 易於維護
- 依賴個人                    - 可重複執行
```

---

## 🎯 核心目標
親手走完「規格 → 測試 → 程式碼」的核心循環，體驗 TDD (測試驅動開發) 的威力，並學會如何「導演」AI 完成開發。

## 📖 理論基礎

### 什麼是 TDD？
**測試驅動開發 (Test-Driven Development, TDD)** 是一種開發方法論，核心理念是：**先寫測試，再寫程式碼**。

### TDD 三部曲：Red-Green-Refactor

```
🔴 RED（紅燈）      → 🟢 GREEN（綠燈）    → 🔵 REFACTOR（重構）
寫一個會失敗的測試   實作讓測試通過的程式碼   改善程式碼品質
      ↓                    ↓                     ↓
   這證明測試有效        功能已經實現           保持測試通過
```

### SDD + TDD 的完美結合

| SDD (規格驅動) | TDD (測試驅動) |
|---------------|---------------|
| 定義「要做什麼」 | 定義「如何驗證」 |
| 產出規格文件 | 產出測試程式碼 |

---

## 🌱 GitHub Spec Kit：SDD 的實踐工具

### 什麼是 GitHub Spec Kit？

**GitHub Spec Kit** 是一個開源工具包，用於實現 **SDD (Spec-Driven Development, 規格驅動開發)**。它將開發過程分解為結構化的階段，並與 AI 編碼助理（例如 GitHub Copilot、Cursor、Windsurf、Gemini CLI 等）協同工作。

### 核心概念

**SDD (Spec-Driven Development)：**
- 一種以「規格 (Spec)」為中心的開發方法
- 規格是**真相的單一來源 (Single Source of Truth)**
- 驅動後續的規劃、任務分解和程式碼實作

**Spec Kit 的價值：**
```
傳統方式                          Spec Kit 方式
────────────────────────────      ────────────────────────────
模糊的需求 → 直接寫程式碼          清楚的規格 → 結構化規劃
→ 不確定做對了沒                  → 每一步都可驗證
→ AI 不知道要做什麼                → AI 精準理解需求
→ 難以維護和擴充                  → 易於維護和擴充
```

---

### 📋 Spec Kit 標準流程（4個階段）

```
Constitution → Specify → Plan → Tasks → Implement
   (憲法)      (規格)    (規劃)  (任務)   (實作)
     ↓           ↓         ↓       ↓        ↓
  設定原則    定義需求   技術架構  拆解任務  AI執行
```

---

### 階段一：建立專案憲法 (Constitution)

**指令：** `/constitution`

**目的：** 設定專案的最高原則、技術標準和設計決策，作為 AI Agent 參考的指南。

**範例：個人風格分析程式**

| 領域 | 原則 | 說明 |
|------|------|------|
| **程式碼品質** | 程式碼應為模組化且可測試 | 核心風格分析邏輯必須與數據處理和報告生成邏輯分離 |
| **資料隱私** | 用戶數據僅用於分析，不得永久儲存 | 嚴格遵守隱私法規，所有個人數據在處理後應匿名化或清除 |
| **技術棧** | 優先使用 Python 作為後端語言 | 充分利用成熟的資料科學生態系，提高開發效率 |
| **可維護性** | 所有功能都應配備可執行的規格 | 確保每次程式碼變動都能透過規格驗證業務邏輯 |

**實際使用：**
```bash
# 在 Cursor/Windsurf 中
/constitution

# 或在 CLI 中
specify init my-project --constitution
```

---

### 階段二：定義高層次規格 (Specify)

**指令：** `/specify`

**目的：** 使用自然語言描述專案的目標、使用者互動和預期行為，**不涉及具體技術細節**。

**規格文件範例：** `specs/personal-style-analyzer/spec.md`

#### 專案願景 (Vision)
```markdown
建立一個 AI 驅動的工具，能夠接收用戶輸入的多模態數據
（圖片、文字、問卷），並輸出精準且具備可操作性的個人風格分析報告。

目標是將抽象的「時尚風格」轉化為清晰、可量化的數據，
幫助用戶理解並精進自己的穿搭風格。
```

#### 核心功能 (Core Features)
1. **風格分類 (Style Classification)**
   - 從 10 個核心風格中識別主要風格
   - 例如：Casual、Formal、Minimalist、Vintage、Bohemian

2. **搭配建議 (Outfit Recommendation)**
   - 根據識別出的風格，提供 3-5 條具體建議

3. **風格趨勢分析 (Trend Analysis)**
   - 輸出用戶風格與年齡層或地理區域的平均風格對比

#### 使用者互動範例 (Gherkin 格式)

**場景 1：風格識別 - 成功案例**
```gherkin
Given 用戶上傳了一張單色調、無 Logo 的西裝外套圖片
When 系統進行分析
Then 系統應判定主要風格為「極簡 (Minimalist)」
  And 信心分數應大於 0.8
```

**場景 2：建議生成 - 規則驅動**
```gherkin
Given 用戶的主要風格被判定為「正式 (Formal)」
When 用戶請求「配件建議」
Then 系統應建議「真皮手錶」或「牛津鞋」
  And 不應建議「帆布包」或「運動帽」
```

---

### 階段三：生成開發規劃 (Plan)

**指令：** `/plan`

**目的：** 根據規格，制定高層次的技術架構和實作步驟，作為 AI Agent 撰寫程式碼的藍圖。

**開發規劃範例：** `specs/personal-style-analyzer/plan.md`

#### 技術棧 (Technology Stack)
```yaml
語言: Python 3.10+
AI/ML 框架: PyTorch (用於模型訓練和推論)
Web 框架: FastAPI (用於提供 RESTful API)
圖像處理: OpenCV 或 PIL
規格/測試工具: Behave (基於 Gherkin 語法)
```

#### 架構設計 (Architecture Design)
```
三層架構：
┌─────────────────────────────────┐
│   API 介面層 (Presentation)      │
│   - FastAPI endpoints            │
└─────────────────────────────────┘
           ↓
┌─────────────────────────────────┐
│   業務邏輯層 (Business Logic)    │
│   - StyleAnalysisService         │
└─────────────────────────────────┘
           ↓
┌─────────────────────────────────┐
│   數據層 (Data Layer)            │
│   - 模型推論、數據預處理          │
└─────────────────────────────────┘
```

#### 數據模型 (Data Model)
```python
class StyleFeature:
    """特徵向量"""
    image_vector: List[float]
    questionnaire_vector: List[float]

class StyleProfile:
    """用戶風格檔案"""
    user_id: str
    primary_style: str
    confidence_scores: Dict[str, float]

class AnalysisReport:
    """分析報告"""
    profile: StyleProfile
    recommendations: List[str]
    trend_comparison: Dict
```

#### 推論 API 介面 (Inference API Contract)
```json
{
  "input_id": "user_123",
  "features": {
    "image_vector": [...],
    "questionnaire_vector": [...]
  },
  "prediction_threshold": 0.5
}
```

---

### 階段四：分解任務清單 (Tasks)

**指令：** `/tasks`

**目的：** 將開發規劃分解為具體、可單獨實作的小型任務。每個任務應在 **2-4 小時**內完成，並且是**原子性 (Atomic)** 的。

| ID | 任務描述 | 預期輸出 | 狀態 |
|----|---------|---------|------|
| TASK-001 | 設定專案環境及規格測試框架 | 完成 Python 專案初始化，安裝所有依賴，設定 Behave 並通過第一個空測試 | ⏳ 待辦 |
| TASK-002 | 實作風格分類的 Gherkin 規格 | 撰寫 `style_classification.feature` 文件，包含至少 3 個 Given-When-Then 範例 | ⏳ 待辦 |
| TASK-003 | 開發圖像特徵提取服務介面 | 建立 `ImageProcessor.py` 類別，定義 `extract_features()` 方法 | ⏳ 待辦 |
| TASK-004 | 實作 StyleAnalysisService 核心邏輯 | 撰寫服務類別，根據特徵向量產生風格信心分數 | ⏳ 待辦 |
| TASK-005 | 開發風格分類的步驟定義 | 撰寫 Gherkin 步驟定義，連結核心邏輯，使規格可執行 | ⏳ 待辦 |

---

### 階段五：最終實作 (Implement)

**指令：** `/implement specs/personal-style-analyzer/plan.md`

**目的：** 將任務交給 AI Agent 執行程式碼編寫。

**實際操作範例：**

```bash
# 在 Cursor/Windsurf 中
/implement

# 或對 AI 助理發出指令
「根據 TASK-005 的要求，為 style_classification.feature 中的
'識別基礎休閒風格' 範例生成 Python 的 Step Definitions 程式碼。」
```

**AI 會自動：**
1. 讀取規格和計劃
2. 理解任務需求
3. 生成對應的程式碼
4. 確保符合憲法中的原則
5. 通過規格測試

---

### 💡 Spec Kit 與傳統 SDD 的對比

| 項目 | 傳統 SDD | Spec Kit SDD |
|------|---------|-------------|
| **規格撰寫** | 手動撰寫，格式不統一 | 結構化指令，標準格式 |
| **AI 理解** | AI 需要猜測意圖 | AI 精準理解每個階段 |
| **任務拆解** | 手動拆解，容易遺漏 | 自動拆解，原子性任務 |
| **進度追蹤** | 難以追蹤 | 清楚的任務狀態 |
| **團隊協作** | 溝通成本高 | 統一的規格語言 |

---

### 🎯 實際應用：風格分析器專案

**完整流程示範：**

```bash
# Step 1: 建立憲法
/constitution
→ 定義：模組化、可測試、隱私保護

# Step 2: 撰寫規格
/specify
→ 描述：風格分類、搭配建議、趨勢分析

# Step 3: 技術規劃
/plan
→ 架構：三層架構、PyTorch、FastAPI

# Step 4: 拆解任務
/tasks
→ 產出：5個原子性任務

# Step 5: AI 實作
/implement
→ AI 根據規格自動生成程式碼
→ 測試自動驗證
→ 符合憲法原則
```

**時間對比：**
```
傳統方式：2-3 週
Spec Kit + AI：3-5 天

節省時間：80%
品質提升：規格保證
```

---

### 🚀 如何開始使用 Spec Kit

**安裝：**
```bash
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
```

**初始化專案：**
```bash
specify init my-project
```

**在 AI IDE 中使用：**
- Cursor：直接使用 `/constitution`, `/specify` 等指令
- Windsurf：支援所有 Spec Kit 指令
- VS Code + Cline：自動讀取規格並實作

**參考資源：**
- 官方文件：https://github.com/github/spec-kit
- 模組 1：[AI Coding 工具](./模組1_開發者工具包.md#13-🌱-github-spec-kit---規格驅動開發工具包)
- 實戰專案：[sdd-practice-project](../sdd-practice-project/) 中的規格範例

---
| 人類可讀 | 機器可執行 |
| 溝通工具 | 驗證工具 |

**結合後的威力：** 規格 → 測試 → 程式碼 → 自動驗證 ✅

---

## 🛠️ 實戰演練：完整的 SDD 循環

### 🎯 實戰案例：小型工作室專案時間追蹤系統

**背景：**  
你是一個小型設計工作室的開發者，老闆希望建立一個簡單的時間追蹤系統，讓團隊成員記錄在各專案上花費的時間，以便於計算成本和向客戶報價。

我們將實作第一個核心功能：「記錄工作時間」。

---

### 📝 階段 1：撰寫規格

#### User Story

```markdown
# specs/time-tracking.spec.md

## 使用者故事

### US-001: 記錄工作時間

**身為**一個工作室成員，  
**我想要**快速記錄我在某個專案上工作的時間，  
**以便於**準確追蹤時間成本。

**商業價值：** 精確掌握專案成本，提升報價準確度  
**優先級：** 🔴 高  
**預估工時：** 4 小時
```

#### 驗收條件

```markdown
## 驗收條件

### ✅ 場景一：成功記錄工作時間

```gherkin
Given 我是已登入的工作室成員 "Alice"
  And 目前有一個專案叫做 "Website Redesign"
  And 今天的日期是 "2024-12-20"
When 我選擇專案 "Website Redesign"
  And 我輸入工作時數 "3.5" 小時
  And 我輸入工作描述 "設計首頁 wireframe"
  And 我點擊「記錄時間」按鈕
Then 系統應該顯示 "工作時間已記錄"
  And 我應該看到新增的記錄：
    - 專案：Website Redesign
    - 時數：3.5 小時
    - 日期：2024-12-20
    - 描述：設計首頁 wireframe
  And 該專案的總時數應該增加 3.5 小時
```

### ❌ 場景二：輸入無效的時數

```gherkin
Given 我在記錄時間的頁面
When 我輸入無效的時數 "-1" 小時
  And 我點擊「記錄時間」按鈕
Then 系統應該顯示錯誤訊息 "時數必須大於 0"
  And 記錄不應該被儲存
```

### ❌ 場景三：未選擇專案

```gherkin
Given 我在記錄時間的頁面
When 我沒有選擇專案
  And 我輸入時數 "2" 小時
  And 我點擊「記錄時間」按鈕
Then 系統應該顯示錯誤訊息 "請選擇專案"
  And 記錄不應該被儲存
```

### ✅ 場景四：查看今日的工作記錄

```gherkin
Given 我今天已經記錄了 3 筆工作時間
When 我進入「今日記錄」頁面
Then 我應該看到所有今日的記錄
  And 顯示今日總工作時數
  And 記錄按照時間倒序排列（最新的在上面）
```
```

---

### 🧪 階段 2：將規格轉換為測試

**目標：** 讓規格變成可執行的測試程式碼

#### 創建測試檔案

```javascript
// tests/time-tracking.test.js
const { 
  createTimeEntry, 
  validateTimeEntry,
  getTodayEntries,
  getProjectTotalHours 
} = require('../src/time-tracking');

describe('工作時間追蹤系統', () => {
  
  // 測試用的專案資料
  const mockProject = {
    id: 'proj_001',
    name: 'Website Redesign',
    client: 'ABC Company'
  };
  
  // 測試用的成員資料
  const mockMember = {
    id: 'member_001',
    name: 'Alice'
  };

  describe('✅ 場景一：成功記錄工作時間', () => {
    test('應該成功建立一筆時間記錄', () => {
      // Arrange：準備測試資料
      const timeEntry = {
        projectId: mockProject.id,
        memberId: mockMember.id,
        hours: 3.5,
        description: '設計首頁 wireframe',
        date: '2024-12-20'
      };
      
      // Act：執行功能
      const result = createTimeEntry(timeEntry);
      
      // Assert：驗證結果
      expect(result.success).toBe(true);
      expect(result.message).toBe('工作時間已記錄');
      expect(result.entry).toMatchObject({
        projectId: 'proj_001',
        hours: 3.5,
        description: '設計首頁 wireframe'
      });
      expect(result.entry.id).toBeDefined(); // 系統應該自動產生 ID
    });

    test('記錄時間後，專案總時數應該增加', () => {
      const timeEntry = {
        projectId: mockProject.id,
        memberId: mockMember.id,
        hours: 3.5,
        description: '設計首頁 wireframe',
        date: '2024-12-20'
      };
      
      createTimeEntry(timeEntry);
      const totalHours = getProjectTotalHours(mockProject.id);
      
      expect(totalHours).toBeGreaterThanOrEqual(3.5);
    });
  });

  describe('❌ 場景二：輸入無效的時數', () => {
    test('負數時數應該被拒絕', () => {
      const timeEntry = {
        projectId: mockProject.id,
        memberId: mockMember.id,
        hours: -1,
        description: '測試',
        date: '2024-12-20'
      };
      
      const result = createTimeEntry(timeEntry);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('時數必須大於 0');
    });

    test('時數為 0 應該被拒絕', () => {
      const timeEntry = {
        projectId: mockProject.id,
        memberId: mockMember.id,
        hours: 0,
        description: '測試',
        date: '2024-12-20'
      };
      
      const result = createTimeEntry(timeEntry);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('時數必須大於 0');
    });
  });

  describe('❌ 場景三：未選擇專案', () => {
    test('沒有專案 ID 應該被拒絕', () => {
      const timeEntry = {
        projectId: null,
        memberId: mockMember.id,
        hours: 2,
        description: '測試',
        date: '2024-12-20'
      };
      
      const result = createTimeEntry(timeEntry);
      
      expect(result.success).toBe(false);
      expect(result.error).toBe('請選擇專案');
    });
  });

  describe('✅ 場景四：查看今日的工作記錄', () => {
    test('應該能取得今日所有記錄', () => {
      // 建立多筆測試資料
      const today = '2024-12-20';
      
      createTimeEntry({
        projectId: mockProject.id,
        memberId: mockMember.id,
        hours: 2,
        description: '工作1',
        date: today
      });
      
      createTimeEntry({
        projectId: mockProject.id,
        memberId: mockMember.id,
        hours: 1.5,
        description: '工作2',
        date: today
      });
      
      const entries = getTodayEntries(mockMember.id, today);
      
      expect(entries.length).toBeGreaterThanOrEqual(2);
      expect(entries[0].date).toBe(today);
    });

    test('記錄應該按時間倒序排列', () => {
      const entries = getTodayEntries(mockMember.id, '2024-12-20');
      
      // 檢查是否按照建立時間倒序
      for (let i = 0; i < entries.length - 1; i++) {
        expect(entries[i].createdAt >= entries[i + 1].createdAt).toBe(true);
      }
    });
  });
});
```

---

### 🔴 階段 3：執行測試（紅燈階段）

**目標：** 確認測試正確執行且會失敗

```bash
# 執行測試
npm test tests/time-tracking.test.js
```

**預期結果：**
```
FAIL  tests/time-tracking.test.js
  工作時間追蹤系統
    ✅ 場景一：成功記錄工作時間
      ✕ 應該成功建立一筆時間記錄 (5ms)
      ✕ 記錄時間後，專案總時數應該增加 (2ms)

  ● 工作時間追蹤系統 › 應該成功建立一筆時間記錄

    Cannot find module '../src/time-tracking'
```

**💡 重點理解：**
- ❌ 測試失敗是**正常且必要**的
- 🎯 失敗表示測試在正確工作
- 📍 錯誤訊息指引你下一步要做什麼

---

### 💻 階段 4：實作功能（綠燈階段）

**目標：** 寫出最簡單能通過測試的程式碼

#### 建立實作檔案

```javascript
// src/time-tracking.js

// 模擬的資料庫（實際專案會用真實資料庫）
let timeEntries = [];
let currentId = 1;

/**
 * 驗證時間記錄資料
 */
function validateTimeEntry(entry) {
  const errors = [];
  
  // 檢查專案 ID
  if (!entry.projectId) {
    errors.push('請選擇專案');
  }
  
  // 檢查時數
  if (!entry.hours || entry.hours <= 0) {
    errors.push('時數必須大於 0');
  }
  
  // 檢查成員 ID
  if (!entry.memberId) {
    errors.push('缺少成員資訊');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * 建立時間記錄
 */
function createTimeEntry(entry) {
  // 驗證資料
  const validation = validateTimeEntry(entry);
  
  if (!validation.isValid) {
    return {
      success: false,
      error: validation.errors[0] // 回傳第一個錯誤
    };
  }
  
  // 建立新記錄
  const newEntry = {
    id: `entry_${currentId++}`,
    projectId: entry.projectId,
    memberId: entry.memberId,
    hours: entry.hours,
    description: entry.description || '',
    date: entry.date,
    createdAt: new Date().toISOString()
  };
  
  // 儲存到陣列
  timeEntries.push(newEntry);
  
  return {
    success: true,
    message: '工作時間已記錄',
    entry: newEntry
  };
}

/**
 * 取得專案的總時數
 */
function getProjectTotalHours(projectId) {
  return timeEntries
    .filter(entry => entry.projectId === projectId)
    .reduce((total, entry) => total + entry.hours, 0);
}

/**
 * 取得今日的工作記錄
 */
function getTodayEntries(memberId, date) {
  return timeEntries
    .filter(entry => entry.memberId === memberId && entry.date === date)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // 倒序排列
}

/**
 * 重置資料（測試用）
 */
function resetData() {
  timeEntries = [];
  currentId = 1;
}

module.exports = {
  createTimeEntry,
  validateTimeEntry,
  getProjectTotalHours,
  getTodayEntries,
  resetData
};
```

---

### 🟢 階段 5：再次執行測試（綠燈）

```bash
npm test tests/time-tracking.test.js
```

**期望結果：**
```
PASS  tests/time-tracking.test.js
  工作時間追蹤系統
    ✅ 場景一：成功記錄工作時間
      ✓ 應該成功建立一筆時間記錄 (3ms)
      ✓ 記錄時間後，專案總時數應該增加 (1ms)
    ❌ 場景二：輸入無效的時數
      ✓ 負數時數應該被拒絕 (2ms)
      ✓ 時數為 0 應該被拒絕 (1ms)
    ❌ 場景三：未選擇專案
      ✓ 沒有專案 ID 應該被拒絕 (1ms)
    ✅ 場景四：查看今日的工作記錄
      ✓ 應該能取得今日所有記錄 (2ms)
      ✓ 記錄應該按時間倒序排列 (1ms)

Test Suites: 1 passed, 1 total
Tests:       7 passed, 7 total
Time:        1.234s
```

🎉 **所有測試通過！**

---

### 🔵 階段 6：重構（Refactor）

**目標：** 改善程式碼品質，同時保持測試通過

#### 重構前的問題

1. 全域變數 `timeEntries` 不適合多使用者環境
2. 缺少輸入的型別檢查
3. 錯誤訊息可以更友善
4. 缺少註解說明

#### 重構後的程式碼

```javascript
// src/time-tracking.js (重構版)

/**
 * 時間追蹤資料管理類別
 */
class TimeTrackingManager {
  constructor() {
    this.entries = [];
    this.currentId = 1;
  }

  /**
   * 驗證時間記錄資料
   * @param {Object} entry - 時間記錄物件
   * @returns {Object} 驗證結果
   */
  validateTimeEntry(entry) {
    const errors = [];
    
    if (!entry.projectId || typeof entry.projectId !== 'string') {
      errors.push('請選擇專案');
    }
    
    if (!entry.hours || typeof entry.hours !== 'number' || entry.hours <= 0) {
      errors.push('時數必須大於 0');
    }
    
    if (entry.hours > 24) {
      errors.push('單日時數不能超過 24 小時');
    }
    
    if (!entry.memberId || typeof entry.memberId !== 'string') {
      errors.push('缺少成員資訊');
    }
    
    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * 建立時間記錄
   * @param {Object} entry - 時間記錄物件
   * @returns {Object} 操作結果
   */
  createTimeEntry(entry) {
    const validation = this.validateTimeEntry(entry);
    
    if (!validation.isValid) {
      return {
        success: false,
        error: validation.errors.join(', ')
      };
    }
    
    const newEntry = {
      id: `entry_${this.currentId++}`,
      ...entry,
      description: entry.description || '',
      createdAt: new Date().toISOString()
    };
    
    this.entries.push(newEntry);
    
    return {
      success: true,
      message: '工作時間已記錄',
      entry: newEntry
    };
  }

  /**
   * 取得專案的總時數
   * @param {string} projectId - 專案 ID
   * @returns {number} 總時數
   */
  getProjectTotalHours(projectId) {
    return this.entries
      .filter(entry => entry.projectId === projectId)
      .reduce((total, entry) => total + entry.hours, 0);
  }

  /**
   * 取得特定日期的工作記錄
   * @param {string} memberId - 成員 ID
   * @param {string} date - 日期 (YYYY-MM-DD)
   * @returns {Array} 工作記錄陣列
   */
  getTodayEntries(memberId, date) {
    return this.entries
      .filter(entry => entry.memberId === memberId && entry.date === date)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  /**
   * 重置所有資料（測試用）
   */
  resetData() {
    this.entries = [];
    this.currentId = 1;
  }
}

// 匯出單例實例
const manager = new TimeTrackingManager();

module.exports = {
  createTimeEntry: (entry) => manager.createTimeEntry(entry),
  validateTimeEntry: (entry) => manager.validateTimeEntry(entry),
  getProjectTotalHours: (projectId) => manager.getProjectTotalHours(projectId),
  getTodayEntries: (memberId, date) => manager.getTodayEntries(memberId, date),
  resetData: () => manager.resetData()
};
```

#### 重構後再次測試

```bash
npm test tests/time-tracking.test.js
```

確認所有測試仍然通過！✅

---

## 🤖 使用 AI 加速開發

### AI Prompt 範本

#### 1. 生成測試程式碼

```
你是專精於 TDD 的資深開發者。請根據以下規格使用 Jest 撰寫測試：

【規格內容】
[貼上你的 spec 文件]

【要求】
- 使用 Jest 測試框架
- 每個場景對應一個 describe
- 使用 Arrange-Act-Assert 模式
- 包含清晰的測試描述
- 涵蓋所有邊界情況

請生成完整的測試檔案。
```

#### 2. 實作功能

```
請根據以下測試檔案，實作相應的功能：

【測試檔案】
[貼上測試程式碼]

【要求】
- 實作讓所有測試通過的程式碼
- 使用清晰的函數命名
- 加入適當的註解
- 考慮錯誤處理
- 遵循 Clean Code 原則
```

#### 3. 程式碼審查

```
請審查以下程式碼並提供改進建議：

【程式碼】
[貼上你的程式碼]

【審查重點】
- 程式碼可讀性
- 是否有潛在 bug
- 效能優化機會
- 測試覆蓋率
- 是否符合最佳實踐
```

---

## 🔍 模組 2 總結

### Red-Green-Refactor 循環

```
1. 🔴 撰寫測試（會失敗）
   ↓
2. 🟢 實作功能（測試通過）
   ↓
3. 🔵 重構優化（保持綠燈）
   ↓
4. 重複循環
```

### 核心關鍵字

| 術語 | 說明 | 重要性 |
|------|------|--------|
| **TDD** | 測試驅動開發 | ⭐⭐⭐⭐⭐ |
| **Red-Green-Refactor** | TDD 三階段循環 | ⭐⭐⭐⭐⭐ |
| **Arrange-Act-Assert** | 測試結構模式 | ⭐⭐⭐⭐ |
| **Test Coverage** | 測試覆蓋率 | ⭐⭐⭐⭐ |
| **Refactoring** | 重構 | ⭐⭐⭐⭐ |

### ✅ 檢核清單

完成模組 2 後，你應該能夠：
- [ ] 理解 TDD 的紅綠重構循環
- [ ] 將 Gherkin 規格轉換為 Jest 測試
- [ ] 實作讓測試通過的程式碼
- [ ] 在保持測試通過的前提下重構程式碼
- [ ] 使用 AI 輔助生成測試和程式碼
- [ ] 達到至少 80% 的測試覆蓋率

---

### ✍️ 實戰練習

**練習 1：完整的 SDD 循環**  
為「工作室客戶管理系統」實作「新增客戶」功能：
- [ ] 撰寫 User Story 和驗收條件
- [ ] 將規格轉換為測試
- [ ] 實作功能讓測試通過
- [ ] 重構並保持綠燈

**練習 2：個人專案**  
選擇以下一個場景，完成完整開發：
- 線上教師「學生作業提交」功能
- 個人筆記「標籤管理」功能
- 工作室「專案報價計算」功能

**練習 3：AI 協作**  
使用 AI 完成上述練習，並記錄：
- 你給 AI 的 prompts
- AI 的輸出品質
- 你做了哪些調整

---

**🎯 下一步：** 進入模組 3，學習軟體架構設計，建立可擴展的系統！

