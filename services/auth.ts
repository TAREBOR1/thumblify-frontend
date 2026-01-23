// import api from "@/config/api";



// export interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// export interface authUser{
//   user:User
// }

// export interface authResponse{
//   success:boolean,
//   message:string,
//   user:User
// }

// // Input types 
// export interface RegisterInput {
//   name: string;
//   email: string;
//   password: string;
// }

// export interface LoginInput {
//   email: string;
//   password: string;
// }

// // API calls

// export const register = async (data: RegisterInput): Promise<authResponse> => {
//   const res = await api.post("/api/auth/signup", data);
//   return res.data;
// };

// export const login = async (data: LoginInput): Promise<authResponse> => {
//   const res = await api.post("/api/auth/login", data);
//   return res.data;
// };

// export const logout = async (): Promise<{ message: string }> => {
//   const res = await api.post("/api/auth/logout");
//   return res.data;
// };

// export const verify = async (): Promise<authUser|null> => {
//   const res = await api.get("/api/auth/verify");
//   return res.data;
// };




import api from "@/config/api";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface authUser {
  user: User;
}

export interface authResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
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

// Helper to save token
const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

// Helper to remove token

// const removeToken = () => {
//   localStorage.removeItem("token");
// };

// API calls

export const register = async (data: RegisterInput): Promise<authResponse> => {
  const res = await api.post("/api/auth/signup", data);
  const { token } = res.data;
  saveToken(token); // save JWT for future requests
  return res.data;
};

export const login = async (data: LoginInput): Promise<authResponse> => {
  const res = await api.post("/api/auth/login", data);
  const { token } = res.data;
  saveToken(token);
  return res.data;
};

export const verify = async (): Promise<authUser | null> => {
  try {
    const res = await api.get("/api/auth/verify");
    return res.data;
  } catch {
    return null;
  }
};

export const logout = async (): Promise<void> => {
  localStorage.removeItem("token");
};

