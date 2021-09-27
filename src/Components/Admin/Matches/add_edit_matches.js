import React, { useEffect, useState } from "react";
import AdminLayout from "../../../Hoc/AdminLayout";

import { useFormik } from "formik";
import * as Yup from "yup";

import { showToastError, showToastSuccess, textErrorHelper, selectErrorHelper, selectIsError
} from "../../Utils/utils";
import { TextField, Select, MenuItem, FormControl, Button } from "@material-ui/core";

import { matchesCollection, teamsCollection } from "../../../firebase";


const defaultValues={
    date:'',
    local:'',
    resultLocal:'',
    away:'',
    resultAway:'',
    referee:'',
    stadium:'',
    result:'',
    final:''
}


const AddEditMatch = (props) => {
    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState('');
    const [teams, setTeams] = useState(null);
    const [values, setValues] =  useState(defaultValues);

    const formik = useFormik({
        enableReinitialize:true,
        initialValues: values,
        validationSchema: Yup.object({
            date: Yup.string()
            .required('This input is required.'),
            local:Yup.string()
            .required('This input is required.'),
            resultLocal:Yup.number()
            .required('This input is required.')
            .min(0, 'The minimum is 0.')
            .max(50, 'The maximum is 50.'),
            away:Yup.string()
            .required('This input is required.'),
            resultAway:Yup.number()
            .required('This input is required.'),
            referee: Yup.string()
            .required('This input is required.'),
            stadium: Yup.string()
            .required('This input is required.'),
            result: Yup.mixed()
            .required('This input is required.')
            .oneOf(['W','D','L','n/a']),
            final: Yup.mixed()
            .required('This input is required.')
            .oneOf(['Yes','No'])
        }),
        onSubmit:(values)=>{
            // submit the form
            submitForm(values)
        }
    })

    const showTeams = () => (
        teams ? 
            teams.map((item)=>(
                <MenuItem key={item.id} value={item.shortName}>
                    {item.shortName}
                </MenuItem>
            ))
        : null
    )


    const submitForm = (values) => {
        let dataToSubmit = values;

        teams.forEach((team)=>{
            if(team.shortName === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb 
            }

            if(team.shortName === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb   
            }
        })

        setLoading(true)

        if(formType === 'add'){
            matchesCollection.add(dataToSubmit)
            .then(()=>{
                showToastSuccess('Match added successfully!');
                formik.resetForm();
            }).catch(error=>{
                showToastError('Sorry, failed adding the match.');
            }).finally(()=>{
                setLoading(false);
            });
        } else {
            matchesCollection.doc(props.match.params.matchid)
            .update(dataToSubmit)
            .then(()=>{
                showToastSuccess("Match updated successfully!")
            }).catch(error=>{
                showToastError('Sorry, failed updating the match.');
            }).finally(()=>{
                setLoading(false);
            });
        }
    }


    useEffect(()=>{
        if(!teams){
            teamsCollection.get().then( snapshot =>{
                const teams = snapshot.docs.map( doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                
                setTeams(teams)
            }).catch(error=>{
                showToastError(error)
            })
        }
    },[teams])


    useEffect(()=>{
        const param = props.match.params.matchid;
        if(param){
            // edit existing match
            matchesCollection.doc(param).get().then(snapshot=>{
                if(snapshot.data()){
                    setFormType('edit');
                    setValues(snapshot.data());
                }else{
                    showToastError('Sorry, cannot find match.');
                }
            })

        } else {
            // add new match
            setFormType('add');
            setValues(defaultValues);
        }

    },[props.match.params.matchid])

    console.log(values)
    return(
        <AdminLayout title= { formType === 'add' ? 'Add Match' : 'Update Match'} >
            <div className="editmatch_dialog_wrapper">
                <div>
                    <form onSubmit={formik.handleSubmit}>

                        <div>
                            <h4>Select date</h4>
                            <FormControl>
                                <TextField
                                    id ="date"
                                    name="date"
                                    type="date"
                                    variant="outlined"
                                    {...formik.getFieldProps('date')}
                                    {...textErrorHelper(formik,'date')}
                                />
                            </FormControl>
                        </div>

                        <hr/>

                        <div>
                            <h4>Result local</h4>

                            <FormControl error={selectIsError(formik,'local')}>
                                <Select
                                    id="local"
                                    name="local"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('local')}
                                >
                                    <MenuItem value="" disabled>Select a team</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik,'local')}
                            </FormControl>

                            <FormControl
                                style={{ marginLeft:'10px' }}
                            >
                                <TextField
                                    id ="resultLocal"
                                    name="resultLocal"
                                    type="number"
                                    variant="outlined"
                                    {...formik.getFieldProps('resultLocal')}
                                    {...textErrorHelper(formik,'resultLocal')}
                                />
                            </FormControl>
                        </div>

                        <div>
                            <h4>Result away</h4>
                            <FormControl error={selectIsError(formik,'away')}>
                                <Select
                                    id="away"
                                    name="away"
                                    variant="outlined"
                                    displayEmpty
                                    {...formik.getFieldProps('away')}
                                >
                                    <MenuItem value="" disabled>Select a team</MenuItem>
                                    {showTeams()}
                                </Select>
                                {selectErrorHelper(formik,'away')}
                            </FormControl>

                            <FormControl
                                style={{ marginLeft:'10px' }}
                            >
                                <TextField
                                    id ="resultAway"
                                    name="resultAway"
                                    type="number"
                                    variant="outlined"
                                    {...formik.getFieldProps('resultAway')}
                                    {...textErrorHelper(formik,'resultAway')}
                                />
                            </FormControl>
                        </div>

                        <hr/>

                        <div>
                            <h4>More details</h4>
                            <div className="mb-5">
                                <FormControl>
                                    <TextField
                                        id ="referee"
                                        name="referee"
                                        variant="outlined"
                                        placeholder="Add referee name"
                                        {...formik.getFieldProps('referee')}
                                        {...textErrorHelper(formik,'referee')}
                                    />
                                </FormControl>
                            </div>
                            
                            <div className="mb-5">
                                <FormControl>
                                    <TextField
                                        id ="stadium"
                                        name="stadium"
                                        variant="outlined"
                                        placeholder="Add stadium name"
                                        {...formik.getFieldProps('stadium')}
                                        {...textErrorHelper(formik,'stadium')}
                                    />
                                </FormControl>
                            </div>

                            <div className="mb-5">
                                <FormControl error={selectIsError(formik,'result')}>
                                    <Select
                                        id="result"
                                        name="result"
                                        variant="outlined"
                                        displayEmpty
                                        {...formik.getFieldProps('result')}
                                    >
                                        <MenuItem value="" disabled>Select a result</MenuItem>
                                        <MenuItem value="W">Win</MenuItem>
                                        <MenuItem value="D">Draw</MenuItem>
                                        <MenuItem value="L">Lose</MenuItem>
                                        <MenuItem value="n/a">Not applicable</MenuItem>
                                    </Select>
                                    {selectErrorHelper(formik,'result')}
                                </FormControl>
                            </div>

                            <div className="mb-5">
                                <FormControl error={selectIsError(formik,'final')}>
                                    <Select
                                        id="final"
                                        name="final"
                                        variant="outlined"
                                        displayEmpty
                                        {...formik.getFieldProps('final')}
                                    >
                                        <MenuItem value="" disabled>Was the game played?</MenuItem>
                                        <MenuItem value="Yes">Yes</MenuItem>
                                        <MenuItem value="No">No</MenuItem>
                                    </Select>
                                    {selectErrorHelper(formik,'final')}
                                </FormControl>
                            </div>

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                            >
                                { formType === 'add' ?
                                    'Add Match'
                                : 
                                    'Update Match'
                                }
                            </Button>


                        </div>

                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}

export default AddEditMatch;