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
  padding: 15px 0;
`;

const Title = styled.p`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 0px;
`;

const Username = styled.p`
  font-size: 14px;
  font-weight: 500;
`;

const SettingsDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SettingsP = styled.p`
    font-size: 12px;
  margin-bottom: 0px;
`;

export default function UserProfileCard(props) {
  return (
    <UserProfileCardDiv>
      {props.avatar_url === null ? (
        <Avatar size={70} icon={<UserOutlined />} />
      ) : (
        <Avatar size={70} src={props.avatarUrl} />
      )}
      <Title>{props.title}</Title>
      <Username>{props.username}</Username>
      <SettingsDiv>
        <MdSettings></MdSettings>
        <SettingsP>설정</SettingsP>
      </SettingsDiv>
    </UserProfileCardDiv>
  );
}
