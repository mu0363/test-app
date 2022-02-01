import { Session } from "@supabase/supabase-js";
import { customAlphabet } from "nanoid";
import { ChangeEvent, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { nanoidStrings } from "@/constant";
import { userState } from "@/stores";
import type { UpdateUserData, DatabaseUser } from "@/types";
import { supabase } from "@/utils/supabaseClient";

export const useAuth = () => {
  const [user, setUser] = useState<DatabaseUser | null>();
  const [session, setSession] = useState<Session | null>(null);
  const nanoid = customAlphabet(nanoidStrings, 20);

  // useEffect(() => {
  //   const getDatabaseUser = async () => {
  //     const session = await supabase.auth.session();
  //     setSession(session);
  //     if (session?.user?.id) {
  //       const { data: databaseUser } = await supabase
  //         .from("users")
  //         .select("*")
  //         .eq("id", session.user.id)
  //         .single();
  //       setUser(databaseUser);
  //     }
  //   };

  //   getDatabaseUser();

  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     async (_event, session) => {
  //       setSession(session);
  //       if (session?.user?.id) {
  //         const { data: databaseUser } = await supabase
  //           .from("users")
  //           .select("*")
  //           .eq("id", session?.user.id)
  //           .single();
  //         setUser(databaseUser);
  //       } else {
  //         setUser(null);
  //       }
  //     }
  //   );

  //   return () => {
  //     authListener?.unsubscribe();
  //   };
  // }, [session, setUser]);

  // const updateUsername = async (data: UpdateUserData) => {
  //   const { data: newUser } = await supabase
  //     .from("users")
  //     .update({ full_name: data.full_name, updated_at: new Date() })
  //     .match({ id: data.id })
  //     .single();
  //   setUser(newUser);
  // };

  // const updateAvatar = async (event: ChangeEvent<HTMLInputElement>) => {
  //   try {
  //     if (!event.target.files || event.target.files.length === 0) {
  //       throw new Error("You must select an image to upload.");
  //     }
  //     if (user) {
  //       const previousAvatarUrl = user?.avatar_url;
  //       const previousAvatarFileName = (previousAvatarUrl.match(
  //         ".+/(.+?)([?#;].*)?$"
  //       ) ?? "")[1];

  //       // storage に画像をアップロード
  //       const file = event.target.files[0];
  //       const fileExt = file.name.split(".").pop();
  //       const nanoFileName = nanoid();
  //       const fileName = `${nanoFileName}.${fileExt}`;

  //       await supabase.storage
  //         .from("avatars")
  //         .upload(`private/${fileName}`, file);

  //       const url = await supabase.storage
  //         .from("avatars")
  //         .getPublicUrl(`private/${fileName}`).publicURL;
  //       const { data: newUser } = await supabase
  //         .from("users")
  //         .update({ avatar_url: url, updated_at: new Date() })
  //         .match({ id: user?.id })
  //         .single();
  //       setUser(newUser);

  //       await supabase.storage
  //         .from("avatars")
  //         .remove([`private/${previousAvatarFileName}`]);
  //     }
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  return {
    session,
    user,
    // signIn: () => supabase.auth.signIn({ provider: "google" }),
    signOut: () => supabase.auth.signOut(),
    // updateUsername,
    // updateAvatar,
  };
};
