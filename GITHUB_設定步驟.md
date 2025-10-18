# 🚀 GitHub Pages 設定步驟

## ✅ 已完成

- ✅ 代碼已上傳到 GitHub
- ✅ `docs/` 目錄已建立（30 個文件）
- ✅ GitHub Actions 自動部署已配置
- ✅ MkDocs 配置完成

---

## 📋 GitHub 設定步驟（必須執行）

### 步驟 1：前往 GitHub Repository

```
https://github.com/589411/SDD-learning-guide
```

或直接點擊：
```bash
open https://github.com/589411/SDD-learning-guide
```

---

### 步驟 2：進入 Settings

1. 點擊 Repository 頂部的 **Settings** 標籤
2. 在左側選單找到 **Pages**

或直接訪問：
```
https://github.com/589411/SDD-learning-guide/settings/pages
```

---

### 步驟 3：設定 GitHub Pages

#### 選項 A：使用 GitHub Actions（推薦）⭐

1. **Source** 選擇：**GitHub Actions**
2. 系統會自動偵測到 `.github/workflows/deploy-docs.yml`
3. 點擊 **Configure** 或直接使用現有配置

**優點：**
- ✅ 自動部署（每次 push 都會自動更新）
- ✅ 更快的構建速度
- ✅ 更好的錯誤提示

#### 選項 B：使用 gh-pages 分支

1. **Source** 選擇：**Deploy from a branch**
2. **Branch** 選擇：**gh-pages**
3. **Folder** 選擇：**/ (root)**
4. 點擊 **Save**

**注意：** 需要先執行 `./deploy-pages.sh` 創建 gh-pages 分支

---

### 步驟 4：等待部署完成

#### 如果使用 GitHub Actions：

1. 前往 **Actions** 標籤
   ```
   https://github.com/589411/SDD-learning-guide/actions
   ```

2. 查看最新的 workflow 執行狀態
   - 🟡 黃色圓圈：正在執行
   - ✅ 綠色勾勾：部署成功
   - ❌ 紅色叉叉：部署失敗

3. 等待 2-5 分鐘

#### 如果使用 gh-pages 分支：

1. 執行部署腳本：
   ```bash
   ./deploy-pages.sh
   ```

2. 等待 2-5 分鐘

---

### 步驟 5：訪問你的網站

部署成功後，網站會在：

```
https://589411.github.io/SDD-learning-guide/
```

**直接打開：**
```bash
open https://589411.github.io/SDD-learning-guide/
```

---

## 🔧 詳細設定說明

### GitHub Actions 設定（推薦）

**已配置文件：** `.github/workflows/deploy-docs.yml`

**工作流程：**
```
1. 你 push 代碼到 main 分支
   ↓
2. GitHub Actions 自動觸發
   ↓
3. 安裝 Python 和依賴
   ↓
4. 執行 mkdocs build
   ↓
5. 部署到 GitHub Pages
   ↓
6. 網站自動更新
```

**優點：**
- ✅ 完全自動化
- ✅ 每次 push 都會更新
- ✅ 無需手動執行命令
- ✅ 有詳細的執行日誌

**設定步驟：**

1. **進入 Settings > Pages**
   ```
   https://github.com/589411/SDD-learning-guide/settings/pages
   ```

