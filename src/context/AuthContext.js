// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setCurrentUser(session?.user || null);
    });

    // Listen to auth changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user || null);
    });
    

    return () => listener?.subscription.unsubscribe();
  }, []);

  const signInWithEmail = (email, password) => {
    return supabase.auth.signInWithPassword({ email, password });
  };

  const registerWithEmail = (email, password, displayName) => {
    return supabase.auth.signUp({ 
      email, 
      password, 
      options: {
        data: {
          display_name: displayName,
        },
      },
    });
  };

  const signInWithOAuth = (provider) => {
    return supabase.auth.signInWithOAuth({
      provider, // 'google' atau 'facebook'
      options: {
        redirectTo: "http://localhost:3001/login", // atau bisa route khusus seperti /dashboard
      },
    });
  };
  

  const logOutUser = () => {
    return supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        signInWithEmail,
        signInWithOAuth,
        registerWithEmail,
        logOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => useContext(AuthContext);
