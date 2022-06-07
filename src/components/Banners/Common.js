import React from 'react'
export default function Common() {
    return (
        <>
            <div className="container">
            {/* <h4 className="style_h4 mt-4"></h4> */}
                <div className="out_border_wrapper">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                            <div className="find_job_section">
                                <div className="find_job_section mt-5">
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-md-7 m-auto">
                                                <h2>We can't seem to find the
                                                    page you're looking for.
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="center-img">   <img src="/images/404.jpg" alt=""/></div>
                                            </div>
                                            <div className="col-md-12 text-center">
                                                <a className="all_categories_btn" href="#">Back to Home</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
