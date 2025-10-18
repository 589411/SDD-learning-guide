#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const Mustache = require('mustache');
const utils = require('./utils');

// 配置路徑
const CONFIG_DIR = path.join(__dirname, '../config');
const REPO_ROOT = path.resolve(__dirname, '../..');
const OUTPUT_DIR = path.join(__dirname, '../manuscript');

/**
 * 主要生成函數
 */
async function generateBook(options = {}) {
  console.log('📚 開始生成書籍...\n');
  
  // 1. 載入配置
  console.log('📖 載入配置文件...');
  const config = utils.loadConfig(path.join(CONFIG_DIR, 'book-config.yaml'));
  const metadata = utils.loadConfig(path.join(CONFIG_DIR, 'metadata.yaml'));
  
  // 2. 驗證配置
  if (!utils.validateConfig(config)) {
    process.exit(1);
  }
  
  // 3. 準備輸出目錄
  console.log('\n📁 準備輸出目錄...');
  utils.ensureDir(OUTPUT_DIR);
  
  // 4. 生成各部分
  const allChapters = [];
  let chapterCount = 0;
  const totalParts = 6; // part0-4 + appendix
  
  console.log('\n📝 開始生成章節...\n');
  
  // Part 0: 開始之前
  console.log('📌 Part 0: 開始之前');
  const part0Chapters = await generatePart(config.book_structure.part0, 'part0', config);
  allChapters.push(...part0Chapters);
  chapterCount += part0Chapters.length;
  
  // Part 1: 基礎篇
  console.log('\n📌 Part 1: 基礎篇');
  const part1Chapters = await generatePart(config.book_structure.part1, 'part1', config);
  allChapters.push(...part1Chapters);
  chapterCount += part1Chapters.length;
  
  // Part 2: 核心篇
  console.log('\n📌 Part 2: 核心篇');
  const part2Chapters = await generatePart(config.book_structure.part2, 'part2', config);
  allChapters.push(...part2Chapters);
  chapterCount += part2Chapters.length;
  
  // Part 3: 實戰篇
  console.log('\n📌 Part 3: 實戰篇');
  const part3Chapters = await generatePart(config.book_structure.part3, 'part3', config);
  allChapters.push(...part3Chapters);
  chapterCount += part3Chapters.length;
  
  // Part 4: 進階篇
  console.log('\n📌 Part 4: 進階篇');
  const part4Chapters = await generatePart(config.book_structure.part4, 'part4', config);
  allChapters.push(...part4Chapters);
  chapterCount += part4Chapters.length;
  
  // Appendix: 附錄
  console.log('\n📌 附錄');
  const appendixChapters = await generateAppendix(config.book_structure.appendix, config);
  allChapters.push(...appendixChapters);
  chapterCount += appendixChapters.length;
  
  // 5. 生成 Book.txt
  console.log('\n📋 生成 Book.txt...');
  const bookTxt = utils.generateBookTxt(allChapters);
  utils.writeFile(path.join(OUTPUT_DIR, 'Book.txt'), bookTxt);
  
  // 6. 生成 Sample.txt
  console.log('📋 生成 Sample.txt（前 3 章試閱）...');
  const sampleTxt = utils.generateSampleTxt(allChapters, 3);
  utils.writeFile(path.join(OUTPUT_DIR, 'Sample.txt'), sampleTxt);
  
  // 7. 生成統計報告
  console.log('\n📊 生成統計報告...');
  generateReport(allChapters, metadata);
  
  console.log('\n✅ 書籍生成完成！');
  console.log(`\n📁 輸出目錄: ${OUTPUT_DIR}`);
  console.log(`📚 總章節數: ${chapterCount}`);
}

/**
 * 生成單個部分的所有章節
 */
