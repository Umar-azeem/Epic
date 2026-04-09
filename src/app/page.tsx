"use client";

import { redirect } from "next/navigation";
import Discover from "./home/(group-folder)/inner/discover";

function Page() {
  redirect("/home");
  // return (
  //   <div className="max-w-5xl h-auto mx-auto text-white">
  //     {/* <Discover /> */}
  //     home page
  //   </div>
  // );
}
export default Page;
