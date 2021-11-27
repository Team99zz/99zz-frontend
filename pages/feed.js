import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { BackTop, Slider } from "antd";

import {
  MdNotificationsNone,
  MdOutlineSearch,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

import Nav from "../components/Nav";
import styled from "styled-components";

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DropdownBtn = styled.div`
  display: flex;
  align-items: center;
`;

const DropdownP = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  padding: 0;
  padding-right: 5px;
`;

const RightDiv = styled.div``;

const FeedDiv = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
  padding: 10px 15px;
  margin-bottom: 10px;
`;

const FeedInnerDiv = styled.div`
  width: 100%;
  padding-top: 10px;
`;

const PublicCard = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 18px;
  padding: 10px 20px;
  text-align: center;
`;

const PCardP = styled.p`
  font-size: 16px;
`;

const PCardPSpan = styled.span`
  color: #244fdf;
`;

const CustomSlider = styled(Slider)``;

const marks = {
  0: "나",
  33: "친구",
  66: "팔로잉",
  100: "전체",
};

const onChange = (value) => {
  value.preventDefault();
  switch (value) {
    case 0:
      setSliderValue("나");
      break;
    case 33:
      setSliderValue("친구");
      break;
    case 66:
      setSliderValue("팔로잉");
      break;
    case 100:
      setSliderValue("전체");
      break;
    default:
      break;
  }
};

export default function Feed() {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [sliderValue, setSliderValue] = useState("친구");

  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   setSession(supabase.auth.session());

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  return (
    <FeedDiv>
      <TopBar>
        <DropdownBtn>
          <DropdownP>친구들의 구구절절</DropdownP>
          {dropdownActive ? (
            <MdKeyboardArrowUp
              size="25"
              onClick={() => setDropdownActive(false)}
            />
          ) : (
            <MdKeyboardArrowDown
              onClick={() => setDropdownActive(true)}
              size="25"
            />
          )}
        </DropdownBtn>
        <RightDiv>
          <MdNotificationsNone size="25"></MdNotificationsNone>
          <MdOutlineSearch size="25"></MdOutlineSearch>
        </RightDiv>
      </TopBar>
      <FeedInnerDiv>
        <PublicCard>
          <PCardP>
            <PCardPSpan>{sliderValue} 123명</PCardPSpan>의 이야기를 보고 있어요!
          </PCardP>
          <CustomSlider
            onchange={onChange}
            marks={marks}
            step={null}
            defaultValue={33}
            tipFormatter={null}
            trackStyle={{ backgroundColor: "#244FDF" }}
            handleStyle={{ borderColor: "#244FDF" }}
          />
        </PublicCard>
      </FeedInnerDiv>
      <Nav name="feed"></Nav>
    </FeedDiv>
  );
}
