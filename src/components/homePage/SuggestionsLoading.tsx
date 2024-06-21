export default function SuggestionsLoading() {
  return (
    <div className="h-[350px] w-full flex gap-3 py-5 overflow-y-auto">
      {
        Array.from({ length: 5 }).map((_, index) => (
          <div key={index} className="w-[210px] h-full bg-slate-400 rounded-lg animate-pulse" />
        ))
      }
    </div>
  )
}
