import React, { useEffect, useState } from 'react'
import HeroHeader from '../../components/hero-header'
import { Link, useNavigate, useParams } from 'react-router-dom'
import useServicesByClinicID from '../../callApi/serByCli'
import useClinicDetail from '../../callApi/clinicDetail'
import useDentistsByClinic from '../../callApi/denByCli'
import Offer from '../../components/offer'
import ScrollToTop from '../../components/scrollToTop'
import { Button, Form, Input, Pagination } from 'antd'

function ClinicDetailPage() {
  const { id } = useParams()
  const { clinic } = useClinicDetail();
  const { service } = useServicesByClinicID();
  const { dentist } = useDentistsByClinic();
  const navigate = useNavigate();

  //service
  const [dataService, setDataService] = useState([]);
  const [currentPageService, setCurrentPageService] = useState(1);
  const itemsPerPageService = 4;

  useEffect(() => {
    setDataService(service);
  }, [service]);

  const handleSearchService = (values) => {
    setDataService(service.filter(s => s.name.toLowerCase().includes(values.keyword.toLowerCase())));
    setCurrentPageService(1); // Reset to first page after search
  };

  const handlePageChangeService = (page) => {
    setCurrentPageService(page);
  };

  // Calculate the items to display on the current page
  const indexOfLastItem = currentPageService * itemsPerPageService;
  const indexOfFirstItem = indexOfLastItem - itemsPerPageService;
  const currentDataService = dataService.slice(indexOfFirstItem, indexOfLastItem);


  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 14 },
    },
  };

  const tailFormItemLayout = {
    wrapperCol: {
      xs: { span: 24, offset: 0 },
      sm: { span: 14, offset: 6 },
    },
  };

  return (
    <>
      <HeroHeader content={`${clinic.clinicName}`} />

      <div className='container bg-light'>
        <div style={{ maxWidth: 600, margin: '0 auto', padding: '40px' }}>
          <Form {...formItemLayout} onFinish={handleSearchService}>
            <Form.Item label="Service Name" name="keyword">
              <Input />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                htmlType="submit"
                className='btn btn-primary'
                style={{ padding: '0px 80px', borderRadius: '4px' }}
              >
                Search
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row">
            {currentDataService.map((item, index) => (
              <div key={index} className="col-md-3">
                <div className="price-item pb-4">
                  <Link to={`/service/${item.id}`}>
                    <div className="position-relative">
                      <img className="rounded-top w-100" style={{ objectFit: "cover" }} height={180} src={item?.url} alt={item?.name} />
                      <div className="d-flex align-items-center justify-content-center bg-light rounded pt-2 px-3 position-absolute top-100 start-50 translate-middle" style={{ zIndex: 2 }}>
                        <h2 className="text-primary m-0">${item?.price}</h2>
                      </div>
                    </div>
                  </Link>
                  <div className="position-relative text-center bg-light border-bottom border-primary py-5 p-4">
                    <Link to={'/'}>
                      <h4>{item?.name}</h4>
                      <hr className="text-primary w-50 mx-auto mt-0" />
                      <div className="d-flex justify-content-between mb-3"><span>Modern Equipment</span><i className="fa fa-check text-primary pt-1" /></div>
                      <div className="d-flex justify-content-between mb-3"><span>Professional Dentist</span><i className="fa fa-check text-primary pt-1" /></div>
                      <div className="d-flex justify-content-between mb-2"><span>24/7 Call Support</span><i className="fa fa-check text-primary pt-1" /></div>
                    </Link>
                    <span onClick={() => navigate(`/clinic/${id}/service/${item.id}`)} className="btn btn-primary py-2 px-4 position-absolute top-100 start-50 translate-middle">Appointment</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <Pagination
            className='d-flex justify-content-center mt-5'
            current={currentPageService}
            total={dataService.length}
            pageSize={itemsPerPageService}
            onChange={handlePageChangeService}
          />
        </div>
      </div>

      <Offer />

    </>
  )
}

export default ClinicDetailPage
