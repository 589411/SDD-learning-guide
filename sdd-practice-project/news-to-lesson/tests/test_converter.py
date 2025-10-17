"""
新聞轉教案生成器測試

這個檔案包含新聞轉教案生成器的所有測試案例。
遵循 TDD 原則：先寫測試，再實作功能。

使用說明：
1. 這些測試定義了系統應該如何運作
2. 可以直接執行測試（會失敗，因為功能未完全實作）
3. 根據規格完成實作後，測試應該通過
4. 或使用 AI 工具根據規格生成實作
"""

import pytest
import sys
from pathlib import Path
from unittest.mock import Mock, patch

# 加入 src 目錄到路徑
sys.path.insert(0, str(Path(__file__).parent.parent / 'src'))

from converter import NewsToLessonConverter
from prompts import get_prompt


class TestNewsToLessonConverter:
    """新聞轉教案轉換器測試類別"""
    
    @pytest.fixture
    def converter(self):
        """建立轉換器實例（使用 mock API key）"""
        return NewsToLessonConverter(api_key="test-api-key", provider="openai")
    
    @pytest.fixture
    def sample_news_text(self):
        """範例新聞文字"""
        return """
        AI 時代的軟體開發革命
        
        人工智慧正在徹底改變軟體開發的方式。根據最新調查，
        超過70%的開發者已經開始使用AI輔助工具。
        
        專家指出，開發者的角色正在轉變。AI可以告訴你怎麼做，
        但只有人能決定做什麼和為什麼做。
        
        業界專家建議，開發者應該學習如何撰寫清晰的規格文件。
        """
    
    def test_converter_initialization(self, converter):
        """測試：轉換器初始化"""
        assert converter is not None
        assert converter.api_key == "test-api-key"
        assert converter.provider == "openai"
        assert "executive" in converter.supported_audiences
        assert "adult" in converter.supported_audiences
        assert "senior" in converter.supported_audiences
    
    def test_get_prompt_template_executive(self, converter):
        """測試：取得企業高管 Prompt 模板"""
        template = converter._get_prompt_template("executive")
        assert "商業顧問" in template
        assert "ROI" in template
        assert "企業案例" in template
        assert "{news_content}" in template
    
    def test_get_prompt_template_adult(self, converter):
        """測試：取得成人學員 Prompt 模板"""
        template = converter._get_prompt_template("adult")
        assert "實用主義" in template
        assert "問句比例" in template
        assert "行動建議" in template
    
    def test_get_prompt_template_senior(self, converter):
        """測試：取得年長者 Prompt 模板"""
        template = converter._get_prompt_template("senior")
        assert "耐心" in template
        assert "淺顯易懂" in template
        assert "類比" in template
    
    def test_invalid_audience_type(self, converter, sample_news_text):
        """測試：不支援的受眾類型"""
        with pytest.raises(ValueError, match="不支援的受眾類型"):
            converter.convert_from_text(sample_news_text, audience="invalid")
    
    @patch('converter.requests.get')
    def test_convert_from_url_success(self, mock_get, converter):
        """測試：成功從 URL 轉換"""
        # Mock HTTP 回應
        mock_response = Mock()
        mock_response.status_code = 200
        mock_response.text = "<html><body>新聞內容</body></html>"
        mock_get.return_value = mock_response
        
        # 這個測試會失敗，因為功能未實作
        # 實作後應該通過
        with pytest.raises(NotImplementedError):
            result = converter.convert_from_url(
                "https://example.com/news",
                audience="adult"
            )
    
    def test_convert_from_text_success(self, converter, sample_news_text):
        """測試：成功從文字轉換"""
        # 這個測試會失敗，因為功能未實作
        with pytest.raises(NotImplementedError):
            result = converter.convert_from_text(
                sample_news_text,
                audience="adult"
            )
    
    def test_validate_output_executive(self, converter):
        """測試：驗收企業高管版教案"""
        # 模擬生成的教案
        lesson_content = """
        # AI 驅動的軟體開發
        
        **受眾：** 企業高管
        
        ## 摘要
        AI 輔助開發工具的普及率已達 70%，為企業帶來顯著的 ROI 提升。
        
        ## 知識點
        1. AI 輔助開發的市場滲透率
        2. 成本效益分析
        3. 人才策略轉型
        
        ## 企業案例
        某金融科技公司導入 AI 工具後，開發效率提升 3 倍。
        """
        
        # 這個測試會失敗，因為功能未實作
        with pytest.raises(NotImplementedError):
            validation_result = converter.validate_output(
                lesson_content,
                audience="executive"
            )
    
    def test_cost_tracking(self, converter):
        """測試：成本追蹤功能"""
        # TODO: 實作成本追蹤測試
        # 應該記錄 token 使用量和預估成本
        pass


class TestPrompts:
    """Prompt 模板測試"""
    
    def test_get_prompt_with_content(self):
        """測試：取得包含內容的完整 Prompt"""
        news_content = "測試新聞內容"
        prompt = get_prompt("executive", news_content)
        
        assert "測試新聞內容" in prompt
        assert "商業顧問" in prompt
    
    def test_all_prompts_have_required_sections(self):
        """測試：所有 Prompt 都包含必要章節"""
        from prompts import EXECUTIVE_PROMPT, ADULT_PROMPT, SENIOR_PROMPT
        
        for prompt in [EXECUTIVE_PROMPT, ADULT_PROMPT, SENIOR_PROMPT]:
            assert "摘要" in prompt
            assert "知識點" in prompt
            assert "要點" in prompt
            assert "結論" in prompt or "總結" in prompt


# 整合測試
class TestIntegration:
    """整合測試"""
    
    @pytest.mark.skipif(
        not pytest.config.getoption("--run-integration"),
        reason="需要 --run-integration 參數才執行"
    )
    def test_full_conversion_workflow(self):
        """測試：完整轉換工作流程（需要真實 API Key）"""
        import os
        
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key:
            pytest.skip("需要設定 OPENAI_API_KEY 環境變數")
        
        converter = NewsToLessonConverter(api_key=api_key)
        
        sample_news = """
        AI 技術正在改變世界。根據研究，AI 將在未來 10 年
        創造數百萬個新工作機會。
        """
        
        # 執行轉換
        result = converter.convert_from_text(sample_news, audience="adult")
        
        # 驗證結果
        assert result is not None
        assert "摘要" in result or "summary" in result.lower()


def pytest_addoption(parser):
    """加入自訂 pytest 選項"""
    parser.addoption(
        "--run-integration",
        action="store_true",
        default=False,
        help="執行整合測試（需要真實 API Key）"
    )


if __name__ == '__main__':
    pytest.main([__file__, '-v'])
