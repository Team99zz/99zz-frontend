import styled from "styled-components";
import {
  MdOutlineBadge,
  MdTimeline,
  MdOutlineDescription,
} from "react-icons/md";

const UserNavCardDiv = styled.div`
  background-color: #fff;
  width: 100%;
  border-radius: 12px;
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
  padding: 20px 30px; 
  text-align: center;
`;

const IntroDiv = styled.div``;

const IntroP = styled.p`
  margin: 0;
`;

const TimelineDiv = styled.div``;

const TimelineP = styled.p`
  margin: 0;
`;

const MyfeedDiv = styled.div``;

const MyfeedP = styled.p`
  margin: 0;
`;

export default function UserNavCard() {
  return (
    <UserNavCardDiv>
      <IntroDiv>
        <MdOutlineBadge size={30} />
        <IntroP>소개글</IntroP>
      </IntroDiv>
      <TimelineDiv>
        <MdTimeline size={30} />
        <TimelineP>타임라인</TimelineP>
      </TimelineDiv>
      <MyfeedDiv>
        <MdOutlineDescription size={30} />
        <MyfeedP>모아보기</MyfeedP>
      </MyfeedDiv>
    </UserNavCardDiv>
  );
}
