# 模組 2：SDD 核心循環實戰 — 從規格到綠燈的魔法

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

