import React from "react";

interface GenerateProps {
  handleAdd: (name: string, inputValue: string) => void;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
  handleReset: () => void;
}

export default function InputGroup({
  handleSubmit,
  isLoading,
  handleReset,
}: GenerateProps) {
  return (
    <>
      <div className=" flex justify-center mt-24 relative sm:w-[34rem] lg:w-[50rem] max-w-4xl h-auto w-80 mx-auto bg-slate-100 rounded-lg p-4">
        {!isLoading ? (
          <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-0 w-full space-y-4 lg:space-y-0">
            <div className="w-full flex justify-center">
              <button
                className="bg-green-300 w-60 border-2 border-black rounded-lg p-2 font-semibold hover:scale-105 ease-in duration-200"
                onClick={handleSubmit}
              >
                Generate Story!
              </button>
            </div>
            <button
              className="bg-red-400 w-40 border-2 border-black rounded-lg p-2 font-semibold hover:scale-105 ease-in duration-200 lg:absolute lg:right-10"
              onClick={handleReset}
            >
              Reset
            </button>
          </div>
        ) : (
          <div className="bg-green-600 w-60 border-2 border-black rounded-lg p-2 font-semibold animate-bounce text-center">
            Generating Story..
          </div>
        )}
      </div>
    </>
  );
}
