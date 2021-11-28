import { useState, useEffect } from "react";
import styled from "styled-components";
import { EditorState, RichUtils, AtomicBlockUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { mediaBlockRenderer } from "./PostEditorImage";
import { Input, Slider, Select, Button } from "antd";
import { supabase } from "../utils/supabaseClient";
import { MdFormatAlignLeft, MdOutlineImage, MdFormatListBulleted, MdFormatListNumbered, MdFormatBold, MdFormatItalic, MdFormatStrikethrough } from "react-icons/md";
import { BiFontSize } from 'react-icons/bi'
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

const { TextArea } = Input;
const { Option } = Select;


const Editor = dynamic(
    () => import('draft-js').then(mod => mod.Editor),
    { ssr: false }
)

const CategorySelect = styled(Select)`
    width :100%;
    div {
        height : 50px;
    }
    
`;
const SubmitButton = styled(Button)`
  background-color: #244fdf;
  width: 100%;
  height: 50px;
  border-radius: 15px;
  color: #fff;
  font-size: 20px;
  margin-top : 20px;
  margin-bottom : 100px;
`;

const iconSize = '1.2rem';
const Title = styled.div`
    
    TextArea {
        width : 100%;
        outline : none;
        border: none;
        margin: 0.5rem 0;
        border-radius: 0.5rem;
        font-size : 24px;
        font-weight : bolder;
        padding : 10px;
    }
    TextArea:focus{
        outline: none;
    }
    .title {
        font-size : 24px;
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
        margin: 0.5rem 0;
        
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

    position: sticky;
    z-index : 999;
    bottom: 0;
    left : 0;
    background-color : #f5f5f5;
    width : 100%;
    display : flex;
    flex-direction : row;
    justify-content: space-between;
    
    h3{
        display : inline;
        font-weight : bold;
        line-height : 32 px;
        height : 32px;
    }

    .hidden{
        display : none;
    }

    button {
        margin : 8px;
        border: none;
        background-color: #f5f5f5 ;
    }
`;
const PostSetting = styled.div`
    font-weight : bold;
    text-align : center;
    margin-top : 10px;
    margin-bottom : 0px;
    padding : 0px 20px;
    h2 { 
        font-weight : bold;
    }
`;

const CustomSlider = styled(Slider)`
    margin-bottom : 50px;
`;

const marks = {
    0: "나",
    33: "친구",
    66: "팔로잉",
    100: "전체",
};

export default function TextEditor({ session }) {
    const router = useRouter();
    const [titleState, setTitleState] = useState("");
    const [subTitleState, setSubTitleState] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [uploadingImage, setUploadingImage] = useState(false);
    const [revealRange, setRevealRange] = useState(100);
    const [categoryList, setcategoryList] = useState([]);
    const [categoryState, setCategoryState] = useState("");
    const [thumbnail, setThumbnail] = useState(null);
    const [gettingCategory, setGettingCategory] = useState(false);

    useEffect(() => getCategory(), []);

    async function getCategory(){
        try {
            setGettingCategory(true);
            const uuid = session.user.id;
            let { data, error } = await supabase
                .from('category')
                .select('*')
                .eq('user', uuid);
            console.log(data);
            setcategoryList(data);

            if (error && status !== 406) {
                throw error;
            }
        }
        catch (error) {
            console.log(error.message);
        }
        finally {
            setGettingCategory(false);
        }
    }


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
                throw uploadError;
            }
            const { publicURL, error } = supabase
                .storage
                .from("images")
                .getPublicUrl(filePath)

                
            if (thumbnail == null) setThumbnail(publicURL);
            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity("image", "IMMUTABLE", { src: publicURL });
            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, {
                currentContent: contentStateWithEntity
            });
            setEditorState(AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, " "));

        } catch (error) {
            console.log(error.message);
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
        return block.getType();
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
            user: session.user.id,
            category: categoryState,
            title: titleState,
            subtitle: subTitleState,
            content: JSON.stringify(content),
            thumbnail: thumbnail,
            boundary: revealRange,
            sentiment: 0
        }

        console.log(JSON.stringify(query));
        const { data, error } = await supabase
            .from('posting')
            .insert(query)

        if(error) throw error;
        else{
            const url = `/user/${data[0].user}/${data[0].id}`;
            router.push(url)
        }

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
                <div>
                    <button onMouseDown={(event) => handleToggleClick(event, "BOLD")}>
                        <MdFormatBold size={iconSize} />
                    </button>
                    <button onMouseDown={(event) => handleToggleClick(event, "ITALIC")}>
                        <MdFormatItalic size={iconSize} />
                    </button>
                    <button onMouseDown={(event) => handleToggleClick(event, "STRIKETHROUGH")}>
                        <MdFormatStrikethrough size={iconSize} />
                    </button>
                </div>
                <div>
                    <button onMouseDown={(event) => handleBlockClick(event, "h")}>
                        <BiFontSize size={iconSize} />
                    </button>
                    <button onMouseDown={(event) => handleBlockClick(event, "a")}>
                        <MdFormatAlignLeft size={iconSize} />
                    </button>
                    <button onMouseDown={(event) => handleBlockClick(event, "ordered-list-item")}>
                        <MdFormatListBulleted size={iconSize} />
                    </button>
                    <button onMouseDown={(event) => handleBlockClick(event, "unordered-list-item")}>
                        <MdFormatListBulleted size={iconSize} />
                    </button>
                    <button
                        onClick={() => {
                            document.getElementById("fileInput").click()
                        }}
                    >
                        <MdOutlineImage size={iconSize} />
                    </button>
                    <input
                        type="file"
                        id="fileInput"
                        accept='image/*'
                        multiple
                        className={"hidden"}

                        onChange={(event) => handleInsertImage(event)}
                    />
                </div>


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
            </PostSetting>
            <PostSetting>
                <h2>카테고리</h2>
                <CategorySelect  onChange={value=>setCategoryState(value)}>
                    {

                        categoryList.map((category, index) => (
                            <Option key={index} value={category.id} onClick={(value) => setCategoryState(value)}>{category.title}</Option>
                        ))

                    }
                </CategorySelect>
            </PostSetting>
            <SubmitButton
                onClick={handleSubmit}>
                글 쓰기
            </SubmitButton>

        </div>
    );

}

