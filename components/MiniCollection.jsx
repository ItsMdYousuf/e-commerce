const MiniCollection = () => {
  return (
    <div className="bg-white">
      <p>Mini Collection</p>
      <div className="grid grid-flow-col grid-cols-3 gap-4 px-5">
        <div className="row-span-3 bg-red-50 py-10">a</div>
        <div className="bg-purple-50 py-10">b</div>
        <div className="bg-yellow-50 py-10">c</div>
        <div className="row-span-3 bg-green-50 py-10">d</div>
      </div>
    </div>
  );
};

export default MiniCollection;
