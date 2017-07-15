export class Command {
  constructor(
    public directory: string,
    public fillMissing: Boolean,
    public sort: Boolean,
    public save: Boolean
  ) {}
}
