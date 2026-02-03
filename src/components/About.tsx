import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import './About.css'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section ref={ref} className="about">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 variants={itemVariants} className="section-title">
            Что такое Сектор?
          </motion.h2>
          
          <motion.p variants={itemVariants} className="about-description">
            Это сообщество для всех наших людей, кто хочет объединяться, общаться, 
            двигаться вместе, создавать что-то крутое и вместе проживать свою лучшую жизнь.
          </motion.p>

          <motion.div variants={itemVariants} className="about-content">
            <div className="about-text-block">
              <h3 className="about-subtitle">Откуда пришла идея</h3>
              <p className="about-text">
                Концертов условно 4 в году, но есть еще 361 день в году, в которых нам 
                хочется как-то взаимодействовать с аудиторией, давать ей что-то и 
                соединять людей. После концерта всегда приходит эйфория, держит еще 
                пару дней. Но потом мы возвращаемся в реальность, в работу, в бытовуху 
                и это ощущение пропадает. Цель сектора — сделать так, чтобы мы ощущали 
                это приятное чувство как после концерта как можно чаще.
              </p>
            </div>

            <div className="about-highlight">
              <motion.div
                className="highlight-card"
                whileHover={{ scale: 1.02, boxShadow: "0 10px 40px rgba(255, 0, 5, 0.3)" }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="highlight-title">Сектор = это Вы</h3>
                <p className="highlight-text">
                  Сектор это не место, где Вы являетесь просто зрителем. 
                  Сектор — это место, которое создаете Вы. Не ждите указаний, 
                  начинайте действовать. Вы придумываете идеи и говорите что хотите 
                  сделать — передаете нам — мы команде артиста и вместе это делаем.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About
