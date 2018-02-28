// http://eslint.org/docs/user-guide/configuring

module.exports = {
  "env": {
    "es6": true,
    "node": true,
    "mocha": true
  },
  "globals": {
    "E": true,
    "Logger": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 8
  },
  "rules": {
    "indent": [
      "error",
      2
    ],
    "linebreak-style": [
      "error",
      "unix"
    ],
    "quotes": [
      "error",
      "single",
      { "allowTemplateLiterals": true }
    ],
    "semi": [
      "error",
      "never"
    ]
  }
};

