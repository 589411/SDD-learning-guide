# 🔧 系統運作原理

這份文件說明書籍生成系統的運作原理和設計思路。

## 🎯 設計目標

### 1. 保留 GitHub Repo 的靈活性
- Repo 維持模組化結構，方便更新和學習
- 不破壞現有的文件組織方式

### 2. 生成適合閱讀的書籍版本
- 線性化的章節順序
- 統一的格式和風格
- 豐富的互動元素

### 3. 自動化同步
- Repo 更新時，重新運行腳本即可更新書籍
- 減少重複工作

## 📊 架構圖

```
GitHub Repo（來源）                書籍生成系統                    輸出
─────────────────                ─────────────                ─────────

模組內容/                        
├─ 模組0.md ────────┐            
├─ 模組1.md ────────┤            
├─ 模組2.md ────────┤            
└─ ...              │            
                    │            
實戰專案/            │            
├─ 專案1/ ──────────┤            
├─ 專案2/ ──────────┤            
└─ 專案3/ ──────────┤            
                    │            
學習資源/            │            
└─ ...  ────────────┤            
                    │            
                    ├──→ book-config.yaml ──→ generate-book.js ──→ manuscript/
                    │         (配置)              (生成腳本)         ├─ Book.txt
                    │                                               ├─ chapter-01.md
                    │                                               ├─ chapter-02.md
                    │                                               └─ ...
                    │
                    └──→ chapter-template.md
                              (章節模板)
```

## 🔄 工作流程

### 步驟 1：讀取配置
```javascript
// 載入 book-config.yaml
const config = loadConfig('config/book-config.yaml');

// 配置定義了：
// - 章節順序
// - 來源文件映射
// - 互動元素配置
```

### 步驟 2：處理每個章節
```javascript
for (const chapter of config.chapters) {
  // 1. 讀取來源文件
  const content = readMarkdownFile(chapter.source_file);
  
  // 2. 提取資訊
  const title = extractTitle(content);
  const readingTime = calculateReadingTime(content);
  
  // 3. 添加互動元素
  if (chapter.include_elements.includes('practice_tasks')) {
    addPracticeTasks(content, chapter.add_content);
  }
  
  // 4. 渲染章節
  const output = renderChapter(chapterData, template);
  
  // 5. 寫入文件
  writeFile(`manuscript/chapter-${number}.md`, output);
}
```

### 步驟 3：生成索引文件
```javascript
// 生成 Book.txt（Leanpub 需要）
generateBookTxt(allChapters);

// 生成 Sample.txt（試閱章節）
generateSampleTxt(allChapters, 3);

// 生成統計報告
generateReport(allChapters);
```

## 📝 配置文件說明

### book-config.yaml 結構

```yaml
book_metadata:
  title: "書名"
  author: "作者"
  # ... 其他元數據

book_structure:
  part1:                          # 部分 ID
    title: "部分標題"
    description: "部分描述"
    learning_weeks: [1, 2]        # 學習週次
    chapters:                     # 章節列表
      - chapter_number: 1
        title: "章節標題"
        source_file: "../模組0.md"  # 來源文件（相對路徑）
        include_elements:          # 要包含的元素
          - "learning_objectives"
          - "practice_tasks"
          - "self_check"
        add_content:               # 額外內容
          practice_task_1:
            title: "任務標題"
            description: "任務描述"
            time: "30 分鐘"
            checkpoint: "驗證方式"

interactive_elements:             # 互動元素模板
  learning_objectives:
    template: "..."
  practice_tasks:
    template: "..."
  # ... 其他元素

generation_options:               # 生成選項
  add_interactive_elements: true
  calculate_reading_time: true
  # ... 其他選項
```

## 🎨 章節生成邏輯

### 1. 基本結構
每個章節包含：
- 標題和元數據
- 學習目標
- 核心內容（來自來源文件）
- 實作任務
- 自我檢測
- 學習筆記區

### 2. 內容來源
```javascript
// 主要內容來自 Repo 的模組文件
const mainContent = loadMarkdownFile(chapter.source_file);

// 互動元素來自配置
const practiceTask = chapter.add_content.practice_task_1;

// 學習目標可以從 frontmatter 提取或使用配置
const objectives = frontmatter.objectives || defaultObjectives;
```

