import { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { followUnfollow } from '../../service/data-service';
import OngContext from '../../context/ongContext';

const FollowButton = ({ ong, }) => {
    const [buttomState, toggleButton] = useState(false)
    
    const currentOng = useContext(OngContext)
    useEffect(()=>{
        //console.log(ong.followers,currentOng.state,ong.followers.includes(currentOng.state))
       if(ong.followers.includes(currentOng.state)){        
        toggleButton(true)
       } else {
        toggleButton(false)
       }

    },[])
    const handleFollow = () => {        
        followUnfollow(ong.id).then((res)=>{
            //console.log(res)
             toggleButton(res.follow)
        })
    }

    return (ong.id===currentOng.state? <></> : (
        <button onClick={handleFollow} className={buttomState ? "text-dark rounded-full" : "text-primary rounded-full"}>
            <FontAwesomeIcon
               icon={buttomState ? faMinusCircle : faPlusCircle}
                style={{ fontSize: 25 }}

            />
        </button>
    ));
};

export default FollowButton
