import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import './TripSurvey.css'

interface SurveyData {
  city: string
  budgetFrom: string
  budgetTo: string
  suggestedLocation: string
  canJuly: 'yes' | 'no' | ''
  selectedDates: number[]
  alternativeDates: string
  expectations: string
  wishes: string
  suggestions: string
}

const JULY_DAYS = Array.from({ length: 20 }, (_, i) => i + 1)
const DAY_NAMES = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

// July 1, 2025 is Tuesday (index 1 in 0-based Monday week)
const JULY_1_OFFSET = 1 // Tuesday

const TOTAL_STEPS = 7

const TripSurvey = () => {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<SurveyData>({
    city: '',
    budgetFrom: '',
    budgetTo: '',
    suggestedLocation: '',
    canJuly: '',
    selectedDates: [],
    alternativeDates: '',
    expectations: '',
    wishes: '',
    suggestions: '',
  })

  const updateField = <K extends keyof SurveyData>(field: K, value: SurveyData[K]) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const toggleDate = (day: number) => {
    setData(prev => ({
      ...prev,
      selectedDates: prev.selectedDates.includes(day)
        ? prev.selectedDates.filter(d => d !== day)
        : [...prev.selectedDates, day].sort((a, b) => a - b),
    }))
  }

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return data.city.trim().length > 0
      case 2: return data.budgetFrom.trim().length > 0 && data.budgetTo.trim().length > 0
      case 3: return data.suggestedLocation.trim().length > 0
      case 4:
        if (data.canJuly === '') return false
        if (data.canJuly === 'yes') return data.selectedDates.length > 0
        return data.alternativeDates.trim().length > 0
      case 5: return data.expectations.trim().length > 0
      case 6: return data.wishes.trim().length > 0
      case 7: return data.suggestions.trim().length > 0
      default: return false
    }
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS) setStep(step + 1)
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (!canProceed()) return
    setIsSubmitting(true)
    setError('')

    try {
      await addDoc(collection(db, 'tripSurvey'), {
        city: data.city.trim(),
        budgetFrom: data.budgetFrom.trim(),
        budgetTo: data.budgetTo.trim(),
        suggestedLocation: data.suggestedLocation.trim(),
        canJuly: data.canJuly,
        selectedDates: data.canJuly === 'yes' ? data.selectedDates : [],
        alternativeDates: data.canJuly === 'no' ? data.alternativeDates.trim() : '',
        expectations: data.expectations.trim(),
        wishes: data.wishes.trim(),
        suggestions: data.suggestions.trim(),
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
      })
      setIsSubmitted(true)
    } catch (err) {
      console.error('Error submitting survey:', err)
      setError('Произошла ошибка при отправке. Попробуйте ещё раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatSelectedDates = (): string => {
    if (data.selectedDates.length === 0) return ''
    return data.selectedDates.map(d => `${d} июля`).join(', ')
  }

  if (isSubmitted) {
    return (
      <div className="trip-survey-page">
        <div className="survey-container">
          <div className="success-screen">
            <div className="success-icon">&#10003;</div>
            <h2 className="success-title">Спасибо!</h2>
            <p className="success-text">Ваши ответы успешно отправлены. Мы учтём их при планировании поездки.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="trip-survey-page">
      <div className="survey-container">
        <div className="survey-header">
          <h1 className="survey-title">Поездка на море</h1>
          <p className="survey-subtitle">Уникальная программа от старших</p>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>
        <div className="step-indicator">Шаг {step} из {TOTAL_STEPS}</div>

        <div className="step-content">
          {step === 1 && (
            <div className="step">
              <h2 className="step-title">Твой город?</h2>
              <input
                type="text"
                className="survey-input"
                value={data.city}
                onChange={e => updateField('city', e.target.value)}
                placeholder="Например: Кишинёв"
                autoFocus
              />
            </div>
          )}

          {step === 2 && (
            <div className="step">
              <h2 className="step-title">Какой бюджет на поездку?</h2>
              <p className="step-hint">Укажите диапазон в евро</p>
              <div className="budget-row">
                <div className="budget-field">
                  <label className="budget-label">От</label>
                  <input
                    type="number"
                    className="survey-input"
                    value={data.budgetFrom}
                    onChange={e => updateField('budgetFrom', e.target.value)}
                    placeholder="100"
                    min="0"
                    autoFocus
                  />
                </div>
                <div className="budget-divider">—</div>
                <div className="budget-field">
                  <label className="budget-label">До</label>
                  <input
                    type="number"
                    className="survey-input"
                    value={data.budgetTo}
                    onChange={e => updateField('budgetTo', e.target.value)}
                    placeholder="500"
                    min="0"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step">
              <h2 className="step-title">Предложите свою локацию</h2>
              <p className="step-hint">Куда бы вы хотели поехать?</p>
              <input
                type="text"
                className="survey-input"
                value={data.suggestedLocation}
                onChange={e => updateField('suggestedLocation', e.target.value)}
                placeholder="Например: Египет, Турция, Одесса..."
                autoFocus
              />
              <p className="step-hint" style={{opacity: 0.5, paddingTop: 12}}>Про Одессу шучу)</p>
              </div>
          )}

          {step === 4 && (
            <div className="step">
              <h2 className="step-title">Планы на июль (1–20)</h2>
              <p className="step-hint">Сможете ли вы в этот отрезок времени?</p>

              <div className="july-choice">
                <button
                  className={`choice-btn ${data.canJuly === 'yes' ? 'active' : ''}`}
                  onClick={() => updateField('canJuly', 'yes')}
                >
                  Да, смогу
                </button>
                <button
                  className={`choice-btn ${data.canJuly === 'no' ? 'active' : ''}`}
                  onClick={() => updateField('canJuly', 'no')}
                >
                  Нет, не смогу
                </button>
              </div>

              {data.canJuly === 'yes' && (
                <div className="calendar-section">
                  <p className="calendar-hint">Выберите даты, когда вы свободны:</p>
                  <div className="mini-calendar">
                    <div className="calendar-header-row">
                      {DAY_NAMES.map(d => (
                        <div key={d} className="calendar-day-name">{d}</div>
                      ))}
                    </div>
                    <div className="calendar-grid">
                      {Array.from({ length: JULY_1_OFFSET }).map((_, i) => (
                        <div key={`empty-${i}`} className="calendar-cell empty" />
                      ))}
                      {JULY_DAYS.map(day => (
                        <div
                          key={day}
                          className={`calendar-cell ${data.selectedDates.includes(day) ? 'selected' : ''}`}
                          onClick={() => toggleDate(day)}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                  </div>
                  {data.selectedDates.length > 0 && (
                    <div className="selected-summary">
                      Выбрано: {formatSelectedDates()}
                    </div>
                  )}
                </div>
              )}

              {data.canJuly === 'no' && (
                <div className="alternative-section">
                  <p className="calendar-hint">Предложите свои даты:</p>
                  <input
                    type="text"
                    className="survey-input"
                    value={data.alternativeDates}
                    onChange={e => updateField('alternativeDates', e.target.value)}
                    placeholder="Например: 21–31 июля, август..."
                    autoFocus
                  />
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="step">
              <h2 className="step-title">Какие ожидания от поездки?</h2>
              <div className="textarea-wrapper">
                <textarea
                  className="survey-textarea"
                  value={data.expectations}
                  onChange={e => {
                    if (e.target.value.length <= 100) updateField('expectations', e.target.value)
                  }}
                  placeholder="Расскажите, чего вы ждёте от поездки..."
                  rows={4}
                  autoFocus
                />
                <span className="char-count">{data.expectations.length}/100</span>
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="step">
              <h2 className="step-title">Пожелания</h2>
              <div className="textarea-wrapper">
                <textarea
                  className="survey-textarea"
                  value={data.wishes}
                  onChange={e => {
                    if (e.target.value.length <= 100) updateField('wishes', e.target.value)
                  }}
                  placeholder="Ваши пожелания к поездке..."
                  rows={4}
                  autoFocus
                />
                <span className="char-count">{data.wishes.length}/100</span>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="step">
              <h2 className="step-title">Предложения</h2>
              <div className="textarea-wrapper">
                <textarea
                  className="survey-textarea"
                  value={data.suggestions}
                  onChange={e => {
                    if (e.target.value.length <= 100) updateField('suggestions', e.target.value)
                  }}
                  placeholder="Ваши предложения..."
                  rows={4} 
                  autoFocus
                />
                <span className="char-count">{data.suggestions.length}/100</span>
              </div>
            </div>
          )}
        </div>

        {error && <div className="survey-error">{error}</div>}

        <div className="survey-nav">
          {step > 1 && (
            <button className="nav-btn back-btn" onClick={handleBack}>
              Назад
            </button>
          )}
          {step < TOTAL_STEPS ? (
            <button
              className="nav-btn next-btn"
              onClick={handleNext}
              disabled={!canProceed()}
            >
              Далее
            </button>
          ) : (
            <button
              className="nav-btn submit-btn"
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
            >
              {isSubmitting ? 'Отправка...' : 'Отправить'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default TripSurvey
