export class BillAcquisitionResult {
  public FileData: File[];
  public ScannedImage: any;

  constructor () {}

  clear() {
    this.FileData = undefined;
    this.ScannedImage = undefined;
  }
}
