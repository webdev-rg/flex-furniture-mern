import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCategoryForm, setIsCategoryForm] = useState(false);

  const handleGetCategories = async () => {
    try {
      const response = await fetch(
        "https://flex-furniture-server.onrender.com/api/getcategories",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );
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
              `https://flex-furniture-server.onrender.com/api/getcategoryimage/${item._id}`
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
    <>
      <div className="w-full h-full p-10">
        <div className="w-full flex justify-between">
          <h1 className="text-4xl font-bold text-flex-furniture-950">
            Categories ({categories.length})
          </h1>
          <button
            className="px-6 py-4 text-2xl text-flex-furniture-950 font-semibold tracking-wide rounded-2xl border border-flex-furniture-950 hover:text-white hover:bg-flex-furniture-950 transition-all duration-300"
            onClick={() => setIsCategoryForm(true)}
          >
            Add Category
          </button>
        </div>

        {loading ? (
          <div className="w-full h-full flex flex-col items-center justify-center gap-5">
            <div
              className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1s_linear_infinite]"
              role="status"
            ></div>
            <span className="text-3xl font-semibold">Loading categories</span>
          </div>
        ) : categories.length === 0 ? (
          <div className="w-full mt-10">
            <h1 className="text-3xl text-flex-furniture-950 font-semibold">
              No categories found
            </h1>
          </div>
        ) : (
          <div className="w-full h-full mt-10 grid grid-cols-2 gap-10 overflow-y-auto">
            {categories.map((item) => {
              return (
                <Category
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  productCount={item.productCount}
                  image={item.imageURL}
                  getCategories={handleGetCategories}
                />
              );
            })}
          </div>
        )}
      </div>
      {isCategoryForm ? (
        <CategoryForm
          setIsCategoryForm={setIsCategoryForm}
          getCategories={handleGetCategories}
        />
      ) : null}
    </>
  );
};

const Category = ({ id, name, productCount, image, getCategories }) => {
  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `https://flex-furniture-server.onrender.com/api/deletecategory/${categoryId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();

      if (data.message === "Category not found") {
        toast.info(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (data.message === "Category deleted successfully") {
        toast.success(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          getCategories();
        }, 2000);
      } else if (data.message === "Category deletion failed") {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full p-5 border border-slate-200 rounded-2xl">
        <div className="flex gap-5">
          <div className="w-60 h-60 flex items-center justify-center bg-slate-100 rounded-xl">
            <img src={image} className="w-[80%]" alt={name} />
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-3">
              <h1 className="text-4xl text-flex-furniture-950 font-semibold">
                Category Name: <span className="font-normal">{name}</span>
              </h1>
              <h2 className="text-3xl text-flex-furniture-950 font-semibold">
                Product Count:{" "}
                <span className="font-normal">{productCount}</span>
              </h2>
            </div>
            <div className="flex gap-5">
              <button className="px-6 py-3 flex items-center gap-2 text-white text-2xl bg-green-600 rounded-2xl">
                <i className="fi fi-rr-pencil"></i>Edit
              </button>
              <button
                className="px-6 py-3 flex items-center gap-2 text-white  text-2xl bg-red-600 rounded-2xl"
                onClick={() => handleDeleteCategory(id)}
              >
                <i className="fi fi-rr-trash"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const CategoryForm = ({ setIsCategoryForm, getCategories }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const handleAddCategory = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("categoryImage", image);

    if (!name || !image) {
      alert("Category name and image are required");
    }

    try {
      const response = await fetch(
        "https://flex-furniture-server.onrender.com/api/addcategory",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.message === "Category Created Successfully") {
        toast.success(`${data.message}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsCategoryForm(false);
        getCategories();
      } else if (data.message === "Category creation failed..") {
        toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
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
  return (
    <>
      <ToastContainer />
      <div
        style={{ backgroundColor: "rgba(2, 13, 25, 0.5)" }}
        className="w-full h-full absolute top-0 left-0"
      >
        <div className="w-full flex justify-center">
          <div className="w-[45rem] h-full p-8 bg-white mt-32 rounded-3xl">
            <div className="flex justify-between">
              <div>
                <h1 className="text-3xl text-flex-furniture-950 font-semibold">
                  Add New Category
                </h1>
              </div>
              <div
                className="w-16 h-16 flex items-center justify-center bg-slate-100 rounded-2xl cursor-pointer"
                onClick={() => setIsCategoryForm(false)}
              >
                <i className="fi fi-rr-cross-small text-4xl"></i>
              </div>
            </div>
            <div className="w-full mt-5">
              <form className="w-full">
                <div className="w-full p-10 text-center border-2 border-dashed border-slate-300 rounded-3xl bg-slate-100">
                  {imagePreview ? (
                    <div className="w-full flex justify-center">
                      <img
                        src={imagePreview}
                        className="w-52"
                        alt="category-image"
                      />
                    </div>
                  ) : (
                    <>
                      <label
                        htmlFor="category-image"
                        className="cursor-pointer"
                      >
                        <h1 className="text-3xl text-flex-furniture-950 mb-5 font-semibold ">
                          Select Category Image
                        </h1>
                        <i className="fi fi-rr-copy-image text-5xl text-flex-furniture-950"></i>
                      </label>
                      <input
                        type="file"
                        name="category-image"
                        id="category-image"
                        onChange={handleImage}
                        hidden
                      />
                    </>
                  )}
                </div>

                <div className="w-full h-24 mt-5">
                  <input
                    type="text"
                    name="category-name"
                    id="category-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Category Name"
                    className="w-full h-full px-8 border border-slate-300 rounded-2xl text-2xl font-semibold placeholder:font-light focus:border-flex-furniture-950 valid:border-flex-furniture-950"
                    required
                  />
                </div>

                <div className="w-full h-24 mt-5">
                  <input
                    type="submit"
                    value="Add Category"
                    className="w-full h-full border border-flex-furniture-950 text-flex-furniture-950 text-3xl font-semibold rounded-2xl cursor-pointer hover:bg-flex-furniture-950 hover:text-white transition-all duration-300 ease-in-out"
                    onClick={handleAddCategory}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
