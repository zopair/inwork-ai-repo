// In Work AI Platform - Pure GitHub API Database
// نستخدم GitHub API كقاعدة بيانات حية (Git-as-a-Database)

const GITHUB_TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
const OWNER = "zopair";
const REPO = "inwork-ai-repo";

export const GithubDB = {
  // 1. قراءة البيانات من ملف JSON داخل المستودع
  async readTable(tableName: string) {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/database/${tableName}.json`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        },
        cache: 'no-store'
      });
      
      if (!response.ok) {
        if (response.status === 404) return []; // الجدول غير موجود بعد
        throw new Error(`GitHub API Error: ${response.statusText}`);
      }

      const data = await response.json();
      // فك تشفير المحتوى من Base64
      const decodedContent = decodeURIComponent(escape(atob(data.content)));
      return { 
        sha: data.sha, 
        records: JSON.parse(decodedContent) 
      };
    } catch (error) {
      console.error(`Error reading ${tableName}:`, error);
      return { sha: null, records: [] };
    }
  },

  // 2. كتابة/تحديث البيانات في ملف JSON (عمل Commit جديد)
  async writeTable(tableName: string, records: any[], sha: string | null) {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/database/${tableName}.json`;
    
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(records, null, 2))));
    
    const body: any = {
      message: `db: auto-update ${tableName} table`,
      content: content,
      branch: 'main'
    };
    
    if (sha) {
      body.sha = sha;
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`GitHub API Write Error: ${response.statusText}`);
    }

    return await response.json();
  }
};
