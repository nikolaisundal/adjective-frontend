import React, {useEffect, useState} from 'react'
import StoryListItem from './StoryListItem';

interface Prompt {
  names: { word: string; id: string }[];
  adjectives: { word: string; id: string }[];
  setting: string;
  mood: string;
  [key: string]: any;
}

interface StoryListItemProps {
  handleOnChange: (params: {
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    name: string;
    id?: string;
  }) => void;
  handleRemove: (params: {
    name: string;
    id?: string;
  }) => void;
  id?: string;
  prompt: Prompt;
} 



export default function StoryItemGroup({prompt, handleOnChange, handleRemove }: StoryListItemProps) {
  return (
    <div className='mt-10 flex flex-col sm:flex-row sm:justify-evenly w-fit sm:w-[34rem] lg:w-[50rem] max-w-4xl h-auto mx-auto'>

        <div className='p-4 sm:w-96'>
          <div className='mb-4'>
          <h1 className='font-bold mr-1'>
            Names:
          </h1>
            <ul>
              {prompt.names.length > 0?
              prompt.names.map((name) =>
                <li key={name.id}>
                  <StoryListItem
                    name={"names"}
                    word={name.word}
                    id={name.id}
                    handleOnChange={handleOnChange}
                    handleRemove={handleRemove}
                    colour={"bg-blue-500"}
                  />
                </li>
              )
              :
              <div className={`border-2 p-2 mt-2 mx-auto sm:mr-2 border-black whitespace-pre-wrap bg-blue-500 rounded-lg w-60 cursor-pointer min-h-[3rem] font-bold`}
                >
                <p className='text-center text-gray-200'>
                {"<Empty>"}
                </p>
              </div>}   
            </ul>
          </div>
          <div className='mb-4'>
          <h1 className='font-bold mr-1'>
            Mood:
          </h1> 
          <ul>
              <li >
                <StoryListItem
                  name={"mood"}
                  word={prompt.mood}
                  handleOnChange={handleOnChange}
                  handleRemove={handleRemove}
                  colour={"bg-purple-800"}
                />
              </li>
            </ul> 
          </div>
          <div className='mb-4'>
          <h1 className='font-bold mr-1'>
            Setting:
          </h1>
            <ul>
              <li >
                <StoryListItem
                  name={"setting"}
                  word={prompt.setting}
                  handleOnChange={handleOnChange}
                  handleRemove={handleRemove}
                  colour={"bg-teal-500"}
                />
              </li>
            </ul> 
          </div>
        </div>
        <div className=' p-4 w-full border-blue-600'>
        <h1 className='font-bold mr-1'>
          Adjectives:
        </h1>
        <div className="sm:flex sm:justify-start">
        <ul className='flex flex-col lg:flex-wrap lg:h-[700px]'>
            {prompt.adjectives.length > 0?
            prompt.adjectives.map((adjective) => 
            
              <li key={adjective.id}>
                <StoryListItem
                  name={"adjectives"}
                  word={adjective.word}
                  id={adjective.id}
                  handleOnChange={handleOnChange}
                  handleRemove={handleRemove}
                  colour={"bg-emerald-700"}
                />
              </li>
            )
            :
            <div className={`border-2 p-2 mt-2 mx-auto sm:mr-2 border-black whitespace-pre-wrap bg-emerald-700 rounded-lg w-60 cursor-pointer min-h-[3rem] font-bold`}
              >
              <p className='text-center text-gray-200'>
              {"<Empty>"}
              </p>
            </div>} 
          </ul>
        </div>
      </div>
    </div>
  )
}
