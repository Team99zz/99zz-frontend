import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import {
  MdAccountCircle,
  MdOutlineDescription,
  MdOutlineDriveFileRenameOutline
} from "react-icons/md"

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
  const [activeTabs, setActiveTabs] = useState(props.name);

  return (
    <BottomNav>
      <BtnTab>
        {activeTabs === "feed" ? (
          <MdOutlineDescription
            size="30"
            color="#244FDF"
            onClick={() => setActiveTabs("feed")}
          />
        ) : (
          <MdOutlineDescription size="30" onClick={() => setActiveTabs("feed")} />
        )}
      </BtnTab>
      <BtnTab>
        {activeTabs === "search" ? (
          <MdOutlineDriveFileRenameOutline size="30" color="#244FDF" onClick={() => setActiveTabs("search")} />
        ) : (
          <MdOutlineDriveFileRenameOutline
            size="30"
            onClick={() => setActiveTabs("search")}
          />
        )}
      </BtnTab>
      <BtnTab>
        {activeTabs === "account" ? (
          <MdAccountCircle
            size="30"
            color="#244FDF"
            onClick={() => setActiveTabs("account")}
          />
        ) : (
            <MdAccountCircle size="30" onClick={() => setActiveTabs("account")} />
        )}
      </BtnTab>
    </BottomNav>
  );
};

export default Nav;
