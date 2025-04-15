import { Bell } from 'lucide-react';
import dayjs from 'dayjs';


const Navbar = () =>
{
   function getGreeting (): string
   {
      const currentHour = dayjs().hour(); 

      if ( currentHour >= 1 && currentHour <= 11 )
      {
         return 'Good Morning';
      } else if ( currentHour >= 12 && currentHour <= 15 )
      {
         return 'Good Afternoon';
      } else if ( currentHour >= 16 && currentHour <= 18 )
      {
         return 'Good Evening';
      } else
      {
         return 'Good Night';
      }
   }
  return (
     <div className="bg-slate-900 mt-5 me-5 rounded-xl">
        <div className="flex justify-between text-white p-4">
           <div className="flex ms-9 text-2xl font-semibold">Hello, {getGreeting()}</div>
           <div className="flex me-9">
              <Bell size={28} strokeWidth={2.5} />
           </div>
        </div>
     </div>
  );
}

export default Navbar