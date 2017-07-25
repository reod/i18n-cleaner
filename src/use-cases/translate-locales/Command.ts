export class Command {
  constructor(
    public baseLocalePath: string,
    public sourceLng: string,
    public targetLng: string,
    public overrideExisting: boolean,
    public outputFileName: string,
    public save: boolean
  ) {}
}
