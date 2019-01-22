"use strict";

const {varTypes} = require('../varTypes');

const KEY_VAR_MATCH_REGEXP = /^\$.*/g;

const keyType = {
    type: varTypes.key,
    check: str => !!str.match(KEY_VAR_MATCH_REGEXP)
};

module.exports = {keyType};