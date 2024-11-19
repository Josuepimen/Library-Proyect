import Search from "./assets/Components/Search"
import imagen from "./assets/Imagen/hojas.jpg"

function App() {
  return (
    <div className="bg-slate-800 h-screen relative">
      <img src={imagen} alt="libros" className="absolute top-0 left-0 w-full h-full object-cover z-0" />
      <div className="flex-1 z-10 relative">
        <Search />
      </div>
    </div>
  )
}

export default App