import { buildConfig } from 'eslint-config-spartan';
import {
  jsDoc,
  mdx,
  namingConvention,
  prettier,
  promise,
  regExp,
  typeEnabled,
  unicorn,
  vitest,
} from 'eslint-config-spartan/mixins';
import { files } from 'eslint-config-spartan/utils';

export default buildConfig(
  typeEnabled({ parserOptions: { tsconfigRootDir: import.meta.dirname, projectService: true } }),
  namingConvention,
  promise,
  regExp,
  unicorn,
  jsDoc,
  vitest,
  mdx,
  {
    name: 'root/scripts',
    files: [`scripts/${files.jsTsNoX}`],
    rules: {
      '@typescript-eslint/no-magic-numbers': 'off',
      'security/detect-non-literal-fs-filename': 'off',
    },
  },
  {
    name: 'root/import-order',
    files: [files.jsTs],
    rules: {
      'import/order': ['error', { alphabetize: { order: 'asc', caseInsensitive: true }, 'newlines-between': 'never' }],
    },
  },
  prettier,
  {
    name: 'root/global-ignores',
    ignores: ['coverage/', 'reports/', '.vscode/', 'dist/', '.temp/'],
  },
);
