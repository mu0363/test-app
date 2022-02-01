import type { NextPage } from "next";
import { MouseEvent, useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { useAuth } from "../hooks/auth";

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user, signOut, signIn } = useAuth();
  const handleSignIn = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    signIn();
  };

  return (
    <div className="text-center selection:text-yellow-500 selection:bg-yellow-300">
      <div className="p-10 my-10 bg-white rounded-md">
        <h1 className="text-2xl font-bold underline decoration-yellow-500">
          Supabase + Next.js
        </h1>
        <p className="font-bold">{user?.full_name}</p>
      </div>
      <button
        className="py-4 px-6 mx-auto mr-5 mb-10 text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full hover:shadow-lg hover:shadow-blue-500/50 transition hover:scale-105"
        onClick={handleSignIn}
        disabled={isLoading}
      >
        <span>{isLoading ? "Loading" : "Sign in with Google"}</span>
      </button>

      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};

export default Home;
