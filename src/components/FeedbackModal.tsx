import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../config/firebase'
import './FeedbackModal.css'

interface FeedbackModalProps {
  isOpen: boolean
  onClose: () => void
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ isOpen, onClose }) => {
  const [telegramNick, setTelegramNick] = useState('')
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    if (isOpen) {
      checkTimeLimit()
    }
  }, [isOpen])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [timeLeft])

  const checkTimeLimit = () => {
    const lastSubmission = localStorage.getItem('lastFeedbackSubmission')
    if (lastSubmission) {
      const timeDiff = Date.now() - parseInt(lastSubmission)
      const secondsLeft = 60 - Math.floor(timeDiff / 1000)
      if (secondsLeft > 0) {
        setTimeLeft(secondsLeft)
      }
    }
  }

  const canSubmit = () => {
    const lastSubmission = localStorage.getItem('lastFeedbackSubmission')
    if (lastSubmission) {
      const timeDiff = Date.now() - parseInt(lastSubmission)
      return timeDiff >= 60000 // 1 минута
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!canSubmit()) {
      setError(`Пожалуйста, подождите ${timeLeft} секунд перед следующей отправкой`)
      return
    }

    if (!telegramNick.trim()) {
      setError('Пожалуйста, укажите ваш ник в Telegram')
      return
    }

    if (!message.trim()) {
      setError('Пожалуйста, опишите вашу обратную связь')
      return
    }

    setIsSubmitting(true)

    try {
      await addDoc(collection(db, 'feedback'), {
        telegramNick: telegramNick.trim(),
        message: message.trim(),
        timestamp: serverTimestamp(),
        createdAt: new Date().toISOString()
      })

      localStorage.setItem('lastFeedbackSubmission', Date.now().toString())
      setSuccess(true)
      setTelegramNick('')
      setMessage('')

      setTimeout(() => {
        setSuccess(false)
        onClose()
      }, 2000)
    } catch (err) {
      console.error('Error submitting feedback:', err)
      setError('Произошла ошибка при отправке. Попробуйте позже.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatTime = (seconds: number) => {
    return `${seconds}с`
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.9, x: "-50%", y: "-45%" }}
            animate={{ opacity: 1, scale: 1, x: "-50%", y: "-50%" }}
            exit={{ opacity: 0, scale: 0.9, x: "-50%", y: "-45%" }}
            transition={{ duration: 0.3 }}
          >
            <button className="modal-close" onClick={onClose}>
              ×
            </button>

            <h2 className="modal-title">Обратная связь</h2>
            <p className="modal-subtitle">Расскажите нам ваши идеи и предложения</p>

            {success && (
              <motion.div
                className="success-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                Спасибо! Ваша обратная связь отправлена.
              </motion.div>
            )}

            {error && (
              <motion.div
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="feedback-form">
              <div className="form-group">
                <label htmlFor="telegramNick">Ваш ник в Telegram</label>
                <input
                  id="telegramNick"
                  type="text"
                  value={telegramNick}
                  onChange={(e) => setTelegramNick(e.target.value)}
                  placeholder="@username"
                  disabled={isSubmitting || success}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Ваше сообщение</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Опишите вашу идею, предложение или вопрос..."
                  rows={6}
                  disabled={isSubmitting || success}
                  className="form-textarea"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || success || timeLeft > 0}
                className="submit-button"
              >
                {isSubmitting ? (
                  'Отправка...'
                ) : success ? (
                  'Отправлено!'
                ) : timeLeft > 0 ? (
                  `Подождите ${formatTime(timeLeft)}`
                ) : (
                  'Отправить'
                )}
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default FeedbackModal
