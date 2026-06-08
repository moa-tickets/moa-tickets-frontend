#!/usr/bin/env python3
"""
format.py - Prettier 코드 포맷팅
"""

import subprocess
import sys
import os

def main():
    """Prettier 포맷팅 실행"""
    print("🚀 Prettier 코드 포맷팅 시작\n")
    print(f"{'='*60}")
    print("📋 Prettier 자동 포맷팅")
    print(f"{'='*60}")

    cmd = ["npm", "run", "format"]
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

    print(f"$ {' '.join(cmd)}\n")

    try:
        result = subprocess.run(cmd, cwd=project_root)

        print(f"\n{'='*60}")
        if result.returncode == 0:
            print("✅ 코드 포맷팅 완료!")
        else:
            print("❌ 포맷팅 중 오류 발생")
        print(f"{'='*60}")

        return result.returncode

    except Exception as e:
        print(f"\n❌ 오류: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
