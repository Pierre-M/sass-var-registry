"use strict";

import {varTypes} from "../varTypes";

const STRING_VAR_MATCH_REGEXP = /(^['"].*['"]$)|^[^\$\(].*/g;

export const stringType = {
    type: varTypes.string,
    check: str => !!str.match(STRING_VAR_MATCH_REGEXP) && !str.includes(' '),
    format: entry => {
        return {
            ...entry,
            type: varTypes.string
        }
    },
    normalize: entry => {
        return {
            name: entry.name,
            value: entry.value
        }
    }
};