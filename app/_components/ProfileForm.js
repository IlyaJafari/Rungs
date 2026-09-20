"use client";

import { useState } from "react";
import { updateCoachName } from "../_lib/actions";
import { getInitials } from "../_utils/helpers";
import SignOutButton from "./SignOutButton";

function ProfileForm({ coach, email }) {
  const [fullName, setFullName] = useState(coach?.full_name ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const hasChanges = fullName.trim() !== (coach?.full_name ?? "").trim();

  async function handleSave(e) {
    e.preventDefault();
    if (!fullName.trim() || !hasChanges) return;

    setIsSaving(true);
    setSaved(false);
    try {
      await updateCoachName(fullName.trim());
      setSaved(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4 rounded-xl border-2 border-steel p-4">
        {coach?.avatar_url ? (
          <img
            src={coach.avatar_url}
            alt="Profile"
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-xl object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-iron-100 text-iron flex items-center justify-center text-lg font-medium">
            {getInitials(coach?.full_name)}
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-slate">
            Synced from your Google account
          </span>
        </div>
      </div>

      <form
        onSubmit={handleSave}
        className="flex flex-col gap-4 rounded-xl border-2 border-steel p-4"
      >
        <div className="flex flex-col gap-1">
          <label htmlFor="full-name" className="text-sm text-slate">
            Name
          </label>
          <input
            id="full-name"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              setSaved(false);
            }}
            className="bg-steel rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-iron-300"
          />
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-sm text-slate">Email</span>
          <span className="px-3 py-2 text-light-ink">{email}</span>
        </div>

        <div className="flex flex-col gap-1">
          <span className="tet-sm text-slate">Role</span>
          <span className="px-3 py-2 text-light-ink capitalize">
            {coach?.role}
          </span>
        </div>

        <button
          type="submit"
          disabled={!hasChanges || isSaving}
          className="bg-iron text-paper px-4 py-2 rounded-xl hover:bg-iron/80 transition-colors disabled:opacity-50 self-start"
        >
          {isSaving ? "Saving..." : saved ? "Saved" : "Save changes"}
        </button>
      </form>

      <SignOutButton />
    </div>
  );
}

export default ProfileForm;
