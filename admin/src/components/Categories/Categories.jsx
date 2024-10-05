import React, { useEffect, useState } from "react";

export const Categories = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("categoryImage", image);

    try {
      const response = await fetch("http://localhost:1901/api/addcategory", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (
        data.message === "Category Created Successfully" ||
        data.message === "Category creation failed.."
      ) {
        alert(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleGetCategories = async () => {
    try {
      const response = await fetch("http://localhost:1901/api/getcategories", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (!data || data.message === "No category found") {
        alert(`${data.message}`);
        setLoading(false); // End loading
        return;
      }

      const categoriesWithImages = await Promise.all(
        data.map(async (item) => {
          try {
            const imageBlobRes = await fetch(
              `http://localhost:1901/api/getcategoryimage/${item._id}`
            );

            if (!imageBlobRes.ok) {
              throw new Error(`Error fetching image for category ${item._id}`);
            }

            const imageBlobData = await imageBlobRes.json();
            return { ...item, imageURL: imageBlobData.imageDataUrl };
          } catch (error) {
            console.error(
              `Error fetching image for category ${item._id}:`,
              error
            );
            return { ...item, imageURL: null };
          }
        })
      );

      setCategories(categoriesWithImages);
      setLoading(false); // End loading after data is set
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false); // End loading in case of error
    }
  };

  useEffect(() => {
    handleGetCategories();
  }, []);

  return (
    <div className="w-full h-full p-10">
      <div className="w-full flex justify-between">
        <h1 className="text-4xl font-bold text-flex-furniture-950">
          Categories ({categories.length})
        </h1>
        <button className="px-6 py-4 text-2xl text-flex-furniture-950 font-semibold tracking-wide rounded-2xl border border-flex-furniture-950 hover:text-white hover:bg-flex-furniture-950 transition-all duration-300">
          Add Category
        </button>
      </div>

      {/* Check if still loading */}
      {loading ? (
        <div className="w-full mt-10">
          <h1>Loading...</h1>
        </div>
      ) : categories.length === 0 ? (
        <div className="w-full mt-10">
          <h1>No categories found</h1>
        </div>
      ) : (
        <div className="w-full h-full mt-10 grid grid-cols-2 gap-10 overflow-y-auto">
          {categories.map((item, index) => {
            return (
              <Category
                key={index}
                name={item.name}
                productCount={item.productCount}
                image={item.imageURL}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

const Category = ({ name, productCount, image }) => {
  return (
    <div className="w-full p-5 border border-slate-200 rounded-2xl">
      <div className="flex gap-5">
        <div className="w-60 h-60 flex items-center justify-center bg-slate-100 rounded-xl">
          <img src={image} alt="" />
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl text-flex-furniture-950 font-semibold">
              Category Name: <span className="font-normal">{name}</span>
            </h1>
            <h2 className="text-3xl text-flex-furniture-950 font-semibold">
              Product Count: <span className="font-normal">{productCount}</span>
            </h2>
          </div>
          <div className="flex gap-5">
            <button className="px-6 py-3 flex items-center gap-2 text-white text-2xl bg-green-600 rounded-2xl">
              <i className="fi fi-rr-pencil"></i>Edit
            </button>
            <button className="px-6 py-3 flex items-center gap-2 text-white  text-2xl bg-red-600 rounded-2xl">
              <i className="fi fi-rr-trash"></i>Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
