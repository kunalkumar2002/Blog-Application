import { useState , useEffect } from "react";
import { onSnapshot ,  doc} from "firebase/firestore";
import { db } from "../firebase";
//using useParams to get id from Browser
import { useNavigate, useParams } from "react-router-dom";
import "../Styles/post.css"

function PostDetail(){

    const [postdetail, setPostsdetail] = useState([]);
    const {postId} = useParams();
    const navigate = useNavigate();
    //console.log(postId)

    useEffect(() => {
        fetchBlog();
    }, [])

    const fetchBlog = async () => {
        const postDocRef = doc(db, "Blog-Collection", postId);

        onSnapshot(postDocRef, (docSnapshot) => {
            if (docSnapshot.exists()) {
                // If the document with the provided postId exists
                const postData = {
                    id: docSnapshot.id,
                    ...docSnapshot.data(),
                };
                //console.log(postData)
                setPostsdetail(postData);
            } else {
                // Handle the case where the document does not exist or there is an error
                console.log("Document does not exist or there was an error.");
            }
        });
    };

    const handleUpdate = () =>{
        navigate(`/updatePost/${postId}`)
    }

    return (
        <div className="post-handling">
           <h1>{postdetail.subtitle}</h1>
           <p className="postHandling">{postdetail.content}</p>
           <div className="update">
                <button onClick={handleUpdate} className="handling-my-button">Update</button>
           </div>

        </div>
    )
}
export default PostDetail;