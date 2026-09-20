export default function HomePage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-600 to-blue-900 px-4 py-24 text-center text-white">
        <h1 className="text-4xl font-bold md:text-5xl">Bulk Candy Direct from Damiir</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-blue-100">
          Wholesale prices for retailers and event planners. Quality treats, shipped fast.
        </p>
        <a
          href="/products"
          className="mt-8 inline-block rounded-lg bg-white px-8 py-3 font-semibold text-blue-700 hover:bg-blue-50"
        >
          Shop Now
        </a>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-center text-2xl font-bold">Why Damiir&apos;s Treats?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {[
            { t: "Wholesale Pricing", d: "Competitive bulk rates for retailers and event planners." },
            { t: "Fast Shipping", d: "Free standard shipping on orders over $75." },
            { t: "Quality Guaranteed", d: "Fresh products and satisfaction guarantee." },
          ].map((x) => (
            <div key={x.t} className="rounded-xl border bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">{x.t}</h3>
              <p className="mt-2 text-sm text-gray-600">{x.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
