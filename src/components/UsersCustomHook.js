//6.29
// userAsync를 사용해서 비동기 전송..?
import React,{ useState } from 'react';
import axios from 'axios';
import useAsync from './useAsync';
import User from './User';

// https://joshua1988.github.io/web-development/javascript/js-async-await/   : async와 await 참고하기!
async function getUsers(){
    // UsersReducer에 있는 await 그대로 가져오기!(async가 있어야만 await 사용가능!!!!)
    // 💜response의 값(axios.get('https://jsonplaceholder.typicode.com/users');)을 바로 가져오지 않고 
    // 💜await을 써서! 기다려~기다리고 그 값을 await에 담아줘!
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    return response.data;           //값은 data가 가지고 있음!!     / getUsers()가 실행되면 response.data를 반환함
}

const UserCustomHook = () => {
    //li 항목을 클릭할때마다 userId를 변경할거임
    const [userId, setUserId] = useState(null);
    //fetchDate()라는 함수가 refetch에 담김
    const [state, refetch] = useAsync(getUsers,[],true);        //skip값 true를 줌!
    const { loading, data, error } = state;
    if(loading) return <div>로딩중....</div>
    if(error) return <div>에러가 발생했습니다.</div>
    // if(!data) return null
    if(!data) return <button onClick={refetch}>불러오기</button>;
    return (
        <div>
            <ul>
                {data.map(user=>(
                    <li key={user.id} onClick={()=>{        //하나니까 함수안의 {중괄호} 생략가능! onClick={()=>setUserId(user.id)};
                        setUserId(user.id)
                    }}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={refetch}>다시 불러오기</button>
            {/* userId가 있을 때만 <User id={userId}/>가 나타나게! - &&구문 사용 */}
            {userId && <User id={userId}/>}
        </div>
    );
};

export default UserCustomHook;