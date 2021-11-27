import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import styled from "styled-components";

import UserProfileCard from "../components/profile/UserProfileCard";

const AccountDiv = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
`;

export default function Account() {
  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   setSession(supabase.auth.session());

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);
  return (
    <AccountDiv>
      <UserProfileCard></UserProfileCard>
    </AccountDiv>
  );
}
