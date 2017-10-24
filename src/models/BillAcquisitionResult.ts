export class BillAcquisitionResult {
  public FileData: File[];
  public ScannedImage: any;
  public Thumbnail: any;

  constructor () {}

  clear() {
    this.FileData = undefined;
    this.ScannedImage = undefined;
    this.Thumbnail = undefined;
  }
}
