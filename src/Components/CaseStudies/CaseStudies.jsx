import React from "react";
import { caseStudiesData } from "../../Data/CaseStudiesData";
import CaseStudyCard from "../Card/CaseStudiesCard";
import AnimateOnScroll from "../Hooks/AnimateOnScroll";

const CaseStudiesSection = ({ noPadding }) => {

    return (
        <div className={`section ${noPadding ? "p-0" : ""}`}>
            <div className="hero-container">
                <div className="case-studies-layout">
                    <div className="card card-case-studies">
                        <div className="row row-cols-lg-2 row-cols-1 grid-spacer-5">
                            <div className="col">
                                <AnimateOnScroll animation="fadeInLeft" speed="normal">
                                    <div className="d-flex flex-column gspace-2">
                                        <div className="sub-heading">
                                            <i className="fa-regular fa-circle-dot"></i>
                                            <span>I nostri clienti</span>
                                        </div>
                                        <h2 className="title-heading">Attività che ci hanno scelto</h2>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                            <div className="col">
                                <AnimateOnScroll animation="fadeInRight" speed="normal">
                                    <div className="d-flex flex-column h-100 justify-content-end gspace-2">
                                        <p>We don't just talk about results—we deliver them. Here are some of our most impactful case studies showcasing how our digital marketing strategies drive success.</p>
                                        <div className="link-wrapper">
                                            <a href="./case_studies">More Case Studies</a>
                                            <i className="fa-solid fa-circle-arrow-right"></i>
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            </div>
                        </div>

                        {/* Cards */}
                        <div className="d-flex flex-column gspace-2">
                            <div className="d-flex flex-column flex-lg-row gspace-2">
                                {caseStudiesData.slice(0, 2).map((item) => ( 
                                    <CaseStudyCard key={item.id} {...item} />
                                ))}
                            </div>
                            <div className="d-flex flex-column flex-lg-row gspace-2">
                                {caseStudiesData.slice(2, 4).map((item) => (
                                    <CaseStudyCard key={item.id} {...item} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="spacer"></div>
                </div>
            </div>
        </div>
    );
};

export default CaseStudiesSection;
