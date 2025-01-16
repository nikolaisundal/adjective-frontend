import React, { useState, useRef, useEffect } from "react";

type StoryWindowProps = {
  handleStoryOnChange: (params: {
    event: React.ChangeEvent<HTMLTextAreaElement>;
  }) => void;
  generatedText: string;
};

export default function StoryWindow({
  generatedText,
  handleStoryOnChange,
}: StoryWindowProps) {
  const [inputModeActive, setInputModeActive] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const handleInputModeActive = () => {
    setInputModeActive(!inputModeActive);
  };

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "auto";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [generatedText, inputModeActive]);
  return (
    <div className="w-11/12 sm:w-5/6 md:w-3/4 mx-auto max-w-4xl mt-20 mb-20 p-5 rounded-lg">
      <p className="text-center text-xl font-bold">Your story</p>
      {inputModeActive ? (
        <>
          <label htmlFor="generated text"></label>
          <textarea
            className="mt-4 overflow-hidden outline-none p-4 rounded-lg text-left w-full min-h-[3rem] font-semibold bg-slate-50 border border-black"
            ref={textareaRef}
            name="generated text"
            id="generated text"
            value={generatedText}
            onChange={(e) => handleStoryOnChange({ event: e })}
            onBlur={handleInputModeActive}
          />
        </>
      ) : (
        <div className="cursor-pointer" onClick={handleInputModeActive}>
          <div className="mt-4 whitespace-pre-wrap p-4 text-left bg-slate-100 rounded-lg font-semibold border border-black">
            <p>{generatedText}</p>
          </div>
        </div>
      )}
    </div>
  );
}
