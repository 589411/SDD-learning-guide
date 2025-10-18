# 💻 SDD 實戰專案 - AI 應用開發

## 🎯 專案總覽

這裡包含 **3 個漸進式的 AI 應用專案**，專為非軟體工程師設計，展現如何用規格驅動開發（SDD）方法論開發實用的 AI 工具。

---

## 📚 三個專案

### 🎨 [專案 1：風格特徵提取器](./style-analyzer/)

**難度：** ⭐⭐☆☆☆ 基礎入門  
**時間：** 2 週  
**技術：** Python, NLTK, VADER Sentiment

**功能：**
- 分析文字內容的風格特徵
- 情感分析、句子統計
- 生成 JSON 格式報告

**學習重點：**
- SDD 基礎流程
- 資料處理與分析
- 測試驅動開發

👉 [開始專案 1](./style-analyzer/README.md)

---

### 📰 [專案 2：新聞轉教案生成器](./news-to-lesson/)

**難度：** ⭐⭐⭐☆☆ 進階實作  
**時間：** 2 週  
**技術：** Python, OpenAI API, Prompt Engineering

**功能：**
- 將新聞文章轉換為教學內容
- 支援多受眾適配（企業/成人/年長者）
- AI 生成結構化教案

**學習重點：**
- AI API 整合
- Prompt Engineering
- 規格驗收自動化

👉 [開始專案 2](./news-to-lesson/README.md)

---

### 📚 [專案 3：個人知識庫管理器](./knowledge-base/)

**難度：** ⭐⭐⭐⭐☆ 綜合應用  
**時間：** 2-3 週  
**技術：** Python, JSON/SQLite, 搜尋演算法

**功能：**
- 完整的 CRUD 操作
- 標籤分類與搜尋
- 多格式匯出

**學習重點：**
- 系統架構設計
- 資料持久化
- 搜尋與排序演算法

👉 [開始專案 3](./knowledge-base/README.md)

---

## 🎓 建議學習路徑

### 路徑 A：循序漸進（8週）

```
Week 1-2: 專案 1 - 風格特徵提取器
├─ 學習 SDD 基礎流程
├─ 熟悉 Python 和 Colab
└─ 完成基礎功能

Week 3-4: 專案 2 - 新聞轉教案生成器
├─ 學習 AI API 整合
├─ 掌握 Prompt Engineering
└─ 實作多受眾適配

Week 5-6: 專案 3 - 知識庫管理器
├─ 學習完整 CRUD
├─ 實作搜尋功能
└─ 完成系統整合

Week 7-8: 整合與擴充
├─ 三個專案互相串接
├─ 建立個人 AI 工作流
└─ 準備作品集
```

### 路徑 B：快速體驗（4週）

```
Week 1: 專案 1 基礎功能
Week 2: 專案 2 基礎功能
Week 3: 專案 3 基礎功能
Week 4: 選一個專案深化
```

---

## 🚀 快速開始

### 方案 A：使用 Google Colab（推薦新手）

**優勢：**
- ✅ 無需安裝任何軟體
- ✅ 免費 GPU 和雲端儲存
- ✅ 即時互動執行

**步驟：**
1. 選擇一個專案
2. 開啟該專案的 `.ipynb` 檔案
3. 點擊「在 Colab 中開啟」
4. 執行程式碼並測試

### 方案 B：本地環境（進階）

**步驟：**
```bash
# 1. Clone 專案
git clone https://github.com/你的帳號/SDD-learning-guide-main.git
cd SDD-learning-guide-main/sdd-practice-project

# 2. 選擇專案並進入目錄
cd style-analyzer  # 或 news-to-lesson, knowledge-base

# 3. 建立虛擬環境
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# 4. 安裝依賴
pip install -r requirements.txt

# 5. 執行測試
pytest tests/

# 6. 執行程式
python src/analyzer.py --help
```

---

## 📁 專案結構

```
sdd-practice-project/
├── README.md                    # 本檔案
│
├── style-analyzer/              # 🎨 專案1
│   ├── README.md
│   ├── requirements.txt
│   ├── specs/                   # 規格文件
│   ├── notebooks/               # Colab Notebooks
│   ├── src/                     # 原始碼
│   └── tests/                   # 測試程式
│
├── news-to-lesson/              # 📰 專案2
│   ├── README.md
│   ├── requirements.txt
│   ├── specs/
│   ├── notebooks/
│   ├── src/
│   └── tests/
│
└── knowledge-base/              # 📚 專案3
    ├── README.md
    ├── requirements.txt
    ├── specs/
    ├── notebooks/
    ├── src/
    └── tests/
```

