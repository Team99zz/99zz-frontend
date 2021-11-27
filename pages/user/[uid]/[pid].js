import { useRouter } from "next/router";
import PostViewer from "../../../components/PostViewer";

const User = () => {
    const router = useRouter();
    
    return <PostViewer params={router.query} />

}

export default User;