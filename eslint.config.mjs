import nextVitals from 'eslint-config-next/core-web-vitals';

const config = [
  ...nextVitals,
  {
    ignores: ['dist/**', 'out/**', '.next/**', 'node_modules/**'],
  },
];

export default config;
