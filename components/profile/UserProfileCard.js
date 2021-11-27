import styled from "styled-components";
import { Avatar } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { MdSettings } from "react-icons/md";

const UserProfileCardDiv = styled.div`
  width: 100%;
  border-radius: 12px;
  background-color: #fff;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function UserProfileCard() {
  return (
    <UserProfileCardDiv>
      
          <Avatar icon={<UserOutlined />} />
          <p></p>
          <MdSettings style={{alignItems: "flex-end"}}></MdSettings>
    </UserProfileCardDiv>
  );
}
