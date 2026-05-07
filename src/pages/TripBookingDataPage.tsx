import { useState, useEffect } from 'react'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase'
import './TripDataPage.css'

interface BookingRecord {
  id: string
  telegram: string
  fullName: string
  age: string
  sector: string
  departureCity: string
  departureGroup: string
  tripDates: string
  roomType: string
  roommateTelegram: string
  activities: string[]
  activitiesOther: string
  helpOrganize: string[]
  helpOrganizeOther: string
  willPay: string
  prepayPercent: number
  paymentNotes: string
  createdAt: string
}

const PASSWORD = 'Sektor2026!Data'

const formatList = (items: string[], extra: string): string => {
  const all = [...items]
  if (extra && extra.trim().length > 0) all.push(extra.trim())
  return all.length > 0 ? all.join(', ') : '—'
}

const roomTypeLabel = (t: string) =>
  t === 'double' ? '2-местный' : t === 'triple' ? '3-местный' : '—'

const TripBookingDataPage = () => {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [records, setRecords] = useState<BookingRecord[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const savedAuth = localStorage.getItem('tripBookingDataPageAuth')
    if (savedAuth === PASSWORD) setIsAuthenticated(true)
  }, [])

  useEffect(() => {
    if (!isAuthenticated) return

    setIsLoading(true)
    const q = query(collection(db, 'sectorTripBooking'), orderBy('timestamp', 'desc'))

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data: BookingRecord[] = []
        snapshot.forEach((doc) => {
          const d = doc.data()
          data.push({
            id: doc.id,
            telegram: d.telegram || '',
            fullName: d.fullName || '',
            age: d.age || '',
            sector: d.sector || '',
            departureCity: d.departureCity || '',
            departureGroup: d.departureGroup || '',
            tripDates: d.tripDates || '',
            roomType: d.roomType || '',
            roommateTelegram: d.roommateTelegram || '',
            activities: d.activities || [],
            activitiesOther: d.activitiesOther || '',
            helpOrganize: d.helpOrganize || [],
            helpOrganizeOther: d.helpOrganizeOther || '',
            willPay: d.willPay || '',
            prepayPercent: d.prepayPercent ?? 0,
            paymentNotes: d.paymentNotes || '',
            createdAt: d.createdAt || d.timestamp?.toDate?.()?.toISOString() || 'Неизвестно',
          })
        })
        setRecords(data)
        setIsLoading(false)
      },
      (err) => {
        console.error('Error fetching booking data:', err)
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
      localStorage.setItem('tripBookingDataPageAuth', PASSWORD)
      setError('')
    } else {
      setError('Неверный пароль')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('tripBookingDataPageAuth')
    setPassword('')
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleString('ru-RU', {
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit',
      })
    } catch { return dateString }
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
            <button type="submit" className="password-button">Войти</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="trip-data-page">
      <div className="trip-data-header">
        <h1 className="trip-data-title">Sector Trip 2026 — заявки</h1>
        <button onClick={handleLogout} className="logout-button">Выйти</button>
      </div>

      {isLoading ? (
        <div className="loading">Загрузка данных...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <>
          <div className="stats">
            Всего заявок: <strong>{records.length}</strong>
          </div>

          {records.length === 0 ? (
            <div className="empty-state">Нет данных для отображения</div>
          ) : (
            <div className="trip-table-wrapper">
              <table className="trip-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Дата</th>
                    <th>Telegram</th>
                    <th>ФИО (паспорт)</th>
                    <th>Возраст</th>
                    <th>Сектор</th>
                    <th>Город вылета</th>
                    <th>Даты</th>
                    <th>Номер</th>
                    <th>Сосед TG</th>
                    <th>Активности</th>
                    <th>Помощь</th>
                    <th>Оплата</th>
                    <th>%</th>
                    <th>Комментарий</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td className="td-nowrap">{formatDate(item.createdAt)}</td>
                      <td className="td-nowrap">{item.telegram}</td>
                      <td>{item.fullName}</td>
                      <td>{item.age}</td>
                      <td>{item.sector}</td>
                      <td className="td-nowrap">{item.departureCity}</td>
                      <td className="td-nowrap">{item.tripDates}</td>
                      <td className="td-nowrap">{roomTypeLabel(item.roomType)}</td>
                      <td className="td-nowrap">{item.roommateTelegram || '—'}</td>
                      <td className="td-text">{formatList(item.activities, item.activitiesOther)}</td>
                      <td className="td-text">{formatList(item.helpOrganize, item.helpOrganizeOther)}</td>
                      <td>
                        <span className={`badge ${item.willPay === 'yes' ? 'badge-yes' : 'badge-no'}`}>
                          {item.willPay === 'yes' ? 'Да' : 'Нет'}
                        </span>
                      </td>
                      <td className="td-nowrap">{item.prepayPercent ? `${item.prepayPercent}%` : '—'}</td>
                      <td className="td-text">{item.paymentNotes || '—'}</td>
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

export default TripBookingDataPage
