import { useRouter } from "next/router";
// import PostViewer from "../../../components/PostViewer";
import {useEffect, useState} from "react";
import {convertFromRaw, EditorState} from "draft-js";
import {supabase} from "../../../utils/supabaseClient";

import dynamic from "next/dynamic";

const PostViewer = dynamic(
    () => import("../../../components/PostViewer"),
    { ssr: false }
)

const User = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [loadedData, setLoadedData] = useState('')


    useEffect(()=>{

        getPosting(router.query.pid);
    })

    async function getPosting(pid) {
        try {
            setLoading(true);

            let {posting, error} = await supabase
                .from('posting')
                .select('*')
                .eq('id', pid)
                .single();

            setLoadedData(posting)
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

    console.log(loadedData)

    return <PostViewer data={loadedData} />

}

export default User;