/* eslint-disable react/prop-types */
import { InstagramIcon, MessageCircle, PhoneCallIcon, Trash2, TwitterIcon } from "lucide-react";


let SaleItemComponent = ({ item, handleRemoveItem, index }) => {
    return (
        <div className="card card-compact  bg-base-100 shadow-xl">
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





export const CustomerSaleItemComponent = ({ item }) => {
    return (
        <div className="card car bg-base-100 shadow-xl">
            <figure><img src={item.imageUrl} alt={item.name} className="object-scale-down" /></figure>
            <div className="card-body">
                <h2 className="card-title text-tiny uppercase font-bold">{item.name}</h2>
                <p className="text-default-500">${item.price}</p>
                <div className="card-actions justify-between items-center">
                    <p className="text-sm">Contact Seller</p>
                    <div className="flex gap-2">
                        <PhoneCallIcon className="cursor-pointer" />
                        <MessageCircle className="cursor-pointer" />
                        <InstagramIcon className="cursor-pointer" />
                        <TwitterIcon className="cursor-pointer" />
                    </div>
                </div>
            </div>
        </div>
    )
}


export default SaleItemComponent;