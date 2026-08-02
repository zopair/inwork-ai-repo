import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Gate 10.1: Container & Deployment Foundation Validation', () => {
  it('should verify Dockerfile existence and content configuration', () => {
    const dockerfilePath = path.resolve(process.cwd(), 'apps/api-server/Dockerfile');
    expect(fs.existsSync(dockerfilePath)).toBe(true);

    const content = fs.readFileSync(dockerfilePath, 'utf-8');
    expect(content).toContain('FROM node:20-alpine');
    expect(content).toContain('EXPOSE 3000');
    expect(content).toContain('MVP-PRODUCTION');
  });

  it('should verify docker-compose.yml existence and stack configuration', () => {
    const composePath = path.resolve(process.cwd(), 'docker-compose.yml');
    expect(fs.existsSync(composePath)).toBe(true);

    const content = fs.readFileSync(composePath, 'utf-8');
    expect(content).toContain('inwork-api:');
    expect(content).toContain('ports:');
    expect(content).toContain('healthcheck:');
  });
});
