import { orderBy, query } from '@firebase/firestore';
import React, { useEffect, useState } from 'react';
import Pweet from '../components/Pweet';
import { dbService } from '../fbInstance'
const Home = ({ userObj }) => {
    const [pweet, setPweet] = useState("");
    const [pweets, setPweets] = useState([]);
    const onSubmit = async (event) => {//데이터 보내기
        event.preventDefault();
        //console.log(userObj.uid)
        await dbService.addDoc(
            dbService.collection(dbService.getFirestore(), "pweets"), {
            text: pweet,
            createdAt: Date.now(),
            uid: userObj.uid,
        })
        setPweet("")
        console.log("제출완료!")
    }
    const onChange = (event) => {//입력값 동기화
        const {
            target: { value }
        } = event;
        console.log(value);
        setPweet(value);
    }
    useEffect(async () => {//데이터 받아오기
        const q = query(dbService.collection(dbService.getFirestore(), "pweets"), dbService.orderBy("createdAt", "desc"))
        dbService.onSnapshot(q, querySnapShot => {
            const pweetObjs = querySnapShot.docs.map(pweet => ({
                //  뭔가 더 넣었던 것같은데 기억이 안난다. key값에 넣을 id였다
                id: pweet.id,
                ...pweet.data()

            }))
            setPweets(pweetObjs)
            console.log("pweetObjs", pweetObjs)
            console.log("pweets", pweets)

        })
    }, [])


    return (
        <div>
            <div>HomePage</div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's New???" onChange={onChange} value={pweet} required />
                <input type="submit" />
            </form>
            <div>
                {pweets.map(pweetObj =>
                    <Pweet key={pweetObj.id} pweetObj={pweetObj} isOwner={userObj.uid === pweetObj.uid} />
                )}

            </div>
        </div>
    );
};


export default Home;