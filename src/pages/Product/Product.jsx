import { Link } from "react-router-dom"

export function Products() {

  return (
    <div className="p-[60px_135px] flex flex-col gap-[40px]">
      <div>
        <h1>
          <Link to={"/catalog"}>
            <span className="text-[14px] text-[#232323]">Home / </span>
          </Link>
          <span>Explore Our Products</span>
        </h1>
      </div>
      
      <section>
        <div></div>
      </section>
    </div>
  )
}

export default Products