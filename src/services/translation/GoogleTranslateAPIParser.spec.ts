import { GoogleTranslateAPIResponse, GoogleTranslateAPIParser } from './GoogleTranslateAPIParser'; 
import { GoogleTranslationService } from './GoogleTranslationService';


describe('GoogleTranslateAPIParser', () => {
  const complexTranslationResult = require('./__mocks__/complex-translation-result.json');
  const complexTranslationValues = require('./__mocks__/complex-translation-values.json');

  let parser =  null;

  beforeEach(() => {
    parser = new GoogleTranslateAPIParser(GoogleTranslationService.BATH_REQ_SEP);
  });

  it('should extract translation result from simple, one word request', async () => {
		const simpleTranslation = require('./__mocks__/simple-translation-response.json');
		const simpleResult = parser.extractTranslations(simpleTranslation);

		expect(simpleResult).toEqual(['język angielski']);
  });
  
  it('should extract translation result from complex, batch request', async () => {
		const complexTranslation = require('./__mocks__/complex-translation-response.json');
		const complexResult = parser.extractTranslations(complexTranslation);

		expect(complexResult).toEqual(complexTranslationResult);
  });
  
  it('should get translated values', () => {
    const values = parser.getTranslatedValues(complexTranslationResult);
    expect(values).toEqual(complexTranslationValues);
  });
});
 	
