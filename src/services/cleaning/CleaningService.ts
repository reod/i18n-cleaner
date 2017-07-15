import { isPlainObject } from 'lodash';


export class CleaningService {

  static fillMissingFields(refObj: Object, objects: Array<Object>): Array<Object> {
    return objects.map(this.fillMissingFieldsInObj.bind(this, refObj));
  }

  private static fillMissingFieldsInObj(refObj: any, objectToFill: any): Object {
    const filled = Object.assign({}, objectToFill);

    Object.keys(refObj)
      .forEach(key => {
        if (!isPlainObject(refObj[key])) {
          filled[key] = filled[key] || refObj[key];
          return;
        }

        filled[key] = this.fillMissingFieldsInObj(refObj[key], filled[key]);
      });

    return filled;
  }

  static sortFields(refObj: Object, objects: Array<Object>): Array<Object> {
    return objects.map(this.sortFieldsInObj.bind(this, refObj));
  }

  private static sortFieldsInObj(refObj: Object, object: Object): Object {
    const sorted = {};

    Object.keys(refObj)
      .forEach(key => {
        sorted[key] = object[key];
      });

    return sorted;
  }
}
