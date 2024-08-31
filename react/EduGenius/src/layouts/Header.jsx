import logo from "../assets/logo.png";
const Header = () => {
    return (
        <>
            <div className="bg-secondary bg-opacity-25 shadow-md p-2">
                <div className="row mt-1">
                    <div className="col-md-2">
                        <img src={logo} alt="logo" height={40} width={40} />
                    </div>
                    <div className="col-md-6">
                        <div className="d-flex flex-row justify-content-md-center">
                            <div className="p-2">About Us</div>
                            <div className="p-2">Job Section</div>
                            <div className="p-2">Resume Build</div>
                            <div className="p-2">Course</div>
                            <div className="p-2">Feedback</div>
                        </div>
                    </div>
                    <div className="col-md-4 text-end">
                        <div className="btn-group gap-4">
                            <button type="button" className="btn btn-outline-primary btn-sm rounded">
                                Log in
                            </button>
                            <button type="button" className="btn btn-outline-primary btn-sm rounded">
                                Sign up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
