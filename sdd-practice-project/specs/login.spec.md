# 登入功能規格

## 功能概述

本規格定義網站會員的登入功能，包含帳號密碼驗證、登入狀態管理、安全機制等完整流程。

## 使用者故事 (User Story)

### US-001: 基本登入功能

**身為**一個網站會員，  
**我想要**透過帳號密碼登入，  
**以便於**存取我的個人資料和使用會員專屬功能。

**商業價值：** 保護會員隱私，提供個人化服務  
**優先級：** 🔴 高（核心功能）  
**預估工時：** 8 小時

---

## 驗收條件 (Acceptance Criteria)

### ✅ 場景一：成功登入

```gherkin
Given 我是一個已註冊會員
  And 我的帳號是 "user@example.com"
  And 我的密碼是 "SecurePass123!"
  And 我在登入頁面 "/login"
When 我在帳號欄位輸入 "user@example.com"
  And 我在密碼欄位輸入 "SecurePass123!"
  And 我點擊「登入」按鈕
Then 我應該成功登入
  And 系統應該返回成功訊息 "登入成功"
  And 系統應該返回我的使用者資訊
  And 系統應該設定 authentication token
  And token 有效期限應該是 24 小時
```

**驗證重點：**
- 使用正確的帳號和密碼能成功登入
- 返回適當的成功訊息和使用者資料
- 生成有效的身份驗證 token

---

### ❌ 場景二：密碼錯誤

```gherkin
Given 我是一個已註冊會員，帳號是 "user@example.com"
  And 我在登入頁面
When 我輸入帳號 "user@example.com"
  And 我輸入錯誤密碼 "wrongpassword"
  And 我點擊「登入」按鈕
Then 登入應該失敗
  And 我應該看到錯誤訊息 "帳號或密碼不正確"
  And 系統不應該返回使用者資訊
  And 系統不應該設定 token
```

**驗證重點：**
- 密碼錯誤時登入失敗
- 錯誤訊息要清楚但不透露具體錯誤原因（安全考量）
- 不洩漏帳號是否存在的資訊

---

### ⚠️ 場景三：帳號不存在

```gherkin
Given 我在登入頁面
When 我輸入一個不存在的帳號 "notexist@example.com"
  And 我輸入任意密碼 "anypassword"
  And 我點擊「登入」按鈕
Then 登入應該失敗
  And 我應該看到相同的錯誤訊息 "帳號或密碼不正確"
  And 系統不應該透露該帳號是否存在（安全考量）
```

**驗證重點：**
- 帳號不存在時的錯誤訊息與密碼錯誤相同
- 防止帳號枚舉攻擊

---

### 📭 場景四：空白欄位驗證

```gherkin
Given 我在登入頁面
When 我將帳號欄位留空
  And 我輸入密碼 "password123"
  And 我點擊「登入」按鈕
Then 登入應該失敗
  And 我應該看到錯誤訊息 "請輸入帳號"

Given 我在登入頁面
When 我輸入帳號 "user@example.com"
  And 我將密碼欄位留空
  And 我點擊「登入」按鈕
Then 登入應該失敗
  And 我應該看到錯誤訊息 "請輸入密碼"

Given 我在登入頁面
When 我將帳號和密碼欄位都留空
  And 我點擊「登入」按鈕
Then 登入應該失敗
  And 我應該看到錯誤訊息 "請輸入帳號和密碼"
```

**驗證重點：**
- 輸入驗證在前端和後端都要執行
- 錯誤訊息要明確指出哪個欄位有問題

---

### 🔒 場景五：帳號已被鎖定

```gherkin
Given 我的帳號 "locked@example.com" 因為連續 5 次登入失敗而被鎖定
When 我輸入正確的帳號和密碼
  And 我點擊「登入」按鈕
Then 登入應該失敗
  And 我應該看到錯誤訊息 "帳號已被暫時鎖定，請 30 分鐘後再試"
  And 我不應該被允許登入
```

**驗證重點：**
- 防止暴力破解攻擊
- 鎖定機制要有時間限制
- 錯誤訊息要告知解鎖時間

---

### 📱 場景六：記住我功能

