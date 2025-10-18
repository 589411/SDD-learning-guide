# 📖 English Version Generation Guide

## 🎯 Overview

This guide explains how to create a complete English version of the SDD Learning Guide for Leanpub publication.

**Status:** ✅ Structure created, translation in progress

---

## 📁 What's Been Created

### Files Generated

| File | Purpose | Status |
|------|---------|--------|
| `config/book-config-en.yaml` | English book configuration | ✅ Complete |
| `generate-english.sh` | Generation script | ✅ Complete |
| `manuscript-en/README.md` | Translation guidelines | ✅ Complete |
| `manuscript-en/part0.md` | Part 0 intro | ✅ Sample |
| `manuscript-en/chapter-00.md` | Chapter 0 | ✅ Sample |
| `manuscript-en/Book.txt` | Chapter order | ✅ Template |
| `manuscript-en/Sample.txt` | Free preview chapters | ✅ Template |

### Book Structure

```
English Version (18 chapters total)
├── Part 0: Getting Started (4 chapters)
├── Part 1: Foundation (2 chapters)
├── Part 2: Core (2 chapters)
├── Part 3: Practice (3 chapters)
├── Part 4: Advanced (2 chapters)
└── Appendix (5 sections)
```

---

## 🚀 Translation Options

### Option 1: AI-Assisted Translation (Recommended) ⭐⭐⭐⭐⭐

**Best for:** Fast, cost-effective translation with human review

**Tools:**
- ChatGPT (GPT-4)
- Claude (Opus/Sonnet)
- DeepL Pro

**Process:**

1. **Prepare prompts**
2. **Translate in batches**
3. **Review and edit**
4. **Maintain consistency**

**Cost:** ~$20-50 (API costs)  
**Time:** 2-3 days  
**Quality:** High (with review)

### Option 2: Professional Translation ⭐⭐⭐⭐

**Best for:** Highest quality, publishing-ready

**Services:**
- Gengo
- One Hour Translation
- ProZ

**Cost:** ~$2,000-4,000 (30,000 words @ $0.08-0.15/word)  
**Time:** 1-2 weeks  
**Quality:** Highest

### Option 3: Community Translation ⭐⭐⭐

**Best for:** Open source, community-driven

**Platforms:**
- Crowdin
- Transifex
- GitHub community

**Cost:** Free (volunteer-based)  
**Time:** Variable (weeks to months)  
**Quality:** Variable

---

## 🤖 AI Translation Workflow (Recommended)

### Step 1: Prepare Translation Prompt

Create a file `translation-prompt.md`:

```markdown
# Translation Instructions

You are translating a programming education book from Traditional Chinese to English.

**Book Title:** Coding with AI: A Non-Engineer's Guide
**Target Audience:** Non-engineers, beginners
**Tone:** Friendly, educational, encouraging

**Guidelines:**
1. Preserve all code blocks exactly
2. Keep technical terms consistent:
   - 規格驅動開發 → Spec-Driven Development (SDD)
   - AI 工具 → AI tools
   - 非工程師 → non-engineers
3. Maintain formatting (headers, lists, emojis)
4. Adapt examples for international audience
5. Keep URLs and links unchanged
6. Preserve markdown syntax

**Translation Style:**
- Clear and concise
- Professional but approachable
- Use active voice
- Avoid jargon when possible

Please translate the following content:

---

[CONTENT HERE]

---
```

### Step 2: Translate Each Chapter

**Using ChatGPT:**

```bash
# For each chapter
1. Copy Chinese content
2. Paste into ChatGPT with prompt
3. Review translation
4. Save to manuscript-en/
```

**Using Claude:**

```bash
# Similar process
1. Use Claude Projects for consistency
2. Upload glossary of terms
3. Translate chapter by chapter
```

**Using API (Automated):**

```python
# Example Python script
import openai

def translate_chapter(chinese_text):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a professional translator..."},
            {"role": "user", "content": f"Translate:\n\n{chinese_text}"}
        ]
    )
    return response.choices[0].message.content
```

### Step 3: Review and Edit

**Checklist:**
- [ ] Technical terms consistent
- [ ] Code blocks preserved
- [ ] Formatting correct
- [ ] Links working
- [ ] Examples culturally appropriate
- [ ] Grammar and spelling checked
- [ ] Tone appropriate

### Step 4: Quality Assurance

1. **Read through** entire chapter
2. **Test code examples** (if any)
3. **Check cross-references**
4. **Verify consistency** with previous chapters
5. **Get feedback** from native speaker (optional)

---

## 📋 Translation Checklist

### Content Files to Translate

#### Part 0: Getting Started
- [ ] `01_前言_AI時代的軟體開發新典範.md` → `chapter-00.md` ✅ Sample done
- [ ] `02_給跨領域學習者的信.md` → `chapter-0.1.md`
- [ ] `03_如何使用這本電子書.md` → `chapter-0.2.md`
- [ ] `核心理念_AI時代的人機協作.md` → `chapter-0.3.md`

