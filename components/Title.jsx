const Title = ({ titleName, className }) => {
  return (
    <h1
      className={`${className} py-10 text-center text-3xl font-bold text-slate-800`}
    >
      {titleName}
    </h1>
  );
};

export default Title;
