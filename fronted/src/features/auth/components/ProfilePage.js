import React from "react";
import { ReactDOM } from "react";

function ProfilePage() {
  return (
    <div className="w-full min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-200 via-amber-400 to-red-500 flex-col flex items-center justify-start">
      <div className="mt-14 mb-6 ml-0 mr-96 flex items-center justify-center gap-x-20">
        <img
          src="https://picsum.photos/200/300" 
          alt="Profile"
          className="w-40 h-40 rounded-3xl shadow-md shadow-amber-900 mb-2 "
        />
        <div className="ml-4">
          <h1 className="text-2xl font-semibold text-gray-800">John Doe</h1>
          <p className="text-gray-500">Username: JohnDoe@example.com</p>
        </div>
      </div>
      <div className=" bg-slate-200 bg-opacity-75 m-10 mt-10 p-8 rounded-lg shadow-[0_35px_50px_-15px_rgb(119,7,5)] w-3/5 text-left">
        <h1 className="mb-5 ml-1 text-gray-700">Basic Info</h1>
        <form className="grid grid-cols-2">
          <div className="mb-4">
            <label
              htmlFor="Name"
              className="block text-sm font-medium text-gray-600"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="Name"
              className="mt-1 p-2 w-auto border rounded-md"
              placeholder="Tap to edit"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-auto border rounded-md"
              placeholder="Sorry not this one!"
              readOnly
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="Username"
              className="block text-sm font-medium text-gray-600"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="Username"
              className="mt-1 p-2 w-auto border rounded-md"
              placeholder="Tap to edit"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="DoB"
              className="block text-sm font-medium text-gray-600"
            >
              DoB
            </label>
            <input
              type="date"
              id="dob"
              name="Dateofbirth"
              className="mt-1 p-2 w-52 border rounded-md"
              placeholder="Tap to edit"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="Gender"
              className="block text-sm font-medium text-gray-600"
            >
              Gender
            </label>
            <input
              type="text"
              id="gender"
              name="Gender"
              className="mt-1 p-2 w-auto border rounded-md"
              placeholder="Tap to edit"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-600"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="mt-1 p-2 w-auto border rounded-md"
              placeholder="Tap to edit"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-600"
            >
              Summary
            </label>
            <input
              type="text"
              id="desc"
              name="description"
              className="mt-1 p-2 w-auto border rounded-md"
              placeholder="Tap to edit"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="website"
              className="block text-sm font-medium text-gray-600"
            >
              Website
            </label>
            <input
              type="text"
              id="website"
              name="website"
              className="mt-1 p-2 w-auto border rounded-md"
              placeholder="Tap to edit"
            />
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfilePage;
