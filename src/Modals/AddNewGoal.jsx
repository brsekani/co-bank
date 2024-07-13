import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowAddNewGoal } from "../Features/uiSlice";
import { GoGoal } from "react-icons/go";
import { useForm, Controller } from "react-hook-form";

function AddNewGoal() {
  const darkMode = useSelector((state) => state.darkMode);
  const addNewGoalRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        addNewGoalRef.current &&
        !addNewGoalRef.current.contains(event.target)
      ) {
        dispatch(setShowAddNewGoal(false));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // You can dispatch actions here to handle form submission
    dispatch(setShowAddNewGoal(false)); // Example: Close modal after submission
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50">
      <div
        className={`w-full sm:max-w-lg h-full sm:h-fit mx-auto rounded-lg shadow-lg bg-white text-black ${
          darkMode ? "bg-gray-800 text-white" : ""
        }`}
        ref={addNewGoalRef}
      >
        <div className="p-6">
          <div className="flex items-center justify-center">
            <GoGoal className="mr-2" size={24} />
            <h1 className="text-xl font-semibold">Add New Goal</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">Name</label>
              <Controller
                name="name"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter goal name"
                  />
                )}
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-sm font-medium">
                Target Amount
              </label>
              <Controller
                name="targetAmount"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Enter target amount"
                  />
                )}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Add Goal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewGoal;
