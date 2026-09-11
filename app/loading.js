import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center py-20">
      <ClipLoader color="#2e4c6d" size={32} />
    </div>
  );
}
