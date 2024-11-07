const Button = ({ className, children, iconChildren }) => {
  return (
    <button className={`${className} rounded-lg bg-black px-5 py-4`}>
      {children}
      {iconChildren}
    </button>
  );
};

export default Button;
