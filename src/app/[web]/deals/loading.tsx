export default function Loading() {
  return (
    <div className="flex flex-wrap gap-12 mb-5">
      {
        Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="min-w-[210px] w-[210px] h-[350px] animate-pulse p-5 rounded-lg shadow-lg bg-gray-100">
          </div>
        ))
      }
    </div>
  )
}
