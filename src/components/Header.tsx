import { FaCartShopping } from "react-icons/fa6";

export function Header() {

  return(
    <header className="w-full h-32 flex flex-row font-poppins p-10 items-center justify-between relative">
      <div className="absolute inset-0 bg-[url('../../public/bg-header.png')] bg-cover bg-no-repeat bg-center opacity-20"></div>
      
      <div className="relative z-10 text-3xl pl-10">SoundWave <span className="text-orange-500 font-bold">Store</span></div>
      <div className="relative z-10 text-3xl pr-5 hover:text-orange-500">
        <FaCartShopping />
      </div>
    </header>
  )
}
