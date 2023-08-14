module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  plugins: ['unused-imports'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off', // or "no-unused-vars": "off",
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': ['warn', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
  },
};
