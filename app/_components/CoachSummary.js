"use client";

import { FileDetail, Plus, Trash } from "@boxicons/react";
import { startTransition, useOptimistic, useState } from "react";
import { addCoachNote, deleteCoachNote } from "../_lib/actions";

function CoachSummary({ coachNotes, client }) {
  const [isAdding, setIsAdding] = useState(false);
  const [content, setContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [optimisticNotes, addOptimisticNote] = useOptimistic(
    coachNotes,
    (state, newNote) => [newNote, ...state],
  );

  async function handleSave() {
    if (!content.trim()) return;

    const tempNote = {
      id: crypto.randomUUID(),
      content,
      created_at: new Date().toISOString(),
    };

    setContent("");
    setIsAdding(false);

    startTransition(async () => {
      addOptimisticNote(tempNote);
      try {
        await addCoachNote(client.id, content);
      } catch (err) {
        console.error(err);
      }
    });
  }

  function handleCancel() {
    setContent("");
    setIsAdding(false);
  }

  async function handleDelete(noteId) {
    setDeletingId(noteId);
    try {
      await deleteCoachNote(noteId, client.id);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="border-2 border-steel rounded-xl">
      <div className="flex items-center justify-between border-b-2 p-4 border-steel">
        <div className="flex items-center gap-2">
          <FileDetail />
          <h3 className="uppercase text-lg">coach summary & observations</h3>
        </div>

        {!isAdding && (
          <button
            type="button"
            onClick={() => setIsAdding(true)}
            className="flex items-center gap-2 text-paper bg-iron text-sm px-4 py-2 rounded-xl cursor-pointer"
          >
            <Plus width={16} height={16} />
            <span className="font-medium">Add Note</span>
          </button>
        )}
      </div>

      {isAdding && (
        <div className="flex flex-col gap-2 p-4 border-b-2 border-steel">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What are you observing about this client?"
            autoFocus
            className="w-full h-24 bg-steel p-3 outline-none focus:ring-2 focus:ring-iron-300"
          />
          <div className="flex gap-2 justify-end">
            <button
              type="button"
              onClick={handleCancel}
              className="text-sm px-4 py-2 rounded-xl border-2 border-steel cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="text-sm text-paper bg-iron px-4 py-2 rounded-xl disabled:opacity-50 cursor-pointer"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      )}

      {optimisticNotes.length === 0 ? (
        <p className="italic p-4 text-slate">No observations yet.</p>
      ) : (
        <div className="divide-y divide-steel">
          {optimisticNotes.map((note) => (
            <div
              key={note.id}
              className="flex items-center justify-between p-4"
            >
              <div>
                <p className="italic">&quot;{note.content}&quot;</p>
                <span className="text-xs text-slate">
                  {new Date(note.created_at).toLocaleDateString()}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(note.id)}
                disabled={deletingId === note.id}
                className="text-rust hover:text-rust/70 shrink-0 disabled:opacity-40 cursor-pointer"
              >
                <Trash width={20} height={20} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CoachSummary;
