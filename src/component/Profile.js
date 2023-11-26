import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import img1 from '../Images/img1.jpg'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pName: '',
            hName: '',
            pContact: '',
            pBlood: '',
            pGender: '',
            pCity: "",
            pDob: '',
            error: '',
            err: '',
            myData: { patientData: [] }



        }
    }

    async componentDidMount() {
        // this.userData();

        let id = this.props.match.params.id
        let data = localStorage.getItem('dataArr')
        let userData = JSON.parse(data);
        let object = userData.find(obj => obj.id === id);
        this.setState({ myData: object })

    }
    // async getData() {

    //     let patientArr = localStorage.getItem('patientArr')
    //     // console.log(dataArr)
    //     if (patientArr !== undefined && patientArr !== null) {
    //         await this.setState({ patientData: JSON.parse(patientArr) });
    //     }


    // }
    clearField() {
        this.setState({
            pName: '', hName: '', pContact: '', pBlood: '', pGender: '', pCity: '', pDob: ""
        })
    }

    submit(e) {
        e.preventDefault();

        let data = {
            pName: this.state.pName,
            hName: this.state.hName,
            pContact: this.state.pContact,
            pDob: this.state.pDob,
            pGender: this.state.pGender,
            pCity: this.state.pCity,
            pBlood: this.state.pBlood
        }
    

        let dataArr = localStorage.getItem('dataArr')
        let array = JSON.parse(dataArr)
        let regexName = /^[a-zA-Z-]+$/;
        let regexHosp = /^[a-zA-Z-]+$/;
        let regexPhone = /^[0-9]{11}$/;

        var currentUser = array.filter(x => x.id === this.props.match.params.id);
        if (currentUser.length > 0 && currentUser[0].patientData != null && currentUser[0].patientData === undefined)
            currentUser[0].patientData = new Array(0);

        if ((this.state.pName.length === 0) || !regexName.test(this.state.pName) ||
            (this.state.hName.length === 0) || !regexHosp.test(this.state.hName) || 
            (this.state.pBlood.length === 0) || !regexPhone.test(this.state.pContact)) {

            this.setState({ "error": true })
            // this.setState({ "err": true })
        }
        else if (regexName.test(this.state.pName)) {

            currentUser[0].patientData.push(data);
            this.clearField();
        }





        var dataToStore = JSON.stringify(array);
        localStorage.setItem('dataArr', dataToStore);

        let id = this.props.match.params.id
        let pData = localStorage.getItem('dataArr')
        let userData = JSON.parse(pData);
        let object = userData.find(obj => obj.id === id);
        this.setState({ myData: object })

        this.clearField();
        // this.getData()

    }

    async handleChange(e) {
        await this.setState({
            [e.target.name]: e.target.value

        });
    }



    render() {
        return (
            <>
                <div className="modal" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title d-flex justify-content-center" id="staticBackdropLabel">Patient From</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className='col-lg-12'>
                                    <div className='row d-flex justify-content-start'>
                                        <div className='col-6'>
                                            <input name='pName' id='pName' onChange={this.handleChange.bind(this)} value={this.state.pName} type="text" className="form-control" placeholder='Enter Patient Name'></input>
                                            {this.state.error && this.state.pName.length <= 0 ? <span style={{ color: 'red' }}>This field is required </span> : ''}
                                            {/* {this.state.err && (this.state.pName !== /^[a-zA-Z-]+$/) ? <span style={{ color: 'red' }}>Name should be in English letters</span> : ''} */}
                                        </div>
                                        <div className='col-6'>
                                            <input name='hName' id='hName' onChange={this.handleChange.bind(this)} value={this.state.hName} type='text' className="form-control" placeholder='Enter Hospital Name'></input>
                                            {this.state.error && this.state.hName.length <= 0 ? <span style={{ color: 'red' }}>This field is required </span> : ''}
                                            {/* {this.state.err && (this.state.hName !== /^[a-zA-Z-]+$/) ? <span style={{ color: 'red' }}>Name should be in English letters</span> : ''} */}
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-12 mt-3'>
                                    <div className='row d-flex justify-content-start'>
                                        <div className='col-6'>
                                            <input name='pContact' id='pContact' onChange={this.handleChange.bind(this)} value={this.state.pContact} className="form-control" placeholder='Enter Patient Contact'></input>
                                            {this.state.error && this.state.pContact.length <= 0 ? <span style={{ color: 'red' }}>This field is required </span> : ''}

                                        </div>
                                        <div className='col-6'>
                                            <select name='pBlood' id='pBlood' onChange={this.handleChange.bind(this)} value={this.state.pBlood} className="form-control form-select">
                                                <option>Select Blood Group</option>
                                                <option name='A+' value='A+' id='A+'>A+</option>
                                                <option name='B+' value='B+' id='B+'>B+</option>
                                                <option name='AB+' value='AB+' id='AB+'>AB+</option>
                                                <option name='AB-' value='AB-' id='AB-'>AB-</option>

                                            </select>
                                            {this.state.error && this.state.pBlood.length <= 0 ? <span style={{ color: 'red' }}>Please select the Blood Group</span> : ''}

                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-12 mt-3'>
                                    <div className='row d-flex justify-content-start'>

                                        <div className='col-6'>
                                            <select name='pGender' value={this.state.pGender} onChange={this.handleChange.bind(this)} className="form-control form-select">
                                                <option>Select Gender</option>
                                                <option name='male' id='male' value="male">Male</option>
                                                <option name='female' id='female' value="female">Female</option>
                                            </select>
                                            {this.state.error && this.state.pGender.length <= 0 ? <span style={{ color: 'red' }}>Please select the Gender</span> : ''}

                                        </div>
                                        <div className='col-6'>
                                            <input name='pCity' value={this.state.pCity} onChange={this.handleChange.bind(this)} className="form-control" placeholder='Enter City Name'></input>
                                            {this.state.error && this.state.pCity.length <= 0 ? <span style={{ color: 'red' }}>This field is required</span> : ''}

                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-12 mt-3'>
                                    <div className='row d-flex justify-content-start'>
                                        <div className='col-6'>
                                            <input name='pDob' value={this.state.pDob} onChange={this.handleChange.bind(this)} type='date' className="form-control" ></input>
                                            {this.state.error && this.state.pDob.length <= 0 ? <span style={{ color: 'red' }}>Please select the DOB</span> : ''}

                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button onClick={this.submit.bind(this)} type="button" className="btn btn-primary">Submit</button>
                            </div>
                        </div>
                    </div>
                </div>






                <h3 className='d-flex justify-content-center mt-4'>Profile Page</h3>
                <div className='col-lg-12 mt-5'>
                    <div className='row'>


                        <div className='col-4 ms-3  '>
                            <div><span>Name: </span> <span>{this.state.myData.name}</span></div>
                            <div><span>Age: </span> <span>{this.state.myData.age}</span></div>
                            <div><span>DoB: </span> <span>{this.state.myData.dob}</span></div>
                            <div><span>Blood Group: </span> <span>{this.state.myData.bloodgroup}</span></div>
                        </div>
                        <div className='col-4'>

                        </div>

                        <div className='col-3 '>
                            <div className=' mb-5  '>
                                <img style={{ width: '15rem' }} src={img1} alt='' />

                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button type="button" className="btn btn-primary ms-3" data-bs-toggle="modal" data-bs-target="#staticBackdrop" >Add Patient</button>
                </div>
                <div className='d-flex justify-content-center'>
                    <h2>Previous Blood Donation</h2>
                </div>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Patient Name</th>
                                <th>Hospital Name</th>
                                <th>Patient contact</th>
                                <th>Blood Group</th>
                                <th>Gender</th>
                                <th>City</th>
                                <th>DoD</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.myData.patientData.map((item, i) => (
                                <tr key={i}>
                                    <th>{item.pName}</th>
                                    <th>{item.hName}</th>
                                    <th>{item.pContact}</th>
                                    <th>{item.pBlood}</th>
                                    <th>{item.pGender}</th>
                                    <th>{item.pCity}</th>
                                    <th>{item.pDob}</th>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='mt-5 ms-3'>
                    <Link to='/'> <button>Main Page</button></Link>
                </div>
            </>
        )
    }

}
export default withRouter(Profile);