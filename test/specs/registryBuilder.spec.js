"use strict";

import {buildRegistry} from "../../src/registryBuilder";

const formattedEntries = [
    {
        name: '$key',
        value: 'foo',
        type: 'string'
    },
    {
        name: '$key2',
        value: {
            key1: {
                value: '$key',
                type: 'key',
                name: 'key1'
            }
        },
        type: 'map'
    },
    {
        name: '$key3',
        type: 'key',
        value: '$key'
    }
];

const expected = [
    {
        name: '$key',
        value: 'foo',
        type: 'string'
    },
    {
        name: '$key2',
        value: {
            key1: {
                name: 'key1',
                value: 'foo',
                type: 'string'
            }
        },
        type: 'map'
    },
    {
        name: '$key3',
        value: 'foo',
        type: 'string'
    }
];

describe('sass-var-registry - registryBuilder', () => {

    it('should build registry with non top level variables resolution', () => {
        const result = buildRegistry(formattedEntries);
        expect(result).to.deep.equal(expected);
    });
});