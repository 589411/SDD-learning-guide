/**
 * 購物車功能實作（練習專案）
 * 
 * 📝 練習任務：
 * 1. 根據 specs/cart.spec.md 和 tests/cart.test.js 實作功能
 * 2. 讓所有測試通過
 * 3. 程式碼要清晰易讀
 * 4. 適當的錯誤處理
 * 5. 遵循 Clean Code 原則
 * 
 * 💡 開發流程：
 * 1. 先看規格理解需求
 * 2. 看測試了解預期行為
 * 3. 實作功能讓測試通過
 * 4. 重構改善程式碼
 */

/**
 * 建立新的購物車
 * @returns {Object} 購物車物件
 */
function createCart() {
  // TODO: 實作購物車建立邏輯
  // 提示：購物車應該包含：
  // - items: 商品陣列
  // - 各種操作方法 (addItem, removeItem, etc.)
  
  const items = [];
  
  return {
    // TODO: 實作 addItem 方法
    addItem(product, quantity) {
      // 實作加入商品的邏輯
      throw new Error('addItem not implemented');
    },
    
    // TODO: 實作 removeItem 方法
    removeItem(productId) {
      // 實作移除商品的邏輯
      throw new Error('removeItem not implemented');
    },
    
    // TODO: 實作 updateQuantity 方法
    updateQuantity(productId, quantity) {
      // 實作更新數量的邏輯
      throw new Error('updateQuantity not implemented');
    },
    
    // TODO: 實作 clear 方法
    clear() {
      // 實作清空購物車的邏輯
      throw new Error('clear not implemented');
    },
    
    // TODO: 實作 getItems 方法
    getItems() {
      // 返回所有商品（建議返回副本而非引用）
      throw new Error('getItems not implemented');
    },
    
    // TODO: 實作 getTotalAmount 方法
    getTotalAmount() {
      // 計算並返回總金額
      throw new Error('getTotalAmount not implemented');
    },
    
    // TODO: 實作 getTotalItems 方法
    getTotalItems() {
      // 計算並返回商品總數
      throw new Error('getTotalItems not implemented');
    },
    
    // TODO: 實作 isEmpty 方法
    isEmpty() {
      // 檢查購物車是否為空
      throw new Error('isEmpty not implemented');
    }
  };
}

/**
 * 計算商品小計
 * @param {number} price - 單價
 * @param {number} quantity - 數量
 * @returns {number} 小計金額
 */
function calculateSubtotal(price, quantity) {
  // TODO: 實作小計計算
  throw new Error('calculateSubtotal not implemented');
}

/**
 * 驗證商品數量
 * @param {number} quantity - 數量
 * @returns {Object} 驗證結果 { valid: boolean, error: string }
 */
function validateQuantity(quantity) {
  // TODO: 實作數量驗證
  // 檢查：
  // 1. 是否為數字
  // 2. 是否為正整數
  // 3. 是否在合理範圍內
  throw new Error('validateQuantity not implemented');
}

/**
 * 驗證商品資訊
 * @param {Object} product - 商品物件
 * @returns {Object} 驗證結果 { valid: boolean, error: string }
 */
function validateProduct(product) {
  // TODO: 實作商品資訊驗證
  // 檢查：
  // 1. 是否有 id
  // 2. 是否有 name
  // 3. 是否有 price
  // 4. price 是否為有效數字
  throw new Error('validateProduct not implemented');
}

// 匯出函數
module.exports = {
  createCart,
  calculateSubtotal,
  validateQuantity,
  validateProduct
};

// 📝 實作提示：
// 
// 1. addItem() 實作重點：
//    - 檢查商品是否已存在
//    - 如果存在：累加數量
//    - 如果不存在：新增商品項目
//    - 驗證輸入
//    - 計算小計
// 
// 2. removeItem() 實作重點：
//    - 找到要移除的商品
//    - 從 items 陣列中移除
//    - 如果商品不存在，拋出錯誤
// 
// 3. updateQuantity() 實作重點：
//    - 驗證數量
//    - 如果數量為 0，呼叫 removeItem
//    - 如果數量 > 0，更新數量和小計
//    - 重新計算總金額
// 
// 4. getTotalAmount() 實作重點：
//    - 遍歷所有商品
//    - 累加每個商品的小計
//    - 返回總金額
// 
// 5. getTotalItems() 實作重點：
//    - 遍歷所有商品
//    - 累加每個商品的數量
//    - 返回總數量
// 
// 6. getItems() 實作重點：
//    - 返回商品陣列的副本（深拷貝）
//    - 避免外部直接修改內部資料
// 
// 7. 錯誤處理：
//    - 使用 throw new Error() 拋出有意義的錯誤訊息
//    - 在測試中用 expect().toThrow() 捕獲
// 
// 8. 資料結構建議：
//    items = [
//      {
//        id: 'prod_001',
//        name: 'iPhone 15',
//        price: 30000,
//        quantity: 2,
//        subtotal: 60000
//      }
//    ]

// 💡 開發步驟建議：
// 
// Step 1: 實作最簡單的功能
//    - createCart() 返回空購物車
//    - getItems() 返回空陣列
//    - isEmpty() 返回 true
// 
// Step 2: 實作 addItem()
//    - 先處理加入第一個商品的情況
//    - 再處理加入相同商品的情況
//    - 最後處理驗證和錯誤
// 
// Step 3: 實作計算功能
//    - calculateSubtotal()
//    - getTotalAmount()
//    - getTotalItems()
// 
// Step 4: 實作其他功能
//    - removeItem()
//    - updateQuantity()
//    - clear()
// 
// Step 5: 強化驗證
//    - validateQuantity()
//    - validateProduct()
//    - 各種邊界情況處理
// 
// Step 6: 重構
//    - 提取重複的程式碼
//    - 改善命名
//    - 增加註解
//    - 確保測試仍然通過

// 🎯 完成檢查清單：
// - [ ] 所有函數都已實作
// - [ ] 所有測試都通過
// - [ ] 沒有 throw new Error('not implemented')
// - [ ] 程式碼有適當的註解
// - [ ] 變數命名清楚易懂
// - [ ] 沒有重複的程式碼
// - [ ] 適當的錯誤處理
// - [ ] 測試覆蓋率 > 90%
