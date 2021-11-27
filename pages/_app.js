import "../styles/globals.css";
import "antd/dist/antd.css";
import Nav from "../components/Nav";

import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const [session, setSession] = useState(null);
  const [userId, setUserId] = useState(null);
  let setActive;

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
      <Nav userId={userId} activeTab={setActive}></Nav>
    </div>
  );
}

export default MyApp;
