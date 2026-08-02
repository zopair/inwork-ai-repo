import { StorageProvider } from './providers/StorageProvider';
export declare class InWorkStorageEngine {
    private provider;
    constructor(provider: StorageProvider);
    private executeWithRetry;
    getRecord<T>(collection: string, id: string): Promise<T | null>;
    saveRecord<T extends {
        id: string;
        status?: string;
    }>(collection: string, record: T, newStatus: string): Promise<void>;
    private updateStatusIndex;
    private modifyIndex;
    getIndexByStatus(collection: string, status: string): Promise<string[]>;
}
