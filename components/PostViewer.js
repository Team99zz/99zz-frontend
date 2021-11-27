import { useState, useEffect } from "react";
import styled from "styled-components";
import { EditorState, ContentState, DraftEditorCommand, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw, createWithContent } from "draft-js";
import "draft-js/dist/Draft.css";
import { mediaBlockRenderer } from "./PostEditorImage";
import {Input, Slider, Select, Button, Avatar} from "antd";
import { supabase } from "../utils/supabaseClient";
import { MdFormatAlignLeft, MdFormatListBulleted, MdFormatListNumbered, MdFormatBold, MdFormatItalic, MdFormatStrikethrough } from "react-icons/md";
import { BiFontSize } from 'react-icons/bi'
import dynamic from "next/dynamic";

import {
    MdKeyboardBackspace,
    MdIosShare,
    MdPersonAddAlt,
    MdThumbUpOffAlt,
    MdOutlineComment,
} from "react-icons/md"
import {UserOutlined} from "@ant-design/icons";

const Editor = dynamic(
    () => import('draft-js').then(mod => mod.Editor),
    { ssr: false }
)

const PostingDiv = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

const TopBar = styled.div`
  width: 100%;
  display : flex;
  flex-direction : row;
  justify-content: space-between;
  background-color: #f5f5f5;
`;

const BackspaceDiv = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
`

const BlankDiv = styled.div`
  width: 24px;
  margin: 20px;
`;

const BlogTitle = styled.div`
  text-align: center;
  font-size: 18px;
  font-style: normal;
  font-weight: bold;
  line-height: 40px;
  align-items: center;
`;

const PostTitle = styled.div`
    font-size : 24px;
    font-weight : bolder;
    line-height: 24px;
`;
const PostSubTitle = styled.div`
    font-size : 16px;
    color : #1b1b1f;
    font-weight : normal;
    line-height: 18px;
    margin-top: 20px;
`;

const SubSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 18px;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
`;

const UserP = styled.p`
  font-size: 11px;
  font-weight: 700;
  padding-left: 10px;
  margin: 0;
`;

const MarginDiv = styled.div`
  width: 5px`;

const WhiteBlock = styled.div`
    background-color : white;
    border-radius: 15px;
    padding : 20px;
    margin-bottom : 20px;
`;

//params[0] uid
//params[1] pid

//uid, pid로 Query해서 convertFromRaw안에 넣어주면 됨

export default function PostViewer(props){
    const [loading, setLoading] = useState(true);
    const [titleState, setTitleState] = useState("");
    const [subTitleState, setSubTitleState] = useState("");
    const [loadedData, setLoadedData] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [username, setUsername] = useState(null);
    const [title, setTitle] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);

    useEffect(() => {
        getPosting(props.data.pid);
        getUserInfo(props.data.uid);
    })

    async function getPosting(pid) {
        try {
            setLoading(true);
            const pid2 = window.location.pathname.split("/")[3];
            let { data, error } = await supabase
                .from('posting')
                .select('*')
                .eq('id', pid2)
                .single();
            setTitleState(data.title);
            setSubTitleState(data.subtitle);
            setEditorState(EditorState.createWithContent(convertFromRaw(data.content)))
            if (error && status !== 406) {
                throw error;
            }
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            setLoading(false);
        }
    }

    async function getUserInfo (uid) {
        try {
            setLoading(true)
            const uid = window.location.pathname.split("/")[2];
            let { data, error } = await supabase
                .from('user')
                .select('username, title, avatar_url')
                .eq('id', uid)
                .single();
            if (error && status !== 406) {
                throw error;
            }
            if (data) {
                setUsername(data.username);
                setTitle(data.title);
                setAvatarUrl(data.avatar_url);
            }
        }
        catch (error) {
            alert(error.message);
        }
        finally {
            setLoading(false);
        }
    }


    const getBlockStyle = (block) => {
        return block.getType();
    }
    return(
        <PostingDiv>
            <TopBar>
                <BackspaceDiv>
                    <MdKeyboardBackspace
                        size="24"
                        height="40"/>
                </BackspaceDiv>
                <BackspaceDiv>
                    <BlogTitle>
                        {title}
                    </BlogTitle>
                </BackspaceDiv>
                <BlankDiv>{" "}</BlankDiv>
            </TopBar>

            <WhiteBlock>
                <PostTitle>
                    {titleState}
                </PostTitle>
                <PostSubTitle>
                    {subTitleState}
                </PostSubTitle>
                <SubSection>
                    <UserSection>
                        <div>
                            {avatar_url === null ? (
                                <Avatar size={30} icon={<UserOutlined />} />
                            ) : (
                                <Avatar size={30} src={avatar_url} />
                            )}
                        </div>
                        <UserP>{username}</UserP>
                    </UserSection>
                    <div>
                        <MdIosShare
                            size="24"/>
                        <MdPersonAddAlt
                            size="24"/>
                    </div>
                </SubSection>

            </WhiteBlock>

            <WhiteBlock>
                <Editor
                    editorState={editorState}
                    readOnly={true}
                    blockRendererFn={mediaBlockRenderer}
                    blockStyleFn={getBlockStyle}
                />
            </WhiteBlock>


        </PostingDiv>
    )



}