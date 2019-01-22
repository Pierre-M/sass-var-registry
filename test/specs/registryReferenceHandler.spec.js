"use strict";

const {handleRegistryReference} = require( "../../src/registryReferenceHandler");

const mocks = require('./mocks');
const {varTypes} = require( "../../src/varTypes");

const fakeKeyVarEntry = {
    name: '$keyVar',
    value: mocks.stringVar.formattedOutput[0].name,
    type: varTypes.key
};
const unexistingKey = {
    name: '$key2',
    value: '$null',
    type: varTypes.key
};

const FAKE_REGISTRY = [mocks.stringVar.formattedOutput[0]];

describe('sass-var-registry - registryReferenceHandler', () => {

    it('should let "not key var" unchanged', () => {
        const result = handleRegistryReference(mocks.stringVar.formattedOutput[0]);
        expect(result).to.deep.equal(mocks.stringVar.formattedOutput[0]);
    });

    it('should find value in provided registry', () => {
        const result = handleRegistryReference(fakeKeyVarEntry, FAKE_REGISTRY);
        expect(result).to.deep.equal({
            name: fakeKeyVarEntry.name,
            type: mocks.stringVar.formattedOutput[0].type,
            value: mocks.stringVar.formattedOutput[0].value
        });
    });

    it('should return null if value is not found', () => {
        const result = handleRegistryReference(unexistingKey, FAKE_REGISTRY);
        expect(result).to.deep.equal(null);
    });
});