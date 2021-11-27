import "../styles/globals.css";
import "antd/dist/antd.css";
import Nav from "../components/Nav";

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    setSession(supabase.auth.session());
    const user = supabase.auth.user();
    setUserId(user.id);
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <Component session={session} {...pageProps} />
      <Nav userId={userId}></Nav>
    </div>
  );
}

export default MyApp;
