import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [ user, setUser ] = useState(null);
  const [ session, setSession ] = useState(null);  
  
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
        setUser(session?.user || null);       
      }
    };

    getInitialSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user || null);      
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
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);