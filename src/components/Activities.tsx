import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { UsersIcon, PlaneIcon, MusicIcon, PartyIcon, HeartIcon, TargetIcon } from './Icons'
import './Activities.css'

interface Activity {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string; size?: number }>
}

const Activities = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const activities: Activity[] = [
    {
      title: "Встречи в городах",
      description: "Регулярные встречи участников сектора в вашем городе для общения и совместных активностей",
      icon: UsersIcon
    },
    {
      title: "Совместные поездки",
      description: "Путешествия и съезды с соседними секторами, новые знакомства и впечатления",
      icon: PlaneIcon
    },
    {
      title: "Выезды на концерты",
      description: "Организованные поездки на концерты T-Fest вместе с единомышленниками",
      icon: MusicIcon
    },
    {
      title: "Мероприятия в городе",
      description: "Специальные мероприятия именно для сектора в вашем городе",
      icon: PartyIcon
    },
    {
      title: "Помощь окружающим",
      description: "Благотворительные акции и помощь тем, кто в ней нуждается",
      icon: HeartIcon
    },
    {
      title: "Активности по интересам",
      description: "Спорт, творчество, киберспорт, мастер-классы — всё, что интересно вам",
      icon: TargetIcon
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section ref={ref} className="activities">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title" variants={cardVariants}>
            Что происходит в секторе
          </motion.h2>
          
          <motion.p className="section-subtitle" variants={cardVariants}>
            Множество активностей для каждого участника сообщества
          </motion.p>

          <div className="activities-grid">
            {activities.map((activity, index) => (
              <motion.div
                key={index}
                className="activity-card"
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 20px 60px rgba(255, 0, 5, 0.3)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="activity-icon">
                  <activity.icon size={48} />
                </div>
                <h3 className="activity-title">{activity.title}</h3>
                <p className="activity-description">{activity.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Activities
