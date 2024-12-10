import React from "react";
import AddInput from "./AddInput";

interface InputGroupProps {
  handleAdd: (name: string, inputValue: string) => void;
  handleSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  isLoading: boolean;
}

export default function InputGroup({
  handleAdd,
  handleSubmit,
  isLoading,
}: InputGroupProps) {
  return (
    <>
      <div className="w-full flex justify-center">
        {!isLoading ? (
          <button
            className="bg-purple-400 border border-black rounded-lg p-2 w-48"
            onClick={handleSubmit}
          >
            Generate Story!
          </button>
        ) : (
          <div className="bg-green-400 border border-black rounded-lg p-2 animate-bounce w-48 text-center">
            Generating Story..
          </div>
        )}
      </div>
    </>
  );
}
