import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-center text-3xl p-5'>Protected Page</p>
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}
