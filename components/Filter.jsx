const Filter = () => {
  return (
    <div className="flex w-full flex-wrap justify-between gap-5 py-5">
      <div className="flex gap-5">
        <select className="mb-2 rounded-full bg-gray-300 px-3 py-1 outline-none">
          <option>Category</option>
          <option value="man">Man</option>
          <option value="woman">Woman</option>
        </select>
        <select className="mb-2 rounded-full bg-gray-300 px-3 py-1 outline-none">
          <option>Digital</option>
          <option value="desktop">Desktop</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>
      <div>
        <select className="mb-2 rounded-full bg-gray-300 px-3 py-1 outline-none">
          <option>Sort By:</option>
          <option value="lowToHigh">Low to High</option>
          <option value="highToLow">High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
