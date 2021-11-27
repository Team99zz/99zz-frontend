import { useState, useEffect } from "react";
import styled from "styled-components";
import { EditorState, ContentState, DraftEditorCommand, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw, createWithContent } from "draft-js";
import "draft-js/dist/Draft.css";
import { mediaBlockRenderer } from "./PostEditorImage";
import { Input, Slider, Select, Button } from "antd";
import { supabase } from "../utils/supabaseClient";
import { MdFormatAlignLeft, MdFormatListBulleted, MdFormatListNumbered, MdFormatBold, MdFormatItalic, MdFormatStrikethrough } from "react-icons/md";
import { BiFontSize } from 'react-icons/bi'
import dynamic from "next/dynamic";

const Editor = dynamic(
    () => import('draft-js').then(mod => mod.Editor),
    { ssr: false }
)
const Header = styled.div`


`;
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

//params[0] uid
//params[1] pid

//uid, pid로 Query해서 convertFromRaw안에 넣어주면 됨

export default function PostViewer(props){
    const [loading, setLoading] = useState(true);
    const [titleState, setTitleState] = useState("");
    const [subTitleState, setSubTitleState] = useState("");
    const [loadedData, setLoadedData] = useState('');
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    useEffect(() => {
        getPosting(props.data.pid);
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

 


    
    const getBlockStyle = (block) => {
        return block.getType();
    }
    return(
        <div>
            <Header>

            </Header>
            <WhiteBlock>
                <PostTitle>
                    {titleState}
                </PostTitle>
                <PostSubTitle>
                    {subTitleState}
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