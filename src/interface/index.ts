import type { Dispatch, SetStateAction } from "react";
import type { IconName } from "../components/Icons/icon";

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  user_name: string;
  email: string;
  image?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LogInData {
  email: string;
  password: string;
}

export interface RegisterData extends LogInData {
  first_name: string;
  last_name: string;
  user_name: string;
  password_confirmation: string;
  profile_image?: File;
}

export interface CardProps {
  id: number;
  image_url?: string;
  price?: string;
  name?: string;
  setItemDelet?: Dispatch<SetStateAction<number>>;
}

export interface Products extends CardProps {
  created_at?: string;
  updated_at?: string;
  price?: string;
}

export interface Product {
  id?: number;
  image: Blob | null;
  price?: string;
  name?: string;
  image_url?: string;
  setData?: (Product: Product) => void;
}

export interface Items {
  content : string
  link : string
  icon: IconName
}

export interface Props<T> {
  data: T;
  setData: Dispatch<SetStateAction<T>>;
  onsubmitHandler?: (data: T) => Promise<void>; 
  isLoading?: boolean; 
  title: string;
  description: string;
  inputs: {
    label: string;
    placeholder: string;
    type: string;
    name: string;
    required: boolean;
  }[];
  btn: string;
  footer: {
    description: string;
    link: {
      content: string;
      url: string;
    };
  };
}