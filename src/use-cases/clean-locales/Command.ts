export class Command {
  constructor(
    public directory: string,
    public baseLocale: string,
    public fillMissing: boolean,
    public sort: boolean,
    public save: boolean
  ) {}
}
