import { atom, useRecoilState } from "recoil";
import { Session, User } from "@supabase/supabase-js";
// import { customAlphabet } from "nanoid";
import {
  ChangeEvent,
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { nanoidStrings } from "@/constant";
import type { DatabaseUser, UpdateUserData, UserContextType } from "@/types";
import { supabase } from "@/utils/supabaseClient";

const userState = atom<DatabaseUser | null>({
  key: "user",
  default: null,
});

export const useAuth = () => {
  const [user, setUser] = useRecoilState<DatabaseUser | null>(userState);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const getDatabaseUser = async () => {
      const session = await supabase.auth.session();
      setSession(session);
      if (session?.user?.id) {
        const { data: databaseUser } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setUser(databaseUser);
      }
    };

    getDatabaseUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setSession(session);
        if (session?.user?.id) {
          const { data: databaseUser } = await supabase
            .from("users")
            .select("*")
            .eq("id", session?.user.id)
            .single();
          setUser(databaseUser);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [session, setUser]);

  return { user };
};
