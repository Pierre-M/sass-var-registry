"use strict";

import {getTypeFromStringValue} from "./typeCheckService";
import * as typeFormatters from "./types";

export function formatRegistryEntry(registryEntry) {
    const registryEntryType = getTypeFromStringValue(registryEntry.value);
    const formatter = Object.values(typeFormatters).find(formatter => formatter.type === registryEntryType);

    return formatter ? formatter.format(registryEntry) : null;
}