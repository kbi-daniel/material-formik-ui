module.exports = {
  extends: ["eslint:recommended", "plugin:react/recommended", "react-app", "google"],
  "rules": {
    "arrow-parens": 0,
    "indent": [ "error", 2, {"MemberExpression": 1}],
    "linebreak-style": 0,
    "max-len": ["error", {"code": 200}],
    "react/prop-types": [2],
    "react/jsx-tag-spacing": [2],
  }
};
