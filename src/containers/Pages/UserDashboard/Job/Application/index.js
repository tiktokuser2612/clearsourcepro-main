import React, { useState } from 'react'
import StepFirst from './StepFirst';
import StepSecond from './StepSecond';
import StepThird from './StepThird';
import StepFourth from './StepFourth';
import StepFifth from './StepFifth';
import StepSixth from './StepSixth';
import StepSeventh from './StepSeventh';
import { useHistory } from 'react-router';
import notifier from 'utils/notifier';
import {
    initApplyJob,
    editApplyJob,
    postJobApply
  } from 'store/actions/applyJob';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';

const Index =  ({ initApplyJob , editApplyJob, postJobApply, data }) => {
    
    const [step, setStep] = useState(0);
    const [errors, setErrors] = useState({});
    const history = useHistory();
    const { id } = useParams();

    const formData = new FormData();

    const handlePost = async (e) => {
        if (e && e.preventDefault) {
          e.preventDefault();
        }
        
        console.log('data',data)

        data.requisition_id = history.location.pathname.substring(history.location.pathname.lastIndexOf('/') + 1);
        
        for (const [key, value] of Object.entries(data)) {      
            // console.log(key +"  "+ value)
            formData.append(key, value);
        }

        await postJobApply(formData)
            .then(res => {
                notifier.success('Job Application submitted successfully!');
                history.push('/admin/job/application/complete');
            })
            .catch(err => {
                console.log('err',err)
                notifier.error('Job Application submission failed!');
                setErrors(err.errors || {})
        });
    };

    switch (step) {
        case 0:
            return (
                <>  
                    <div className="row mt-5">
                        <div className="col-md-8 m-auto">
                            <div className="start_application_wrapper">
                                <h1>Start Your Application</h1>
                                <h6>Company Name</h6>
                                <h6 className="mb-4">Would you like to apply?</h6>
                                <button className="last_use" type="button">Use my last Application</button>
                                <hr/>
                                <button className="autofill_btn" type="button">Autofill with Resume</button>
                                <button onClick={() => {setStep(1)}} className="autofill_btn" type="button">Apply Manually</button>
                            </div>    
                        </div>
                    </div>
                </>
            )
        case 1:
            return (
                <StepFirst setStep={setStep} data={data} editApplyJob={editApplyJob} formData={formData}/>
            )
        case 2:
            return (
                <StepSecond setStep={setStep} data={data} editApplyJob={editApplyJob} formData={formData}/>
            )
        case 3:
            return (
                <StepThird setStep={setStep} data={data} editApplyJob={editApplyJob} formData={formData}/>
            )
        case 4:
            return (
                <StepFourth setStep={setStep} data={data} editApplyJob={editApplyJob} formData={formData}/>
            )
        case 5:
            return (
                <StepFifth setStep={setStep} data={data} editApplyJob={editApplyJob} formData={formData}/>
            )
        case 6:
            return (
                <StepSixth setStep={setStep} data={data} editApplyJob={editApplyJob} formData={formData}/>
            )
        case 7:
            return (
                <StepSeventh setStep={setStep}  data={data} editApplyJob={editApplyJob} handlePost={handlePost}/>
            )
        
        default:
            break;
    }
}

const mapStateToProps = store => ({
    data: store.rootReducer.applyJob.data,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    initApplyJob,
    editApplyJob,
    postJobApply
}, dispatch);



export default connect(mapStateToProps, mapDispatchToProps)(Index);
