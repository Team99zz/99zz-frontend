import "../styles/globals.css";
import "antd/dist/antd.css";
import Nav from "../components/Nav";

import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

function MyApp({ Component, pageProps }) {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div>
      <Component session={session} {...pageProps} />
      <Nav></Nav>
    </div>
  );
}

export default MyApp;
