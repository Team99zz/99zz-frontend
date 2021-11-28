import styled from "styled-components";
import Image from "next/image";
import Link from 'next/link'
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const CardDiv = styled.div`
  display: flex;
  background-color: #fff;
  margin-bottom: 10px;
  border-radius: 12px;
  height: 151px;
  justify-content: space-between;
  padding-left: 20px;
`;

const ImageDiv = styled.div`
  height: 151px;
  width: 151px;
  position: relative;
`;

const CardInnerDiv = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CardTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const CardSubtitle = styled.p`
  font-size: 12px;
`;

const CustomImage = styled(Image)`
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
`;

const UserP = styled.p`
  font-size: 11px;
  font-weight: 700;
  padding-left: 10px;
  margin: 0;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

export default function FeedCard(props) {
  return (
    <Link href={props.href}>
      <CardDiv>
        <CardInnerDiv>
          <div>
            <CardTitle>{props.title}</CardTitle>
            <CardSubtitle>{props.subtitle}</CardSubtitle>
          </div>
          <UserSection>
            {props.avatarUrl === null ? (
              <Avatar size={30} icon={<UserOutlined />} />
            ) : (
              <Avatar size={30} src={props.avatarUrl} />
            )}
            <UserP>{props.blogTitle}</UserP>
          </UserSection>
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

    </Link>
   
  );
}
