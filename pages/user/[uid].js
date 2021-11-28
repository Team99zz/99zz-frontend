import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabaseClient";
import styled from "styled-components";
import FeedCard from "../../components/feed/feedCard";
import "moment/locale/ko";
import moment from "moment";

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
  &.css-6j8wv5-Input {
    color: #fff;
    ::placeholder {
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
  const [feed, setFeed] = useState([]);
  const [username, setUsername] = useState(null);
  const [title, setTitle] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
    getFeed();
  }, [session]);

  async function getFeed() {
    console.log("gf");

    try {
      setLoading(true);
      const user = await supabase.auth.user();

      let { data: posting, error } = await supabase
        .from("posting")
        .select("id, user, title, subtitle, created_at, thumbnail")
        .order("created_at", { ascending: false });

      posting = await Promise.all(
        posting.map(async (p) => {
          let { data, error } = await supabase
            .from("user")
            .select("title, avatar_url")
            .eq("id", p.user)
            .single();

          return {
            ...p,
            ...{
              blog_title: data.title,
              avatar_url: data.avatar_url,
              time_ago: moment(p.created_at).fromNow(),
            },
          };
        })
      );

      if (error && status !== 406) {
        throw error;
      }
      if (posting) {
        setFeed(posting);
        console.log(posting);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function getProfile() {
    console.log("gp");

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
      {feed.map((posting, index) => (
        <FeedCard
          key={index}
          href={`/user/${posting.user}/${posting.id}`}
          title={posting.title}
          subtitle={posting.subtitle}
          thumbnail={posting.thumbnail}
          avatarUrl={posting.avatar_url}
          blogTitle={posting.blog_title}
        ></FeedCard>
      ))}
    </AccountDiv>
  );
};

export default User;
