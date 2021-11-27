import { useRouter } from "next/router";
import PostViewer from "../../components/PostViewer";

const User = () => {
    const router = useRouter();
    const { param } = router.query

    switch(param.length){
        case 1:
            return <p>User : {param}</p>;
        case 2:
            return PostViewer({ userid : param[0], postid : param[1]});
        default:
            return <p>User : {param}</p>;
    }
}

export default User; 