2. **Source 選擇 "GitHub Actions"**
   
   ![GitHub Actions](https://docs.github.com/assets/cb-47267/mw-1440/images/help/pages/pages-source-github-actions.webp)

3. **完成！** 🎉

---

### gh-pages 分支設定（手動）

**適合：** 想要手動控制部署時機

**設定步驟：**

1. **首次部署（創建 gh-pages 分支）**
   ```bash
   ./deploy-pages.sh
   ```

2. **進入 Settings > Pages**
   ```
   https://github.com/589411/SDD-learning-guide/settings/pages
   ```

3. **設定 Source**
   - Source: **Deploy from a branch**
   - Branch: **gh-pages**
   - Folder: **/ (root)**
   - 點擊 **Save**

4. **每次更新內容後**
   ```bash
   # 修改內容
   vim 模組內容/模組0.md
   
   # 同步到 docs/
   ./setup-docs.sh
   
   # 提交變更
   git add .
   git commit -m "Update content"
   git push origin main
   
   # 部署
   ./deploy-pages.sh
   ```

---

## 📊 設定檢查清單

### 在 GitHub 上檢查

- [ ] Repository 存在：`https://github.com/589411/SDD-learning-guide`
- [ ] Settings > Pages 已設定
- [ ] Source 已選擇（GitHub Actions 或 gh-pages）
- [ ] 如果使用 Actions，workflow 執行成功
- [ ] 網站可以訪問：`https://589411.github.io/SDD-learning-guide/`

### 在本地檢查

- [ ] `docs/` 目錄存在且有內容
- [ ] `mkdocs.yml` 配置正確
- [ ] `.github/workflows/deploy-docs.yml` 存在
- [ ] 可以本地預覽：`mkdocs serve`

---

## 🐛 常見問題

### 問題 1：網站顯示 404

**可能原因：**
1. GitHub Pages 還沒啟用
2. 部署還在進行中
3. 設定錯誤

**解決方案：**

1. **檢查 Settings > Pages**
   - 確認已選擇 Source
   - 確認顯示綠色的網址

2. **檢查 Actions**（如果使用 GitHub Actions）
   ```
   https://github.com/589411/SDD-learning-guide/actions
   ```
   - 確認最新的 workflow 成功執行
   - 如果失敗，查看錯誤訊息

3. **等待幾分鐘**
   - 首次部署可能需要 5-10 分鐘

4. **清除瀏覽器快取**
   ```
   Cmd + Shift + R (macOS)
   Ctrl + Shift + R (Windows)
   ```

---

### 問題 2：Actions 執行失敗

**查看錯誤：**
```
https://github.com/589411/SDD-learning-guide/actions
```

**常見錯誤：**

1. **Python 依賴安裝失敗**
   - 檢查 `requirements.txt`
   - 確認所有套件名稱正確

2. **MkDocs 構建失敗**
   - 檢查 `mkdocs.yml` 語法
   - 確認所有文件路徑正確

3. **權限問題**
   - Settings > Actions > General
   - Workflow permissions: 選擇 "Read and write permissions"

---

### 問題 3：網站樣式錯誤

**可能原因：**
- CSS/JS 文件路徑錯誤
- 圖片路徑錯誤

**解決方案：**

1. **檢查文件結構**
   ```bash
   ls -R docs/
   ```
   
   確認：
   - `docs/stylesheets/extra.css` 存在
   - `docs/javascripts/extra.js` 存在

2. **檢查 mkdocs.yml**
   ```yaml
   extra_css:
     - stylesheets/extra.css  # 路徑相對於 docs/
   
   extra_javascript:
     - javascripts/extra.js
   ```

3. **重新部署**
   ```bash
   ./deploy-pages.sh
   ```

---

### 問題 4：內容沒有更新

**解決方案：**

1. **確認已同步到 docs/**
   ```bash
   ./setup-docs.sh
   ```

2. **提交並推送**
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

3. **等待 Actions 執行**（如果使用 GitHub Actions）
   或手動部署：
   ```bash
   ./deploy-pages.sh
   ```

4. **清除快取**
   - 瀏覽器快取
   - CDN 快取（可能需要等待）

---

## 📱 測試清單

部署完成後，請測試：

### 基本功能
- [ ] 網站可以訪問
- [ ] 首頁正常顯示
- [ ] 導航選單正常
- [ ] 所有連結可以點擊

### 內容檢查
- [ ] 所有章節都能訪問
- [ ] 圖片正常顯示
- [ ] 程式碼區塊正常
- [ ] 格式正確

### 功能測試
- [ ] 搜尋功能正常
- [ ] 深色/淺色模式切換
- [ ] 返回頂部按鈕
- [ ] 目錄導航

### 響應式測試
- [ ] 桌面版顯示正常
- [ ] 平板顯示正常
- [ ] 手機顯示正常

---

## 🎯 快速設定（3 步驟）

### 1️⃣ 前往 GitHub Pages 設定

```bash
open https://github.com/589411/SDD-learning-guide/settings/pages
```

### 2️⃣ 選擇 Source

選擇 **GitHub Actions**（推薦）

### 3️⃣ 等待部署

前往 Actions 查看進度：
```bash
open https://github.com/589411/SDD-learning-guide/actions
```

**完成！** 🎉

---

## 📞 獲取幫助

### 查看文檔

- **GitHub Pages 官方文檔**
  ```
  https://docs.github.com/pages
  ```

- **MkDocs 文檔**
  ```
  https://www.mkdocs.org/
  ```

- **Material for MkDocs**
  ```
  https://squidfunk.github.io/mkdocs-material/
  ```

### 檢查狀態

- **Actions 執行狀態**
  ```
  https://github.com/589411/SDD-learning-guide/actions
  ```

- **GitHub Status**
  ```
  https://www.githubstatus.com/
  ```

---

## 🎉 總結

### 已完成
✅ 代碼已上傳到 GitHub  
✅ `docs/` 目錄已建立  
✅ GitHub Actions 已配置  
✅ 準備好部署

### 需要你做的
1. 前往 GitHub Settings > Pages
2. 選擇 Source: **GitHub Actions**
3. 等待部署完成（2-5 分鐘）
4. 訪問網站：`https://589411.github.io/SDD-learning-guide/`

**就這麼簡單！** 🚀

---

**建立日期：** 2024-10-18  
**Repository：** https://github.com/589411/SDD-learning-guide  
**網站網址：** https://589411.github.io/SDD-learning-guide/  
**狀態：** ✅ 準備部署
