//6.29 
import { useReducer, useEffect } from 'react';

//UsersReducer에서 초기값 그대로 가져오기
const initialState = {
    loading: false,
    data: null,
    error: null
}
//UsersReducer에서 reducer함수 그대로 가져오기
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
//함수형 컴포넌트 
function useAsync(callback, deps = [], skip = false){                 
    //💙callback에는 UsersCustomHook.js의 getUsers()가 담김!!!💙
    //우선 deps의 초기값으로 [빈배열] 넣어줌 (매개변수 default => 받은게 없으면 빈배열!) 
    const[state, dispatch] = useReducer(reducer,initialState);
    //initialState : 초기값을 위에처럼 객체를 따로 변수로 해서 변수만 적어줘도 되고 이 자리에 바로 저거 다 적어줘도 됨!
    const fetchDate = async () => {
        dispatch({ type: "LOADING"});
        //try catch 구문
        try{                    //성공시
            const data = await callback();          // -> 💜데이터의 값을 바로 뿅 나타내는게 아니고 callback()이 다 완료되면 나타나라!!(await 기다려라..!!)
            dispatch({
                type:"SUCCESS",
                data: data
            })
        }
        catch(e){               //자동으로 error
            dispatch({
                type:"ERROR",
                error: e
            })
        }
    }
    useEffect(()=>{
        //조건 추가! skip이 true면 리턴 fetchDate()실행 안됨  / skip이 true면 return!
        if(skip) return;        
        //skip이 false면 fetchDate()가 실행됨
        fetchDate();
        // 🧡eslint 설정을 다음 줄에서만 비활성화 (다음 줄에서만 eslint 설정을 비활성화 하겠다)  / 이거 해줘야 deps에 노란줄이 사라짐!!!!
        // eslint-disable-next-line         
    }, deps);
    return [state, fetchDate];
}
export default useAsync;
