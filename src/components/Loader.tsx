import { ClipLoader } from 'react-spinners';

export function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      
      <ClipLoader size={100} color="#F59E0B" />
    </div>
  );
}
