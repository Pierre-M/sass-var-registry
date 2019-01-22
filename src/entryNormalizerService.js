"use strict";

import * as typesConfig from './types';

export function normalizeRegistryEntry(registryEntry) {
    const config = Object.values(typesConfig).find(config => config.type === registryEntry.type);

    return config ? config.normalize(registryEntry) : null;
}