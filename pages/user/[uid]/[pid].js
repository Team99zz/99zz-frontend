import { useRouter } from "next/router";
import PostViewer from "../../../components/PostViewer";
import {useEffect, useState} from "react";
import {convertFromRaw, EditorState} from "draft-js";
import {supabase} from "../../../utils/supabaseClient";

import dynamic from "next/dynamic";

// const PostViewer = dynamic(
//     () => import("../../../components/PostViewer"),
//     { ssr: true }
// )

const User = () => {
    const router = useRouter();

    return <PostViewer data={router.query} />

}

export default User;