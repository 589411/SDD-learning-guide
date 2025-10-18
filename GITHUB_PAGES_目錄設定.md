# 📁 GitHub Pages 目錄設定說明

## 🎯 目錄結構

GitHub Pages 使用 MkDocs，需要特定的目錄結構：

```
SDD-learning-guide-main/
├── mkdocs.yml              # MkDocs 配置文件
├── docs/                   # 網站內容目錄 ⭐
│   ├── index.md           # 首頁
│   ├── stylesheets/       # 自定義樣式
│   ├── javascripts/       # 自定義腳本
│   ├── 模組內容/          # 模組文件
│   ├── 實戰專案/          # 專案文件
│   ├── 學習資源/          # 資源文件
│   ├── 學習支援/          # 支援文件
│   └── 附錄/              # 附錄文件
└── [其他文件]
```

**重點：** MkDocs 只會讀取 `docs/` 目錄中的內容！

---

## ✅ 已完成的設定

### 1. 執行設定腳本

```bash
./setup-docs.sh
```

**完成的工作：**
- ✅ 創建 `docs/` 目錄結構
- ✅ 複製所有 Markdown 文件到 `docs/`
- ✅ 保持原有目錄結構
- ✅ 共複製 30 個文件

### 2. 目錄結構

```
docs/
├── index.md                                    # 首頁 ✅
├── 01_前言_AI時代的軟體開發新典範.md          # 前言 ✅
├── 02_給跨領域學習者的信.md                   # 信件 ✅
├── 03_如何使用這本電子書.md                   # 使用說明 ✅
├── 04_AI賦能學習指南.md                       # AI 指南 ✅
├── 核心理念_AI時代的人機協作.md               # 核心理念 ✅
├── 模組內容/                                   # 模組
│   ├── 模組0_規格驅動思維.md                  ✅
│   ├── 模組1_開發者工具包.md                  ✅
│   ├── 模組2_SDD核心循環實戰.md               ✅
│   ├── 模組3_軟體架構入門.md                  ✅
│   └── 模組4_進階AI協作.md                    ✅
├── 實戰專案/                                   # 專案
│   └── 實戰專案導讀.md                        ✅
├── sdd-practice-project/                       # 實戰
│   ├── README.md                              ✅
│   ├── news-to-lesson/README.md               ✅
│   └── knowledge-base/README.md               ✅
├── 學習資源/                                   # 資源
│   ├── README.md                              ✅
│   ├── 快速開始指南.md                        ✅
│   ├── AI學習Prompt大全.md                    ✅
│   └── 關鍵字速查表.md                        ✅
├── 學習支援/                                   # 支援
│   ├── README.md                              ✅
│   ├── 常見問題FAQ.md                         ✅
│   ├── 學習卡關怎麼辦.md                      ✅
│   └── 社群與資源.md                          ✅
├── 附錄/                                       # 附錄
│   ├── README.md                              ✅
│   ├── 術語表.md                              ✅
│   ├── 參考資料.md                            ✅
│   └── 學習紀錄模板.md                        ✅
├── stylesheets/                                # 樣式
│   └── extra.css                              ✅
└── javascripts/                                # 腳本
    └── extra.js                               ✅
```

---

## 🔧 MkDocs 配置

### mkdocs.yml 關鍵設定

```yaml
# 網站基本資訊
site_name: AI 時代的規格驅動開發
site_url: https://你的用戶名.github.io/SDD-learning-guide

# Repository 資訊
repo_name: SDD-learning-guide
repo_url: https://github.com/你的用戶名/SDD-learning-guide

# 導航結構
nav:
  - 首頁: index.md
  - 開始之前:
    - 前言: 01_前言_AI時代的軟體開發新典範.md
    # ... 其他章節
  - 基礎篇:
    - 模組 0: 模組內容/模組0_規格驅動思維.md
    # ... 其他模組
```

**重要：** 所有路徑都是相對於 `docs/` 目錄！

---

## 🚀 使用方式

### 1. 本地預覽

```bash
# 安裝依賴（首次）
pip3 install -r requirements.txt

# 啟動本地伺服器
mkdocs serve

# 訪問
open http://127.0.0.1:8000
```

### 2. 部署到 GitHub Pages

**方法 A：使用腳本（推薦）**
```bash
./deploy-pages.sh
```

**方法 B：手動部署**
```bash
mkdocs gh-deploy
```

**方法 C：自動部署（GitHub Actions）**
```bash
# 已設定自動部署
# 只需 push 到 main 分支
git push origin main
```

### 3. 更新內容

當你修改根目錄的 Markdown 文件後：

```bash
# 重新複製到 docs/
./setup-docs.sh

# 本地預覽
mkdocs serve

# 部署
./deploy-pages.sh
```

---

## 📝 重要注意事項

### ✅ 要做的事

1. **修改 mkdocs.yml**
   ```yaml
   # 第 7 行：修改網站 URL
   site_url: https://你的GitHub用戶名.github.io/SDD-learning-guide
   
   # 第 11 行：修改 repo URL
   repo_url: https://github.com/你的GitHub用戶名/SDD-learning-guide
   ```

