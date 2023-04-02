import Image from 'next/image';
import FollowButton from '../FollowButton/followButton'

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

const Follow = () => {
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
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="font-medium text-gray-900 mb-4">ONGs con las que conectas:</h3>
      {contacts.map((contact) => (
        <Contact key={contact.name} {...contact} />
      ))}
    </div>
  );
};

export default Follow;
