"""
個人知識庫管理器 - 主程式

這個模組提供完整的 CRUD 操作、標籤系統、搜尋和匯出功能。

使用說明：
1. 閱讀 specs/knowledge-base.spec.md 了解完整規格
2. 複製規格中的「完整規格複製區」
3. 貼給 AI 工具（Cursor/Windsurf/Claude）完成實作
4. 或使用 GitHub Spec Kit: /speckit.implement

TODO: 根據規格實作以下功能
- [ ] CRUD 操作（Create, Read, Update, Delete）
- [ ] 標籤系統（自動去重、標籤過濾）
- [ ] 搜尋功能（全文搜尋、標籤過濾）
- [ ] 匯出功能（Markdown, JSON, HTML）
"""

import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional


class KnowledgeBase:
    """個人知識庫管理器"""
    
    def __init__(self, db_path: str = "knowledge_base.json"):
        """
        初始化知識庫
        
        Args:
            db_path: 資料庫檔案路徑
        """
        self.db_path = Path(db_path)
        self.entries = self._load_database()
    
    def _load_database(self) -> Dict:
        """載入資料庫"""
        if self.db_path.exists():
            with open(self.db_path, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {}
    
    def _save_database(self):
        """儲存資料庫"""
        with open(self.db_path, 'w', encoding='utf-8') as f:
            json.dump(self.entries, f, ensure_ascii=False, indent=2)
    
    def _generate_id(self) -> str:
        """生成唯一 ID"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        count = len(self.entries) + 1
        return f"kb_{timestamp}_{count:03d}"
    
    def create(self, title: str, content: str, tags: List[str]) -> str:
        """
        新增知識條目
        
        Args:
            title: 標題
            content: 內容
            tags: 標籤列表
            
        Returns:
            新建條目的 ID
            
        TODO: 實作以下功能
        - [ ] 自動生成唯一 ID
        - [ ] 記錄建立時間
        - [ ] 計算字數和預估閱讀時間
        - [ ] 標籤自動去重和標準化
        """
        entry_id = self._generate_id()
        
        # TODO: 標籤去重和標準化
        normalized_tags = list(set([tag.lower() for tag in tags]))
        
        # TODO: 計算字數和閱讀時間
        word_count = len(content)
        read_time = max(1, word_count // 200)  # 假設每分鐘讀 200 字
        
        entry = {
            "id": entry_id,
            "title": title,
            "content": content,
            "tags": normalized_tags,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat(),
            "metadata": {
                "word_count": word_count,
                "read_time": read_time
            }
        }
        
        self.entries[entry_id] = entry
        self._save_database()
        
        return entry_id
    
    def read(self, entry_id: str) -> Optional[Dict]:
        """
        讀取單一條目
        
        Args:
            entry_id: 條目 ID
            
        Returns:
            條目內容，如果不存在則回傳 None
        """
        return self.entries.get(entry_id)
    
    def update(self, entry_id: str, title: Optional[str] = None,
               content: Optional[str] = None, tags: Optional[List[str]] = None) -> bool:
        """
        更新條目
        
        Args:
            entry_id: 條目 ID
            title: 新標題（可選）
            content: 新內容（可選）
            tags: 新標籤（可選）
            
        Returns:
            更新成功與否
            
        TODO: 實作部分更新功能
        - [ ] 只更新提供的欄位
        - [ ] 自動更新修改時間
        - [ ] 保持建立時間不變
        """
        if entry_id not in self.entries:
            return False
        
        entry = self.entries[entry_id]
        
        if title is not None:
            entry["title"] = title
        if content is not None:
            entry["content"] = content
            # 重新計算字數
            entry["metadata"]["word_count"] = len(content)
            entry["metadata"]["read_time"] = max(1, len(content) // 200)
        if tags is not None:
            entry["tags"] = list(set([tag.lower() for tag in tags]))
        
        entry["updated_at"] = datetime.now().isoformat()
        self._save_database()
        
        return True
    
    def delete(self, entry_id: str) -> bool:
        """
        刪除條目
        
        Args:
            entry_id: 條目 ID
            
        Returns:
            刪除成功與否
        """
        if entry_id in self.entries:
            del self.entries[entry_id]
            self._save_database()
            return True
        return False
    
    def list_all(self, sort_by: str = "created_at", order: str = "desc") -> List[Dict]:
        """
        列出所有條目
        
        Args:
            sort_by: 排序欄位
            order: 排序方向 (asc/desc)
            
        Returns:
            條目列表
            
        TODO: 實作排序功能
        """
        entries = list(self.entries.values())
        
        # 簡單排序實作
        reverse = (order == "desc")
        if sort_by in ["created_at", "updated_at"]:
            entries.sort(key=lambda x: x[sort_by], reverse=reverse)
        elif sort_by == "title":
            entries.sort(key=lambda x: x["title"], reverse=reverse)
        
        return entries
    
    def search(self, keyword: str) -> List[Dict]:
        """
        全文搜尋
        
        Args:
            keyword: 搜尋關鍵字
            
        Returns:
            符合的條目列表
            
        TODO: 實作全文搜尋
        - [ ] 搜尋標題和內容
        - [ ] 不區分大小寫
        - [ ] 支援部分匹配
        """
        keyword_lower = keyword.lower()
        results = []
        
        for entry in self.entries.values():
            if (keyword_lower in entry["title"].lower() or 
                keyword_lower in entry["content"].lower()):
                results.append(entry)
        
        return results
    
    def filter_by_tags(self, tags: List[str]) -> List[Dict]:
        """
        按標籤過濾
        
        Args:
            tags: 標籤列表
            
        Returns:
            符合的條目列表
            
        TODO: 實作標籤過濾
        - [ ] 支援單一標籤
        - [ ] 支援多標籤組合（AND/OR）
        """
        tags_lower = [tag.lower() for tag in tags]
        results = []
        
        for entry in self.entries.values():
            # 簡單實作：只要有任一標籤符合就回傳
            if any(tag in entry["tags"] for tag in tags_lower):
                results.append(entry)
        
        return results
    
    def export(self, format: str = "markdown") -> str:
        """
        匯出知識庫
        
        Args:
            format: 匯出格式 (markdown/json/html)
            
        Returns:
            匯出的檔案路徑
            
        TODO: 實作匯出功能
        - [ ] Markdown 格式
        - [ ] JSON 格式
        - [ ] HTML 格式
        """
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        
        if format == "markdown":
            return self._export_markdown(f"knowledge_base_{timestamp}.md")
        elif format == "json":
            return self._export_json(f"knowledge_base_{timestamp}.json")
        elif format == "html":
            return self._export_html(f"knowledge_base_{timestamp}.html")
        else:
            raise ValueError(f"不支援的格式: {format}")
    
    def _export_markdown(self, filename: str) -> str:
        """匯出為 Markdown"""
        content = f"# 知識庫匯出\n\n"
        content += f"**匯出時間：** {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        content += f"**總條目數：** {len(self.entries)}\n\n"
        content += "---\n\n"
        
        for entry in self.entries.values():
            content += f"## {entry['title']}\n\n"
            content += f"**標籤：** {', '.join(entry['tags'])}\n"
            content += f"**建立時間：** {entry['created_at']}\n"
            content += f"**字數：** {entry['metadata']['word_count']}\n\n"
            content += f"{entry['content']}\n\n"
            content += "---\n\n"
        
        with open(filename, 'w', encoding='utf-8') as f:
            f.write(content)
        
        return filename
    
    def _export_json(self, filename: str) -> str:
        """匯出為 JSON"""
        data = {
            "export_date": datetime.now().isoformat(),
            "total_entries": len(self.entries),
            "entries": list(self.entries.values())
        }
        
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        
        return filename
    
    def _export_html(self, filename: str) -> str:
        """匯出為 HTML"""
        # TODO: 實作 HTML 匯出
        raise NotImplementedError("HTML 匯出功能待實作")


def main():
    """主程式入口"""
    print("📚 個人知識庫管理器")
    print("=" * 50)
    print("\n⚠️  此程式提供基礎框架")
    print("\n完整實作請參考:")
    print("  1. specs/knowledge-base.spec.md")
    print("  2. 複製「完整規格複製區」給 AI 工具")
    print("  3. 或使用 GitHub Spec Kit 自動實作")
    print("\n" + "=" * 50)
    
    # 示範基本使用
    kb = KnowledgeBase()
    
    # 新增一個範例條目
    entry_id = kb.create(
        title="SDD 概念",
        content="規格驅動開發（SDD）是一種將需求規格置於開發流程核心的方法論。",
        tags=["SDD", "開發方法論"]
    )
    
    print(f"\n✅ 已建立範例條目: {entry_id}")
    print(f"📊 目前總條目數: {len(kb.entries)}")


if __name__ == "__main__":
    main()
