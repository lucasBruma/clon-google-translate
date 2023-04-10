import './Switch.css'
import { SunIcon, MoonIcon } from './Icons'

interface Props { darkMode: boolean, setDarkMode: (mode: boolean) => void }

export const Switch = ({ darkMode, setDarkMode }: Props) => {
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div style={{ display: 'flex' }}>
        <SunIcon darkMode={darkMode} />
        <label className="toggle-switch">
            <input type="checkbox" onChange={toggleDarkMode} />
            <span className="switch" />
        </label>
        <MoonIcon darkMode={darkMode} />
    </div>

  )
}
export default Switch
