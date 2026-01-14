import api from "@/config/api";



export interface User {
  id: string;
  name: string;
  email: string;
}

export interface authUser{
  user:User
}

export interface authResponse{
  success:boolean,
  message:string,
  user:User
}

// Input types
export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

// API calls

export const register = async (data: RegisterInput): Promise<authResponse> => {
  const res = await api.post("/api/auth/signup", data);
  return res.data;
};

export const login = async (data: LoginInput): Promise<authUser> => {
  const res = await api.post("/api/auth/login", data);
  return res.data;
};

export const logout = async (): Promise<{ message: string }> => {
  const res = await api.post("/api/auth/logout");
  return res.data;
};

export const verify = async (): Promise<authUser|null> => {
  const res = await api.get("/api/auth/verify");
  return res.data;
};
