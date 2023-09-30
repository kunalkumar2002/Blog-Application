import "../Styles/updatePost.css"
import { useState , useEffect } from "react";
import { onSnapshot ,  doc, setDoc} from "firebase/firestore";
import { db } from "../firebase";
//using useParams to get id from Browser
import { useNavigate, useParams } from "react-router-dom";

function UpdatePost(){

    const [postupdate, setUpdate] = useState({ title: "", content: "" });
    const { postId } = useParams();
    const navigate = useNavigate();

    let prevTitle = postupdate.title;
    let description = postupdate.content;
    //console.log( description)

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
                setUpdate(postData);
            } else {
                // Handle the case where the document does not exist or there is an error
                console.log("Document does not exist or there was an error.");
            }
        });
    };

    

    const handleSubmission = async (e) => {
        e.preventDefault();
       
        const blogref = doc(db , "Blog-Collection" , postId);

        await setDoc(
            blogref ,
            {title : postupdate.title , content : postupdate.content},
            { merge: true }
        );
        //console.log(postupdate.title)
        navigate(`/`)
    }

    return (
        <div className="update-post">
        <h2>Update Post</h2>
        <form onSubmit={handleSubmission} className="form-field">
          <label>Post title</label>
          <input
            type="text"
            placeholder="Enter the blog title"
            value={prevTitle}
            onChange={(e) => setUpdate((prev) =>( { ...prev , title : e.target.value}))}
            required
          />
          <label>Post Description</label>
          <textarea
            id="post-details"
            placeholder="Describe your blog here..."
            value={description}
            onChange={(e) =>setUpdate((prev) =>( { ...prev , content : e.target.value}))}
            required
          />
  
          <button className="update-post-btn" >Update</button>
        </form>
      </div>
    )
}
export default UpdatePost;