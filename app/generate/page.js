"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";


const Generate = () => {
  const router = useRouter()



    


  const searchparams=useSearchParams()

  const [links, setLinks] = useState([{ link: "", linktext: "" }]);
  const [handle, sethandle] = useState(searchparams.get('handle'));
  const [pic, setpic] = useState("");
  const [desc, setdesc] = useState("")

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    setLinks((initialLinks) => {
      return initialLinks.map((item, i) => {
        if (i === index) {
          return { ...item, [name]: value }; // Update only the corresponding field
        } else {
          return item;
        }
      });
    });
  };

  const addlink = () => {
    setLinks(links.concat([{link:"",linktext:""}]))
  }

  const submitLinks = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      links: links,
      handle: handle,
      pic: pic,
      desc: desc,
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const r = await fetch("http://localhost:3000/api/add", requestOptions);
    const result = await r.json();
    if(result.success){
      toast.success(result.message);
      setLinks([{links:"",linktext:""}])
      sethandle("")
      setpic("")
      setdesc("")
      router.push(`${handle}`)
    }
    else{
      toast.error(result.message);
    }
    
  };

  return (
    <div className="bg-[#d6a337] min-h-screen grid grid-cols-2 text-gray-800">
      <div className="col1 flex justify-center items-center flex-col">
        <div className="flex flex-col gap-5 my-5">
          <h1 className="font-bold text-4xl ">Create Your TreeLink</h1>
          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 1: Claim Your Handle
            </h2>
            <div className="mx-4">
              <input
                value={handle || ""}
                onChange={(e) => {
                  sethandle(e.target.value);
                }}
                className="bg-white my-2 px-4 py-2 focus:outline-yellow-800 rounded-3xl w-full"
                type="text"
                placeholder="Choose a handle"
              />
            </div>
          </div>
          <div className="item">
            <h2 className="font-semibold text-2xl">Step 2: Add Links</h2>

{links.map((item, index) => (
        <div key={index} className="mx-4 flex flex-col gap-2">
          <div className="flex">
            
            <input
              name="linktext"
              value={item.linktext}
              onChange={(e) => handleChange(e, index)} // Pass the index to handleChange
              className="bg-white px-4 py-2 mx-2 my-2 focus:outline-yellow-800 rounded-3xl"
              type="text"
              placeholder="Enter link text"
            />
            <input
              name="link"
              value={item.link}
              onChange={(e) => handleChange(e, index)} // Pass the index to handleChange
              className="bg-white px-4 py-2 mx-2 my-2 focus:outline-yellow-800 rounded-3xl"
              type="text"
              placeholder="Enter link"
            />
          </div>
        </div>
      ))}

            <button
              onClick={(e) => addlink()}
              className="mx-6 p-5 py-2 bg-yellow-900 text-white font-bold rounded-3xl"
            >
              Add Link
            </button>
          </div>
          <div className="item">
            <h2 className="font-semibold text-2xl">
              Step 3: Add Picture and Description
            </h2>
            <div className="mx-4 flex flex-col">
              <input
                value={pic || ""}
                onChange={(e) => {
                  setpic(e.target.value);
                }}
                className="bg-white px-4 py-3 mx-2 my-2 focus:outline-yellow-800 rounded-3xl"
                type="text"
                placeholder="Enter link of your picture"
              />
              <input
                value={desc || ""}
                onChange={(e) => {
                  setdesc(e.target.value);
                }}
                className="bg-white px-4 py-3 mx-2 my-2 focus:outline-yellow-800 rounded-3xl"
                type="text"
                placeholder="Enter Description"
              />
              <button disabled={pic=="" || handle=="" || links[0]==""} onClick={e=>submitLinks()} className="disabled:bg-yellow-100 mx-2 p-5 py-3 my-3 bg-yellow-900 text-white font-bold rounded-3xl">
                Create your TreeLink
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="col2 w-full h-screen">
        <img
          className="h-full object-contain"
          src="/generate.png"
          alt="generate your links"
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default Generate;
