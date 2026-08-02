export interface AppButtonConfig {
  label: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'primary' | 'secondary' | 'danger';
}

export class AppButton {
  constructor(public readonly config: AppButtonConfig) {}

  isClickable(): boolean {
    return !this.config.disabled && !this.config.loading;
  }

  getLabel(): string {
    return this.config.label;
  }

  static getStyles(variant: string = 'primary') {
    return {
      borderRadius: '8px',
      padding: '12px 24px',
      fontWeight: '600',
      backgroundColor: variant === 'primary' ? '#0F172A' : '#E2E8F0',
      color: variant === 'primary' ? '#FFFFFF' : '#0F172A'
    };
  }
}
