import { useEffect } from 'react'
import './SectorTrip.css'

const dow = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс']
const avail: Record<number, number> = {
  1: 65, 2: 62, 3: 65, 4: 67, 5: 65, 6: 78, 7: 78, 8: 78,
  9: 75, 10: 78, 11: 75, 12: 75, 13: 75,
  14: 67, 15: 65, 16: 55, 17: 55, 18: 57, 19: 55, 20: 65,
  21: 35, 22: 30, 23: 30, 24: 30, 25: 30, 26: 30, 27: 30,
  28: 30, 29: 30, 30: 30, 31: 30,
}
const recommended = new Set([6, 7, 8, 9, 10, 11, 12, 13])

const Calendar = () => {
  const days: { num: number; pct: number; cls: string }[] = []
  for (let d = 1; d <= 31; d++) {
    let cls = ''
    if (recommended.has(d)) cls = 'peak'
    else if (avail[d] >= 60) cls = 'window'
    days.push({ num: d, pct: avail[d], cls })
  }

  return (
    <>
      {dow.map((d) => (
        <div key={`dow-${d}`} className="calDay dow"><span>{d}</span></div>
      ))}
      {/* July 1 2026 = Wednesday → 2 leading empties (Mon, Tue) */}
      <div className="calDay empty" />
      <div className="calDay empty" />
      {days.map(({ num, pct, cls }) => (
        <div key={num} className={`calDay${cls ? ` ${cls}` : ''}`}>
          <div className="num">{num}</div>
          <div className="pct">{pct}%</div>
        </div>
      ))}
    </>
  )
}

