const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="w-16 h-16 border-4 border-solid rounded-full border-colorPrimary border-t-transparent animate-spin"></div>
    </div>
  );
};

export default LoadingSpinner;
