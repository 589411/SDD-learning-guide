# 🚀 快速開始指南

## 第一次使用本專案？

這份指南將幫助你在 5 分鐘內開始使用本專案進行 SDD 學習。

---

## ✅ 前置需求檢查

在開始之前，確認你已經安裝：

```bash
# 檢查 Node.js（需要 14.x 或更高版本）
node --version

# 檢查 npm
npm --version

# 檢查 Git
git --version
```

如果沒有安裝，請參考 [../開發大綱.md 模組 1](../開發大綱.md#模組-1)

---

## 📦 安裝步驟

### 1. 進入專案目錄

```bash
cd sdd-practice-project
```

### 2. 安裝依賴套件

```bash
npm install
```

這會安裝：
- Jest（測試框架）
- ESLint（程式碼檢查）

### 3. 驗證安裝

```bash
npm test
```

你應該會看到登入功能的所有測試通過（綠燈✅）

---

## 🎯 學習路徑

### 路徑 A：理解現有實作（推薦新手）

**目標：理解 SDD 流程**

#### Step 1：閱讀規格 (5 分鐘)

```bash
# 用你喜歡的編輯器開啟規格檔案
code specs/login.spec.md
# 或
cat specs/login.spec.md
```

**重點關注：**
- 使用者故事（User Story）
- 驗收條件（Acceptance Criteria）
- 每個場景的 Given-When-Then 結構

#### Step 2：查看測試 (10 分鐘)

```bash
code tests/login.test.js
```

**重點關注：**
- 測試如何對應到規格中的場景
- `describe` 和 `test` 的組織方式
- `expect()` 斷言的使用

#### Step 3：研究實作 (15 分鐘)

```bash
code src/login.js
```

**重點關注：**
- 函數如何實作規格中的需求
- 錯誤處理的方式
- 資料驗證的邏輯

#### Step 4：執行並觀察測試 (5 分鐘)

```bash
# 執行測試
npm test

# 查看測試覆蓋率
npm run test:coverage

# 監聽模式（修改程式碼時自動重新測試）
npm run test:watch
```

#### Step 5：小改動實驗 (10 分鐘)

嘗試修改程式碼，看測試如何反應：

```javascript
// 在 src/login.js 中
// 將成功訊息改為其他文字
message: "登入成功!!" // 原本是 "登入成功"
```

再次執行測試：
```bash
npm test
```

測試會失敗，這證明了測試在保護你的程式碼！

**恢復原狀：**
```bash
git checkout src/login.js
```

---

### 路徑 B：實作新功能（已有基礎）

**目標：親手完成一個完整的 SDD 循環**

#### Step 1：閱讀購物車規格 (10 分鐘)

```bash
code specs/cart.spec.md
```

#### Step 2：查看測試框架 (10 分鐘)

```bash
code tests/cart.test.js
```

注意到所有測試都標註了 `TODO`

#### Step 3：實作測試 (30-60 分鐘)

選擇一個場景，完成其測試：

```javascript
test('應該能將第一個商品加入空購物車', () => {
  const cart = createCart();
  const product = {
    id: 'prod_001',
    name: 'iPhone 15',
    price: 30000
  };
  
  cart.addItem(product, 1);
  
  // 完成這些斷言
  expect(cart.getItems()).toHaveLength(1);
  expect(cart.getTotalAmount()).toBe(30000);
  // ... 更多斷言
});
```

#### Step 4：執行測試（紅燈）

```bash
npm test tests/cart.test.js
```

測試應該失敗（這是正常的！）

#### Step 5：實作功能 (30-60 分鐘)

編輯 `src/cart.js`，實作 `createCart()` 和相關方法

#### Step 6：再次測試（綠燈）

```bash
npm test tests/cart.test.js
```

測試通過就成功了！

#### Step 7：重構

改善程式碼品質，但保持測試通過

---

## 🛠️ 常用命令

```bash
# 執行所有測試
npm test

# 只測試登入功能
npm test tests/login.test.js

# 只測試購物車功能
npm test tests/cart.test.js

# 監聽模式（開發時推薦）
npm run test:watch

# 測試覆蓋率報告
npm run test:coverage

# 程式碼檢查
npm run lint

# 自動修復格式問題
npm run lint:fix
```

---

## 📚 推薦學習順序

### 第 1 週：理解 SDD

- [ ] 完成路徑 A
- [ ] 閱讀主要大綱的模組 0 和模組 1
- [ ] 嘗試修改登入功能，加入新場景

### 第 2 週：實戰練習

- [ ] 完成路徑 B 的場景一到三
- [ ] 達到 60% 測試覆蓋率
- [ ] 學習使用 AI 輔助開發

### 第 3 週：完整實作

- [ ] 完成所有購物車測試
- [ ] 完成所有購物車實作
- [ ] 達到 90% 測試覆蓋率

### 第 4 週：進階應用

- [ ] 嘗試進階挑戰（優惠券、運費等）
- [ ] 重構並優化程式碼
- [ ] 撰寫自己的規格檔案

---

## 💡 學習技巧

### 1. 使用 Git 追蹤進度

```bash
# 初始化 Git（如果還沒有）
git init

# 提交你的改動
git add .
git commit -m "feat: 完成購物車場景一"
```

### 2. 善用 AI 輔助

當遇到困難時，可以：

```
請根據以下規格，幫我撰寫 Jest 測試：

[貼上規格場景]

要求：
1. 使用 describe 和 test 組織
2. 包含適當的斷言
3. 測試描述要清楚
```

### 3. 參考登入功能範例

當不確定如何實作時：
- 先看 `src/login.js` 如何處理類似情況
- 參考其測試結構
- 理解後再自己實作

### 4. 逐步完成

不要一次實作太多：
1. 先讓一個簡單測試通過
2. 再加入更多測試
3. 逐步完善功能

---

## ❓ 常見問題

### Q: 測試一直失敗怎麼辦？

A: 
1. 仔細閱讀錯誤訊息
2. 檢查是否有拼寫錯誤
3. 確認測試的預期值是否正確
4. 使用 `console.log()` 除錯

### Q: 不知道如何開始？

A: 
1. 從最簡單的場景開始
2. 參考登入功能的實作方式
3. 一次只專注一個函數
4. 先讓簡單的測試通過

### Q: 可以跳過某些測試嗎？

A: 
可以暫時跳過：
```javascript
test.skip('這個測試暫時跳過', () => {
  // ...
});
```
但最終要全部完成！

### Q: 測試覆蓋率要達到多少？

A: 
- 新手目標：60%
- 進階目標：80%
- 專業目標：90%+

---

## 🎉 完成里程碑

當你達成以下目標時，恭喜你！

### 🏆 初學者
- [ ] 理解 SDD 的基本流程
- [ ] 能看懂測試程式碼
- [ ] 完成第一個測試案例

### 🥈 進階者
- [ ] 獨立撰寫測試
- [ ] 實作通過測試的程式碼
- [ ] 測試覆蓋率 > 60%

### 🥇 專家
- [ ] 完成所有功能
- [ ] 測試覆蓋率 > 90%
- [ ] 程式碼品質優良
- [ ] 能自己設計新功能的規格

---

## 📞 需要幫助？

1. **查看文件**：`README.md` 和 `../開發大綱.md`
2. **參考範例**：登入功能是最好的學習範本
3. **使用 AI**：ChatGPT, Claude, GitHub Copilot
4. **社群討論**：與其他學習者交流

---

## 🚀 準備好了嗎？

選擇一個學習路徑，開始你的 SDD 之旅！

```bash
# 路徑 A：理解現有實作
code specs/login.spec.md

# 路徑 B：實作新功能
code specs/cart.spec.md
```

祝學習愉快！ 🎓
