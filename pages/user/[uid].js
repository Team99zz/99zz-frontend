import { useRouter } from "next/router";
// import PostViewer from "../../components/PostViewer";

const User = () => {
    const router = useRouter();
    // console.log(router)
    return <p>{router.query.uid}</p>;

}

export default User;