---

## 🛠️ SDD 開發流程

每個專案都遵循相同的 SDD 流程：

```
1. 📋 閱讀規格 (specs/*.spec.md)
   ↓
2. 🧪 撰寫測試 (tests/*.py)
   ↓
3. 🔴 執行測試 (應該失敗 - Red)
   ↓
4. 💻 實作功能 (src/*.py)
   ↓
5. 🟢 執行測試 (應該通過 - Green)
   ↓
6. ♻️ 重構優化 (Refactor)
   ↓
7. 🔄 回到步驟 2（下一個功能）
```

---

## 🤖 AI 輔助開發

### 推薦使用的 AI 工具

- **ChatGPT / Claude**：規格審查、程式碼生成
- **GitHub Copilot**：程式碼自動補全
- **Cursor**：AI 驅動的 IDE

### 實用 Prompts

```
💡 規格生成
"根據以下需求，撰寫 User Story 和 Acceptance Criteria..."

💡 測試生成
"根據這份規格，使用 pytest 生成測試程式碼..."

💡 程式碼實作
"以下是失敗的測試，請實作能讓測試通過的程式碼..."

💡 Code Review
"請審查以下程式碼，從效能、可讀性、安全性角度分析..."
```

---

## 📊 學習成效檢核

### 🥉 初級（完成專案 1）
- [ ] 理解 SDD 的基本流程
- [ ] 能撰寫簡單的規格
- [ ] 會使用 Google Colab
- [ ] 完成風格分析基礎功能

### 🥈 中級（完成專案 1+2）
- [ ] 能獨立撰寫完整規格
- [ ] 能整合 AI API
- [ ] 理解 Prompt Engineering
- [ ] 測試覆蓋率 > 60%

### 🥇 高級（完成全部專案）
- [ ] 能設計模組化架構
- [ ] 測試覆蓋率 > 80%
- [ ] 建立完整的 AI 工作流
- [ ] 有可展示的作品集

---

## 🎯 進階挑戰

完成三個專案後，可以嘗試：

### 整合專案：AI 內容工作室

將三個專案整合成一個完整系統：

```
AI 內容工作室
├─ 風格分析模組 → 分析你的寫作風格
├─ 內容生成模組 → 根據風格生成新內容
└─ 知識管理模組 → 儲存和管理生成的內容

工作流程：
1. 分析歷史內容，建立風格檔案
2. 根據風格檔案，生成新內容
3. 將內容儲存到知識庫
4. 持續優化和迭代
```

### 其他擴充方向

- [ ] 加入 Web 介面（Streamlit/Gradio）
- [ ] 支援多語言（英文、日文）
- [ ] 整合向量資料庫（RAG）
- [ ] 建立 API 服務
- [ ] 部署到雲端（Heroku/Vercel）

---

## 📚 學習資源

### 官方文件
- [Python 官方教學](https://docs.python.org/zh-tw/3/tutorial/)
- [Google Colab 指南](https://colab.research.google.com/)
- [OpenAI API 文件](https://platform.openai.com/docs)
- [pytest 文件](https://docs.pytest.org/)

### 相關教材
- [實戰專案導讀](../實戰專案/實戰專案導讀.md)
- [學習路線圖](../學習路線圖.md)
- [開發大綱](../開發大綱.md)
- [AI 賦能學習指南](../04_AI賦能學習指南.md)

---

## ❓ 常見問題

### Q: 我沒有程式基礎，可以學嗎？

A: 可以！建議：
1. 先完成模組 0 和模組 1 的理論學習
2. 使用 Google Colab（無需安裝）
3. 從專案 1 開始，循序漸進
4. 善用 AI 輔助學習

### Q: 需要付費使用 AI API 嗎？

A:
- **專案 1**：不需要（使用開源工具）
- **專案 2**：需要（但有免費額度）
- **專案 3**：不需要（可選用 AI 功能）

### Q: 完成後能做什麼？

A: 你將擁有：
- ✅ 3 個實用的 AI 工具
- ✅ 可展示的作品集
- ✅ SDD 開發能力
- ✅ AI API 整合經驗

---

## 🤝 貢獻

發現問題或有改進建議？歡迎：
- 提出 Issue
- 送出 Pull Request
- 分享你的使用心得

---

## 🎉 準備好開始了嗎？

### 👉 [開始專案 1：風格特徵提取器](./style-analyzer/)

或

### 👉 [查看實戰專案導讀](../實戰專案/實戰專案導讀.md)

---

**版本 2.0** | **最後更新：2025-10-17**

*讓我們用 SDD 打造屬於你的 AI 工具！* 🚀
