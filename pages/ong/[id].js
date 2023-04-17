import { useRouter } from 'next/router'
import ProfileComponent from '../../components/ProfileComponent/profileComponent'
import Navbar from '../../components/Navbar/navbar'

export default function ProfilePage({ ong }) {

  const router = useRouter()
  const { id } = router.query

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  return (
    <div className='w-full flex flex-col justify-center items-stretch'>

      <Navbar />
      <h1>{ong.name}</h1>
      <p className='w-full text-center'>{id}</p>
      <ProfileComponent />
      <p>{ong.email}</p>
    </div>
  )
}

export async function getServerSideProps({ params }) {
  const id = params.id
  const res = await fetch(`http://localhost:3000/api/ongs/profile#${id}`)
  const ong = await res.json()

  return {
    props: {
      ong,
    },
  }
}
