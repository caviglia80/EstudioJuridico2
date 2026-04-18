// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const sonarjs = require("eslint-plugin-sonarjs");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
      sonarjs.configs.recommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        { type: "attribute", prefix: "ej", style: "camelCase" },
      ],
      "@angular-eslint/component-selector": [
        "error",
        { type: "element", prefix: "ej", style: "kebab-case" },
      ],
      "no-console": "error",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", fixStyle: "separate-type-imports" },
      ],
      // void operator es idiom\u00e1tico en TypeScript para descartar valores
      "sonarjs/void-use": "off",
      // Etiquetas de tarea no aplican en revisi\u00f3n de c\u00f3digo de producci\u00f3n
      "sonarjs/todo-tag": "off",
      "sonarjs/fixme-tag": "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {},
  },
  {
    files: ["**/environments/**/*.ts"],
    rules: {
      // URLs de backend internas usan HTTP en despliegue Docker
      "sonarjs/no-clear-text-protocols": "off",
    },
  },
]);
