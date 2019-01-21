"use strict";

import {dynamicStringVar, listVar, mapVar, nestedMapVar, stringVar} from "./mocks";
import {formatRegistryEntry} from "../../src/entryFormatterService";

describe('sass-var-registry - entryFormatterService', () => {
    it('should format string entry', () => {
        const result = formatRegistryEntry(stringVar.rawOutput[0]);
        expect(result).to.deep.equal(stringVar.formattedOutput[0]);
    });

    it('should format dynamic var entry', () => {
        const result = formatRegistryEntry(dynamicStringVar.rawOutput[0]);
        expect(result).to.deep.equal(dynamicStringVar.formattedOutput[0]);
    });

    it('should format map entry', () => {
        const result = formatRegistryEntry(mapVar.rawOutput[0]);
        expect(result).to.deep.equal(mapVar.formattedOutput[0]);
    });

    it('should format list entry', () => {
        const result = formatRegistryEntry(listVar.rawOutput[0]);
        expect(result).to.deep.equal(listVar.formattedOutput[0]);
    });

    it('should format nested map entry', () => {
        const result = formatRegistryEntry(nestedMapVar.rawOutput[0]);
        expect(result).to.deep.equal(nestedMapVar.formattedOutput[0]);
    });
});