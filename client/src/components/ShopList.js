import React, { Component, Fragment} from 'react'
import ShopItem from './ShopItem';
import SubNavbar from './layout/SubNavbar';

class ShopList extends Component {
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
                    <li><a href="#">&lt;</a></li>
                    <li className="active"><span>1</span></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#">&gt;</a></li>
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

export default ShopList;