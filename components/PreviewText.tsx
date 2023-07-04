import React, { ChangeEvent } from "react";

export default function PreviewText({
  inputContent,
  changeHandler,
}: {
  inputContent: string;
  changeHandler: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <label>
      Preview text:&nbsp;
      <input
        className="border-slate-400 border rounded-sm w-80"
        name="fontContent"
        value={inputContent}
        onChange={changeHandler}
      />
    </label>
  );
}
