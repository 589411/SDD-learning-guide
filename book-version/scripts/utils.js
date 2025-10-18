const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');
const matter = require('gray-matter');
const readingTime = require('reading-time');

/**
 * 讀取 YAML 配置文件
 */
function loadConfig(configPath) {
  try {
    const fileContents = fs.readFileSync(configPath, 'utf8');
    return yaml.load(fileContents);
  } catch (error) {
    console.error(`❌ 無法讀取配置文件: ${configPath}`);
    throw error;
  }
}

/**
 * 讀取 Markdown 文件（支持 frontmatter）
 */
function loadMarkdownFile(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return {
      frontmatter: data,
      content: content.trim()
    };
  } catch (error) {
    console.warn(`⚠️  無法讀取文件: ${filePath}`);
    return {
      frontmatter: {},
      content: ''
    };
  }
}

/**
 * 計算閱讀時間（中文：200字/分鐘，英文：200詞/分鐘）
 */
function calculateReadingTime(text) {
  // 移除 Markdown 語法
  const plainText = text
    .replace(/```[\s\S]*?```/g, '') // 移除程式碼區塊
    .replace(/`[^`]+`/g, '') // 移除行內程式碼
    .replace(/!\[.*?\]\(.*?\)/g, '') // 移除圖片
    .replace(/\[.*?\]\(.*?\)/g, '') // 移除連結
    .replace(/[#*_~`]/g, ''); // 移除 Markdown 符號

  // 計算中文字符數
  const chineseChars = (plainText.match(/[\u4e00-\u9fa5]/g) || []).length;
  
  // 計算英文單詞數
  const englishWords = plainText
    .replace(/[\u4e00-\u9fa5]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // 中文 200 字/分鐘，英文 200 詞/分鐘
  const minutes = Math.ceil((chineseChars / 200) + (englishWords / 200));
  
  return {
    minutes: minutes,
    text: `${minutes} 分鐘`,
    chineseChars,
    englishWords
  };
}

/**
 * 提取章節標題
 */
function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '未命名章節';
}

/**
 * 提取章節摘要（第一段文字）
 */
function extractSummary(content, maxLength = 200) {
  // 移除標題
  const withoutTitle = content.replace(/^#\s+.+$/m, '').trim();
  
  // 取得第一段
  const firstParagraph = withoutTitle.split('\n\n')[0];
  
  // 移除 Markdown 語法
  const plainText = firstParagraph
    .replace(/[#*_~`]/g, '')
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    .trim();
  
  if (plainText.length <= maxLength) {
    return plainText;
  }
  
  return plainText.substring(0, maxLength) + '...';
}

/**
 * 生成學習目標列表
 */
function generateObjectivesList(objectives) {
  if (!objectives || objectives.length === 0) {
    return '';
  }
  
  return objectives.map(obj => `- ✅ ${obj}`).join('\n');
}

/**
 * 生成檢核清單
 */
function generateChecklist(items) {
  if (!items || items.length === 0) {
    return '';
  }
  
  return items.map(item => `- [ ] ${item}`).join('\n');
}

/**
 * 生成實作任務區塊
 */
function generatePracticeTask(task, index) {
  return `
### 任務 ${index}：${task.title}

**任務描述：**
${task.description}

**預期時間：** ${task.time}

**驗證方式：**
${task.checkpoint}

${task.hints ? `**💡 提示：**\n${task.hints.map(h => `- ${h}`).join('\n')}` : ''}

---
`;
}

/**
 * 解析路徑（支持相對路徑）
 */
function resolvePath(basePath, relativePath) {
  if (path.isAbsolute(relativePath)) {
    return relativePath;
  }
  return path.resolve(basePath, relativePath);
}

/**
 * 確保目錄存在
 */
function ensureDir(dirPath) {
  fs.ensureDirSync(dirPath);
}

/**
 * 寫入文件
 */
function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ 已生成: ${filePath}`);
  } catch (error) {
    console.error(`❌ 無法寫入文件: ${filePath}`);
    throw error;
  }
}

/**
 * 格式化日期
 */
function formatDate(date = new Date()) {
  return date.toISOString().split('T')[0];
}

/**
 * 生成 Book.txt（Leanpub 章節順序文件）
 */
function generateBookTxt(chapters) {
  const lines = ['# 書籍章節順序', ''];
  
  chapters.forEach(chapter => {
    if (chapter.type === 'part') {
      lines.push(`# ${chapter.title}`);
    } else {
      lines.push(chapter.filename);
    }
  });
  
  return lines.join('\n');
}

/**
 * 生成 Sample.txt（Leanpub 試閱章節）
 */
function generateSampleTxt(chapters, sampleCount = 3) {
  const lines = ['# 試閱章節', ''];
  
  chapters
    .filter(ch => ch.type !== 'part')
    .slice(0, sampleCount)
    .forEach(chapter => {
      lines.push(chapter.filename);
    });
  
  return lines.join('\n');
}

/**
 * 驗證配置文件
 */
function validateConfig(config) {
  const errors = [];
  
  // 檢查必要欄位
  if (!config.book_metadata) {
    errors.push('缺少 book_metadata 配置');
  }
  
  if (!config.book_structure) {
    errors.push('缺少 book_structure 配置');
  }
  
  // 檢查章節配置
  const parts = ['part0', 'part1', 'part2', 'part3', 'part4', 'appendix'];
  parts.forEach(part => {
    if (config.book_structure[part]) {
      const chapters = config.book_structure[part].chapters || config.book_structure[part].sections;
      if (!chapters || chapters.length === 0) {
        errors.push(`${part} 沒有定義章節`);
      }
    }
  });
  
  if (errors.length > 0) {
    console.error('❌ 配置文件驗證失敗:');
    errors.forEach(err => console.error(`   - ${err}`));
    return false;
  }
  
  console.log('✅ 配置文件驗證通過');
  return true;
}

/**
 * 顯示進度
 */
function showProgress(current, total, message) {
  const percentage = Math.round((current / total) * 100);
  const bar = '█'.repeat(Math.floor(percentage / 2)) + '░'.repeat(50 - Math.floor(percentage / 2));
  process.stdout.write(`\r[${bar}] ${percentage}% - ${message}`);
  
  if (current === total) {
    console.log(''); // 換行
  }
}

module.exports = {
  loadConfig,
  loadMarkdownFile,
  calculateReadingTime,
  extractTitle,
  extractSummary,
  generateObjectivesList,
  generateChecklist,
  generatePracticeTask,
  resolvePath,
  ensureDir,
  writeFile,
  formatDate,
  generateBookTxt,
  generateSampleTxt,
  validateConfig,
  showProgress
};
