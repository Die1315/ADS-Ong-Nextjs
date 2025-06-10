import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import ProfileComponent from '../../components/ProfileComponent/profileComponent'
import Navbar from '../../components/Navbar/navbar'
import Loading from "../../components/Loading/loading";



export default function ProfilePage() {
  
  const router = useRouter()
  const { id } = router.query
    const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, []);


  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='w-full flex flex-col justify-center items-stretch'>
          <Navbar />
          <ProfileComponent idOng={id} isOwner={false} />
        </div>
      )}
    </>
  );
}