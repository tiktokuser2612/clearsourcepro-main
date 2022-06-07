import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// import { Common as CommonBanner } from 'components/Banners';

const LookingForJobsPage = () => {
  const history = useHistory();

  const gotoUrl = (url) => () => {
    history.push(url);
  };

  return (
    <>
      {/* <!-- Banner start here --> */}
      {/* <CommonBanner text="Looking for a Jobs?"></CommonBanner> */}
      {/* <!-- Banner end here --> */}

      {/* <!-- Body start here --> */}

      <div class="container">
		<h4 class="style_h4 mt-4">Looking for a Job?</h4>
        <div class="out_border_wrapper">
        <div class="row">
            <div class="col-md-12">
			<div class="contact_us_content">
                <div class="hire_candidates_card">
                    <span class="hire_candidates_img"><img src="/images/looking_for_job_img.jpg" alt=""/></span>
                    <div class="hire_candidates_text">
                        
                        <p>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.Lorem Ipsum is sting and been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                            <br/><br/>
                            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheeMaker including versions of Lorem Ipsum.
                        </p>
                        <br/><a class="hire_btn" href="#">Hire Candidates</a>
                    </div>
                </div>
            </div>

        </div>
    </div>
	 
 
     <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="find_job_section">
                    
                    <div class="find_job_section mt-5">
            <div class="container">
            <div class="row">
                <div class="col-md-7 m-auto">
                    <h2>Find Jobs In Different Industries</h2>
                    <p>Lorem Ipsum is simply dummy text of the pricnting and typesetting industry. <br/> Lorem Ipsum has been make a type specimen book.</p>
                </div>
            </div>
            <div class="row">
                <div class="col-md-12 d-md-flex justify-content-between">
                    <div class="job_category_card">
                        <span class="job_category_icon"><img src="/images/cat_icon1.png" alt=""/></span>
                        <h5>Web Developer</h5>
                        <p>
                            ( 1 open position )
                        </p>
                    </div>
                    <div class="job_category_card">
                        <span class="job_category_icon"><img src="/images/cat_icon2.png" alt=""/></span>
                        <h5>Accountant</h5>
                        <p>
                            ( 1 open position )
                        </p>
                    </div>
                    <div class="job_category_card">
                        <span class="job_category_icon"><img src="/images/cat_icon3.png" alt=""/></span>
                        <h5>Sales &amp; Marketing</h5>
                        <p>
                            ( 1 open position )
                        </p>
                    </div>
                    <div class="job_category_card">
                        <span class="job_category_icon"><img src="/images/cat_icon4.png" alt=""/></span>
                        <h5>Industries</h5>
                        <p>
                            ( 1 open position )
                        </p>
                    </div>
                </div>
                <div class="col-md-12 d-md-flex justify-content-between">
                    <div class="job_category_card">
                        <span class="job_category_icon"><img src="/images/cat_icon5.png" alt=""/></span>
                        <h5>Web Developer</h5>
                        <p>
                            ( 1 open position )
                        </p>
                    </div>
                    <div class="job_category_card">
                        <span class="job_category_icon"><img src="/images/cat_icon6.png" alt=""/></span>
                        <h5>Accountant</h5>
                        <p>
                            ( 1 open position )
                        </p>
                    </div>
                    <div class="job_category_card">
                        <span class="job_category_icon"><img src="/images/cat_icon7.png" alt=""/></span>
                        <h5>Sales &amp; Marketing</h5>
                        <p>
                            ( 1 open position )
                        </p>
                    </div>
                    <div class="job_category_card">
                        <span class="job_category_icon"><img src="/images/cat_icon8.png" alt=""/></span>
                        <h5>Industries</h5>
                        <p>
                            ( 1 open position )
                        </p>
                    </div>
                </div>
                <div class="col-md-12 text-center">
                    <a class="all_categories_btn" href="#">View All Categories</a>
                </div>
            </div>
        </div>
    </div>
					
                    <div class="row">
                        <div class="col-md-7 m-auto">
                            <h2>How It Works</h2>
                            <p>Lorem Ipsum is simply dummy text of the pricnting and typesetting industry. <br/> Lorem Ipsum has been make a type specimen book.</p>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="how_works_card">
                                <span class="how_works_icon"><img src="/images/how_works_icon_3.png" alt=""/></span>
                                <h5>Create Account</h5>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting iandustry. Lorem Ipsum hasn the printing and iandustry.  the industry'</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="how_works_card">
                                <span class="how_works_icon"><img src="/images/how_works_icon_2.png" alt=""/></span>
                                <h5>Job Search</h5>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting iandustry. Lorem Ipsum hasn the printing and iandustry.  the industry'</p>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="how_works_card">
                                <span class="how_works_icon"><img src="/images/how_works_icon_1.png" alt=""/></span>
                                <h5>Save and Apply</h5>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting iandustry. Lorem Ipsum hasn the printing and iandustry.  the industry'</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>

      {/* <!-- Body end here --> */}

    </>
  );
};

export default LookingForJobsPage;
