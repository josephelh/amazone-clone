import Image from "next/image";
import React, { useEffect } from "react";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import CheckoutProduct from "../components/CheckoutProduct";
import Header from "../components/Header";
import { selectItems, selectTotal } from "../slices/basketSlice";
import { useSession } from "next-auth/react";

function Checkout() {

  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session } =useSession();

  useEffect(() => {
   console.log(items.length)
  }, []);




  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-2xl mx-auto">
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1080}
            height={260}
            alt="abc"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket is empty."
                : "your Shopping Basket"}
            </h1>

            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                price={item.price}
                description={item.description}
                category={item.category}
                image={item.image}
                hasPrime={item.hasPrime}
              />
            ))}
          </div>
        </div>

        { /*Right Side */ }
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal {items.length} items:{" "}
                <span className="font-bold">
                 <CurrencyFormat
                  value={total}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                  />
                </span>
              </h2>
              <button
              disabled={!session}
               className={` button mt-2 ${!session && 'from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed'}`}>
                {!session ? "Sign in to Chekout" : "Proceed to Chekout" }
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Checkout;
