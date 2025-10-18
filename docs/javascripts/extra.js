// 自定義 JavaScript

// 學習進度追蹤
document.addEventListener('DOMContentLoaded', function() {
  // 追蹤已完成的章節
  const completedChapters = JSON.parse(localStorage.getItem('completedChapters') || '[]');
  
  // 更新進度條
  function updateProgress() {
    const totalChapters = 13; // 總章節數
    const completed = completedChapters.length;
    const percentage = (completed / totalChapters) * 100;
    
    const progressBar = document.querySelector('.progress-bar-fill');
    if (progressBar) {
      progressBar.style.width = percentage + '%';
    }
  }
  
  // 標記章節為已完成
  function markChapterComplete(chapterId) {
    if (!completedChapters.includes(chapterId)) {
      completedChapters.push(chapterId);
      localStorage.setItem('completedChapters', JSON.stringify(completedChapters));
      updateProgress();
    }
  }
  
  // 添加「標記為已完成」按鈕
  const content = document.querySelector('.md-content');
  if (content) {
    const completeButton = document.createElement('button');
    completeButton.className = 'md-button md-button--primary';
    completeButton.textContent = '✓ 標記為已完成';
    completeButton.style.cssText = 'position: fixed; bottom: 20px; right: 20px; z-index: 1000;';
    
    completeButton.addEventListener('click', function() {
      const currentPath = window.location.pathname;
      markChapterComplete(currentPath);
      completeButton.textContent = '✓ 已完成';
      completeButton.disabled = true;
    });
    
    document.body.appendChild(completeButton);
  }
  
  updateProgress();
});

// 平滑滾動
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// 程式碼區塊增強
document.addEventListener('DOMContentLoaded', function() {
  // 為程式碼區塊添加語言標籤
  document.querySelectorAll('pre code').forEach(function(block) {
    const language = block.className.match(/language-(\w+)/);
    if (language) {
      const label = document.createElement('div');
      label.className = 'code-label';
      label.textContent = language[1].toUpperCase();
      label.style.cssText = 'position: absolute; top: 0; right: 0; padding: 0.2em 0.5em; background: rgba(0,0,0,0.5); color: white; font-size: 0.8em; border-radius: 0 0 0 0.3em;';
      block.parentElement.style.position = 'relative';
      block.parentElement.insertBefore(label, block);
    }
  });
});

// 閱讀時間估算
document.addEventListener('DOMContentLoaded', function() {
  const content = document.querySelector('.md-content__inner');
  if (content) {
    const text = content.textContent;
    const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length;
    const englishWords = text.replace(/[\u4e00-\u9fa5]/g, '').split(/\s+/).filter(w => w.length > 0).length;
    
    // 中文 200 字/分鐘，英文 200 詞/分鐘
    const minutes = Math.ceil((chineseChars / 200) + (englishWords / 200));
    
    if (minutes > 0) {
      const readingTime = document.createElement('div');
      readingTime.className = 'reading-time';
      readingTime.innerHTML = `<em>📖 預計閱讀時間：${minutes} 分鐘</em>`;
      readingTime.style.cssText = 'color: #666; font-size: 0.9em; margin: 1em 0; padding: 0.5em; background: #f5f5f5; border-radius: 0.3em;';
      
      const firstHeading = content.querySelector('h1');
      if (firstHeading && firstHeading.nextSibling) {
        firstHeading.parentNode.insertBefore(readingTime, firstHeading.nextSibling);
      }
    }
  }
});

// 外部連結在新視窗開啟
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="http"]').forEach(function(link) {
    if (!link.hostname.includes(window.location.hostname)) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
});

// 任務清單互動
document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.task-list-item input[type="checkbox"]');
  checkboxes.forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
      const taskId = this.parentElement.textContent.trim();
      const tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
      tasks[taskId] = this.checked;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    
    // 恢復已保存的狀態
    const taskId = checkbox.parentElement.textContent.trim();
    const tasks = JSON.parse(localStorage.getItem('tasks') || '{}');
    if (tasks[taskId]) {
      checkbox.checked = true;
    }
  });
});

// 列印優化
window.addEventListener('beforeprint', function() {
  // 展開所有摺疊區塊
  document.querySelectorAll('details').forEach(function(detail) {
    detail.setAttribute('open', '');
  });
});

// Google Analytics（如果需要）
if (typeof gtag !== 'undefined') {
  // 追蹤頁面瀏覽
  gtag('event', 'page_view', {
    page_path: window.location.pathname
  });
}
