//6.29
// https://jsonplaceholder.typicode.com/users/3 이렇게 id=3인것의 값들이 나오게!
// id값에 따라 해당 내용들이 나오게 할거임!!!!!
import React from 'react';
import axios from 'axios';
import useAsync from './useAsync';

async function getUser(id) {
    const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users/${id}`
        //백틱안에 달러로 id값을 넣어서 저기 값을 변하게!! 
    );
    return response.data;
}

const User = ({id}) => {
    // id가 바뀔때마다 재호출 되게!! --> id가 변경될때마다 리렌더링(재호출) : useAsync()함수
                            //✔ id값 때문에 함수에 넣어서!! -> callback(); 여기에 id를 넣어야하는데 바로 넣어줄 수 없음!
                            //   함수에 넣고 함수를 또 불러서! id를 부르는거!!!  => 함수에 안 넣어주면 error발생
                            //   useAsync에서 const data = await callback();  -> callback()함수에 넣었음!
    const [state] = useAsync(()=> getUser(id),[id]);        
    const { loading, data, error } = state;
    if(loading) return <div>로딩중....</div>
    if(error) return <div>에러가 발생했습니다.</div>
    if(!data) return null;
    return (
        <div>
            <h2>{data.username}</h2>
            <p>
                Email : {data.email}
            </p>
        </div>
    );
};

export default User;
// UsersCustomHook 가서 