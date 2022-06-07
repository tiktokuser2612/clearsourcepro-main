import React from 'react'

export default function MyAccount() {
    return (
        <>
            <h4 className="style_h4 mt-4">Edit My Account</h4>
            <div className="row">
                <div className="out_border_wrapper">
                    <div className="col-md-12">
                        <div className="account_form_section">
                        <h2>Company Profile</h2>
                        <div className="account_form_bg">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                    <label>Company Name</label>
                                    <input placeholder="ABCD Company" type="text"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                    <label>Username</label>
                                    <input placeholder="ABCD Company" type="text"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                    <label>Employees</label>
                                    <input placeholder="ABCD Company" type="text"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                    <label>Category</label>
                                    <div className="tags_pill">
                                        <span>Accounting</span>
                                        <span>Tally</span>
                                    </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="account_form_style">
                                    <label>About Companys</label>
                                    <textarea placeholder="ABCD Company"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="account_form_section">
                        <h2>Contact Information</h2>
                        <div className="account_form_bg">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="d-flex align-items-center profile_photo">
                                    <img src="/images/profile_icon_2.png" alt=""/>
                                    <h4>Add profile photo</h4>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                    <label>Full Name</label>
                                    <input placeholder="ABCD Company" type="text"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                    <label>Email</label>
                                    <input placeholder="ABCD Company" type="text"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                    <label>Phone</label>
                                    <input placeholder="ABCD Company" type="text"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                    <label>Complete Address</label>
                                    <input placeholder="ABCD Company" type="text"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="account_form_section">
                        <h2>Social Accounts</h2>
                        <div className="account_form_bg">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                    <label>Facebook</label>
                                    <input placeholder="text here" type="text"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                    <label>Instagram</label>
                                    <input placeholder="text here" type="text"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                    <label>Twitter</label>
                                    <input placeholder="text here" type="text"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                    <label>LinkedIn</label>
                                    <input placeholder="text here" type="text"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>Google Plus</label>
                                        <input placeholder="text here" type="text"/>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="account_form_style">
                                        <label>YouTube</label>
                                        <input placeholder="text here" type="text"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="d-flex justify-content-center">
                        <div className="account_form_style">
                            <button type="button" data-toggle="modal" data-target="#update_job">Update account</button>
                            <button className="cancel" type="button">Cancel</button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
       
        </>
    )
}
