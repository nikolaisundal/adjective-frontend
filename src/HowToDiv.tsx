import React, { useState } from "react";

export default function HowToDiv() {
  const [displayHowToDiv, setDisplayHowToDiv] = useState(true);

  const handleSetDisplayHowToDiv = () => {
    setDisplayHowToDiv(!displayHowToDiv);
  };

  return (
    <>
      {displayHowToDiv ? (
        <div className="w-11/12 sm:w-5/6 md:w-3/4 mx-auto max-w-4xl mt-20 mb-20 p-5 rounded-lg">
          <p className="text-center text-xl font-bold">Instructions</p>
          <div className="p-4 mt-4 bg-amber-100 rounded-lg font-semibold text-lg border border-black">
            <ul>
              <li className="py-2">
                Adjective is a story generator which uses AI🤖 to create a story
                based on your input.
              </li>
              <li className="py-2 px-4">
                -Click the buttons to add names, adjectives, a mood and a
                setting.
              </li>
              <li className="py-2 px-4">
                -Your chosen words will appear in the list below.⬇
              </li>
              <li className="py-2 px-4">
                -Click Generate Story when you are ready to read about your next
                epic adventure!📜
              </li>
              <li className="py-2 px-4">
                PS. You can edit/delete the words in your list by clicking them
                ↩
              </li>
            </ul>
            <div className="text-center mt-4">
              <button
                className="bg-purple-400 p-2 rounded-lg border border-black font-normal"
                onClick={handleSetDisplayHowToDiv}
              >
                OK, close.
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
