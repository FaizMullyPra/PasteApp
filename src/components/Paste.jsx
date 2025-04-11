import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  // console.log(pastes)
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }
  return (
    <>
      <input
        type="search"
        placeholder="Search here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="rounded-2xl mt-5 p-2 pl-4 min-w-[600px]"
      />

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div key={paste?._id} className="border">
              <div>{paste.title}</div>
              <div>{paste.content}</div>
              <div className="flex flex-row gap-4 place-content-evenly">
                <button
                  className="bg-blue-500 text-white rounded-2xl mt-2 p-2"
                  onClick={() => navigate(`/?pasteId=${paste._id}`)}
                >
                  Edit
                </button>

                <button
                  className="bg-gray-300 rounded-2xl mt-2 p-2"
                  onClick={() => navigate(`/pastes/${paste._id}`)}
                >
                  View
                </button>

                <button
                  className="bg-red-500 text-white rounded-2xl mt-2 p-2"
                  onClick={() => handleDelete(paste?._id)}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to clipboard");
                  }}
                >
                  Copy
                </button>
                <button
                  className="bg-yellow-400 rounded-2xl mt-2 p-2"
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: paste.title,
                          text: paste.content,
                          url: window.location.href, // optional: you can link to a detail page
                        })
                        .then(() => toast.success("Shared successfully!"))
                        .catch((error) => toast.error("Sharing failed"));
                    } else {
                      // Fallback: copy to clipboard and inform user
                      navigator.clipboard.writeText(
                        `${paste.title}\n\n${paste.content}`
                      );
                      toast(
                        "Share not supported. Copied to clipboard instead."
                      );
                    }
                  }}
                >
                  Share
                </button>
              </div>
              <div className="text-xs text-gray-500">{paste.createdAt}</div>
            </div>
          ))}
      </div>
    </>
  );
};
export default Paste;
