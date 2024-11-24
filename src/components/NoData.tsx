import React from "react";
import NoDataImg from "../assets/no-data.png";
export default function NoData() {
  return (
    <div>
      <div className="flex justify-center my-2">
        
        <div className="text-center mt-5">
         
          
          <img src={NoDataImg} alt="No data available" className="w-56" />
          <h4 className="font-bold">No Data</h4>
        </div>
      </div>
    </div>
  );
}
