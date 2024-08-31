import heroImg from "../assets/hero.svg";
const Hero = () => {
    return (
        <>
            <div className="row">
                <div className="col-md-4">
                    <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
                </div>
                <div className="col-md-8">
                    <img src={heroImg} alt="img" width="50%" className="mt-3" />
                </div>
            </div>
        </>
    );
};

export default Hero;
