import React from 'react';
import propTypes from 'prop-types';
import Clipboard from 'clipboard';
import {Meteor} from 'meteor/meteor';
import moment from 'moment';

export default class LinksListItem extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      justCopied: false
    }
  }

  componentDidMount() {
    this.clipboard = new Clipboard(this.refs.copy);
    this.clipboard.on('success' , () => {
      this.setState({
        justCopied: true
      });
      setTimeout(() => {
        this.setState({
          justCopied: false
        });
      }, 1000);
    }).on('error' , () => {
      alert('Unable to copy please manually copy the link.');
    });
    
  }

  componentWillUnmount() {
    this.clipboard.destroy();
  }

  toggleHide() {
   Meteor.call('links.setVisibility' , this.props._id , !this.props.visible);
  }

  renderStats(){
    const visitMessage = this.props.visitedCount === 1 ? 'visit' : 'visits';
    let visitedMesasge = null;

    if(typeof this.props.lastVisitedAt === 'number') {
      visitedMesasge = `visited ${moment(this.props.lastVisitedAt).fromNow()}`;
    }

    return (
      <p className="item__message">{this.props.visitedCount} {visitMessage} - {visitedMesasge}</p>
    );
  }

  render() {
      return(
        <div className="item">
          <h2>{this.props.url}</h2>
          <p className="item__message">{this.props.shortUrl}</p>
          {this.renderStats()}
          <a href={this.props.shortUrl} target="_blank" className="button button--pill button--link">
            Visit
          </a>
          <button ref="copy" data-clipboard-text={this.props.shortUrl}  className="button button--pill">
            {this.state.justCopied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={this.toggleHide.bind(this)} className="button button--pill">
            {this.props.visible ? 'Hide' : 'UnHide'}
          </button>
        </div>
      );
  }

}

LinksListItem.propTypes = {
  url: propTypes.string.isRequired,
  shortUrl: propTypes.string.isRequired,
  _id: propTypes.string.isRequired,
  userId: propTypes.string.isRequired,
  visible: propTypes.bool.isRequired,
  visitedCount: propTypes.number.isRequired,
  lastVisitedAt: propTypes.number
}