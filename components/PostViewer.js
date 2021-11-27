import { useState, useEffect } from "react";
import styled from "styled-components";
import { Editor, EditorState, ContentState, DraftEditorCommand, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw, createWithContent } from "draft-js";
import "draft-js/dist/Draft.css";
import { mediaBlockRenderer } from "./PostEditorImage";
import { Input, Slider, Select, Button } from "antd";
import { supabase } from "../utils/supabaseClient";
import { MdFormatAlignLeft, MdFormatListBulleted, MdFormatListNumbered, MdFormatBold, MdFormatItalic, MdFormatStrikethrough } from "react-icons/md";
import { BiFontSize } from 'react-icons/bi'



const PostTitle = styled.div`
    font-size : 24px;
    font-weight : bolder;
`;
const PostSubTitle = styled.div`
    font-size : 16px;
    color : gray;
    fonr-weight : bold;
`;
const WhiteBlock = styled.div`
    background-color : white;
    border-radius: 15px;
    padding : 20px;
    margin-bottom : 20px;
`;

export default function PostViewer({userid, postid}){
    const dummy = {
        category: 0,
        title: "테스트 제목",
        subtitle: "테스트 부제목",
        content: JSON.parse("{\"blocks\":[{\"key\":\"37odd\",\"text\":\"테스트 내용\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"11gik\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"cr3bo\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"dimlc\",\"text\":\" \",\"type\":\"atomic\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[{\"offset\":0,\"length\":1,\"key\":0}],\"data\":{}},{\"key\":\"4ona6\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"6ll51\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"bi9m8\",\"text\":\"테스트 사진\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"e738s\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"df83\",\"text\":\"\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{\"0\":{\"type\":\"image\",\"mutability\":\"IMMUTABLE\",\"data\":{\"src\":\"https://oqjtvbvvtbjpfgavumwy.supabase.co/storage/v1/object/public/images/0.5632126020022747.png\"}}}}"),
        thumnail: "https://oqjtvbvvtbjpfgavumwy.supabase.co/storage/v1/object/public/images/0.5632126020022747.png",
        boundary: 100,
        sentiment: 0
    }
    const state = convertFromRaw(dummy.content);
    console.log(state)
    const [editorState, setEditorState] = useState(EditorState.createWithContent(state));

    const getBlockStyle = (block) => {
        return block.getType();
    }
    return(
        <div>
            <WhiteBlock>
                <PostTitle>
                    {dummy.title}
                </PostTitle>
                <PostSubTitle>
                    {dummy.subtitle}
                </PostSubTitle>
                <div>
                    김뜼똘
                </div>
            </WhiteBlock>
            <WhiteBlock>
                <Editor
                    editorState={editorState}
                    readOnly={true}
                    blockRendererFn={mediaBlockRenderer}
                    blockStyleFn={getBlockStyle}
                />
            </WhiteBlock>


        </div>
    )



}