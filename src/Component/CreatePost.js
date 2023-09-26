// import { useState } from "react";
import "../Styles/create-post.css"
import { db } from '../firebase'
import { doc, setDoc , collection } from "firebase/firestore"; 
import { useFormInput } from "./Hooks"

function CreatePost(){

    const title  = useFormInput(``);
    const subtitle  = useFormInput(``);
    const content  = useFormInput(``);


    const handleSubmit = async (e)=>{

        e.preventDefault();

        console.log('title' , title);
        console.log('subtitle' , subtitle);
        console.log('content' , content);

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
            
        } catch (error) {
            console.error("Error adding document: ", error);
          }
        

    }

    return (
        
        <div className="create-post">
           <h1>Create Post</h1>

            <form className="form-feald" onSubmit={handleSubmit}>
                <div className="form-input">
                    <label>Your Name</label>
                    <input 
                        // value={title}
                        // onChange={(e)=> setTitle(e.target.value)}
                        {...title}
                        placeholder="Enter Your Name"
                    />
                </div>

                <div className="form-input">
                    <label>Post Title</label>
                    <input 
                        // value={subtitle}
                        // onChange={(e)=> setSubTitle(e.target.value)} 
                        {...subtitle}
                        placeholder="Enter the blog title"
                    />
                </div>

                <div className="form-input">
                    <label>Post Description</label>
                    
                    <textarea
                        // value={content}
                        // onChange={(e)=> setContent(e.target.value)} 
                        {...content}
                        placeholder="Describe your blog here..."
                    />
                </div>

                <button className="submit"> submit post</button>

            </form>

        </div>
    )
}
export default CreatePost;