async function generatePart(partConfig, partId, globalConfig) {
  const chapters = [];
  
  // 添加部分標題頁
  const partTitle = `# ${partConfig.title}\n\n${partConfig.description || ''}\n`;
  const partFilename = `${partId}.md`;
  utils.writeFile(path.join(OUTPUT_DIR, partFilename), partTitle);
  
  chapters.push({
    type: 'part',
    title: partConfig.title,
    filename: partFilename
  });
  
  // 生成各章節
  if (partConfig.chapters) {
    for (let i = 0; i < partConfig.chapters.length; i++) {
      const chapterConfig = partConfig.chapters[i];
      const chapter = await generateChapter(chapterConfig, partConfig, globalConfig);
      chapters.push(chapter);
      
      utils.showProgress(i + 1, partConfig.chapters.length, `生成 ${chapter.title}`);
    }
  }
  
  return chapters;
}

/**
 * 生成單個章節
 */
async function generateChapter(chapterConfig, partConfig, globalConfig) {
  const sourceFile = utils.resolvePath(REPO_ROOT, chapterConfig.source_file);
  const { frontmatter, content } = utils.loadMarkdownFile(sourceFile);
  
  // 提取基本資訊
  const title = chapterConfig.title || utils.extractTitle(content);
  const chapterNumber = chapterConfig.chapter_number;
  
  // 計算閱讀時間
  const readingTime = utils.calculateReadingTime(content);
  
  // 準備章節數據
  const chapterData = {
    chapter_number: chapterNumber,
    chapter_title: title,
    part_title: partConfig.title,
    learning_week: partConfig.learning_weeks ? partConfig.learning_weeks.join('-') : null,
    estimated_reading_time: readingTime.minutes,
    main_content: content,
    ...frontmatter
  };
  
  // 添加互動元素
  if (globalConfig.generation_options.add_interactive_elements) {
    addInteractiveElements(chapterData, chapterConfig, globalConfig);
  }
  
  // 生成章節內容
  const chapterContent = renderChapter(chapterData, globalConfig);
  
  // 寫入文件
  const filename = `chapter-${String(chapterNumber).padStart(2, '0')}.md`;
  utils.writeFile(path.join(OUTPUT_DIR, filename), chapterContent);
  
  return {
    type: 'chapter',
    number: chapterNumber,
    title: title,
    filename: filename,
    readingTime: readingTime.minutes,
    wordCount: readingTime.chineseChars + readingTime.englishWords
  };
}

/**
 * 添加互動元素
 */
function addInteractiveElements(chapterData, chapterConfig, globalConfig) {
  // 學習目標
  if (chapterConfig.include_elements?.includes('learning_objectives')) {
    chapterData.learning_objectives = [
      '理解本章核心概念',
      '完成實作任務',
      '通過自我檢測'
    ];
  }
  
  // 實作任務
  if (chapterConfig.add_content?.practice_task_1) {
    chapterData.practice_tasks = [chapterConfig.add_content.practice_task_1];
  }
  
  // 自我檢測
  if (chapterConfig.include_elements?.includes('self_check')) {
    chapterData.self_check_items = [
      '理解本章所有核心概念',
      '完成所有實作任務',
      '能夠應用所學知識解決問題'
    ];
  }
  
  // 常見錯誤
  if (chapterConfig.include_elements?.includes('common_mistakes')) {
    chapterData.common_mistakes = [];
  }
}

/**
 * 渲染章節（使用簡化的模板）
 */
function renderChapter(data, config) {
  let content = `# 第 ${data.chapter_number} 章：${data.chapter_title}\n\n`;
  content += `---\n\n`;
  
  if (data.part_title) {
    content += `**所屬部分：** ${data.part_title}\n\n`;
  }
  
  if (data.learning_week) {
    content += `**建議學習週次：** 第 ${data.learning_week} 週\n\n`;
  }
  
  content += `---\n\n`;
  
  // 學習目標
  if (data.learning_objectives) {
    content += `## 🎯 本章學習目標\n\n`;
    content += `完成本章後，你將能夠：\n\n`;
    content += utils.generateObjectivesList(data.learning_objectives);
    content += `\n\n**預計學習時間：** ${data.estimated_reading_time} 分鐘\n\n`;
    content += `---\n\n`;
  }
  
  // 主要內容
  content += `## 📚 核心內容\n\n`;
  content += data.main_content;
  content += `\n\n---\n\n`;
  
  // 實作任務
  if (data.practice_tasks && data.practice_tasks.length > 0) {
    content += `## 💻 實作任務\n\n`;
    data.practice_tasks.forEach((task, index) => {
      content += utils.generatePracticeTask(task, index + 1);
    });
    content += `\n---\n\n`;
  }
  
  // 自我檢測
  if (data.self_check_items) {
    content += `## ✅ 自我檢測清單\n\n`;
    content += `完成本章後，請確認你能夠：\n\n`;
    content += utils.generateChecklist(data.self_check_items);
    content += `\n\n> 💡 **建議：** 如果有任何項目尚未掌握，建議回顧相關章節或在學習筆記區記錄疑問。\n\n`;
    content += `---\n\n`;
  }
  
  // 學習筆記區
  content += `## 📝 學習筆記區\n\n`;
  content += `> 💡 **提示：** 在這裡記錄你的學習心得、疑問、想法或實作過程中的發現\n\n`;
  content += `---\n\n`;
  content += `（留白供讀者書寫）\n\n`;
  content += `---\n\n`;
  
  return content;
}

