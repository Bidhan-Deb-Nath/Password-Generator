/** @format */

import { useState, useCallback, useEffect, useRef } from "react";

const PasswordComponent = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let generate = "";

    let strings = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numbers = "0123456789";
    let specialCharacters = "!@^#(/]$+-%^}&*)={[";

    if (numberAllowed) strings += numbers;
    if (characterAllowed) strings += specialCharacters;

    for (let i = 0; i <= length; i++) {
      const character = Math.floor(Math.random() * strings.length + 1);
      generate += strings.charAt(character);
    }
    setPassword(generate);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, characterAllowed, generatePassword]);

  const copyPasswordClipBord = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 12);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div className="w-full max-w-md  mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-600">
        <h2 className="text-white text-lg text-center mb-1">Password Generator</h2>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-4 px-4"
            placeholder="Password"
            ref={passwordRef}
            readOnly
          />
          <button
            className="outline-none bg-gray-400 hover:bg-gray-600 text-white px-3 py-0.5 shrink-0"
            onClick={copyPasswordClipBord}
          >
            copy
          </button>
        </div>
        <div className="flex test-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(event) => setLength(event.target.value)}
            />
            <label>Length : {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="numberInput"
              defaultChecked={numberAllowed}
              onChange={() => setNumberAllowed((previousValue) => !previousValue)}
            />
            <label htmlFor="numberInput">Number</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              id="characterInput"
              defaultChecked={characterAllowed}
              onChange={() =>
                setCharacterAllowed((previousValue) => !previousValue)
              }
            />
            <label htmlFor="characterInput">Character</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordComponent;
