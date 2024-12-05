import React, { useState } from "react";
import StoryListItem from "./StoryListItem";

interface Prompt {
  names: { word: string; id: string }[];
  adjectives: { word: string; id: string }[];
  setting: string;
  mood: string;
  [key: string]: any;
}

type AddInputProps = {
  handleAdd: (name: keyof Prompt, inputValue: string) => void;
  name: keyof Prompt;
};

interface StoryListItemProps {
  handleOnChange: (params: {
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    name: string;
    id?: string;
  }) => void;
  handleRemove: (params: { name: string; id?: string }) => void;
  id?: string;
  prompt: Prompt;
  handleAdd: (name: keyof Prompt, inputValue: string) => void;
}

export default function StoryItemGroup({
  prompt,
  handleOnChange,
  handleRemove,
  handleAdd,
}: StoryListItemProps) {
  const [nameInputActive, setNameInputActive] = useState(false);
  const [nameInputText, setNameInputText] = useState<string>("");

  const [adjectiveInputActive, setAdjectiveInputActive] = useState(false);
  const [adjectiveInputText, setAdjectiveInputText] = useState<string>("");

  /* legge til handle add på den grønne, med (names, nameInputText) */

  const handleClick = (name: keyof Prompt, inputValue: string) => {
    if (inputValue !== "") {
      handleAdd(name, inputValue);
    } else {
      alert("Please don't enter an empty value.");
    }
  };
  return (
    <div className="mt-10 flex flex-col sm:flex-row sm:justify-evenly w-fit sm:w-[34rem] lg:w-[50rem] max-w-4xl h-auto mx-auto">
      <div className="p-4 sm:w-96">
        <div className="mb-4">
          <h1 className="font-bold mr-1">Names:</h1>
          {nameInputActive ? (
            <div className="relative z-10 w-fit">
              <button
                className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 w-11 p-1 rounded-full textblack hover:text-gray-600 border-2 border-black text-lg"
                onMouseDown={() => {
                  setNameInputActive(false);
                  setNameInputText("");
                }}
              >
                <div className="pb-1 font-bold">&times;</div>
              </button>
              <button
                className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 bg-green-600 w-11 px-1 py-2 rounded-full textblack hover:text-gray-600 border-2 border-black text-sm"
                onMouseDown={() => handleClick("names", nameInputText)}
              >
                <div className="pb-1 font-bold">&#x2713;</div>
              </button>
              <input
                autoFocus
                value={nameInputText}
                onBlur={() => {
                  setNameInputActive(false);
                  setNameInputText("");
                }}
                onChange={(e) => setNameInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleClick("names", nameInputText);
                    setNameInputText("");
                  }
                  if (e.key === "Escape") {
                    setNameInputActive(false);
                    setNameInputText("");
                  }
                }}
                className={`border-2 p-2 mt-2 mx-auto sm:mr-2 border-black whitespace-pre-wrap rounded-lg w-60 cursor-pointer min-h-[3rem] font-bold bg-slate-300`}
              ></input>
            </div>
          ) : (
            <button
              onClick={() => setNameInputActive(true)}
              className={`border-2 p-2 mt-2 mx-auto sm:mr-2 border-black whitespace-pre-wrap bg-blue-500 rounded-lg w-60 cursor-pointer min-h-[3rem] font-bold`}
            >
              <p className="text-center text-gray-200">Add a name</p>
            </button>
          )}
          <ul>
            {prompt.names.map((name) => (
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
            ))}
          </ul>
        </div>
        <div className="mb-4">
          <h1 className="font-bold mr-1">Mood:</h1>
          <ul>
            <li>
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
        <div className="mb-4">
          <h1 className="font-bold mr-1">Setting:</h1>
          <ul>
            <li>
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
      <div className=" p-4 w-full border-blue-600">
        <h1 className="font-bold mr-1">Adjectives:</h1>
        {adjectiveInputActive ? (
          <div className="relative z-10 w-fit">
            <button
              className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 w-11 p-1 rounded-full textblack hover:text-gray-600 border-2 border-black text-lg"
              onMouseDown={() => {
                setAdjectiveInputActive(false);
                setAdjectiveInputText("");
              }}
            >
              <div className="pb-1 font-bold">&times;</div>
            </button>
            <button
              className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 bg-green-600 w-11 px-1 py-2 rounded-full textblack hover:text-gray-600 border-2 border-black text-sm"
              onMouseDown={() => handleClick("adjectives", adjectiveInputText)}
            >
              <div className="pb-1 font-bold">&#x2713;</div>
            </button>
            <input
              autoFocus
              value={adjectiveInputText}
              onBlur={() => {
                setAdjectiveInputActive(false);
                setAdjectiveInputText("");
              }}
              onChange={(e) => setAdjectiveInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleClick("adjectives", adjectiveInputText);
                  setAdjectiveInputText("");
                }
                if (e.key === "Escape") {
                  setAdjectiveInputActive(false);
                  setAdjectiveInputText("");
                }
              }}
              className={`border-2 p-2 mt-2 mx-auto sm:mr-2 border-black whitespace-pre-wrap rounded-lg w-60 cursor-pointer min-h-[3rem] font-bold bg-slate-300`}
            ></input>
          </div>
        ) : (
          <button
            onClick={() => setAdjectiveInputActive(true)}
            className={`border-2 p-2 mt-2 mx-auto sm:mr-2 border-black whitespace-pre-wrap bg-emerald-700 rounded-lg w-60 cursor-pointer min-h-[3rem] font-bold`}
          >
            <p className="text-center text-gray-200">Add an adjective</p>
          </button>
        )}
        <div className="sm:flex sm:justify-start">
          <ul className="flex flex-col lg:flex-wrap lg:h-[700px]">
            {prompt.adjectives.map((adjective) => (
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
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
