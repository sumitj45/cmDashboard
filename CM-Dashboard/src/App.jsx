// import './App.css'
import Hierarchy from "./components/LeftSide/Hierarchy";
import Contracts from "./components/RightSide/contracts/Contracts";

// import LeftSideBar from "./components/LeftSide/LeftSideBar";

function App() {
  return (
   <>
  <h1 className="text-xl font-bold mb-4 align-center px-7 ">CM DASHBOARD</h1>
    <div className="flex ">
       
      <div className="flex-1">
      
    <Contracts/>
    <Hierarchy/>
    {/* <SubManagerTable/> */}
      
      </div>
    </div>
    </>
  );
}

export default App;
