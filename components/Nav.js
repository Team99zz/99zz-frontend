import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { FileTextOutlined, FileTextFilled, EditOutlined, EditFilled } from "@ant-design/icons";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { RiUser5Line, RiUser5Fill } from "react-icons/ri";

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
  const [activeTabs, setActiveTabs] = useState(props.name);
  useEffect(() => {
    switch (activeTabs) {
      case "home":
        router.push("/");
        break;
      case "search":
        router.push("/search");
        break;
      case "saved":
        router.push("/saved");
        break;
      case "account":
        router.push("/account");
        break;
      default:
        router.push("/");
        break;
    }
  }, [activeTabs, router]);

  return (
    <BottomNav>
      <BtnTab>
        {activeTabs === "home" ? (
          <FileTextOutlined onClick={() => setActiveTabs("home")} />
        ) : (
          <FileTextFilled onClick={() => setActiveTabs("home")} />
        )}
      </BtnTab>
      <BtnTab>
        {activeTabs === "search" ? (
          <EditOutlined onClick={() => setActiveTabs("search")} />
        ) : (
          <EditFilled onClick={() => setActiveTabs("search")} />
        )}
      </BtnTab>
      <BtnTab>
        {activeTabs === "saved" ? (
          <AiFillHeart
            size="35"
            color="#000"
            onClick={() => setActiveTabs("saved")}
          />
        ) : (
          <AiOutlineHeart
            size="35"
            color="#000"
            onClick={() => setActiveTabs("saved")}
          />
        )}
      </BtnTab>
      <BtnTab>
        {activeTabs === "account" ? (
          <RiUser5Fill
            size="35"
            color="#000"
            onClick={() => setActiveTabs("account")}
          />
        ) : (
          <RiUser5Line
            size="35"
            color="#000"
            onClick={() => setActiveTabs("account")}
          />
        )}
      </BtnTab>
    </BottomNav>
  );
};

export default Nav;
