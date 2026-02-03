import { useState } from 'react'
import { motion } from 'framer-motion'
import FeedbackModal from './FeedbackModal'
import './CTA.css'

const CTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <section className="cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* <h2 className="cta-title">Готовы начать?</h2> */}
            {/* <p className="cta-description">
              Не ждите указаний, начинайте действовать. Вы придумываете идеи и говорите 
              что хотите сделать - передаете нам - мы команде артиста и вместе это делаем.
            </p> */}
            
            <motion.div
              className="cta-highlight"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="cta-highlight-text">
                <strong>РАМОК НЕТ!</strong> 
                Вы можете предложить всё, что угодно.{' '}
                {/* Открыть кафе, поиграть в баскетбол, организовать турнир, благотворительную 
                акцию, киберспортивные соревнования, мастер-класс, открыть сектор хаус 
                в своем городе и так далее. Все это имеет место быть! */}
                Здесь вы можете предложить всё, что угодно. Оставить мнение о чем угодно.
                Мы будем стараться максимально помочь вам в реализации ваших идей или убрать ваши переживаения по какой-то теме.
              </p>
            </motion.div>

            <motion.button
              className="cta-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => setIsModalOpen(true)}
            >
              Оставить обратную связь
            </motion.button>
          </motion.div>
        </div>
      </section>
      
      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}

export default CTA
