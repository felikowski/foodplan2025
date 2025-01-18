import angularEslint from "@angular-eslint/eslint-plugin";
import airbnbBase from "eslint-config-airbnb-base";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
import tsParser from "@typescript-eslint/parser"; // Parser explizit importieren
import path from "path";

export default [
  {
    files: ["**/*.ts", "**/*.html"],
    ignores: ["node_modules", "dist"],
    languageOptions: {
      parser: tsParser, // Parser korrekt angeben
      parserOptions: {
        project: path.resolve("./tsconfig.json"),
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    plugins: {
      "@angular-eslint": angularEslint,
      import: importPlugin,
      prettier: prettierPlugin,
    },
    rules: {
      ...airbnbBase.rules,
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "import/no-extraneous-dependencies": ["error", { devDependencies: true }],
      "class-methods-use-this": "off",
      "max-len": ["error", { code: 100, ignoreComments: true }],
      "no-console": "warn",
    },
  },
];
