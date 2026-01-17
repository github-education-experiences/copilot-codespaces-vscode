import { ObjectId } from 'mongodb';

export interface ProposalResponse {
  _id?: ObjectId;
  name: string;
  response: 'YES' | 'NO';
  message?: string;
  timestamp: Date;
  userAgent?: string;
  ipAddress?: string;
}

export interface VisitLog {
  _id?: ObjectId;
  timestamp: Date;
  page: string;
  userAgent?: string;
  ipAddress?: string;
}

export interface AdminCredentials {
  username: string;
  password: string;
}
