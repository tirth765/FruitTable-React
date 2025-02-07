import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategores } from "../../redux/Slice/subCategorySlice";

const SubCategoryDisplay = () => {
  const dispatch = useDispatch();

  const SubCategoryData = useSelector((state) => state.subCategory);

  console.log("SubCategoryData", SubCategoryData);

  const getData = () => {
    dispatch(getSubCategores());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div style={{ marginTop: "150px" }}>
      <h1>SubCategory</h1>
      <div className="container-fluid service py-5">
        <div className="container py-5">
          <div className="row g-4 justify-content-center">
            {SubCategoryData.SubCategory?.map((v) => {
              return (
                <div className="col-md-6 col-lg-4">
                  {/* <NavLink to={"/SubCategory/" + v._id}> */}
                    <div className="service-item bg-secondary rounded border border-secondary">
                      <img
                        src={"http://localhost:8000/" + v.subcat_img}
                        className="img-fluid rounded-top w-100"
                        alt = "subcat_img"
                      />
                      <div className="px-4 rounded-bottom">
                        <div className="service-content bg-primary text-center p-4 rounded">
                          <h3 className="mb-0">{v.name}</h3>
                        </div>
                      </div>
                    </div>
                  {/* </NavLink> */}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryDisplay;
