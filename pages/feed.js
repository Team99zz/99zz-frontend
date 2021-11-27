import { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient";
import { BackTop, Slider } from "antd";
import "moment/locale/ko";

import {
  MdNotificationsNone,
  MdOutlineSearch,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
} from "react-icons/md";

import Nav from "../components/Nav";
import styled from "styled-components";
import FeedCard from "../components/feed/feedCard";
import moment from "moment";

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
  margin-bottom: 10px;
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

export default function Feed({ session }) {
  const [loading, setLoading] = useState(true);
  const [dropdownActive, setDropdownActive] = useState(false);
  const [sliderValue, setSliderValue] = useState("친구");
  const [sliderNumber, setSliderNumber] = useState("33명");
  const [feed, setFeed] = useState([]);

  // const [session, setSession] = useState(null);

  // useEffect(() => {
  //   setSession(supabase.auth.session());

  //   supabase.auth.onAuthStateChange((_event, session) => {
  //     setSession(session);
  //   });
  // }, []);

  useEffect(() => {
    getFeed();
  }, [session]);

  async function getFeed() {
    try {
      setLoading(true);
      const user = await supabase.auth.user();

      let { data: posting, error } = await supabase
          .from("posting")
          .select("id, user, title, subtitle, created_at, thumbnail");

      posting = await Promise.all(
          posting.map( async p => {
            let {data, error } = await supabase
                .from('user')
                .select('title, avatar_url')
                .eq("id", p.user)
                .single();

            return {
              ...p,
              ...{
                blog_title:data.title,
                avatar_url: data.avatar_url,
                time_ago: moment(p.created_at).fromNow()
              }
            }
          })
      )

      console.log(posting)

      if (error && status !== 406) {
        throw error;
      }
      if (posting) {
        setFeed(posting);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }


  const onAfterChange = (value) => {
    // value.preventDefault();
    switch (value) {
      case 0:
        setSliderValue("나");
        setSliderNumber(null);
        break;
      case 33:
        setSliderValue("친구");
        setSliderNumber("23명");
        break;
      case 66:
        setSliderValue("팔로잉");
        setSliderNumber("45명");
        break;
      case 100:
        setSliderValue("전체");
        setSliderNumber("156명");
        break;
      default:
        break;
    }
  };

  return (
    <div>
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
          {dropdownActive ? (
            <PublicCard>
              <PCardP>
                <PCardPSpan>
                  {sliderValue} {sliderNumber}
                </PCardPSpan>
                의 이야기를 보고 있어요!
              </PCardP>
              <CustomSlider
                onAfterChange={onAfterChange}
                marks={marks}
                step={null}
                defaultValue={33}
                tipFormatter={null}
                trackStyle={{ backgroundColor: "#244FDF" }}
                handleStyle={{ borderColor: "#244FDF" }}
              />
            </PublicCard>
          ) : (
            <></>
          )}
          {feed.map((posting, index) => (
            <FeedCard
              key={index}
              title={posting.title}
              subtitle={posting.subtitle}
              thumbnail={posting.thumbnail}
            ></FeedCard>
          ))}
        </FeedInnerDiv>
      </FeedDiv>
      <Nav name="feed" />
    </div>
  );
}
