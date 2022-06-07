import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Home as HomeBanner } from 'components/Banners';

const LandingPage = () => {
  const history = useHistory();

  const gotoUrl = (url) => () => {
    history.push(url);
  };

  return (
    <>
      <HomeBanner/>
      {/* <!-- Body start here --> */}
      <div class="find_job_section mt-5">
        <div class="container">
            <div class="row">
              <div class="col-md-7 m-auto">
                <h2>Popular Job Categories</h2>
                <p>2020 jobs live - 293 added today.</p>
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




      <div className="mission_statement_section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h2>Mission Statement</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and like Aldus PageMaker including versions of Lorem Ipsum.
                <br /><br />
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing dus PageMaker including versions of Lorem Ipsum.
              </p>
            </div>
          </div>
        </div>
        
      </div>
      <div className="container-fluid">
        <div class="row">
          <div class="col-md-12 p-0">
              <div class="hire_candidates_card">
                  <span class="hire_candidates_img"><img src="/images/candidates_img_1.png" /></span>
                  <div class="hire_candidates_text">
                      <h2>Need to Hire?</h2>
                      <p>
                          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                          <br/><br/>
                          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheeMaker including versions of Lorem Ipsum.
                      </p>
                      <a class="hire_btn" href="#">Hire Candidates</a>
                  </div>
              </div>
          </div>
          
          <div class="hire_candidates_card">
            <div class="hire_candidates_text">
                <h2>Looking for a Job?</h2>
                <p>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                    <br/><br/>
                    It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheeMaker including versions of Lorem Ipsum.
                </p>
                <a class="hire_btn" href="#">Hire Candidates</a>
            </div>
            <span class="hire_candidates_img"><img src="/images/candidates_img_2.png" alt=""/></span>
              
          </div>
            
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div class="col-md-12">
                <div class="find_job_section">
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

      <div className="video_section2" >
        <div className="container">
          <div className="row">
            <div className="col-md-7 m-auto">
              <h2>Watch our Videos</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.
              </p>
              <span className="play_btn"><img src="/images/play_btn.png" alt="" /></span>
            </div>
          </div>
        </div>
      </div>
      <div className="success_story_section">
        <div class="container">
          <div class="find_job_section">
            <div class="row">
              <div class="col-md-7 m-auto">
                  <h2>Our Success Story</h2>
                  <p class="text-center">
                      Lorem Ipsum is simply dummy text of the printing and typesetting <br/> industry. Lorem Ipsum has been the industry's standard dummy text ever since.
                  </p>
              </div>
            </div></div>
            <div class="col-md-12 d-md-flex">
              <div class="success_story_card">
                  <div class="text-left">
                      <h6 class="d-flex justify-content-between">Awesome Design <img src="/images/faq.png" alt=""/> </h6>
                  </div>
                  <p>
                      We specialize in finding the right fit for our qualified 
                      candidates with some of the largest and stable Health &amp; 
                      Medicare agencies in the US.
                  </p>
                  <div class="d-flex">
                      <span class="success_story_img"><img src="/images/user_thumb_1.png" alt=""/></span>
                      <div class="text-left ml-3">
                          <h6>Ashley Jenkins</h6>
                          <h5>Disigner</h5>
                      </div>
                  </div>                                        
              </div>
              <div class="success_story_card">
                  <div class="text-left">
                      <h6 class="d-flex justify-content-between">Awesome Design <img src="/images/faq.png" alt=""/> </h6>
                  </div>
                  <p>
                      We specialize in finding the right fit for our qualified 
                      candidates with some of the largest and stable Health &amp; 
                      Medicare agencies in the US.
                  </p>
                  <div class="d-flex">
                      <span class="success_story_img"><img src="/images/user_thumb_1.png" alt=""/></span>
                      <div class="text-left ml-3">
                          <h6>Ashley Jenkins</h6>
                          <h5>Disigner</h5>
                      </div>
                  </div>                                        
              </div>
            </div>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-7 m-auto">
              <div class="blog_section">
                  <h2>Our Blog</h2>
                  <p>Lorem Ipsum is simply dummy text of the printing and typesetting <br/> industry. Lorem Ipsum has been make a type specimen book.</p>
              </div>
          </div>
        </div>
        <div class="d-md-flex justify-content-between">
          <div class="blog_card">
            <span class="blog_img"><img src="/images/blog_img_1.png" alt=""/></span>
            <div class="px-3">
              <div class="d-flex align-items-center blog_time">
                  <div class="d-flex align-items-center mr-4"><h6>May 14, 2021	</h6> </div>
                  <div class="d-flex align-items-center"><h6>3 Comments</h6> </div>
              </div>
              <h5>5 Tip For Your Job Interviews</h5>
              <p>
                  We specialize in finding the right fit for 
                  our qualified candidates with some of 
                  the largest and stable Health &amp; Medicare 
                  agencies inUS.
              </p>
              <a href="#">Read More <i class="fa fa-angle-right" aria-hidden="true"></i></a>
            </div>
          </div>
          <div class="blog_card">
            <span class="blog_img"><img src="/images/blog_img_1.png" alt=""/></span>
            <div class="px-3">
              <div class="d-flex align-items-center blog_time">
                  <div class="d-flex align-items-center mr-4"><h6>May 14, 2021	</h6> </div>
                  <div class="d-flex align-items-center"><h6>3 Comments</h6> </div>
              </div>
              <h5>5 Tip For Your Job Interviews</h5>
              <p>
                  We specialize in finding the right fit for 
                  our qualified candidates with some of 
                  the largest and stable Health &amp; Medicare 
                  agencies inUS.
              </p>
              <a href="#">Read More <i class="fa fa-angle-right" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
        <div class="d-md-flex justify-content-between">
          <div class="blog_card">
            <span class="blog_img"><img src="/images/blog_img_1.png" alt=""/></span>
            <div class="px-3">
              <div class="d-flex align-items-center blog_time">
                  <div class="d-flex align-items-center mr-4"><h6>May 14, 2021	</h6> </div>
                  <div class="d-flex align-items-center"><h6>3 Comments</h6> </div>
              </div>
              <h5>5 Tip For Your Job Interviews</h5>
              <p>
                  We specialize in finding the right fit for 
                  our qualified candidates with some of 
                  the largest and stable Health &amp; Medicare 
                  agencies inUS.
              </p>
              <a href="#">Read More <i class="fa fa-angle-right" aria-hidden="true"></i></a>
            </div>
          </div>
          <div class="blog_card">
            <span class="blog_img"><img src="/images/blog_img_1.png" alt=""/></span>
            <div class="px-3">
                <div class="d-flex align-items-center blog_time">
                    <div class="d-flex align-items-center mr-4"><h6>May 14, 2021	</h6> </div>
                    <div class="d-flex align-items-center"><h6>3 Comments</h6> </div>
                </div>
                <h5>5 Tip For Your Job Interviews</h5>
                <p>
                    We specialize in finding the right fit for 
                    our qualified candidates with some of 
                    the largest and stable Health &amp; Medicare 
                    agencies inUS.
                </p>
                <a href="#">Read More <i class="fa fa-angle-right" aria-hidden="true"></i></a>
            </div>
          </div>
        </div>
      </div>

      <div class="video_section min_height_0" style={{ marginBottom : '-60px'}}>
        <div class="container">
          <div class="row">
            <div class="col-md-9 m-auto">
              <div class="d-md-flex justify-content-between align-items-center">
                <div class="text-left">
                  <h2>Ready to Get Started ?</h2>
                  <p class="text-left">
                      We specialize in finding the right fit for our qualified candidates with some of <br/>
                      the largest and stable Health &amp; Medicare agencies in the US.
                  </p>
                </div>
              <div>
              <button class="btn_style_4" type="button">SIGN UP NOW!</button>
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

export default LandingPage;
