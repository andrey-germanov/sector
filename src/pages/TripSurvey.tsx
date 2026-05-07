import { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import './TripSurvey.css'

type DepartureGroup = 'chisinau' | 'vilnius' | ''
type RoomType = 'double' | 'triple' | ''

interface BookingData {
  telegram: string
  fullName: string
  age: string
  sector: string
  departureCity: string
  departureGroup: DepartureGroup
  roomType: RoomType
  roommateTelegram: string
  activities: string[]
  activitiesOther: string
  helpOrganize: string[]
  helpOrganizeOther: string
  willPay: 'yes' | 'no' | ''
  paymentNotes: string
}

const CITY_GROUPS: {
  group: DepartureGroup
  airport: string
  cities: { label: string; value: string }[]
}[] = [
  {
    group: 'chisinau',
    airport: 'Вылет из Кишинёва',
    cities: [
      { label: 'Кишинёв', value: 'Кишинёв' },
      { label: 'Одесса', value: 'Одесса' },
      { label: 'Киев', value: 'Киев' },
    ],
  },
  {
    group: 'vilnius',
    airport: 'Вылет из Вильнюса',
    cities: [
      { label: 'Вильнюс', value: 'Вильнюс' },
      { label: 'Рига', value: 'Рига' },
      { label: 'Таллин', value: 'Таллин' },
    ],
  },
]

const cityToGroup = (value: string): DepartureGroup => {
  for (const g of CITY_GROUPS) {
    if (g.cities.some(c => c.value === value)) return g.group
  }
  return ''
}

const ACTIVITIES = ['Футбол', 'Волейбол', 'Аквапарк / водные активности', 'Вечеринки / диджей-сеты']
const HELP_OPTIONS = [
  'Спортивные активности',
  'Вечеринки и музыку',
  'Экскурсии / поездки',
  'Фото/видео контент',
]

const HOTEL = {
  name: 'Vita Silva Hotel',
  stars: 5,
  location: 'Кызылот, Турция · 2.2 км до пляжа Кызылот',
  bookingUrl: 'https://www.booking.com/Share-4JCcsq',
  description:
    '5★ отель в Кызылоте, в 2.2 км от Общественного пляжа. Сезонный открытый бассейн, сад, ресторан, бар, бесплатная парковка и Wi-Fi. Завтрак «шведский стол» (есть вегетарианский и веганский варианты).',
  highlights: [
    'Оздоровительный центр: сауна, хаммам',
    'Бильярд, настольный теннис, дартс',
    'Кондиционер, сейф и ТВ в каждом номере',
    'Круглосуточная стойка регистрации, обмен валют, аренда авто',
    'Аэропорт Газипаша-Аланья — 81 км',
  ],
}

const TOTAL_STEPS = 7

const TripSurvey = () => {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [data, setData] = useState<BookingData>({
    telegram: '',
    fullName: '',
    age: '',
    sector: '',
    departureCity: '',
    departureGroup: '',
    roomType: '',
    roommateTelegram: '',
    activities: [],
    activitiesOther: '',
    helpOrganize: [],
    helpOrganizeOther: '',
    willPay: '',
    paymentNotes: '',
  })

  const updateField = <K extends keyof BookingData>(field: K, value: BookingData[K]) => {
    setData(prev => ({ ...prev, [field]: value }))
  }

  const setCity = (value: string) => {
    setData(prev => ({
      ...prev,
      departureCity: value,
      departureGroup: cityToGroup(value),
    }))
  }

  const toggleListItem = (field: 'activities' | 'helpOrganize', value: string) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(v => v !== value)
        : [...prev[field], value],
    }))
  }

  const tripDates =
    data.departureGroup === 'chisinau'
      ? '07.07 — 13.07 (6 ночей)'
      : data.departureGroup === 'vilnius'
      ? '06.07 — 11.07 (5 ночей)'
      : ''

  const prepayPercent =
    data.departureGroup === 'chisinau' ? 10 : data.departureGroup === 'vilnius' ? 20 : 0

  const canProceed = (): boolean => {
    switch (step) {
      case 1:
        return (
          data.telegram.trim().length > 0 &&
          data.fullName.trim().length > 0 &&
          data.age.trim().length > 0 &&
          data.sector.trim().length > 0
        )
      case 2:
        return true
      case 3:
        return (
          data.departureCity.length > 0 &&
          data.roomType.length > 0 &&
          data.roommateTelegram.trim().length > 0
        )
      case 4:
        return data.departureGroup !== ''
      case 5:
        return data.activities.length > 0 || data.activitiesOther.trim().length > 0
      case 6:
        return data.helpOrganize.length > 0 || data.helpOrganizeOther.trim().length > 0
      case 7:
        return data.willPay !== ''
      default:
        return false
    }
  }

  const handleNext = () => { if (step < TOTAL_STEPS) setStep(step + 1) }
  const handleBack = () => { if (step > 1) setStep(step - 1) }

  const handleSubmit = async () => {
    if (!canProceed()) return
    setIsSubmitting(true)
    setError('')

    try {
      await addDoc(collection(db, 'sectorTripBooking'), {
        telegram: data.telegram.trim(),
        fullName: data.fullName.trim(),
        age: data.age.trim(),
        sector: data.sector.trim(),
        departureCity: data.departureCity,
        departureGroup: data.departureGroup,
        tripDates,
        roomType: data.roomType,
        roommateTelegram: data.roommateTelegram.trim(),
        activities: data.activities,
        activitiesOther: data.activitiesOther.trim(),
        helpOrganize: data.helpOrganize,
        helpOrganizeOther: data.helpOrganizeOther.trim(),
        willPay: data.willPay,
        prepayPercent,
        paymentNotes: data.paymentNotes.trim(),
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString(),
      })
      setIsSubmitted(true)
    } catch (err) {
      console.error('Error submitting booking:', err)
      setError('Произошла ошибка при отправке. Попробуйте ещё раз.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="trip-survey-page">
        <div className="survey-container">
          <div className="success-screen">
            <div className="success-icon">&#10003;</div>
            <h2 className="success-title">Спасибо!</h2>
            <p className="success-text">
              Мы получили твою заявку.
              {data.willPay === 'yes' && (
                <>
                  <br /><br />
                  Для брони — напиши <a className="tg-link" href="https://t.me/stx_604" target="_blank" rel="noreferrer">@stx_604</a> по поводу предоплаты {prepayPercent}%.
                  <br />
                  Срок:{' '}
                  <strong>
                    {data.departureGroup === 'chisinau'
                      ? 'до 20 мая'
                      : 'в течение 30 часов после брони'}
                  </strong>
                  .
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="trip-survey-page">
      <div className="survey-container">
        <div className="survey-header">
          <h1 className="survey-title">Sector Trip 2026</h1>
          <p className="survey-subtitle">Бронь и детали поездки</p>
        </div>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>
        <div className="step-indicator">Шаг {step} из {TOTAL_STEPS}</div>

        <div className="step-content">
          {step === 1 && (
            <div className="step">
              <h2 className="step-title">Контактные данные</h2>
              <p className="step-hint">Заполни как в загранпаспорте — это пойдёт в бронь.</p>

              <label className="field-label">Telegram</label>
              <input
                type="text"
                className="survey-input"
                value={data.telegram}
                onChange={e => updateField('telegram', e.target.value)}
                placeholder="@username"
                autoFocus
              />

              <label className="field-label">Имя и фамилия (как в загранпаспорте)</label>
              <input
                type="text"
                className="survey-input"
                value={data.fullName}
                onChange={e => updateField('fullName', e.target.value)}
                placeholder="IVAN IVANOV"
              />

              <div className="row-2">
                <div className="row-2-field">
                  <label className="field-label">Возраст</label>
                  <input
                    type="number"
                    className="survey-input"
                    value={data.age}
                    onChange={e => updateField('age', e.target.value)}
                    placeholder="20"
                    min="0"
                    max="99"
                  />
                </div>
                <div className="row-2-field">
                  <label className="field-label">Из какого ты сектора?</label>
                  <input
                    type="text"
                    className="survey-input"
                    value={data.sector}
                    onChange={e => updateField('sector', e.target.value)}
                    placeholder="Например: Кишинев"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="step">
              <h2 className="step-title">Отель</h2>
              <p className="step-hint">Куда едем — короткая инфа</p>

              <div className="hotel-card">
                <div className="hotel-name">
                  {HOTEL.name} <span className="hotel-stars">{'★'.repeat(HOTEL.stars)}</span>
                </div>
                <div className="hotel-location">{HOTEL.location}</div>
                <div className="hotel-desc">{HOTEL.description}</div>
                <ul className="hotel-highlights">
                  {HOTEL.highlights.map(h => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
                <a className="hotel-link" href={HOTEL.bookingUrl} target="_blank" rel="noreferrer">
                  Открыть на Booking.com →
                </a>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="step">
              <h2 className="step-title">Откуда летишь и в какой комнате</h2>

              <label className="field-label">Из какого города ты добираешься?</label>
              <p className="step-hint" style={{ marginTop: 0, marginBottom: 8, fontSize: '0.82rem', opacity: 0.7 }}>
                Вылеты из Кишинёва и Вильнюса. Одесса/Киев — через Кишинёв, Рига/Таллин — через Вильнюс.
              </p>
              {CITY_GROUPS.map(g => (
                <div key={g.group} className="city-group">
                  <div className="city-group-label">{g.airport}</div>
                  <div className="chip-grid">
                    {g.cities.map(opt => (
                      <button
                        key={opt.value}
                        type="button"
                        className={`chip ${data.departureCity === opt.value ? 'active' : ''}`}
                        onClick={() => setCity(opt.value)}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <label className="field-label">Тип номера</label>
              <div className="room-choice">
                <button
                  type="button"
                  className={`room-btn ${data.roomType === 'double' ? 'active' : ''}`}
                  onClick={() => updateField('roomType', 'double')}
                >
                  <span className="room-btn-title">2-местный</span>
                  <span className="room-btn-price">
                    1500 € <span className="room-btn-price-sub">за номер · 750 €/чел</span>
                  </span>
                </button>
                <button
                  type="button"
                  className={`room-btn ${data.roomType === 'triple' ? 'active' : ''}`}
                  onClick={() => updateField('roomType', 'triple')}
                >
                  <span className="room-btn-title">3-местный</span>
                  <span className="room-btn-price">
                    2080 € <span className="room-btn-price-sub">за номер · ~693 €/чел</span>
                  </span>
                </button>
              </div>

              <label className="field-label">Telegram соседей по комнате</label>
              <input
                type="text"
                className="survey-input"
                value={data.roommateTelegram}
                onChange={e => updateField('roommateTelegram', e.target.value)}
                placeholder={data.roomType === 'triple' ? '@user1, @user2' : '@username'}
              />
              <p className="step-hint" style={{ marginTop: 8, opacity: 0.65 }}>
                Указывай тех, с кем точно договорился
              </p>
            </div>
          )}

          {step === 4 && (
            <div className="step">
              <h2 className="step-title">Даты поездки</h2>
              {data.departureGroup === '' ? (
                <p className="step-hint">Сначала выбери город вылета на предыдущем шаге.</p>
              ) : (
                <>
                  <div className="dates-card">
                    <div className="dates-row">
                      <span className="dates-label">Город вылета</span>
                      <span className="dates-value">{data.departureCity}</span>
                    </div>
                    <div className="dates-row">
                      <span className="dates-label">Даты</span>
                      <span className="dates-value strong">{tripDates}</span>
                    </div>
                  </div>
                  <p className="step-hint" style={{ marginTop: 16 }}>
                    На следующих шагах укажи: в чём хочешь поучаствовать и что можешь помочь организовать.
                  </p>
                </>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="step">
              <h2 className="step-title">В чём хочешь участвовать?</h2>
              <p className="step-hint">Можно выбрать несколько</p>

              <div className="check-list">
                {ACTIVITIES.map(item => (
                  <button
                    key={item}
                    type="button"
                    className={`check-item ${data.activities.includes(item) ? 'active' : ''}`}
                    onClick={() => toggleListItem('activities', item)}
                  >
                    <span className="check-box">{data.activities.includes(item) ? '✓' : ''}</span>
                    <span>{item}</span>
                  </button>
                ))}
              </div>

              <label className="field-label" style={{ marginTop: 16 }}>Что-то ещё (необязательно)</label>
              <input
                type="text"
                className="survey-input"
                value={data.activitiesOther}
                onChange={e => updateField('activitiesOther', e.target.value)}
                placeholder="Своё предложение..."
              />
            </div>
          )}

          {step === 6 && (
            <div className="step">
              <h2 className="step-title">Что можешь помочь организовать?</h2>
              <p className="step-hint">Можно выбрать несколько</p>

              <div className="check-list">
                {HELP_OPTIONS.map(item => (
                  <button
                    key={item}
                    type="button"
                    className={`check-item ${data.helpOrganize.includes(item) ? 'active' : ''}`}
                    onClick={() => toggleListItem('helpOrganize', item)}
                  >
                    <span className="check-box">{data.helpOrganize.includes(item) ? '✓' : ''}</span>
                    <span>{item}</span>
                  </button>
                ))}
              </div>

              <label className="field-label" style={{ marginTop: 16 }}>Что-то ещё (необязательно)</label>
              <input
                type="text"
                className="survey-input"
                value={data.helpOrganizeOther}
                onChange={e => updateField('helpOrganizeOther', e.target.value)}
                placeholder="Например: видео-обзор поездки..."
              />
            </div>
          )}

          {step === 7 && (
            <div className="step">
              <h2 className="step-title">Готов перевести деньги?</h2>

              <div className="july-choice">
                <button
                  type="button"
                  className={`choice-btn ${data.willPay === 'yes' ? 'active' : ''}`}
                  onClick={() => updateField('willPay', 'yes')}
                >
                  Да, готов
                </button>
                <button
                  type="button"
                  className={`choice-btn ${data.willPay === 'no' ? 'active' : ''}`}
                  onClick={() => updateField('willPay', 'no')}
                >
                  Пока не готов
                </button>
              </div>

              {data.willPay === 'yes' && data.departureGroup !== '' && (
                <div className="payment-card">
                  <div className="payment-headline">
                    Предоплата: <strong>{prepayPercent}%</strong> от стоимости
                  </div>
                  <div className="payment-deadline">
                    {data.departureGroup === 'chisinau' ? (
                      <>Срок: <strong>до 20 мая</strong></>
                    ) : (
                      <>Срок: <strong>в течение 30 часов</strong> после брони</>
                    )}
                  </div>
                  <ul className="payment-list">
                    <li>Возврат возможен за 2 недели до вылета</li>
                    <li>Это нужно потому, что цена сильно скачет</li>
                    <li>Кишинёв — 10%, Вильнюс — 20%</li>
                  </ul>
                  <div className="payment-cta">
                    По поводу предоплаты пиши{' '}
                    <a className="tg-link" href="https://t.me/stx_604" target="_blank" rel="noreferrer">
                      @stx_604
                    </a>
                  </div>
                </div>
              )}

              {data.willPay === 'yes' && data.departureGroup === '' && (
                <div className="payment-card">
                  <div className="payment-headline">Сначала выбери город вылета (шаг 3)</div>
                </div>
              )}

              <label className="field-label" style={{ marginTop: 16 }}>Комментарий (необязательно)</label>
              <textarea
                className="survey-textarea"
                value={data.paymentNotes}
                onChange={e => {
                  if (e.target.value.length <= 200) updateField('paymentNotes', e.target.value)
                }}
                placeholder="Что-то важное по оплате..."
                rows={3}
              />
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
