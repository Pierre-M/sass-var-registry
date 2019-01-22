"use strict";

const {varTypes} = require("../varTypes");
const MAP_VAR_MATCH_REGEXP = /^[\(].*[\)]$/g;

const mapType = {
    type: varTypes.map,
    check: str => !!str.match(MAP_VAR_MATCH_REGEXP)
};

module.exports = {mapType};