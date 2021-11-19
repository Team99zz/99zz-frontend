import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
// Grommet should only be included once
import { grommet, Grommet } from "grommet";

import Auth from "../components/Auth";
import Account from "../components/Account";
// Theme for grommet
const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px',
    },
  },
};

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Grommet theme={theme}>
      <div className="container" style={{ padding: "50px 0 100px 0" }}>
        {!session ? (
          <Auth />
        ) : (
          <Account key={session.user.id} session={session} />
        )}
      </div>
    </Grommet>
  );
}
