import React ,{ Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios_orders';
import withError from '../../hoc/ErrorHandler/withError';

class Orders extends Component {
  state = {
    orders : [],
    loading : true,
  }
  componentDidMount() {
    const fetchedOrders = [];
    axios.get('orders.json')
          .then(res =>{
            for (var key in res.data) {
              fetchedOrders.push({
                ...res.data[key],
                id: key
              });
              //console.log(res.data[key]);
            }
            this.setState({loading : false, orders: fetchedOrders});
            //console.log(fetchedOrders);

          })
          .catch(err =>{
            this.setState({loading : false});
          });
  }

  render() {
    return (
          <div>
            {this.state.orders.map(order =>(
              <Order
                key={ order.id}
                ingredients={order.ingredients}
                price = {order.price}/>
            ))}
          </div>
    );
  }
}
export default withError(Orders, axios);
