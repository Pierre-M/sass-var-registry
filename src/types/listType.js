"use strict";

const {varTypes} = require("../varTypes");

const LIST_VAR_MATCH_REGEXP = /(^['"].*['"]$)|^[^\$\(].*/g;

const listType = {
    type: varTypes.list,
    check: str => !!str.match(LIST_VAR_MATCH_REGEXP) && str.includes(' ')
};

module.exports = {listType};