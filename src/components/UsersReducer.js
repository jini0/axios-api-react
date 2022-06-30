//useEffect, useState 대신에 useReducer 써서 하기 (https://jsonplaceholder.typicode.com/users -> users 불러오기)(username/ name만 받아온거)
import React,{ useReducer, useEffect } from 'react';
import axios from 'axios';

//*useReducer() - 초기값, reducer함수생성   / cf.초기값은 바로 넣어줘도 됨!
//*loading, data, error를 관리해주는 객체를 만들거임
// 초기값
const initialState = {
    loading: false,
    data: null,
    error: null
}
// reducer함수
function reducer(state,action){
    switch(action.type){
        case 'LOADING':
        return {
            loading: true,
            data: null,
            error: null
        };
        case 'SUCCESS':
        return {
            loading: false,
            data: action.data,
            error: null
        };
        case 'ERROR':
        return {
            loading: false,
            data: null,
            error: action.error
        };
        default:
        return state;
    }
}
const UsersReducer = (props) => {
    // useReducer() : 하나의 상태를 관리(하나의 묶음으로 만들어서 관리) 
    // useState() : 각각 만듬  -> 하나의 묶음으로 만들 수도 있긴함!
    const [ state, dispatch ] = useReducer(reducer,initialState);
    const fetchUsers = async () => {
        dispatch({type: 'LOADING'});
        try{
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            dispatch({ type: 'SUCCESS', data:response.data });
        }
        catch(e){
            dispatch({ type: 'ERROR', error:e });
        }
    }
    useEffect(()=>{
        fetchUsers();
    },[]);

    //state를 구조분해할당으로 받은거
    const { loading, data, error } = state;
    if(loading) return <div>로딩중....</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!data) return null
    return (
        <div>
            <ul>
                {data.map(user=>(
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </div>
    );
};

export default UsersReducer;