module.exports = {
	plugins: ['prettier-plugin-jsdoc'],
	tsdoc: false,
	jsdocKeepUnParseAbleExampleIndent: true,
	jsdocSingleLineComment: true,
	jsdocSeparateTagGroups: true,
	jsdocCapitalizeDescription: false,
	...require('@taknepoidet-config/prettier')
};
