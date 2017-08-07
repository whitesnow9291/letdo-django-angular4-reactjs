import React, { Component } from 'react';
import 'react-images-uploader/styles.css';
import 'react-images-uploader/font.css';
import CKEditor from "react-ckeditor-component";
import axios, { post } from 'axios';
import './portfolio.css'
axios.defaults.baseURL = "http://localhost:8000/letdoapi";
class PortfolioEdit extends React.Component {
	constructor(props) {
		super(props);
		this.updateContent = this.updateContent.bind(this);
		this.saveCkeditorContent = this.saveCkeditorContent.bind(this);
		this.saveProfileInfo = this.saveProfileInfo.bind(this);
		this.uploadImage = this.uploadImage.bind(this);
		this.state = {
			content: 'content',
		}
	}

	updateContent(newContent) {
		this.setState({
			content: newContent
		})
	}
	saveProfileInfo() {
		var token = localStorage.getItem('currentUser');
		var headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
		axios.post('/savecreditprofile', {
			fullname: this.fullname.value,
			email: this.email.value,
			password: this.password.value
		}, { headers: headers })
			.then(function (response) {
				console.log(response);
				let json = response.data;
				if (json.status == 'ok') {
					alert("successfully saved");
				} else {
					alert(json.message)
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	saveCkeditorContent() {
		console.log(this.statea);
		var token = localStorage.getItem('currentUser');
		var headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
		axios.post('/savecontent', {
			content: this.state.content,
		}, { headers: headers })
			.then(function (response) {
				console.log(response);
				let json = response.data;
				if (json.status == 'ok') {
					alert("successfully saved");
				} else {
					alert(json.message)
				}
			})
			.catch(function (error) {
				console.log(error);
			});
	}
	uploadImage() {
		console.log(this.statea);
		var token = localStorage.getItem('currentUser');
		var headers = {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer ' + token
		}
		const formData = new FormData();
		formData.append('image', this.image.files[0]);
		var url = 'http://localhost:8000/letdoapi/photoupload'
		const config = {
			headers: {
				'content-type': 'multipart/form-data',
				'Authorization': 'Bearer ' + token
			}
		}
		return post(url, formData, config).then(function (response) {
				console.log(response);
				let json = response.data;
				if (json.status == 'ok') {
					alert("successfully saved");
				} else {
					alert(json.message)
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		// axios.post('/savecontent', {
		// 	image: this.image,
		// }, { headers: headers })
		// 	.then(function (response) {
		// 		console.log(response);
		// 		let json = response.data;
		// 		if (json.status == 'ok') {
		// 			alert("successfully saved");
		// 		} else {
		// 			alert(json.message)
		// 		}
		// 	})
		// 	.catch(function (error) {
		// 		console.log(error);
		// 	});
	}
	render() {
		return (
			<div className="container">
				<div className="row">
					<alert></alert>
				</div>
				<div className="row">

					<div className="col-md-4 col-sm-6">
						<h2> Profile </h2>
						<div className="text-center">
							<input type="file" name="image" ref={el => this.image = el} />
							<button type="button" className="btn btn-primary" onClick={this.uploadImage}> Upload </button>
						</div>
						<div className="card text-center mt-2">
							<div className="card-block">
								<form>
									<div className="form-group row">
										<label htmlFor="example-text-input" className="col-2 col-form-label">Name</label>
										<div className="col-10">
											<input className="form-control" required type="text" id="example-text-input" name="fullname" ref={el => this.fullname = el} />
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="example-email-input" className="col-2 col-form-label">Email</label>
										<div className="col-10">
											<input className="form-control" required type="email" id="example-email-input" name="email" ref={el => this.email = el} />
										</div>
									</div>
									<div className="form-group row">
										<label htmlFor="example-search-input" className="col-2 col-form-label">Pass</label>
										<div className="col-10">
											<input className="form-control" type="search" required id="example-search-input" name="password" ref={el => this.password = el} />
										</div>
									</div>
									<button type="button" className="btn btn-primary" onClick={this.saveProfileInfo}> Save </button>
								</form>
							</div>
						</div>
					</div>
					<div className="col-md-8 col-sm-6">
						<h2>Content </h2>
						<div className="form-group row">
							<CKEditor activeClass="p10" content={this.state.content} onChange={this.updateContent} />
						</div>
						<div className="form-group row">
							<button type="button" className="btn btn-primary" onClick={this.saveCkeditorContent}>Save</button>
						</div >
					</div >
				</div >
			</div >
		);
	}
}

export default PortfolioEdit;