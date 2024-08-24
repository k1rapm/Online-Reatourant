// Contact.js
import React from "react";
import { IngredientTable } from "../../components/Card/pages/Contact/IngredientTable";
import { CategoryTable } from "../../components/Card/pages/Contact/CategoryTable";

import { DishTable } from "../../components/Card/pages/Contact/DishTable";
import { DrinkTable } from "../../components/Card/pages/Contact/DrinkTable";


export function Contact() {
  return (
    <div className="px-[5%] py-[5%]">
      <IngredientTable />
      <CategoryTable />
      <DrinkTable/>
      <DishTable/>
      
    </div>
  );
}

export default Contact;