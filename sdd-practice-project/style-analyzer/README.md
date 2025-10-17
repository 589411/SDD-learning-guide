# 🎨 專案 1：風格特徵提取器

> **💡 這是一個規格驅動的專案**  
> 你可以直接使用 `specs/style-analyzer.spec.md` 中的規格，配合 AI 工具完成開發。

## 📋 專案簡介

這是一個文字風格分析工具，能夠分析你的文章、逐字稿、投影片內容，提取個人風格特徵。

### 🎯 專案目標

- 了解自己的教學/寫作風格
- 保持內容一致性
- 建立個人 IP 風格規範
- **學習如何用規格驅動 AI 開發**

### 🌟 核心功能

1. **檔案上傳與驗證**
   - 支援格式：.txt, .md
   - 檔案大小：100字 - 10MB
   - 編碼：UTF-8

2. **風格特徵分析**
   - 情感分析：熱情度得分 (0.0-1.0)
   - 句子統計：平均長度、最長/最短句
   - 高頻短語：TOP 3 常用短語
   - 問句比例：問句佔比

3. **報告生成**
   - 格式：JSON
   - 內容：所有分析指標
   - 儲存：本地下載

---

## 🚀 快速開始

### 🎯 方案 A：用規格 + AI 工具開發（推薦學習）

**這是學習 SDD 的最佳方式！**

#### Step 1: 閱讀規格
```bash
# 開啟規格文件
open specs/style-analyzer.spec.md
```

#### Step 2: 複製規格給 AI

**使用 Cursor/Windsurf：**
1. 開啟 Cursor 或 Windsurf
2. 打開 `specs/style-analyzer.spec.md`
3. 滾動到最下方「📦 完整規格複製區」
4. 複製整個 Prompt
5. 貼給 AI，開始開發！

**使用 GitHub Spec Kit：**
```bash
# 安裝 Spec Kit
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# 在 Cursor 中使用
/speckit.specify
# 貼上規格中的「使用者故事」

/speckit.plan
# 貼上「技術棧」和「功能需求」

/speckit.implement
# AI 自動實作
```

**使用 Cline AI Agent：**
```
在 VS Code 中：
「請根據 specs/style-analyzer.spec.md 實作完整功能」

Cline 會自動完成所有步驟！
```

#### Step 3: 驗證結果
```bash
# 執行測試
pytest tests/

# 測試實際功能
python src/analyzer.py --file examples/sample_article.txt
```

---

### 📦 方案 B：使用 Google Colab（快速體驗）

1. 開啟 `notebooks/style_analyzer.ipynb`
2. 點擊「在 Colab 中開啟」按鈕
3. 執行所有單元格
4. 上傳你的文字檔案測試

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/你的帳號/SDD-learning-guide-main/blob/main/sdd-practice-project/style-analyzer/notebooks/style_analyzer.ipynb)

---

### 💻 方案 C：本地環境（傳統方式）

```bash
# 1. 建立虛擬環境
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows

# 2. 安裝依賴
pip install -r requirements.txt

# 3. 執行測試
pytest tests/

# 4. 執行分析
python src/analyzer.py --file your_article.txt
```

---

## 📁 專案結構

```
style-analyzer/
├── README.md                    # 本檔案
├── requirements.txt             # Python 依賴套件
├── specs/                       # 📋 規格文件
│   └── style-analyzer.spec.md
├── notebooks/                   # 📓 Jupyter Notebooks
│   └── style_analyzer.ipynb
├── src/                         # 💻 原始碼
│   ├── analyzer.py             # 主程式
│   ├── sentiment.py            # 情感分析
│   ├── statistics.py           # 統計分析
│   └── utils.py                # 工具函數
├── tests/                       # 🧪 測試程式
│   ├── test_analyzer.py
│   ├── test_sentiment.py
│   └── test_statistics.py
└── examples/                    # 📝 範例檔案
    ├── sample_article.txt
    └── sample_output.json
```

---

## 🛠️ 技術棧

- **語言**：Python 3.8+
- **NLP 工具**：
  - `nltk` - 自然語言處理
  - `vaderSentiment` - 情感分析
- **測試**：`pytest`
- **資料處理**：`json`, `re`

---

## 📖 使用範例

### 基本使用

```python
from src.analyzer import StyleAnalyzer

# 建立分析器
analyzer = StyleAnalyzer()

# 分析文字檔案
result = analyzer.analyze_file('article.txt')

# 查看結果
print(result)
# {
#   "enthusiasm_score": 0.85,
#   "avg_sentence_length": 18.5,
#   "top_phrases": ["實際案例", "具體來說", "換句話說"],
#   "question_ratio": 0.15
# }
```

### 批次分析

```python
# 分析多個檔案
files = ['article1.txt', 'article2.txt', 'article3.txt']
results = analyzer.batch_analyze(files)

# 生成比較報告
comparison = analyzer.compare_styles(results)
```

---

## 🧪 測試

```bash
# 執行所有測試
pytest

# 執行特定測試
pytest tests/test_analyzer.py

# 查看測試覆蓋率
pytest --cov=src tests/
```

---

## 📊 輸出範例

```json
{
  "file_name": "my_article.txt",
  "analysis_date": "2024-01-15T10:30:00",
  "word_count": 1250,
  "sentence_count": 68,
  "metrics": {
    "enthusiasm_score": 0.82,
    "avg_sentence_length": 18.4,
    "max_sentence_length": 45,
    "min_sentence_length": 5,
    "question_ratio": 0.15,
    "top_phrases": [
      {"phrase": "實際案例", "count": 12},
      {"phrase": "具體來說", "count": 8},
      {"phrase": "換句話說", "count": 6}
    ]
  }
}
```

---

## 🎓 學習重點

### SDD 流程體驗

1. **規格先行**：閱讀 `specs/style-analyzer.spec.md`
2. **測試驅動**：查看 `tests/` 中的測試案例
3. **實作功能**：研究 `src/` 中的程式碼
4. **驗證結果**：執行測試確保正確性

### 技術學習

- Python 檔案處理
- 自然語言處理基礎
- JSON 資料格式
- 單元測試撰寫

---

## 🚧 進階擴充

完成基礎功能後，可以嘗試：

- [ ] 加入多語言支援（英文、日文）
- [ ] 視覺化報告（使用 matplotlib）
- [ ] 風格資料庫（儲存歷史分析）
- [ ] 模仿對象風格功能
- [ ] Web 介面（使用 Streamlit）

---

## ❓ 常見問題

### Q: 為什麼分析結果不準確？

A: 可能原因：
- 文字內容太短（建議至少 500 字）
- 檔案編碼不是 UTF-8
- 包含大量特殊符號

### Q: 支援哪些語言？

A: 目前主要支援繁體中文。英文支援正在開發中。

### Q: 如何解讀熱情度得分？

A: 
- 0.0-0.3：平淡、客觀
- 0.4-0.6：中性、平衡
- 0.7-1.0：熱情、積極

---

## 📚 相關資源

- [完整規格文件](./specs/style-analyzer.spec.md)
- [NLTK 文件](https://www.nltk.org/)
- [VADER Sentiment 說明](https://github.com/cjhutto/vaderSentiment)
- [實戰專案導讀](../../實戰專案/實戰專案導讀.md)

---

## 🤝 貢獻

發現問題或有改進建議？歡迎：
- 提出 Issue
- 送出 Pull Request
- 分享你的使用心得

---

**版本 1.0** | **最後更新：2025-10-17**