const SectorTrip = () => {
  useEffect(() => {
    document.title = 'Сектор · Лето 2026'
  }, [])

  return (
    <div className="sector-trip-page">
      {/* ============================================================
          DESKTOP — 14 slides, 1920×1080, vertically stacked
          ============================================================ */}
      <div className="st-desktop">

        {/* 1 · TITLE */}
        <section className="s-title">
          <div className="heroOrb" />
          <div className="eyebrow">Лето 2026 · Опрос секторов · 60 ответов</div>
          <h1>СЕКТОР<br /><span className="gloss">ВЫЕЗД</span></h1>
          <div className="sub">Куда едем, на сколько, в какие даты — и что вы все хотите от этой поездки. Собрали данные воедино.</div>
          <div className="meta">
            <span className="pill">📊 60 анкет</span>
            <span className="pill lav">🏖 11 направлений</span>
            <span className="pill mint">📅 окно 1–20 июля</span>
          </div>
        </section>

        {/* 2 · TLDR */}
        <section>
          <div className="corner"><div className="orb" /><div className="name">Lumi</div></div>
          <div className="pageno">02 / 14</div>
          <div className="label">главное</div>
          <h2 className="title" style={{ marginTop: 14 }}>Турция, ~7 дней, окно 6–13 июля,<br />бюджет 400–600 €.</h2>

          <div className="tldrGrid">
            <div className="tldrCard hero glass">
              <div>
                <div className="lab">направление №1</div>
                <div className="flag">🇹🇷</div>
              </div>
              <div>
                <div className="v">Турция</div>
                <div className="sub">24 голоса из 60 · тёплое море, бюджетный all-inclusive, удобные перелёты из всех городов сектора</div>
              </div>
            </div>

            <div className="tldrCard glass">
              <div className="lab">оптимальный бюджет</div>
              <div className="v">450<small> €</small></div>
              <div className="sub">медиана. вилка 400–600 € покрывает 64% сектора</div>
            </div>

            <div className="tldrCard glass">
              <div className="lab">рекомендуемые даты</div>
              <div className="v">6–13<small> июля</small></div>
              <div className="sub">7 дней · 47 человек могут в эти даты</div>
            </div>

            <div className="tldrCard glass">
              <div className="lab">формат</div>
              <div className="v" style={{ fontSize: 42, fontWeight: 600, letterSpacing: '-1px' }}>Вилла<br />+&nbsp;море</div>
              <div className="sub">общее жильё или отель, активная программа</div>
            </div>

            <div className="tldrCard glass">
              <div className="lab">главный риск</div>
              <div className="v" style={{ fontSize: 42, fontWeight: 600, letterSpacing: '-1px', color: '#FCC75A' }}>+40°<br />Египет</div>
              <div className="sub">слишком жарко. Турция холоднее и стабильнее</div>
            </div>
          </div>
        </section>

        {/* 3 · DESTINATIONS */}
        <section>
          <div className="corner"><div className="orb" /><div className="name">Lumi <span>· куда хочет сектор</span></div></div>
          <div className="pageno">03 / 14</div>
          <div className="label">направления · по упоминаниям в анкетах</div>
          <h2 className="title" style={{ marginTop: 14 }}>Турция выигрывает с большим отрывом.</h2>

          <div className="destBars">
            <div className="destRow winner">
              <div className="name">🇹🇷 Турция</div>
              <div className="barWrap"><div className="bar" style={{ width: '100%', background: 'linear-gradient(90deg,#7B74FF,#A78BFA)' }}>24 упоминания</div></div>
              <div className="count">40%</div>
            </div>
            <div className="destRow">
              <div className="name">🇬🇪 Грузия</div>
              <div className="barWrap"><div className="bar" style={{ width: '54%', background: 'linear-gradient(90deg,#6C63FF,#8B83FF)' }}>13</div></div>
              <div className="count">22%</div>
            </div>
            <div className="destRow">
              <div className="name">🇬🇷 Греция</div>
              <div className="barWrap"><div className="bar" style={{ width: '50%', background: 'linear-gradient(90deg,#5C56DB,#7B74FF)' }}>12</div></div>
              <div className="count">20%</div>
            </div>
            <div className="destRow">
              <div className="name">🇪🇬 Египет</div>
              <div className="barWrap"><div className="bar" style={{ width: '42%', background: 'linear-gradient(90deg,#4C46B8,#6C63FF)' }}>10</div></div>
              <div className="count">17%</div>
            </div>
            <div className="destRow">
              <div className="name">🇦🇱 Албания</div>
              <div className="barWrap"><div className="bar" style={{ width: '38%', background: 'linear-gradient(90deg,#4C46B8,#6C63FF)' }}>9</div></div>
              <div className="count">15%</div>
            </div>
            <div className="destRow">
              <div className="name">🇮🇹 Италия</div>
              <div className="barWrap"><div className="bar" style={{ width: '25%', background: 'linear-gradient(90deg,#3A3590,#5C56DB)' }}>6</div></div>
              <div className="count">10%</div>
            </div>
            <div className="destRow">
              <div className="name">🇪🇸 Испания</div>
              <div className="barWrap"><div className="bar" style={{ width: '25%', background: 'linear-gradient(90deg,#3A3590,#5C56DB)' }}>6</div></div>
              <div className="count">10%</div>
            </div>
            <div className="destRow">
              <div className="name">🇲🇹 Мальта</div>
              <div className="barWrap"><div className="bar" style={{ width: '21%', background: 'linear-gradient(90deg,#2D2A66,#4C46B8)' }}>5</div></div>
              <div className="count">8%</div>
            </div>
            <div className="destRow">
              <div className="name">🌍 другие</div>
              <div className="barWrap"><div className="bar" style={{ width: '30%', background: 'linear-gradient(90deg,#2D2A66,#3A3590)' }}>Болгария · Хорватия · Кипр · Черногория · Франция…</div></div>
              <div className="count">—</div>
            </div>
          </div>

          <div style={{ marginTop: 24, fontSize: 14, color: 'var(--fg-tertiary)', display: 'flex', gap: 24 }}>
            <span>★ — рекомендация</span>
            <span>· один человек мог упомянуть несколько направлений</span>
            <span>· итог не складывается в 100%</span>
          </div>
        </section>

        {/* 4 · CALENDAR */}
        <section>
          <div className="corner"><div className="orb" /><div className="name">Lumi <span>· даты</span></div></div>
          <div className="pageno">04 / 14</div>
          <div className="label">июль 2026 · доступность по дням</div>
          <h2 className="title" style={{ marginTop: 14 }}>Окно 6–13 июля — пик готовности.</h2>

          <div className="calWrap">
            <div className="calendar"><Calendar /></div>
            <div className="calLegend">
              <div className="item">
                <div className="swatch" style={{ background: 'linear-gradient(135deg,#B8B0FF,#6C63FF)' }} />
                <div>
                  <div className="t">Пик · 75%+ доступны</div>
                  <div className="d">Это окно даёт максимум людей. Ядро поездки.</div>
                </div>
              </div>
              <div className="item">
                <div className="swatch" style={{ background: 'linear-gradient(135deg,rgba(124,116,255,0.45),rgba(76,70,184,0.55))' }} />
                <div>
                  <div className="t">Хорошо · 55–75%</div>
                  <div className="d">Запасной диапазон — можно сдвинуть на ±2 дня.</div>
                </div>
              </div>
              <div className="item">
                <div className="swatch" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} />
                <div>
                  <div className="t">Слабо · &lt; 55%</div>
                  <div className="d">Сильно теряем людей. Не рекомендуем.</div>
                </div>
              </div>
              <div className="item" style={{ marginTop: 8 }}>
                <div className="swatch" style={{ background: 'rgba(52,211,153,0.2)', border: '1px solid rgba(52,211,153,0.4)' }} />
                <div>
                  <div className="t">Рекомендация: <b>6→13 июля</b></div>
                  <div className="d">7 дней. ≈ 47 из 60 человек смогут.</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5 · BUDGET */}
        <section>
          <div className="corner"><div className="orb" /><div className="name">Lumi <span>· бюджет</span></div></div>
          <div className="pageno">05 / 14</div>
          <div className="label">бюджет · максимальная планка по анкете</div>
          <h2 className="title" style={{ marginTop: 14 }}>
            Большинство в коридоре <span style={{ color: 'var(--accent-lavender)' }}>300–600 €</span>.
          </h2>

          <div className="budgetWrap">
            <div className="histo glass">
              <div className="histoBars">
                <div className="histoBar"><div className="barTop" style={{ height: 60 }}><div className="count">3</div></div><div className="lbl">0–100</div></div>
                <div className="histoBar"><div className="barTop" style={{ height: 100 }}><div className="count">5</div></div><div className="lbl">100–200</div></div>
                <div className="histoBar"><div className="barTop" style={{ height: 140 }}><div className="count">7</div></div><div className="lbl">200–300</div></div>
                <div className="histoBar peak"><div className="barTop" style={{ height: 260 }}><div className="count">13</div></div><div className="lbl">300–400</div></div>
                <div className="histoBar peak"><div className="barTop" style={{ height: 340 }}><div className="count">17</div></div><div className="lbl">400–600</div></div>
                <div className="histoBar"><div className="barTop" style={{ height: 180 }}><div className="count">9</div></div><div className="lbl">600–800</div></div>
                <div className="histoBar"><div className="barTop" style={{ height: 120 }}><div className="count">6</div></div><div className="lbl">800–1000+</div></div>
              </div>
              <div className="histoAxis">
                <span>0 €</span><span>300</span><span>600</span><span>1000+ €</span>
              </div>
              <div style={{ fontSize: 13, color: 'var(--fg-tertiary)', marginTop: 14 }}>по верхней границе указанного диапазона · n = 60</div>
            </div>

            <div className="stats">
              <div className="statCard glass">
                <div className="lab">медиана</div>
                <div className="v">450<small> €</small></div>
                <div className="desc">среднестатистический потолок</div>
              </div>
              <div className="statCard glass">
                <div className="lab">сектор в одной коробке</div>
                <div className="v">300–600<small> €</small></div>
                <div className="desc">64% людей помещаются — наш операционный коридор</div>
              </div>
              <div className="statCard recommend glass">
                <div className="lab">рекомендация</div>
                <div className="v">≈ 500<small> € / чел</small></div>
                <div className="desc">7 дней Турция all-inclusive: перелёт + жильё + еда. Реалистично, без боли.</div>
              </div>
            </div>
          </div>
        </section>

        {/* 6 · CITIES */}
        <section>
          <div className="corner"><div className="orb" /><div className="name">Lumi <span>· откуда едем</span></div></div>
          <div className="pageno">06 / 14</div>
          <div className="label">города отправления · 60 человек</div>
          <h2 className="title" style={{ marginTop: 14 }}>Сектор размазан по 11 городам — нужны 4 узла перелётов.</h2>

          <div className="citiesGrid">
            <div className="cityCard glass lead"><div className="name">🇵🇱 Варшава</div><div className="count">11<small>чел</small></div><div className="bar"><div style={{ width: '100%' }} /></div></div>
            <div className="cityCard glass lead"><div className="name">🇱🇻 Рига</div><div className="count">9<small>чел</small></div><div className="bar"><div style={{ width: '82%' }} /></div></div>
            <div className="cityCard glass"><div className="name">🇲🇩 Кишинёв</div><div className="count">8<small>чел</small></div><div className="bar"><div style={{ width: '73%' }} /></div></div>
            <div className="cityCard glass"><div className="name">🇨🇿 Прага</div><div className="count">8<small>чел</small></div><div className="bar"><div style={{ width: '73%' }} /></div></div>
            <div className="cityCard glass"><div className="name">🇺🇦 Киев</div><div className="count">7<small>чел</small></div><div className="bar"><div style={{ width: '64%' }} /></div></div>
            <div className="cityCard glass"><div className="name">🇱🇹 Вильнюс</div><div className="count">6<small>чел</small></div><div className="bar"><div style={{ width: '55%' }} /></div></div>
            <div className="cityCard glass"><div className="name">🇩🇪 Берлин</div><div className="count">4<small>чел</small></div><div className="bar"><div style={{ width: '36%' }} /></div></div>
            <div className="cityCard glass"><div className="name">🌍 прочие</div><div className="count">7<small>чел</small></div><div className="bar"><div style={{ width: '64%' }} /></div></div>
          </div>

          <div className="glass" style={{ marginTop: 24, padding: '24px 32px', display: 'flex', gap: 32, alignItems: 'center' }}>
            <div className="label muted" style={{ whiteSpace: 'nowrap' }}>→ что это значит</div>
            <div style={{ fontSize: 18, lineHeight: 1.5, color: 'var(--fg-secondary)' }}>
              Турция оптимальна логистически: <b style={{ color: '#fff' }}>прямые рейсы</b> из Варшавы, Риги, Праги, Киева и Кишинёва в Анталию / Стамбул. Никто не делает 3 пересадки.
            </div>
          </div>
        </section>

        {/* 7 · EXPECTATIONS */}
        <section>
          <div className="corner"><div className="orb" /><div className="name">Lumi <span>· что вы ждёте</span></div></div>
          <div className="pageno">07 / 14</div>
          <div className="label">ожидания · что вы написали в анкетах</div>
          <h2 className="title" style={{ marginTop: 14 }}>Эмоции, движ, знакомства — в равных долях.</h2>

          <div className="themesLayout">
            <div className="themeCol glass">
              <div className="lab">тема 1 · ~38 упоминаний</div>
              <h3><span className="dot" style={{ background: '#6C63FF' }} />Эмоции и драйв</h3>
              <div className="themeChips">
                <span className="chip hot">«газ»</span>
                <span className="chip hot">«разъебной отдых»</span>
                <span className="chip hot">«яркие эмоции»</span>
                <span className="chip">«движ»</span>
                <span className="chip">«драйв»</span>
                <span className="chip">«порвать поездку»</span>
                <span className="chip">«кайфануть жестко»</span>
                <span className="chip">«мяясо»</span>
              </div>
              <div className="themeQuote">«Движ, драйв, отдых в хорошей компании — порвать нахрен ту поездку»<span className="who">Одесса · 200–300€</span></div>
            </div>

            <div className="themeCol glass">
              <div className="lab">тема 2 · ~24 упоминания</div>
              <h3><span className="dot" style={{ background: '#A78BFA' }} />Знакомства и единство</h3>
              <div className="themeChips">
                <span className="chip hot">«с ребятами»</span>
                <span className="chip">«с другими секторами»</span>
                <span className="chip">«сплочение»</span>
                <span className="chip">«классная компания»</span>
                <span className="chip">«новые знакомства»</span>
                <span className="chip">«вместе»</span>
                <span className="chip">«главное вместе»</span>
              </div>
              <div className="themeQuote">«Знакомства с ребятами из других секторов, отдохнуть в другой стране, узнать её культуру»<span className="who">Рига · 100–2500€</span></div>
            </div>

            <div className="themeCol glass">
              <div className="lab">тема 3 · ~22 упоминания</div>
              <h3><span className="dot" style={{ background: '#34D399' }} />Чилл и море</h3>
              <div className="themeChips">
                <span className="chip hot">«море»</span>
                <span className="chip hot">«чилл»</span>
                <span className="chip">«отдохнуть»</span>
                <span className="chip">«пляж»</span>
                <span className="chip">«закаты»</span>
                <span className="chip">«легкость»</span>
                <span className="chip">«вайб»</span>
                <span className="chip">«перезагрузка»</span>
              </div>
              <div className="themeQuote">«Тёплое море, хорошая погода, удобное жильё, активная программа и дружная атмосфера»<span className="who">Рига · 0–400€</span></div>
            </div>
          </div>
        </section>

        {/* 8 · WISHES */}
        <section>
          <div className="corner"><div className="orb" /><div className="name">Lumi <span>· пожелания</span></div></div>
          <div className="pageno">08 / 14</div>
          <div className="label">пожелания · что вы хотите от организаторов</div>
          <h2 className="title" style={{ marginTop: 14 }}>«Не лагерь. Адекватное жильё. Программа, но не газа на полную.»</h2>

          <div className="themesLayout">
            <div className="themeCol glass">
              <div className="lab">формат жилья</div>
              <h3><span className="dot" style={{ background: '#A78BFA' }} />Не общежитие</h3>
              <div className="themeChips">
                <span className="chip hot">«вилла с бассейном»</span>
                <span className="chip hot">«первая линия»</span>
                <span className="chip">«адекватный отель»</span>
                <span className="chip">«max 3 в комнате»</span>
                <span className="chip">«достаточно душевых»</span>
                <span className="chip">«all inclusive»</span>
                <span className="chip">«общее пространство»</span>
              </div>
              <div className="themeQuote">«Не пять человек в комнате. Чтоб было достаточно унитазов и душевых»<span className="who">Прага · 500–1000€</span></div>
            </div>

            <div className="themeCol glass">
              <div className="lab">формат программы</div>
              <h3><span className="dot" style={{ background: '#6C63FF' }} />Активно, но не лагерь</h3>
              <div className="themeChips">
                <span className="chip hot">«не больше недели»</span>
                <span className="chip hot">«5–7 дней»</span>
                <span className="chip">«экскурсии»</span>
                <span className="chip">«вечером вместе»</span>
                <span className="chip">«утром по желанию»</span>
                <span className="chip">«не детский лагерь»</span>
                <span className="chip">«не пакетный тур»</span>
              </div>
              <div className="themeQuote">«Не превращать поездку в детский лагерь. Несколько активностей, экскурсии, вечером собираться вместе»<span className="who">Кишинёв · 400–550€</span></div>
            </div>

            <div className="themeCol glass">
              <div className="lab">красные флаги</div>
              <h3><span className="dot" style={{ background: '#F87171' }} />Чего не хотим</h3>
              <div className="themeChips">
                <span className="chip" style={{ background: 'rgba(248,113,113,0.12)', borderColor: 'rgba(248,113,113,0.3)', color: '#F8A7A7' }}>не +40°</span>
                <span className="chip" style={{ background: 'rgba(248,113,113,0.12)', borderColor: 'rgba(248,113,113,0.3)', color: '#F8A7A7' }}>не за все деньги мира</span>
                <span className="chip" style={{ background: 'rgba(248,113,113,0.12)', borderColor: 'rgba(248,113,113,0.3)', color: '#F8A7A7' }}>не толпа</span>
                <span className="chip" style={{ background: 'rgba(248,113,113,0.12)', borderColor: 'rgba(248,113,113,0.3)', color: '#F8A7A7' }}>не Египет летом</span>
                <span className="chip" style={{ background: 'rgba(248,113,113,0.12)', borderColor: 'rgba(248,113,113,0.3)', color: '#F8A7A7' }}>не «лежать на солнце»</span>
                <span className="chip" style={{ background: 'rgba(248,113,113,0.12)', borderColor: 'rgba(248,113,113,0.3)', color: '#F8A7A7' }}>не белки</span>
              </div>
              <div className="themeQuote">«Дай бог не Египет, там летом +40»<span className="who">Берлин · 500–1000€</span></div>
            </div>
          </div>
        </section>

        {/* 9 · PROPOSALS */}
        <section>
          <div className="corner"><div className="orb" /><div className="name">Lumi <span>· идеи от сектора</span></div></div>
          <div className="pageno">09 / 14</div>
          <div className="label">конкретные предложения · собрали из анкет</div>
          <h2 className="title" style={{ marginTop: 14 }}>Что вы сами предложили — топ-9.</h2>

          <div className="propGrid">
            <div className="propCard glass">
              <div className="icon" style={{ background: 'rgba(108,99,255,0.18)' }}>🏠</div>
              <h4>Снять виллу на всех</h4>
              <p>Общее жильё в Турции / на Мальте — затусить, программа, общее пространство.</p>
              <div className="votes">упомянуто 7 раз</div>
            </div>
            <div className="propCard glass">
              <div className="icon" style={{ background: 'rgba(167,139,250,0.18)' }}>🎬</div>
              <h4>Снимать влог поездки</h4>
              <p>Кто-то монтирует — вышел общий контент сектора. Газ, но осмысленный.</p>
              <div className="votes">упомянуто 3 раза</div>
            </div>
            <div className="propCard glass">
              <div className="icon" style={{ background: 'rgba(52,211,153,0.18)' }}>🍽️</div>
              <h4>Общий ужин каждый день</h4>
              <p>Ресторан или дом — все собираются вечером. Утром по желанию.</p>
              <div className="votes">упомянуто 5 раз</div>
            </div>
            <div className="propCard glass">
              <div className="icon" style={{ background: 'rgba(245,158,11,0.18)' }}>🏔️</div>
              <h4>Микро-выезды + экскурсии</h4>
              <p>Не сидим в отеле — вылазки в города, природу, достопримечательности.</p>
              <div className="votes">упомянуто 6 раз</div>
            </div>
            <div className="propCard glass">
              <div className="icon" style={{ background: 'rgba(108,99,255,0.18)' }}>🎧</div>
              <h4>Диджей-сеты, музыка</h4>
              <p>Атмосфера house: завтраки на крыше с музыкой, закаты, светлые fits.</p>
              <div className="votes">упомянуто 2 раза</div>
            </div>
            <div className="propCard glass">
              <div className="icon" style={{ background: 'rgba(248,113,113,0.18)' }}>🚗</div>
              <h4>Road-trip / кемпинг</h4>
              <p>Альтернатива: машина, горы, глэмпинг. У некоторых есть права.</p>
              <div className="votes">упомянуто 3 раза</div>
            </div>
            <div className="propCard glass">
              <div className="icon" style={{ background: 'rgba(167,139,250,0.18)' }}>🪂</div>
              <h4>Экстрим-день</h4>
              <p>Квадроциклы, прыжки с парашютом, активности кроме пляжа.</p>
              <div className="votes">упомянуто 2 раза</div>
            </div>
            <div className="propCard glass">
              <div className="icon" style={{ background: 'rgba(52,211,153,0.18)' }}>📱</div>
              <h4>Общий чат + голосования</h4>
              <p>Прозрачная организация: даты, бюджет, программа — всё в одном месте.</p>
              <div className="votes">упомянуто 4 раза</div>
            </div>
            <div className="propCard glass">
              <div className="icon" style={{ background: 'rgba(245,158,11,0.18)' }}>🤝</div>
              <h4>Партнёр-турфирма</h4>
              <p>У одной из участниц подруга работает в турфирме — может быть скидка/пакет.</p>
              <div className="votes">1 предложение · проверить</div>
            </div>
          </div>
        </section>

        {/* 10 · WHY TURKEY */}
        <section>
          <div className="corner"><div className="orb" /><div className="name">Lumi <span>· почему Турция</span></div></div>
          <div className="pageno">10 / 14</div>
          <div className="label">логика выбора · сводная матрица</div>
          <h2 className="title" style={{ marginTop: 14 }}>Турция выигрывает по всем 5 критериям.</h2>

          <div className="glass" style={{ marginTop: 32, padding: 8, flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(5, 1fr) 0.8fr', gap: 0, padding: '20px 28px', fontSize: 11, letterSpacing: '1.2px', textTransform: 'uppercase', color: 'var(--fg-tertiary)', fontWeight: 600, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div>направление</div>
              <div style={{ textAlign: 'center' }}>упоминания</div>
              <div style={{ textAlign: 'center' }}>бюджет 400–600€</div>
              <div style={{ textAlign: 'center' }}>логистика</div>
              <div style={{ textAlign: 'center' }}>погода июль</div>
              <div style={{ textAlign: 'center' }}>all-incl. опции</div>
              <div style={{ textAlign: 'right' }}>итог</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(5, 1fr) 0.8fr', gap: 0, padding: '18px 28px', alignItems: 'center', background: 'rgba(108,99,255,0.10)', borderRadius: 12, margin: 8 }}>
              <div style={{ fontSize: 20, fontWeight: 700 }}>🇹🇷 Турция</div>
              <div style={{ textAlign: 'center', fontSize: 18 }}>24 ★</div>
              <div style={{ textAlign: 'center' }}><span className="pill mint" style={{ padding: '4px 10px', fontSize: 12 }}>✓ влезает</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill mint" style={{ padding: '4px 10px', fontSize: 12 }}>прямые рейсы</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill mint" style={{ padding: '4px 10px', fontSize: 12 }}>28–32°</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill mint" style={{ padding: '4px 10px', fontSize: 12 }}>тонна</span></div>
              <div style={{ textAlign: 'right', fontSize: 22, fontWeight: 700, color: '#86F0C7' }}>★★★★★</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(5, 1fr) 0.8fr', gap: 0, padding: '16px 28px', alignItems: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>🇬🇪 Грузия</div>
              <div style={{ textAlign: 'center', fontSize: 16, color: 'var(--fg-secondary)' }}>13</div>
              <div style={{ textAlign: 'center' }}><span className="pill mint" style={{ padding: '4px 10px', fontSize: 12 }}>✓</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill amber" style={{ padding: '4px 10px', fontSize: 12 }}>средняя</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill" style={{ padding: '4px 10px', fontSize: 12 }}>25–30°</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill amber" style={{ padding: '4px 10px', fontSize: 12 }}>мало</span></div>
              <div style={{ textAlign: 'right', fontSize: 16, color: 'var(--fg-secondary)', fontWeight: 600 }}>★★★★</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(5, 1fr) 0.8fr', gap: 0, padding: '16px 28px', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>🇬🇷 Греция</div>
              <div style={{ textAlign: 'center', fontSize: 16, color: 'var(--fg-secondary)' }}>12</div>
              <div style={{ textAlign: 'center' }}><span className="pill amber" style={{ padding: '4px 10px', fontSize: 12 }}>впритык</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill mint" style={{ padding: '4px 10px', fontSize: 12 }}>ок</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill" style={{ padding: '4px 10px', fontSize: 12 }}>28–32°</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill" style={{ padding: '4px 10px', fontSize: 12 }}>средне</span></div>
              <div style={{ textAlign: 'right', fontSize: 16, color: 'var(--fg-secondary)', fontWeight: 600 }}>★★★½</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(5, 1fr) 0.8fr', gap: 0, padding: '16px 28px', alignItems: 'center' }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>🇪🇬 Египет</div>
              <div style={{ textAlign: 'center', fontSize: 16, color: 'var(--fg-secondary)' }}>10</div>
              <div style={{ textAlign: 'center' }}><span className="pill mint" style={{ padding: '4px 10px', fontSize: 12 }}>✓ дёшево</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill coral" style={{ padding: '4px 10px', fontSize: 12 }}>нестабильно</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill coral" style={{ padding: '4px 10px', fontSize: 12 }}>+38–42°</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill mint" style={{ padding: '4px 10px', fontSize: 12 }}>тонна</span></div>
              <div style={{ textAlign: 'right', fontSize: 16, color: 'var(--fg-secondary)', fontWeight: 600 }}>★★½</div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr repeat(5, 1fr) 0.8fr', gap: 0, padding: '16px 28px', alignItems: 'center', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ fontSize: 18, fontWeight: 600 }}>🇦🇱 Албания</div>
              <div style={{ textAlign: 'center', fontSize: 16, color: 'var(--fg-secondary)' }}>9</div>
              <div style={{ textAlign: 'center' }}><span className="pill mint" style={{ padding: '4px 10px', fontSize: 12 }}>✓</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill coral" style={{ padding: '4px 10px', fontSize: 12 }}>пересадки</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill" style={{ padding: '4px 10px', fontSize: 12 }}>28–31°</span></div>
              <div style={{ textAlign: 'center' }}><span className="pill coral" style={{ padding: '4px 10px', fontSize: 12 }}>мало</span></div>
              <div style={{ textAlign: 'right', fontSize: 16, color: 'var(--fg-secondary)', fontWeight: 600 }}>★★★</div>
            </div>
          </div>
        </section>

        {/* 11 · CONCERNS */}
        <section>
          <div className="corner"><div className="orb" /><div className="name">Lumi <span>· что может пойти не так</span></div></div>
          <div className="pageno">11 / 14</div>
          <div className="label">риски · что обсудить заранее</div>
          <h2 className="title" style={{ marginTop: 14 }}>Пять штук, которые точно стрельнут — если их игнорить.</h2>

          <div className="concernGrid">
            <div className="concernCard glass">
              <div className="ico">💸</div>
              <div>
                <h4>Бюджетный разрыв</h4>
                <p>От 0 до 2500 €. Решение: фиксируем 500 € как «ядро», предлагаем upgrade-апартаменты для тех, кто хочет дороже.</p>
              </div>
            </div>
            <div className="concernCard glass">
              <div className="ico">📅</div>
              <div>
                <h4>Даты не у всех совпадут</h4>
                <p>13 человек не покрывают окно 6–13. Решение: за 2 месяца до — дедлайн, кто не успевает, ловит «параллельное» окно 14–20 июля.</p>
              </div>
            </div>
            <div className="concernCard glass">
              <div className="ico">🏠</div>
              <div>
                <h4>Жильё = главный конфликт</h4>
                <p>«Не 5 в комнате» vs «дёшево». Решение: 2-местные комнаты по умолчанию, max 3, отдельные душевые — закладываем в бюджет.</p>
              </div>
            </div>
            <div className="concernCard glass">
              <div className="ico">🎒</div>
              <div>
                <h4>«Газ» vs «чилл» — два лагеря</h4>
                <p>Половина хочет порвать, половина — спать у бассейна. Решение: программа разделена на день/ночь, ночные активности опциональны.</p>
              </div>
            </div>
            <div className="concernCard glass">
              <div className="ico">✈️</div>
              <div>
                <h4>11 городов отправления</h4>
                <p>Каждый летит сам. Решение: общий чат с подбором рейсов, окно прилёта ±4 часа, групповой трансфер из аэропорта.</p>
              </div>
            </div>
            <div className="concernCard glass">
              <div className="ico">📵</div>
              <div>
                <h4>«Я не знаю, я Макан» × 7 анкет</h4>
                <p>Часть людей не имеет мнения и просто согласятся. Решение: голосуем не «куда», а «за/против рекомендации». Принимаем большинством.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 12 · ROADMAP */}
        <section>
          <div className="corner"><div className="orb" /><div className="name">Lumi <span>· рекомендация</span></div></div>
          <div className="pageno">12 / 14</div>
          <div className="label">итог</div>
          <h2 className="title" style={{ marginTop: 14 }}>Турция · 6–13 июля · 500 €/чел · вилла или отель.</h2>

          <div className="reco">
            <div className="recoLeft">
              <div className="recoBig">
                <div className="flag">🇹🇷</div>
                <div className="country">Турция</div>
                <div className="where">Анталия / Сиде / Кемер · побережье · 7 дней</div>
              </div>
              <div className="recoStats">
                <div className="recoStat glass"><div className="lab">когда</div><div className="v">6–13<small>июля</small></div></div>
                <div className="recoStat glass"><div className="lab">бюджет</div><div className="v">≈ 500<small>€/чел</small></div></div>
                <div className="recoStat glass"><div className="lab">людей в окне</div><div className="v">47<small>из 60</small></div></div>
                <div className="recoStat glass"><div className="lab">формат</div><div className="v" style={{ fontSize: 24, lineHeight: 1.2, fontWeight: 600, letterSpacing: '-0.5px' }}>вилла<br />или отель</div></div>
              </div>
            </div>

            <div className="recoRight">
              <h3>Что делаем дальше</h3>
              <div className="roadmap">
                <div className="step"><div className="n">1</div><div style={{ flex: 1 }}><h4>Создаём общий чат</h4><p>Все 60 человек в одном месте. Закрепляем эту презентацию.</p></div><div className="when">эта неделя</div></div>
                <div className="step"><div className="n">2</div><div style={{ flex: 1 }}><h4>Голосование: рекомендация ✓ / ✗</h4><p>Не «куда», а «за/против Турции 6–13 июля». 48 часов.</p></div><div className="when">+3 дня</div></div>
                <div className="step"><div className="n">3</div><div style={{ flex: 1 }}><h4>Подбор жилья · 3 варианта</h4><p>Вилла на 30+ / 2 виллы / отель all-inclusive. Голосуем.</p></div><div className="when">+1 неделя</div></div>
                <div className="step"><div className="n">4</div><div style={{ flex: 1 }}><h4>Сбор предоплаты + бронь</h4><p>Закрепляем номера. До этого момента — никаких билетов.</p></div><div className="when">+2 недели</div></div>
                <div className="step"><div className="n">5</div><div style={{ flex: 1 }}><h4>Программа на 7 дней</h4><p>Микс: пляж, экскурсии, общий ужин, ночной движ. Готовим к маю.</p></div><div className="when">июнь</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* 13 · CTA */}
        <section className="final">
          <div className="corner"><div className="orb" /><div className="name">Lumi <span>· сектор · лето 2026</span></div></div>
          <div className="pageno">13 / 14</div>

          <div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%,-50%)', width: 520, height: 520, borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 32%, #C9C0FF 0%, #8B83FF 28%, #6C63FF 55%, #2D2A66 90%)',
            boxShadow: '0 0 200px rgba(108,99,255,0.4), inset -30px -50px 140px rgba(0,0,0,0.45), inset 30px 25px 60px rgba(255,255,255,0.16)',
            opacity: 0.35 }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="label" style={{ textAlign: 'center', marginBottom: 24 }}>осталось одно</div>
            <h1 className="question">Голосуем <span className="accent">за</span>?<br />Турция 6–13 июля.</h1>
            <div className="sub" style={{ marginLeft: 'auto', marginRight: 'auto' }}>Если 40+ человек скажут «да» — стартуем подбор жилья на следующей неделе.<br />Если меньше — пересматриваем top-3 (Грузия, Греция, Албания).</div>
            <div className="meta" style={{ justifyContent: 'center' }}>
              <span className="pill mint">✓ за — пишем «газ»</span>
              <span className="pill coral">✗ против — пишем «нет»</span>
              <span className="pill lav">💬 идеи — в общий чат</span>
            </div>
          </div>
        </section>

        {/* 14 · LUMI */}
        <section>
          <div className="corner"><div className="orb" /><div className="name">Lumi</div></div>
          <div className="pageno">14 / 14</div>

          <div style={{ position: 'absolute', right: -260, top: '50%', transform: 'translateY(-50%)', width: 920, height: 920, borderRadius: '50%',
            background: 'radial-gradient(circle at 38% 32%, #C9C0FF 0%, #8B83FF 28%, #6C63FF 55%, #2D2A66 90%)',
            boxShadow: '0 0 220px rgba(108,99,255,0.5), inset -50px -70px 220px rgba(0,0,0,0.45), inset 50px 40px 100px rgba(255,255,255,0.18)',
            opacity: 0.85 }} />
          <div style={{ position: 'absolute', right: -260, top: '50%', transform: 'translateY(-50%)', width: 920, height: 920, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 28%, rgba(255,255,255,0.55) 0%, transparent 22%)',
            opacity: 0.7, pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 1, maxWidth: 1100, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
            <div className="label" style={{ marginBottom: 20 }}>опрос и презентация · сделаны при поддержке</div>

            <h1 style={{ fontSize: 140, lineHeight: 0.95, fontWeight: 800, letterSpacing: '-4px', margin: 0 }}>
              <span style={{ background: 'linear-gradient(135deg, #C9C0FF 0%, #6C63FF 50%, #A78BFA 100%)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Lumi</span>
            </h1>
            <div style={{ fontSize: 32, color: 'var(--fg-secondary)', fontWeight: 400, marginTop: 12, letterSpacing: '-0.5px' }}>
              AI-трекер расходов · твой финансовый друг
            </div>

            <div style={{ marginTop: 40, fontSize: 24, lineHeight: 1.5, color: 'var(--fg-secondary)', maxWidth: 1000 }}>
              Lumi помогает <b style={{ color: '#fff' }}>оптимизировать расходы</b> и реально доехать до этой поездки
              без боли. Чем меньше утечек — тем больше бюджет на Турцию.
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, marginTop: 40, maxWidth: 1100 }}>
              <div className="glass" style={{ padding: '24px 28px' }}>
                <div className="label" style={{ marginBottom: 10 }}>шаг 1</div>
                <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4 }}>Оплачиваешь Apple Pay</div>
                <div style={{ fontSize: 14, color: 'var(--fg-secondary)', marginTop: 6, lineHeight: 1.5 }}>в магазинах, кафе, ресторанах — как обычно</div>
              </div>
              <div className="glass" style={{ padding: '24px 28px' }}>
                <div className="label" style={{ marginBottom: 10 }}>шаг 2</div>
                <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4 }}>Lumi сам всё пишет</div>
                <div style={{ fontSize: 14, color: 'var(--fg-secondary)', marginTop: 6, lineHeight: 1.5 }}>трата падает в трекер автоматически — нулевое усилие</div>
              </div>
              <div className="glass" style={{ padding: '24px 28px', background: 'linear-gradient(135deg, rgba(52,211,153,0.18), rgba(26,174,132,0.10))', borderColor: 'rgba(52,211,153,0.35)' }}>
                <div className="label" style={{ marginBottom: 10, color: '#86F0C7' }}>шаг 3</div>
                <div style={{ fontSize: 18, fontWeight: 600, lineHeight: 1.4, color: '#86F0C7' }}>+€500 к поездке</div>
                <div style={{ fontSize: 14, color: 'var(--fg-secondary)', marginTop: 6, lineHeight: 1.5 }}>видишь утечки → режешь → расслабляешься на пляже</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 18, marginTop: 40, alignItems: 'center' }}>
              <a href="https://apps.apple.com/us/app/lumi-invest-grow-wealth/id6754805457"
                style={{ display: 'inline-flex', alignItems: 'center', gap: 20, padding: '28px 44px',
                  background: '#fff', color: '#0B0D1E', borderRadius: 22, textDecoration: 'none',
                  fontWeight: 700, letterSpacing: '-0.3px',
                  boxShadow: '0 12px 40px rgba(108,99,255,0.45)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.1 }}>
                  <span style={{ fontSize: 16, fontWeight: 500, color: '#8B8F9A', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Скачать в</span>
                  <span style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-1px' }}>App&nbsp;Store</span>
                </div>
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* ============================================================
          MOBILE — vertical scroll, max-width 430
          ============================================================ */}
      <div className="st-mobile">

        {/* 1 · TITLE */}
        <section className="page s1">
          <div className="heroOrb" />
          <div className="inner">
            <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">01 / 14</div></div>
            <div className="eyebrow">Лето 2026 · 60 ответов</div>
            <h1>СЕКТОР<br /><span className="gloss">ВЫЕЗД</span></h1>
            <div className="sub">Куда едем, на сколько, в какие даты — и что вы все хотите от этой поездки. Собрали данные воедино.</div>
            <div className="meta">
              <span className="pill">📊 60 анкет</span>
              <span className="pill lav">🏖 11 направлений</span>
              <span className="pill mint">📅 1–20 июля</span>
            </div>
          </div>
        </section>

        {/* 2 · TLDR */}
        <section className="page">
          <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">02 / 14</div></div>
          <div className="label">главное</div>
          <h2 className="title">Турция, ~7 дней, 6–13 июля, бюджет 400–600 €.</h2>

          <div className="tldrStack">
            <div className="tldrCard hero glass">
              <div className="lab">направление №1</div>
              <div className="flag" style={{ marginTop: 10 }}>🇹🇷</div>
              <div className="v" style={{ marginTop: 6 }}>Турция</div>
              <div className="sub">24 голоса из 60 · тёплое море, бюджетный all-inclusive, удобные перелёты</div>
            </div>
            <div className="tldrCard glass">
              <div className="lab">оптимальный бюджет</div>
              <div className="v">450<small> €</small></div>
              <div className="sub">медиана. Вилка 400–600 € покрывает 64% сектора</div>
            </div>
            <div className="tldrCard glass">
              <div className="lab">рекомендуемые даты</div>
              <div className="v">6–13<small> июля</small></div>
              <div className="sub">7 дней · 47 человек могут в эти даты</div>
            </div>
            <div className="tldrCard glass">
              <div className="lab">формат</div>
              <div className="v" style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.5px' }}>Вилла + море</div>
              <div className="sub">общее жильё или отель, активная программа</div>
            </div>
            <div className="tldrCard glass" style={{ borderColor: 'rgba(245,158,11,0.3)' }}>
              <div className="lab">главный риск</div>
              <div className="v" style={{ fontSize: 30, fontWeight: 600, letterSpacing: '-0.5px', color: '#FCC75A' }}>+40° Египет</div>
              <div className="sub">слишком жарко. Турция холоднее и стабильнее</div>
            </div>
          </div>
        </section>

        {/* 3 · DESTINATIONS */}
        <section className="page">
          <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">03 / 14</div></div>
          <div className="label">направления</div>
          <h2 className="title">Турция выигрывает с большим отрывом.</h2>

          <div className="destBars">
            <div className="destRow winner">
              <div className="top"><div className="name">🇹🇷 Турция</div><div className="pct">24 · 40%</div></div>
              <div className="barWrap"><div className="bar" style={{ width: '100%', background: 'linear-gradient(90deg,#7B74FF,#A78BFA)' }} /></div>
            </div>
            <div className="destRow">
              <div className="top"><div className="name">🇬🇪 Грузия</div><div className="pct">13 · 22%</div></div>
              <div className="barWrap"><div className="bar" style={{ width: '54%', background: 'linear-gradient(90deg,#6C63FF,#8B83FF)' }} /></div>
            </div>
            <div className="destRow">
              <div className="top"><div className="name">🇬🇷 Греция</div><div className="pct">12 · 20%</div></div>
              <div className="barWrap"><div className="bar" style={{ width: '50%', background: 'linear-gradient(90deg,#5C56DB,#7B74FF)' }} /></div>
            </div>
            <div className="destRow">
              <div className="top"><div className="name">🇪🇬 Египет</div><div className="pct">10 · 17%</div></div>
              <div className="barWrap"><div className="bar" style={{ width: '42%', background: 'linear-gradient(90deg,#4C46B8,#6C63FF)' }} /></div>
            </div>
            <div className="destRow">
              <div className="top"><div className="name">🇦🇱 Албания</div><div className="pct">9 · 15%</div></div>
              <div className="barWrap"><div className="bar" style={{ width: '38%', background: 'linear-gradient(90deg,#4C46B8,#6C63FF)' }} /></div>
            </div>
            <div className="destRow">
              <div className="top"><div className="name">🇮🇹 Италия</div><div className="pct">6 · 10%</div></div>
              <div className="barWrap"><div className="bar" style={{ width: '25%', background: 'linear-gradient(90deg,#3A3590,#5C56DB)' }} /></div>
            </div>
            <div className="destRow">
              <div className="top"><div className="name">🇪🇸 Испания</div><div className="pct">6 · 10%</div></div>
              <div className="barWrap"><div className="bar" style={{ width: '25%', background: 'linear-gradient(90deg,#3A3590,#5C56DB)' }} /></div>
            </div>
            <div className="destRow">
              <div className="top"><div className="name">🇲🇹 Мальта</div><div className="pct">5 · 8%</div></div>
              <div className="barWrap"><div className="bar" style={{ width: '21%', background: 'linear-gradient(90deg,#2D2A66,#4C46B8)' }} /></div>
            </div>
            <div className="destRow">
              <div className="top"><div className="name">🌍 другие</div><div className="pct">Болгария · Хорватия · Кипр…</div></div>
              <div className="barWrap"><div className="bar" style={{ width: '30%', background: 'linear-gradient(90deg,#2D2A66,#3A3590)' }} /></div>
            </div>
          </div>
          <div style={{ marginTop: 14, fontSize: 11, color: 'var(--fg-tertiary)', lineHeight: 1.4 }}>★ — рекомендация. Один человек мог упомянуть несколько направлений.</div>
        </section>

        {/* 4 · CALENDAR */}
        <section className="page">
          <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">04 / 14</div></div>
          <div className="label">июль 2026 · доступность</div>
          <h2 className="title">Окно 6–13 июля — пик готовности.</h2>

          <div className="calendar"><Calendar /></div>
          <div className="calLegend">
            <div className="item"><div className="swatch" style={{ background: 'linear-gradient(135deg,#B8B0FF,#6C63FF)' }} /><div><div className="t">Пик · 75%+</div><div className="d">Ядро поездки. Окно 6–13 июля.</div></div></div>
            <div className="item"><div className="swatch" style={{ background: 'linear-gradient(135deg,rgba(124,116,255,0.45),rgba(76,70,184,0.55))' }} /><div><div className="t">Хорошо · 55–75%</div><div className="d">Запасной диапазон ±2 дня.</div></div></div>
            <div className="item"><div className="swatch" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }} /><div><div className="t">Слабо · &lt; 55%</div><div className="d">Сильно теряем людей.</div></div></div>
            <div className="item"><div className="swatch" style={{ background: 'rgba(52,211,153,0.2)', border: '1px solid rgba(52,211,153,0.4)' }} /><div><div className="t">Рекомендация: 6→13 июля</div><div className="d">7 дней. ≈ 47 из 60 человек.</div></div></div>
          </div>
        </section>

        {/* 5 · BUDGET */}
        <section className="page">
          <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">05 / 14</div></div>
          <div className="label">бюджет</div>
          <h2 className="title">Большинство в коридоре <span style={{ color: 'var(--accent-lavender)' }}>300–600 €</span>.</h2>

          <div className="histo glass" style={{ marginTop: 20 }}>
            <div className="histoBars">
              <div className="histoBar"><div className="barTop" style={{ height: 30 }}><div className="count">3</div></div><div className="lbl">0–100</div></div>
              <div className="histoBar"><div className="barTop" style={{ height: 54 }}><div className="count">5</div></div><div className="lbl">100–200</div></div>
              <div className="histoBar"><div className="barTop" style={{ height: 74 }}><div className="count">7</div></div><div className="lbl">200–300</div></div>
              <div className="histoBar peak"><div className="barTop" style={{ height: 135 }}><div className="count">13</div></div><div className="lbl">300–400</div></div>
              <div className="histoBar peak"><div className="barTop" style={{ height: 175 }}><div className="count">17</div></div><div className="lbl">400–600</div></div>
              <div className="histoBar"><div className="barTop" style={{ height: 96 }}><div className="count">9</div></div><div className="lbl">600–800</div></div>
              <div className="histoBar"><div className="barTop" style={{ height: 64 }}><div className="count">6</div></div><div className="lbl">800+</div></div>
            </div>
            <div className="histoAxis"><span>0 €</span><span>300</span><span>600</span><span>1000+ €</span></div>
            <div style={{ fontSize: 10, color: 'var(--fg-tertiary)', marginTop: 8 }}>по верхней границе диапазона · n = 60</div>
          </div>

          <div className="stats">
            <div className="statCard glass">
              <div className="lab">медиана</div>
              <div className="v">450<small> €</small></div>
              <div className="desc">среднестатистический потолок</div>
            </div>
            <div className="statCard glass">
              <div className="lab">сектор в одной коробке</div>
              <div className="v">300–600<small> €</small></div>
              <div className="desc">64% людей помещаются — наш операционный коридор</div>
            </div>
            <div className="statCard recommend glass">
              <div className="lab">рекомендация</div>
              <div className="v">≈ 500<small> €/чел</small></div>
              <div className="desc">7 дней Турция all-inclusive: перелёт + жильё + еда</div>
            </div>
          </div>
        </section>

        {/* 6 · CITIES */}
        <section className="page">
          <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">06 / 14</div></div>
          <div className="label">города отправления</div>
          <h2 className="title">Сектор размазан по 11 городам.</h2>

          <div className="citiesGrid">
            <div className="cityCard glass lead"><div className="name">🇵🇱 Варшава</div><div className="count">11<small>чел</small></div><div className="bar"><div style={{ width: '100%' }} /></div></div>
            <div className="cityCard glass lead"><div className="name">🇱🇻 Рига</div><div className="count">9<small>чел</small></div><div className="bar"><div style={{ width: '82%' }} /></div></div>
            <div className="cityCard glass"><div className="name">🇲🇩 Кишинёв</div><div className="count">8<small>чел</small></div><div className="bar"><div style={{ width: '73%' }} /></div></div>
            <div className="cityCard glass"><div className="name">🇨🇿 Прага</div><div className="count">8<small>чел</small></div><div className="bar"><div style={{ width: '73%' }} /></div></div>
            <div className="cityCard glass"><div className="name">🇺🇦 Киев</div><div className="count">7<small>чел</small></div><div className="bar"><div style={{ width: '64%' }} /></div></div>
            <div className="cityCard glass"><div className="name">🇱🇹 Вильнюс</div><div className="count">6<small>чел</small></div><div className="bar"><div style={{ width: '55%' }} /></div></div>
            <div className="cityCard glass"><div className="name">🇩🇪 Берлин</div><div className="count">4<small>чел</small></div><div className="bar"><div style={{ width: '36%' }} /></div></div>
            <div className="cityCard glass"><div className="name">🌍 прочие</div><div className="count">7<small>чел</small></div><div className="bar"><div style={{ width: '64%' }} /></div></div>
          </div>

          <div className="glass" style={{ marginTop: 14, padding: '16px 18px' }}>
            <div className="label muted" style={{ marginBottom: 8 }}>→ что это значит</div>
            <div style={{ fontSize: 13, lineHeight: 1.5, color: 'var(--fg-secondary)' }}>Турция оптимальна логистически: <b style={{ color: '#fff' }}>прямые рейсы</b> из Варшавы, Риги, Праги, Киева, Кишинёва в Анталию / Стамбул.</div>
          </div>
        </section>

        {/* 7 · EXPECTATIONS */}
        <section className="page">
          <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">07 / 14</div></div>
          <div className="label">ожидания</div>
          <h2 className="title">Эмоции, движ, знакомства — в равных долях.</h2>

          <div className="themesStack">
            <div className="themeCol glass">
              <div className="lab">тема 1 · ~38 упоминаний</div>
              <h3><span className="dot" style={{ background: '#6C63FF' }} />Эмоции и драйв</h3>
              <div className="themeChips">
                <span className="chip hot">«газ»</span><span className="chip hot">«разъебной отдых»</span>
                <span className="chip hot">«яркие эмоции»</span><span className="chip">«движ»</span>
                <span className="chip">«драйв»</span><span className="chip">«порвать поездку»</span>
                <span className="chip">«кайфануть жестко»</span>
              </div>
              <div className="themeQuote">«Движ, драйв, отдых в хорошей компании — порвать нахрен ту поездку»<span className="who">Одесса · 200–300€</span></div>
            </div>
            <div className="themeCol glass">
              <div className="lab">тема 2 · ~24 упоминания</div>
              <h3><span className="dot" style={{ background: '#A78BFA' }} />Знакомства и единство</h3>
              <div className="themeChips">
                <span className="chip hot">«с ребятами»</span><span className="chip">«с другими секторами»</span>
                <span className="chip">«сплочение»</span><span className="chip">«классная компания»</span>
                <span className="chip">«новые знакомства»</span><span className="chip">«главное вместе»</span>
              </div>
              <div className="themeQuote">«Знакомства с ребятами из других секторов, отдохнуть в другой стране, узнать её культуру»<span className="who">Рига · 100–2500€</span></div>
            </div>
            <div className="themeCol glass">
              <div className="lab">тема 3 · ~22 упоминания</div>
              <h3><span className="dot" style={{ background: '#34D399' }} />Чилл и море</h3>
              <div className="themeChips">
                <span className="chip hot">«море»</span><span className="chip hot">«чилл»</span>
                <span className="chip">«пляж»</span><span className="chip">«закаты»</span>
                <span className="chip">«легкость»</span><span className="chip">«вайб»</span>
                <span className="chip">«перезагрузка»</span>
              </div>
              <div className="themeQuote">«Тёплое море, хорошая погода, удобное жильё, активная программа и дружная атмосфера»<span className="who">Рига · 0–400€</span></div>
            </div>
          </div>
        </section>

        {/* 8 · WISHES */}
        <section className="page">
          <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">08 / 14</div></div>
          <div className="label">пожелания</div>
          <h2 className="title">«Не лагерь. Адекватное жильё. Программа, но без пережима.»</h2>

          <div className="themesStack">
            <div className="themeCol glass">
              <div className="lab">формат жилья</div>
              <h3><span className="dot" style={{ background: '#A78BFA' }} />Не общежитие</h3>
              <div className="themeChips">
                <span className="chip hot">«вилла с бассейном»</span><span className="chip hot">«первая линия»</span>
                <span className="chip">«адекватный отель»</span><span className="chip">«max 3 в комнате»</span>
                <span className="chip">«all inclusive»</span>
              </div>
              <div className="themeQuote">«Не пять человек в комнате. Чтоб было достаточно унитазов и душевых»<span className="who">Прага · 500–1000€</span></div>
            </div>
            <div className="themeCol glass">
              <div className="lab">формат программы</div>
              <h3><span className="dot" style={{ background: '#6C63FF' }} />Активно, но не лагерь</h3>
              <div className="themeChips">
                <span className="chip hot">«5–7 дней»</span><span className="chip">«экскурсии»</span>
                <span className="chip">«вечером вместе»</span><span className="chip">«утром по желанию»</span>
                <span className="chip">«не детский лагерь»</span>
              </div>
              <div className="themeQuote">«Не превращать поездку в детский лагерь. Несколько активностей, экскурсии, вечером собираться вместе»<span className="who">Кишинёв · 400–550€</span></div>
            </div>
            <div className="themeCol glass">
              <div className="lab">красные флаги</div>
              <h3><span className="dot" style={{ background: '#F87171' }} />Чего не хотим</h3>
              <div className="themeChips">
                <span className="chip" style={{ background: 'rgba(248,113,113,0.12)', borderColor: 'rgba(248,113,113,0.3)', color: '#F8A7A7' }}>не +40°</span>
                <span className="chip" style={{ background: 'rgba(248,113,113,0.12)', borderColor: 'rgba(248,113,113,0.3)', color: '#F8A7A7' }}>не за все деньги мира</span>
                <span className="chip" style={{ background: 'rgba(248,113,113,0.12)', borderColor: 'rgba(248,113,113,0.3)', color: '#F8A7A7' }}>не толпа</span>
                <span className="chip" style={{ background: 'rgba(248,113,113,0.12)', borderColor: 'rgba(248,113,113,0.3)', color: '#F8A7A7' }}>не Египет летом</span>
              </div>
              <div className="themeQuote">«Дай бог не Египет, там летом +40»<span className="who">Берлин · 500–1000€</span></div>
            </div>
          </div>
        </section>

        {/* 9 · PROPOSALS */}
        <section className="page">
          <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">09 / 14</div></div>
          <div className="label">предложения сектора</div>
          <h2 className="title">Что вы сами предложили — топ-9.</h2>

          <div className="propGrid">
            <div className="propCard glass"><div className="head"><div className="icon" style={{ background: 'rgba(108,99,255,0.18)' }}>🏠</div><h4>Снять виллу на всех</h4></div><p>Общее жильё в Турции / на Мальте — затусить, программа, общее пространство.</p><div className="votes">7 упоминаний</div></div>
            <div className="propCard glass"><div className="head"><div className="icon" style={{ background: 'rgba(245,158,11,0.18)' }}>🏔️</div><h4>Микро-выезды + экскурсии</h4></div><p>Не сидим в отеле — вылазки в города, природу, достопримечательности.</p><div className="votes">6 упоминаний</div></div>
            <div className="propCard glass"><div className="head"><div className="icon" style={{ background: 'rgba(52,211,153,0.18)' }}>🍽️</div><h4>Общий ужин каждый день</h4></div><p>Ресторан или дом — все собираются вечером. Утром по желанию.</p><div className="votes">5 упоминаний</div></div>
            <div className="propCard glass"><div className="head"><div className="icon" style={{ background: 'rgba(52,211,153,0.18)' }}>📱</div><h4>Общий чат + голосования</h4></div><p>Прозрачная организация: даты, бюджет, программа — всё в одном месте.</p><div className="votes">4 упоминания</div></div>
            <div className="propCard glass"><div className="head"><div className="icon" style={{ background: 'rgba(167,139,250,0.18)' }}>🎬</div><h4>Снимать влог поездки</h4></div><p>Кто-то монтирует — общий контент сектора.</p><div className="votes">3 упоминания</div></div>
            <div className="propCard glass"><div className="head"><div className="icon" style={{ background: 'rgba(248,113,113,0.18)' }}>🚗</div><h4>Road-trip / кемпинг</h4></div><p>Альтернатива: машина, горы, глэмпинг. У некоторых есть права.</p><div className="votes">3 упоминания</div></div>
            <div className="propCard glass"><div className="head"><div className="icon" style={{ background: 'rgba(108,99,255,0.18)' }}>🎧</div><h4>Диджей-сеты, музыка</h4></div><p>Атмосфера house: завтраки на крыше, закаты, светлые fits.</p><div className="votes">2 упоминания</div></div>
            <div className="propCard glass"><div className="head"><div className="icon" style={{ background: 'rgba(167,139,250,0.18)' }}>🪂</div><h4>Экстрим-день</h4></div><p>Квадроциклы, прыжки с парашютом, активности кроме пляжа.</p><div className="votes">2 упоминания</div></div>
            <div className="propCard glass"><div className="head"><div className="icon" style={{ background: 'rgba(245,158,11,0.18)' }}>🤝</div><h4>Партнёр-турфирма</h4></div><p>У одной из участниц подруга в турфирме — может быть скидка.</p><div className="votes">1 предложение</div></div>
          </div>
        </section>

        {/* 10 · WHY TURKEY */}
        <section className="page">
          <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">10 / 14</div></div>
          <div className="label">логика выбора</div>
          <h2 className="title">Турция выигрывает по всем 5 критериям.</h2>

          <div className="whyList">
            <div className="whyCard glass lead">
              <div className="top"><div className="name">🇹🇷 Турция · 24 ★</div><div className="stars">★★★★★</div></div>
              <div className="row">
                <div className="it"><div className="l">бюджет 400–600€</div><div className="v ok">✓ влезает</div></div>
                <div className="it"><div className="l">логистика</div><div className="v ok">прямые рейсы</div></div>
                <div className="it"><div className="l">погода июль</div><div className="v ok">28–32°</div></div>
                <div className="it"><div className="l">all-incl. опции</div><div className="v ok">тонна</div></div>
              </div>
            </div>
            <div className="whyCard glass">
              <div className="top"><div className="name">🇬🇪 Грузия · 13</div><div className="stars" style={{ color: 'var(--fg-secondary)' }}>★★★★</div></div>
              <div className="row">
                <div className="it"><div className="l">бюджет</div><div className="v ok">✓</div></div>
                <div className="it"><div className="l">логистика</div><div className="v amb">средняя</div></div>
                <div className="it"><div className="l">погода</div><div className="v">25–30°</div></div>
                <div className="it"><div className="l">all-incl.</div><div className="v amb">мало</div></div>
              </div>
            </div>
            <div className="whyCard glass">
              <div className="top"><div className="name">🇬🇷 Греция · 12</div><div className="stars" style={{ color: 'var(--fg-secondary)' }}>★★★½</div></div>
              <div className="row">
                <div className="it"><div className="l">бюджет</div><div className="v amb">впритык</div></div>
                <div className="it"><div className="l">логистика</div><div className="v ok">ок</div></div>
                <div className="it"><div className="l">погода</div><div className="v">28–32°</div></div>
                <div className="it"><div className="l">all-incl.</div><div className="v">средне</div></div>
              </div>
            </div>
            <div className="whyCard glass">
              <div className="top"><div className="name">🇪🇬 Египет · 10</div><div className="stars" style={{ color: 'var(--fg-secondary)' }}>★★½</div></div>
              <div className="row">
                <div className="it"><div className="l">бюджет</div><div className="v ok">✓ дёшево</div></div>
                <div className="it"><div className="l">логистика</div><div className="v no">нестабильно</div></div>
                <div className="it"><div className="l">погода</div><div className="v no">+38–42°</div></div>
                <div className="it"><div className="l">all-incl.</div><div className="v ok">тонна</div></div>
              </div>
            </div>
            <div className="whyCard glass">
              <div className="top"><div className="name">🇦🇱 Албания · 9</div><div className="stars" style={{ color: 'var(--fg-secondary)' }}>★★★</div></div>
              <div className="row">
                <div className="it"><div className="l">бюджет</div><div className="v ok">✓</div></div>
                <div className="it"><div className="l">логистика</div><div className="v no">пересадки</div></div>
                <div className="it"><div className="l">погода</div><div className="v">28–31°</div></div>
                <div className="it"><div className="l">all-incl.</div><div className="v no">мало</div></div>
              </div>
            </div>
          </div>
        </section>

        {/* 11 · CONCERNS */}
        <section className="page">
          <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">11 / 14</div></div>
          <div className="label">риски</div>
          <h2 className="title">Шесть вещей, которые точно стрельнут.</h2>

          <div className="concernStack">
            <div className="concernCard glass"><div className="ico">💸</div><div><h4>Бюджетный разрыв</h4><p>От 0 до 2500 €. Решение: 500 € — «ядро», upgrade-апартаменты опционально.</p></div></div>
            <div className="concernCard glass"><div className="ico">📅</div><div><h4>Даты не у всех совпадут</h4><p>13 человек не покрывают окно 6–13. Дедлайн за 2 месяца, иначе окно 14–20 июля.</p></div></div>
            <div className="concernCard glass"><div className="ico">🏠</div><div><h4>Жильё = главный конфликт</h4><p>«Не 5 в комнате» vs «дёшево». 2-местные по умолчанию, max 3, отдельные душевые.</p></div></div>
            <div className="concernCard glass"><div className="ico">🎒</div><div><h4>«Газ» vs «чилл» — два лагеря</h4><p>День/ночь — раздельные программы. Ночные активности опциональны.</p></div></div>
            <div className="concernCard glass"><div className="ico">✈️</div><div><h4>11 городов отправления</h4><p>Чат с подбором рейсов, окно прилёта ±4 часа, групповой трансфер.</p></div></div>
            <div className="concernCard glass"><div className="ico">📵</div><div><h4>«Я не знаю» × 7 анкет</h4><p>Голосуем не «куда», а «за/против» рекомендации. Большинством.</p></div></div>
          </div>
        </section>

        {/* 12 · ROADMAP */}
        <section className="page">
          <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">12 / 14</div></div>
          <div className="label">итог</div>
          <h2 className="title">Турция · 6–13 июля · 500€/чел.</h2>

          <div className="recoBig">
            <div className="flag">🇹🇷</div>
            <div className="country">Турция</div>
            <div className="where">Анталия / Сиде / Кемер · побережье · 7 дней</div>
          </div>

          <div className="recoStats">
            <div className="recoStat glass"><div className="lab">когда</div><div className="v">6–13<small>июля</small></div></div>
            <div className="recoStat glass"><div className="lab">бюджет</div><div className="v">≈500<small>€/чел</small></div></div>
            <div className="recoStat glass"><div className="lab">людей в окне</div><div className="v">47<small>из 60</small></div></div>
            <div className="recoStat glass"><div className="lab">формат</div><div className="v" style={{ fontSize: 14, lineHeight: 1.2, fontWeight: 600, letterSpacing: '-0.3px' }}>вилла/отель</div></div>
          </div>

          <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.4px', margin: '28px 0 0 0' }}>Что делаем дальше</h3>
          <div className="roadmap">
            <div className="step"><div className="n">1</div><div style={{ flex: 1 }}><h4>Создаём общий чат</h4><p>Все 60 человек. Закрепляем презентацию.</p><div className="when">эта неделя</div></div></div>
            <div className="step"><div className="n">2</div><div style={{ flex: 1 }}><h4>Голосование: ✓ / ✗</h4><p>«За/против Турции 6–13 июля». 48 часов.</p><div className="when">+3 дня</div></div></div>
            <div className="step"><div className="n">3</div><div style={{ flex: 1 }}><h4>Подбор жилья · 3 варианта</h4><p>Вилла на 30+ / 2 виллы / отель. Голосуем.</p><div className="when">+1 неделя</div></div></div>
            <div className="step"><div className="n">4</div><div style={{ flex: 1 }}><h4>Сбор предоплаты + бронь</h4><p>Закрепляем номера. До этого — без билетов.</p><div className="when">+2 недели</div></div></div>
            <div className="step"><div className="n">5</div><div style={{ flex: 1 }}><h4>Программа на 7 дней</h4><p>Пляж, экскурсии, общий ужин, ночной движ.</p><div className="when">июнь</div></div></div>
          </div>
        </section>

        {/* 13 · CTA */}
        <section className="page s13">
          <div className="bgOrb" />
          <div className="inner">
            <div className="topBar"><div className="brandRow" style={{ margin: '0 auto' }}><div className="orb" /><div className="name">Lumi</div></div></div>
            <div className="label">осталось одно</div>
            <h1 className="question">Голосуем <span className="accent">за</span>?<br />Турция 6–13 июля.</h1>
            <div className="sub">Если 40+ человек скажут «да» — стартуем подбор жилья на следующей неделе. Если меньше — пересматриваем top-3.</div>
            <div className="meta">
              <span className="pill mint">✓ за — пишем «газ»</span>
              <span className="pill coral">✗ против — пишем «нет»</span>
              <span className="pill lav">💬 идеи — в общий чат</span>
            </div>
            <div className="pageno" style={{ marginTop: 32 }}>13 / 14</div>
          </div>
        </section>

        {/* 14 · LUMI */}
        <section className="page s14">
          <div className="bgOrb" />
          <div className="inner">
            <div className="topBar"><div className="brandRow"><div className="orb" /><div className="name">Lumi</div></div><div className="pageno">14 / 14</div></div>
            <div className="label" style={{ marginTop: 8 }}>опрос и презентация при поддержке</div>
            <div className="lumi">Lumi</div>
            <div className="tag">AI-трекер расходов · твой финансовый друг</div>
            <div className="pitch">Lumi помогает <b>оптимизировать расходы</b> и реально доехать до этой поездки без боли. Чем меньше утечек — тем больше бюджет на Турцию.</div>

            <div className="steps">
              <div className="step3 glass"><div className="lab">шаг 1</div><div className="t">Оплачиваешь Apple Pay</div><div className="d">в магазинах, кафе, ресторанах — как обычно</div></div>
              <div className="step3 glass"><div className="lab">шаг 2</div><div className="t">Lumi сам всё пишет</div><div className="d">трата падает в трекер автоматически — нулевое усилие</div></div>
              <div className="step3 win glass"><div className="lab">шаг 3</div><div className="t">+€500 к поездке</div><div className="d">видишь утечки → режешь → расслабляешься на пляже</div></div>
            </div>

            <a className="appstore" href="https://apps.apple.com/us/app/lumi-invest-grow-wealth/id6754805457">
              <div>
                <div className="l1">Скачать в</div>
                <div className="l2">App&nbsp;Store</div>
              </div>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default SectorTrip
