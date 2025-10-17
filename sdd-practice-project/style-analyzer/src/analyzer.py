"""
風格特徵提取器 - 主程式

這個模組提供文字風格分析的核心功能。
"""

import json
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Optional


class StyleAnalyzer:
    """文字風格分析器"""
    
    def __init__(self):
        """初始化分析器"""
        self.supported_formats = ['.txt', '.md']
        self.min_length = 100
        self.max_size_mb = 10
    
    def analyze_file(self, file_path: str) -> Dict:
        """
        分析單個文字檔案
        
        Args:
            file_path: 檔案路徑
            
        Returns:
            分析結果的字典
            
        Raises:
            ValueError: 檔案格式不支援或檔案過大
            FileNotFoundError: 檔案不存在
        """
        # 驗證檔案
        path = Path(file_path)
        if not path.exists():
            raise FileNotFoundError(f"檔案不存在: {file_path}")
        
        if path.suffix not in self.supported_formats:
            raise ValueError(
                f"不支援的檔案格式: {path.suffix}。"
                f"支援的格式: {', '.join(self.supported_formats)}"
            )
        
        # 讀取檔案
        try:
            with open(path, 'r', encoding='utf-8') as f:
                content = f.read()
        except UnicodeDecodeError:
            raise ValueError("檔案編碼錯誤，請使用 UTF-8 編碼")
        
        # 檢查內容長度
        if len(content) < self.min_length:
            warnings = [f"內容過短（{len(content)}字），建議至少 500 字以獲得準確分析"]
        else:
            warnings = []
        
        # 執行分析
        result = {
            "file_name": path.name,
            "analysis_date": datetime.now().isoformat(),
            "word_count": len(content),
            "sentence_count": self._count_sentences(content),
            "metrics": self._analyze_content(content),
            "warnings": warnings
        }
        
        return result
    
    def _count_sentences(self, text: str) -> int:
        """計算句子數量"""
        # 簡單實作：以句號、問號、驚嘆號為句子分隔
        import re
        sentences = re.split(r'[。！？\.\!\?]', text)
        return len([s for s in sentences if s.strip()])
    
    def _analyze_content(self, text: str) -> Dict:
        """
        分析文字內容
        
        這是一個簡化版本，實際實作需要使用 NLP 工具
        """
        sentences = self._count_sentences(text)
        words = len(text)
        
        return {
            "enthusiasm_score": 0.0,  # TODO: 實作情感分析
            "avg_sentence_length": words / sentences if sentences > 0 else 0,
            "max_sentence_length": 0,  # TODO: 實作
            "min_sentence_length": 0,  # TODO: 實作
            "question_ratio": 0.0,  # TODO: 實作
            "top_phrases": []  # TODO: 實作
        }
    
    def batch_analyze(self, file_paths: List[str]) -> List[Dict]:
        """
        批次分析多個檔案
        
        Args:
            file_paths: 檔案路徑列表
            
        Returns:
            分析結果列表
        """
        results = []
        for path in file_paths:
            try:
                result = self.analyze_file(path)
                results.append(result)
            except Exception as e:
                results.append({
                    "file_name": Path(path).name,
                    "error": str(e)
                })
        return results
    
    def save_result(self, result: Dict, output_path: Optional[str] = None) -> str:
        """
        儲存分析結果
        
        Args:
            result: 分析結果
            output_path: 輸出檔案路徑（可選）
            
        Returns:
            儲存的檔案路徑
        """
        if output_path is None:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_path = f"analysis_{timestamp}.json"
        
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(result, f, ensure_ascii=False, indent=2)
        
        return output_path


def main():
    """主程式入口"""
    import sys
    
    if len(sys.argv) < 2:
        print("使用方式: python analyzer.py <檔案路徑>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    analyzer = StyleAnalyzer()
    
    try:
        result = analyzer.analyze_file(file_path)
        output_path = analyzer.save_result(result)
        print(f"✅ 分析完成！結果已儲存至: {output_path}")
        print(json.dumps(result, ensure_ascii=False, indent=2))
    except Exception as e:
        print(f"❌ 錯誤: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
