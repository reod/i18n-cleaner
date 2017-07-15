import { isPlainObject } from 'lodash';
import { CleaningService } from './CleaningService';


describe('CleaningService', () => {
  it(`should fill missing fields in objects according to reference object
    if they are simple type`, () => {
    const refObj = { 
      a: 'a',
      b: 'b',
      c: 'c',
      d: {
        ad: 'ad',
        bd: 'bd',
        cd: {
          cda: 'cda'
        }
      }
    };
    const objectsToFill = [
      { c: 'fc' },
      { a: 'fa', b: 'fb' },
      { 
        c: 'fa',
        d: {
          bd: 'fbd'
        }
      }
    ];

    const filledObjects = CleaningService.fillMissingFields(refObj, objectsToFill);

    expect(filledObjects.length).toBe(objectsToFill.length);

    filledObjects.forEach(checkKeysByRef.bind(null, refObj));

    function checkKeysByRef(refObj, obj) {
      Object.keys(refObj).forEach(key => {
        if (!isPlainObject(refObj[key])) {
          expect(obj.hasOwnProperty(key)).toBeTruthy();
          return;
        }

        checkKeysByRef(refObj[key], obj[key]);
      });
    };
  });

  it('should sort object keys according to reference object', () => {
    const refObj = { a: 'a', b: 'b', c: 'c' };
    const objectsToSort = [
      { c: 'c', b: 'b', a: 'a' },
      { c: 'c', a: 'a', b: 'b' }
    ];

    const objectsWithSortedKeys = CleaningService.sortFields(refObj, objectsToSort);
    const keysInRefObject = JSON.stringify(Object.keys(refObj));
    
    objectsWithSortedKeys.forEach(obj => {
      const keyInSortedObject =  JSON.stringify(Object.keys(obj));
      expect(keysInRefObject).toEqual(keyInSortedObject);
    });
  });
});
