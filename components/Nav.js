import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { supabase } from "../utils/supabaseClient";

import {
  MdAccountCircle,
  MdOutlineDescription,
  MdOutlineDriveFileRenameOutline,
} from "react-icons/md";

const BottomNav = styled.div`
  width: 100%;
  height: 50px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid var(--grey-color);
  z-index: 3;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BtnTab = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Nav = (props) => {
  const router = useRouter();
  const currentPath = router.pathname;

  const [active, setActive] = useState("none");

  useEffect(() => {

    redirect(currentPath)
  }, []);

  async function redirect(path) {
    if (path === "/feed") {
      router.push("/feed");
      setActive("/feed");
    } else if (path === "/newpost") {
      router.push("/newpost");
      setActive("/newpost");
    } else if (path === "/user") {
      router.push(`/user/${props.userId}`);
      setActive("/user");
    }
  }

  return (
    <div>
      {active !== "none" ? (
        <BottomNav>
          <BtnTab>
            {active === "/feed" ? (
              <MdOutlineDescription
                size="30"
                color="#244FDF"
                onClick={() => redirect("/feed")}
              />
            ) : (
              <MdOutlineDescription
                size="30"
                onClick={() => redirect("/feed")}
              />
            )}
          </BtnTab>
          <BtnTab>
            {active === "/newpost" ? (
              <MdOutlineDriveFileRenameOutline
                size="30"
                color="#244FDF"
                onClick={() => redirect("/newpost")}
              />
            ) : (
              <MdOutlineDriveFileRenameOutline
                size="30"
                onClick={() => redirect("/newpost")}
              />
            )}
          </BtnTab>
          <BtnTab>
            {active === "/user" ? (
              <MdAccountCircle
                size="30"
                color="#244FDF"
                onClick={() => redirect("/user")}
              />
            ) : (
              <MdAccountCircle
                size="30"
                onClick={() => router.push(`/user`)}
              />
            )}
          </BtnTab>
        </BottomNav>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Nav;
