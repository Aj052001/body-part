// import React, { useState } from "react";
// import ReactBodyHighlighter from "react-body-highlighter";

// const BodyHighlighter = () => {
//   // State to keep track of the selected part
//   const [selectedPart, setSelectedPart] = useState(null);

//   // Highlighted areas for the front and back views
//   const frontHighlightedAreas = [
//     { part: "head", color: selectedPart === "head" ? "#FF7F50" : "#FF5733" },
//     { part: "left-arm", color: selectedPart === "left-arm" ? "#7CFC00" : "#33FF57" },
//     { part: "right-leg", color: selectedPart === "right-leg" ? "#4169E1" : "#3357FF" },
//   ];

//   const backHighlightedAreas = [
//     { part: "back", color: selectedPart === "back" ? "#FF0000" : "#FF0000" },
//     { part: "left-leg", color: selectedPart === "left-leg" ? "#00FF00" : "#00FF00" },
//     { part: "right-arm", color: selectedPart === "right-arm" ? "#0000FF" : "#0000FF" },
//   ];

//   // Function to handle click on a body part
//   const handlePartClick = (part) => {
//     setSelectedPart(part);
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px", display: "flex", justifyContent: "center", gap: "50px" }}>
//       <div>
//         <h2>Front View</h2>
//         <ReactBodyHighlighter
//           highlightedAreas={frontHighlightedAreas}
//           bodyStyle={{ width: "300px", height: "400px" }}
//           onPartClick={handlePartClick}
//         />
//       </div>
//       <div>
//         <h2>Back View</h2>
//         <ReactBodyHighlighter
//           highlightedAreas={backHighlightedAreas}
//           bodyStyle={{ width: "300px", height: "400px" }}
//           onPartClick={handlePartClick}
//         />
//       </div>
//     </div>
//   );
// };

// export default BodyHighlighter;

import React, { useState } from "react";
import ReactBodyHighlighter from "react-body-highlighter";

const BodyHighlighter = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isMultiple, setIsMultiple] = useState(false);
  const [bodyColor, setBodyColor] = useState("#FF0000");
  const [selectionColor, setSelectionColor] = useState("#0000FF");
  const [selectedPart, setSelectedPart] = useState(null);

  const frontHighlightedAreas = [
    { part: "head", color: selectedPart === "head" ? selectionColor : bodyColor },
    { part: "left-arm", color: selectedPart === "left-arm" ? selectionColor : bodyColor },
    { part: "right-leg", color: selectedPart === "right-leg" ? selectionColor : bodyColor },
  ];

  const backHighlightedAreas = [
    { part: "back", color: selectedPart === "back" ? selectionColor : bodyColor },
    { part: "left-leg", color: selectedPart === "left-leg" ? selectionColor : bodyColor },
    { part: "right-arm", color: selectedPart === "right-arm" ? selectionColor : bodyColor },
  ];

  const handlePartClick = (part) => {
    if (isDisabled) return;

    if (isMultiple) {
      setSelectedPart((prevSelected) => {
        if (prevSelected && Array.isArray(prevSelected)) {
          return prevSelected.includes(part) ? prevSelected.filter(p => p !== part) : [...prevSelected, part];
        }
        return [part];
      });
    } else {
      setSelectedPart(part);
    }
  };

  return (
    <div style={{ margin: "20px" }}>
      <div style={{ textAlign: "center", display: "flex", justifyContent: "center", gap: "50px" }}>
        <div>
          <h2>Front View</h2>
          <ReactBodyHighlighter
            highlightedAreas={frontHighlightedAreas}
            bodyStyle={{ width: "300px", height: "400px" }}
            onPartClick={handlePartClick}
          />
        </div>
        <div>
          <h2>Back View</h2>
          <ReactBodyHighlighter
            highlightedAreas={backHighlightedAreas}
            bodyStyle={{ width: "300px", height: "400px" }}
            onPartClick={handlePartClick}
          />
        </div>
      </div>

      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <h3>Selection:</h3>
        <p>{Array.isArray(selectedPart) ? selectedPart.join(", ") : selectedPart || "None"}</p>

        <h3>Options:</h3>
        <div>
          <label>
            <input
              type="radio"
              value="disabled"
              checked={isDisabled}
              onChange={() => setIsDisabled(true)}
            />
            Disabled
          </label>
          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              value="not-disabled"
              checked={!isDisabled}
              onChange={() => setIsDisabled(false)}
            />
            Not Disabled
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>
            <input
              type="radio"
              value="multiple"
              checked={isMultiple}
              onChange={() => setIsMultiple(true)}
            />
            Multiple
          </label>
          <label style={{ marginLeft: "10px" }}>
            <input
              type="radio"
              value="single"
              checked={!isMultiple}
              onChange={() => setIsMultiple(false)}
            />
            Single
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>
            Body Colour:{" "}
            <input
              type="color"
              value={bodyColor}
              onChange={(e) => setBodyColor(e.target.value)}
            />
          </label>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label>
            Selection Colour:{" "}
            <input
              type="color"
              value={selectionColor}
              onChange={(e) => setSelectionColor(e.target.value)}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default BodyHighlighter;
