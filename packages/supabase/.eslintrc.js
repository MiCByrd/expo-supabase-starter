module.exports = {
	root: true,
	extends: ["universe/node"],
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint"],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module"
	}
};