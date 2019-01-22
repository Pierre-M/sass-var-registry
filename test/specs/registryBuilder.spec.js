"use strict";

const {buildRegistry} = require( "../../src/registryBuilder");

const filesContent =
    `
    $key: foo;
    
    $key2: (
        key1: $key
    );
    
    $key3: $key;
    `;

const expected = [
    {
        name: '$key',
        value: 'foo'
    },
    {
        name: '$key2',
        value: {
            key1: 'foo'
        }
    },
    {
        name: '$key3',
        value: 'foo'
    }
];

describe('sass-var-registry - registryBuilder', () => {
    it('should build registry with non top level variables resolution', () => {
        const result = buildRegistry(filesContent);
        expect(result).to.deep.equal(expected);
    });
});