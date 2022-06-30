// useState()로 https://jsonplaceholder.typicode.com/users -> users 불러오기(username/ name만 받아온거)
import React,{ useState, useEffect } from 'react';
import axios from 'axios';

const Users = (props) => {
    //상태관리
    // 1. 요청의 결과
    // 2. 로딩상태
    // 3. 에러
    const [ users, setUsers ] = useState(null);
    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    // - async 비동기함수 앞에 붙여주면(함수앞에 키워드로 async 붙인거)
    const fetchUsers = async ()=>{          
        try {                   //성공  - loading 상태니까 error와 users는 null
            //요청이 시작할 때에는 error와 users를 초기화
            setError(null);
            setUsers(null);
            //loading상태를 true로 변경
            setLoading(true);
            //요청한 데이터는 response.data안에 있습니다.
            const response = await axios.get('https://jsonplaceholder.typicode.com/users');
            //users에 그 데이터를 넣어주면 됨
            setUsers(response.data);
        }                  
        catch(e){               //전송하다가 error가 발생했을 때
            setError(e);
        }
        //try / catch가 끝나면 loading도 끝남
        setLoading(false);
    }
    // *mount될 때 한번만 요청할거임- 요청을 계속계속해서 하면 안됨!!! -> 함수와 배열 넣어줌
    // 원래는 useEffect함수 안에 fetchUsers함수 넣어줬는데 '다시불러오기'버튼 추가하면서 따로 빼준거임!
    useEffect(()=>{                         
        fetchUsers();       //함수 호출해주기
    },[])                   //함수와 배열 넣어줌
    if(loading) return <div>로딩중....</div>;                   //로딩중이면
    if(error) return <div>에러가 발생했습니다.</div>;            //에러가 발생하면
    if(!users) return null;                                    //users가 없으면(!users)
    //로딩중이 아니고 에러가 발생하지 않았고 users결과가 있을 때만, 밑에 얘를 return 하겠다!
    return (
        <div>
            <ul>
                {users.map(user=>(
                    <li key={user.id}>
                        {user.username} ({user.name})
                    </li>
                ))}
            </ul>
            <button onClick={fetchUsers}>다시 불러오기</button>
        </div>
    );
};

export default Users;

//✔ 느리게 보는 법!
//F12 개발자도구
//Network에서 , No throttling을 Slow 3G로 하면 
//화면이 느려져서 로딩중....이 뜸!

//💗TypeScript 나중에 해보기! - 요즘에 뜨는 추세