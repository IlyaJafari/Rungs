"use client";

import { PaperPlane } from "@boxicons/react";
import { createInvitation } from "../_lib/actions";
import { useState } from "react";

function InvitationForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [inviteUrl, setInviteUrl] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    try {
      const url = await createInvitation({ firstName, lastName, email });
      setInviteUrl(url);
      setFirstName("");
      setLastName("");
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("Invitation could not be sent. Please try again");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="border-2 border-steel rounded-xl">
      <div className="p-4 border-b-2 border-steel">
        <span className="text-xl">Athlete Registration</span>
      </div>

      <form onSubmit={handleSubmit} className=" p-4">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="first-name"
              className="uppercase text-sm font-medium after:content-['*'] after:ml-1 after:text-rust"
            >
              first name
            </label>
            <input
              id="first-name"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="e.g John"
              className="px-3 py-2 border-2 border-steel rounded-xl outline-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label
              htmlFor="last-name"
              className="uppercase text-sm font-medium after:content-['*'] after:ml-1 after:text-rust"
            >
              last name
            </label>
            <input
              id="last-name"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="e.g Doe"
              className="px-3 py-2 border-2 border-steel rounded-xl outline-none"
            />
          </div>

          <div className="flex flex-col gap-1 md:col-span-2">
            <label
              htmlFor="email"
              className="uppercase text-sm font-medium after:content-['*'] after:ml-1 after:text-rust"
            >
              email
            </label>
            <input
              id="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="athlete@performance.com"
              className="px-3 py-2 border-2 border-steel rounded-xl outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-2 flex items-center justify-center gap-2 bg-iron text-paper px-4 py-3 rounded-xl cursor-pointer hover:bg-iron/80 transition-colors"
          >
            <PaperPlane />
            <span>{isSubmitting ? "Sending..." : "Send Invitation"}</span>
          </button>
        </div>
      </form>

      {error && (
        <div className="mx-4 mb-4 rounded-xl bg-rust-100 text-rust text-sm p-3">
          {error}
        </div>
      )}

      {inviteUrl && (
        <div className="mx-4 mb-4 flex flex-col gap-2 rounded-xl bg-moss-100 text-moss text-sm p-3">
          <span>Invitation sent. You can also share the link directly</span>
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate bg-paper text-ink rounded-lg px-2 py-1 text-xs">
              {inviteUrl}
            </code>
            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(inviteUrl)}
              className="text-xs underline shrink-0 cursor-pointer"
            >
              Copy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InvitationForm;
