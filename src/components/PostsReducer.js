// 내가 해본거
// useReducer()로 https://jsonplaceholder.typicode.com/posts -> posts 받아오기(userId/id/title 만!)
import React,{ useEffect, useReducer } from 'react';
import axios from 'axios';
import '../postsStyle.css';

//초기값
//처음에는 loading도 false / data도 빈 값 / error도 없음(빈값)
const initialState = {
    loading: false,
    data: null,
    error: null
}
//reducer함수
function reducer(state,action){
    switch(action.type){
        case 'LOADING':         //로딩시
        return {
            loading: true,
            data: null,
            error: null
        };
        case 'SUCCESS':         //로딩 성공하여 화면 나올때
        return {
            loading: false,
            data: action.data,
            error: null
        };
        case 'ERROR':           //전송하다가 에러 발생
        return {
            loading: false,
            data: null,
            error: action.error
        };
        default:
        return state;
    }
}
const PostsReducer = (props) => {
    //useReducer(함수,초기값)
    const [ state, dispatch ] = useReducer(reducer,initialState);
    const fetchUsers = async () => {
        dispatch({type: 'LOADING'});
        try{                            // 로딩시 - 로딩된거
            //로딩의 값?(얘를 로딩한 걸 response에 담음)
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
            dispatch({type: 'SUCCESS', data: response.data});                       //로딩 성공 - 성공해서 화면보이는
        }
        catch(e){
            dispatch({type: 'ERROR', error: e});                //전송 에러
        }
    }
    useEffect(()=>{
        fetchUsers();
    },[]);

    const { loading, data, error } = state;             //위에 const [ state, dispatch ]에서 state를 받아주는게 없어서! -> state를 구조분해할당으로 값을 받음
    if(loading) return <div>로딩중...</div>;
    if(error) return <div>에러가 발생했습니다.</div>;
    if(!data) return null;
    return (
        <div>
            <button onClick={fetchUsers} id='postBtn'>다시 불러오기</button>
            <table className='postTable'>
                {data.map(user=>(               //data에 값이 있음! / map()메서드는 key가 필수!
                    <tr key={user.id}>
                        <th>{user.id}</th>
                        <td>{user.userId}</td>
                        <td>{user.title}</td>
                    </tr>
                ))}
            </table>
        </div>
    );
};

export default PostsReducer;

// 💛await과 async
// https://joshua1988.github.io/web-development/javascript/js-async-await/
// 사용법>
// async function 함수명() {
//     await 비동기_처리_메서드_명();
//   }
// -> 먼저 함수의 앞에 async 라는 예약어를 붙입니다. 
//    그러고 나서 함수의 내부 로직 중 HTTP 통신을 하는 비동기 처리 코드 앞에 await를 붙입니다. 
//    여기서 주의하셔야 할 점은 비동기 처리 메서드가 꼭 프로미스 객체를 반환해야 await가 의도한 대로 동작합니다.
//    일반적으로 await의 대상이 되는 비동기 처리 코드는 Axios 등 프로미스를 반환하는 API 호출 함수입니다.

// 💛map()메서드
// https://goddino.tistory.com/95
// *map 함수 구문*
// array.map(callbackFunction(current value, index, array), thisArg)
// - currentValue : 배열 내 현재 값
// - index : 배열 내 현재 값의 인덱스
// - array : 현재 배열
// - thisArg : callbackFunction 내에서 this로 사용될 값

// map() 메서드는 배열 내의 모든 요소를 돌면서 주어진 함수의 결과를 모아 새로운 배열을 리턴합니다. 
// 결과를 "return  ..."  리턴 값으로 추출합니다.
// 단, 실행문이 한 개만 반환될 경우, return 키워드와 {} 를 생략할 수 있습니다. 
// ex>
// cosnt a = numbers.map(number => {
//     return number < 3
//   })
//   //아래로 리팩토링(간결한 코드) 
//   const a = numbers.map(number => number < 3)

//ex>
// 1. map() 예제: string
// let arr1 = [ "월요일", "화요일", "수요일", "목요일", "금요일" ]
// let map1 = arr1.map( item => '출근하는 '+ item );

// console.log(map1);
// 결과: (5) ["출근하는 월요일", "출근하는 화요일", "출근하는 수요일", "출근하는 목요일", "출근하는 금요일"]
 

// 2. map() 예제: number
// let arr2 = [ 1,3,5,7,9 ]
// let map2 = arr2.map( item => item * 2 );

// console.log(map2);
// 결과: (5) [2, 6, 10, 14, 18]
 

// 3. map 함수를 이용하여 원하는 객체 값 추출
// let fruit = [
// {color: "yellow", name:"banana"},
// {color: "red", name:"tomato"},
// {color: "orange", name:"orange"},
// {color: "green", name:"grape"},
// {color: "red", name:"apple"}
// ]
// let fruitColor = fruit.map((item) => item.color);
// console.log(fruitColor);
// 결과: (5) ["yellow", "red", "orange", "green", "red"]
// -> 내가 원하는 과일의 컬러만 추출하여 새로운 배열을 리턴하였습니다.

 

// 4. map 함수를 이용하여 객체 데이터 추출
// - map을 이용하여 배열 데이터를 가지고, 객체 데이터로 새롭게 만들 수 있습니다. 
// const colors = ["yellow", "red", "orange", "green", "red"]
// const a = colors.map((color, index) => {
//   return {
//     id: index,
//     name: color
//   }
// })

// console.log(a);
// //결과: 
// (5) [{…}, {…}, {…}, {…}, {…}]
// 0: {id: 0, name: "yellow"}
// 1: {id: 1, name: "red"}
// 2: {id: 2, name: "orange"}
// 3: {id: 3, name: "green"}
// 4: {id: 4, name: "red"}
 

// 5. 화살표 함수 형식
// - 특정한 실행문이 한 개만 반환될 경우, return 키워드와 {} 를 생략할 수 있습니다.
// - 소가로()로 한번 중가로{}를 감싸 주어야 객체 데이터가 화살표 문법에 의해서 반환됩니다. 

// const colors = ["yellow", "red", "orange", "green", "red"]
// const a = colors.map((color, index) => ({
//     id: index,
//     name: color
//   })