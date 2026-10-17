const ProductLoading = ({ count = 5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <tr key={index} className="animate-pulse">
          {/* Product */}
          <td className="px-6 py-5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-32 rounded bg-gray-200" />
                <div className="h-3 w-20 rounded bg-gray-100" />
              </div>
            </div>
          </td>

          {/* Category */}
          <td className="px-6 py-5">
            <div className="h-4 w-20 rounded bg-gray-200" />
          </td>

          {/* Price */}
          <td className="px-6 py-5">
            <div className="h-4 w-16 rounded bg-gray-200" />
          </td>

          {/* Stock */}
          <td className="px-6 py-5">
            <div className="h-4 w-10 rounded bg-gray-200" />
          </td>

          {/* Status */}
          <td className="px-6 py-5">
            <div className="h-6 w-16 rounded-full bg-gray-200" />
          </td>

          {/* Actions */}
          <td className="px-6 py-5">
            <div className="flex gap-3">
              <div className="h-4 w-8 rounded bg-gray-200" />
              <div className="h-4 w-12 rounded bg-gray-200" />
            </div>
          </td>
        </tr>
      ))}
    </>
  );
};

export default ProductLoading;
