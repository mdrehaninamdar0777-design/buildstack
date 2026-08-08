import { testimonials } from "./testimonials.data";

export default function Testimonials() {
  return (
    <section className="w-full bg-white px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 text-center">

          <p className="text-sm font-medium uppercase tracking-wide text-neutral-500">
            Loved by Developers
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 lg:text-4xl">
            Developers Are Building Better With BuildStack
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-neutral-600">
            See how developers are using BuildStack to learn consistently,
            track their progress, and build real skills.
          </p>

        </div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-3">

          {testimonials.map((testimonial) => (
            <article
              key={testimonial.id}
              className="rounded-2xl border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg"
            >

              {/* User */}
              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-100">

                  {testimonial.image ? (
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-neutral-700">
                      {testimonial.name.charAt(0)}
                    </span>
                  )}

                </div>

                <div>
                  <h3 className="font-semibold text-neutral-900">
                    {testimonial.name}
                  </h3>

                  <p className="mt-1 text-sm text-neutral-500">
                    {testimonial.role}
                  </p>
                </div>

              </div>

              {/* Rating */}
              <div className="mt-5 flex items-center gap-1">
                {Array.from({ length: testimonial.rating }).map(
                  (_, index) => (
                    <span
                      key={index}
                      className="text-sm text-yellow-500"
                    >
                      ★
                    </span>
                  )
                )}
              </div>

              {/* Message */}
              <p className="mt-5 text-[15px] leading-7 text-neutral-600">
                “{testimonial.message}”
              </p>

            </article>
          ))}

        </div>

      </div>
    </section>
  );
} 