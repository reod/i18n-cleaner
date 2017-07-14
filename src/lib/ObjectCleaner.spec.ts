import { ObjectCleaner } from './ObjectCleaner';

describe('ObjectCleaner', () => {
  it(`should fill missing fields in objects according to reference object
    if they are simple type`, () => {
    const referenceObject = { a: 'a', b: 'b', c: 'c' };
    const objectsToFill = [
      { c: 'c' },
      { a: 'a', b: 'b' },
      {}
    ];

    const filledObjects = ObjectCleaner.fillMissingFields(referenceObject, objectsToFill);

    expect(filledObjects.length).toBe(objectsToFill.length);

    filledObjects.forEach(filledObj => {
      Object.keys(referenceObject)
        .forEach(refObjKey => {
          expect(filledObj.hasOwnProperty(refObjKey)).toBeTruthy();
          expect(filledObj[refObjKey]).toBe(referenceObject[refObjKey]);
        });
    });
  });

  it('should sort object keys according to reference object', () => {
    const referenceObject = { a: 'a', b: 'b', c: 'c' };
    const objectsToSort = [
      { c: 'c', b: 'b', a: 'a' },
      { c: 'c', a: 'a', b: 'b' }
    ];

    const objectsWithSortedKeys = ObjectCleaner.sortFields(referenceObject, objectsToSort);
    const keysInRefObject = JSON.stringify(Object.keys(referenceObject));
    
    objectsWithSortedKeys.forEach(obj => {
      const keyInSortedObject =  JSON.stringify(Object.keys(obj));
      expect(keysInRefObject).toEqual(keyInSortedObject);
    });
  });
});