2. **保持同步**
   - 修改根目錄文件後
   - 執行 `./setup-docs.sh`
   - 重新部署

3. **檢查路徑**
   - 所有圖片路徑
   - 所有內部連結
   - 確保相對於 `docs/` 目錄

### ❌ 不要做的事

1. **不要直接修改 docs/ 中的文件**
   - 應該修改根目錄的原始文件
   - 然後執行 `./setup-docs.sh` 同步

2. **不要刪除 docs/ 目錄**
   - 這是 MkDocs 必需的

3. **不要忘記更新**
   - 修改內容後要重新複製
   - 修改 mkdocs.yml 後要重新部署

---

## 🔍 檢查清單

### 部署前檢查

- [ ] 已執行 `./setup-docs.sh`
- [ ] 已修改 `mkdocs.yml` 中的 URL
- [ ] 已測試本地預覽（`mkdocs serve`）
- [ ] 所有連結都正常
- [ ] 所有圖片都顯示
- [ ] 導航結構正確

### 部署後檢查

- [ ] 網站可以訪問
- [ ] 首頁顯示正常
- [ ] 導航功能正常
- [ ] 搜尋功能正常
- [ ] 深色/淺色模式正常
- [ ] 手機顯示正常

---

## 🐛 常見問題

### 問題 1：網站顯示 404

**原因：** 文件不在 `docs/` 目錄

**解決：**
```bash
./setup-docs.sh
./deploy-pages.sh
```

### 問題 2：導航連結失效

**原因：** `mkdocs.yml` 中的路徑錯誤

**解決：**
```yaml
# 確保路徑相對於 docs/
nav:
  - 首頁: index.md  # ✅ 正確
  - 模組: 模組內容/模組0.md  # ✅ 正確
  - 錯誤: /模組內容/模組0.md  # ❌ 錯誤（不要用絕對路徑）
```

### 問題 3：樣式沒有載入

**原因：** CSS/JS 文件路徑錯誤

**解決：**
```yaml
# 確保這些文件在 docs/ 目錄中
extra_css:
  - stylesheets/extra.css  # ✅ 正確

extra_javascript:
  - javascripts/extra.js   # ✅ 正確
```

### 問題 4：圖片不顯示

**原因：** 圖片路徑相對於根目錄

**解決：**
```bash
# 複製圖片到 docs/
mkdir -p docs/images
cp -r images/* docs/images/

# 或在 Markdown 中使用正確路徑
![圖片](images/example.png)  # 相對於 docs/
```

---

## 📊 目錄對照表

| 原始位置 | docs/ 位置 | 用途 |
|---------|-----------|------|
| `01_前言.md` | `docs/01_前言.md` | 前言 |
| `模組內容/模組0.md` | `docs/模組內容/模組0.md` | 模組 |
| `學習資源/README.md` | `docs/學習資源/README.md` | 資源 |
| `images/` | `docs/images/` | 圖片 |

---

## 🎯 工作流程

### 日常更新流程

```bash
# 1. 修改內容（在根目錄）
vim 模組內容/模組0_規格驅動思維.md

# 2. 同步到 docs/
./setup-docs.sh

# 3. 本地預覽（可選）
mkdocs serve

# 4. 提交變更
git add .
git commit -m "Update content"

# 5. 部署
./deploy-pages.sh

# 或直接 push（自動部署）
git push origin main
```

### 首次設定流程

```bash
# 1. 設定目錄結構
./setup-docs.sh

# 2. 修改配置
vim mkdocs.yml
# 修改 site_url 和 repo_url

# 3. 安裝依賴
pip3 install -r requirements.txt

# 4. 測試本地
mkdocs serve

# 5. 部署
./deploy-pages.sh

# 6. 啟用 GitHub Pages
# Repository > Settings > Pages
# Source: gh-pages branch
```

---

## 💡 進階技巧

### 自動同步腳本

創建 `.git/hooks/pre-commit`：

```bash
#!/bin/bash
# 提交前自動同步到 docs/
./setup-docs.sh
git add docs/
```

### 監控文件變更

```bash
# 使用 fswatch（macOS）
brew install fswatch

# 監控並自動同步
fswatch -o 模組內容/ 學習資源/ | xargs -n1 -I{} ./setup-docs.sh
```

---

## 🎉 總結

### 已完成

✅ **目錄結構設定完成**
- `docs/` 目錄已創建
- 30 個文件已複製
- 目錄結構正確

✅ **配置文件就緒**
- `mkdocs.yml` 已配置
- 導航結構完整
- 樣式和腳本就位

✅ **部署腳本準備好**
- `setup-docs.sh` - 同步文件
- `deploy-pages.sh` - 部署網站
- GitHub Actions - 自動部署

### 下一步

1. **修改 mkdocs.yml**
   ```bash
   vim mkdocs.yml
   # 修改第 7 和 11 行的 URL
   ```

2. **本地測試**
   ```bash
   mkdocs serve
   open http://127.0.0.1:8000
   ```

3. **部署網站**
   ```bash
   ./deploy-pages.sh
   ```

**準備好了！** 🚀

---

**建立日期：** 2024-10-18  
**最後更新：** 2024-10-18  
**狀態：** ✅ 設定完成
