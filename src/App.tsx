import {
  useState,
  useRef,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from "react";

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const [copySuccess, setCopySuccess] = useState("");
  const textAreaRef = useRef<HTMLParagraphElement | null>(null);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (value.trim() === "") {
      alert("Please enter a game name");
      return;
    }

    const filteredValue = value.trim().toLowerCase();

    const splitedValues = filteredValue.split(" ");

    setResult(
      `${filteredValue} mobile gameplay, ${filteredValue} mobile, ${filteredValue} gameplay, ${filteredValue} gameplay mobile, ${filteredValue} game, ${filteredValue} game mobile, ${splitedValues}, mobile gameplay, gameplay mobile, mobile, gameplay, gamernbdy`
    );
  };

  const copyToClipboard = async (e: MouseEvent<HTMLButtonElement>) => {
    if (textAreaRef.current?.textContent) {
      try {
        await navigator.clipboard.writeText(textAreaRef.current.textContent);
        (e.target as HTMLButtonElement).focus();
        setCopySuccess("Copied!");

        setTimeout(() => {
          setCopySuccess("");
        }, 2500);
      } catch (err) {
        setCopySuccess("Failed to copy!");
        console.error("Clipboard copy failed:", err);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#242424] text-white gap-5">
      <h1 className="text-4xl">Generate Tags</h1>
      <form className="flex flex-col gap-4">
        <div>
          <label htmlFor="gameName">Enter Game Name: </label>
          <input
            type="text"
            name="gameName"
            value={value}
            onChange={onChange}
            className="bg-[#333] text-white p-2 rounded w-full"
          />
        </div>
        <button
          onClick={onSubmit}
          className="bg-[#084387] text-white p-2 rounded-xl w-full cursor-pointer hover:bg-[#0a4f8c] transition duration-200"
        >
          Generate
        </button>
      </form>
      {result && (
        <div className="w-3xl  bg-gray-700 p-4 rounded flex flex-col items-center justify-center">
          <div className="flex items-center justify-between w-full">
            <h2 className="text-center">Result: </h2>
            <button
              className="rounded hover:bg-gray-600 px-4 py-2 cursor-pointer"
              onClick={copyToClipboard}
            >
              Copy
            </button>
          </div>
          <p
            ref={textAreaRef}
            className="w-full bg-gray-800 text-white rounded p-4 whitespace-pre-wrap break-words"
          >
            {result}
          </p>

          {copySuccess && <p className="mt-2 text-green-400">{copySuccess}</p>}
        </div>
      )}
    </div>
  );
}

export default App;
