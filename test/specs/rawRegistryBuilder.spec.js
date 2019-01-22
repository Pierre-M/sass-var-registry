"use strict";

const {buildRawRegistry} = require( "../../src/rawRegistryBuilder");
const mocks = require("./mocks");

describe('sass-var-registry - rawRegistryBuilder', () => {
    it('should return an array', () => {
        const result = buildRawRegistry('');

        expect(result).to.deep.equal([]);
    });

    it('should exlude comment sections', () => {
        const result = buildRawRegistry(mocks.stringVarIntoCommentSection.input);

        expect(result).to.deep.equal(mocks.stringVarIntoCommentSection.rawOutput);
    });

    it('should add string variables', () => {
        const result = buildRawRegistry(mocks.stringVar.input);

        expect(result).to.deep.equal(mocks.stringVar.rawOutput);
    });

    it('should add dynamic string variables', () => {
        const result = buildRawRegistry(mocks.dynamicStringVar.input);

        expect(result).to.deep.equal(mocks.dynamicStringVar.rawOutput);
    });

    it('should add map variables', () => {
        const result = buildRawRegistry(mocks.mapVar.input);

        expect(result).to.deep.equal(mocks.mapVar.rawOutput);
    });

    it('should add list variables', function () {
        const result = buildRawRegistry(mocks.listVar.input);

        expect(result).to.deep.equal(mocks.listVar.rawOutput);
    });

    it('should build correct registry for complex content', function () {
        const result = buildRawRegistry(mocks.globalContent.input);

        expect(result).to.deep.equal(mocks.globalContent.rawOutput);
    });
});