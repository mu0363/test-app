import { Session, User } from "@supabase/supabase-js";
import { customAlphabet } from "nanoid";
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

const nanoid = customAlphabet(nanoidStrings, 20);

type Props = {
  children: ReactNode;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserContextProvider = (props: Props) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<DatabaseUser | null>(null);

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
  }, [session]);

  const updateUsername = async (data: UpdateUserData) => {
    const { data: newUser } = await supabase
      .from("users")
      .update({ full_name: data.full_name })
      .match({ id: data.id })
      .single();
    setUser(newUser);
  };

  const updateAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
    try {
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }
      // storage に画像をアップロード
      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const nanoFileName = nanoid();
      const fileNme = `${nanoFileName}.${fileExt}`;

      const { error } = await supabase.storage
        .from("avatars")
        .upload(fileNme, file);
      if (error) {
        throw Error("error");
      }
      const url = await supabase.storage.from("avatars").getPublicUrl(fileNme)
        .publicURL;
      const { data: newUser } = await supabase
        .from("users")
        .update({ avatar_url: url, updated_at: new Date() })
        .match({ id: user?.id })
        .single();
      setUser(newUser);
    } catch (error) {
      alert(error);
    }
  };

  const value = {
    session,
    user,
    // signIn: () => supabase.auth.signIn({ provider: "google" }),
    // signOut: () => supabase.auth.signOut(),
    updateUsername,
    updateAvatar,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

// export const useUser = () => {
//   const context = useContext(UserContext);
//   if (context === undefined) {
//     throw new Error(`useUser must be used within a UserContextProvider.`);
//   }
//   return context;
// };
