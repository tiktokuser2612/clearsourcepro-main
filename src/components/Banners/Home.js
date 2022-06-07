import React from 'react'

export default function Home() {
    return (
        <div className="banner_section">
            <img src="/images/banner_img.png" alt="" />
            <div className="banner_text">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 m-auto">
                            <h1>
                                Finding your dream job.. <br/>
                                Recruiting your best employees..<br/>
                                made faster & easier under one <br/>platform!
                            </h1>
                           
                            <div className="d-md-flex justify-content-center align-items-start">
                                {/* <div className="form_input">
                                    <img src="/images/search_icon.png" alt="" />
                                    <input placeholder="I’m looking for" type="text" />
                                </div>
                                <div className="form_input">
                                    <img src="/images/bag_icon.png" alt="" />
                                    <div className="custom-select">
                                        <select>
                                            <option>Jobs</option>
                                            <option>Jobs</option>
                                            <option>Jobs</option>
                                        </select>
                                    </div>
                                </div> */}
                                <button type="button">SIGN UP NOW!</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
