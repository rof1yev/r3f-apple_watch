import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html center>
      <div className="flex space-x-2 justify-center items-center">
        <span className="sr-only">Loading...</span>
        <div className="size-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
        <div className="size-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
        <div className="size-4 bg-white rounded-full animate-bounce" />
      </div>
    </Html>
  );
};

export default Loader;
