/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "ecmaFeatures": { "jsx": true },
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "require-jsdoc": "off",
    "new-cap": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off"
  },
};

module.exports = config;
