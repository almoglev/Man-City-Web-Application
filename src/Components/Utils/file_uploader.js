import React, { Component } from "react";
import { firebase } from '../../firebase';
import FileUploader from 'react-firebase-file-uploader';
import { CircularProgress } from '@material-ui/core';
import { showToastError, showToastSuccess } from '../Utils/utils';

class FilesUploader extends Component {

    state = {
        name:'', // files name abc.png
        isUploading: false,
        fileURL: '' // files address http://firebase/hostingblabla/abc.png
    }

    handleUploadStart = () => {
        this.setState({
            isUploading: true
        })
    }

    handleUploadError = () => {
        showToastError('Error: image uploading failed.')
        this.setState({
            isUploading: false
        })
    }

    handleUploadSuccess = (filename) => {
        showToastSuccess('Image uploaded successfully.')
        this.setState({
            name: filename,
            isUploading: false
        })

        // retrieve the image back from firebase so we can display it
        firebase.storage().ref(this.props.dir)
        .child(filename).getDownloadURL()
        .then(url=>{
            this.setState({fileURL: url})
        });

        this.props.filename(filename);
    }
    
    // the function is listening to the props and state- when we get new data to this component,
    // it will catch and analyze what we got from the new state or props, and we can modify the new
    // state or props before the rendering happens
    static getDerivedStateFromProps(props,state){
        
        if(props.defaultImg){
            // if we have a default image, we need to modify the state and only then let it render
            return state={
                name: props.defaultImgName,
                fileURL: props.defaultImg
            }
        }

        // in case we do not want to modify the props or state, return null (and then it goes to render)
        return null;
    }

    uploadAgain = () => {
        this.setState({
            name:'',
            isUploading:false,
            fileURL:''

        });

        this.props.resetImage()
    }

    render(){
        console.log(this.props)
        return(
            <div>
                {/* if no image was found (happens when adding a new player), show upload image*/}
                { !this.state.fileURL ?
                    <div>
                        <FileUploader
                            accept = "image/*"
                            name = "image"
                            randomizeFilename
                            storageRef = {firebase.storage().ref(this.props.dir)}
                            onUploadStart={this.handleUploadStart}
                            onUploadError={this.handleUploadError}
                            onUploadSuccess={this.handleUploadSuccess}
                        />
                    </div>
                : 
                // else, the image exists-
                // show the image (it exists in the database from before, or because it was just uploaded) 
                    <div className="image_upload_container">
                        <img
                            style={{
                                width: '85%'
                            }}
                            src={this.state.fileURL}
                            alt={this.state.name}
                        ></img>

                        {/*add a remove button to remove the image from the form */}
                        <div className="remove" onClick={()=>this.uploadAgain()}>
                            Remove
                        </div>

                    </div>
                } 


                {/* if image is being uploaded- show loading icon */}
                { this.state.isUploading ? 
                    <div className="progress"
                        style={{textAlign:'center', margin:'30px 0'}}
                    >
                        <CircularProgress
                            style={{color:'#98c6e9'}}
                            thickness={7}
                        />
                    </div>
                : null }




            </div>
        )
    }
}

export default FilesUploader;