function TakeNotes() {
  return (
    <div className="rounded-xl border border-steel bg-paper">
      <div className="px-4 py-3 border-b border-steel">
        <span className="text-lg font-medium">Take a note</span>
      </div>

      <form className="p-4">
        <label htmlFor="note" className="sr-only">
          Take a note
        </label>
        <textarea
          id="note"
          name="note"
          maxLength={1000}
          className="w-full h-48 bg-steel border-2 border-slate/10 rounded-xl outline-none focus:ring-2 focus:ring-iron-300 p-3"
        />
        <button
          type="submit"
          className="bg-iron text-paper mt-4 px-4 py-2 rounded-xl w-full hover:bg-iron/80 cursor-pointer transition-colors"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default TakeNotes;
