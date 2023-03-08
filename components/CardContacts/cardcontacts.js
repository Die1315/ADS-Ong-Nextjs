import Image from 'next/image';

const Contact = ({ name, job, imageSrc }) => {
  return (
    <div className="flex items-center py-2">
      <div className="relative w-12 h-12 mr-3">
        <Image
          src={imageSrc}
          layout="fill"
          objectFit="cover"
          alt={`Profile picture of ${name}`}
          className="rounded-full"
        />
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-900">{name}</h4>
        <p className="text-sm text-gray-500">{job}</p>
      </div>
    </div>
  );
};

const CardContacts = () => {
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
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="font-medium text-gray-900 mb-4">ONGs que te pueden interesar:</h3>
      {contacts.map((contact) => (
        <Contact key={contact.name} {...contact} />
      ))}
    </div>
  );
};

export default CardContacts;
