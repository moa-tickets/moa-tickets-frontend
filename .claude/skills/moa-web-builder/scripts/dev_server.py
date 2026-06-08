#!/usr/bin/env python3
"""
dev_server.py - Next.js 개발 서버 시작
"""

import subprocess
import sys
import os

def main():
    """개발 서버 실행"""
    print("🚀 MOA Frontend 개발 서버 시작\n")
    print(f"{'='*60}")
    print("📋 Next.js 개발 서버 시작")
    print(f"{'='*60}")

    cmd = ["npm", "run", "dev"]
    project_root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

    print(f"$ {' '.join(cmd)}\n")
    print("💡 기본 포트: http://localhost:3000")
    print("💡 서버를 종료하려면: Ctrl+C\n")

    try:
        result = subprocess.run(cmd, cwd=project_root)
        return result.returncode

    except KeyboardInterrupt:
        print("\n\n🛑 개발 서버 종료됨")
        return 0
    except Exception as e:
        print(f"\n❌ 오류: {e}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
