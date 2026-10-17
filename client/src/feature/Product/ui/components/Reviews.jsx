import { CircleCheck, MessageCircle, Star, ThumbsUp } from "lucide-react";
import React from "react";

const Reviews = ({ RatingStars, product, reviews }) => {
  return (
    <section id="reviews" className="scroll-mt-8 bg-gray-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-orange-600">
              Customer feedback
            </p>
            <h2 className="mt-2 text-2xl font-extrabold sm:text-3xl">
              Customer Reviews & Ratings
            </h2>
          </div>
          <button
            type="button"
            className="rounded-xl bg-orange-600 px-5 py-3 text-sm font-bold text-white hover:bg-orange-700"
          >
            Write a Review
          </button>
        </div>

        <div className="mt-8 grid gap-6 rounded-2xl border border-gray-100 bg-white p-5 sm:p-8 lg:grid-cols-3">
          <div className="flex flex-col items-center justify-center border-b border-gray-100 pb-6 text-center lg:border-b-0 lg:border-r lg:pb-0">
            <p className="text-6xl font-extrabold">4.8</p>
            <div className="mt-3">
              <RatingStars rating={5} size={20} />
            </div>
            <p className="mt-3 text-sm text-gray-500">
              Based on {product.reviews} reviews
            </p>
          </div>

          <div className="space-y-3 lg:col-span-2 lg:px-5">
            {[
              { stars: 5, percent: 78 },
              { stars: 4, percent: 15 },
              { stars: 3, percent: 5 },
              { stars: 2, percent: 1 },
              { stars: 1, percent: 1 },
            ].map((item) => (
              <div key={item.stars} className="flex items-center gap-3 text-sm">
                <span className="w-10 shrink-0 text-gray-600">
                  {item.stars} star
                </span>
                <Star
                  size={15}
                  className="shrink-0 text-amber-400"
                  fill="currentColor"
                />
                <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-amber-400"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <span className="w-10 text-right text-gray-500">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-extrabold">Recent Reviews</h3>
          <span className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600">
            Most Recent
          </span>
        </div>

        <div className="mt-5 space-y-4">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="rounded-2xl border border-gray-100 bg-white p-5 sm:p-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold ${review.color}`}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold">{review.name}</h4>
                    <p className="mt-1 text-xs text-gray-400">{review.date}</p>
                    {review.verified && (
                      <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-green-700">
                        <CircleCheck size={14} />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                </div>
                <RatingStars rating={review.rating} />
              </div>

              <h5 className="mt-4 font-bold">{review.title}</h5>
              <p className="mt-2 text-sm leading-7 text-gray-600">
                {review.text}
              </p>

              <div className="mt-5 flex items-center gap-4 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <ThumbsUp size={15} />
                  Helpful ({review.helpful})
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={15} />
                  Reply
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button
            type="button"
            className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-bold hover:border-orange-500 hover:text-orange-600"
          >
            View All Reviews
          </button>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