#### Part 1: Foundation
- [ ] `模組內容/模組0_規格驅動思維.md` → `chapter-01.md`
- [ ] `模組內容/模組1_開發者工具包.md` → `chapter-02.md`

#### Part 2: Core
- [ ] `模組內容/模組2_SDD核心循環實戰.md` → `chapter-03.md`
- [ ] `模組內容/模組3_軟體架構入門.md` → `chapter-04.md`

#### Part 3: Practice
- [ ] `sdd-practice-project/README.md` → `chapter-05.md`
- [ ] `sdd-practice-project/news-to-lesson/README.md` → `chapter-06.md`
- [ ] `sdd-practice-project/knowledge-base/README.md` → `chapter-07.md`

#### Part 4: Advanced
- [ ] `模組內容/模組4_進階AI協作.md` → `chapter-08.md`
- [ ] `04_AI賦能學習指南.md` → `chapter-09.md`

#### Appendix
- [ ] `學習資源/AI學習Prompt大全.md` → `appendix-A.md`
- [ ] `學習支援/常見問題FAQ.md` → `appendix-B.md`
- [ ] `附錄/術語表.md` → `appendix-C.md`
- [ ] `學習支援/社群與資源.md` → `appendix-D.md`
- [ ] `學習資源/關鍵字速查表.md` → `appendix-E.md`

**Total:** 18 files to translate

---

## 📚 Terminology Glossary

### Key Terms (Consistent Translation)

| Chinese | English | Notes |
|---------|---------|-------|
| 規格驅動開發 | Spec-Driven Development (SDD) | Always use SDD acronym |
| 非工程師 | non-engineers | Hyphenated |
| AI 工具 | AI tools | Lowercase "tools" |
| 實戰專案 | hands-on projects | Or "practical projects" |
| 學習目標 | learning objectives | |
| 自我檢測 | self-check | |
| 常見錯誤 | common mistakes | |
| 實作任務 | practice tasks | |
| 閱讀時間 | reading time | |
| 檢核點 | checkpoint | |
| 程式碼 | code | Not "program code" |
| 軟體開發 | software development | |
| 跨領域 | cross-domain | |
| 學習路徑 | learning path | |

### Tool Names (Keep Original)

- GitHub Copilot
- Cursor
- Windsurf
- ChatGPT
- Claude
- Colab (Google Colab)
- VS Code
- etc.

---

## 🛠️ Translation Tools

### Recommended Tools

1. **ChatGPT (GPT-4)**
   - Best for: Long-form content
   - Cost: $20/month
   - Quality: Excellent

2. **Claude (Opus)**
   - Best for: Technical content
   - Cost: $20/month
   - Quality: Excellent

3. **DeepL Pro**
   - Best for: Quick translations
   - Cost: $8.74/month
   - Quality: Very good

4. **Grammarly**
   - Best for: Grammar checking
   - Cost: Free (basic)
   - Quality: Good

### Helper Scripts

Create `translate.py`:

```python
#!/usr/bin/env python3
"""
Translation helper script
"""

import os
import openai
from pathlib import Path

# Set your API key
openai.api_key = "your-api-key"

TRANSLATION_PROMPT = """
You are translating a programming education book from Traditional Chinese to English.

Guidelines:
1. Preserve all code blocks exactly
2. Keep technical terms consistent
3. Maintain formatting
4. Use clear, friendly tone

Translate the following:

"""

def translate_file(input_path, output_path):
    """Translate a markdown file"""
    with open(input_path, 'r', encoding='utf-8') as f:
        chinese_text = f.read()
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a professional translator."},
            {"role": "user", "content": TRANSLATION_PROMPT + chinese_text}
        ],
        temperature=0.3
    )
    
    english_text = response.choices[0].message.content
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(english_text)
    
    print(f"✓ Translated: {input_path} → {output_path}")

# Usage
if __name__ == "__main__":
    translate_file(
        "模組內容/模組0_規格驅動思維.md",
        "manuscript-en/chapter-01.md"
    )
```

---

## 📊 Progress Tracking

### Translation Progress

Create `translation-progress.md`:

```markdown
# Translation Progress

**Started:** 2024-10-18  
**Target Completion:** TBD

## Status

- ✅ Complete
- 🔄 In Progress
- ⏳ Not Started

### Part 0: Getting Started (0/4)
- ✅ Chapter 00: Preface (Sample)
- ⏳ Chapter 0.1: Letter to Cross-Domain Learners
- ⏳ Chapter 0.2: How to Use This Book
- ⏳ Chapter 0.3: Core Philosophy

### Part 1: Foundation (0/2)
- ⏳ Chapter 1: Spec-Driven Thinking
- ⏳ Chapter 2: Developer Toolkit

### Part 2: Core (0/2)
- ⏳ Chapter 3: SDD Core Loop
- ⏳ Chapter 4: Software Architecture

### Part 3: Practice (0/3)
- ⏳ Chapter 5: Project 1
- ⏳ Chapter 6: Project 2
- ⏳ Chapter 7: Project 3

### Part 4: Advanced (0/2)
- ⏳ Chapter 8: Advanced Techniques
- ⏳ Chapter 9: Future Outlook

### Appendix (0/5)
- ⏳ Appendix A: Prompts
- ⏳ Appendix B: FAQ
- ⏳ Appendix C: Glossary
- ⏳ Appendix D: Resources
- ⏳ Appendix E: Quick Reference

**Overall Progress:** 1/18 (5.6%)
```

