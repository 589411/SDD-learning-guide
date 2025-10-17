/**
 * 登入功能測試
 * 根據 specs/login.spec.md 規格撰寫
 */

const { login, validateLoginInput } = require('../src/login');

describe('登入功能測試', () => {
  
  // ✅ 場景一：成功登入
  describe('成功登入場景', () => {
    test('應該能使用正確的帳號密碼成功登入', () => {
      // Arrange: 準備測試資料
      const credentials = {
        email: 'user@example.com',
        password: 'SecurePass123!',
        rememberMe: false
      };

      // Act: 執行登入
      const result = login(credentials);

      // Assert: 驗證結果
      expect(result.success).toBe(true);
      expect(result.message).toBe('登入成功');
      expect(result.data).toBeDefined();
      expect(result.data.user).toMatchObject({
        email: 'user@example.com',
        name: expect.any(String),
        role: expect.any(String)
      });
      expect(result.data.token).toBeDefined();
      expect(typeof result.data.token).toBe('string');
      expect(result.data.expiresIn).toBe(86400); // 24 小時
    });

    test('登入成功時應該返回使用者完整資訊', () => {
      const result = login({
        email: 'user@example.com',
        password: 'SecurePass123!'
      });

      expect(result.data.user).toHaveProperty('id');
      expect(result.data.user).toHaveProperty('email');
      expect(result.data.user).toHaveProperty('name');
      expect(result.data.user).toHaveProperty('role');
    });

    test('登入成功時應該生成有效的 JWT token', () => {
      const result = login({
        email: 'user@example.com',
        password: 'SecurePass123!'
      });

      // 簡單驗證 JWT 格式 (header.payload.signature)
      const tokenParts = result.data.token.split('.');
      expect(tokenParts).toHaveLength(3);
    });
  });

  // ❌ 場景二：密碼錯誤
  describe('密碼錯誤場景', () => {
    test('密碼錯誤時應該登入失敗', () => {
      const result = login({
        email: 'user@example.com',
        password: 'wrongpassword'
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('帳號或密碼不正確');
      expect(result.data).toBeUndefined();
    });

    test('錯誤訊息不應該透露具體是哪個欄位錯誤', () => {
      const result = login({
        email: 'user@example.com',
        password: 'wrongpassword'
      });

      // 不應該有 "密碼錯誤" 這種明確訊息
      expect(result.message).not.toContain('密碼');
      expect(result.message).toBe('帳號或密碼不正確');
    });

    test('密碼錯誤時不應該返回使用者資訊', () => {
      const result = login({
        email: 'user@example.com',
        password: 'wrongpassword'
      });

      expect(result.data).toBeUndefined();
    });
  });

  // ⚠️ 場景三：帳號不存在
  describe('帳號不存在場景', () => {
    test('帳號不存在時應該登入失敗', () => {
      const result = login({
        email: 'notexist@example.com',
        password: 'anypassword'
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('帳號或密碼不正確');
    });

    test('帳號不存在的錯誤訊息應該與密碼錯誤相同（防止帳號枚舉）', () => {
      const wrongPasswordResult = login({
        email: 'user@example.com',
        password: 'wrongpassword'
      });

      const notExistResult = login({
        email: 'notexist@example.com',
        password: 'anypassword'
      });

      // 兩種錯誤的訊息應該完全相同
      expect(notExistResult.message).toBe(wrongPasswordResult.message);
      expect(notExistResult.success).toBe(wrongPasswordResult.success);
    });
  });

  // 📭 場景四：空白欄位驗證
  describe('輸入驗證場景', () => {
    test('帳號為空時應該返回驗證錯誤', () => {
      const result = validateLoginInput({
        email: '',
        password: 'password123'
      });

      expect(result.valid).toBe(false);
      expect(result.errors.email).toBe('請輸入帳號');
    });

    test('密碼為空時應該返回驗證錯誤', () => {
      const result = validateLoginInput({
        email: 'user@example.com',
        password: ''
      });

      expect(result.valid).toBe(false);
      expect(result.errors.password).toBe('請輸入密碼');
    });

    test('帳號和密碼都為空時應該返回兩個錯誤', () => {
      const result = validateLoginInput({
        email: '',
        password: ''
      });

      expect(result.valid).toBe(false);
      expect(result.errors.email).toBe('請輸入帳號');
      expect(result.errors.password).toBe('請輸入密碼');
    });

    test('帳號格式不正確時應該返回驗證錯誤', () => {
      const result = validateLoginInput({
        email: 'not-an-email',
        password: 'password123'
      });

      expect(result.valid).toBe(false);
      expect(result.errors.email).toBe('請輸入有效的 Email 格式');
    });

    test('輸入有效時應該通過驗證', () => {
      const result = validateLoginInput({
        email: 'user@example.com',
        password: 'password123'
      });

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual({});
    });

    test('Email 應該不區分大小寫', () => {
      const result1 = login({
        email: 'USER@EXAMPLE.COM',
        password: 'SecurePass123!'
      });

      const result2 = login({
        email: 'user@example.com',
        password: 'SecurePass123!'
      });

      expect(result1.success).toBe(result2.success);
    });

    test('Email 前後空白應該被自動去除', () => {
      const result = login({
        email: '  user@example.com  ',
        password: 'SecurePass123!'
      });

      expect(result.success).toBe(true);
    });
  });

  // 🔒 場景五：帳號已被鎖定
  describe('帳號鎖定場景', () => {
    test('鎖定的帳號應該無法登入', () => {
      const result = login({
        email: 'locked@example.com',
        password: 'SecurePass123!'
      });

      expect(result.success).toBe(false);
      expect(result.code).toBe('ACCOUNT_LOCKED');
      expect(result.message).toContain('帳號已被暫時鎖定');
      expect(result.message).toContain('30 分鐘');
    });

    test('即使密碼正確，鎖定的帳號也無法登入', () => {
      // 假設 locked@example.com 的正確密碼是 SecurePass123!
      const result = login({
        email: 'locked@example.com',
        password: 'SecurePass123!'
      });

      expect(result.success).toBe(false);
      expect(result.code).toBe('ACCOUNT_LOCKED');
    });
  });

  // 📱 場景六：記住我功能
  describe('記住我功能場景', () => {
    test('勾選記住我時應該返回較長的 token 有效期', () => {
      const result = login({
        email: 'user@example.com',
        password: 'SecurePass123!',
        rememberMe: true
      });

      expect(result.success).toBe(true);
      // 30 天 = 30 * 24 * 60 * 60 = 2592000 秒
      expect(result.data.expiresIn).toBe(2592000);
    });

    test('不勾選記住我時應該使用標準 token 有效期', () => {
      const result = login({
        email: 'user@example.com',
        password: 'SecurePass123!',
        rememberMe: false
      });

      expect(result.success).toBe(true);
      // 24 小時 = 86400 秒
      expect(result.data.expiresIn).toBe(86400);
    });

    test('預設情況（未指定 rememberMe）應該使用標準有效期', () => {
      const result = login({
        email: 'user@example.com',
        password: 'SecurePass123!'
        // 沒有 rememberMe 欄位
      });

      expect(result.success).toBe(true);
      expect(result.data.expiresIn).toBe(86400);
    });
  });

  // 🔐 安全性測試
  describe('安全性測試', () => {
    test('不應該在錯誤訊息中洩露敏感資訊', () => {
      const result = login({
        email: 'test@example.com',
        password: 'wrongpassword'
      });

      // 錯誤訊息不應包含資料庫錯誤、堆疊追蹤等
      expect(result.message).not.toContain('database');
      expect(result.message).not.toContain('error');
      expect(result.message).not.toContain('SQL');
      expect(result.stack).toBeUndefined();
    });

    test('密碼不應該出現在返回的資料中', () => {
      const result = login({
        email: 'user@example.com',
        password: 'SecurePass123!'
      });

      const resultString = JSON.stringify(result);
      expect(resultString).not.toContain('SecurePass123!');
      expect(resultString).not.toContain('password');
    });

    test('特殊字元應該被正確處理（防 SQL Injection）', () => {
      const result = login({
        email: "admin' OR '1'='1",
        password: "' OR '1'='1"
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('帳號或密碼不正確');
    });

    test('XSS 攻擊字串應該被正確處理', () => {
      const result = login({
        email: '<script>alert("xss")</script>@example.com',
        password: 'password'
      });

      expect(result.success).toBe(false);
      // 確保返回的訊息不包含未轉義的 script 標籤
      if (result.message) {
        expect(result.message).not.toContain('<script>');
      }
    });
  });

  // 📊 邊界值測試
  describe('邊界值測試', () => {
    test('超長的 Email 應該被拒絕', () => {
      const longEmail = 'a'.repeat(300) + '@example.com';
      const result = validateLoginInput({
        email: longEmail,
        password: 'password123'
      });

      expect(result.valid).toBe(false);
    });

    test('超長的密碼應該被處理（不應該造成系統錯誤）', () => {
      const longPassword = 'a'.repeat(10000);
      
      // 不應該拋出錯誤
      expect(() => {
        login({
          email: 'user@example.com',
          password: longPassword
        });
      }).not.toThrow();
    });

    test('空物件輸入應該被正確處理', () => {
      const result = validateLoginInput({});

      expect(result.valid).toBe(false);
      expect(result.errors.email).toBeDefined();
      expect(result.errors.password).toBeDefined();
    });

    test('null 或 undefined 輸入應該被正確處理', () => {
      expect(() => {
        validateLoginInput(null);
      }).not.toThrow();

      expect(() => {
        validateLoginInput(undefined);
      }).not.toThrow();
    });
  });

  // 🎭 不同使用者角色測試
  describe('使用者角色測試', () => {
    test('一般會員登入應該返回 member 角色', () => {
      const result = login({
        email: 'user@example.com',
        password: 'SecurePass123!'
      });

      expect(result.success).toBe(true);
      expect(result.data.user.role).toBe('member');
    });

    test('管理員登入應該返回 admin 角色', () => {
      const result = login({
        email: 'admin@example.com',
        password: 'AdminPass123!'
      });

      expect(result.success).toBe(true);
      expect(result.data.user.role).toBe('admin');
    });
  });
});

// 整合測試：完整的登入流程
describe('登入完整流程整合測試', () => {
  test('應該能完成完整的登入流程', () => {
    // 1. 驗證輸入
    const validation = validateLoginInput({
      email: 'user@example.com',
      password: 'SecurePass123!'
    });
    expect(validation.valid).toBe(true);

    // 2. 執行登入
    const loginResult = login({
      email: 'user@example.com',
      password: 'SecurePass123!'
    });
    expect(loginResult.success).toBe(true);

    // 3. 驗證返回的資料結構完整
    expect(loginResult).toMatchObject({
      success: true,
      message: expect.any(String),
      data: {
        user: {
          id: expect.any(String),
          email: expect.any(String),
          name: expect.any(String),
          role: expect.any(String)
        },
        token: expect.any(String),
        expiresIn: expect.any(Number)
      }
    });
  });

  test('錯誤流程：輸入驗證失敗 → 登入失敗', () => {
    // 1. 輸入驗證應該失敗
    const validation = validateLoginInput({
      email: 'invalid-email',
      password: ''
    });
    expect(validation.valid).toBe(false);

    // 2. 即使嘗試登入，也應該失敗
    const loginResult = login({
      email: 'invalid-email',
      password: ''
    });
    expect(loginResult.success).toBe(false);
  });
});
