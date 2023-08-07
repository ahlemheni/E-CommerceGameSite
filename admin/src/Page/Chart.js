import React from 'react'
import { Link } from 'react-router-dom';

const Chart = () => {
  return (
    <div className="container-fluid position-relative d-flex p-0">
     <div class="content">
      <div className="container-fluid pt-4 px-4">
        <div className="row g-4">
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Single Line Chart</h6>
              <canvas id="line-chart" />
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Multiple Line Chart</h6>
              <canvas id="salse-revenue" />
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Single Bar Chart</h6>
              <canvas id="bar-chart" />
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Multiple Bar Chart</h6>
              <canvas id="worldwide-sales" />
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Pie Chart</h6>
              <canvas id="pie-chart" />
            </div>
          </div>
          <div className="col-sm-12 col-xl-6">
            <div className="bg-secondary rounded h-100 p-4">
              <h6 className="mb-4">Doughnut Chart</h6>
              <canvas id="doughnut-chart" />
            </div>
          </div>
        </div>
      </div>
      <div>
      </div>
      </div>
   
    <Link  to="#" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up" /></Link>
  
 
</div>

  )
}

export default Chart
