import React, { useState, useRef, ChangeEvent, KeyboardEvent } from "react";
import { useDispatch } from "react-redux";

const OtpInputField: React.FC = ({ setotpPerant, checkOtp }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState<string>("");

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleInputChange = (index: number, value: string) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value !== "" && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }

    if (newOtp.every((value) => value !== "")) {
      const enteredOtp = newOtp.join("");
      setText(enteredOtp);
      setotpPerant(enteredOtp);
      // Dispatch action here
    }
  };

  const handleInputBackspace = (index: number, value: string) => {
    if (value === "" && index > 0) {
      const newOtp = [...otp];
      newOtp[index - 1] = "";
      setOtp(newOtp);
      inputRefs[index - 1].current?.focus();
    }
  };

  return (
    <div className="mx-auto flex w-fit space-x-2 lg:space-x-4">
      {otp.map((value, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="text"
          maxLength={1}
          className="focus:border-yellow h-10 w-10 rounded border-2 border-[#BDBDBD] bg-transparent text-center text-2xl outline-none lg:h-14 lg:w-14"
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(index, e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Backspace") {
              handleInputBackspace(index, value);
            }
            if (e.key === "Enter") {
              checkOtp();
            }
          }}
        />
      ))}
    </div>
  );
};

export default OtpInputField;
