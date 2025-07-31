import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

export default function Page() {
  const cookieStore = cookies();
  let checkoutUrl = cookieStore.get('T-REX420-checkoutUrl');
  
  redirect(checkoutUrl.value)
  
  return (
  <div className="h-[100vh] grid place-items-center">
    <p>Checking Out...</p>
  </div>
  )
}