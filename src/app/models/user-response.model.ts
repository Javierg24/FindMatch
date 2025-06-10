// src/app/models/user-response.model.ts

export interface UserResponse {
  success: boolean;
  message?: string;
  user?: {
    handle: string;
    name: string;
    surname: string;
    primary_position: string;
    secondary_position: string;
    birthday: string;
    goals: number;
    assists: number;
    user_type: string;
    email: string;
    userId: number;
  };
}
