import React, { Component } from 'react'
import './css/signInPage.css';

class SignInPage extends Component {
  	render() {
	    return(
	    	<div className="innerSignInDiv">
		    	<div className="signInHeader">
		    		<p>Sign In to Discover your most listened to songs!</p>
		    	</div>
		    	<div className="signIn">
		      		<a onClick={()=> window.location = 'http://localhost:8888/login'} className="signInLink"> <h2> Sign in with Spotify </h2></a>
		      	</div>
	      	</div>
	    )
  	}
}

export default SignInPage;