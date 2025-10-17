"""
風格分析器測試

這個檔案包含風格分析器的所有測試案例。
遵循 TDD 原則：先寫測試，再實作功能。
"""

import pytest
import sys
from pathlib import Path

# 加入 src 目錄到路徑
sys.path.insert(0, str(Path(__file__).parent.parent / 'src'))

from analyzer import StyleAnalyzer


class TestStyleAnalyzer:
    """風格分析器測試類別"""
    
    @pytest.fixture
    def analyzer(self):
        """建立分析器實例"""
        return StyleAnalyzer()
    
    @pytest.fixture
    def sample_text(self):
        """範例文字"""
        return """
        AI 時代的軟體開發真的很棒！我們可以用 AI 加速開發。
        具體來說，規格驅動開發變得更重要了。
        你準備好了嗎？讓我們一起學習吧！
        """
    
    def test_analyzer_initialization(self, analyzer):
        """測試：分析器初始化"""
        assert analyzer is not None
        assert analyzer.supported_formats == ['.txt', '.md']
        assert analyzer.min_length == 100
    
    def test_count_sentences(self, analyzer, sample_text):
        """測試：句子計數"""
        count = analyzer._count_sentences(sample_text)
        assert count == 3
    
    def test_analyze_file_success(self, analyzer, tmp_path):
        """測試：成功分析檔案"""
        # 建立臨時測試檔案
        test_file = tmp_path / "test.txt"
        test_file.write_text("這是一個測試檔案。" * 50, encoding='utf-8')
        
        # 執行分析
        result = analyzer.analyze_file(str(test_file))
        
        # 驗證結果
        assert result['file_name'] == 'test.txt'
        assert 'analysis_date' in result
        assert result['word_count'] > 0
        assert result['sentence_count'] > 0
        assert 'metrics' in result
    
    def test_analyze_file_not_found(self, analyzer):
        """測試：檔案不存在"""
        with pytest.raises(FileNotFoundError):
            analyzer.analyze_file('nonexistent.txt')
    
    def test_analyze_file_wrong_format(self, analyzer, tmp_path):
        """測試：不支援的檔案格式"""
        test_file = tmp_path / "test.jpg"
        test_file.write_text("test", encoding='utf-8')
        
        with pytest.raises(ValueError, match="不支援的檔案格式"):
            analyzer.analyze_file(str(test_file))
    
    def test_analyze_file_short_content(self, analyzer, tmp_path):
        """測試：內容過短的警告"""
        test_file = tmp_path / "short.txt"
        test_file.write_text("短文字", encoding='utf-8')
        
        result = analyzer.analyze_file(str(test_file))
        assert len(result['warnings']) > 0
        assert '內容過短' in result['warnings'][0]
    
    def test_batch_analyze(self, analyzer, tmp_path):
        """測試：批次分析"""
        # 建立多個測試檔案
        files = []
        for i in range(3):
            test_file = tmp_path / f"test{i}.txt"
            test_file.write_text(f"測試檔案 {i}。" * 50, encoding='utf-8')
            files.append(str(test_file))
        
        # 執行批次分析
        results = analyzer.batch_analyze(files)
        
        # 驗證結果
        assert len(results) == 3
        for result in results:
            assert 'file_name' in result
    
    def test_save_result(self, analyzer, tmp_path):
        """測試：儲存分析結果"""
        result = {
            'file_name': 'test.txt',
            'metrics': {'enthusiasm_score': 0.8}
        }
        
        output_path = tmp_path / "output.json"
        saved_path = analyzer.save_result(result, str(output_path))
        
        assert Path(saved_path).exists()


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
