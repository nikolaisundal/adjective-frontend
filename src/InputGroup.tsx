import React from 'react'
import AddInput from './AddInput';

interface InputGroupProps {
    handleAdd: (name: string, inputValue: string) => void;
    handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
    isLoading: boolean;
  
  }

export default function InputGroup({handleAdd, handleSubmit, isLoading}:InputGroupProps ) {
  return (
    <>
        <h1 className="text-center text-4xl mb-10">
        Welcome to adjective!
        </h1>
        <div className='flex flex-col sm:flex-row justify-evenly mb-10 w-full lg:w-[1000px] mx-auto'>
        <div className='mx-auto'>
          <AddInput
            handleAdd={handleAdd}
            name={"names"}
            />
          <AddInput
            handleAdd={handleAdd}
            name={"mood"}
            />
        </div>
        <div className='mx-auto'>
          <AddInput
            handleAdd={handleAdd}
            name={"adjectives"}
            />
          <AddInput
            handleAdd={handleAdd}
            name={"setting"}
            />
        </div>
        </div>
        <div className='w-full flex justify-center'>
            {!isLoading ?
            <button className="bg-purple-400 border border-black rounded-lg p-2 w-48"
              onClick={handleSubmit}>
            Generate Story!
            </button>:
            <div className="bg-green-400 border border-black rounded-lg p-2 animate-bounce w-48 text-center">
            Generating Story..
            </div>
            }
        </div>
    </>
  )
}
