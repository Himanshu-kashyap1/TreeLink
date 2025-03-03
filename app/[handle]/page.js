
import Link from 'next/link'
import clientPromise from '@/lib/mongodb'
import { notFound } from 'next/navigation'

export default async function Page({ params }) {
    const { handle } = await params
    const client = await clientPromise
    const db=client.db("treelink")
    const collection=db.collection("links")

    const item=await collection.findOne({handle:handle})
    if(!item){
        return notFound()
    }

    return <div className="flex min-h-screen bg-purple-400 justify-center items-start py-10">
        <div className="photo flex flex-col items-center gap-4">
            <img className="w-30 h-30 object-fit rounded-4xl" src={item.pic} alt="profile photo" />
            <span className="font-bold text-xl">@{item.handle}</span>
            <span className='font-semibold'>{item.desc}</span>
            <div className="links">
                {item.links.map((item,index) => {
                    return (<Link key={index} href={item.link}><div className="py-4 shadow-lg px-2 rounded-md bg-purple-100 my-3 min-w-xs text-center">
                        {item.linktext}                      
                    </div></Link>)
                })}
            </div>
        </div>
    </div>
  } 