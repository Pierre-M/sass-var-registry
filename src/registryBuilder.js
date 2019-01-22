"use strict";

const {buildRawRegistry} = require("./rawRegistryBuilder");
const {formatRegistryEntry} = require("./entryFormatterService");
const {handleRegistryReference} = require("./registryReferenceHandler");
const {normalizeRegistryEntry} = require("./entryNormalizerService");

function buildRegistry(filesContent) {
    const rawRegistry = buildRawRegistry(filesContent);

    return rawRegistry
        .map(formatRegistryEntry)
        .filter(Boolean)
        .reduce((entries, entry) => {
            entry = handleRegistryReference(entry, entries);

            if(!entry) {
                return entries;
            }

            return entries.concat([entry]);
        }, [])
        .filter(Boolean)
        .map(normalizeRegistryEntry)
        .filter(Boolean);
}

module.exports = {buildRegistry};