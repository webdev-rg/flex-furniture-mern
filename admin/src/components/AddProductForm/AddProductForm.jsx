import React, { useState } from "react";

export const AddProductForm = () => {
  const [name, setName] = useState("");
  const [rating, setRating] = useState();
  const [price, setPrice] = useState();
  const [discount, setDiscount] = useState();
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [products, setProducts] = useState([]);

  const handleDiscardChanges = () => {
    setName("");
    setRating("");
    setPrice("");
    setDiscount("");
    setDescription("");
    setStock("");
    setImage(null);
    setImagePreview(null);
  };
  return (
    <main className="w-full h-full p-10">
      <h1 className="text-4xl text-flex-furniture-950 font-semibold">Add New Product</h1>
      <div className="w-full h-full mt-10 bg-white p-8 border border-slate-200 rounded-3xl overflow-y-auto">
        <form className="w-full flex flex-col gap-10">
          <div className="w-full flex justify-between border border-slate-200 rounded-2xl p-8">
            <h1 className="text-4xl font-bold text-vaso-950">Add Product</h1>
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="w-52 h-16 border border-red-600 rounded-xl text-xl text-red-600 font-semibold hover:bg-red-600 hover:text-white transition-all duration-200"
                onClick={handleDiscardChanges}
              >
                Discard Changes
              </button>
              <button
                type="submit"
                className="w-52 h-16 border border-flex-furniture-700 rounded-xl text-2xl text-flex-furniture-700 font-semibold hover:bg-flex-furniture-700 hover:text-white transition-all duration-200"
                // onClick={handleAddProduct}
              >
                Add Product
              </button>
            </div>
          </div>

          <div className="w-full flex justify-between gap-8">
            <div className="w-[60%] border border-slate-200 rounded-2xl px-7 py-10">
              <h1 className="text-3xl font-bold text-vaso-950">
                General Information
              </h1>
              <div className="mt-5 flex flex-col gap-4">
                <label
                  htmlFor="product-name"
                  className="text-2xl font-medium text-vaso-950"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="product-name"
                  placeholder="Enter Product Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-20 px-5 text-3xl font-semibold placeholder:font-normal border border-slate-200 focus:border-vaso-700 valid:border-vaso-700 rounded-xl"
                  required
                />
              </div>
              <div className="mt-5 flex flex-col gap-4">
                <label
                  htmlFor="product-desc"
                  className="text-2xl font-medium text-vaso-950"
                >
                  Product Description
                </label>
                <textarea
                  id="product-desc"
                  placeholder="Enter Product Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-52 p-5 text-3xl font-light placeholder:font-normal border border-slate-200 focus:border-vaso-700 valid:border-vaso-700 rounded-xl"
                  required
                ></textarea>
              </div>
            </div>
            <div className="w-[40%] border border-slate-200 rounded-2xl px-7 py-10">
              <h1 className="text-3xl font-bold text-vaso-950">
                Product Media
              </h1>
              <div className="mt-5 w-full px-5 py-10 flex items-center justify-center border-2 border-dashed rounded-2xl bg-vaso-50 border-slate-200">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Product Preview"
                    className="w-[20rem] object-cover"
                  />
                ) : (
                  <div>
                    <label
                      htmlFor="add-image"
                      className="flex items-center gap-2 text-3xl font-bold text-vaso-700 cursor-pointer"
                    >
                      {/* <BsImage className="text-4xl text-violet-700" /> */}
                      No Image Selected
                    </label>
                    <input
                      type="file"
                      name="product-image"
                      id="add-image"
                      // onChange={handleImageChange}
                      accept="image/*"
                      hidden
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-full border border-slate-200 rounded-2xl px-7 py-10">
            <h1 className="text-3xl font-bold text-vaso-950">Pricing</h1>
            <div className="w-full flex justify-between gap-8">
              <div className="mt-5 flex flex-col gap-4">
                <label
                  htmlFor="product-name"
                  className="text-2xl font-medium text-vaso-950"
                >
                  Base Price
                </label>
                <input
                  type="number"
                  id="product-name"
                  placeholder="Enter Product Name"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full h-20 px-5 text-2xl font-semibold placeholder:font-normal border border-slate-200 focus:border-vaso-700 valid:border-vaso-700 rounded-xl"
                  required
                />
              </div>
              <div className="mt-5 flex flex-col gap-4">
                <label
                  htmlFor="product-name"
                  className="text-2xl font-medium text-vaso-950"
                >
                  Discount
                </label>
                <input
                  type="number"
                  id="product-name"
                  placeholder="Enter Product Name"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="w-full h-20 px-5 text-2xl font-semibold placeholder:font-normal border border-slate-200 focus:border-vaso-700 valid:border-vaso-700 rounded-xl"
                  required
                />
              </div>
              <div className="mt-5 flex flex-col gap-4">
                <label
                  htmlFor="product-name"
                  className="text-2xl font-medium text-vaso-950"
                >
                  Rating
                </label>
                <input
                  type="number"
                  id="product-name"
                  placeholder="Enter Product Name"
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="w-full h-20 px-5 text-2xl font-semibold placeholder:font-normal border border-slate-200 focus:border-vaso-700 valid:border-vaso-700 rounded-xl"
                  required
                />
              </div>
              <div className="mt-5 flex flex-col gap-4">
                <label
                  htmlFor="product-name"
                  className="text-2xl font-medium text-vaso-950"
                >
                  Stock
                </label>
                <input
                  type="number"
                  id="product-name"
                  placeholder="Enter Product Name"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full h-20 px-5 text-2xl font-semibold placeholder:font-normal border border-slate-200 focus:border-vaso-700 valid:border-vaso-700 rounded-xl"
                  required
                />
              </div>
              <div className="mt-5 flex flex-col gap-4">
                <label
                  htmlFor="product-name"
                  className="text-2xl font-medium text-vaso-950"
                >
                  Category
                </label>
                <input
                  type="text"
                  id="product-name"
                  placeholder="Enter Product Name"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className="w-full h-20 px-5 text-2xl font-semibold placeholder:font-normal border border-slate-200 focus:border-vaso-700 valid:border-vaso-700 rounded-xl"
                  required
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
