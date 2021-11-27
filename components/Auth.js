import { useState } from "react";
import { supabase } from "../utils/supabaseClient";

import { Button } from "antd";

import styled from "styled-components";
import { GoogleOutlined } from "@ant-design/icons";

const AuthDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #244fdf;
`;

const TitleDiv = styled.div`
  text-align: center;
  padding-bottom: 80px;
`;

const TitleDesc = styled.p`
  font-size: 18px;
  line-height: 20px;
  color: #fff;
  font-weight: 600;
  padding-bottom: 10px;
`;

const Title = styled.p`
  font-size: 5rem;
  color: #fff;
  font-family: "Neometric", sans-serif;
  font-weight: 800;
  font-style: italic;
  line-height: 20px;
`;

const ButtonSpan = styled.span`
  padding-left: 20px;
  padding-right: 20px;
`

const Copyright = styled.p`
  font-size: 10px;
  color: #fff;
  position: absolute;
  bottom: 0;
`

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  async function googleLogin() {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        provider: "google",
      });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthDiv>
      <TitleDiv>
        <TitleDesc>당신의 일상을</TitleDesc>
        <Title>99ZZ</Title>
      </TitleDiv>

      <div>
        <Button
          block
          shape="round"
          size="large"
          onClick={(e) => {
            e.preventDefault();
            googleLogin();
          }}
          disabled={loading}
        >
          <GoogleOutlined style={{fontSize: '19px'}} />
          <ButtonSpan>{loading ? "Loading" : "Google로 시작하기"}</ButtonSpan>
        </Button>
      </div>
      <Copyright>Team 99zz 2021 (c) All Right Reserved</Copyright>
    </AuthDiv>
  );
}
