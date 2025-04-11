import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  updateToPastes,
  addToPastes,
} from "../redux/pasteSlice";

const Home = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  // const allPastes = useSelector((state) => state.paste.pastes);

  const pastes = useSelector((state) => state.paste.pastes);

  // Pre-fill title/content if editing
  useEffect(() => {
    if (pasteId) {
      const pasteToEdit = pastes.find((p) => p._id === pasteId);
      if (pasteToEdit) {
        setTitle(pasteToEdit.title);
        setValue(pasteToEdit.content);
      }
    }
  }, [pasteId, pastes]);

  function createPaste() {
    const paste = {
      title: title.trim() || "Untitled",
      content: value.trim(),
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <>
      <div className="flex flex-row gap-7 items-start justify-between mt-4">
        <input
          className="rounded-2xl p-2 pl-4 w-[66%] border shadow-sm"
          type="text"
          placeholder="Enter title here"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          className="bg-blue-500 text-white rounded-2xl px-4 py-2 shadow"
          onClick={createPaste}
        >
          {pasteId ? "Update My Paste" : "Create My Paste"}
        </button>
      </div>

      <div className="mt-8">
        <textarea
          className="p-4 border-2 border-gray-300 w-full min-w-[500px] mt-4 rounded-2xl"
          placeholder="Enter content here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </>
  );
};

export default Home;
