#!/usr/bin/env node

/**
 * 自動翻譯腳本 - 使用 Gemini API
 * 將中文內容翻譯成英文
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Gemini API 配置
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// 路徑配置
const CONFIG_DIR = path.join(__dirname, '../config');
const REPO_ROOT = path.resolve(__dirname, '../..');
const OUTPUT_DIR = path.join(__dirname, '../manuscript-en');

// 顏色輸出
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

// 翻譯提示詞模板
const TRANSLATION_PROMPT = `You are a professional translator specializing in technical and educational content.

**Task:** Translate the following Traditional Chinese content to English.

**Context:**
- Book Title: "Coding with AI: A Non-Engineer's Guide"
- Target Audience: Non-engineers, beginners learning programming
- Tone: Friendly, educational, encouraging, professional

**Critical Guidelines:**

1. **Preserve ALL formatting:**
   - Keep ALL markdown syntax exactly (headers, lists, code blocks, links, etc.)
   - Keep ALL emojis exactly as they are
   - Preserve line breaks and spacing
   - Keep HTML tags if any

2. **Code blocks:**
   - DO NOT translate any code inside \`\`\` blocks
   - Keep code comments in English (or translate Chinese comments to English)
   - Preserve all code syntax exactly

3. **Technical terms (use these exact translations):**
   - 規格驅動開發 → Spec-Driven Development (SDD)
   - 非工程師 → non-engineers
   - AI 工具 → AI tools
   - 實戰專案 → hands-on projects
   - 學習目標 → learning objectives
   - 自我檢測 → self-check
   - 常見錯誤 → common mistakes
   - 實作任務 → practice tasks
   - 閱讀時間 → reading time
   - 檢核點 → checkpoint

4. **Keep unchanged:**
   - URLs and links
   - Tool names (GitHub Copilot, ChatGPT, Claude, Cursor, etc.)
   - File paths and commands
   - Numbers and statistics

5. **Translation style:**
   - Use clear, natural English
   - Maintain the friendly, encouraging tone
   - Use active voice when possible
   - Keep sentences concise
   - Adapt cultural references for international audience

6. **Output format:**
   - Return ONLY the translated content
   - Do NOT add any explanations or comments
   - Do NOT add "Here is the translation:" or similar phrases
   - Start directly with the translated content

---

**Content to translate:**

`;

// 檢查 API Key
function checkApiKey() {
  if (!GEMINI_API_KEY) {
    log('\n❌ 錯誤：找不到 GEMINI_API_KEY', 'red');
    log('\n請設定環境變數：', 'yellow');
    log('  export GEMINI_API_KEY="your-api-key-here"', 'blue');
    log('\n或在 .env 文件中設定：', 'yellow');
    log('  GEMINI_API_KEY=your-api-key-here', 'blue');
    log('\n取得 API Key：', 'yellow');
    log('  https://makersuite.google.com/app/apikey', 'blue');
    process.exit(1);
  }
  log('✓ API Key 已設定', 'green');
}

// 呼叫 Gemini API 翻譯
async function translateWithGemini(text) {
  const prompt = TRANSLATION_PROMPT + text;
  
  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.3,  // 較低的溫度以保持一致性
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 8192,
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`API 錯誤: ${response.status} - ${error}`);
    }

    const data = await response.json();
    
    if (!data.candidates || !data.candidates[0] || !data.candidates[0].content) {
      throw new Error('API 回應格式錯誤');
    }

    const translatedText = data.candidates[0].content.parts[0].text;
    return translatedText.trim();
    
  } catch (error) {
    log(`\n❌ 翻譯錯誤: ${error.message}`, 'red');
    throw error;
  }
}

// 讀取中文文件
function readSourceFile(filePath) {
  const fullPath = path.join(REPO_ROOT, filePath);
  
  if (!fs.existsSync(fullPath)) {
    throw new Error(`找不到文件: ${fullPath}`);
  }
  
  return fs.readFileSync(fullPath, 'utf-8');
}

// 儲存翻譯結果
function saveTranslation(outputFileName, content) {
  const outputPath = path.join(OUTPUT_DIR, outputFileName);
  
  // 確保輸出目錄存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
  
  fs.writeFileSync(outputPath, content, 'utf-8');
  log(`  ✓ 已儲存: ${outputFileName}`, 'green');
}

// 翻譯單一章節
async function translateChapter(chapterConfig, chapterNumber) {
  const { title, source_file } = chapterConfig;
  const outputFileName = `chapter-${String(chapterNumber).padStart(2, '0')}.md`;
  
  log(`\n[${chapterNumber}] 翻譯: ${title}`, 'blue');
  log(`  來源: ${source_file}`, 'yellow');
  
  try {
    // 讀取中文內容
    const chineseContent = readSourceFile(source_file);
    log(`  ✓ 已讀取 (${chineseContent.length} 字元)`, 'green');
    
    // 分段翻譯（如果內容太長）
    const maxChunkSize = 4000; // 每次翻譯的最大字元數
    let translatedContent = '';
    
    if (chineseContent.length <= maxChunkSize) {
      // 一次翻譯
      log(`  ⏳ 翻譯中...`, 'yellow');
      translatedContent = await translateWithGemini(chineseContent);
    } else {
      // 分段翻譯
      const chunks = splitIntoChunks(chineseContent, maxChunkSize);
      log(`  ⏳ 分 ${chunks.length} 段翻譯...`, 'yellow');
      
      for (let i = 0; i < chunks.length; i++) {
        log(`    段落 ${i + 1}/${chunks.length}...`, 'yellow');
        const translated = await translateWithGemini(chunks[i]);
        translatedContent += translated + '\n\n';
        
        // 避免 API 限制，每段之間暫停
        if (i < chunks.length - 1) {
          await sleep(2000); // 暫停 2 秒
        }
      }
    }
    
    // 加入章節元數據
    const metadata = `# ${title}\n\n---\n\n**Chapter:** ${chapterNumber}\n\n---\n\n`;
    const finalContent = metadata + translatedContent;
    
    // 儲存翻譯結果
    saveTranslation(outputFileName, finalContent);
    log(`  ✓ 完成翻譯`, 'green');
    
    return true;
    
  } catch (error) {
    log(`  ❌ 翻譯失敗: ${error.message}`, 'red');
    return false;
  }
}

// 將長文本分段
function splitIntoChunks(text, maxSize) {
  const chunks = [];
  const paragraphs = text.split('\n\n');
  let currentChunk = '';
  
  for (const para of paragraphs) {
    if (currentChunk.length + para.length > maxSize && currentChunk.length > 0) {
      chunks.push(currentChunk.trim());
      currentChunk = para;
    } else {
      currentChunk += (currentChunk ? '\n\n' : '') + para;
    }
  }
  
  if (currentChunk) {
    chunks.push(currentChunk.trim());
  }
  
  return chunks;
}

// 暫停函數
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// 主函數
async function main() {
  log('\n========================================', 'blue');
  log('  自動翻譯系統 - Gemini API', 'blue');
  log('========================================\n', 'blue');
  
  // 1. 檢查 API Key
  log('[1/4] 檢查 API Key...', 'yellow');
  checkApiKey();
  
  // 2. 讀取配置
  log('\n[2/4] 讀取配置文件...', 'yellow');
  const configPath = path.join(CONFIG_DIR, 'book-config-en.yaml');
  const config = yaml.load(fs.readFileSync(configPath, 'utf-8'));
  log('✓ 配置已載入', 'green');
  
  // 3. 收集所有需要翻譯的章節
  log('\n[3/4] 收集章節...', 'yellow');
  const chapters = [];
  
  // Part 0
  if (config.book_structure.part0) {
    chapters.push(...config.book_structure.part0.chapters);
  }
  
  // Part 1
  if (config.book_structure.part1) {
    chapters.push(...config.book_structure.part1.chapters);
  }
  
  // Part 2
  if (config.book_structure.part2) {
    chapters.push(...config.book_structure.part2.chapters);
  }
  
  // Part 3
  if (config.book_structure.part3) {
    chapters.push(...config.book_structure.part3.chapters);
  }
  
  // Part 4
  if (config.book_structure.part4) {
    chapters.push(...config.book_structure.part4.chapters);
  }
  
  log(`✓ 找到 ${chapters.length} 個章節`, 'green');
  
  // 4. 開始翻譯
  log('\n[4/4] 開始翻譯...', 'yellow');
  log('========================================\n', 'blue');
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < chapters.length; i++) {
    const chapter = chapters[i];
    const success = await translateChapter(chapter, chapter.chapter_number);
    
    if (success) {
      successCount++;
    } else {
      failCount++;
    }
    
    // 避免 API 限制
    if (i < chapters.length - 1) {
      log('\n  ⏸️  暫停 3 秒...', 'yellow');
      await sleep(3000);
    }
  }
  
  // 5. 生成 Book.txt
  log('\n========================================', 'blue');
  log('生成 Book.txt...', 'yellow');
  generateBookTxt(chapters);
  
  // 6. 總結
  log('\n========================================', 'blue');
  log('翻譯完成！', 'green');
  log('========================================\n', 'blue');
  log(`✓ 成功: ${successCount} 章`, 'green');
  if (failCount > 0) {
    log(`✗ 失敗: ${failCount} 章`, 'red');
  }
  log(`\n輸出目錄: ${OUTPUT_DIR}`, 'blue');
  log('\n下一步：', 'yellow');
  log('  1. 檢查翻譯品質', 'blue');
  log('  2. 手動調整（如需要）', 'blue');
  log('  3. 上傳到 Leanpub', 'blue');
  log('');
}

// 生成 Book.txt
function generateBookTxt(chapters) {
  let bookTxt = '# Book Chapter Order\n\n';
  bookTxt += '# English Version\n\n';
  
  // 按 Part 分組
  const parts = {
    0: [],
    1: [],
    2: [],
    3: [],
    4: []
  };
  
  chapters.forEach(chapter => {
    const chapterNum = chapter.chapter_number;
    if (chapterNum < 1) {
      parts[0].push(chapter);
    } else if (chapterNum <= 2) {
      parts[1].push(chapter);
    } else if (chapterNum <= 4) {
      parts[2].push(chapter);
    } else if (chapterNum <= 7) {
      parts[3].push(chapter);
    } else {
      parts[4].push(chapter);
    }
  });
  
  // Part 0
  if (parts[0].length > 0) {
    bookTxt += '# Part 0: Getting Started\n';
    parts[0].forEach(ch => {
      const fileName = `chapter-${String(ch.chapter_number).padStart(2, '0')}.md`;
      bookTxt += `${fileName}\n`;
    });
    bookTxt += '\n';
  }
  
  // Part 1
  if (parts[1].length > 0) {
    bookTxt += '# Part 1: Foundation\n';
    parts[1].forEach(ch => {
      const fileName = `chapter-${String(ch.chapter_number).padStart(2, '0')}.md`;
      bookTxt += `${fileName}\n`;
    });
    bookTxt += '\n';
  }
  
  // Part 2
  if (parts[2].length > 0) {
    bookTxt += '# Part 2: Core\n';
    parts[2].forEach(ch => {
      const fileName = `chapter-${String(ch.chapter_number).padStart(2, '0')}.md`;
      bookTxt += `${fileName}\n`;
    });
    bookTxt += '\n';
  }
  
  // Part 3
  if (parts[3].length > 0) {
    bookTxt += '# Part 3: Practice\n';
    parts[3].forEach(ch => {
      const fileName = `chapter-${String(ch.chapter_number).padStart(2, '0')}.md`;
      bookTxt += `${fileName}\n`;
    });
    bookTxt += '\n';
  }
  
  // Part 4
  if (parts[4].length > 0) {
    bookTxt += '# Part 4: Advanced\n';
    parts[4].forEach(ch => {
      const fileName = `chapter-${String(ch.chapter_number).padStart(2, '0')}.md`;
      bookTxt += `${fileName}\n`;
    });
    bookTxt += '\n';
  }
  
  saveTranslation('Book.txt', bookTxt);
  log('✓ Book.txt 已生成', 'green');
}

// 執行
if (require.main === module) {
  main().catch(error => {
    log(`\n❌ 執行錯誤: ${error.message}`, 'red');
    console.error(error);
    process.exit(1);
  });
}

module.exports = { translateWithGemini };
