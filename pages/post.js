import Head from "next/head";
import dynamic from 'next/dynamic';
import styled from "styled-components";
import PostViewer from "../components/PostViewer";



// const NoSSREditor = dynamic(() => import("../components/PostViewer"), { ssr: false });
const PostDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const PostInnerDiv = styled.div`
  width: 100%;
  
`;
export default function Write() {
    return (
        <PostDiv>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
          <PostViewer />
        </PostDiv>
                
    );
}