### 3. 模板渲染
```javascript
function renderChapter(data, config) {
  let output = '';
  
  // 標題區
  output += `# 第 ${data.chapter_number} 章：${data.title}\n\n`;
  
  // 元數據
  output += `**所屬部分：** ${data.part_title}\n`;
  output += `**學習週次：** 第 ${data.learning_week} 週\n\n`;
  
  // 學習目標
  if (data.learning_objectives) {
    output += `## 🎯 本章學習目標\n\n`;
    output += generateObjectivesList(data.objectives);
  }
  
  // 主要內容
  output += `## 📚 核心內容\n\n`;
  output += data.main_content;
  
  // 實作任務
  if (data.practice_tasks) {
    output += `## 💻 實作任務\n\n`;
    data.practice_tasks.forEach(task => {
      output += generatePracticeTask(task);
    });
  }
  
  // 自我檢測
  if (data.self_check_items) {
    output += `## ✅ 自我檢測清單\n\n`;
    output += generateChecklist(data.self_check_items);
  }
  
  // 學習筆記區
  output += `## 📝 學習筆記區\n\n`;
  output += `（留白供讀者書寫）\n\n`;
  
  return output;
}
```

## 🔍 關鍵功能實現

### 1. 閱讀時間計算
```javascript
function calculateReadingTime(text) {
  // 移除 Markdown 語法
  const plainText = removeMarkdownSyntax(text);
  
  // 計算中文字符（200 字/分鐘）
  const chineseChars = countChineseChars(plainText);
  
  // 計算英文單詞（200 詞/分鐘）
  const englishWords = countEnglishWords(plainText);
  
  // 總時間
  const minutes = Math.ceil(
    (chineseChars / 200) + (englishWords / 200)
  );
  
  return { minutes, chineseChars, englishWords };
}
```

### 2. 路徑解析
```javascript
function resolvePath(basePath, relativePath) {
  // 支持相對路徑（如 ../模組0.md）
  if (path.isAbsolute(relativePath)) {
    return relativePath;
  }
  
  // 從 book-version/ 目錄解析
  return path.resolve(basePath, relativePath);
}
```

### 3. Book.txt 生成
```javascript
function generateBookTxt(chapters) {
  const lines = [];
  
  chapters.forEach(chapter => {
    if (chapter.type === 'part') {
      // 部分標題（Leanpub 格式）
      lines.push(`# ${chapter.title}`);
    } else {
      // 章節文件名
      lines.push(chapter.filename);
    }
  });
  
  return lines.join('\n');
}
```

## 🎯 擴展性設計

### 1. 添加新的互動元素

在 `book-config.yaml` 中定義：
```yaml
interactive_elements:
  quiz_questions:
    template: |
      ## 🤔 測驗題
      {questions_content}
```

在 `generate-book.js` 中實現：
```javascript
if (chapter.include_elements.includes('quiz_questions')) {
  addQuizQuestions(chapterData, chapter.quiz_data);
}
```

### 2. 支持新的輸出格式

創建新的生成器：
```javascript
// scripts/generate-pdf.js
async function generatePDF(chapters, config) {
  // 使用 Pandoc 或其他工具轉換
  // markdown -> PDF
}
```

### 3. 自定義章節模板

修改 `renderChapter` 函數或創建新的模板引擎：
```javascript
// 使用 Mustache 模板
const template = loadTemplate('chapter-template.md');
const output = Mustache.render(template, chapterData);
```

## 📊 數據流

```
配置文件                來源文件              處理              輸出
────────                ────────              ────              ────

book-config.yaml ──┐
                   │
metadata.yaml ─────┤
                   │
                   ├──→ generate-book.js ──→ 讀取來源 ──→ 添加元素 ──→ 渲染 ──→ manuscript/
                   │         ↓                  ↓            ↓          ↓
模組0.md ──────────┤      載入配置        提取內容    加入互動元素   套用模板
模組1.md ──────────┤         ↓                  ↓            ↓          ↓
專案1/README.md ───┤      驗證配置        計算時間    生成清單    寫入文件
...  ──────────────┘         ↓                  ↓            ↓          ↓
                          解析路徑        提取標題    格式化      Book.txt
                                                                  REPORT.md
```

## 🚀 性能優化

### 1. 批次處理
```javascript
// 並行處理多個章節
const chapters = await Promise.all(
  chapterConfigs.map(config => generateChapter(config))
);
```

### 2. 緩存機制
```javascript
// 緩存已讀取的文件
const fileCache = new Map();

function loadMarkdownFile(path) {
  if (fileCache.has(path)) {
    return fileCache.get(path);
  }
  
  const content = fs.readFileSync(path);
  fileCache.set(path, content);
  return content;
}
```

### 3. 增量更新
```javascript
// 只重新生成修改過的章節
function shouldRegenerate(sourceFile, outputFile) {
  const sourceMtime = fs.statSync(sourceFile).mtime;
  const outputMtime = fs.statSync(outputFile).mtime;
  
  return sourceMtime > outputMtime;
}
```

## 🔧 故障排除

### 常見問題

1. **找不到來源文件**
   - 檢查 `source_file` 路徑是否正確
   - 確認路徑是相對於 `book-version/` 目錄

2. **生成的內容格式錯誤**
   - 檢查來源文件的 Markdown 格式
   - 確認模板語法正確

3. **Book.txt 順序錯誤**
   - 檢查 `chapter_number` 是否正確
   - 確認配置文件中的章節順序

## 📚 相關文件

- `README.md` - 系統概述
- `QUICK_START.md` - 快速開始指南
- `EXAMPLE_CHAPTER.md` - 章節範例
- `config/book-config.yaml` - 配置文件

---

**需要更多技術細節？** 查看源碼中的註解或聯繫維護者。