---

## 🎯 Quick Start

### Immediate Next Steps

1. **Choose translation method**
   ```bash
   # Option 1: AI-assisted (recommended)
   # Use ChatGPT or Claude
   
   # Option 2: Professional
   # Contact translation service
   
   # Option 3: Community
   # Set up Crowdin project
   ```

2. **Start with Part 0**
   ```bash
   # Translate chapters 0.1, 0.2, 0.3
   # Review and edit
   # Save to manuscript-en/
   ```

3. **Update Book.txt**
   ```bash
   # Add translated chapters
   vim manuscript-en/Book.txt
   ```

4. **Test on Leanpub**
   ```bash
   # Upload to Leanpub
   # Generate preview
   # Check formatting
   ```

---

## 📝 Example Translation

### Chinese Original

```markdown
## 🎯 學習目標

完成本章後，你將能夠：
- 理解規格驅動開發的核心概念
- 撰寫清晰的功能規格
- 使用 AI 工具輔助開發

**預計學習時間：** 1 小時
```

### English Translation

```markdown
## 🎯 Learning Objectives

After completing this chapter, you will be able to:
- Understand the core concepts of Spec-Driven Development
- Write clear functional specifications
- Use AI tools to assist development

**Estimated Learning Time:** 1 hour
```

---

## ✅ Quality Checklist

Before finalizing each chapter:

- [ ] All Chinese text translated
- [ ] Code blocks preserved exactly
- [ ] Formatting maintained (headers, lists, emojis)
- [ ] Links working
- [ ] Technical terms consistent
- [ ] Grammar checked
- [ ] Spelling checked
- [ ] Tone appropriate
- [ ] Examples culturally appropriate
- [ ] Cross-references updated

---

## 📤 Publishing to Leanpub

### Step 1: Prepare Files

```bash
# Ensure all files are in manuscript-en/
ls manuscript-en/

# Should see:
# - Book.txt
# - Sample.txt
# - part*.md
# - chapter-*.md
# - appendix-*.md
```

### Step 2: Create Leanpub Book

1. Go to Leanpub.com
2. Create new book
3. Title: "Coding with AI: A Non-Engineer's Guide"
4. Choose "GitHub" or "Dropbox" sync

### Step 3: Upload Content

**Option A: GitHub Sync**
```bash
# Push to GitHub
git add manuscript-en/
git commit -m "Add English version"
git push origin main

# Configure Leanpub to sync from GitHub
```

**Option B: Manual Upload**
```bash
# Zip the manuscript-en directory
zip -r manuscript-en.zip manuscript-en/

# Upload to Leanpub
```

### Step 4: Generate Preview

1. Click "Preview" in Leanpub
2. Wait for generation
3. Download and review PDF/EPUB
4. Fix any issues

### Step 5: Publish

1. Set pricing
2. Write book description
3. Upload cover image
4. Click "Publish"

---

## 💡 Tips and Best Practices

### Translation Tips

1. **Batch similar content**
   - Translate all "Learning Objectives" together
   - Maintain consistent style

2. **Use translation memory**
   - Keep a glossary
   - Reuse common phrases

3. **Review in context**
   - Read full chapter after translation
   - Check flow and coherence

4. **Get feedback**
   - Ask native speakers to review
   - Test with target audience

### Common Pitfalls

❌ **Don't:**
- Translate code comments (keep English)
- Change code examples
- Alter URLs or links
- Remove emojis or formatting
- Use inconsistent terminology

✅ **Do:**
- Preserve markdown syntax
- Keep code blocks exact
- Maintain formatting
- Use consistent terms
- Adapt cultural references

---

## 📞 Getting Help

### Resources

- **Translation Questions:** Check glossary first
- **Technical Issues:** See manuscript-en/README.md
- **Leanpub Help:** https://help.leanpub.com

### Community

- GitHub Issues
- Leanpub Forums
- Translation communities

---

## 🎉 Summary

You now have:

✅ **Complete book structure** for English version  
✅ **Configuration files** ready  
✅ **Sample chapters** as templates  
✅ **Translation guidelines** and tools  
✅ **Publishing workflow** defined

**Next:** Start translating! 🚀

---

**Created:** 2024-10-18  
**Version:** 1.0.0  
**Status:** Ready for translation
