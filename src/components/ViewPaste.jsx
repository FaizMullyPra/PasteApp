import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();

  const paste = useSelector((state) =>
    state.paste.pastes.find((p) => p._id === id)
  );

  if (!paste) return <div className="mt-4 text-red-500">Paste not found.</div>;

  return (
    <>
      <div className="flex flex-row gap-7 items-start justify-between mt-4">
        <input
          className="rounded-2xl p-2 pl-4 w-[66%] border shadow-sm"
          type="text"
          value={paste.title}
          disabled
        />
      </div>

      <div className="mt-8">
        <textarea
          className="p-4 border-2 border-gray-300 w-full min-w-[500px] mt-4 rounded-2xl"
          value={paste.content}
          disabled
          rows={20}
        />
      </div>
    </>
  );
};

export default ViewPaste;
