'use client'
import React from 'react' 
import {Inbox} from "lucide-react"
import {useDropzone} from 'react-dropzone'
import { uploadToS3 } from '@/lib/s3'

const MAX_SIZE = 10*1024*1024

type Props = {}

const FileUpload = (props: Props) => {
  const {getRootProps, getInputProps} = useDropzone({
    accept:{'application/pdf':['.pdf']},
    maxFiles:1,
    onDrop: async (files)=>{
     const file=files[0];
     if(file.size>MAX_SIZE){
      alert("Please upload files of size less than 10MB")
      return
     }
     try {
      const data=await uploadToS3(file);
      console.log(data)
     } catch (error) {
      console.log(error)
     }
 
    }
  })
  return (
    <div className='p-2 bg-white rounded-xl'>
        <div {...getRootProps({
             className:'border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col' 
             
        })}>
      <input {...getInputProps()}/>
      <>
      <Inbox className='w-10 h-10 text-blue-500'/>
      <b className='mt-2 text-sm text-slate-400'>Drop PDF here</b>
      </>
      </div>
    </div>
  )
}

export default FileUpload