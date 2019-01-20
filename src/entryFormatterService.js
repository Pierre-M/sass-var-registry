"use strict";

import {getTypeFromStringValue} from "./types/typeCheckService";
import {varTypes} from "./varTypes";

const TYPE_FORMATTERS = [
    {
        type: varTypes.string,
        format: entry => {
            return {
                ...entry,
                type: varTypes.string
            }
        }
    },
    {
        type: varTypes.key,
        format: entry => {
            return {
                ...entry,
                type: varTypes.key
            }
        }
    },
    {
        type: varTypes.map,
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
    },
    {
        type: varTypes.list,
        format: entry => {
            return {
                name: entry.name,
                value: entry.value
                    .split(' ')
                    .map(listItem => listItem.trim()),
                type: varTypes.list
            }
        }
    }
];

export function formatRegistryEntry(registryEntry) {
    const registryEntryType = getTypeFromStringValue(registryEntry.value);
    const formatter = TYPE_FORMATTERS.find(formatter => formatter.type === registryEntryType);

    return formatter ? formatter.format(registryEntry) : null;
}