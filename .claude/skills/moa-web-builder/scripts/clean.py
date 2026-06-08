#!/usr/bin/env python3
"""
clean.py - 빌드 캐시 및 의존성 재설치
"""

import subprocess
import sys
import os
import shutil

def main():
    """캐시 정리 및 재설치 실행"""
    print("🚀 캐시 정리 및 재설치 시작\n")
    print(f"{'='*60}")
    print("📋 빌드 캐시 정리")
    print(f"{'='*60}\n")

    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

    # .next 디렉토리 삭제
    next_dir = os.path.join(project_root, ".next")
    if os.path.exists(next_dir):
        print(f"🗑️  .next 디렉토리 제거 중...")
        try:
            shutil.rmtree(next_dir)
            print("✅ .next 디렉토리 제거 완료\n")
        except Exception as e:
            print(f"❌ .next 디렉토리 제거 실패: {e}\n")
            return 1
    else:
        print("💡 .next 디렉토리가 없습니다\n")

    # node_modules 디렉토리 삭제
    node_modules_dir = os.path.join(project_root, "node_modules")
    if os.path.exists(node_modules_dir):
        print(f"🗑️  node_modules 디렉토리 제거 중...")
        try:
            shutil.rmtree(node_modules_dir)
            print("✅ node_modules 디렉토리 제거 완료\n")
        except Exception as e:
            print(f"❌ node_modules 디렉토리 제거 실패: {e}\n")
            return 1
    else:
        print("💡 node_modules 디렉토리가 없습니다\n")

    # npm install 실행
    print(f"{'='*60}")
    print("📋 의존성 재설치")
    print(f"{'='*60}\n")

    cmd = ["npm", "install"]
    print(f"$ {' '.join(cmd)}\n")

    try:
        result = subprocess.run(cmd, cwd=project_root)

        print(f"\n{'='*60}")
        if result.returncode == 0:
            print("✅ 캐시 정리 및 재설치 완료!")
        else:
            print("❌ 재설치 중 오류 발생")
        print(f"{'='*60}")

        return result.returncode

    except Exception as e:
        print(f"\n❌ 오류: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
