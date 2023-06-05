import React, {useState, useEffect, useRef} from 'react'

interface Prompt {
  names: {
    name: string;
    id: string;
  }[];
  adjectives: {
    word: string;
    id: string;
  }[];
  setting: string;
  mood: string;
}

type AddInputProps = {
  handleAdd: (name: keyof Prompt, inputValue: string) => void;
  name: keyof Prompt
};

export default function AddInput({handleAdd, name}: AddInputProps) {
  const [inputValue, setInputValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);


  const handleClick = (name: keyof Prompt, inputValue: string) => {
    if(inputValue !== "") {
      handleAdd(name, inputValue)
      setInputValue("")
      if (textareaRef.current) {
        textareaRef.current.setSelectionRange(0, 0);
        textareaRef.current.focus();
      }
    } else {
      alert("Please don't enter an empty value.")
    }
    
  }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleClick(name, inputValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInputValue(e.target.value)
  }

  useEffect(() => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.style.height = "0px";
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = scrollHeight + "px";
    }
  }, [inputValue]);

  return (
    <form>
      <div className='flex justify-center flex-col lg:flex-row mt-5'>
          <div className='p-2 w-32'>
            <label htmlFor={name}> 
              add {name}:
            </label>
          </div>
          {
            name === "setting" || name === "mood" ?
            <div className='flex flex-row'>
              <div>
                <textarea className='border overflow-hidden border-black ml-2 p-2 rounded-lg w-52 min-h-[4rem]'
                  ref={textareaRef}
                  name={name}
                  value={inputValue}
                  onChange={(e) => handleInputChange(e)}
                  onKeyDown={(e) => handleKeyDown(e)}
                />
              </div>
            
              <div>
                <button 
                  className='border border-black bg-purple-400 ml-2 rounded-lg p-2'
                  type="submit"
                  onClick={(e) => { 
                    e.preventDefault();
                    handleClick(name, inputValue)}}
                >
                  add
                </button>
              </div>
              
              
          </div>
          :
          <div>
            <input className='border border-black ml-2 p-2 rounded-lg w-52'
              type="text"
              name={name}
              value={inputValue}
              onChange={(e) => handleInputChange(e)}
              />
            
              <button 
                className='border border-black bg-purple-400 ml-2 rounded-lg p-2'
                type="submit"
                onClick={(e) => { 
                  e.preventDefault();
                  handleClick(name, inputValue)}}
              >
                add
              </button>
            
          </div>
          }
          

      </div>
    </form>
  )
}
