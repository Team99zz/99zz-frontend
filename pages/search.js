import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

import Nav from "../components/Nav";

export default function Search() {
  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   setSession(supabase.auth.session());

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);
  return <div><Nav name="search"></Nav></div>;
}
