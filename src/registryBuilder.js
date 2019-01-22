"use strict";

import {buildRawRegistry} from "./rawRegistryBuilder";
import {formatRegistryEntry} from "./entryFormatterService";
import {handleRegistryReference} from "./registryReferenceHandler";
import {normalizeRegistryEntry} from "./entryNormalizerService";


export function buildRegistry(filesContent) {
    const rawRegistry = buildRawRegistry(filesContent);

    return rawRegistry
        .map(formatRegistryEntry)
        .reduce((entries, entry) => {
            entry = handleRegistryReference(entry, entries);

            return entries.concat([entry]);
        }, [])
        .map(normalizeRegistryEntry);
}