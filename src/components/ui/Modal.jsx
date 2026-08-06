import { cn } from "@/lib/utils";

export default function Modal({
  open,
  onClose,
  title,
  children,
  className,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div
        className={cn(
          "w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl",
          className
        )}
      >

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-xl font-bold text-neutral-900">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-neutral-100"
            aria-label="Close modal"
          >
            ✕
          </button>

        </div>

        {children}

      </div>

    </div>
  );
}