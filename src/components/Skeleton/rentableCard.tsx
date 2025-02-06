import React from "react";

const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="product-card bg-white rounded-2xl">
      <div
        className="relative w-full h-60 bg-gray-300 rounded-3xl overflow-hidden"
        style={{ minHeight: "240px" }}
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"
          style={{ animation: "pulse 1.5s infinite" }}
        />
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4 shimmer"></div>
        <div className="h-3 bg-gray-300 rounded w-full shimmer"></div>
        <div className="h-3 bg-gray-300 rounded w-5/6 shimmer"></div>

        <div className="flex justify-between items-center mt-3">
          <div className="h-6 w-24 bg-gray-300 rounded shimmer"></div>
          <div className="h-4 w-20 bg-gray-300 rounded shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
