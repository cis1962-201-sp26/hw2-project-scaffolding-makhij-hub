import js from '@eslint/js';
import tseslint from 'typescript-eslint';

export default [
  { ignores: ['dist/**', 'node_modules/**', '*.d.ts', 'jest.config.cjs'] },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ['**/*.ts'],
    languageOptions: {
      globals: {
        console: 'readonly',
        process: 'readonly',
      },
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },

  {
    files: ['jest.config.cjs'],
    languageOptions: {
      globals: { module: 'readonly', require: 'readonly' },
    },
  },
];
