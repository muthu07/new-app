module.exports = {
  printWidth: 140,
  quoteProps: "consistent",
  semi: true,
  trailingComma: "none",
  endOfLine: "lf",
  overrides: [
    {
      files: ["**/configs/**/*.ts"],
      options: {
        printWidth: 210
      }
    }
  ]
};
