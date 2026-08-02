"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryStorageProvider = void 0;
class InMemoryStorageProvider {
    storage = new Map();
    versionCounter = 0;
    async getFile(path) {
        await new Promise((resolve) => setTimeout(resolve, 15));
        return this.storage.get(path) || null;
    }
    async saveFile(path, contentData, message, sha) {
        await new Promise((resolve) => setTimeout(resolve, 15));
        const existing = this.storage.get(path);
        if (existing && existing.sha !== sha && sha !== undefined) {
            throw new Error("Storage Conflict (409): Concurrent write detected");
        }
        const newSha = `sha-${++this.versionCounter}`;
        this.storage.set(path, { content: contentData, sha: newSha });
        return { commit: { sha: newSha } };
    }
    async deleteFile(path, message, sha) {
        this.storage.delete(path);
        return { commit: { sha: 'deleted' } };
    }
}
exports.InMemoryStorageProvider = InMemoryStorageProvider;
