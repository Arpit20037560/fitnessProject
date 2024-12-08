module.exports = {
  presets: [
    ["@babel/preset-env",{targets: {node: "current"}}],  // For transforming modern JavaScript
    ["@babel/preset-react",{runtime: "automatic"}], // For transforming React JSX
  ],
};
