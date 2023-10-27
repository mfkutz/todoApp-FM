import { useState, useEffect } from 'react'
import {
  bgDesktopLight,
  bgDesktopDark,
  iconMoon,
  iconSun,
  iconCheck,
  iconCross
} from './images/index'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [data, setData] = useState('')
  const [remaining, setRemaining] = useState(0)
  const [view, setView] = useState('All')

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('darkMode')
    return storedTheme || 'light'
  })

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  useEffect(() => {
    localStorage.setItem('darkMode', theme)
  }, [theme])

  const capitalizeFirstLetter = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1)
  }

  const handleAdd = () => {
    if (data.trim() !== '') {
      const capitalizedData = capitalizeFirstLetter(data)
      setTasks([...tasks, { text: capitalizedData, completed: false }])
      setData('')
      setRemaining(remaining + 1)
    }
  }

  const handleDelete = (index) => {
    const updated = [...tasks]
    if (updated[index].completed) {
      setRemaining(remaining + 0)
    } else {
      setRemaining(remaining - 1)
    }
    updated.splice(index, 1)
    setTasks(updated)
  }

  const handleChecked = (index) => {
    const updatedTasks = [...tasks]
    updatedTasks[index].completed = !updatedTasks[index].completed
    if (updatedTasks[index].completed) {
      console.log('it is true')
      setRemaining(remaining - 1)
    } else {
      setRemaining(remaining + 1)
      console.log('it is false')
    }
    setTasks(updatedTasks)
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    const storedRemaining = localStorage.getItem('remaining')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
    if (storedRemaining) {
      setRemaining(JSON.parse(storedRemaining))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
    localStorage.setItem('remaining', JSON.stringify(remaining))
  }, [tasks])

  const handleClear = () => {
    const updatedTasks = tasks.filter((task) => !task.completed)
    setTasks(updatedTasks)
  }

  const handleAll = () => {
    setView('All')
  }

  const handleActive = () => {
    setView('Active')
  }

  const handleCompleted = () => {
    setView('Completed')
  }

  return (
    <div className="relative min-h-screen dark:bg-[#161722]">
      {theme === 'light' ? (
        <img src={bgDesktopLight} alt="" className="w-full background " />
      ) : (
        <img src={bgDesktopDark} alt="" className="w-full background " />
      )}
      <div className="wrapper m-2 absolute inset-y-0 inset-x-0 mx-auto ">
        <div className="flex items-center justify-between pt-[1.3rem] sm:pt-[2rem] lg:pt-[3.4rem] pb-[1.5rem]  sm:pb-[1.7rem] lg:pb-[1.85rem]">
          <h1 className="lg:text-[2.5rem] text-[1.5rem] font-bold tracking-[0.9rem] text-white pt-2">
            TODO
          </h1>
          {theme === 'light' ? (
            <img
              src={iconMoon}
              alt=""
              className="w-[20px] lg:w-[25px]"
              onClick={handleThemeSwitch}
            />
          ) : (
            <img
              src={iconSun}
              alt=""
              className="w-[20px] lg:w-[25px]"
              onClick={handleThemeSwitch}
            />
          )}
        </div>
        <div className="relative">
          <div className="absolute rounded-full flex w-[1.2rem] h-[1.2rem] lg:w-[1.5rem] lg:h-[1.5rem] items-center justify-center border border-gray-200 top-[0.9rem] left-[1.2rem] lg:top-5 lg:left-6"></div>

          <input
            type="text"
            placeholder="Create a new todo..."
            className=" w-full p-3 bg-white dark:text-[#cacde8] dark:bg-[#25273c] px-[1.5rem] pl-[3.5rem] lg:pl-[4.4rem] py-[1rem] lg:py-[1.2rem] rounded-[5px] text-[12px] lg:text-[18px] mb-[1.5rem] shadow-sm "
            value={data}
            onChange={(e) => setData(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleAdd()
              }
            }}
          />
        </div>

        <ul className=" rounded-[5px] bg-white dark:bg-[#25273c]">
          {tasks &&
            tasks.map((task, index) => (
              <li
                key={index}
                className={`dark:text-[#cacde8] flex justify-between items-center px-[1.2rem] lg:px-[1.5rem] py-[0.8rem] lg:py-[1rem] bg-transparent 
                ${theme === 'light' ? 'specialShadow' : 'specialShadowTwo'}
                ${view === 'Active' && task.completed ? 'hidden' : ''}
                ${view === 'Completed' && !task.completed ? 'hidden' : ''}
              `}
              >
                <div className="flex gap-5">
                  <div
                    className={`rounded-full flex w-[1.2rem] h-[1.2rem] lg:w-[1.6rem] lg:h-[1.6rem] items-center justify-center border cursor-pointer | ${
                      task.completed ? 'check' : ''
                    } `}
                    onClick={() => handleChecked(index)}
                  >
                    <img
                      src={iconCheck}
                      alt=""
                      className="w-[0.6rem] h-[0.6rem] flex"
                    />
                  </div>
                  <p
                    className={`text-[14px] lg:text-[18px] | ${
                      task.completed
                        ? 'text-gray-300 dark:text-gray-500 line-through'
                        : ''
                    } `}
                  >
                    {task.text}
                  </p>
                </div>
                <img
                  src={iconCross}
                  alt=""
                  onClick={() => handleDelete(index)}
                  className="cursor-pointer w-[13px] lg:w-[17px]"
                />
              </li>
            ))}
        </ul>
        <footer className="flex dark:bg-[#25273c] bg-white border-b border-l border-r dark:border-none border-gray-200   rounded-b-[5px] justify-between px-6 py-[0.9rem] text-[14px] text-[#C8C5C4] shadow-2xl">
          <div>{remaining} items left</div>
          <div className="flex gap-4 footer">
            <button
              className={`hover:text-black dark:hover:text-blue-400 font-bold ${
                view === 'All' ? 'dark:text-blue-400 text-black ' : ''
              }`}
              onClick={handleAll}
            >
              All
            </button>
            <button
              className={`hover:text-black dark:hover:text-blue-400  font-bold ${
                view === 'Active' ? 'dark:text-blue-400 text-black' : ''
              }`}
              onClick={handleActive}
            >
              Active
            </button>
            <button
              className={`hover:text-black dark:hover:text-blue-400  font-bold ${
                view === 'Completed' ? 'dark:text-blue-400 text-black ' : ''
              }`}
              onClick={handleCompleted}
            >
              Completed
            </button>
          </div>
          <button
            className="hover:text-black dark:hover:text-blue-400  "
            onClick={handleClear}
          >
            Clear Completed
          </button>
        </footer>

        <div className="flex footerTwo bg-white dark:bg-[#25273c] dark:border-none border rounded-[5px] justify-between px-6 py-[0.9rem] text-[14px] text-[#C8C5C4] shadow-xl  mt-4">
          <div className="flex gap-4 justify-center ">
            <button
              className={`hover:text-black dark:hover:text-blue-400 font-bold ${
                view === 'All' ? 'text-black dark:text-blue-400 ' : ''
              }`}
              onClick={handleAll}
            >
              All
            </button>
            <button
              className={`hover:text-black dark:hover:text-blue-400 font-bold ${
                view === 'Active' ? 'text-black dark:text-blue-400 ' : ''
              }`}
              onClick={handleActive}
            >
              Active
            </button>
            <button
              className={`hover:text-black dark:hover:text-blue-400 font-bold ${
                view === 'Completed' ? 'text-black dark:text-blue-400 ' : ''
              }`}
              onClick={handleCompleted}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
