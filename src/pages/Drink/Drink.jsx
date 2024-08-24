import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getData,
  getDataCategoriya,
  getDataDrink,
} from "../../reduser/counter";
import Card from "../../components/Card/Card";
import Pagination from "@mui/material/Pagination"; // Import Pagination

export function Drink() {
  const imgUrl = import.meta.env.VITE_APP_FILES_URL;
  const dispatch = useDispatch();
  const productdrink = useSelector((state) => state.product.dataDrink);
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination state
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Adjust as needed

  useEffect(() => {
    dispatch(getData());
    dispatch(getDataDrink());
    dispatch(getDataCategoriya());
  }, [dispatch]);

  // Filter drinks based on search term
  const filteredDrinks = productdrink.filter((drink) =>
    drink.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Compute displayed drinks
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedDrinks = filteredDrinks.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="from-white py-[5%]">
      <div className="w-[90%] m-auto flex mt-[100px] flex-col gap-[60px] sm:w-[390px] sm:gap-[40px]">
        <section className="flex flex-col gap-[32px] sm:p-[0px_20px]">
          <div className="flex flex-col gap-[20px] py-[2%]">
            <div className="flex items-center gap-[16px]">
              <div className="bg-[#DB4444] font-mono w-[20px] h-[40px] rounded-[5px]"></div>
              <p className="text-[#DB4444] font-mono text-[20px]">All Drinks</p>
            </div>
            <div className="flex justify-between sm:flex-col sm:items-start sm:gap-[10px]">
              <p className="text-[35px] font-bold sm:text-[28px] sm:font-[600] font-mono">
                Drinks
              </p>
            </div>
          </div>
          <div className="my-4">
            <input
              type="text"
              placeholder="Search for drinks..."
              className=" p-[1%] sm:p-[5%] border rounded w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 gap-[30px] sm:flex sm:flex-col">
            {displayedDrinks.map((el) => (
              <Card
                key={el.id}
                id={el.id}
                img={`${imgUrl}${el.pathPhoto}`}
                description={el.description}
                cookingTimeInMinutes={el.cookingTimeInMinutes}
                title={el.name}
                price={el.price}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Pagination
              count={Math.ceil(filteredDrinks.length / itemsPerPage)}
              page={page}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Drink;
