import styled from "styled-components";
import Image from "next/image";

const CardDiv = styled.div`
  display: flex;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 12px;
  height: 151px;
  justify-content: space-between;
  padding-left: 16px;
`;

const ImageDiv = styled.div`
  height: 151px;
  width: 151px;
  position: relative;
`;

const CardInnerDiv = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.p`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 4px;  
`;
const CardSubtitle = styled.p`
    font-size: 10px;
`;

const CustomImage = styled(Image)`
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`;

export default function FeedCard(props) {
  return (
    <CardDiv>
      <CardInnerDiv>
        <div>
          <CardTitle>{props.title}</CardTitle>
          <CardSubtitle>{props.subtitle}</CardSubtitle>
        </div>
        <div>최똘똘</div>
      </CardInnerDiv>

      {props.thumbnail === null ? (
        <></>
      ) : (
        <ImageDiv>
          <CustomImage
            src={props.thumbnail}
            alt={props.title}
            layout="fill"
            objectFit="cover"
          />
        </ImageDiv>
      )}
    </CardDiv>
  );
}
