export interface GoogleCredentialResponse {
  credential?: string;
}

export interface UserRegisterRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
