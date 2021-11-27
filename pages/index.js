import Head from "next/head";
import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";

import Auth from "../components/Auth";
import Setup from "../components/Setup";

export default function Home(props) {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0" />
      </Head>

      <div>
        {!props.session ? (
          <Auth />
        ) : (
            // Needs to be changed to main screen
          <Setup key={props.session.user.id} session={props.session} />
        )}
      </div>
    </div>
  );
}
