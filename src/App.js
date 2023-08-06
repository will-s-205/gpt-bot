import './App.scss'
import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import recruiterImg from './assets/images/movieboss.png'
import loading from './assets/images/loading.svg'
import logoMovie from './assets/images/logo-movie.png'
import sendBtn from './assets/images/send-btn-icon.png'

function App() {
  const speachBubbleText = 'Give me a one-sentence concept and I\'ll give you an eye-catching title, a synopsis the studios will love, a movie poster... AND choose the cast!'
  const [speachBubble, setSpeachBubble] = useState(speachBubbleText)
  const [isLoading, setIsLoading] = useState(false);

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY
  })

  delete configuration.baseOptions.headers['User-Agent']

  const openai = new OpenAIApi(configuration)

  async function fetchBotReply() {
    const response = await openai.createCompletion({
      'model': 'text-davinci-003',
      'prompt': 'Sound enthusiastic in five words or less.',
    })
    setSpeachBubble(response.data.choices[0].text)
  }

  function handleLoading() {
    setIsLoading(true)
  }

  function handleSubmit(e) {
    fetchBotReply()
    handleLoading()
  }

  return (
    <div className="App">

      {/* HEADER */}
      <header>
        <img src={logoMovie} alt="MoviePitch"></img>
        <a href="/"><span>Mini Recruiter</span></a>
      </header>
      <main>

        {/* SPEECH BUBBLE */}
        <section id="setup-container">
          <div className="setup-inner">
            <img src={recruiterImg} alt="recruiter"></img>
            <div className="speech-bubble-ai" id="speech-bubble-ai">
              <p id="recruiter-text">{speachBubble}</p>
            </div>
          </div>

          {/* INPUT AND LOADING */}
          {isLoading ? (
            <div className="setup-inner setup-input-container" id="setup-input-container">
              <img src={loading} className="loading" alt="Loading..."></img>
            </div>
          ) : (
            <div className="setup-inner setup-input-container" id="setup-input-container">
              <textarea id="setup-textarea"
                placeholder="An evil genius wants to take over the world using AI."></textarea>
              <button onClick={handleSubmit} className="send-btn" id="send-btn" aria-label="send">
                <img src={sendBtn} alt="send"></img>
              </button>
            </div>
          )}
        </section>

        {/*  */}
        <section className="output-container" id="output-container">
          <div id="output-img-container" className="output-img-container"></div>
          <h1 id="output-title"></h1>
          <h2 id="output-stars"></h2>
          <p id="output-text"></p>
        </section>
      </main>

      {/* FOOTER */}
      <footer>
        &copy; 2023 by William Step ?????????  {/* where is link to github? */}
      </footer>
    </div>
  );
}

export default App
