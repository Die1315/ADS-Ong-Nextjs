import Image from 'next/image';
import FollowButton from '../FollowButton/followButton'
import Link from 'next/link';

const Contact = ({ name, job, imageSrc }) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div className='flex'>
        <div className="relative w-16 h-12 mr-3">
          <Image
            src={imageSrc}
            layout="fill"
            objectFit="cover"
            alt={`Profile picture of ${name}`}
            className="rounded-full"
          />
        </div>
        <div className='w-full'>
          <h4 className="text-sm font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-500">{job}</p>
        </div>
      </div>
      <FollowButton />
    </div>
  );
};

const Following = () => {
  const contacts = [
    {
      name: 'John Doe',
      job: 'Software Engineer',
      imageSrc: 'https://randomuser.me/api/portraits/men/84.jpg',
    },
    {
      name: 'Jane Smith',
      job: 'UX Designer',
      imageSrc: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Bob Johnson',
      job: 'Product Manager',
      imageSrc: 'https://randomuser.me/api/portraits/men/97.jpg',
    },
    {
      name: 'Camila Sanchez',
      job: 'UX Designer',
      imageSrc: 'https://randomuser.me/api/portraits/women/14.jpg',
    },
    {
      name: 'Carl Johnson',
      job: 'Product Manager',
      imageSrc: 'https://randomuser.me/api/portraits/men/17.jpg',
    },
  ];

  return (
    <div className="w-full bg-white rounded-md shadow-sm p-4 flex flex-col gap-5">
      <h3 className="font-medium text-gray-900">ONGs con proyectos recientes:</h3>
      {contacts.map((contact) => (
        <Contact key={contact.name} {...contact}/>
      ))}
      <Link href='/connections' className='w-full text-center text-primary text-sm font-semibold'>Ver más...</Link>
    </div>
  );
};

export default Following;
