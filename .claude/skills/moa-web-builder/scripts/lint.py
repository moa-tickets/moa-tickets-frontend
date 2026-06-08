#!/usr/bin/env python3
"""
lint.py - ESLint 코드 품질 검사
"""

import subprocess
import sys
import os

def main():
    """ESLint 검사 실행"""
    print("🚀 ESLint 코드 품질 검사 시작\n")
    print(f"{'='*60}")
    print("📋 ESLint 검사")
    print(f"{'='*60}")

    cmd = ["npm", "run", "lint"]
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

    print(f"$ {' '.join(cmd)}\n")

    try:
        result = subprocess.run(cmd, cwd=project_root)

        print(f"\n{'='*60}")
        if result.returncode == 0:
            print("✅ 모든 린트 검사 통과!")
        else:
            print("❌ 린트 오류 발견")
            print("💡 'npm run lint -- --fix'로 자동 수정 가능")
        print(f"{'='*60}")

        return result.returncode

    except Exception as e:
        print(f"\n❌ 오류: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
