import { isPlainObject } from 'lodash';


export class CleaningService {

  fillMissingFields(refObj: any, objects: Array<any>): Array<any> {
    return objects.map(this.fillMissingFieldsInObj.bind(this, refObj));
  }

  private fillMissingFieldsInObj(refObj: any, objectToFill: any): any {
    const filled: any = Object.assign({}, objectToFill);

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

  sortFields(refObj: any, objects: Array<any>): Array<any> {
    return objects.map(this.sortFieldsInObj.bind(this, refObj));
  }

  private sortFieldsInObj(refObj: any, object: any): any {
    const sorted: any = {};

    Object.keys(refObj)
      .forEach(key => {
        if (!object.hasOwnProperty(key)) {
          return;
        }

        if (!isPlainObject(refObj[key])) {
          sorted[key] = object[key];
          return;
        }

        sorted[key] = this.sortFieldsInObj(refObj[key], object[key]);
      });

    return sorted;
  }
}
