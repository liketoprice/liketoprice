import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function LikeToPriceDemo() {
  const [price, setPrice] = useState("");
  const [link, setLink] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [authorized, setAuthorized] = useState(null);
  const [ownerKnown, setOwnerKnown] = useState(false);

  const handleAuthorize = () => {
    const confirmed = confirm(
      "Authorize to receive and send offers via LikeToPrice.\n\nBy approving, access will be granted to your publicly shared photos, enabling others to submit purchase offers — just like you.\n\nNo personal data is shared without consent.\n\nApprove?"
    );
    setAuthorized(confirmed);
    setSubmitted(true);
  };

  const handleSendOffer = () => {
    if (!link || !price) return;

    const simulatedOwnerAuthorized = Math.random() > 0.5;

    if (simulatedOwnerAuthorized) {
      alert("Offer sent to the photo owner successfully.");
      setOwnerKnown(true);
    } else {
      alert(
        "This user has not yet joined LikeToPrice. We have sent them an invitation to authorize and receive your offer."
      );
      setOwnerKnown(false);
    }

    setSubmitted(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      <img src="/logo.svg" alt="LikeToPrice Logo" className="h-10 mb-6" />
      <h1 className="text-2xl font-bold mb-4">LikeToPrice</h1>

      {!authorized ? (
        <Card className="w-full max-w-md border border-gray-200 mb-6">
          <CardContent className="flex flex-col items-center p-4 gap-4">
            <h2 className="text-xl text-center font-semibold">
              Want to buy something you see online?
            </h2>
            <p className="text-center text-gray-700">
              Authorize to receive and send offers via LikeToPrice.
            </p>
            <Button
              onClick={handleAuthorize}
              className="w-full bg-blue-600 text-white"
            >
              Authorize
            </Button>
            <p className="text-xs text-center text-gray-500 mt-2">
              LikeToPrice connects people who share photos online with others who wish to make purchase offers on visible items. Once authorized, your public images are available for receiving offers. You are free to ignore, respond to, or accept any incoming offer at your discretion. No messages are exchanged without mutual approval.
            </p>
          </CardContent>
        </Card>
      ) : null}

      {authorized && !submitted && (
        <Card className="w-full max-w-md border border-gray-200">
          <CardContent className="flex flex-col items-center p-4 gap-4">
            <Input
              type="text"
              placeholder="Paste photo link (e.g. Instagram)"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <Input
              type="number"
              placeholder="Offer amount (₪)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Button
              onClick={handleSendOffer}
              className="w-full bg-green-600 text-white"
            >
              Send Offer
            </Button>
          </CardContent>
        </Card>
      )}

      {submitted && (
        <div className="text-center mt-10">
          {ownerKnown ? (
            <>
              <h2 className="text-xl font-semibold text-green-600 mb-2">
                Offer sent!
              </h2>
              <p className="text-gray-600">
                The photo owner is already on LikeToPrice and received your offer.
              </p>
            </>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-yellow-600 mb-2">
                Invitation sent
              </h2>
              <p className="text-gray-600">
                The photo owner hasn't joined LikeToPrice yet. We've invited them to authorize and receive your offer.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}