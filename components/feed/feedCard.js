import styled from "styled-components";
import Image from "next/image";

const CardDiv = styled.div`
  display: flex;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 12px;
  height: 151px;
`;

const CardTitle = styled.p``;
const CardSubtitle = styled.p``;

const CardImg = styled.img``;

export default function FeedCard(props) {
  return (
    <CardDiv>
      <CardTitle>{props.title}</CardTitle>
      <CardSubtitle>{props.subtitle}</CardSubtitle>
      {props.thumbnail === null ? (
        <></>
      ) : (
        <Image src={props.thumbnail} alt={props.title} height="151px" width="151px"/>
      )}
    </CardDiv>
  );
}
