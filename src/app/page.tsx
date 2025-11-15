// "use client"
import CategoryList from '@/components/CategoryList'
import ProductList from '@/components/ProductList'
import Slider from '@/components/Slider'
import { WixClientContext } from '@/context/wixcontext'
import { useWixClient } from '@/hooks/usewixclient'
import { wixClientserver } from '@/lib/wixclientserver'
import { Suspense } from 'react'


const HomePage = async () => {

  // const wixcontext = useWixClient();

  // useEffect(()=>{
  //   const getProducts = async () =>{
  
  //     const res = await wixcontext.products.queryProducts().find();
  //     console.log(res)
  //   };
  //   getProducts();
  // },[wixcontext])

  // const wixClient = await wixClientserver();

  // const res = await  wixClient.products.queryProducts().find();

  // console.log(res);
  

  return (
    <div>
      <Slider/>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">Featured Products</h1>
        <Suspense fallback={"loding"}>
        <ProductList categoryId={process.env.PRODUCTS_ID!} limit={4}/>
        </Suspense>
      </div>
      <div className="mt-24">
        <h1 className="text-2xl ms-64">Categories</h1>
        <Suspense fallback={"loding"}>
        <CategoryList/>
        </Suspense>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
        <h1 className="text-2xl">New Products</h1>
        <ProductList categoryId={process.env.PRODUCTS_ID!} limit={4}/>
      </div>
    </div>
  )
}

export default HomePage
