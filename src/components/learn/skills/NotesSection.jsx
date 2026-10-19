import {
  Download,
  FileText,
} from "lucide-react";

export default function NotesSection({ notes }) {
  return (
    <div className="p-5">
      <div className="rounded-xl border border-neutral-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-neutral-700" />

          <div>
            <h3 className="font-semibold text-neutral-900">
              Notes (PDF)
            </h3>

            <p className="mt-1 text-sm text-neutral-500">
              Download and read well-structured notes to understand
              concepts in depth.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-neutral-200">
        {notes?.map((note) => (
          <div
            key={note.id}
            className="flex items-center gap-4 border-b border-neutral-100 px-4 py-4 last:border-b-0"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-50">
              <span className="text-xs font-bold text-neutral-700">
                PDF
              </span>
            </div>

            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-neutral-900">
                {note.title}
              </h4>

              <p className="mt-1 text-xs text-neutral-500">
                {note.chapter} · {note.pages}
              </p>
            </div>

            <span className="hidden text-xs text-neutral-500 sm:block">
              {note.size}
            </span>

            <button
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 hover:bg-neutral-50"
              aria-label={`Download ${note.title}`}
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-center">
        <button
          type="button"
          className="rounded-lg border border-neutral-200 px-5 py-2.5 text-sm font-semibold text-neutral-900 hover:bg-neutral-50"
        >
          View All Notes (PDF) →
        </button>
      </div>
    </div>
  );
}