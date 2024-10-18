import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container pt-2">
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-12">
          <h3 className="d-block p-3 bg-secondary text-white"> 
            <Link className="text-white" to={'/'}>Book Shop</Link> | <Link className="text-white" to={'/addbook'}>Add-Book</Link>
          </h3>
        </div>
      </div>
      
      <Outlet />
    </div>
  )
}

export default Layout;