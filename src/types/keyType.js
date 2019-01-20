"use strict";

import {varTypes} from "../varTypes";

const KEY_VAR_MATCH_REGEXP = /^\$.*/g;

export const keyType = {
    type: varTypes.key,
    check: str => !!str.match(KEY_VAR_MATCH_REGEXP),
    format: entry => {
        return {
            ...entry,
            type: varTypes.key
        }
    }
};