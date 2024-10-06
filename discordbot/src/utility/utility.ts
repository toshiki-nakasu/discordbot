export class Utility {
  static paramToString(params: Map<string, string>): string {
    let retString = '';
    for (const key in params) {
      if ('' !== retString) {
        retString += '&';
      }
      retString += key + '=' + params[key];
    }
    return retString;
  }

  static isNullOrUndefined(arg: any): boolean {
    return null === arg || undefined === arg;
  }

  static getRandomNumber(max: number, min: number = 1): number {
    return Math.floor(Math.random() * (Number(max) + 1 - min)) + min;
  }
}
