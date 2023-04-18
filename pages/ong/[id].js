import { useRouter } from 'next/router'
import ProfileComponent from '../../components/ProfileComponent/profileComponent'
import Navbar from '../../components/Navbar/navbar'
import { useEffect, useState } from 'react'
import { getCurrentOng } from '../../service/data-service'

export default function ProfilePage() {

  const router = useRouter()
  const { id } = router.query
  console.log(id)
  const [idOng, setId] = useState()
  const [ong, setOng] = useState({})

  useEffect(()=>{
    if(router.isReady){
    setId(id)  
    getCurrentOng(false,id).then((ong)=>{
      setOng(ong)
      
    })}
  }, [router.isReady])


  return (
    <div className='w-full flex flex-col justify-center items-stretch'>

      <Navbar />
      <h1>{ong.name}</h1>
      <p className='w-full text-center'>{id}</p>
      <ProfileComponent idOng={id} isOwner={false}/>
      <p>{ong.email}</p>
    </div>
  )
}

