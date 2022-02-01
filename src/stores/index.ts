import { atom } from "recoil";
import { DatabaseUser } from "@/types";

export const userState = atom<DatabaseUser | null>({
  key: "atom_user",
  default: null, // ここの初期値をnullから変更
});
