const SkipCardSkeleton = () => {
  return (
    <div className="animate-pulse max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="h-48 bg-gray-300 rounded-t-lg dark:bg-gray-700" />
      <div className="p-5">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-4 dark:bg-gray-700" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-6 dark:bg-gray-600" />
        <div className="h-10 bg-blue-300 rounded w-1/2 dark:bg-blue-700" />
      </div>
    </div>
  );
};

export default SkipCardSkeleton;
