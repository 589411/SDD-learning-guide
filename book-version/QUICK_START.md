# 🚀 快速開始指南

這份指南將帶你快速上手書籍生成系統。

## 📋 前置需求

- Node.js 16.x 或更高版本
- npm 或 yarn

## 🔧 安裝步驟

### 1. 安裝依賴

```bash
cd book-version/scripts
npm install
```

### 2. 驗證配置

在生成書籍前，先驗證配置是否正確：

```bash
npm run validate
```

這會檢查：
- ✅ 配置文件格式是否正確
- ✅ 來源文件是否存在
- ✅ 輸出目錄是否可用

## 📚 生成書籍

### 方式 1：生成 Leanpub 格式（推薦）

```bash
npm run generate:leanpub
```

輸出位置：`book-version/manuscript/`

### 方式 2：生成出版社格式

```bash
npm run generate:publisher
```

輸出位置：`book-version/output/publisher/`

### 方式 3：生成所有格式

```bash
npm run generate:all
```

## 📁 輸出結構

生成完成後，`manuscript/` 目錄會包含：

```
manuscript/
├── Book.txt                 # 章節順序（Leanpub 必需）
├── Sample.txt              # 試閱章節（前 3 章）
├── part0.md                # Part 0: 開始之前
├── chapter-00.md           # 第 0 章
├── chapter-01.md           # 第 1 章
├── ...
├── appendix-A.md           # 附錄 A
└── REPORT.md               # 生成報告
```

## 🔄 更新流程

當你更新 Repo 內容後：

1. **修改來源文件**（在主目錄的模組中）
2. **重新生成書籍**
   ```bash
   cd book-version/scripts
   npm run generate:leanpub
   ```
3. **檢查輸出**（查看 `manuscript/` 目錄）
4. **上傳到 Leanpub**（或提交給出版社）

## 🎨 自定義配置

### 修改章節順序

編輯 `config/book-config.yaml`：

```yaml
book_structure:
  part1:
    chapters:
      - chapter_number: 1
        title: "你的章節標題"
        source_file: "../模組內容/模組0_規格驅動思維.md"
```

### 修改書籍元數據

編輯 `config/metadata.yaml`：

```yaml
book:
  title: "你的書名"
  author: "你的名字"
  subtitle: "副標題"
```

### 自定義互動元素

在 `config/book-config.yaml` 中為每章添加：

```yaml
add_content:
  practice_task_1:
    title: "實作任務標題"
    description: "任務描述"
    time: "30 分鐘"
    checkpoint: "驗證方式"
```

## 📊 查看生成報告

每次生成後會產生 `manuscript/REPORT.md`，包含：

- 總章節數
- 預計閱讀時間
- 章節列表
- 統計資訊

## ⚠️ 常見問題

### Q1: 找不到來源文件

**錯誤訊息：** `❌ 找不到文件: ../模組內容/xxx.md`

**解決方案：**
1. 檢查 `book-config.yaml` 中的 `source_file` 路徑
2. 確認文件確實存在於 Repo 中
3. 路徑是相對於 `book-version/` 目錄

### Q2: 配置驗證失敗

**解決方案：**
```bash
npm run validate
```
根據錯誤訊息修正配置文件

### Q3: 生成的章節內容不完整

**解決方案：**
1. 檢查來源文件是否為有效的 Markdown
2. 確認 `include_elements` 配置正確
3. 查看 `REPORT.md` 了解詳細資訊

### Q4: 想要修改章節模板

**解決方案：**
編輯 `config/chapter-template.md` 或直接修改 `scripts/generate-book.js` 中的 `renderChapter` 函數

## 🎯 下一步

1. **預覽生成結果**
   - 在 Markdown 編輯器中打開 `manuscript/` 中的文件
   - 或上傳到 Leanpub 預覽

2. **持續優化**
   - 根據預覽結果調整配置
   - 完善來源文件內容
   - 添加更多互動元素

3. **發布**
   - Leanpub：直接上傳 `manuscript/` 目錄
   - 出版社：使用 `generate:publisher` 生成 Word/PDF

## 💡 進階技巧

### 只生成特定章節

修改 `generate-book.js`，註解掉不需要的部分：

```javascript
// const part1Chapters = await generatePart(config.book_structure.part1, 'part1', config);
```

### 自動化部署到 Leanpub

可以結合 GitHub Actions 自動生成並部署：

```yaml
# .github/workflows/deploy-book.yml
name: Deploy to Leanpub
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: cd book-version/scripts && npm install
      - run: cd book-version/scripts && npm run generate:leanpub
      # 上傳到 Leanpub...
```

## 📞 需要幫助？

- 查看 `README.md` 了解系統架構
- 查看 `config/book-config.yaml` 的註解
- 檢查 `REPORT.md` 了解生成詳情

---

**準備好了嗎？開始生成你的第一本書！** 🎉

```bash
cd book-version/scripts
npm install
npm run validate
npm run generate:leanpub
```
