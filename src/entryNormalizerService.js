"use strict";

const typesConfigs = require('./types');
const {varTypes} = require('./varTypes');

const normalizers = [
    {
        type: varTypes.string,
        normalize: entry => {
            return {
                name: entry.name,
                value: entry.value
            }
        }
    },
    {
        type: varTypes.map,
        normalize: entry => {
            return {
                name: entry.name,
                value: Object.keys(entry.value).reduce((entries, key) => {
                    if (entry.value[key]) {
                        const normalizedEntry = normalizeRegistryEntry(entry.value[key]);
                        entries[key] = normalizedEntry ? normalizedEntry.value : null;
                    }

                    return entries;
                }, {})
            }
        }
    }
];

function normalizeRegistryEntry(registryEntry) {
    const config = Object.values(normalizers).find(config => config.type === registryEntry.type);

    return config ? config.normalize(registryEntry) : null;
}

module.exports = {
    normalizeRegistryEntry
};