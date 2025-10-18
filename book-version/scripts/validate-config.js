#!/usr/bin/env node

const path = require('path');
const utils = require('./utils');

const CONFIG_DIR = path.join(__dirname, '../config');
const REPO_ROOT = path.resolve(__dirname, '../..');

/**
 * 驗證配置文件
 */
function validateConfiguration() {
  console.log('🔍 開始驗證配置文件...\n');
  
  let hasErrors = false;
  
  // 1. 驗證 book-config.yaml
  console.log('📋 驗證 book-config.yaml...');
  try {
    const config = utils.loadConfig(path.join(CONFIG_DIR, 'book-config.yaml'));
    
    if (!utils.validateConfig(config)) {
      hasErrors = true;
    }
    
    // 檢查來源文件是否存在
    console.log('\n📁 檢查來源文件...');
    const missingFiles = [];
    
    const checkChapters = (chapters, partName) => {
      if (!chapters) return;
      
      chapters.forEach((chapter, index) => {
        if (chapter.source_file) {
          const filePath = utils.resolvePath(REPO_ROOT, chapter.source_file);
          try {
            require('fs').accessSync(filePath);
            console.log(`   ✅ ${partName} - 章節 ${index + 1}: ${chapter.source_file}`);
          } catch (error) {
            console.log(`   ❌ ${partName} - 章節 ${index + 1}: ${chapter.source_file} (找不到文件)`);
            missingFiles.push(chapter.source_file);
            hasErrors = true;
          }
        }
      });
    };
    
    // 檢查各部分的章節
    ['part0', 'part1', 'part2', 'part3', 'part4'].forEach(part => {
      if (config.book_structure[part]) {
        checkChapters(config.book_structure[part].chapters, part);
      }
    });
    
    // 檢查附錄
    if (config.book_structure.appendix) {
      checkChapters(config.book_structure.appendix.sections, 'appendix');
    }
    
    if (missingFiles.length > 0) {
      console.log(`\n⚠️  找不到 ${missingFiles.length} 個來源文件`);
    }
    
  } catch (error) {
    console.error(`❌ 無法載入 book-config.yaml: ${error.message}`);
    hasErrors = true;
  }
  
  // 2. 驗證 metadata.yaml
  console.log('\n📋 驗證 metadata.yaml...');
  try {
    const metadata = utils.loadConfig(path.join(CONFIG_DIR, 'metadata.yaml'));
    
    const requiredFields = ['book.title', 'book.author', 'book.language'];
    requiredFields.forEach(field => {
      const keys = field.split('.');
      let value = metadata;
      keys.forEach(key => {
        value = value ? value[key] : undefined;
      });
      
      if (!value) {
        console.log(`   ❌ 缺少必要欄位: ${field}`);
        hasErrors = true;
      } else {
        console.log(`   ✅ ${field}: ${value}`);
      }
    });
    
  } catch (error) {
    console.error(`❌ 無法載入 metadata.yaml: ${error.message}`);
    hasErrors = true;
  }
  
  // 3. 檢查輸出目錄
  console.log('\n📁 檢查輸出目錄...');
  const outputDir = path.join(__dirname, '../manuscript');
  try {
    require('fs-extra').ensureDirSync(outputDir);
    console.log(`   ✅ 輸出目錄已就緒: ${outputDir}`);
  } catch (error) {
    console.error(`   ❌ 無法創建輸出目錄: ${error.message}`);
    hasErrors = true;
  }
  
  // 總結
  console.log('\n' + '='.repeat(50));
  if (hasErrors) {
    console.log('❌ 驗證失敗，請修正上述錯誤後重試');
    process.exit(1);
  } else {
    console.log('✅ 所有驗證通過，可以開始生成書籍！');
    console.log('\n💡 執行以下命令生成書籍：');
    console.log('   npm run generate:leanpub');
  }
}

// 執行驗證
if (require.main === module) {
  validateConfiguration();
}

module.exports = { validateConfiguration };
