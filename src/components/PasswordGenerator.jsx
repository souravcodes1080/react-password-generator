import React, { useCallback, useEffect, useState } from "react";
import "../styles/pg.css";
import {character, number, str} from "../Constants"


function PasswordGenerator() {

  //react states
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(5);
  const [isNumber, setIsNumber] = useState(false);
  const [isCharacter, setIsCharacter] = useState(false);

  
  //methods
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let string = str;
    if (isNumber) {
      string += number;
    }
    if (isCharacter) {
      string += character;
    }
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * string.length + 1);
      pass += string.charAt(char);
    }
    setPassword(pass);
  }, [length, isNumber, isCharacter, setPassword]);

  const copyPassword = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, []);



  return (
    <>
      <div className="container">
        <h1>Password Generator</h1>
        <div className="password-text">
          <input type="text" value={password} />
          <button onClick={copyPassword}>Copy</button>
        </div>
        <div className="adjustment">
          5
          <input
            type="range"
            min={5}
            max={20}
            value={length}
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          20
          <div className="checkboxes">
            <input
              type="checkbox"
              onChange={() => {
                setIsNumber(!isNumber);
              }}
            />
            <label>Numbers</label>
          </div>
          <div className="checkboxes">
            <input
              type="checkbox"
              onChange={() => {
                setIsCharacter(!isCharacter);
              }}
            />
            <label>Characters</label>
          </div>
          <button onClick={passwordGenerator}>Generate</button>
        </div>
      </div>
    </>
  );
}

export default PasswordGenerator;
