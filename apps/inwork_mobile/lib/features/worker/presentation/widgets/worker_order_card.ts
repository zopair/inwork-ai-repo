export interface WorkerOrderCardConfig {
  orderId: string;
  serviceName: string;
  addressText: string;
  rewardAmount?: number;
}

export class WorkerOrderCardFormatter {
  static formatSummary(config: WorkerOrderCardConfig): string {
    return `Order [${config.orderId}]: ${config.serviceName} at ${config.addressText}`;
  }
}
