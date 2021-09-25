import React, { useState } from 'react';
import { dbService } from '../fbInstance';

const Pweet = ({ pweetObj, isOwner }) => {
    const [isEdditing, setIsEdditing] = useState(false);
    const [newPweet, setNewPweet] = useState(pweetObj.text);
    const onDelete = () => {
        console.log("삭제!")
        const ok = window.confirm("진짜 삭제하려고?")
        if (ok) {
            dbService.deleteDoc(dbService.doc(dbService.getFirestore(), `pweets/${pweetObj.id}`))
        }
    }
    const onUpdate = () => {
        const ok = window.confirm("진짜 수정하려고?")

    }
    const onChange = (event) => {//수정할 값을 저장해두자
        const { target: { value } } = event;;
        setNewPweet(value);
    }
    const onSubmit = async (event) => {//저장해준 수정 값을 서버에 업데이트하자
        event.preventDefault();
        dbService.updateDoc(dbService.doc(dbService.getFirestore(), `pweets/${pweetObj.id}`), {
            text: newPweet
        })

        setIsEdditing(false)
    }
    return (
        <div>
            {isEdditing ?
                <form onSubmit={onSubmit}>
                    <input type="text" value={newPweet} onChange={onChange} />
                    <input type="submit" value="수정완료!" />
                </form>
                :
                <div>{pweetObj.text}</div>}
            {isOwner &&
                <>
                    <button onClick={onDelete}>delete</button>
                    <button onClick={() => setIsEdditing(!isEdditing)}>edit</button>
                </>
            }
        </div>
    );
};

export default Pweet;