import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Generate from "./Generate";
import StoryWindow from "./StoryWindow";
import StoryItemGroup from "./StoryItemGroup";
import HowToDiv from "./HowToDiv";
import Modal from "./Modal";

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
  handleAdd: (name: string, inputValue: string) => void;
}

function MyComponent(): JSX.Element {
  const [prompt, setPrompt] = useState<Prompt>(initialState);
  const [generatedText, setGeneratedText] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalActive, setModalActive] = useState(false);
  const [modalMessage, setModalmessage] = useState<string>("");

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
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(
            `Server error: ${response.status} ${response.statusText}`
          );
        }
        return response.json();
      })
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
    }
    if (
      (name === "adjectives" && prompt.adjectives.length > 19) ||
      (name === "names" && prompt.names.length > 5)
    ) {
      const modalString = `You can't add more than ${prompt[name].length} ${name}.`;
      setModalmessage(modalString);
      setModalActive(true);
      return;
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

  const handleReset = () => {
    setPrompt(initialState);
    setGeneratedText("");
  };

  return (
    <div className="mt-20 ">
      <div className="w-full flex justify-center text-center mb-20 ">
        <h1 className="text-4xl sm:text-5xl text-slate-800 leading-relaxed mx-4">
          {`Get creative with `}
          <span className="drop-shadow-2xl bg-gradient-to-r from-[#fc869a]  to-[#8a48fc]  inline-block text-transparent bg-clip-text text-7xl">
            Adjective
          </span>
        </h1>
      </div>

      <HowToDiv />

      <Generate
        handleAdd={handleAdd}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
        handleReset={handleReset}
      />
      {generatedText ? (
        <StoryWindow
          generatedText={generatedText}
          handleStoryOnChange={handleStoryOnChange}
        />
      ) : null}
      <StoryItemGroup
        prompt={prompt}
        handleOnChange={handleOnChange}
        handleRemove={handleRemove}
        handleAdd={handleAdd}
      />

      <Modal
        isOpen={modalActive}
        onClose={() => setModalActive(false)}
        message={modalMessage}
      />
      <div className="h-96"> </div>
    </div>
  );
}

export default MyComponent;
