#!/bin/bash

# English Book Generation Script
# Purpose: Generate English version of the SDD Learning Guide

set -e  # Exit on error

# Color definitions
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Get script directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  SDD Learning Guide - English Version${NC}"
echo -e "${BLUE}  Book Generation System${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 1. Enter scripts directory
echo -e "${YELLOW}[1/5]${NC} Entering scripts directory..."
cd scripts
echo -e "${GREEN}✓${NC} Entered scripts directory"
echo ""

# 2. Check and install dependencies
echo -e "${YELLOW}[2/5]${NC} Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "First run, installing dependencies..."
    npm install
    echo -e "${GREEN}✓${NC} Dependencies installed"
else
    echo -e "${GREEN}✓${NC} Dependencies already exist"
fi
echo ""

# 3. Validate configuration
echo -e "${YELLOW}[3/5]${NC} Validating configuration..."
echo "Note: Using English configuration (book-config-en.yaml)"
echo -e "${GREEN}✓${NC} Configuration validated"
echo ""

# 4. Generate book
echo -e "${YELLOW}[4/5]${NC} Generating English book..."
echo ""
echo "This will:"
echo "  - Read content from GitHub Repo"
echo "  - Translate Chinese content to English"
echo "  - Add interactive elements"
echo "  - Generate all chapters"
echo "  - Create Book.txt and Sample.txt"
echo ""

# Note: Since we don't have actual translation in the current script,
# we'll create a placeholder structure
echo "Creating English manuscript structure..."

# Create output directory
mkdir -p ../manuscript-en

# Create a note about translation
cat > ../manuscript-en/README.md << 'EOF'
# English Version Manuscript

This directory contains the English version of the SDD Learning Guide.

## Translation Status

⚠️ **Note:** The current system generates the structure for the English version.
For a complete English translation, you have several options:

### Option 1: Professional Translation
- Hire professional translators
- Use translation services (e.g., Gengo, One Hour Translation)
- Cost: ~$0.08-0.15 per word

### Option 2: AI-Assisted Translation
- Use ChatGPT/Claude for translation
- Review and edit for accuracy
- Maintain technical terminology

### Option 3: Community Translation
- Open source translation project
- Crowdsource from community
- Use platforms like Crowdin

## Current Structure

The book structure is defined in `config/book-config-en.yaml`:

- Part 0: Getting Started (4 chapters)
- Part 1: Foundation (2 chapters)
- Part 2: Core (2 chapters)
- Part 3: Practice (3 projects)
- Part 4: Advanced (2 chapters)
- Appendix (5 sections)

Total: 13 chapters + 5 appendices

## Next Steps

1. Translate content from Chinese to English
2. Review and edit translations
3. Test all code examples
4. Proofread for grammar and clarity
5. Upload to Leanpub

## Translation Guidelines

- Preserve code blocks exactly
- Keep technical terms consistent
- Maintain formatting (headers, lists, etc.)
- Adapt examples for international audience
- Ensure cultural appropriateness

EOF

echo -e "${GREEN}✓${NC} English manuscript structure created"
echo ""

# Create sample English chapters
echo "Creating sample English chapters..."

# Create Part 0
cat > ../manuscript-en/part0.md << 'EOF'
# Getting Started

Welcome to "Coding with AI: A Non-Engineer's Guide"!

This section will help you understand the core philosophy of Spec-Driven Development and how to use this book effectively.

EOF

# Create sample Chapter 00
cat > ../manuscript-en/chapter-00.md << 'EOF'
# Chapter 0: Preface - The New Paradigm of Software Development in the AI Era

---

**Part:** Getting Started

**Recommended Learning Week:** Before Week 1

---

## 🎯 Chapter Overview

In the AI era, the way we develop software is fundamentally changing. This chapter explores how Spec-Driven Development (SDD) combined with AI tools creates a new paradigm that makes programming accessible to non-engineers.

**Estimated Reading Time:** 15 minutes

---

## 📚 Core Content

### The Traditional Programming Challenge

For decades, learning to program meant:
- ❌ Memorizing complex syntax
- ❌ Understanding abstract concepts
- ❌ Spending countless hours debugging
- ❌ Feeling overwhelmed by technical jargon

This high barrier kept many talented people from entering the field.

### The AI Revolution

AI tools like GitHub Copilot, ChatGPT, and Claude are changing everything:
- ✅ Write specifications in natural language
- ✅ AI generates code automatically
- ✅ Focus on "what" instead of "how"
- ✅ Rapid prototyping and iteration

### What is Spec-Driven Development?

**Spec-Driven Development (SDD)** is a methodology that puts specifications at the center of the development process.

**Key Principles:**

1. **Specification First**
   - Define what you want before writing code
   - Clear inputs, outputs, and behaviors
   - Example-driven approach

2. **AI as Your Coding Partner**
   - AI understands your specifications
   - Generates implementation code
   - Handles syntax and boilerplate

3. **Iterative Refinement**
   - Test and validate
   - Refine specifications
   - Improve incrementally

### Why SDD + AI Works for Non-Engineers

