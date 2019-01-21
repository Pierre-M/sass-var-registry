"use strict";

import {handleRegistryReference} from "./registryReferenceHandler";

export function buildRegistry(formattedEntries) {
    return formattedEntries.reduce((registry, entry) => {
        entry = handleRegistryReference(entry, registry);
        return registry.concat([entry]);
    }, []);
}