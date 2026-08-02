"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GitHubStorageProvider = void 0;
class GitHubStorageProvider {
    config;
    constructor(config) {
        this.config = config;
    }
    getApiUrl(path) {
        return `https://api.github.com/repos/${this.config.owner}/${this.config.repo}/contents/${path}`;
    }
    getHeaders() {
        return {
            'Authorization': `Bearer ${this.config.token}`,
            'Accept': 'application/vnd.github+json',
            'Content-Type': 'application/json',
            'User-Agent': 'InWork-AI-Storage-Engine'
        };
    }
    async getFile(path) {
        // سيتم ربطها بـ Fetch API الفعلية أو العميل المعتمد
        try {
            const response = await fetch(`${this.getApiUrl(path)}?ref=${this.config.branch}`, {
                method: 'GET',
                headers: this.getHeaders()
            });
            if (response.status === 404)
                return null;
            if (!response.ok)
                throw new Error(`GitHub API Error: ${response.statusText}`);
            const data = await response.json();
            const decodedContent = JSON.parse(Buffer.from(data.content, 'base64').toString('utf8'));
            return {
                content: decodedContent,
                sha: data.sha
            };
        }
        catch (error) {
            if (error.message && error.message.includes('404'))
                return null;
            throw error;
        }
    }
    async saveFile(path, contentData, message, sha) {
        const encodedContent = Buffer.from(JSON.stringify(contentData, null, 2)).toString('base64');
        const body = {
            message,
            content: encodedContent,
            branch: this.config.branch
        };
        if (sha) {
            body.sha = sha;
        }
        const response = await fetch(this.getApiUrl(path), {
            method: 'PUT',
            headers: this.getHeaders(),
            body: JSON.stringify(body)
        });
        if (response.status === 409) {
            throw new Error("Storage Conflict (409): Concurrent write detected on GitHub");
        }
        if (!response.ok) {
            const errText = await response.text();
            throw new Error(`GitHub API Save Error (${response.status}): ${errText}`);
        }
        return await response.json();
    }
    async deleteFile(path, message, sha) {
        const body = {
            message,
            sha,
            branch: this.config.branch
        };
        const response = await fetch(this.getApiUrl(path), {
            method: 'DELETE',
            headers: this.getHeaders(),
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`GitHub API Delete Error: ${response.statusText}`);
        }
        return await response.json();
    }
}
exports.GitHubStorageProvider = GitHubStorageProvider;
