// OrderStatusTimeline Widget Contract
export type TimelineStepStatus = 'completed' | 'current' | 'upcoming';

export interface TimelineStep {
  title: string;
  status: TimelineStepStatus;
}

export class OrderTimelineMapper {
  static getStepsForStatus(currentStatus: string): TimelineStep[] {
    const statuses = ['Created', 'Assigned', 'Accepted', 'Started', 'Completed', 'Rated'];
    const currentIndex = statuses.indexOf(currentStatus);

    return statuses.map((step, index) => {
      let status: TimelineStepStatus = 'upcoming';
      if (index < currentIndex) {
        status = 'completed';
      } else if (index === currentIndex) {
        status = 'current';
      }
      return { title: step, status };
    });
  }
}
