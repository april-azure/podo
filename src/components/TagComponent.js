import {Control, Errors} from 'react-redux-form'
import {Badge, Input} from 'reactstrap'
import React, {Component} from 'react'

class TagInput extends Component{
	constructor(props) {
		super(props)
		this.state = {
			tags: [
				{title:'abc', color:'primary'}
			]
		}
		this.handleKeyPress = this.handleKeyPress.bind(this)
	}

	handleKeyPress(event) {
		let tags = [...this.state.tags]
		if(event.key == 'Enter') {
			tags.push({
				title: event.target.value,
				color: 'primary'
			})
			this.setState({
				tags: tags
			})
			event.target.value = ''
		}

	}

	removeTag(id) {
		let tags = this.state.tags;
		for(let i = 0; i < tags.length; i++){
			if(i === id) {
				tags.splice(i,1)
			}
		}
		this.setState({
			tags: [...tags]
		})
	}

	render(){
		return (
			<div>
				<Input onKeyPress = {this.handleKeyPress}/>
				<div>{this.state.tags.map((tag,i) => (
					<h4 style={{marginRight:'0.5rem'}} className='float-left' key={i}><Badge pill color={tag.color}>{tag.title}<span style={{marginLeft:'0.5rem'}} onClick={()=>this.removeTag(i)}>x</span></Badge></h4>
				))}
				</div>
				<div style={{clear:'both'}}></div>
			</div>
		)
	}
}

export default TagInput
