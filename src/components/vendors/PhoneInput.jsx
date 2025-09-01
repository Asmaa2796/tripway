import React, { useEffect, useRef } from "react";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import "intl-tel-input/build/js/utils.js";

const PhoneInput = ({ value = "", onChange }) => {
  const inputRef = useRef(null);
  const itiRef = useRef(null);

  useEffect(() => {
    if (!inputRef.current) return;

    itiRef.current = intlTelInput(inputRef.current, {
      initialCountry: "auto",
      geoIpLookup: (callback) => {
        fetch("https://ipapi.co/json")
          .then((res) => res.json())
          .then((data) => callback(data.country_code))
          .catch(() => callback("us"));
      },
      utilsScript:
        "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
    });

    const input = inputRef.current;
    const handleChange = () => {
      const iti = itiRef.current;
      if (iti && onChange) {
        const number = iti.getNumber();
        const isValid = iti.isValidNumber();
        onChange({
          target: {
            name: "phone",
            value: isValid ? number : "",
          },
        });
      }
    };

    input.addEventListener("input", handleChange);
    input.addEventListener("countrychange", handleChange);

    return () => {
      input.removeEventListener("input", handleChange);
      input.removeEventListener("countrychange", handleChange);
      itiRef.current?.destroy();
    };
  }, [onChange]);

  useEffect(() => {
    if (inputRef.current && value && itiRef.current) {
      itiRef.current.setNumber(value);
    }
  }, [value]);

  return (
    <input
      type="tel"
      name="phone"
      ref={inputRef}
      className="input-bg w-100"
      autoComplete="tel"
    />
  );
};

export default PhoneInput;
