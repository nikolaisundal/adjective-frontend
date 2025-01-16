import React, { useState, useRef, useEffect } from "react";

interface StoryListItemProps {
  handleOnChange: (params: {
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
    name: string;
    id?: string;
  }) => void;
  handleRemove: (params: { name: string; id?: string }) => void;
  id?: string;
  word: string;
  name: string;
  colour: string;
}

export default function StoryListItem({
  word,
  id,
  name,
  colour,
  handleOnChange,
  handleRemove,
}: StoryListItemProps) {
  const [inputModeActive, setInputModeActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputModeActive = () => {
    setInputModeActive(!inputModeActive);
    if (word === "") {
      handleRemove({ name, id });
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      const end = word.length;
      textareaRef.current.setSelectionRange(end, end);
      textareaRef.current.focus();
    }
  });

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [word, inputModeActive]);

  return (
    <div className="mt-2 flex justify-center content-center sm:mr-2">
      {inputModeActive && (name === "mood" || name === "setting") ? (
        <div className="relative z-10">
          <button
            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-400 w-11 p-1 rounded-full  hover:text-gray-600 border-2 border-black text-lg"
            onMouseDown={() => handleRemove({ name, id })}
          >
            <div className="pb-1 font-bold">&times;</div>
          </button>
          <button
            className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 bg-green-300 w-11 px-1 py-2 rounded-full  hover:text-gray-600 border-2 border-black text-sm"
            onMouseDown={() => handleInputModeActive()}
          >
            <div className="pb-1 font-bold">&#x2713;</div>
          </button>
          <label htmlFor={name}></label>
          <textarea
            className="border-black overflow-hidden p-[0.55rem] rounded-lg text-center w-60 min-h-[3rem] font-bold bg-slate-300"
            ref={textareaRef}
            name={name}
            id={name}
            value={word}
            onChange={(e) => handleOnChange({ event: e, name, id })}
            onBlur={handleInputModeActive}
          />
        </div>
      ) : inputModeActive ? (
        <div className="relative z-10">
          <button
            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-400 w-11 p-1 rounded-full  hover:text-gray-600 border-2 border-black text-lg"
            onMouseDown={() => handleRemove({ name, id })}
          >
            <div className="pb-1 font-bold">&times;</div>
          </button>
          <button
            className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 bg-green-300 w-11 px-1 py-2 rounded-full  hover:text-gray-600 border-2 border-black text-sm"
            onMouseDown={() => handleInputModeActive()}
          >
            <div className="pb-1 font-bold">&#x2713;</div>
          </button>
          <label htmlFor={name}></label>
          <input
            className="border-black pb-[0.2rem] rounded-lg text-center w-60 min-h-[3rem] font-bold bg-slate-300"
            type="text"
            name={name}
            id={name}
            value={word}
            onChange={(e) => handleOnChange({ event: e, name, id })}
            onBlur={handleInputModeActive}
            autoFocus
          />
        </div>
      ) : (
        <>
          <div
            className={`relative border-2 p-2 border-black whitespace-pre-wrap rounded-lg ${colour} w-60 cursor-pointer min-h-[3rem] font-bold`}
            onClick={handleInputModeActive}
          >
            <p className="text-center text-slate-800">
              {word !== "" ? word : `Add a ${name}`}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
