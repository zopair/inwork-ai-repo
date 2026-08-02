"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InWorkStorageEngine = void 0;
class InWorkStorageEngine {
    provider;
    constructor(provider) {
        this.provider = provider;
    }
    async executeWithRetry(operation, maxRetries = 6) {
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
            try {
                return await operation();
            }
            catch (error) {
                const isConflict = error && (error.message.includes('409') ||
                    error.message.includes('Conflict') ||
                    error.message.includes('Concurrent write detected'));
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
    async getRecord(collection, id) {
        const path = `database/${collection}/${id}.json`;
        const res = await this.provider.getFile(path);
        if (!res)
            return null;
        return res.content;
    }
    async saveRecord(collection, record, newStatus) {
        const path = `database/${collection}/${record.id}.json`;
        await this.executeWithRetry(async () => {
            const existing = await this.provider.getFile(path);
            const sha = existing ? existing.sha : undefined;
            const oldStatus = existing && typeof existing.content === 'object' && existing.content !== null && 'status' in existing.content
                ? existing.content.status
                : undefined;
            record.status = newStatus;
            await this.provider.saveFile(path, record, `engine: upsert ${collection}/${record.id}`, sha);
            await this.updateStatusIndex(collection, record.id, oldStatus, newStatus);
        });
    }
    async updateStatusIndex(collection, id, oldStatus, newStatus) {
        if (oldStatus && oldStatus !== newStatus) {
            await this.modifyIndex(collection, oldStatus, id, 'remove');
        }
        await this.modifyIndex(collection, newStatus, id, 'add');
    }
    async modifyIndex(collection, status, id, action) {
        await this.executeWithRetry(async () => {
            const indexPath = `database/indexes/${collection}/${status}.json`;
            const existing = await this.provider.getFile(indexPath);
            let list = existing ? existing.content : [];
            if (action === 'add' && !list.includes(id)) {
                list.push(id);
            }
            else if (action === 'remove') {
                list = list.filter((item) => item !== id);
            }
            const sha = existing ? existing.sha : undefined;
            await this.provider.saveFile(indexPath, list, `index update ${status}`, sha);
        });
    }
    async getIndexByStatus(collection, status) {
        const indexPath = `database/indexes/${collection}/${status}.json`;
        const res = await this.provider.getFile(indexPath);
        return res ? res.content : [];
    }
}
exports.InWorkStorageEngine = InWorkStorageEngine;
