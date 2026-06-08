import { ImSpinner2 } from "react-icons/im";

export default function AddAddressBtn({ isLoading }: { isLoading: boolean }) {
  return (
    <>
      <button
        disabled={isLoading}
        type="submit"
        className=" flex flex-1 py-3 px-6 items-center justify-center rounded-xl bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 shadow-lg shadow-primary-600/25 cursor-pointer"
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <ImSpinner2 className="animate-spin" />
            <span>Saving...</span>
          </div>
        ) : (
          "Save"
        )}
      </button>
    </>
  );
}
