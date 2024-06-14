export interface AuthCredentials {
  email: string;
  password: string;
}

export interface UserData {
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

export type Todo = {
  id: number;
  task: string;
  details: string;
  isCompleted: boolean;
};


