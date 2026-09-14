"use client";

import { startTransition, useOptimistic, useState } from "react";
import { addPersonalNote, deletePersonalNote } from "../_lib/actions";
import { Trash } from "@boxicons/react";

function TakeNotes({ notes }) {
  const [content, setContent] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [optimisticNotes, addOptimisticNote] = useOptimistic(
    notes,
    (state, newNote) => [newNote, ...state],
  );

  function handleSave() {
    if (!content.trim()) return;

    const tempNote = {
      id: crypto.randomUUID(),
      content,
      created_at: new Date().toISOString(),
    };

    setContent("");

    startTransition(async () => {
      addOptimisticNote(tempNote);
      try {
        await addPersonalNote(tempNote.content);
      } catch (err) {
        console.error(err);
      }
    });
  }

  async function handleDelete(noteId) {
    setDeletingId(noteId);
    try {
      await deletePersonalNote(noteId);
    } catch (err) {
      console.error(err);
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="rounded-xl border border-steel bg-paper">
      <div className="px-4 py-3 border-b border-steel">
        <span className="text-lg font-medium">Take a note</span>
      </div>

      <div className="p-4 flex flex-col gap-3">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={1000}
          placeholder="Things to remember..."
          className="w-full h-48 bg-steel border-2 border-slate/10 rounded-xl outline-none focus:ring-2 focus:ring-iron-300 p-3"
        />
        <button
          type="button"
          onClick={handleSave}
          className="bg-iron text-paper mt-4 px-4 py-2 rounded-xl w-full hover:bg-iron/80 cursor-pointer transition-colors"
        >
          Save
        </button>

        {optimisticNotes.length > 0 && (
          <div className="flex flex-col gap-2 mt-2 max-h-48 overflow-y-auto">
            {optimisticNotes.map((note) => (
              <div
                key={note.id}
                className="flex items-start justify-between gap-2 p-2 text-sm border-b border-steel"
              >
                <span>{note.content}</span>
                <button
                  type="button"
                  onClick={() => handleDelete(note.id)}
                  disabled={deletingId === note.id}
                  className="text-rust shrink-0 disabled:opacity-40"
                >
                  <Trash width={20} height={20} className="cursor-pointer" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default TakeNotes;
