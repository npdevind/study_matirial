import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const SignUp = () => {
    return (
        <>
            <div className="d-flex align-items-center justify-content-center vh-100">
                <div className="card bg-primary bg-opacity-25 shadow border-0" style={{ width: "100%", maxWidth: "400px" }}>
                    <div className="card-body">
                        <div className="card-title text-start mb-4">
                            <Link to={"/"} style={{ textDecoration: "none" }} className="text-primary">
                                <FaRegArrowAltCircleLeft /> Back
                            </Link>
                        </div>
                        <h4 className="text-center mb-4">
                            <img src={logo} alt="logo" width={100} />
                        </h4>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                            <label htmlFor="email">Email</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="username" placeholder="name@example.com" />
                            <label htmlFor="username">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" placeholder="Password" />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                                <input className="form-check-input" type="checkbox" id="remember" />
                                <label className="form-check-label ms-2" htmlFor="remember">
                                    Remember password
                                </label>
                            </div>
                            <button className="btn btn-primary">Signup</button>
                        </div>
                        <div className="text-center">
                            <p className="mb-0">
                                Already have an account?{" "}
                                <Link to="/login" className="text-primary">
                                    login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;
