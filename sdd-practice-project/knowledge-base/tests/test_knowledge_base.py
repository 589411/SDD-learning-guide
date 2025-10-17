"""
個人知識庫管理器測試

這個檔案包含知識庫管理器的所有測試案例。
遵循 TDD 原則：先寫測試，再實作功能。

使用說明：
1. 這些測試定義了系統應該如何運作
2. 執行測試驗證功能是否正確
3. 根據規格完成實作後，測試應該通過
"""

import pytest
import json
import sys
from pathlib import Path
from datetime import datetime

# 加入 src 目錄到路徑
sys.path.insert(0, str(Path(__file__).parent.parent / 'src'))

from knowledge_base import KnowledgeBase


class TestKnowledgeBase:
    """知識庫管理器測試類別"""
    
    @pytest.fixture
    def kb(self, tmp_path):
        """建立臨時知識庫實例"""
        db_path = tmp_path / "test_kb.json"
        return KnowledgeBase(str(db_path))
    
    @pytest.fixture
    def sample_entry(self):
        """範例知識條目"""
        return {
            "title": "SDD 概念",
            "content": "規格驅動開發是一種將需求規格置於開發流程核心的方法論。",
            "tags": ["SDD", "開發方法論"]
        }
    
    def test_kb_initialization(self, kb):
        """測試：知識庫初始化"""
        assert kb is not None
        assert kb.entries == {}
        assert kb.db_path.exists()
    
    def test_create_entry(self, kb, sample_entry):
        """測試：新增知識條目"""
        entry_id = kb.create(
            title=sample_entry["title"],
            content=sample_entry["content"],
            tags=sample_entry["tags"]
        )
        
        # 驗證 ID 格式
        assert entry_id.startswith("kb_")
        assert len(entry_id) > 10
        
        # 驗證條目存在
        assert entry_id in kb.entries
        
        # 驗證條目內容
        entry = kb.entries[entry_id]
        assert entry["title"] == sample_entry["title"]
        assert entry["content"] == sample_entry["content"]
        assert "created_at" in entry
        assert "updated_at" in entry
        assert "metadata" in entry
    
    def test_create_entry_with_tag_deduplication(self, kb):
        """測試：標籤自動去重"""
        entry_id = kb.create(
            title="測試",
            content="測試內容",
            tags=["Python", "python", "PYTHON"]
        )
        
        entry = kb.entries[entry_id]
        # 應該只有一個 "python"（小寫）
        assert len(entry["tags"]) == 1
        assert "python" in entry["tags"]
    
    def test_read_entry(self, kb, sample_entry):
        """測試：讀取知識條目"""
        # 先建立條目
        entry_id = kb.create(**sample_entry)
        
        # 讀取條目
        entry = kb.read(entry_id)
        
        assert entry is not None
        assert entry["title"] == sample_entry["title"]
        assert entry["content"] == sample_entry["content"]
    
    def test_read_nonexistent_entry(self, kb):
        """測試：讀取不存在的條目"""
        entry = kb.read("nonexistent_id")
        assert entry is None
    
    def test_update_entry_title(self, kb, sample_entry):
        """測試：更新條目標題"""
        entry_id = kb.create(**sample_entry)
        
        # 更新標題
        success = kb.update(entry_id, title="新標題")
        assert success is True
        
        # 驗證更新
        entry = kb.read(entry_id)
        assert entry["title"] == "新標題"
        assert entry["content"] == sample_entry["content"]  # 內容不變
    
    def test_update_entry_content(self, kb, sample_entry):
        """測試：更新條目內容"""
        entry_id = kb.create(**sample_entry)
        
        new_content = "這是新的內容，字數更多了。" * 10
        success = kb.update(entry_id, content=new_content)
        assert success is True
        
        # 驗證更新
        entry = kb.read(entry_id)
        assert entry["content"] == new_content
        # 字數應該重新計算
        assert entry["metadata"]["word_count"] == len(new_content)
    
    def test_update_entry_tags(self, kb, sample_entry):
        """測試：更新條目標籤"""
        entry_id = kb.create(**sample_entry)
        
        new_tags = ["新標籤1", "新標籤2"]
        success = kb.update(entry_id, tags=new_tags)
        assert success is True
        
        # 驗證更新
        entry = kb.read(entry_id)
        assert set(entry["tags"]) == set([tag.lower() for tag in new_tags])
    
    def test_update_nonexistent_entry(self, kb):
        """測試：更新不存在的條目"""
        success = kb.update("nonexistent_id", title="新標題")
        assert success is False
    
    def test_delete_entry(self, kb, sample_entry):
        """測試：刪除知識條目"""
        entry_id = kb.create(**sample_entry)
        
        # 確認條目存在
        assert entry_id in kb.entries
        
        # 刪除條目
        success = kb.delete(entry_id)
        assert success is True
        
        # 確認條目已刪除
        assert entry_id not in kb.entries
        assert kb.read(entry_id) is None
    
    def test_delete_nonexistent_entry(self, kb):
        """測試：刪除不存在的條目"""
        success = kb.delete("nonexistent_id")
        assert success is False
    
    def test_list_all_entries(self, kb):
        """測試：列出所有條目"""
        # 建立多個條目
        kb.create(title="條目1", content="內容1", tags=["tag1"])
        kb.create(title="條目2", content="內容2", tags=["tag2"])
        kb.create(title="條目3", content="內容3", tags=["tag3"])
        
        # 列出所有條目
        entries = kb.list_all()
        
        assert len(entries) == 3
        assert all("title" in entry for entry in entries)
    
    def test_list_all_sorted_by_created_at(self, kb):
        """測試：按建立時間排序"""
        import time
        
        # 建立條目（有時間間隔）
        id1 = kb.create(title="第一個", content="內容", tags=[])
        time.sleep(0.1)
        id2 = kb.create(title="第二個", content="內容", tags=[])
        time.sleep(0.1)
        id3 = kb.create(title="第三個", content="內容", tags=[])
        
        # 降序排列（最新的在前）
        entries = kb.list_all(sort_by="created_at", order="desc")
        assert entries[0]["title"] == "第三個"
        assert entries[2]["title"] == "第一個"
        
        # 升序排列（最舊的在前）
        entries = kb.list_all(sort_by="created_at", order="asc")
        assert entries[0]["title"] == "第一個"
        assert entries[2]["title"] == "第三個"
    
    def test_search_by_keyword(self, kb):
        """測試：全文搜尋"""
        # 建立測試條目
        kb.create(title="Python 教學", content="這是關於 Python 的教學", tags=["Python"])
        kb.create(title="JavaScript 教學", content="這是關於 JavaScript 的教學", tags=["JS"])
        kb.create(title="Python 進階", content="Python 進階技巧", tags=["Python"])
        
        # 搜尋 "Python"
        results = kb.search("Python")
        
        assert len(results) == 2
        assert all("Python" in entry["title"] or "Python" in entry["content"] 
                  for entry in results)
    
    def test_search_case_insensitive(self, kb):
        """測試：搜尋不區分大小寫"""
        kb.create(title="Python 教學", content="內容", tags=[])
        
        # 不同大小寫都應該找到
        assert len(kb.search("python")) == 1
        assert len(kb.search("PYTHON")) == 1
        assert len(kb.search("Python")) == 1
    
    def test_filter_by_single_tag(self, kb):
        """測試：按單一標籤過濾"""
        kb.create(title="條目1", content="內容", tags=["Python", "教學"])
        kb.create(title="條目2", content="內容", tags=["JavaScript", "教學"])
        kb.create(title="條目3", content="內容", tags=["Python", "進階"])
        
        # 過濾 "Python" 標籤
        results = kb.filter_by_tags(["Python"])
        
        assert len(results) == 2
        assert all("python" in entry["tags"] for entry in results)
    
    def test_filter_by_multiple_tags(self, kb):
        """測試：按多個標籤過濾"""
        kb.create(title="條目1", content="內容", tags=["Python", "教學"])
        kb.create(title="條目2", content="內容", tags=["JavaScript"])
        kb.create(title="條目3", content="內容", tags=["Python"])
        
        # 過濾多個標籤（OR 邏輯）
        results = kb.filter_by_tags(["Python", "JavaScript"])
        
        assert len(results) == 3
    
    def test_export_markdown(self, kb, tmp_path):
        """測試：匯出為 Markdown"""
        # 建立測試條目
        kb.create(title="測試條目", content="測試內容", tags=["測試"])
        
        # 匯出
        output_path = kb.export(format="markdown")
        
        # 驗證檔案存在
        assert Path(output_path).exists()
        
        # 驗證內容
        with open(output_path, 'r', encoding='utf-8') as f:
            content = f.read()
            assert "知識庫匯出" in content
            assert "測試條目" in content
            assert "測試內容" in content
    
    def test_export_json(self, kb, tmp_path):
        """測試：匯出為 JSON"""
        # 建立測試條目
        kb.create(title="測試條目", content="測試內容", tags=["測試"])
        
        # 匯出
        output_path = kb.export(format="json")
        
        # 驗證檔案存在
        assert Path(output_path).exists()
        
        # 驗證內容
        with open(output_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
            assert "export_date" in data
            assert "total_entries" in data
            assert data["total_entries"] == 1
            assert len(data["entries"]) == 1
    
    def test_export_unsupported_format(self, kb):
        """測試：不支援的匯出格式"""
        with pytest.raises(ValueError, match="不支援的格式"):
            kb.export(format="pdf")
    
    def test_persistence(self, tmp_path):
        """測試：資料持久化"""
        db_path = tmp_path / "persistent_kb.json"
        
        # 建立知識庫並新增條目
        kb1 = KnowledgeBase(str(db_path))
        entry_id = kb1.create(title="持久化測試", content="內容", tags=["測試"])
        
        # 關閉並重新開啟
        del kb1
        kb2 = KnowledgeBase(str(db_path))
        
        # 驗證資料仍然存在
        assert entry_id in kb2.entries
        entry = kb2.read(entry_id)
        assert entry["title"] == "持久化測試"
    
    def test_metadata_calculation(self, kb):
        """測試：元數據計算"""
        content = "這是一段測試內容。" * 50  # 約 500 字
        entry_id = kb.create(title="測試", content=content, tags=[])
        
        entry = kb.read(entry_id)
        
        # 驗證字數計算
        assert entry["metadata"]["word_count"] == len(content)
        
        # 驗證閱讀時間計算（假設每分鐘 200 字）
        expected_read_time = max(1, len(content) // 200)
        assert entry["metadata"]["read_time"] == expected_read_time


# 整合測試
class TestIntegration:
    """整合測試"""
    
    def test_complete_workflow(self, tmp_path):
        """測試：完整工作流程"""
        kb = KnowledgeBase(str(tmp_path / "workflow_test.json"))
        
        # 1. 建立多個條目
        id1 = kb.create(title="SDD", content="規格驅動開發", tags=["SDD", "方法論"])
        id2 = kb.create(title="TDD", content="測試驅動開發", tags=["TDD", "方法論"])
        id3 = kb.create(title="AI 工具", content="Cursor, Windsurf", tags=["AI", "工具"])
        
        # 2. 搜尋
        results = kb.search("開發")
        assert len(results) == 2
        
        # 3. 按標籤過濾
        results = kb.filter_by_tags(["方法論"])
        assert len(results) == 2
        
        # 4. 更新
        kb.update(id1, content="規格驅動開發是一種方法論")
        
        # 5. 刪除
        kb.delete(id3)
        
        # 6. 列出所有
        all_entries = kb.list_all()
        assert len(all_entries) == 2
        
        # 7. 匯出
        export_path = kb.export(format="json")
        assert Path(export_path).exists()


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
