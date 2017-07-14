export class ObjectCleaner {
  static fillMissingFields(referenceObj: Object, objects: Array<Object>): Array<Object> {
    return objects.map(this.fillMissingFieldsInObj.bind(this, referenceObj));
  }

  private static fillMissingFieldsInObj(referenceObj: Object, objectToFill: Object): Object {
    const filled = Object.assign({}, objectToFill);

    Object.keys(referenceObj)
      .forEach(key => {
        if (!objectToFill.hasOwnProperty(key)) {
          filled[key] = referenceObj[key];
        }
      });

    return filled;
  }
}
