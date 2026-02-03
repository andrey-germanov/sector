import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { CityIcon, StrengthIcon, GlobeIcon, GiftIcon, RainbowIcon, StarIcon } from './Icons'
import './Benefits.css'

interface Benefit {
  title: string
  description: string
  icon: React.ComponentType<{ className?: string; size?: number }>
}

const Benefits = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const benefits: Benefit[] = [
    {
      title: "Комьюнити в вашем городе",
      description: "Свои ребята прямо в вашем городе. Мы не согласны с тем, что сейчас век самых одиноких людей.",
      icon: CityIcon
    },
    {
      title: "Ваш вклад важен",
      description: "Возможность делать свой вклад в большую движуху, а не просто быть частью. Вы очень разные и в этом сила.",
      icon: StrengthIcon
    },
    {
      title: "Сеть по городам и странам",
      description: "Сеть из комьюнити в других городах и странах, возможность получить помощь там, где вы находитесь.",
      icon: GlobeIcon
    },
    {
      title: "Эксклюзивные бонусы",
      description: "Мерч, билеты на концерты, инсайт-информация, помощь в организации движухи внутри сектора.",
      icon: GiftIcon
    },
    {
      title: "Многогранность",
      description: "Участники сектора очень разные по возрастам и увлечениям. Каждый найдет себе единомышленников.",
      icon: RainbowIcon
    },
    {
      title: "Официальные представители",
      description: "Ваши идеи могут получить поддержку для реализации, а вы лично можете получить много разных бонусов.",
      icon: StarIcon
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

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section ref={ref} className="benefits">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2 className="section-title" variants={itemVariants}>
            Что получает участник
          </motion.h2>
          
          <motion.p className="section-subtitle" variants={itemVariants}>
            Преимущества участия в сообществе Сектор
          </motion.p>

          <div className="benefits-list">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-item"
                variants={itemVariants}
                whileHover={{ 
                  x: 10,
                  backgroundColor: "var(--bg-accent)"
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="benefit-icon">
                  <benefit.icon size={48} />
                </div>
                <div className="benefit-content">
                  <h3 className="benefit-title">{benefit.title}</h3>
                  <p className="benefit-description">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Benefits
