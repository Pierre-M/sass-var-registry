"use strict";

const {varTypes} = require("../varTypes");
const STRING_VAR_MATCH_REGEXP = /(^['"].*['"]$)|^[^\$\(].*/g;

const stringType = {
    type: varTypes.string,
    check: str => !!str.match(STRING_VAR_MATCH_REGEXP) && !str.includes(' ')
};

module.exports = {stringType};