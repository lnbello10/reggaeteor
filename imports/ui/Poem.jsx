import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

import {Poems} from "../api/poems.js";

export default class Poem extends Component {


    increaseCounter() {

        Meteor.call('poems.increaseCounter', this.props.poem._id, this.props.poem.owner, function(error, result)
        {
         if(error){
             alert("You've already voted this poem");
         }
        });
    }

    deleteThisPoem() {
        Meteor.call('poems.remove', this.props.poem._id);
    }

    showDeleteButton(){
        if( Meteor.call('users') === this.props.poem.owner){
            var b = document.getElementById("DeleteButton");
            b.style.visibility = "visible";

        }
    }


    render() {
        return (
            <div>
                <li className="poem">

                <span className="text">
                    <strong className="poemAuthor">{this.props.poem.username} posted:</strong>
                    <p className="poemTextTag">{this.props.poem.tag}</p>
                    <p className="poemText">{this.props.poem.text}</p>
                </span>

                    <span className="buttons">
                        {this.props.user ?
                            <button className="delete" id="DeleteButton" onClick={this.deleteThisPoem.bind(this)}
                                    style={{visibility: "visible"}}>
                                &nbsp;
                            </button> : ''
                        }

                        {this.props.user ?
                            <button className="like" id="LikeButton" name='PuedeContar'
                                    onClick={this.increaseCounter.bind(this)}>
                                &nbsp;
                            </button> : ''
                        }

                    <span className="likesCounter">
                         Likes: {this.props.poem.counter}
                    </span>
                </span>

                </li>
                <hr/>
            </div>
        );
    }
}

Poem.propTypes = {
    // This component gets the poem to display through a React prop.
    // We can use propTypes to indicate it is required
    poem: PropTypes.object.isRequired
};