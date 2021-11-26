import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import styled from "styled-components";
import CustomAvatar from "./Avatar";

import { Button } from "antd";
import { Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const BlogH1 = styled.h1`
  font-size: 24px;
  font-weight: 700;
`;
const AccountDiv = styled.div`
  background-color: #f5f5f5;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0px;
`;

const EmailInput = styled.div`
  width: 250px;
  border-color: black;
  padding-top: 10px;
  border-radius: 0px;
  border-bottom: 1px solid black;
  padding-left: 11px;
  color: grey;
`;

const UserCard = styled.div`
  background-color: #fff;
  width: 300px;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  padding: 20px;
`;

const StartButton = styled(Button)`
  background-color: #244fdf;
  width: 300px;
  height: 50px;
  border-radius: 15px;
  color: #fff;
  font-size: 20px;
`;

const CustomInput = styled(Input)`
  border-top: none;
  border-left: none;
  border-right: none;
  width: 250px;
  border-color: black;
  padding-top: 15px;
  border-radius: 0px;
`;

const SearchInput = styled.input`
  width: 300px;
  height: 50px;
  border-radius: 15px;
  border: none;
  text-align: center;
`;

const TagContainer = styled.div`
  text-align: center;
  padding-top: 30px;
  padding-bottom: 30px;
  width: 300px;
`;

const TagDiv = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
`;

const TagTitle = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 5px;
`;

const TagDesc = styled.p`
  font-size: 14px;
`;

const CustomTag = styled.div`
  font-size: 17px;
  padding: 10px 15px;
  vertical-align: middle;
  border: 1px solid black;
  border-radius: 25px;
  & div {
    float: right;
    display: inline;
  }
`;

const SignOutButton = styled(Button)`
  background: none;
  border: none;
  box-shadow: none;
`;

const closeTag = () => {
  console.log("Close Tag");
};

export default function Account({ session }) {
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
      // Sending user UUID
      console.log(user.id);

      let { data, error, status } = await supabase
        .from("user")
        .select(`username, title, avatar_url, id`)
        .eq("id", user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

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

  async function updateProfile({ username, title, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id,
        username,
        title,
        avatar_url,
      };

      let { error } = await supabase.from("user").upsert(updates, {
        returning: "minimal", // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AccountDiv>
      <BlogH1>블로그 정보</BlogH1>
      <UserCard>
        <CustomAvatar
          url={avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ username, title, avatar_url: url });
          }}
        />
        <div>
          <EmailInput>{session.user.email}</EmailInput>
        </div>
        <div>
          <CustomInput
            placeholder="닉네임"
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <CustomInput
            placeholder="블로그 이름"
            id="title"
            type="text"
            value={title || ""}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </UserCard>

      <TagContainer>
        <TagTitle>당신은 어떤 사람입니까?</TagTitle>
        <TagDesc>
          당신을 표현하는 단어를 자유롭게 입력해주세요.
          <br />
          클릭해서 수정할 수 있습니다
        </TagDesc>
        <SearchInput placeholder="아무거나 입력하기" />
        <TagDiv>
          <CustomTag closable>
            Tag 2
            <div>
              <CloseOutlined onClick={closeTag} />
            </div>
          </CustomTag>
         

        </TagDiv>
      </TagContainer>

      <div>
        <StartButton
          onClick={() => updateProfile({ username, title, avatar_url })}
          disabled={loading}
        >
          {loading ? "Loading ..." : "시작하기"}
        </StartButton>
      </div>

      <div>
        <SignOutButton onClick={() => supabase.auth.signOut()}>
          다른 계정으로 시작하기
        </SignOutButton>
      </div>
    </AccountDiv>
  );
}
