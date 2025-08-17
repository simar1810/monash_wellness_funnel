import Image from "next/image";

const testimonials = [
  {
    name: "Vikas",
    date: "2024-05-17",
    image: null, // Replace with actual image or avatar path
    rating: 5,
    text: "“Monash Wellness ka support aur simple plans ne meri life change kar di.”",
  },
  {
    name: "Manpreet",
    date: "2024-05-16",
    image: null,
    initials: "N",
    rating: 5,
    text: "“Main busy schedule ke chakkar mein apni health neglect kar raha tha. Ab sab manageable ho gaya hai.”",
  },

  {
    name: "Anjali",
    date: "2024-05-08",
    image: null,
    rating: 5,
    text: "“Itna effective aur personalised diet plan pehli baar mila.”",
  },
];

export default function ClientTestimonialsGrid() {
  return (
    <section className="w-full py-12 md:py-14 lg:py-14 bg-white">
      <div className="container px-4 md:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((review, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border border-gray-200 p-4 shadow-md text-left flex flex-col"
            >
              <div className="flex items-center gap-3 mb-2">
                {review.image ? (
                  <Image
                    src={review.image}
                    alt={review.name}
                    width={40}
                    height={40}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {review.initials}
                  </div>
                )}
                <div className="flex-1">
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-xs text-gray-500">{review.date}</p>
                </div>
                <Image
                  src="/google-icon.svg" // Replace with your own icon
                  alt="Google"
                  width={20}
                  height={20}
                />
              </div>

              <div className="flex items-center mb-2">
                {Array.from({ length: review.rating }).map((_, idx) => (
                  <span key={idx} className="text-yellow-500 text-sm">
                    ★
                  </span>
                ))}
              </div>

              <p className="text-sm text-gray-700 line-clamp-3">
                {review.text}
              </p>

              <a className="text-blue-500 text-sm mt-2 cursor-pointer hover:underline">
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
