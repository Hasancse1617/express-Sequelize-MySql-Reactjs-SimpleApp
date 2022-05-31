import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { deletePost, fetchPosts } from "../../context/actions/PostAction";
import appContext from "../../context/appContext";
import { REMOVE_SUCCESS_MESSAGE } from "../../context/types/PostType";
import Loader from "../loader/Loader";
import moment from "moment";
import Swal from 'sweetalert2';
import toast, {Toaster} from "react-hot-toast";

const Post = () =>{
    const { postState:{posts,loading,message}, postDispatch } = useContext(appContext);
    useEffect(()=>{
        fetchPosts()(postDispatch);
    },[]);
    useEffect(()=>{
        if(message){
            toast.success(message);
            postDispatch({type: REMOVE_SUCCESS_MESSAGE});
            fetchPosts()(postDispatch);
        }
    },[message]);

    const deleteAction = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
              deletePost(id)(postDispatch);
            }
        })
    }

    return !loading?(
        <div className="post-list-area">
            <Toaster position="top-right" reverseOrder={true}/>
            <div className="container">
                <div className="post-list-content">
                    <h3>Post List</h3>
                    
                    <table className="table" style={{width:'100%'}}>
                        <thead>
                        <tr>
                            <th style={{paddingLeft:'70px',width:'50%'}}>Post</th>
                            <th style={{width:'25%'}}>Date</th>
                            <th style={{width:'25%'}}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                           posts? posts.map((post)=>(
                                <tr key={post.id}>
                                    <td style={{paddingLeft:'95px'}}><NavLink to={`/post/${post.id}`}><img width="50" height="50" src={`${post.image}`}/>{ post.title }</NavLink></td>
                                    <td>{ moment().format('MMMM Do YYYY', post.createdAt) }</td>
                                    <td>
                                        <NavLink to={`/edit/${post.id}`} title="Edit"><i className="fa-regular fa-pen-to-square"></i></NavLink>
                                        <a href="#" title="Delete" onClick={()=>deleteAction(post.id)}><i className="fa-solid fa-trash-can"></i></a>
                                    </td>
                                </tr>
                            )):''
                        }
                        </tbody>
                        <tfoot></tfoot>
                    </table>
                </div>
            </div>
        </div>
    ):<Loader/>
}
export default Post;