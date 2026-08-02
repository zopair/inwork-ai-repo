export interface FeedbackItem {
  feedbackId: string;
  orderId: string;
  customerId: string;
  workerId: string;
  rating: number; // 1 to 5
  comment?: string;
  category: 'QUALITY' | 'SPEED' | 'COMMUNICATION' | 'GENERAL';
  createdAt: string;
}

export interface ReferralCode {
  code: string;
  ownerUserId: string;
  usesCount: number;
}

export class GrowthManager {
  private feedbacks: FeedbackItem[] = [];
  private referralCodes: Map<string, ReferralCode> = new Map();

  public submitFeedback(item: Omit<FeedbackItem, 'feedbackId' | 'createdAt'>): FeedbackItem {
    if (item.rating < 1 || item.rating > 5) {
      throw new Error('INVALID_RATING_RANGE');
    }

    const feedback: FeedbackItem = {
      ...item,
      feedbackId: `fb-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString()
    };

    this.feedbacks.push(feedback);
    return feedback;
  }

  public createReferralCode(userId: string, code: string): ReferralCode {
    const ref: ReferralCode = { code, ownerUserId: userId, usesCount: 0 };
    this.referralCodes.set(code, ref);
    return ref;
  }

  public applyReferral(code: string): boolean {
    const ref = this.referralCodes.get(code);
    if (!ref) return false;
    ref.usesCount += 1;
    return true;
  }

  public getFeedbacks(): FeedbackItem[] {
    return this.feedbacks;
  }

  public getAverageRating(): number {
    if (this.feedbacks.length === 0) return 0;
    const sum = this.feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
    return Number((sum / this.feedbacks.length).toFixed(2));
  }
}
