export type EnvironmentMode = 'DEVELOPMENT' | 'TEST' | 'MVP-PRODUCTION';

export interface RuntimeConfig {
  env: EnvironmentMode;
  port: number;
  apiPrefix: string;
  isProduction: boolean;
}

export class ConfigManager {
  public static load(): RuntimeConfig {
    const env = (process.env.NODE_ENV || 'TEST') as EnvironmentMode;
    return {
      env,
      port: Number(process.env.PORT) || 3000,
      apiPrefix: '/api/v1',
      isProduction: env === 'MVP-PRODUCTION'
    };
  }
}
