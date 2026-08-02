import { StorageProvider } from './StorageProvider';

export class InMemoryStorageProvider implements StorageProvider {
  private storage: Map<string, { content: unknown; sha: string }> = new Map();
  private versionCounter = 0;

  async getFile(path: string) {
    await new Promise((resolve) => setTimeout(resolve, 15));
    return this.storage.get(path) || null;
  }

  async saveFile(path: string, contentData: unknown, message: string, sha?: string) {
    await new Promise((resolve) => setTimeout(resolve, 15));
    const existing = this.storage.get(path);
    if (existing && existing.sha !== sha && sha !== undefined) {
      throw new Error("Storage Conflict (409): Concurrent write detected");
    }
    const newSha = `sha-${++this.versionCounter}`;
    this.storage.set(path, { content: contentData, sha: newSha });
    return { commit: { sha: newSha } };
  }

  async deleteFile(path: string, message: string, sha: string) {
    this.storage.delete(path);
    return { commit: { sha: 'deleted' } };
  }
}
