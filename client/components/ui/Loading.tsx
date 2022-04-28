const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-3">
      <svg
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mr-2 mb-12 inline h-24 w-24 animate-spin border-indigo-500 fill-indigo-600 text-transparent lg:h-32 lg:w-32"
      >
        <path
          d="M100 50.59c0 27.615-22.386 50.001-50 50.001s-50-22.386-50-50 22.386-50 50-50 50 22.386 50 50Zm-90.919 0c0 22.6 18.32 40.92 40.919 40.92 22.599 0 40.919-18.32 40.919-40.92 0-22.598-18.32-40.918-40.919-40.918-22.599 0-40.919 18.32-40.919 40.919Z"
          fill="currentColor"
        />
        <path
          d="M93.968 39.04c2.425-.636 3.894-3.128 3.04-5.486A50 50 0 0 0 41.735 1.279c-2.474.414-3.922 2.919-3.285 5.344.637 2.426 3.12 3.849 5.6 3.484a40.916 40.916 0 0 1 44.131 25.769c.902 2.34 3.361 3.802 5.787 3.165Z"
          fill="currentFill"
        />
      </svg>

      <p className="text-skin text-xl lg:text-2xl">Website loading...</p>
    </div>
  )
}

export default Loading
