"use client"

import FileUpload from "@/components/ui/FileUpload";
import { Button } from "@/components/ui/button";
import { UserButton, useClerk } from "@clerk/nextjs";
import { clients } from "@clerk/nextjs/api";
import { LogIn } from "lucide-react";
import Link from "next/link";



export default function Home() {
  const { user } = useClerk();
  const isAuth = !!user;
  return (
   <>
  <div className="w-screen min-h-screen bg-gradient-to-r from-rose-100 to-teal-100">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex flex-col items-center text-center">
       <div className="flex items-center">
        <h1 className="mr-3 text-5xl font-semibold font-serif">Chat with any pdf</h1>
        <UserButton afterSignOutUrl="/"/>
       </div>
       <div className="flex mt-2">
        {isAuth &&
      <Button>Go to chats</Button>
        }
       </div>
       <p className="max-w-xl mt-3 text-lg text-slate-600">Welcome to chat-pdf, you're one stop solution to have your cv reviewed. the reviews are based on input data that is fed to me, by distinguished alums of iitkgp</p>

       <div className="w-full mt-4">{
        isAuth ?
        (<FileUpload/>)
        :
        (<Link href="/sign-in">
        <Button className="gap-3">
          Login to get started
          <LogIn className="w-4 h-4"/>
          </Button></Link>)
       }
       </div>
      </div>
      </div>
  </div>
   </>
  )
};
