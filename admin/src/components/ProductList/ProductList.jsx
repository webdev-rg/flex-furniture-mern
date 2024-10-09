import React from "react";

export const ProductList = () => {
  return (
    <div className="w-full h-full p-10 flex flex-col gap-10">
      <div>
        <h1 className="text-4xl font-bold text-flex-furniture-950">
          Product List
        </h1>
      </div>
      <div className="w-full flex flex-col gap-10">
        <ProductCard />
      </div>
    </div>
  );
};

const ProductCard = () => {
  return (
    <div className="w-full p-6 border border-slate-200 rounded-2xl">
      <div className="flex flex-col gap-10">
        <h1 className="text-2xl text-flex-furniture-950 font-semibold tracking-wide">
          Images
        </h1>
        <div className="flex items-center gap-5">
          <div className="w-40 h-48">
            <img
              src="/images/chair.jpg"
              className="w-full h-full object-cover rounded-2xl"
              alt=""
            />
          </div>
          <div className="w-40 h-48">
            <img
              src="/images/chair-2.jpg"
              className="w-full h-full object-cover rounded-2xl"
              alt=""
            />
          </div>
          <div className="w-40 h-48">
            <img
              src="/images/chair-3.jpg"
              className="w-full h-full object-cover rounded-2xl"
              alt=""
            />
          </div>
          <div className="w-40 h-48">
            <img
              src="/images/chair-4.jpg"
              className="w-full h-full object-cover rounded-2xl"
              alt=""
            />
          </div>
        </div>
        <div className="w-full">
          <div class="relative overflow-x-auto">
            <table class="w-full text-sm text-left rtl:text-right text-flex-furniture-950">
              <thead class="text-xs text-flex-furniture-950 uppercase bg-gray-100">
                <tr>
                  <th scope="col" class="px-6 py-3 text-2xl">
                    Product name
                  </th>
                  <th scope="col" class="px-6 py-3 text-2xl">
                    Price
                  </th>
                  <th scope="col" class="px-6 py-3 text-2xl">
                    Discount
                  </th>
                  <th scope="col" class="px-6 py-3 text-2xl">
                    Rating
                  </th>
                  <th scope="col" class="px-6 py-3 text-2xl">
                    Stock
                  </th>
                  <th scope="col" class="px-6 py-3 text-2xl">
                    Category
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white border-b text-2xl text-flex-furniture-950">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    Garden Chair
                  </th>
                  <td class="px-6 py-4">$200</td>
                  <td class="px-6 py-4">15</td>
                  <td class="px-6 py-4">4.5</td>
                  <td class="px-6 py-4">10</td>
                  <td class="px-6 py-4">Chair</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full flex items-center gap-5">
          <button className="px-8 py-3 bg-green-600 rounded-xl text-2xl text-white font-semibold tracking-wide">Update</button>
          <button className="px-8 py-3 bg-red-600 rounded-xl text-2xl text-white font-semibold tracking-wide">Delete</button>
        </div>
      </div>
    </div>
  );
};
