"use strict";

const {getTypeFromStringValue} = require("./typeCheckService");
const {varTypes} = require('./varTypes');

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

const typeFormatters = [
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
    },
    {
        type: varTypes.map,
        format: entry => {
            return {
                name: entry.name,
                value: mapValueParser(entry.value),
                type: varTypes.map
            }
        }
    },
    {
        type: varTypes.string,
        format: entry => {
            return {
                ...entry,
                type: varTypes.string
            }
        }
    }
];

function formatRegistryEntry(registryEntry) {
    const registryEntryType = getTypeFromStringValue(registryEntry.value);
    const formatter = Object.values(typeFormatters).find(formatter => formatter.type === registryEntryType);

    return formatter ? formatter.format(registryEntry) : null;
}

module.exports = {
    formatRegistryEntry
};