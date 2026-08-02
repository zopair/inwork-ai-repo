export type OrderTimelineStatus = 
  | 'Created' 
  | 'Assigned' 
  | 'Accepted' 
  | 'Started' 
  | 'Completed' 
  | 'Rated';

export interface TimelineStep {
  title: OrderTimelineStatus;
  status: 'completed' | 'current' | 'upcoming';
}

export class OrderTimelineMapper {
  static getStepsForStatus(currentStatus: string): TimelineStep[] {
    const flow: OrderTimelineStatus[] = [
      'Created',
      'Assigned',
      'Accepted',
      'Started',
      'Completed',
      'Rated'
    ];
    
    const currentIndex = flow.indexOf(currentStatus as OrderTimelineStatus);
    const validIndex = currentIndex === -1 ? 0 : currentIndex;

    return flow.map((item, i) => {
      let status: 'completed' | 'current' | 'upcoming' = 'upcoming';
      if (i < validIndex) {
        status = 'completed';
      } else if (i === validIndex) {
        status = 'current';
      }
      return { title: item, status };
    });
  }
}
