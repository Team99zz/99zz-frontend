import { useState, useEffect } from "react";
import styled from "styled-components";
import { Editor, EditorState, DraftEditorCommand, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { mediaBlockRenderer } from "./TextEditorImage";
import { Input, Slider, Select, Button } from "antd";
import { supabase } from "../utils/supabaseClient";
import { MdFormatAlignLeft, MdFormatListBulleted, MdFormatListNumbered, MdFormatBold, MdFormatItalic, MdFormatStrikethrough } from "react-icons/md";
import { BiFontSize } from 'react-icons/bi'

const { TextArea } = Input;
const { Option } = Select;


const CategorySelect = styled(Select)`
    width :100%;
`;
const SubmitButton = styled(Button)`
  background-color: #244fdf;
  width: 100%;
  height: 50px;
  border-radius: 15px;
  color: #fff;
  font-size: 20px;
  margin-top : 20px;
`;
const Title = styled.div`
    
    TextArea {
        width : 100%;
        outline : none;
        border: none;
        margin: 0.5rem 0;
        border-radius: 0.5rem;
        font-size : 24px;
        font-weight : bolder;
    }
    TextArea:focus{
        outline: none;
    }
    .title {
        font-size : 30px;
    }
    .subTitle{
        font-size : 16px;
        color : gray;
        fonr-weight : bold;
    }
`
const EditorComponent = styled.div`
    .texteditor {
        width: 40rem;
        
    }

    .DraftEditor-root {
        background-color : white;
        border: 1px solid #eee;
        margin: 0.5rem 0;
        border-radius: 0.5rem;
        
    }

    .DraftEditor-editorContainer {
        padding: 1.5rem;
        line-height : 200%;
    }

    .public-DraftEditor-content {
        min-height: 20rem;
        
        
    }
    .h3{
        font-size : 20px;
        font-weight : bolder;
    }
    .h2{
        font-size : 18px;
        font-weight : bold;
    }
    .h1{
        font-size : 16px;
        font-weight : bold;
    }
    .h0{
        font-size : 14px;
        font-weight : normal;
    }

    .a0 div{
        text-align: left;
    }
    .a1 div{
        text-align: center;
    }
    .a2 div{
        text-align: right;
    }


`;
const ToolbarComponent = styled.div`
    h3{
        display :inline;
        font-weight : bold;
    }
    .hidden{
        display : none;
    }
    button {
        border: none;
        background-color: #f5f5f5 ;
        padding: 1rem;
    }
`;
const PostSetting = styled.div`
    font-weight : bold;
    text-align : center;
    padding : 0px 20px;
    h2 { 
        font-weight : bold;
    }
`;


const CustomSlider = styled(Slider)``;


const marks = {
    0: "나",
    33: "친구",
    66: "팔로잉",
    100: "전체",
};



export default function TextEditor({ uuid }) {
    const [titleState, setTitleState] = useState("");
    const [subTitleState, setSubTitleState] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [uploadingImage, setUploadingImage] = useState(false);
    const [revealRange, setRevealRange] = useState(100);
    const [categoryState, setCategoryState] = useState(0);
    const [thumnail, setThumnail] = useState(null);

    async function uploadImage(event) {
        try {
            setUploadingImage(true);

            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("Select Image to upload");
            }

            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            let { error: uploadError } = await supabase.storage
                .from("images")
                .upload(filePath, file);

            if (uploadError) {
                console.log(uploadError)
                throw uploadError;
            }
            const { publicURL, error } = supabase
                .storage
                .from("images")
                .getPublicUrl(filePath)
            if (thumnail == null) setThumnail(publicURL);
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity("image", "IMMUTABLE", { src: publicURL });
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, {
                currentContent: contentStateWithEntity
            });
            setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "));

        } catch (error) {
            alert(error.message);
        } finally {
            setUploadingImage(false);
        }
    }


    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            setEditorState(newState);
            return "handled";
        }
        return "not-handled";
    };
    const handleToggleClick = (e, inlineStyle) => {
        e.preventDefault();
        setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));

    };
    const handleBlockClick = (e, blockType) => {
        e.preventDefault();
        let currentBlockType = String(RichUtils.getCurrentBlockType(editorState)).split(" ");
        if (currentBlockType.length === 1) {
            currentBlockType.pop();
            currentBlockType.push("a0");
            currentBlockType.push("h0");
        }
        if (blockType == "init") {
            currentBlockType = [];
            currentBlockType.push("a0");
            currentBlockType.push("h0");
        }
        else if (blockType == "a") {
            currentBlockType[0] = "a" + String((Number(currentBlockType[0][1]) + 1) % 3);
        }
        else if (blockType == "h") {
            currentBlockType[1] = "h" + String((Number(currentBlockType[1][1]) + 1) % 4);
        }
        else {
            currentBlockType = [blockType];
        }
        let newBlockType = currentBlockType.join(" ");
        console.log("handleBlockClick", newBlockType);
        setEditorState(RichUtils.toggleBlockType(editorState, newBlockType));
    };

    const handleInsertImage = (event) => {
        uploadImage(event);
    }
    const getBlockStyle = (block) => {
        return block.getType();;
    }




    const handleSubmit = async () => {
        const content = convertToRaw(editorState.getCurrentContent());
        console.log(content);
        //제목 확인
        if (titleState == "") {
            alert("제목을 입력해주세요.");
            return;
        }
        //본문 확인
        let check = true;
        for (const block of content.blocks) {
            if (block.text != "") {
                check = false;
                break;
            }
        }
        if (check) {
            alert("본문을 입력해주세요.");
            return;
        }
        if (subTitleState == "") {
            let subTitle = "";
            let i = 0;
            while (subTitle.length < 50 && i < content.blocks.length) {
                subTitle += (content.blocks[i].text + " ");
                i++;
            }
            setSubTitleState(subTitle);
        }

        const query = {
            user: uuid,
            category: categoryState,
            title: titleState,
            subtitle: subTitleState,
            content: JSON.stringify(content),
            thumnail: thumnail,
            boundary: revealRange,
            sentiment: 0
        }
        const { data, error } = await supabase
            .from('posting')
            .upsert(query)



    }

    function selectionChange(value){

    }




    return (
        <div>
            <Title>
                <TextArea
                    placeholder="제목을 입력해주세요"
                    autoSize
                    className={"title"}
                    onChange={(event) => setTitleState(event.target.value)}
                />
                <TextArea
                    placeholder="부제목을 입력해주세요"
                    autoSize
                    className={"subTitle"}
                    onChange={(event) => setSubTitleState(event.target.value)}
                />
            </Title>
            <EditorComponent>
                <Editor
                    editorState={editorState}
                    onChange={setEditorState}
                    handleKeyCommand={handleKeyCommand}
                    blockStyleFn={getBlockStyle}
                    blockRendererFn={mediaBlockRenderer}
                />
            </EditorComponent>
            <ToolbarComponent>
                <h3>문단 모양</h3>
                <button onMouseDown={(event) => handleBlockClick(event, "h")}>
                    <BiFontSize />
                </button>
                <button onMouseDown={(event) => handleBlockClick(event, "a")}>
                    <MdFormatAlignLeft />
                </button>
                <button onMouseDown={(event) => handleBlockClick(event, "ordered-list-item")}>
                    <MdFormatListBulleted />
                </button>
                <button onMouseDown={(event) => handleBlockClick(event, "unordered-list-item")}>
                    <MdFormatListBulleted />
                </button>
            </ToolbarComponent>
            <ToolbarComponent>
                <h3>글자 모양</h3>
                <button onMouseDown={(event) => handleToggleClick(event, "BOLD")}>
                    <MdFormatBold />
                </button>
                <button onMouseDown={(event) => handleToggleClick(event, "ITALIC")}>
                    <MdFormatItalic />
                </button>
                <button onMouseDown={(event) => handleToggleClick(event, "STRIKETHROUGH")}>
                    <MdFormatStrikethrough />
                </button>
                <button
                    onClick={() => {
                        document.getElementById("fileInput").click()
                    }}
                >사진
                </button>
                <input
                    type="file"
                    id="fileInput"
                    accept='image/*'
                    multiple
                    className={"hidden"}

                    onChange={(event) => handleInsertImage(event)}
                />
            </ToolbarComponent>
            
            <PostSetting>
                <h2>공개 범위</h2>
                <CustomSlider
                    defaultValue={33}
                    marks={marks}
                    step={null}
                    onChange={(value) => setRevealRange(value)}
                    tipFormatter={null}
                    trackStyle={{ backgroundColor: "#244FDF" }}
                    handleStyle={{ borderColor: "#244FDF" }}
                />
                <h2>카테고리</h2>
                <CategorySelect>
                    <Option>
                        Hello World
                    </Option>
                </CategorySelect>
            </PostSetting>

            <SubmitButton
                onClick={handleSubmit}>
                글 쓰기
            </SubmitButton>
        </div>
    );

}

