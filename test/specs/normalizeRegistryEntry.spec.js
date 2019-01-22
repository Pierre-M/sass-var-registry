"use strict";

import {normalizeRegistryEntry} from "../../src/entryNormalizerService";
import * as mocks from './mocks';

const FAKE_REGISTRY = [
    {
        name: '$var',
        value: 'foo',
        type: 'string'
    },
    // {
    //     name: '$map',
    //     value: {
    //         key1: {
    //             type: 'string',
    //             value: 'foo',
    //             name: 'key1'
    //         }
    //     }
    // }
];

const EXPECTED = [
    {
        name: '$var',
        value: 'foo'
    },
    // {
    //     name: '$map',
    //     value: {
    //         key1: 'foo'
    //     }
    // }
]

describe('sass-var-registry - registryFormatter', () => {

    it('should normalize string entry', () => {
        const result = normalizeRegistryEntry(mocks.stringVar.formattedOutput[0]);
        expect(result).to.deep.equal(mocks.stringVar.normalizedOutput[0]);
    });

    it('should normalize map entry', () => {
        const result = normalizeRegistryEntry(mocks.stringVar.formattedOutput[0]);
        expect(result).to.deep.equal(mocks.stringVar.normalizedOutput[0]);
    });
});