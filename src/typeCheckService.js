"use strict";

import * as typeConfigs from './types';

export function getTypeFromStringValue(stringValue) {
    const matchingConfig = Object.values(typeConfigs).find(config => config.check(stringValue));

    return matchingConfig ? matchingConfig.type : null;
}