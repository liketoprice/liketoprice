
import React, { useState } from "react";

function App() {
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [ownerKnown, setOwnerKnown] = useState(false);

  const handleAuthorize = () => {
    const confirmed = window.confirm(
      "Authorize to receive and send offers via LikeToPrice.\n\nBy approving, access will be granted to your publicly shared photos.\n\nApprove?"
    );
    if (confirmed) {
      setAuthorized(true);
    }
  };

  const handleSendOffer = () => {
    if (!link || !price) return;
    const simulatedOwnerAuthorized = Math.random() > 0.5;
    if (simulatedOwnerAuthorized) {
      alert("Offer sent to the photo owner successfully.");
      setOwnerKnown(true);
    } else {
      alert("This user hasn't joined yet. We've sent them an invitation.");
      setOwnerKnown(false);
    }
    setSubmitted(true);
  };

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      <img src="/logo.svg" alt="Logo" style={{ height: 40 }} />
      <h1>LikeToPrice</h1>
      {!authorized ? (
        <button onClick={handleAuthorize}>Authorize</button>
      ) : !submitted ? (
        <div>
          <input
            placeholder="Paste photo link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            style={{ display: "block", margin: "10px 0", width: "100%" }}
          />
          <input
            type="number"
            placeholder="Offer amount (₪)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{ display: "block", margin: "10px 0", width: "100%" }}
          />
          <button onClick={handleSendOffer}>Send Offer</button>
        </div>
      ) : ownerKnown ? (
        <p>Offer sent! The owner received your offer.</p>
      ) : (
        <p>Invitation sent. Waiting for owner's approval.</p>
      )}
    </div>
  );
}

export default App;
