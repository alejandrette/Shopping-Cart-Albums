import { useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { IoMdClose  } from "react-icons/io";

export function Header({ carts }) {
  const [open, setOpen] = useState<boolean>(false)
  console.log(carts)

  return(
    <header className="w-full h-32 flex flex-row font-poppins p-10 items-center justify-between relative">
      <div className="absolute inset-0 bg-[url('../../public/bg-header.png')] bg-cover bg-no-repeat bg-center opacity-20"></div>
      
      <div className="relative z-10 text-3xl pl-10">SoundWave <span className="text-orange-500 font-bold">Store</span></div>
      <div className="relative z-10 text-3xl pr-5 hover:text-orange-500">
        <button onClick={() => setOpen(!open)}>
          <FaCartShopping />
        </button>
      </div>

      {open && (
        <div className="absolute right-5 mt-20 w-64 bg-gray-800 shadow-lg rounded-lg p-4 border z-20">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold mb-3">Shopping Cart</h3>
            <button className="mb-3" onClick={() => setOpen(!open)}><IoMdClose /></button>
          </div>
          <ul>
            {carts.length === 0
              ? <span>The cart is empty</span>
              : (
                carts.map(cart => (
                  <li key={cart.id} className="border-b py-2">{cart.title} - ${cart.price}</li>
                ))
              )
            }
          </ul>
          <button className="mt-3 w-full bg-red-500 text-white py-2 rounded">Pagar</button>
        </div>
      )}
    </header>
  )
}
