import { useState, useEffect } from 'react'
import { bgDesktopLight, iconMoon, iconCheck, iconCross } from './images/index'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [data, setData] = useState('')

  const handleAdd = () => {
    if (data.trim() !== '') {
      setTasks([...tasks, { text: data, completed: false }])
      setData('')
    }
  }

  const handleDelete = (index) => {
    const updated = [...tasks]
    updated.splice(index, 1)
    setTasks(updated)
  }

  const handleChecked = (index) => {
    const updatedTasks = [...tasks] // Clona el array de tareas
    updatedTasks[index].completed = !updatedTasks[index].completed // Cambia el estado de completado de la tarea
    setTasks(updatedTasks) // Actualiza el estado
  }

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <div className="relative">
      <img src={bgDesktopLight} alt="" className="w-full" />
      <div className="wrapper m-2 absolute inset-y-0 inset-x-0 mx-auto">
        <div className="flex items-center justify-between pt-[3.4rem] pb-[1.85rem]">
          <h1 className="text-[2.5rem] font-bold tracking-[0.9rem] text-white pt-2">
            TODO
          </h1>
          <img src={iconMoon} alt="" className="" />
        </div>
        <div className="relative">
          <div className="absolute rounded-full flex w-[1.5rem] h-[1.5rem] items-center justify-center border border-gray-200 top-5 left-6">
            <img
              src={iconCheck}
              alt=""
              className="w-[0.6rem] h-[0.6rem] flex"
            />
          </div>

          <input
            type="text"
            className="w-full p-3 bg-white px-[1.5rem] pl-[4.4rem] py-[1.2rem] rounded-[5px] text-[18px] mb-[1.5rem] shadow-sm "
            value={data}
            onChange={(e) => setData(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleAdd()
              }
            }}
          />
        </div>

        <ul className=" rounded-[5px] bg-white">
          {tasks &&
            tasks.map((task, index) => (
              <li
                key={index}
                className=" flex justify-between items-center px-[1.5rem] py-[1rem]  border-gray-200 bg-transparent specialShadow"
              >
                <div className="flex gap-5">
                  <div
                    className={`rounded-full flex w-[1.6rem] h-[1.6rem] items-center justify-center border border-gray-200 cursor-pointer | ${
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
                    className={`text-[18px] | ${
                      task.completed ? 'text-gray-300 line-through' : ''
                    } `}
                  >
                    {task.text}
                  </p>
                </div>
                <img
                  src={iconCross}
                  alt=""
                  onClick={() => handleDelete(index)}
                  className="cursor-pointer"
                />
              </li>
            ))}
        </ul>
        <footer className="flex bg-white border-b border-l border-r rounded-b-[5px] justify-between px-6 py-[0.9rem] text-[14px] text-[#C8C5C4] shadow-2xl">
          <div>5 items left</div>
          <div className="flex gap-4">
            <button className="hover:text-black">All</button>
            <button className="hover:text-black">Active</button>
            <button className="hover:text-black">Completed</button>
          </div>
          <button className="hover:text-black ">Clear Completed</button>
        </footer>
      </div>
    </div>
  )
}

export default App
