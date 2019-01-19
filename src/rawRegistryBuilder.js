"use strict";

const SASS_VARIABLES_MATCH_REGEXP = /\$(.|[\r\n])*?;/g;
const SASS_COMMENT_MATCH_REGEXP = /\/\*(.|[\r\n])*?\*\//g;
const SASS_MIXIN_MATCH_REGEXP = /\@mixin(.|[\r\n])*?}/g;
const SASS_FUNCTION_MATCH_REGEXP = /\@function(.|[\r\n])*?}/g;

function buildRawRegistry(content) {
    content = cleanedContent(content);

    return findVariablesMatches(content)
        .map(buildVariableRawDefinition);
}

function cleanedContent(content) {
    return content
        .replace(SASS_COMMENT_MATCH_REGEXP, '')
        .replace(SASS_MIXIN_MATCH_REGEXP, '')
        .replace(SASS_FUNCTION_MATCH_REGEXP, '');
}

function findVariablesMatches(content) {
    const matches = content.match(SASS_VARIABLES_MATCH_REGEXP) || [];

    return matches.filter(Boolean);
}

function buildVariableRawDefinition(stringDefinition) {
    const parts = stringDefinition.split(':');

    if (parts.length < 2) {
        return null;
    }

    const name = normalizeName(parts[0]);
    const value = normalizeValue(stringDefinition.substring(stringDefinition.indexOf(':') + 1));

    return {
        name,
        value
    }
}

function normalizeName(rawName) {
    return rawName.trim();
}

function normalizeValue(rawValue) {
    return rawValue
        .trim()
        .replace(/[;\n]/g, '');
}

export {
    buildRawRegistry
}