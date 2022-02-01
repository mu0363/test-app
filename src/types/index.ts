import { Session, Provider, User } from "@supabase/supabase-js";
import { ChangeEvent } from "react";

export type DatabaseUser = {
  avatar_url: string;
  created_at: string;
  email: string;
  full_name: string;
  id: string;
  updated_at: Date;
};

export type UpdateUserData = {
  id: string;
  full_name?: string;
  avatar_url?: string;
};

export type UserContextType = {
  session: Session;
  user: DatabaseUser;
  signIn: () => Promise<{
    session: Session | null;
    user: User | null;
    provider?: Provider;
    url?: string | null;
    error: Error | null;
    data: Session | null;
  }>;
  signOut: () => void;
  updateUsername: (updateUserData: UpdateUserData) => void;
  updateAvatar: (event: ChangeEvent<HTMLInputElement>) => void;
};
