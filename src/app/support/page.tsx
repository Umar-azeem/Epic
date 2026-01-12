import Cart from '@/src/components/cart'
import Gift from '@/src/components/gift'
import Wishlist from '@/src/components/wishList'
import React from 'react'

function page() {
  return (
   <>
   <div className='h-full '>
    <Cart/>
    <Gift/>
   </div>
<Wishlist/>
  </>
  )
}

export default page