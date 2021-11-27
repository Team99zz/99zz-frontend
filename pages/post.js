import Head from "next/head";
import dynamic from 'next/dynamic';
import styled from "styled-components";



const NoSSREditor = dynamic(() => import("../components/TextEditor"), { ssr: false });
const PostDiv = styled.div`
  margin-top: 10px;
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  margin-bottom: 10px;
`;

const PostInnerDiv = styled.div`
  width: 100%;
  padding-top: 10px;
`;
export default function Write() {
    return (
        <PostDiv>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <NoSSREditor />
        </PostDiv>
                
    );
}
