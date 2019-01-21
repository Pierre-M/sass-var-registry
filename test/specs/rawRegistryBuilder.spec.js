"use strict";

import {buildRawRegistry} from "../../src/rawRegistryBuilder";
import {
    globalContent,
    listVar,
    mapVar,
    stringVar,
    dynamicStringVar,
    stringVarIntoCommentSection,
    stringVarIntoFunction,
    stringVarIntoMixin, nestedMapVar
} from "./mocks";

describe('sass-var-registry - rawRegistryBuilder', () => {
    it('should return an array', () => {
        const result = buildRawRegistry('');

        expect(result).to.deep.equal([]);
    });

    it('should exlude comment sections', () => {
        const result = buildRawRegistry(stringVarIntoCommentSection.input);

        expect(result).to.deep.equal(stringVarIntoCommentSection.rawOutput);
    });

    it('should exclude sass mixins', () => {
        const result = buildRawRegistry(stringVarIntoMixin.input);

        expect(result).to.deep.equal(stringVarIntoMixin.rawOutput);
    });

    it('should exclude sass functions', () => {
        const result = buildRawRegistry(stringVarIntoFunction.input);

        expect(result).to.deep.equal(stringVarIntoFunction.rawOutput);
    });

    it('should add string variables', () => {
        const result = buildRawRegistry(stringVar.input);

        expect(result).to.deep.equal(stringVar.rawOutput);
    });

    it('should add dynamic string variables', () => {
        const result = buildRawRegistry(dynamicStringVar.input);

        expect(result).to.deep.equal(dynamicStringVar.rawOutput);
    });

    it('should add map variables', () => {
        const result = buildRawRegistry(mapVar.input);

        expect(result).to.deep.equal(mapVar.rawOutput);
    });

    it('should add list variables', function () {
        const result = buildRawRegistry(listVar.input);

        expect(result).to.deep.equal(listVar.rawOutput);
    });

    it('should build correct registry for complex content', function () {
        const result = buildRawRegistry(globalContent.input);

        expect(result).to.deep.equal(globalContent.rawOutput);
    });
});