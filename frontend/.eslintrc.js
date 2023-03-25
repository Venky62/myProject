module.exports = {
  env: {
    browser: true,
    es2021: true,
    "jest/globals": true
  },
  settings: {
    react: {
      version: "detect"
    }
  },
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:@typescript-eslint/recommended", "plugin:import/errors", "plugin:import/warnings", "plugin:import/typescript", "plugin:jsx-a11y/recommended", "plugin:eslint-comments/recommended", "eslint:recommended", "eslint-config-test-org", "plugin:storybook/recommended", "plugin:jest/recommended", "plugin:prettier/recommended", "plugin:storybook/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react", "@typescript-eslint", "jest"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-var-requires": "off",
    "react/prop-types": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    semi: 0
  }
};