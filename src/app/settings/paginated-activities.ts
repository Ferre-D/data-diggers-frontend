import { Activity } from './activity';

export interface PaginatedActivities {
  activities: Activity[];
  totalPages: number;
  currentPage: number;
}
