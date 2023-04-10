import 'bootstrap/dist/css/bootstrap.min.css'
import { useStore } from './hooks/useStore'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { ArrowsIcon, ClipboardIcon, SpeakerIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { TextArea } from './components/TextArea'
import { Switch } from './components/Switch'
import { SectionType } from './types.d'
import { useEffect, useRef, useState } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'

function App () {
  const [copiedTooltip, setCopiedTooltip] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const target = useRef(null)
  const {
    fromLanguage,
    toLanguage,
    setResult,
    setFromLanguage,
    setToLanguage,
    interchangeLanguages,
    setFromText,
    fromText,
    result,
    loading
  } = useStore()

  const debouncedFromText = useDebounce(fromText, 500)

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then(result => {
        if (result == null) return
        setResult(result)
      })
      .catch(() => { setResult('Error') })
  }, [debouncedFromText, fromLanguage, toLanguage])

  useEffect(() => {
    if (copiedTooltip) {
      setTimeout(() => {
        setCopiedTooltip(false)
      }, 2000)
    }
  }, [copiedTooltip])

  const handleClipboard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
    setCopiedTooltip(true)
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
  }

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: darkMode ? '#1c1c1c' : '#faf8f8'
    }}>

      <Container fluid style={{ width: '80%', filter: darkMode ? 'invert(1)' : 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>AI Google Translate</h2>
          <Switch darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        <Row>
          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.From}
                value={fromLanguage}
                onChange={setFromLanguage}
              />
              <TextArea
                type={SectionType.From}
                onChange={setFromText}
                value={fromText}
                />
            </Stack>

          </Col>

          <Col xs='auto'>
            <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
              <ArrowsIcon />
            </Button>
          </Col>

          <Col>
            <Stack gap={2}>
              <LanguageSelector
                type={SectionType.To}
                value={toLanguage}
                onChange={setToLanguage}
              />
              <div style={{ position: 'relative' }}>
                <TextArea
                  loading={loading}
                  type={SectionType.To}
                  value={result}
                  onChange={setResult}
                />
                <div style={{ position: 'absolute', left: 0, bottom: 0, display: 'flex' }}>
                  <Button
                    variant='link'
                    ref={target}
                    onClick={handleClipboard}>
                      <ClipboardIcon />
                  </Button>
                  <Button
                    variant='link'
                    onClick={handleSpeak}>
                      <SpeakerIcon />
                  </Button>
                  <Overlay target={target.current} show={copiedTooltip} placement="bottom">
                    {(props) => (
                      <Tooltip id="copied-tooltip" {...props}>
                        Traducción copiada
                      </Tooltip>
                    )}
                </Overlay>
                </div>

              </div>
            </Stack>
          </Col>
        </Row>
    </Container>
    </div>

  )
}

export default App
