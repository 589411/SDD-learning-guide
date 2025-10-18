# 📖 部署到 GitHub Pages 指南

這份指南將教你如何將 SDD 學習指南部署到 GitHub Pages，讓任何人都可以透過網址訪問你的電子書。

## 🎯 部署方案

我們使用 **MkDocs Material** 來生成美觀的文檔網站，具有以下特色：

- ✅ 美觀現代的 UI
- ✅ 支援搜尋功能
- ✅ 響應式設計（手機友好）
- ✅ 深色/淺色模式切換
- ✅ 自動生成目錄
- ✅ 程式碼高亮和複製
- ✅ 閱讀時間估算
- ✅ 學習進度追蹤

## 📋 前置需求

- Python 3.x
- Git
- GitHub 帳號

## 🚀 快速部署（3 步驟）

### 方法 1：自動部署（推薦）

使用 GitHub Actions 自動部署，每次 push 到 main 分支時自動更新網站。

#### 步驟 1：啟用 GitHub Pages

1. 進入你的 GitHub Repository
2. 點擊 **Settings** > **Pages**
3. 在 **Source** 下選擇 **Deploy from a branch**
4. 選擇 **gh-pages** 分支和 **/ (root)** 目錄
5. 點擊 **Save**

#### 步驟 2：推送到 GitHub

```bash
# 確保所有文件都已提交
git add .
git commit -m "Add MkDocs configuration for GitHub Pages"
git push origin main
```

#### 步驟 3：等待部署完成

- GitHub Actions 會自動運行（約 2-3 分鐘）
- 查看進度：Repository > **Actions** 標籤
- 部署完成後，訪問：`https://你的用戶名.github.io/SDD-learning-guide/`

### 方法 2：手動部署

如果你想在本地測試或手動部署：

#### 步驟 1：安裝依賴

```bash
# 安裝 Python 套件
pip install -r requirements.txt
```

#### 步驟 2：本地預覽

```bash
# 啟動本地伺服器
mkdocs serve

# 在瀏覽器打開
open http://127.0.0.1:8000
```

#### 步驟 3：手動部署

```bash
# 部署到 GitHub Pages
mkdocs gh-deploy
```

## 📁 文件結構

```
SDD-learning-guide-main/
├── mkdocs.yml              # MkDocs 配置文件
├── requirements.txt        # Python 依賴
├── docs/                   # 文檔目錄
│   ├── index.md           # 首頁
│   ├── stylesheets/       # 自定義 CSS
│   │   └── extra.css
│   └── javascripts/       # 自定義 JS
│       └── extra.js
├── .github/
│   └── workflows/
│       └── deploy-docs.yml # GitHub Actions 配置
└── [其他 Markdown 文件]
```

## ⚙️ 配置說明

### mkdocs.yml

主要配置文件，包含：

- **site_name**: 網站名稱
- **site_url**: 網站 URL（需修改為你的）
- **theme**: 主題配置（Material）
- **nav**: 導航結構
- **plugins**: 插件配置
- **markdown_extensions**: Markdown 擴展

### 需要修改的地方

1. **site_url**（第 6 行）
   ```yaml
   site_url: https://你的用戶名.github.io/SDD-learning-guide
   ```

2. **repo_url**（第 10 行）
   ```yaml
   repo_url: https://github.com/你的用戶名/SDD-learning-guide
   ```

3. **Google Analytics**（第 175 行，可選）
   ```yaml
   analytics:
     provider: google
     property: G-你的追蹤ID
   ```

## 🎨 自定義樣式

### 修改顏色主題

編輯 `mkdocs.yml` 的 `theme.palette` 部分：

```yaml
theme:
  palette:
    primary: indigo    # 主色調：indigo, blue, red, green 等
    accent: indigo     # 強調色
```

### 自定義 CSS

編輯 `docs/stylesheets/extra.css` 添加自定義樣式。

### 自定義 JavaScript

編輯 `docs/javascripts/extra.js` 添加自定義功能。

