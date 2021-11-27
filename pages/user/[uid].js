import { useRouter } from "next/router";
import styled from "styled-components";

import UserProfileCard from "../../components/profile/UserProfileCard";

const AccountDiv = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
`;

// import PostViewer from "../../components/PostViewer";

const User = () => {
  const router = useRouter();
  // console.log(router)
  return (
    <AccountDiv>
      <UserProfileCard></UserProfileCard>
    </AccountDiv>
  );
};

export default User;
