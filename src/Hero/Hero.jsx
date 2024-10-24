import walletImage from './wallet.jpg';
const Hero= ()=>{
    return(
        <>
        <div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src={walletImage} class="d-block mx-lg-auto img-fluid" alt="Wallet" width="800" height="600" loading="lazy"/>
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold lh-1 mb-3">"Your Money, Your Way"</h1>
        <p class="lead">Experience the freedom of managing your finances effortlessly. Our digital wallet empowers you to handle transactions securely and conveniently, anytime, anywhere. Start your journey to smarter spending!</p>
        <div class="d-grid gap-2 d-md-flex justify-content-md-start">
          
        </div>
      </div>
    </div>
  </div>
        </>
    );

}
export default Hero;