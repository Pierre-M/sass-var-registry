"use strict";

import {varTypes} from '../varTypes';

const STRING_VAR_MATCH_REGEXP = /(^['"].*['"]$)|^[^\$\(].*/g;
const MAP_VAR_MATCH_REGEXP = /^[\(].*[\)]$/g;
const KEY_VAR_MATCH_REGEXP = /^\$.*/g;

const TYPE_CONFIGS = [
    {
        type: varTypes.string,
        check: str => !!str.match(STRING_VAR_MATCH_REGEXP) && !str.includes(' ')
    },
    {
        type: varTypes.map,
        check: str => !!str.match(MAP_VAR_MATCH_REGEXP)
    },
    {
        type: varTypes.list,
        check: str => !!str.match(STRING_VAR_MATCH_REGEXP) && str.includes(' ')
    },
    {
        type: varTypes.key,
        check: str => !!str.match(KEY_VAR_MATCH_REGEXP)
    }
];

export function getTypeFromStringValue(stringValue) {
    const matchingConfig = TYPE_CONFIGS.find(config => config.check(stringValue));

    return matchingConfig ? matchingConfig.type : null;
}