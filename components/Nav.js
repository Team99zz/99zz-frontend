import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

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

  let active;
  switch (currentPath) {
    case "/feed":
      active = "feed";
      break;
    case "/post":
      active = "post";
      break;
    case "/account":
      active = "account";
      break;
    default:
      active = "none";
      break;
  }

  return (
    <div>
      {active !== "none" ? (
        <BottomNav>
          <BtnTab>
            {active === "feed" ? (
              <MdOutlineDescription
                size="30"
                color="#244FDF"
                onClick={() => router.push("/feed")}
              />
            ) : (
              <MdOutlineDescription
                size="30"
                onClick={() => router.push("/feed")}
              />
            )}
          </BtnTab>
          <BtnTab>
            {active === "post" ? (
              <MdOutlineDriveFileRenameOutline
                size="30"
                color="#244FDF"
                onClick={() => router.push("/post")}
              />
            ) : (
              <MdOutlineDriveFileRenameOutline
                size="30"
                onClick={() => router.push("/post")}
              />
            )}
          </BtnTab>
          <BtnTab>
            {active === "account" ? (
              <MdAccountCircle
                size="30"
                color="#244FDF"
                onClick={() => router.push("/account")}
              />
            ) : (
              <MdAccountCircle
                size="30"
                onClick={() => router.push("/account")}
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
