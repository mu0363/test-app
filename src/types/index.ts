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
  session: Session | null;
  user: DatabaseUser | null;
  // signIn: () => Promise<DatabaseUser>;
  // signOut: () => void;
  updateUsername: (updateUserData: UpdateUserData) => void;
  updateAvatar: (event: ChangeEvent<HTMLInputElement>) => void;
};
