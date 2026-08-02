import { StorageProvider } from './StorageProvider';
export interface GitHubConfig {
    owner: string;
    repo: string;
    branch: string;
    token: string;
}
export declare class GitHubStorageProvider implements StorageProvider {
    private config;
    constructor(config: GitHubConfig);
    private getApiUrl;
    private getHeaders;
    getFile(path: string): Promise<{
        content: unknown;
        sha: string;
    } | null>;
    saveFile(path: string, contentData: unknown, message: string, sha?: string): Promise<any>;
    deleteFile(path: string, message: string, sha: string): Promise<any>;
}
