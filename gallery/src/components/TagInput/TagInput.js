import React from "react";
import ReactDOM from "react-dom";
import { WithContext as ReactTags } from "react-tag-input";
import { useState } from "react";
import "./style.css";

const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};
const delimiters = [...KeyCodes.enter, KeyCodes.comma];
const suggestions = [
  { id: "Music", text: "Music" },
  { id: "Art", text: "Art" },
  { id: "Games", text: "Games" },
  { id: "Memes", text: "Memes" },
  { id: "Sri Lanka", text: "Sri Lanka" },
  { id: "Thailand", text: "Thailand" },
];

const TagInput = () => {
  const [tags, setTags] = useState([
    { id: "Nft", text: "Nft" },
    
  ]);

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags].slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };
  const onClearAll = () => {
    setTags([]);
  };
  const onTagUpdate = (i, newTag) => {
    const updatedTags = tags.slice();
    updatedTags.splice(i, 1, newTag);
    setTags(updatedTags);
  };

  return (
    <div>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        // autocomplete={true}
        inline={true}
        delimiters={delimiters}
      />
    </div>
  );
};

export default TagInput;
