import { isPlainObject } from 'lodash';
import * as flat from 'flat';
import { CleaningService } from './CleaningService';

function isPrimitive(value) {
  return !isPlainObject(value);
}

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

    const cService = new CleaningService();
    const filledObjects = cService.fillMissingFields(refObj, objectsToFill);

    expect(filledObjects.length).toBe(objectsToFill.length);

    filledObjects.forEach(checkKeysByRef.bind(null, refObj));

    function checkKeysByRef(refeObj, obj) {
      Object.keys(refeObj).forEach(key => {
        if (isPrimitive(refeObj[key])) {
          expect(obj.hasOwnProperty(key)).toBeTruthy();
          return;
        }

        checkKeysByRef(refeObj[key], obj[key]);
      });
    }
  });

  it('should not add missing fields when sorting keys according to reference object', () => {
    const refObj = { a: 'a', b: 'b', c: 'c' };
    const objsToSort = [{ c: 'fc', a: 'fa' }];

    const cService = new CleaningService();
    const objsWithSortedKeys = cService.sortFields(refObj, objsToSort);
    const probe = objsWithSortedKeys[0];

    expect(probe.b).toBeUndefined();
  });

  it('should sort object keys according to reference object', () => {
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
    const objectsToSort = [
      {
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
      },
      {
        a: 'a',
        c: 'c',
        b: 'b',
        d: {
          cd: {
            cda: 'cda'
          },
          bd: 'bd',
          ad: 'ad',
        }
      }
    ];

    const cService = new CleaningService();
    const objectsWithSortedKeys = cService.sortFields(refObj, objectsToSort);
    const keysInRefObject = JSON.stringify(Object.keys(flat(refObj)));

    objectsWithSortedKeys.forEach(obj => {
      const keysInSortedObject =  JSON.stringify(Object.keys(flat(obj)));
      expect(keysInRefObject).toEqual(keysInSortedObject);
    });
  });
});
