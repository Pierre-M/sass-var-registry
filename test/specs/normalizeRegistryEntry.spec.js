"use strict";

const  {normalizeRegistryEntry} = require("../../src/entryNormalizerService");
const mocks = require('./mocks');

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