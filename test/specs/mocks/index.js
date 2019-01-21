"use strict";

import {varTypes} from "../../../src/varTypes";

const stringVar = {
    input: '$var: var;',
    rawOutput: [{
        name: '$var',
        value: 'var'
    }],
    formattedOutput: [
        {
            name: '$var',
            value: 'var',
            type: varTypes.string
        }
    ]
};

const dynamicStringVar = {
    input: '$var: $otherVar;',
    rawOutput: [{
        name: '$var',
        value: '$otherVar'
    }],
    formattedOutput: [
        {
            name: '$var',
            value: '$otherVar',
            type: varTypes.key
        }
    ]
};

const stringVarIntoCommentSection = {
    input: `
        /*
            $var: var;
        */
    `,
    rawOutput: []
};

const stringVarIntoMixin = {
    input: `
        @mixin mixin {
            $var: var;
        }
    `,
    rawOutput: []
};

const stringVarIntoFunction = {
    input: `
        @function function {
            $var: var;
        }
    `,
    rawOutput: []
};

const mapVar = {
    input: `
$map: (
key1: value
);
    `,
    rawOutput: [{
        name: '$map',
        value: '(key1: value)'
    }],
    formattedOutput: [
        {
            name: '$map',
            value: {
                key1: {
                    name: 'key1',
                    value: 'value',
                    type: varTypes.string
                }
            },
            type: varTypes.map
        }
    ]
};

const listVar = {
    input: `$list: value value value;`,
    rawOutput: [{
        name: '$list',
        value: 'value value value'
    }],
    formattedOutput: [
        {
            name: '$list',
            value: ['value', 'value', 'value'],
            type: varTypes.list
        }
    ]
};

const nestedMapVar = {
    input: `
$nestedMap: (
key1: value,
key2: (
nestedKey1: value,
nestedKey2: value
),
key3: (
nestedKey1: (
key1: value
)
)
);   
`,
    rawOutput: [
        {
            name: '$nestedMap',
            value: '(key1: value,key2: (nestedKey1: value,nestedKey2: value),key3: (nestedKey1: (key1: value)))'
        }
    ],
    formattedOutput: [
        {
            name: '$nestedMap',
            value: {
                key1: {
                    name: 'key1',
                    value: 'value',
                    type: varTypes.string
                },
                key2: {
                    name: 'key2',
                    value: {
                        nestedKey1: {
                            name: 'nestedKey1',
                            value: 'value',
                            type: varTypes.string
                        },
                        nestedKey2: {
                            name: 'nestedKey2',
                            value: 'value',
                            type: varTypes.string
                        }
                    },
                    type: varTypes.map
                },
                key3: {
                    name: 'key3',
                    value: {
                        nestedKey1: {
                            name: 'nestedKey1',
                            value: {
                                key1: {
                                    name: 'key1',
                                    value: 'value',
                                    type: varTypes.string
                                }
                            },
                            type: varTypes.map
                        }
                    },
                    type: varTypes.map
                }
            },
            type: varTypes.map
        }
    ]
};

const globalContent = {
    input: `
        ${stringVar.input}
        ${stringVarIntoCommentSection.input}
        ${stringVarIntoFunction.input}
        ${stringVarIntoMixin.input}
        ${mapVar.input}
        ${listVar.input}
    `,
    rawOutput: [
        ...stringVar.rawOutput,
        ...stringVarIntoCommentSection.rawOutput,
        ...stringVarIntoFunction.rawOutput,
        ...stringVarIntoMixin.rawOutput,
        ...mapVar.rawOutput,
        ...listVar.rawOutput
    ]
};

export {
    stringVar,
    dynamicStringVar,
    stringVarIntoCommentSection,
    stringVarIntoMixin,
    stringVarIntoFunction,
    mapVar,
    listVar,
    globalContent,
    nestedMapVar
}