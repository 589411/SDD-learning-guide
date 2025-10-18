# 🚀 GitHub Pages 快速部署指南

## 📋 方案總結

你的電子書將使用 **MkDocs Material** 部署到 GitHub Pages，特色：

| 特色 | 說明 |
|------|------|
| 📱 **響應式設計** | 手機、平板、電腦都能完美顯示 |
| 🎨 **美觀 UI** | 現代化設計，深色/淺色模式 |
| 🔍 **全文搜尋** | 快速找到需要的內容 |
| 📖 **自動目錄** | 每頁自動生成目錄 |
| 💻 **程式碼高亮** | 支援多種程式語言 |
| 📊 **學習追蹤** | 記錄閱讀進度 |
| 🌐 **免費託管** | GitHub Pages 完全免費 |

## ⚡ 3 步驟快速部署

### 方法 1：自動部署（推薦）✨

```bash
# 1. 推送到 GitHub
git add .
git commit -m "Add GitHub Pages support"
git push origin main

# 2. 啟用 GitHub Pages
# 前往 Repository > Settings > Pages
# Source 選擇 "Deploy from a branch"
# 選擇 "gh-pages" 分支

# 3. 等待部署完成（2-3 分鐘）
# 訪問：https://你的用戶名.github.io/SDD-learning-guide/
```

### 方法 2：手動部署

```bash
# 1. 安裝依賴
pip3 install -r requirements.txt

# 2. 本地預覽（可選）
mkdocs serve
# 訪問 http://127.0.0.1:8000

# 3. 部署
mkdocs gh-deploy
```

### 方法 3：使用腳本（最簡單）

```bash
# 一鍵部署
./deploy-pages.sh
```

## 📁 已建立的文件

```
✅ mkdocs.yml                    # MkDocs 配置
✅ requirements.txt              # Python 依賴
✅ docs/index.md                 # 首頁
✅ docs/stylesheets/extra.css   # 自定義樣式
✅ docs/javascripts/extra.js    # 自定義功能
✅ .github/workflows/deploy-docs.yml  # 自動部署
✅ deploy-pages.sh               # 部署腳本
✅ DEPLOY_GITHUB_PAGES.md        # 詳細指南
```

## ⚙️ 需要修改的配置

### 1. 修改網站 URL

編輯 `mkdocs.yml` 第 6 行：

```yaml
site_url: https://你的GitHub用戶名.github.io/SDD-learning-guide
```

### 2. 修改 Repository URL

編輯 `mkdocs.yml` 第 10 行：

```yaml
repo_url: https://github.com/你的GitHub用戶名/SDD-learning-guide
```

### 3. 添加 Google Analytics（可選）

編輯 `mkdocs.yml` 第 175 行：

```yaml
analytics:
  provider: google
  property: G-你的追蹤ID
```

## 🎨 網站預覽

你的網站將包含：

### 首頁
- 歡迎訊息
- 學習路徑圖
- 8 週學習計劃
- 快速導航

### 導航結構
- **開始之前**：前言、核心理念
- **基礎篇**：模組 0-1
- **核心篇**：模組 2-3
- **實戰篇**：3 個專案
- **進階篇**：模組 4
- **學習資源**：Prompt 大全、速查表
- **學習支援**：FAQ、社群
- **附錄**：術語表、參考資料

### 特色功能
- 🔍 全文搜尋
- 📖 閱讀時間估算
- ✅ 學習進度追蹤
- 💾 任務清單自動保存
- 🌙 深色/淺色模式
- 📱 手機友好設計

## 🔧 常見問題

### Q: 部署後看不到網站？

**A:** 
1. 檢查 GitHub Actions 是否成功（Repository > Actions）
2. 確認 Pages 設定正確（Settings > Pages > gh-pages 分支）
3. 等待 5-10 分鐘
4. 清除瀏覽器緩存

### Q: 如何更新網站內容？

**A:**
```bash
# 修改 Markdown 文件後
git add .
git commit -m "Update content"
git push origin main

# GitHub Actions 會自動重新部署
```

### Q: 如何本地預覽？

**A:**
```bash
pip3 install -r requirements.txt
mkdocs serve
# 訪問 http://127.0.0.1:8000
```

### Q: 可以使用自己的域名嗎？

**A:** 可以！
1. 購買域名
2. 在 Repository > Settings > Pages 添加自定義域名
3. 配置 DNS CNAME 記錄指向 `你的用戶名.github.io`

### Q: 如何修改主題顏色？

**A:** 編輯 `mkdocs.yml`：
```yaml
theme:
  palette:
    primary: blue    # 改成你喜歡的顏色
    accent: blue
```

可選顏色：red, pink, purple, indigo, blue, cyan, teal, green, lime, yellow, amber, orange, brown

## 📊 部署檢查清單

部署前確認：

- [ ] 修改了 `site_url` 和 `repo_url`
- [ ] 所有 Markdown 文件都已提交
- [ ] `docs/index.md` 存在
- [ ] 測試過本地預覽
- [ ] 推送到 GitHub
- [ ] 啟用 GitHub Pages
- [ ] 選擇 gh-pages 分支

## 🎯 下一步

### 立即部署

```bash
# 方法 1：自動部署（推薦）
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main

# 方法 2：使用腳本
./deploy-pages.sh

# 方法 3：手動部署
pip3 install -r requirements.txt
mkdocs gh-deploy
```

### 部署後

1. **訪問網站**
   - 網址：`https://你的用戶名.github.io/SDD-learning-guide/`

2. **分享給讀者**
   - 在 README.md 添加網站連結
   - 在社交媒體分享

3. **持續優化**
   - 收集讀者反饋
   - 定期更新內容
   - 優化 SEO

## 📚 詳細文檔

- **完整指南**：查看 `DEPLOY_GITHUB_PAGES.md`
- **MkDocs 文檔**：https://www.mkdocs.org/
- **Material 主題**：https://squidfunk.github.io/mkdocs-material/
- **GitHub Pages**：https://docs.github.com/en/pages

## 💡 優化建議

### SEO 優化
在 Markdown 文件開頭添加：
```markdown
---
title: 章節標題
description: 章節描述
---
```

### 性能優化
已啟用：
- ✅ 程式碼壓縮
- ✅ 圖片優化
- ✅ 快取機制

### 社交分享
已配置：
- ✅ Open Graph 標籤
- ✅ Twitter Cards
- ✅ 社交媒體圖示

## 🎉 完成！

你的電子書網站已經準備好了！

**立即部署：**
```bash
./deploy-pages.sh
```

**或查看詳細指南：**
```bash
cat DEPLOY_GITHUB_PAGES.md
```

---

**有問題？** 查看 `DEPLOY_GITHUB_PAGES.md` 的常見問題章節