```gherkin
Given 我在登入頁面
When 我輸入正確的帳號密碼
  And 我勾選「記住我」選項
  And 我點擊登入
Then 系統應該設定 refresh token（有效期 30 天）
  And 下次我開啟網站時應該自動登入
  And 不需要重新輸入帳號密碼

Given 我沒有勾選「記住我」選項
When 我成功登入
Then 系統只設定 session token（關閉瀏覽器後失效）
  And 下次開啟網站時需要重新登入
```

**驗證重點：**
- 「記住我」功能要使用 refresh token
- 不勾選時使用 session token
- Token 過期機制要正確實作

---

## 技術規格

### API 端點

```
POST /api/auth/login
```

### 請求格式

```json
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "rememberMe": false
}
```

### 成功回應 (200 OK)

```json
{
  "success": true,
  "message": "登入成功",
  "data": {
    "user": {
      "id": "user_123",
      "email": "user@example.com",
      "name": "張三",
      "role": "member"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": 86400
  }
}
```

### 錯誤回應 (401 Unauthorized)

```json
{
  "success": false,
  "message": "帳號或密碼不正確",
  "code": "AUTH_FAILED"
}
```

### 錯誤回應 (423 Locked)

```json
{
  "success": false,
  "message": "帳號已被暫時鎖定，請 30 分鐘後再試",
  "code": "ACCOUNT_LOCKED",
  "unlockAt": "2024-01-01T12:30:00Z"
}
```

### 錯誤回應 (400 Bad Request)

```json
{
  "success": false,
  "message": "請輸入帳號和密碼",
  "code": "INVALID_INPUT",
  "errors": {
    "email": "請輸入帳號",
    "password": "請輸入密碼"
  }
}
```

---

## 資料驗證規則

### Email 格式
- 必須符合標準 Email 格式
- 不區分大小寫
- 前後空白要自動去除

### 密碼規則（註冊時）
- 最小長度：8 個字元
- 必須包含：至少一個大寫字母、一個小寫字母、一個數字
- 建議包含：特殊符號 (!@#$%^&*)

### Token 管理
- **Access Token**: JWT 格式，有效期 24 小時
- **Refresh Token**: 有效期 30 天（僅在勾選記住我時發放）
- Token 儲存在 HTTP-only Cookie 中（防 XSS）

---

## 安全機制

### 1. 密碼處理
- ✅ 使用 bcrypt 加密儲存
- ✅ Salt rounds: 10
- ✅ 前端不做密碼強度驗證（避免洩露規則）

### 2. 登入失敗限制
- ✅ 連續 3 次失敗：要求 CAPTCHA 驗證
- ✅ 連續 5 次失敗：鎖定帳號 30 分鐘
- ✅ 計數器在成功登入後重置

### 3. 防止暴力破解
- ✅ IP 限制：同 IP 每分鐘最多 10 次登入嘗試
- ✅ 帳號限制：同帳號每分鐘最多 5 次嘗試

### 4. Session 管理
- ✅ 閒置 30 分鐘自動登出
- ✅ 登出時清除所有 token
- ✅ 支援多裝置同時登入

---

## 非功能需求

### 效能
- 登入 API 回應時間：< 500ms (P95)
- 支援併發：1000 req/s

### 可用性
- 服務可用性：99.9%
- 錯誤訊息要清楚易懂

### 相容性
- 支援主流瀏覽器：Chrome, Firefox, Safari, Edge
- 支援行動裝置

### 可維護性
- 完整的日誌記錄
- 所有登入嘗試都要記錄（成功/失敗）

---

## 測試檢查清單

- [ ] 成功登入場景
- [ ] 密碼錯誤場景
- [ ] 帳號不存在場景
- [ ] 空白欄位驗證
- [ ] Email 格式驗證
- [ ] 帳號鎖定機制
- [ ] 記住我功能
- [ ] Token 過期處理
- [ ] 併發登入測試
- [ ] 效能測試
- [ ] 安全性測試（OWASP）

---

## 變更歷史

| 版本 | 日期 | 變更內容 | 作者 |
|------|------|---------|------|
| 1.0 | 2024-01-01 | 初始版本 | 開發團隊 |
| 1.1 | 2024-01-15 | 新增記住我功能 | 開發團隊 |
| 1.2 | 2024-02-01 | 強化安全機制 | 資安團隊 |
