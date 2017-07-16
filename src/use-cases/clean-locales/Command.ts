export class Command {
  constructor(
    public directory: string,
    public baseLocale: string,
    public fillMissing: Boolean,
    public sort: Boolean,
    public save: Boolean
  ) {}
}
