"use client"

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {



  const router = useRouter()
  const [text, settext] = useState("")

  const createtree = async () => {
    router.push(`/generate?handle=${text}`)
  }

  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
        <div className="flex justify-center flex-col ml-[10vw] gap-3">
          <p className="text-yellow-300 font-bold text-7xl">Everything you</p>
          <p className="text-yellow-300 font-bold text-7xl">are. In one,</p>
          <p className="text-yellow-300 font-bold text-7xl">simple link in bio.</p>
          <p className="text-yellow-300 text-xl my-4">Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.</p>
          <div className="input flex gap-2">
            <input value={text} onChange={(e)=>settext(e.target.value)} type="text" placeholder="Enter your handle" className="bg-white focus:outline-green-800 px-2 py-2 rounded-md"/>
            <button onClick={()=>{createtree()}} className="bg-pink-300 p-4 rounded-full font-semibold">Claim Your TreeLink</button>
          </div>
        </div>
        <div className="flex items-center justify-center flex-col mr-[10vw]">
          <img src="/home.png" alt="home" />
        </div>
      </section>
      <section className="bg-red-700 min-h-[100vh]">
        
      </section>
    </main>
  );
}
