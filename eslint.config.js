import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import prettierConfig from "eslint-config-prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";

export default tseslint.config(
  { ignores: ["dist"] }, // 빌드 결과물 제외
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended, // TS 권장 설정
      ...pluginQuery.configs["flat/recommended"], // React Query 권장 설정
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      // 💡 추가 추천 규칙
      "@typescript-eslint/no-unused-vars": "warn", // 미사용 변수 경고
      "no-console": "warn", // 콘솔 로그 경고
    },
  },
  prettierConfig // 마지막에 추가하여 충돌 방지
);
