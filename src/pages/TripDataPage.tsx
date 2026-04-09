import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase'
import './TripDataPage.css'

interface TripSurveyData {
  id: string
  city: string
  budgetFrom: string
  budgetTo: string
  suggestedLocation: string
  canJuly: string
  selectedDates: number[]
  alternativeDates: string
  expectations: string
  wishes: string
  suggestions: string
  createdAt: string
  timestamp?: any
}

const PASSWORD = 'Sektor2026!Data'

const TripDataPage = () => {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [surveyData, setSurveyData] = useState<TripSurveyData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const savedAuth = localStorage.getItem('tripDataPageAuth')
    if (savedAuth === PASSWORD) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return

    setIsLoading(true)
    const q = query(collection(db, 'tripSurvey'), orderBy('timestamp', 'desc'))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: TripSurveyData[] = []
        snapshot.forEach((doc) => {
          const d = doc.data()
          data.push({
            id: doc.id,
            city: d.city || '',
            budgetFrom: d.budgetFrom || '',
            budgetTo: d.budgetTo || '',
            suggestedLocation: d.suggestedLocation || '',
            canJuly: d.canJuly || '',
            selectedDates: d.selectedDates || [],
            alternativeDates: d.alternativeDates || '',
            expectations: d.expectations || '',
            wishes: d.wishes || '',
            suggestions: d.suggestions || '',
            createdAt: d.createdAt || d.timestamp?.toDate?.()?.toISOString() || 'Неизвестно',
            timestamp: d.timestamp,
          })
        })
        setSurveyData(data)
        setIsLoading(false)
      },
      (err) => {
        console.error('Error fetching trip survey data:', err)
        setError('Ошибка загрузки данных')
        setIsLoading(false)
      }
    )

    return () => unsubscribe()
  }, [isAuthenticated])

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('tripDataPageAuth', PASSWORD)
      setError('')
    } else {
      setError('Неверный пароль')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('tripDataPageAuth')
    setPassword('')
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch {
      return dateString
    }
  }

  const formatSelectedDates = (dates: number[]): string => {
    if (!dates || dates.length === 0) return '—'
    return dates.map(d => `${d} июля`).join(', ')
  }

  if (!isAuthenticated) {
    return (
      <div className="trip-data-page">
        <div className="password-container">
          <h1 className="password-title">Доступ к данным</h1>
          <form onSubmit={handlePasswordSubmit} className="password-form">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
              className="password-input"
              autoFocus
            />
            {error && <div className="password-error">{error}</div>}
            <button type="submit" className="password-button">
              Войти
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="trip-data-page">
      <div className="trip-data-header">
        <h1 className="trip-data-title">Опрос: Поездка на море</h1>
        <button onClick={handleLogout} className="logout-button">
          Выйти
        </button>
      </div>

      {isLoading ? (
        <div className="loading">Загрузка данных...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="stats">
            Всего ответов: <strong>{surveyData.length}</strong>
          </div>

          {surveyData.length === 0 ? (
            <div className="empty-state">Нет данных для отображения</div>
          ) : (
            <div className="trip-table-wrapper">
              <table className="trip-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Дата</th>
                    <th>Город</th>
                    <th>Бюджет</th>
                    <th>Локация</th>
                    <th>Июль 1–20</th>
                    <th>Даты</th>
                    <th>Ожидания</th>
                    <th>Пожелания</th>
                    <th>Предложения</th>
                  </tr>
                </thead>
                <tbody>
                  {surveyData.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td className="td-nowrap">{formatDate(item.createdAt)}</td>
                      <td>{item.city}</td>
                      <td className="td-nowrap">{item.budgetFrom}–{item.budgetTo} EUR</td>
                      <td>{item.suggestedLocation}</td>
                      <td>
                        <span className={`badge ${item.canJuly === 'yes' ? 'badge-yes' : 'badge-no'}`}>
                          {item.canJuly === 'yes' ? 'Да' : 'Нет'}
                        </span>
                      </td>
                      <td className="td-dates">
                        {item.canJuly === 'yes'
                          ? formatSelectedDates(item.selectedDates)
                          : item.alternativeDates || '—'}
                      </td>
                      <td className="td-text">{item.expectations}</td>
                      <td className="td-text">{item.wishes}</td>
                      <td className="td-text">{item.suggestions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default TripDataPage
