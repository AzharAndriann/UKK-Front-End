import { FileArchive, House } from "lucide-react";

const Sidebar = () =>
{
   return (
      <div className="bg-slate-900 w-[250px] m-5 rounded-xl">
         <div className="text-white flex justify-center items-center text-2xl font-bold mt-5">To Do List</div>
         <a href="/">
            <div className="flex gap-3 bg-slate-800 m-3 ps-4 py-2 rounded-md text-white">
               <House />
               Home
            </div>
         </a>
         <a href="/archive">
            <div className="flex gap-3 bg-slate-800 bg-opacity-20 m-3 ps-4 py-2 rounded-md text-white">
               <FileArchive />
               Archive
            </div>
         </a>
      </div>
   );
}

export default Sidebar