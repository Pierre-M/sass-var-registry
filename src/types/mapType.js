"use strict";

import {varTypes} from "../varTypes";

const MAP_VAR_MATCH_REGEXP = /^[\(].*[\)]$/g;

export const mapType = {
    type: varTypes.map,
    check: str => !!str.match(MAP_VAR_MATCH_REGEXP),
    format: entry => {
        return {
            name: entry.name,
            value: entry.value.
            substring(1, entry.value.length - 1)
                .split(',')
                .reduce((mapDef, line) => {
                    const key = line.split(':')[0].trim();
                    const value = line.split(':')[1].trim();

                    return {
                        ...mapDef,
                        ...{
                            [key]: value
                        }
                    }
                }, {}),
            type: varTypes.map
        }
    }
};