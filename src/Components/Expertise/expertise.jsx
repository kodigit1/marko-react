import React from "react";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";
import CounterOnScroll from "../Hooks/CounterOnScroll";

function ExpertiseSection(){

    return(
        <>
           <div className="section">
                <div className="hero-container">
                    <div className="d-flex flex-column flex-lg-row gspace-5">
                        <div className="expertise-img-layout">
                            <div className="image-container expertise-img">
                                <AnimateOnScroll animation="fadeInUp" speed="normal">
                                    <img
                                        src="/assets/images/dummy-img-600x400.jpg"
                                        alt="Expertise Image"
                                        className="img-fluid"
                                    />
                                </AnimateOnScroll>
                                <div className="expertise-layout">
                                    <div className="d-flex flex-column">
                                        <div className="card-expertise-wrapper">
                                            <AnimateOnScroll animation="fadeInDown" speed="normal">
                                                <div className="card card-expertise">
                                                    <h4>Ready to Elevate Your Digital Presence?</h4>
                                                    <p>Let's create a custom strategy that fits your business goals.</p>
                                                    <div className="d-flex align-items-center flex-row gspace-2 expertise-link">
                                                        <a href="./contact">Get Free Consultation</a>
                                                        <i className="fa-solid fa-circle-arrow-right"></i>
                                                    </div>
                                                </div>
                                            </AnimateOnScroll>
                                        </div>
                                    <div className="expertise-spacer"></div>
                                        </div>
                                    <div className="expertise-spacer"></div>
                                </div>
                            </div>
                        </div>
                        <div className="expertise-title">
                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <div className="sub-heading">
                                    <i className="fa-regular fa-circle-dot"></i>
                                    <span>Our Expertise</span>
                                </div>
                            </AnimateOnScroll>

                            <AnimateOnScroll animation="fadeInRight" speed="normal">
                                <h2 className="title-heading">
                                    Data Driven Strategies, Measurable Results
                                </h2>
                            </AnimateOnScroll>
                            <p>
                                Pensato per chi ha poco tempo e budget limitato: creiamo il sito della 
                                tua attività, lo mettiamo online con il tuo dominio, lo ospitiamo sui 
                                nostri server e lo rendiamo conforme al GDPR. 
                                Tu paghi solo un piccolo anticipo per partire e una cifra mensile bassa, 
                                che puoi permetterti anche se sei un piccolo negozio.
                            </p>
                            <div className="d-flex flex-column flex-md-row gspace-2">
                                <div className="expertise-list">
                                    <h5>Cosa è incluso</h5>
                                    <ul className="check-list">
                                        <li><a href="./single_services">Nome dominio personalizzato (es: tuonome.it)</a></li>
                                        <li><a href="./single_services">Servizio di hosting veloce e sicuro</a></li>
                                        <li><a href="./single_services">Sito professionale ottimizzato per smartphone</a></li>
                                        <li><a href="./single_services">Modulo contatti con gestione consensi GDPR</a></li>
                                        <li><a href="./single_services">Pagina per mostrare menu, listino o servizi</a></li>
                                        <li><a href="./single_services">ntegrazione WhatsApp / telefono per contatti veloci</a></li>
                                    </ul>
                                </div>

                                <AnimateOnScroll animation="fadeInUp">
                                    <div className="card card-expertise card-expertise-counter animate-box">
                                        <div className="d-flex flex-row gspace-2 align-items-center">
                                            <div className="d-flex flex-row align-items-center">
                                            <CounterOnScroll
                                                target={21}
                                                suffix="+"
                                                counterClassName="counter"
                                                suffixClassName="counter-detail"
                                            />
                                            </div>
                                            <h6>Years of Experience on Digital Marketing Services</h6>
                                        </div>
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipiscing elit in ex ligula varius at rutrum et finibus sed felis qisque.
                                        </p>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default ExpertiseSection;