"""
build_check.py - TypeScript 타입 체크, ESLint 린트, Prettier 포맷 검증
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
        result = subprocess.run(
            cmd,
            cwd=os.path.dirname(
                os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
            ),
        )
        if result.returncode != 0:
            print(f"\n❌ {description} 실패")
            return False
        print(f"\n✅ {description} 성공")
        return True
    except Exception as e:
        print(f"\n❌ {description} 오류: {e}")
        return False


def main():
    """전체 빌드 체크 실행"""
    print("🚀 MOA Frontend 빌드 체크 시작\n")

    checks = [
        (["npm", "run", "type-check"], "TypeScript 타입 체크"),
        (["npm", "run", "lint"], "ESLint 린트 검사"),
        (["npm", "run", "format:check"], "Prettier 포맷 검증"),
    ]

    results = []
    for cmd, description in checks:
        results.append(run_command(cmd, description))

    print(f"\n{'='*60}")
    print("📊 빌드 체크 결과")
    print(f"{'='*60}")

    passed = sum(results)
    total = len(results)

    if all(results):
        print(f"✅ 모든 검사 통과! ({passed}/{total})")
        return 0
    else:
        print(f"❌ 검사 실패 ({total - passed}/{total})")
        return 1


if __name__ == "__main__":
    sys.exit(main())
