export default function ProgressBar({
  value = 0,
  className = "",
}) {
  return (
    <div
      className={`h-2 w-full overflow-hidden rounded-full bg-neutral-200 ${className}`}
    >
      <div
        className="h-full rounded-full bg-black transition-all duration-500"
        style={{
          width: `${value}%`,
        }}
      />
    </div>
  );
}