# 📖 書籍版本生成系統

這個目錄包含將 GitHub Repo 內容轉換為出版書籍格式的完整系統。

## 📁 目錄結構

```
book-version/
├── README.md                    # 本文件
├── config/
│   ├── book-config.yaml        # 書籍結構配置
│   ├── chapter-template.md     # 章節模板
│   └── metadata.yaml           # 書籍元數據
├── manuscript/                  # Leanpub 輸出目錄
│   ├── Book.txt                # 章節順序
│   ├── part0.md                # Part 0: 開始之前
│   ├── part1.md                # Part 1: 基礎篇
│   ├── part2.md                # Part 2: 核心篇
│   ├── part3.md                # Part 3: 實戰篇
│   ├── part4.md                # Part 4: 進階篇
│   └── appendix.md             # 附錄
├── scripts/
│   ├── generate-book.js        # 主要生成腳本
│   ├── utils.js                # 工具函數
│   └── package.json            # Node.js 依賴
└── output/
    ├── leanpub/                # Leanpub 格式輸出
    └── publisher/              # 出版社格式輸出
```

## 🎯 使用方式

### 1. 安裝依賴
```bash
cd book-version/scripts
npm install
```

### 2. 生成書籍
```bash
# 生成 Leanpub 格式
npm run generate:leanpub

# 生成出版社格式
npm run generate:publisher

# 生成所有格式
npm run generate:all
```

### 3. 預覽
```bash
# 在 Leanpub 上預覽
# 將 manuscript/ 目錄內容上傳到 Leanpub
```

## 🔄 工作流程

1. **維護 Repo 內容**：在主目錄的模組和專案中更新內容
2. **運行生成腳本**：自動從 Repo 組裝書籍版本
3. **審閱輸出**：檢查 manuscript/ 目錄的生成結果
4. **發布**：上傳到 Leanpub 或提交給出版社

## ✨ 特色功能

- ✅ **自動同步**：Repo 更新時，重新運行腳本即可更新書籍
- ✅ **互動元素**：自動加入檢核清單、實作任務、學習里程碑
- ✅ **雙格式輸出**：同時支持 Leanpub 和傳統出版社格式
- ✅ **模組化設計**：可以靈活調整章節順序和內容

## 📝 配置說明

詳見 `config/book-config.yaml` 文件，可以自定義：
- 章節順序
- 內容來源映射
- 互動元素配置
- 輸出格式選項
