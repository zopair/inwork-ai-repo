import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Gate 7.3: OpenAPI Contract Layer Validation', () => {
  it('should verify openapi.yaml exists and contains proper version and paths', () => {
    const yamlPath = path.join(import.meta.dirname, 'openapi.yaml');
    expect(fs.existsSync(yamlPath)).toBe(true);

    const content = fs.readFileSync(yamlPath, 'utf-8');
    expect(content).toContain('v0.1.0-mvp');
    expect(content).toContain('/orders');
    expect(content).toContain('BearerAuth');
  });

  it('should verify ResponseEnvelope and ErrorDTO schemas exist', () => {
    const envPath = path.join(import.meta.dirname, 'schemas/ResponseEnvelope.yaml');
    const errPath = path.join(import.meta.dirname, 'schemas/ErrorDTO.yaml');

    expect(fs.existsSync(envPath)).toBe(true);
    expect(fs.existsSync(errPath)).toBe(true);
  });
});
