import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  private files: string[] = [];

  public async saveFile(file: string): Promise<string> {
    this.files.push(file);
    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const index = this.files.findIndex(fileFromArray => fileFromArray === file);
    this.files.splice(index, 1);
  }
}

export default DiskStorageProvider;
