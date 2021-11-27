import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import styled from "styled-components";

import UserProfileCard from "../../components/profile/UserProfileCard";
import UserNavCard from "../../components/profile/UserNavCard";
import Select from "react-select";

const AccountDiv = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
`;

const MyFeedDiv = styled.div`
  margin-top: 10px;
`;

const CustomSelect = styled(Select)`
  & .css-1s2u09g-control {
    border-radius: 14px;
    background-color: #244fdf;
    color: #fff;
    border: none;
  }
  & .css-qc6sy-singleValue {
    color: #fff;
  }
  &.css-1hb7zxy-IndicatorsContainer > div > svg > path {
      color: #fff;
  }
  &.css-6j8wv5-Input{
    color: #fff;
    ::placeholder{
        color: #fff;
    }
  }
`;
// import PostViewer from "../../components/PostViewer";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const User = ({ session }) => {
  const [loading, setLoading] = useState(true);
  const [id, setId] = useState(null);
  const [username, setUsername] = useState(null);
  const [title, setTitle] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from("user")
        .select(`username, title, avatar_url, id`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      console.log(data);

      if (data) {
        setUsername(data.username);
        setTitle(data.title);
        setAvatarUrl(data.avatar_url);
        setId(data.id);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  const router = useRouter();
  return (
    <AccountDiv>
      <UserProfileCard
        username={username}
        title={title}
        avatar_url={avatar_url}
      ></UserProfileCard>
      <UserNavCard></UserNavCard>
      <MyFeedDiv>
        <CustomSelect options={options} />
      </MyFeedDiv>
    </AccountDiv>
  );
};

export default User;
