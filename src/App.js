import React, {useEffect, useReducer} from "react";
import Loading from "./Components/Loading";
import Toast from "./Components/Toast";


const initState = {
    message: {message: "", type: "success"},
    title: '',
    id: 1,
    loader: true
}

function reducer(state, action) {
    switch (action.type) {
        case 'GET_POST_SUCCESS':
            return {
                ...state,
                message: action.message,
                title: action.title,
                loader: false
            }
        case 'GET_POST_REQUEST':
            return {
                ...state,
                id: action.id,
                loader: true
            }
        default:
            return state;
    }
}

export default function App() {

    const [{message, title, id, loader}, dispatch] = useReducer(reducer, initState)


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())
            .then(r => {
                dispatch({
                    title: r.title,
                    loader: false,
                    message: {message: r.title, type: "success"},
                    type: 'GET_POST_SUCCESS'
                });
            })
    }, [id])

    function changeHandler(event) {
        dispatch({
                loader: true
                , id: event.target.value,
                type: 'GET_POST_REQUEST'
            }
        );
    }

    return <div>
        <div>
            <label>id : </label>
            <input onChange={changeHandler} value={id} type="number"/>
        </div>
        <div>
            {!loader && <h2>title: {title}</h2>}
            {loader && <Loading/>}
        </div>
        <Toast message={message.message} type={message.type}/>
    </div>
}