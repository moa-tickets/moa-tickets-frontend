#!/usr/bin/env python3
"""
build_full.py - 코드 포맷팅 후 Next.js 빌드 실행
"""

import subprocess
import sys
import os

def run_command(cmd, description):
    """명령어 실행 및 결과 출력"""
    print(f"\n{'='*60}")
    print(f"📋 {description}")
    print(f"{'='*60}")
    print(f"$ {' '.join(cmd)}\n")

    try:
        result = subprocess.run(cmd, cwd=os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__)))))
        if result.returncode != 0:
            print(f"\n❌ {description} 실패")
            return False
        print(f"\n✅ {description} 성공")
        return True
    except Exception as e:
        print(f"\n❌ {description} 오류: {e}")
        return False

def main():
    """전체 빌드 실행 (포맷팅 + 빌드)"""
    print("🚀 MOA Frontend 전체 빌드 시작\n")

    steps = [
        (["npm", "run", "format"], "Prettier 자동 포맷팅"),
        (["npm", "run", "build"], "Next.js 빌드"),
    ]

    results = []
    for cmd, description in steps:
        success = run_command(cmd, description)
        results.append(success)

        if not success:
            print(f"\n⚠️  빌드 중단 ('{description}' 실패)")
            return 1

    print(f"\n{'='*60}")
    print("📊 빌드 결과")
    print(f"{'='*60}")
    print(f"✅ 프로덕션 빌드 완료!")
    print(f"📁 빌드 출력: .next/")

    return 0

if __name__ == "__main__":
    sys.exit(main())
