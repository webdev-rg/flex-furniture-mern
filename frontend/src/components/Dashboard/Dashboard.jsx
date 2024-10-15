import React, { useContext, useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Data } from "../DataProvider/DataProvider";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Dashboard = () => {
  const { setIsUserLoggedIn, updatedUserDetails, userData, URL } =
    useContext(Data);
  const [profileImage, setProfileImage] = useState(null);
  const navigate = useNavigate();

  const handleUpdateProfileImage = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      return toast.error("Please select an image", {
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

    const formData = new FormData();
    formData.append("profileImage", file);
    formData.append("email", updatedUserDetails.email);

    try {
      const response = await fetch(`${URL}/api/updateprofileimage`, {
        method: "PUT",
        body: formData,
      });

      const data = await response.json();

      if (
        data.message === "User not foun" ||
        data.message === "Profile image not uploaded"
      ) {
        return toast.error(`${data.message}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else if (data.message === "Profile image updated successfully") {
        return toast.success(`${data.message}`, {
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
    } catch (error) {}
  };

  const handleFetchProfileImage = async () => {
    try {
      const response = await fetch(`${URL}/api/getuserimage`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email: userData.email }),
      });

      const data = await response.json();

      if (data.message === "User image has null value") {
        setProfileImage("/images/user.png");
      } else if (data.message === "User image fetched successfully") {
        setProfileImage(data.image);
      }
    } catch (error) {
      console.error("Error fetching profile image:", error);
      toast.error("Error fetching profile image");
    }
  };

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    handleFetchProfileImage();
  }, [profileImage]);

  return (
    <>
      <ToastContainer />
      <div className="w-full h-full p-32 bg-white">
        <div className="w-full h-full py-10">
          <div className="w-full h-full flex justify-between gap-10">
            <div className="w-[25%] h-full p-10 bg-white border border-slate-200 rounded-2xl flex flex-col gap-5">
              <div className="w-full flex flex-col items-center gap-5">
                <div className="w-60 h-60 border rounded-full flex items-center justify-center">
                  <label
                    htmlFor="user-profile-image"
                    className="cursor-pointer"
                  >
                    <img
                      src={`${profileImage}`}
                      className="w-[92%] h-[92%] rounded-full mx-auto object-cover"
                      alt="user-profile"
                    />
                  </label>
                  <input
                    type="file"
                    name="user-profile-image"
                    id="user-profile-image"
                    onChange={handleUpdateProfileImage}
                    hidden
                  />
                </div>
                <div className="w-full flex flex-col items-center">
                  <h1 className="text-3xl text-flex-furniture-950 font-bold leading-relaxed">
                    {updatedUserDetails.firstName} {updatedUserDetails.lastName}
                  </h1>
                  <h2 className="text-2xl text-flex-furniture-950 font-light tracking-wide leading-relaxed">
                    {updatedUserDetails.email}
                  </h2>
                </div>
              </div>
              <div className="w-full">
                <ul className="w-full flex flex-col gap-5">
                  <li>
                    <NavLink
                      to="/dashboard/myprofile"
                      className={({ isActive }) =>
                        `w-full py-4 px-10 flex items-center gap-5  ${
                          isActive
                            ? "border border-slate-200"
                            : "border border-transparent"
                        } rounded-2xl cursor-pointer hover:border-slate-200 transition-all duration-200 ease-in-out`
                      }
                    >
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                        <i className="fi fi-rr-user text-2xl"></i>
                      </div>
                      <h1 className="text-3xl text-flex-furniture-950 font-medium">
                        My Profile
                      </h1>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/orders"
                      className={({ isActive }) =>
                        `w-full py-4 px-10 flex items-center gap-5  ${
                          isActive
                            ? "border border-slate-200"
                            : "border border-transparent"
                        } rounded-2xl cursor-pointer hover:border-slate-200 transition-all duration-200 ease-in-out`
                      }
                    >
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                        <i className="fi fi-rr-shopping-bag text-2xl"></i>
                      </div>
                      <h1 className="text-3xl text-flex-furniture-950 font-medium">
                        My Order List
                      </h1>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/dashboard/settings"
                      className={({ isActive }) =>
                        `w-full py-4 px-10 flex items-center gap-5  ${
                          isActive
                            ? "border border-slate-200"
                            : "border border-transparent"
                        } rounded-2xl cursor-pointer hover:border-slate-200 transition-all duration-200 ease-in-out`
                      }
                    >
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                        <i className="fi fi-rr-settings text-2xl"></i>
                      </div>
                      <h1 className="text-3xl text-flex-furniture-950 font-medium">
                        Settings
                      </h1>
                    </NavLink>
                  </li>

                  <li
                    className="w-full py-4 px-10 flex items-center gap-5 cursor-pointer hover:border-slate-200 transition-all duration-200 ease-in-out"
                    onClick={() => {
                      handleLogout();
                    }}
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
                      <i className="fi fi-rr-sign-out-alt text-2xl"></i>
                    </div>
                    <h1 className="text-3xl text-flex-furniture-950 font-medium">
                      Logout
                    </h1>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-[75%] h-full bg-white border border-slate-200 rounded-2xl">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
