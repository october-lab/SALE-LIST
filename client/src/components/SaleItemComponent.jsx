/* eslint-disable react/prop-types */
import { InstagramIcon, MessageCircle, PhoneCallIcon, Trash2, TwitterIcon } from "lucide-react";


let SaleItemComponent = ({ item, handleRemoveItem, index }) => {
    return (
        <div className="card card-compact  bg-base-100 shadow-xl border-2 border-neutral ">
            <figure><img src={item.imageUrl} alt={item.name} className="object-scale-down" /></figure>
            <div className="card-body">
                <h2 className="card-title text-tiny uppercase font-bold">{item.name}</h2>
                <p className="text-default-500">${item.price}</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-square btn-sm" onClick={() => handleRemoveItem(index)}>
                        <Trash2 size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}




export const InventoryItemComponent = ({ item }) => {
    const imageUrl = item.imageUrl ? item.imageUrl : URL.createObjectURL(item.image);
    return (
        <div
            className="aspect-square rounded-lg hover:scale-105 cursor-pointer"
        >
            <figure>
                <img src={imageUrl} alt={item.name} className="w-full h-full rounded-md object-cover" />
            </figure>
            <div className="flex flex-row justify-between text-white mt-2">
                <h2 className="font-light text-sm">{item.name}</h2>
                <p className="text-default-500 text-sm">${item.price}</p>
            </div>

        </div>

    )
}





export const CustomerSaleItemComponent = ({ item }) => {
    return (
        <div>
            <div className="flex flex-col items-center bg-white text-white p-1 rounded-lg shadow-lg border border-gray-600">
                <figure className="">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-auto object-cover rounded-md" />
                </figure>
            </div>
            <div className="text-left">
                <h2 className="text-lg font-medium  mb-1">{item.name}</h2>
                <p className="text-md font-thin ">${item.price}</p>
            </div>
        </div>


    )
}


export default SaleItemComponent;