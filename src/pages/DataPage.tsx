import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase'
import './DataPage.css'

interface FeedbackData {
  id: string
  telegramNick: string
  message: string
  createdAt: string
  timestamp?: any
}

const PASSWORD = 'Sektor2026!Data'

const DataPage = () => {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const savedAuth = localStorage.getItem('dataPageAuth')
    if (savedAuth === PASSWORD) {
      setIsAuthenticated(true)
    }
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return

    setIsLoading(true)
    const q = query(collection(db, 'feedback'), orderBy('timestamp', 'desc'))
    
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: FeedbackData[] = []
        snapshot.forEach((doc) => {
          const docData = doc.data()
          data.push({
            id: doc.id,
            telegramNick: docData.telegramNick || '',
            message: docData.message || '',
            createdAt: docData.createdAt || docData.timestamp?.toDate?.()?.toISOString() || 'Неизвестно',
            timestamp: docData.timestamp
          })
        })
        setFeedbackData(data)
        setIsLoading(false)
      },
      (err) => {
        console.error('Error fetching feedback:', err)
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
      localStorage.setItem('dataPageAuth', PASSWORD)
      setError('')
    } else {
      setError('Неверный пароль')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('dataPageAuth')
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
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="data-page">
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
    <div className="data-page">
      <div className="data-header">
        <h1 className="data-title">Обратная связь</h1>
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
            Всего сообщений: <strong>{feedbackData.length}</strong>
          </div>
          
          {feedbackData.length === 0 ? (
            <div className="empty-state">Нет данных для отображения</div>
          ) : (
            <div className="feedback-list">
              {feedbackData.map((item) => (
                <div key={item.id} className="feedback-item">
                  <div className="feedback-header">
                    <div className="feedback-nick">@{item.telegramNick}</div>
                    <div className="feedback-date">{formatDate(item.createdAt)}</div>
                  </div>
                  <div className="feedback-message">{item.message}</div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DataPage
