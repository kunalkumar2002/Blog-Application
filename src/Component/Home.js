import { useState, useEffect } from 'react'
import { db } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { collection, onSnapshot } from 'firebase/firestore';
import { doc , deleteDoc } from 'firebase/firestore';
import styled from 'styled-components';

import "../Styles/home.css"

//using styled component hare we can also put media queries here also nest this

const BlogHeading = styled.h1`
    color : red;
`;



function Home() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();


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
        //console.log(e); 
        navigate(`/updatePost/${e}`)
    }

    const handleDelete = async (e) => {
       // console.log("delete button pressed",e)
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

    if (posts.length === 0) {
        return (
          <div className="home">
            <BlogHeading>Blog Web App</BlogHeading>
            <h1>Click on the Create Post to Create Blogs</h1>
          </div>
        );
      }

    return (
        <div className="home">
            <BlogHeading>Blog Web App</BlogHeading>
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
                            <button id="update-btn"  onClick={() => handleUpdate(post.id)}>
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
