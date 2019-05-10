import React,{Component} from 'react';
import './product.css';
import DataService from '../services/data-service';
import NotificationService, {NOTIF_WISHLIST_CHANGED} from '../services/notification-service';

let ds = new DataService();
let ns = new NotificationService();

class Product extends Component {
    constructor(props){
        super(props);
        
        this.state = {onWishList: ds.itemOnWishList()};
        
        //Bind functions
        this.addWishListItem = this.addWishListItem.bind(this);
        this.removeWishListItem = this.removeWishListItem.bind(this);
        this.onButtonClicked = this.onButtonClicked.bind(this);
        this.onWishListChanged = this.onWishListChanged.bind(this);
    }
    componentDidMount(){
        ns.addObserver(NOTIF_WISHLIST_CHANGED, this, this.onWishListChanged);
    }
    componentWillUnmount(){
        ns.removeObserver(this, NOTIF_WISHLIST_CHANGED);
    }
    onWishListChanged(newWishList){
        this.setState({onWishList:ds.itemOnWishList(this.props.product)});
    }
    addWishListItem = ()=>{
            ds.addWishListItem(this.props.product)    
    }
    removeWishListItem = ()=>{
            ds.removeWishListItem(this.props.product);
    }
    onButtonClicked = ()=>{
        if(this.state.onWishList){
            ds.removeWishListItem(this.props.product);
        }else{
            ds.addWishListItem(this.props.product) 
        }
    }
    render(){
        var btnClass;
        if(this.state.onWishList){
            btnClass = "btn btn-danger";
        }else{
            btnClass= "btn btn-primary";
        }
        return(
            <div className="card product">
                <div className="card-block">
                    <h4 className="card-title">{this.props.product.title}</h4>
                    <p className="card-text">Price : ${this.props.product.price}</p>
                    <p className="card-text">Likes : {this.props.product.likes}</p>
                    <a href="#" className={btnClass} onClick={()=>this.onButtonClicked()}  >
                        {this.state.onWishList ? "Remove from wish list" : "Add to wish list"}
                    </a>

                </div>
            </div>
        )        
    }
}
export default Product;