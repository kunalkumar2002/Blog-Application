import "../Styles/create-post.css"

function CreatePost(){
    return (
        
        <div className="create-post">
           <h1>Create Post</h1>

            <form className="form-feald">
                <div className="form-input">
                    <label>Title</label>
                    <input 
                        placeholder="Enter Your Name"
                    />
                </div>

                <div className="form-input">
                    <label>subTitle</label>
                    <input 
                         placeholder="Enter the blog title"
                    />
                </div>

                <div className="form-input">
                    <label>content</label>
                    
                    <textarea
                        placeholder="Describe your blog here..."
                    />
                </div>

                <button className="submit"> submit post</button>

            </form>

        </div>
    )
}
export default CreatePost;
