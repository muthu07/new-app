module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    protractor: true,
    jasmine: true,
    mocha: true
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["./tsconfig.json", "./e2e/tsconfig.json"],
    sourceType: "module"
  },
  plugins: ["import", "@typescript-eslint", "filenames", "cucumber"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
    "plugin:sonarjs/recommended",
    "plugin:testing-library/angular"
  ],
  rules: {
    "@typescript-eslint/camelcase": ["warn"],
    "@typescript-eslint/func-call-spacing": ["error", "never"],
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-empty-function": ["error", { allow: ["arrowFunctions"] }],
    "@typescript-eslint/no-useless-constructor": "error",
    "@typescript-eslint/explicit-function-return-type": "error",
    "sonarjs/cognitive-complexity": "warn",
    "sonarjs/prefer-immediate-return": "off",
    "sonarjs/no-duplicate-string": "warn",
    "arrow-body-style": ["error", "as-needed"],
    "class-methods-use-this": "warn",
    "complexity": ["warn", { max: 8 }],
    "curly": "error",
    "default-case": "warn",
    "dot-notation": "off", // TODO:
    "eqeqeq": ["error", "always"],
    "filenames/match-exported": "error",
    "import/first": "error",
    "import/namespace": "off",
    "import/newline-after-import": ["error", { count: 1 }],
    "import/no-relative-parent-imports": "error",
    "import/no-deprecated": "off",
    "import/no-cycle": "error",
    "import/extensions": [
      "error",
      "never",
      {
        // Angular specific overrides
        component: "always",
        module: "always",
        service: "always",
        config: "always",
        reducer: "always",
        utils: "always",
        actions: "always",
        pipe: "always",
        page: "always",
        interface: "always",
        directive: "always",
        helper: "always",
        guard: "always",
        interceptor: "always",
        // General overrides
        json: "always",
        svg: "always",
        png: "always",
        jpg: "always",
        jpeg: "always"
      }
    ],
    "import/no-duplicates": ["error"],
    "import/no-unresolved": "off", // TODO: support absolute paths defined in tsconfig.json
    "import/order": ["error", { "newlines-between": "never" }],
    "import/prefer-default-export": "off",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "lodash",
            message: "Please use lodash-es instead."
          }
        ]
      }
    ],
    "linebreak-style": ["error", "unix"],
    "max-classes-per-file": "warn",
    "max-lines": ["error", 1000],
    "max-params": ["warn", 6],
    "no-alert": "error",
    "no-confusing-arrow": "error",
    "no-console": ["error", { allow: ["error"] }],
    "no-delete-var": "error",
    "no-duplicate-imports": "error",
    "no-empty-function": "off",
    "no-else-return": "error",
    "no-eval": "error",
    "no-extra-bind": "error",
    "no-invalid-this": "off",
    "no-lonely-if": "error",
    "no-loop-func": "error",
    "no-magic-numbers": [
      "error",
      {
        ignore: [
          -1,
          0,
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          20,
          25,
          100,
          200,
          201,
          202,
          204,
          207,
          400,
          401,
          404,
          500,
          1000,
          100000,
          1000000,
          10000000
        ]
      }
    ],
    "no-nested-ternary": "error",
    "no-new-func": "error",
    "no-new": "error",
    "no-param-reassign": "error",
    "no-proto": "error",
    "no-return-assign": "error",
    "no-return-await": "error",
    "no-shadow": "error",
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "error",
    "no-unused-expressions": "error",
    "no-use-before-define": "error",
    "no-useless-concat": "error",
    "no-useless-escape": "error",
    "no-useless-rename": ["error", { ignoreDestructuring: false, ignoreImport: false, ignoreExport: false }],
    "no-useless-return": "error",
    "no-var": "error",
    "object-shorthand": ["error", "always", { ignoreConstructors: false, avoidQuotes: true }],
    "prefer-arrow-callback": ["error", { allowNamedFunctions: true }],
    "prefer-object-spread": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "prefer-destructuring": ["error", { object: true, array: false }],
    "prefer-regex-literals": "error",
    "quotes": "off",
    "rest-spread-spacing": "error",
    "template-curly-spacing": "error",
    "yoda": "error"
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off"
      }
    },
    {
      files: ["environment*.ts", "**/mocks/**/*.ts"],
      rules: {
        "@typescript-eslint/camelcase": ["off"]
      }
    },
    {
      files: ["*.spec.ts", "./e2e/**/*.ts"],
      rules: {
        "no-magic-numbers": "off",
        "no-unused-expressions": "off",
        "max-classes-per-file": "off",
        "class-methods-use-this": "off",
        "@typescript-eslint/no-explicit-any": "off"
      }
    },
    {
      files: ["**/mocks/**/*.ts", "**/configs/**/*.ts"],
      rules: {
        "sonarjs/no-duplicate-string": "off",
        "sonarjs/no-identical-functions": "warn"
      }
    },
    {
      files: ["./e2e/**/*.ts"],
      rules: {
        "sonarjs/no-identical-functions": "off",
        "sonarjs/no-duplicate-string": "off",
        "default-case": "off"
      }
    }
  ]
};
