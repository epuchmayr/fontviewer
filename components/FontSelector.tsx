import React, { MouseEventHandler } from "react";
import { ttfFontList } from "../constants/FontLists";

export default function FontSelector({
  text,
  selectHandler,
  selectedFont
}: {
  text: string;
  selectHandler: Function;
  selectedFont: string;
}) {
  function generateFontList(fontArray: string[]) {
    return (
      fontArray &&
      fontArray.map((item, key) => {
        return (
          <li
            key={key + item}
            style={{backgroundColor: (item === selectedFont) ? 'rgb(187 247 208)' : undefined}}
            className="min-w-[20rem] border-t border-slate-300 leading-10 px-2 pb-4 hover:bg-green-100 hover:cursor-pointer"
            onClick={() => selectHandler(item)}
          >
            {item}
            <br />
            <span
              className="text-4xl leading-10 pl-10"
              style={{
                fontFamily: `${item}`,
              }}
            >
              {text}
            </span>
          </li>
        );
      })
    );
  }

  return (
    <>
        <ol>{generateFontList(ttfFontList)}</ol>
    </>
  );
}
