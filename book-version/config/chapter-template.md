# 第 {chapter_number} 章：{chapter_title}

---

{#if part_title}
**所屬部分：** {part_title}
{/if}

{#if learning_week}
**建議學習週次：** 第 {learning_week} 週
{/if}

---

## 🎯 本章學習目標

完成本章後，你將能夠：

{#each learning_objectives}
- ✅ {objective}
{/each}

**預計學習時間：** {estimated_reading_time} 分鐘

---

{#if chapter_summary}
## 📖 章節概述

{chapter_summary}

---
{/if}

## 📚 核心內容

{main_content}

---

{#if key_concepts}
## 🔑 核心概念速覽

{#each key_concepts}
### {concept.title}

{concept.description}

{#if concept.example}
**範例：**
```
{concept.example}
```
{/if}

{/each}

---
{/if}

{#if practice_tasks}
## 💻 實作任務

{#each practice_tasks}
### 任務 {task_index}：{task.title}

**任務描述：**
{task.description}

**預期時間：** {task.time}

**難度等級：** {task.difficulty} ⭐

**驗證方式：**
{#each task.checkpoints}
- [ ] {checkpoint}
{/each}

{#if task.hints}
**💡 提示：**
{#each task.hints}
- {hint}
{/each}
{/if}

{#if task.colab_link}
**🔗 Colab Notebook：** [{task.colab_title}]({task.colab_link})
{/if}

---

{/each}
{/if}

{#if code_examples}
## 💡 程式碼範例

{#each code_examples}
### 範例 {example_index}：{example.title}

{example.description}

```{example.language}
{example.code}
```

**說明：**
{example.explanation}

---

{/each}
{/if}

{#if common_mistakes}
## ⚠️ 常見錯誤與解決方案

{#each common_mistakes}
### 錯誤 {mistake_index}：{mistake.title}

**問題描述：**
{mistake.description}

**為什麼會發生：**
{mistake.reason}

**解決方案：**
{mistake.solution}

{#if mistake.example}
**範例：**
```
{mistake.example}
```
{/if}

---

{/each}
{/if}

## ✅ 自我檢測清單

完成本章後，請確認你能夠：

{#each self_check_items}
- [ ] {item}
{/each}

{#if self_check_items.length > 0}
> 💡 **建議：** 如果有任何項目尚未掌握，建議回顧相關章節或在學習筆記區記錄疑問。
{/if}

---

{#if quiz_questions}
## 🤔 思考題

{#each quiz_questions}
### 問題 {question_index}

{question.text}

{#if question.type === 'multiple_choice'}
{#each question.options}
- [ ] {option}
{/each}
{/if}

{#if question.hint}
**提示：** {question.hint}
{/if}

<details>
<summary>💡 參考答案</summary>

{question.answer}

**解釋：**
{question.explanation}

</details>

---

{/each}
{/if}

## 📝 學習筆記區

> 💡 **提示：** 在這裡記錄你的學習心得、疑問、想法或實作過程中的發現

---

（留白供讀者書寫）

---

{#if related_resources}
## 📚 延伸閱讀

{#each related_resources}
- **{resource.title}**
  - 類型：{resource.type}
  - 連結：[{resource.link_text}]({resource.link})
  - 說明：{resource.description}
{/each}

---
{/if}

{#if next_chapter}
## ➡️ 下一步

完成本章後，你可以：

1. **繼續下一章：** [{next_chapter.title}]({next_chapter.link})
2. **複習本章內容：** 確保所有檢測項目都已完成
3. **實作練習：** 完成所有實作任務並驗證結果
4. **加入討論：** 在社群中分享你的學習心得

---
{/if}

{#if chapter_metadata}
---

**章節元數據**
- 最後更新：{chapter_metadata.last_updated}
- 版本：{chapter_metadata.version}
- 難度等級：{chapter_metadata.difficulty}
- 關鍵字：{chapter_metadata.keywords}

---
{/if}
