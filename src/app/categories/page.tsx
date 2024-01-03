import React, { FC } from "react";
import { Category, CategoryApi } from "../../../luugoapi";


const PageLogin = async () => {

  const categoryApi = new CategoryApi()

  const result = await categoryApi.categoryGet()

  return (
    <div>
      <ul>
        { result.map((category) => {
          return <li>{category.title}</li>
        }) }
      </ul>
    </div>
  );
};

export default PageLogin;
