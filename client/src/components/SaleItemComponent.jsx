/* eslint-disable react/prop-types */
import { Card, CardHeader, CardBody, CardFooter, Divider, Button, Image } from "@nextui-org/react";
import { InstagramIcon, MessageCircle, PhoneCallIcon, Trash2, TwitterIcon } from "lucide-react";


let SaleItemComponent = ({ item, handleRemoveItem, index }) => {
    return (
        <div>
            <Card className="py-4">
                <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{item.name}</p>
                    <small className="text-default-500">${item.price}</small>
                </CardHeader>
                <CardBody className="overflow-visible py-2">
                    <Image
                        alt={item.name}
                        className="object-scale-down rounded-xl"
                        src={item.imageUrl}
                        width={270}
                    />
                </CardBody>
                <Button
                    isIconOnly
                    color="danger"
                    variant="light"
                    onClick={() => handleRemoveItem(index)}
                    className="absolute top-2 right-2"
                >
                    <Trash2 size={20} />
                </Button>

            </Card>
        </div>
    )
}





export const CustomerSaleItemComponent = ({ item }) => {
    return (
        <div>
            <Card className="">
                <CardHeader className="pb-0 pt-2  flex-col items-start">
                    <p className="text-tiny uppercase font-bold">{item.name}</p>
                    <small className="text-default-500">${item.price}</small>
                </CardHeader>
                <CardBody className="overflow-visible p-1">
                    <Image
                        alt={item.name}
                        className="object-scale-down"
                        src={item.imageUrl}
                        width={270}
                    />
                </CardBody>
                <CardFooter className=" bg-black/70 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">

                    <div className="flex flex-grow gap-2 items-center">
                        <div className="flex flex-col">
                            <p className="text-tiny text-white/60">Contact Seller</p>
                        </div>
                    </div>
                    <div className="flex gap-2 text-white ">
                        <PhoneCallIcon className="cursor-pointer" />
                        <MessageCircle className="cursor-pointer" />
                        <InstagramIcon className="cursor-pointer" />
                        <TwitterIcon className="cursor-pointer" />
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}


export default SaleItemComponent;