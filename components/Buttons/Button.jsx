"use client";
const Button = ({ className, children, iconChildren, onChange, onClick }) => {
  return (
    <button
      onClick={onClick}
      onChange={onChange}
      className={`${className} border-black bg-black px-8 py-3 text-sm font-semibold text-white shadow-xl duration-200 ease-in-out hover:border-[1px] hover:border-black hover:bg-white hover:text-black`}
    >
      {children}
      {iconChildren}
    </button>
  );
};

export default Button;
