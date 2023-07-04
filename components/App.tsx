"use client";
import Image from "next/image";
import React, { EventHandler, FormEventHandler, useState } from "react";
import { VIEWS } from "../constants/appValues";
import { ttfFontList } from "../constants/FontLists";

import FontSelector from "./FontSelector";
import Navigation from "./Navigation";
import PreviewText from "./PreviewText";

export default function App() {
  const [currentView, setCurrentView] = useState(VIEWS.SELECT);
  const [textOptions, setTextOptions] = useState({
    fontContent: "The days are lovely and full of zeal",
    fontSize: "3",
    fontWeight: "400",
  });
  const [selectedFont, setSelectedFont] = useState(ttfFontList[0]);

  function navHandler(target: string) {
    setCurrentView(target);
  }

  function selectFontHandler(target: string) {
    setSelectedFont(target);
    setCurrentView(VIEWS.PREVIEW);
  }

  function handleFontChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setTextOptions((prevOptions) => {
      return { ...prevOptions, [e.target.name]: `${e.target.value}` };
    });
  }

  function handleFontClick(name: string, value: string) {
    setTextOptions((prevOptions) => {
      return { ...prevOptions, [name]: `${value}` };
    });
  }

  return (
    <div className="flex flex-col h-screen max-w-screen-lg mx-auto">
      <header className="flex-none flex justify-between items-center py-2 px-3">
        <div className="flex items-center">
          <Image src="/bnb-logo.jpg" alt="Box Not Box" width={36} height={36} />
          <h2 className="text-sm font-bold text-gray-900 ml-3 leading-tight">
            Box Not Box
            <br />
            <span className="font-normal text-sm">Font Selector</span>
          </h2>
        </div>
      </header>

      <section className="bg-white shadow shadow-slate-400 flex flex-col w-full h-full">
        <header className="">
          <div className="text-center bg-blue-400 p-2">
            Selected Font: <strong>{selectedFont}</strong>
          </div>
        </header>

        {currentView === VIEWS.SELECT && (
          <>
            <div className="text-center bg-slate-200 p-2">
              <PreviewText
                inputContent={textOptions.fontContent}
                changeHandler={handleFontChange}
              />
              <p className="font-mono text-xs pt-3">
                Selected font may be modified to fit design requirements
              </p>
            </div>
            <div className="flex justify-around flex-auto h-px overflow-auto py-5">
              <FontSelector
                text={textOptions.fontContent}
                selectHandler={selectFontHandler}
                selectedFont={selectedFont}
              />
            </div>
          </>
        )}

        {currentView === VIEWS.PREVIEW && (
          <div className=" flex-auto h-px overflow-y-auto pt-5">
            <div className="text-center">
              <label>
                {Number(textOptions.fontSize) > 1 && (
                  <button
                    className="ml-3 px-2 border rounded border-slate-500"
                    onClick={() =>
                      handleFontClick(
                        "fontSize",
                        String(Number(textOptions.fontSize) - 1)
                      )
                    }
                  >
                    -
                  </button>
                )}
                <input
                  className="w-10 pl-2 border rounded border-slate-500"
                  name="fontSize"
                  value={textOptions.fontSize}
                  onChange={handleFontChange}
                  type="number"
                />
              </label>

              {Number(textOptions.fontSize) < 20 && (
                <button
                  className="px-2 border rounded border-slate-500"
                  onClick={() =>
                    handleFontClick(
                      "fontSize",
                      String(Number(textOptions.fontSize) + 1)
                    )
                  }
                >
                  +
                </button>
              )}
            </div>
            <div
              style={{
                fontFamily: selectedFont,
                fontSize: `${textOptions.fontSize}rem`,
              }}
              className="px-16 py-10 overflow-x-auto"
            >
              {textOptions.fontContent}
            </div>
          </div>
        )}
      </section>

      <Navigation currentView={currentView} handleNavigation={navHandler} />
    </div>
  );
}
