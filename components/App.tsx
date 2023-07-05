"use client";
import Image from "next/image";
import React, {
  EventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import { VIEWS } from "../constants/appValues";
import { ttfFontList } from "../constants/FontLists";

import FontSelector from "./FontSelector";
// import Navigation from "./Navigation";
import PreviewText from "./PreviewText";

export default function App() {
  // hook to update '--vh' value when window is resized or browser chrome changes
  useEffect(() => {
    let setViewHeight = () => {
      // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
      let vh = window.innerHeight * 0.01;
      // Then we set the value in the --vh custom property to the root of the document
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };
    window.addEventListener("resize", setViewHeight);

    return () => {
      window.removeEventListener("resize", setViewHeight);
    };
  }, []);

  const [currentView, setCurrentView] = useState(VIEWS.SELECT);
  const [textOptions, setTextOptions] = useState({
    fontContent: "Celebrate the good times",
    fontSize: "3",
    fontWeight: "400",
  });
  const [selectedFont, setSelectedFont] = useState(ttfFontList[0]);

  // function navHandler(target: string) {
  //   setCurrentView(target);
  // }

  function selectFontHandler(target: string) {
    setSelectedFont(target);
    // setCurrentView(VIEWS.PREVIEW);
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
    <div
      // style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      style={{ position: "absolute", top: '0', right: '0', bottom: '0', left: '0' }}
      className="flex flex-col max-w-screen-lg mx-auto"
    >
      <header className="flex-none flex justify-between items-center py-2 px-3 dark:bg-slate-900">
        <div className="flex items-center">
          <Image src="/bnb-logo.jpg" alt="Box Not Box" width={36} height={36} />
          <h2 className="text-sm font-bold text-gray-950 ml-3 leading-tight dark:text-slate-200">
            Box Not Box
            <br />
            <span className="font-normal text-sm">Font Selector</span>
          </h2>
        </div>
      </header>

      <section className="bg-white shadow shadow-slate-400 flex flex-col w-full h-full">
        <header className="">
          <div className="text-center p-2 bg-cyan-800 dark:text-slate-200">
            Selected Font: <strong>{selectedFont}</strong>
          </div>
        </header>

        {currentView === VIEWS.SELECT && (
          <>
            <div className="p-2 text-center bg-slate-200 dark:bg-slate-800 dark:text-slate-200">
              <PreviewText
                inputContent={textOptions.fontContent}
                changeHandler={handleFontChange}
              />
              <p className="font-mono text-xs pt-3">
                Selected font may be modified to fit design requirements
              </p>
            </div>
            <div className="flex justify-around flex-auto h-px overflow-auto box-border">
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

      {/* <Navigation currentView={currentView} handleNavigation={navHandler} /> */}
    </div>
  );
}
