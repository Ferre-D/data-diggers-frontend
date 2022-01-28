import { Activity } from '../settings/activity';
export interface User {
  id: number;
  email: string;
  lastName: string;
  firstName: string;
  password: string;
  userLevel: number;
  activities: Array<Activity>;
  token: string;
}