/**
 * 生成附錄
 */
async function generateAppendix(appendixConfig, globalConfig) {
  const chapters = [];
  
  // 添加附錄標題頁
  const appendixTitle = `# 附錄\n\n`;
  utils.writeFile(path.join(OUTPUT_DIR, 'appendix.md'), appendixTitle);
  
  chapters.push({
    type: 'part',
    title: '附錄',
    filename: 'appendix.md'
  });
  
  // 生成各附錄章節
  if (appendixConfig.sections) {
    for (let i = 0; i < appendixConfig.sections.length; i++) {
      const section = appendixConfig.sections[i];
      const sourceFile = utils.resolvePath(REPO_ROOT, section.source_file);
      const { content } = utils.loadMarkdownFile(sourceFile);
      
      const appendixContent = `# ${section.title}\n\n${content}`;
      const filename = `appendix-${String.fromCharCode(65 + i)}.md`; // A, B, C...
      
      utils.writeFile(path.join(OUTPUT_DIR, filename), appendixContent);
      
      chapters.push({
        type: 'appendix',
        title: section.title,
        filename: filename
      });
      
      utils.showProgress(i + 1, appendixConfig.sections.length, `生成 ${section.title}`);
    }
  }
  
  return chapters;
}

/**
 * 生成統計報告
 */
function generateReport(chapters, metadata) {
  const report = {
    generated_at: utils.formatDate(),
    book_title: metadata.book.title,
    total_chapters: chapters.filter(ch => ch.type === 'chapter').length,
    total_parts: chapters.filter(ch => ch.type === 'part').length,
    total_reading_time: chapters
      .filter(ch => ch.readingTime)
      .reduce((sum, ch) => sum + ch.readingTime, 0),
    chapters: chapters
  };
  
  const reportContent = `# 書籍生成報告

生成時間：${report.generated_at}
書名：${report.book_title}

## 統計資訊

- 總章節數：${report.total_chapters}
- 總部分數：${report.total_parts}
- 預計閱讀時間：${report.total_reading_time} 分鐘（約 ${Math.round(report.total_reading_time / 60)} 小時）

## 章節列表

${chapters.map(ch => {
  if (ch.type === 'part') {
    return `\n### ${ch.title}\n`;
  } else {
    return `- 第 ${ch.number} 章：${ch.title}（${ch.readingTime} 分鐘）`;
  }
}).join('\n')}

---

生成工具：SDD Book Generator v1.0.0
`;
  
  utils.writeFile(path.join(OUTPUT_DIR, 'REPORT.md'), reportContent);
  
  console.log(`\n📊 統計資訊：`);
  console.log(`   - 總章節數：${report.total_chapters}`);
  console.log(`   - 預計閱讀時間：${Math.round(report.total_reading_time / 60)} 小時`);
}

/**
 * 命令行入口
 */
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    format: 'leanpub',
    preview: false
  };
  
  // 解析命令行參數
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--format' && args[i + 1]) {
      options.format = args[i + 1];
      i++;
    } else if (args[i] === '--preview') {
      options.preview = true;
    }
  }
  
  generateBook(options).catch(error => {
    console.error('\n❌ 生成失敗:', error.message);
    process.exit(1);
  });
}

module.exports = { generateBook };