## 🔧 常見問題

### Q1: 部署後看不到網站

**解決方案：**
1. 檢查 GitHub Actions 是否成功運行
2. 確認 GitHub Pages 設定正確（gh-pages 分支）
3. 等待 5-10 分鐘讓 DNS 生效
4. 清除瀏覽器緩存

### Q2: 樣式顯示不正確

**解決方案：**
1. 確認 `docs/stylesheets/extra.css` 存在
2. 檢查 `mkdocs.yml` 中的 `extra_css` 配置
3. 清除瀏覽器緩存並重新載入

### Q3: 搜尋功能不工作

**解決方案：**
1. 確認 `mkdocs.yml` 中有 `search` 插件
2. 重新部署網站
3. 檢查瀏覽器控制台是否有錯誤

### Q4: 中文顯示亂碼

**解決方案：**
1. 確認所有 Markdown 文件使用 UTF-8 編碼
2. 檢查 `mkdocs.yml` 中的 `language: zh-TW`
3. 確認字體配置正確

### Q5: 圖片無法顯示

**解決方案：**
1. 確認圖片路徑正確（相對路徑）
2. 圖片文件已提交到 Git
3. 圖片放在 `docs/` 目錄下

## 📊 進階功能

### 1. 版本管理

使用 `mike` 管理多個版本：

```bash
# 安裝 mike
pip install mike

# 部署特定版本
mike deploy --push --update-aliases 1.0 latest

# 設定默認版本
mike set-default --push latest
```

### 2. 多語言支持

在 `mkdocs.yml` 添加：

```yaml
plugins:
  - i18n:
      default_language: zh-TW
      languages:
        zh-TW:
          name: 繁體中文
        en:
          name: English
```

### 3. PDF 生成

安裝插件：

```bash
pip install mkdocs-pdf-export-plugin
```

在 `mkdocs.yml` 添加：

```yaml
plugins:
  - pdf-export
```

### 4. 評論系統

整合 Giscus 或 Disqus：

```yaml
extra:
  comments:
    provider: giscus
    repo: 你的用戶名/SDD-learning-guide
```

## 🎯 優化建議

### 1. SEO 優化

在每個 Markdown 文件開頭添加 metadata：

```markdown
---
title: 章節標題
description: 章節描述
keywords: SDD, AI, 程式設計
---
```

### 2. 性能優化

啟用 minify 插件：

```yaml
plugins:
  - minify:
      minify_html: true
```

### 3. 社交分享

添加 Open Graph 標籤：

```yaml
extra:
  social:
    - icon: fontawesome/brands/github
      link: https://github.com/你的用戶名
    - icon: fontawesome/brands/twitter
      link: https://twitter.com/你的帳號
```

## 📱 測試清單

部署前請確認：

- [ ] 所有連結都正常工作
- [ ] 圖片都能正常顯示
- [ ] 搜尋功能正常
- [ ] 導航結構正確
- [ ] 在手機上顯示正常
- [ ] 深色模式正常切換
- [ ] 程式碼高亮正確
- [ ] 目錄自動生成

## 🔗 相關資源

- [MkDocs 官方文檔](https://www.mkdocs.org/)
- [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)
- [GitHub Pages 文檔](https://docs.github.com/en/pages)
- [Markdown 語法指南](https://www.markdownguide.org/)

## 💡 下一步

1. **自定義域名**（可選）
   - 購買域名
   - 在 GitHub Pages 設定中添加自定義域名
   - 配置 DNS

2. **添加分析**
   - 設定 Google Analytics
   - 追蹤訪問數據

3. **持續更新**
   - 定期更新內容
   - 收集讀者反饋
   - 優化使用體驗

---

**準備好了嗎？開始部署你的電子書！** 🚀

```bash
# 一鍵部署
git add .
git commit -m "Deploy to GitHub Pages"
git push origin main
```

部署完成後，訪問：`https://你的用戶名.github.io/SDD-learning-guide/`
