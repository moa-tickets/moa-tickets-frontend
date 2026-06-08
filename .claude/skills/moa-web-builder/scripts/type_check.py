#!/usr/bin/env python3
"""
type_check.py - TypeScript 타입 검사 (빌드 없이)
"""

import subprocess
import sys
import os

def main():
    """TypeScript 타입 검사 실행"""
    print("🚀 TypeScript 타입 검사 시작\n")
    print(f"{'='*60}")
    print("📋 TypeScript 타입 검사")
    print(f"{'='*60}")

    cmd = ["npm", "run", "type-check"]
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

    print(f"$ {' '.join(cmd)}\n")

    try:
        result = subprocess.run(cmd, cwd=project_root)

        print(f"\n{'='*60}")
        if result.returncode == 0:
            print("✅ 모든 타입 검사 통과!")
        else:
            print("❌ 타입 오류 발견")
        print(f"{'='*60}")

        return result.returncode

    except Exception as e:
        print(f"\n❌ 오류: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
