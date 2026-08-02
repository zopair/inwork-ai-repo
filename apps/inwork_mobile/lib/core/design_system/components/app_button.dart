// AppButton Design System Component (TypeScript Simulation / Flutter Contract)
export interface AppButtonProps {
  label: string;
  onPressed: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
}

export class AppButtonConfig {
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
