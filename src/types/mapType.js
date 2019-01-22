"use strict";

import {varTypes} from "../varTypes";
import {formatRegistryEntry} from "../entryFormatterService";
import {normalizeRegistryEntry} from "../entryNormalizerService";

const MAP_VAR_MATCH_REGEXP = /^[\(].*[\)]$/g;

function getMapValue(mapStringDef) {
    return mapStringDef
        .substring(1, mapStringDef.length - 1);
}

function getMapStringValueSplitIndexes(mapValue) {
    const characters = mapValue.split('');
    let nestedLevel = 0;

    return characters.reduce((indexes, char, index) => {
        if (char === '(') {
            nestedLevel++;
        }

        if (char === ')') {
            nestedLevel--;
        }

        if (char === ',' && !nestedLevel) {
            indexes.push(index);
        }

        return indexes;
    }, [-1])
}

function getMapParts(mapStringDef) {
    const mapValue = getMapValue(mapStringDef);
    const splitIndexes = getMapStringValueSplitIndexes(mapValue);

    return splitIndexes.reduce((parts, idx, splitIdxIdx, splitIndexes) => {
        const start = idx + 1;
        const end = splitIdxIdx === splitIndexes.length -1 ? mapValue.length : splitIndexes[splitIdxIdx + 1];
        const part = mapValue.substring(start, end);

        return parts.concat([part]);
    }, []);
}

function mapPartFormatter(parts) {
    return parts
        .reduce((mapDef, line) => {
            const key = line.split(':')[0].trim();
            const value = line.substring(line.indexOf(':') + 1).trim();

            return {
                ...mapDef,
                ...{
                    [key]: formatRegistryEntry({name: key, value})
                }
            }
        }, {})
}

function mapValueParser(mapStringDef) {
    const mapParts = getMapParts(mapStringDef);

    return mapPartFormatter(mapParts);
}

function format(entry) {
    return {
        name: entry.name,
        value: mapValueParser(entry.value),
        type: varTypes.map
    }
}

function normalize(entry) {
    return {
        name: entry.name,
        value: Object.keys(entry.value).reduce((entries, key) => {
            const normalizedEntry = normalizeRegistryEntry(entry.value[key]);
            entries[key] = normalizedEntry ? normalizedEntry.value : null;

            return entries;
        }, {})
    }
}

export const mapType = {
    type: varTypes.map,
    check: str => !!str.match(MAP_VAR_MATCH_REGEXP),
    format,
    normalize
};