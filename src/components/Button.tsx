export function Button ({children}) {
  return (
    <button 
    className="bg-primary rounded-lg text-text-primary-dark hover:bg-[#0165d1] hover:scale-105 duration-300
    py-2 px-3 cursor-pointer"
    >
      {children}
    </button>
  )
}