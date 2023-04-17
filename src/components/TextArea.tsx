import { Form } from 'react-bootstrap'
import { SectionType } from '../types.d'

type Props =
    | { type: SectionType.From, loading?: undefined, onChange: (value: string) => void, value: string }
    | { type: SectionType.To, loading?: boolean, onChange: (value: string) => void, value: string }

const commonStyles = { border: 0, height: '200px' }

const getPlaceholder = ({ type, loading }: { type: SectionType, loading?: boolean }) => {
  if (loading === true) return 'Traduciendo...'
  if (type === SectionType.From) return 'Introducir texto'
  return 'Traducción'
}

const getValue = ({ value, loading }: { value: string, loading?: boolean }) => {
  if (loading === true) return 'Traduciendo...'
  else return value
}

export const TextArea = ({ type, loading, onChange, value }: Props) => {
  const styles = type === SectionType.From
    ? commonStyles
    : { ...commonStyles, backgroundColor: '#f5f5f5' }

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
        <Form.Control
          as='textarea'
          placeholder={getPlaceholder({ type, loading })}
          autoFocus={type === SectionType.From}
          disabled={type === SectionType.To}
          style={styles}
          value={getValue({ value, loading })}
          onChange={handleChange}
        />
  )
}
