import React from "react";


const HomePage = () => {
  return (
    <div className="container m-auto mt-[5%]">
      <div className="announcements flex gap-[10px] mt-[2rem] border-t border-b border-[#0b022d]">
        <div className="announcements-content pt-[.5rem]">
          <p>FREE EXPRESS SHIPPING in orders above $200 in Canada & US</p>
          <span>|</span>
          <p>SHOP NOW, PAY LATER with PayPal & PayBright Canada & US</p>
          <span>|</span>
          <p>FREE EXPRESS SHIPPING in orders above $200 in Canada & US</p>
        </div>
        <div className="announcements-content pt-[.5rem]">
          <p>FREE EXPRESS SHIPPING in orders above $200 in Canada & US</p>
          <span>|</span>
          <p>SHOP NOW, PAY LATER with PayPal & PayBright Canada & US</p>
          <span>|</span>
          <p>FREE EXPRESS SHIPPING in orders above $200 in Canada & US</p>
        </div>
      </div>
      <h1>This is the fkn home page, for now that is</h1>
      <div className="flex">
        {/* Left Column */}
        <div className="w-[75%] ">
          <div className="flex gap-4">
            <div className="w-[60%] border border-[#0b022d] ">
              <div>
                <img src="" alt="news image" />
                <h2>News Heading</h2>
              </div>
              <div className="flex items-center gap-2">
                Related
                <div className="border-t border-dotted border-gray-700 w-75 "></div>
              </div>
              <div></div>
            </div>
            <div className="w-[40%] border border-[#0b022d] ">
              <div>
                <div>
                  <img src="" alt="news image" />
                  <div>
                    <h2>News Heading</h2>
                    <p>News Description</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                Related
                <div className="border-t border-dotted border-gray-700 w-75 "></div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
        {/* right Column */}
        <div className="w-[25%]">
          <h2>Best Financial Products</h2>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
