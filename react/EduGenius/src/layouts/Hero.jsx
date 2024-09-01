import heroImg from "../assets/hero.svg";
const Hero = () => {
    return (
        <>
            {/* <div className="row">
                <div className="col-md-4">
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
                </div>
                <div className="col-md-8">
                    <img src={heroImg} alt="img" width="50%" className="mt-3" />
                </div>
            </div> */}
            <section className="hero-section d-flex align-items-center mt-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 text-center text-lg-start">
                            <h1 className="display-4">Welcome to Our Website</h1>
                            <p className="lead">We offer the best products and services to help you achieve your goals.</p>
                            <button className="btn btn-primary btn-lg">Get Started</button>
                        </div>
                        <div className="col-lg-6">
                            <img src={heroImg} alt="Hero" className="img-fluid" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Hero;
