import Head from "next/head";
import dynamic from 'next/dynamic';
import styled from "styled-components";

import PostEditor from '../components/PostEditor';




const PostDiv = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const PostInnerDiv = styled.div`
  width: 100%;
  
`;
export default function Write(props) {
    return (
        <PostDiv>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <PostEditor session={props.session}/>
        </PostDiv>
                
    );
}
