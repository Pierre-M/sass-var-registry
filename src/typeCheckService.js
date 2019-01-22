"use strict";

const typeConfigs = require('./types');

function getTypeFromStringValue(stringValue) {
    const matchingConfig = Object.values(typeConfigs).find(config => config.check(stringValue));

    return matchingConfig ? matchingConfig.type : null;
}

module.exports = {getTypeFromStringValue};