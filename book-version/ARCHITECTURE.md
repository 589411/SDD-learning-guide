# 🏗️ 系統架構說明

## 📐 整體架構

```
┌─────────────────────────────────────────────────────────────────────┐
│                         SDD 學習指南專案                              │
└─────────────────────────────────────────────────────────────────────┘
                                  │
                    ┌─────────────┴─────────────┐
                    │                           │
         ┌──────────▼──────────┐     ┌─────────▼──────────┐
         │   GitHub Repo       │     │   書籍生成系統      │
         │   (學習平台)         │     │   (出版系統)        │
         └──────────┬──────────┘     └─────────┬──────────┘
                    │                           │
         ┌──────────▼──────────┐     ┌─────────▼──────────┐
         │ 模組化內容           │────▶│ 配置驅動生成        │
         │ - 模組 0-4          │     │ - book-config.yaml │
         │ - 實戰專案          │     │ - 自動化腳本        │
         │ - 學習資源          │     │ - 章節模板          │
         └─────────────────────┘     └─────────┬──────────┘
                                               │
                                     ┌─────────▼──────────┐
                                     │ 輸出格式            │
                                     │ - Leanpub          │
                                     │ - 出版社格式        │
                                     └────────────────────┘
```

## 🔄 數據流程

```
1. 來源內容                2. 配置處理              3. 生成輸出
─────────────             ─────────────            ─────────────

┌─────────────┐           ┌─────────────┐          ┌─────────────┐
│ 模組0.md    │──────────▶│ 讀取配置    │          │ chapter-01  │
│ 模組1.md    │           │ book-config │          │ chapter-02  │
│ 專案1/      │           │             │          │ ...         │
│ 專案2/      │           └──────┬──────┘          └─────────────┘
│ 專案3/      │                  │                          ▲
│ 學習資源/   │                  │                          │
└─────────────┘                  │                          │
                                 │                          │
                        ┌────────▼────────┐                 │
                        │ 處理章節內容    │                 │
                        │ - 提取標題      │                 │
                        │ - 計算時間      │                 │
                        │ - 添加元素      │                 │
                        └────────┬────────┘                 │
                                 │                          │
                        ┌────────▼────────┐                 │
                        │ 渲染章節        │─────────────────┘
                        │ - 套用模板      │
                        │ - 格式化內容    │
                        │ - 生成索引      │
                        └─────────────────┘
```

## 📦 模組架構

### 1. 配置層 (Configuration Layer)

```
config/
├── book-config.yaml        # 核心配置
│   ├── book_metadata       # 書籍元數據
│   ├── book_structure      # 章節結構
│   │   ├── part0-4        # 各部分定義
│   │   └── appendix       # 附錄定義
│   ├── interactive_elements # 互動元素模板
│   └── generation_options  # 生成選項
│
├── metadata.yaml           # 書籍元數據
│   ├── book               # 基本資訊
│   ├── publication        # 出版資訊
│   ├── target_audience    # 目標讀者
│   └── marketing          # 行銷資訊
│
└── chapter-template.md     # 章節模板
    ├── 標題區
    ├── 學習目標
    ├── 核心內容
    ├── 實作任務
    └── 檢測清單
```

### 2. 處理層 (Processing Layer)

```
scripts/
├── generate-book.js        # 主要生成邏輯
│   ├── generateBook()     # 主函數
│   ├── generatePart()     # 生成部分
│   ├── generateChapter()  # 生成章節
│   ├── renderChapter()    # 渲染章節
│   └── generateReport()   # 生成報告
│
├── utils.js               # 工具函數
│   ├── loadConfig()       # 載入配置
│   ├── loadMarkdownFile() # 讀取 Markdown
│   ├── calculateReadingTime() # 計算時間
│   ├── extractTitle()     # 提取標題
│   ├── generateBookTxt()  # 生成索引
│   └── validateConfig()   # 驗證配置
│
└── validate-config.js     # 配置驗證
    ├── validateConfiguration()
    ├── checkChapters()
    └── checkFiles()
```

### 3. 輸出層 (Output Layer)

```
manuscript/                 # Leanpub 輸出
├── Book.txt               # 章節順序（必需）
├── Sample.txt             # 試閱章節
├── part0.md               # 部分標題頁
├── chapter-01.md          # 章節內容
├── chapter-02.md
├── ...
├── appendix-A.md          # 附錄
└── REPORT.md              # 生成報告

output/                    # 其他格式輸出
└── publisher/             # 出版社格式
    ├── book.docx          # Word 格式
    └── book.pdf           # PDF 格式
```

## 🔧 核心組件

### 1. 配置解析器 (Config Parser)

```javascript
// 功能：讀取和驗證配置
class ConfigParser {
  loadConfig(path)          // 載入 YAML 配置
  validateConfig(config)    // 驗證配置格式
  resolveReferences()       // 解析引用關係
}
```

### 2. 內容處理器 (Content Processor)

