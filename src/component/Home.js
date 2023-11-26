import React from 'react'
import './Home.css'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
// import { PhoneInput } from "react-contact-number-input";
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';






class Home extends React.Component {

    constructor(props) {
        super(props);


        this.state = {
            id: '',
            name: "",
            age: "",
            dob: "",
            gender: '',
            border: [],
            bloodgroup: "",
            countryList: [],
            selectedCountry: {},
            cnic: '',
            capital: [],
            email: '',
            error: (false),
            err: (false),

            myData: [],
            gridData:[],
            patientData: [],
            colData: [
                {
                    field: 'id', filter: 'agTextColumnFilter', sortingOrder: ['asc', 'desc'], cellEditor: 'agTextCellEditor', editable: true,
                    button: true,
                    cellRendererFramework: (params) => (
                        <div>
                            <Link to={`/profile/${params.data.id}`} >Details</Link>
                            {/* <Link to={`/profile:/${params.data.id}`} >Details</Link> */}
                        </div>
                    ),
                },
                { field: 'name', filter: 'agTextColumnFilter', sortingOrder: ['asc', 'desc'], cellEditor: 'agTextCellEditor', editable: true, },
                { field: 'age', filter: 'agTextColumnFilter', sortingOrder: ['asc', 'desc'], cellEditor: 'agTextCellEditor', editable: true, },
                { field: 'dob', filter: 'agDateColumnFilter', sortingOrder: ['asc', 'desc'], cellEditor: 'agTextCellEditor', editable: true, },
                { field: 'gender', filter: 'agTextColumnFilter', sortingOrder: ['asc', 'desc'], cellEditor: 'agTextCellEditor', editable: true, },
                { field: 'bloodgroup', filter: 'agTextColumnFilter', sortingOrder: ['asc', 'desc'], cellEditor: 'agTextCellEditor', editable: true, },
                { field: 'selectedCountry.name.common', filter: 'agTextColumnFilter', sortingOrder: ['asc', 'desc'], cellEditor: 'agTextCellEditor', editable: true, },
                { field: 'border', filter: 'agTextColumnFilter', sortingOrder: ['asc', 'desc'], cellEditor: 'agTextCellEditor', editable: true, },
                { field: 'cnic', filter: 'agTextColumnFilter', sortingOrder: ['asc', 'desc'], cellEditor: 'agTextCellEditor', editable: true, },
                { field: 'email', filter: 'agTextColumnFilter', sortingOrder: ['asc', 'desc'], cellEditor: 'agTextCellEditor', editable: true, },
                { field: 'capital', filter: 'agTextColumnFilter', sortingOrder: ['asc', 'desc'], cellEditor: 'agTextCellEditor', editable: true, },
                {
                    headerName: 'Operation',
                    button: true,
                    cellRendererFramework: (params) => (
                        <div><button onClick={this.update.bind(this, params.data)}>Edit</button ><span>{" "}</span>
                            <button onClick={this.deleteData.bind(this, params.data)}>Delete</button>
                        </div>
                    ),
                },
            ],

            defaultColDef: {
                width: 170,
                sortable: true,
            },
            rowData: null,
            sortingOrder: ['desc', 'asc'],
        };
    }


    async componentDidMount() {
        this.getData();
        this.getCountryData()
    }


    async getCountryData() {
        let resp = await fetch(`https://restcountries.com/v3.1/all`).then(res => res.json());
        // console.log(resp)
        this.setState({ countryList: resp })
    }

    async getData() {
        let dataArr = localStorage.getItem('dataArr')
        // console.log(dataArr)
        if (dataArr !== undefined && dataArr !== null) {
            await this.setState({ myData: JSON.parse(dataArr) });
            await this.setState({ gridData: JSON.parse(dataArr) });
        }
    }

    async handleChange(e) {
        await this.setState({
            [e.target.name]: e.target.value

        });
    }

    handleCountryChange(e) {
        let foundObj = this.state.countryList.filter((countryData) =>
            countryData.cca2 === e.target.value
        )
        
        this.setState({ selectedCountry: foundObj[0], border: foundObj[0].borders, capital: foundObj[0].capital })
        // this.state.border = foundObj[0].borders
    }

    // borderChange(e) {
    //     console.log(e.target.value)
    //     this.setState({ border : e.target.value })
        
    // }

    // capitalChange(e) {
    //     console.log(e.target.value)
    //     this.setState({ capital : e.target.value })
        
    // }
    clearField() {
        this.setState({
            id: '', name: '', age: '', dob: '', gender: '', border: '', bloodgroup: '', selectedCountry: "", cnic: "", email: '', capital: ''
        })
    }


