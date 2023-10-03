// import { useState } from "react";
import styles from "../Styles/createPost.module.css"
import { db } from '../firebase'
import { doc, setDoc , collection } from "firebase/firestore"; 
import { useFormInput } from "./Hooks"
import { useNavigate } from "react-router-dom";

function CreatePost(){

    const title  = useFormInput(``);
    const subtitle  = useFormInput(``);
    const content  = useFormInput(``);
    const navigate = useNavigate();


    const handleSubmit = async (e)=>{

        e.preventDefault();

        // console.log('title' , title);
        // console.log('subtitle' , subtitle);
        // console.log('content' , content);

        // db.collection('post').add({
        //     title: title.value,
        //     content : content.value,
        //     subtitle : subtitle.value,
        //     createdAT : new Date()
        // })

        const ref = doc(collection(db , "Blog-Collection" ));

        const data = {
            title: title.value,
            content : content.value,
            subtitle : subtitle.value,
            createdAT : new Date()

        }
        try{
            await setDoc(ref , data);

            //clearing the input fields using the rset function
            title.onChange({ target: { value: '' } });
            subtitle.onChange({ target: { value: '' } });
            content.onChange({ target: { value: '' } });

            navigate(`/`)
            
        } catch (error) {
            console.error("Error adding document: ", error);
          }
        

    }

    return (
        
        <div className={styles.createPost}>
           <h1>Create Post</h1>

            <form className={styles.formfeald} onSubmit={handleSubmit}>
                <div className="form-input">
                    <label>Your Name</label>
                    <input 
                        // value={title}
                        // onChange={(e)=> setTitle(e.target.value)}
                        {...title}
                        placeholder="Enter Your Name"
                    />
                </div>

                <div className={styles.formInput}>
                    <label>Post Title</label>
                    <input 
                        // value={subtitle}
                        // onChange={(e)=> setSubTitle(e.target.value)} 
                        {...subtitle}
                        placeholder="Enter the blog title"
                    />
                </div>

                <div className={styles.formInput}>
                    <label>Post Description</label>
                    
                    <textarea
                        // value={content}
                        // onChange={(e)=> setContent(e.target.value)} 
                        {...content}
                        placeholder="Describe your blog here..."
                    />
                </div>

                <button className={styles.submit}> submit post</button>

            </form>

        </div>
    )
}
export default CreatePost;
