import { ReactNode } from "react";

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  email: string;
  password: string;
  confirm_password: string;
  first_name: string;
  last_name: string;
}

export interface StudyPreferenceData {
  chronotype: string;
  concentration: string;
  studying_style: string;
  procrastination: boolean;
  physical_activity: string;
}

export interface DecodedTokenData {
  user_id: number;
  exp: number;
  iat: number;
}
export interface Todo {
  id: number;
  title: string;
  details: string;
  deadlines;
  complexity: string;
  complete: boolean;
  user: number;
}

export interface Video {
  id: string;
  title: string;
  url: string;
}

export interface MoodRecord {
  id: number;
  user: number;
  timestamp: string;
  mood: string;
  context: string;
}

export interface MoodHistoryProps {
  date: string;
  newRecordAdded: boolean;
  points: number;
}

export interface Point {
  total_points: number;
}

export interface PointHistory {
  timestamp: string | number | Date;
  points: number;
  action: string;
}

export interface RelayControlProps {
  relayID: number;
  isActivated: boolean;
  onActivate: (relayID: number, duration: number) => void;
}

export interface ModalProps {
  title: string;
  content: ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
}

export interface RelayStatus {
  relayID: number;
  isActivated: boolean;
  duration: number;
}

export interface MoodCategory {
  category: string;
  count: number;
  percentage: number;
  color: string;
}

export interface SessionData{
  task:number
  stress_level: string;
  noise_level: string;
  studyMethod: string;
  environment:string;
  session_date:string;
}
