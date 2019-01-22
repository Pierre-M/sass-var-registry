"use strict";

const {getTypeFromStringValue} = require( "../../src/typeCheckService");
const {stringVar, mapVar, listVar, dynamicStringVar} = require( './mocks');
const {varTypes} = require( '../../src/varTypes');

describe('sass-var-registry - typeCheckService', () => {

    it('should identify string var', () => {
        const type = getTypeFromStringValue(stringVar.rawOutput[0].value);

        expect(type).to.equal(varTypes.string);
    });

    it('should identify map var', () => {
        const type = getTypeFromStringValue(mapVar.rawOutput[0].value);

        expect(type).to.equal(varTypes.map);
    });

    it('should identify list var', () => {
        const type = getTypeFromStringValue(listVar.rawOutput[0].value);

        expect(type).to.equal(varTypes.list);
    });

    it('should identify key var', () => {
        const type = getTypeFromStringValue(dynamicStringVar.rawOutput[0].value);

        expect(type).to.equal(varTypes.key);
    });
});