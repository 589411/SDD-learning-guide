# 📚 書籍生成系統 - 完整文檔索引

歡迎使用 SDD 學習指南的書籍生成系統！這個索引幫助你快速找到需要的文檔。

---

## 🚀 快速開始

### 新手入門（5 分鐘）
👉 **[QUICK_START.md](QUICK_START.md)**
- 安裝依賴
- 驗證配置
- 生成第一本書
- 查看輸出結果

**適合：** 第一次使用系統的人

---

## 📖 核心文檔

### 1. 系統說明
👉 **[README.md](README.md)**
- 系統概述
- 目錄結構
- 主要功能
- 使用流程

**適合：** 了解系統整體架構

### 2. 系統總結
👉 **[SUMMARY.md](SUMMARY.md)**
- 已完成的工作
- 系統特色
- 與參考文件對比
- 使用流程
- 配置說明

**適合：** 快速了解系統全貌

### 3. 運作原理
👉 **[HOW_IT_WORKS.md](HOW_IT_WORKS.md)**
- 設計目標
- 架構圖
- 工作流程
- 配置文件說明
- 章節生成邏輯
- 關鍵功能實現

**適合：** 想深入了解技術細節

### 4. 系統架構
👉 **[ARCHITECTURE.md](ARCHITECTURE.md)**
- 整體架構
- 數據流程
- 模組架構
- 核心組件
- 設計模式
- 擴展點

**適合：** 開發者和想要擴展系統的人

---

## 📝 範例與參考

### 5. 範例章節
👉 **[EXAMPLE_CHAPTER.md](EXAMPLE_CHAPTER.md)**
- 完整的章節範例
- 所有互動元素展示
- 格式參考
- 最佳實踐

**適合：** 了解章節應該長什麼樣子

---

## 🔧 配置文件

### 6. 書籍結構配置
👉 **[config/book-config.yaml](config/book-config.yaml)**
- 書籍元數據
- 章節結構定義
- 互動元素模板
- 生成選項

**適合：** 調整章節順序和內容

### 7. 書籍元數據
👉 **[config/metadata.yaml](config/metadata.yaml)**
- 基本資訊
- 出版資訊
- 目標讀者
- 行銷資訊

**適合：** 修改書籍基本資訊

### 8. 章節模板
👉 **[config/chapter-template.md](config/chapter-template.md)**
- 章節結構模板
- 變數定義
- 條件邏輯

**適合：** 自定義章節格式

---

## 🛠️ 開發文檔

### 9. 更新日誌
👉 **[CHANGELOG.md](CHANGELOG.md)**
- 版本歷史
- 新增功能
- 未來計劃

**適合：** 了解系統演進

---

## 📊 文檔導航圖

```
開始使用
    │
    ├─→ 新手？ ──→ QUICK_START.md ──→ 5分鐘上手
    │
    ├─→ 想了解全貌？ ──→ SUMMARY.md ──→ 系統總結
    │
    ├─→ 想看範例？ ──→ EXAMPLE_CHAPTER.md ──→ 完整範例
    │
    ├─→ 想深入了解？
    │       │
    │       ├─→ 運作原理 ──→ HOW_IT_WORKS.md
    │       │
    │       └─→ 系統架構 ──→ ARCHITECTURE.md
    │
    └─→ 想調整配置？
            │
            ├─→ 章節結構 ──→ config/book-config.yaml
            │
            ├─→ 書籍資訊 ──→ config/metadata.yaml
            │
            └─→ 章節格式 ──→ config/chapter-template.md
```

---

## 🎯 常見任務快速指引

### 任務 1：第一次使用系統
```
1. 閱讀 QUICK_START.md
2. 安裝依賴：cd scripts && npm install
3. 驗證配置：npm run validate
4. 生成書籍：npm run generate:leanpub
5. 查看輸出：open ../manuscript/
```

### 任務 2：調整章節順序
```
1. 編輯 config/book-config.yaml
2. 修改 book_structure 下的章節順序
3. 重新生成：npm run generate:leanpub
4. 檢查 manuscript/Book.txt
```

### 任務 3：添加新章節
```
1. 在 Repo 中創建新的模組文件
2. 編輯 config/book-config.yaml
3. 在對應的 part 下添加章節配置：
   - chapter_number: X
     title: "新章節標題"
     source_file: "../新模組.md"
4. 重新生成書籍
```

### 任務 4：自定義互動元素
```
1. 編輯 config/book-config.yaml
2. 在 interactive_elements 下定義新元素
3. 在章節配置中使用：
   include_elements: ["new_element"]
4. 修改 scripts/generate-book.js 添加處理邏輯
5. 重新生成測試
```

