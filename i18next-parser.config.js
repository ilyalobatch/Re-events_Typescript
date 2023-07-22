module.exports = {
  // Save the \_old files
  createOldCatalogs: false,

  namespace: "perevod",

  // Indentation of the catalog files
  indentation: 2,

  // Keep keys from the catalog that are no longer in code
  keepRemoved: false,

  // see below for more details
  lexers: {
    js: ["JsxLexer"], // if you're writing jsx inside .js files, change this to JsxLexer
    ts: ["JsxLexer"],
    jsx: ["JsxLexer"],
    tsx: ["JsxLexer"],

    default: ["JsxLexer"],
  },

  // Control the line ending. See options at https://github.com/ryanve/eol
  // lineEnding: 'auto',

  // An array of the locales in your applications
  locales: ["en", "ua"],

  // Supports $LOCALE and $NAMESPACE injection
  // Supports JSON (.json) and YAML (.yml) file formats
  // Where to write the locale files relative to process.cwd()
  output: "src/i18n/locales/$LOCALE/$NAMESPACE.json",

  // An array of globs that describe where to look for source files
  // relative to the location of the configuration file
  input: ["src/**/*.{js,jsx,ts,tsx}"],

  // Whether or not to sort the catalog
  sort: true,

  // Whether to use the keys as the default value; ex. "Hello": "Hello", "World": "World"
  // The option `defaultValue` will not work if this is set to true
  // useKeysAsDefaultValue: false,

  // Display info about the parsing including some stats
  verbose: true,
};
