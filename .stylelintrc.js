module.exports = {
  plugins: ["stylelint-use-nesting", "stylelint-group-selectors", "stylelint-a11y"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
    "stylelint-prettier/recommended",
    "stylelint-a11y/recommended"
  ],
  rules: {
    "no-descending-specificity": null,
    "selector-pseudo-element-no-unknown": [
      true,
      {
        ignorePseudoElements: ["ng-deep"]
      }
    ],
    "csstools/use-nesting": true,
    "plugin/stylelint-group-selectors": [true, { severity: "warning" }],
    // TODO: remove the a11y rule overrides when we fixed these issues
    "a11y/media-prefers-reduced-motion": null,
    "a11y/no-outline-none": [true, { severity: "warning" }],
    "a11y/selector-pseudo-class-focus": null,
    "unit-whitelist": ["px", "rem", "%", "vh", "vw", "deg", "s", "mm"],
    "shorthand-property-no-redundant-values": true,
    "number-no-trailing-zeros": true,
    "declaration-block-no-redundant-longhand-properties": true,
    "scss/dollar-variable-pattern": "^[a-z0-9_-]+$",
    "value-keyword-case": "lower"
  }
};
