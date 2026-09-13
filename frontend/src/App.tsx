import './App.css'
import Upload from './components/Upload'

function App() {

  return (
    <>
      <section id = "title">
        <h1>Anatomy Analyzer</h1>
      </section>

      <section id = "app-content" className = "appContentContainer">

        <Upload />
        <h2>Summary</h2>
      </section>
    </>
  )

}

export default App
