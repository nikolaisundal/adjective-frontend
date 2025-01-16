import React, { useState } from "react";

export default function HowToDiv() {
  const [displayHowToDiv, setDisplayHowToDiv] = useState(true);

  const handleSetDisplayHowToDiv = () => {
    setDisplayHowToDiv(!displayHowToDiv);
  };

  return (
    <>
      {displayHowToDiv ? (
        <div className="w-11/12 sm:w-5/6 md:w-3/4 mx-auto max-w-4xl mb-20 p-5 rounded-lg">
          <div className="p-4 mt-4 bg-slate-100 rounded-lg font-semibold text-lg border border-black">
            <p className="text-center text-2xl font-bold mb-2">Instructions:</p>
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
                className="bg-green-300 p-2 rounded-lg border-2 border-black font-semibold hover:scale-105 ease-in duration-200"
                onClick={handleSetDisplayHowToDiv}
              >
                OK, close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
