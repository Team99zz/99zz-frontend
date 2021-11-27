import { useState, useEffect } from "react";
import styled from "styled-components";
import { Editor, EditorState, DraftEditorCommand, RichUtils, AtomicBlockUtils, convertToRaw, convertFromRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import { mediaBlockRenderer } from "./TextEditorImage";
import { Input, Slider, Select, Button } from "antd";
import { supabase } from "../utils/supabaseClient";
import { MdFormatAlignLeft, MdFormatListBulleted, MdFormatListNumbered, MdFormatBold, MdFormatItalic, MdFormatStrikethrough } from "react-icons/md";
import { BiFontSize } from 'react-icons/bi'


export default function PostViewer({ postid }){


    const { data, error } = await supabase



}