### 任務 5：修改章節格式
```
1. 查看 EXAMPLE_CHAPTER.md 了解當前格式
2. 編輯 scripts/generate-book.js 中的 renderChapter()
3. 或修改 config/chapter-template.md
4. 重新生成測試
```

### 任務 6：生成出版社格式
```
1. 確認已生成 Leanpub 格式
2. 運行：npm run generate:publisher
3. 查看 output/publisher/ 目錄
4. 提交給出版社
```

---

## 🔍 按角色查找文檔

### 👤 作者/內容創作者
- **QUICK_START.md** - 快速上手
- **EXAMPLE_CHAPTER.md** - 章節範例
- **config/book-config.yaml** - 調整章節
- **config/metadata.yaml** - 修改書籍資訊

### 👨‍💻 開發者
- **ARCHITECTURE.md** - 系統架構
- **HOW_IT_WORKS.md** - 運作原理
- **scripts/generate-book.js** - 主要邏輯
- **scripts/utils.js** - 工具函數

### 📚 出版者
- **SUMMARY.md** - 系統總結
- **manuscript/** - Leanpub 輸出
- **output/publisher/** - 出版社格式
- **REPORT.md** - 統計報告

### 🎓 學習者
- **README.md** - 系統說明
- **QUICK_START.md** - 快速開始
- **EXAMPLE_CHAPTER.md** - 範例參考

---

## 📞 獲取幫助

### 遇到問題？

1. **配置錯誤**
   - 運行：`npm run validate`
   - 查看錯誤訊息
   - 參考：HOW_IT_WORKS.md 的「故障排除」章節

2. **生成失敗**
   - 檢查來源文件是否存在
   - 查看 console 輸出
   - 參考：QUICK_START.md 的「常見問題」

3. **格式不符預期**
   - 查看：EXAMPLE_CHAPTER.md
   - 檢查：config/book-config.yaml
   - 修改：scripts/generate-book.js

4. **想要新功能**
   - 閱讀：ARCHITECTURE.md 的「擴展點」
   - 參考：HOW_IT_WORKS.md 的「擴展性設計」
   - 查看：CHANGELOG.md 的「未來計劃」

---

## 🎉 開始你的旅程

### 推薦學習路徑

```
第 1 步：快速體驗（10 分鐘）
    └─→ QUICK_START.md
         └─→ 生成第一本書

第 2 步：了解系統（20 分鐘）
    └─→ SUMMARY.md
         └─→ EXAMPLE_CHAPTER.md

第 3 步：深入學習（30 分鐘）
    └─→ HOW_IT_WORKS.md
         └─→ ARCHITECTURE.md

第 4 步：開始自定義（實作）
    └─→ 修改 config/book-config.yaml
         └─→ 重新生成測試
```

---

## 📋 文檔清單

- ✅ **README.md** - 系統說明
- ✅ **QUICK_START.md** - 快速開始指南
- ✅ **SUMMARY.md** - 系統總結
- ✅ **HOW_IT_WORKS.md** - 運作原理
- ✅ **ARCHITECTURE.md** - 系統架構
- ✅ **EXAMPLE_CHAPTER.md** - 範例章節
- ✅ **CHANGELOG.md** - 更新日誌
- ✅ **INDEX.md** - 本文件（文檔索引）
- ✅ **config/book-config.yaml** - 書籍結構配置
- ✅ **config/metadata.yaml** - 書籍元數據
- ✅ **config/chapter-template.md** - 章節模板
- ✅ **scripts/generate-book.js** - 生成腳本
- ✅ **scripts/utils.js** - 工具函數
- ✅ **scripts/validate-config.js** - 驗證腳本
- ✅ **scripts/package.json** - 依賴配置

---

## 🌟 快速連結

| 我想... | 查看文檔 |
|--------|---------|
| 快速上手 | [QUICK_START.md](QUICK_START.md) |
| 了解全貌 | [SUMMARY.md](SUMMARY.md) |
| 看範例 | [EXAMPLE_CHAPTER.md](EXAMPLE_CHAPTER.md) |
| 調整章節 | [config/book-config.yaml](config/book-config.yaml) |
| 深入了解 | [HOW_IT_WORKS.md](HOW_IT_WORKS.md) |
| 系統架構 | [ARCHITECTURE.md](ARCHITECTURE.md) |
| 版本歷史 | [CHANGELOG.md](CHANGELOG.md) |

---

**最後更新：** 2024-10-18

**版本：** 1.0.0

**準備好了嗎？** 從 [QUICK_START.md](QUICK_START.md) 開始你的書籍生成之旅！ 🚀
