import { bgDesktopLight, iconMoon, iconCheck, iconCross } from './images/index'

const App = () => {
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
        <input
          type="text"
          className="w-full p-3 bg-white px-[1.5rem] pl-[4.4rem] py-[1.2rem] rounded-[5px] text-[18px]"
          value={'Currentry typing'}
        />

        <ul className="mt-3 rounded-[5px] bg-white">
          <li className=" flex justify-between items-center px-[1.5rem] py-[1rem] border-b border-gray-200 bg-transparent">
            <div className="flex gap-5">
              <div className="rounded-full flex w-[1.6rem] h-[1.6rem] items-center justify-center border border-gray-200 | check ">
                <img
                  src={iconCheck}
                  alt=""
                  className="w-[0.6rem] h-[0.6rem] flex"
                />
              </div>
              <p className="text-[18px] | text-gray-300 line-through">
                Complete online javascript course
              </p>
            </div>
            <img src={iconCross} alt="" />
          </li>
        </ul>
      </div>
    </div>
  )
}

export default App