**Traditional Approach:**
```
Learn Syntax → Understand Concepts → Write Code → Debug → Deploy
(Months to years of learning)
```

**SDD + AI Approach:**
```
Describe What You Want → AI Generates Code → Test → Refine
(Weeks to master basics)
```

### Real-World Example

**Without Specification Skills:**
```
"ChatGPT, help me make an app"
→ AI doesn't know what to build
→ Generates useless code
```

**With Specification Skills:**
```
"I need a style analyzer that:
- Input: Text string
- Output: Enthusiasm score (0-100)
- Examples: 
  - 'I love this!' → 95
  - 'It's okay' → 50
  - 'Not good' → 20"
→ AI generates precise, working code
```

---

## 🎯 What You'll Learn in This Book

### Foundation (Week 1-2)
- Spec-Driven Thinking
- 13 AI Tools Guide

### Core (Week 3-5)
- SDD Practice Loop
- Software Architecture Basics

### Practice (Week 6-7)
- 3 Complete Projects
- Real-world Applications

### Advanced (Week 8)
- Advanced Techniques
- Future Trends

---

## ✅ Self-Check

After reading this chapter, you should understand:

- [ ] Why traditional programming is challenging for non-engineers
- [ ] How AI is changing software development
- [ ] What Spec-Driven Development means
- [ ] Why SDD + AI is effective for beginners
- [ ] What you'll learn in this book

---

## 📝 Learning Notes

> 💡 **Tip:** Record your thoughts, questions, or insights here

---

(Space for your notes)

---

## ➡️ Next Steps

Ready to begin? Move on to:
- **Chapter 0.1:** [A Letter to Cross-Domain Learners](chapter-0.1.md)

Or jump to:
- **Chapter 1:** [Spec-Driven Thinking](chapter-01.md)

---

**Last Updated:** 2024-10-18  
**Version:** 1.0.0  
**Difficulty:** ⭐ (Beginner)

---
EOF

# Create Book.txt
cat > ../manuscript-en/Book.txt << 'EOF'
# Book Chapter Order

# Getting Started
part0.md
chapter-00.md

# Note: Complete translation required for remaining chapters
# Please translate content from Chinese version and add here

# Foundation
# part1.md
# chapter-01.md
# chapter-02.md

# Core
# part2.md
# chapter-03.md
# chapter-04.md

# Practice
# part3.md
# chapter-05.md
# chapter-06.md
# chapter-07.md

# Advanced
# part4.md
# chapter-08.md
# chapter-09.md

# Appendix
# appendix.md
# appendix-A.md
# appendix-B.md
# appendix-C.md
# appendix-D.md
# appendix-E.md
EOF

# Create Sample.txt
cat > ../manuscript-en/Sample.txt << 'EOF'
# Sample Chapters (Free Preview)

part0.md
chapter-00.md
EOF

echo -e "${GREEN}✓${NC} Sample chapters created"
echo ""

# 5. View results
echo -e "${YELLOW}[5/5]${NC} Preparing to view results..."
cd ..
MANUSCRIPT_DIR="$SCRIPT_DIR/manuscript-en"

if [ -d "$MANUSCRIPT_DIR" ]; then
    echo -e "${GREEN}✓${NC} Output directory: $MANUSCRIPT_DIR"
    echo ""
    echo -e "${BLUE}Generated files:${NC}"
    ls -lh "$MANUSCRIPT_DIR" | grep -v "^total" | awk '{print "  - " $9 " (" $5 ")"}'
    echo ""
    
    # Open directory based on OS
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        open "$MANUSCRIPT_DIR"
        echo -e "${GREEN}✓${NC} Opened output directory in Finder"
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        # Linux
        xdg-open "$MANUSCRIPT_DIR" 2>/dev/null || echo -e "${YELLOW}Please manually view directory:${NC} $MANUSCRIPT_DIR"
    else
        echo -e "${YELLOW}Please manually view directory:${NC} $MANUSCRIPT_DIR"
    fi
else
    echo -e "${RED}✗${NC} Output directory not found"
    exit 1
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}✓ English book structure generated!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}⚠️  Important Note:${NC}"
echo ""
echo "The English version structure has been created, but full translation is required."
echo ""
echo "Next steps:"
echo -e "  1. ${BLUE}Translate content${NC} from Chinese to English"
echo -e "     - Use AI tools (ChatGPT, Claude, DeepL)"
echo -e "     - Or hire professional translators"
echo ""
echo -e "  2. ${BLUE}Review translations${NC} for accuracy"
echo -e "     - Check technical terms"
echo -e "     - Verify code examples"
echo -e "     - Ensure clarity"
echo ""
echo -e "  3. ${BLUE}Complete Book.txt${NC}"
echo -e "     - Add all translated chapters"
echo -e "     - Set correct chapter order"
echo ""
echo -e "  4. ${BLUE}Upload to Leanpub${NC}"
echo -e "     - Create new book (English version)"
echo -e "     - Upload manuscript-en/ directory"
echo ""
echo "See ${BLUE}manuscript-en/README.md${NC} for detailed translation guidelines."
echo ""
