import { StorageProvider } from './StorageProvider';
export declare class InMemoryStorageProvider implements StorageProvider {
    private storage;
    private versionCounter;
    getFile(path: string): Promise<{
        content: unknown;
        sha: string;
    } | null>;
    saveFile(path: string, contentData: unknown, message: string, sha?: string): Promise<{
        commit: {
            sha: string;
        };
    }>;
    deleteFile(path: string, message: string, sha: string): Promise<{
        commit: {
            sha: string;
        };
    }>;
}
