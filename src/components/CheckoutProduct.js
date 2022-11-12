import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React from "react";
import CurrencyFormat from "react-currency-format";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket, selectItems} from "../slices/basketSlice";

function CheckoutProduct({
  id,
  title,
  price,
  description,
  category,
  rating,
  image,
  hasPrime,
}) {

    const dispatch =useDispatch();

    const addItemTobasket=() => {
        const product ={
            id,
            title,
            price,
            description,
            category,
            rating,
            image,
            hasPrime,
        }
        dispatch(addToBasket(product))

    }

    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({id}));
    }

   
  return (
  <div className="grid grid-cols-5">
    <Image src={image} width={200} height={200} />

    <div className="col-span-3 mx-5">

        <p>{title}</p>

        <div className="flex">
            {Array(rating)
            .fill()
            .map((_,i) =>(
                <StarIcon key={i} className="h-5 text-yellow-500"/>
            )
             )}
        </div>

        <p className="text-xs mt-2 my-2 line-clamp-3">{description}</p>

        <CurrencyFormat
          value={price}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"$"}
        />


    </div>
    <div className="flex flex-col space-y-2 my-auto justify-self-end">
    <button className="button text-xs" onClick={addItemTobasket}>Add To Basket</button>
    <button className="button text-xs"onClick={removeItemFromBasket}>Remove from Basket</button>

    </div>
  </div>

  
  );
}

export default CheckoutProduct;
