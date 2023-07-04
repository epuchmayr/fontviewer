"use client";
import { VIEWS } from "../constants/appValues";

export default function Navigation({
  currentView,
  handleNavigation,
}: {
  currentView: string;
  handleNavigation: Function;
}) {
  let views = Object.keys(VIEWS);

  return (
    <div className="flex">
      {views.map((item) => {
        return (
          <button
            key={item}
            onClick={() => handleNavigation(item)}
            style={
              item === currentView
                ? {
                    backgroundColor: "rgb(22 101 52)",
                    color: "rgb(203 213 225)",
                  }
                : undefined
            }
            className="rounded bg-green-300 p-2 w-full hover:bg-green-200 font-bold"
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}
