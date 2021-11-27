import styled from "styled-components";
import { useRouter } from "next/router";
import { useState } from "react";

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
  const [activeTab, setActiveTab] = useState(props.activeTab);

  async function handleClick(tab) {
    console.log("tab: ", tab);
    await setActiveTab(tab);
    console.log("activeTab:", activeTab);
    await router.push(`/${tab}`);
  }

  return (
    <div>
      {activeTab !== "none" ? (
        <BottomNav>
          <BtnTab>
            {activeTab === "feed" ? (
              <MdOutlineDescription
                size="30"
                color="#244FDF"
                onClick={() => handleClick("feed")}
              />
            ) : (
              <MdOutlineDescription
                size="30"
                onClick={() => handleClick("feed")}
              />
            )}
          </BtnTab>
          <BtnTab>
            {activeTab === "newpost" ? (
              <MdOutlineDriveFileRenameOutline
                size="30"
                color="#244FDF"
                onClick={() => handleClick("newpost")}
              />
            ) : (
              <MdOutlineDriveFileRenameOutline
                size="30"
                onClick={() => handleClick("newpost")}
              />
            )}
          </BtnTab>
          <BtnTab>
            {activeTab === `user/${props.userId}` ? (
              <MdAccountCircle
                size="30"
                color="#244FDF"
                onClick={() => handleClick(`user/${props.userId}`)}
              />
            ) : (
              <MdAccountCircle
                size="30"
                onClick={() => handleClick(`user/${props.userId}`)}
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
