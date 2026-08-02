import { StorageProvider } from './providers/StorageProvider';

export class InWorkStorageEngine {
  constructor(private provider: StorageProvider) {}

  private async executeWithRetry<T>(operation: () => Promise<T>, maxRetries = 6): Promise<T> {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error: any) {
        const isConflict = error && (
          error.message.includes('409') || 
          error.message.includes('Conflict') || 
          error.message.includes('Concurrent write detected')
        );

        if (!isConflict || attempt === maxRetries) {
          throw error;
        }

        // Backoff زمني تصاعدي مع عشوائية طفيفة (Jitter) لتجنب التصادم المتكرر (Thundering Herd)
        const delay = Math.pow(2, attempt) * 20 + Math.random() * 30;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    throw new Error("Storage conflict unresolved after maximum retries");
  }

  async getRecord<T>(collection: string, id: string): Promise<T | null> {
    const path = `database/${collection}/${id}.json`;
    const res = await this.provider.getFile(path);
    if (!res) return null;
    return res.content as T;
  }

  async saveRecord<T extends { id: string; status?: string }>(
    collection: string, 
    record: T, 
    newStatus: string
  ): Promise<void> {
    const path = `database/${collection}/${record.id}.json`;

    await this.executeWithRetry(async () => {
      const existing = await this.provider.getFile(path);
      const sha = existing ? existing.sha : undefined;
      
      const oldStatus = existing && typeof existing.content === 'object' && existing.content !== null && 'status' in existing.content 
        ? (existing.content as any).status 
        : undefined;

      record.status = newStatus;

      await this.provider.saveFile(
        path, 
        record, 
        `engine: upsert ${collection}/${record.id}`, 
        sha
      );

      await this.updateStatusIndex(collection, record.id, oldStatus, newStatus);
    });
  }

  private async updateStatusIndex(collection: string, id: string, oldStatus: string | undefined, newStatus: string) {
    if (oldStatus && oldStatus !== newStatus) {
      await this.modifyIndex(collection, oldStatus, id, 'remove');
    }
    await this.modifyIndex(collection, newStatus, id, 'add');
  }

  private async modifyIndex(collection: string, status: string, id: string, action: 'add' | 'remove') {
    await this.executeWithRetry(async () => {
      const indexPath = `database/indexes/${collection}/${status}.json`;
      const existing = await this.provider.getFile(indexPath);
      let list: string[] = existing ? (existing.content as string[]) : [];

      if (action === 'add' && !list.includes(id)) {
        list.push(id);
      } else if (action === 'remove') {
        list = list.filter((item) => item !== id);
      }

      const sha = existing ? existing.sha : undefined;
      await this.provider.saveFile(indexPath, list, `index update ${status}`, sha);
    });
  }

  async getIndexByStatus(collection: string, status: string): Promise<string[]> {
    const indexPath = `database/indexes/${collection}/${status}.json`;
    const res = await this.provider.getFile(indexPath);
    return res ? (res.content as string[]) : [];
  }
}
