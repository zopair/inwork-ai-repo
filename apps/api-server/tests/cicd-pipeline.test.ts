import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Gate 10.2: CI/CD Pipeline Automation Validation', () => {
  it('should verify GitHub Actions workflow file existence and triggers', () => {
    const workflowPath = path.resolve(process.cwd(), '.github/workflows/ci-pipeline.yml');
    expect(fs.existsSync(workflowPath)).toBe(true);

    const content = fs.readFileSync(workflowPath, 'utf-8');
    expect(content).toContain('name: InWork CI/CD Pipeline');
    expect(content).toContain('push:');
    expect(content).toContain('pull_request:');
  });

  it('should verify CI/CD pipeline contains test execution and Docker build steps', () => {
    const workflowPath = path.resolve(process.cwd(), '.github/workflows/ci-pipeline.yml');
    const content = fs.readFileSync(workflowPath, 'utf-8');

    expect(content).toContain('npm install');
    expect(content).toContain('npx vitest run');
    expect(content).toContain('docker/build-push-action');
  });
});
