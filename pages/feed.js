import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

import Nav from "../components/Nav";

export default function Feed() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async () =>
      checkUser()
    );
    checkUser();
    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  async function checkUser() {
    const user = supabase.auth.user();
    setUser(user);
  }

  return (
    <div>
      {!user ? (
        <Nav></Nav>
      ) : (
        <Nav></Nav>
      )}
      <div></div>
    </div>
  );
}
