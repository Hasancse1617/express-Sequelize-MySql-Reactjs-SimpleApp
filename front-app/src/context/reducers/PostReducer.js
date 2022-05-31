import { REMOVE_LOADER, SET_POSTS, SET_LOADER, SET_ERRORS, REMOVE_ERRORS, SET_SUCCESS_MESSAGE, REMOVE_SUCCESS_MESSAGE, SET_SINGLE_POST, REMOVE_SINGLE_POST } from "../types/PostType"

const initState = {
    loading: false,
    posts: [],
    post: {},
    message: "",
    errors: []
}
const PostReducer = (state=initState, action)=>{
     switch(action.type){
        case SET_LOADER:
            return{...state, loading: true}
        case REMOVE_LOADER:
            return{...state, loading: false}
        case SET_POSTS:
            return{...state, posts: action.payload}
        case SET_ERRORS:
            return{...state, errors: action.payload}
        case REMOVE_ERRORS:
            return{...state, errors: []}
        case SET_SUCCESS_MESSAGE:
            return{...state, message: action.payload}
        case REMOVE_SUCCESS_MESSAGE:
            return{...state, message: ""}
        case SET_SINGLE_POST:
            return{...state, post: action.payload}
        case REMOVE_SINGLE_POST:
            return{...state, post: {}}
        default:
            return state;
     }
}
export default PostReducer;