    submit(e) {
        e.preventDefault();

        let obj = {
            id: this.state.id,
            patientData: this.state.patientData,
            name: this.state.name, age: this.state.age, dob: this.state.dob, gender: this.state.gender,
            border: this.state.border, bloodgroup: this.state.bloodgroup, selectedCountry: this.state.selectedCountry,
            cnic: this.state.cnic, email: this.state.email, capital: this.state.capital
        }
        let dataArr = localStorage.getItem('dataArr')

        if (dataArr === undefined || dataArr === null) {
            dataArr = []
        } else {
            dataArr = JSON.parse(dataArr)
        }
        let found = false;
        for (let i = 0; i < dataArr.length; i++) {
            if (dataArr[i].id === this.state.id) {
                dataArr[i].id = this.state.id;
                dataArr[i].name = this.state.name;
                dataArr[i].age = this.state.age;
                dataArr[i].dob = this.state.dob;
                dataArr[i].cnic = this.state.cnic;
                dataArr[i].gender = this.state.gender;
                dataArr[i].bloodgroup = this.state.bloodgroup;
                dataArr[i].border = this.state.border;
                dataArr[i].selectedCountry = this.state.selectedCountry;
                found = true;
            }
        }
        let regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        let regexCnic = /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/i;
        let regexName = /^[a-zA-Z-]+$/;
        // let regexPhone = /^[0-9]{}

        if ((this.state.email.length === 0) || this.state.id.length === 0 || this.state.age.length === 0 || (this.state.cnic.length === 0) || (this.state.name.length === 0) || !regexEmail.test(this.state.email) || this.state.id <= 0 || this.state.age <= 0 ||
            !regexCnic.test(this.state.cnic) || !regexName.test(this.state.name)) {
            this.setState({ "error": true })
            this.setState({ "err": true })
        }
        else if (!found || regexEmail.test(this.state.email) || this.state.id > 0 ||
            this.state.age > 0 || regexCnic.test(this.state.cnic) || regexName.test(this.state.name)) {
            dataArr.push(obj);
            this.clearField();
        }
        localStorage.setItem("dataArr", JSON.stringify(dataArr));
        this.getData();

    }

    async update(data, e) {
        e.preventDefault();
        // console.log(data)
        this.setState({
            id: data.id,
            name: data.name,
            age: data.age,
            dob: data.dob,
            gender: data.gender,
            border: data.border,
            bloodgroup: data.bloodgroup,
            selectedCountry: data.selectedCountry,
            cnic: data.cnic,
            email: data.email,
            capital: data.capital

        });

        //  this.clearField()

    }


    async deleteData(data, e) {
        let dataArrJson = localStorage.getItem('dataArr')
        let dataArr = JSON.parse(dataArrJson);
        let filterArr = dataArr.filter((obj) => parseInt(obj.id) !== parseInt(data.id));
        localStorage.setItem("dataArr", JSON.stringify(filterArr));
        await this.getData();
    }

    searchHandler = (e) => {
        console.log(e.target.value)    
     var filteredData=   this.state.myData.filter((item) => {
            return ( item.name.toLowerCase().includes(e.target.value.toLowerCase()) 
                // || (item.border!=null && item.border!=undefined && item.border.filter(x=>x.toLowerCase().includes(e.target.value.toLowerCase()))).length>0
                // ||  item.email.toLowerCase().includes(e.target.value.toLowerCase())
                );
            
        })
        this.setState({gridData:filteredData});
        console.log('data', filteredData);
    };

