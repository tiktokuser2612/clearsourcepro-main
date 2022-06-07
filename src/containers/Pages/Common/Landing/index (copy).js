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
      <div className="mission_statement_points">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d-md-flex">
                <div className="mission_statement_box">
                  <span><img src="/images/mission_icon_1.png" alt="" /></span>
                  <h5>Fast</h5>
                </div>
                <div className="mission_statement_box">
                  <span><img src="/images/mission_icon_1.png" alt="" /></span>
                  <h5>Putting Out Fires</h5>
                </div>
                <div className="mission_statement_box">
                  <span><img src="/images/mission_icon_2.png" alt="" /></span>
                  <h5>On Time</h5>
                </div>
                <div className="mission_statement_box">
                  <span><img src="/images/mission_icon_3.png" alt="" /></span>
                  <h5>Lightning response</h5>
                </div>
                <div className="mission_statement_box">
                  <span><img src="/images/mission_icon_4.png" alt="" /></span>
                  <h5>Professionals</h5>
                </div>
              </div>
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
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="hire_candidates_card">
              <span className="hire_candidates_img"><img src="/images/candidates_img_1.png" alt="" /></span>
              <div className="hire_candidates_text">
                <h2>Need to Hire?</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  <br /><br />
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheeMaker including versions of Lorem Ipsum.
                </p>
                <Link className="hire_btn" to="/need-to-hire">Hire Candidates</Link>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="hire_candidates_card">
              <span className="hire_candidates_img"><img src="/images/candidates_img_2.png" alt="" /></span>
              <div className="hire_candidates_text">
                <h2>Looking for a Job?</h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                  <br /><br />
                  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheeMaker including versions of Lorem Ipsum.
                </p>
                <Link className="hire_btn" to="/looking-for-jobs">Find Jobs</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="find_job_section">
              <div className="row">
                <div className="col-md-7 m-auto">
                  <h2>Find Jobs In Different Industries</h2>
                  <p>Lorem Ipsum is simply dummy text of the pricnting and typesetting industry. <br /> Lorem Ipsum has been make a type specimen book.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 d-md-flex">
                  <div className="job_category_card">
                    <span className="job_category_icon"><img src="/images/job_category_icon_1.png" alt="" /></span>
                    <h5>Web Developer</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum hasn the industry'
                    </p>
                  </div>
                  <div className="job_category_card">
                    <span className="job_category_icon"><img src="/images/job_category_icon_2.png" alt="" /></span>
                    <h5>Accountant</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum hasn the industry'
                    </p>
                  </div>
                  <div className="job_category_card">
                    <span className="job_category_icon"><img src="/images/job_category_icon_3.png" alt="" /></span>
                    <h5>Sales & Marketing</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum hasn the industry'
                    </p>
                  </div>
                  <div className="job_category_card">
                    <span className="job_category_icon"><img src="/images/job_category_icon_4.png" alt="" /></span>
                    <h5>Industries</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum hasn the industry'
                    </p>
                  </div>
                </div>
                <div className="col-md-12 d-md-flex">
                  <div className="job_category_card">
                    <span className="job_category_icon"><img src="/images/job_category_icon_1.png" alt="" /></span>
                    <h5>Web Developer</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum hasn the industry'
                    </p>
                  </div>
                  <div className="job_category_card">
                    <span className="job_category_icon"><img src="/images/job_category_icon_2.png" alt="" /></span>
                    <h5>Accountant</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum hasn the industry'
                    </p>
                  </div>
                  <div className="job_category_card">
                    <span className="job_category_icon"><img src="/images/job_category_icon_3.png" alt="" /></span>
                    <h5>Sales & Marketing</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum hasn the industry'
                    </p>
                  </div>
                  <div className="job_category_card">
                    <span className="job_category_icon"><img src="/images/job_category_icon_4.png" alt="" /></span>
                    <h5>Industries</h5>
                    <p>
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum hasn the industry'
                    </p>
                  </div>
                </div>
                <div className="col-md-12 text-center">
                  <Link className="all_categories_btn" to="/view-all-jobs">View All Categories</Link>
                </div>
              </div>
              <div className="row">
                <div className="col-md-7 m-auto">
                  <h2>How It Works</h2>
                  <p>Lorem Ipsum is simply dummy text of the pricnting and typesetting industry. <br /> Lorem Ipsum has been make a type specimen book.</p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <div className="how_works_card">
                    <span className="how_works_icon"><img src="/images/how_works_icon_3.png" alt="" /></span>
                    <h5>Create Account</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting iandustry. Lorem Ipsum hasn the printing and iandustry.  the industry'</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="how_works_card">
                    <span className="how_works_icon"><img src="/images/how_works_icon_2.png" alt="" /></span>
                    <h5>Job Search</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting iandustry. Lorem Ipsum hasn the printing and iandustry.  the industry'</p>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="how_works_card">
                    <span className="how_works_icon"><img src="/images/how_works_icon_1.png" alt="" /></span>
                    <h5>Save and Apply</h5>
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting iandustry. Lorem Ipsum hasn the printing and iandustry.  the industry'</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="video_section">
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
        <div className="container">
          <div className="row">
            <div className="col-md-7 m-auto">
              <h2>Our Success Story</h2>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting <br /> industry. Lorem Ipsum has been the industry's standard dummy text ever since.
              </p>
            </div>
          </div>
          <div className="col-md-12 d-md-flex">
            <div className="success_story_card">
              <span className="success_story_img"><img src="/images/user_thumb_1.png" alt="" /></span>
              <p>
                Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsum has been make a type specimen book. Lorem Ipsum is simply dummen me specimen book.
              </p>
              <h6>Teena Joe.</h6>
              <span className="rating_star"><img src="/images/rating_star.png" alt="" /></span>
            </div>
            <div className="success_story_card">
              <span className="success_story_img"><img src="/images/user_thumb_2.png" alt="" /></span>
              <p>
                Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsum has been make a type specimen book. Lorem Ipsum is simply dummen me specimen book.
              </p>
              <h6>Teena Joe.</h6>
              <span className="rating_star"><img src="/images/rating_star.png" alt="" /></span>
            </div>
            <div className="success_story_card">
              <span className="success_story_img"><img src="/images/user_thumb_3.png" alt="" /></span>
              <p>
                Lorem Ipsum is simply dummy text of the and typesetting industry. Lorem Ipsum has been make a type specimen book. Lorem Ipsum is simply dummen me specimen book.
              </p>
              <h6>Teena Joe.</h6>
              <span className="rating_star"><img src="/images/rating_star.png" alt="" /></span>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-7 m-auto">
            <div className="blog_section">
              <h2>Our Blog</h2>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting <br /> industry. Lorem Ipsum has been make a type specimen book.</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="blog_card">
              <span className="blog_img"><img src="/images/blog_img_1.png" alt="" /></span>
              <div className="px-3">
                <h5>Lorem Ipsum is simply dummy
                  text of the printing</h5>
                <div className="d-flex justify-content-between align-items-center blog_time">
                  <div className="d-flex align-items-center"><img src="/images/profile_icon.png" alt="" /> <h6>By Admin </h6> </div>
                  <div className="d-flex align-items-center"><img src="/images/calander_icon.png" alt="" /> <h6>06/08/2020</h6> </div>
                  <div className="d-flex align-items-center"><img src="/images/comment_icon.png" alt="" /> <h6>5 Comments</h6> </div>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text a type specimen book. a tmen book.  of the and typesetting industry. Lorem Ipsum has is been make a type specimen book. Lorem Ipsum is simply dummen me specimen book.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="blog_card">
              <span className="blog_img"><img src="/images/blog_img_2.png" alt="" /></span>
              <div className="px-3">
                <h5>Lorem Ipsum is simply dummy
                  text of the printing</h5>
                <div className="d-flex justify-content-between align-items-center blog_time">
                  <div className="d-flex align-items-center"><img src="/images/profile_icon.png" alt="" /> <h6>By Admin </h6> </div>
                  <div className="d-flex align-items-center"><img src="/images/calander_icon.png" alt="" /> <h6>06/08/2020</h6> </div>
                  <div className="d-flex align-items-center"><img src="/images/comment_icon.png" alt="" /> <h6>5 Comments</h6> </div>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text a type specimen book. a tmen book.  of the and typesetting industry. Lorem Ipsum has is been make a type specimen book. Lorem Ipsum is simply dummen me specimen book.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="blog_card">
              <span className="blog_img"><img src="/images/blog_img_3.png" alt="" /></span>
              <div className="px-3">
                <h5>Lorem Ipsum is simply dummy
                  text of the printing</h5>
                <div className="d-flex justify-content-between align-items-center blog_time">
                  <div className="d-flex align-items-center"><img src="/images/profile_icon.png" alt="" /> <h6>By Admin </h6> </div>
                  <div className="d-flex align-items-center"><img src="/images/calander_icon.png" alt="" /> <h6>06/08/2020</h6> </div>
                  <div className="d-flex align-items-center"><img src="/images/comment_icon.png" alt="" /> <h6>5 Comments</h6> </div>
                </div>
                <p>
                  Lorem Ipsum is simply dummy text a type specimen book. a tmen book.  of the and typesetting industry. Lorem Ipsum has is been make a type specimen book. Lorem Ipsum is simply dummen me specimen book.
                </p>
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
