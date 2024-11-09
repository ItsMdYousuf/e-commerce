"use client";
const SecondaryButton = ({
  className,
  children,
  iconChildren,
  onChange,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      onChange={onChange}
      className={`${className} rounded-lg border-[1px] border-black px-8 py-3 text-sm font-semibold text-black shadow-xl duration-200 ease-in-out hover:bg-black hover:text-white`}
    >
      {children}
      {iconChildren}
    </button>
  );
};

export default SecondaryButton;
