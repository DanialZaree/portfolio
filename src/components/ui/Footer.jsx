export default function Footer() {
  function toTop() {
    window.scrollTo(0, 0)
  }

  return (
    <footer className="mt-14 flex items-end justify-between px-5 py-4 sm:flex text-body-4 md:text-body-3">
      <div className="flex flex-col md:flex-row md:w-[62.5vw] lg:w-[57.5vw] justify-between">
        <div className="flex items-center space-x-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 200 200"
            fill="currentColor"
            className="opacity-80"
          >
            <path
              d="M200 50V4.37114e-06L100 0V49.9803C99.9893 22.3751 77.6077 4.37114e-06 50 4.37114e-06H2.18557e-06V100H50C22.3858 100 -1.20706e-06 122.386 0 150L2.18557e-06 200H100V150C100 177.614 122.386 200 150 200H200V100H150.02C177.625 99.9893 200 77.6077 200 50Z"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
          <span>&copy;</span>
          <span>{new Date().getFullYear()}</span>
          <span className="font-extrabold uppercase 2xl:text-body-1">Danial Zaree</span>
        </div>
        <div>
          <span className=" text-body-4 2xl:text-body-1">Site designed and coded with ❤️‍🔥</span>
        </div>
      </div>
      <button onClick={toTop} className="col-span-2 flex items-center space-x-2 w-fit group 2xl:text-body-1">
        <span className="font-extrabold uppercase hover:font-black duration-200">BACK TO TOP</span>
        <span className="group-hover:-translate-y-3 duration-300 ease-in-out">
          <svg
            className="-rotate-90"
            width="24"
            height="24"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {" "}
            <g clipPath="url(#clip0_238_1313)">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.37114e-06 2.76541e-06L7.54022e-06 50L100 100L2.18557e-06 150L0 200L100 150L100 200L200 150V100V50L100 0V50L4.37114e-06 2.76541e-06ZM100 50L100 100L100 150L200 100L100 50Z"
                fill="url(#paint0_linear_238_1313)"
              />{" "}
            </g>{" "}
            <defs>
              {" "}
              <linearGradient
                id="paint0_linear_238_1313"
                x1="14"
                y1="26"
                x2="179"
                y2="179.5"
                gradientUnits="userSpaceOnUse"
              >
                {" "}
                <stop stopColor="#D1D1C7" />{" "}
              </linearGradient>{" "}
            </defs>{" "}
          </svg>
        </span>
      </button>
    </footer>
  );
}
