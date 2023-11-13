import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import InputGroup from "./InputGroup";
import StoryWindow from "./StoryWindow";
import StoryItemGroup from "./StoryItemGroup";
import HowToDiv from "./HowToDiv";

type StoryWindowProps = {
  handleStoryOnChange: (params: {
    event: React.ChangeEvent<HTMLTextAreaElement>;
  }) => void;
  generatedText: string;
};

interface Prompt {
  names: { word: string; id: string }[];
  adjectives: { word: string; id: string }[];
  setting: string;
  mood: string;
  [key: string]: any;
}

const initialState = {
  names: [],
  adjectives: [],
  setting: "",
  mood: "",
};

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
  prompt: Prompt;
}

function MyComponent(): JSX.Element {
  const [prompt, setPrompt] = useState<Prompt>(initialState);
  const [generatedText, setGeneratedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);

    fetch("https://adjective-backend.vercel.app/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    })
      .then((response: Response) => response.json())
      .then((data: any) => {
        setIsLoading(false);
        setGeneratedText(data.text);
      })
      .catch((error: Error) => {
        setIsLoading(false);
        console.log(error);
      });
  };

  const handleAdd = (name: keyof Prompt, inputValue: string) => {
    if (name === "setting" || name === "mood") {
      setPrompt((prevPrompt) => {
        const newItem = inputValue;
        return { ...prevPrompt, [name]: newItem };
      });
    } else {
      setPrompt((prevPrompt) => {
        const newItem = [
          ...prevPrompt[name],
          { word: inputValue, id: uuidv4() },
        ];
        return { ...prevPrompt, [name]: newItem };
      });
    }
  };

  const handleOnChange: StoryListItemProps["handleOnChange"] = ({
    event,
    name,
    id,
  }) => {
    const promptCopy = { ...prompt };
    let propToChange = promptCopy[name];
    if (name === "setting" || name === "mood") {
      propToChange = event.target.value;
      setPrompt({ ...promptCopy, [name]: propToChange });
    } else {
      propToChange.forEach((item: { word: string; id: string }) => {
        if (item.id === id) {
          item.word = event.target.value;
          setPrompt(promptCopy);
        }
      });
    }
  };

  const handleStoryOnChange: StoryWindowProps["handleStoryOnChange"] = ({
    event,
  }) => {
    setGeneratedText(event.target.value);
  };

  const handleRemove: StoryListItemProps["handleRemove"] = ({ name, id }) => {
    const promptCopy = { ...prompt };
    if (id === undefined) {
      promptCopy[name] = "";
      setPrompt(promptCopy);
    } else {
      promptCopy[name] = promptCopy[name].filter((item: { id?: string }) => {
        return item.id !== id;
      });
      setPrompt(promptCopy);
    }
  };

  return (
    <div className="mt-20">
      <InputGroup
        handleAdd={handleAdd}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />

      {generatedText ? (
        <StoryWindow
          generatedText={generatedText}
          handleStoryOnChange={handleStoryOnChange}
        />
      ) : (
        <HowToDiv />
      )}

      <StoryItemGroup
        prompt={prompt}
        handleOnChange={handleOnChange}
        handleRemove={handleRemove}
      />
      <div className="h-96 flex justify-end items-end w-full">
        <div className="h-24 mr-4">Created by Niko Lai</div>
      </div>
    </div>
  );
}

export default MyComponent;
