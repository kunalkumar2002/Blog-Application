import "../Styles/updatePost.css";
import { useState, useEffect } from "react";
import { onSnapshot, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePost() {
  const [postupdate, setUpdate] = useState({ title: "", content: "" });
  const { postId } = useParams();
  const navigate = useNavigate();

  let prevTitle = postupdate.subtitle;
  let description = postupdate.content;

  useEffect(() => {
    fetchBlog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchBlog = async () => {
    const postDocRef = doc(db, "Blog-Collection", postId);

    onSnapshot(postDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const postData = {
          id: docSnapshot.id,
          ...docSnapshot.data(),
        };
        setUpdate(postData);
      } else {
        console.log("Document does not exist or there was an error.");
      }
    });
  };

  const handleSubmission = async (e) => {
    e.preventDefault();

    const blogref = doc(db, "Blog-Collection", postId);

    await setDoc(
      blogref,
      { subtitle: postupdate.subtitle, content: postupdate.content },
      { merge: true }
    );

    navigate(`/`);
  };

  return (
    <div className="update-post">
      <h2>Update Post</h2>
      <form onSubmit={handleSubmission} className="form-field">
        <label>Post title</label>
        <input
          type="text"
          placeholder="Enter the blog title"
          value={prevTitle}
          onChange={(e) =>
            setUpdate((prev) => ({ ...prev, subtitle: e.target.value }))
          }
          required
        />
        <label>Post Description</label>
        <textarea
          id="post-details"
          placeholder="Describe your blog here..."
          value={description}
          onChange={(e) =>
            setUpdate((prev) => ({ ...prev, content: e.target.value }))
          }
          required
        />

        <button className="update-post-btn">Update</button>
      </form>
    </div>
  );
}

export default UpdatePost;
