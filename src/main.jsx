import React, { useEffect, useMemo, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const Icon = ({ name, size = 22, stroke = 2, className = '' }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round', className }
  const paths = {
    home: <><path d="m3 10 9-7 9 7"/><path d="M5 9v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9"/><path d="M9 21v-6h6v6"/></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    feed: <><path d="M4 4h16v12H6l-2 2z"/><path d="M7 8h10M7 12h7"/></>,
    tools: <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/></>,
    star: <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/>,
    file: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 13h6M9 17h6M9 9h2"/></>,
    graduation: <><path d="m2 10 10-5 10 5-10 5z"/><path d="M6 12v5c3 2 9 2 12 0v-5"/><path d="M22 10v6"/></>,
    settings: <><path d="M12 3.5l1.08 1.98 2.24.54.54 2.24L17.84 9.3l-1.1 2.02 1.1 2.02-1.98 1.04-.54 2.24-2.24.54L12 19.5l-1.08-2.34-2.24-.54-.54-2.24L6.16 13.34l1.1-2.02-1.1-2.02 1.98-1.04.54-2.24 2.24-.54z"/><circle cx="12" cy="11.32" r="3.05"/></> ,
    moon: <><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></>,
    sun: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9"/><path d="M10 21h4"/></>,
    chevron: <path d="m6 9 6 6 6-6"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></>,
    umbrella: <><path d="M4 13a8 8 0 0 1 16 0Z"/><path d="M12 13v8M12 21a3 3 0 0 0 3-3"/></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></>,
    receipt: <><path d="M4 3h14a2 2 0 0 1 2 2v16l-4-2-4 2-4-2-4 2z"/><path d="M8 8h8M8 12h7M8 16h5"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    expand: <><path d="M8 3H3v5M16 3h5v5M21 16v5h-5M3 16v5h5"/></>,
    like: <path d="M7 10v11H4a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1h3zM7 21h9.5a2 2 0 0 0 1.9-1.4l2-6A2 2 0 0 0 18.5 11H15l.8-4.1A2.4 2.4 0 0 0 13.4 4L7 10"/>,
    comment: <><path d="M4 5h16v11H8l-4 4z"/><path d="M8 9h8M8 12h5"/></>,
    share: <><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><path d="m12 3 5 5h-3v6h-4V8H7z"/></>,
    bookmark: <path d="M6 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18l-6-3-6 3z"/>,
    smile: <><circle cx="12" cy="12" r="9"/><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01"/></>,
    paperclip: <path d="m9 17 6.5-6.5a3.5 3.5 0 0 0-5-5L4 12a5 5 0 0 0 7 7l6.5-6.5"/>,
    send: <path d="m22 2-7 20-4-9-9-4zM22 2 11 13"/>,
    cake: <><path d="M4 10h16v10H4z"/><path d="M7 10V7M12 10V7M17 10V7"/><path d="M3 14c2 0 2-2 4-2s2 2 5 2 2-2 5-2 2 2 4 2"/></>,
    spark: <><path d="M12 3 13.5 8.5 19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7z"/></>,
    award: <><circle cx="12" cy="9" r="5.5"/><path d="m8.2 13.2-2 7.3L12 17.7l5.8 2.8-2-7.3"/><path d="m12 6.5 1 1.9 2.1.3-1.5 1.5.4 2.1-2-1-2 1 .4-2.1-1.5-1.5 2.1-.3z"/></>,
    grid: <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>,
    folder: <><path d="M3 6a2 2 0 0 1 2-2h5l2 2h7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></>,
    discussion: <><path d="M4 5h16v10H8l-4 4z"/><path d="M8 9h8M8 12h5"/></>,
    chart: <><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 16v-4M12 16V8M16 16v-7"/></>,
    check: <><circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/></>,
    alertCalendar: <><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4M16 3v4M4 10h16"/><path d="M12 13v3M12 18h.01"/></>,
    clockSquare: <><rect x="4" y="4" width="16" height="16" rx="2"/><circle cx="12" cy="12" r="4"/><path d="M12 10v2l2 1"/></>,
    arrow: <path d="m9 18 6-6-6-6"/>,
    pdf: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5"/><path d="M8 15h8M8 18h6"/></>,
    doc: <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 13h6M9 17h6"/></>,
    sheet: <><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h8"/></>,
  }
  return <svg {...common}>{paths[name]}</svg>
}

const nav = [
  ['home', 'Home'], ['users', 'Teams'], ['feed', 'Feeds'], ['tools', 'Tools'], ['star', 'Highlights'], ['file', 'Documents'], ['graduation', 'Learning']
]

const people = [
  { name: 'HR Siena', role: 'Senior HR department', tone: 'female' },
  { name: 'Amit raj', role: 'Developer team', tone: 'male' },
]

function Avatar({ name, tone = 'female', small = false }) {
  const initials = name.split(' ').map(s => s[0]).join('').slice(0, 2)
  return <div className={`avatar ${tone} ${small ? 'avatar-sm' : ''}`} aria-label={name}>{initials}</div>
}

function Sidebar({ active, setActive, mobileOpen, setMobileOpen }) {
  return <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
    <div className="brand">
      <div className="brand-mark"><span></span><span></span><span></span></div>
      <div><strong>WorkHub</strong><small>EMPLOYEE DASHBOARD</small></div>
    </div>
    <nav className="nav">
      {nav.map(([icon, label]) => <button key={label} className={`nav-item ${active === label ? 'active' : ''}`} onClick={() => { setActive(label); setMobileOpen(false) }}><Icon name={icon} size={21}/><span>{label}</span></button>)}
    </nav>
    <button className={`settings ${active === 'Settings' ? 'active' : ''}`} onClick={() => { setActive('Settings'); setMobileOpen(false) }}><img src="/lsicon_setting-outline.png" alt="" className="settings-icon"/><span>Settings</span></button>
  </aside>
}

function Header({ setMobileOpen, darkMode, setDarkMode }) {
  return <header className="header">
    <button className="mobile-menu" onClick={() => setMobileOpen(v => !v)} aria-label="Open menu"><span></span><span></span><span></span></button>
    <div className="greeting"><h1>Good morning, Avikash Rathor</h1><p>Here’s What’s happening RMgX Today.</p></div>
    <div className="header-actions">
      <div className="search"><Icon name="search" size={20}/><input aria-label="Search" placeholder="Search"/></div>
      <button className="round-btn theme-btn" onClick={() => setDarkMode(v => !v)} aria-pressed={darkMode} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"} title={darkMode ? "Light mode" : "Dark mode"}><Icon name={darkMode ? "sun" : "moon"} size={22}/></button>
      <button className="round-btn bell-btn"><Icon name="bell" size={23}/><span className="notification-dot"></span></button>
      <div className="profile"><Avatar name="Avikash" tone="admin"/><div className="profile-copy"><strong>Avikash</strong><span>Admin</span></div><Icon name="chevron" size={18}/></div>
    </div>
  </header>
}

function AnnouncementHero() {
  const [slide, setSlide] = useState(0)
  const slides = [
    { eyebrow: 'COMPANY ANNOUNCEMENT', title: <>RMgX Learning Weeks 2026 gonna start<br/>from next day 2026!</>, button: 'Explore Programs' },
    { eyebrow: 'PEOPLE & CULTURE', title: <>Quarterly town hall is coming<br/>this Friday at 4 PM.</>, button: 'View Event' },
    { eyebrow: 'TEAM UPDATE', title: <>New wellbeing resources are<br/>available to all employees.</>, button: 'Open Resources' },
    { eyebrow: 'LEARNING & GROWTH', title: <>Three new role-based learning<br/>paths are now live.</>, button: 'Explore Learning' },
  ]
  const current = slides[slide]
  return <section className="hero-banner" role="region" aria-label="Company announcements">
    <div className="hero-copy"><span>{current.eyebrow}</span><h2>{current.title}</h2><button className="primary-btn">{current.button}</button></div>
    <div className="hero-art"><div className="book"><div className="cap"></div><div className="hat"></div><div className="books"><i></i><i></i><i></i></div></div></div>
    <div className="dots">{slides.map((_, i) => <button key={i} className={i === slide ? 'active' : ''} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`}></button>)}</div>
  </section>
}

function QuickActions({ onOpen }) {
  const items = [
    ['clock', 'Time Sheet'], ['umbrella', 'Leave'], ['calendar', 'Deadlines'], ['receipt', 'Expenses'], ['calendar', 'Event']
  ]
  return <section className="quick-actions">{items.map(([icon, label]) => <button key={label} onClick={() => onOpen(label)}><div><Icon name={icon} size={39}/></div><strong>{label}</strong></button>)}</section>
}

function Post({ post, onLike, onBookmark }) {
  return <article className="post">
    <div className="post-head"><Avatar name={post.author} tone={post.tone}/><div><strong>{post.author}</strong><span>{post.role}</span></div></div>
    <div className="post-body"><p>{post.text}</p>{post.emphasis && <p className="emphasis">{post.emphasis}</p>}</div>
    {post.image && <img className="post-image" src={post.image} alt="Team post"/>}
    <div className="post-meta"><button onClick={onLike} className={post.liked ? 'liked' : ''}><Icon name="like" size={22}/><span>{post.likes} Like{post.likes === 1 ? '' : 's'}</span></button><button><Icon name="comment" size={21}/><span>{post.comments} Comments</span></button><button><Icon name="share" size={22}/><span>{post.shares} Share</span></button><button className={`bookmark ${post.bookmarked ? 'saved' : ''}`} onClick={onBookmark} aria-label="Bookmark"><Icon name="bookmark" size={20}/></button></div>
  </article>
}

function Feed() {
  const [tab, setTab] = useState('All Post')
  const [composer, setComposer] = useState('')
  const [posts, setPosts] = useState([
    { id: 1, author: 'HR Siena', role: 'Product Designer', tone: 'female', text: 'Life, as taught by Gautama Buddha, is ever-changing—understanding this brings clarity and peace. True freedom comes from letting go of attachment and seeing things as they truly are. In awareness and compassion, we discover balance within ourselves and the world.', emphasis: 'Wishing everyone in the team a peaceful and mindful Buddha Purnima.', image: '/lotus-post.jpg', likes: 23, comments: 19, shares: 13, liked: false, bookmarked: false },
    { id: 2, author: 'HR Siena', role: 'Product Designer', tone: 'female', text: 'A small reminder for the week: make room for thoughtful work, meaningful collaboration, and learning from one another.', emphasis: '', likes: 11, comments: 6, shares: 4, liked: false, bookmarked: false },
  ])
  const tabs = ['All Post', 'Chats', 'Groups', 'News']
  const visiblePosts = useMemo(() => tab === 'All Post' ? posts : posts.slice(0, 1), [posts, tab])
  const toggleLike = (id) => setPosts(p => p.map(x => x.id === id ? { ...x, liked: !x.liked, likes: x.likes + (x.liked ? -1 : 1) } : x))
  const toggleBookmark = (id) => setPosts(p => p.map(x => x.id === id ? { ...x, bookmarked: !x.bookmarked } : x))
  const sendPost = () => {
    const text = composer.trim()
    if (!text) return
    setPosts(p => [{ id: Date.now(), author: 'Avikash Rathor', role: 'Admin', tone: 'admin', text, emphasis: '', likes: 0, comments: 0, shares: 0, liked: false, bookmarked: false }, ...p])
    setComposer('')
  }
  return <section className="feed-panel">
    <div className="feed-tabs">{tabs.map(t => <button key={t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t}</button>)}<div className="feed-tools"><button aria-label="Create post"><Icon name="plus" size={23}/></button><button aria-label="Expand feed"><Icon name="expand" size={21}/></button></div></div>
    <div className="posts">{visiblePosts.map(post => <Post key={post.id} post={post} onLike={() => toggleLike(post.id)} onBookmark={() => toggleBookmark(post.id)}/>)}</div>
    <div className="composer"><input value={composer} onChange={e => setComposer(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') sendPost() }} placeholder="What’s in your mind" aria-label="Create a post"/><button aria-label="Add emoji"><Icon name="smile" size={22}/></button><button aria-label="Attach"><Icon name="paperclip" size={22}/></button><button className="send" onClick={sendPost}><span>Send</span><Icon name="send" size={18}/></button></div>
  </section>
}

function RightRail() {
  return <aside className="right-rail">
    <section className="rail-card"><div className="rail-head"><h2>Announcement</h2><button>View All</button></div><div className="rail-block"><div className="rail-title"><Icon name="spark" size={24}/><span>New Updates</span></div><div className="notice"><strong>Office Closed – Buddha Purnima</strong><p>In observance of Buddh Purnima, our office will be closed on 19 May 2026.</p><p>Take this time to relax, reflect, and recharge. We’ll be back to work on the following business day.</p></div></div>
      <div className="rail-block"><div className="rail-title"><Icon name="cake" size={24}/><span>Today’s Birthday</span></div>{people.map(p => <div className="person-row" key={p.name}><Avatar name={p.name} tone={p.tone} small/><div><strong>{p.name}</strong><span>{p.role}</span></div></div>)}</div>
      <div className="rail-block anniversaries"><div className="rail-title"><img src="/work-anniversary-star.png" alt="" className="anniversary-star-icon"/><span>Work Anniversaries</span></div><div className="person-row"><Avatar name="Gautama Buddha" tone="purple" small/><div><strong>Gautama Buddha</strong><span>1 year</span></div></div></div>
    </section>
  </aside>
}

function TeamStat({ title, value, note, icon, tone = 'blue' }) {
  return <div className="team-stat"><div><strong>{title}</strong><b>{value}</b><span className={tone === 'green' ? 'positive' : ''}>{note}</span></div><div className={`team-stat-icon ${tone}`}><Icon name={icon} size={28}/></div></div>
}

const teamTasks = [
  ['Design RMgX Home Dashboard', 'Product UI Task', 'In Progress', 'purple', 'April 23'],
  ['Design RMgX Home Dashboard', 'Product UI Task', 'Review', 'orange', 'April 23'],
  ['Design RMgX Home Dashboard', 'Product UI Task', 'To do', 'gray', 'April 23'],
  ['Design RMgX Home Dashboard', 'Product UI Task', 'To do', 'gray', 'April 23'],
  ['Design RMgX Home Dashboard', 'Product UI Task', 'To do', 'gray', 'April 23'],
]

const goals = [65, 75, 75, 75, 75]

function TeamBanner() {
  return <section className="team-banner"><div className="team-avatar">PD</div><div className="team-banner-copy"><h1>Product Design Team</h1><div className="team-meta"><span>12 Members</span><span>3 Projects</span><span>Design Department</span></div><p>Designing the experience which makes the difference</p></div><div className="team-banner-actions"><button className="team-settings-btn">Team Settings</button><button className="invite-btn">+ invite</button></div></section>
}

function TeamTabs({ tab, setTab }) {
  const tabs = [['overview','grid','Overview'],['projects','folder','Projects'],['documents','file','Documents'],['discussions','discussion','Discussions'],['analytics','chart','Analytics']]
  return <div className="team-tabs">{tabs.map(([id, icon, label]) => <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}><Icon name={icon} size={20}/><span>{label}</span></button>)}</div>
}

function MyTasks() {
  return <section className="team-card my-task-card"><div className="team-card-head"><h2>My Task</h2><button>View All</button></div><div className="task-list">{teamTasks.map(([title, sub, status, tone, date], i) => <div className="task-row" key={`${title}-${i}`}><span className="task-check"></span><div className="task-copy"><strong>{title}</strong><span>{sub} <em className={tone}>{status}</em></span></div><time>{date}</time></div>)}</div><button className="bottom-add">+ Add New Task</button></section>
}

function TimeActivity() {
  return <section className="team-card activity-card"><div className="team-card-head"><h2>My Time &amp; activity</h2><button>View time-sheet <Icon name="arrow" size={15}/></button></div><div className="time-box"><strong>Time logged this week</strong><b>24h 30m</b><div className="time-progress"><span>of 40h</span><i><em></em></i><span>60%</span></div></div><div className="goals-head"><h2>Team Goals</h2><button>view all</button></div><div className="goals-list">{goals.map((value, i) => <div className="goal-row" key={i}><div className="goal-main"><strong>Improve user onboarding</strong><i><em style={{width: `${value}%`}}></em></i></div><div className="goal-side"><b>{value}%</b><span>Due May 15</span></div></div>)}</div><button className="bottom-add">+ Add New Goals</button></section>
}

function TeamMembers() {
  const members = ['HR Alexander','HR Alexander','HR Alexander','HR Alexander','HR Alexander']
  const statuses = ['Online','Online','Away','Online','Offline']
  return <section className="team-side-card"><div className="team-card-head"><h2>Team members</h2><button>View All</button></div><div className="member-list">{members.map((name, i) => <div className="member-row" key={i}><Avatar name={name} tone="male" small/><div><strong>{name}</strong><span>Product designer</span></div><em className={statuses[i].toLowerCase()}>{statuses[i]}</em></div>)}</div></section>
}

function TeamSection() {
  const files = [['pdf','Design_System_guidelines.pdf','Founder of Macedonia emp'],['doc','Product_Feature_list','Founder of Macedonia emp'],['sheet','Product_Feature_list.excel','Founder of Macedonia emp']]
  const tools = [['Figma','figma'],['Slack','slack'],['Jira','jira'],['Adobe','Xd'],['Sketch','sketch']]
  return <section className="team-side-card team-section-card"><div className="team-card-head"><h2>Team section</h2><button>Edit</button></div><div className="side-section"><h3><Icon name="spark" size={22}/>Recent files</h3>{files.map(([icon, name, owner]) => <div className="file-row" key={name}><span className={`file-icon ${icon}`}><Icon name={icon} size={20}/></span><div><strong>{name}</strong><small>{owner}</small></div></div>)}</div><div className="side-section pinned"><h3><Icon name="spark" size={22}/>Pinned tools</h3><div className="tools-row">{tools.map(([name, cls]) => <div className="tool-item" key={name}><span className={`tool-icon ${cls}`}>{name === 'Figma' ? '◆' : name === 'Slack' ? '✣' : name === 'Jira' ? 'J' : name === 'Adobe' ? 'Xd' : '◇'}</span><small>{name}</small></div>)}</div></div></section>
}

function WorkInProgress({ title = 'This section is under development', subtitle = 'We’re working on this section and it will be available soon.' }) {
  return <main className="main placeholder-main">
    <section className="work-placeholder" aria-live="polite">
      <div className="work-placeholder-icon"><span></span><span></span><span></span></div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
    </section>
  </main>
}

function TeamOverview() {
  return <><h2 className="team-overview-title">Team Overview</h2><div className="team-stats"><TeamStat title="Task Completed" value="13" note="↑ 18%   Last week" icon="check" tone="green"/><TeamStat title="Upcoming Deadlines" value="3" note="3 due this week" icon="alertCalendar" tone="red"/><TeamStat title="Projects in Progress" value="13" note="Work on Track" icon="clockSquare" tone="blue"/></div><div className="team-content-grid"><MyTasks/><TimeActivity/></div></>
}

function TeamPage() {
  const [tab, setTab] = useState('overview')
  return <main className="main team-main"><TeamBanner/><div className="team-layout"><div className="team-primary"><TeamTabs tab={tab} setTab={setTab}/>{tab === 'overview' ? <TeamOverview/> : <div className="team-placeholder"><h2>{tab[0].toUpperCase() + tab.slice(1)}</h2><p>We’re working on this section and it will be available soon.</p></div>}</div><aside className="team-side"><TeamMembers/><TeamSection/></aside></div></main>
}

function App() {
  const [active, setActive] = useState('Home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    try { return window.localStorage.getItem('workhub-theme') === 'dark' } catch { return false }
  })

  useEffect(() => {
    try { window.localStorage.setItem('workhub-theme', darkMode ? 'dark' : 'light') } catch {}
  }, [darkMode])

  const builtPages = new Set(['Home', 'Teams'])
  const showPlaceholder = !builtPages.has(active)

  return <div className={`app-shell ${darkMode ? 'dark-mode' : ''}`}>
    <Sidebar active={active} setActive={setActive} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>
    {mobileOpen && <button className="overlay" onClick={() => setMobileOpen(false)} aria-label="Close menu"></button>}
    <div className="content-shell">
      <Header setMobileOpen={setMobileOpen} darkMode={darkMode} setDarkMode={setDarkMode}/>
      {active === 'Teams' ? <TeamPage/> : active === 'Home' ? <main className="main"><AnnouncementHero/><div className="workspace-grid"><div className="workspace-left"><QuickActions onOpen={setActive}/><Feed/></div><RightRail/></div></main> : <WorkInProgress />}
    </div>
  </div>
}

createRoot(document.getElementById('root')).render(<App />)
