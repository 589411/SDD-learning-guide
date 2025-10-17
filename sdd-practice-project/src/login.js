/**
 * 登入功能實作
 * 實作 specs/login.spec.md 中定義的登入功能
 */

// 模擬的使用者資料庫（實際專案中應該連接真實資料庫）
const MOCK_USERS = {
  'user@example.com': {
    id: 'user_001',
    email: 'user@example.com',
    name: '張三',
    role: 'member',
    // 實際應該是 bcrypt hash，這裡簡化處理
    passwordHash: 'SecurePass123!'
  },
  'admin@example.com': {
    id: 'admin_001',
    email: 'admin@example.com',
    name: '系統管理員',
    role: 'admin',
    passwordHash: 'AdminPass123!'
  },
  'locked@example.com': {
    id: 'user_002',
    email: 'locked@example.com',
    name: '鎖定用戶',
    role: 'member',
    passwordHash: 'SecurePass123!',
    locked: true,
    unlockAt: new Date(Date.now() + 30 * 60 * 1000) // 30分鐘後解鎖
  }
};

/**
 * Email 格式驗證
 * @param {string} email - Email 地址
 * @returns {boolean} 是否為有效的 Email 格式
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * 驗證登入輸入資料
 * @param {Object} input - 登入輸入資料
 * @param {string} input.email - Email 帳號
 * @param {string} input.password - 密碼
 * @returns {Object} 驗證結果
 */
function validateLoginInput(input) {
  // 處理 null 或 undefined
  if (!input || typeof input !== 'object') {
    return {
      valid: false,
      errors: {
        email: '請輸入帳號',
        password: '請輸入密碼'
      }
    };
  }

  const errors = {};

  // 驗證 email
  if (!input.email || input.email.trim() === '') {
    errors.email = '請輸入帳號';
  } else if (!isValidEmail(input.email.trim())) {
    errors.email = '請輸入有效的 Email 格式';
  } else if (input.email.trim().length > 255) {
    errors.email = 'Email 長度不可超過 255 個字元';
  }

  // 驗證 password
  if (!input.password || input.password.trim() === '') {
    errors.password = '請輸入密碼';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}

/**
 * 生成 JWT Token（簡化版，實際應使用 jsonwebtoken 套件）
 * @param {Object} user - 使用者資料
 * @param {number} expiresIn - Token 有效期（秒）
 * @returns {string} JWT token
 */
function generateToken(user, expiresIn) {
  // 實際專案中應使用 jsonwebtoken 套件
  // 這裡簡化為 Base64 編碼的假 token
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64');
  const payload = Buffer.from(JSON.stringify({
    userId: user.id,
    email: user.email,
    role: user.role,
    exp: Math.floor(Date.now() / 1000) + expiresIn
  })).toString('base64');
  const signature = Buffer.from('fake-signature').toString('base64');
  
  return `${header}.${payload}.${signature}`;
}

/**
 * 清理和標準化 Email
 * @param {string} email - 原始 Email
 * @returns {string} 清理後的 Email（小寫、去除空白）
 */
function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

/**
 * 驗證密碼
 * @param {string} inputPassword - 輸入的密碼
 * @param {string} storedPassword - 儲存的密碼（實際應為 hash）
 * @returns {boolean} 密碼是否正確
 */
function verifyPassword(inputPassword, storedPassword) {
  // 實際專案中應使用 bcrypt.compare()
  // 這裡簡化為直接比對
  return inputPassword === storedPassword;
}

/**
 * 檢查帳號是否被鎖定
 * @param {Object} user - 使用者資料
 * @returns {boolean} 是否被鎖定
 */
function isAccountLocked(user) {
  if (!user.locked) {
    return false;
  }
  
  // 檢查是否已過解鎖時間
  if (user.unlockAt && new Date() > user.unlockAt) {
    return false;
  }
  
  return true;
}

/**
 * 登入函數
 * @param {Object} credentials - 登入憑證
 * @param {string} credentials.email - Email 帳號
 * @param {string} credentials.password - 密碼
 * @param {boolean} [credentials.rememberMe=false] - 是否記住登入狀態
 * @returns {Object} 登入結果
 */
function login(credentials) {
  try {
    // 1. 驗證輸入
    const validation = validateLoginInput(credentials);
    if (!validation.valid) {
      return {
        success: false,
        message: '請輸入帳號和密碼',
        code: 'INVALID_INPUT',
        errors: validation.errors
      };
    }

    // 2. 清理和標準化 email
    const email = normalizeEmail(credentials.email);
    const password = credentials.password;

    // 3. 查找使用者
    const user = MOCK_USERS[email];

    // 4. 檢查帳號是否存在（但不在錯誤訊息中透露）
    if (!user) {
      // 為了防止帳號枚舉攻擊，返回相同的錯誤訊息
      return {
        success: false,
        message: '帳號或密碼不正確',
        code: 'AUTH_FAILED'
      };
    }

    // 5. 檢查帳號是否被鎖定
    if (isAccountLocked(user)) {
      return {
        success: false,
        message: '帳號已被暫時鎖定，請 30 分鐘後再試',
        code: 'ACCOUNT_LOCKED',
        unlockAt: user.unlockAt
      };
    }

    // 6. 驗證密碼
    if (!verifyPassword(password, user.passwordHash)) {
      // 密碼錯誤，返回相同的錯誤訊息（不透露是密碼錯誤）
      return {
        success: false,
        message: '帳號或密碼不正確',
        code: 'AUTH_FAILED'
      };
    }

    // 7. 登入成功，生成 token
    const rememberMe = credentials.rememberMe || false;
    const expiresIn = rememberMe 
      ? 30 * 24 * 60 * 60  // 30 天
      : 24 * 60 * 60;       // 24 小時

    const token = generateToken(user, expiresIn);

    // 8. 返回成功結果（不包含密碼等敏感資訊）
    return {
      success: true,
      message: '登入成功',
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        },
        token: token,
        expiresIn: expiresIn
      }
    };

  } catch (error) {
    // 捕獲任何未預期的錯誤，但不洩露詳細資訊
    console.error('Login error:', error);
    return {
      success: false,
      message: '系統錯誤，請稍後再試',
      code: 'SYSTEM_ERROR'
    };
  }
}

