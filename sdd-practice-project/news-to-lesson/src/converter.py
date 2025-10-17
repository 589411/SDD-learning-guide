"""
新聞轉教案生成器 - 主程式

這個模組提供將新聞文章轉換為教學內容的核心功能。

使用說明：
1. 閱讀 specs/news-to-lesson.spec.md 了解完整規格
2. 複製規格中的「完整規格複製區」
3. 貼給 AI 工具（Cursor/Windsurf/Claude）完成實作
4. 或使用 GitHub Spec Kit: /speckit.implement

TODO: 根據規格實作以下功能
- [ ] 新聞內容提取（URL 或文字）
- [ ] 三種受眾類型的 Prompt 模板
- [ ] OpenAI/Anthropic API 整合
- [ ] 驗收標準自動化檢查
- [ ] 成本追蹤
"""

from typing import Dict, Optional
from datetime import datetime


class NewsToLessonConverter:
    """新聞轉教案轉換器"""
    
    def __init__(self, api_key: str, provider: str = "openai"):
        """
        初始化轉換器
        
        Args:
            api_key: API Key (OpenAI 或 Anthropic)
            provider: API 提供者 ("openai" 或 "anthropic")
        """
        self.api_key = api_key
        self.provider = provider
        self.supported_audiences = ["executive", "adult", "senior"]
        
        # TODO: 初始化 API 客戶端
        pass
    
    def convert_from_url(self, url: str, audience: str = "adult") -> Dict:
        """
        從 URL 轉換新聞為教案
        
        Args:
            url: 新聞文章 URL
            audience: 受眾類型 (executive/adult/senior)
            
        Returns:
            教案內容（Markdown 格式）
            
        Raises:
            ValueError: 受眾類型不支援或 URL 無法訪問
        """
        # TODO: 實作 URL 解析
        # TODO: 提取新聞內容
        # TODO: 調用 AI API 生成教案
        # TODO: 驗收標準檢查
        
        raise NotImplementedError("請根據規格實作此功能")
    
    def convert_from_text(self, text: str, audience: str = "adult") -> Dict:
        """
        從文字轉換新聞為教案
        
        Args:
            text: 新聞文章文字
            audience: 受眾類型
            
        Returns:
            教案內容
        """
        # TODO: 實作文字轉換
        raise NotImplementedError("請根據規格實作此功能")
    
    def _get_prompt_template(self, audience: str) -> str:
        """
        取得對應受眾的 Prompt 模板
        
        Args:
            audience: 受眾類型
            
        Returns:
            Prompt 模板字串
        """
        # TODO: 實作三種受眾的 Prompt 模板
        # 參考 specs/news-to-lesson.spec.md 中的模板
        
        templates = {
            "executive": """
你是一位商業顧問，請將以下新聞轉換為適合企業高管的教學內容。

要求：
- 專業術語密度：12-15%
- 強調 ROI 和商業價值
- 包含至少一個企業案例
- 結論先行結構

新聞內容：
{news_content}
""",
            "adult": """
你是一位實用主義教師，請將以下新聞轉換為適合成人學員的教學內容。

要求：
- 實用案例導向
- 問句比例：10-15%
- 平易近人的語氣
- 包含行動建議

新聞內容：
{news_content}
""",
            "senior": """
你是一位耐心的教育者，請將以下新聞轉換為適合年長者的教學內容。

要求：
- 淺顯易懂
- 豐富的類比說明
- 專業術語需解釋
- 避免複雜句型

新聞內容：
{news_content}
"""
        }
        
        return templates.get(audience, templates["adult"])
    
    def validate_output(self, content: str, audience: str) -> Dict:
        """
        驗收生成的教案是否符合標準
        
        Args:
            content: 生成的教案內容
            audience: 受眾類型
            
        Returns:
            驗收結果
        """
        # TODO: 實作驗收標準檢查
        # - 企業高管版：專業術語密度 12-15%
        # - 成人學員版：問句比例 10-15%
        # - 年長者版：是否包含類比說明
        
        raise NotImplementedError("請根據規格實作此功能")


def main():
    """主程式入口"""
    import sys
    import os
    
    # 檢查 API Key
    api_key = os.getenv("OPENAI_API_KEY") or os.getenv("ANTHROPIC_API_KEY")
    if not api_key:
        print("❌ 錯誤: 請設定 OPENAI_API_KEY 或 ANTHROPIC_API_KEY 環境變數")
        print("\n設定方式:")
        print("  export OPENAI_API_KEY='your-api-key'")
        sys.exit(1)
    
    print("📰 新聞轉教案生成器")
    print("=" * 50)
    print("\n⚠️  此程式需要根據規格完成實作")
    print("\n請參考:")
    print("  1. specs/news-to-lesson.spec.md")
    print("  2. 複製「完整規格複製區」給 AI 工具")
    print("  3. 或使用 GitHub Spec Kit 自動實作")
    print("\n" + "=" * 50)


if __name__ == "__main__":
    main()
