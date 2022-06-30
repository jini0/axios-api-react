// 내가 해본거
// useState()로 https://jsonplaceholder.typicode.com/posts -> posts 받아오기(userId/id/title 만!)
import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import '../postsStyle.css';


const Posts = (props) => {
    //상태관리
    const [ users, setUsers ] = useState(null);             //1. 요청의 결과
    const [ loading, setLoading ] = useState(false);        //2. 로딩상태
    const [ error, setError ] = useState(null);             //3. 에러

    const fetchUsers = async ()=>{
        try{                    //loading 상태 성공
            setError(null);
            setUsers(null);
            setLoading(true);
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setUsers(response.data);            //setUsers의 값으로 response.data를 넣어줌!!
        }
        catch(e){
            setError(e);        //에러 발생
        }
        setLoading(false);
    }

    //useEffect 컴포넌트가 렌더링 되는 시점에 요청을 시작
    useEffect(()=>{
        // 여기 안에 넣은걸 따로 빼줌!
        // const fetchUsers = async ()=>{
        //     try{                    //loading 상태 성공
        //         setError(null);
        //         setUsers(null);
        //         setLoading(true);
        //         const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        //         setUsers(response.data);            //setUsers의 값으로 response.data를 넣어줌!!
        //     }
        //     catch(e){
        //         setError(e);        //에러 발생
        //     }
        //     setLoading(false);
        // }
        fetchUsers();
    },[])
    if(loading) return <div>로딩중....</div>;                   //로딩중이면
    if(error) return <div>에러가 발생했습니다.</div>;            //에러가 발생하면
    if(!users) return null; 
    return (
        <div>
            <button onClick={fetchUsers} id='postBtn'>다시 불러오기</button>
            <table className='postTable'>
                {users.map(user=>(
                    <tr key={user.id}>
                        <th>{user.id}</th>
                        <td>{user.userId}</td>
                        <td>{user.title}</td>
                    </tr>
                ))}
            </table>
            {/* <ul>
                {users.map(user=>(
                    <>
                        <li key={user.id}>
                            {user.userId}
                        </li>
                        <li key={user.id}>
                            {user.id} 
                        </li>
                        <li key={user.id}>
                            {user.title}
                        </li>
                    </>
                ))}
            </ul> */}
        </div>
    );
};

export default Posts;