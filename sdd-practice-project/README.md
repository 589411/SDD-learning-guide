# SDD 實戰練習專案

## 📘 專案簡介

這是一個完整的 **規格驅動開發 (SDD)** 實戰練習專案，展示如何從規格到測試再到實作的完整流程。

## 🎯 學習目標

通過這個專案，你將學會：
1. ✍️ 撰寫清晰的使用者故事和驗收條件
2. 🧪 將規格轉換為自動化測試
3. 💻 實作能通過測試的程式碼
4. 🔄 體驗 TDD 的 Red-Green-Refactor 循環
5. 🤖 學習如何指導 AI 協助開發

## 📁 專案結構

```
sdd-practice-project/
├── README.md                 # 專案說明文件
├── package.json              # npm 專案設定
├── .gitignore               # Git 忽略檔案
├── jest.config.js           # Jest 測試設定
├── specs/                   # 📋 規格文件目錄
│   ├── login.spec.md        # 登入功能規格
│   └── cart.spec.md         # 購物車功能規格
├── tests/                   # 🧪 測試程式目錄
│   ├── login.test.js        # 登入功能測試
│   └── cart.test.js         # 購物車功能測試
└── src/                     # 💻 原始碼目錄
    ├── login.js             # 登入功能實作
    ├── cart.js              # 購物車功能實作
    └── utils.js             # 共用工具函數
```

## 🚀 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 執行測試

```bash
# 執行所有測試
npm test

# 監聽模式（自動重新執行）
npm run test:watch

# 查看測試覆蓋率
npm run test:coverage
```

### 3. 學習流程

按照以下順序學習：

#### Step 1: 閱讀規格
```bash
# 先閱讀規格文件，理解需求
cat specs/login.spec.md
```

#### Step 2: 查看測試
```bash
# 了解如何將規格轉換為測試
cat tests/login.test.js
```

#### Step 3: 執行測試（紅燈）
```bash
# 第一次執行，測試應該會失敗
npm test
```

#### Step 4: 實作程式碼
```bash
# 查看實作如何讓測試通過
cat src/login.js
```

#### Step 5: 再次執行測試（綠燈）
```bash
# 實作完成後，測試應該全部通過
npm test
```

## 📚 範例功能

### 1. 登入功能（完整實作）

- ✅ 規格：`specs/login.spec.md`
- ✅ 測試：`tests/login.test.js`
- ✅ 實作：`src/login.js`
- 包含 6 個完整場景

### 2. 購物車功能（練習用）

- ✅ 規格：`specs/cart.spec.md`
- ⏳ 測試：`tests/cart.test.js`（待完成）
- ⏳ 實作：`src/cart.js`（待實作）

## 🎓 學習練習

### 練習 1：理解現有實作
- [ ] 閱讀 `specs/login.spec.md`
- [ ] 對照 `tests/login.test.js`，看規格如何轉為測試
- [ ] 研究 `src/login.js`，理解實作邏輯
- [ ] 執行測試並確認全部通過

### 練習 2：修改現有功能
- [ ] 在規格中新增「記住我 7 天」的場景
- [ ] 將場景轉換為測試案例
- [ ] 修改實作讓測試通過

### 練習 3：實作新功能
- [ ] 參考購物車規格 `specs/cart.spec.md`
- [ ] 自己撰寫測試 `tests/cart.test.js`
- [ ] 實作程式碼 `src/cart.js`
- [ ] 確保所有測試通過

### 練習 4：使用 AI 協助
- [ ] 複製一個規格場景
- [ ] 請 AI 生成對應的測試程式碼
- [ ] 請 AI 生成能通過測試的實作
- [ ] 驗證 AI 生成的程式碼品質

## 🤖 AI 協助指令範例

### 生成測試

```
你是一位專精於 TDD 的開發者。請根據以下規格，使用 Jest 撰寫測試程式碼：

[貼上規格內容]

要求：
1. 使用 describe 和 test 組織測試
2. 每個場景對應一個測試案例
3. 使用清晰的測試描述
4. 包含適當的 expect 斷言
```

### 生成實作

```
以下是一個失敗的 Jest 測試：

[貼上測試程式碼]

請實作能讓這個測試通過的程式碼。要求：
1. 程式碼要簡潔易讀
2. 適當的錯誤處理
3. 加上必要的註解
4. 遵循 JavaScript 最佳實踐
```

### Code Review

```
請檢查以下程式碼，並給予改進建議：

[貼上程式碼]

從以下角度分析：
1. 程式碼品質（Clean Code）
2. 效能考量
3. 安全性問題
4. 可維護性
5. 測試覆蓋率
```

## 📖 相關文件

- [模組 0：規格驅動思維](../開發大綱.md#模組-0)
- [模組 1：開發者工具包](../開發大綱.md#模組-1)
- [模組 2：SDD 核心循環](../開發大綱.md#模組-2)

## 🔗 參考資源

- [Jest 官方文件](https://jestjs.io/)
- [TDD 實踐指南](https://martinfowler.com/bliki/TestDrivenDevelopment.html)
- [Clean Code 原則](https://github.com/ryanmcdermott/clean-code-javascript)
- [Gherkin 語法參考](https://cucumber.io/docs/gherkin/)

## ❓ 常見問題

### Q: 測試失敗怎麼辦？
A: 這是正常的！TDD 的流程就是：紅燈（失敗）→ 綠燈（通過）→ 重構。失敗的測試會告訴你還需要實作什麼。

### Q: 我應該先寫測試還是先寫程式碼？
A: 在 TDD 中，**一定是先寫測試**。測試定義了「什麼是正確的」，然後你才寫程式碼去滿足這個定義。

### Q: 如何知道測試寫得夠不夠？
A: 使用 `npm run test:coverage` 查看覆蓋率。目標是達到 80% 以上，但更重要的是測試要涵蓋關鍵路徑和邊界情況。

### Q: AI 生成的程式碼可以直接用嗎？
A: 不建議直接使用。應該：
1. 仔細閱讀理解
2. 驗證測試是否通過
3. 檢查是否符合專案規範
4. 必要時進行重構

## 🎉 完成指標

當你完成以下目標時，就掌握了 SDD 的核心技能：

- ✅ 能獨立撰寫使用者故事和驗收條件
- ✅ 能將 Gherkin 場景轉換為 Jest 測試
- ✅ 能實作通過測試的程式碼
- ✅ 能使用 Git 管理開發流程
- ✅ 能有效地與 AI 協作開發
- ✅ 測試覆蓋率達到 80% 以上
- ✅ 程式碼通過 ESLint 檢查

## 📝 授權

MIT License - 可自由使用於學習和教學用途
