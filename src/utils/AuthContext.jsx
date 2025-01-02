import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import { checkProfile } from "./Auth";

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
        if (session?.user) {
          // Obtener el perfil cuando ya haya sesión
          const profile = await checkProfile(session.user);
          if (profile) {
            setUser({
              ...session.user, // Mantenemos los datos del usuario
              avatar_url: profile.avatar_url || '',
              username: profile.username || ''
            });
          }
        }
      }
    };
  
    getInitialSession();
  
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user || null);
      if (session?.user) {
        // Obtener el perfil después de un cambio en la sesión
        checkProfile(session.user).then((profile) => {
          if (profile) {
            setUser({
              ...session.user,
              avatar_url: profile.avatar_url || '',
              username: profile.username || ''
            });
          }
        });
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
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);