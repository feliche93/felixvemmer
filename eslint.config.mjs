import { defineConfig } from "eslint/config"
import drizzle from "eslint-plugin-drizzle"
import sortExports from "eslint-plugin-sort-exports"
import tseslint from "typescript-eslint"

export default defineConfig(
  {
    files: [
      "src/**/*.ts",
      "src/**/*.tsx",
      "drizzle/**/*.ts",
      "content-collections/**/*.ts",
      "content-collections.ts",
      "scripts/**/*.ts",
    ],
    ignores: [
      "node_modules",
      "dist",
      "build",
      ".next",
      "coverage",
      "public",
      "out",
      "src/tests/fixtures",
      "src/tests/overview/fixtures",
    ],
    linterOptions: {
      reportUnusedDisableDirectives: "off",
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      drizzle,
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      "@typescript-eslint/no-deprecated": "warn",
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "posthog-js/react",
              importNames: ["useActiveFeatureFlags"],
              message: "Use useActiveUserFeatureFlags from '@/lib/posthog/feature-flags' instead.",
            },
          ],
        },
      ],
      "drizzle/enforce-delete-with-where": [
        "error",
        {
          drizzleObjectName: ["db", "tx"],
        },
      ],
      "drizzle/enforce-update-with-where": [
        "error",
        {
          drizzleObjectName: ["db", "tx"],
        },
      ],
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "CallExpression[callee.object.name='Array'][callee.property.name='from'][arguments.length=1][arguments.0.type='NewExpression'][arguments.0.callee.name='Set']",
          message: "Use es-toolkit/array uniq(...) instead of Array.from(new Set(...)).",
        },
        {
          selector: "ArrayExpression > SpreadElement > NewExpression[callee.name='Set']",
          message: "Use es-toolkit/array uniq(...) instead of [...new Set(...)].",
        },
        {
          selector:
            "CallExpression[callee.object.name='Math'][callee.property.name='min'][arguments.0.callee.object.name='Math'][arguments.0.callee.property.name='max']",
          message: "Use es-toolkit/math clamp(value, min, max) instead of Math.min(Math.max(...)).",
        },
        {
          selector:
            "CallExpression[callee.object.name='Math'][callee.property.name='max'][arguments.0.callee.object.name='Math'][arguments.0.callee.property.name='min']",
          message: "Use es-toolkit/math clamp(value, min, max) instead of Math.max(Math.min(...)).",
        },
        {
          selector:
            "ImportDeclaration[source.value='@/hooks/use-mounted'] > ImportSpecifier[imported.name='useMounted'][local.name='useIsMounted']",
          message: "Import useMounted() without aliasing; useIsMounted() is deprecated.",
        },
        {
          selector:
            "ImportDeclaration[source.value='usehooks-ts'] > ImportSpecifier[imported.name='useIsMounted']",
          message:
            "Do not import useIsMounted() from usehooks-ts; use useMounted() from '@/hooks/use-mounted' instead.",
        },
      ],
    },
  },
  {
    files: ["drizzle/schema/analytics/schema.ts"],
    plugins: {
      "sort-exports": sortExports,
    },
    rules: {
      "sort-exports/sort-exports": ["error", { sortDir: "asc" }],
    },
  },
  {
    files: ["src/lib/posthog/feature-flags.tsx"],
    rules: {
      "no-restricted-imports": "off",
    },
  },
)
