export default function HomeHeader() {
  return (
    <section className="w-full">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        
        {/* Welcome Text */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl">
            <span className="mr-2">👋</span>
            Good Morning, Rehan!
          </h1>

          <p className="mt-2 text-base text-neutral-500">
            Keep learning. Keep building. You&apos;re doing great!
          </p>
        </div>

        {/* Day Streak */}
        <div className="flex w-fit items-center gap-4 rounded-2xl border border-neutral-200 bg-white px-5 py-4 shadow-sm">
          
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-3xl">
            🔥
          </div>

          <div>
            <p className="text-2xl font-bold leading-none text-neutral-900">
              12
            </p>

            <p className="mt-1 text-sm font-medium text-neutral-600">
              Day Streak
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}