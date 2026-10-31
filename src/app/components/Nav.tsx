
import Image from "next/image";
import image from "@/app/assets/logo-icon.png";

const Nav = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100 shadow-md px-4 md:px-8">
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <Image
            src={image}
            alt="বাজার দর Logo"
            width={45}
            height={45}
            className="rounded-lg bg-green-600 border border-green-700 p-2 shadow-sm"
          />

          <div>
            <h1 className="text-xl md:text-2xl font-bold">
              বাজার দর
            </h1>

            <p className="hidden md:block text-sm text-base-content/70">
              {date}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="btn btn-sm sm:btn-md">
          Signin
        </button>

        <button className="btn bg-green-600 text-white border-green-600 hover:bg-green-700 btn-sm sm:btn-md">
          Signup
        </button>
      </div>
    </div>
  );
};

export default Nav;
