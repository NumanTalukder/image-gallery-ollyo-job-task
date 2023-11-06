import ImageGallery from './components/ImageGallery'
import './App.css'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  return (
    <div className='bg-slate-100 flex flex-col items-center justify-center min-h-screen'>
      <DndProvider backend={HTML5Backend}>
        <ImageGallery />
      </DndProvider>
    </div>
  )
}

export default App
