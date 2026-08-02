import { describe, it, expect } from 'vitest';
import { GrowthManager } from '../src/growth/feedback_manager';

describe('Gate 11.3: Growth & Feedback Framework Validation', () => {
  it('should capture customer feedback and calculate average ratings accurately', () => {
    const growth = new GrowthManager();

    growth.submitFeedback({
      orderId: 'ord-101',
      customerId: 'cust-1',
      workerId: 'wrk-1',
      rating: 5,
      comment: 'Excellent craftsmanship and fast service!',
      category: 'QUALITY'
    });

    growth.submitFeedback({
      orderId: 'ord-102',
      customerId: 'cust-2',
      workerId: 'wrk-1',
      rating: 4,
      comment: 'Very good, minor delay.',
      category: 'SPEED'
    });

    const feedbacks = growth.getFeedbacks();
    expect(feedbacks.length).toBe(2);
    expect(growth.getAverageRating()).toBe(4.5);
  });

  it('should manage referral codes and track activation metrics', () => {
    const growth = new GrowthManager();

    growth.createReferralCode('cust-1', 'INWORK2026');

    const success = growth.applyReferral('INWORK2026');
    expect(success).toBe(true);

    const invalid = growth.applyReferral('INVALID_CODE');
    expect(invalid).toBe(false);
  });
});