/**
 * 登出函數（預留）
 * @param {string} token - 要失效的 token
 * @returns {Object} 登出結果
 */
function logout(token) {
  // 實際實作中應該：
  // 1. 將 token 加入黑名單
  // 2. 清除 session
  // 3. 記錄登出日誌
  return {
    success: true,
    message: '登出成功'
  };
}

/**
 * 驗證 Token（預留）
 * @param {string} token - JWT token
 * @returns {Object} 驗證結果
 */
function verifyToken(token) {
  // 實際實作中應該：
  // 1. 驗證 token 簽章
  // 2. 檢查是否過期
  // 3. 檢查是否在黑名單中
  try {
    // 簡化版：解析 payload
    const parts = token.split('.');
    if (parts.length !== 3) {
      return { valid: false, message: 'Invalid token format' };
    }

    const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
    const now = Math.floor(Date.now() / 1000);

    if (payload.exp < now) {
      return { valid: false, message: 'Token expired' };
    }

    return {
      valid: true,
      data: {
        userId: payload.userId,
        email: payload.email,
        role: payload.role
      }
    };
  } catch (error) {
    return { valid: false, message: 'Invalid token' };
  }
}

// 匯出函數供測試和其他模組使用
module.exports = {
  login,
  logout,
  validateLoginInput,
  verifyToken,
  // 以下為輔助函數，通常不需要匯出，這裡為了教學目的匯出
  isValidEmail,
  normalizeEmail,
  verifyPassword,
  generateToken,
  isAccountLocked
};