```javascript
// 功能：處理來源內容
class ContentProcessor {
  loadSourceFile(path)      // 載入來源文件
  extractMetadata()         // 提取元數據
  calculateReadingTime()    // 計算閱讀時間
  processMarkdown()         // 處理 Markdown
}
```

### 3. 章節生成器 (Chapter Generator)

```javascript
// 功能：生成章節內容
class ChapterGenerator {
  generateChapter(config)   // 生成章節
  addInteractiveElements()  // 添加互動元素
  renderTemplate()          // 渲染模板
  formatOutput()            // 格式化輸出
}
```

### 4. 輸出管理器 (Output Manager)

```javascript
// 功能：管理輸出文件
class OutputManager {
  writeChapter(content)     // 寫入章節
  generateBookTxt()         // 生成索引
  generateReport()          // 生成報告
  cleanupOutput()           // 清理輸出
}
```

## 🎯 設計模式

### 1. 配置驅動 (Configuration-Driven)

```yaml
# 所有內容通過配置定義
chapters:
  - chapter_number: 1
    source_file: "../模組0.md"
    include_elements: ["objectives", "tasks"]
```

**優點：**
- 易於調整
- 可重複使用
- 降低耦合

### 2. 模板引擎 (Template Engine)

```javascript
// 使用模板渲染章節
const template = loadTemplate('chapter-template.md');
const output = renderTemplate(template, data);
```

**優點：**
- 統一格式
- 易於維護
- 支持自定義

### 3. 管道處理 (Pipeline Processing)

```javascript
// 章節生成管道
source → load → process → enhance → render → output
```

**優點：**
- 清晰的流程
- 易於擴展
- 便於測試

## 🔌 擴展點

### 1. 新增互動元素

```javascript
// 在 book-config.yaml 定義
interactive_elements:
  new_element:
    template: "..."

// 在 generate-book.js 實現
function addNewElement(data, config) {
  // 處理邏輯
}
```

### 2. 支持新格式

```javascript
// 創建新的生成器
class PDFGenerator extends BaseGenerator {
  generate(chapters) {
    // PDF 生成邏輯
  }
}
```

### 3. 自定義處理器

```javascript
// 註冊自定義處理器
processors.register('custom', (content) => {
  // 自定義處理邏輯
  return processedContent;
});
```

## 📊 性能考量

### 1. 文件緩存

```javascript
// 緩存已讀取的文件
const fileCache = new Map();

function loadFile(path) {
  if (fileCache.has(path)) {
    return fileCache.get(path);
  }
  // 讀取並緩存
}
```

### 2. 並行處理

```javascript
// 並行生成多個章節
const chapters = await Promise.all(
  configs.map(config => generateChapter(config))
);
```

### 3. 增量更新

```javascript
// 只更新修改過的章節
if (isModified(sourceFile, outputFile)) {
  regenerateChapter(config);
}
```

## 🔒 安全性

### 1. 路徑驗證

```javascript
// 防止路徑遍歷攻擊
function validatePath(path) {
  const resolved = path.resolve(basePath, path);
  if (!resolved.startsWith(basePath)) {
    throw new Error('Invalid path');
  }
}
```

### 2. 輸入驗證

```javascript
// 驗證配置輸入
function validateInput(config) {
  // 檢查必要欄位
  // 驗證數據類型
  // 清理危險內容
}
```

## 🧪 測試策略

### 1. 單元測試

```javascript
// 測試工具函數
describe('utils', () => {
  test('calculateReadingTime', () => {
    const result = calculateReadingTime('...');
    expect(result.minutes).toBe(5);
  });
});
```

### 2. 整合測試

```javascript
// 測試完整流程
describe('generateBook', () => {
  test('generates all chapters', async () => {
    const result = await generateBook(config);
    expect(result.chapters.length).toBe(10);
  });
});
```

### 3. 端對端測試

```javascript
// 測試實際輸出
describe('e2e', () => {
  test('generates valid Leanpub format', () => {
    generateBook(config);
    const bookTxt = readFile('manuscript/Book.txt');
    expect(bookTxt).toContain('chapter-01.md');
  });
});
```

## 📈 監控與日誌

### 1. 進度追蹤

```javascript
// 顯示生成進度
showProgress(current, total, 'Generating chapters...');
```

### 2. 錯誤處理

```javascript
// 統一錯誤處理
try {
  generateChapter(config);
} catch (error) {
  logger.error('Failed to generate chapter', error);
  // 回滾或跳過
}
```

### 3. 統計報告

```javascript
// 生成詳細報告
const report = {
  totalChapters: 10,
  totalReadingTime: 300,
  generatedAt: new Date()
};
```

---

## 🎓 最佳實踐

1. **配置優先**：所有可變內容通過配置定義
2. **模組化設計**：每個組件職責單一
3. **錯誤處理**：完善的錯誤處理和回滾機制
4. **文檔完整**：每個函數都有清晰的註解
5. **可測試性**：設計時考慮測試需求

---

**相關文檔：**
- `HOW_IT_WORKS.md` - 運作原理
- `QUICK_START.md` - 快速開始
- `SUMMARY.md` - 系統總結
