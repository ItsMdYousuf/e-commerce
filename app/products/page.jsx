"use client";

import Filter from "@/components/Filter";
import Title from "@/components/Title";
import ProductItem from "./ProductItem";

const Products = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const products = await productsLoad();
      setData(products);
      console.log(products);

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="container px-10 pb-10">
      <Title titleName="Products" />
      <Filter />
      <div className="grid grid-cols-1 items-center gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {loading == true && <h2 className="text-center"> loading...</h2>}
        {data.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
};

export default Products;
