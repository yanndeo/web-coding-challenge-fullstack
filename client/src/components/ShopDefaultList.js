import React, { Component, Fragment} from 'react'
import ShopItem from './ShopItem';
import SubNavbar from './layout/SubNavbar';
import { Link } from 'react-router-dom';




class ShopDefaultList extends Component {


  componentDidMount() {
    document.title = `Default Page`;

  }


  componentDidUpdate() {
    document.title = `Default Page`;
  } 




    render () {
        return (
          <Fragment>
          <SubNavbar />

    <div className="site-section">
      <div className="container">

       

          <div className="row">
            <div className="row col-md-12 ">

                            <ShopItem/>
                            <ShopItem />
                            <ShopItem />
                            <ShopItem />
                            <ShopItem />
                            <ShopItem />
                          


            </div>






            <div className="row" data-aos="fade-up">
              <div className="col-md-12 text-center">
                <div className="site-block-27">
                  <ul>
                    <li><Link to="#">&lt;</Link></li>
                    <li className="active"><span>1</span></li>
                    <li><Link to="#">2</Link></li>
                    <li><Link to="#">3</Link></li>
                    <li><Link to="#">4</Link></li>
                    <li><Link to="#">5</Link></li>
                    <li><Link to="#">&gt;</Link></li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

         
        
      </div>
</div>
          </Fragment>
        )
    }
}

export default ShopDefaultList;