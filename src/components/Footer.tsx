const Footer = () => {
  return (
    <div className="footer-wrapper py-[2rem] mt-3 w-full">
      <footer className="text-[#0b022d]">
        <div className={`py-0 px-[1rem]`}>
          <div className="lg:w-[50%] m-auto text-center xs:text-[12px] sm:text-[14px]">
            <p>
              &copy; 2024
              <strong>
                <span className="font-bold"> &lt; Д /&gt;</span>{" "}
              </strong>{" "}
              Manuel Alva.
            </p>
            <p className="">
              This website was created for academic purposes only. Any
              resemblance to other website or businesses, real or fictional, is
              purely coincidential
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
