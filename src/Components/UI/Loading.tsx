const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-1 font-medium">
        <span>Loading</span>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-violet-500 rounded-full transition-transform duration-100 ease-in-out animate-bounce" />
          <div className="w-2 h-2 bg-violet-500 rounded-full transition-transform duration-200 ease-in-out animate-bounce" />
          <div className="w-2 h-2 bg-violet-500 rounded-full transition-transform duration-300 ease-in-out animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default Loading;