    render() {
        return <>
            <form >
                <h1 className='d-flex justify-content-center mt-3'>Blood Donor Information Collection</h1>

                <div className='row mt-4'>
                    <div className='col ms-3'>
                        <input type='number' name='id' id='id' className="form-control" placeholder="Enter  Your ID" onChange={this.handleChange.bind(this)} value={this.state.id}  ></input>
                        {this.state.error && this.state.id.length <= 0 ? <span style={{ color: 'red' }}>This field is required</span> : ''}
                        {this.state.err && this.state.id < 0 ? <span style={{ color: 'red' }}>ID should be in positve</span> : ''}
                    </div>
                    <div className='col ms-3'>
                        <input name='name' id='name' className="form-control" placeholder="Enter  Your Name" onChange={this.handleChange.bind(this)} value={this.state.name} type="text"  ></input>
                        {this.state.error && this.state.name.length <= 0 ? <span style={{ color: 'red' }}>This field is required <span>{" && "}</span></span> : ''}
                        {/* {this.state.err && (this.state.name !== /^[a-zA-Z-]+$/) ? <span style={{ color: 'red' }}>Name should be in English letters</span> : ''} */}
                    </div>
                    <div className='col me-3'>
                        <input name='age' id='age' className="form-control" placeholder="Enter  Your Age" onChange={this.handleChange.bind(this)} value={this.state.age} type="number" ></input>

                        {this.state.error && this.state.age.length <= 0 ? <span style={{ color: 'red' }}>This field is required</span> : ''} <span>{" "}</span>
                        {this.state.err && this.state.age < 0 ? <span style={{ color: 'red' }}>Age should be in positve</span> : ''}
                    </div>


                </div>

                <div className='row mt-3'>
                    <div className='col me-3 ms-3'>
                        <input name='dob' id='dob' className="form-control" placeholder="Enter  Your DOB" onChange={this.handleChange.bind(this)} value={this.state.dob} type="date" ></input>
                        {this.state.error && this.state.dob.length <= 0 ? <span style={{ color: 'red' }}>Please select the DOB</span> : ''}

                    </div>

                    <div className='col '>
                        <select name='gender' value={this.state.gender} onChange={this.handleChange.bind(this)} className="form-select"  >
                            <option value="" >Select Gender</option>
                            <option name='male' id='male' value="male">Male</option>
                            <option name='female' id='female' value="female">Female</option>
                        </select>
                        {this.state.error && this.state.gender.length <= 0 ? <span style={{ color: 'red' }}>Please select the Gender</span> : ''}
                    </div>
                    <div className='col  me-3'>
                        <select name='bloodgroup' value={this.state.bloodgroup} onChange={this.handleChange.bind(this)} className="form-select">
                            <option value="" className='mt-1'>Select your Blood Group</option>
                            <option name='A+' value='A+' id='A+'>A+</option>
                            <option name='B+' value='B+' id='B+'>B+</option>
                            <option name='AB+' value='AB+' id='AB+'>AB+</option>
                            <option name='AB-' value='AB-' id='AB-'>AB-</option>
                        </select>
                        {this.state.error && this.state.bloodgroup.length <= 0 ? <span style={{ color: 'red' }}>Please select the Blood Group</span> : ''}

                    </div>


                </div>
                <div className='row mt-3'>
                    <div className='col me-3 ms-3'>

                        <select name='country' value={this.state.selectedCountry.cca2} onChange={this.handleCountryChange.bind(this)} className="form-select">
                            <option defaultValue={''} value="">Select your country</option>
                            {this.state.countryList.map((item) => (
                                <option value={item.cca2} >{item.name.common}</option>
                            ))}

                        </select>
                    </div>

                    <div className='col'>
                        <select name='border' value={this.state.border} onChange={this.handleCountryChange.bind(this)} className="form-select">
                            {this.state.border.map((data) => (
                                <option value={data}>{data}</option>
                            ))}
                        </select>
                        {this.state.error && this.state.border.length <= 0 ? <span style={{ color: 'red' }}>Please select the Border</span> : ''}
                    </div>
                    <div className='col  me-3'>
                        <select name='capital' value={this.state.capital} onChange={this.handleCountryChange.bind(this)} className="form-select">
                            <option defaultValue={''} value="">Capitals</option>
                            {this.state.capital.map((data) => (
                                <option value={data}>{data}</option>
                            ))}
                        </select>
                        {/* <input type='tel' name='capital' className="form-control" id='capital' placeholder="Enter  Your phone Number" onChange={this.handleChange.bind(this)} value={this.state.capital}></input> */}
                        {/* <PhoneInput name='capital' className="form-control " placeholder="Enter  Your phone Number" onChange={this.handleChange.bind(this)} value={this.state.capital} type='tel' /> */}
                        {this.state.error && this.state.capital.length <= 0 ? <span style={{ color: 'red' }}>This field is required</span> : ''}

                    </div>

                </div>
                <div className='row mt-3'>

                    <div className='col-4 ms-3 me-3'>
                        <input type='email' name='email' className="form-control" placeholder="Enter  Your  email" onChange={this.handleChange.bind(this)} value={this.state.email}></input>
                        {this.state.error && this.state.email.length <= 0 ? <span style={{ color: 'red' }}>This field is required <span>{" && "}</span></span> : ''}
                        {/* {this.state.err && (this.state.cnic !== /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i) ? <span style={{ color: 'red' }}>Pattern should be abc@domain.com</span> : ''} */}

                    </div>
                    <div className='col me-3 '>
                        <input type='cnic' name='cnic' className="form-control" placeholder="Enter  Your cnic" onChange={this.handleChange.bind(this)} value={this.state.cnic}></input>
                        {this.state.error && this.state.cnic.length <= 0 ? <span style={{ color: 'red' }}>This field is required <span>{" && "}</span></span> : ''}
                        {/* {this.state.err && (this.state.cnic !== /^[0-9]{5}-[0-9]{7}-[0-9]{1}$/i) ? <span style={{ color: 'red' }}>Pattern should be xxxxx-xxxxxxx-x</span> : ''} */}

                    </div>

                </div>
                <div className='mt-3 d-flex justify-content-center '>
                    <button className='btn btn-primary w-25' onClick={this.submit.bind(this)}>Submit</button>
                </div>
            </form>

            <div className='col d-flex justify-content-end me-3'>
                <input type="text" id="filter-text-box" placeholder="Search..." onChange={(e) => { this.searchHandler(e) }} />
            </div>

            <div className="ag-theme-alpine " style={{ height: 400, width: 1600, marginTop: '3rem', paddingLeft: '.5rem', paddingRight: '2rem', }}>
                <AgGridReact rowData={this.state.gridData} columnDefs={this.state.colData} defaultColDef={this.state.defaultColDef} cacheQuickFilter={true} sortingOrder={this.state.sortingOrder} animateRows={true}></AgGridReact>
            </div>



            {/* <Link to={'/profile'}><button onClick={this.userData.bind(this, params.data )}>Details</button ></Link> */}
        </>
    }

}

export default (Home);



