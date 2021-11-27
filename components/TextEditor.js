import { useState, useEffect } from "react";
import styled from "styled-components";
import { Editor, EditorState, DraftEditorCommand, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { mediaBlockRenderer } from "./TextEditorImage";
import { Input, Slider } from "antd";
import { supabase } from "../utils/supabaseClient";

const { TextArea } = Input;


const Title = styled.div`
    
    TextArea {
        width : 100%;
        outline : none;
        border: none;
        margin: 0.5rem 0;
        border-radius: 0.5rem;
    }
    TextArea:focus{
        outline: none;
    }
    .title {
        font-size : 30px;
    }
    .subTitle{
        font-size : 14px;
    }
`
const EditorComponent = styled.div`
    .texteditor {
        width: 40rem;
    }

    .DraftEditor-root {
        border: 1px solid #eee;
        margin: 0.5rem 0;
        border-radius: 0.5rem;
    }

    .DraftEditor-editorContainer {
        padding: 1.5rem;
    }

    .public-DraftEditor-content {
        min-height: 20rem;
        
    }
    .align-right div {
        text-align: right;
    }
    .align-center div {
        text-align: center;
    }
    .align-left div {
        text-align: left;
    }


`;
const ToolbarComponent = styled.div`
    .hidden{
        display : none;
    }
    button {
        border: none;
        background-color: white;
        padding: 0.5rem 1rem;
    }
`;



export default function TextEditor() {
    const [titleState, setTitleState] = useState("");
    const [subTitleState, setSubTitleState] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
    const [revealRange, setRevealRange] = useState(4);


    async function uploadImage(event) {
        try{
            setUploadingImage(true);

            if(!event.target.files || event.target.files.length === 0){
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
            console.log(publicURL)
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity("image", "IMMUTABLE", { src : publicURL });
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
        console.log("Cur" + RichUtils.getCurrentBlockType(editorState));
        setEditorState(RichUtils.toggleBlockType(editorState, blockType));
    };

    const handleInsertImage = (event) => {
        console.log(event.target.files[0]);
        uploadImage(event);
    }
    const getBlockStyle = (block) => {
        block.
        console.log(block.getType());
        switch (block.getType()) {
            
            case 'left':
                return 'align-left';
            case 'center':
                return 'align-center';
            case 'right':
                return 'align-right';
            default:
                return null;
        }
    }




    const handleSubmit = () => {
        const data = JSON.stringify(convertToRaw(editorState.getCurrentContent()));
        console.log(titleState, subTitleState, data)
    }

    function formatter(value) {
        return `공개할 단계가 ${value + 1} 단계입니다.`;
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
                <button onMouseDown={(event) => handleBlockClick(event, "unstyled")}>일반</button>
                <button onMouseDown={(event) => handleBlockClick(event, "header-one")}>제목1</button>
                <button onMouseDown={(event) => handleBlockClick(event, "header-two")}>제목2</button>
                <button onMouseDown={(event) => handleBlockClick(event, "header-three")}>제목3</button>
                <button onMouseDown={(event) => handleBlockClick(event, "ordered-list-item")}>번호</button>
                <button onMouseDown={(event) => handleBlockClick(event, "unordered-list-item")}>점</button>
            </ToolbarComponent>
            <ToolbarComponent>
                <button onMouseDown={(event) => handleBlockClick(event, "align-left")}>왼쪽</button>
                <button onMouseDown={(event) => handleBlockClick(event, "align-center")}>중앙</button>
                <button onMouseDown={(event) => handleBlockClick(event, "align-right")}>오른쪽</button>
            </ToolbarComponent>
            <ToolbarComponent>
                <button onMouseDown={(event) => handleToggleClick(event, "BOLD")}>두껍게</button>
                <button onMouseDown={(event) => handleToggleClick(event, "ITALIC")}>기울이기</button>
                <button onMouseDown={(event) => handleToggleClick(event, "STRIKETHROUGH")}>밑줄</button>
            </ToolbarComponent>
            <ToolbarComponent>
                <input
                    type="file"
                    id="fileInput"
                    accept='image/*'
                    multiple
                    className={"hidden"}

                    onChange={(event) => handleInsertImage(event)}
                />
                <button
                    onClick={() => {
                        document.getElementById("fileInput").click()
                    }}
                >
                    사진
                </button>

            </ToolbarComponent>
            <div>
                <h2>공개 범위</h2>
                <Slider
                    value={revealRange}
                    min={0}
                    max={4}
                    onChange={(value) => setRevealRange(value)}
                    tooltipVisible={true}
                    tooltipPlacement={"bottom"}
                    dots={true}
                    tipFormatter={formatter}
                />

                <h3>
                    글 보는 단계가 {revealRange + 1} 단계임 ㅅㄱ
                </h3>

            </div>
            <button
                onClick={handleSubmit}
            >
                보내기
            </button>
        </div>
    );

}

