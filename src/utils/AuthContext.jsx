import { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { checkProfile } from "./Auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getInitialSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Error fetching session:", error);
      } else {
        setSession(session);
        if (session?.user) {
          const profile = await checkProfile(session.user);
          setUser({
            ...session.user,
            avatar_url: profile?.avatar_url || "",
            username: profile?.username || "",
            best_times: profile?.best_times || null,
          });
        } else {
          setUser(null);
        }
      }
    };

    getInitialSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session?.user) {
        checkProfile(session.user).then((profile) => {
          setUser({
            ...session.user,
            avatar_url: profile?.avatar_url || "",
            username: profile?.username || "",
            best_times: profile?.best_times || null,
          });
        });
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error);
    } else {
      setUser(null);
      setSession(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;