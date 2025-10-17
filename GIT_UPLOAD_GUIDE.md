# 📤 GitHub 上傳指南

## 🎯 上傳步驟

### 步驟 1：初始化 Git 倉庫（如果還沒有）

```bash
cd /Users/joseph/github/SDD-learning-guide-main

# 檢查是否已經是 Git 倉庫
git status

# 如果不是，執行初始化
git init
```

### 步驟 2：檢查要上傳的檔案

```bash
# 查看所有檔案狀態
git status

# 查看哪些檔案會被忽略
git status --ignored
```

**應該被忽略的檔案（不會上傳）：**
- ❌ `討論範例及細節.md`
- ❌ `內容審查與改進計劃.md`
- ❌ `專案重組進度報告.md`
- ❌ `__pycache__/`
- ❌ `.DS_Store`
- ❌ `*.pyc`
- ❌ 生成的資料庫檔案

**會被上傳的檔案（重要）：**
- ✅ 所有模組內容
- ✅ 所有規格文件
- ✅ 所有程式碼框架
- ✅ 所有測試檔案
- ✅ 所有 Colab Notebooks
- ✅ 所有範例資料
- ✅ README 和文件

### 步驟 3：加入所有檔案

```bash
# 加入所有檔案（.gitignore 會自動排除不需要的）
git add .

# 檢查加入了哪些檔案
git status
```

### 步驟 4：提交變更

```bash
# 提交變更
git commit -m "feat: 完整的 SDD 學習指南 v3.0

- 新增 13 個 AI 工具完整介紹
- 新增 GitHub Spec Kit 完整說明
- 完成 3 個實戰專案的可執行規格
- 新增完整的測試檔案
- 新增 3 個 Colab Notebooks
- 更新所有模組內容
- 優化專案結構和文件組織"
```

### 步驟 5：連結到 GitHub 倉庫

```bash
# 如果是新倉庫，需要先在 GitHub 上建立
# 然後連結遠端倉庫
git remote add origin https://github.com/589411/SDD-learning-guide.git

# 如果已經有 origin，可以更新
git remote set-url origin https://github.com/589411/SDD-learning-guide.git

# 檢查遠端倉庫
git remote -v
```

### 步驟 6：推送到 GitHub

```bash
# 第一次推送（設定 upstream）
git push -u origin main

# 如果分支是 master
git push -u origin master

# 如果遇到錯誤，可能需要先拉取
git pull origin main --rebase
git push -u origin main
```

---

## 🔍 檢查清單

### 上傳前檢查

- [ ] `.gitignore` 已更新
- [ ] 討論檔案已被忽略
- [ ] 沒有敏感資訊（API Keys）
- [ ] 所有重要檔案都已加入
- [ ] Commit 訊息清楚明確

### 上傳後檢查

- [ ] GitHub 上可以看到所有檔案
- [ ] README.md 正確顯示
- [ ] 專案結構完整
- [ ] 沒有不該上傳的檔案

---

## 📊 預期的檔案結構

```
SDD-learning-guide/
├── 00_電子書首頁.md
├── 01_前言_AI時代的軟體開發新典範.md
├── 02_給跨領域學習者的信.md
├── 03_如何使用這本電子書.md
├── 04_AI賦能學習指南.md
├── README.md
├── 開發大綱.md
├── 學習路線圖.md
├── 核心理念_AI時代的人機協作.md
├── 視覺化圖表_工具演進與能力培養.md
├── 模組內容/
│   ├── 模組0_規格驅動思維.md
│   ├── 模組1_開發者工具包.md (13個AI工具)
│   ├── 模組2_SDD核心循環實戰.md (含Spec Kit)
│   ├── 模組3_軟體架構入門.md
│   └── 模組4_進階AI協作.md
├── sdd-practice-project/
│   ├── style-analyzer/
│   │   ├── specs/style-analyzer.spec.md
│   │   ├── src/analyzer.py
│   │   ├── tests/test_analyzer.py
│   │   ├── examples/
│   │   └── notebooks/style_analyzer_tutorial.ipynb
│   ├── news-to-lesson/
│   │   ├── specs/news-to-lesson.spec.md
│   │   ├── src/converter.py
│   │   ├── src/prompts.py
│   │   ├── tests/test_converter.py
│   │   ├── examples/
│   │   └── notebooks/news_converter.ipynb
│   └── knowledge-base/
│       ├── specs/knowledge-base.spec.md
│       ├── src/knowledge_base.py
│       ├── tests/test_knowledge_base.py
│       ├── examples/
│       └── notebooks/knowledge_manager.ipynb
├── 學習資源/
├── 實戰專案/
└── 附錄/
```

---

## ⚠️ 常見問題

### Q1: 推送時要求輸入帳號密碼？

**A:** GitHub 已不支援密碼驗證，需要使用 Personal Access Token：

1. 前往 GitHub Settings → Developer settings → Personal access tokens
2. 生成新的 token（勾選 `repo` 權限）
3. 使用 token 作為密碼

或使用 SSH：
```bash
git remote set-url origin git@github.com:589411/SDD-learning-guide.git
```

### Q2: 推送被拒絕（rejected）？

**A:** 遠端有新的提交，需要先拉取：
```bash
git pull origin main --rebase
git push origin main
```

### Q3: 想要修改上一次的 commit 訊息？

**A:** 
```bash
git commit --amend -m "新的訊息"
git push --force origin main
```

---

## 🎯 後續維護

### 日常更新流程

```bash
# 1. 修改檔案
# 2. 查看變更
git status
git diff

# 3. 加入變更
git add .

# 4. 提交
git commit -m "描述你的變更"

# 5. 推送
git push origin main
```

### 建立新分支（開發新功能）

```bash
# 建立並切換到新分支
git checkout -b feature/new-module

# 開發完成後合併回 main
git checkout main
git merge feature/new-module
git push origin main
```

---

## 📝 Commit 訊息規範

使用語義化提交訊息：

- `feat:` 新功能
- `fix:` 修復 bug
- `docs:` 文件更新
- `style:` 格式調整
- `refactor:` 重構
- `test:` 測試相關
- `chore:` 雜項

**範例：**
```bash
git commit -m "feat: 新增 Gemini CLI 工具說明"
git commit -m "docs: 更新 README 使用指南"
git commit -m "fix: 修正規格文件中的錯字"
```

---

**🎉 準備好了嗎？執行上述步驟，將你的 SDD 學習指南上傳到 GitHub！**
