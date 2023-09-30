import { useState, useEffect } from 'react'
import { db } from '../firebase';
import { Link } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { doc , deleteDoc } from 'firebase/firestore';
import "../Styles/home.css"




function Home() {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        fetchBlog();
    }, [])

    const fetchBlog = async () => {

        //through this we cant able to get real time update 
        // const querySnapshot = await getDocs(collection(db, "Blog-Collection"));

        // let blog = querySnapshot.docs.map((post) => {
        //     return {
        //         id: post.id,
        //         ...post.data()
        //     };
        // })

        //for geting realtime update

        onSnapshot(collection(db, "Blog-Collection"), (querySnapshot) => {
            let blogLoader = querySnapshot.docs.map((doc) => {
              return {
                id: doc.id,
                ...doc.data(),
              };
            });
            //console.log(blogLoader);
            blogLoader.sort((a, b) => b.createdOn - a.createdOn);
            setPosts(blogLoader);
          });

        
    }

    const handleUpdate = (e) =>{
        console.log(e);
    }

    const handleDelete = async (e) => {
        console.log("delete button pressed",e)
        // through this method we can on delete task on localy but after refreshing all task againg get reloded from cloud

        // posts.splice(e , 1);
        // let newlist = [...posts]
        // setPosts(newlist)

        //deleting from firebase
         try{
            const blogref = doc(db , "Blog-Collection" , posts[e].id)
            // console.log(blogref);
            await deleteDoc(blogref)
         }catch(error){
            console.log("geting some error" , error)
         }

    }

    return (
        <div className="home">
            <h1>Blog Web App</h1>
            {
                posts.map((post, index) => (
                    <div className='post' key={index}>
                        <div className='blog-section'>
                            <Link to={`/post/${post.id}`} className="custom-link">
                                <h3>{post.subtitle}</h3>
                            </Link>
                            <p>Created By - {post.title}</p>
                            <p>Date Added - {post.createdAT.toDate().toLocaleString()}</p>
                        </div>
                        
                        <div id="message">Click on the blog title to read the post</div>

                        <div className="btn-ctn">
                            <button id="update-btn"  onClick={handleUpdate}>
                            Update
                            </button>
                            <button id="delete-btn" onClick={() => handleDelete(index)}>
                            Delete
                            </button>
                        </div>
                    </div>
                    
                ))
            }
        </div>
    )
    

}

export default Home;
