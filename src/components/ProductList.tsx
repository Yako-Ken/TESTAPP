import { wixClientserver } from '@/lib/wixclientserver';
import { products } from '@wix/stores';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const ProductList = async ({categoryId,limit}:{categoryId:string,limit?:number}) => {

   const wixClient = await wixClientserver();

  // const res = await  wixClient.products.queryProducts().eq("collectionIds" as any,categoryId).limit(limit||20).find();

const res = await wixClient.products
  .queryProducts()
  .limit(4)
  .find();

console.log(res.items[0]); 

  return (
    <div className="mt-12 mb-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
      {res.items.map((product: products.Product) => (
        <Link
          href={"/"+product.slug}
          key={product._id}
          className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
        >
          <div className="relative w-full h-80">
            <Image
              src={product.media?.mainMedia?.image?.url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
            />
            {product.media?.items && (
              <Image
              src={product.media?.items[1].image?.url || "/product.png"}
              alt=""
              fill
              sizes="25vw"
              className="absolute object-cover rounded-md"
              />
            )
            }
          </div>
          <div className="flex justify-between">
            <span className="font-medium">{product.name}</span>
            <span className="font-semibold">LE{product.price?.price}</span>
          </div>
          <div 
  className="text-sm text-gray-500"
  dangerouslySetInnerHTML={{
    __html: DOMPurify.sanitize(
      product.additionalInfoSections?.find(
        (section: any) => section.title === "shortDesc"
      )?.description || ""
    )
  }}
/>
          <button className="rounded-2xl ring-1 ring-importantcolor w-max text-importantcolor py-2 px-4 text-sm hover:bg-importantcolor hover:text-white">
            Add To Cart
          </button>
        </Link>
      ))}
    </div>
  );
};

export default ProductList
