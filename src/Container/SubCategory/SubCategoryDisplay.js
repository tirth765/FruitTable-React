import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubCategores } from "../../redux/Slice/subCategorySlice";
import { NavLink, useParams } from "react-router-dom";

const SubCategoryDisplay = () => {
  const dispatch = useDispatch();

  const SubCategoryData = useSelector((state) => state.subCategory);

  console.log("SubCategoryData", SubCategoryData.SubCategory);

  const getData = () => {
    dispatch(getSubCategores());
  };

  useEffect(() => {
    getData();
  }, []);

  const { id } = useParams();
  console.log(id);

  // const findSubCat = SubCategoryData.SubCategory.filter((v) => v.Category == id)

  // console.log(findSubCat);

  return (
    <div style={{ marginTop: "150px" }}>
      <div className="container-fluid service py-5">
        <div className="container py-5">
          <div className="row g-4 justify-content-center">
            {SubCategoryData.SubCategory?.filter((v) => v.Category == id)?.map(
              (v) => {
                return (
                  <div className="col-md-6 col-lg-4">
                    <NavLink to={"/Shop/" + v._id}>
                      <div className="service-item bg-secondary rounded border border-secondary">
                        <img
                          src={v.subcat_img.url}
                          className="img-fluid rounded-top w-100"
                          alt="subcat_img"
                          style={{ height: "350px", objectFit: "cover" }}
                        />
                        <div className="px-4 rounded-bottom">
                          <div className="service-content bg-primary text-center p-4 rounded">
                            <h3 className="mb-0">{v.name}</h3>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryDisplay;
