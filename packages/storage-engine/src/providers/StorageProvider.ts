export interface StorageProvider {
  getFile(path: string): Promise<{ content: unknown; sha: string } | null>;
  saveFile(path: string, contentData: unknown, message: string, sha?: string): Promise<any>;
  deleteFile(path: string, message: string, sha: string): Promise<any>;
}
