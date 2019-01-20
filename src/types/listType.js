"use strict";

import {varTypes} from "../varTypes";

const LIST_VAR_MATCH_REGEXP = /(^['"].*['"]$)|^[^\$\(].*/g;

export const listType = {
    type: varTypes.list,
    check: str => !!str.match(LIST_VAR_MATCH_REGEXP) && str.includes(' '),
    format: entry => {
        return {
            name: entry.name,
            value: entry.value
                .split(' ')
                .map(listItem => listItem.trim()),
            type: varTypes.list
        }
    }
};