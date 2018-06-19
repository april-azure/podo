import React, { Component } from 'react'
import Footer from './FooterComponent'
import Header from './HeaderComponent'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Marketing } from './MarketingComponent'
import Login from './LoginComponent'

class Main extends Component {
	render() {
		return (
			<div>
				<Header/>
					<Switch>
						<Route path='/marketing' component = { Marketing }/>
						<Route path = '/login' component = { Login }/>
						<Redirect to = '/marketing' />
					</Switch>
				<Footer/>
			</div>
		)
	}
}

export default Main 